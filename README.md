# StarNova Labs — website

The corporate site for StarNova Labs Ltd, a Nigerian technology company building
education technology and proving it in real classrooms through Kids in Tech.

Tagline: **Architecting Human Agency**.

The redesign brief lives in [`docs/`](docs/) — `STARNOVA_REDESIGN_OVERVIEW.md` is
the analysis and `STARNOVA_EXECUTION_BATCHES.md` is the build plan. `docs/` is
reference material: read it, don't edit it.

## Stack

| Concern        | Choice                                                        |
| -------------- | ------------------------------------------------------------- |
| Framework      | Next.js 16 (App Router), React 19, TypeScript strict           |
| Styling        | Tailwind CSS v4, CSS-first — tokens in `src/app/globals.css`   |
| Animation      | GSAP 3 + ScrollTrigger + SplitText via `@gsap/react`           |
| Smooth scroll  | Lenis, driven by the GSAP ticker                               |
| Fonts          | Mango Grotesque (local) · Archivo · Inter · JetBrains Mono     |
| Icons          | `lucide-react`, sparingly, plus hand-drawn SVG components      |
| Email          | Resend, via a route handler (Batch 2)                          |
| Analytics      | `@vercel/analytics`, `@vercel/speed-insights`                  |
| Package manager| npm · Node 20+                                                 |

GSAP and Lenis are the **only** animation libraries. Do not add framer-motion,
react-spring, anime.js, AOS, locomotive-scroll or three.js. Do not add UI kits.

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write .
```

All three of `build`, `typecheck` and `lint` must pass before anything merges.

## Structure

```
src/app/                routes, globals.css, fonts.ts, api/
src/components/layout/  SiteHeader, MenuOverlay, SiteFooter, Chapter, Container, Grid, Section
src/components/motion/  MotionProvider, SmoothScroll, Loader, Curtain, TransitionLink,
                        RevealText, RevealImage, Parallax, Marquee, Magnetic, Counter
src/components/ui/      Button, Sticker, SectionLabel, Field, Arrow, StarGlyph, Logo, BrandGraphic
src/components/sections/ page-specific compositions
src/content/            every piece of copy, every number, every person
src/fonts/              Mango Grotesque, unmodified, plus its licence
src/lib/                gsap.ts, motion.ts, star.ts, content.ts, utils.ts
public/brand/           logo SVGs
public/images/          real photography only
```

Conventions: PascalCase components, one per file, named exports. Routes are
kebab-case. Pages and sections are server components — only leaf components that
animate or take input get `'use client'`, and a page file never does. Import
through the `@/` alias. No inline hex in components; use the tokens.

## Content and status flags

**All copy lives in `src/content`.** Components carry no hard-coded strings
beyond aria labels and utility text. Keeping copy there is also what will make a
Hausa translation a data change rather than a rewrite.

Anything that depends on a real-world fact carries a flag, and
`isPublishable()` in [`src/lib/content.ts`](src/lib/content.ts) decides whether a
production build may show it:

| Flag                        | Applies to                        |
| --------------------------- | --------------------------------- |
| `status: 'confirmed' \| 'pending'` | statistics, dates, names   |
| `consent: boolean`          | testimonials, images of people    |
| `permission: boolean`       | partners, client case studies     |
| `visible: boolean`          | products not yet announced        |

Production omits anything not cleared. Development shows it with a PENDING
badge, so gaps stay visible while we work. Never invent a number, a client, a
partner, a testimonial or a person. Never put a child's name, school, phone
number or register anywhere in this repository.

## Motion

`MotionProvider` resolves a mode of `full` or `reduced` from the footer toggle
(localStorage `snl-motion`), falling back to the OS `prefers-reduced-motion`
setting, and publishes it on `<html data-motion>`. An inline script in the
document head resolves it **before first paint**, so nothing flashes and nothing
has to remount after hydration.

Rules for anything animated:

- Every animated component implements its reduced variant **in the same change**.
- Every page must read completely with JavaScript disabled. Content belongs in
  the server HTML; animation only enhances it.
- Animate `transform`, `opacity` and `clip-path` only. Never animate `filter`,
  `width`, `height`, `top` or `left` on scroll.
- Every GSAP call lives inside a `useGSAP` scope so it cleans itself up.
- Import GSAP from `@/lib/gsap` and nowhere else — that is the single place
  plugins are registered, and it keeps GSAP out of server bundles.
- The only `requestAnimationFrame` loop is GSAP's ticker.

Timing tokens (easings, durations, staggers) live in
[`src/lib/motion.ts`](src/lib/motion.ts). Take values from there, not from
memory.

## Typography

Mango Grotesque is a free display face with real limits, and the licence forbids
modifying the files:

- Weights 400 and 600 only. `font-synthesis: none` is set globally.
- The files are used exactly as supplied — no subsetting, no WOFF2 conversion.
- It has no Hausa hooked letters (Ɓ ɓ Ɗ ɗ Ƙ ƙ Ƴ ƴ), no naira sign (₦) and no
  arrows. Those fall back to Archivo; Hausa display headlines use Archivo
  condensed (`.t-display-hausa`), and arrows and stars are SVG components,
  never characters.
- Reserve it for `t-display-l` and larger, plus counters. Everything smaller is
  Archivo. This is also what keeps the site from reading like the reference site
  that shares the face.

Exactly one `<h1>` per page.

## Brand

- The logo is always one of the supplied SVGs in `public/brand`. Never
  re-typeset it, never recolour it beyond the provided variants, never stretch
  it. The `#1A8DC3` and `#DD3614` variants are not used.
