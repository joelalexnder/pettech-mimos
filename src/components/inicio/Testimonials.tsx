"use client";

import { FadeUp, Reveal } from "./shared";

//testimonios users

const testimonios = [
  {
    name: "María García",
    pet: "Dueña de Rocky 🐕",
    text: "Mimos Pet Club transformó a Rocky completamente. Las cámaras 24/7 me dan una tranquilidad increíble. Llega a casa siempre feliz y limpio.",
    rating: 5,
    avatar: "MG",
    color: "bg-orange-500",
  },
  {
    name: "José Pérez",
    pet: "Papá de Luna 🐩",
    text: "El colegio canino es otro nivel. En 4 semanas Luna pasó de ser muy ansiosa a un perro completamente equilibrado. Carlos es un crack.",
    rating: 5,
    avatar: "JP",
    color: "bg-sky-500",
  },
  {
    name: "Lucía Ramos",
    pet: "Dueña de Max y Coco 🐈",
    text: "El probador de IA es una genialidad — vi exactamente cómo quedaría el corte antes. Valentina es una artista. Nunca más iré a otro groomer.",
    rating: 5,
    avatar: "LR",
    color: "bg-violet-500",
  },
  {
    name: "Andrea Soto",
    pet: "Mamá de Beto 🐶",
    text: "Hospedé a Beto 10 días y fue como un hotel 5 estrellas para él. Me enviaban fotos cada día. Regresa tranquilo y feliz siempre.",
    rating: 5,
    avatar: "AS",
    color: "bg-pink-500",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <FadeUp>
            <span className="text-xs font-black text-orange-500 uppercase tracking-[0.22em] mb-4 block">Testimonios</span>
          </FadeUp>
          <Reveal>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-slate-900 tracking-tighter">
              Lo que dicen las familias
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonios.map((t, i) => (
            <FadeUp key={i} delay={i * 0.09}>
              {/* hover:-translate-y-2 reemplaza whileHover y:-8 */}
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-7 hover:border-orange-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <span key={si} className="text-orange-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-7 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-sm">{t.name}</div>
                    <div className="text-slate-400 text-xs">{t.pet}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}