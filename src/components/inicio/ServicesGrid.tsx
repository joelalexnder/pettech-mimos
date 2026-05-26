"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp, Reveal } from "./shared";

const services = [
  {
    img: "/images/hotel.webp",
    title: "Hospedaje Premium",
    desc: "Tu peludito duerme cómodo, seguro y feliz. Habitaciones individuales con cámaras en tiempo real.",
    accent: "#0ea5e9",
    tag: "Hotel",
    icon: "🏠",
  },
  {
    img: "/images/colegio.webp",
    title: "Colegio Canino",
    desc: "Entrenamiento positivo con expertos. Tu perro aprende modales, obediencia y socialización.",
    accent: "#8b5cf6",
    tag: "Educación",
    icon: "🎓",
  },
  {
    img: "/images/grooming.webp",
    title: "Peluquería & Spa",
    desc: "Baño, corte, hidratación y perfume. Deja que tu mascota luzca increíble con nuestros expertos.",
    accent: "#ec4899",
    tag: "Grooming",
    icon: "✂️",
  },
  {
    img: "/images/probador.webp",
    title: "Probador IA",
    desc: "Visualiza estilos y accesorios en tu mascota con inteligencia artificial. Primera en Perú.",
    accent: "#f59e0b",
    tag: "Tecnología",
    icon: "🤖",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <FadeUp>
              <span className="text-xs font-black text-orange-500 uppercase tracking-[0.22em] mb-4 block">
                Lo que ofrecemos
              </span>
            </FadeUp>
            <Reveal>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-slate-900 tracking-tighter leading-none">
                Todo para
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-orange-500 tracking-tighter leading-none">
                tu mascota
              </h2>
            </Reveal>
          </div>
          <FadeUp delay={0.2}>
            <p className="text-slate-400 text-base max-w-sm leading-relaxed">
              Servicios diseñados con amor, experiencia y la mejor tecnología para
              que tu compañero esté siempre en las mejores condiciones.
            </p>
          </FadeUp>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              {/* hover:-translate-y-2.5 reemplaza whileHover y:-10 */}
              <div className="group bg-white rounded-[1.8rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-transparent hover:-translate-y-2.5 transition-all duration-300">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    quality={80}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-10">
                    {s.tag}
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-lg shadow z-10">
                    {s.icon}
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to top, ${s.accent}cc, transparent)` }} />
                </div>

                <div className="p-6">
                  <h3 className="font-black text-slate-900 text-lg mb-2 group-hover:translate-x-1 transition-transform duration-300">
                    {s.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                  {/* Esta línea sí mantiene motion porque depende del viewport */}
                  <motion.div
                    className="h-0.5 rounded-full mt-5 origin-left"
                    style={{ background: s.accent }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="text-center mt-14">
          {/* hover:scale-104 reemplaza whileHover scale */}
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 px-9 py-4 border-2 border-slate-900 text-slate-900 font-black rounded-full text-sm uppercase tracking-wider hover:bg-slate-900 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Ver todos los servicios →
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}