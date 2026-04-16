# Session Notes — 2026-04-16

**Pick-up instructions for the next Claude instance.**
Read this **after** `CLAUDE.md` and `HANDOVER.md` (both still accurate for baseline context).

---

## Where we are

Matt (owner) returned from the other PC, cloned the repo fresh to `C:\Users\mp\Desktop\Claude\lau-hair\`, and we're now mid-audit of the whole site against the designer's mockups.

### New on this PC (all already installed)
- Node.js 24.15.0 at `C:\Program Files\nodejs\` — **not on Claude Code's inherited PATH**; invoke with the full path or via `.claude/start-preview.cmd`
- Poppler 25.07.0 for PDF rendering — same PATH caveat, binaries at `C:\Users\mp\AppData\Local\Microsoft\WinGet\Packages\oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe\poppler-25.07.0\Library\bin\`
- Git identity **NOT yet set** — need `git config user.name "Matt Pickup"` + `git config user.email "matt93a@users.noreply.github.com"` before first commit
- Netlify live at **https://chic-peony-38af97.netlify.app/** (auto-deploys from `main`)

### Preview server
- Local preview config at `C:\Users\mp\Desktop\Claude\.claude\launch.json` (one level up from this repo, since that's Claude Code's CWD)
- Starts via `preview_start` MCP with name `lau-hair` — wrapper at `.claude/start-preview.cmd`
- After a restart the port will be free. If a stale http-server ever clings to :8080, kill via `taskkill //F //PID <pid>` (find pid with `netstat -ano | grep ":8080.*LISTEN"`)

---

## What was done this session

1. **Set up the whole new-PC environment** — see HANDOVER § 9. All done except git identity.
2. **Connected Netlify** to the repo (done by Matt through the UI).
3. **Rendered the designer's PDF flow** to PNGs at `designer-assets/mockup-pngs/page-{1..6}.png` for visual reference.
4. **Built a new page: `landing.html`** — the minimal "cover" variant the designer showed on page 1 of the PDF. Matt wants this as an ADDITIONAL page, not replacing `index.html`. Uses new CSS classes: `.site-header--minimal`, `.landing-body`, `.landing-hero` (+ `__frame`, `__painting`, `__dim`, `__overlay`, `__cta`, `__signature`). All new CSS is at the bottom of `css/style.css`.
5. **Extracted the Sketch source file** to `designer-assets/sketch-extracted/` and wrote a Node parser at `designer-assets/extract-tokens.mjs` that produces `docs/design-tokens.md` — precise hex codes, typography scale, and per-page layer/text summaries.

### Uncommitted changes (localhost-only, NOT on Netlify yet)
- `landing.html` (new file)
- `css/style.css` (landing-page additions at bottom)
- `docs/design-tokens.md` (generated from Sketch)
- `designer-assets/extract-tokens.mjs` (the parser — lives inside gitignored folder so won't be committed)
- `designer-assets/sketch-extracted/` + `designer-assets/mockup-pngs/` (both inside the gitignored folder)

---

## Key findings from the Sketch file (full detail in `docs/design-tokens.md`)

- **Primary palette:** `#000000` (black), `#FFFFFF` (white), `#121212` (very-dark section bg), `#454545` (mid-grey text), `#D9D9D9` (light-grey), `#E5E5E5` / `#D8D8D8` (light backgrounds). One accent: `#B09F65` (gold/tan, 1× use).
- **Typography:** Montserrat only — **body is 14px** (Regular/Bold/Light), **big headers are 56px UltraLight**, subheadings 20px Light, small captions 12px / 11.1px Light.
- **Artboard sizes:** Home = 1920×1080 (single viewport — cover page). Other pages ~1920×2200–2600 (scrolling content).

Our current CSS is close on typography (`h1: clamp(2rem, 5vw, 3.5rem)` ≈ 56px; body `0.9rem` ≈ 14.4px) but we should lock to exact values from the design tokens when we audit each page.

---

## What Matt said he wants (in priority order)

1. **Audit every page against the designer mockups.** He believes the site is "not right yet" despite the previous Claude marking everything ✅. Work through page by page.
2. Landing page is an **extra page**, not the homepage. He's not sure the minimal version is right for `index.html` itself.
3. The nav on the landing was originally hamburger lines + no unfold animation. Fixed to vertical dots ⋮ + staggered cascade unfold. Scoped via `.site-header--minimal` so existing pages are untouched.
4. Work on localhost (fast), push to Netlify when we want him to view on his phone or show Damon.

### Open decisions from Matt
- **Commit or not yet?** Landing page + CSS + design-tokens.md are uncommitted. He hasn't decided whether to push this batch to Netlify yet or keep iterating more first.
- **What to audit first?** When we left off he was about to choose: homepage vs salon vs walk-all-6-mockups-first vs dictate-specific-problems.

---

## Immediate next actions for next Claude

1. Reload context: read `CLAUDE.md`, `HANDOVER.md`, and this file.
2. Check `docs/design-tokens.md` exists and is populated (if not, re-run: `"C:\Program Files\nodejs\node.exe" designer-assets/extract-tokens.mjs`).
3. Start http-server via `preview_start` with name `lau-hair`.
4. Ask Matt what he wants next — likely: "commit what we have, then audit `index.html` against Sketch page 'Home' (the 1920×1080 cover) and page 'Home' in Main Flow (the 1920×~1700 with SEO content below)."
5. For audits: use the specific artboard sections of `docs/design-tokens.md` for exact colour + typography values. Reference the PNG mockups in `designer-assets/mockup-pngs/` for visual comparison.

### Gotchas carried forward from the HANDOVER
- `preview_screenshot` output is frequently cropped/misleading at desktop widths — **always verify with `preview_inspect` or `preview_eval` DOM measurements** before concluding anything is broken.
- Port 8080 can leak on http-server — kill orphan PIDs if preview_start errors.
- Hours appear in 5 places (footer ×all, visit.html, services.html, salon.html body, Schema.org JSON-LD in index.html) — any hours edit must sync all five.
- Git CRLF warnings on every commit are harmless — don't touch `core.autocrlf`.

---

**Matt is about to restart Claude Code.** When he does: this file, `docs/design-tokens.md`, `landing.html`, and the `designer-assets/` artefacts all persist. The chat history and running http-server will not.
