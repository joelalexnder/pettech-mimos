"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, Reveal } from "./shared";

const faqs = [
  {
    q: "¿Cuánto tiempo dura el servicio de grooming?",
    a: "Depende de la raza y el servicio elegido. En promedio, el baño y corte toma entre 2 y 4 hours. Te avisamos cuando esté listo vía WhatsApp.",
  },
  {
    q: "¿Puedo ver a mi mascota en las cámaras desde casa?",
    a: "Sí. Una vez que dejas a tu mascota en el hospedaje, te compartimos acceso a las cámaras en vivo para que los veas en cualquier momento.",
  },
  {
    q: "¿El primer servicio tiene costo?",
    a: "La evaluación inicial es completamente gratuita. En ella conocemos a tu mascota, su temperamento y sus necesidades específicas.",
  },
  {
    q: "¿Aceptan todas las razas y tamaños?",
    a: "Sí, trabajamos con todas las razas. Contamos con espacios y equipos adecuados para mascotas pequeñas, medianas y grandes.",
  },
  {
    q: "¿Qué pasa si mi mascota se enferma durante el hospedaje?",
    a: "Contamos con protocolo veterinario de emergencia y te contactamos inmediatamente ante cualquier novedad. La seguridad de tu mascota es nuestra prioridad.",
  },
];

export default function Faqs() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-32 bg-slate-950">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-20">
          <FadeUp>
            <span className="text-xs font-black text-orange-500 uppercase tracking-[0.22em] mb-4 block">
              Preguntas frecuentes
            </span>
          </FadeUp>
          <Reveal>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white tracking-tighter">
              Resolvemos tus dudas
            </h2>
          </Reveal>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-colors duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
                >
                  <span className="font-bold text-white text-sm md:text-base">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-orange-400 text-2xl font-light flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-7 pb-6 text-white/50 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}