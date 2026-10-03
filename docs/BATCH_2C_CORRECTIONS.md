# BATCH 2C — Design corrections from the owner's review

Run on `feat/batch-02c-polish`, created from `feat/batch-02b-imagery` (2B is not merged yet; merge 2B first if it has been).

```text
=== BATCH 2C START ===
Branch: feat/batch-02c-polish

CONTEXT
The owner reviewed the Batch 2B preview at 1440px and found many visual defects. This batch fixes them. It is a
QUALITY batch: the result must look clean, consistent and deliberate on every page. You must LOOK at your work:
after each fix, use your browser screenshot tool to view the affected section at 1440×900 and 390×844 and
compare it against the requirement. "Verified structurally" is not acceptable for this batch.

New assets already added to the working tree (commit them first as "chore(assets): partner and product logos"):
  public/logos/partners/gdg-birnin-kebbi.png, hib-greenbox.png, startup-kebbi-onLight.png,
  startup-kebbi-onDark.png, starok-design-school.png
  public/logos/products/nurala-onLight.png, nurala-onDark.png, kids-in-tech.png
(all transparent PNGs, trimmed). Add them to the image manifest/module with alt text = the organisation name.

FIX 1 — LOADER NOT SHOWING + FLASH BEFORE THE HOMEPAGE
Symptoms: on load the owner sees page content (and/or partial loader pieces) flash before the homepage, and the
Ignition loader itself does not appear.
- Reproduce first in a fresh private window AND with sessionStorage cleared. Record what paints in the first
  500ms (use the browser tool; take screenshots at load).
- Requirement: on the first visit of a session the very first paint is the navy loader. Nothing from the
  header, hero or page may be visible before it. Put a tiny critical rule in <head> (inline <style>, before any
  stylesheet): when html lacks data-intro="done", [data-loader] is display:flex at z-index 100, opaque navy, and
  body content is not visible behind it. The bootstrap script that decides "skip intro" (sessionStorage, reduced
  motion) must run in <head> before first paint and set data-intro="done" immediately when skipping, so a
  returning visitor never sees a flash of the loader either.
- The loader must actually run its timeline (star blades assemble, 000→100 counter, progress line, blue wipe)
  — verify by screenshots at ~300ms, ~1s, ~2s on a fresh session.
- Add a dev/testing override: ?intro=1 forces the loader regardless of sessionStorage (works in production too,
  harmless).
- Fix the Next.js dev overlay "1 Issue" and the console errors (the owner's DevTools shows 1–2 errors and ~200
  warnings). Report what they were.

FIX 2 — BUTTON SYSTEM REDESIGN (Mango Grotesque, always clearly visible)
The current buttons use a 12px mono label, and the outline/"transparent" button disappears on navy and blue
backgrounds (e.g. "Explore Kids in Tech" on the navy proof section is almost invisible). Rebuild Button:
- Typography: Mango Grotesque 600, uppercase, letter-spacing 0.02em, line-height 1. md = 20px, lg = 24px.
  Optical centring for Mango's metrics: padding-top 0.12em (check visually that text is centred).
- Sizes: md height 52px, padding-inline 24px; lg height 64px, padding-inline 32px; min-width 168px; radius 4px.
  Arrow icon 18/22px with 12px gap.
- Variants (keep the existing variant names working; map them):
  primary (was solid-ink): light sections → ink bg, white text. Dark sections (navy/ink) → white bg, ink text.
    Blue sections → white bg, ink text. Hover: blue flood from pointer (on blue sections the flood is ink).
  secondary (was outline): 2px solid border + text in the section foreground colour: ink on paper/paper-2,
    white on navy/ink/blue. Hover fills with the foreground colour and flips the text colour. Never 1px, never
    a low-opacity ring, never transparent text.
  accent (was solid-blue): blue bg, white text; hover blue-press. Never used on blue sections (falls back to primary).
  link (was text-arrow): Mango 22px uppercase, 2px underline offset 6px, arrow; underline animation as before.
- Theme awareness WITHOUT props: drive colours with CSS from the nearest [data-theme] ancestor
  ([data-theme=navy|ink|blue] .btn--secondary { … }) so every button on every section is automatically legible.
  Keep an optional `tone="light|dark"` override.
- Remove the label-roll clipping artefact (the duplicate label currently shows a cut line through the text).
  If you keep the roll, the mask needs padding-block 0.15em so no glyph is clipped; verify at 100% zoom.
- Contrast: every button state ≥ 4.5:1 (text) and the button boundary ≥ 3:1 against its background. Check all
  five section themes and document the pairs in the README.
- Header: nav links in Mango 20px uppercase (no permanent underline; 2px underline grows on hover/focus; active
  page shows the gold star glyph). "Let's talk" = primary md. The header nav currently looks clipped/struck
  through ("KIDS IN IECH", "LEI'S IALK") — that must be gone.
- Apply the new Button everywhere (Home, About, Partner, Contact, footer, menu, 404, /lab). Show every variant
  on every theme in /lab.

FIX 3 — TYPOGRAPHY CONSISTENCY
- Section headings currently mix Mango (hero) with a thin generic-looking sans ("Bootcamps spark it. KITOS
  sustains it.", "One company. A growing portfolio."). Make every section h2 Mango Grotesque 600 uppercase with
  a new class .t-display-m: clamp(2.75rem, 5.5vw, 5.5rem), line-height .9, tracking 0. Archivo is used only for
  h3/card titles — and confirm it is actually loading (if the computed font is a fallback, fix the next/font
  setup). Inter for body. Mono only for small labels/stickers.
- One h1 per page still. Same SectionLabel → h2 → lead rhythm on every section (label 48px above h2, lead
  32px below h2, content 64px below lead). Apply on all pages.

FIX 4 — "BOOTCAMPS SPARK IT. KITOS SUSTAINS IT." (pinned sequence) IS BROKEN
Currently the panels fade in but never fade out, so "01/02/03", "Bootcamps/KITOS/Progression" and their body
text all stack on top of each other and are unreadable. Rebuild it:
- Layout ≥1024px while pinned: left column (cols 1–5): h2 at top, then a vertical step list 01 Bootcamps /
  02 KITOS / 03 Progression (the active step full ink, inactive at 30% opacity, a 2px blue bar beside the
  active one), then the active panel's body text in ONE text slot. Right column (cols 7–12): the media slot.
- Exactly one panel visible at a time: the outgoing panel's text and media animate out (opacity 1→0,
  yPercent 0→-12) in the first half of each step, the incoming animates in (opacity 0→1, yPercent 12→0) in
  the second half. They never overlap. One big numeral that updates (or numerals inside each panel) — never
  three numerals stacked.
- Media per step as in 2B (classroom video / KITOS screens / stairs group photo), crossfading on the same
  timeline, all the same size (4:5 frame, object-fit cover).
- The pinned section ends cleanly: pinSpacing on, the next (blue KITOS) section starts after the pin with its
  full top padding; nothing overlaps or jumps. Add 1 viewport of scroll per step (end '+=300%') and snap.
- Below 1024px and in reduced motion: three stacked blocks, each media above its text, normal spacing.
- Verify with screenshots at the start, middle of step 2, middle of step 3 and just after unpin.

FIX 5 — PRODUCTS ("What we're building")
- Remove NOAH completely: products.ts entry, any route/static params, menu/footer links, ProductRow, docs
  references in content. StarNova does not have that product.
- ProductRow hover previews: NurAla Learning → /logos/products/nurala-onLight.png shown on a paper card
  (object-fit contain, 32px padding). EduStack → its logo (see Fix 8) on a paper card, falling back to a demo
  screenshot. Kids in Tech → keep the classroom photo (or kids-in-tech.png on a card if the photo reads poorly).
  KITOS → screenshot. The preview must never cover the row text it belongs to (offset it from the pointer by
  24px and keep it inside the viewport).

FIX 6 — "WHO WE WORK WITH" MUST SHOW LOGOS
The owner confirms these partnerships and gives permission to show their logos: GDG Birnin-Kebbi, Startup
Kebbi, HiB Greenbox, Starok Design School. Set permission:true and add their logo files. Remove NurAla Learning
from partners (it is now a StarNova product). Render a logo marquee (not names): logo height 56px desktop / 40px
mobile, 96px gaps, grayscale + 70% opacity → full colour on hover/focus, pausable, edge fades in the section
colour. Use startup-kebbi-onLight.png on light backgrounds. Check the dark logos (Greenbox, Starok) are clearly
visible on paper.

FIX 7 — MENU OVERLAY: NO WAY TO CLOSE + LOGO ALIGNMENT
The overlay (z-60) covers the header, so the Menu button is hidden and there is no visible close control; the
lockup is centred instead of left.
- Give the overlay its own top bar that matches the header exactly: lockup (onDark) at the left, aligned with
  the page container's left edge (same x/y as the header logo); a "CLOSE ✕" button (Mango 20px, 44×44 min hit
  area) at the right in the exact position of the Menu button. Clicking it closes; Esc closes; clicking a link
  closes.
- Keep focus trap; focus moves to Close on open and back to Menu on close.
- Desktop layout: links column on the left (cols 1–7), contact block bottom-right (cols 9–12), aligned to the
  same baseline grid. Mobile: single column, contact after links.

FIX 8 — EDUSTACK + KIDS IN TECH SITE SCREENSHOTS (no new dependencies)
You can capture screenshots without adding packages by using the installed Chrome/Edge in headless mode, e.g.:
  "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --hide-scrollbars
    --window-size=1440,900 --screenshot="<abs path>\public\images\edustack\edustack-home.png" https://edustack-rho.vercel.app/
(use msedge.exe if Chrome is not installed; use --window-size=390,844 for mobile). Capture every public route of
the EduStack demo you can reach by URL (landing + any dashboard/demo routes linked from it). Optimise with
sharp (max 1600px wide). Download EduStack's logo from the public demo (inspect its HTML for the logo/favicon
asset; save to public/logos/products/edustack.svg or .png). Do the same for
https://kidsintech-web-git-main-mubarak-aliyus-projects.vercel.app/ (desktop + mobile home) → public/images/kit-site/.
If a URL needs authentication, report it and move on.

FIX 9 — CLEAN, NEAT, CONSISTENT PASS ACROSS ALL PAGES
Go section by section through /, /about, /partner, /contact (and the stubs) at 1440 and 390 with screenshots and
fix: overlapping elements; images colliding with the fixed header; awkward empty gaps (e.g. under the manifesto
photo pair); inconsistent section padding (use only the two section-pad tokens); photo aspect ratios (use 4:5,
4:3, 16:9 and 3:2 only); captions in one style (mono label, muted); stickers that cover text; the hero logomark
tile clipping at the fold. Every section boundary should feel deliberate.

FIX 10 — HOUSEKEEPING
- Remove the three unused /images/team/candidate-*.jpg files and their manifest entries (they are publicly
  reachable and unconfirmed).
- founder-handbook.jpg alt: "Aliyu Mubarak, Founder & CEO".
- Delete any stray review files (e.g. .logos-review.jpg) if present.

GUARDRAILS
No new runtime or dev dependencies. Do not change motion tokens. Keep the JS gate (≤ +5 KB gzip vs main). Do not
start Batch 3.

DEFINITION OF DONE
build/typecheck/lint clean; zero console errors; Next dev overlay shows no issues; loader verified on a fresh
session with screenshots; every button legible on every theme (screenshots in the summary from /lab); pinned
sequence verified with 4 screenshots; NOAH gone; partner logos visible; menu closes with a visible button and
logo is left-aligned; EduStack/KIT screenshots captured or blocker reported; branch pushed.

MANUAL TEST CHECKLIST (owner)
[ ] Fresh private window: navy loader first, star assembles, counter, blue wipe — no content flash.
[ ] Reload: no loader, no flash.
[ ] Every button readable on paper, navy, ink and blue sections; hover states clear.
[ ] Header nav text crisp (no cut lines).
[ ] "Bootcamps spark it" shows one step at a time and flows into the KITOS section.
[ ] No NOAH anywhere.
[ ] NurAla and EduStack rows show their logos on hover.
[ ] "Who we work with" shows four partner logos.
[ ] Menu: logo top-left, CLOSE top-right, closes on click and Esc.
[ ] 390px: no overlaps, no horizontal scroll.

SUGGESTED COMMIT MESSAGE
fix(design): loader first paint, Mango button system, consistent headings, pinned sequence, menu close, partner and product logos
=== BATCH 2C END ===
```
