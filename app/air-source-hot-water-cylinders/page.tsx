import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/content";

export const metadata: Metadata = {
  title: servicePages["/air-source-hot-water-cylinders"].title,
  description: servicePages["/air-source-hot-water-cylinders"].intro.body.slice(0, 150),
};

export default function Page() {
  return <ServicePageTemplate page={servicePages["/air-source-hot-water-cylinders"]} />;
}
