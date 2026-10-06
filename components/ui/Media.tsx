import type { MediaRef } from "@/lib/content";
import { SmartImage } from "@/components/ui/SmartImage";
import { SmartVideo } from "@/components/ui/SmartVideo";

/** Renders a MediaRef as either an image or an autoplaying background video. */
export function Media({
  media,
  className,
  priority = false,
}: {
  media: MediaRef;
  className?: string;
  priority?: boolean;
}) {
  if (media.type === "video") {
    return (
      <SmartVideo
        src={media.src}
        poster={media.poster}
        alt={media.alt}
        className={className}
      />
    );
  }
  return (
    <SmartImage
      src={media.src}
      alt={media.alt}
      className={className}
      priority={priority}
    />
  );
}
