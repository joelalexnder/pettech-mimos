"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp, Reveal } from "./shared";

const services = [
  {
    img: "/images/veterinaria-mimos-pet-club.webp",
    title: "Veterinaria",
    desc: "Consultas, vacunas, desparasitación y emergencias. Tu mascota en manos de médicos veterinarios certificados.",
    accent: "#ef4444",
    tag: "Salud",
    icon: "🩺",
    highlight: false,
  },
  {
    img: "/images/hotel.webp",
    title: "Hotel & Hospedaje",
    desc: "Habitaciones individuales con cámaras en tiempo real. Tu peludito duerme cómodo, seguro y feliz.",
    accent: "#0ea5e9",
    tag: "Hospedaje",
    icon: "🏠",
    highlight: false,
  },
  {
    img: "/images/guarderia-canina-mimos-pet-club.webp",
    title: "Guardería Canina",
    desc: "Cuida y socializa a tu perro durante el día. Actividades, juego supervisado y mucho amor.",
    accent: "#10b981",
    tag: "Guardería",
    icon: "🐾",
    highlight: false,
  },
  {
    img: "/images/colegio.webp",
    title: "Colegio Canino",
    desc: "Entrenamiento positivo con expertos. Tu perro aprende modales, obediencia y socialización.",
    accent: "#8b5cf6",
    tag: "Educación",
    icon: "🎓",
    highlight: false,
  },
  {
    img: "/images/grooming.webp",
    title: "Grooming & Baño",
    desc: "Baño, corte, hidratación y perfume. Deja que tu mascota luzca increíble con nuestros expertos.",
    accent: "#ec4899",
    tag: "Grooming",
    icon: "✂️",
    highlight: false,
  },
  {
    img: "/images/tienda-de-mascotas.webp",
    title: "Pet Shop",
    desc: "Alimentos, accesorios, ropa y juguetes premium. Todo lo que tu mascota necesita en un solo lugar.",
    accent: "#f59e0b",
    tag: "Tienda",
    icon: "🛍️",
    highlight: false,
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-orange-50 blur-3xl opacity-60" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-sky-50 blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <FadeUp>
              <span className="text-xs font-black text-orange-500 uppercase tracking-[0.22em] mb-4 block">
                Nuestros servicios
              </span>
            </FadeUp>
            <Reveal>
              <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-black text-slate-900 tracking-tighter leading-none">
                Todo para
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-black text-orange-500 tracking-tighter leading-none">
                tu mascota
              </h2>
            </Reveal>
          </div>
          <FadeUp delay={0.2} className="max-w-sm">
            <p className="text-slate-400 text-base leading-relaxed mb-5">
              Servicios diseñados con amor y la mejor tecnología para que tu compañero esté siempre en las mejores condiciones.
            </p>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-sm font-black text-orange-500 hover:text-orange-600 transition-colors group"
            >
              Ver todos los servicios
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </FadeUp>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <Link href="/servicios" className="block group h-full">
                <div className="relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">

                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={80}
                      className="object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: `linear-gradient(to top, ${s.accent}bb, transparent 60%)` }}
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-10 shadow-sm">
                      {s.tag}
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center text-lg shadow-sm z-10">
                      {s.icon}
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                      <span className="bg-white text-slate-900 text-xs font-black px-4 py-2 rounded-full shadow-lg">
                        Ver servicio →
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-black text-slate-900 text-lg mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      {s.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1">{s.desc}</p>

                    <motion.div
                      className="h-0.5 rounded-full mt-5 origin-left"
                      style={{ background: s.accent }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                    />
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="text-center mt-14">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-black rounded-full text-sm uppercase tracking-wider hover:bg-orange-500 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-slate-900/20"
          >
            <span>Conoce todos nuestros servicios</span>
            <span className="text-base">→</span>
          </Link>
        </FadeUp>

      </div>
    </section>
  );
}
