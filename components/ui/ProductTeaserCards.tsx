import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { productBySlug } from "@/lib/content";
import { MediaTile } from "@/components/ui/MediaTile";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * Row of small product teaser cards, resolved from product slugs. Used at the
 * foot of service pages and on the Contact page.
 */
export function ProductTeaserCards({
  slugs,
  title,
  eyebrow,
  className,
}: {
  slugs: string[];
  title?: string;
  eyebrow?: string;
  className?: string;
}) {
  const products = slugs.map((s) => productBySlug[s]).filter(Boolean);
  if (products.length === 0) return null;

  return (
    <div className={cn("", className)}>
      {(title || eyebrow) && (
        <div className="mb-10 text-center">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          {title && (
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">{title}</h2>
          )}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <Reveal key={product.slug} delay={i * 0.08}>
            <Link
              href={product.route}
              className="group block h-full overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5 transition-shadow hover:shadow-card"
            >
              <MediaTile media={product.media} rounded={false} className="aspect-[4/3]" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy">{product.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                  {product.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green">
                  Discover more
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
