Reliable Brand Logos
====================

The real brand logos (<brand-slug>.webp) are committed here, sourced from the
client's live site (northernrenewablecentre.co.uk). They are NOT downloaded by
scripts/fetch-assets.mjs — it only writes this README, so the committed logos
are safe.

Each logo is mapped in lib/siteConfig.ts as { name, logo: "/images/brands/<slug>.webp" }
and rendered (logo image, brand name as alt/fallback) by BrandsMarquee and the
"Trusted brands we install" strip in ServicePageTemplate.

To add/replace a brand: drop <brand-slug>.webp here and add it to siteConfig.brands.
