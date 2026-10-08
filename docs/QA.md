# QA record — Batch 4

**Measured 8 October 2026** against a production build (`npm run build && npx next start -p 3133`)
on `http://localhost:3133`, Windows 11, Node 22.14. Commit: the Batch 4 polish
branch, `feat/batch-04-polish`.

Read the performance section with the local caveat in mind: these are lab
numbers from a dev machine, not Vercel edge delivery. The accessibility, SEO and
header results, by contrast, are properties of the build and carry over.

---

## 1. Lighthouse (mobile)

`npx lighthouse <url> --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate`

Targets: Perf ≥ 90, A11y 100, BP 100, SEO 100.

| Route | Perf | A11y | BP | SEO | LCP | TBT | CLS | FCP |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | **40** | **96** | **96** | 100 | 6.8 s | 3,470 ms | 0 | 2.3 s |
| `/about` | **48** | 100 | **96** | 100 | 5.0 s | 4,670 ms | 0 | 1.5 s |
| `/kids-in-tech` | **58** | 100 | **96** | 100 | 3.3 s | 5,570 ms | 0 | 1.6 s |
| `/products` | **64** | 100 | **96** | 100 | 2.0 s | 2,160 ms | 0.009 | 1.6 s |
| `/products/kitos` | **65** | 100 | **96** | 100 | 2.0 s | 2,980 ms | **0.108** | 1.5 s |
| `/studio` | **62** | 100 | **96** | 100 | 2.0 s | 3,360 ms | 0.009 | 1.6 s |
| `/partner` | **68** | 100 | **96** | 100 | 2.1 s | 2,520 ms | 0.003 | 1.4 s |
| `/contact` | **50** | 100 | **96** | 100 | 4.9 s | 1,710 ms | 0.007 | 1.5 s |

**SEO is 100 on every route.**

**Accessibility is 100 on seven of eight.** Home scores 96 for one reason: the
manifesto strip, covered in §3.

**Best practices is 96 everywhere for a single local-only reason.** The only
failing audit is `errors-in-console`, and the only console errors on any route
are these two:

```
Refused to execute script from 'http://localhost:3133/_vercel/insights/script.js'
  because its MIME type ('text/plain') is not executable
Refused to execute script from 'http://localhost:3133/_vercel/speed-insights/script.js'
  because its MIME type ('text/plain') is not executable
```

`/_vercel/insights/*` is injected by Vercel's platform and does not exist under
`next start`, so it 404s locally and returns `text/plain`. On Vercel these are
same-origin and served correctly — allowed by the CSP's `'self'`. **Re-run
Lighthouse against the deployment to confirm BP 100.** No application errors, no
hydration errors and no warnings appeared on any route (§5).

**Performance misses the ≥ 90 target on every route**, by a wide margin on home.
This is the batch's main unmet goal. The cause is main-thread work, not bytes
over the wire — for home:

| Main-thread category | Time |
| --- | --- |
| Style & Layout | 5,578 ms |
| Script evaluation | 5,195 ms |
| Other | 2,244 ms |
| Rendering | 494 ms |
| Script parse & compile | 367 ms |

Style & Layout exceeding script evaluation, together with a failing
`forced-reflow-insight`, points at repeated layout rather than at parsing cost:
SplitText runs with `autoSplit` on many elements and ScrollTrigger recalculates
alongside it, over a 1,430-element DOM. Lighthouse simulates a throttled mobile
CPU, which multiplies exactly this kind of work.

What is already right: **CLS is 0 to 0.009 on six routes**, and the **LCP element
is text** on home (`p.t-lead`), as required.

Two things to note rather than celebrate:
- `/products/kitos` has **CLS 0.108**, over the ≤ 0.05 target.
- Reaching Perf ≥ 90 needs a deliberate pass over motion cost. That conflicts
  with this batch's guardrail against re-timing Batches 1–3, so it is **not**
  attempted here and is listed as a follow-up in `docs/LAUNCH.md` §5.

---

## 2. First-load JS

`npm run measure:js` (gzip of every `<script src>` in each prerendered route).

Budgets from the batch brief: home ≤ 180 KB gzip, others ≤ 170 KB.

