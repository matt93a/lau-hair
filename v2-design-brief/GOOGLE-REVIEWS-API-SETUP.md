# Google Reviews API — Setup Steps

## What you need to do (one-time, ~10 mins)

### 1. Enable the Places API in Google Cloud

1. Go to https://console.cloud.google.com/
2. Sign in with your Google account (the one tied to lau-hair.com if possible, otherwise yours)
3. Top bar → **Select a project** → **New Project** → name it "Lau Hair Site" → Create
4. With "Lau Hair Site" selected, search the top search bar for **"Places API (New)"** and click it
5. Click **Enable**
6. Same again for **"Places API"** (the legacy one — needed for some review fields). Enable.

### 2. Get an API key

1. Left sidebar → **APIs & Services** → **Credentials**
2. **+ Create Credentials** → **API key**
3. Copy the key (starts with `AIza...`)
4. Click the key to edit it
5. Under **Application restrictions** → **HTTP referrers** → add:
   - `https://lau-hair.com/*`
   - `https://*.lau-hair.com/*`
   - `https://*.netlify.app/*` (for previews)
   - `http://localhost:*/*` (for local dev)
6. Under **API restrictions** → **Restrict key** → tick:
   - Places API
   - Places API (New)
7. Save

### 3. Send me the key

Paste the API key in chat. I'll wire it into the build.

**Security note:** The key will be visible in the site source if used client-side. The HTTP-referrer restriction means even if someone copies it, they can only use it from your domains. Spend cap recommended below.

### 4. Set a spend cap (so you don't get a surprise bill)

1. Cloud Console → **Billing** → **Budgets & alerts**
2. Create budget → £10/month → email alert at 50% / 90% / 100%
3. Reviews API calls are ~£0.017 each. £10 = 588 calls. We'll cache responses so a typical month is under £1.

## What I'll build with it

A serverless function (Netlify Function) that:
- Fetches Google reviews for CID `11278767179397682494` (Lau Hairdressing)
- Caches the response for 6 hours
- Returns JSON to the front-end
- Falls back gracefully if the API errors (shows cached version or a placeholder)

This avoids exposing the API key client-side and stops you hitting the rate limit.

## Code preview (what'll go in the build)

```js
// netlify/functions/google-reviews.js
const PLACES_URL = 'https://places.googleapis.com/v1/places/places/ChIJ...';
const CID = '11278767179397682494';

let cache = { data: null, ts: 0 };
const CACHE_MS = 6 * 60 * 60 * 1000; // 6 hours

exports.handler = async () => {
  if (cache.data && Date.now() - cache.ts < CACHE_MS) {
    return { statusCode: 200, body: JSON.stringify(cache.data) };
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?cid=${CID}&fields=reviews,rating,user_ratings_total&key=${process.env.GOOGLE_PLACES_KEY}`;
  const r = await fetch(url);
  const json = await r.json();

  cache = { data: json.result, ts: Date.now() };
  return { statusCode: 200, body: JSON.stringify(json.result) };
};
```

API key goes in Netlify env vars (Settings → Environment variables → `GOOGLE_PLACES_KEY`), never committed.

## Facebook Reviews

Facebook has locked down the Pages API since ~2021. Practical options:

1. **Manual curation** — paste the best Facebook reviews into the Google Sheet alongside the Instagram tagging (extra column `source: facebook`). Site renders them with the FB logo. Simplest, free, works forever.
2. **Elfsight Facebook Reviews widget** — embedded widget, ~£6/mo, auto-pulls. Hands-off but ongoing cost + iframe (less control over styling).

Recommend (1) unless Damon objects to the manual step.
