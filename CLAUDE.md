# Lau Hairdressing Website

## Project Overview

Rebuilding the website for **Lau Hairdressing** (lau-hair.com), a hair salon at 13 Gabriel's Hill, Maidstone, Kent ME15 6HL, owned by **Damon Lau**. The site is an **Astro 5 static site** — shared components + page templates that compile to plain static HTML in `dist/`. Matt Pickup (TME Digital / Bridges Ltd) maintains this.

**GitHub:** matt93a/lau-hair
**Live domain:** lau-hair.com
**Test deploy:** Netlify (connect via GitHub integration - see docs/netlify-setup.md)

## Design Source of Truth

The designer provided a Sketch file and asset pack (stored locally in `designer-assets/` which is gitignored due to size). The designer's mockups are the authority - the HTML/CSS was someone's attempt at implementing the design.

Key designer assets that are now integrated into `images/`:
- `hero-bg.png` - Homepage hero: painting in frame on dark wall (composited by designer)
- `depp-soul.png` - Handwritten text overlay "A Haircut is the Portrait of the Soul"
- `depp-signature.png` - Signature for bottom-right of homepage hero
- `scissors-icon.svg` - Vector scissors icon

## Tech Stack

- **Astro 5.x** — static output (`output: "static"`, `build.format: "file"` so URLs stay `/salon.html` not `/salon/`)
- **Components:** `src/layouts/BaseLayout.astro` + `src/components/{Header,MobileNav,Footer}.astro` — edit once, all pages rebuild
- **Pages:** one `.astro` file per route in `src/pages/`; each extends `BaseLayout` with title/description/canonical + unique body
- **Static assets:** `public/` is copied to `dist/` unchanged (CSS, images, robots.txt, sitemap.xml, favicon)
- **CSS:** single `public/css/style.css` — BEM-ish classes, utility classes, no scoped component styles (yet)
- **Font:** Montserrat via Google Fonts CDN (weights: 200, 300, 400, 700)
- **Responsive:** Mobile-first with breakpoints at 768px, 1050px, 1300px
- **Booking:** All "Book now" buttons link to external S-IQ portal
- **Build:** `npm run build` → outputs `dist/`; `npm run dev` for HMR; `npm run preview` to serve the build
- **Deployment:** Netlify auto-deploy from GitHub `main`; `netlify.toml` pins Node 24, runs `npm run build`, publishes `dist/`
- **Node version:** 24 required (pinned in netlify.toml, matches local)

## Key URLs & Credentials

- **Booking portal:** `https://s-iq.co/BookingPortal/dist/?salonid=144ab19c-0032-4459-b79d-126853a7c144&tab=book`
- **Google Maps:** `https://maps.google.com/maps?q=Lau+Hairdressing+Ltd,+Gabriel%27s+Hill,+Maidstone,+United+Kingdom`

## Contact Details

- **Phone:** 01622 670 557
- **Address:** 13 Gabriel's Hill, Maidstone, Kent, ME15 6HL, United Kingdom
- **what3words:** ///cards.lunch.drill
- **Email:** info@lau-hair.com
- **Instagram:** @lauhairdressing
- **Facebook:** /lausalon
- **X/Twitter:** @lauhairdressing

## Opening Hours

| Day | Hours |
|-----|-------|
| Mon | Closed |
| Tue | 9:30 - 8pm |
| Wed | 9am - 6pm |
| Thu | 9am - 6pm |
| Fri | 9:30 - 7pm |
| Sat | 8am - 5pm |
| Sun | Closed |

Hours appear in 3 places: footer of EVERY page, visit.html body, services.html body, salon.html body. Also in Schema.org JSON-LD in index.html.

## Team Members

1. **Damon** - Salon Owner
2. **Katy** - Salon Manager
3. **Lisa** - Front of House
4. **Emily** - Level 3 Stylist
5. **Chloe** - Level 1 Stylist
6. **Nick** - Level 1 Stylist
7. **Simon** - The Maintenance Man
8. 8th grid slot = "We're hiring" card linking to careers.html

## Service Pricing

### Cuts
- Ladies Cut & Finish: £60
- Gents Cut & Finish: £43
- Standalone Finish: £38
- Under 12 Cut & Finish: £28
- 13-15yrs Cut & Finish: 25% off Stylist price

### Colour & Treatments
- Highlights/Lowlights (foils): £105
- Balayage: £130
- Half-head: £85
- Tinting: £65
- Toner: £30
- Colour-correction: PoA
- Full Bleach: PoA
- Natural Glossing: £65
- Luxury Perming: £90
- Brazilian Blow-dry: £200
- K18 Molecular Repair Treatment: (no price listed)
- Olaplex Strengthening Treatment: (no price listed)
- Awapuhi Wild Ginger Treatment: £30 - £40ea
- Bespoke Luxury Treatments: £15 - £25
- Party Hair: £40 / 30mins

