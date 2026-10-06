"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { SmartImage } from "@/components/ui/SmartImage";

/**
 * Autoplaying, muted, looping background video with graceful degradation:
 * if the video errors, it falls back to its poster image (which itself falls
 * back to the brand gradient via SmartImage).
 */
export function SmartVideo({
  src,
  poster,
  alt,
  className,
  videoClassName,
}: {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
  videoClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("h-full w-full overflow-hidden", className)}>
      {failed ? (
        poster ? (
          <SmartImage src={poster} alt={alt} priority />
        ) : (
          <div className="brand-gradient h-full w-full" aria-label={alt} role="img" />
        )
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={alt}
          onError={() => setFailed(true)}
          className={cn("h-full w-full object-cover", videoClassName)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
