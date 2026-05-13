// One-shot script: turns white-background brand JPGs into transparent PNGs.
// Strategy: anything close to pure white gets alpha = 0.

import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRAND_DIR = join(__dirname, "..", "public", "brand");

async function knockoutWhite(inputPath, outputPath, threshold = 235) {
  const img = sharp(inputPath).ensureAlpha();
  const { data, info } = await img
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  if (channels !== 4) {
    throw new Error(`Expected 4 channels, got ${channels}`);
  }

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // If pixel is near-white, drop alpha. Smooth edges with a soft band.
    const minRGB = Math.min(r, g, b);
    if (minRGB >= threshold) {
      data[i + 3] = 0;
    } else if (minRGB >= threshold - 20) {
      // soft band: scale alpha from 255 down to 0 linearly
      const t = (minRGB - (threshold - 20)) / 20;
      data[i + 3] = Math.round(255 * (1 - t));
    }
  }

  await sharp(data, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9, palette: false })
    .toFile(outputPath);
}

const jobs = [
  ["bee.jpg", "bee.png"],
  ["stravages-wordmark.jpg", "stravages-wordmark.png"],
];

for (const [src, dst] of jobs) {
  const inPath = join(BRAND_DIR, src);
  const outPath = join(BRAND_DIR, dst);
  await knockoutWhite(inPath, outPath, 240);
  console.log(`✓ ${src} → ${dst}`);
}

console.log("Done.");
