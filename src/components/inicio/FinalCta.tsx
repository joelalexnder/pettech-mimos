"use client";

import { motion } from "framer-motion";
import { FadeUp, Reveal } from "./shared";

export default function FinalCta() {
  return (
    <section className="relative py-40 overflow-hidden bg-[#fdfbf7] text-center">
      {[...Array(8)].map((_, i) => (
        <motion.div key={i} className="absolute text-slate-200 select-none pointer-events-none"
          style={{ left: `${8 + i * 12}%`, top: `${10 + (i % 4) * 25}%`, fontSize: `${1.5 + (i % 3) * 0.7}rem` }}
          animate={{ y: [0, -14, 0], rotate: [`${-25 + i * 10}deg`, `${-10 + i * 10}deg`, `${-25 + i * 10}deg`] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        >
          🐾
        </motion.div>
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
            <motion.a
              href="https://wa.me/51910918802?text=Hola!%20Quiero%20agendar%20un%20servicio%20en%20Mimos%20Pet%20Club"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.06, y: -4 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-orange-500 text-white font-black rounded-full text-base uppercase tracking-wider shadow-2xl shadow-orange-500/30"
            >
              📅 Agendar ahora por WhatsApp
            </motion.a>
            <motion.a
              href="https://wa.me/51910918802?text=Hola!%20Quisiera%20saber%20cómo%20llegar%20a%20Mimos%20Pet%20Club"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.06, y: -4 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-slate-900 text-slate-900 font-black rounded-full text-base uppercase tracking-wider"
            >
              📍 Ver ubicación
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}