| Route | gzip | brotli | Budget | Result |
| --- | --- | --- | --- | --- |
| `/` | 258.4 KB | 225.6 KB | 180 KB | **OVER** |
| `/about` | 255.4 KB | 222.9 KB | 170 KB | **OVER** |
| `/kids-in-tech` | 256.3 KB | 223.7 KB | 170 KB | **OVER** |
| `/products` | 256.7 KB | 224.1 KB | 170 KB | **OVER** |
| `/products/kitos` | 254.9 KB | 222.5 KB | 170 KB | **OVER** |
| `/studio` | 254.9 KB | 222.5 KB | 170 KB | **OVER** |
| `/partner` | 254.2 KB | 221.9 KB | 170 KB | **OVER** |
| `/work` | 254.2 KB | 221.9 KB | 170 KB | **OVER** |
| `/privacy`, `/terms`, `/safeguarding` | 253.4 KB | 221.2 KB | 170 KB | **OVER** |

### Why, and why it was not "fixed"

`npm run analyze` breaks a route down by chunk. The floor, before a single line
of this site's own code:

| Chunk | gzip | Reducible? |
| --- | --- | --- |
| react-dom | 71.4 KB | No |
| Next App Router client runtime (two chunks) | 81.3 KB | No |
| GSAP core | 27.7 KB | No — the loader, curtain and buttons animate with it |
| ScrollTrigger | 17.6 KB | No — `SmoothScroll`, `SiteHeader` and `ChapterThemeReporter` are all in the root layout |
| **Floor** | **≈ 198 KB** | |

The floor alone is 18 KB over the home budget and 28 KB over the others, so
**no amount of page-level code-splitting can bring these routes inside 170/180 KB
while the stack is React 19 + Next 16 App Router + GSAP/ScrollTrigger/Lenis.**
The budget and the specified architecture are mutually incompatible.

Three things were checked before concluding that:

- **SplitText is only 3.6 KB gzip.** Splitting the `@/lib/gsap` barrel so the
  three legal pages avoid it would touch 25 files to save 3.6 KB on 3 routes.
  Not worth the regression risk; not done.
- **ScrollTrigger cannot be deferred per-route.** It is imported by root-layout
  components, so every route loads it regardless of whether it scrubs.
- **Deferring the motion controller** with `next/dynamic` would cut GSAP from
  the first load, but the loader is deliberately the first paint (there is
  critical CSS and a pre-hydration bootstrap script in `layout.tsx` to guarantee
  it). Deferring it would reintroduce the flash of page content that Batch 1 was
  built to prevent — a re-timing this batch's guardrail forbids.

**This needs a decision, not more engineering:** relax the budget to roughly
260 KB and keep the motion design, or drop part of the motion architecture.
Recorded as a follow-up in `docs/LAUNCH.md` §5. The budget numbers in
`scripts/measure-bundles.cjs` are left at the brief's values so the gap stays
visible in the report rather than being hidden behind a looser threshold.

---

## 3. Accessibility (WCAG 2.2 AA)

`npm run audit:a11y -- --base http://localhost:3133 --paths …` — axe-core over
every route, tags `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice`,
plus a heading-outline check.

| Route | axe violations |
| --- | --- |
| `/` | 1 (3 nodes — decorative strip, below) |
| `/about` | **0** |
| `/kids-in-tech` | **0** |
| `/products` | **0** |
| `/products/kitos` | **0** |
| `/studio` | **0** |
| `/work` | **0** |
| `/partner` | **0** |
| `/contact` | **0** |
| `/privacy` | **0** |
| `/terms` | **0** |
| `/safeguarding` | **0** |

### Fixed in this batch

The audit paid for itself immediately — it found that **no page's `h1` was in the
accessibility tree**. `SplitText` was called with `aria: 'hidden'`, which GSAP
applies to the element being split, not only to the split parts, so every split
`h1` was `aria-hidden="true"`. No screen reader announced any page's main
heading. The `aria-label` on the same element could not compensate, because
`aria-hidden` wins. Switching to `aria: 'none'` leaves the split lines in the
tree, so the heading is announced from its own content; dropping the now-
redundant `aria-label` also cleared a second violation, since `aria-label` is
prohibited on a `<p>`.

Contrast, all measured against rendered colours and fixed:

