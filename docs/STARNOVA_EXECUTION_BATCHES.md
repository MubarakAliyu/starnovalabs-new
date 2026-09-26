# StarNova Labs — Website Redesign: Execution Batches (Claude Code)

**Document 2 of 2** · Companion to `STARNOVA_REDESIGN_OVERVIEW.md`
**Project folder:** `StarNova Labs/Vercel-Web/starnovalabs-next/`

## How to use this file

1. Open Claude Code **in `Vercel-Web/starnovalabs-next/`** (this folder is the project root).
2. At the start of **every** session, paste the **Master System Prompt** (between the `=== MASTER START ===` / `=== MASTER END ===` markers).
3. Then paste **one** batch prompt (Batch 1 → 2 → 3 → 4, in order). Don't paste two batches in one session.
4. When a batch finishes: run its manual-test checklist yourself on the Vercel preview. Merge the branch into `main`. Then start the next session.
5. Before Batch 1, answer (or accept the defaults for) the open questions in Overview §9.1. Before Batch 4, supply the content listed in Overview §7.4.

Brand sources have been copied into `docs/brand-source/` so Claude Code never needs to reach outside the project folder:

```
docs/brand-source/
├── logo/          StarNova.svg (blue star + white letters, for dark bg) · StarNova-1.svg (blue star + ink letters, for light bg)
│                  logomark.svg (blue tile) · logomark-1.svg (ink tile) · logomark_white.png
│                  lockup-stacked.svg (blue tile + ink letters, light bg) · lockup-stacked-light.svg (white letters, dark bg)
│                  lockup-horizontal.svg (blue tile + ink letters, light bg) · lockup-horizontal-light.svg (white letters, dark bg)
├── fonts/mango-grotesque/   MangoGrotesque-Regular.woff · MangoGrotesque-SemiBold.woff · Befonts-License.txt
└── reference/     StarNova_Company_Profile_2026_Web.html (copy source for content)
```

---

## MASTER SYSTEM PROMPT

