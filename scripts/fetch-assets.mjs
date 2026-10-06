/**
 * fetch-assets.mjs — downloads royalty-free media into /public.
 *
 *  • Images  → Pexels photo CDN. Every ID below was visually verified to show
 *    the correct, on-brand subject (the earlier Unsplash IDs were wrong and
 *    duplicated — a coffee scoop stood in for a battery, etc).
 *  • Videos  → Pexels video CDN (kept for optional use; the homepage hero is
 *    now an image carousel, so these are not required by the UI).
 *
 * Robustness:
 *  • Follows redirects, sends a browser UA.
 *  • Skips anything over its size cap.
 *  • NEVER throws to the top level — a failed download is logged and skipped.
 *    Missing files are handled at runtime by <SmartImage>/<SmartVideo>, which
 *    fall back to an on-brand navy→green gradient, so the site always builds
 *    and looks complete.
 *
 * Re-run any time with:  npm run fetch-assets
 */

import fs from "node:fs";
import path from "node:path";

const PUBLIC = path.resolve(process.cwd(), "public");
const IMG_CAP = 3 * 1024 * 1024; // 3 MB
const VID_CAP = 8 * 1024 * 1024; // 8 MB

/** Pexels CDN URL helper (numeric photo id). */
const px = (id, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/**
 * One entry per UNIQUE image file. lib/assets.ts maps many semantic keys onto
 * these files; the content layer keeps same-file keys off any single page.
 */
const IMAGES = {
  // Hero carousel + key exteriors (larger)
  "images/home-dusk.jpg": px(4626268, 1920),
  "images/solar-roof-vista.jpg": px(9875423, 1920),
  "images/heat-pump-house.jpg": px(20046693, 1920),
  "images/ev-green.jpg": px(18450890, 1920),
  "images/solar-aerial-commercial.jpg": px(29923348, 1920),
  "images/home-lawn.jpg": px(7587880, 1920),
  "images/home-drive.jpg": px(8134821, 1920),

  // Solar
  "images/solar-roof-close.jpg": px(9875413),
  "images/solar-flat-roof.jpg": px(9799994),
  "images/solar-house-hill.jpg": px(12243093),
  "images/solar-roof-worker.jpg": px(35237908),
  "images/solar-roof-grid.jpg": px(8312917),
  "images/solar-farm.jpg": px(356049),
  "images/solar-farm-aerial.jpg": px(7527908),

  // Installers / people at work
  "images/installer-action.jpg": px(8853502),
  "images/installers-red-roof.jpg": px(14613939),
  "images/installer-carry.jpg": px(9875419),
  "images/technicians-team.jpg": px(8853536),
  "images/inspect-panel.jpg": px(9875415),

  // Heat pumps
  "images/heat-pump-wall.jpg": px(20046692),
  "images/heat-pump-white.jpg": px(24828656),
  "images/heat-pump-round.jpg": px(16848596),

  // Hot water / utility
  "images/utility-room.jpg": px(19980200),
  "images/wall-heater.jpg": px(8142983),

  // EV charging
  "images/ev-home-charge.jpg": px(27355820),
  "images/ev-bay.jpg": px(9800006),
  "images/ev-public.jpg": px(4699781),
  "images/ev-stations.jpg": px(9800029),

  // Interiors
  "images/living-bright.jpg": px(6186813),
  "images/living-open.jpg": px(5179534),
  "images/living-dining.jpg": px(4857757),
  "images/living-blue.jpg": px(8583697),
  "images/living-cottage.jpg": px(4906249),

  // Battery storage
  "images/battery-stack.jpg": px(37929911),
  "images/battery-wall.jpg": px(33438229),

  // Wind / eco landscape
  "images/turbines-field.jpg": px(12733229),
  "images/turbines-solar.jpg": px(9800094),

  // People / family / finance
  "images/couple-home.jpg": px(7579045),
  "images/family-home.jpg": px(7577378),
  "images/family-new.jpg": px(7642220),
  "images/couple-green.jpg": px(1170686),
};

const VIDEOS = {
  "videos/hero.mp4":
    "https://videos.pexels.com/video-files/2169880/2169880-sd_640_360_30fps.mp4",
  "videos/solar.mp4":
    "https://videos.pexels.com/video-files/2098989/2098989-sd_640_360_30fps.mp4",
  "videos/heat-pump.mp4":
    "https://videos.pexels.com/video-files/3015510/3015510-hd_1280_720_24fps.mp4",
  "videos/ev-charging.mp4":
    "https://videos.pexels.com/video-files/3129957/3129957-sd_640_360_25fps.mp4",
  "videos/house.mp4":
    "https://videos.pexels.com/video-files/3015510/3015510-hd_1280_720_24fps.mp4",
};

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
  Referer: "https://www.pexels.com/",
  Accept: "image/*,video/*,*/*",
};

