"use client";

import { motion } from "framer-motion";
import { FadeUp, Reveal } from "./shared";

const proceso = [
  { n: "01", title: "Reserva online", desc: "Agenda en segundos por WhatsApp o nuestra web. Confirmación inmediata.", icon: "📱" },
  { n: "02", title: "Llegada & check-in", desc: "Te recibimos con una evaluación gratuita de tu mascota para conocer sus necesidades.", icon: "🏥" },
  { n: "03", title: "Servicio premium", desc: "Nuestros especialistas cuidan a tu mascota con amor y los mejores productos.", icon: "⭐" },
  { n: "04", title: "Actualizaciones en vivo", desc: "Recibe fotos y videos en tiempo real directo a tu WhatsApp mientras trabajamos.", icon: "📸" },
  { n: "05", title: "Entrega & seguimiento", desc: "Mascota feliz, limpia y saludable. Seguimiento post-servicio incluido.", icon: "🎁" },
];

export default function ProcessSteps() {
  return (
    <section className="py-32 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <FadeUp>
            <span className="text-xs font-black text-orange-500 uppercase tracking-[0.22em] mb-4 block">Cómo funciona</span>
          </FadeUp>
          <Reveal>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-slate-900 tracking-tighter">
              Simple. Rápido. Premium.
            </h2>
          </Reveal>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-px bg-slate-200" />
          <motion.div
            className="hidden lg:block absolute top-[52px] left-[10%] h-px bg-linear-to-r from-orange-500 to-pink-400 origin-left"
            style={{ right: "10%" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {proceso.map((p, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-8">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className="w-[60px] h-[60px] rounded-2xl bg-slate-900 flex items-center justify-center text-2xl shadow-xl relative z-10 group-hover:bg-orange-500 transition-colors duration-300"
                    >
                      {p.icon}
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px] font-black z-20">
                      {p.n}
                    </div>
                  </div>
                  <h4 className="font-black text-slate-900 text-base mb-2">{p.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}