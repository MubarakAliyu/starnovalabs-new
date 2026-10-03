/**
 * Counts console errors and warnings on each page, using the same headless
 * Chrome and DevTools Protocol approach as scripts/shoot.mjs. No dependencies.
 *
 *   node scripts/console-audit.mjs --base http://localhost:3133 --paths /,/about
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
];
const PORT = 9223;
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

function connect(url, onEvent) {
  const socket = new WebSocket(url);
  let nextId = 1;
  const pending = new Map();

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.method) {
      onEvent(message);
      return;
    }
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    if (message.error) entry.reject(new Error(message.error.message));
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
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params, sessionId }));
      });
    },
    close: () => socket.close(),
  };
}

async function main() {
  const base = arg('base', 'http://localhost:3133');
  const paths = arg('paths', '/,/about,/partner,/contact').split(',');

  const chrome = spawn(
    CHROME_CANDIDATES.find((candidate) => existsSync(candidate)),
    [
      '--headless=new',
      '--disable-gpu',
      `--remote-debugging-port=${PORT}`,
      '--window-size=1440,900',
      '--user-data-dir=' + path.join(process.cwd(), '.chrome-qa-console'),
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  try {
    const browser = connect(await waitForTarget(), (message) => {
      const { method, params } = message;
      if (method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(params.type)) {
        collected.push({
          level: params.type,
          text: (params.args ?? []).map((a) => a.value ?? a.description ?? a.type).join(' '),
        });
      }
      if (method === 'Runtime.exceptionThrown') {
        collected.push({
          level: 'error',
          text: params.exceptionDetails?.exception?.description ?? 'uncaught exception',
        });
      }
      if (method === 'Log.entryAdded' && ['error', 'warning'].includes(params.entry.level)) {
        collected.push({ level: params.entry.level, text: params.entry.text });
      }
    });
    await browser.ready;

    let collected = [];
    let failed = 0;

    for (const route of paths) {
      const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
      const { sessionId } = await browser.send('Target.attachToTarget', {
        targetId,
        flatten: true,
      });
      const page = (method, params = {}) => browser.send(method, params, sessionId);

      collected = [];
      await page('Runtime.enable');
      await page('Log.enable');
      await page('Page.enable');
      await page('Page.navigate', { url: `${base}${route}?intro=0` });
      await sleep(5000);
      // Scroll through so lazy work and scroll-driven code runs too.
      await page('Runtime.evaluate', {
        expression: 'window.scrollTo(0, document.body.scrollHeight / 2)',
      });
      await sleep(2000);

      const errors = collected.filter((entry) => entry.level === 'error');
      const warnings = collected.filter((entry) => entry.level === 'warning');
      if (errors.length) failed += errors.length;

      console.log(`${route.padEnd(12)} errors ${errors.length}   warnings ${warnings.length}`);
      for (const entry of [...errors, ...warnings].slice(0, 8)) {
        console.log(`   [${entry.level}] ${entry.text.slice(0, 160)}`);
      }

      await browser.send('Target.closeTarget', { targetId });
    }

    browser.close();
    process.exitCode = failed > 0 ? 1 : 0;
  } finally {
    chrome.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