function ensureDir(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

async function download(rel, url, cap) {
  const dest = path.join(PUBLIC, rel);
  ensureDir(dest);
  try {
    const res = await fetch(url, { redirect: "follow", headers: HEADERS });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const len = Number(res.headers.get("content-length") || 0);
    if (cap && len && len > cap) throw new Error(`too large (${(len / 1048576).toFixed(1)}MB)`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (cap && buf.length > cap) throw new Error(`too large (${(buf.length / 1048576).toFixed(1)}MB)`);
    fs.writeFileSync(dest, buf);
    return { rel, ok: true, kb: Math.round(buf.length / 1024) };
  } catch (err) {
    return { rel, ok: false, reason: err.message };
  }
}

async function pool(entries, cap, concurrency = 6) {
  const items = Object.entries(entries);
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      const [rel, url] = items[idx];
      const r = await download(rel, url, cap);
      results.push(r);
      const tag = r.ok ? `  ok  ${String(r.kb).padStart(5)} KB` : `SKIP        ${r.reason}`;
      console.log(`  ${tag}  ${rel}`);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

/* On-brand favicon (leaf-house mark) + brand/accreditation READMEs */
function writeStaticExtras() {
  fs.mkdirSync(PUBLIC, { recursive: true });
  const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#1f344f"/>
  <path d="M32 14 L50 30 V50 H14 V30 Z" fill="none" stroke="#629c35" stroke-width="4" stroke-linejoin="round"/>
  <path d="M32 40c-6-2-9-7-9-12 5 0 9 3 9 8 0-5 4-8 9-8 0 5-3 10-9 12z" fill="#629c35"/>
</svg>`;
  fs.writeFileSync(path.join(PUBLIC, "favicon.svg"), favicon);

  const brandsReadme = `Reliable Brand Logos
====================

The real brand logos (<brand-slug>.webp) are committed here, sourced from the
client's live site (northernrenewablecentre.co.uk). They are NOT downloaded by
this script — it only writes this README, so the committed logos are safe.

Each logo is mapped in lib/siteConfig.ts as { name, logo: "/images/brands/<slug>.webp" }
and rendered (logo image, brand name as alt/fallback) by BrandsMarquee and the
"Trusted brands we install" strip in ServicePageTemplate.

To add/replace a brand: drop <brand-slug>.webp here and add it to siteConfig.brands.
`;
  const accReadme = `Accreditation Badges
====================

These are real accreditation marks (MCS, Gas Safe, TrustMark, etc.) and are not
shipped with this project. The site renders text/badge placeholders instead.

To use the official badges you are authorised to display:
  1. Drop each badge here as: <accreditation-slug>.svg (or .png)
     e.g. mcs.svg, gas-safe.svg, trustmark.svg
  2. The Accreditations component will use the image when present.
`;
  fs.mkdirSync(path.join(PUBLIC, "images/brands"), { recursive: true });
  fs.mkdirSync(path.join(PUBLIC, "images/accreditations"), { recursive: true });
  fs.writeFileSync(path.join(PUBLIC, "images/brands/README.txt"), brandsReadme);
  fs.writeFileSync(path.join(PUBLIC, "images/accreditations/README.txt"), accReadme);
}

async function main() {
  console.log("\nNorthern Renewable Centre — asset fetch\n");
  writeStaticExtras();
  console.log("Images:");
  const imgRes = await pool(IMAGES, IMG_CAP);
  console.log("\nVideos:");
  const vidRes = await pool(VIDEOS, VID_CAP);

  const all = [...imgRes, ...vidRes];
  const ok = all.filter((r) => r.ok).length;
  const skipped = all.length - ok;
  console.log(
    `\nDone. ${ok}/${all.length} downloaded, ${skipped} skipped (runtime gradient fallback will cover any gaps).\n`,
  );
}

main().catch((e) => {
  console.error("Asset fetch encountered an error but did not crash the build:", e.message);
  process.exit(0);
});
