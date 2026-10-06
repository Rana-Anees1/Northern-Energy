import { homeProductsTop, homeProductsBottom } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { IntroStatement } from "@/components/home/IntroStatement";
import { ProductRangeIntro } from "@/components/home/ProductRangeIntro";
import { ProductGrid } from "@/components/home/ProductGrid";
import { PartnerCTA } from "@/components/home/PartnerCTA";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { BenefitsBand } from "@/components/home/BenefitsBand";
import { SharedResponsibility } from "@/components/home/SharedResponsibility";
import { TailorSolution } from "@/components/home/TailorSolution";
import { BrandsMarquee } from "@/components/home/BrandsMarquee";
import { CaseStudies } from "@/components/home/CaseStudies";
import { Accreditations } from "@/components/home/Accreditations";
import { BlogCarousel } from "@/components/home/BlogCarousel";

/**
 * Home page — sections rendered top-to-bottom in the exact reference order:
 * Hero → IntroStatement → ProductRangeIntro → ProductGrid (1) → green Partner
 * band → ProductGrid (2) → Ecosystem → Benefits → Shared Responsibility →
 * Tailor/Finance → Brands → Case Studies → Accreditations → Partner (light) →
 * Blog carousel. (Navbar / Footer / BackToTop / CookieBar come from layout.)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <ProductRangeIntro />
      <ProductGrid items={homeProductsTop} idPrefix="product-" />
      <PartnerCTA variant="band" />
      <ProductGrid items={homeProductsBottom} idPrefix="product-" />
      <EcosystemSection />
      <BenefitsBand />
      <SharedResponsibility />
      <TailorSolution />
      <BrandsMarquee />
      <CaseStudies />
      <Accreditations />
      <PartnerCTA variant="light" />
      <BlogCarousel />
    </>
  );
}
