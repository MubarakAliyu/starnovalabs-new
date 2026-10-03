/**
 * Verifies the loader policy in one browser session, the way a visitor meets
 * it: first load of "/", a refresh of "/", a refresh of /about, and a
 * client-side navigation back to "/". Reports the decision the head script
 * made each time, plus whether the overlay was actually on screen.
 *
 *   node scripts/loader-check.mjs --base http://localhost:3140
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find((candidate) => existsSync(candidate));

const PORT = 9224;
const OUT = path.join(process.cwd(), 'docs/qa');
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
    send: (method, params = {}, sessionId) => {
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
  const base = arg('base', 'http://localhost:3140');
  mkdirSync(OUT, { recursive: true });

  const chrome = spawn(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      `--remote-debugging-port=${PORT}`,
      '--window-size=1440,900',
      '--user-data-dir=' + path.join(process.cwd(), '.chrome-loader'),
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  try {
    const browser = connect(await waitForTarget());
    await browser.ready;
    const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true });
    const page = (method, params = {}) => browser.send(method, params, sessionId);

    await page('Page.enable');
    await page('Runtime.enable');

    // One tab throughout, so sessionStorage carries between steps.
    const probe = async (label, shotDelay) => {
      await sleep(shotDelay);
      const { result } = await page('Runtime.evaluate', {
        expression: `JSON.stringify({variant:document.documentElement.dataset.introVariant??null,intro:document.documentElement.dataset.intro??null,visible:(function(){var l=document.querySelector('[data-loader]');if(!l)return false;var s=getComputedStyle(l);return s.display!=='none';})(),focus:document.activeElement?document.activeElement.tagName+(document.activeElement.id?'#'+document.activeElement.id:''):null,outline:(function(){var m=document.getElementById('main');return m?getComputedStyle(m).outlineStyle:null;})()})`,
        returnByValue: true,
      });
      const state = JSON.parse(result.value);
      const shot = await page('Page.captureScreenshot', { format: 'png' });
      writeFileSync(path.join(OUT, `loader-${label}.png`), Buffer.from(shot.data, 'base64'));
      console.log(
        `${label.padEnd(22)} variant=${String(state.variant).padEnd(5)} intro=${String(state.intro).padEnd(5)} overlayVisible=${String(state.visible).padEnd(5)} focus=${state.focus} mainOutline=${state.outline}`,
      );
      return state;
    };

    await page('Page.navigate', { url: `${base}/` });
    await probe('1-first-load-home', 700);

    await page('Page.navigate', { url: `${base}/` });
    await probe('2-refresh-home', 700);

    await page('Page.navigate', { url: `${base}/about` });
    await probe('3-refresh-about', 1800);

    // Client-side navigation: click an internal link rather than reloading.
    await page('Runtime.evaluate', {
      expression:
        "(function(){var a=[...document.querySelectorAll('a')].find(x=>x.getAttribute('href')==='/');if(a)a.click();})()",
    });
    await probe('4-client-nav-home', 2500);

    browser.close();
  } finally {
    chrome.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
