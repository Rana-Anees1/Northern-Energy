import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/content";

export const metadata: Metadata = {
  title: servicePages["/infrared-radiators"].title,
  description: servicePages["/infrared-radiators"].intro.body.slice(0, 150),
};

export default function Page() {
  return <ServicePageTemplate page={servicePages["/infrared-radiators"]} />;
}
