import { Fragment } from "react";
import type { ProductItem } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { MediaTile } from "@/components/ui/MediaTile";
import { ProductTile } from "@/components/ui/ProductTile";
import { SpecStrip } from "@/components/ui/SpecStrip";
import { Reveal } from "@/components/ui/Reveal";

interface ProductGridProps {
  items: ProductItem[];
  idPrefix?: string;
}

/**
 * Clean editorial checkerboard reused twice on the home page. Each product is a
 * balanced media/text pairing followed by a full-bleed spec strip. Media always
 * leads in the DOM so it sits on top of its text on mobile; on lg+ the text is
 * pulled to the correct side via `lg:order` based on `mediaSide`.
 */
export function ProductGrid({ items, idPrefix }: ProductGridProps) {
  return (
    <>
      {items.map((product) => {
        const textLgOrder =
          product.mediaSide === "right" ? "lg:order-first" : "lg:order-none";
        const mediaLgOrder =
          product.mediaSide === "right" ? "lg:order-last" : "lg:order-none";
        const textPad =
          product.mediaSide === "right" ? "lg:pr-6 xl:pr-12" : "lg:pl-6 xl:pl-12";
        const mediaDirection = product.mediaSide === "right" ? "right" : "left";
        const textDirection = product.mediaSide === "right" ? "left" : "right";

        return (
          <Fragment key={product.slug}>
            <Container>
              <div className="grid grid-cols-1 items-center gap-8 py-12 lg:grid-cols-2 lg:gap-14 lg:py-16">
                <Reveal
                  direction={mediaDirection}
                  className={`order-first ${mediaLgOrder}`}
                >
                  <MediaTile
                    media={product.media}
                    className="aspect-[4/3] lg:aspect-[5/4]"
                  />
                </Reveal>
                <Reveal
                  direction={textDirection}
                  className={`${textLgOrder} ${textPad}`}
                >
                  <ProductTile
                    product={product}
                    id={`${idPrefix ?? ""}${product.slug}`}
                  />
                </Reveal>
              </div>
            </Container>
            <SpecStrip items={product.specStrip} />
          </Fragment>
        );
      })}
    </>
  );
}