- Palette and type exactly as the tokens define them. No gradients, no
  glassmorphism, no particles, no glow, no blur, no drop shadows on images.
- Colour proportion per page: roughly 60% paper/white, 25% navy/ink, 12% blue,
  3% gold. One full-bleed blue chapter per page.
- Blue `#0074A9` is never text on navy — use `--color-blue-lit`. Gold is never
  text on paper.
- **Real photography only.** No stock photos, no stock illustrations, no
  AI-generated people. Where no real image exists, use `BrandGraphic`. Children
  appear only where the image entry records consent.
- Voice: plain, declarative, specific. Numbers over adjectives. No emoji.

## Accessibility and performance

WCAG 2.2 AA. One `h1` per page, real landmarks, a skip link, visible focus at
2px with 3px offset, full keyboard support, focus traps in overlays, Escape to
close, form errors linked by `aria-describedby`, touch targets of at least
44×44, and pausable motion.

Budget on a mid-range Android over 4G: LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms,
TBT ≤ 200ms, hero image ≤ 180 KB. Validate layouts at 360, 390, 768, 1024, 1280,
1440 and 1920, with no horizontal scroll at any width.

### JavaScript budget

| Route       | Budget                              |
| ----------- | ----------------------------------- |
| Home        | ≤ 215 KB gzip (≈ 190 KB brotli)     |
| Every other | ≤ 205 KB gzip                       |

These supersede the 180/170 KB figures in the original brief. The Next 16 and
React 19 client baseline is roughly 130 KB gzip on its own, and GSAP with
ScrollTrigger, SplitText and Lenis is another ~54 KB, so 180 KB is not reachable
while the motion system loads eagerly. Brotli is what Vercel actually serves, so
measure that too.

Batch 4 will attempt to defer ScrollTrigger and SplitText until after the loader,
which should return roughly 18 KB gzip to the first load. Until then, treat the
table above as the gate.

Measure with `npm run measure:js` after a build. It sums the gzip and brotli
size of every `<script src>` in each prerendered route's HTML — the files the
browser actually executes on a cold visit.

**As of Batch 2 the gate is not met:** Home is 253.8 KB gzip / 221.9 KB brotli
and the other routes are 250.2 KB / 218.6 KB. Batch 1 measured 251.1 and 249.7
by the same method, so all ten Home sections cost about 2.7 KB between them —
the overage is the shared framework and motion baseline, not page code. Deferring
the GSAP plugins is the only lever that moves it meaningfully.

## The lab

[`/lab`](src/app/lab/page.tsx) renders every primitive, the colour swatches with
their contrast ratios, the type scale and the glyph test. It is `noindex` and
calls `notFound()` in production builds, so it cannot leak into the live site.
Check it in both motion modes after touching anything in `components/motion` or
`components/ui`.

## Environment

Copy `.env.example` to `.env.local`. Never commit secrets, and never give a
server-only key the `NEXT_PUBLIC_` prefix.

| Variable               | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | canonical origin, used for `metadataBase`   |
| `RESEND_API_KEY`       | contact form delivery (Batch 2), server only|
| `CONTACT_TO_EMAIL`     | where contact submissions go (Batch 2)      |

## The contact endpoint

`POST /api/contact` takes JSON or a form post and sends through Resend.

It validates with [`src/lib/contact-validation.ts`](src/lib/contact-validation.ts),
the same module the form runs in the browser, so the two can never disagree.
Spam is accepted and silently dropped rather than refused — a filled honeypot or
a submission inside three seconds gets an ordinary success response, so a bot
learns nothing from it. A best-effort in-memory limiter allows five posts per IP
per ten minutes; it lives in one instance's memory, so swap in a durable limiter
(Vercel KV, Upstash) when traffic justifies it.

Message bodies are never logged. Only a send id and the topic are.

Without `RESEND_API_KEY` the endpoint answers `503 {error:'email_unavailable'}`
and the form shows a mailto fallback, so a missing key degrades rather than
loses the message. Without JavaScript the form posts directly and the handler
answers `303` back to `/contact?sent=1` or `/contact?error=…`, which the page
renders server-side. That is why `/contact` is the one dynamic route.

### Setting up Resend

1. Create an account at resend.com and add the domain `starnovalabs.com` under
   **Domains**.
2. Add the DNS records Resend shows you — an MX and a TXT for SPF on the
   sending subdomain, plus a TXT for DKIM — at whoever hosts the DNS for
   `starnovalabs.com`. Wait for Resend to show **Verified**.
3. Under **API Keys**, create a key with **Sending access** only, scoped to that
   domain. Copy it once; Resend will not show it again.
4. Put it in Vercel under **Settings → Environment Variables** as
   `RESEND_API_KEY`, for Production, Preview and Development. Mark it sensitive.
   Never give it the `NEXT_PUBLIC_` prefix.
5. Set `CONTACT_TO_EMAIL` (where enquiries land) and `CONTACT_FROM_EMAIL` (must
   be on the verified domain) alongside it.
6. Redeploy. Environment variables are read at build and run time, so an
   existing deployment will not pick them up on its own.

## Deployment

Vercel, with this folder as the project root. The default Next.js build settings
apply — `npm run build`, output handled by the framework preset. Set
`NEXT_PUBLIC_SITE_URL` for every environment, and the three Resend variables
above. Enable Web Analytics and Speed Insights in the project so the two
components in the root layout report.

## Git

Work on the branch named in the current batch (`feat/batch-0N-…`), never
directly on `main`. Small, meaningful commits. Never rewrite history on `main`.

`../starnovalabsweb` and `../../Starnovalabswebsitedesign` are read-only
references. Never edit, build or deploy them.
