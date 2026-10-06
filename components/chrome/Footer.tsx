import Link from "next/link";
import {
  MapPin,
  Clock,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/siteConfig";
import { Logo } from "@/components/chrome/Logo";

const bottomLine =
  "© Northern Renewable Centre · " +
  siteConfig.company.registration +
  " | " +
  siteConfig.company.vat +
  " | " +
  siteConfig.company.ico +
  " | Registered Address: " +
  siteConfig.company.registeredAddress;

interface BranchCardProps {
  name: string;
  lines: string[];
  postcode: string;
}

function BranchCard({ name, lines, postcode }: BranchCardProps) {
  return (
    <div className="flex gap-2.5">
      <MapPin
        className="mt-0.5 h-4 w-4 shrink-0 text-green"
        aria-hidden="true"
      />
      <div>
        <p className="font-semibold text-white">{name}</p>
        <address className="not-italic text-sm leading-relaxed text-white/70">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block">{postcode}</span>
        </address>
      </div>
    </div>
  );
}

export function Footer() {
  const { branches, socials, partnerBadges, footerInfoLinks } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      {/* Decorative outlined leaf-house mark, behind content */}
      <svg
        className="pointer-events-none absolute -right-10 -bottom-16 h-72 w-72 text-white/5"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* House outline */}
        <path d="M20 50 L50 24 L80 50 V82 H20 Z" />
        {/* Leaf inside the house */}
        <path d="M40 72 C40 56 56 50 66 50 C66 66 50 72 40 72 Z" />
        <path d="M44 68 C50 62 58 58 64 56" />
      </svg>

      <Container className="relative z-10 py-16">
        {/* Brand block */}
        <div className="max-w-md">
          <Logo
            variant="light"
            height={64}
            className="max-w-sm sm:max-w-md lg:max-w-lg"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Helping homes and businesses across the UK switch to cleaner,
            lower-cost renewable energy, designed, supplied and installed by
            our own accredited team.
          </p>
        </div>

        {/* Three link columns */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* More Information */}
          <nav aria-label="More information">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              More Information
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerInfoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit Us */}
          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              Visit Us
            </h2>
            <div className="mt-4 space-y-5">
              <BranchCard
                name={branches.england.name}
                lines={branches.england.lines}
                postcode={branches.england.postcode}
              />
              <BranchCard
                name={branches.scotland.name}
                lines={branches.scotland.lines}
                postcode={branches.scotland.postcode}
              />
              <div className="flex items-center gap-2.5 text-sm text-white/70">
                <Clock
                  className="h-4 w-4 shrink-0 text-green"
                  aria-hidden="true"
                />
                <span>{siteConfig.hours}</span>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              Contact Us
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="flex items-center gap-2.5 text-sm text-white/80 transition-colors hover:text-green"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-green"
                    aria-hidden="true"
                  />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2.5 text-sm text-white/80 transition-colors hover:text-green"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-green"
                    aria-hidden="true"
                  />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Northern Renewable Centre on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-green hover:text-green"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={socials.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Northern Renewable Centre on X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-green hover:text-green"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Northern Renewable Centre on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-green hover:text-green"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Partner badge tiles */}
        <div className="mt-12 flex flex-wrap gap-3">
          {partnerBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-lg border border-white/20 px-4 py-2 text-xs font-medium text-white/80"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom line */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs text-white/60">{bottomLine}</p>
        </div>
      </Container>
    </footer>
  );
}
