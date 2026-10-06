/**
 * All page copy and structured content lives here so the marketing voice,
 * facts and routes are edited in one place. Copy is original prose written in
 * a friendly, trustworthy UK installer voice around the supplied facts.
 *
 * Media note: every image key resolves through lib/assets.ts. Keys are chosen
 * per slot so that no page repeats an image (intro, feature blocks, banner and
 * the related-product teasers at the foot are all visually distinct), and the
 * media side alternates left/right down each page via ServicePageTemplate.
 */

import { images, videos, type ImageKey, type VideoKey } from "@/lib/assets";

/* ------------------------------------------------------------------ */
/* Shared media reference                                              */
/* ------------------------------------------------------------------ */

export type MediaType = "image" | "video";

export interface MediaRef {
  type: MediaType;
  /** Path resolved from lib/assets.ts */
  src: string;
  /** Poster path for videos (and the alt-resolving still for images) */
  poster?: string;
  alt: string;
}

export function img(key: ImageKey, alt: string): MediaRef {
  return { type: "image", src: images[key], alt };
}

export function vid(key: VideoKey, posterKey: ImageKey, alt: string): MediaRef {
  return { type: "video", src: videos[key], poster: images[posterKey], alt };
}

/* ------------------------------------------------------------------ */
/* Home: hero carousel + intro statement                               */
/* ------------------------------------------------------------------ */

/**
 * Auto-advancing hero carousel, 4–5 on-brand stills that tour the product
 * range (a low-energy home, rooftop solar, a heat pump, EV charging and a
 * large rooftop array). Rendered with a clean crossfade + slow Ken-Burns in
 * components/home/Hero.tsx.
 */
export const heroSlides: MediaRef[] = [
  img("showroomExterior", "The Northern Renewable Centre showroom on the Esplanade in Redcar"),
  img("showroomInterior", "Inside the Northern Renewable Centre showroom in Redcar"),
  img("heroSolar", "Rooftop solar panels overlooking the open countryside"),
  img("heroHeat", "An air source heat pump beside a contemporary home"),
  img("heroEv", "An electric car charging beside a leafy green driveway"),
];

export const introStatement = {
  eyebrow: "Northern Renewable Centre",
  text: "We founded Northern Renewable Centre to make greener home energy the obvious choice, bringing clean generation, smart storage and efficient low-carbon heating together under one roof, for new builds and retrofits alike.",
  link: { label: "Our story", href: "/visit-the-centre" },
};

/* ------------------------------------------------------------------ */
/* Product grid (home checkerboard + reused on service pages)          */
/* ------------------------------------------------------------------ */

export interface ProductItem {
  slug: string;
  title: string;
  route: string;
  description: string;
  badges: [string, string, string];
  /** Rendered as a thin full-bleed strip, joined by • dots in the UI */
  specStrip: string[];
  media: MediaRef;
  /** Side the media tile sits on within the home checkerboard */
  mediaSide: "left" | "right";
}

const solarPv: ProductItem = {
  slug: "solar-pv",
  title: "Solar PV",
  route: "/solar-pv",
  description:
    "Turn daylight into low-cost, clean electricity with a solar PV system designed for your roof. No moving parts, no noise and no fuel to buy, just quieter bills for decades, on homes and commercial buildings alike.",
  badges: ["Residential", "Commercial", "Grid-tied"],
  specStrip: ["Lower bills", "MCS-certified install", "25-year panel warranties"],
  media: img("solarPv", "Rooftop solar PV array on a UK home"),
  mediaSide: "left",
};

const batteryStorage: ProductItem = {
  slug: "battery-storage",
  title: "Battery Storage",
  route: "/battery-storage",
  description:
    "Store the solar you generate by day, or cheap off-peak grid energy overnight, and use it whenever you need it. A home battery cuts your reliance on the costly grid and keeps the lights on when it counts.",
  badges: ["Day & night", "Backup", "Off-peak"],
  specStrip: ["Use your own solar after dark", "Blackout protection"],
  media: img("battery", "Home battery storage system and inverter"),
  mediaSide: "right",
};

const heatPumps: ProductItem = {
  slug: "air-source-heat-pumps",
  title: "Air Source Heat Pumps",
  route: "/air-source-heat-pumps",
  description:
    "Heat your home efficiently by harvesting warmth from the outside air, even in the depths of a British winter. A modern air source heat pump replaces an ageing gas or oil boiler and can cool in summer too.",
  badges: ["Heating", "Cooling", "Low-carbon"],
  specStrip: ["£7,500 Boiler Upgrade Scheme grant", "Works with existing radiators"],
  media: img("heatPump", "Air source heat pump outdoor unit mounted on a wall"),
  mediaSide: "left",
};

const evChargers: ProductItem = {
  slug: "ev-chargers",
  title: "EV Chargers",
  route: "/ev-chargers",
  description:
    "From a tidy wall-mounted home charger to large free-standing rapid units for forecourts and fleets, we install charging that fits the way you drive. Smart scheduling tops up your car on the cheapest, greenest power.",
  badges: ["Home", "Commercial", "Smart"],
  specStrip: ["7kW home charging", "Up to rapid DC"],
  media: img("evCharger", "Electric vehicle charging on a home driveway"),
  mediaSide: "right",
};

