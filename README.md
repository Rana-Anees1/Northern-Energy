# Northern Renewable Centre — Website

A polished, multi-page marketing website for **Northern Renewable Centre** — a UK
domestic & commercial renewable-energy installer (Solar PV, heat pumps, battery
storage, EV chargers, infrared heating).

> **The Home of Greener Energy** — _Accurately, Consistently, Efficiently._

Built with **Next.js (App Router) + TypeScript**, **Tailwind CSS**,
**Framer Motion**, **Lenis** (momentum smooth-scroll), **Embla Carousel** and
**lucide-react**. All motion respects `prefers-reduced-motion`.

---

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start the dev server → http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

Assets are downloaded into `/public` ahead of time; if you ever need to refresh
them:

```bash
npm run fetch-assets
```

---

## How it's organised

```
app/                      App Router routes (one folder per page)
  layout.tsx              Root layout: fonts, providers, chrome (navbar/footer)
  page.tsx                Home page — sections in the exact reference order
  contact/ faqs/ ...      Every route in the site map
components/
  ui/                     Design-system primitives (Button, Section, Media…)
  chrome/                 TopUtilityBar, Navbar, Footer, BackToTop, CookieBar
  home/                   Home-page sections (Hero, ProductGrid, …)
  templates/              ServicePageTemplate (drives every service/info page)
  modals/ providers/      Enquiry modal + its context provider
lib/
  siteConfig.ts           Brand, contact, branches, company reg, nav tree,
                          brand & accreditation lists  (FACTUAL data)
  content.ts              All page copy + structured content (products, FAQs,
                          case studies, blog, service-page content)
  assets.ts               Asset path map (images + videos)
  motion.ts  cn.ts        Shared animation variants + classname helper
scripts/
  fetch-assets.mjs        Downloads royalty-free media into /public
public/
  images/ videos/         Downloaded media
  images/brands/          Drop licensed brand logos here (see README.txt)
  images/accreditations/  Drop licensed accreditation badges here
```

### Where to edit content

- **Facts** (addresses, phone, email, company numbers, nav, brand list) →
  [`lib/siteConfig.ts`](lib/siteConfig.ts)
- **Marketing copy & page content** (product descriptions, service pages, FAQs,
  case studies, blog posts) → [`lib/content.ts`](lib/content.ts)
- **Colours & fonts** → CSS variables in [`app/globals.css`](app/globals.css) and
  the matching tokens in [`tailwind.config.ts`](tailwind.config.ts)

The owner's final copy can be pasted directly into `lib/content.ts` — nothing in
the components hard-codes prose.

---

## Brand & accreditation logos

These are real third-party trademarks, so **no logo files are shipped**. The site
renders clean **text wordmarks** as on-brand placeholders.

To use the logos you are entitled to display, drop image files into
`public/images/brands/` and `public/images/accreditations/` (see the `README.txt`
in each folder for naming). The brand/accreditation components are written to use
an image when one is present and fall back to the text wordmark otherwise.

---

## Media & graceful degradation

`scripts/fetch-assets.mjs` downloads royalty-free imagery (Unsplash / Pexels) and a
few short looping videos (Pexels) into `/public`. Every image and video is rendered
through `SmartImage` / `SmartVideo`, which fall back to an on-brand **navy → green
gradient** if a file is missing or fails to load — so the site always builds and
always looks complete, even with no network access.

---

## Wiring the enquiry form to a real endpoint

The enquiry modal ([`components/modals/EnquiryModal.tsx`](components/modals/EnquiryModal.tsx))
is fully client-side with validation and a success state — it does **not** post
anywhere yet. To connect it to a real backend, replace the body of `handleSubmit`:

```ts
const handleSubmit = async () => {
  if (!validate()) return;
  await fetch("/api/enquiry", {            // or Formspree / HubSpot / your CRM
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  setSubmitted(true);
};
```

Then add a route handler at `app/api/enquiry/route.ts` (or point it at a hosted
form service). Enquiry-type options live in `lib/content.ts` (`enquiryOptions`).

---

## Colour palette

| Token | Hex | Use |
|---|---|---|
| `navy` | `#1f344f` | Dark sections, headings, footer |
| `navy-deep` | `#1a304b` | Gradients / overlays |
| `green` | `#629c35` | Buttons, links, icons, accents |
| `green-dark` | `#5c982d` | Button hover |
| `surface` | `#f8f8f8` | Alternating light sections |
| `ink` | `#2b3440` | Body text |
| `muted` | `#6b7785` | Secondary text |

All primary calls-to-action are solid **green**.
