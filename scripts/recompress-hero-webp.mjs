/**
 * Recompress large hero WebPs in public/images (quality ~78, effort 6).
 * Run: npm run recompress-hero-images
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES = path.join(__dirname, "..", "public", "images");

const FILES = ["think-background.webp", "creative-background.webp"];

async function main() {
  for (const name of FILES) {
    const inputPath = path.join(IMAGES, name);
    try {
      await fs.access(inputPath);
    } catch {
      console.warn("Skip (missing):", name);
      continue;
    }
    const buf = await fs.readFile(inputPath);
    const before = buf.length;
    const out = await sharp(buf)
      .webp({ quality: 78, effort: 6, smartSubsample: true })
      .toBuffer();
    await fs.writeFile(inputPath, out);
    console.log(
      `OK ${name}: ${(before / 1024).toFixed(1)} KiB → ${(out.length / 1024).toFixed(1)} KiB`,
    );
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
