/**
 * Single source of truth for brand, contact, company and navigation data.
 * All factual values (addresses, phone, email, company numbers, brand and
 * accreditation names) are used verbatim across the site.
 */

export interface NavChild {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href?: string; // present when the top-level item is itself a page
  children?: NavChild[];
}

export interface Branch {
  name: string;
  lines: string[];
  postcode: string;
  /** Used for the Google Maps embed query */
  mapQuery: string;
}

export const siteConfig = {
  name: "Northern Renewable Centre",
  shortName: "NRC",
  tagline: "The Home of Greener Energy",
  logo: {
    light: "/logo-light.png",
    dark: "/logo-dark.png",
  },
  strapline: "Accurately, Consistently, Efficiently.",

  phone: "01642 925 666",
  phoneHref: "tel:+441642925666",
  email: "info@northernrenewablecentre.co.uk",
  emailHref: "mailto:info@northernrenewablecentre.co.uk",
  salesEmail: "sales@northernrenewablecentre.co.uk",
  salesEmailHref: "mailto:sales@northernrenewablecentre.co.uk",

  hours: "Mon–Fri 9am–5pm",
  hoursNote: "Showroom & Eco Café open to drop-ins",

  branches: {
    england: {
      name: "English Branch",
      lines: ["39-41 Esplanade", "Redcar"],
      postcode: "TS10 3AG",
      mapQuery: "39-41 Esplanade, Redcar, TS10 3AG",
    },
    scotland: {
      name: "Scottish Branch",
      lines: ["Unit 3 Inchcross Business Park", "Bathgate", "West Lothian"],
      postcode: "EH48 2HR",
      mapQuery: "Inchcross Business Park, Bathgate, West Lothian, EH48 2HR",
    },
  } satisfies Record<string, Branch>,

  socials: {
    facebook: "https://www.facebook.com/",
    x: "https://x.com/NorthernRenewCt",
    xHandle: "@NorthernRenewCt",
    linkedin: "https://www.linkedin.com/",
  },

  company: {
    registration: "Registered in England 13943934",
    regNumber: "13943934",
    vat: "VAT No. 431376019",
    ico: "ICO No. ZB504010",
    registeredAddress: "39-41 Esplanade, Redcar, TS10 3AG",
  },

  trustpilotUrl: "https://www.trustpilot.com/",

  /** Reliable brands we install (logo strip). Logos in /public/images/brands. */
  brands: [
    { name: "Baxi", logo: "/images/brands/baxi.webp" },
    { name: "Canadian Solar", logo: "/images/brands/canadian-solar.webp" },
    { name: "Clenergy", logo: "/images/brands/clenergy.webp" },
    { name: "Fischer", logo: "/images/brands/fischer.webp" },
    { name: "GivEnergy", logo: "/images/brands/givenergy.webp" },
    { name: "Grant", logo: "/images/brands/grant.webp" },
    { name: "Jinko", logo: "/images/brands/jinko.webp" },
    { name: "Mitsubishi", logo: "/images/brands/mitsubishi.webp" },
    { name: "Mixergy", logo: "/images/brands/mixergy.webp" },
    { name: "MyEnergi", logo: "/images/brands/myenergi.webp" },
    { name: "Renusol", logo: "/images/brands/renusol.webp" },
    { name: "Samsung", logo: "/images/brands/samsung.webp" },
    { name: "SolaX", logo: "/images/brands/solax.webp" },
    { name: "Solis", logo: "/images/brands/solis.webp" },
    { name: "Tesla", logo: "/images/brands/tesla.webp" },
    { name: "Vaillant", logo: "/images/brands/vaillant.webp" },
    { name: "Viridian", logo: "/images/brands/viridian.webp" },
    { name: "Worcester Bosch", logo: "/images/brands/worcester-bosch.webp" },
    { name: "Zappi", logo: "/images/brands/zappi.webp" },
  ],

  /** Official accreditation marks. Artwork is the client's own, taken from
   *  their live site, so these are licensed for us to display. */
  accreditations: [
    { name: "MCS Certified", logo: "/images/accreditations/mcs.webp" },
    { name: "TrustMark", logo: "/images/accreditations/trustmark.webp" },
    { name: "NAPIT", logo: "/images/accreditations/napit.webp" },
    { name: "Gas Safe", logo: "/images/accreditations/gas-safe.webp" },
    { name: "F-Gas", logo: "/images/accreditations/f-gas.webp" },
    { name: "Checkatrade", logo: "/images/accreditations/checkatrade.webp" },
    { name: "Octopus", logo: "/images/accreditations/octopus.webp" },
  ] satisfies { name: string; logo: string }[],

  partnerBadges: ["Energy Ombudsman", "Optiburner, Authorised Reseller"],

  nav: [
    {
      label: "Solar",
      children: [
        { label: "Solar PV", href: "/solar-pv" },
        { label: "Solar Tracking", href: "/solar-pv/solar-tracking" },
      ],
    },
    {
      label: "Air Source Heat",
      children: [
        { label: "Air Source Heat Pumps", href: "/air-source-heat-pumps" },
        {
          label: "Air Source Hot Water Cylinders",
          href: "/air-source-hot-water-cylinders",
        },
        {
          label: "Air Source Heat Pump Service",
          href: "/air-source-heat-pumps/service",
        },
      ],
    },
    {
      label: "Battery Storage",
      href: "/battery-storage",
      children: [
        { label: "Tesla Powerwall", href: "/battery-storage/tesla-powerwall" },
      ],
    },
    {
      label: "Other Services",
      href: "/other-services",
      children: [
        { label: "Commercial Heating", href: "/commercial-heating" },
        { label: "EV Chargers", href: "/ev-chargers" },
        { label: "Infrared Radiators", href: "/infrared-radiators" },
      ],
    },
    {
      label: "More Info",
      children: [
        { label: "Spread the Cost", href: "/spread-the-cost" },
        { label: "ECO4 Grants", href: "/eco4-grants" },
        { label: "Residential Case Studies", href: "/residential-case-studies" },
        { label: "Commercial Case Studies", href: "/commercial-case-studies" },
        { label: "Visit the Centre", href: "/visit-the-centre" },
        { label: "FAQs", href: "/faqs" },
      ],
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ] satisfies NavGroup[],

  /** Footer "More Information" column */
  footerInfoLinks: [
    { label: "Visit the Centre", href: "/visit-the-centre" },
    { label: "ECO4 Grants", href: "/eco4-grants" },
    { label: "FAQs", href: "/faqs" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Modern Slavery & Human Trafficking", href: "/modern-slavery" },
  ] satisfies NavChild[],
} as const;

export type SiteConfig = typeof siteConfig;
