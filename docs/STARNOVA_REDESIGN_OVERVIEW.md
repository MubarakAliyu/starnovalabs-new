# StarNova Labs — Website Redesign: Project Overview

**Document 1 of 2** · Discovery & design direction
**Prepared:** 26 September 2026 · **Owner:** Aliyu Mubarak (Founder & CEO)
**Companion:** `STARNOVA_EXECUTION_BATCHES.md` (Claude Code prompts)
**Build location:** `StarNova Labs/Vercel-Web/starnovalabs-next/` — a new **Next.js (App Router) + React** project. The existing Vite site in `Vercel-Web/starnovalabsweb/` stays untouched and live until cut-over.

---

## 0. Read this first — where the folder contradicts the brief

The folder is the source of truth. These points differ from the brief or need a decision before build:

| # | Brief said | Folder shows | Impact |
|---|---|---|---|
| 1 | Primary blue `#0074A9` | ✅ Confirmed. Every logo SVG uses `#0074A9` (`Branding/Logo/svg`, `Branding/new-logo/svg`). The site theme uses it as `--primary`. | None. Locked. |
| 2 | "Supporting navy and gold — confirm from assets" | **The logo files have no navy or gold.** They use blue `#0074A9` + near-black ink `#0A0D12`. Navy and gold exist only in the **Company Profile 2026** (`--navy #0B1B2E`, `--navy-2 #102A45`, `--navy-3 #16385C`, `--gold #C7972F`, `--gold-lit #DDB253`, `--brand-lit #2C9BD1`). | We adopt the Company Profile values as the official secondary palette. Please confirm they are approved brand colours, not one-off document styling. |
| 3 | — | `Branding/new-logo/svg` also contains logo variants in **`#1A8DC3`** (lighter blue) and **`#DD3614`** (red-orange). | Unclear whether these are approved variants or explorations. The redesign **does not use them** unless you confirm. |
| 4 | Products include Cuzoo, Zariya, HausaLearn | **No product documentation for Cuzoo, Zariya or HausaLearn in the folder.** The only Cuzoo item is an **invoice** (`invoice/Invoice - Cuzoo.pdf`), which reads as client work. NOAH is listed in the Company Profile only as "Pipeline · Scope TBC". | These are left out of the product list until you supply a description, stage and permission. The architecture makes adding them a data-only change. |
| 5 | Products: KIT, KITOS, EduStack, … | The **current live site does not mention KITOS at all**, even though the Company Profile, pitch deck and strategic briefing all call it the flagship product. The current site lists **NurAla Learning** as a "Live" StarNova product and shows **Godiya EMR/HMS** as a "Product Spotlight". | NurAla: is it a StarNova product, a partner, or a client? Godiya EMR reads as client work (hospital login screen), so it moves to Work/case studies. Decision needed on NurAla. |
| 6 | Contact: +234 906 098 5201 and +234 706 783 4186 | Only **+234 706 783 4186** appears (current Contact page, Company Profile). **+234 906 098 5201 is not in the website or the profile.** | We use both, as the brief says. Please confirm the second number is correct. |
| 7 | Positioning: "a Nigerian technology company … Kids in Tech as flagship" | The **current site** calls StarNova "a creative technology studio/lab" (agency framing: branding, web, custom software). The **Company Profile, Strategic Briefing and Pitch Deck** frame it as an **education technology company** ("school-powered STEM education", tagline *"Architecting Human Agency"*). | The brief sits between the two. The proposed IA (§6) leads with the EdTech/product story and keeps agency services as a secondary **Studio** section. Please confirm (see §9 Q1). |
| 8 | Fonts: **Mango Grotesque** for headings (downloaded), **PolySans** from the Kids in Tech web folder | **Mango Grotesque** is in `Vercel-Web/mango-grotesque-font-family/` (Regular 400 + SemiBold 600, TTF + WOFF, via Befonts). Its embedded licence says: *"freeware … use it freely for personal and commercial projects. The typeface files may not be modified without written permission from Rajesh Rajput."* ✅ Adopted as the display face. **PolySans** in `Kids In Tech/kids-in-tech/public/fonts/` and `Kids In Tech/web/…` is **every file a *Trial* build** (`PolySansTrial-*`, `polysanstrial-*`), the same as in the current StarNova site and Company Profile. Neue Machina in the profile folder is "Free for Personal Use". | Mango: use the supplied WOFF files **unmodified** (no subsetting or re-encoding — the licence forbids modification). It **lacks the Hausa letters ɓ ɗ ƙ ƴ, the ₦ sign, and arrows**, has only two weights and no tabular figures, so fallbacks and rules are specified in §4.2. PolySans: **trial fonts cannot legally ship on a commercial website** (kidsintech.school and the current StarNova site are exposed today). The redesign gives PolySans a font slot that stays switched off until a web licence is bought from Pangram Pangram. |
| 9 | "The codes is in vercel-web folder" | `Vercel-Web/starnovalabsweb` is a **Vite 6 + React 18 SPA exported from Figma Make**, not Next.js. Its parent `Vercel-Web/.git` has **zero commits**. A second, **older and diverged copy** lives in `Starnovalabswebsitedesign/` (Git, GitHub remote `MubarakAliyu/Starnovalabswebsitedesign`, last commit 23 Mar 2026, `HashRouter`, simulated contact form). | Two sources of truth, and the deployed code isn't under version control. The redesign starts clean in its own Git repo (see §8.7). |

---

## 1. Current state analysis

### 1.1 Repository map (`Vercel-Web/starnovalabsweb`)

| Aspect | Finding |
|---|---|
| Origin | Figma Make export ("StarNova Labs Website Design"). `package.json` name is still `@figma/my-make-file`. README points to the Figma file. |
| Framework | **Vite 6.3.5** + **React 18.3.1** + TypeScript (strict). React and React-DOM are declared only as **optional `peerDependencies`**, not `dependencies`. This is fragile: a clean install may not include React. |
| Router | `react-router-dom` v7, `BrowserRouter`. Client-side SPA. `vercel.json` rewrites every path to `/`. |
| Rendering | 100% client-rendered. Crawlers and social previews see an empty `<div id="root">`. |
| Styling | Tailwind CSS **v4.1.12** via `@tailwindcss/vite`. Tokens in `src/styles/theme.css` (shadcn-style CSS variables), `tailwind.css` (base typography), `fonts.css`. Utilities: `.glass-card`, `.glass-input`, `.glow-primary`. |
| Animation | **`motion` 12.23.24** (Framer Motion), `tw-animate-css`, a hand-rolled canvas `ParticleField`. No smooth-scroll library, no GSAP. |
| UI kit | ~48 shadcn/ui components in `src/app/components/ui/`. **None are imported by any page.** Also unused: MUI + Emotion, recharts, react-slick, react-dnd, embla, next-themes, react-hook-form, cmdk, vaul, etc. |
| Icons | `lucide-react` |
| Forms | `@emailjs/browser` on `/contact`. Service ID, template ID and public key are **hard-coded** in `ContactPage.tsx`. The Home page form uses a different method (`mailto:`). |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` (keep these in the new build). |
| i18n | Home-grown `LanguageContext` (EN / HA). Strings are inline ternaries in each component. Not persisted, not in the URL, not indexable. |
| Theme | `ThemeToggle` adds or removes `.dark`. Not persisted. Its default (`false`) disagrees with Navbar/Footer (`true`), so the wrong logo can flash. |
| Build/deploy | `vite build` → `dist`. Vercel (og:url `https://starnovalabsweb.vercel.app/`). Whether `starnovalabs.com` currently points at this project is **not documented** — needs confirming. |
| `.gitignore` | Contains `assets`, which **also ignores `src/assets/`**. A deploy from a clean Git clone would lose every image. |
| Conventions | PascalCase components, named exports, `@/` alias → `src/`, pages in `src/app/pages`. Cruft: `debug.log` (Chromium crashpad logs) committed in two places. `src/imports/*` (Figma SVG exports, `ColorPalette`) are unused. |

### 1.2 Current site map & information architecture

| Route | In nav? | Contents |
|---|---|---|
| `/` Home | ✅ | Typewriter hero ("Building Digital Products, Brands & Learning Platforms for the Future") over particle canvas, dot grid and blurred orbs · 2 CTAs · auto-rotating `ProductCarousel` (KIT, NurAla, Godiya EMR) · "Why StarNova Labs Exists" (3 value cards) · "Our Products (MVPs)" (KIT, NurAla, SkillStack, EduStack) · "What We Do" (6 service cards) · About teaser (icon placeholder "Innovation meets purpose") · "Companies In Strategic Partnership" logo scroller · Contact form (mailto) |
| `/about` | ✅ | Hero · Who We Are + Our Story (placeholder icon box) · What We Build (3 cards) · Core Values (3 cards) · CTA |
| `/products` | ✅ | Hero · 4 product cards with features + status · "Need something custom?" CTA |
| `/services` | ✅ | Hero · 5 service categories with bullet lists · CTA |
| `/mission` | ❌ **Orphan** — routed, not linked anywhere | Vision, Mission (placeholder icon boxes), 6 core values, CTA |
| `/contact` | ✅ | Hero · EmailJS form · email / phone / location cards · social icons · office hours · "Have a question?" |

**Navigation:** fixed top bar. Logo · Home · About · Products · Services · Contact · EN/HA pill · theme toggle · "Work With Us" pill. The mobile menu is a dropdown. **Footer:** logo, blurb, nav, social icons, email, © + Privacy/Terms.

**IA problems:** products are shallow (one card each, no detail pages). There is no Kids in Tech story even though it is the proof of execution. KITOS is missing. Mission lives on a hidden page. No case studies. No partner or investor path, which the Strategic Briefing and pitch deck both call for.

### 1.3 Design system as it stands

**Colour** (`theme.css`)

| Token | Light | Dark |
|---|---|---|
| `--primary` / `--accent` / `--ring` | `#0074A9` (rgba 0,116,169) | `#5094B3` |
| `--background` | `#FFFFFF` | `#0A0D12` |
| `--foreground` | `#0A0D12` | `#FFFFFF` |
| `--secondary` | `#E7E7E8` | `#6C6E71` |
| `--muted` / `--muted-foreground` | `#CECFD0` / `#6C6E71` | `#6C6E71` / `#B6B7B8` |
| `--border` | `#CECFD0` | `#6C6E71` |
| `--destructive` | `#DC2626` | `#DC2626` |
| charts | `#0074A9`, `#5094B3`, `#92C0D6`, `#6C6E71`, `#B6B7B8` | — |

