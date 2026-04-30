# Lau Hair v2 — Home Page Redesign + Reviews + Our Work

## Project Context

**Client:** Lau Hairdressing — independent hair salon, Maidstone, Kent
**Address:** 13 Gabriel's Hill, Maidstone, Kent, ME15 6HL
**Owner:** Damon Lau
**Anniversary:** Celebrating 30 years in 2026 (founded 1996)
**Existing live preview:** https://chic-peony-38af97.netlify.app/
**Booking phone:** 01622 670 557
**Instagram (for feeds):** @damon_at_lau (subject to change to @lauhairdressing later)
**Google Place:** Lau Hairdressing, Maidstone (Maps URL provided in assets)

## What I need from you

High-fidelity design mockups (desktop + mobile) for:
1. A **new home page layout**
2. A **`/reviews` page**
3. A **`/our-work` page**
4. A **fixed mobile header** (current one is broken — see screenshot)

**Don't write code.** I want visual designs (Figma-style frames or rendered images) that I can hand to a developer to build. The existing live site stays as-is — we're building v2 in parallel for client sign-off before cutover.

---

## Brand Specs (extracted from current CSS)

| Element | Spec |
|---|---|
| Primary font | **Montserrat**, sans-serif |
| Heading weight | **200** (light) — distinctive thin headings |
| Heading size (h1, desktop) | **40px** |
| Body font size | **16px** |
| Body background | **#E5E5E5** (light grey) |
| Cream surface | **#FAF9F5** |
| Near-black surface | **#121212** |
| Brand accent (gold) | **#B09F65** — used on top notification bar |
| Heading colour | **#000000** |
| Body text colour | **#141413** |
| Button — primary | Solid black bg, white text, ~2px radius, padding ~14px 28px |
| Button — secondary | White/transparent bg, 1px black border, black text |

**Logo:** "Lau HAIRDRESSING" — handwritten lowercase "Lau" wordmark, small "HAIRDRESSING" caps underneath. White on black header.

See `BRAND-SPECS.md` for full detail.

---

## Aesthetic — what to match

The existing `/salon` page is the visual benchmark. Premium, monochrome (black + white + cream), gold accents used sparingly, thin/light typography, photography-led, generous whitespace. **Don't reinvent the brand language.**

**Avoid:** the rejected mockup style (`screenshots/rejected-direction.png`, crossed out in red) — it's too generic, oversaturated colour, cluttered.

---

# HOME PAGE LAYOUT (top → bottom)

## Section 1 — Hero Slider

Match the **`/salon` page slider style exactly**: 2-column layout, lifestyle/portrait image on the **left**, dark (near-black `#121212`) panel on the **right** with white quote text + attribution + ← → arrow controls underneath.

The slider auto-rotates and is manually navigable. Each slide is image + matched message.

**Slide content (placeholders — final copy/imagery TBC by client):**

- **Slide 1 — Damon, 30 Years**
  Image: Damon Lau, B&W, holding scissors, "Lau Hairdressing #lauhair" backdrop (provided as `screenshots/damon-30-years.png`).
  Message: "30 years of Lau Hairdressing. When passion becomes profession, quality matters." — Damon Lau

- **Slides 2–5:** TBC by client. Lay out the *structure* with realistic placeholder copy so the client can fill in.

Existing reference quote on /salon: *"Life is a series of challenges, but a great hairdresser can turn any bad day into a masterpiece." — Damon Lau*

## Section 2 — Service Cards (Specialities)

Sits **directly under the hero slider**. Four cards showing back-of-head hair shots with service titles overlaid (style reference: `screenshots/back-of-head-style-reference.png`).

**Card titles:**
1. Balayage & Blonde Specialists in Maidstone
2. Haircutting Specialists in Maidstone
3. Colour Correction Experts in Maidstone
4. Perming Specialist in Maidstone

**Layout:**
- **Desktop:** show what fits in viewport, horizontal scroll for any overflow (Netflix-style row, swipe/drag left-right)
- **Mobile:** 2-column grid, all 4 visible, stack vertically

**Image style:** clean, professional back-of-head salon shots — not stock-y, must look like real Lau clients in a salon environment. Match the lighting/mood of the reference image.

**Card treatment:** image fills the card, dark gradient overlay at bottom, white service title bottom-left, optional "View →" link.

## Section 3 — 30th Anniversary Panel

Dedicated horizontal section celebrating 30 years. Could include:
- Big "30 Years" treatment (statement typography)
- Founded 1996 — 2026 dates
- Short paragraph about the journey
- Photo of Damon and/or original salon
- Possibly milestone timeline

Premium, restrained, not gaudy. This is a moment of reflection in the page flow.

## Section 4 — Real Client Transformations

Before/after grid. 4 transformation pairs visible.

Show two layout options in the mockups so I can pick:
- **(a)** Side-by-side before/after pairs with thin divider line + small label
- **(b)** Drag-to-reveal slider (click + drag handle to wipe between before and after)

Use placeholder before/after imagery.

## Section 5 — Meet Our Team

Existing team headshots in a clean grid:
- 3 or 4 across desktop
- 2 across mobile
- Each card: photo, name, role
- Hover state: subtle zoom or overlay with a "View bio" link

## Section 6 — What Our Clients Say

