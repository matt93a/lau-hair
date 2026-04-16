# Lau Hairdressing Website — Handover Document

**Last updated:** 2026-04-15 (end of day session)
**Author:** Claude (previous session)
**Purpose:** Enable a fresh Claude Code instance on another PC to seamlessly continue this build.

---

## 1. TL;DR — Read This First

- **Repo:** https://github.com/matt93a/lau-hair (branch `main`)
- **Status:** Working tree is clean, all changes pushed. Site is functional but NOT yet production-ready.
- **Live:** Not yet deployed. Netlify setup instructions in `docs/netlify-setup.md`.
- **⚠️ CRITICAL MISSING ON GITHUB:** The `designer-assets/` folder is **gitignored** (too large). It contains the Sketch file, PDF flow, and original hi-res images. **Move this folder manually** (zip/Drive/USB) to the new PC, placing it at project root. Without it, image edits that reference the original designer output become guesswork.
- **Required on new PC:** Git, Node.js (for `npx http-server` preview), VS Code or similar, Claude Code.

### ⚠️ Folder naming — one step needed on this PC
The project currently sits in `C:\Users\mp\Desktop\Claude Files\test project\`. That name is a legacy from when the folder was shared with an unrelated personal dashboard project. **Those files have been moved out** to `C:\Users\mp\Desktop\Claude Files\command-centre\`. The only thing blocking a clean rename of `test project` → `lau-hair` is that Claude Code holds the folder open. **After closing Claude Code**, run this once:
```
cd "C:\Users\mp\Desktop\Claude Files"
move "test project" "lau-hair"
```
Then reopen Claude Code in the new `lau-hair` folder. On the new PC, the rename isn't needed — just `git clone https://github.com/matt93a/lau-hair.git lau-hair` to get a clean folder name from the start.

---

## 2. Project Context

**Client:** Damon Lau — Lau Hairdressing, 13 Gabriel's Hill, Maidstone, Kent ME15 6HL
**Domain:** lau-hair.com (not yet pointed at new build)
**Stack:** Flat HTML/CSS — no CMS, no frameworks, no build tools
**Font:** Montserrat via Google Fonts CDN (200, 300, 400, 700)
**Owner/maintainer:** Matt Pickup (TME Digital / Bridges Ltd)

Full project context (contact details, opening hours, team, pricing, SEO targets, common edits) is in `CLAUDE.md` at the repo root. **The new Claude instance will auto-load it** — that is the source of truth for project metadata.

---

## 3. Current State — What's Done

### Pages built (12 HTML files)
| Page | Status | Notes |
|------|--------|-------|
| `index.html` | ✅ Works | Hero uses designer's composited image on desktop, frameless painting on mobile |
| `salon.html` | ✅ Works | Hero image, ethos, hours table |
| `visit.html` | ✅ Works | Two-column: consultation text + hero image + hours |
| `stylists.html` | ✅ Works | Intro + quote block, 4×2 grid with hiring card placeholder |
| `services.html` | ✅ Works | Intro, hours, dark service menu with pricing tables |
| `microblading.html` | ✅ Works | Tamlin Lau hero + content (hiring banner removed) |
| `charity.html` | ✅ Works | CoCo's Foundation story + cow images |
| `contact.html` | ✅ Works | Two-column Get In Touch + Our Location, centred hours table |
| `careers.html` | ✅ Works | Current vacancies with callout boxes |
| `terms.html` | ⚠️ Minimal review | Head updated, body not individually reviewed |
| `privacy.html` | ✅ Works | Inline styles cleaned into `.content-list` / `.address-block` |
| `cancellations.html` | ✅ Works | 48hr policy with `.lead-text` class |

### Technical achievements
- **All 12 pages** have: favicon, Open Graph tags, Twitter Cards, GA4 placeholder (`G-XXXXXXXXXX` — needs real ID), Schema.org on homepage
- **`sitemap.xml` + `robots.txt`** — at repo root, sitemap has all 12 pages with priorities
- **Responsive** — mobile-first, breakpoints at 480px, 768px, 1024px
- **Inline styles eliminated** from all 12 Lau Hair pages — everything uses CSS classes now
- **Designer assets integrated** — `hero-bg.png`, `depp-soul.png`, `depp-signature.png`, `depp-sqr.png`, `home-hero.png`, `scissors.svg`
- **Image optimisation** — @4x designer PNGs resized with `sharp-cli` (e.g. hero-bg 15MB→1.3MB, home-hero 8.3MB→2.2MB)
- **GitHub push pipeline** works — `gh` CLI authenticated as `matt93a`, git identity set to `matt93a@users.noreply.github.com`

---

## 4. What's NOT Done — Pick Up Here

### Must-do before going live
1. **Create GA4 property** at analytics.google.com for lau-hair.com, get measurement ID, search-and-replace `G-XXXXXXXXXX` across all HTML files.
2. **Google Search Console** — verify domain (HTML meta or DNS), submit `sitemap.xml`.
3. **Deploy to Netlify** — follow `docs/netlify-setup.md`. Connect GitHub repo, Netlify auto-deploys from `main`.
4. **Point lau-hair.com** at Netlify once client signs off on the test URL.

