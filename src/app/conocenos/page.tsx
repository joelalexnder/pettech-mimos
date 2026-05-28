import type { Metadata } from "next";
import ConocenosClient from "./ConocenosClient";
import { ScrollBar } from "@/components/inicio/shared";

export const metadata: Metadata = {
  title: "Conócenos | Mimos Pet Club — Tacna",
  description:
    "Conoce al equipo de Mimos Pet Club: veterinarios, entrenadores y groomers certificados en Tacna. Más de 500 mascotas atendidas con amor desde 2022.",
  alternates: { canonical: "https://mimospetclub.pe/conocenos" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Conócenos | Mimos Pet Club",
    description:
      "El mejor espacio para el bienestar animal en Tacna. Tecnología, amor y especialistas certificados.",
    images: [{ url: "/mimos.webp", width: 1200, height: 630 }],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conócenos | Mimos Pet Club",
    description: "Veterinarios, entrenadores y groomers certificados en Tacna.",
    images: ["/mimos.webp"],
  },
};

export default function ConocenosPage() {
  return (
    <main>
      <ScrollBar />
      <ConocenosClient />
    </main>
  );
}
