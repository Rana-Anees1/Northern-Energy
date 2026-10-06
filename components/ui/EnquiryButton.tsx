"use client";

import { useEnquiry } from "@/components/providers/EnquiryProvider";
import { Button } from "@/components/ui/Button";

/**
 * Client button that opens the global enquiry modal. Lets server components
 * (pages, templates) drop in a quote/enquiry CTA without becoming client
 * components themselves.
 */
export function EnquiryButton({
  label = "Get a quote",
  prefillType,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  label?: string;
  prefillType?: string;
  variant?: "primary" | "navy" | "outline" | "outlineLight" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}) {
  const { openEnquiry } = useEnquiry();
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => openEnquiry(prefillType)}
    >
      {children ?? label}
    </Button>
  );
}
