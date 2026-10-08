// Breaks the first-load JS of a route down by chunk, and labels the big ones by
// what they contain. Deliberately dependency-free: @next/bundle-analyzer would
// have to be installed, and this answers the only question we ask of it — what
// is actually in the first load.
//
//   npm run analyze            (home)
//   npm run analyze -- /about
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const route = process.argv[2] || '/';
const file = route === '/' ? 'index.html' : route.replace(/^\//, '') + '.html';
const html = path.join('.next/server/app', file);

if (!fs.existsSync(html)) {
  console.error(`No prerendered HTML for ${route} (looked for ${html}). Run next build first.`);
  process.exit(1);
}

/** Cheap content sniffing, so each chunk is named by what it carries. */
const MARKERS = [
  ['react-dom', /hydrateRoot|react-dom|__reactFiber/],
  ['gsap', /gsap/i],
  ['ScrollTrigger', /ScrollTrigger/],
  ['SplitText', /SplitText/],
  ['lenis', /lenis/i],
  ['next/router', /next\/dist\/client|app-router|parallel-route/],
  ['lucide', /createLucideIcon/],
];

const srcs = [
  ...new Set([...html && fs.readFileSync(html, 'utf8').matchAll(/<script[^>]+src="(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1])),
];

let gzTotal = 0;
const rows = [];
for (const src of srcs) {
  const p = path.join('.next', src.replace('/_next/', ''));
  if (!fs.existsSync(p)) continue;
  const buf = fs.readFileSync(p);
  const text = buf.toString('utf8');
  const gz = zlib.gzipSync(buf, { level: 9 }).length;
  gzTotal += gz;
  rows.push({
    file: path.basename(src),
    gzip: +(gz / 1024).toFixed(1),
    holds: MARKERS.filter(([, re]) => re.test(text)).map(([name]) => name).join(', ') || '—',
  });
}

rows.sort((a, b) => b.gzip - a.gzip);
const pad = (s, n) => String(s).padEnd(n);
console.log(`\nFirst-load JS for ${route} — ${(gzTotal / 1024).toFixed(1)} KB gzip over ${rows.length} files\n`);
console.log(pad('gzip', 10) + pad('file', 26) + 'holds');
for (const r of rows) console.log(pad(r.gzip + ' KB', 10) + pad(r.file, 26) + r.holds);
console.log();
