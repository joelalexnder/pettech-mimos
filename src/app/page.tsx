import type { Metadata } from "next";
import { WalkingPaws, ScrollBar } from "@/components/inicio/shared";
import Hero from "@/components/inicio/Hero";
import Metrics from "@/components/inicio/Metrics";
import ServicesGrid from "@/components/inicio/ServicesGrid";
import Benefits from "@/components/inicio/Benefits";
import ProcessSteps from "@/components/inicio/ProcessSteps";
import Testimonials from "@/components/inicio/Testimonials";
import Faqs from "@/components/inicio/Faqs";
import FinalCta from "@/components/inicio/FinalCta";

export const metadata: Metadata = {
  title: "Mimos Pet Club | Hospedaje y Grooming en Tacna",
  description:
    "Hospedaje premium, colegio canino, grooming y tecnología IA para mascotas en Tacna, Perú. Atención 7 días con cámaras en vivo.",
  keywords: ["pet club tacna", "hospedaje mascotas tacna", "grooming perú", "colegio canino tacna"],
  openGraph: {
    title: "Mimos Pet Club | Tacna, Perú",
    description: "El cuidado premium que tu mascota merece.",
    url: "https://mimospetclub.pe",
    siteName: "Mimos Pet Club",
    locale: "es_PE",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#fdfbf7] md:cursor-none">
      <WalkingPaws />
      <ScrollBar />
      <Hero />
      <Metrics />
      <ServicesGrid />
      <Benefits />
      <ProcessSteps />
      <Testimonials />
      <Faqs />
      <FinalCta />
    </main>
  );
}