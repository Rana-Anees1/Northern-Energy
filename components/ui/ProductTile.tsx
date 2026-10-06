import { ArrowRight } from "lucide-react";
import type { ProductItem } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Text side of a product pairing — a clean, left-aligned editorial block:
 * a green accent rule, navy title, muted description, a dot-separated badge
 * row, and a green "Discover more" button to the product route. Given an `id`
 * so the mega-menu can anchor to it on the home page.
 */
export function ProductTile({
  product,
  id,
  className,
}: {
  product: ProductItem;
  id?: string;
  className?: string;
}) {
  return (
    <div id={id} className={cn("flex flex-col justify-center", className)}>
      <span className="h-1 w-12 rounded-full bg-green" aria-hidden="true" />

      <h3 className="mt-6 text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[2.1rem]">
        {product.title}
      </h3>

      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        {product.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
        {product.badges.map((badge, i) => (
          <span key={badge} className="flex items-center gap-3">
            {i > 0 && (
              <span aria-hidden="true" className="text-green/50">
                ·
              </span>
            )}
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-navy/60">
              {badge}
            </span>
          </span>
        ))}
      </div>

      <Button href={product.route} variant="primary" className="mt-8 self-start">
        Discover more
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
