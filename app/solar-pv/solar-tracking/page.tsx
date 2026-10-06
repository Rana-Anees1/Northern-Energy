import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/content";

export const metadata: Metadata = {
  title: servicePages["/solar-pv/solar-tracking"].title,
  description: servicePages["/solar-pv/solar-tracking"].intro.body.slice(0, 150),
};

export default function Page() {
  return <ServicePageTemplate page={servicePages["/solar-pv/solar-tracking"]} />;
}
