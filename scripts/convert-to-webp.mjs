/**
 * Converts PNG/JPEG assets under public/ to WebP (quality ~85), then removes originals.
 * Run: npm run optimize-images
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");

const EXTS = /\.(png|jpe?g)$/i;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full);
    else if (EXTS.test(e.name)) await convertOne(full);
  }
}

async function convertOne(inputPath) {
  const dir = path.dirname(inputPath);
  const base = path.basename(inputPath).replace(EXTS, "");
  const outPath = path.join(dir, `${base}.webp`);

  await sharp(inputPath)
    .rotate()
    .webp({
      quality: 86,
      alphaQuality: 100,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(outPath);

  await fs.unlink(inputPath);
  console.log("OK", path.relative(PUBLIC, outPath));
}

await walk(PUBLIC);
console.log("Done. All raster assets in public/ are now WebP.");
