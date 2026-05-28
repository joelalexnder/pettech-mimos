import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mimospetclub.com"), 
  
  title: {
    default: "Mimos Pet Club | Veterinaria, Hotel y Colegio Canino en Tacna",
    template: "%s | Mimos Pet Club", 
  },
  
  description:
    "El cuidado premium que tu mascota merece en Tacna. Especialistas en veterinaria canina, estética (baño y corte), hotel, colegio canino, venta de productos de mantenimiento y tecnología IA.",
  
  keywords: [
    "veterinaria canina Tacna",
    "estética canina Tacna", 
    "baño para perros", 
    "corte de pelo mascotas", 
    "productos para perros",
    "hotel canino", 
    "colegio canino Tacna", 
    "peluquería mascotas", 
    "hospedaje perros Tacna", 
    "Mimos Pet Club"
  ],

  openGraph: {
    title: "Mimos Pet Club | Estética y Cuidado Premium",
    description: "Baño, corte, hospedaje y colegio canino en Tacna. ¡Consiente a tu peludo con los mejores productos!",
    url: "https://mimospetclub.com",
    siteName: "Mimos Pet Club",
    images: [
      {
        url: "/mimos.webp", 
        width: 1200,
        height: 630,
        alt: "Instalaciones de Mimos Pet Club",
      },
    ],
    locale: "es_PE",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className={`${geist.className} antialiased bg-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}