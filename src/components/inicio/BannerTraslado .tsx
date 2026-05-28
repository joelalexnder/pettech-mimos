"use client";

import Image from "next/image";
import { FadeUp, Reveal } from "./shared";

export default function BannerTraslado() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 md:py-24">

      <div className="absolute inset-0">
        <Image
          src="/mimos-pet-club-traslado.webp"
          alt="Traslado gratis Mimos Pet Club"
          fill
          sizes="100vw"
          quality={70}
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-slate-950/20" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <FadeUp>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                </span>
                <span className="text-orange-400 text-xs font-black uppercase tracking-[0.2em]">
                  Oferta exclusiva · Solo clientes nuevos
                </span>
              </div>
            </FadeUp>

            <Reveal>
              <h2 className="text-white font-black tracking-tighter leading-[0.9] text-[clamp(3rem,7vw,6rem)] mb-6">
                Primera
                <br />
                <span className="text-orange-400">vez gratis</span>
              </h2>
            </Reveal>

            <FadeUp delay={0.1}>
              <p className="text-white/60 text-lg leading-relaxed max-w-md mb-8">
                Recogemos a tu mascota, la mimamos y te la devolvemos
                feliz y limpia. Sin importar si estás lejos o no puedes traerla.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  { icon: "🚗", text: "Recojo sin costo" },
                  { icon: "⭐", text: "Servicio premium" },
                  { icon: "🤝", text: "Trato transparente" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-2 text-white/80 text-sm font-semibold"
                  >
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <a
                href="https://wa.me/51952189680?text=Hola!%20Soy%20cliente%20nuevo%20y%20quiero%20el%20traslado%20gratis%20%F0%9F%90%BE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-black rounded-2xl text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl shadow-orange-500/30 group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Reservar traslado gratis
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </FadeUp>
          </div>

          <FadeUp delay={0.15} className="lg:justify-self-end w-full max-w-sm mx-auto lg:mx-0">
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 overflow-hidden">

              {/* Brillo decorativo */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-500/20 blur-2xl pointer-events-none" />

              <div className="relative">
                {/* Número grande decorativo */}
                <div className="text-[7rem] font-black leading-none text-white/5 select-none absolute -top-4 -right-2">
                  1°
                </div>

                <div className="text-4xl mb-5">🐾</div>

                <h3 className="text-white font-black text-xl mb-2">
                  Tu primera cita incluye:
                </h3>
                <p className="text-white/40 text-sm mb-6">
                  Sin letra chica. Sin sorpresas.
                </p>

                <ul className="space-y-3">
                  {[
                    "Recojo y devolución a domicilio",
                    "Servicio completo de grooming",
                    "Fotos y videos por WhatsApp",
                    "Informe de salud básico",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                      <span className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 text-xs flex-shrink-0">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-white/30 text-xs">Costo de traslado</p>
                    <p className="text-white font-black text-lg line-through decoration-orange-400">S/ 15.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/30 text-xs">Precio para ti hoy</p>
                    <p className="text-orange-400 font-black text-2xl">GRATIS</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
