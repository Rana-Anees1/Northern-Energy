/* ---------------------------------------------------------------------------
 * Fallback reviews for the on-site reviews section.
 *
 * The live Trustpilot feed takes over automatically as soon as
 * NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID is set (Trustpilot Business account
 * -> Integrations -> TrustBox). These cards only render until then, so the
 * section always looks complete rather than showing an empty widget.
 *
 * ⚠️ THESE ARE ILLUSTRATIVE SAMPLES, NOT REAL CUSTOMERS. They are written as
 * generic, plainly-placeholder entries and MUST be replaced with genuine
 * reviews (or superseded by the live feed) before launch. Do not present them
 * to visitors as real testimonials.
 *
 * To swap in real ones: replace the array below with quotes from the client's
 * actual Trustpilot/Google profile, keeping the same shape. Better still, set
 * the business unit id and let the live feed handle it.
 * ------------------------------------------------------------------------ */

export interface Review {
  /** Reviewer display name. */
  name: string;
  /** Town/city, shown after the name. */
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  /** Human-readable date, e.g. "March 2026". */
  date: string;
}

export const placeholderReviews: Review[] = [
  {
    name: "Sample review",
    location: "Redcar",
    rating: 5,
    title: "Solar and battery install",
    body: "Placeholder entry showing how a customer review appears in this section. Replace with a genuine review, or set the Trustpilot business unit id so the live feed takes over.",
    date: "Sample",
  },
  {
    name: "Sample review",
    location: "Middlesbrough",
    rating: 5,
    title: "Air source heat pump",
    body: "Placeholder entry showing how a customer review appears in this section. Replace with a genuine review, or set the Trustpilot business unit id so the live feed takes over.",
    date: "Sample",
  },
  {
    name: "Sample review",
    location: "Bathgate",
    rating: 5,
    title: "Showroom visit",
    body: "Placeholder entry showing how a customer review appears in this section. Replace with a genuine review, or set the Trustpilot business unit id so the live feed takes over.",
    date: "Sample",
  },
  {
    name: "Sample review",
    location: "Stockton-on-Tees",
    rating: 5,
    title: "EV charger fitted",
    body: "Placeholder entry showing how a customer review appears in this section. Replace with a genuine review, or set the Trustpilot business unit id so the live feed takes over.",
    date: "Sample",
  },
];