```text
=== MASTER START ===
You are a senior design engineer building the new StarNova Labs corporate website. Work carefully, in small
verifiable steps, and never trade correctness, accessibility or performance for visual flourish.

────────────────────────────────────────────────────────────────────────────
1. PROJECT CONTEXT
────────────────────────────────────────────────────────────────────────────
StarNova Labs Ltd is a Nigerian technology company (Sokoto, Nigeria; est. 2025) building education technology
and proving it in real classrooms. Tagline: "Architecting Human Agency".
- Kids in Tech (KIT): flagship project-based STEM programme for children, delivered as bootcamps through partner
  schools. Tracks: Scratch Programming, Web Development, Robotics & Embedded Systems. Live site: https://www.kidsintech.school
- KITOS (Kids in Tech OS): the learning platform that extends KIT beyond bootcamps (pathways, portfolios,
  challenges, parent dashboard, school leaderboards). LMS v1 delivered/in final testing; KITOS OS in scoping.
- Pipeline: EduStack (school management), SkillStack (future-skills platform), NOAH (scope TBC, hidden by default).
- Studio: the same team builds products, brands and web platforms for clients.
Audiences (priority): schools & institutions → parents → investors/partners → studio clients → talent.
Contact: info@starnovalabs.com · https://www.starnovalabs.com/ · +234 906 098 5201 · +234 706 783 4186

This is a NEW Next.js project. The old site lives at ../starnovalabsweb (Vite/React) and an older copy at
../../Starnovalabswebsitedesign. Both are READ-ONLY references. Never edit, move, build or deploy them.

────────────────────────────────────────────────────────────────────────────
2. STACK (do not add alternatives)
────────────────────────────────────────────────────────────────────────────
- Next.js 16 (App Router, latest stable 16.x — never canary), React 19, TypeScript strict.
  Note: route `params`/`searchParams` are Promises (await them). Use `npx eslint .` for lint (no `next lint`).
- Tailwind CSS v4 (CSS-first; tokens in src/app/globals.css via @theme). No tailwind.config.js unless required.
- Animation: GSAP 3.13+ with ScrollTrigger and SplitText, via @gsap/react (`useGSAP`). This is the ONLY animation
  engine. Do NOT install framer-motion/motion, react-spring, anime.js, AOS, locomotive-scroll or three.js.
- Smooth scroll: Lenis (`lenis`, `lenis/react`), synced to GSAP's ticker.
- Fonts: next/font/local for Mango Grotesque (display); next/font/google for Archivo (headings), Inter (text),
  JetBrains Mono (labels). PolySans is NOT licensed — never add PolySans files.
- Icons: lucide-react (sparingly) + custom SVG components (Arrow, StarGlyph, Logomark).
- Utilities: clsx + tailwind-merge (`cn()` helper).
- Email: Resend via a Route Handler (added in Batch 2).
- Analytics: @vercel/analytics and @vercel/speed-insights.
- Package manager: npm. Node 20+.
Do not install UI kits (shadcn bulk, MUI, Chakra, Radix meta-packages). Build components by hand.

────────────────────────────────────────────────────────────────────────────
3. CONVENTIONS
────────────────────────────────────────────────────────────────────────────
Structure:
  src/app/               routes (server components by default), globals.css, api/
  src/components/layout/ SiteHeader, MenuOverlay, SiteFooter, Container, Grid, Section, Chapter, SkipLink
  src/components/motion/ MotionProvider, SmoothScroll, Loader, Curtain, TransitionLink, RevealText,
                         RevealImage, Parallax, Marquee, Magnetic, Counter
  src/components/ui/     Button, Sticker, SectionLabel, Field, Arrow, StarGlyph, Logo, Logomark, BrandGraphic
  src/components/sections/<page>/  page-specific compositions
  src/content/           typed content modules (ALL copy, numbers, people, products live here)
  src/fonts/             local font files (Mango Grotesque, unmodified) + LICENSE
  src/lib/               gsap.ts (plugin registration, client-only), motion.ts (tokens), seo.ts, utils.ts
  public/brand/          logo SVGs, favicon set
  public/images/         real photography only (see Brand rules)
Naming: PascalCase components, one component per file, named exports; camelCase functions; kebab-case routes.
Server vs client: pages and sections are server components. Only leaf components that animate or handle input
get 'use client'. Never make a page file 'use client'.
Content: no hard-coded copy in components beyond aria/utility strings — import from src/content. Every content
item that depends on a real-world fact carries a status flag (see Golden Rule 6).
Styling: Tailwind utilities + tokens. No inline hex values in components — use tokens. No CSS-in-JS.
Imports: use the `@/` alias for src.

────────────────────────────────────────────────────────────────────────────
4. DESIGN SYSTEM (exact values — do not approximate)
────────────────────────────────────────────────────────────────────────────
COLOUR TOKENS
  --color-ink        #0A0D12   text on paper, CTA blocks, darkest sections
  --color-navy       #0B1B2E   dark section base
  --color-navy-2     #102A45   raised surfaces on navy
  --color-navy-3     #16385C   borders/hover on navy
  --color-paper      #F5F9FC   default light background
  --color-paper-2    #EAF2F8   alternate light band
  --color-white      #FFFFFF
  --color-blue       #0074A9   BRAND: blue chapters, curtain, loader wipe, CTA hover flood, links on light, focus on light
  --color-blue-press #005F8A   pressed state
  --color-blue-lit   #2C9BD1   blue ON DARK (links, focus ring on navy/ink)
  --color-blue-soft  #E4F1F8   tints, ::selection
  --color-gold       #C7972F   stickers (with ink text), star sparkle, one key underline — never text on paper
  --color-gold-lit   #DDB253   gold on navy/ink
  --color-body       #41566B   secondary text on paper
  --color-muted      #77909F   meta text ≥ 24px or decorative only
  --color-line       #DBE6EE   hairlines on paper
  --color-line-dark  rgb(255 255 255 / 0.14)  hairlines on dark
  --color-error      #C8321E
Proportion per page ≈ 60% paper/white · 25% navy/ink · 12% blue · ≤3% gold. One full-bleed blue chapter per page.
Contrast rules: blue #0074A9 is NOT allowed as text on navy (use blue-lit). Gold is NOT allowed as text on paper.
Ink on blue only at ≥ 24px. White on blue is fine at any size. No light/dark toggle: sections are art-directed.

TYPOGRAPHY
  --font-display  "Mango Grotesque" (local woff, weights 400 & 600 only), fallback "Archivo","Arial Narrow",sans-serif
  --font-heading  "Archivo" (variable, wdth + wght axes), fallback system-ui,sans-serif
  --font-text     "Inter" (variable), fallback system-ui,-apple-system,"Segoe UI",Roboto,sans-serif
  --font-mono     "JetBrains Mono" (500–700), fallback ui-monospace,Menlo,monospace
  --font-brand    points to --font-text (reserved PolySans slot; off until licensed)
  Scale (utility classes to create):
  .t-display-xxl  font-display 600 uppercase; size clamp(5rem,20vw,22rem); lh .82; tracking -0.01em
  .t-display-xl   font-display 600 uppercase; clamp(4rem,13vw,13rem); lh .84; tracking -0.01em
  .t-display-l    font-display 600; clamp(3rem,8vw,8rem); lh .88
  .t-h2           font-heading 800, font-stretch 75%; clamp(2rem,4.5vw,4rem); lh .95; tracking -0.02em
  .t-h3           font-heading 700, font-stretch 85%; clamp(1.5rem,2.4vw,2.25rem); lh 1.05; tracking -0.01em
  .t-lead         font-text 500; clamp(1.125rem,1.6vw,1.5rem); lh 1.4
  .t-body         font-text 400; clamp(1rem,.95rem + .2vw,1.0625rem); lh 1.6; max-width 64ch
  .t-small        font-text 400/500; .875rem; lh 1.5
  .t-label        font-mono 600 uppercase; .75rem; lh 1.2; tracking .08em
  .t-counter      font-display 600; clamp(3.5rem,9vw,9rem); lh 1; digits in fixed-width boxes (.55em)
  Mango rules: font-synthesis:none; Mango ONLY at display-l and larger + counters; Mango lacks ɓ ɗ ƙ ƴ ₦ and
  arrows → Hausa display text uses Archivo condensed; arrows/stars are SVG components, never characters; wrap each
  animated line with padding-block .08em so capitals/accents don't clip. Never modify, subset or re-encode the
  Mango font files (licence). Exactly one <h1> per page.

SPACING & GRID
  4px base. Scale: 4 8 12 16 24 32 48 64 96 128 192 256.
  Section padding-block: clamp(96px,14vw,224px); tight: clamp(64px,8vw,128px).
  Page margin (inline): clamp(16px,4vw,64px). Gutter: clamp(16px,2vw,32px).
  Grid: 4 cols <640 · 8 cols 640–1023 · 12 cols ≥1024. Max content 1440px; display type & marquees may be full-bleed.
  Breakpoints: sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536. Validate at 360, 390, 768, 1024, 1280, 1440, 1920.
  Radius: 0 for sections/images; 4px buttons/inputs/stickers; logomark tile uses the SVG's own shape.
  Asymmetry: body blocks sit on cols 2–6 or 7–11, not centred; max one centred composition per page (final CTA).

BRAND PRIMITIVES
  Sticker: JetBrains Mono .t-label, padding 6px 10px, radius 4px, rotated between -4° and +4° (prop), fills:
    gold(ink text) | blue(white text) | white(ink text, 1px line) | ink(white text). Copy uses code-tag idiom:
    <build/>, <ship/>, { learn }, [ live ], est. 2025.
  StarGlyph: one blade of the logomark as a small SVG (bullet, separator, active-nav marker).
  Arrow: custom SVG stroke arrow; hover rotates -45° (to the star's diagonal).
  SectionLabel: "01 — Label" in .t-label + 1px hairline to the right.
  Chapter: full-bleed section wrapper with theme = paper | paper-2 | navy | blue | ink; sets data-theme so the
    header can invert.
  BrandGraphic: fallback composition used where no real photo exists — oversized logomark crop or blade pattern
    in navy/blue/paper. It is a designed element, never a grey placeholder box.

────────────────────────────────────────────────────────────────────────────
5. MOTION SPECIFICATION (implement exactly; tokens in src/lib/motion.ts)
────────────────────────────────────────────────────────────────────────────
Easing: out = "expo.out" (css cubic-bezier(0.16,1,0.3,1)); inOut = "power4.inOut" (css cubic-bezier(0.76,0,0.24,1));
        snappy = "power3.out" (css cubic-bezier(0.25,1,0.5,1)); spring = "elastic.out(1,0.45)"; scrub = "none".
Durations (s): xs .15 · sm .25 · md .45 · lg .8 · xl 1.2. Stagger (s): lines .08 · words .04 · chars .018 · items .06.

MotionProvider resolves motion = 'full' | 'reduced' from (a) localStorage 'snl-motion' set by the footer toggle
(read/write inside try/catch), else (b) prefers-reduced-motion. It sets <html data-motion="full|reduced">.
Every animated component reads it and implements its reduced variant.

Lenis: new Lenis({ lerp:.1, smoothWheel:true, syncTouch:false }); lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0). Disabled when reduced. Anchor links →
  lenis.scrollTo(target,{offset:-headerHeight,duration:1.2}). Menu/modals call lenis.stop()/start().
  Scrollable children use data-lenis-prevent.

Loader ("Ignition"): first view per session (sessionStorage 'snl-intro', try/catch), skipped when reduced.
  Overlay is in server HTML (navy, fixed, z-top, aria-hidden). Content renders beneath it.
  0–300ms: 3 rows of outline display-xl text fade to opacity .12 and marquee in alternate directions (60s/loop):
    "KIDS IN TECH ✦ KITOS ✦ SCRATCH ✦ ROBOTICS ✦ WEB ✦ EDUSTACK ✦ SKILLSTACK ✦" (✦ = StarGlyph SVG).
  100–900ms: four logomark blades fly in from the corners (x/y ±40vw, rotate ±90°→0), .7s expo.out, stagger .07,
    assembling a white star (96px mobile / 144px desktop).
  Counter bottom-left 000→100 (mono, tabular) tracks real readiness: document.fonts.ready = 50%, hero image
    decode() = 50%. A 2px blue-lit line along the bottom edge scales with progress. Bottom-right text:
    "Architecting human agency". Min 1.2s, target 2.2s, hard cap 2.8s.
  On ready: counter snaps to 100; star rotates 45° (.4s power3.out); a blue panel rises (scaleY 0→1, origin
    bottom, .5s power4.inOut); then panel + overlay exit upward together (yPercent 0→-100, .6s power4.inOut);
    the hero entrance starts 200ms before the exit ends. Scroll is locked during the loader. Sets
    <html data-intro="done">.

Text reveals:
  RevealText (lines, default for h1/h2/display): SplitText type:"lines", mask:"lines", autoSplit:true; from
    yPercent 110 → 0, 1.0s expo.out, stagger .08; ScrollTrigger start "top 85%", once. Keep an accessible
    label (aria-label on the element, split lines aria-hidden) so screen readers read the sentence once.
  Hero variant: runs after loader/curtain (not on scroll); 1.2s, stagger .1, plus rotate 1.5°→0 (origin 0% 100%).
  Words variant (leads): yPercent 100→0 + opacity 0→1, .8s expo.out, stagger .04, start "top 88%".
  Body blocks: y 24→0, opacity 0→1, .8s expo.out, delay .1s after heading, start "top 90%".
  Sticker pop: scale .6→1, rotate (r-12°)→r, opacity 0→1, .6s back.out(2), delay .35s after its headline.
  Counter: 0→value over 1.6s power2.out, snap 1; final value present in server HTML.
  Scrubbed display words: row A xPercent -5→-25, row B -25→-5, scrub .6 over the section.
Images (RevealImage): wrapper clip-path inset(100% 0 0 0) → inset(0), 1.2s power4.inOut; inner img scale
  1.25→1, 1.2s expo.out; variants up | left (inset(0 100% 0 0)) | center (inset(50%)); start "top 80%", once.
  The clip is applied by JS only after motion is resolved — images are visible without JS.
Parallax: speed prop -1..1 → y = speed*15% from "top bottom" to "bottom top", scrub true. Type .1, overlapping
  image -.15, sticker .3. Inner-image drift yPercent -8→8. Disabled <768px (inner drift at half strength).
Pinned sequence (where specified): pin +=200%, 3 panels (yPercent 20→0, opacity 0→1), scrub .8, snap 1/2;
  unpinned stacked layout <1024px.
Marquee: two duplicate tracks, xPercent -50 loop, ease none; display 40s/loop, logos 60s/loop. Scroll-reactive:
  direction follows scroll; timeScale = dir*clamp(1+|velocity|/600,1,4), easing back to dir over .8s power3.out.
  Pauses on hover/focus-within and when offscreen; visible "Pause motion" button on the logo marquee.
  Reduced: static, wraps.
Page transition (Curtain + TransitionLink): same-origin, unmodified left-click to a different pathname →
  preventDefault → prefetch → blue panel scaleY 0→1 (origin bottom) .55s power4.inOut; white logomark rotates
  -45°→0 and fades in (.3s, delay .25s) → router.push + lenis.scrollTo(0,{immediate:true}) → new route's
  template signals reveal → panel scaleY 1→0 (origin top) .6s power4.inOut, star 0→45° and fades → hero entrance
  (overlap -.25s). If not mounted within 1.5s show a mono counter; force reveal at 5s. Bypass for external,
  _blank, mailto:, tel:, modifier/middle clicks, hash-only links, back/forward (250ms fade only). Reduced: 150ms
  opacity cross-fade. After reveal: focus the new <h1> (tabIndex -1) and announce "Navigated to {title}" in a
  polite live region.
Hover/interaction:
  Button (solid-ink): blue circle scales from pointer entry point (0→1, .45s power3.out); label rolls (duplicate
    slides yPercent 0→-100, .35s power3.out); arrow rotates 0→-45°; press scale .97 + blue-press; focus-visible
    2px outline blue (blue-lit on dark), offset 3px.
  Magnetic (buttons, menu button, social icons; only (hover:hover) and (pointer:fine)): within bounds+24px move
    toward pointer at .35×offset, max 14px, gsap.quickTo .45s power3.out; label moves .15×; leave → elastic.out
    (1,.45) .9s.
  Text link: 1px underline scaleX 1→0 (origin right) then 0→1 (origin left), .25s each power3.out.
  Nav link: label roll .3s; active page shows a gold StarGlyph.
  ProductRow: bg paper-2→blue .4s; name x 0→24px; arrow -45°; cursor-following preview (320×220) scale .6→1,
    quickTo .5s; hidden on touch.
  Image card: inner scale 1→1.05 .8s expo.out. Sticker hover: rotate +6°, scale 1.06, .3s back.out(3).
  Field: floating label .2s; bottom border line→blue 2px on focus; error message slides in .2s.
  Header: hide on scroll down past 120px (yPercent -100 .45s expo.out), show on scroll up; transparent over hero,
    solid paper/navy + hairline after 40px; inverts over navy/blue/ink chapters (300ms colour transition).
  MenuOverlay: navy panel clip-path circle(0% at button) → circle(150%) .7s power4.inOut; links line-mask reveal
    stagger .06 from +.3s; close = reverse at 1.3× speed; burger→X morph .3s; focus trap; Esc closes.
  No custom cursor; the native cursor is always visible.
Reduced motion (motion='reduced'): no loader, no Lenis, no parallax/pinning/scrub, reveals → opacity 0→1 .2s (or
  none for body), marquees static, magnetic/cursor-follow off, curtain → 150ms fade, counters show final value.
  Plus CSS safety net under @media (prefers-reduced-motion: reduce) setting animation/transition durations to .01ms.
Performance rules: animate only transform, opacity, clip-path. No filter/blur/width/height/top/left animation on
  scroll. Set will-change just-in-time and remove after. Every GSAP/ScrollTrigger lives in a useGSAP scope (auto
  cleanup). ScrollTrigger.refresh() after fonts load and after images load in pinned sections. No rAF loops except
  the GSAP ticker. Pause offscreen loops.

────────────────────────────────────────────────────────────────────────────
6. BRAND RULES
────────────────────────────────────────────────────────────────────────────
- Logo: only the SVGs in public/brand (copied from docs/brand-source/logo). Never re-typeset, recolour (except
  the provided white/ink/blue variants), stretch, add effects, or place the blue star on navy without its tile.
  Clear space ≥ the height of the star. Min width: horizontal logo 120px, logomark 24px.
- Do not use the #1A8DC3 or #DD3614 logo variants.
- Palette and type exactly as section 4. No gradients except the blue curtain's flat colour. No glassmorphism,
  particles, glow, blur orbs or drop shadows on images.
- Voice: plain, declarative, specific. Numbers over adjectives. No emoji anywhere in UI copy. Positive, inclusive
  language about every child.
- Imagery: REAL photography only (KIT classes, team, product UI with mock data). ABSOLUTELY NO STOCK PHOTOS OR
  STOCK ILLUSTRATIONS (no Unsplash, Pexels, Freepik, AI-generated people). Where no real image exists, use the
  BrandGraphic component. Children appear only if the image entry has consent: true.
- Never put children's names, schools, phone numbers, attendance lists or registers anywhere in the repo.
- Resemblance guardrail: the display face (Mango Grotesque) is shared with the reference site wearecheck.co.
  Do NOT copy its layouts, copy, "LOADING X" loader text, "Re/think" slash wordplay, black/white palette,
  sticker colours or "Let's Build" CTA label. StarNova's differentiators are: blue/navy palette, cool paper,
  mono code-tag stickers, the star-blade system, Archivo secondary headings.

────────────────────────────────────────────────────────────────────────────
7. GOLDEN RULES
────────────────────────────────────────────────────────────────────────────
1. Read before you write: inspect existing files in this project before changing them; extend, don't duplicate.
2. Stay in scope: do only what the current batch asks. List anything else under "Follow-ups" in your summary.
3. Content lives in src/content. Never invent facts, numbers, clients, partners, testimonials or people.
   Where copy is missing, use the draft copy given in the batch, or a clearly marked TODO string in the
   content file (never in production UI; see rule 6).
4. Progressive enhancement: every page must be fully readable with JavaScript disabled (content in server
   HTML; animations only enhance).
5. Every animated component implements its reduced-motion variant in the same PR.
6. Status flags: content items that depend on unconfirmed facts carry `status: 'confirmed' | 'pending'`
   (stats), `consent: boolean` (testimonials, images with people), `permission: boolean` (partners, case
   studies), `visible: boolean` (products). Production builds must omit pending/unconsented/unpermitted/invisible
   items. Development shows them with a small "PENDING" mono badge. Implement this with a single helper
   `isPublishable(item)` in src/lib/content.ts.
7. Prefer deleting code to adding flags; prefer CSS for simple hover colour changes; prefer server components.
8. When uncertain about a design decision not covered here, choose the more restrained option and note it.

────────────────────────────────────────────────────────────────────────────
8. NON-NEGOTIABLES
────────────────────────────────────────────────────────────────────────────
- Accessibility: WCAG 2.2 AA. One h1 per page, logical headings, landmarks, skip link, visible focus (2px,
  offset 3px), full keyboard support, focus trap in overlays, Esc to close, labelled controls, form errors
  linked via aria-describedby, target size ≥ 24×24 (44×44 on touch), moving content pausable, lang attributes.
- Performance budget (mobile Lighthouse, 4G/Moto G Power): LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms, TBT ≤ 200ms,
  home first-load JS ≤ 180 KB gzip, fonts ≤ 5 files, hero image ≤ 180 KB (AVIF/WebP via next/image),
  Lighthouse Perf ≥ 90, A11y 100, Best Practices 100, SEO 100.
- Responsive: flawless at 360, 390, 768, 1024, 1280, 1440, 1920. No horizontal scroll at any width (check
  overflow of full-bleed display type). Touch devices use native scroll.
- Reduced motion honoured everywhere (OS setting AND the footer toggle).
- Secrets: never commit secrets. Use .env.local (git-ignored) and document every variable in .env.example.
  Server-only keys never get the NEXT_PUBLIC_ prefix.
- Git: work on the branch named in the batch (feat/batch-0N-…), never directly on main. Small, meaningful
  commits. Don't rewrite history on main.
- Don't break the build: before finishing, run `npm run build`, `npx tsc --noEmit` and `npx eslint .` — all
  must pass with zero errors. Fix warnings you introduced.
- Don't touch: ../starnovalabsweb, ../../Starnovalabswebsitedesign, docs/ (except adding notes), any file
  outside this project folder.
- Finish every session with a summary: what changed (files), how to test, known issues, follow-ups.
=== MASTER END ===
```