const infrared: ProductItem = {
  slug: "infrared-radiators",
  title: "Infrared Radiators",
  route: "/infrared-radiators",
  description:
    "Infrared radiators warm people and surfaces directly, the way sunshine does, for a comfortable heat that arrives quickly and lingers. Slim, modern and virtually maintenance-free, they pair beautifully with solar and battery storage.",
  badges: ["Radiant", "Modern", "Low-maintenance"],
  specStrip: ["Comfortable radiant warmth", "No moving parts to service"],
  media: img("infrared", "Bright, comfortable modern living room"),
  mediaSide: "left",
};

const solarTracking: ProductItem = {
  slug: "solar-tracking",
  title: "Solar Tracking",
  route: "/solar-pv/solar-tracking",
  description:
    "Tracking mounts gently rotate your panels to follow the sun across the sky, capturing more energy from first light to dusk. It is the most productive way to make the very most of every panel you install.",
  badges: ["Higher yield", "Automated", "Dual-axis"],
  specStrip: ["Up to ~30% more output vs fixed", "Sunrise-to-sunset generation"],
  media: img("solarTracking", "Ground-mounted solar array following the sun"),
  mediaSide: "right",
};

/** Home grid is split around the green Partner CTA band. */
export const homeProductsTop: ProductItem[] = [solarPv, batteryStorage, heatPumps];
export const homeProductsBottom: ProductItem[] = [evChargers, infrared, solarTracking];
export const allProducts: ProductItem[] = [...homeProductsTop, ...homeProductsBottom];

/* ------------------------------------------------------------------ */
/* Product range intro                                                 */
/* ------------------------------------------------------------------ */

export const productRangeIntro = {
  // "Exclusive Range" is highlighted green in the UI
  headingLead: "An",
  headingHighlight: "Exclusive Range",
  headingTail: "of Solutions",
  body: "Every system we fit is engineered to a high standard, then tailored to your home, modular building blocks that you can start with today and grow into a complete, self-sufficient setup tomorrow.",
};

/* ------------------------------------------------------------------ */
/* Benefits (home, 4-up)                                               */
/* ------------------------------------------------------------------ */

export interface Benefit {
  icon: string; // lucide-react icon name
  title: string;
  body: string;
}

export const benefits: Benefit[] = [
  {
    icon: "PiggyBank",
    title: "Lower your household energy costs",
    body: "Generate and store your own power to take a real, lasting chunk out of every bill.",
  },
  {
    icon: "ShieldCheck",
    title: "Avoid energy price-hike turmoil",
    body: "The more you make yourself, the less exposed you are when wholesale prices jump again.",
  },
  {
    icon: "Leaf",
    title: "Renewables won't run out",
    body: "Sunlight and air are free and endless, unlike the fossil fuels we are all trying to leave behind.",
  },
  {
    icon: "TrendingUp",
    title: "Increase the value of your home",
    body: "A modern, low-carbon energy setup is fast becoming one of the features buyers look for first.",
  },
];

export const benefitsBand = {
  eyebrow: "Why Northern Renewable Centre",
  heading: "Complete customer satisfaction drives all we do",
  body: "From the first survey to the final commissioning, we obsess over getting the details right, so your system performs exactly as promised, for years.",
  strapline: "Accurately, Consistently, Efficiently.",
  link: { label: "Visit the Centre", href: "/visit-the-centre" },
};

/* ------------------------------------------------------------------ */
/* Ecosystem section (hotspots over aerial house)                      */
/* ------------------------------------------------------------------ */

export const ecosystem = {
  heading: "The Northern Renewable Energy Ecosystem",
  body: "Generation, storage, heating and charging are far stronger together. We design each element to talk to the others, working as one intelligent system that quietly pushes your home towards self-sufficiency.",
  // Hotspots positioned as % over the aerial house render
  hotspots: [
    { label: "Solar PV", top: "26%", left: "38%" },
    { label: "Battery Storage", top: "62%", left: "22%" },
    { label: "Heat Pump", top: "70%", left: "70%" },
    { label: "EV Charger", top: "48%", left: "84%" },
  ],
};

/* ------------------------------------------------------------------ */
/* Shared responsibility (dark band)                                   */
/* ------------------------------------------------------------------ */

export const sharedResponsibility = {
  heading: "A Common Goal, Shared Responsibility",
  // segments rendered with `bold` ones highlighted green
  segments: [
    { text: "Reaching " },
    { text: "net-zero targets", bold: true },
    { text: " is something none of us can do alone. Every " },
    { text: "low-carbon home", bold: true },
    { text: " we help create is a small, permanent reduction in emissions, and with " },
    { text: "government grants", bold: true },
    { text: " now covering a meaningful share of the cost, there has never been a better moment to play your part.",
    },
  ],
  cta: { label: "Learn more", href: "/eco4-grants" },
};

/* ------------------------------------------------------------------ */
/* Tailor solution slider (home)                                       */
/* ------------------------------------------------------------------ */

export interface TailorCard {
  icon: string;
  title: string;
  body: string;
  action:
    | { kind: "link"; label: string; href: string }
    | { kind: "modal"; label: string }
    | { kind: "phone"; label: string };
}

