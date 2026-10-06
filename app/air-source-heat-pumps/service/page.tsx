import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/content";

export const metadata: Metadata = {
  title: servicePages["/air-source-heat-pumps/service"].title,
  description: servicePages["/air-source-heat-pumps/service"].intro.body.slice(0, 150),
};

export default function Page() {
  return <ServicePageTemplate page={servicePages["/air-source-heat-pumps/service"]} />;
}