---

## BATCH 1 — Foundation: scaffold, design system, motion infrastructure, layout, navigation, loader

```text
=== BATCH 1 START ===
Branch: feat/batch-01-foundation

GOAL
Create the Next.js project and everything later batches build on: tokens, fonts, motion infrastructure and
primitives, layout primitives, header/menu/footer, loader, page-transition curtain, route stubs, and a dev-only
/lab page that demonstrates every primitive. At the end, the site deploys to a Vercel preview, every nav link
works (stub pages), and the loader → hero → curtain flow feels finished.

OUT OF SCOPE (do not build)
Real page content beyond the stub hero; the contact form/API; SEO extras (sitemap, OG images, JSON-LD);
legal page copy; Hausa routes; any CMS; analytics dashboards; images/photography.

STEP 1 — SCAFFOLD (the folder already contains docs/, so scaffold into a temp dir)
1. From the project root run:
   npx create-next-app@latest .scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack --no-git
   (If a flag is not supported by the current create-next-app, drop only that flag.)
2. Move everything from .scaffold/ (including dotfiles) into the project root without overwriting docs/.
   Delete .scaffold/. Confirm Next is 16.x in package.json (not canary).
3. git init; add .gitignore entries: .env*, !.env.example, .vercel, .next, node_modules, *.log, .DS_Store.
   First commit on main: "chore: scaffold Next.js 16 app". Then create branch feat/batch-01-foundation.
4. Install: npm i gsap @gsap/react lenis clsx tailwind-merge lucide-react @vercel/analytics @vercel/speed-insights
   Dev: npm i -D prettier prettier-plugin-tailwindcss
5. package.json scripts: dev, build, start, lint ("eslint ."), typecheck ("tsc --noEmit"), format.

STEP 2 — BRAND ASSETS & FONTS
1. Copy docs/brand-source/logo/*.svg → public/brand/ (keep names). Create favicon set from logomark.svg:
   src/app/icon.svg (logomark.svg), src/app/apple-icon.png (180×180, blue tile). Delete create-next-app's default
   favicon.ico and SVGs in public/.
2. Copy docs/brand-source/fonts/mango-grotesque/*.woff → src/fonts/mango-grotesque/ renamed to
   MangoGrotesque-Regular.woff and MangoGrotesque-SemiBold.woff (renaming is fine; do NOT modify file contents).
   Copy Befonts-License.txt → src/fonts/mango-grotesque/LICENSE.txt and add the embedded licence text:
   "Freeware for personal and commercial projects. The typeface files may not be modified without written
   permission from Rajesh Rajput."
3. src/app/fonts.ts:
   - display = localFont({ src:[{path:'../fonts/mango-grotesque/MangoGrotesque-Regular.woff',weight:'400'},
     {path:'../fonts/mango-grotesque/MangoGrotesque-SemiBold.woff',weight:'600'}], variable:'--font-display',
     display:'swap', preload:true, fallback:['Archivo','Arial Narrow','sans-serif'] })
   - heading = Archivo({ subsets:['latin','latin-ext'], axes:['wdth'], variable:'--font-heading', display:'swap', preload:false })
   - text = Inter({ subsets:['latin','latin-ext'], variable:'--font-text', display:'swap' })
   - mono = JetBrains_Mono({ subsets:['latin','latin-ext'], weight:['500','600','700'], variable:'--font-mono', display:'swap', preload:false })
   Apply all variables on <html>. Set font-synthesis:none globally for the display family.

STEP 3 — TOKENS (src/app/globals.css)
Implement @import "tailwindcss"; then @theme with every colour, font, radius, spacing and breakpoint token from
Master §4 (names: --color-*, --font-*, --breakpoint-*). Base layer: body bg paper, color ink, font-text,
antialiasing, ::selection (blue-soft bg, ink text), :focus-visible (2px solid var(--color-blue), offset 3px;
inside [data-theme=navy|ink|blue] use blue-lit or white). Utility classes .t-display-xxl … .t-counter exactly as
Master §4 (font-stretch for Archivo via font-variation-settings "wdth" N). Utilities: .container-page (margin
clamp + max 1440 + center), .grid-page (4/8/12 cols with gutter), .full-bleed. Reduced-motion CSS safety net.
html { scroll-behavior:auto } (Lenis handles smoothness).

STEP 4 — LIB
- src/lib/utils.ts: cn(); clamp(); isExternalHref().
- src/lib/motion.ts: EASE, DUR, STAGGER constants exactly as Master §5.
- src/lib/gsap.ts ('use client'): import gsap, ScrollTrigger, SplitText, useGSAP; gsap.registerPlugin(...) once;
  gsap.defaults({ ease: EASE.out, duration: DUR.lg }); export them.
- src/lib/content.ts: types (Status, WithStatus…) and isPublishable(item) per Golden Rule 6 (uses
  process.env.NODE_ENV === 'production').

STEP 5 — MOTION INFRASTRUCTURE (src/components/motion)
- MotionProvider: context { motion, setMotion }; resolves per Master §5; sets html[data-motion]; listens to
  matchMedia changes. Export useMotion().
- SmoothScroll: ReactLenis root with options from Master §5 when motion==='full'; otherwise renders children only.
  Hook the GSAP ticker; expose useLenisSafe() that returns lenis or null.
- Loader: exactly per Master §5 "Ignition". Server-render the overlay markup in layout (so no flash); a client
  controller runs the timeline or removes it immediately when skipped. Hero image readiness: accept an optional
  global promise window.__snlHeroReady (set by pages that have a hero image); if absent, fonts = 100%.
- Curtain + TransitionLink + TransitionProvider: exactly per Master §5 "Page transition". Implement reveal via
  src/app/template.tsx calling a context method on mount. Export TransitionLink as the ONLY link component used
  for internal navigation (it renders next/link underneath and passes through props/className).
- RevealText (props: as, variant 'lines'|'words'|'hero', delay, className, children:string). Keep the
  unsplit text in aria-label; wrap lines with padding-block .08em (Mango clipping rule).
- RevealImage (props: variant 'up'|'left'|'center', children or next/image props).
- Parallax (props: speed, disabledBelow=768).
- Marquee (props: items: ReactNode[], speed seconds, reactive=true, pausable=true, ariaLabel).
- Magnetic (wraps a single child; strength .35, max 14px, label strength .15).
- Counter (props: value:number, decimals=0, prefix/suffix; server-render final value; digits in fixed-width
  inline-block boxes).
All behaviours, timings and easings exactly as Master §5, each with its reduced variant.

STEP 6 — UI PRIMITIVES (src/components/ui)
Button (variants solid-ink | solid-blue | outline | text-arrow; sizes md 48px / lg 60px height; renders
TransitionLink for internal href, <a> for external with rel="noopener noreferrer", <button> otherwise; hover spec
from Master §5; Magnetic wrapper on fine pointers). Sticker (fill, rotate). SectionLabel (index, label, theme).
Arrow (direction prop), StarGlyph, Logo (variant 'onLight' → /brand/StarNova-1.svg, 'onDark' → /brand/StarNova.svg; next/image,
priority in header; alt "StarNova Labs"), Logomark (color prop), BrandGraphic (variants 'star-crop' | 'blade-field' | 'tile'; themes
navy/blue/paper). Field (text, email, textarea, select; floating label; error slot) — used in Batch 2.

STEP 7 — LAYOUT (src/components/layout)
- SkipLink ("Skip to content" → #main).
- Container, Grid, Section (padding tokens; props: tight, theme), Chapter (full-bleed; theme paper | paper-2 |
  navy | blue | ink; sets data-theme; registers a ScrollTrigger that tells the header the current theme).
- SiteHeader: height 72px mobile / 88px desktop. Left: Logo. Desktop (≥1024): links from content/nav.ts
  [Kids in Tech → /kids-in-tech, Products → /products, Studio → /studio, About → /about], then Button
  solid-ink "Let's talk" → /contact, then Menu button (label "Menu", aria-expanded, aria-controls). <1024: Logo +
  Menu button only. Behaviour per Master §5 (hide/show on scroll, transparent over hero, invert over dark/blue).
- MenuOverlay: navy full-screen; left column: display-l Mango links with mono indices (01 Kids in Tech, 02
  Products — sub-items KITOS, EduStack, SkillStack —, 03 Studio, 04 Work, 05 About, 06 Partner with us, 07
  Contact); right column: email, both phone numbers (tel: links), location "Sokoto, Nigeria", socials from
  content/site.ts (render only entries with a real url). Open/close per Master §5; focus trap; Esc; returns focus
  to the Menu button; lenis.stop() while open; body scroll lock.
- SiteFooter (ink background): top: t-display-xl "BUILD WHAT'S NEXT" (RevealText) + Button solid-blue "Start a
  conversation" → /contact. Grid of 4 columns: Company (About, Partner with us, Contact) · Products (Kids in Tech,
  KITOS, EduStack, SkillStack) · Studio (Studio, Work) · Legal (Safeguarding, Privacy, Terms). Contact block:
  info@starnovalabs.com, +234 906 098 5201, +234 706 783 4186. Bottom bar: "© {year} StarNova Labs Ltd",
  MotionToggle ("Motion: On / Reduced", role="switch", aria-checked), horizontal logo (onDark).
- Root layout (src/app/layout.tsx): <html lang="en"> with font variables; MotionProvider > SmoothScroll >
  TransitionProvider; SkipLink, SiteHeader, <main id="main" tabIndex={-1}>, SiteFooter, Curtain, Loader overlay,
  live region for route announcements, <Analytics/>, <SpeedInsights/>. Base metadata: metadataBase from
  NEXT_PUBLIC_SITE_URL (default https://www.starnovalabs.com), title template "%s — StarNova Labs", default title
  "StarNova Labs — Architecting Human Agency", description "StarNova Labs is a Nigerian technology company
  building education technology — proven in real classrooms through Kids in Tech." themeColor #0B1B2E.

STEP 8 — CONTENT SKELETON (src/content)
- site.ts: name, legalName "StarNova Labs Ltd", tagline "Architecting Human Agency", email, phones [both],
  location "Sokoto, Nigeria" (status pending), hours "Mon–Fri, 9:00–17:00 WAT" (status pending), socials: []
  (empty until real URLs are supplied — do NOT use '#').
- nav.ts: primary, menu, footer arrays as above.
- products.ts, stats.ts, team.ts, work.ts, partners.ts: typed empty/minimal exports with the status-flag fields
  (filled in Batches 2–3).

STEP 9 — ROUTES
- src/app/page.tsx (temporary Home hero only): Chapter theme paper; h1 via RevealText hero variant, t-display-xxl,
  three lines "BUILD" / "WHAT'S" / "NEXT." with an inline Logomark tile (0.8em, blue) after "NEXT."; lead:
  "A Nigerian technology company building education technology — proven in real classrooms through Kids in
  Tech."; Stickers: "<est. 2025/>" (gold, -3°), "Sokoto · Kebbi" (white, 2°); Buttons: "Explore our products" →
  /products (solid-ink), "Partner with us" → /partner (text-arrow). Below: a full-bleed Marquee: KIDS IN TECH ✦
  KITOS ✦ EDUSTACK ✦ SKILLSTACK ✦ STUDIO ✦ (t-display-l, 40s). This proves the loader→hero choreography.
- Stub pages (server components, each with its own metadata title and a PageStub hero: SectionLabel, h1
  t-display-xl, one-line lead, back-home Button): /kids-in-tech, /products, /products/[slug] (generateStaticParams
  for kitos, edustack, skillstack; notFound otherwise), /studio, /work, /about, /partner, /contact, /safeguarding,
  /privacy, /terms.
- src/app/not-found.tsx: navy Chapter, t-display-xxl "404", lead "This page drifted out of orbit.", Button → /.
- src/app/lab/page.tsx: renders every primitive and variant (buttons, stickers, reveals, image reveal with a
  BrandGraphic, parallax stack, marquee, counter, fields, chapters in all themes, colour swatches with hex +
  contrast notes, the type scale, and the glyph test string "Ɓɓ Ɗɗ Ƙƙ Ƴƴ ₦ 0123456789 “quotes” — dash" in every
  font). Must call notFound() when NODE_ENV === 'production'. Add robots noindex.
- next.config.ts: redirects (permanent): /mission → /about#mission, /services → /studio. images: formats
  ['image/avif','image/webp'].
- .env.example: NEXT_PUBLIC_SITE_URL=https://www.starnovalabs.com, RESEND_API_KEY=, CONTACT_TO_EMAIL=info@starnovalabs.com
- README.md: stack, scripts, structure, content-status rules, motion rules, deployment notes.

RESPONSIVE REQUIREMENTS
Header switches at 1024. Menu overlay: single column <768, two columns ≥768. Display type must never overflow:
test "WHAT'S" at 360px (t-display-xxl clamps to 5rem minimum → verify fits; if not, reduce min to 4.25rem).
Footer columns: 1 col <640, 2 cols 640–1023, 4 cols ≥1024. Loader star 96px <768, 144px ≥768. Touch: no Lenis
smoothing (syncTouch false), no magnetic, no cursor preview.

ACCESSIBILITY REQUIREMENTS
Skip link first focusable. Menu button aria-expanded/aria-controls; overlay role="dialog" aria-modal="true"
aria-label="Site menu"; focus trap; Esc; focus returns. Loader overlay aria-hidden, never focusable, never
blocks screen-reader access to main content. Marquee: aria-label on the container with the full list, duplicate
track aria-hidden; pause button with aria-pressed. MotionToggle role="switch". Route change: focus h1 +
live-region announcement. Colour contrast per Master §4.

PERFORMANCE REQUIREMENTS
GSAP plugins imported only in client components; no GSAP on the server. Loader JS ≤ 8 KB of its own code. Only
Mango is preloaded. No layout shift from fonts (next/font adjustFontFallback on Google fonts). Home first-load JS
≤ 180 KB gzip (check `next build` output). No console errors or hydration warnings.

GUARDRAILS
Do not touch ../starnovalabsweb, ../../Starnovalabswebsitedesign or docs/brand-source (read-only). Do not
modify the Mango font files. Do not add photos. Do not add any animation library besides GSAP/Lenis. Do not
hard-code copy in components (content/ files only, except the stub/lab strings).

DEFINITION OF DONE
- npm run build, npm run typecheck, npm run lint pass with zero errors.
- All routes above render; all header/menu/footer links resolve (no 404 except intentionally unknown slugs).
- Loader runs once per session, respects the 2.8s cap, and is skipped with reduced motion.
- Curtain transition works between every stub page; back/forward uses the fade; external/mailto/tel bypass.
- /lab demonstrates every primitive in full and reduced modes; /lab 404s in production build (`npm run build &&
  npm start`, visit /lab).
- Lighthouse mobile on / (production build): Perf ≥ 90, A11y 100, BP 100, SEO ≥ 90.
- Vercel preview deployed (new Vercel project, root = this folder) — note the URL in the summary.

MANUAL TEST CHECKLIST
[ ] Fresh tab → loader plays (star assembles, counter hits 100, blue wipe) → hero lines mask-reveal.
[ ] Reload same tab → no loader. New tab → no loader (same session). Private window → loader.
[ ] OS reduced motion ON → no loader, no smooth scroll, reveals are quick fades, marquee static.
[ ] Footer Motion toggle → switches modes live and persists after reload.
[ ] Scroll down → header hides; scroll up → returns; over the ink footer the header inverts.
[ ] Menu: opens with circle wipe, Tab cycles inside, Esc closes, focus returns to Menu button.
[ ] Click every nav link → blue curtain → new page at top, h1 focused (check with keyboard).
[ ] Cmd/Ctrl-click a link → opens new tab, no curtain. mailto/tel links → no curtain.
[ ] Buttons: blue flood from pointer entry, label roll, arrow to 45°, magnetic pull on desktop only.
[ ] 360px width: no horizontal scroll anywhere; display type fits.
[ ] Keyboard-only pass through header, menu, footer: visible focus everywhere.
[ ] /lab glyph test: Hausa letters and ₦ render (fallback face) without tofu boxes.
[ ] VoiceOver/NVDA: hero h1 read once as a sentence; marquee read once; loader not announced.

SUGGESTED COMMIT MESSAGE
feat(foundation): Next.js 16 scaffold, design tokens, fonts, GSAP/Lenis motion system, header/menu/footer, loader and page transitions
=== BATCH 1 END ===
```

