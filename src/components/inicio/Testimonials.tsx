"use client";

import { FadeUp, Reveal } from "./shared";

const testimonios = [
  {
    name: "María García",
    pet: "Dueña de Rocky 🐕",
    text: "Llevo a Rocky a su servicio de grooming y siempre regresa feliz. El trato es excelente y se nota que tienen mucha paciencia con él.",
    rating: 5,
    avatar: "MG",
    color: "bg-orange-500",
  },
  {
    name: "José Pérez",
    pet: "Papá de Luna 🐩",
    text: "El colegio canino nos ha ayudado bastante. Luna ahora pasea sin jalar la correa y socializa mucho mejor con otros perros.",
    rating: 5,
    avatar: "JP",
    color: "bg-sky-500",
  },
  {
    name: "Lucía Ramos",
    pet: "Dueña de Max y Coco 🐈",
    text: "Me encantó el probador virtual de la tienda. Pude ver cómo le quedaba la ropita a mis mascotas desde el celular antes de comprarla. Súper útil.",
    rating: 5,
    avatar: "LR",
    color: "bg-violet-500",
  },
  {
    name: "Andrea Soto",
    pet: "Mamá de Beto 🐶",
    text: "Dejamos a Beto en el hotel por unos días por un viaje familiar y todo salió muy bien. Nos enviaron fotos para saber cómo estaba.",
    rating: 5,
    avatar: "AS",
    color: "bg-pink-500",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-l from-orange-500 via-orange-400 to-transparent" />
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
            <FadeUp key={t.name} delay={i * 0.09}>
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-7 hover:border-orange-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <span key={si} className="text-orange-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-7 italic grow">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-black shrink-0`}>
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