export const tailorSolution = {
  heading: "Let us tailor your perfect green energy solution",
  body: "Tell us about your home and how you use energy, and we will design a system that fits, with clear pricing and flexible ways to pay.",
  cards: [
    {
      icon: "FileText",
      title: "Get a quote",
      body: "Share a few details and we will put together a tailored proposal for your property.",
      action: { kind: "modal", label: "Get a quote" },
    },
    {
      icon: "PhoneCall",
      title: "Free quotation",
      body: "Prefer to talk it through? Call our team for a no-obligation quotation.",
      action: { kind: "phone", label: "01642 925 666" },
    },
    {
      icon: "CreditCard",
      title: "Flexible finance",
      body: "Spread the cost of your installation with flexible finance options.",
      action: { kind: "link", label: "Spread the cost", href: "/spread-the-cost" },
    },
    {
      icon: "Sparkles",
      title: "Energy solutions tailored to you",
      body: "Not sure where to start? Send us an enquiry and we will guide you from here.",
      action: { kind: "modal", label: "Enquire now" },
    },
  ] satisfies TailorCard[],
};

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

export interface CaseStudy {
  title: string;
  result: string;
  media: MediaRef;
}

export const caseStudyCategories = [
  {
    title: "Residential Projects",
    body: "Homes across the North East and Scotland generating, storing and using their own clean energy.",
    href: "/residential-case-studies",
    media: img("residentialCase", "Completed residential solar installation on a home"),
  },
  {
    title: "Commercial Projects",
    body: "Businesses cutting overheads and carbon with renewable generation and heating at scale.",
    href: "/commercial-case-studies",
    media: img("commercialCase", "Commercial rooftop solar installation from above"),
  },
];

export const residentialCaseStudies: CaseStudy[] = [
  {
    title: "Detached home, Redcar",
    result: "12-panel system + 5kWh battery and EV charger, bills down significantly.",
    media: img("caseA", "Detached home with rooftop solar overlooking the valley"),
  },
  {
    title: "Semi-detached retrofit, Saltburn",
    result: "Air source heat pump replaced an ageing oil boiler, warm home, lower carbon.",
    media: img("caseB", "Air source heat pump fitted beside a semi-detached home"),
  },
  {
    title: "New build, Bathgate",
    result: "Solar PV, battery and infrared heating designed in from day one.",
    media: img("caseC", "Contemporary new build home with a clean driveway"),
  },
  {
    title: "Bungalow upgrade, Marske",
    result: "Tesla Powerwall paired with existing solar, self-sufficient after dark.",
    media: img("caseD", "Wall-mounted home battery paired with solar"),
  },
];

export const commercialCaseStudies: CaseStudy[] = [
  {
    title: "Distribution warehouse",
    result: "150kW rooftop array slashing daytime grid demand for a logistics operator.",
    media: img("ccWarehouse", "Large commercial rooftop solar array from the air"),
  },
  {
    title: "Service station forecourt",
    result: "Bank of rapid DC EV chargers attracting new custom and new revenue.",
    media: img("ccForecourt", "Rapid EV chargers at a service station forecourt"),
  },
  {
    title: "Care home heating",
    result: "Commercial air source heat pumps delivering reliable, low-carbon warmth.",
    media: img("ccCareHome", "Commercial air source heat pump unit"),
  },
  {
    title: "Office park",
    result: "Solar plus storage trimming peak-rate consumption across multiple units.",
    media: img("ccOfficePark", "Aerial view of a solar array serving an office park"),
  },
];

/* ------------------------------------------------------------------ */
/* Blog / insights carousel                                            */
/* ------------------------------------------------------------------ */

export interface BlogPost {
  title: string;
  excerpt: string;
  media: MediaRef;
  href: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Transparent Photovoltaic Glass for Facades & Balustrades",
    excerpt:
      "Glass that generates electricity is opening up exciting new ways to bring solar into conservatories, facades and balustrades without compromising the look.",
    media: img("blogGlass", "Light-filled modern interior with floor-to-ceiling glass"),
    href: "/solar-pv",
  },
  {
    title: "Is Now the Right Time to Go Solar?",
    excerpt:
      "With panel prices low and energy prices anything but, we look at what the numbers really say for a typical UK home in 2026.",
    media: img("blogSolar", "Installer carrying a solar panel across a roof"),
    href: "/solar-pv",
  },
  {
    title: "Heat Pumps in a British Winter: What to Expect",
    excerpt:
      "Do heat pumps really keep up when the frost sets in? A plain-English look at how they perform through a cold UK winter.",
    media: img("blogHeatPump", "Air source heat pump outdoor unit"),
    href: "/air-source-heat-pumps",
  },
  {
    title: "Battery Storage: Using Your Own Power After Dark",
    excerpt:
      "How a home battery lets you bank sunshine and cheap off-peak energy, then spend it when the grid is at its most expensive.",
    media: img("blogBattery", "Wall-mounted home battery storage being installed"),
    href: "/battery-storage",
  },
  {
    title: "What the £7,500 Boiler Upgrade Scheme Covers",
    excerpt:
      "The government grant can take a big bite out of a heat pump installation. Here is who qualifies and how we handle the paperwork for you.",
    media: img("blogGrant", "Installers fitting renewable energy equipment"),
    href: "/eco4-grants",
  },
];

/* ------------------------------------------------------------------ */
/* Enquiry modal options                                               */
/* ------------------------------------------------------------------ */

export const enquiryOptions = [
  "General Enquiry",
  "Residential Solar",
  "Commercial Solar",
  "Battery Storage",
  "Air Source Heating",
  "EV Chargers",
  "Infrared Radiators",
  "ECO4 Grant",
] as const;

/* ------------------------------------------------------------------ */
/* Partner CTA                                                         */
/* ------------------------------------------------------------------ */

