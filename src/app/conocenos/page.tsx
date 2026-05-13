"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ─── TIPOS ──────────────────────────────────────────────────────────────────
interface PawPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
}

// ─── COMPONENTE: CURSOR PATITA ───────────────────────────────────────────────
function PawCursor({ isHovering }: { isHovering: boolean }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 28 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 28 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[200] hidden md:block"
      style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{ scale: isHovering ? 1.6 : 1, rotate: isHovering ? 15 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          {/* Almohadilla central */}
          <ellipse cx="20" cy="28" rx="7" ry="8" fill="#1a1a2e" />
          {/* Dedos */}
          <ellipse cx="9"  cy="18" rx="4"   ry="5"   fill="#1a1a2e" />
          <ellipse cx="16" cy="12" rx="4.5" ry="5.5" fill="#1a1a2e" />
          <ellipse cx="24" cy="12" rx="4.5" ry="5.5" fill="#1a1a2e" />
          <ellipse cx="31" cy="18" rx="4"   ry="5"   fill="#1a1a2e" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── COMPONENTE: PATITAS CAMINANDO ───────────────────────────────────────────
function WalkingPaws() {
  const [paws, setPaws] = useState<PawPrint[]>([]);

  useEffect(() => {
    const trail: PawPrint[] = [];
    let counter = 0;
    let angle = 0;
    let px = -80;

    const interval = setInterval(() => {
      // Avanza desde la izquierda hacia la derecha con leve zigzag
      px += 60;
      if (px > window.innerWidth + 80) px = -80;
      const yBase = window.innerHeight * 0.82;
      const yOffset = Math.sin(counter * 0.9) * 14;
      const rotation = Math.sin(counter * 0.9) * 20 + (counter % 2 === 0 ? 12 : -12);
      angle += 0.15;

      const newPaw: PawPrint = {
        id: counter++,
        x: px,
        y: yBase + yOffset,
        rotation,
        size: 22 + Math.random() * 6,
      };

      trail.push(newPaw);
      if (trail.length > 14) trail.shift();
      setPaws([...trail]);
    }, 320);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      {paws.map((paw, i) => (
        <motion.div
          key={paw.id}
          className="absolute"
          style={{ left: paw.x, top: paw.y }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 0.13 - i * 0.006, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            viewBox="0 0 40 40"
            width={paw.size}
            height={paw.size}
            style={{ transform: `rotate(${paw.rotation}deg)` }}
            fill="none"
          >
            <ellipse cx="20" cy="28" rx="7"   ry="8"   fill="#f97316" />
            <ellipse cx="9"  cy="18" rx="4"   ry="5"   fill="#f97316" />
            <ellipse cx="16" cy="12" rx="4.5" ry="5.5" fill="#f97316" />
            <ellipse cx="24" cy="12" rx="4.5" ry="5.5" fill="#f97316" />
            <ellipse cx="31" cy="18" rx="4"   ry="5"   fill="#f97316" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── COMPONENTE: BARRA PROGRESO ──────────────────────────────────────────────
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #f97316, #fb923c, #fdba74, #f97316)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}

// ─── COMPONENTE: TARJETA 3D ──────────────────────────────────────────────────
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [10, -10]);
  const rotateY = useTransform(x, [-80, 80], [-10, 10]);
  const glareX = useTransform(x, [-80, 80], [0, 100]);
  const glareY = useTransform(y, [-80, 80], [0, 100]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1200px" }}
    >
      {/* Reflejo glare */}
      <motion.div
        className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

// ─── COMPONENTE: TEXTO REVEAL LETRA A LETRA ──────────────────────────────────
function RevealText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "105%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}

// ─── COMPONENTE: CONTADOR ANIMADO ────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── DATOS ───────────────────────────────────────────────────────────────────
const team = [
  {
    name: "Sofía Ramos",
    role: "Fundadora & Directora",
    tag: "Veterinaria",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
    bio: "Médico veterinario con 8 años de experiencia. Fundó Mimos Pet Club con la visión de crear el espacio ideal donde amor y profesionalismo van de la mano.",
    accent: "#f97316",
    emoji: "🩺",
  },
  {
    name: "Carlos Mendoza",
    role: "Entrenador Canino",
    tag: "Certificado ACPE",
    img: "https://i.pinimg.com/736x/fe/e6/b9/fee6b92aff3d1bb23295eb0cc23a173c.jpg",
    bio: "Especialista en conducta animal y refuerzo positivo. Certificado por la Asociación Canina del Perú, con más de 500 perros entrenados exitosamente.",
    accent: "#0ea5e9",
    emoji: "🎓",
  },
  {
    name: "Valentina Cruz",
    role: "Groomer Senior",
    tag: "Estilista",
    img: "https://i.pinimg.com/webp80/1200x/53/f8/e1/53f8e1f7d9ba691f4bcf1edf340c64fc.webp",
    bio: "Con más de 5 años en grooming profesional, ha transformado más de 2,000 mascotas. Especialista en razas difíciles y cortes de competición.",
    accent: "#a855f7",
    emoji: "✂️",
  },
];

const milestones = [
  {
    year: "2022",
    label: "Fundación del Club",
    desc: "Abrimos nuestras puertas con el sueño de crear el mejor espacio para mascotas en Lima, comenzando con solo 3 servicios y un equipo de 4 personas.",
    icon: "🏠",
    color: "from-sky-500 to-cyan-400",
    border: "border-sky-200",
    bg: "bg-sky-50",
    text: "text-sky-600",
    stat: "4 personas",
  },
  {
    year: "2023",
    label: "Colegio Canino",
    desc: "Incorporamos entrenadores certificados y lanzamos nuestro programa de educación positiva, revolucionando el bienestar conductual en Lima.",
    icon: "🎓",
    color: "from-violet-500 to-purple-400",
    border: "border-violet-200",
    bg: "bg-violet-50",
    text: "text-violet-600",
    stat: "+200 alumnos",
  },
  {
    year: "2024",
    label: "Cámaras 24/7",
    desc: "Instalamos sistema de monitoreo en tiempo real para que los dueños vean a sus mascotas en cualquier momento desde su teléfono.",
    icon: "📷",
    color: "from-orange-500 to-amber-400",
    border: "border-orange-200",
    bg: "bg-orange-50",
    text: "text-orange-600",
    stat: "8 cámaras HD",
  },
  {
    year: "2025",
    label: "Probador IA",
    desc: "Integramos inteligencia artificial para visualizar estilos de grooming en tu mascota antes del servicio. Primera en Perú.",
    icon: "🤖",
    color: "from-pink-500 to-rose-400",
    border: "border-pink-200",
    bg: "bg-pink-50",
    text: "text-pink-600",
    stat: "1° en Perú",
  },
];

const valores = [
  {
    label: "Amor",
    desc: "Cada animal que cruza nuestra puerta recibe cariño genuino, sin excepción.",
    icon: "♥",
    color: "bg-rose-500",
    light: "bg-rose-50",
    border: "border-rose-100",
    text: "text-rose-600",
  },
  {
    label: "Responsabilidad",
    desc: "Compromiso total con la salud, seguridad y bienestar de tu compañero.",
    icon: "◉",
    color: "bg-sky-500",
    light: "bg-sky-50",
    border: "border-sky-100",
    text: "text-sky-600",
  },
  {
    label: "Bienestar",
    desc: "Productos naturales y técnicas no invasivas que cuidan desde adentro.",
    icon: "◈",
    color: "bg-emerald-500",
    light: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-600",
  },
  {
    label: "Confianza",
    desc: "Transparencia absoluta con los dueños en cada paso del servicio.",
    icon: "◆",
    color: "bg-violet-500",
    light: "bg-violet-50",
    border: "border-violet-100",
    text: "text-violet-600",
  },
];

const metrics = [
  { value: 2000, suffix: "+", label: "Mascotas atendidas" },
  { value: 98,   suffix: "%", label: "Clientes satisfechos" },
  { value: 5,    suffix: "",  label: "Años de experiencia" },
  { value: 12,   suffix: "",  label: "Especialistas" },
];

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function ConocenosPage() {
  const [hovering, setHovering] = useState(false);
  const [activeTeam, setActiveTeam] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const hoverOn = () => setHovering(true);
  const hoverOff = () => setHovering(false);

  return (
    <main className="bg-[#fdfbf7] md:cursor-none overflow-hidden min-h-screen">
      {/* Cursor patita */}
      <PawCursor isHovering={hovering} />

      {/* Patitas caminando en toda la página */}
      <WalkingPaws />

      {/* Barra de progreso */}
      <ProgressBar />

      {/* ══════════════════════════════════════════════
          HERO — Pantalla completa, parallax, tipografía masiva
         ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0d0d0f]"
      >
        {/* Fondo parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=1920&q=80"
            className="w-full h-full object-cover"
            loading="eager"
            alt="Veterinaria Mimos Pet Club"
          />
          {/* Overlay con gradiente narrativo */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0d0d0f]" />
          {/* Overlay lateral izq para contraste de texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </motion.div>

        {/* Contenido hero */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 w-full"
          style={{ opacity: heroOpacity }}
        >
          {/* Chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
            Lima, Perú · Desde 2022
          </motion.div>

          {/* Título masivo */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
              className="text-[clamp(3.5rem,12vw,10rem)] font-black text-white leading-[0.9] tracking-tighter"
            >
              MIMOS
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1], delay: 0.45 }}
              className="text-[clamp(3.5rem,12vw,10rem)] font-black leading-[0.9] tracking-tighter"
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.6)",
                color: "transparent",
              }}
            >
              PET CLUB
            </motion.h1>
          </div>

          {/* Subtítulo + CTA en fila */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16"
          >
            <p className="text-white/60 text-lg font-light leading-relaxed max-w-sm">
              Redefiniendo el bienestar animal en Lima con amor, tecnología y los mejores especialistas.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#equipo"
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-orange-500 text-white font-black rounded-full text-sm uppercase tracking-wider shadow-lg shadow-orange-500/30"
              >
                Conoce el equipo
              </motion.a>
              <motion.a
                href="https://wa.me/51910918802"
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 border border-white/30 text-white font-medium rounded-full text-sm backdrop-blur-sm"
              >
                Agenda cita →
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Flecha scroll */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/40"
        >
          <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
            <rect x="11" y="0" width="2" height="28" rx="1" fill="currentColor" />
            <path d="M6 24L12 32L18 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          MÉTRICAS — Números que impresionan
         ══════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0d0d0f] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0d0d0f] px-8 py-12 text-center"
            >
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">
                <AnimatedCounter target={m.value} suffix={m.suffix} />
              </div>
              <div className="text-white/40 text-sm uppercase tracking-widest font-medium">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          QUIÉNES SOMOS — Layout editorial asimétrico
         ══════════════════════════════════════════════ */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-center">

          {/* Imagen 3D tilt */}
          <TiltCard className="rounded-[3rem]">
            <div
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
              className="relative w-full h-[580px] rounded-[3rem] overflow-hidden shadow-2xl group"
            >
              <img
                src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=80"
                className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 scale-[1.03] group-hover:scale-100"
                loading="lazy"
                alt="Instalaciones Mimos Pet Club"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Chip flotante */}
              <div className="absolute top-6 left-6 bg-orange-500 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                Lima, Perú
              </div>

              {/* Texto inferior */}
              <div className="absolute bottom-10 left-8 right-8">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-white text-2xl font-black leading-tight"
                >
                  Más que un negocio,
                  <br />
                  <span className="text-orange-400">una comunidad.</span>
                </motion.p>
              </div>

              {/* Badge esquina */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-6 right-6 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-2xl"
              >
                🐾
              </motion.div>
            </div>
          </TiltCard>

          {/* Texto */}
          <div>
            <div className="overflow-hidden mb-3">
              <RevealText
                text="Quiénes"
                className="text-[clamp(2.8rem,6vw,5rem)] font-black text-slate-900 leading-none tracking-tighter block"
              />
            </div>
            <div className="overflow-hidden mb-8">
              <RevealText
                text="somos"
                className="text-[clamp(2.8rem,6vw,5rem)] font-black text-orange-500 leading-none tracking-tighter block"
                delay={0.1}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6 text-slate-500 text-base leading-relaxed"
            >
              <p>
                Mimos Pet Club nació de un simple pero poderoso deseo: crear un lugar donde las mascotas
                sean tratadas con el mismo cariño que recibirían en casa. Lo que comenzó como un sueño
                se convirtió en Lima's premier destination para el bienestar animal.
              </p>
              <p>
                Combinamos tecnología de punta con el toque humano que tu mascota merece: desde
                cámaras 24/7 hasta un probador de estilos con inteligencia artificial, siempre
                innovamos para que confíes en nosotros.
              </p>
            </motion.div>

            {/* Misión / Visión */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-6 mt-10"
            >
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6">
                <div className="text-sky-500 text-lg mb-3 font-black">◎ Misión</div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Cuidado, educación y estética animal con los más altos estándares de calidad y amor.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                <div className="text-orange-500 text-lg mb-3 font-black">◈ Visión</div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Ser el pet club de referencia en Perú, reconocido por la excelencia y el bienestar.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── VALORES ── */}
        <div className="mt-28">
          <div className="overflow-hidden mb-12 text-center">
            <RevealText
              text="Nuestros valores"
              className="text-4xl font-black text-slate-900 tracking-tight block"
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {valores.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 400 } }}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
                className={`${v.light} ${v.border} border rounded-3xl p-7 group cursor-default`}
              >
                <div className={`w-10 h-10 ${v.color} rounded-2xl flex items-center justify-center text-white text-lg font-black mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {v.icon}
                </div>
                <h4 className={`font-black text-slate-900 text-lg mb-2`}>{v.label}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                {/* Línea animada bottom */}
                <motion.div
                  className={`h-0.5 ${v.color} rounded-full mt-5 origin-left`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HISTORIA — Timeline horizontal en oscuro
         ══════════════════════════════════════════════ */}
      <section className="py-32 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="overflow-hidden mb-16 text-center">
            <RevealText
              text="Nuestra historia"
              className="text-[clamp(2.5rem,7vw,5rem)] font-black text-white tracking-tighter block"
            />
          </div>

          {/* Timeline items */}
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Línea conectora */}
            <div className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-white/10" />
            <motion.div
              className="hidden md:block absolute top-[52px] left-[12.5%] h-px bg-gradient-to-r from-orange-500 to-pink-500 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ right: "12.5%" }}
            />

            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
                className="relative group"
              >
                {/* Punto en línea */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`w-[26px] h-[26px] rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-sm shadow-lg relative z-10`}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                </div>

                {/* Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-7 group-hover:bg-white/8 group-hover:border-white/20 transition-all duration-300">
                  <div className="text-4xl mb-4">{m.icon}</div>
                  <div className={`text-xs font-black uppercase tracking-widest mb-2 bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>
                    {m.year}
                  </div>
                  <h4 className="text-white font-black text-lg mb-3 leading-tight">{m.label}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{m.desc}</p>
                  <div className={`mt-5 inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 text-white/60`}>
                    {m.stat}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          EQUIPO — Cards con hover reveal bio
         ══════════════════════════════════════════════ */}
      <section id="equipo" className="py-32 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <div className="overflow-hidden mb-3">
                <RevealText
                  text="El equipo"
                  className="text-[clamp(2.5rem,7vw,5rem)] font-black text-slate-900 tracking-tighter block"
                />
              </div>
              <p className="text-slate-400 text-base max-w-xs">
                Especialistas apasionados que cuidan a tu mascota como si fuera la suya.
              </p>
            </div>
            <motion.a
              href="https://wa.me/51910918802"
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white font-bold rounded-full text-sm"
            >
              Trabaja con nosotros →
            </motion.a>
          </div>

          {/* Cards del equipo */}
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <TiltCard key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  onMouseEnter={() => { hoverOn(); setActiveTeam(i); }}
                  onMouseLeave={() => { hoverOff(); setActiveTeam(null); }}
                  className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-shadow duration-500"
                >
                  {/* Imagen */}
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      src={member.img}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      alt={member.name}
                      animate={{ scale: activeTeam === i ? 1.07 : 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    {/* Overlay gradient */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to top, ${member.accent}dd, transparent)` }}
                    />

                    {/* Tag */}
                    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                      {member.tag}
                    </div>

                    {/* Emoji badge */}
                    <motion.div
                      className="absolute top-5 right-5 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-xl shadow-md"
                      animate={{ rotate: activeTeam === i ? [0, -10, 10, 0] : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {member.emoji}
                    </motion.div>

                    {/* Bio overlay */}
                    <AnimatePresence>
                      {activeTeam === i && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-0 left-0 right-0 p-6"
                        >
                          <p className="text-white text-sm leading-relaxed font-medium drop-shadow-lg">
                            {member.bio}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer de card */}
                  <div className="p-7">
                    <h4 className="text-xl font-black text-slate-900 mb-1">{member.name}</h4>
                    <p className="text-sm font-bold uppercase tracking-wider" style={{ color: member.accent }}>
                      {member.role}
                    </p>

                    {/* Línea acento */}
                    <motion.div
                      className="h-0.5 rounded-full mt-4 origin-left"
                      style={{ background: member.accent }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIOS — Cards deslizantes
         ══════════════════════════════════════════════ */}
      <section className="py-32 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="overflow-hidden mb-16 text-center">
            <RevealText
              text="Lo que dicen las familias"
              className="text-[clamp(2rem,6vw,4rem)] font-black text-white tracking-tight block"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "María G.",
                pet: "Dueña de Rocky",
                comment: "El mejor lugar de Lima para mi perro. Las cámaras 24/7 me dan una tranquilidad increíble mientras trabajo. Rocky llega a casa feliz y limpio siempre.",
                rating: 5,
                avatar: "MG",
                color: "bg-orange-500",
              },
              {
                name: "José P.",
                pet: "Papá de Luna",
                comment: "El entrenamiento de Carlos transformó completamente a Luna. Era muy ansiosa y ahora es un perro completamente equilibrado. ¡Increíble el cambio en solo 4 semanas!",
                rating: 5,
                avatar: "JP",
                color: "bg-sky-500",
              },
              {
                name: "Lucía R.",
                pet: "Dueña de Max y Coco",
                comment: "Valentina es una artista con las tijeras. El probador de IA es una genialidad — pude ver exactamente cómo quedaría el corte antes. Nunca más iré a otro groomer.",
                rating: 5,
                avatar: "LR",
                color: "bg-violet-500",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
              >
                {/* Estrellas */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <span key={si} className="text-orange-400 text-base">★</span>
                  ))}
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-8 italic">
                  "{t.comment}"
                </p>

                {/* Autor */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-black`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.pet}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA FINAL — Impactante
         ══════════════════════════════════════════════ */}
      <section className="relative py-40 overflow-hidden bg-[#fdfbf7] text-center">
        {/* Patitas decorativas de fondo */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-slate-200 select-none pointer-events-none"
            style={{
              left: `${10 + i * 16}%`,
              top: `${15 + (i % 3) * 30}%`,
              fontSize: `${2 + (i % 3)}rem`,
              rotate: `${-20 + i * 15}deg`,
            }}
            animate={{ y: [0, -12, 0], rotate: [`${-20 + i * 15}deg`, `${-10 + i * 15}deg`, `${-20 + i * 15}deg`] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            🐾
          </motion.div>
        ))}

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="overflow-hidden mb-2">
              <RevealText
                text="¿Quieres"
                className="text-[clamp(3rem,10vw,7rem)] font-black text-slate-900 leading-none tracking-tighter block"
              />
            </div>
            <div className="overflow-hidden mb-2">
              <RevealText
                text="conocernos"
                className="text-[clamp(3rem,10vw,7rem)] font-black text-orange-500 leading-none tracking-tighter block"
                delay={0.1}
              />
            </div>
            <div className="overflow-hidden mb-14">
              <RevealText
                text="en persona?"
                className="text-[clamp(3rem,10vw,7rem)] font-black leading-none tracking-tighter block"
                style={{ WebkitTextStroke: "2px #1e293b", color: "transparent" } as React.CSSProperties}
                delay={0.2}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://wa.me/51910918802"
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-orange-500 text-white font-black rounded-full text-base uppercase tracking-wider shadow-2xl shadow-orange-500/30"
              >
                <span>🐶</span>
                Agendar visita por WhatsApp
              </motion.a>
              <motion.a
                href="#"
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-slate-900 text-slate-900 font-black rounded-full text-base uppercase tracking-wider"
              >
                Ver servicios →
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER — Columnas bien distribuidas
         ══════════════════════════════════════════════ */}
      <footer className="bg-slate-950 text-white pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 pb-12 border-b border-white/10">

            {/* Brand col */}
            <div className="md:col-span-1">
              <div className="font-black text-2xl tracking-tighter mb-4">
                MIMOS <span className="text-orange-500">PET</span> CLUB
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                El premier destination para el bienestar animal en Lima, Perú.
              </p>
              <div className="flex gap-3">
                {["IG", "FB", "TK", "YT"].map((s) => (
                  <motion.a
                    key={s}
                    href="#"
                    onMouseEnter={hoverOn}
                    onMouseLeave={hoverOff}
                    whileHover={{ y: -3, color: "#f97316" }}
                    className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/60 text-[10px] font-black hover:text-orange-400 hover:border-orange-400/40 transition-colors"
                  >
                    {s}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Servicios */}
            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-5">Servicios</div>
              <ul className="space-y-3">
                {["Grooming profesional", "Colegio canino", "Hotel para mascotas", "Veterinaria", "Probador IA"].map((s) => (
                  <li key={s}>
                    <motion.a
                      href="#"
                      onMouseEnter={hoverOn}
                      onMouseLeave={hoverOff}
                      whileHover={{ x: 4 }}
                      className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2"
                    >
                      <span className="text-orange-500 text-xs">→</span>
                      {s}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-5">Empresa</div>
              <ul className="space-y-3">
                {["Sobre nosotros", "El equipo", "Nuestra historia", "Blog", "Trabaja con nosotros"].map((s) => (
                  <li key={s}>
                    <motion.a
                      href="#"
                      onMouseEnter={hoverOn}
                      onMouseLeave={hoverOff}
                      whileHover={{ x: 4 }}
                      className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2"
                    >
                      <span className="text-orange-500 text-xs">→</span>
                      {s}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-5">Contacto</div>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <span className="text-orange-500 mt-0.5 flex-shrink-0">📍</span>
                  <span className="text-white/50">Miraflores, Lima, Perú</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 flex-shrink-0">📞</span>
                  <a href="tel:+51910918802" className="text-white/50 hover:text-white transition-colors">+51 910 918 802</a>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 flex-shrink-0">📧</span>
                  <a href="mailto:hola@mimospetclub.pe" className="text-white/50 hover:text-white transition-colors">hola@mimospetclub.pe</a>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 flex-shrink-0">🕐</span>
                  <span className="text-white/50">Lun–Sáb 8am–7pm</span>
                </li>
              </ul>

              {/* WhatsApp CTA en footer */}
              <motion.a
                href="https://wa.me/51910918802"
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
                whileHover={{ scale: 1.04 }}
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-orange-500 text-white font-bold rounded-xl text-sm"
              >
                Escribir por WhatsApp →
              </motion.a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-xs tracking-widest uppercase">
              © 2026 Mimos Pet Club · Todos los derechos reservados
            </p>
            <div className="flex gap-6">
              {["Privacidad", "Términos", "Cookies"].map((l) => (
                <a key={l} href="#" className="text-white/25 hover:text-white/60 text-xs transition-colors uppercase tracking-wider">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
