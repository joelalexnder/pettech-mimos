"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";


// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────
interface PawPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  opacity: number;
}


// ─────────────────────────────────────────────
// PATITAS CAMINANDO (fila inferior)
// ─────────────────────────────────────────────
function WalkingPaws() {
  const [paws, setPaws] = useState<PawPrint[]>([]);
  useEffect(() => {
    let id = 0;
    let x = -60;
    const iv = setInterval(() => {
      x += 55;
      if (x > window.innerWidth + 60) x = -60;
      const side = id % 2 === 0 ? 1 : -1;
      setPaws(prev => {
        const next = [...prev, {
          id: id++, x,
          y: window.innerHeight * 0.9 + side * 10,
          rotation: side * 18,
          size: 20 + Math.random() * 8,
          opacity: 0.12,
        }];
        return next.slice(-16);
      });
    }, 300);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
      <AnimatePresence>
        {paws.map((p, i) => (
          <motion.div key={p.id} className="absolute"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 0.13 - i * 0.005, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <svg viewBox="0 0 44 44" width={p.size} height={p.size}
              style={{ transform: `rotate(${p.rotation}deg)` }} fill="none">
              <ellipse cx="22" cy="30" rx="8"   ry="9"   fill="#f97316" />
              <ellipse cx="9"  cy="19" rx="4.5" ry="5.5" fill="#f97316" />
              <ellipse cx="17" cy="12" rx="5"   ry="6"   fill="#f97316" />
              <ellipse cx="27" cy="12" rx="5"   ry="6"   fill="#f97316" />
              <ellipse cx="35" cy="19" rx="4.5" ry="5.5" fill="#f97316" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// BARRA PROGRESO SCROLL
// ─────────────────────────────────────────────
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div className="fixed top-0 left-0 right-0 h-0.75 origin-left z-200"
      style={{ scaleX, background: "linear-linear(90deg,#f97316,#fb923c,#fbbf24)" }} />
  );
}

// ─────────────────────────────────────────────
// CONTADOR ANIMADO
// ─────────────────────────────────────────────
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// ─────────────────────────────────────────────
// REVEAL TEXT
// ─────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FADE IN ON SCROLL
// ─────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// DATOS
// ─────────────────────────────────────────────
const heroSlides = [
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1920&q=80",
];

const services = [
  {
    img: "https://i.pinimg.com/1200x/21/7c/c8/217cc88c6f9d0e91ff841af767b98086.jpg",
    title: "Hospedaje Premium",
    desc: "Tu peludito duerme cómodo, seguro y feliz. Habitaciones individuales con cámaras en tiempo real.",
    accent: "#0ea5e9",
    tag: "Hotel",
    icon: "🏠",
  },
  {
    img: "https://i.pinimg.com/1200x/a4/2b/14/a42b14e8a8207d36d2a935e297f2ea4f.jpg",
    title: "Colegio Canino",
    desc: "Entrenamiento positivo con expertos. Tu perro aprende modales, obediencia y socialización.",
    accent: "#8b5cf6",
    tag: "Educación",
    icon: "🎓",
  },
  {
    img: "https://i.pinimg.com/736x/0e/98/c0/0e98c0c56bc1533d30a909048b4c2d3d.jpg",
    title: "Peluquería & Spa",
    desc: "Baño, corte, hidratación y perfume. Deja que tu mascota luzca increíble con nuestros expertos.",
    accent: "#ec4899",
    tag: "Grooming",
    icon: "✂️",
  },
  {
    img: "https://i.pinimg.com/736x/c7/3d/79/c73d79e7e94636bca579b7cb2fc4b832.jpg",
    title: "Probador IA",
    desc: "Visualiza estilos y accesorios en tu mascota con inteligencia artificial. Primera en Perú.",
    accent: "#f59e0b",
    tag: "Tecnología",
    icon: "🤖",
  },
];

const proceso = [
  { n: "01", title: "Reserva online", desc: "Agenda en segundos por WhatsApp o nuestra web. Confirmación inmediata.", icon: "📱" },
  { n: "02", title: "Llegada & check-in", desc: "Te recibimos con una evaluación gratuita de tu mascota para conocer sus necesidades.", icon: "🏥" },
  { n: "03", title: "Servicio premium", desc: "Nuestros especialistas cuidan a tu mascota con amor y los mejores productos.", icon: "⭐" },
  { n: "04", title: "Actualizaciones en vivo", desc: "Recibe fotos y videos en tiempo real directo a tu WhatsApp mientras trabajamos.", icon: "📸" },
  { n: "05", title: "Entrega & seguimiento", desc: "Mascota feliz, limpia y saludable. Seguimiento post-servicio incluido.", icon: "🎁" },
];

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

const faqs = [
  {
    q: "¿Cuánto tiempo dura el servicio de grooming?",
    a: "Depende de la raza y el servicio elegido. En promedio, el baño y corte toma entre 2 y 4 horas. Te avisamos cuando esté listo vía WhatsApp.",
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

const metrics = [
  { value: 500,  suffix: "+", label: "Mascotas atendidas" },
  { value: 98,   suffix: "%", label: "Clientes satisfechos" },
  { value: 3,    suffix: "",  label: "Años de experiencia" },
  { value: 24,   suffix: "/7",label: "Monitoreo en vivo" },
];

const beneficios = [
  { icon: "🔒", title: "Seguridad garantizada", desc: "Instalaciones cerradas, personal capacitado y cámaras 24/7 en todo momento." },
  { icon: "❤️", title: "Trato personalizado", desc: "Cada mascota es única y recibe atención individual según su personalidad." },
  { icon: "📱", title: "Actualizaciones constantes", desc: "Fotos y videos de tu peludito en tiempo real directo a tu WhatsApp." },
  { icon: "🌿", title: "Productos naturales", desc: "Solo productos sin químicos agresivos, seguros para todas las razas." },
  { icon: "🏆", title: "Especialistas certificados", desc: "Equipo capacitado con certificaciones nacionales e internacionales." },
  { icon: "💳", title: "Sin costos ocultos", desc: "Precios claros desde el inicio. Lo que cotizamos es lo que pagas." },
];

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export default function HomePage() {
  const [hovering, setHovering] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const on = () => setHovering(true);
  const off = () => setHovering(false);

  return (
    <main className="overflow-hidden bg-[#fdfbf7] md:cursor-none">
      <WalkingPaws />
      <ScrollBar />

     {/* ══════════════════════════════════════
          HERO — Pantalla completa + parallax
         ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden flex items-center">
        {/* Fondo slider con parallax */}
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop speed={1200}
            className="w-full h-full"
          >
            {heroSlides.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Degradados para oscurecer el fondo y resaltar el texto blanco */}
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/50 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-900/30" />
        </motion.div>

        {/* Contenido Principal (Texto) */}
        <motion.div
          className="relative z-10 w-full pt-24 pb-10" // Añadimos pt-24 para que nunca choque con el Navbar
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-360 mx-auto px-6 sm:px-12 w-full">
            <div className="max-w-3xl">
              
              {/* Chip / Tag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8 shadow-lg"
              >
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                Tacna, Perú · Atención 7 días
              </motion.div>

              {/* Título */}
              <Reveal delay={0.3}>
                <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black text-white leading-[0.95] tracking-tighter drop-shadow-lg">
                  El cuidado que
                </h1>
              </Reveal>
              <Reveal delay={0.42}>
                <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.95] tracking-tighter"
                  style={{ WebkitTextStroke: "2px rgba(255,255,255,0.7)", color: "transparent" }}>
                  tu mejor amigo
                </h1>
              </Reveal>
              <Reveal delay={0.54}>
                <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black text-orange-400 leading-[0.95] tracking-tighter mb-8 drop-shadow-lg">
                  merece.
                </h1>
              </Reveal>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
                className="text-white/80 text-lg sm:text-xl font-light leading-relaxed max-w-xl mb-10 drop-shadow-md"
              >
                Hospedaje, educación, grooming y tecnología IA para que tu
                mascota viva la experiencia premium que siempre soñaste.
              </motion.p>

              {/* Botones (CTAs) - Se quitaron los eventos del cursor viejo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                className="flex flex-wrap gap-4 mb-14"
              >
                <motion.a
                  href="https://wa.me/51910918802"
                  whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}
                  className="px-9 py-4 bg-linear-to-r from-orange-400 to-orange-600 text-white font-black rounded-full text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all"
                >
                  📅 Agendar ahora
                </motion.a>
                
                <Link href="/servicios" className="inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3, backgroundColor: "rgba(255,255,255,0.15)" }} 
                    whileTap={{ scale: 0.97 }}
                    className="px-9 py-4 border border-white/30 text-white font-medium rounded-full text-sm backdrop-blur-md flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    Ver servicios →
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}
                className="flex flex-wrap gap-6"
              >
                {["✅ Sin cargo extra nocturno", "📹 Cámaras en vivo", "💊 Atención veterinaria"].map(b => (
                  <span key={b} className="text-white/60 text-sm font-medium drop-shadow-md">{b}</span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tarjetas Flotantes (Glassmorphism Transparente + Letras Blancas) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
          className="hidden md:flex absolute bottom-16 right-8 lg:right-16 z-20 flex-col gap-4"
        >
          {/* Calificación */}
          <motion.div 
            whileHover={{ x: -10, backgroundColor: "rgba(255,255,255,0.15)" }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-6 py-4 flex items-center gap-4 cursor-pointer transition-colors"
          >
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl border border-white/10">⭐</div>
            <div>
              <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Calificación</p>
              <p className="font-black text-white text-xl leading-none mt-1">4.9 / 5.0</p>
            </div>
          </motion.div>

          {/* Mascotas Felices */}
          <motion.div 
            whileHover={{ x: -10, backgroundColor: "rgba(255,255,255,0.15)" }}
            className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-6 py-4 cursor-pointer transition-colors"
          >
            <p className="text-xs text-orange-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span> Mascotas felices
            </p>
            <p className="text-3xl font-black text-white mt-1">500+</p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/50"
        >
          <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
            <rect x="10" y="0" width="2" height="26" rx="1" fill="currentColor" />
            <path d="M5 22L11 30L17 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          MÉTRICAS (Adaptado para fondo blanco)
         ══════════════════════════════════════ */}
      <section className="relative z-30 mt-8 sm:mt-12">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-12">
          {/* Fondo blanco, sombra amplia y elegante, bordes sutiles grises */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 overflow-hidden">
            {metrics.map((m, i) => (
              <FadeUp key={i} delay={i * 0.08}
                className="px-4 py-10 lg:py-12 text-center hover:bg-slate-50/80 transition-colors duration-300 group cursor-default flex flex-col justify-center"
              >
                {/* Números en gris muy oscuro, cambian a naranja corporativo en hover */}
                <div className="text-4xl lg:text-5xl font-black text-slate-900 mb-3 tabular-nums group-hover:text-orange-500 transition-colors duration-300">
                  <Counter value={m.value} suffix={m.suffix} />
                </div>
                {/* Textos descriptivos en gris medio, se oscurecen un poco en hover */}
                <div className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] group-hover:text-slate-600 transition-colors">
                  {m.label}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════
          SERVICIOS
         ══════════════════════════════════════ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
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

          {/* Cards servicios */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div
                  onMouseEnter={on} onMouseLeave={off}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="group bg-white rounded-[1.8rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-transparent transition-shadow duration-400"
                  style={{ "--accent": s.accent } as React.CSSProperties}
                >
                  {/* Imagen */}
                  <div className="relative h-52 overflow-hidden">
                    <motion.div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${s.img})` }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                    {/* Tag */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {s.tag}
                    </div>
                    {/* Emoji */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-lg shadow">
                      {s.icon}
                    </div>
                    {/* Overlay hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: `linear-linear(to top, ${s.accent}cc, transparent)` }} />
                  </div>

                  {/* Texto */}
                  <div className="p-6">
                    <h3 className="font-black text-slate-900 text-lg mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      {s.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                    {/* Línea acento */}
                    <motion.div className="h-0.5 rounded-full mt-5 origin-left"
                      style={{ background: s.accent }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2} className="text-center mt-14">
            <motion.div onMouseEnter={on} onMouseLeave={off} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/servicios"
                className="inline-flex items-center gap-2 px-9 py-4 border-2 border-slate-900 text-slate-900 font-black rounded-full text-sm uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-colors duration-300"
              >
                Ver todos los servicios →
              </Link>
            </motion.div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BENEFICIOS
         ══════════════════════════════════════ */}
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
                  onMouseEnter={on} onMouseLeave={off}
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

          {/* Imagen de refuerzo */}
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
                      onMouseEnter={on} onMouseLeave={off}
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

      {/* ══════════════════════════════════════
          PROCESO — Cómo funciona
         ══════════════════════════════════════ */}
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

          {/* Steps */}
          <div className="relative">
            {/* Línea conectora desktop */}
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
                    onMouseEnter={on} onMouseLeave={off}
                    whileHover={{ y: -8 }}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Número + icono */}
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

      {/* ══════════════════════════════════════
          TESTIMONIOS
         ══════════════════════════════════════ */}
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
                <motion.div
                  onMouseEnter={on} onMouseLeave={off}
                  whileHover={{ y: -8 }}
                  className="bg-slate-50 border border-slate-100 rounded-3xl p-7 hover:border-orange-200 hover:shadow-lg transition-all duration-300"
                >
                  {/* Estrellas */}
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
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQs
         ══════════════════════════════════════ */}
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
                <motion.div
                  onMouseEnter={on} onMouseLeave={off}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-colors duration-300"
                >
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
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA FINAL
         ══════════════════════════════════════ */}
      <section className="relative py-40 overflow-hidden bg-[#fdfbf7] text-center">
        {/* Patitas decorativas */}
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute text-slate-200 select-none pointer-events-none"
            style={{ left: `${8 + i * 12}%`, top: `${10 + (i % 4) * 25}%`, fontSize: `${1.5 + (i % 3) * 0.7}rem` }}
            animate={{ y: [0, -14, 0], rotate: [`${-25 + i * 10}deg`, `${-10 + i * 10}deg`, `${-25 + i * 10}deg`] }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          >🐾</motion.div>
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
                onMouseEnter={on} onMouseLeave={off}
                whileHover={{ scale: 1.06, y: -4 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-orange-500 text-white font-black rounded-full text-base uppercase tracking-wider shadow-2xl shadow-orange-500/30"
              >
                📅 Agendar ahora por WhatsApp
              </motion.a>
              <motion.a
                href="https://wa.me/51910918802?text=Hola!%20Quisiera%20saber%20cómo%20llegar%20a%20Mimos%20Pet%20Club"
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={on} onMouseLeave={off}
                whileHover={{ scale: 1.06, y: -4 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-slate-900 text-slate-900 font-black rounded-full text-base uppercase tracking-wider"
              >
                📍 Ver ubicación
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </section>

      
    </main>
  );
}