Stray legacy blue: `ParticleField` and `.glow-primary` use **`#3E6FA6`** (rgba 62,111,166), the colour of the even older static site (`StarNova Web/README.md`: "StarNova Blue `#3E6FA6`", "Midnight `#0D0F14`"). The toasts hard-code `#0D0F14`. So **three blues and two blacks** are in circulation.

Product-card hover gradients use off-brand Tailwind purples, teals, ambers and roses.

**Typography:** headings `PolySans Wide` (trial OTFs, weights 300/400/600/900, plus CDN fallbacks from `fonts.cdnfonts.com`). Body `Montserrat` (Google, 300–900). Also loaded but unused: **Work Sans** and **Inter**. That's four font families from three hosts. Scale: h1 56 · h2 40 · h3 24 · h4 16 · body 16 · label 12 px. **Every page title is an `<h2>`. There is no `<h1>` anywhere.**

**Spacing/layout:** Tailwind defaults. `max-w-7xl` (1280px) container, `px-6 lg:px-8`, sections `py-20`/`py-32`, `--radius: 8px` (cards use `rounded-2xl`, buttons `rounded-full`). Centred, symmetric, card-grid layouts throughout.

**Components in use:** Navbar, Footer, ThemeToggle, language pill, ParticleField, TechDotsBackground, ProductCarousel, CompaniesSection (logo scroller), glass cards, pill buttons, glass inputs, Sonner toasts.

**Existing motion:** Motion `whileInView` fade-up (`y:30→0`, 0.8s, `cubic-bezier(0.16,1,0.3,1)`, `once:true`). Hover lift/scale on cards (`y:-8, scale:1.02`). Buttons scale 1.05/0.95. Typewriter at 40ms per character. Carousel autoplay 6s. Logo scroller moved by `setInterval` every 20ms. Infinite pulsing blur orbs. Navbar slides in. `window.scrollTo({behavior:'smooth'})` on route change. **No `prefers-reduced-motion` handling anywhere.**

### 1.4 Content inventory

**Copy on the current site** — carry-over value in brackets:

- Hero/positioning: "Building Digital Products, Brands & Learning Platforms for the Future" / "creative technology studio…" **[rewrite — agency framing, generic]**
- Values (site): Human-Centered Design, Purpose-Driven Innovation, Community First, Excellence in Execution, Transparency & Trust, Continuous Growth **[superseded by profile values]**
- Services: Product & Software Development; Design & Branding; Web Solutions; Educational Technology; Strategy & Consultation (with sub-lists) **[reuse, tighten for Studio page]**
- Product blurbs for KIT, NurAla, SkillStack, EduStack **[rewrite — thin]**
- Full Hausa translations of all of the above **[needs native review; some strings look wrong, e.g. "Muƙaman Gidajenmu" for "Core Values" and "Dukkan haƙƙoƙi a tanƙwafe suke" for "All rights reserved"]**
- Contact: "Office Hours Mon–Fri 9–6 **EST**" **[wrong timezone — should be WAT]**, "Location: Remote & Global" **[inconsistent with Sokoto/Kebbi operations]**

**The richest copy source is outside the site.** `Company Profile/StarNova_Company_Profile_2026_Web.html` has:
- Positioning: *"A Nigerian technology company delivering practical technology education to children — and building the digital products that carry that learning forward."*
- Vision, mission, 5 core values (Understanding First, Adaptability, Accountability, Practical Learning, Growth of People). The profile flags these as *"to be formally ratified … before external publication"*.
- Founder's message and pull-quote: *"Understanding matters more than finishing the syllabus."*
- KIT programme model: cohort flow (Placement → Build from day one → Peer support → Showcase), 3 tracks (Scratch; Web Development; Robotics & Embedded Systems), 5 teaching principles.
- Product portfolio & maturity: KITOS LMS (Delivered), KITOS OS (Scoping), EduStack (Pipeline), NOAH (Pipeline).
- Journey timeline, leadership bios (Aliyu Mubarak CEO, Murtala Ishaq COO, Mustapher M. Lawal CTO), programme team (Faruk Yusuf, Amina, Abdul Malik, Aisha).
- Problem/audience/positioning, "Where we're heading" (3 shifts), partnership & investment options.

Other sources:
- `StarNova_Labs_Strategic_Briefing(1).pdf`: tagline **"Architecting Human Agency"**. Mission: *"To equip the next generation with the knowledge, skills and confidence to understand technology, build with it and use it to solve meaningful problems."* Vision: *"Africa's leading school-powered STEM education ecosystem."* Four phases (Validate → Institutionalize → Scale → Platform Expansion). The progression *Exposure → Understanding → Experimentation → Building → Problem Solving → Creation*. (This PDF is addressed to a specific partner, Real Edifice, so reuse its general content only.)
- `Documents/StarNova_Labs_Pitch_Deck_v2.pptx`: "Est. 2025". Traction: **111 paying students, 3 bootcamp cohorts, 17 returning students, 35+ student projects, ₦2.227M revenue**. KITOS feature set (Learning Pathways, Project Portfolios, Innovation Challenges, Student Profiles, Parent Dashboard, School Leaderboards). B2B2C model. Two parent testimonials (Mrs. Bazata, Mrs. Adewunmi). Quote "Talent is evenly distributed. Opportunity is not." — Leila Janah.
- `meetings/StarNova_KidsInTech_Master_Roadmap_v5` and `Week11` minutes: KITOS status (payments + API done; final testing, Zoom integration, deployment outstanding). EduStack (school management) and SkillStack (future-skills platform) resume after KITOS ships. Branching curriculum (Scratch → Web Dev / Robotics). First anniversary approaching.

**⚠ Data conflicts to resolve before anything is published:**
- Cohorts: pitch says **3**, profile says **4** (Bootcamp 4.0).
- KITOS LMS: profile says **"Delivered"**, roadmap v5 says **"V1 MVP IN PROGRESS"**.
- Three different mission statements (site, profile, briefing) and two value sets.
- "Faruk" (profile) vs "Farouk" spelling.
- Profile counters are placeholder zeros, and several sections say "To be completed".

### 1.5 Imagery inventory

| Asset | Location | Verdict |
|---|---|---|
| Logo — horizontal wordmark + star | `Branding/new-logo/svg/StarNova.svg` (blue star, **white** letters — for dark backgrounds), `Branding/Logo/svg/StarNova-1.svg` (blue star + ink `#0A0D12` letters). ⚠ The file with the same name in `new-logo/svg/StarNova-1.svg` is the **red-orange `#DD3614`** variant — not the same file. | ✅ **Use** (copied to `starnovalabs-next/docs/brand-source/logo/`) |
| Logomark (star in rounded square) | `Branding/new-logo/svg/logomark.svg` (`#0074A9`), `logomark-1.svg` (`#0A0D12`), PNG `logomark_white.png` | ✅ Use. The four-blade star is a gift for motion (§5). |
| Stacked lockups | `new-logo/svg/Frame 2*.svg` (390×283 stacked, 519×103 horizontal-with-mark) | ✅ Use for loader/footer/OG |
| `Frame 5*.svg` / `StarNova-1.svg` in `#1A8DC3` / `#DD3614` | `new-logo/svg` | ❓ Unconfirmed variants — do not use |
| `src/assets/logo-dark.png`, `logo-light.png` | site | ⚠ Replace with SVG |
| `kidsintech.png` (3779×2055, 1.8 MB) | site | ⚠ **Screenshot of kidsintech.school**, not a photo. Contains real children's photos. Replace with proper photography (with consent). |
| `nurala.png` (0.9 MB), `emr.png` (1.0 MB) | site | ⚠ Website/app screenshots. `emr.png` is a Godiya Hospital **login screen** — client work, needs permission. |
| Partner logos: `kids logo.png`, `startupkebbi.png`, `gdgkebbi.png`, `greenbox.png`, `NoorAlaLogo*.png`, `starok.png`, `startup.png` (337×150, low-res) | site | ⚠ Confirm each is a real, current partnership with permission to display. "StarOk" and "Startup" are unidentified. StarNova's own logo is listed among "partners" — remove it. |
| Branding mockups (cap, mug, T-shirt, tote), business cards, letterhead, ID cards | `Branding/*` | 🟡 Brand-world texture only (e.g. an "Identity" strip on About). Not hero material. |
| Flyer (KIT Bootcamp 4.0) | `Flyer Design/` | 🟡 Contains real classroom photos (small, composited). Ask for the **original photo files**. |
| `LMS/1–5.jpeg` | `LMS/` | 🚫 **Handwritten attendance registers with children's full names, schools and classes.** Must never go on the website or into the repo. (The folder name suggests LMS screenshots; it isn't.) |
| `Kids In Tech/Bootcamp 4.0/1–7.jpeg`, `Bootcamp 3.0/Bootcamp_Contact_List.pdf`, `Bootcamp 4.0/*Lead_Tracker.xlsx` | `Kids In Tech/` | 🚫 **Handwritten sign-up sheets and lead lists with children's names and parents' phone numbers.** Never on the site, never in the repo. |
| `Kids In Tech/Bootcamp 2.0/images/` (HEIC photos, MOV clips, `IMG_0009.JPG`) + `Bootcamp 2.0/KIDS IN TECH(1080p).mp4` (87 MB) | `Kids In Tech/` | 🟢 **Most promising real footage in the folder.** Needs a consent check, then selection, HEIC→JPG conversion and a 6–10s muted hero loop cut from the video (≤ 1.5 MB). |
| Bootcamp social posts / flyer designs (`Bootcamp 2.0/*_version_1.png`, `Bootcamp 3.0/Social post*.jpg`) | `Kids In Tech/` | 🟡 Marketing graphics, not photography. Use only as "KIT in the wild" references, not hero imagery. |
| `Kids In Tech/Website design/*.png` | `Kids In Tech/` | 🟡 Design comps of kidsintech.school. Reference only. |
| KITOS screenshots | Referenced in pitch deck slide 8 ("Inside KITOS v1.0: Screenshots") | ❓ Not found as separate files. Export them from the deck, or better, capture fresh ones with mock data. |
| Company Profile image slots | profile HTML | Placeholders only ("Company image / Team or classroom", "Founder portrait", "Robotics practical"). |
| Team photography | — | ❌ **None.** The profile explicitly lists it "For completion". |