---

## BATCH 2 — Core company pages: Home, About, Partner, Contact (+ contact API)

```text
=== BATCH 2 START ===
Branch: feat/batch-02-core-pages   (from main, after Batch 1 is merged)

GOAL
Build the company narrative: the full Home page, About, Partner with us, and Contact with a working, secure
contact endpoint. Fill src/content with the draft copy below. Pages must feel finished even without photography
(use BrandGraphic where images are missing).

OUT OF SCOPE
Kids in Tech, Products, Studio, Work pages (Batch 3); legal page copy, sitemap, OG images, JSON-LD (Batch 4);
Hausa; CMS; newsletter; blog. Do not change Batch 1 primitives' public APIs — extend with new optional props only.

CONTENT TO ADD (src/content) — use exactly; statuses as given
stats.ts (each: id, value, suffix, label, source, asOf, status):
  paying-students 111 "Paying students" source "Pitch deck v2" status pending
  cohorts 4 "Bootcamp cohorts" source "Company Profile 2026 (pitch says 3 — reconcile)" status pending
  returning 17 "Returning students" source "Pitch deck v2" status pending
  projects 35 suffix "+" "Student projects built" source "Pitch deck v2" status pending
  tracks 3 "Learning tracks" source "Company Profile 2026" status confirmed
team.ts (each: name, role, bio, group 'leadership'|'programme', photo:null, status):
  Aliyu Mubarak — Founder & CEO — "Company direction, strategy, product and curriculum design. Leads the weekly
    company review and owns the roadmap." leadership confirmed
  Murtala Ishaq — Co-Founder & COO — "Operations, partnerships, logistics and programme coordination. Leads
    external business development and bootcamp delivery." leadership confirmed
  Mustapher M. Lawal — Co-Founder & CTO — "Technology direction, product development and technical education.
    Leads KITOS and the robotics programme." leadership confirmed
  Faruk Yusuf — Educator, Web Development (name spelling pending) programme pending
  Amina — Coordinator, Scratch programme programme pending
  Abdul Malik — Coordinator, Scratch programme programme pending
  Aisha — Media & Content programme pending
values.ts (status pending — "to be ratified"):
  01 Understanding first — "Students genuinely understanding a concept matters more than rushing through a curriculum."
  02 Adaptability — "We adjust delivery to real conditions rather than defending a plan that isn't working."
  03 Accountability — "Commitments are reviewed weekly; roadblocks are surfaced early and solved together."
  04 Practical learning — "Project-based, hands-on instruction. Students build from the first session."
  05 Growth of people — "We develop our team into new responsibilities and support them to succeed."
testimonials.ts (consent:false until written consent exists — so hidden in production):
  { quote: "My son was always reserved, but after the Kids in Tech Bootcamp I noticed a surge in his confidence
    and eagerness to learn. Now he can't wait to join the next bootcamp.", attribution: "Parent, Kids in Tech",
    consent:false }   (child's name deliberately removed)
journey.ts (status confirmed unless noted; no dates until supplied):
  Kids in Tech established · Multiple cohorts delivered · kidsintech.school launched · KITOS LMS built ·
  Team expanded beyond the founders · Robotics track introduced (Bootcamp 4.0) · In progress: company
  formalisation · In progress: product portfolio expansion
partners.ts: move the partner list from the old site as entries with permission:false and logo:null
  (Startup Kebbi, GDG Kebbi, Greenbox, NurAla Learning). Do NOT include StarNova itself, "StarOk" or "Startup".
  They stay hidden in production until permission:true and an SVG/PNG logo is added to public/partners/.

PAGE: HOME  (src/app/page.tsx + src/components/sections/home/*)
Replace the Batch 1 temporary hero. Sections in order:
1 Hero (Chapter paper) — keep Batch 1 hero (h1 BUILD / WHAT'S / NEXT. + logomark tile, lead, stickers, CTAs).
  Add an image slot (cols 8–12 on ≥1024, overlapping line 2 of the h1 by ~15% with z-index below the text):
  BrandGraphic 'star-crop' (navy) until a real photo exists; Parallax speed -.15; the h1 Parallax speed .1;
  stickers Parallax .3. On <1024 the graphic sits below the CTAs at 4:3.
2 Marquee (full-bleed, Chapter paper-2): KIDS IN TECH ✦ KITOS ✦ EDUSTACK ✦ SKILLSTACK ✦ STUDIO ✦ (40s, reactive).
3 Manifesto (Chapter paper) — SectionLabel "01 — Why we exist". t-display-l (RevealText lines):
  "We are producing technology users faster than we are developing technology creators." Body (cols 7–11):
  "Children across Northern Nigeria grow up surrounded by technology with little chance to learn how it works —
  or how to build with it. Schools want practical STEM but rarely have the specialist people, curriculum or
  equipment to deliver it. StarNova Labs builds that missing layer: programmes that spark capability, and
  platforms that keep it growing." Then a scrubbed two-row display strip (Master §5 scrubbed words):
  row A "EXPOSURE → UNDERSTANDING → BUILDING" row B "PROBLEM SOLVING → CREATION →" (arrows = Arrow SVG).
4 Proof: Kids in Tech (Chapter navy) — SectionLabel "02 — Proof of execution". h2 "Kids in Tech is where it
  starts." Lead: "Our flagship programme teaches children to build games, websites and working robots through
  intensive, project-based bootcamps delivered with partner schools." Counter row from stats.ts (only
  publishable items; each Counter with a gold underline on the first); small mono note "Figures as of {asOf}".
  Three track chips (Stickers): Scratch, Web Development, Robotics. Testimonial (only if publishable). Button
  outline (on dark) "Explore Kids in Tech" → /kids-in-tech.
5 How it connects (Chapter paper; pinned sequence per Master §5 on ≥1024, stacked below): h2 "Bootcamps spark it.
  KITOS sustains it." Panels: 01 Bootcamps — "Intensive, in-person, hands-on. Students build from day one." /
  02 KITOS — "Students continue online after a cohort: revisit what they built and progress at their own pace." /
  03 Progression — "Returning students move forward, never repeat. Every cohort takes them further."
6 KITOS (Chapter blue) — t-display-xl "KITOS" (white, RevealText) with Sticker "[ Kids in Tech OS ]" (white).
  Lead (white): "The learning platform that takes Kids in Tech beyond the classroom — and keeps students moving
  between cohorts." Feature stickers (white/ink, varied rotation): Learning pathways · Project portfolios ·
  Innovation challenges · Parent dashboard · School leaderboards. Image slot: BrandGraphic 'tile' until mock-data
  screenshots exist. Button solid-ink "See KITOS" → /products/kitos.
7 Products (Chapter paper) — SectionLabel "03 — What we're building". h2 "One company. A growing portfolio."
  ProductRow list from products.ts (Batch 3 fills products.ts fully; for now add minimal entries: kids-in-tech
  stage "Live", kitos stage "In final testing" (pending), edustack "Pipeline", skillstack "Pipeline", noah
  visible:false). Implement the ProductRow component here (spec Master §5) — Batch 3 reuses it.
8 Studio teaser (Chapter paper-2) — h2 "We build for others too." Three columns: Product & software · Brand &
  identity · Web & learning platforms (one sentence each from the old site's services). Button text-arrow
  "Visit the Studio" → /studio.
9 Partners (Chapter paper) — only if ≥3 publishable partners: logo Marquee (60s, pausable). Otherwise omit.
10 Closing CTA (Chapter ink, the page's one centred composition) — t-display-xl "GOT A SCHOOL, A SPONSOR OR A
  PRODUCT IN MIND?" (use Mango; no ₦/Hausa here). Three Buttons: "Enrol a school" → /partner#schools
  (solid-blue), "Partner or invest" → /partner#investors (outline), "Start a project" → /contact?topic=client
  (outline).
Home metadata: title "StarNova Labs — Architecting Human Agency" (absolute), description as layout.

PAGE: ABOUT  (/about)
1 Hero (Chapter paper): SectionLabel "About". h1 t-display-xl "FROM BOOTCAMPS TO A COMPANY." Lead: "StarNova Labs
  began as a series of Kids in Tech bootcamps. Today it's a team with a documented curriculum, a delivered
  learning platform and a product pipeline built to take practical technology education far beyond one
  classroom."
2 Story (paper, asymmetric: display quote left cols 1–6, body right cols 7–11): pull-quote t-display-l
  "Understanding matters more than finishing the syllabus." — Aliyu Mubarak, Founder & CEO. Body (2 paras) from
  the Company Profile founder's message (rewrite to 120 words max, first person plural, no emoji).
3 Mission & vision (Chapter navy, id="mission"): two big blocks. Vision: "To build Africa's leading
  school-powered STEM education ecosystem — moving millions of young people from technology consumers to
  technology creators." Mission: "To equip the next generation with the knowledge, skills and confidence to
  understand technology, build with it and use it to solve meaningful problems." Mark both status pending
  (render in dev with badge; in production render them — they are the approved-by-default fallback — BUT add a
  TODO in content noting the profile's alternative wording). Tagline sticker "Architecting Human Agency" (gold).
4 Values (paper): the 5 values as a numbered list (big Mango numerals 01–05 + Archivo h3 + body), each row
  RevealText + hairline. If values are pending in production, render them (they are the profile's stated
  practice) with no badge — this is the one exception; note it in the summary for confirmation.
5 Leadership (paper-2): 3 TeamCards (photo slot → BrandGraphic 'tile' with initials in Mango when photo null;
  name h3; role label; bio). Programme team: compact list (name + role) — publishable items only.
6 Journey (paper): vertical timeline, StarGlyph markers, "Achieved" / "In progress" stickers; RevealText per
  item; line draws with scroll (scaleY 0→1, scrub).
7 Brand world strip (optional): if no real imagery, skip entirely (do not use mockup JPGs yet).
8 CTA (ink): "Build it with us." → /partner (solid-blue) and /contact (outline).

PAGE: PARTNER WITH US  (/partner)
Hero h1 "PARTNER WITH US." Lead: "We work with schools, sponsors, investors and product collaborators who share
one conviction: children should learn to create with technology, not only consume it."
Four anchored sections (#schools, #sponsors, #investors, #product), alternating paper / navy / paper-2 / blue:
 - Schools: "Bring Kids in Tech to your students." Points: we supply curriculum, trained tutors and equipment
   plans; students build real projects; parents see outcomes; partner schools share in programme revenue.
   CTA → /contact?topic=school.
 - Sponsors: "Sponsor a cohort or equipment." Points: fund places for students who can't pay; equip a robotics
   lab; your support is reported with outcomes. CTA → /contact?topic=sponsor.
 - Investors: "Invest in the infrastructure." Points: validated demand and willingness to pay; school-powered
   distribution; KITOS as the platform layer. NO valuation, revenue or round terms on the page. CTA →
   /contact?topic=investor ("Request our briefing").
 - Product collaboration: "Build education technology with us." CTA → /contact?topic=product.
Each section: SectionLabel, h2 (Archivo), 3–4 bullet points with StarGlyph bullets, Button.

PAGE: CONTACT  (/contact)
Layout: left (cols 1–6) h1 t-display-xl "LET'S TALK." + lead "Tell us about your school, your idea or your
project. We reply within two working days." + contact details (email mailto, both phones tel:, location, hours
from site.ts — publishable only) + socials (only real URLs). Right (cols 7–12) the form.
Form fields (Field component): name* (autocomplete name), email* (email), organisation (organization),
topic* select [School partnership | Parent enquiry | Sponsorship | Investment | Product collaboration | Studio
project | Other] — preselected from ?topic= (school|parent|sponsor|investor|product|client), message* (min 20
chars, max 2000), hidden honeypot "company_website" (visually hidden, tabIndex -1, autocomplete off), hidden
timestamp. Submit Button solid-ink "Send message". States: idle / submitting (button shows mono "SENDING…",
disabled) / success (form replaced by a navy panel: t-display-l "RECEIVED." + "We'll be in touch within two
working days.") / error (inline alert role="alert" with a mailto fallback link).
Client validation: native constraints + custom messages; errors via aria-describedby; focus first invalid field.
Works without JS: form action posts to /api/contact and the route responds with a 303 redirect to
/contact?sent=1 (or ?error=1), and the page renders the matching state server-side.

API: src/app/api/contact/route.ts (POST, runtime nodejs)
- Accept JSON or form-encoded. Validate server-side (same rules) — write a small hand-rolled validator (no zod
  needed; zod is allowed if you prefer, add it as a dependency).
- Spam: reject if honeypot filled (respond 200 silently); reject if submitted < 3s after render; simple
  in-memory rate limit 5 requests / 10 min / IP (best-effort; note in summary that a durable limiter can come
  later).
- Send with Resend (npm i resend): from "StarNova Labs Website <website@starnovalabs.com>" (configurable via
  CONTACT_FROM_EMAIL), to CONTACT_TO_EMAIL, reply_to = sender email, subject "[Website] {topic} — {name}",
  plain-text + simple HTML body (escape all user input).
- If RESEND_API_KEY is missing: return 503 {error:'email_unavailable'}; the UI shows the mailto fallback. Never
  log message bodies; log only an id + topic.
- Add CONTACT_FROM_EMAIL to .env.example. Document Resend domain verification steps in README.

MOTION FOR THIS BATCH (all per Master §5)
Every h1: RevealText hero variant (after loader/curtain). Every h2/display: RevealText lines on scroll. Leads:
words variant. Body: block fade-up. Stickers: pop after their headline. Counters: count-up when 60% in view.
Home hero: layered Parallax (h1 .1, graphic -.15, stickers .3). Home manifesto: scrubbed two-row strip. Home
"How it connects": pinned 3-panel sequence (≥1024) with snap; ScrollTrigger.refresh() after fonts load.
KITOS chapter: header inverts to white-on-blue; feature stickers pop with stagger .06. ProductRow hover per
Master §5 incl. cursor-following preview (use BrandGraphic tiles as previews for now). Journey line draws with
scrub. Contact success panel: clip-path reveal (center variant) .8s power4.inOut. Buttons/links as Master §5.

RESPONSIVE REQUIREMENTS
Hero: graphic below CTAs <1024; stickers never overlap text on 360px (reposition inline under the h1).
Counter row: 2×2 grid <768, single row ≥1024. Pinned section → stacked cards <1024. ProductRow: preview disabled
on touch; row stacks name / stage / one-liner on <768. Partner sections: single column <1024. Contact: form
below details <1024. Closing CTA display text: verify no overflow at 360 (allow it to wrap to 4–5 lines).

ACCESSIBILITY REQUIREMENTS
One h1 per page. Counters: final values in HTML; animation aria-hidden duplicate or aria-live off. Pinned
section content remains in DOM order and readable by screen readers regardless of scroll. Form: every input has
a visible label; required marked with text "(required)" not colour alone; error summary for no-JS submissions;
success/error announced (role="status"/"alert"). Select is a native <select>. Anchor sections have headings
the TOC/links point to. Testimonials use <figure>/<blockquote>/<figcaption>.

PERFORMANCE REQUIREMENTS
Home stays within the first-load JS budget (≤ 180 KB gzip) — the pinned section and scrubbed strip must not
import extra libraries. No layout shift from counters (reserve width). Contact route handler cold start small
(import resend dynamically inside the handler). All pages statically generated except /api/contact; /contact
reads searchParams — keep it static by reading `?topic`/`?sent` on the client, OR render the form statically and
hydrate state client-side; do not force the whole page dynamic.

GUARDRAILS
Do not modify Batch 1 motion timings/eases. Do not publish pending/unconsented/unpermitted items in production.
Do not add photos, stock or otherwise. Do not show revenue, valuation, round size or student names anywhere.
Do not remove the loader or curtain. Keep all copy in src/content.

DEFINITION OF DONE
- Home, About, Partner, Contact complete as specified; build/typecheck/lint pass.
- Contact works end-to-end on the Vercel preview with RESEND_API_KEY set (test email received), shows the
  mailto fallback without the key, and works with JS disabled (303 redirect flow).
- Production build hides pending stats (only "3 Learning tracks" shows), unconsented testimonial, unpermitted
  partners; dev build shows them with PENDING badges.
- Lighthouse mobile (production): Home Perf ≥ 90, A11y 100; About/Partner/Contact Perf ≥ 95, A11y 100.

MANUAL TEST CHECKLIST
[ ] Home top-to-bottom at 1440: parallax layering in hero, scrubbed strip moves opposite ways, pinned section
    snaps through 3 panels, KITOS chapter inverts header, ProductRow preview follows cursor.
[ ] Same at 390 (real phone if possible): no pinning, no horizontal scroll, native scroll feels normal.
[ ] Reduced motion: everything readable, no pin, no scrub, counters show final numbers instantly.
[ ] /contact?topic=school preselects "School partnership"; /partner CTAs land with correct topics.
[ ] Submit empty form → errors announced, focus on first invalid field.
[ ] Submit valid form → "RECEIVED." panel; email arrives with reply-to set.
[ ] Fill honeypot via devtools → silent success, no email. Submit instantly (<3s) → rejected.
[ ] JS disabled: submit → redirected to /contact?sent=1 with success state.
[ ] Production build: only publishable stats/testimonials/partners appear.
[ ] Keyboard-only through all four pages; screen reader reads counters as final numbers.

SUGGESTED COMMIT MESSAGE
feat(pages): home, about, partner and contact pages with content model and Resend contact endpoint
=== BATCH 2 END ===
```

