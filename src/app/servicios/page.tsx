"use client";

import {
  motion,
  useSpring,
  useMotionValue,
  useInView,
} from "framer-motion";

import { useRef, useState, useEffect } from "react";

const WA_NUMBER = "51910918802";

const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

const services = [
  {
    id: "hospedaje",
    image:
      "https://i.pinimg.com/1200x/21/7c/c8/217cc88c6f9d0e91ff841af767b98086.jpg",
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
    accent: "text-sky-500",
    badge: "bg-sky-100 text-sky-700",
    border: "border-sky-200",
    waMessage:
      "Hola! Quiero reservar hospedaje para mi mascota en Mimos Pet Club 🐶",
    emoji: "🌙",
  },
  {
    id: "colegio",
    image:
      "https://i.pinimg.com/1200x/a4/2b/14/a42b14e8a8207d36d2a935e297f2ea4f.jpg",
    title: "Colegio Canino",
    tagline: "Un perro educado es un perro feliz",
    description:
      "Nuestro programa de entrenamiento positivo está diseñado para enseñarle a tu perro las habilidades sociales y de obediencia que necesita.",
    benefits: [
      "Clases grupales e individuales disponibles",
      "Entrenadores certificados",
      "Refuerzo positivo",
      "Socialización segura",
      "Corrección de conductas",
      "Informe semanal",
    ],
    gradient: "from-violet-500 to-violet-700",
    accent: "text-violet-500",
    badge: "bg-violet-100 text-violet-700",
    border: "border-violet-200",
    waMessage:
      "Hola! Me interesa el Colegio Canino en Mimos Pet Club 🎓",
    emoji: "🏅",
  },
  {
    id: "peluqueria",
    image:
      "https://i.pinimg.com/736x/0e/98/c0/0e98c0c56bc1533d30a909048b4c2d3d.jpg",
    title: "Peluquería & Spa",
    tagline: "Belleza, higiene y bienestar total",
    description:
      "De la mano de nuestros estilistas expertos, tu mascota saldrá luciendo increíble con productos premium.",
    benefits: [
      "Baño natural",
      "Corte profesional",
      "Hidratación premium",
      "Limpieza completa",
      "Peinado profesional",
      "Perfume de regalo",
    ],
    gradient: "from-pink-500 to-pink-700",
    accent: "text-pink-500",
    badge: "bg-pink-100 text-pink-700",
    border: "border-pink-200",
    waMessage:
      "Hola! Quiero agendar una sesión de Peluquería & Spa ✂️",
    emoji: "💅",
  },
];

const pawPositions = [
  { left: "5%", top: "15%", delay: "0s", size: "2rem", duration: "6s" },
  { left: "15%", top: "70%", delay: "1s", size: "1.4rem", duration: "7s" },
  { left: "30%", top: "40%", delay: "2s", size: "1.8rem", duration: "5s" },
  { left: "50%", top: "20%", delay: "1.5s", size: "2rem", duration: "8s" },
  { left: "75%", top: "65%", delay: "2.5s", size: "1.5rem", duration: "6s" },
];

