# Instagram Feed — Implementation Plan

## Two paths, picked by IG account type

When Damon checks `@damon_at_lau` (or whichever handle ends up being used), it'll be one of:

### Path A — Business or Creator account → Instagram Graph API

Free. Native API. Best route.

**Setup steps** (10 mins):
1. Convert IG account to Business/Creator if not already (Settings → Account type)
2. Connect to a Facebook Page (Damon may need to create one — required by Meta)
3. Go to https://developers.facebook.com/apps → Create App → "Business" type
4. Add the **Instagram Graph API** product
5. Get a long-lived access token (60 days, auto-refreshable)
6. Send me: the **token** + the **Instagram Business Account ID**

I build a Netlify Function that:
- Pulls latest 50 posts on a 1-hour cache
- Cross-references with the Google Sheet for `featured_on_home`, `service_tag`, `look_tag`
- Returns curated/tagged JSON to the front-end

### Path B — Personal account → Elfsight (or alternative widget)

If Damon doesn't want to convert to Business — Personal accounts can't access the Graph API.

**Options ranked:**

1. **Elfsight Instagram Feed** — £6/mo or £36/year — most polished, customisable look
   - https://elfsight.com/instagram-feed-instashow
   - Free tier exists (up to 200 views/month) — fine for testing
   - Drop-in JS embed, can match brand colours

2. **EmbedSocial** — £24/mo — overkill for our needs

3. **Curator.io** — free tier, less customisable

4. **Manual** — Damon picks 8 photos every month, adds to Google Sheet, no live IG pull
   - Free, full control, but boring upkeep

**Recommendation:** Elfsight free tier to start, upgrade if traffic warrants.

## Hybrid approach (what I'll actually build)

Even on Path A, I'll keep the Google Sheet as the **source of truth** for which posts are featured/tagged. The IG API just provides the underlying images and metadata — the sheet decides what's shown where.

This means:
- If the IG API breaks, the site still works (uses last-cached + sheet data)
- If you need to hide a post fast, just flip `hide=Y` in the sheet — instant
- Tagging is permanent and survives IG account changes

## What I need from you to start building

1. Confirm which IG handle (still pending — `@damon_at_lau` for now)
2. Account type: Business / Creator / Personal
3. If Business/Creator: an access token + Instagram Business Account ID (I'll give exact instructions)
4. If Personal: confirm Elfsight or alternative is OK

No rush — this is a Phase 2 task once mockups land and the home page structure is built.