### Client decisions still needed
- **Microblading pricing** — current meta says "starting at £300 including 6-week infills". Confirm still current.
- **"Our Work" gallery page** — not in new design. Confirm whether Damon wants one.
- **Real stylist photos** — the `images/stylists/` folder contains baby/childhood photo placeholders (Damon's quirky touch). Confirm these are final or if professional shots are coming.
- **K18, Olaplex prices** — blank in services.html pricing table. Awaiting client.

### Rough edges that should be polished
- **`stylists.html` hiring card (8th slot)** — exists but image/copy may need refining to match designer intent.
- **`terms.html`** — body not reviewed in detail this session. Likely fine but scan it.
- **`command-centre.html` and related files** — these were your personal dashboard that physically shared the workspace folder but were never tracked in git. They've now been moved to `C:\Users\mp\Desktop\Claude Files\command-centre\` (separate folder, separate concern).
- **Favicon** — currently a simple "LAU" text SVG. Designer didn't provide a specific favicon; the logo-black.svg could be adapted if Damon wants.

---

## 5. Pitfalls & Lessons Learned — Don't Repeat These

### The hero image saga (spent ~30 mins on this)
**Problem:** User wanted the painting to "fill the space" on the homepage, with the overlay text readable.

**What was tried:**
1. ❌ Framed `<img>` element inside a container — too small on desktop, grey bars everywhere
2. ❌ CSS `background-size: contain` — showed too much grey wall around the painting
3. ❌ `background-size: cover` + `object-position: 70%` — painting shifted offscreen in preview screenshots (turned out to be a preview rendering artefact, not real)
4. ❌ `mix-blend-mode: screen` on the text overlay — illegible over the pale areas of the painting (e.g. the face)
5. ✅ **Final solution:**
   - Desktop: `background: #1a1a1a url('../images/hero-bg.png') center center / cover no-repeat;` — shows the framed painting on the gallery wall
   - Mobile (≤768px): swap to `depp-sqr.png` (frameless painting) with `background-size: cover` and `background-position: center 30%` — fills viewport edge-to-edge
   - Text overlay uses `filter: drop-shadow(0 2px 8px rgba(0,0,0,0.7))` instead of mix-blend-mode — legible everywhere

**Lesson:** When a user says "fill the page" and the designer's source image has lots of surrounding context (grey wall), you may need a separate frameless crop for mobile.

### Preview tool screenshot quirks
The `mcp__Claude_Preview__preview_screenshot` tool sometimes shows content cropped or offset from what the actual viewport renders. **Always verify with `preview_eval` or `preview_inspect` on the DOM** before concluding something is broken. Measured element positions are truth; screenshot pixels sometimes lie.

### Windows-specific gotchas
- **`find` and `convert`** on Windows = filesystem tools, not Unix `find` / ImageMagick. Use `Glob` and `npx sharp-cli` instead.
- **`pdftoppm` not available** — can't read PDF files directly. The `Lau Site Flow.pdf` in designer-assets is **unreadable from this session**. If the new PC has Poppler installed or a PDF reader MCP, re-read it for layout guidance.
- **Port 8080 leaks** — http-server doesn't always release the port. If `preview_start` fails with "port in use", find PID via `netstat -ano | findstr :8080` then `taskkill //F //PID <pid>`.
- **Git CRLF warnings** — appear on every commit on Windows. Harmless. Don't change `core.autocrlf`.
- **`.gitignore` case sensitivity** — originally had `Index.html` (capital I) which would have excluded `index.html` on macOS/Linux. Fixed. Keep future entries lowercase.

### Designer assets folder
- **Gitignored because it's ~50MB** (zip + Sketch + PDF + @4x PNGs).
- **Nothing in `designer-assets/` is on GitHub.** If you delete it locally, you lose the designer's original Sketch file and the ability to re-export assets.
- On the new PC, zip `designer-assets/` on the current PC, transfer via Google Drive / USB / cloud storage, and extract at the project root.

### GitHub CLI (`gh`)
- Was installed via `winget install GitHub.cli` during the first session.
- Authenticated as `matt93a` (user entered device code `0334-8851` in browser).
- On the new PC you'll need to re-authenticate: `gh auth login` → GitHub.com → HTTPS → browser flow.

---

## 6. How to Work on This Project

### Preview a page locally
```
# From repo root
npx http-server . -p 8080 -c-1
# Then open http://localhost:8080/
```
OR use Claude Preview MCP: `preview_start` with name `lau-hair` (config is in `.claude/launch.json`).

### Common edits — see `CLAUDE.md` § "How to Make Common Edits"
- Change a price → edit relevant `<td>` in `services.html`
- Update hours → edit footer of EVERY page + `visit.html` + `services.html` + `salon.html` + Schema.org in `index.html`
- Change booking URL → search-and-replace `s-iq.co/BookingPortal/dist/?salonid=...` across all files
- Add a stylist → edit `.stylists-grid` in `stylists.html`

### Git workflow
```
git status
git add <specific files>    # avoid `git add .` — may pull in .output files
git commit -m "…"
git push
```
The "Co-Authored-By: Claude Opus …" trailer is convention on this repo.

### CSS conventions
- BEM-ish (`block__element--modifier`)
- Utility classes: `.text-light`, `.text-bold`, `.mt-1` through `.mt-4`, `.mb-1` through `.mb-4`, `.text-center`, `.text-muted`, `.lead-text`, `.content-list`
- Section modifiers: `.section--light`, `.section--dark`, `.section--white`, `.section--border-top`
- Never add inline styles — always a class (this was heavily enforced in the last session).

---

## 7. Key Files and Where Things Live

```
test project/
├── CLAUDE.md                 ← project context (auto-loaded by Claude Code)
├── HANDOVER.md               ← this file
├── README.md                 (if you want to add one — not required)
├── index.html ... terms.html ← 12 Lau Hair pages
├── robots.txt, sitemap.xml
├── css/style.css             ← single stylesheet, ~1200 lines
├── images/                   ← web-optimised images (in git)
│   ├── hero-bg.png           (desktop hero — framed painting on wall)
│   ├── depp-sqr.png          (mobile hero — frameless painting)
│   ├── depp-soul.png         (handwritten text overlay)
│   ├── depp-signature.png    (bottom-right signature)
│   ├── home-hero.png         (gold-makeup woman — used on services)
│   ├── visit-hero.png, artwork-*.png, logo-*.svg, favicon.svg
│   ├── charity/, microblading/, salon/, stylists/  (sub-pages)
│   └── icons/scissors.svg
├── designer-assets/          ← ⚠️ GITIGNORED — move manually to new PC
│   └── Lau Hair/
│       ├── Lau Site 260326.sketchcloud.zip  (Sketch file for re-exports)
│       ├── Lau Site Flow.pdf                 (designer's page flow)
│       └── Website Assets/
│           ├── Fonts/
│           └── Images/ (@4x originals, SVGs, etc)
├── docs/netlify-setup.md
├── .claude/launch.json       (preview server config)
├── .gitignore
└── .superpowers/ .claude/    ← gitignored, session/skill state
```

### Critical file interdependencies
- `CLAUDE.md` — update this if client details change (hours, pricing, team). Future Claude sessions rely on it.
- **Hours appear in 5 places** — footer of every page, `visit.html` body, `services.html` body, `salon.html` body, Schema.org JSON-LD in `index.html`. Miss any one → inconsistency.
- **Booking URL is in every page's header and several body CTAs** — search-replace to update.

---

## 8. Active Services / Accounts (for reference)

| Service | Account/ID | Status |
|---------|-----------|--------|
| GitHub | `matt93a/lau-hair` | Active, 5 commits |
| GA4 | Not yet created | TODO |
| Search Console | Not yet verified | TODO |
| Netlify | Not yet connected | TODO (see `docs/netlify-setup.md`) |
| S-IQ booking | salonid `144ab19c-0032-4459-b79d-126853a7c144` | Live, working |
| Domain registrar | Unknown (ask Damon) | — |

---

## 9. First Actions on the New PC

1. **Clone repo:** `git clone https://github.com/matt93a/lau-hair.git lau-hair` → `cd lau-hair`
2. **Copy designer-assets/** folder from the old PC (zip → Drive → unzip into repo root). Verify `designer-assets/Lau Hair/Website Assets/Images/` exists.
3. **Authenticate gh:** `gh auth login` (if you'll be using gh CLI for PRs/issues).
4. **Set git identity** (if fresh install):
   ```
   git config user.email "matt93a@users.noreply.github.com"
   git config user.name "Matt Pickup"
   ```
5. **Install Node** (if not present) — needed for `npx http-server`.
6. **Start Claude Code in the repo folder.** `CLAUDE.md` will auto-load. Ask Claude to read `HANDOVER.md` first.
7. **Pick up from § 4 ("What's NOT Done")** — the GA4 + Netlify + client decisions.

---

## 10. Change Log Summary

| Commit | What | When |
|--------|------|------|
| `d7fa68c` | Initial build: 12 pages, designer assets, Schema.org, sitemap, robots, gitignore | Session 1 |
| `4ead2e8` | Clean up inline styles (10 pages), hero rendering attempt #1 | Session 2 (morning) |
| `cc19ebe` | Design overhaul: hero fill edge-to-edge on mobile, footer compact, microblading hiring banner removed, scissors stock photo → designer image | Session 2 (evening) |
| `8c071c1` | Add HANDOVER.md for cross-PC continuity | Session 2 (evening) |
| `ac61408` | Separate Lau Hair from command-centre project; correct HANDOVER.md | Session 2 (evening) |

---

**When in doubt:** the designer's Sketch file (in `designer-assets/Lau Hair/`) is the authority for look-and-feel. The old `.html` files this rebuild replaced were "someone's attempt at implementing the design" — don't copy their patterns blindly.

Good luck to the next Claude. Matt — have a good trip. 🚀