---

## BATCH 3 — Kids in Tech, Products (KITOS, EduStack, SkillStack, NOAH), Studio & Work

```text
=== BATCH 3 START ===
Branch: feat/batch-03-products   (from main, after Batch 2 is merged)

GOAL
Build the programme and product layer: the Kids in Tech flagship page, the Products index, a data-driven product
detail template (KITOS in full; EduStack, SkillStack and NOAH as pipeline pages), the Studio services page, and
the Work index + case-study template. Adding a product or case study afterwards must be a content-only change.

OUT OF SCOPE
SEO extras (sitemap/OG/JSON-LD — Batch 4), legal copy (Batch 4), Hausa, enrolment/payment flows (enrolment
happens on kidsintech.school), dashboards or logins, any KITOS app functionality, real case-study content beyond
what is given (none is approved yet).

CONTENT — src/content/products.ts (replace Batch 2's minimal entries)
Type Product = { slug, name, fullName?, kind:'programme'|'platform'|'product', category, stage:
 'live'|'delivered'|'testing'|'building'|'scoping'|'pipeline', stageLabel, stageStatus:'confirmed'|'pending',
 oneLiner, intro, problem, audiences: string[], features: {title,body}[], roadmap?: {phase,label,items[],state:
 'now'|'next'|'later'}[], externalUrl?, cta: {label, href}, accent:'blue'|'navy'|'ink', visible:boolean,
 indexable:boolean, images: [] }
Entries:
- kids-in-tech: kind programme; category "Flagship programme"; stage live "Live · Bootcamp 4.0" (pending on the
  cohort number); oneLiner "Project-based STEM bootcamps where children build games, websites and robots.";
  externalUrl https://www.kidsintech.school; detail route is /kids-in-tech (not /products/…).
- kitos: fullName "Kids in Tech OS"; kind platform; category "Learning platform"; stage testing "LMS v1 · final
  testing" stageStatus pending (profile says "Delivered" — reconcile); oneLiner "The platform that keeps Kids in
  Tech learning going between cohorts."; problem "Learning that stops when a bootcamp ends is learning
  half-finished."; features: Learning pathways — "Structured next steps after every bootcamp, by track and
  level." / Project portfolios — "Every student keeps what they built, and can show it." / Innovation
  challenges — "Build-a-solution challenges that stretch students between cohorts." / Student profiles —
  "Progress, badges and certificates in one place." / Parent dashboard — "Parents see progress, not just
  attendance." (roadmap: later) / School leaderboards — "Friendly competition between partner schools."
  (roadmap: later); roadmap: now "V1 — Core learning platform" [student access, lessons & recordings, payments,
  returning-student onboarding]; next "Portfolios & progress" [student portfolios, progress tracking, live
  classes]; later "Ecosystem" [innovation challenges, parent dashboard, school leaderboards]; later "Network"
  [talent discovery, national expansion]; plus a "KITOS OS — scoping" note block; cta "Partner as a school" →
  /partner#schools; visible true; indexable true.
- edustack: kind product; category "School management"; stage pipeline "Pipeline"; oneLiner "School management
  for the schools we already work with."; intro "EduStack will bring admissions, academics and administration
  into one system, built for Nigerian schools. Development resumes after KITOS ships."; features: placeholder
  list marked pending; cta "Register interest" → /contact?topic=product; visible true; indexable false.
- skillstack: category "Future skills"; stage pipeline; oneLiner "A skills-and-careers platform for young people
  moving beyond school."; intro "SkillStack will extend the Kids in Tech pathway into career-ready skills,
  projects and portfolios."; visible true; indexable false.
- noah: stage pipeline; everything TODO; visible false (hidden until a description is approved).
Do NOT add NurAla, Cuzoo, Zariya, HausaLearn, Godiya EMR or Huzmart as products (pending decisions — see
Overview §9.2). If they become case studies they go in work.ts with permission:false.

CONTENT — src/content/kit.ts
tracks: Scratch Programming — "Foundation · logic & thinking" — "Computational thinking, programming logic,
sprites, events and interactions. Students build games and animated stories, structuring ideas before syntax." /
Web Development — "Structure · building for the web" — "From structure and styling into interaction. Students
build real pages they can publish and show." / Robotics & Embedded Systems — "Integration · hardware & control" —
"Sensors, pin mapping, wiring and physical computing, progressing to working demonstrations. Students learn to
modify code deliberately, not copy it."
cohortFlow: Placement — "New and returning students are grouped by level." / Build from day one — "A project
starts in the first session; concepts arrive through the work." / Peer support — "Faster learners sit with
those who need help, lifting the whole class." / Showcase — "Every student finishes with something they can
demonstrate and explain."
principles: Practical before theoretical · Differentiated instruction · Understanding as the measure · Peer
support structures · Continuity beyond the classroom (one-sentence bodies from the Company Profile, §07).
pathway: Scratch foundation → specialise: Web Development OR Robotics → stay in a specialisation until mastery.

CONTENT — src/content/services.ts (Studio)
Product & software development: Web apps · Mobile apps · SaaS platforms · MVP development · Custom tools.
Design & branding: Logo & identity · Brand systems · UI/UX · Social & print design.
Web: Business websites · Landing pages · Portfolios · CMS.
Education technology: Learning platforms & LMS · Course portals · Student & teacher dashboards.
Strategy: Product discovery · MVP validation · UX audits.
Process: 01 Discover · 02 Design · 03 Build · 04 Launch & grow (one sentence each, plain).

CONTENT — src/content/work.ts
Type CaseStudy = { slug, client, sector, year, services[], summary, challenge, approach, outcome, images[],
permission:boolean, featured:boolean }. Add NO real entries with permission:true. Add one example entry
{ slug:'example', client:'Example client', permission:false } so the template can be built and viewed in dev.

PAGE: KIDS IN TECH  (/kids-in-tech)
1 Hero (Chapter paper): SectionLabel "Flagship programme"; h1 t-display-xxl "KIDS IN TECH" (Mango, 2 lines on
  mobile); co-brand line "A StarNova Labs programme"; lead "Practical technology skills for children, delivered
  through intensive, project-based bootcamps with partner schools."; Stickers "<build/>" (gold), "{ create }"
  (blue), "[ innovate ]" (white) — this is KIT's own code-tag voice; Buttons: "Enrol at kidsintech.school" ↗
  external (solid-ink) and "Bring KIT to your school" → /partner#schools (text-arrow). Image slot:
  BrandGraphic until consented photography exists.
2 The problem (paper): h2 + body (from Overview/Profile §12, 80 words max).
3 How a cohort works (paper-2): 4-step horizontal sequence; on ≥1024 a horizontal scroll-driven track (pin the
  section, translate the track x from 0 to -(trackWidth - viewport) with scrub 1; each step card RevealText as it
  enters); on <1024 a vertical list.
4 Tracks (Chapter blue — the page's blue chapter): h2 (white) "Three tracks. One pathway."; three TrackCards
  (ink/white on blue): big Mango index 01/02/03, Archivo h3 name, mono subtitle, body. Hover: card lifts y -8px,
  index rotates to 45° star axis (.45s power3.out). Then the branching pathway diagram as inline SVG: Scratch node
  → two branches (Web / Robotics) → "Mastery"; path strokes draw on scroll (stroke-dashoffset, scrub .6);
  reduced: static.
5 How we teach (paper): 5 principles as numbered rows (Mango numerals, hairlines, RevealText).
6 Impact (Chapter navy): counters from stats.ts (publishable only) + testimonial (publishable only) + note
  "Figures as of {asOf}".
7 For schools / for parents (paper, two columns): Schools — B2B2C in one paragraph + Button /partner#schools.
  Parents — "Enrolment, schedules and fees live on kidsintech.school." + external Button. Safeguarding link →
  /safeguarding ("How we keep children safe").
8 CTA (ink): t-display-xl "THE NEXT INNOVATOR MIGHT BE IN YOUR CLASSROOM." + Buttons.

PAGE: PRODUCTS INDEX  (/products)
Hero h1 t-display-xxl "PRODUCTS" + lead "Programmes that prove it. Platforms that scale it." Maturity strip: a
horizontal row of stage columns (Live → Testing → Scoping → Pipeline) with product name chips placed in their
column (publishable + visible only); on <768 a vertical list. Then ProductRow list (from Batch 2) for all
visible products incl. Kids in Tech (→ /kids-in-tech) — each row: index, name (t-display-l Mango), stage
Sticker (gold for live, blue for testing, white for scoping/pipeline), oneLiner, Arrow. CTA (paper-2): "Have a
product idea for education?" → /partner#product.

PAGE: PRODUCT DETAIL TEMPLATE  (/products/[slug])
generateStaticParams from products where visible && slug !== 'kids-in-tech'. notFound() for invisible ones.
generateMetadata per product; robots index only if indexable. Sections, each rendered only if data exists:
1 Hero (Chapter per accent): SectionLabel category; h1 t-display-xxl name; fullName sticker; stage sticker;
  oneLiner lead; cta Button.
2 Problem (paper): t-display-l quote-style problem statement + intro body.
3 Who it's for (paper-2): audience chips.
4 Features (paper): 2-col (≥768) / 3-col (≥1280) feature grid; each feature: StarGlyph, Archivo h3, body;
  features whose roadmap state is 'later' get a "Coming later" mono tag.
5 Screens (Chapter navy): image slots (next/image) — none yet → BrandGraphic 'tile' ×2 with caption "Product
  screens coming soon" rendered ONLY in dev; in production omit the section if images is empty.
6 Roadmap (paper): StageTimeline component — horizontal on ≥1024 (now/next/later columns, a progress line
  that fills to "now" on scroll, scrub), vertical below.
7 Related (paper-2): the other visible products as small rows.
8 CTA (ink).
KITOS gets all sections. Pipeline products get Hero, Problem/intro, "Register interest" CTA and Related only.

PAGE: STUDIO  (/studio)
Hero h1 t-display-xxl "STUDIO" + lead "The team behind StarNova's products also designs and builds for clients:
products, brands and learning platforms." Services (paper): each category a large accordion-style row (Archivo
h2, sub-items as Stickers), opening on click/Enter with height animation via GSAP (from 0 to auto using
gsap's height:"auto", .6s power4.inOut; reduced: instant); rows are <details>/<summary>-based for no-JS support.
Process (Chapter navy): 4 steps with Mango numerals. Selected work: CaseStudyCards for publishable work.ts items;
if none, render an ink band "Case studies are on the way — ask us for examples." + Button → /contact?topic=client.
CTA "Start a project" → /contact?topic=client.

PAGES: WORK  (/work, /work/[slug])
/work: hero h1 "WORK"; grid of publishable CaseStudyCards (2 cols ≥768; card = RevealImage cover, client,
services stickers, summary; hover inner scale 1.05 + arrow). Empty state as on Studio.
/work/[slug]: generateStaticParams from publishable items (in dev include the example). Template: hero (client,
sector, year, services), challenge, approach (with full-bleed RevealImage slots), outcome (big counter or
statement), next-case link (large display text with Arrow, curtain transition).

MOTION FOR THIS BATCH (per Master §5 unless stated)
All h1 hero reveals; h2 line reveals; stickers pop; counters count. KIT: horizontal pinned cohort track (scrub 1,
pin only ≥1024); TrackCard hover; pathway SVG stroke draw (scrub .6). Products: maturity strip chips slide in
from their column top (y -24→0, stagger .06); ProductRow hover + cursor preview. Product detail: StageTimeline
progress line scrub; feature grid staggered block reveals (.06). Studio: <details> height animation. Work: card
hover; next-case link: display text underline draw on hover and magnetic arrow. All with reduced variants.

RESPONSIVE REQUIREMENTS
KIT cohort track: vertical list <1024 (no pin). TrackCards: 1 col <768, 3 cols ≥1024 (2+1 at 768–1023).
Pathway diagram: vertical orientation <768 (separate SVG or viewBox switch). Maturity strip: vertical <768.
Product names at t-display-l must not overflow at 360 ("SKILLSTACK" is the longest — verify; allow the row to
wrap the sticker below). Studio rows full width; stickers wrap.

ACCESSIBILITY REQUIREMENTS
Pinned horizontal track: content in DOM order, fully readable without scroll-jacking for screen readers; provide
a "Skip past steps" link before it on desktop. Pathway SVG: role="img" with aria-label describing the pathway,
plus a visually hidden ordered list equivalent. <details>/<summary> keyboard operable (native). External links
announce "(opens kidsintech.school)" via visually hidden text. Stage stickers include text, not colour alone.

PERFORMANCE REQUIREMENTS
Product and work pages statically generated. No new dependencies. The pinned horizontal track uses a single
tween + ScrollTrigger; refresh after fonts/images. Each page first-load JS ≤ 170 KB gzip.

GUARDRAILS
Enrolment and payment are NOT handled on this site — link out to kidsintech.school. Do not use the KIT logo's
colours as page UI colours (KIT brand appears only as its logo image, if at all). Do not publish invisible
products, unpermitted case studies, or pending stats. No stock imagery or screenshots of kidsintech.school as
hero images. Don't change Batch 1/2 component APIs except adding optional props.

DEFINITION OF DONE
- All pages build statically; build/typecheck/lint pass.
- Adding a new visible product entry in products.ts produces a new /products/{slug} page and a row on
  /products with no component changes (verify by temporarily adding one, then remove it).
- Production build: NOAH hidden (404), pipeline pages noindex, example case study absent, empty states render.
- Lighthouse mobile production: /kids-in-tech, /products, /products/kitos, /studio each Perf ≥ 90, A11y 100.

MANUAL TEST CHECKLIST
[ ] /kids-in-tech at 1440: horizontal cohort track pins and scrubs; pathway strokes draw; blue chapter inverts
    header; external enrol link opens in new tab without curtain.
[ ] Same at 390: vertical lists, no pinning, no overflow.
[ ] /products: maturity strip correct columns; rows link correctly (KIT → /kids-in-tech).
[ ] /products/kitos: all sections; roadmap line fills; "Coming later" tags on later features.
[ ] /products/edustack & /skillstack: short template, "Register interest" → contact with topic preselected.
[ ] /products/noah → 404 in production.
[ ] /studio: rows expand with keyboard (Enter/Space) and with JS disabled (<details>).
[ ] /work empty state in production; /work/example visible in dev only.
[ ] Reduced motion across all new pages.

SUGGESTED COMMIT MESSAGE
feat(products): kids in tech, products index, data-driven product pages, studio and work templates
=== BATCH 3 END ===
```

