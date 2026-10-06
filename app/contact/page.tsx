import type { Metadata } from "next";
import {
  Clock,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { images } from "@/lib/assets";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageBanner } from "@/components/ui/PageBanner";
import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { ProductTeaserCards } from "@/components/ui/ProductTeaserCards";
import { MediaTile } from "@/components/ui/MediaTile";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Northern Renewable Centre, Redcar & Bathgate.",
};

const socialLinks = [
  {
    label: "Northern Renewable Centre on Facebook",
    href: siteConfig.socials.facebook,
    Icon: Facebook,
  },
  {
    label: `Northern Renewable Centre on X (${siteConfig.socials.xHandle})`,
    href: siteConfig.socials.x,
    Icon: Twitter,
  },
  {
    label: "Northern Renewable Centre on LinkedIn",
    href: siteConfig.socials.linkedin,
    Icon: Linkedin,
  },
];

export default function Page() {
  const { branches } = siteConfig;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    branches.england.mapQuery,
  )}&output=embed`;

  const branchCards = [
    {
      Icon: MapPin,
      title: branches.england.name,
      lines: branches.england.lines,
      postcode: branches.england.postcode,
    },
    {
      Icon: MapPin,
      title: branches.scotland.name,
      lines: branches.scotland.lines,
      postcode: branches.scotland.postcode,
    },
  ];

  return (
    <>
      <PageBanner
        eyebrow="Get in touch"
        title="Contact"
        media={{
          type: "image",
          src: images.bannerContact,
          alt: "The Northern Renewable Centre showroom in Redcar, with branded signage at the entrance",
        }}
      />

      {/* Map + enquiry details */}
      <Section tone="light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <iframe
                src={mapSrc}
                title="Map of our Redcar branch"
                className="h-[360px] min-h-[360px] w-full rounded-2xl lg:h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow mb-3">We&rsquo;d love to hear from you</p>
              <h2 className="text-3xl font-bold text-navy sm:text-4xl">
                Start your green home journey
              </h2>
              <p className="mt-4 max-w-prose leading-relaxed text-muted">
                Whether you&rsquo;re weighing up solar, a heat pump, battery
                storage or an EV charger, our team is here to help. Drop us a
                line, give us a call, or pop into the showroom in Redcar or
                Bathgate &mdash; we&rsquo;ll talk you through the options with no
                pressure and no jargon.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href={siteConfig.emailHref}
                  className="group flex items-center gap-3 text-ink transition-colors hover:text-green"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-semibold">{siteConfig.email}</span>
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="group flex items-center gap-3 text-ink transition-colors hover:text-green"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-semibold">{siteConfig.phone}</span>
                </a>
              </div>

              <div className="mt-8 flex items-center gap-3">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-navy ring-1 ring-black/5 transition-colors hover:bg-green hover:text-white"
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <EnquiryButton label="Send an enquiry" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Branches + opening hours */}
      <Section tone="surface">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {branchCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-soft ring-1 ring-black/5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green/10 text-green">
                    <card.Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-navy">
                    {card.title}
                  </h3>
                  <address className="mt-3 not-italic leading-relaxed text-muted">
                    {card.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="mt-1 block font-semibold text-ink">
                      {card.postcode}
                    </span>
                  </address>
                </div>
              </Reveal>
            ))}

            <Reveal delay={branchCards.length * 0.08}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-soft ring-1 ring-black/5">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green/10 text-green">
                  <Clock className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy">
                  Opening Hours
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  <span className="block font-semibold text-ink">
                    {siteConfig.hours}
                  </span>
                  <span className="mt-1 block">{siteConfig.hoursNote}</span>
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Get in touch band */}
      <Section tone="navy">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow mb-3">Get in touch</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to talk?</h2>
              <p className="mt-4 max-w-prose leading-relaxed text-white/80">
                Tell us a little about your home or project and we&rsquo;ll come
                back with honest, tailored advice. There&rsquo;s a friendly face
                waiting at the centre, and a greener home closer than you think.
              </p>
              <div className="mt-8">
                <EnquiryButton label="Contact us" variant="primary" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <MediaTile
                media={{
                  type: "image",
                  src: images.showroomInterior,
                  alt: "Inside the Northern Renewable Centre showroom, with live solar, battery and heating displays",
                }}
                className="aspect-[4/3]"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Popular services */}
      <Section tone="light">
        <Container>
          <ProductTeaserCards
            slugs={["solar-tracking", "battery-storage", "ev-chargers"]}
            eyebrow="Explore"
            title="Popular services"
          />
        </Container>
      </Section>
    </>
  );
}
