// One-off: rasterize public/images/logo-black.svg → public/email-assets/logo-black.png
// Run: "C:\Program Files\nodejs\node.exe" email/rasterize-logo.mjs
//
// Why: most email clients (Outlook 2007-2019, Gmail on mobile, Yahoo, etc.) strip
// SVG images. PNG is the safe universal format for email logos. Rendering at 3×
// retina density so the logo still looks crisp when scaled down to its 140px
// display width in the email.
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const svgPath = join(here, '..', 'public', 'images', 'logo-black.svg');
const outPath = join(here, '..', 'public', 'email-assets', 'logo-black.png');

// Replace the display-p3 colour notation (not recognized by librsvg via Sharp)
// with plain hex black. Also add an explicit fill on the inner <g> in case
// the source relies on cascading.
const raw = readFileSync(svgPath, 'utf-8');
const svgFixed = raw
  .replace(/fill="color\(display-p3[^"]+"/g, 'fill="#000000"')
  .replace(/fill="currentColor"/g, 'fill="#000000"');

const svg = Buffer.from(svgFixed, 'utf-8');

// Source SVG is 150×65. Render at 3× for retina crispness.
const scale = 3;
const png = await sharp(svg, { density: 72 * scale })
  .resize(150 * scale, 65 * scale)
  .png()
  .toBuffer();

writeFileSync(outPath, png);
console.log(`✓ Wrote ${outPath} (${png.length} bytes, ${150 * scale}×${65 * scale})`);