**Stock imagery — flagged for removal and never to be used:**
- `Kids In Tech/child-making-robot.jpg` (6122×3444, stock model photo — not a KIT student)
- `Kids In Tech/adorable-girl-being-passionate-about-robotics.jpg`
- `Kids In Tech/childhood-modern-technology-electronic-gadgets-concept-serious-handsome-schoolboy-…png`
- `Kids In Tech/3d-rendering-device-background.png` / `.zip`
- Numbered stock vector illustrations: `Kids In Tech/25001216_7040861.svg`, `25872320_kids_cleaning_beach_07.svg`, `34424493_8170009.svg`, `4457733_2347616.svg`, `8966905_4043724.svg` (stock-library naming pattern)
- `Kids In Tech/design_*.png`, `designs_*.png`, `design_image_*.png` — **unverified**. They look like generated or stock composites. Confirm their origin before any use.

These are not in the current StarNova site, but they sit next to the real KIT material and could easily be picked up by mistake. The current site's `ATTRIBUTIONS.md` also credits **Unsplash photos** (Figma Make template boilerplate). **No Unsplash image is actually referenced in the current code.** Instead, every "image" slot on About and Mission is a gradient box with a Lucide icon and filler text ("Innovation meets purpose", "Technology with vision and purpose", "Building with purpose and passion"). **All of these placeholders must go, the Unsplash attribution must be deleted, and the new build must ship zero stock photography.** Where real photography isn't ready, the design uses typographic and brand-graphic compositions, never stock.

### 1.6 Product inventory

| Product | What it is (per folder) | Stage (per folder) | Assets available | Source |
|---|---|---|---|---|
| **Kids in Tech (KIT)** | Flagship project-based STEM/coding programme for children (8–18) delivered through partner schools as bootcamps. Tracks: Scratch, Web Development, Robotics & Embedded Systems. Branching pathway after the Scratch foundation. Live site **kidsintech.school**. | **Live** — Bootcamp 4.0 delivered. 111 paying students (pitch). | KIT logo PNG, flyer, site screenshot, pitch metrics, 2 testimonials, profile copy | Profile §05–07, pitch, roadmap v5 |
| **KITOS** (Kids in Tech OS) | Learning platform that extends KIT beyond bootcamps: learning pathways, project portfolios, innovation challenges, student profiles, parent dashboard, school leaderboards. Retains students between cohorts. `lms.kidsintech.school`. | **KITOS LMS v1: "Delivered" (profile) vs "in final testing" (roadmap).** Payments + API done; Zoom + deployment pending. | Pitch slide 8 screenshots (not extracted) | Profile §08, pitch §7–9, briefing |
| **KITOS OS** | "A distinct product alongside the LMS within the KITOS family." | **Scoping** | None | Profile §08 |
| **EduStack** | School-management system / "school-focused LMS and academic tools". | **Pipeline** — resumes after KITOS (roadmap). Current site says "In Development". | None in folder | Profile, roadmap, site |
| **SkillStack** | "Future skills" / skills-based learning & career-building platform. | **Pipeline** / "In Development" (site) | None | Roadmap, site |
| **NOAH** | "Identified in the pipeline … revenue-generating product." | **Pipeline, scope TBC** | None — **no description exists** | Profile |
| **NurAla Learning** | Quranic Arabic & Islamic learning platform. `NurAla Academy/` and `NurAla Learning/` code folders exist. | Site says "Live" (link is `#`) | Logos, screenshot | Site only |
| Godiya EMR/HMS | Hospital management system | Client work (inferred) | Login screenshot; `godiaemr_for-respoosive/` code | Site carousel |
| Huzmart ERP | ERP PRD + proposal/SOW | Client work | Documents only | `Works/` |
| Cuzoo | — | Invoice only → client work (inferred) | Invoice | `invoice/` |
| Zariya, HausaLearn | — | **Not present in folder** | — | — |

### 1.7 Gaps & issues (audit)

**Broken or dead**
- Social icons (Twitter, LinkedIn, GitHub) all link to `#`, on Footer and Contact.
- Privacy Policy and Terms of Service link to `#`. No pages exist. This matters more for a company that collects enquiries about children.
- Home "View All Products" links to `#contact`.
- NurAla "Visit Website" goes nowhere (`link: '#'`).
- `/mission` is unreachable from the UI.
- `og:image` → `/preview.png` does not exist in `public/`.
- Several internal links use `<a href>` (full page reload) instead of router links.

**Content**
- KITOS absent. No KIT narrative, no team, no traction numbers, no testimonials, no case studies.
- Placeholder icon boxes stand in for imagery on About and Mission (×4).
- Emoji in UI copy ("Built with ❤️", toast "🚀", "❌").
- Wrong timezone (EST) and vague location.
- Hausa strings need native review.

**Accessibility**
- No `<h1>` on any page. The home "headline" is a typewriter re-rendering an `<h2>` every 40ms, which is noisy for screen readers.
- Auto-rotating carousel (6s) and auto-scrolling logos with no pause control (WCAG 2.2.2).
- Carousel arrows and dots have no accessible names. The carousel is a `div role="button"` wrapping other buttons (nested interactive controls).
- Infinite pulse animations. No reduced-motion support.
- Form uses placeholders as labels on Home. Focus styles rely on the default `outline-ring/50`.

**Performance**
- Four font families from three hosts (Google, cdnfonts, local OTF — no WOFF2).
- Full-screen canvas particle loop running permanently.
- 1–1.8 MB PNG screenshots, unoptimised.
- CSR-only, so LCP waits on JS.
- 60+ unused dependencies installed.

**SEO**
- One `<title>` ("StarNova Labs Website") for every route. No per-page meta, sitemap, robots, or structured data. Social previews are broken. Canonical is the vercel.app URL.

**Engineering/security**
- EmailJS IDs and key hard-coded in source.
- Deployed code is not in Git (parent repo empty). Diverged older copy with a GitHub remote.
- `.gitignore` excludes `src/assets`.
- Trial or personal-use fonts shipped publicly.
- React missing from `dependencies`.

**Brand**
- Three blues (`#0074A9`, `#5094B3`, `#3E6FA6`) and three blacks in circulation.
- Off-brand purple, teal, amber and rose gradients.
- Glassmorphism, particle and orb aesthetic reads as a generic template, not StarNova.

---

## 2. Design reference analysis — wearecheck.co

*Method:* I retrieved and read the page structure and markup. I could not observe live motion, so the motion reading below combines what the structure implies with the behaviours named in the brief. Treat the reference as **principles**, not a spec to copy.

**What the site is:** a strategy, digital and brand agency site (built on Nuxt). Nav: Welcome · About us · Services · Work. Hero word: "Reimagine" / "Re/think/Everything". Sections: positioning line → services (Strategy, Digital, Brand) → impact trio (Growth, Impact, Speed) → headline stats (13 countries, $400M+ raised) → work → "Got a big problem to solve?" CTA → footer. CTAs: "Let's Build", "Let's Begin", "Our Work".

**The language, articulated:**

1. **Typography *is* the layout.** Display type is set so large that one or two words fill the viewport width. It uses a condensed grotesque, tight negative tracking and sub-1.0 line-height, so lines nearly touch. Headlines work as horizontal bands that divide the page. Words are used as architecture, and they carry hierarchy that other sites give to boxes and rules.
2. **Editorial asymmetry.** Content sits off-centre. Small body copy is placed in narrow columns against giant type. Images overlap or tuck into the counters of headlines, or interleave between lines of type, instead of living in cards. Generous negative space around a few very dense moments.
3. **Horizontal rhythm.** Full-bleed bands: marquee rows, oversized words and wide image strips give a left-to-right cadence as you scroll down.
4. **Near-monochrome + sticker accents.** The base is black, white and off-white. Colour appears in small, saturated doses: skewed "sticker" labels and highlight chips, rotated a few degrees, like tags slapped onto the layout. Because colour is rare, it is loud.
5. **Loader as brand overture.** A full-screen intro cycles repeated marquee wordmarks ("LOADING ENGINEERING / LOADING CHECK / LOADING STRATEGY…"), with a progress bar and a percentage counter. It establishes voice before content appears.
6. **Motion as the continuity layer.** Inertia scrolling. Headlines that reveal line by line from behind masks. Images that unclip. Type and image layers moving at different speeds. Marquees that respond to scroll. Buttons that lean toward the cursor. Page changes that feel like one continuous surface rather than a cut.
7. **CTAs:** heavy black blocks, confident labels, directional arrow.
8. **Feel:** controlled irreverence. It breaks grid conventions, but every break is deliberate.

**Imitation guardrails.** The brief risks drifting into a clone at these points. We avoid each:

