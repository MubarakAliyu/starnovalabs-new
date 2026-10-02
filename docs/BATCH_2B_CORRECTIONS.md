# BATCH 2B — Corrections: brand lockup, real photography, video, product additions

Paste after the Master System Prompt. Run on branch `feat/batch-02b-imagery`, created from `main` after Batch 2 is merged.

```text
=== BATCH 2B START ===
Branch: feat/batch-02b-imagery

GOAL
The owner reviewed Batch 2 and wants the site to show real StarNova / Kids in Tech life: real classes, the team,
student projects, KITOS screens and short videos. They also want the logo switched to the horizontal lockup.
Real assets are ALREADY in the repo, curated and optimised (EXIF/GPS stripped). Your job is to wire them in
with the motion system that already exists. This batch CHANGES the "no photography yet" rule: real photos from
the manifest are now approved for use.

ASSETS ALREADY IN PLACE (read these first)
- public/images/** — 53 photos + 10 KITOS screenshots (JPG/PNG, max 1800–2400px).
- public/video/kit-classroom-loop.mp4 (12s, 720×1280, muted, 1.5 MB) + kit-classroom-poster.jpg
- public/video/scratch-game-loop.mp4 (6s, 720×1280, muted, 0.5 MB) + scratch-game-poster.jpg
- docs/assets/image-manifest.json — every asset with file, width, height, alt, people
  ('children'|'adults'|'none') and tag (hero, group, classroom, coding, community, project-*, product,
  kitos, team, video).
Do not add any other photos. Do not use anything from outside this repo.

RULES FOR PHOTOS OF CHILDREN (owner-approved, still enforced)
- Only manifest images. Never add captions with a child's name, school or class.
- Alt text comes from the manifest. Captions are generic ("Web Development, Bootcamp 4.0").
- If you find an image where a child's name is legible on screen or paper, stop using it and list it in the summary.

STEP 1 — LOGO: HORIZONTAL LOCKUP EVERYWHERE
The header currently uses /brand/StarNova.svg / StarNova-1.svg (single-line wordmark with the star in the O).
Replace it with the horizontal lockup (blue star tile + two-line "STARNOVA / LABS"):
- On light backgrounds: /brand/lockup-horizontal.svg (ink letters)
- On dark/blue backgrounds: /brand/lockup-horizontal-light.svg (white letters)
Apply to: SiteHeader (including the invert behaviour), MenuOverlay, SiteFooter, the loader's end frame (if it
shows a wordmark), the 404, and /lab. Header height stays the same. Lockup height 40px desktop / 34px mobile;
keep the min clear space. Update the Logo component variants rather than adding a new component. Keep
alt="StarNova Labs". Favicon stays the logomark.

STEP 2 — IMAGE + VIDEO PRIMITIVES
- src/content/images.ts: typed module generated from docs/assets/image-manifest.json (write a small script
  scripts/build-images.cjs that also creates a 16px-wide base64 blurDataURL per image with `sharp`, which ships
  with Next; commit the generated src/content/images.generated.ts). Export lookups by file and by tag.
- Photo component (src/components/ui/Photo.tsx, server-safe): next/image with required width/height from the
  manifest, `sizes` prop (required), placeholder="blur", optional `priority`, `fit` (cover/contain), `position`,
  `caption`. It composes the existing RevealImage + optional Parallax (props: reveal, parallax). Background
  paper-2 while loading. Radius 0 (editorial). Optional `frame="browser"` that wraps screenshots in a minimal
  browser chrome (ink bar, 3 dots, 1px line) for KITOS/EduStack/NurAla/KIT screenshots.
- VideoLoop component: <video muted playsInline loop preload="none" poster>. Plays only when ≥40% in view AND
  motion === 'full'; pauses when out of view; reduced motion shows the poster only. Visible pause/play button
  (aria-pressed, 44×44). aria-label from the manifest. No audio track.
- PhotoBand: a full-bleed horizontal strip of 8–10 photos (aspect 4:5, height clamp(220px,28vw,420px)) using the
  existing Marquee (60s/loop, reactive, pausable). Reduced motion: static horizontally scrollable row.
- Gallery: an editorial asymmetric grid (12-col desktop: mix of spans 7/5, 4/4/4, 5/7 with varying aspect
  ratios; 2 columns tablet; horizontal snap-scroll on mobile). Each tile: RevealImage + hover inner scale 1.05.

STEP 3 — HOME: PUT REAL LIFE IN EVERY SECTION
1 Hero: replace the BrandGraphic with /images/groups/cohort-handbooks-wide.jpg (priority, sizes
  "(min-width:1024px) 42vw, 100vw"). Keep the exact layering (headline .1, photo -.15, stickers .3) and the
  overlap with line 2. Add a small mono caption "Kids in Tech cohort, 2026".
2 Under the text marquee add a PhotoBand (classroom/coding/community mix, no group shots).
3 Manifesto: add an asymmetric photo pair beside the body copy: coding/mentor-at-laptop.jpg (tall, cols 1–5)
  and classroom/full-class-wide.jpg (wide, cols 7–12, offset down 15%), both RevealImage + Parallax.
4 Proof (navy): add a "Built by our students" row of three project cards: projects/scratch-game.jpg (Scratch),
  projects/profile-website-1.jpg (Web Development), projects/robotics-arduino.jpg (Robotics). Each card: photo,
  track sticker, one-line description. Replace one card's image with VideoLoop scratch-game-loop on ≥1024.
5 "Bootcamps spark it. KITOS sustains it." (the pinned sequence — the owner says it is too plain): give each
  panel a large media element on the right half that crossfades with the panel (same scrub timeline):
  01 Bootcamps → VideoLoop kit-classroom-loop (vertical, in a 4:5 crop) ; 02 KITOS → kitos-2.png in browser
  frame, with kitos-7.png offset behind it ; 03 Progression → groups/cohort-stairs.jpg. Also add the large
  numerals and a thin progress bar (01/02/03) that fills with the scrub. Below 1024px: stacked panels, each
  with its media above the text.
6 KITOS (blue chapter): replace the BrandGraphic with a stacked screenshot composition: kitos-2.png front,
  kitos-27.png and kitos-31.png behind at offsets (+6%/-4%, rotate ±2°), each in browser frame, parallax at
  different speeds (.1/.2/.3).
7 Products: ProductRow cursor previews use real images: Kids in Tech → groups/cohort-classroom.jpg;
  KITOS → kitos-2.png; EduStack → its new screenshot (Step 6); NurAla → its screenshot (Step 7);
  SkillStack keeps BrandGraphic.
8 Studio teaser: add kitos-27.png in browser frame as "a platform we built".
9 NEW section before the closing CTA — "Inside Kids in Tech" (paper): SectionLabel "04 — Inside the
  classroom", h2 "Real rooms. Real projects.", then the Gallery with 9 images: classroom/demo-day,
  community/chess-with-mentor, coding/girls-coding, groups/cohort-kebbi-outdoor, projects/student-presenting,
  community/foosball, classroom/instructor-helping, projects/bootcamp-handbooks, community/jenga.
10 Closing CTA (ink): full-bleed background groups/parents-and-team.jpg with an ink overlay at 0.82 opacity
  (verify text contrast ≥ 7:1 over the darkest and lightest parts), slow parallax.

STEP 4 — ABOUT
- Hero: full-bleed groups/cohort-kebbi-outdoor.jpg under the headline (priority), clip-path reveal.
- Story: TEAM_FOUNDER_PHOTO (see TEAM PHOTOS below) next to the founder quote; if not set, use
  classroom/instructor-teaching.jpg.
- Mission (navy): background groups/cohort-families.jpg with navy overlay 0.86.
- Leadership & programme team: TeamCard gets a `photo` (4:5, object-position top). Unify mixed sources with
  one treatment: grayscale + subtle blue duotone by default, full colour on hover/focus (.4s). Use the mapping
  in TEAM PHOTOS. Anyone without a photo keeps the initials tile.
- Journey: each milestone gets a small thumbnail: KIT established → coding/mentor-at-laptop.jpg; cohorts
  delivered → groups/cohort-kebbi-outdoor.jpg; KITOS built → kitos-2.png; team expanded →
  classroom/instructors-together.jpg; robotics introduced → projects/robotics-arduino.jpg.
- Add a "Life at StarNova" PhotoBand before the CTA (community + classroom images).

STEP 5 — PARTNER & CONTACT
- Partner: one image per section: Schools → classroom/full-class-wide.jpg; Sponsors →
  projects/robotics-arduino.jpg; Investors → groups/cohort-handbooks-close.jpg; Product collaboration →
  kitos-27.png (browser frame). Alternate left/right placement.
- Contact: under the details, classroom/demo-day.jpg (4:3) with caption "Our learning space".

STEP 6 — EDUSTACK DEMO SCREENSHOTS
Open https://edustack-rho.vercel.app/ in your browser tool. Walk the demo (landing page, then any demo
login/role pages it exposes — use only demo credentials shown on the site; never invent or brute-force
credentials). Capture 6–8 screenshots at 1440×900 (CSS px, devicePixelRatio 1): landing, dashboard, students,
attendance/academics, finance, reports, mobile view (390×844). Save as PNG to public/images/edustack/
edustack-<view>.png, optimise (sharp, max 1600px wide), add them to the manifest/images module with alt text.
Update products.ts → edustack: stage 'building', stageLabel "In development · demo live", indexable true,
add demoUrl https://edustack-rho.vercel.app/ and a secondary CTA "View the demo" (external). If the demo shows
any real personal data, do not capture it — report instead.

STEP 7 — ADD NURALA LEARNING AS A PRODUCT
Add to products.ts:
  slug 'nurala-learning'; name 'NurAla Learning'; kind 'product'; category 'EdTech platform';
  stage 'live'; stageLabel 'Live'; stageStatus 'confirmed'; visible true; indexable true;
  oneLiner 'Quranic Arabic & Islamic learning platform with guided lessons, assessments, and progress tracking.';
  features: Guided lessons · Assessments · Mobile-first design · Progress insights (write one short sentence
  each, factual, no claims beyond the names);
  cta: { label: 'Visit website', href: NURALA_URL } — see below.
NURALA_URL: look for the production URL in ../../NurAla*, ../../NurAla Learning, ../../NurAla Academy (README,
package.json homepage, metadataBase, og:url) — read only. If found, use it and capture 3 screenshots (desktop
home, a lesson/feature page, mobile) into public/images/nurala/. If not found, leave href empty, hide the CTA
in production, and list it under "Blocked on content".
NurAla must appear in the Home ProductRow list and (in Batch 3) get its own /products/nurala-learning page.

STEP 8 — KIDS IN TECH WEBSITE SCREENSHOTS
Open https://kidsintech-web-git-main-mubarak-aliyus-projects.vercel.app/ and capture: desktop home (above the
fold), desktop full-page, gallery/about section, mobile home (390×844). Save to public/images/kit-site/. These
are used ONLY as a "Visit kidsintech.school" website preview inside a browser frame (Home Products row preview
for KIT and, in Batch 3, the KIT page "For parents" block) — never as hero imagery. If the URL is behind Vercel
authentication, say so and skip it. Public link text should point to https://www.kidsintech.school.

STEP 9 — STATS FROM PITCH DECK V3 (owner's current figures)
Update stats.ts from the owner's Pitch Deck v3: paying students 158; bootcamp cohorts 4; returning students 17;
student projects 40+; learning tracks 3. Source "Pitch deck v3 (2026)", asOf "2026", status 'confirmed'.
Never show revenue, valuation or round terms.

STEP 10 — PITCH DECK FILE
public/StarNova_Labs_Pitch_Deck_v3.pdf is currently publicly downloadable (it contains the raise, valuation and
unit economics). Move it to docs/reference/ (git mv if it is tracked; it is currently untracked) so it is no longer served, unless OWNER_ALLOWS_PUBLIC_DECK
below is "yes".

OWNER INPUTS (edit before pasting)
TEAM PHOTOS:
- Aliyu Mubarak (Founder & CEO): TEAM_FOUNDER_PHOTO = /images/team/founder-handbook.jpg   ← confirm or change
- Murtala Ishaq (COO): ____________________ (choose from /images/team/candidate-*.jpg or leave blank)
- Mustapher M. Lawal (CTO): /images/team/mustapher.jpg
- Faruk Yusuf: /images/team/faruk.jpg
- Aisha: /images/team/aisha.jpg
- Amina, Abdul Malik: none yet
- Unused candidates (do NOT publish unless named above): candidate-me.jpg, candidate-my-photo.jpg, candidate-pic.jpg
OWNER_ALLOWS_PUBLIC_DECK: no

MOTION (existing system, exact values)
All photos: RevealImage 'up' (1.2s power4.inOut, inner scale 1.25→1). Parallax as specified per section.
Galleries: tiles reveal with stagger .06. Screenshot stacks: parallax .1/.2/.3. Pinned media crossfade on the
same scrub as the panels. VideoLoop: fade in .45s when it starts playing. Team photo hover: grayscale→colour .4s
power3.out. Every new animation has its reduced variant (static, no parallax, videos show posters).

RESPONSIVE
Photos never cause horizontal scroll. Mobile: hero photo below CTAs at 4:3; PhotoBand height 220px; Gallery
becomes snap-scroll; pinned media stacks above text; screenshot stacks collapse to a single framed screenshot.

ACCESSIBILITY
Alt text from the manifest; purely decorative duplicates (marquee clones) alt="" and aria-hidden. Videos have
aria-label and a pause control; they never autoplay with reduced motion. Overlaid text meets 7:1 (large ≥ 4.5:1)
— measure over the photo, not over flat colour.

PERFORMANCE
Only the hero photo is priority; everything else lazy. Correct `sizes` on every Photo. Videos preload="none".
Home first view (above the fold) ≤ 1.2 MB transferred; JS budget rule unchanged (≤ +5 KB gzip vs main). Run
`npm run measure:js` before/after and report. No layout shift: every image has width/height.

GUARDRAILS
Do not change motion tokens or existing component APIs except adding optional props. Do not use files outside
the repo. No stock imagery. No child names. Do not start Batch 3.

DEFINITION OF DONE
build/typecheck/lint pass; lockup everywhere; every Home section, About, Partner and Contact show real imagery as
specified; EduStack + KIT-site screenshots captured (or blockers reported); NurAla in products; stats updated;
deck moved; Lighthouse mobile on / still Perf ≥ 85 (photo-heavy) with LCP ≤ 2.5s; branch pushed for preview.

MANUAL TEST CHECKLIST
[ ] Header/footer/menu show the horizontal lockup; inverts to the white version over dark sections.
[ ] Hero shows the cohort photo with the layered parallax; no layout shift on load.
[ ] Pinned "Bootcamps spark it" section: video, KITOS screens and group photo crossfade with each panel.
[ ] KITOS chapter: three framed screenshots with depth.
[ ] Gallery and PhotoBands: pausable, keyboard reachable, snap-scroll on phone.
[ ] About: team photos with names correct; duotone → colour on hover/focus.
[ ] Reduced motion: posters instead of video, no parallax, everything visible.
[ ] /StarNova_Labs_Pitch_Deck_v3.pdf returns 404.
[ ] 390px: no horizontal scroll anywhere.

SUGGESTED COMMIT MESSAGE
feat(imagery): horizontal lockup, real photography and video across core pages, KITOS/EduStack/NurAla screens, v3 stats
=== BATCH 2B END ===
```
