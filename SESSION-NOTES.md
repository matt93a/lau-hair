# Session Notes — 2026-04-16 (updated)

**Pick-up instructions for the next Claude instance.**
Read this **after** `CLAUDE.md` (now reflects the Astro migration) and optionally skim `HANDOVER.md` for old context.

---

## Where we are now

The site is **live on Netlify** (chic-peony-38af97.netlify.app, auto-deploys from GitHub `main`). We went through several big phases today:

1. **Audit pass on salon.html** (flat HTML era) — colour tokens, spacing, dots nav, hero carousel, image edge alignment, fonts
2. **Site-wide audit pass** — nav handlers + `.page-title` H1s + responsive breakpoints across all 11 other pages
3. **Migrated the entire site from flat HTML to Astro 5** — commit `b63b916`. Safety branch `pre-astro-migration` pinned at the pre-migration commit `c36c96b` for rollback
4. **Salon touch-ups on the Astro site** — hero margin, page-title to 72px then 50px then 40px (Matt settled on 40)
5. **Stylists audit pass** — heading/subheading sizes, quote panel tokens, 60/40 intro split, swapped baby-placeholder photos for live-site portraits
6. **Services audit pass 1** (my most recent work while Matt was out) — replaced wrong images with designer's male-model portrait + black scissors; brought heading sizes in line with the Sketch typography scale (40 / 20 / 14)

**Latest commit:** `af80793` — all on `main`, pushed to GitHub, Netlify deploying.

---

## Architecture (post-migration)

- **Astro 5.x** static build (`output: 'static'`, `build.format: 'file'` so URLs stay `/salon.html` not `/salon/`)
- `src/layouts/BaseLayout.astro` — HTML skeleton, head, fonts, GA placeholder, renders header/footer/mobile-nav
- `src/components/Header.astro` + `MobileNav.astro` + `Footer.astro` — single-source-of-truth for nav, hours, address, socials. **Edit once → every page updates on next build.**
- `src/pages/*.astro` — one per route (13 pages incl. `landing.astro`). Each wraps its unique body in `<BaseLayout>`.
- `public/` — static assets (css/, images/, robots.txt, sitemap.xml, favicon) copied to `dist/` unchanged on build.
- **Styles still live in one file:** `public/css/style.css`. No scoped component styles yet. BEM-ish + utility classes.
- `netlify.toml` pins Node 24, runs `npm run build`, publishes `dist/`.

### Local preview

- `.claude/launch.json` (in `C:\Users\mp\Desktop\Claude\.claude\`, one level up) runs `.claude/start-preview.cmd`
- That script now does `npm run build` then `http-server dist -p 8080`
- **Faster dev loop:** `npm run dev` for HMR — but you'll need to point your browser at the Astro dev port (typically 4321) instead of :8080

### Node PATH caveat (still true)

Node 24.15 lives at `C:\Program Files\nodejs\` and is **not** on Claude Code's inherited PATH. Every `npm` call needs either the full path (`"C:\Program Files\nodejs\npm.cmd" ...`) or a PATH export (`export PATH="/c/Program Files/nodejs:$PATH"`) before running.

---

## Design standards that are now locked in

| Thing | Value | Where |
|---|---|---|
| Body bg | `#E5E5E5` | `body`, `.section--light` |
| Footer bg | `#FFFFFF` | `.site-footer` |
| Dark panel bg | `#121212` | `.quote-block`, `.stylists-quote` |
| Body text | Montserrat 14.4px, weight 300, line-height 1.5 | `body`, `p` |
| Page title (H1) | **40px flat** Montserrat UltraLight (weight 200) | `.page-title` — used on EVERY page, same size everywhere |
| Sub-section heading (Cuts / Colour & Treatments type) | 20px Montserrat Light | `.pricing-category` — new utility added in services pass |
| Subheading (small bold) | 14px Montserrat Bold | `.subheading` |
| Section padding | 40px top/bottom | `.section` |
| Nav→content gap on non-hero pages | ~82px (from `.page-top > .section:first-child { margin-top: 2rem }`) | rule in style.css |
| Header "Book now" | Black bg + white text on light header (`btn--primary`); outline-white on dark header | `Header.astro` |
| Paragraph → buttons | 48px margin-top on `.btn-group` (total ~62px visible over p margin) | `.btn-group` |

**Important:** Matt wants unified tokens — "agreed" values propagate to every page via class. Avoid page-scoped overrides unless there's a clear design reason. (See `feedback_unified_design_tokens.md` memory.)

**Also:** quote spacing/sizes in **pixels**, not rem/% — Matt tunes things by saying "make it 60". (See `feedback_pixel_measurements.md` memory.)

---

## Outstanding for Matt's review

### Services page — things he should look at
- [ ] **Intro image on services.html** now uses the designer's male model portrait (light blonde hair, black sweater). Previously it was `home-hero.png` (a female portrait). If Matt wants the female one back, revert `src/pages/services.astro` line with `services-hero.jpg` → `home-hero.png`.
- [ ] **Dark-section image** now uses the designer's hanging-black-scissors shot (`services-scissors.jpg` from the Sketch file). Previously salon interior. Designer clearly intended scissors per the mockup.
- [ ] **"Service Menu" and "Salon Hours" headings** now render at `.page-title` (40px UltraLight) matching "Our Services". Matt may want them smaller/different.
- [ ] **"Cuts" and "Colour & Treatments"** now use new `.pricing-category` class (20px Light) instead of default bold h3 (25.6px bold). Cleaner and quieter — designer tokens don't have a tier between 40 and 20px.

### Pending questions Matt hasn't answered
- [ ] Stylists 8th card — keep "We're hiring" (confirmed ✓, done) — Dan's portrait downloaded to `public/images/stylists/dan.jpg` but NOT currently displayed. Add Dan as an 8th stylist + 9-cell grid (3×3)? Or leave.
- [ ] Homepage (index.html) audit — deferred as high-risk; not yet touched vs designer mockup
- [ ] Visit.html + Microblading.html audits — migrated but not audited yet
- [ ] What are the `< >` circular arrows on the far left/right viewport edges of the salon mockup? Possibly carousel chrome for something bigger. Not implemented.

### Known content gaps (Matt/client task, not code)
- [ ] Proper adult photos for stylists already fetched from live site — but if he wants NEW styled portraits matching the designer mockup (colour stylised, consistent), that's a photoshoot task
- [ ] Real GA4 Measurement ID (currently `G-XXXXXXXXXX` placeholder in BaseLayout.astro)
- [ ] Confirm microblading pricing with Tamlin

---

## Next page to audit

Matt's rolling order so far: Salon → Stylists → Services (just done). Likely next: **Visit** (similar two-col pattern, should be quick) → **Microblading** → **Homepage** (save for last, biggest visual territory).

---

## Git / rollback

- `main` → `af80793` (current, everything above)
- `pre-astro-migration` → `c36c96b` (backup branch, flat HTML pre-Astro)
- `git reset --hard c36c96b` if the Astro site needs to be abandoned — though Netlify would still try to build Astro unless `netlify.toml` is removed too

### Gotchas still carried forward
- `preview_screenshot` timed out earlier in the day; if it hangs again, DOM inspection via `preview_inspect` + `preview_eval` is the reliable verification path
- Git CRLF warnings on every commit are harmless — don't touch `core.autocrlf`
- The "baby photo" stylist images turned out to be actual baby photos (stylists as babies, possibly intentional). Replaced during the stylists audit with current live-site adult portraits.
