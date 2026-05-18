import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PawCursor from "@/components/PawCursor"; // 🐾 Importamos el nuevo cursor automático

const geist = Geist({ subsets: ["latin"] });

// 🏢 METADATOS GENERALES DE LA MARCA (SEO GLOBAL)
export const metadata: Metadata = {
  title: "Mimos Pet Club | Hotel, Colegio Canino & Peluquería Premium",
  description:
    "El cuidado premium que tu mascota merece. Hospedaje, colegio canino, peluquería & spa y probador IA para mascotas en Lima, Perú.",
  keywords: ["hotel canino", "colegio canino Lima", "peluquería mascotas", "hospedaje perros Lima", "Mimos Pet Club"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geist.className} antialiased bg-white`}>
        {/* 🐾 El cursor ahora es global: afectará a la Navbar, Footer, Inicio y tus Servicios automáticamente */}
        <PawCursor />
        
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}