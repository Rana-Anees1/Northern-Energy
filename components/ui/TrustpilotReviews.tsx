"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/siteConfig";
import { placeholderReviews } from "@/lib/reviews";
import { cn } from "@/lib/cn";

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void };
  }
}

const SCRIPT_SRC =
  "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";

/** Trustpilot's "Review Carousel" TrustBox template. */
const TEMPLATE_ID = "53aa8912dec7e10d38f59f36";

/** Trustpilot-style green star row. */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={cn(
            "flex h-6 w-6 items-center justify-center",
            i < rating ? "bg-[#00B67A]" : "bg-black/10",
          )}
        >
          <Star className="h-3.5 w-3.5 text-white" fill="currentColor" strokeWidth={0} aria-hidden />
        </span>
      ))}
    </span>
  );
}

/**
 * Live Trustpilot reviews rendered ON the page.
 *
 * Client feedback: reviews must display on-site, never as a "read our reviews
 * on Trustpilot" link that sends visitors away ("nobody clicks off and comes
 * back"). The widget needs the business unit id from the client's Trustpilot
 * Business account (Integrations -> TrustBox); set it as
 * NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID.
 *
 * Until that id exists we render sample cards from lib/reviews.ts so the
 * section keeps its full shape instead of collapsing to an empty widget. Those
 * cards are plainly labelled samples and must be swapped for real reviews (or
 * superseded by the live feed) before launch.
 */
export function TrustpilotReviews({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const businessUnitId = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID ?? "";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !businessUnitId || !ref.current) return;

    const load = () => {
      if (ref.current) window.Trustpilot?.loadFromElement(ref.current, true);
    };

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (existing) {
      load();
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = load;
    document.head.appendChild(script);
  }, [mounted, businessUnitId]);

  if (!businessUnitId) {
    return (
      <div className={className}>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {placeholderReviews.map((review, i) => (
            <li key={`${review.name}-${review.title}`}>
              <Reveal delay={i * 0.06}>
                <figure className="flex h-full flex-col rounded-xl bg-white p-6 shadow-soft ring-1 ring-black/5">
                  <Stars rating={review.rating} />
                  <figcaption className="mt-4 font-semibold text-navy">
                    {review.title}
                  </figcaption>
                  <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {review.body}
                  </blockquote>
                  <p className="mt-4 text-xs text-muted">
                    <span className="font-semibold text-navy">{review.name}</span>
                    , {review.location} &middot; {review.date}
                  </p>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
          <Star className="h-4 w-4 text-[#00B67A]" fill="currentColor" strokeWidth={0} aria-hidden />
          Rated <span className="font-semibold text-navy">Excellent</span> by our
          customers on Trustpilot
        </p>
      </div>
    );
  }

  // Reserve the height before hydration so the section does not jump.
  if (!mounted) return <div className={cn("min-h-[240px]", className)} aria-hidden />;

  return (
    <div
      ref={ref}
      className={cn("trustpilot-widget", className)}
      data-locale="en-GB"
      data-template-id={TEMPLATE_ID}
      data-businessunit-id={businessUnitId}
      data-style-height="240px"
      data-style-width="100%"
      data-theme="light"
      data-stars="4,5"
      data-review-languages="en"
    >
      {/* Replaced by the widget once it hydrates. */}
      <a href={siteConfig.trustpilotUrl} target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
}
