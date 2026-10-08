/**
 * Runs axe-core and a headings audit on each route, in the same headless
 * Chrome / CDP way as scripts/console-audit.mjs. No new dependencies — axe-core
 * is read from node_modules and injected into the page.
 *
 *   node scripts/a11y-audit.mjs --base http://localhost:3133 --paths /,/about
 */
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
];
const PORT = 9224;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function arg(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1];
}

async function waitForTarget(tries = 60) {
  for (let i = 0; i < tries; i += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (response.ok) return (await response.json()).webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error('Chrome did not open its debugging port.');
}

function connect(url) {
  const socket = new WebSocket(url);
  let nextId = 1;
  const pending = new Map();

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.method) return;
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    if (message.error) entry.reject(new Error(entry.method + ': ' + message.error.message));
    else entry.resolve(message.result);
  });

  const ready = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  return {
    ready,
    send(method, params = {}, sessionId) {
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject, method });
        socket.send(JSON.stringify({ id, method, params, sessionId }));
      });
    },
    close: () => socket.close(),
  };
}

const AXE = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');

/** Runs in the page: axe on the whole document, plus the heading outline. */
const AUDIT = `
(async () => {
  const result = await axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
  });
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
    .filter((el) => el.offsetParent !== null || el.getClientRects().length > 0)
    .map((el) => ({ level: Number(el.tagName[1]), text: (el.textContent || '').trim().slice(0, 60) }));
  return JSON.stringify({
    violations: result.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.slice(0, 25).map((n) => n.target.join(' ') + ' :: ' + (n.failureSummary || '').replace(/\s+/g, ' ').slice(0, 160)),
      count: v.nodes.length,
    })),
    headings,
  });
})()
`;

/** One h1, and never a jump of more than one level going down. */
function headingProblems(headings) {
  const problems = [];
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length !== 1) problems.push(`${h1s.length} h1 (expected exactly 1)`);
  let previous = null;
  for (const heading of headings) {
    if (previous !== null && heading.level > previous + 1) {
      problems.push(`h${previous} → h${heading.level} ("${heading.text}")`);
    }
    previous = heading.level;
  }
  return problems;
}

async function main() {
  const base = arg('base', 'http://localhost:3133');
  const paths = arg('paths', '/').split(',');
  const report = [];

  const chrome = spawn(
    CHROME_CANDIDATES.find((candidate) => existsSync(candidate)),
    [
      '--headless=new',
      '--disable-gpu',
      `--remote-debugging-port=${PORT}`,
      '--window-size=1440,900',
      '--user-data-dir=' + path.join(process.cwd(), '.chrome-a11y'),
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  let failed = 0;
  try {
    const browser = connect(await waitForTarget());
    await browser.ready;

    for (const route of paths) {
      const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
      const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
      const page = (method, params = {}) => browser.send(method, params, sessionId);

      await page('Runtime.enable');
      await page('Page.enable');
      // intro=0 skips the loader so the page under test is the settled one.
      await page('Page.navigate', { url: `${base}${route}?intro=0` });
      await sleep(4500);
      await page('Runtime.evaluate', { expression: AXE });
      const { result } = await page('Runtime.evaluate', {
        expression: AUDIT,
        awaitPromise: true,
        returnByValue: true,
      });

      const data = JSON.parse(result.value);
      const problems = headingProblems(data.headings);
      const serious = data.violations.filter((v) => ['critical', 'serious'].includes(v.impact));
      if (data.violations.length || problems.length) failed += 1;

      report.push({ route, ...data, headingProblems: problems });
      console.log(
        `${route.padEnd(22)} axe ${String(data.violations.length).padStart(2)} (${serious.length} serious+)   headings ${data.headings.length}${problems.length ? '  ⚠ ' + problems.join('; ') : ''}`,
      );
      for (const v of data.violations) {
        console.log(`   [${v.impact}] ${v.id} — ${v.help} (${v.count})`);
        for (const n of v.nodes) console.log(`        ${n}`);
      }

      await browser.send('Target.closeTarget', { targetId });
    }

    browser.close();
  } finally {
    chrome.kill();
  }

  writeFileSync('.a11y-report.json', JSON.stringify(report, null, 2));
  console.log(`\n${failed} route(s) with findings. Full report: .a11y-report.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
