"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Plain <img> with a runtime safety net: if the source fails to load (e.g. an
 * asset download failed and no placeholder was written), it swaps to an
 * on-brand CSS gradient so the layout never shows a broken image.
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

    // NB: no hardcoded `relative` here — callers pass `absolute inset-0` etc.
  // and Tailwind's `.relative` would otherwise win the cascade over it.
  return (
    <div className={cn("h-full w-full overflow-hidden", className)}>
      {failed ? (
        <div className="brand-gradient h-full w-full" aria-label={alt} role="img" />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
