import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/content";

export const metadata: Metadata = {
  title: servicePages["/battery-storage/tesla-powerwall"].title,
  description: servicePages["/battery-storage/tesla-powerwall"].intro.body.slice(0, 150),
};

export default function Page() {
  return <ServicePageTemplate page={servicePages["/battery-storage/tesla-powerwall"]} />;
}
