/**
 * Derives transparent logo-light.png and logo-dark.png from public/logo.png.
 * Run after replacing the source logo: node scripts/generate-logo-variants.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const SOURCE = path.join(PUBLIC, "logo.png");

const NAVY = { r: 31, g: 52, b: 79 };

function isBlack(r, g, b) {
  return r + g + b < 48;
}

function isWhite(r, g, b) {
  return r > 210 && g > 210 && b > 210;
}

function recolorWhiteToNavy(data, variant) {
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];

    if (isBlack(r, g, b)) {
      out[i + 3] = 0;
      continue;
    }

    if (variant === "dark" && isWhite(r, g, b)) {
      out[i] = NAVY.r;
      out[i + 1] = NAVY.g;
      out[i + 2] = NAVY.b;
    }
  }
  return out;
}

async function writeVariant(name, variant) {
  const { data, info } = await sharp(SOURCE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = recolorWhiteToNavy(data, variant);
  const dest = path.join(PUBLIC, name);

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(dest);

  console.log(`Wrote ${name}`);
}

async function writeFavicons() {
  const iconSize = 976;
  const cropped = await sharp(SOURCE)
    .extract({ left: 0, top: 0, width: iconSize, height: iconSize })
    .toBuffer();

  await sharp(cropped).resize(32, 32).png().toFile(path.join(PUBLIC, "favicon.png"));
  await sharp(cropped)
    .resize(180, 180)
    .png()
    .toFile(path.join(PUBLIC, "apple-touch-icon.png"));

  console.log("Wrote favicon.png and apple-touch-icon.png");
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Missing public/logo.png — add the source logo first.");
    process.exit(1);
  }

  await writeVariant("logo-light.png", "light");
  await writeVariant("logo-dark.png", "dark");
  await writeFavicons();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
