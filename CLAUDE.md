# Northern Renewable Centre — site

Marketing site for **Northern Renewable Centre** ("The Home of Greener Energy") — a UK
renewable-energy installer & showroom with branches in **Redcar** (Esplanade) and
**Bathgate, Scotland** (Inchcross Business Park). Products: Solar PV, Battery Storage,
Air Source Heat Pumps, Hot Water Cylinders, EV Chargers, Infrared Radiators, Commercial
Heating, plus ECO4 grants and finance.

Stack: **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind · Framer Motion ·
Embla carousel · Lenis**. Path alias `@/*` → repo root.

## Commands

```bash
npm run dev              # local dev server
npm run build            # production build (run before claiming done)
npm run lint             # next lint
npm run fetch-assets     # (re)download STOCK media into /public via Pexels — see below
```

## Architecture — content & assets are data, not JSX

Editing copy or imagery almost never means touching components. Two files drive everything:

- **`lib/content.ts`** — ALL page copy + structure as typed data: `heroSlides`, `introStatement`,
  the product grid, and `servicePages` (a `Record<route, ServicePage>`). Every service/landing
  page is data in here.
- **`lib/assets.ts`** — the single source of truth mapping semantic **image/video keys → `/public` paths**.
  Nothing else hardcodes an `/images/...` path. Many keys are deliberate **aliases** onto the same
  file; the content layer is arranged so **no two keys that resolve to the same file appear on one page**.
  Keep that invariant when choosing media.

Media flows through one stack:

```
content.ts  img("key", alt) / vid("key", posterKey, alt)  →  MediaRef
            │
ServicePageTemplate / Hero / *Gallery  →  <Media>  →  <SmartImage> (plain <img>) | <SmartVideo>
```

- `img()` / `vid()` helpers (`lib/content.ts`) build a `MediaRef` from an `ImageKey`/`VideoKey`.
- `components/ui/Media.tsx` renders a `MediaRef` as image or autoplaying muted-loop background video.
- `SmartImage` / `SmartVideo` degrade gracefully: a failed load swaps to an on-brand navy→green
  gradient (`BRAND_GRADIENT`), so the layout never shows a broken image. **`next/image` is only used
  for the logo** — everything else is plain `<img>` (no remote image domains configured).
- `next.config.mjs` has **no `remotePatterns`** — all media is local in `/public`.

Most service/landing pages render via **`components/templates/ServicePageTemplate.tsx`** (banner →
intro split → alternating feature blocks → optional showroom gallery → optional video → brands →
accreditations → CTA → related teasers). A page is usually just:

```tsx
export default function Page() {
  return <ServicePageTemplate page={servicePages["/route"]} />;
}
```

Carousels use **Embla** (`embla-carousel-react` + `embla-carousel-autoplay`). Reference impls:
`components/home/Hero.tsx` (crossfade hero), `components/home/BlogCarousel.tsx`,
`components/case-studies/CaseStudyGallery.tsx`, `components/templates/ShowroomGallery.tsx`.

## Image/video asset pipeline

Two kinds of media live in `/public`, both git-tracked:

1. **Stock media** — downloaded by `scripts/fetch-assets.mjs` from **Pexels** (verified, on-subject
   photo IDs). Filenames are `kebab-case.jpg` / `.mp4`. The script only ever fetches the keys listed
   in its own `IMAGES`/`VIDEOS` maps; it never deletes or touches anything else.
2. **Real client photos** — committed directly, NOT in the fetch script. These take precedence over
   stock whenever a real photo exists for a slot.

**⚠️ Never trust an image by its label or key name — verify the actual pixels.** A prior pass shipped
wrong/duplicated stock (a coffee scoop standing in for a battery, one laptop photo reused 5×). Before
wiring any image, look at it (Read the file, or build an ffmpeg contact sheet). See the
`image-sourcing-pexels-pipeline` memory for the Pexels+ffmpeg sourcing/verification recipe.

### Adding real client photos (e.g. the showroom set)

Raw client uploads live in `public/picturesfromourshowroom/` (and similar). They are often **phone
screenshots with black letterbox bars** and are **portrait**. To turn them into web assets:

1. **Detect black bars** with ffmpeg cropdetect (a single still needs a looped input):
   ```bash
   ffmpeg -hide_banner -loop 1 -i in.JPG -vf cropdetect=limit=24:round=2 -frames:v 4 -f null - 2>&1 \
     | grep -o 'crop=[0-9:]*' | tail -1      # -> crop=W:H:X:Y
   ```
2. **Crop + resize + encode** into `public/images/showroom-*.jpg` (kebab-case, `showroom-` prefix):
   ```bash
   ffmpeg -y -i in.JPG -vf "crop=W:H:X:Y,scale=1280:-2:flags=lanczos" -q:v 3 public/images/showroom-x.jpg
   ```
   Hero stills get a larger target (~1500px wide). Photos with no bars skip the crop.
3. Add `showroomX: "/images/showroom-x.jpg"` keys under the **Showroom** group in `lib/assets.ts`.
4. Reference via `img("showroomX", "alt")` in `lib/content.ts`. **Do NOT add these to fetch-assets.mjs**
   (there's no remote URL — a run would try to download them and fail).
5. **Verify**: rebuild an ffmpeg tile contact sheet of the _processed_ files and Read it.

Gallery tiles for the (portrait) showroom photos use `aspect-[3/4]`; landscape-ish shots
(interior aisle, reception, the Redwell display) sit in `4/3` banner/feature/intro slots so
`object-cover` doesn't over-crop them.

### ffmpeg gotchas on this machine (no ImageMagick / no drawtext / no montage)

- Contact sheet: scale+crop each image to a numbered `/tmp/sr_%03d.png`, add a black filler for the
  last cell, then `-i /tmp/sr_%03d.png -vf tile=NxM -frames:v 1 sheet.png`. Map cells by sorted filename.
- `cropdetect` emits nothing for a single frame — loop the input (`-loop 1 ... -frames:v 4`).
- zsh: `for f in $var` does NOT word-split; use `$(ls ...)`/`${=var}`/literal lists. `rm /glob` aborts
  an `&&` chain when the glob is empty.

## Conventions

- Brand colours via Tailwind tokens: `navy`, `green`, `green-dark`, `ink`, `muted`, surfaces.
  `BRAND_GRADIENT` (navy→green) is the universal media fallback.
- Animations respect `prefers-reduced-motion` everywhere (`useReducedMotion`) — keep that when adding motion.
- The green **turtle mascot** appears in most real showroom photos — it's the brand mascot, keep it.
- Run `npm run build` (or at least `npm run lint`) before claiming a change is done.

## Client requests log

- **2026-06-11** — Client: make the homepage **opening/hero photo the real showroom**, and
  feature **showroom pictures + a video** on `/visit-the-centre` (mirroring the live
  northernrenewablecentre.co.uk/visit-the-centre/). Showroom photos supplied in
  `public/picturesfromourshowroom/`; **showroom video pending** ("going to send you some videos").
  `efc5c43d-*.JPG` in that folder is a marketing flyer, not a showroom photo — excluded.
- **2026-06-11** — Replace the "Reliable brands" text-name chips with real brand **logos**. 19 logos
  pulled from the live site into `public/images/brands/<slug>.webp`; `siteConfig.brands` is now
  `{ name, logo }[]`, rendered by `BrandsMarquee` (home) and the brands strip in `ServicePageTemplate`.
