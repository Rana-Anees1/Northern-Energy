import { Check, Star } from "lucide-react";
import { images } from "@/lib/assets";
import { SmartImage } from "@/components/ui/SmartImage";
import { Container } from "@/components/ui/Container";
import { SolarLeadForm } from "@/components/solar/SolarLeadForm";

/**
 * Solar page hero: headline, intro, the six benefit bullets and a customer
 * rating badge on the left, with the lead form beside it on the right.
 *
 * This replaces the shared <PageBanner /> on this page only: the banner is a
 * full-bleed image with a centred title and has nowhere to put a form.
 */

/** Verbatim from the brief. */
const bullets = [
  "Get paid with the Smart-Export-Guarantee",
  "With or without battery storage",
  "In-roof or on-roof solutions available",
  "No deposits to pay",
  "0% VAT on installations",
  "All with a price match guarantee!",
];

export function SolarHero() {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      {/* Background photograph, dimmed so the copy and form stay legible. */}
      <SmartImage
        src={images.solarTracking}
        alt="Rows of solar panels catching the light"
        className="absolute inset-0"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/55" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_28rem] lg:gap-14">
          <div className="text-white">
            <p className="eyebrow">Generate</p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Solar Panel
              <br />
              Installations
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Looking to start your solar panel journey? You&apos;ve found the right
              place.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-white/70">
              We supply remote solar designs until you&apos;re ready for a survey.
              Leave your details in the box and one of our team will reach out to
              you the same day.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-2xl">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green text-white"
                  >
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-white/90">{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 inline-flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl bg-white/10 px-6 py-4 ring-1 ring-white/15 backdrop-blur-sm">
              <div>
                <p className="text-sm text-white/70">Recommended by</p>
                <p className="text-2xl font-bold text-white">
                  100% <span className="text-base font-semibold">of customers</span>
                </p>
              </div>
              <div className="h-10 w-px bg-white/20" aria-hidden />
              <div>
                <div className="flex items-center gap-1" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-green"
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-1 text-2xl font-bold text-white">5.0</p>
              </div>
            </div>
          </div>

          <SolarLeadForm />
        </div>
      </Container>
    </section>
  );
}