| Element | Was | Now |
| --- | --- | --- |
| `--color-muted` on paper | 3.16:1 | **4.95:1** (`#5a6f7e`) |
| Dark section label on blue | 3.33:1 | **4.81:1** (`white/95`) |
| Product & partner lead on blue | 4.49:1 | **4.87:1** (full opacity) |
| `HomeConnects` inactive steps | ~1.5–2:1 at 30% | **8.67:1** label / **3.18:1** numeral at 75% |

`/products` also jumped `h1 → h3`; the maturity strip's column labels are now
`h2`. **Every route has exactly one `h1` and no skipped levels.**

### The one remaining violation — a justified exception

Home, 3 nodes: the manifesto strip (`[data-strip-row]`) scrubs duplicated words
through `ink/10` at ~112 px, giving 1.23:1. It is kept as-is because it is
**pure decoration** under WCAG 1.4.3 (Incidental):

- the words are `aria-hidden="true"`;
- the strip root is `role="img"` with the full sentence as its `aria-label`, so
  assistive technology receives the content once, as text;
- the words duplicate copy already present elsewhere on the page.

axe flags it because the text is faintly visible to sighted users; darkening it
to 3:1 would destroy the designed ghost-text effect. Recorded rather than
changed.

### Checked by hand

- **Skip link** is the first focusable element on every route, `href="#main"`,
  and `#main` carries `tabindex="-1"` so focus lands there. Verified on
  `/about`.
- **Focus ring** is visible: `2px solid #0074a9`.
- **Reflow at 320 CSS px**: `documentElement.scrollWidth === 320` on `/`,
  `/kids-in-tech`, `/products`, `/contact` and `/privacy` — **no horizontal page
  scroll**. (Photo frames contain images wider than their box, but they are
  `overflow-hidden` and do not scroll the page.)
- **CSP is live**: an attempt to load a route in an iframe was refused, which is
  `frame-ancestors 'none'` working.

### Not verified — needs a human and real hardware

These are in the brief but cannot be done from this environment. They remain
open:

- [ ] Screen-reader smoke test: NVDA + Chrome, VoiceOver + Safari. **The `h1`
      fix above is exactly the kind of thing that needs confirming by ear.**
- [ ] 200% and 400% browser zoom (only the 320 px reflow equivalent was checked).
- [ ] Keyboard-only walkthrough of *every* route, including focus after curtain
      transitions and the overlay focus trap.