export const partnerCTA = {
  eyebrow: "Work with us",
  heading: "Become Our Partner",
  body: "Are you an architect, retailer or industry professional? Leave your details and send us a contact request, we will be in touch to explore how we can work together.",
  cta: "Contact us",
};

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Do I qualify for an ECO4 grant?",
    a: "ECO4 is a government scheme that funds energy-efficiency upgrades for eligible households, typically those receiving certain benefits or living in lower-efficiency homes. Eligibility can be nuanced, so the quickest route is to talk to us, we will check your circumstances and handle the application paperwork on your behalf.",
  },
  {
    q: "How much can solar really save me?",
    a: "It depends on your roof, your usage and whether you add a battery, but most homes see a meaningful reduction in their electricity bills, with the biggest savings coming from using the power you generate rather than buying it from the grid. We will model realistic figures for your specific property as part of your free quotation.",
  },
  {
    q: "Do heat pumps work in a British winter?",
    a: "Yes. Modern air source heat pumps extract heat from the outside air even when temperatures fall below freezing, and they are specified to keep your home comfortable through a UK winter. We size every system carefully so it performs when you need it most.",
  },
  {
    q: "What is the £7,500 Boiler Upgrade Scheme?",
    a: "The Boiler Upgrade Scheme is a government grant that contributes up to £7,500 towards the cost of replacing a fossil-fuel boiler with an air source heat pump in England and Wales. We will confirm your eligibility and apply the grant for you so the saving is reflected in your quote.",
  },
  {
    q: "How long does an installation take?",
    a: "A typical domestic solar PV system is installed in one to two days, a battery in a day, and an air source heat pump usually within two to three days depending on the property. We will give you a clear timeline before we start and keep disruption to a minimum.",
  },
  {
    q: "Do you offer finance?",
    a: "Yes, we offer flexible finance so you can spread the cost of your installation over time rather than paying it all upfront. You will find the details on our Spread the Cost page, or just ask and we will talk you through the options.",
  },
  {
    q: "Are you MCS certified?",
    a: "We are. Our installations are MCS certified, and we hold further accreditations including Gas Safe, F-Gas, NAPIT and TrustMark, so you can be confident the work meets recognised industry standards, and that any grants requiring certified installers remain available to you.",
  },
  {
    q: "Do you cover Scotland as well as England?",
    a: "We do. Alongside our home in Redcar we have a Scottish branch at Inchcross Business Park in Bathgate, West Lothian, so we look after customers across the North East of England and central Scotland.",
  },
  {
    q: "Can I see the equipment before I buy?",
    a: "Absolutely, that is exactly what our centre is for. Drop in to the showroom in Redcar Monday to Friday, grab a coffee in the Eco Café and see the kit for yourself with no pressure to commit.",
  },
];

/* ------------------------------------------------------------------ */
/* Service / info page content (ServicePageTemplate)                   */
/* ------------------------------------------------------------------ */

export interface FeatureBlock {
  heading: string;
  body: string;
  media: MediaRef;
  bullets?: string[];
}

export interface ServicePage {
  /** Route key (matches the App Router path) */
  route: string;
  title: string;
  eyebrow: string;
  bannerMedia: MediaRef;
  intro: {
    heading: string;
    body: string;
    media: MediaRef;
  };
  features: FeatureBlock[];
  /** Optional photo gallery carousel (e.g. a showroom tour) */
  gallery?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    items: MediaRef[];
  };
  /** Optional featured video block (poster falls back to the brand gradient) */
  video?: {
    eyebrow?: string;
    heading: string;
    body?: string;
    media: MediaRef;
  };
  showBrands?: boolean;
  showAccreditations?: boolean;
  cta: {
    heading: string;
    body: string;
  };
  /** Related teaser cards at the foot of the page (route slugs of products) */
  related?: string[];
}

