"use client";

import { motion } from "framer-motion";
import { FadeUp, Reveal } from "./shared";

const beneficios = [
  { icon: "🔒", title: "Seguridad garantizada", desc: "Instalaciones cerradas, personal capacitado y cámaras 24/7 en todo momento." },
  { icon: "❤️", title: "Trato personalizado", desc: "Cada mascota es única y recibe atención individual según su personalidad." },
  { icon: "📱", title: "Actualizaciones constantes", desc: "Fotos y videos de tu peludito en tiempo real directo a tu WhatsApp." },
  { icon: "🌿", title: "Productos naturales", desc: "Solo productos sin químicos agresivos, seguros para todas las razas." },
  { icon: "🏆", title: "Especialistas certificados", desc: "Equipo capacitado con certificaciones nacionales e internacionales." },
  { icon: "💳", title: "Sin costos ocultos", desc: "Precios claros desde el inicio. Lo que cotizamos es lo que pagas." },
];

export default function Benefits() {
  return (
    <section className="py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
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
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-orange-400 tracking-tighter leading-none">
              una familia
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {beneficios.map((b, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, borderColor: "rgba(249,115,22,0.4)" }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:bg-white/8 group"
              >
                <div className="text-3xl mb-5">{b.icon}</div>
                <h3 className="font-black text-white text-lg mb-3 group-hover:text-orange-400 transition-colors duration-300">{b.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="mt-20">
          <div className="relative rounded-3xl overflow-hidden h-72 md:h-96">
            <div className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(https://i.pinimg.com/1200x/62/93/c4/6293c4fe49e40d579614e2c67dcc1a38.jpg)" }} />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
            <div className="absolute inset-0 flex items-center px-12 md:px-20">
              <div className="max-w-lg">
                <Reveal>
                  <p className="text-white text-3xl md:text-4xl font-black tracking-tight leading-tight">
                    El pet club favorito de Tacna
                  </p>
                </Reveal>
                <FadeUp delay={0.2}>
                  <p className="text-white/50 mt-4 text-base">
                    Reconocidos por cientos de familias peruanas que confían en nosotros.
                  </p>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <motion.a
                    href="https://wa.me/51910918802"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 text-white font-black rounded-full text-sm"
                  >
                    Visítanos →
                  </motion.a>
                </FadeUp>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}