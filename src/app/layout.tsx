import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mimos Pet Club | Hotel, Colegio Canino & Peluquería en Lima",
  description:
    "El cuidado premium que tu mascota merece. Hospedaje, colegio canino, peluquería & spa y probador IA para mascotas en Lima, Perú.",
  keywords: ["hotel canino", "colegio canino Lima", "peluquería mascotas", "hospedaje perros Lima"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geist.className} antialiased bg-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
