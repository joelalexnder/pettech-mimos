import { WalkingPaws, ScrollBar } from "@/components/inicio/shared";
import Hero from "@/components/inicio/Hero";
import Metrics from "@/components/inicio/Metrics";
import ServicesGrid from "@/components/inicio/ServicesGrid";
import Benefits from "@/components/inicio/Benefits";
import ProcessSteps from "@/components/inicio/ProcessSteps";
import Testimonials from "@/components/inicio/Testimonials";
import Faqs from "@/components/inicio/Faqs";
import FinalCta from "@/components/inicio/FinalCta";

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