function PawCursor({ hovering }: { hovering: boolean }) {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const sx = useSpring(mx, {
    stiffness: 350,
    damping: 30,
  });

  const sy = useSpring(my, {
    stiffness: 350,
    damping: 30,
  });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    window.addEventListener("mousemove", fn);

    return () => window.removeEventListener("mousemove", fn);
  }, [mx, my]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999] hidden md:block"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          scale: hovering ? 1.7 : 1,
          rotate: hovering ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 22,
        }}
        className="text-3xl"
      >
        🐾
      </motion.div>
    </motion.div>
  );
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.7,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ServiciosPage() {
  const [hovering, setHovering] = useState(false);

  const on = () => setHovering(true);
  const off = () => setHovering(false);

  return (
    <main className="overflow-hidden bg-[#fdfbf7] md:cursor-none">

      <PawCursor hovering={hovering} />

      {/* Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Fondo */}
        <motion.div
          className="absolute inset-0 scale-110"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1920&auto=format&fit=crop)",
            }}
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </motion.div>

        {/* Huellas */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {pawPositions.map((paw, i) => (
            <span
              key={i}
              className="absolute"
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
            0% {
              opacity: 0;
              transform: translateY(10px) rotate(-10deg);
            }

            50% {
              opacity: 0.12;
              transform: translateY(-10px) rotate(10deg);
            }

            100% {
              opacity: 0;
              transform: translateY(10px) rotate(-10deg);
            }
          }
        `}</style>

        {/* Contenido */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8"
          >
            🐶 Servicios Premium
          </motion.span>

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="text-[clamp(3rem,9vw,7rem)] font-black text-white tracking-tighter leading-[0.9] max-w-5xl"
          >
            Todo lo que tu mascota necesita,
            <span className="text-sky-400"> en un solo lugar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/60 text-lg leading-relaxed max-w-2xl mt-8"
          >
            Hospedaje, entrenamiento y grooming premium diseñados
            para brindar la mejor experiencia a tu mejor amigo.
          </motion.p>

          {/* Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onMouseEnter={on}
                onMouseLeave={off}
                className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                {s.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-28">

          {services.map((service, idx) => (
            <section
              key={service.id}
              id={service.id}
              className="scroll-mt-32"
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Imagen */}
                <FadeUp className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <motion.div
                    onMouseEnter={on}
                    onMouseLeave={off}
                    whileHover={{
                      y: -12,
                      rotateX: 4,
                      rotateY: -4,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                    }}
                    className={`group relative rounded-[2rem] overflow-hidden shadow-2xl border ${service.border} aspect-[4/3]`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.7 }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${service.image})`,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute bottom-8 left-8">
                      <div
                        className={`inline-flex items-center gap-2 ${service.badge} backdrop-blur-xl border border-white/40 shadow-lg px-4 py-2 rounded-full text-sm font-bold`}
                      >
                        <span>{service.emoji}</span>
                        {service.tagline}
                      </div>
                    </div>
                  </motion.div>
                </FadeUp>

                {/* Texto */}
                <FadeUp
                  delay={0.1}
                  className={idx % 2 === 1 ? "lg:order-1" : ""}
                >
                  <span
                    className={`inline-block text-sm font-black uppercase tracking-[0.22em] mb-4 ${service.accent}`}
                  >
                    Mimos Pet Club
                  </span>

                  <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-6">
                    {service.title}
                  </h2>

                  <p className="text-slate-500 text-lg leading-relaxed mb-10">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-4 mb-10">
                    {service.benefits.map((benefit, bi) => (
                      <motion.li
                        key={benefit}
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: bi * 0.06,
                        }}
                        className="flex items-start gap-4"
                      >
                        <div
                          className={`w-7 h-7 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>

                        <span className="text-slate-600 text-sm leading-relaxed">
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.a
                    href={waLink(service.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={on}
                    onMouseLeave={off}
                    whileHover={{
                      scale: 1.05,
                      y: -4,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className={`inline-flex items-center gap-3 px-9 py-4 bg-gradient-to-r ${service.gradient} text-white font-black rounded-2xl shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-300`}
                  >
                    <span className="text-xl">💬</span>
                    Reservar por WhatsApp
                  </motion.a>
                </FadeUp>
              </div>

              {idx < services.length - 1 && (
                <div className="mt-28 border-t border-slate-100" />
              )}
            </section>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-36 overflow-hidden bg-slate-950 text-center">

        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/5"
            style={{
              left: `${5 + i * 9}%`,
              top: `${10 + (i % 4) * 20}%`,
              fontSize: `${1.5 + (i % 3)}rem`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
            }}
          >
            🐾
          </motion.div>
        ))}

        <div className="relative z-10 max-w-4xl mx-auto px-6">

          <FadeUp>
            <h2 className="text-[clamp(3rem,8vw,6rem)] font-black text-white tracking-tighter leading-none">
              ¿Listo para consentir
              <span className="text-sky-400"> a tu mascota?</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-white/50 text-lg mt-8 mb-12 max-w-2xl mx-auto">
              Escríbenos ahora y recibe una atención personalizada
              para encontrar el servicio perfecto para tu peludito.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <motion.a
              href={waLink(
                "Hola! Quisiera información sobre los servicios de Mimos Pet Club 🐾"
              )}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={on}
              onMouseLeave={off}
              whileHover={{
                scale: 1.06,
                y: -4,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="inline-flex items-center gap-3 px-12 py-5 bg-sky-500 text-white font-black rounded-full shadow-2xl shadow-sky-500/30"
            >
              💬 Consultar por WhatsApp
            </motion.a>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}