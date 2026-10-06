import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { AnimatedStack } from "@/components/ui/Reveal";

/**
 * Phone / location / email strip that sits directly above the footer, so the
 * page ends on a way to get in touch rather than on a CTA alone.
 */
export function ContactStrip() {
  const { england, scotland } = siteConfig.branches;

  return (
    <Section tone="surface" className="py-12 sm:py-14 lg:py-16">
      <Container>
        <AnimatedStack className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green/12 text-green"
            >
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">Call us</p>
              <a
                href={siteConfig.phoneHref}
                className="mt-1 block text-lg font-bold text-navy transition-colors hover:text-green"
              >
                {siteConfig.phone}
              </a>
              <p className="mt-1 text-sm text-muted">{siteConfig.hours}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green/12 text-green"
            >
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">Visit the centre</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {england.lines.join(", ")}, {england.postcode}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {scotland.lines.join(", ")}, {scotland.postcode}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green/12 text-green"
            >
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">Email us</p>
              <a
                href={siteConfig.emailHref}
                className="mt-1 block break-words text-sm font-semibold text-navy transition-colors hover:text-green"
              >
                {siteConfig.email}
              </a>
              <p className="mt-1 text-sm text-muted">
                We reply within one working day.
              </p>
            </div>
          </div>
        </AnimatedStack>
      </Container>
    </Section>
  );
}
