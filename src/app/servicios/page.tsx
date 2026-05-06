"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const WA_NUMBER = "51910918802";

const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

const services = [
  {
    id: "hospedaje",
    image: "https://i.pinimg.com/1200x/21/7c/c8/217cc88c6f9d0e91ff841af767b98086.jpg",
    title: "Hospedaje Premium",
    tagline: "Tu peludito en casa, pero mejor",
    description:
      "Ofrecemos hospedaje cómodo, seguro y lleno de amor para tu mascota. Habitaciones individuales ambientadas, monitoreo 24/7 y actualizaciones constantes para que tú también estés tranquilo.",
    benefits: [
      "Habitaciones individuales con cama y colchón premium",
      "Cámaras en vivo accesibles desde tu celular",
      "Alimentación según las indicaciones del dueño",
      "Paseos diarios y tiempo de juego supervisado",
      "Personal capacitado disponible las 24 horas",
      "Reportes fotográficos cada día por WhatsApp",
    ],
    gradient: "from-sky-500 to-sky-700",
    lightBg: "from-sky-50 to-sky-100",
    accent: "text-sky-600",
    badge: "bg-sky-100 text-sky-700",
    border: "border-sky-200",
    waMessage: "Hola! Quiero reservar hospedaje para mi mascota en Mimos Pet Club 🐶",
    emoji: "🌙",
  },
  {
    id: "colegio",
    image: "https://i.pinimg.com/1200x/a4/2b/14/a42b14e8a8207d36d2a935e297f2ea4f.jpg",
    title: "Colegio Canino",
    tagline: "Un perro educado es un perro feliz",
    description:
      "Nuestro programa de entrenamiento positivo está diseñado para enseñarle a tu perro las habilidades sociales y de obediencia que necesita. Sin métodos agresivos, solo refuerzo positivo y mucho amor.",
    benefits: [
      "Clases grupales e individuales disponibles",
      "Entrenadores certificados con años de experiencia",
      "Técnicas de refuerzo positivo (sin castigos)",
      "Socialización con otros perros en ambiente seguro",
      "Control de conductas problemáticas (ladridos, saltos)",
      "Informe de progreso semanal para el dueño",
    ],
    gradient: "from-violet-500 to-violet-700",
    lightBg: "from-violet-50 to-violet-100",
    accent: "text-violet-600",
    badge: "bg-violet-100 text-violet-700",
    border: "border-violet-200",
    waMessage: "Hola! Me interesa el Colegio Canino en Mimos Pet Club 🎓",
    emoji: "🏅",
  },
  {
    id: "peluqueria",
    image: "https://i.pinimg.com/736x/0e/98/c0/0e98c0c56bc1533d30a909048b4c2d3d.jpg",
    title: "Peluquería & Spa",
    tagline: "Belleza, higiene y bienestar total",
    description:
      "De la mano de nuestros estilistas expertos, tu mascota saldrá luciendo increíble. Usamos productos 100% naturales, seguros para todas las razas. Porque verse bien es sentirse bien.",
    benefits: [
      "Baño con champú natural según tipo de piel",
      "Corte de pelo a medida según raza y preferencia",
      "Hidratación profunda y acondicionador premium",
      "Corte de uñas y limpieza de orejas incluido",
      "Secado y peinado profesional",
      "Perfume y lazo de regalo al finalizar",
    ],
    gradient: "from-pink-500 to-pink-700",
    lightBg: "from-pink-50 to-pink-100",
    accent: "text-pink-600",
    badge: "bg-pink-100 text-pink-700",
    border: "border-pink-200",
    waMessage: "Hola! Quiero agendar una sesión de Peluquería & Spa en Mimos Pet Club ✂️",
    emoji: "💅",
  },
];

