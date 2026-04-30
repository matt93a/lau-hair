# Google Sheet Spec — Instagram Curation & Tagging

This single sheet drives both:
- The **home page** Instagram strip (curated picks)
- The **/our-work** page (filterable Instagram grid)

## Setup

1. Create a new Google Sheet titled **"Lau Hair — Instagram Curation"**
2. Add the columns below to row 1
3. Populate row by row as you tag Instagram posts
4. **File → Share → Publish to web → CSV** so the site can read it

## Columns

| Column | Header | Required | Type | Example | Notes |
|---|---|---|---|---|---|
| A | `instagram_url` | ✅ | URL | `https://www.instagram.com/p/Cabc123/` | Full post URL |
| B | `image_url` | ✅ | URL | `https://...cdn-instagram.com/...jpg` | Direct image URL (right-click image on IG → Copy image address) |
| C | `caption` | ⬜ | text | "Dimensional balayage by Damon" | Optional — overrides IG caption if set |
| D | `featured_on_home` | ✅ | Y/N | `Y` | Y = appears in home Instagram strip |
| E | `service_tag` | ✅ | dropdown | `Balayage` | One of: Balayage / Cuts / Colour Correction / Perming |
| F | `look_tag` | ✅ | dropdown | `Blonde` | One of: Blonde / Brunette / Red / Short / Long / Up-styles |
| G | `hide` | ✅ | Y/N | `N` | Y = hide from /our-work entirely (kill switch) |
| H | `date_added` | ⬜ | date | `2026-04-30` | Optional, for sorting newest-first |
| I | `notes` | ⬜ | text | "Damon's favourite" | Internal notes, not displayed |

## Data validation (set up dropdowns)

In Google Sheets: select column → Data → Data validation → "Dropdown from a list":

- **Column D `featured_on_home`**: `Y, N`
- **Column E `service_tag`**: `Balayage, Cuts, Colour Correction, Perming`
- **Column F `look_tag`**: `Blonde, Brunette, Red, Short, Long, Up-styles`
- **Column G `hide`**: `Y, N`

## Multiple tags on one post

If a post fits multiple service or look categories (e.g. balayage + blonde + long hair), you can either:
- (a) Pick the **strongest** category — single tag per post (simpler)
- (b) Use comma-separated values in the tag column: `Balayage,Cuts` (more flexible, dev handles split)

Recommend (a) for simplicity; switch to (b) later if you find posts being missed by filters.

## How the site reads it

1. Sheet is published as CSV
2. Site fetches the CSV at build time (or on a 1-hour cache)
3. Home: filters where `featured_on_home = Y` AND `hide = N`
4. /our-work: shows all where `hide = N`, filter pills narrow by `service_tag` AND `look_tag`

## Workflow for adding new posts

1. New great client photo → post on Instagram
2. Open the Google Sheet, add a row at the bottom
3. Paste IG URL (column A), copy image URL (column B), tick `Y` for featured if it's a hero post, pick service + look tags
4. Save — site auto-picks up changes within 1 hour (or instantly if I wire up a webhook later)

## When to share the URL with me

Once the sheet exists and you've added 5–10 sample rows so I can build/test against it, share the published CSV URL with me. I'll wire it into the v2 build.

## Optional: split sheets

If you'd rather, we can split into two sheets:
- **Sheet 1 — Instagram Curation** (the spec above)
- **Sheet 2 — Reviews Override** (manually featured Google/Facebook reviews if Google's API isn't pulling specific ones you want)

Decide later.