export const servicePages: Record<string, ServicePage> = {
  "/solar-pv": {
    route: "/solar-pv",
    title: "Solar PV",
    eyebrow: "Generate",
    bannerMedia: img("bannerSolar", "Rooftop solar panels under a bright sky"),
    intro: {
      heading: "Clean electricity, straight from the sky",
      body: "Solar PV is the simplest way to start making your own power. Panels sit quietly on your roof, turning daylight into electricity you can use, store or sell back, with no moving parts, no noise and nothing to fuel. We design, supply and install MCS-certified systems for homes and businesses right across the region.",
      media: img("installerAction", "Engineer installing solar PV panels on a roof"),
    },
    features: [
      {
        heading: "Designed around your roof",
        body: "Every roof is different, so every system we design is too. We survey orientation, shading and your usage patterns to size an array that delivers the most energy where it matters, and looks tidy doing it.",
        media: img("solarHouseHill", "Home with a neatly fitted rooftop solar array"),
        bullets: ["MCS-certified installation", "Premium tier-one panels", "25-year panel warranties"],
      },
      {
        heading: "Better with a battery",
        body: "Pair your panels with storage and you can use your own solar long after the sun goes down, squeezing far more value from every unit you generate. We will show you the numbers for your home.",
        media: img("batteryWall", "Home battery storage paired with solar PV"),
        bullets: ["Use solar after dark", "Lower grid reliance", "Optional backup power"],
      },
      {
        heading: "For homes and businesses",
        body: "From a few panels on a semi to a commercial rooftop array, the principles are the same and the savings scale. Talk to us about grid-tied systems for any size of property.",
        media: img("solarAerial", "Commercial rooftop solar installation from above"),
      },
    ],
    showBrands: true,
    showAccreditations: true,
    cta: {
      heading: "Ready to make your own electricity?",
      body: "Get a free, no-obligation solar quotation tailored to your roof and the way you use energy.",
    },
    related: ["solar-tracking", "battery-storage", "ev-chargers"],
  },

  "/solar-pv/solar-tracking": {
    route: "/solar-pv/solar-tracking",
    title: "Solar Tracking",
    eyebrow: "Maximise",
    bannerMedia: img("bannerTracking", "Aerial view of a ground-mounted solar array"),
    intro: {
      heading: "Follow the sun, capture more energy",
      body: "A fixed panel only faces the sun perfectly for a moment each day. Tracking mounts gently rotate your panels to follow it from sunrise to sunset, lifting output substantially over the course of a year, the most productive way to make the very most of your investment.",
      media: img("solarTracking", "Ground-mounted solar array following the sun"),
    },
    features: [
      {
        heading: "Up to around 30% more output",
        body: "By keeping panels aimed at the sun through the day, a tracking system can generate meaningfully more energy than the same panels fixed in place, especially across the long days of summer.",
        media: img("solarRoofVista", "High-yield solar installation overlooking the countryside"),
        bullets: ["Higher annual yield", "Sunrise-to-sunset generation", "Single or dual-axis options"],
      },
      {
        heading: "Automated and effortless",
        body: "Once commissioned, the system looks after itself, quietly adjusting through the day with no input from you. We will advise whether tracking makes sense for your site.",
        media: img("house", "A contemporary home set in a landscaped garden"),
      },
    ],
    showBrands: true,
    cta: {
      heading: "Squeeze more from every panel",
      body: "Ask us whether a tracking system is right for your site and budget.",
    },
    related: ["solar-pv", "battery-storage"],
  },

  "/air-source-heat-pumps": {
    route: "/air-source-heat-pumps",
    title: "Air Source Heat Pumps",
    eyebrow: "Heat",
    bannerMedia: img("bannerHeat", "Air source heat pump beside a modern home"),
    intro: {
      heading: "Efficient heating from the air around you",
      body: "An air source heat pump draws warmth from the outside air and concentrates it to heat your home and hot water, working efficiently even on cold days. It is a clean, low-carbon replacement for an ageing gas or oil boiler, and many systems can cool in summer too.",
      media: img("heatPump", "Air source heat pump outdoor unit"),
    },
    features: [
      {
        heading: "Up to £7,500 towards your install",
        body: "Through the government's Boiler Upgrade Scheme, eligible homes can claim up to £7,500 towards replacing a fossil-fuel boiler with a heat pump. We confirm your eligibility and handle the application for you.",
        media: img("heatPumpWhite", "Modern air source heat pump unit"),
        bullets: ["Boiler Upgrade Scheme grant", "Works with existing radiators", "Heating and cooling"],
      },
      {
        heading: "Comfortable, low-carbon warmth",
        body: "Heat pumps deliver a steady, even warmth that suits the way modern homes are used. Paired with solar, the running costs fall even further and the carbon savings climb.",
        media: img("livingOpen", "Warm, comfortable open-plan living space"),
      },
      {
        heading: "Properly sized, properly fitted",
        body: "Performance comes down to good design. We carefully size every system to your property so it keeps you warm through the coldest snap without wasting a watt.",
        media: img("techniciansTeam", "NRC engineers commissioning an installation"),
      },
    ],
    showBrands: true,
    showAccreditations: true,
    cta: {
      heading: "Swap your old boiler for a heat pump",
      body: "Find out how much you could save, and how much grant you could claim, with a free assessment.",
    },
    related: ["solar-pv", "battery-storage", "infrared-radiators"],
  },

  "/air-source-hot-water-cylinders": {
    route: "/air-source-hot-water-cylinders",
    title: "Air Source Hot Water Cylinders",
    eyebrow: "Store",
    bannerMedia: img("bannerCylinder", "Tidy utility room with hot water and heating equipment"),
    intro: {
      heading: "Smart cylinders for efficient hot water",
      body: "A modern hot water cylinder paired with your heat pump stores hot water efficiently and intelligently, learning your routine so there is always plenty when you need it. Smart cylinders can even prioritise your cheapest, greenest energy to heat the water inside.",
      media: img("hotWater", "Wall-mounted domestic hot water unit"),
    },
    features: [
      {
        heading: "Built to work with your heat pump",
        body: "The cylinder is the unsung hero of an efficient home, it stores the warmth your heat pump makes so it is ready the moment you turn on a tap. We match the right cylinder to your system and household.",
        media: img("heatPumpRound", "Heat pump unit that pairs with a hot water cylinder"),
        bullets: ["Heat-pump compatible", "Smart scheduling", "Efficient stored hot water"],
      },
      {
        heading: "Smart by design",
        body: "Smart cylinders such as Mixergy heat only the water you need and can top up on cheap off-peak or solar energy, trimming the cost of hot water without you lifting a finger.",
        media: img("batteryWall", "Smart home energy storage on the wall"),
      },
    ],
    showBrands: true,
    cta: {
      heading: "Get hot water sorted, efficiently",
      body: "Talk to us about the right cylinder to pair with your heat pump.",
    },
    related: ["air-source-heat-pumps", "solar-pv"],
  },

  "/air-source-heat-pumps/service": {
    route: "/air-source-heat-pumps/service",
    title: "Air Source Heat Pump Service",
    eyebrow: "Maintain",
    bannerMedia: img("bannerService", "Engineer inspecting renewable energy equipment"),
    intro: {
      heading: "Keep your heat pump at its best",
      body: "Like any heating system, a heat pump rewards a little regular care with years of efficient, reliable service. Our maintenance and servicing keeps yours running at peak efficiency, catches small issues before they become big ones, and protects your warranty.",
      media: img("techniciansTeam", "Engineers carrying out a service visit"),
    },
    features: [
      {
        heading: "Annual checks that pay for themselves",
        body: "A yearly service keeps efficiency high and bills low, while giving you the reassurance that everything is working exactly as it should before the cold weather arrives.",
        media: img("installerAction", "NRC engineer checking an installation"),
        bullets: ["Annual servicing", "Efficiency checks", "Repairs and call-outs"],
      },
      {
        heading: "Repairs by accredited engineers",
        body: "If something is not right, our F-Gas and MCS-accredited engineers will diagnose and fix it properly, whether we installed your system or not.",
        media: img("livingBlue", "Comfortable, well-kept home interior"),
      },
    ],
    showAccreditations: true,
    cta: {
      heading: "Book a heat pump service",
      body: "Keep your system efficient and protected with a regular service from our team.",
    },
    related: ["air-source-heat-pumps", "solar-pv", "battery-storage"],
  },

  "/battery-storage": {
    route: "/battery-storage",
    title: "Battery Storage",
    eyebrow: "Store",
    bannerMedia: img("bannerBattery", "Home battery storage system and inverter"),
    intro: {
      heading: "Bank your energy, spend it when it counts",
      body: "A home battery stores the solar you generate by day, or cheap off-peak grid energy overnight, then releases it whenever you need it. That means using more of your own clean power, leaning far less on the costly grid, and, with the right setup, keeping the essentials running during a power cut.",
      media: img("batteryWall", "Wall-mounted home battery installation"),
    },
    features: [
      {
        heading: "Use your own solar after dark",
        body: "Without storage, surplus solar is sold back cheaply and bought again at a premium come evening. A battery closes that gap, letting you use the energy you made all day, all night.",
        media: img("solarRoofVista", "Solar panels generating power to charge a home battery"),
        bullets: ["Day & night power", "Off-peak charging", "Lower grid reliance"],
      },
      {
        heading: "Backup when the power goes",
        body: "Specify backup and your battery can keep key circuits alive through an outage, so the lights, fridge and broadband stay on while the street is dark.",
        media: img("house", "Home staying comfortably powered into the evening"),
        bullets: ["Blackout protection", "Automatic switchover"],
      },
      {
        heading: "Leading battery brands",
        body: "We install trusted storage from the likes of GivEnergy, SolaX and Tesla, matched to your home and budget and managed from a simple app.",
        media: img("livingOpen", "Energy managed from the comfort of home"),
      },
    ],
    showBrands: true,
    showAccreditations: true,
    cta: {
      heading: "Take control of your energy",
      body: "Find out which battery suits your home with a free, tailored quotation.",
    },
    related: ["solar-pv", "ev-chargers", "air-source-heat-pumps"],
  },

  "/battery-storage/tesla-powerwall": {
    route: "/battery-storage/tesla-powerwall",
    title: "Tesla Powerwall",
    eyebrow: "Store",
    bannerMedia: img("bannerPowerwall", "Home battery storage mounted in a garage"),
    intro: {
      heading: "Compact power, beautifully simple",
      body: "The Tesla Powerwall is a compact, powerful home battery that stores solar or grid energy and puts it to work day and night. Managed entirely from the Tesla app, it is one of the most refined ways to store and control your home's energy.",
      media: img("powerwall", "Wall-mounted home battery installation"),
    },
    features: [
      {
        heading: "Powerful and app-controlled",
        body: "Monitor generation, storage and usage in real time, and let the Powerwall manage itself to maximise your self-sufficiency, all from your phone.",
        media: img("livingOpen", "Home energy managed from a single app"),
        bullets: ["Compact", "Powerful", "App-controlled"],
      },
      {
        heading: "Seamless backup",
        body: "When the grid goes down, the Powerwall detects the outage and keeps your home running, the switchover is so quick you may not even notice.",
        media: img("heroHome", "Home staying lit and warm during an outage"),
      },
    ],
    showAccreditations: true,
    cta: {
      heading: "Add a Powerwall to your home",
      body: "Ask us about pairing a Tesla Powerwall with new or existing solar.",
    },
    related: ["battery-storage", "solar-pv"],
  },

  "/other-services": {
    route: "/other-services",
    title: "Other Services",
    eyebrow: "Explore",
    bannerMedia: img("bannerOther", "Wind turbines and solar panels across the countryside"),
    intro: {
      heading: "More ways to a greener home and business",
      body: "Beyond solar, storage and heat pumps, we offer a wider range of renewable and low-carbon solutions, from commercial heating at scale to EV charging and modern infrared heating. Explore the options below and we will help you find the right fit.",
      media: img("evGreen", "Electric car charging beside greenery"),
    },
    features: [
      {
        heading: "Commercial heating",
        body: "Scalable, efficient renewable heating designed for the demands of business premises of every size.",
        media: img("heatPumpWhite", "Commercial-grade air source heat pump unit"),
        bullets: ["Scalable", "Efficient", "Commercial"],
      },
      {
        heading: "EV chargers",
        body: "From 7kW home wall chargers to rapid DC units for commercial sites, charged smartly on the greenest power.",
        media: img("evStations", "Bank of electric vehicle charging stations"),
        bullets: ["Home", "Commercial", "Smart"],
      },
      {
        heading: "Infrared radiators",
        body: "Slim, modern radiant heating that warms people and surfaces directly for fast, comfortable heat.",
        media: img("livingCottage", "Cosy modern living space heated by infrared"),
        bullets: ["Radiant", "Modern", "Low-maintenance"],
      },
    ],
    cta: {
      heading: "Not sure what you need?",
      body: "Tell us about your project and we will point you to the right solution.",
    },
    related: ["ev-chargers", "infrared-radiators", "solar-tracking"],
  },

  "/commercial-heating": {
    route: "/commercial-heating",
    title: "Commercial Heating",
    eyebrow: "Heat at scale",
    bannerMedia: img("bannerCommercial", "Commercial building with rooftop renewables"),
    intro: {
      heading: "Renewable heating that means business",
      body: "Cutting a commercial heating bill, and its carbon, calls for systems designed for scale and reliability. We specify and install renewable commercial heating that keeps premises comfortable, running costs down and your sustainability goals on track.",
      media: img("commercialHeating", "Commercial air source heat pump unit"),
    },
    features: [
      {
        heading: "Designed for your premises",
        body: "Offices, care homes, warehouses, hospitality, every building heats differently. We engineer a solution sized to your space, your occupancy and your budget.",
        media: img("solarAerial", "Commercial premises with rooftop renewables"),
        bullets: ["Scalable", "Efficient", "Reliable"],
      },
      {
        heading: "Lower running costs, lower carbon",
        body: "Modern commercial heat pumps and controls trim energy use while helping you meet net-zero commitments, and they pair neatly with commercial solar.",
        media: img("solarFlatRoof", "Commercial solar array supporting heating loads"),
      },
    ],
    showAccreditations: true,
    cta: {
      heading: "Talk commercial heating",
      body: "Arrange a site assessment for renewable heating tailored to your business.",
    },
    related: ["solar-pv", "ev-chargers"],
  },

  "/ev-chargers": {
    route: "/ev-chargers",
    title: "EV Chargers",
    eyebrow: "Charge",
    bannerMedia: img("bannerEv", "Electric vehicles charging at a row of stations"),
    intro: {
      heading: "Charging that fits the way you drive",
      body: "Whether you want a tidy charger on the side of the house or a bank of rapid units for a forecourt, we install EV charging for homes and businesses. Smart chargers schedule top-ups for the cheapest, greenest hours, and work beautifully alongside your solar and battery.",
      media: img("evCharger", "Home EV charger in use on a driveway"),
    },
    features: [
      {
        heading: "Smart home charging",
        body: "A 7kW home charger fills your car overnight, and smart scheduling means it sips the cheapest off-peak or surplus solar energy while you sleep.",
        media: img("evBay", "Electric car charging at a home charge point"),
        bullets: ["7kW home charging", "Solar-aware", "App-controlled"],
      },
      {
        heading: "Commercial and rapid DC",
        body: "For workplaces, fleets, forecourts and service stations, we install larger free-standing AC and rapid DC chargers built for constant use.",
        media: img("evPublic", "Commercial EV charging units"),
        bullets: ["Workplace & fleet", "Forecourts", "Up to rapid DC"],
      },
    ],
    showBrands: true,
    cta: {
      heading: "Power up your drive",
      body: "Get a quote for home or commercial EV charging tailored to your needs.",
    },
    related: ["solar-pv", "battery-storage"],
  },

  "/infrared-radiators": {
    route: "/infrared-radiators",
    title: "Infrared Radiators",
    eyebrow: "Warm",
    bannerMedia: img("bannerInfrared", "Bright open-plan room warmed by infrared"),
    intro: {
      heading: "Radiant warmth, the way the sun does it",
      body: "Infrared radiators warm people and surfaces directly rather than heating the air, so comfortable warmth arrives quickly and lingers. Slim, silent and virtually maintenance-free, they are a smart, modern heating choice, especially when paired with solar and storage.",
      media: img("infrared", "Infrared heating in a bright modern interior"),
    },
    features: [
      {
        heading: "Fast, comfortable, efficient",
        body: "Because infrared heats objects and people directly, you feel warm sooner and stay comfortable at a lower air temperature, a genuinely different kind of heat.",
        media: img("livingBlue", "Comfortable, warm modern living space"),
        bullets: ["Radiant warmth", "Quick to heat", "Slim and modern"],
      },
      {
        heading: "Nothing to service, nothing to leak",
        body: "With no moving parts, no water and no boiler, infrared panels are about as low-maintenance as heating gets, and they look great on the wall or ceiling.",
        media: img("livingCottage", "Cosy living room with modern radiant heating"),
      },
    ],
    cta: {
      heading: "Discover infrared heating",
      body: "Ask us whether infrared is the right fit for your room or whole home.",
    },
    related: ["solar-pv", "battery-storage"],
  },

  "/spread-the-cost": {
    route: "/spread-the-cost",
    title: "Spread the Cost",
    eyebrow: "Finance",
    bannerMedia: img("bannerFinance", "Family outside their new home"),
    intro: {
      heading: "Flexible finance for your green upgrade",
      body: "Going greener should not mean finding the full cost upfront. Our flexible finance options let you spread the cost of your installation over time, so you can start saving on energy from day one while paying in a way that suits your budget.",
      media: img("partnerVan", "Homeowners outside their property"),
    },
    features: [
      {
        heading: "Pay your way",
        body: "We will talk you through the finance options available for your project and help you find a plan that fits comfortably alongside the savings your new system delivers.",
        media: img("coupleGreen", "Couple discussing options outside their home"),
        bullets: ["Spread the cost", "Clear, simple terms", "No-obligation guidance"],
      },
      {
        heading: "Stack it with grants",
        body: "Where you qualify, finance can sit alongside government grants such as the Boiler Upgrade Scheme or ECO4, bringing the upfront figure down further still.",
        media: img("installersRedRoof", "Grant-funded renewable installation in progress"),
      },
    ],
    cta: {
      heading: "Let's make it affordable",
      body: "Ask us about flexible finance for your renewable installation.",
    },
    related: ["solar-pv", "air-source-heat-pumps", "battery-storage"],
  },

  "/eco4-grants": {
    route: "/eco4-grants",
    title: "ECO4 Grants",
    eyebrow: "Grants",
    bannerMedia: img("bannerGrants", "Energy-efficient family home"),
    intro: {
      heading: "Government grants towards a warmer, greener home",
      body: "Government schemes such as ECO4 and the Boiler Upgrade Scheme can fund a significant share of the cost of energy-efficiency and low-carbon heating upgrades for eligible households. We will check what you qualify for and handle the application paperwork on your behalf.",
      media: img("familyHome", "Happy family outside their energy-efficient home"),
    },
    features: [
      {
        heading: "ECO4 explained",
        body: "ECO4 supports eligible households, often those on certain benefits or in lower-efficiency homes, with funding towards measures like heating upgrades and insulation. Eligibility can be complex, so we do the legwork for you.",
        media: img("inspectPanel", "Assessing a home for ECO4 eligibility"),
        bullets: ["Eligibility checks", "We handle the paperwork", "MCS-certified installs"],
      },
      {
        heading: "The £7,500 Boiler Upgrade Scheme",
        body: "Replacing a fossil-fuel boiler with a heat pump? Eligible homes in England and Wales can claim up to £7,500 towards the cost. We apply the grant directly so the saving shows in your quote.",
        media: img("installerAction", "Heat pump installed under the Boiler Upgrade Scheme"),
        bullets: ["Up to £7,500", "Applied for you", "Heat pump installs"],
      },
    ],
    showAccreditations: true,
    cta: {
      heading: "See what you could claim",
      body: "Let us check your eligibility for ECO4 and other grants, it costs nothing to ask.",
    },
    related: ["air-source-heat-pumps", "solar-pv", "battery-storage"],
  },

  "/visit-the-centre": {
    route: "/visit-the-centre",
    title: "Visit the Centre",
    eyebrow: "Come and see",
    bannerMedia: img("showroomExterior", "The Northern Renewable Centre showroom on the Esplanade in Redcar"),
    intro: {
      heading: "See it, touch it, ask anything",
      body: "There is no substitute for seeing the kit in person. Our centre on the Esplanade in Redcar is a working showroom where you can explore solar, batteries, heat pumps, EV charging and more, and grab a coffee in our Eco Café while you are at it. Drop in Monday to Friday, no appointment needed.",
      media: img("showroomInterior", "Inside the Northern Renewable Centre showroom"),
    },
    features: [
      {
        heading: "A showroom and an Eco Café",
        body: "See real systems running, chat to the people who fit them every day, and take your time. Our Eco Café is open to drop-ins, so come and make a morning of it.",
        media: img("showroomReception", "The welcome desk inside the centre"),
        bullets: ["Open Mon–Fri 9am–5pm", "Showroom & Eco Café", "No appointment needed"],
      },
      {
        heading: "See the kit working, up close",
        body: "Solar, batteries, heat pumps, infrared heating and EV chargers are all set up and running on the floor. Compare the brands we install side by side, and get honest, no-pressure advice from people who do this for a living.",
        media: img("showroomPowerConsumption", "Live product displays on the showroom floor"),
        bullets: ["Live product displays", "Top brands side by side", "Honest, no-pressure advice"],
      },
    ],
    gallery: {
      eyebrow: "Take a look around",
      heading: "Inside the centre",
      body: "A few corners of the Redcar showroom. There is a lot more to see in person, pop in and say hello.",
      items: [
        img("showroomConsult", "Consultation area at the Northern Renewable Centre"),
        img("showroomBattery", "Battery storage and inverter display"),
        img("showroomEvCharger", "EV charger display wall"),
        img("showroomHeatPump", "Air source heat pump display"),
        img("showroomEvBattery", "Solar EV charging and battery storage display"),
        img("showroomSolarPanels", "Rooftop solar panel display"),
        img("showroomHeatPumpOutdoor", "Hot water cylinder and heat pump display"),
        img("showroomInfrared", "Infrared heating display"),
      ],
    },
    cta: {
      heading: "Pop in and say hello",
      body: "We would love to show you around, find us in Redcar or Bathgate, Monday to Friday.",
    },
    related: ["solar-pv", "battery-storage", "air-source-heat-pumps"],
  },
};

/** Lookup helper used by product teaser cards. */
export const productBySlug: Record<string, ProductItem> = Object.fromEntries(
  allProducts.map((p) => [p.slug, p]),
);