Children's appointments Monday to Friday only. Luxury Gift Vouchers available.

## Site Structure

Source lives in `src/pages/` as `.astro` files; each compiles to the `.html` route shown:

```
src/pages/index.astro          → /index.html          (dark header, artwork hero, Schema.org)
src/pages/salon.astro          → /salon.html          (ethos, heritage, hours, hero carousel)
src/pages/visit.astro          → /visit.html          (consultation info)
src/pages/stylists.astro       → /stylists.html       (7 team + hiring card grid)
src/pages/services.astro       → /services.html       (intro + salon hours + dark pricing menu)
src/pages/microblading.astro   → /microblading.html   (Tamlin Lau, hiring banner)
src/pages/charity.astro        → /charity.html        (CoCo's Foundation cows)
src/pages/contact.astro        → /contact.html        (phone, email, what3words, hours)
src/pages/careers.astro        → /careers.html        (students + experienced stylists)
src/pages/terms.astro          → /terms.html          (9 sections)
src/pages/privacy.astro        → /privacy.html        (Privacy & Cookie Policy)
src/pages/cancellations.astro  → /cancellations.html  (48hr policy)
src/pages/landing.astro        → /landing.html        (minimal cover variant — framed painting)
```

Plus a local-only `public/designs.html` (gitignored) that scroll-views all 6 designer mockup PNGs for reference.

## Design Conventions

- **Header:** Light variant (black logo, black icons) on all pages EXCEPT homepage which uses dark variant (dark bg, white logo, white icons)
- **Navigation:** Salon, Booking, Stylists, Services, Microblading, Charity, Contact
- **Footer:** 5-column grid (address, hours, nav links, guidelines, contact + socials), identical on every page
- **Mobile nav:** Hamburger toggle using onclick to toggle .active class on .mobile-nav
- **CSS methodology:** BEM-ish classes, CSS custom properties, utility classes

## How to Make Common Edits

- **Change a price:** Edit the `cuts` or `colour` arrays in `src/pages/services.astro` frontmatter
- **Add/remove a stylist:** Edit the `stylists` array in `src/pages/stylists.astro` frontmatter
- **Update opening hours:** Two places now — `src/components/Footer.astro` (global footer on every page) + the inline `<table>` on `src/pages/salon.astro`, `src/pages/visit.astro`, `src/pages/services.astro`, `src/pages/contact.astro`, `src/pages/cancellations.astro` + Schema.org JSON-LD inline in `src/pages/index.astro`
- **Change the booking URL:** Update the `BOOKING_URL` constant in each `.astro` file that uses it (`Header.astro`, plus most `src/pages/*.astro`)
- **Change the phone number:** `src/components/Header.astro`, `src/components/MobileNav.astro`, `src/components/Footer.astro`, and any page that hard-codes it in body copy
- **Update the nav links:** Edit the `navLinks` array in `src/components/Header.astro` AND `src/components/MobileNav.astro` (both exist because the overlay is a sibling, not a child, of the header)
- **Add a new page:** Create `src/pages/<name>.astro`, wrap body in `<BaseLayout title="..." description="...">...</BaseLayout>` — header, footer, mobile-nav, meta, canonical are all handled by the layout
- **Apply a design change site-wide:** Edit `public/css/style.css` by class — there are no page-scoped overrides except where explicitly noted (e.g., `.salon-hero`); changes to `.page-title`, `.subheading`, `.btn-group`, etc. propagate to every page

After any edit, run `npm run build` (or rely on `npm run dev` HMR) to regenerate `dist/`.

## SEO Target Keywords

Primary: "hairdresser maidstone", "hair salon maidstone"
Secondary: "hairdressing maidstone", "best hairdresser maidstone", "hair colourist maidstone"
Service-specific: "balayage maidstone", "microblading maidstone", "microblading kent"

## Outstanding / To Confirm with Client

- Microblading pricing: meta says "starting at £300 including 6-week infills" - confirm still current
- No "Our Work" gallery page in new design - confirm if Damon wants one
- Google Analytics: needs GA4 Measurement ID (format G-XXXXXXXXXX) once property is created
- Google Search Console: needs verification once live domain is pointed

## Analytics Setup (TODO)

GA4 snippet placeholder is in all pages. To activate:
1. Go to analytics.google.com > Create property for lau-hair.com
2. Get the Measurement ID (G-XXXXXXXXXX)
3. Search and replace `G-XXXXXXXXXX` across all HTML files

Google Search Console:
1. Go to search.google.com/search-console
2. Add property for lau-hair.com
3. Verify via HTML meta tag (add to all pages) or DNS
4. Submit sitemap.xml