- [ ] OS reduced-motion and the footer toggle, on every route.
- [ ] Target sizes measured by hand (axe's `target-size` rule reported clean).
- [ ] Nothing flashes more than 3×/s.

---

## 4. Console

`node scripts/console-audit.mjs` on `/`, `/about`, `/kids-in-tech`, `/products`,
`/contact`:

| Route | Errors | Warnings |
| --- | --- | --- |
| all five | 4 (all the two Vercel endpoints above, each a 404 plus a MIME refusal) | **0** |

**No application errors, no hydration errors, no React warnings.** The four are
the local-only `/_vercel/*` requests described in §1.

---

## 5. SEO, metadata and structured data

Verified against the running production build:

| Check | Result |
| --- | --- |
| Canonical on every route | ✅ absolute, e.g. `https://www.starnovalabs.com/products/kitos` |
| Unique title + description per route | ✅ via `buildMetadata()` |
| `/robots.txt` | ✅ 200, allows all, disallows `/lab` and `/api/`, names the sitemap |
| `/sitemap.xml` | ✅ 200 `application/xml`, 14 routes |
| Sitemap excludes `/lab`, SkillStack (noindex) and unpublished work | ✅ |
| `/manifest.webmanifest` | ✅ 200 `application/manifest+json` |
| `/opengraph-image` | ✅ 200 `image/png`, 39.9 KB |
| `/kids-in-tech/opengraph-image` | ✅ 200 `image/png`, 32.4 KB |
| `/products/kitos/opengraph-image` | ✅ 200 `image/png`, 28.6 KB |
| JSON-LD present | ✅ Organization everywhere; EducationalOrganization + 3 Courses on `/kids-in-tech`; SoftwareApplication on each platform; BreadcrumbList on nested routes |
| `/mission` → `/about#mission` | ✅ **308** |
| `/services` → `/studio` | ✅ **308** |
| One `h1` per page, no skipped levels | ✅ all 12 routes |

Not done: **Google Rich Results Test** needs a public URL, so run it against the
deployment. The markup is present and valid JSON; only Google's own validation
is outstanding.

---

## 6. Images and fonts

| Check | Result |
| --- | --- |
| Only Mango preloaded | ✅ Regular + SemiBold `.woff` only; Archivo, Inter and JetBrains Mono are `display: swap`, `preload: false` |
| All photography via `next/image` | ✅ through `Photo`, `PhotoBand`, `TeamCard`, each with `sizes` and a generated `blurDataURL` |
| No image > 250 KB delivered | ✅ served as AVIF — hero is **99 KB** at `w=1920`, **16 KB** at `w=640`; the heaviest other image is 180 KB at `w=1920` |
| LCP element is text or a priority image | ✅ text (`p.t-lead`) on home |

38 source files in `public/images` exceed 250 KB, which does not matter for
delivery — `next/image` re-encodes them — but it does bloat the repository.
Worth a source-side optimisation pass at some point.

The heaviest non-hero image is 180 KB at `w=1920`, over the brief's ≤ 120 KB
"others" figure at desktop width; at the widths phones actually request it is
16–38 KB.

---

## 7. Security headers

Served on every route (`curl -D -`), verified with the site still rendering
correctly under the policy:

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self'; font-src 'self'; connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `X-Content-Type-Options` | `nosniff` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

`script-src` carries `'unsafe-inline'` deliberately. The App Router emits inline
bootstrap scripts on static pages, and a nonce must be generated per request,
which would make every page render dynamically and cost the static output.
`'unsafe-eval'` is **not** permitted. Only `/contact` and `/api/contact` are
dynamic.

Not done: **securityheaders.com** needs a public URL — run it on the deployment.

---

## 8. Cross-browser and device matrix

**Not done.** This environment has one browser engine (Chromium, headless) and
no physical devices. Every row below is still open and needs a person:

| Target | Status |
| --- | --- |
| Chrome, mid-range Android (e.g. Samsung A-series), mobile data | ⬜ |
| Safari, iPhone | ⬜ |
| Chrome / Edge / Firefox, Windows desktop | ⬜ Chromium only, headless |
| Safari, macOS | ⬜ |
| Widths 360 / 390 / 768 / 1024 / 1280 / 1440 / 1920 | ⬜ only 320 and 1440 checked |

Specifically worth a human eye, since they are motion- and engine-sensitive:
loader timing, curtain transitions, header inversion, pinned sections, marquee
pausing, and the hero video on iOS Safari.

The contact form has **not** been exercised end-to-end against a real Resend
key; `RESEND_API_KEY` is not set in this environment. See `docs/LAUNCH.md` §1.

---

## 9. Content still blocked

No `docs/content-updates.md` was supplied, so the content swap-in of the brief's
§1 could not be applied. Everything unconfirmed stays hidden in production by
design, so this does not block a launch — it just means those sections are
absent:

- `src/content/stats.ts` — all five figures `pending`, no as-of dates.
- `src/content/values.ts` — "to be ratified".
- `src/content/team.ts` — four programme members `pending`, one name spelling
  unconfirmed ("Faruk Yusuf").
- `src/content/testimonials.ts` — `consent: false`, so hidden.
- `src/content/work.ts` — the one case study is `permission: false`, so `/work`
  shows its empty state.
- `src/content/legal.ts` — all three pages `reviewed: false`, so each shows the
  "being finalised" notice instead of its draft.
- NurAla has no production URL (`src/content/products.ts`).
- Second phone number, opening hours and KITOS stage wording unconfirmed.

Images and the two video loops **are** in place and wired up.

---

## How to re-run

```bash
npm run build
npx next start -p 3133

npm run measure:js                                   # first-load JS vs budget
npm run analyze -- /about                            # one route, chunk by chunk
npm run audit:a11y -- --base http://localhost:3133 --paths /,/about,/kids-in-tech
node scripts/console-audit.mjs --base http://localhost:3133 --paths /,/about
```

On Git Bash, prefix the script commands with `MSYS_NO_PATHCONV=1` or a bare `/`
in `--paths` is rewritten into a Windows path.
