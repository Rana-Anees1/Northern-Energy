import { Check } from "lucide-react";

import { siteConfig } from "@/lib/siteConfig";
import { AccreditationLogos } from "@/components/ui/AccreditationLogos";
import { TrustpilotReviews } from "@/components/ui/TrustpilotReviews";
import type { ServicePage } from "@/lib/content";

import { PageBanner } from "@/components/ui/PageBanner";
import { MediaTile } from "@/components/ui/MediaTile";
import { Media } from "@/components/ui/Media";
import { ShowroomGallery } from "@/components/templates/ShowroomGallery";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EnquiryButton } from "@/components/ui/EnquiryButton";
import { ProductTeaserCards } from "@/components/ui/ProductTeaserCards";
import { Reveal } from "@/components/ui/Reveal";

interface ServicePageTemplateProps {
  page: ServicePage;
}

export function ServicePageTemplate({ page }: ServicePageTemplateProps) {
  return (
    <>
      {/* 1) Page hero banner */}
      <PageBanner
        eyebrow={page.eyebrow}
        title={page.title}
        media={page.bannerMedia}
      />

      {/* 2) Intro split block — media left, text right */}
      <Section tone="light">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal direction="left">
              <MediaTile
                media={page.intro.media}
                className="aspect-[4/3] h-full lg:min-h-[420px]"
              />
            </Reveal>
            <Reveal direction="right">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-green">
                  Overview
                </p>
                <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
                  {page.intro.heading}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  {page.intro.body}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <EnquiryButton label="Get a quote" />
                  <Button variant="outline" href={siteConfig.phoneHref}>
                    Call {siteConfig.phone}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 3) Feature blocks — alternating media side.
          The intro above is media-LEFT (block 0), so features continue the
          rhythm starting media-RIGHT: right, left, right, … */}
      {page.features.map((feature, i) => {
        const mediaRight = i % 2 === 0;
        return (
          <Section key={`${feature.heading}-${i}`} tone={i % 2 === 0 ? "surface" : "light"}>
            <Container>
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <Reveal direction={mediaRight ? "right" : "left"} className={mediaRight ? "lg:order-2" : "lg:order-1"}>
                  <MediaTile
                    media={feature.media}
                    className="aspect-[4/3] h-full lg:min-h-[400px]"
                  />
                </Reveal>
                <Reveal
                  direction={mediaRight ? "left" : "right"}
                  className={mediaRight ? "lg:order-1" : "lg:order-2"}
                >
                  <div>
                    <h3 className="text-2xl font-bold text-navy sm:text-3xl">
                      {feature.heading}
                    </h3>
                    <p className="mt-4 leading-relaxed text-muted">
                      {feature.body}
                    </p>
                    {feature.bullets && feature.bullets.length > 0 ? (
                      <ul className="mt-6 space-y-3">
                        {feature.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/15 text-green"
                            >
                              <Check className="h-4 w-4" />
                            </span>
                            <span className="text-ink">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* 3.5) Showroom photo gallery (optional) */}
      {page.gallery ? (
        <Section tone="surface">
          <Container>
            <Reveal className="mb-10 text-center">
              <div>
                {page.gallery.eyebrow ? (
                  <p className="text-sm font-bold uppercase tracking-wide text-green">
                    {page.gallery.eyebrow}
                  </p>
                ) : null}
                <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
                  {page.gallery.heading}
                </h2>
                {page.gallery.body ? (
                  <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                    {page.gallery.body}
                  </p>
                ) : null}
              </div>
            </Reveal>
            <ShowroomGallery items={page.gallery.items} />
          </Container>
        </Section>
      ) : null}

      {/* 3.6) Featured video (optional) */}
      {page.video ? (
        <Section tone="light">
          <Container size="narrow">
            <Reveal className="mb-8 text-center">
              <div>
                {page.video.eyebrow ? (
                  <p className="text-sm font-bold uppercase tracking-wide text-green">
                    {page.video.eyebrow}
                  </p>
                ) : null}
                <h2 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
                  {page.video.heading}
                </h2>
                {page.video.body ? (
                  <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                    {page.video.body}
                  </p>
                ) : null}
              </div>
            </Reveal>
            <Reveal direction="scale">
              <div className="overflow-hidden rounded-2xl shadow-soft ring-1 ring-black/5">
                <Media media={page.video.media} className="aspect-video w-full" />
              </div>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* 4) Trusted brands strip */}
      {page.showBrands ? (
        <Section tone="light">
          <Container>
            <Reveal className="text-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-green">
                  Trusted brands we install
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-14">
                  {siteConfig.brands.map((brand) => (
                    <img
                      key={brand.name}
                      src={brand.logo}
                      alt={brand.name}
                      loading="lazy"
                      decoding="async"
                      className="h-14 w-auto max-w-[180px] object-contain opacity-80 transition hover:opacity-100 sm:h-16"
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* 5) Accreditations + Trustpilot */}
      {page.showAccreditations ? (
        <Section tone="surface">
          <Container>
            <Reveal className="text-center">
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                Accredited &amp; approved
              </h2>
            </Reveal>

            {/* Real logos, not text chips (client feedback). */}
            <AccreditationLogos className="mt-8" />

            {/* Reviews shown on-site rather than an outbound link. */}
            <TrustpilotReviews className="mt-12" />
          </Container>
        </Section>
      ) : null}

      {/* 6) CTA band */}
      <Section tone="green">
        <Container size="narrow">
          <Reveal className="text-center">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                {page.cta.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
                {page.cta.body}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <EnquiryButton label="Get a quote" variant="navy" />
                <Button variant="outlineLight" href={siteConfig.phoneHref}>
                  Call {siteConfig.phone}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 7) Related product teasers */}
      {page.related && page.related.length > 0 ? (
        <Section tone="light">
          <Container>
            <ProductTeaserCards
              slugs={page.related}
              eyebrow="Explore more"
              title="You might also be interested in"
            />
          </Container>
        </Section>
      ) : null}
    </>
  );
}
