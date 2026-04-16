// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Static site output — Netlify serves the `dist/` folder
  output: 'static',

  // Site URL (used for canonical tags, sitemap, etc.)
  site: 'https://lau-hair.com',

  // Trailing slash behavior: the legacy HTML site uses no trailing slash
  // (e.g. /salon.html not /salon/). Astro default emits pretty URLs like
  // /salon/index.html — we want to keep parity so Netlify rewrites and
  // external links still work.
  build: {
    format: 'file'
  },

  // Scope CSS by default but allow our global stylesheet through. The
  // existing css/style.css is imported in the base layout.
  scopedStyleStrategy: 'class'
});
