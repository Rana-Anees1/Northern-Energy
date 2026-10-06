import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/content";

export const metadata: Metadata = {
  title: servicePages["/battery-storage"].title,
  description: servicePages["/battery-storage"].intro.body.slice(0, 150),
};

export default function Page() {
  return <ServicePageTemplate page={servicePages["/battery-storage"]} />;
}
