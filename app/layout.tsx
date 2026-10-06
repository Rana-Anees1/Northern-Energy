import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/lib/siteConfig";
import { EnquiryProvider } from "@/components/providers/EnquiryProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { TopUtilityBar } from "@/components/chrome/TopUtilityBar";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { BackToTop } from "@/components/chrome/BackToTop";
import { CookieBar } from "@/components/chrome/CookieBar";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.northernrenewablecentre.co.uk"),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Northern Renewable Centre installs solar PV, battery storage, air source heat pumps, EV chargers and infrared heating for homes and businesses across the North East of England and Scotland.",
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description:
      "Domestic & commercial renewable energy, solar, storage, heat pumps, EV chargers and more.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "any", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${heading.variable} ${body.variable}`}>
      <body>
        <EnquiryProvider>
          <SmoothScroll />
          <TopUtilityBar />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
          <CookieBar />
        </EnquiryProvider>
      </body>
    </html>
  );
}