const pawPositions = [
  { left: "5%",  top: "15%", delay: "0s",    size: "2rem",   duration: "6s"  },
  { left: "15%", top: "70%", delay: "1.2s",  size: "1.4rem", duration: "7s"  },
  { left: "25%", top: "35%", delay: "2.5s",  size: "1.8rem", duration: "5s"  },
  { left: "38%", top: "80%", delay: "0.8s",  size: "1.2rem", duration: "8s"  },
  { left: "50%", top: "20%", delay: "3s",    size: "2.2rem", duration: "6.5s"},
  { left: "62%", top: "60%", delay: "1.8s",  size: "1.5rem", duration: "7.5s"},
  { left: "72%", top: "10%", delay: "0.4s",  size: "1.7rem", duration: "5.5s"},
  { left: "80%", top: "75%", delay: "2.1s",  size: "1.3rem", duration: "9s"  },
  { left: "90%", top: "40%", delay: "3.5s",  size: "2rem",   duration: "6s"  },
  { left: "45%", top: "50%", delay: "1s",    size: "1.6rem", duration: "8.5s"},
];

export default function ServiciosPage() {
  return (
    <main className="pt-20 overflow-hidden">

      {/* ─── HEADER CON HUELLAS ANIMADAS ─── */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-slate-900 to-sky-900">

        {/* Huellas animadas */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {pawPositions.map((paw, i) => (
            <span
              key={i}
              className="absolute select-none"
              style={{
                left: paw.left,
                top: paw.top,
                fontSize: paw.size,
                opacity: 0,
                animation: `pawFloat ${paw.duration} ease-in-out ${paw.delay} infinite`,
              }}
            >
              🐾
            </span>
          ))}
        </div>

        <style>{`
          @keyframes pawFloat {
            0%   { opacity: 0;    transform: translateY(12px) rotate(-10deg) scale(0.85); }
            20%  { opacity: 0.10; }
            50%  { opacity: 0.12; transform: translateY(-8px) rotate(6deg) scale(1.05); }
            80%  { opacity: 0.08; }
            100% { opacity: 0;    transform: translateY(12px) rotate(-10deg) scale(0.85); }
          }
        `}</style>

        {/* Contenido */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-bold text-sky-400 uppercase tracking-widest mb-4">
            Nuestros servicios
          </span>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-5">
            Todo lo que tu mascota necesita,{" "}
            <span className="text-sky-400">en un solo lugar</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Hospedaje, entrenamiento y grooming premium diseñados para el bienestar
            total de tu mejor amigo.
          </p>

          {/* Pills de acceso rápido */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-105"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICIOS ─── */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, idx) => (
            <section key={service.id} id={service.id} className="scroll-mt-24">
              <div className="grid lg:grid-cols-2 gap-12 items-center">

                {/* Visual con imagen real */}
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className={`relative rounded-3xl overflow-hidden shadow-xl border ${service.border} aspect-[4/3]`}>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
                      <div className={`inline-flex items-center gap-2 ${service.badge} px-4 py-2 rounded-full text-sm font-bold w-fit`}>
                        <span>{service.emoji}</span>
                        {service.tagline}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                  <span className={`inline-block text-sm font-bold uppercase tracking-widest mb-3 ${service.accent}`}>
                    Mimos Pet Club
                  </span>
                  <h2 className="text-4xl font-black text-slate-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-slate-500 text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-10">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-600 text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={waLink(service.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${service.gradient} text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200`}
                  >
                    <span className="text-xl">💬</span>
                    Reservar por WhatsApp
                  </a>
                </div>
              </div>

              {idx < services.length - 1 && (
                <div className="mt-24 border-t border-slate-100" />
              )}
            </section>
          ))}
        </div>
      </div>

      {/* ─── PRICING CTA ─── */}
      <section className="bg-gradient-to-br from-slate-50 to-sky-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            ¿Quieres saber los precios?
          </h2>
          <p className="text-slate-500 text-lg mb-8">
            Los precios varían según raza, tamaño y duración del servicio.
            Escríbenos y te damos una cotización personalizada en minutos.
          </p>
          <a
            href={waLink("Hola! Quisiera saber los precios de los servicios en Mimos Pet Club 🐾")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-all duration-200"
          >
            <span className="text-xl">💬</span>
            Consultar precios por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}