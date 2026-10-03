/**
 * QA screenshots at chosen scroll positions.
 *
 * Launches the installed Chrome headless with a debugging port and drives it
 * over the DevTools Protocol using Node 22's built-in fetch and WebSocket, so
 * nothing has to be installed. `--screenshot` on its own cannot scroll, which
 * is the whole reason this exists: the pinned sequence and the lower half of
 * every page can only be judged part-way down.
 *
 * Usage:
 *   node scripts/shoot.mjs --url http://localhost:3130/ --name home \
 *     --width 1440 --scroll 0,800,1600
 *   node scripts/shoot.mjs --url http://localhost:3130/ --name home --sweep 800
 *
 * Output: docs/qa/<name>-<width>-<y>.png
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];

const OUT_DIR = path.join(process.cwd(), 'docs/qa');
const PORT = 9222;

function arg(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1];
}

function findChrome() {
  const found = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) throw new Error('No Chrome or Edge found in the usual locations.');
  return found;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Nothing here is worth hanging the whole run for. */
function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    sleep(ms).then(() => {
      console.warn(`  (timed out waiting for ${label})`);
      return null;
    }),
  ]);
}

/** The debugging port takes a moment to answer after launch. */
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

/** A minimal CDP client: send a command, wait for the matching id. */
function connect(url) {
  const socket = new WebSocket(url);
  let nextId = 1;
  const pending = new Map();

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
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
  const url = arg('url');
  const name = arg('name', 'page');
  const width = Number(arg('width', '1440'));
  const height = Number(arg('height', width === 390 ? 844 : 900));
  const sweep = arg('sweep');
  const scrollArg = arg('scroll');

  if (!url) throw new Error('Pass --url.');
  mkdirSync(OUT_DIR, { recursive: true });

  const chrome = spawn(
    findChrome(),
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      `--remote-debugging-port=${PORT}`,
      `--window-size=${width},${height}`,
      '--user-data-dir=' + path.join(process.cwd(), '.chrome-qa'),
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  try {
    const browserWs = await waitForTarget();
    console.log('  debugging port open');
    const browser = connect(browserWs);
    await browser.ready;

    const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await browser.send('Target.attachToTarget', {
      targetId,
      flatten: true,
    });

    const page = (method, params = {}) => browser.send(method, params, sessionId);

    await page('Page.enable');
    await page('Runtime.enable');
    await page('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });

    // ?intro=0 skips the loader so the page itself is what gets captured.
    const target = url + (url.includes('?') ? '&' : '?') + 'intro=0';
    console.log(`  navigating to ${target}`);
    await page('Page.navigate', { url: target });
    await sleep(2500);

    // Fonts and in-flight images, but never wait forever for either.
    await withTimeout(
      page('Runtime.evaluate', {
        expression:
          'Promise.all([document.fonts.ready,...[...document.images].filter(i=>!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,4000)}))])',
        awaitPromise: true,
      }),
      8000,
      'fonts and images',
    );
    await sleep(600);

    const { result } = await page('Runtime.evaluate', {
      expression: 'document.body.scrollHeight',
      returnByValue: true,
    });
    const docHeight = result.value;

    let positions;
    if (scrollArg) {
      positions = scrollArg.split(',').map((value) => Number(value.trim()));
    } else {
      const step = Number(sweep ?? 800);
      positions = [];
      for (let y = 0; y < docHeight; y += step) positions.push(y);
    }

    for (const y of positions) {
      await page('Runtime.evaluate', {
        expression: `window.scrollTo(0, ${y})`,
      });
      // Long enough for a scrubbed timeline and any reveal to settle.
      await sleep(900);

      const shot = await page('Page.captureScreenshot', { format: 'png' });
      const file = path.join(OUT_DIR, `${name}-${width}-${y}.png`);
      writeFileSync(file, Buffer.from(shot.data, 'base64'));
      console.log(`  ${path.relative(process.cwd(), file)}`);
    }

    console.log(`${name} @ ${width}: ${positions.length} shots, document ${docHeight}px`);
    browser.close();
  } finally {
    chrome.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
