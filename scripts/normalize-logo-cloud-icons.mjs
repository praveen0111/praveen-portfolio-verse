/**
 * Normalizes tech stack logos to a fixed 512×512 canvas (contain, transparent).
 * Run from repo root: node scripts/normalize-logo-cloud-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const inputDir = path.join(root, "public", "logo-cloud");
const outputDir = path.join(root, "public", "logo-cloud", "icons");
const SIZE = 512;

/** [slug, sourceFilename] — same order as thinkTechstackIconSlugs */
const entries = [
  ["canva", "canva-source.png"],
  ["figma", "figma.png"],
  ["premierepro", "premiere-pro.png"],
  ["aftereffects", "after-effects.png"],
  ["photoshop", "photoshop.png"],
  ["xd", "xd.png"],
  ["illustrator", "illustrator-source.svg"],
  ["powerpoint", "icons8-powerpoint-512.png"],
  ["excel", "excel.png"],
  ["clickup", "icons8-clickup-512.png"],
  ["python", "icons8-python-512.png"],
  ["higgsfield", "higgsfield_ai-logo-brandlogos.net-c221a.png"],
  ["powerbi", "icons8-power-bi-2021-512.png"],
  ["davinciresolve", "icons8-davinci-resolve-512.png"],
  ["cursor", "icons8-cursor-ai-512.png"],
  ["github", "icons8-github-512.png"],
  ["vscode", "icons8-visual-studio-code-512.png"],
];

fs.mkdirSync(outputDir, { recursive: true });

for (const [slug, filename] of entries) {
  const inputPath = path.join(inputDir, filename);
  const outPath = path.join(outputDir, `${slug}.png`);
  if (!fs.existsSync(inputPath)) {
    console.error(`Missing: ${inputPath}`);
    process.exit(1);
  }
  await sharp(inputPath)
    .resize(SIZE, SIZE, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(outPath);
  console.log(`Wrote ${path.relative(root, outPath)}`);

  const svgPath = path.join(outputDir, `${slug}.svg`);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" role="img" aria-hidden="true">
  <image href="${slug}.png" width="${SIZE}" height="${SIZE}" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  fs.writeFileSync(svgPath, svg, "utf8");
  console.log(`Wrote ${path.relative(root, svgPath)}`);
}

console.log("Done. Uniform 512×512 PNG + SVG wrappers (SVG references sibling PNG).");