| Risk | Check does | StarNova does instead |
|---|---|---|
| Loader copy | "LOADING X" repeated wordmarks | Four blades of the StarNova star assemble in the centre while a **product/track roll-call** marquees behind (Kids in Tech · KITOS · Scratch · Robotics · Web · EduStack). A mono counter reads `000 → 100`. It exits via a **blue panel wipe** — the blue is ours. |
| Hero wordplay | "Re/think/Everything" slash-split word | A statement built from StarNova's own line, *Architecting Human Agency* / *Build what's next*, with the logomark acting as a typographic glyph inside the headline. No slash-splitting device. |
| Palette | Black/white + their accents | **Blue-led**. Navy and ink bases, cool paper, gold stickers (§4.1). Black is used, but blue carries brand weight. |
| Stickers | Coloured skewed tags | **Code-tag stickers** in mono type — `<build/>`, `<ship/>`, `{ learn }`. This idiom already exists in StarNova/KIT collateral (the KIT Bootcamp 4.0 flyer uses `<Build/>`, `create`, `Innovate` pills). It is inherited, not borrowed. |
| CTA | Black block + arrow, "Let's Build" | Ink block that **floods blue from the star's centre** on hover, with the arrow rotating to the 45° star axis. Labels in StarNova voice: "Start a project", "Partner with us", "Enrol a school". |
| Stats band | "13 countries / $400M+" | StarNova's actual traction, shown as a count-up **ticker on a navy band**, with a source note. |
| Wordmark | Check's condensed wordmark | Logo always from the supplied SVG. Never re-typeset. |
| **Display typeface** | A tall condensed grotesque (you identified it as Mango Grotesque; I couldn't verify this from the markup) | We use **Mango Grotesque too**, by your choice. **This is the single biggest resemblance risk**: the same face at the same scale reads as the same site. So everything else must diverge: blue/navy palette instead of monochrome, mono code-tag stickers, the star-blade system, a cool paper background, and Archivo (not Mango) for all secondary headings, so Mango is reserved for XXL/XL display moments only. |

---

## 3. Redesign vision & rationale

**What the new site is.** The home of a Nigerian technology company that builds education technology and proves it in real classrooms. Kids in Tech is the living proof of execution. KITOS is the platform that scales it. EduStack, SkillStack and NOAH are the pipeline. A Studio arm shows the same team builds for clients.

**Who it's for** (in priority order):
1. **Schools and institutions** — the distribution layer in the B2B2C model. They need credibility, a clear programme and a "partner with us" path.
2. **Parents** — trust, outcomes, safety, how to enrol. Most will arrive via KIT and continue to kidsintech.school.
3. **Investors and strategic partners** — the pre-seed round (pitch: "closing by October 2026"). They need traction, team, roadmap and seriousness.
4. **Clients for Studio work** — capability and case studies.
5. **Talent** — tutors and engineers (the profile stresses "growth of people").

**What it must achieve:**
- Replace "generic creative agency template" with **"serious, confident, African EdTech company"** within 5 seconds.
- Make **KIT → KITOS → pipeline** legible as one story (programmes → products → infrastructure).
- Give each audience one obvious next step (Enrol / Partner / Invest / Start a project).
- Be fast on mid-range Android phones over Nigerian mobile networks, and accessible.
- Be easy to extend: new products, case studies and numbers become data edits.

**Why this direction fits StarNova.** The strategy documents describe a company moving *"from informal to investable"* and *"from programmes to products"*. An editorial, type-led, confidently animated site signals exactly that shift: considered, deliberate, premium. It keeps the energy that suits a company about children building things. The Check principles (type as structure, rare loud colour, motion as continuity) work well with StarNova's assets: a strong geometric logomark (four blades = natural animation), one owned blue, and an existing code-tag voice from KIT. The result should read as *"the most confident edtech company in Northern Nigeria"*, not *"an agency that also does education"*.

**Tone of voice:** plain, declarative, specific. Short sentences. Numbers over adjectives. No emoji. Positive and inclusive language about every child (the KIT child-safety policy mandates positive language).

---

## 4. Proposed design system

### 4.1 Colour

**Principle:** Check's near-monochrome logic, translated. The **base is ink/navy + cool paper**, **blue is the brand voice** used in bold blocks (not sprinkled), and **gold is the sticker** — rare, small, loud.

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0A0D12` | Logo black. Primary text on paper, CTA blocks, the darkest sections |
| `--navy` | `#0B1B2E` | Dark section base (StarNova's "black", distinct from Check's pure black) |
| `--navy-2` | `#102A45` | Raised surfaces on navy, cards on dark |
| `--navy-3` | `#16385C` | Borders/hover on dark |
| `--paper` | `#F5F9FC` | Default light background (cool, blue-tinted — not Check's warm off-white) |
| `--paper-2` | `#EAF2F8` | Alternate light band |
| `--white` | `#FFFFFF` | Cards on paper, text on blue/navy |
| `--blue` | `#0074A9` | **Brand.** Full-bleed "chapter" sections, loader wipe, page-transition curtain, CTA hover fill, links on light, focus ring on light |
| `--blue-press` | `#005F8A` | Pressed/active state of blue |
| `--blue-lit` | `#2C9BD1` | Blue **on dark** (links, highlights, focus ring on navy) |
| `--blue-soft` | `#E4F1F8` | Tints, selection background |
| `--gold` | `#C7972F` | Sticker fill, star sparkle, key-number underline |
| `--gold-lit` | `#DDB253` | Gold on navy/ink |
| `--body` | `#41566B` | Secondary text on paper |
| `--muted` | `#77909F` | Meta text ≥ 18.66px bold / 24px only, or decorative |
| `--line` | `#DBE6EE` | Hairlines on paper |
| `--line-dark` | `rgba(255,255,255,0.14)` | Hairlines on navy/ink |
| `--error` | `#C8321E` | Form errors (check contrast on paper at build) |

**Proportion target per page:** ~60% paper/white · ~25% navy/ink · ~12% blue · ≤3% gold.

**Where blue carries weight:**
- One **blue chapter** per page — a full-bleed section with white display type (Home: "KITOS" chapter; KIT page: the tracks).
- The **page-transition curtain** and **loader wipe** are blue, so blue is the colour of *moving between places*.
- CTA hover flood. Link colour on paper. Focus rings.
- The logomark.

**How gold is used:** only for **sticker labels** (with ink text), the tiny star "sparkle" glyph, and one highlight underline per key statistic. **Gold is never text on paper** (it fails contrast).

**Verified contrast (WCAG 2.2):**

| Pair | Ratio | Use |
|---|---|---|
| `#0A0D12` on `#F5F9FC` | 18.4 | ✅ Body/display |
| `#41566B` on `#F5F9FC` | 7.2 | ✅ Secondary body |
| `#77909F` on `#F5F9FC` | 3.2 | ⚠ Large text / decorative only |
| `#0074A9` on `#FFFFFF` / `#F5F9FC` | 5.2 / 4.9 | ✅ Links, small text |
| `#FFFFFF` on `#0074A9` | 5.2 | ✅ Text on blue chapters/buttons |
| `#0A0D12` on `#0074A9` | 3.8 | ⚠ Large display only |
| `#0074A9` on `#0B1B2E` | 3.4 | ❌ Text — use `--blue-lit` instead |
| `#2C9BD1` on `#0B1B2E` | 5.6 | ✅ Blue on dark |
| `#F5F9FC` on `#0B1B2E` | 16.4 | ✅ Text on navy |
| `#DDB253` on `#0B1B2E` | 8.7 | ✅ Gold on navy |
| `#0A0D12` on `#C7972F` | 7.3 | ✅ Sticker text |
| `#C7972F` on `#F5F9FC` | 2.5 | ❌ Never |
| `#FFFFFF` on `#005F8A` | 7.0 | ✅ Pressed button |

**No theme toggle.** Light and dark are art-directed per section (paper → navy → blue chapter), as in editorial print. This removes the current flash and mismatch bugs and is part of the look. (Open question §9 Q6.)

### 4.2 Typography

| Role | Face | Source / licence | Fallback stack |
|---|---|---|---|
| **Display** (XXL/XL/L headlines, big numbers, marquees, loader) | **Mango Grotesque** SemiBold 600 (primary) and Regular 400 (large secondary lines). Uppercase for XXL/XL. | Supplied: `Vercel-Web/mango-grotesque-font-family/*.woff`. Freeware, commercial use allowed, **files must not be modified**. Load the `.woff` files as supplied via `next/font/local`: no subsetting, no WOFF2 conversion, no glyph editing. | `"Mango Grotesque", "Archivo", "Arial Narrow", sans-serif`. Archivo also supplies the glyphs Mango lacks (ɓ ɗ ƙ ƴ, ₦, arrows). |
| **Headings** (h2 below display size, h3, card titles, nav in the overlay) | **Archivo** variable (width axis `wdth 75–100`, weights 600–800) | Google Fonts, OFL, via `next/font/google` | `"Archivo", system-ui, sans-serif` |
| **Text** (body, UI) | **Inter** variable (400–600) | Google Fonts, OFL | `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| **Mono** (stickers, labels, counters, code-tags) | **JetBrains Mono** (500–700) | Google Fonts, OFL | `"JetBrains Mono", ui-monospace, Menlo, monospace` |
| **Brand sans — reserved slot** (optional; e.g. lead paragraphs, pull-quotes) | **PolySans** (Neutral/Median) | ⛔ **Only trial files exist** (in `Kids In Tech/kids-in-tech/public/fonts/` and `Kids In Tech/web/…/public/fonts/`). **Not used until a web licence is bought.** The token `--font-brand` exists and points to Inter until then; switching is a one-line change plus dropping licensed WOFF2 files into `src/fonts/`. | Inter |

**Mango Grotesque rules** (it's a free display face with limits):
- **Weights available: 400 and 600 only.** No faux bold (`font-synthesis: none`).
- **Missing glyphs:** Hausa hooked letters `Ɓ ɓ Ɗ ɗ Ƙ ƙ Ƴ ƴ`, the naira sign `₦`, and arrows `→ ↗ ✦`. The browser falls back per glyph to Archivo, which can look mismatched inside a giant headline. So: **Hausa display headlines use Archivo (condensed) instead of Mango.** Write "NGN" or set `₦` in the mono/text face at display sizes. Arrows and the star are **SVG components**, never characters.
- **No tabular figures:** animated counters use a fixed-width box per digit (`display:inline-block; width: 0.55em; text-align:center`) or render numbers in JetBrains Mono, so count-ups don't jitter.
- **Tight metrics** (ascent 750 / descent −210, UPM 1000): at line-height 0.82 the accents on capitals clip inside masks. The line-mask reveal uses `padding-block: 0.08em` on each line wrapper.
- **Reserve it for XXL / XL / L display moments and counters.** Everything smaller uses Archivo. This keeps text readable and limits the resemblance to the reference site (§2).
- The designer (Rajesh Rajput) publishes a fuller, possibly variable, version via Behance/Gumroad. Downloading from the designer's own page is the cleaner provenance than the Befonts mirror, and may add weights. Same licence terms apply. Keep the licence text in `src/fonts/mango-grotesque/LICENSE.txt`.

- **Why Inter for body, not Montserrat:** Montserrat is a wide geometric face. Against a very condensed display it makes body copy long and loose on mobile. Inter is denser and more legible at 15–17px. Montserrat stays in print collateral. If you prefer continuity, Montserrat can replace Inter at `body` size (§9 Q5).
- **Logo:** the wordmark is always the supplied SVG, never typeset.
- Google fonts load via `next/font/google` (self-hosted at build, subsets `latin` + `latin-ext` for Hausa, `display: swap`). Mango loads via `next/font/local` and is the only preloaded face.
- **Batch 1 must render a glyph-test string** in every face (`Ɓɓ Ɗɗ Ƙƙ Ƴƴ ₦ 0123456789 “quotes” — dash`) on the dev style page to confirm coverage and fallbacks.

**Fluid type scale:**

| Token | Size | Line-height | Tracking | Notes |
|---|---|---|---|---|
| `display-xxl` | `clamp(5rem, 20vw, 22rem)` | 0.82 | −0.01em | **Mango 600**, uppercase. Hero, loader, marquee words. |
| `display-xl` | `clamp(4rem, 13vw, 13rem)` | 0.84 | −0.01em | **Mango 600**, uppercase. Chapter titles. |
| `display-l` | `clamp(3rem, 8vw, 8rem)` | 0.88 | 0 | **Mango 600** (or 400 for secondary lines). Section heads. |
| `h2` | `clamp(2rem, 4.5vw, 4rem)` | 0.95 | −0.02em | Archivo 800, wdth 75 |
| `h3` | `clamp(1.5rem, 2.4vw, 2.25rem)` | 1.05 | −0.01em | Archivo 700, wdth 85 |
| `lead` | `clamp(1.125rem, 1.6vw, 1.5rem)` | 1.4 | −0.005em | Inter 500 |
| `body` | `clamp(1rem, 0.95rem + 0.2vw, 1.0625rem)` | 1.6 | 0 | Inter 400, max 64ch |
| `small` | `0.875rem` | 1.5 | 0 | Inter 400/500 |
| `label` | `0.75rem` | 1.2 | +0.08em | JetBrains Mono 600, uppercase |
| `counter` | `clamp(3.5rem, 9vw, 9rem)` | 1 | 0 | Mango 600 with fixed-width digit boxes (no tabular figures in the font) |

Rules: exactly one `h1` per page. Display type is real text (never images). Words are split into lines for animation with `aria-label` preserved.

### 4.3 Spacing, grid, layout

- **Base unit 4px.** Scale: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192 · 256`.
- **Section padding (vertical):** `clamp(96px, 14vw, 224px)`. Tight sections: `clamp(64px, 8vw, 128px)`.
- **Page margin:** `clamp(16px, 4vw, 64px)`. **Gutter:** `clamp(16px, 2vw, 32px)`.
- **Grid:** 4 columns (<640) · 8 columns (640–1023) · 12 columns (≥1024). Max content width **1440px**. Display type and marquees may be **full-bleed** (ignore the max width).
- **Breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`. Designs are validated at 360, 390, 768, 1024, 1280, 1440 and 1920.
- **Asymmetry rules:** body copy blocks sit on columns 7–11 or 2–6, not centred. Images take off-grid spans (e.g. cols 1–5 overlapping a headline on cols 3–12). Max one centred composition per page (the final CTA).
- **Radius:** `0` for sections and images (editorial). `4px` for buttons, inputs and stickers. `22%` squircle only for the logomark tile (matches the logo).
- **Hairlines:** 1px `--line` / `--line-dark`, used as section dividers with a mono label (`01 — About`).

### 4.4 Component inventory

| Component | Notes |
|---|---|
| `SiteHeader` | Logo left. Desktop links (Kids in Tech · Products · Studio · About). "Let's talk" block CTA. Menu button. Hides on scroll down, returns on scroll up. Inverts colours over dark/blue sections. |
| `MenuOverlay` | Full-screen navy. Giant display links with index numbers. Contact details and socials. Focus-trapped, closes on Esc. |
| `SiteFooter` | Giant "Build what's next" line + CTA. 4 link columns. Contact (email, 2 phones). Legal. Motion toggle. © line. Logo lockup. |
| `Loader` | First visit per session (§5.2) |
| `PageTransition` / `TransitionLink` | Blue curtain (§5.8) |
| `Button` | Variants: `solid-ink` (default), `solid-blue`, `outline`, `text-arrow`. Sizes: md, lg. Magnetic on fine pointers. |
| `Sticker` | Mono label, rotated −4°…+4°, gold/blue/white/ink fills |
| `RevealText` | Line-mask reveal (§5.4) |
| `RevealImage` | Clip + scale reveal (§5.5) |
| `Parallax` | Scrubbed y-offset wrapper (§5.6) |
| `Marquee` | Infinite, velocity-reactive, pausable (§5.7) |
| `Counter` | Count-up number with mono unit, `aria-live="off"`, final value in the DOM |
| `SectionLabel` | `01 — Label` mono index + hairline |
| `Chapter` | Full-bleed coloured section wrapper (paper / navy / blue / ink) that also tells the header which theme to use |
| `ProductRow` | Large horizontal row: index, name (display), stage sticker, one-liner, arrow. Hover reveals an image preview that follows the cursor (desktop). |
| `ProductHero`, `FeatureGrid`, `StageTimeline`, `TrackCard`, `Quote`, `Stat`, `TeamCard`, `Timeline`, `LogoWall`, `CaseStudyCard`, `CTASection`, `ContactForm`, `Field` | Composed per page |
| `MotionToggle` | Footer switch, overrides animation (persisted in localStorage) |

### 4.5 Iconography

- Custom **arrow** (↗ and →), drawn to match Archivo's stroke weight and rotating to the star's 45° axis on hover.
- The **star blade** as a glyph (bullet, sparkle, list marker).
- Utility icons from **lucide-react** at 1.5px stroke, sized 20/24px. No filled or emoji icons.
- Social icons: official SVG marks, monochrome.

### 4.6 Imagery treatment

- **Real people, real rooms, real work.** Classroom sessions, robotics builds, screens showing student projects, the team teaching. **No stock.**
- **Treatment:** natural colour, slightly lifted blacks. Optional **duotone** (navy `#0B1B2E` → paper) for archival or low-quality photos, so mixed sources look coherent. Sharp crops, no rounded corners, no drop shadows.
- **Children:** only with recorded parental consent. Prefer over-the-shoulder, hands-on-hardware and back-of-head compositions. No full names, no school uniforms with identifiable crests unless the school has agreed. See `/safeguarding` (§6).
- **Product UI:** real KITOS screens with **mock data only**, framed in a plain device outline or bare with a hairline border.
- **Brand graphics** where photos are missing: oversized logomark crops, blade patterns, code-tag type compositions. These are legitimate compositions, not placeholders.
- **Format:** AVIF/WebP via `next/image`, responsive `sizes`, LQIP blur, hero ≤ 180 KB.

---

## 5. Motion & interaction specification

### 5.1 Library approach and global tokens

**One animation engine: GSAP** (core + **ScrollTrigger** + **SplitText**, via `@gsap/react`'s `useGSAP`), plus **Lenis** for smooth scroll. Since 2025, GSAP and all its plugins are free for commercial use.

- **Why GSAP over Motion (Framer):** the brief is scroll-choreography-heavy (scrubbed parallax, pinned sections, velocity-reactive marquees, line-masked split text, timeline-sequenced loader and curtain). GSAP's ScrollTrigger and SplitText are the industry standard for exactly this. Motion is excellent for component state, but mixing two engines doubles bundle and timing logic. We use **GSAP only**, with CSS transitions for simple hover colour changes.
- **Why Lenis:** light (~4 KB), keeps native scroll semantics (scrollbar, keyboard, find-in-page, anchor links), and syncs with ScrollTrigger in one line.

**Easing tokens**

| Token | Value | GSAP name | Use |
|---|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | `expo.out` | Reveals, entrances (same curve the current site uses — continuity) |
| `--ease-in-out` | `cubic-bezier(0.76, 0, 0.24, 1)` | `power4.inOut` | Curtains, wipes, menu |
| `--ease-snappy` | `cubic-bezier(0.25, 1, 0.5, 1)` | `power3.out` | Hovers, magnetic, UI |
| `--ease-spring` | — | `elastic.out(1, 0.45)` | Magnetic release only |
| linear | `none` | `none` | Scrubbed scroll, marquees |

**Duration tokens:** `xs 150ms · sm 250ms · md 450ms · lg 800ms · xl 1200ms`. **Stagger:** lines 80ms, words 40ms, chars 18ms, list items 60ms.

### 5.2 Loading sequence ("Ignition")

**Trigger:** first page view of a browser session only (`sessionStorage['snl-intro']`, read and write in try/catch). Skipped for reduced motion, for the Motion toggle set to "reduced", and on client-side navigations.

**Timeline** (target 2.2s, hard cap 2.8s, minimum 1.2s):

| t | Event |
|---|---|
| 0 | Full-screen `--navy` overlay is present in server HTML (no flash). Page content renders underneath (crawlable; `aria-hidden` on the overlay). |
| 0–300ms | Three marquee rows of display-xl outline type fade in (opacity 0→0.12). They scroll in alternate directions at 60s per loop: `KIDS IN TECH · KITOS · SCRATCH · ROBOTICS · WEB · EDUSTACK · SKILLSTACK ·` |
| 100–900ms | **Star assembly:** the four logomark blades fly in from the four corners (x/y ±40vw, rotate ±90° → 0), 700ms `expo.out`, stagger 70ms, landing as the white star in the centre (96px mobile / 144px desktop). |
| 0 → ready | Mono counter bottom-left `000` → `100` (tabular, JetBrains Mono, `label` size ×2), tweened toward **real readiness**: `document.fonts.ready` (50%) + hero image `decode()` (50%). A 2px `--blue-lit` progress line runs along the bottom edge (`scaleX 0→progress`). Bottom-right: `Architecting human agency`. |
| ready + 150ms | Counter snaps to 100. The star rotates 45° (400ms `power3.out`). |
| +0 → +700ms | **Blue wipe:** a `--blue` panel rises from the bottom (`scaleY 0→1`, origin bottom, 500ms `power4.inOut`). Then the panel **and** the navy overlay exit upward together (`yPercent 0→−100`, 600ms `power4.inOut`). |
| overlap −200ms | Hero entrance starts (§5.4 hero variant). |

After the loader, `document.documentElement.dataset.intro = "done"` is set and Lenis starts. Scroll is locked while the loader is up (Lenis stopped + `overflow:hidden`).

### 5.3 Smooth scroll (Lenis)

```
lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, wheelMultiplier: 1, touchMultiplier: 1 })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0)
```

- Touch devices keep **native scroll** (`syncTouch:false`). Inertia is desktop-only.
- Anchor links use `lenis.scrollTo(target, { offset: -headerHeight, duration: 1.2, easing: expoOut })`.
- On route change: `lenis.scrollTo(0, { immediate: true })` while the curtain covers the screen.
- Disabled entirely for reduced motion: native scroll, and ScrollTrigger works on native scroll.
- Modals and the menu call `lenis.stop()` and `lenis.start()`. Nested scrollable areas get `data-lenis-prevent`.

### 5.4 Text reveals

**A. Headline line-mask (default for `h1`/`h2`/display):**
- SplitText `type:"lines"`, `mask:"lines"`, `autoSplit:true` (re-splits on resize or font load), `aria` preserved.
- From `yPercent: 110` → `0`, `duration: 1.0`, `ease: expo.out`, `stagger: 0.08`.
- Trigger: `start: "top 85%"`, `once: true`.
- **Hero variant:** runs after the loader or curtain rather than on scroll. `duration 1.2`, `stagger 0.1`, plus a 1.5° rotate-in (`rotate: 1.5 → 0`, `transformOrigin: "0% 100%"`).

**B. Word stagger for leads:** words `yPercent 100→0` + `opacity 0→1`, 0.8s `expo.out`, stagger 0.04. Trigger `top 88%`.

**C. Body copy:** block fade-up `y 24→0`, `opacity 0→1`, 0.8s `expo.out`, delay 0.1s after its heading. Trigger `top 90%`.

**D. Sticker pop:** `scale 0.6→1`, `rotate (r−12°)→r`, `opacity 0→1`, 0.6s `back.out(2)`, delay 0.35s after the related headline.

**E. Counters:** number tweens from 0 to value over 1.6s `power2.out` with `snap: 1` (or 0.1 for decimals). The final value is in the DOM before JS runs (no layout shift, no content hidden from crawlers).

**F. Scroll-scrubbed display words (signature moment):** a display-xxl word pair moves horizontally against scroll (row 1 `xPercent −5 → −25`, row 2 `xPercent −25 → −5`), `scrub: 0.6`, across the section's scroll length.

### 5.5 Image reveals

- Wrapper `clip-path: inset(100% 0% 0% 0%)` → `inset(0% 0% 0% 0%)`, 1.2s `power4.inOut`. The inner `<img>` scales `1.25 → 1.0` over the same 1.2s with `expo.out`.
- Direction variants: `up` (default), `left` (`inset(0 100% 0 0)`), `center` (`inset(50% 50% 50% 50%)`, used for the logomark tile).
- Trigger `top 80%`, `once:true`.
- Before JS runs, images render normally (the clip is only applied by JS once it has checked motion preferences), so there is no invisible content if JS fails.

### 5.6 Parallax

- `Parallax` wrapper with `speed` prop (−1…1). `y: () => speed * 15 + '%'` over `start: "top bottom"`, `end: "bottom top"`, `scrub: true`, `ease: none`.
- **Type vs image layering:** headlines `speed 0.1`, overlapping image `speed −0.15`, sticker `speed 0.3`. They drift apart as you scroll, which makes the overlap feel 3-D.
- Images inside `RevealImage` parallax their **inner** element (`yPercent −8 → 8`) so the frame stays put.
- Off below 768px (performance and nausea), apart from the inner-image drift which stays at half strength.
- Pinned sequence (Home "How it connects": Bootcamps → KITOS → Progression): the section pins for `+=200%`. Three panels cross-fade and slide (`yPercent 20→0`, `opacity 0→1`), `scrub: 0.8`, with snap to each third. Unpinned stacked version below 1024px.

### 5.7 Marquees

- Built from two duplicated tracks inside an `overflow:hidden` container. A GSAP `xPercent: −50` tween (`repeat:-1`, `ease:none`).
- **Speeds:** display marquee 40s per loop; logo wall 60s per loop; loader rows 60s.
- **Scroll-reactive:** `ScrollTrigger.create({ onUpdate: self => { dir = self.direction; tl.timeScale(dir * clamp(1 + |velocity|/600, 1, 4)) } })`. Speed then eases back to 1× over 0.8s via `gsap.to(tl, { timeScale: dir, duration: 0.8, ease: 'power3.out' })`.
- **Separator:** the star blade glyph in `--gold`, rotating 90° per loop.
- **Pausable (WCAG 2.2.2):** pauses on hover and on focus-within. A visible "Pause motion" button is available for the logo wall. `prefers-reduced-motion` → static row (wraps on mobile, no animation).
- Offscreen marquees pause (`ScrollTrigger` `onToggle` → `tl.paused(!isActive)`).

### 5.8 Page transitions ("Curtain")

App Router has no built-in exit animations, so we control the sequence ourselves:

1. `TransitionLink` wraps `next/link`. On a same-origin, unmodified, left-button click to a different pathname: `preventDefault()`, prefetch, then run **cover**.
2. **Cover:** a fixed `--blue` panel `scaleY 0→1` (origin bottom), 550ms `power4.inOut`. The white logomark in the centre rotates `−45°→0°` and fades in (300ms, delay 250ms).
3. When cover completes: `router.push(href)`, and `lenis.scrollTo(0, {immediate:true})`.
4. The new route's `template.tsx` mounts and signals **reveal**: panel `scaleY 1→0` (origin top), 600ms `power4.inOut`. The star rotates `0→45°` and fades out. Then the new page's hero entrance runs (§5.4 hero variant, starting at −250ms overlap).
5. **Safety:** if the new route hasn't mounted within 1.5s, show a small mono counter on the curtain. Hard fallback at 5s: reveal anyway. Browser back/forward: no cover. A 250ms cross-fade on reveal only.
6. Bypassed for: external links, `target="_blank"`, `mailto:` and `tel:`, cmd/ctrl/shift/alt-click, middle-click, hash-only links (those use Lenis anchor scroll), and reduced motion (a 150ms opacity cross-fade instead).
7. Focus: after reveal, move focus to the new page's `<h1>` (`tabIndex=-1`). A polite live region announces "Navigated to {page title}".

### 5.9 Hover & interactive states

| Element | Behaviour |
|---|---|
| **Primary button (ink)** | Background `--ink`, text white. On hover a `--blue` circle scales from the cursor entry point (`scale 0→1`, 450ms `power3.out`). The label slides up and is replaced by a duplicate (`yPercent 0→−100`, 350ms `power3.out`). The arrow rotates `0→−45°` (points ↗). Press: `scale 0.97`, background `--blue-press`. Focus-visible: 2px `--blue` outline, offset 3px (on dark: `--blue-lit`). |
| **Magnetic** (buttons, menu button, social icons) | Within the element bounds + 24px: translate toward the pointer at `0.35 × offset`, max 14px, via `gsap.quickTo(…, {duration: 0.45, ease: 'power3.out'})`. On leave: return with `elastic.out(1, 0.45)`, 0.9s. The inner label moves `0.15 ×` (a parallax feel). Only on `(hover: hover) and (pointer: fine)`. |
| **Text link** | Underline is a 1px pseudo-element: `scaleX 1→0` (origin right) then `0→1` (origin left) in sequence, 250ms each, `power3.out`. |
| **Nav link** | Label roll (duplicate text slides up, 300ms). The active page has a gold star glyph before it. |
| **ProductRow** | Row background floods `--paper-2` → `--blue` (400ms). Name shifts `x 0→24px`. Arrow rotates −45°. A **cursor-following preview** (320×220 image) scales `0.6→1` and follows the pointer via `quickTo` (0.5s). It is hidden on touch, and the row is fully clickable. |
| **Image cards** | Inner image `scale 1→1.05` (800ms `expo.out`). Caption underline animates. |
| **Sticker** | Hover: `rotate r → r+6°`, `scale 1.06`, 300ms `back.out(3)`. |
| **Form fields** | Label floats (Inter 12px) on focus or filled, 200ms. Bottom border `--line` → `--blue` (2px) on focus. Error: border `--error`, message slides in 200ms, `aria-describedby`. |
| **Header** | Hides when scrolling down past 120px (`yPercent −100`, 450ms `expo.out`). Shows on any scroll up. Background transparent over hero, then `--paper`/`--navy` with a hairline after 40px. Theme inverts when over a `Chapter` of navy, blue or ink (detected with ScrollTrigger on each chapter, colour transition 300ms). |
| **Menu overlay** | Open: navy panel `clipPath circle(0% at menuButton) → circle(150%)`, 700ms `power4.inOut`. Links line-mask reveal, stagger 60ms, starting at +300ms. Close: reverse at 1.3× speed. Menu icon morphs (two bars → X, 300ms). |
| **Custom cursor** | Not used. The native cursor is always visible. Only contextual cursor elements (ProductRow preview). |

### 5.10 Reduced-motion strategy

Two inputs, one resolved value (`motion: 'full' | 'reduced'`):
1. OS `prefers-reduced-motion: reduce`.
2. The footer **Motion toggle** ("Motion: On / Reduced", persisted in localStorage, try/catch) — some users want it off without changing OS settings. The toggle wins when set.

When `reduced`:
- No loader (the overlay is removed immediately). No Lenis. No parallax, no pinning (sections render stacked), no scrubbed text.
- Text and image reveals become **opacity 0→1, 200ms** (or none at all for body copy).
- Marquees are static (duplicates removed, content wraps).
- Magnetic and cursor-follow effects off. Button hover is a colour change only.
- Page transition becomes a 150ms opacity cross-fade.
- Counters show final values immediately.
- A CSS safety net: `@media (prefers-reduced-motion: reduce) { *,*::before,*::after { animation-duration:.01ms!important; transition-duration:.01ms!important; scroll-behavior:auto!important } }`.

### 5.11 Performance rules for motion

- Animate only `transform`, `opacity` and `clip-path`. Never `top/left/width/height/filter: blur` on scroll.
- `will-change` is set just before an animation and removed after.
- All ScrollTriggers are created in `useGSAP` scopes (auto-cleanup on unmount and route change). `ScrollTrigger.refresh()` runs after fonts load and after image loads in pinned sections.
- No continuous `requestAnimationFrame` loops other than the shared GSAP ticker. Offscreen tweens are paused.
- Target a steady 60fps on a mid-range Android (e.g. Samsung A-series) in Chrome DevTools 4× CPU throttle.

---

## 6. Proposed information architecture

### 6.1 Sitemap

```
/                               Home
├── /kids-in-tech               Flagship programme (→ kidsintech.school for enrolment)
├── /products                   Product portfolio (index + maturity)
│   ├── /products/kitos         KITOS — platform (LMS v1 + KITOS OS roadmap)
│   ├── /products/edustack      EduStack — school management
│   ├── /products/skillstack    SkillStack — future-skills platform
│   └── /products/noah          NOAH — (hidden until a description is approved; feature flag)
├── /studio                     Studio — services for clients (product, brand, web, edtech builds)
├── /work                       Case studies index
│   └── /work/[slug]            Case study template (only published with client permission)
├── /about                      Company: story, mission & vision, values, team, journey
├── /partner                    Partner with us: schools · sponsors · investors · product collaboration
├── /contact                    Contact form + details
├── /safeguarding               Child safety & photo consent statement
├── /privacy                    Privacy policy
├── /terms                      Terms of use
└── 404 (not-found)
```

**Redirects (308) from the current site:** `/mission` → `/about#mission` · `/services` → `/studio` · `/products` stays.

### 6.2 Page-by-page sections

**Home `/`**
1. **Hero** — `h1` display-xxl, two to three lines: **"BUILD / WHAT'S / NEXT."** The logomark tile is set inline as a glyph after "NEXT". Sub-line: *A Nigerian technology company building education technology — proven in real classrooms through Kids in Tech.* Stickers `<est. 2025/>`, `Sokoto · Kebbi`. CTAs: "Explore our products" (ink) · "Partner with us" (text-arrow). Parallax photo tucked under line 2.
2. **Marquee** — `KIDS IN TECH ✦ KITOS ✦ EDUSTACK ✦ SKILLSTACK ✦ STUDIO ✦`
3. **Manifesto** (paper) — `01 — Why we exist`. Large lead: *"We are producing technology users faster than we are developing technology creators."* Then the progression *Exposure → Understanding → Building → Creation* as a horizontal scrubbed type strip.
4. **Proof: Kids in Tech** (navy chapter) — `02 — Proof of execution`. Traction counters (paying students, cohorts, returning students, projects built — **pending confirmation**), a tracks teaser, a parent quote (with consent), and a link to `/kids-in-tech`.
5. **How it connects** (pinned on desktop) — Bootcamps spark → KITOS sustains → Progression keeps students moving.
6. **KITOS** (blue chapter) — display-xl "KITOS", feature stickers (Pathways, Portfolios, Challenges, Parent dashboard, Leaderboards), UI imagery, link to `/products/kitos`.
7. **Product portfolio** — `ProductRow` list with stage stickers: KIT (Live) · KITOS (Delivered / In testing — TBC) · EduStack (Pipeline) · SkillStack (Pipeline) · NOAH (hidden until approved).
8. **Studio teaser** — "We build for others too." Services in three words each + 2 case-study cards (when permitted) → `/studio`.
9. **Partners** — logo wall marquee (verified partners only).
10. **CTA** (ink) — "Got a school, a sponsor or a product in mind?" Three routes: Enrol a school / Partner or invest / Start a project.

**Kids in Tech `/kids-in-tech`** — hero (KIT + StarNova co-brand, respecting the KIT palette only inside imagery) · The problem · The model (Placement → Build from day one → Peer support → Showcase) · Tracks (Scratch / Web / Robotics — blue chapter, 3 `TrackCard`s) · Branching pathway diagram · How we teach (5 principles) · Impact numbers + testimonials · For schools (B2B2C, revenue share at a high level) · For parents → **Enrol at kidsintech.school** (external) · Safeguarding link.

**Products `/products`** — hero "Products" · portfolio maturity strip (Delivered → Scoping → Pipeline) · ProductRows · "Have a product idea with us?" → `/partner#product`.

**KITOS `/products/kitos`** — hero · the gap it closes (learning that stops when a cohort ends) · Learn / Build / Showcase / Compete / Advance · feature grid · screens (mock data) · roadmap (V1 now → portfolios & progress → challenges, parent dashboard, leaderboards → national network) · KITOS OS (scoping) · CTA for schools.

**EduStack / SkillStack / NOAH** — shared `ProductPage` template: hero, problem, who it's for, what it will do, stage timeline, "Register interest" form (tagged by product). Thin by design until content exists. Pipeline pages carry `noindex` until they have substance.

**Studio `/studio`** — hero "Studio" · what we do (Product & software; Design & brand; Web; EdTech platforms; Strategy) · how we work (process, 4 steps) · selected work (case-study cards) · CTA "Start a project".

**Work `/work`, `/work/[slug]`** — index grid; case template: client, sector, year, role, challenge, approach, outcome, imagery, next case.

**About `/about`** — hero · story (from bootcamps to company) · mission & vision (anchor `#mission`) · values (5) · founder's message · leadership (3) + programme team · journey timeline · brand world strip (mockups) · CTA.

**Partner `/partner`** — four routes (anchors): `#schools`, `#sponsors`, `#investors`, `#product`. Each has a short argument and a CTA to a pre-tagged contact form. Investor section: high-level only (no valuation or financials on a public page).

**Contact `/contact`** — form (name, email, organisation, "I'm a…" select: School / Parent / Partner or investor / Client / Other, message, honeypot) · email · two phones · location (Sokoto, Nigeria — confirm) · hours in **WAT** · socials (real URLs only).

### 6.3 Navigation model

- **Header (desktop):** Logo · **Kids in Tech** · **Products** · **Studio** · **About** · [**Let's talk →**] (ink block → `/contact`) · Menu button (opens the overlay with the full map).
- **Header (<1024px):** Logo · Menu button. The overlay lists: Kids in Tech, Products (with sub-items), Studio, Work, About, Partner, Contact. Plus email, phones, socials.
- **Footer:** Company (About, Partner, Contact) · Products (KIT, KITOS, EduStack, SkillStack) · Studio (Studio, Work) · Legal (Safeguarding, Privacy, Terms) · Motion toggle · Contact block.
- **Why this model:** the parent brand leads, KIT is one click from anywhere (it's the proof), Products and Studio are clearly separate (product company vs services), and the partner/investor path is prominent without cluttering the header.
- **Language:** see §9 Q4. The recommended default is EN at launch with a Hausa-ready content model.

---

## 7. Content & asset plan

### 7.1 Carries over (edit, don't rewrite)
- Company Profile: positioning line, KIT programme model, tracks, teaching principles, journey, leadership bios, problem statement, audiences, partnership options.
- Strategic Briefing: tagline "Architecting Human Agency", mission/vision (once one version is chosen), the progression line, the four phases (generalised).
- Pitch deck: KITOS feature set and roadmap stages, traction (after reconciling numbers), testimonials (after consent).
- Current site: service categories and sub-lists (Studio page).
- Logo SVGs, logomark, colour values.

### 7.2 Must be rewritten
- All hero and section headlines (new voice, see §3).
- Product descriptions for every product page (current ones are one-liners).
- About story (merge site + profile, remove agency framing).
- Contact copy (WAT hours, real location, two phones).
- Hausa strings — if Hausa ships, have a native speaker review them.

### 7.3 Must be removed
- 🚫 **All placeholder "image" boxes** (Lucide icon on gradient with filler text) on About and Mission — 4 instances.
- 🚫 **`ATTRIBUTIONS.md` Unsplash credit** and any Unsplash or stock imagery. None may enter the new build.
- 🚫 Screenshots used as hero imagery (`kidsintech.png`, `nurala.png`, `emr.png`).
- 🚫 Particle field, blur orbs, dot-grid, glassmorphism, off-brand gradients.
- 🚫 PolySans Trial / Neue Machina personal-use fonts.
- 🚫 StarNova's own logo in the partner strip. Any partner logo without confirmed permission.
- 🚫 Emoji in UI copy. "EST" hours. `#` links.
- 🚫 `LMS/*.jpeg` attendance registers, `Kids In Tech/Bootcamp 4.0/*.jpeg` sign-up sheets, contact lists and lead trackers — never in the repo.
- 🚫 Stock photos and illustrations in `Kids In Tech/` (listed in §1.5): `child-making-robot.jpg`, `adorable-girl-being-passionate-about-robotics.jpg`, `childhood-modern-technology-…png`, `3d-rendering-device-background.*`, the numbered `*.svg` illustrations, and the unverified `design_*.png` set.

### 7.4 Missing — must be supplied or commissioned

| Need | Priority | Suggested source |
|---|---|---|
| **Photography: KIT classes in session** (Scratch, Web, Robotics), with parental consent forms | P0 | **First:** review `Kids In Tech/Bootcamp 2.0/images/` (HEIC + MOV) and `KIDS IN TECH(1080p).mp4` for usable, consented shots and a 6–10s hero loop. **Then:** commission a half-day shoot at the next bootcamp for robotics and web tracks. |
| **Team portraits** (3 founders + programme team) on a consistent background | P0 | Same shoot |
| **KITOS UI screenshots** with mock data (dashboard, lesson, portfolio, leaderboard) | P0 | CTO — export clean screens |
| Confirmed **traction numbers** with an "as of" date | P0 | CEO/COO |
| Final **mission, vision, values** (ratified) | P0 | Leadership |
| Product one-pagers for **EduStack, SkillStack, NOAH** (+ NurAla decision; Cuzoo/Zariya/HausaLearn if they are StarNova products) | P1 | CEO/CTO |
| **Partner list** with logos (SVG preferred) and permission | P1 | COO |
| **Case studies** (2–4) with client permission | P1 | CEO |
| Real **social URLs** (LinkedIn, X, Instagram, GitHub…) | P1 | Media (Aisha) |
| **Testimonials** with written consent (parents, schools) | P1 | COO |
| Privacy policy, terms, safeguarding statement (legal review) | P1 | Legal adviser |
| OG/social images per page (generated in build from type + logomark) | P2 | Build (automatic) |
| Short hero video loop (optional, ≤ 1.5 MB, muted, with poster) | P3 | Shoot |

---

## 8. Technical approach

### 8.1 Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 16 (App Router)**, React 19, TypeScript strict | Your requirement. SSG/SSR for SEO and social previews, `next/image`, `next/font`, route handlers, metadata API. |
| Styling | **Tailwind CSS v4** (CSS-first `@theme` tokens) | Continuity with current code. Tokens live in one CSS file. |
| Animation | **GSAP 3.13+** (ScrollTrigger, SplitText) + `@gsap/react` | §5.1 |
| Smooth scroll | **Lenis** (`lenis`, `lenis/react`) | §5.3 |
| Fonts | `next/font/local` (Mango Grotesque WOFF, unmodified) + `next/font/google` (Archivo, Inter, JetBrains Mono). PolySans slot off until licensed. | Self-hosted, no layout shift |
| Icons | `lucide-react` (minimal) + custom SVGs | |
| Utilities | `clsx`, `tailwind-merge` | |
| Forms | Native form + Server-side **Route Handler** `POST /api/contact` → **Resend** (email API). Honeypot + time-trap + basic rate-limit. | Keys stay server-side (fixes the hard-coded EmailJS keys). Fallback: `mailto:` link if the API key is missing. |
| Content | Typed TS content modules in `src/content/` (site, products, work, team, stats, nav) | No CMS needed now. A headless CMS can be added later without changing components. |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` | Already used |
| Lint/format | ESLint (next config), Prettier | |
| Package manager | npm | Matches existing |

Deliberately **not** included: shadcn bulk install, MUI, Motion/Framer, three.js/WebGL, a CMS, auth.

### 8.2 Rendering

- Every page **statically generated** (SSG). `generateStaticParams` for `[slug]` routes. The only dynamic endpoint is `/api/contact`.
- Motion code in **client components** (`'use client'`), leaf-level. Page shells stay server components, so the HTML ships with all content visible.
- Progressive enhancement: with JS disabled, every page is fully readable, and links and form fields work. The form falls back to the `mailto:` link.

### 8.3 Folder structure (`Vercel-Web/starnovalabs-next/`)

```
starnovalabs-next/
├── docs/                         ← these two docs + brand-source/ (already created)
├── public/brand/                 ← logo SVGs, favicons, og fallback
├── src/
│   ├── app/
│   │   ├── layout.tsx            fonts, <Providers>, header/footer, loader, curtain
│   │   ├── template.tsx          page-reveal hook-in
│   │   ├── page.tsx              Home
│   │   ├── kids-in-tech/page.tsx
│   │   ├── products/page.tsx, products/[slug]/page.tsx
│   │   ├── studio/page.tsx, work/page.tsx, work/[slug]/page.tsx
│   │   ├── about/page.tsx, partner/page.tsx, contact/page.tsx
│   │   ├── safeguarding/, privacy/, terms/
│   │   ├── api/contact/route.ts
│   │   ├── not-found.tsx, sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
│   │   └── globals.css           tokens (@theme), base, utilities
│   ├── components/
│   │   ├── layout/               SiteHeader, MenuOverlay, SiteFooter, Container, Grid, Section, Chapter
│   │   ├── motion/               MotionProvider, SmoothScroll, Loader, Curtain, TransitionLink,
│   │   │                         RevealText, RevealImage, Parallax, Marquee, Magnetic, Counter
│   │   ├── ui/                   Button, Sticker, SectionLabel, Field, Arrow, StarGlyph, Logo, Logomark
│   │   └── sections/             page-specific compositions
│   ├── content/                  site.ts, nav.ts, products.ts, work.ts, team.ts, stats.ts, partners.ts
│   ├── fonts/mango-grotesque/    MangoGrotesque-Regular.woff, -SemiBold.woff (copied unmodified) + LICENSE.txt
│   ├── lib/                      gsap.ts (plugin registration), motion.ts (tokens), utils.ts, seo.ts
│   └── types/
├── .env.example                  RESEND_API_KEY=, CONTACT_TO_EMAIL=, NEXT_PUBLIC_SITE_URL=
└── next.config.ts                redirects, images
```

### 8.4 Performance budget (mobile, Moto G Power / 4G profile, Lighthouse)

| Metric | Budget |
|---|---|
| LCP | ≤ 2.0s (home, loader excluded from LCP element — hero text sits beneath the overlay, fully rendered) |
| CLS | ≤ 0.05 |
| INP | ≤ 200ms |
| TBT | ≤ 200ms |
| First-load JS (home) | ≤ 180 KB gzip (GSAP + ScrollTrigger + SplitText ≈ 50 KB, Lenis ≈ 4 KB) |
| Fonts | ≤ 3 families, ≤ 5 files, WOFF2, ≤ 180 KB total |
| Hero image | ≤ 180 KB AVIF/WebP; others ≤ 120 KB |
| Page weight (home, first view) | ≤ 1.2 MB |
| Lighthouse | Performance ≥ 90 mobile, Accessibility 100, Best Practices 100, SEO 100 |

### 8.5 Accessibility targets

**WCAG 2.2 AA.** One `h1` per page and logical headings. Skip link. Landmarks. Visible focus (2px, 3px offset, contrast ≥ 3:1). Full keyboard navigation incl. menu (focus trap, Esc), marquees pausable, loader never traps focus. Reduced motion (§5.10). Split-text keeps readable `aria-label`. Form labels and errors linked, `autocomplete` attributes. Target size ≥ 24×24 (44×44 preferred on touch). Language attribute correct (`lang="en"`, `lang="ha"` on Hausa text). Test with VoiceOver + NVDA + axe.

### 8.6 SEO

- `metadata` / `generateMetadata` per page: unique title template `%s — StarNova Labs`, description, canonical `https://www.starnovalabs.com/...`.
- **Open Graph and Twitter images generated with `next/og`** (display type + logomark on navy/blue).
- `sitemap.ts`, `robots.ts`. Pipeline pages `noindex` until they have content.
- **JSON-LD:** `Organization` (name, logo, url, email, telephone ×2, sameAs, address Sokoto NG) on every page; `EducationalOrganization` + `Course` for KIT tracks; `SoftwareApplication` for KITOS; `BreadcrumbList`.
- Real text for headings (no text in images). Descriptive alt text. Internal links between KIT ↔ KITOS ↔ Partner.
- 308 redirects from old routes.

### 8.7 Deployment & version control

- **New Git repo** initialised inside `starnovalabs-next/` (e.g. GitHub `starnovalabs-web`). The empty parent `Vercel-Web/.git` should be removed, or `starnovalabs-next/` added to its `.gitignore`, to avoid nested-repo confusion — your call.
- `main` is protected. Work on `feat/batch-0N-*` branches. PR → Vercel **preview deployment** per branch.
- **New Vercel project** (root directory `starnovalabs-next`). The current project keeps serving until sign-off. Then move the `starnovalabs.com` + `www` domains to the new project. Keep the old project for rollback for 30 days.
- Env vars in Vercel (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`). `.env*` git-ignored, `.env.example` committed.

---

## 9. Risks and open questions

### 9.1 Decisions needed before Batch 1

| # | Question | Recommended default if no answer |
|---|---|---|
| Q1 | **Positioning:** EdTech/product company first (per profile, briefing, pitch) with Studio secondary — or equal weight? | EdTech first, Studio secondary |
| Q2 | **Navy `#0B1B2E` + gold `#C7972F`** (from the Company Profile) are official brand colours? And the `#1A8DC3` / `#DD3614` logo variants — approved or discard? | Adopt navy/gold, ignore variants |
| Q3 | **Fonts — decided:** Mango Grotesque for display. **Still open:** (a) will you buy a **PolySans web licence** (Pangram Pangram) so PolySans can ship on this site and legally stay on kidsintech.school? (b) Download Mango from the designer's own page to get the fuller family? | Mango on; PolySans slot off until licensed |
| Q4 | **Hausa:** ship EN + HA at launch (needs native-reviewed copy for every page, `/ha/...` routes), or EN at launch with a Hausa-ready content model? | EN at launch, HA as fast-follow |
| Q5 | **Body font:** Inter (recommended) or Montserrat (print continuity)? | Inter |
| Q6 | **Drop the light/dark toggle** in favour of art-directed sections? | Drop it |
| Q7 | **Contact form email provider:** Resend (needs account + domain DNS verification on starnovalabs.com) or keep EmailJS (via env vars)? | Resend, with mailto fallback |

### 9.2 Content decisions (can proceed in parallel; needed before Batch 4)

- **NurAla Learning:** StarNova product, partner, or client? Show or remove?
- **Cuzoo, Zariya, HausaLearn:** StarNova products (then supply descriptions and stages) or client work (then case studies with permission) or omit?
- **NOAH:** publish a page (needs a description) or keep hidden?
- **KITOS naming and stage:** "KITOS" vs "KIT OS", "Kids in Tech OS" vs "Kids in Tech LMS". "KITOS LMS" and "KITOS OS" as two products or one platform? Stage: "Delivered" or "In final testing"?
- **Numbers:** cohorts (3 vs 4), paying students (111 as of when?), returning students, projects, whether to show revenue (recommend **not** on the public site).
- **Mission, vision, values:** which version is final (profile notes they are not yet ratified)?
- **Second phone number** `+234 906 098 5201` — confirm. **Location** line — "Sokoto, Nigeria"? Also Kebbi?
- **Partner logos:** which are current, with permission?
- **Case studies:** which clients have agreed (Godiya EMR, Huzmart, others)?
- **Domain:** does `starnovalabs.com` currently point at the `starnovalabsweb` Vercel project?

### 9.3 Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **No real photography by content deadline** | High | High — site feels empty or tempts stock use | Design is type- and brand-graphic-led so it stands without photos. Schedule the shoot now. Hard rule: no stock. |
| **Child-safety / consent** failure (photos, names) | Medium | Severe | Consent forms, `/safeguarding`, never publish names or registers, review every image. `LMS/` folder excluded. |
| **Imitation of wearecheck.co** | Medium | Reputational | Guardrails table §2. Review Batch 1 output against it before Batch 2. |
| **Motion hurts performance on low-end Android** | Medium | High (core audience) | Budgets §8.4, touch = native scroll, parallax off <768px, reduced-motion path, test on a real mid-range device. |
| **Loader annoys / hurts LCP** | Medium | Medium | Once per session, ≤ 2.8s, content rendered underneath, skip for reduced motion. |
| **Numbers inconsistent across site, deck, profile** | High | Medium (investor trust) | Single `stats.ts` source with an "as of" date. Reconcile before launch. |
| **Font licensing** | Current exposure | Legal | Mango (freeware, unmodified files) + OFL fonts only. PolySans trial files must not ship; they are also live on kidsintech.school and the current StarNova site — replace or license. |
| **Resemblance to reference** increases because the same display face is used | Medium | Reputational | Mango reserved for XXL/XL/L only. Palette, stickers, star system and layouts diverge (§2). Review after Batch 2. |
| **PII in the brand folder** (sign-up sheets and registers with children's names and parents' numbers in `LMS/` and `Kids In Tech/Bootcamp 4.0/`) | Present now | Severe | Excluded from repo and site. Consider moving these files out of the shared brand folder entirely. |
| **Scope creep** (Hausa, CMS, blog) | Medium | Schedule | Explicit out-of-scope per batch. Fast-follow list. |
| **Two old codebases confuse the build agent** | Medium | Low | Batch prompts state that `../starnovalabsweb` and `../../Starnovalabswebsitedesign` are **read-only references**. |

---

*End of Document 1. Execution prompts are in `STARNOVA_EXECUTION_BATCHES.md`.*
