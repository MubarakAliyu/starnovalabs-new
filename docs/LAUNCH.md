# Launch runbook

Cut-over plan for the new StarNova Labs site (this Next.js project) replacing the
old Vite/React site. **No DNS or domain change has been executed** — everything
below is for a person to carry out deliberately.

The old project stays in place for 30 days so rollback is a domain re-assignment
rather than a rebuild.

---

## 1. Pre-launch

### Content and legal sign-off

| Item | Owner | Gate |
| --- | --- | --- |
| Confirmed stats with as-of dates | Aliyu Mubarak | `src/content/stats.ts` — flip `status` to `confirmed` |
| Final mission / vision / values | Aliyu Mubarak | `src/content/values.ts` — values are "to be ratified" |
| Team names and spellings | Murtala Ishaq | `src/content/team.ts` — several `pending` |
| Partner logos and permission | Murtala Ishaq | only `permission: true` renders |
| Testimonial consent, in writing | Murtala Ishaq | `consent: false` hides them in production |
| Photo consent for every image with children | Aliyu Mubarak | `src/content/images.generated.ts` manifest |
| **Legal review of the three policies** | external | `src/content/legal.ts` — `reviewed: true` per page |

Nothing `pending`, unconsented or unpermitted renders in production, so the site
is publishable before these land — those sections simply stay hidden. The legal
pages are the exception worth understanding: while `reviewed: false` they show a
short "being finalised" notice instead of the draft. **Do not flip `reviewed` to
`true` without an actual review.**

### Environment variables (Vercel → Production)

| Variable | Value | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | from Resend | server-only, never `NEXT_PUBLIC_` |
| `CONTACT_TO_EMAIL` | info@starnovalabs.com | where enquiries land |
| `CONTACT_FROM_EMAIL` | e.g. site@starnovalabs.com | must be on a Resend-verified domain |
| `NEXT_PUBLIC_SITE_URL` | `https://www.starnovalabs.com` | **must match the primary domain** — canonical URLs, OG image URLs and the sitemap are all built from it |

Set the same four in Preview if you want the contact form working on previews.

### Resend

1. Add and verify `starnovalabs.com` in Resend (DKIM + SPF records).
2. Confirm `CONTACT_FROM_EMAIL` uses the verified domain, or sending fails.
3. Send one test enquiry from the Vercel Preview and confirm it arrives.

### Final checks before cut-over

- [ ] `npm run build` clean, `npm run typecheck` clean, `npm run lint` clean.
- [ ] `npm run audit:a11y -- --base <preview-url> --paths /,/about,…` — see
      `docs/QA.md` for the expected result and the one documented exception.
- [ ] Headers on the preview via securityheaders.com (A or better expected).
- [ ] Contact form end-to-end on the preview, including the reduced-motion and
      keyboard-only path.
- [ ] Share the preview's `/`, `/kids-in-tech` and `/products/kitos` into
      WhatsApp and LinkedIn and confirm the OG card renders.

---

## 2. Cut-over

Order matters: add the domains to the new project **before** removing them from
the old one, so there is no window with no site.

1. **Vercel → new project → Settings → Domains**: add `starnovalabs.com` and
   `www.starnovalabs.com`.
2. Set **`www` as primary** (it must match `NEXT_PUBLIC_SITE_URL`). Vercel will
   redirect the apex to `www`.
3. Vercel reports the domains as already in use by the old project — follow its
   prompt to move them. If the DNS is at an external registrar, the records do
   not change; only the Vercel project they point at does.
4. **Remove both domains from the old project** once the new one serves them.
5. Verify, on the real domain:
   - [ ] `https://www.starnovalabs.com` serves the new site over valid TLS.
   - [ ] `https://starnovalabs.com` redirects to `www`.
   - [ ] `/mission` → `/about#mission` and `/services` → `/studio`, both 308.
   - [ ] `/robots.txt` and `/sitemap.xml` show the production host, not
         `localhost` — if they show localhost, `NEXT_PUBLIC_SITE_URL` is unset
         in Production; set it and redeploy.
   - [ ] `/opengraph-image` returns a PNG.
   - [ ] Contact form delivers to `CONTACT_TO_EMAIL`.
6. **Google Search Console**: add the `www` property, submit
   `https://www.starnovalabs.com/sitemap.xml`, and request indexing for `/`,
   `/kids-in-tech`, `/products`, `/products/kitos` and `/about`.

---

## 3. Rollback

If the new site has to come down:

1. Vercel → **old** project → Domains → add `starnovalabs.com` and
   `www.starnovalabs.com` back (Vercel will prompt to move them off the new
   project).
2. Confirm the old site serves on both and TLS is valid.
3. No DNS change is needed — both projects sit behind the same Vercel
   nameservers/records.

Keep the old project until **30 days after launch**, then archive it.

---

## 4. Post-launch

**First week**

- Check contact deliveries daily — the form is the only conversion path, and a
  silent Resend failure looks exactly like "no enquiries".
- Watch Vercel **Speed Insights** for field LCP/INP/CLS. Treat the lab numbers
  in `docs/QA.md` as a floor, not a forecast: they were measured on localhost
  under simulated mobile throttling, and real Vercel edge delivery should be
  better.
- Watch Vercel **Analytics** for 404s, which would reveal a missed redirect from
  the old site.

**First month**

- Search Console: coverage, and that only the intended routes are indexed
  (`/lab`, SkillStack and unpublished work should not appear).
- Re-run Lighthouse against production and update `docs/QA.md` with the real
  numbers.

---

## 5. Follow-ups, not in this launch

| Item | Why it is not done | Trigger |
| --- | --- | --- |
| **First-load JS budget** | 253–258 KB gzip against a 170–180 KB target. The framework and motion floor alone is ~198 KB; see `docs/QA.md` §4 for the arithmetic and the options. | A decision on which to relax — the budget or the motion architecture |
| **Mobile performance** | Lighthouse mobile perf is well under the ≥90 target, dominated by style/layout and script evaluation. | Needs a deliberate motion-cost pass, not a tweak |
| Hausa `/ha` routes | Out of scope; needs reviewed copy | Reviewed Hausa translation |
| PolySans | Not licensed. Mango Grotesque is the display face | A licence |
| Real case studies | No client has given written permission | `permission: true` in `src/content/work.ts` |
| KITOS product screenshots | Not supplied | Images + consent |
| CMS | Content is in `src/content/*.ts` | When non-developers need to edit |
| Blog / news / newsletter | Out of scope | — |
| Cookie banner | Not needed: no non-essential cookies, and Vercel Analytics is cookieless | Only if tracking is added |
