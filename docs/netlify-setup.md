# Netlify Deployment Setup

## Connect GitHub repo to Netlify (recommended)

1. Go to https://app.netlify.com and log in
2. Click **Add new site** > **Import an existing project**
3. Choose **GitHub** > authorize Netlify if prompted
4. Select the **matt93a/lau-hair** repository
5. Build settings - leave all defaults:
   - Branch to deploy: `main`
   - Build command: (leave empty)
   - Publish directory: (leave empty - root of repo)
6. Click **Deploy site**

## After first deploy

- You'll get a URL like `random-name.netlify.app`
- Change it: **Site settings** > **Domain management** > **Edit site name**
- Suggested: `lau-hair.netlify.app`

## Custom domain (when ready for production)

1. In Netlify: **Domain management** > **Add custom domain**
2. Enter `lau-hair.com` and `www.lau-hair.com`
3. Update DNS at your registrar to point to Netlify's servers
4. Netlify auto-provisions SSL/HTTPS

## Auto-deploy

Every push to `main` on GitHub triggers an automatic deploy. No manual steps needed.

## Manual deploy (CLI)

```bash
npx netlify deploy --prod --dir .
```
