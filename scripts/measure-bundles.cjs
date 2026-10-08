// Measures first-load JS per prerendered route from the built HTML.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const appDir = '.next/server/app';
const routes = [
  ['/', 'index.html'],
  ['/about', 'about.html'],
  ['/partner', 'partner.html'],
  ['/kids-in-tech', 'kids-in-tech.html'],
  ['/products', 'products.html'],
  ['/products/kitos', 'products/kitos.html'],
  ['/studio', 'studio.html'],
  ['/work', 'work.html'],
  ['/privacy', 'privacy.html'],
  ['/terms', 'terms.html'],
  ['/safeguarding', 'safeguarding.html'],
];

// Batch 4 §4: home <= 180 KB gzip, every other route <= 170 KB. We do not meet
// these — see docs/QA.md for the arithmetic. The numbers stay as specified so
// the gap is visible in the report rather than hidden behind a looser budget.
const BUDGET = { '/': 180, default: 170 };
const rows = [];

for (const [route, file] of routes) {
  const full = path.join(appDir, file);
  if (!fs.existsSync(full)) continue;
  const html = fs.readFileSync(full, 'utf8');
  const srcs = [
    ...new Set(
      [...html.matchAll(/<script[^>]+src="(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1]),
    ),
  ];
  let gz = 0;
  let br = 0;
  for (const src of srcs) {
    const p = path.join('.next', src.replace('/_next/', ''));
    if (!fs.existsSync(p)) continue;
    const buf = fs.readFileSync(p);
    gz += zlib.gzipSync(buf, { level: 9 }).length;
    br += zlib.brotliCompressSync(buf).length;
  }
  const budget = BUDGET[route] ?? BUDGET.default;
  rows.push({
    route,
    files: srcs.length,
    gzip: +(gz / 1024).toFixed(1),
    brotli: +(br / 1024).toFixed(1),
    budget,
    pass: gz / 1024 <= budget,
  });
}

const pad = (s, n) => String(s).padEnd(n);
console.log(
  pad('route', 18) + pad('files', 7) + pad('gzip', 10) + pad('brotli', 10) + pad('budget', 9) + 'result',
);
for (const r of rows) {
  console.log(
    pad(r.route, 18) +
      pad(r.files, 7) +
      pad(r.gzip + ' KB', 10) +
      pad(r.brotli + ' KB', 10) +
      pad(r.budget + ' KB', 9) +
      (r.pass ? 'PASS' : 'OVER'),
  );
}
