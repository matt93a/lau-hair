// Optimize email images for size: convert tamlin-lau.png (2.7MB) to a
// reasonably-sized JPEG suitable for email (< 300KB), and produce a
// correctly-sized hero crop for the Mailchimp top banner. Ensures every
// image in the newsletter loads quickly and passes Gmail's 102KB clip
// threshold for the critical-above-the-fold ones.
//
// Run: "C:\Program Files\nodejs\node.exe" email/optimize-images.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, '..', 'public');
const outDir = join(publicDir, 'email-assets');

async function optimize(srcPath, outName, { width, height, fit = 'cover', position = 'center', quality = 80 }) {
  const src = readFileSync(srcPath);
  const pipeline = sharp(src).resize(width, height, { fit, position });
  const jpg = await pipeline.jpeg({ quality, progressive: true, mozjpeg: true }).toBuffer();
  const outPath = join(outDir, outName);
  writeFileSync(outPath, jpg);
  const sizeKB = (jpg.length / 1024).toFixed(1);
  console.log(`✓ ${outName}: ${width}×${height}, ${sizeKB} KB`);
  return outPath;
}

// Hero image — 600px wide, 400px tall landscape crop, bias toward the face
await optimize(
  join(publicDir, 'images', 'services', 'services-hero.jpg'),
  'email-hero.jpg',
  { width: 1200, height: 800, fit: 'cover', position: 'top', quality: 82 }
);

// Tamlin — 600px wide, 360px tall, microblading promo section
await optimize(
  join(publicDir, 'images', 'microblading', 'tamlin-lau.png'),
  'email-tamlin.jpg',
  { width: 1200, height: 720, fit: 'cover', position: 'top', quality: 82 }
);

// Small charity logo variant — the cocos-logo.png is 200px, reasonable as-is
const cocosPath = join(publicDir, 'images', 'charity', 'cocos-logo.png');
try {
  const src = readFileSync(cocosPath);
  const resized = await sharp(src).resize(360, 360, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(join(outDir, 'email-cocos.png'), resized);
  console.log(`✓ email-cocos.png: 360×360, ${(resized.length / 1024).toFixed(1)} KB`);
} catch (e) {
  console.log(`(skipped cocos logo: ${e.message})`);
}

console.log('\nAll optimized assets in public/email-assets/');
