import { Metadata } from "next";
import { SERVICES_DATA } from "./constants";
import ServiciosClientView from "./components/ServiciosClientView";
import BannerCarruselFondo from "@/components/BannerCarruselFondo";
import WalkingPaws from "@/components/WalkingPaws";
import { ScrollBar } from "@/components/inicio/shared";



export const metadata: Metadata = {
  title: "Servicios | Mimos Pet Club",
  description:
    "Descubre nuestros servicios en Tacna: Hospedaje, Colegio Canino con refuerzo positivo y Peluquería & Spa Canino.",
  keywords: [
    "Veterinaria",
    "Hospedaje canino",
    "Hotel de mascotas Tacna",
    "Colegio canino",
    "Peluqueria canina",
    "Spa de mascotas",
    "Mimos Pet Club servicios",
  ],
  openGraph: {
    title: "Servicios para Mascotas | Mimos Pet Club",
    description: "Cuidado experto, hospedaje y spa para tu mejor amigo.",
    images: [{ url: "/images/hero-servicios.webp", width: 1200, height: 630, alt: "Servicios Mimos Pet Club" }],
  },
};

export default function ServiciosPage() {
  return (

    <main className="overflow-x-hidden bg-[#fdfbf7]">
      <ScrollBar />

      <BannerCarruselFondo />

      <ServiciosClientView services={SERVICES_DATA} />

      <section className="relative py-32 overflow-hidden bg-[#fdfbf7] text-center">

        <style>{`
          @keyframes pawFall {
            0%   { transform: translateY(-80px) rotate(0deg);  opacity: 0; }
            10%  { opacity: 0.7; }
            90%  { opacity: 0.6; }
            100% { transform: translateY(110vh) rotate(25deg); opacity: 0; }
          }
          .paw-drop {
            position: absolute;
            top: -60px;
            animation: pawFall linear infinite;
            pointer-events: none;
            user-select: none;
            
            /* 🎨 FILTRO DE COLOR Y BRILLO:
              El primer drop-shadow define el color base (#38bdf8 = celeste sky-400).
              El segundo drop-shadow añade el resplandor difuminado (#0284c7 = azul sky-600). */
            filter: drop-shadow(0 0 0 #38bdf8) drop-shadow(0 0 4px #0284c7);
          }
        `}</style>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { left: "5%",  size: "22px", duration: "6s",   delay: "0s"   },
            { left: "15%", size: "18px", duration: "8s",   delay: "1.2s" },
            { left: "28%", size: "28px", duration: "7s",   delay: "0.5s" },
            { left: "40%", size: "16px", duration: "9s",   delay: "2s"   },
            { left: "52%", size: "24px", duration: "6.5s", delay: "0.8s" },
            { left: "63%", size: "20px", duration: "8.5s", delay: "3s"   },
            { left: "74%", size: "30px", duration: "7.5s", delay: "1.5s" },
            { left: "83%", size: "18px", duration: "6s",   delay: "2.5s" },
            { left: "91%", size: "26px", duration: "9s",   delay: "0.3s" },
            { left: "97%", size: "20px", duration: "7s",   delay: "4s"   },
          ].map((p, i) => (
            <span
              key={i}
              className="paw-drop"
              style={{
                left: p.left,
                fontSize: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="text-sky-400"
                style={{ width: p.size, height: p.size }}
              >
                <path d="M12 14c-1.66 0-3 1.34-3 3 0 2 2 3.5 3 4.5 1-1 3-2.5 3-4.5 0-1.66-1.34-3-3-3zm-4.5-3c-1.1 0-2 .9-2 2s1.5 2 2 3c.5-1 2-2 2-3s-.9-2-2-2zm9 0c-1.1 0-2 .9-2 2s1.5 2 2 3c.5-1 2-2 2-3s-.9-2-2-2zm-7.5-3C8.12 8 7.37 8.5 7 9c-.56.75-.38 1.81.38 2.38.75.56 1.81.38 2.38-.38.5-.62 1.25-.5 1.74 0 .56.76 1.62.94 2.38.38.76-.57.94-1.63.38-2.38-.37-.5-1.12-1-2-.12V8z"/>
              </svg>
            </span>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-125 h-125 rounded-full bg-sky-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">

          <span className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-600 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8">
            🐶 ¿Listo para reservar?
          </span>

          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-slate-900 tracking-tighter leading-none mb-6">
            ¿Listo para consentir
            <span className="text-sky-500"> a tu mascota?</span>
          </h2>

          <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Escríbenos directamente por WhatsApp. Nuestro equipo agendará la reserva ideal
            para cubrir las necesidades específicas de tu engreído.
          </p>

          <a
            href="https://wa.me/51952189680?text=Hola!%20Quisiera%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Mimos%20Pet%20Club%20%F0%9F%90%BE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-12 py-5 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-full shadow-xl shadow-sky-500/25 transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none"
          >
            💬 Consultar por WhatsApp
          </a>
        </div>
      </section>

      <WalkingPaws />
    </main>
  );
}