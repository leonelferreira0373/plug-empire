// Resize and re-encode large product images so they're web-suitable.
// Target: max 1600px on the long edge, JPEG q=82 / PNG with palette where safe.

import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGETS = [
  join(__dirname, "..", "public", "products"),
  join(__dirname, "..", "public", "brand"),
];

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 82;

async function optimizeFile(path) {
  const ext = extname(path).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const before = (await stat(path)).size;
  // Skip already-small files (under 350KB) to avoid re-encoding wallet/brand PNGs unnecessarily.
  if (before < 350 * 1024) return { path, before, after: before, skipped: true };

  const img = sharp(path, { failOn: "none" });
  const meta = await img.metadata();
  const long = Math.max(meta.width ?? 0, meta.height ?? 0);

  let pipeline = img;
  if (long > MAX_DIMENSION) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? MAX_DIMENSION : null,
      height: meta.height > meta.width ? MAX_DIMENSION : null,
      withoutEnlargement: true,
    });
  }

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 90 });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const tmp = path + ".tmp";
  await pipeline.toFile(tmp);

  // Replace original with optimized
  const { rename, unlink } = await import("node:fs/promises");
  await unlink(path);
  await rename(tmp, path);

  const after = (await stat(path)).size;
  return { path, before, after, skipped: false };
}

let totalBefore = 0;
let totalAfter = 0;

for (const dir of TARGETS) {
  const files = await readdir(dir);
  for (const f of files) {
    const path = join(dir, f);
    const s = await stat(path);
    if (!s.isFile()) continue;
    const result = await optimizeFile(path);
    if (!result) continue;
    totalBefore += result.before;
    totalAfter += result.after;
    const beforeKB = (result.before / 1024).toFixed(0);
    const afterKB = (result.after / 1024).toFixed(0);
    const tag = result.skipped ? "  skip" : "  ✓";
    console.log(`${tag} ${f.padEnd(28)} ${beforeKB} → ${afterKB} KB`);
  }
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);
console.log(`\nTotal: ${mb(totalBefore)} MB → ${mb(totalAfter)} MB`);
