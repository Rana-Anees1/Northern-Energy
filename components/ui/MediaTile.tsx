import type { MediaRef } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";

/**
 * Full-bleed media side of a product pairing. Fills its grid cell, rounds
 * corners and zooms slightly on hover (group-hover from the parent).
 */
export function MediaTile({
  media,
  className,
  rounded = true,
}: {
  media: MediaRef;
  className?: string;
  rounded?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        rounded && "rounded-2xl",
        className,
      )}
    >
      <Media
        media={media}
        className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/10 to-transparent" />
    </div>
  );
}
