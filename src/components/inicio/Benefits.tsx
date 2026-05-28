"use client";

import Image from "next/image";
import { FadeUp, Reveal } from "./shared";

const beneficios = [
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Seguridad garantizada",
    desc: "Instalaciones cerradas, personal capacitado y cámaras 24/7 en todo momento.",
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Trato personalizado",
    desc: "Cada mascota es única y recibe atención individual según su personalidad.",
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: "Actualizaciones constantes",
    desc: "Fotos y videos de tu peludito en tiempo real directo a tu WhatsApp.",
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: "Especialistas certificados",
    desc: "Equipo capacitado con certificaciones nacionales e internacionales.",
  },
];

export default function Benefits() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/familia.webp"
          alt="Mimos Pet Club Tacna"
          fill
          sizes="100vw"
          quality={70}
          className="object-cover object-center"
          priority={false}
        />
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-transparent to-slate-950/50" />
      </div>

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <FadeUp>
            <span className="text-xs font-black text-orange-500 uppercase tracking-[0.22em] mb-4 block">
              ¿Por qué elegirnos?
            </span>
          </FadeUp>
          <Reveal>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white tracking-tighter leading-none">
              Más que un servicio,
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-orange-500 tracking-tighter leading-none">
              una familia
            </h2>
          </Reveal>
          <FadeUp delay={0.2}>
            <p className="text-white/60 text-lg mt-6 max-w-lg mx-auto leading-relaxed">
              Cada detalle está pensado para que confíes en nosotros con lo más importante: tu mascota.
            </p>
          </FadeUp>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {beneficios.map((b, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="relative bg-white/[0.03] border border-white/[0.08] backdrop-blur-md rounded-[2rem] p-8 lg:p-10 hover:-translate-y-2 hover:bg-white/[0.06] hover:border-orange-500/30 transition-all duration-500 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-orange-500/0 group-hover:from-orange-500/10 transition-colors duration-500" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-orange-500/0 group-hover:shadow-orange-500/20">
                    {b.icon}
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-white text-xl mb-3 tracking-tight group-hover:text-orange-400 transition-colors duration-300">
                      {b.title}
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed font-medium">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4} className="mt-20">
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-10 py-10 lg:px-14">
              <div>
                <Reveal>
                  <p className="text-white text-2xl md:text-3xl font-black tracking-tight leading-tight">
                    El pet club favorito de Tacna
                  </p>
                </Reveal>
                <FadeUp delay={0.1}>
                  <p className="text-white/60 mt-3 text-base">
                    Reconocidos por cientos de familias peruanas que confían en nosotros.
                  </p>
                </FadeUp>
              </div>
              <FadeUp delay={0.2} className="shrink-0">
                <a
                  href="https://wa.me/51952189680"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-bold rounded-full text-base hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-orange-500/20"
                >
                  Visítanos →
                </a>
              </FadeUp>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}