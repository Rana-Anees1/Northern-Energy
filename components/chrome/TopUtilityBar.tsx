import Link from "next/link";
import { Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export function TopUtilityBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-9 bg-navy text-white text-xs">
      {/* Gutters match the Navbar (px-4 sm:px-6 lg:px-8) so the two stacked
          fixed bars align their right edges. */}
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-end gap-4 px-4 sm:gap-5 sm:px-6 lg:px-8">
        <Link
          href={siteConfig.phoneHref}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-green focus-visible:text-green"
        >
          <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">{siteConfig.phone}</span>
          <span className="sr-only sm:hidden">Call us</span>
        </Link>

        <span aria-hidden="true" className="hidden h-4 w-px bg-white/10 sm:inline-block" />

        <Link
          href={siteConfig.emailHref}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-green focus-visible:text-green"
        >
          <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">{siteConfig.email}</span>
          <span className="sr-only sm:hidden">Email us</span>
        </Link>

        <span aria-hidden="true" className="h-4 w-px bg-white/10" />

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Northern Renewable Centre on Facebook"
            className="transition-colors hover:text-green focus-visible:text-green"
          >
            <Facebook className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={siteConfig.socials.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Northern Renewable Centre on X (Twitter)"
            className="transition-colors hover:text-green focus-visible:text-green"
          >
            <Twitter className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Northern Renewable Centre on LinkedIn"
            className="transition-colors hover:text-green focus-visible:text-green"
          >
            <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