Reviews from Google + Facebook.

**Home version:** 3 review cards in a single row + "See all reviews →" button linking to `/reviews`.

**Card content per review:**
- ★★★★★ rating
- Quote (truncate at ~200 chars with "...")
- Reviewer name
- Date
- Source logo (Google or Facebook)

**No filters on home** — just clean, premium, light.

## Section 7 — Follow Us on Instagram (curated)

Strip near the bottom showing 6–8 hand-picked Instagram posts curated via a Google Sheet (admin-managed).

Layout:
- **Desktop:** single row of 6–8 square thumbnails
- **Mobile:** horizontal scroll of square thumbnails

Each tile links out to the Instagram post. Top of strip: "@damon_at_lau" handle + Instagram icon.

## Section 8 — Footer

Keep existing footer structure — Salon Hours, Navigation, Salon Guidelines, Salon Contact. Visually polish to match the new look if needed.

---

# `/REVIEWS` PAGE

Dedicated page showing all reviews from Google + Facebook.

- **No filters** — clean, masonry-style grid, light and pleasant
- Source logos (Google / Facebook) per card
- Star rating, quote, reviewer name, date
- Sorted newest first
- Clear CTA at top: "Average X.X ★ from XX reviews" + "Leave a review" button (links to Google review form)

Aesthetic: airy, lots of whitespace, maybe alternating card backgrounds (white / cream).

---

# `/OUR-WORK` PAGE

Dedicated page showing Lau's Instagram work, **filterable**.

**Filter pills (two rows):**

Row 1 — Service:
- All / Balayage / Cuts / Colour Correction / Perming

Row 2 — Look:
- All / Blonde / Brunette / Red / Short / Long / Up-styles

Selecting filters across both rows narrows the results (AND logic).

**Grid:**
- Desktop: 3 across
- Mobile: 2 across
- Lightbox on click — full-size image, caption, link to Instagram post

**Behind the scenes:** posts are tagged in a Google Sheet (admin-editable), so this page is driven by curated + tagged content, not raw Instagram API output.

---

# MOBILE HEADER — fix the bug

The current mobile header is **broken** (see `screenshots/mobile-header-bug.png`):
- The "Lau" logo gets cut off / overlapped behind the gold "We're hiring" notification bar
- Header alignment collapses

**Redesign the mobile header.** Things to nail:
- Logo positioning (don't get cut)
- Gold notification strip behaviour (sticky? scroll-away?)
- Burger / menu icon (left)
- Phone CTA + Book now (right)
- 30th anniversary tie-in (the gold strip can flip between "30 years — join our team" and other messages)
- Social icons — show or hide on mobile?

Provide a close-up frame just for mobile header states (default, scrolled, menu-open).

---

# 30TH ANNIVERSARY — how it shows up

Three places (all confirmed):

1. **Top notification ribbon** (existing gold strip, currently says "We're hiring"). Update it to weave in the 30 years — e.g.: *"Celebrating 30 years of Lau Hairdressing — we're recruiting stylists. View positions →"*
2. **Hero slider slide 1** — Damon B&W image with the 30-years message
3. **Dedicated panel on home** (section 3 above) — full-width anniversary celebration

---

# DELIVERABLES (recap)

1. **Desktop full home page mockup** — single tall image / Figma frame
2. **Mobile full home page mockup**
3. **Mobile header close-up** — default + scrolled + menu-open states
4. **`/reviews` page mockup** (desktop + mobile)
5. **`/our-work` page mockup** (desktop + mobile, including filter UI states)
6. **Two layout options for Real Client Transformations** (side-by-side vs drag-reveal)
7. **One option each** for the other sections (we've made the structural decisions)
8. **Short written rationale** per section explaining design decisions

---

# OUT OF SCOPE for you

- Code (I'll build from your mockups)
- Final copywriting (use placeholder copy; client fills in later)
- Final imagery (use placeholders; client provides real assets)
- Diagnosing the mobile header bug technically (I'll handle dev-side; you just design the fixed version)
- The Google Sheet structure (I'll spec that as part of dev)
- Reviews API wiring + Instagram fallback (dev-side)

---

# FILES ATTACHED

In the `screenshots/` folder:

| File | What it is |
|---|---|
| `salon-banner-reference.png` | **The hero slider style to match exactly** |
| `salon-desktop-scrolled.png` | Additional /salon reference |
| `home-desktop-top.png` | Current home page hero ("haircut is the portrait of the soul") |
| `home-desktop-scrolled.png` | Current home page below fold |
| `services-desktop.png` | Services page reference (overall site style) |
| `mobile-header-bug.png` | **The broken mobile header to fix** |
| `back-of-head-style-reference.png` | **Image style for the 4 service cards** |
| `damon-30-years.png` | Damon B&W scissors photo for hero slide 1 |
| `rejected-direction.png` | **Crossed out — do NOT design like this** |
| `service-cards/card-*.jpg` | (If provided) actual back-of-head photos for the 4 service cards |

Plus `BRAND-SPECS.md` — full extracted brand spec.

---

# QUESTIONS FOR YOU (the designer)

Before mocking up, ask me:
- Anything ambiguous in this brief
- Any constraint that would change the visual direction significantly
- Anything you need that isn't in the attached folder

Otherwise — go.
