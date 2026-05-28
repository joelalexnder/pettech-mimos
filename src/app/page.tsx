
import type { Metadata } from "next";
import dynamic from "next/dynamic";



import { ScrollBar } from "@/components/inicio/shared";
import WalkingPaws from "@/components/WalkingPaws"; 
import Hero from "@/components/inicio/Hero";
import Metrics from "@/components/inicio/Metrics";
import BannerTraslado from "@/components/inicio/BannerTraslado ";

const ServicesGrid = dynamic(() => import("@/components/inicio/ServicesGrid"));
const Benefits = dynamic(() => import("@/components/inicio/Benefits"));
const ProcessSteps = dynamic(() => import("@/components/inicio/ProcessSteps"));
const Testimonials = dynamic(() => import("@/components/inicio/Testimonials"));
const Faqs = dynamic(() => import("@/components/inicio/Faqs"));
const FinalCta = dynamic(() => import("@/components/inicio/FinalCta"));

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
    <main className="overflow-hidden bg-[#fdfbf7]">
      <WalkingPaws />
      <ScrollBar />
      <Hero />
      <Metrics />
      <BannerTraslado />

      <ServicesGrid />
      <Benefits />
      <ProcessSteps />
      <Testimonials />
      <Faqs />
      <FinalCta />
    </main>
  );
}