---

## BATCH 4 — Polish: content swap-in, legal & safeguarding, SEO, performance, accessibility, QA, launch prep

```text
=== BATCH 4 START ===
Branch: feat/batch-04-polish   (from main, after Batch 3 is merged)

GOAL
Make the site launch-ready: swap in the confirmed content and real images you have supplied, add legal and
safeguarding pages, complete SEO (metadata, OG images, sitemap, robots, structured data), hit the performance
and accessibility budgets on every page, fix everything found in QA, and write the launch/cut-over runbook.

INPUTS (check docs/ and ask in your summary for anything missing — do not invent)
- docs/content-updates.md (if present): confirmed numbers with as-of dates, final mission/vision/values, partner
  permissions, testimonial consents, social URLs, second phone number, location, hours, product decisions
  (NurAla / Cuzoo / Zariya / HausaLearn / NOAH), KITOS stage wording.
- public/images/** (if present): real, consented photography placed by the owner, each listed in
  src/content/images.ts with { src, alt, consent, credit }.
If an input is missing, keep the item pending (hidden in production) and list it under "Blocked on content".

OUT OF SCOPE
Hausa translation/routes (unless docs/content-updates.md explicitly says "Hausa: ship" and supplies reviewed
copy — then implement /ha routes as a separate follow-up PR, not in this batch), CMS, blog/news, newsletter,
cookie banner (no non-essential cookies are used; Vercel Analytics is cookieless), domain DNS changes (runbook
only).

1 CONTENT SWAP-IN
- Apply docs/content-updates.md to src/content (flip status/consent/permission flags only where confirmed).
- Images: wire real images into their slots via next/image (sizes attribute set per layout, placeholder="blur"
  with generated blurDataURL, priority only on each page's hero). Target ≤ 180 KB hero, ≤ 120 KB others. Remove
  BrandGraphic fallbacks only where a real image now exists.
- If a hero video loop is supplied (public/video/kit-loop.mp4 ≤ 1.5 MB + poster.jpg): add to the KIT hero as
  <video muted playsInline loop preload="none" poster> that only plays when in view AND motion==='full';
  reduced → poster only. Provide a pause button.
- Replace every remaining TODO string that renders in production; grep for "TODO" and "PENDING" in src/ and
  confirm none reaches production output.

2 LEGAL & SAFEGUARDING PAGES (/safeguarding, /privacy, /terms)
Build a LegalPage layout: Chapter paper, h1 t-display-l, "Last updated {date}" label, a sticky table of contents
(≥1024), long-form prose styles (t-body, Archivo h2/h3, lists, links). Draft copy — each page starts with a
visible dev-only notice "Draft — requires legal review" (hidden in production ONLY when content flag
reviewed:true; if reviewed:false in production, render a short published notice "This policy is being finalised.
Contact info@starnovalabs.com with questions." instead of the full draft):
- Safeguarding: commitment to child safety; positive language toward every child; photos only with written
  parental consent; no children's full names or schools published; how to raise a concern
  (info@starnovalabs.com); staff/tutor vetting statement (pending).
- Privacy: what the contact form collects (name, email, organisation, message), purpose, processor (Resend,
  Vercel), retention, rights, contact; analytics are cookieless and aggregate; Nigeria Data Protection Act 2023
  reference.
- Terms: site use, IP (StarNova Labs Ltd), external links, liability, governing law (Nigeria).

3 SEO
- src/lib/seo.ts: buildMetadata({ title, description, path, image?, noindex? }) → canonical, openGraph (type
  website, siteName "StarNova Labs", locale en_NG), twitter summary_large_image. Use it in every page's
  metadata/generateMetadata. Unique titles and descriptions (≤ 155 chars) for every route — write them.
- OG images with next/og: src/app/opengraph-image.tsx (default) and per-route opengraph-image.tsx for /,
  /kids-in-tech, /products/[slug], /work/[slug]: 1200×630, navy background, page title in Mango (load the WOFF
  via fetch of the local file — as a font buffer, no modification), logomark bottom-left, blue bar bottom
  edge. Twitter image same.
- src/app/sitemap.ts: all indexable routes (exclude /lab, noindex products, unpublished work), lastModified
  build date. src/app/robots.ts: allow all, disallow /lab and /api, sitemap URL.
- JSON-LD (a <JsonLd> server component): Organization on every page (name, legalName, url, logo, email,
  telephone[both], address {addressLocality:"Sokoto", addressCountry:"NG"}, sameAs = publishable socials,
  foundingDate "2025" if confirmed); EducationalOrganization + Course items (3 tracks) on /kids-in-tech;
  SoftwareApplication (applicationCategory EducationalApplication) on /products/kitos; BreadcrumbList on all
  nested pages. Validate with Google's Rich Results Test (note results in summary).
- Headings audit: exactly one h1 per page, no skipped levels.

4 PERFORMANCE PASS
- Run `next build` and record first-load JS per route; enforce budgets (home ≤ 180 KB gzip, others ≤ 170 KB).
  If over: lazy-load non-critical client components with next/dynamic (ssr:true for content, only the motion
  controller deferred), make sure SplitText/ScrollTrigger aren't imported on pages that don't use them.
- Verify only Mango is preloaded; Archivo/Inter/Mono are display:swap with fallback metrics (CLS ≤ 0.05).
- Images: all via next/image with correct sizes; no image > 250 KB delivered; LCP element is text or a
  priority image.
- Check for long tasks during loader and pinned sections (Chrome Performance, 4× CPU throttle); keep INP ≤ 200ms.
- Add `npm run analyze` (optional: @next/bundle-analyzer as devDependency) — keep it out of production deps.
- Lighthouse mobile (production build via `npm run build && npm start`, or the Vercel preview) on: /, /about,
  /kids-in-tech, /products, /products/kitos, /studio, /partner, /contact. Record scores in docs/QA.md.
  Targets: Perf ≥ 90, A11y 100, BP 100, SEO 100.

5 ACCESSIBILITY PASS (WCAG 2.2 AA)
- axe DevTools on every route: zero violations. Fix contrast issues against Master §4 rules.
- Keyboard-only walkthrough of every route; focus order logical; no focus lost after curtain transitions;
  overlay traps correct; skip link works on every page.
- Screen reader smoke test (NVDA + Chrome, VoiceOver + Safari): page title announced after navigation, h1 read
  once, split text not read letter-by-letter, marquees read once, counters read as final values, forms
  announce errors and success.
- Zoom to 200% and 400% (reflow at 320 CSS px): no loss of content, no horizontal scroll (except intentional
  marquees which must still be pausable).
- Motion: verify OS reduced-motion and footer toggle on every page; verify nothing flashes more than 3×/s.
- Target sizes ≥ 24×24 everywhere, 44×44 for primary touch targets.

6 RESILIENCE & DETAILS
- src/app/error.tsx and global-error.tsx (ink chapter, "Something went wrong." + retry + home link).
- 404 polish (from Batch 1): add links to Kids in Tech, Products, Contact.
- Print stylesheet for legal pages (hide header/footer/motion).
- Security headers in next.config.ts: Content-Security-Policy (self + vercel analytics/insights endpoints +
  data: for images; no unsafe-eval in production), Referrer-Policy strict-origin-when-cross-origin,
  X-Content-Type-Options nosniff, Permissions-Policy (camera=(), microphone=(), geolocation=()),
  Strict-Transport-Security. Verify the site still works with CSP on (GSAP inline styles are fine; if Next
  inline scripts need it, use nonces per Next docs).
- Favicon/manifest: src/app/manifest.ts (name, short_name "StarNova", theme #0B1B2E, background #F5F9FC, icons).

7 QA SWEEP
Cross-browser/device matrix (record in docs/QA.md): Chrome (Android mid-range real device, e.g. Samsung A-series),
Safari iOS (iPhone), Chrome/Edge/Firefox desktop (Windows), Safari macOS. Widths 360, 390, 768, 1024, 1280,
1440, 1920. Check: loader, curtain, header invert, pinned sections, marquees, forms, external links, 404,
redirects (/mission → /about#mission, /services → /studio), no console errors/warnings, no hydration errors.

8 LAUNCH RUNBOOK (docs/LAUNCH.md — write it, do not execute DNS changes)
- Pre-launch checklist (content sign-off, legal review, env vars in Vercel Production: RESEND_API_KEY,
  CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, NEXT_PUBLIC_SITE_URL; Resend domain verified).
- Cut-over: add starnovalabs.com + www to the new Vercel project, set www as primary (or apex — match
  NEXT_PUBLIC_SITE_URL), remove the domains from the old project, verify SSL, test redirects, submit sitemap in
  Google Search Console, request indexing of key pages.
- Rollback: re-assign domains to the old project (kept for 30 days).
- Post-launch: monitor Speed Insights & Analytics for 7 days; check contact deliveries daily for the first week.
- Follow-ups list (e.g. Hausa /ha routes, PolySans once licensed, case studies, KITOS screenshots, CMS).

RESPONSIVE / ACCESSIBILITY / PERFORMANCE REQUIREMENTS
As sections 4, 5 and 7 above, applied to every route including legal pages and error states.

GUARDRAILS
Do not redesign or re-time anything from Batches 1–3; this batch fixes and completes. Do not publish anything
pending/unconsented/unpermitted. Do not execute DNS or domain changes. Do not add tracking cookies or third-party
scripts. Do not modify Mango font files (the OG image reads them as-is). Do not commit .env files.

DEFINITION OF DONE
- Every route meets the Lighthouse targets (recorded in docs/QA.md with date and URL).
- axe: zero violations on every route; keyboard and screen-reader checks recorded as passed.
- sitemap.xml, robots.txt, OG images and JSON-LD present and valid; unique metadata for every route.
- No TODO/PENDING strings in production output; legal pages render correctly per reviewed flag.
- Security headers present (check with securityheaders.com on the preview) and nothing breaks under CSP.
- docs/QA.md and docs/LAUNCH.md complete; summary lists anything blocked on content.
- build/typecheck/lint pass.

MANUAL TEST CHECKLIST
[ ] Share /, /kids-in-tech and /products/kitos links in WhatsApp/LinkedIn/X preview tools → correct OG cards.
[ ] /sitemap.xml lists only indexable routes; /robots.txt disallows /lab and /api.
[ ] View source on each page: one h1, canonical correct, JSON-LD present.
[ ] Old URLs /mission and /services redirect correctly (308).
[ ] Real Android phone on mobile data: home loads fast, loader ≤ ~2.8s, scrolling smooth, no jank in pinned
    sections.
[ ] iPhone Safari: header invert, menu, curtain, forms, video (if any) all correct.
[ ] Contact form end-to-end on the Production-like preview.
[ ] Reduced motion + 200% zoom + keyboard-only: complete a contact submission.
[ ] Legal pages print cleanly.

SUGGESTED COMMIT MESSAGE
chore(launch): content swap-in, legal & safeguarding pages, SEO/OG/structured data, perf & a11y pass, security headers, QA and launch runbook
=== BATCH 4 END ===
```

---

## Appendix — batch sequencing at a glance

| Batch | Branch | Delivers | Needs from you before starting |
|---|---|---|---|
| 1 Foundation | `feat/batch-01-foundation` | Next.js project, tokens, fonts, motion system, header/menu/footer, loader, curtain, stubs, /lab | Answers to Overview §9.1 (or accept defaults); a new Vercel project pointed at this folder |
| 2 Core pages | `feat/batch-02-core-pages` | Home, About, Partner, Contact + Resend endpoint | Resend account + `RESEND_API_KEY` (optional — fallback exists) |
| 3 Products | `feat/batch-03-products` | Kids in Tech, Products, product template (KITOS, EduStack, SkillStack), Studio, Work | Decisions on NurAla / Cuzoo / Zariya / HausaLearn / NOAH (optional — defaults hide them) |
| 4 Polish & launch | `feat/batch-04-polish` | Content swap-in, legal, SEO, perf, a11y, QA, runbook | `docs/content-updates.md` + consented photos in `public/images/` (see Overview §7.4) |

**Review gate after Batch 1:** compare the preview against the imitation guardrails in Overview §2 before continuing. The display face is shared with the reference, so palette, stickers and the star system must visibly carry the identity.
