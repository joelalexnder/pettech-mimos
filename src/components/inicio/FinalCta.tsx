"use client";

import Link from "next/link";
import { FadeUp, Reveal } from "./shared";

export default function FinalCta() {
  return (
    <section className="relative py-40 overflow-hidden bg-[#fdfbf7] text-center">
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="absolute text-slate-200 select-none pointer-events-none animate-float"
          style={{
            left: `${8 + i * 12}%`,
            top: `${10 + (i % 4) * 25}%`,
            fontSize: `${1.5 + (i % 3) * 0.7}rem`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3.5 + i * 0.4}s`,
          }}
        >
          🐾
        </span>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <Reveal>
          <h2 className="text-[clamp(3rem,10vw,7rem)] font-black text-slate-900 tracking-tighter leading-none">
            ¿Listo para
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-[clamp(3rem,10vw,7rem)] font-black text-orange-500 tracking-tighter leading-none">
            consentirlos?
          </h2>
        </Reveal>

        <FadeUp delay={0.3}>
          <p className="text-slate-400 text-lg mt-8 mb-12 max-w-xl mx-auto">
            Reserva hoy y deja que tu mascota viva la experiencia Mimos Pet Club.
            El primer servicio incluye una evaluación gratuita.
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/51910918802?text=Hola!%20Quiero%20agendar%20un%20servicio%20en%20Mimos%20Pet%20Club"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-orange-500 text-white font-black rounded-full text-base uppercase tracking-wider shadow-2xl shadow-orange-500/30 hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-200"
            >
              📅 Agendar ahora por WhatsApp
            </a>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-slate-900 text-slate-900 font-black rounded-full text-base uppercase tracking-wider hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-200"
            >
              🐾 Ver servicios
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}