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
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { Heart, ShieldCheck, Sparkles, Gem, House, GraduationCap, Camera, Bot } from "lucide-react";

interface PawPrint { id: number; x: number; y: number; rotation: number; size: number }

function WalkingPaws() {
    const [paws, setPaws] = useState<PawPrint[]>([]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const trail: PawPrint[] = [];
        let counter = 0;
        let px = -80;

        const interval = setInterval(() => {
        px += 60;
        if (px > window.innerWidth + 80) px = -80;
        const yBase = window.innerHeight * 0.82;
        const yOffset = Math.sin(counter * 0.9) * 14;
        const rotation = Math.sin(counter * 0.9) * 20 + (counter % 2 === 0 ? 12 : -12);
        trail.push({ id: counter++, x: px, y: yBase + yOffset, rotation, size: 22 + Math.random() * 6 });
        if (trail.length > 14) trail.shift();
        setPaws([...trail]);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
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
            <svg viewBox="0 0 40 40" width={paw.size} height={paw.size} style={{ transform: `rotate(${paw.rotation}deg)` }} fill="none">
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

function ProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    return (
        <motion.div
        className="fixed top-0 left-0 right-0 h-0.75 origin-left z-100"
        style={{ scaleX, background: "linear-linear(90deg,#f97316,#fb923c,#fdba74,#f97316)", backgroundSize: "200% 100%" }}
        />
    );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-80, 80], [10, -10]);
    const rotateY = useTransform(x, [-80, 80], [-10, 10]);
    const glareX = useTransform(x, [-80, 80], [0, 100]);
    const glareY = useTransform(y, [-80, 80], [0, 100]);

    return (
        <motion.div
        className={`relative ${className}`}
        onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - r.left - r.width / 2);
            y.set(e.clientY - r.top - r.height / 2);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1200px" }}
        >
        <motion.div
            className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{ background: `radial-linear(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 60%)` }}
        />
        {children}
        </motion.div>
    );
}

function RevealText({ text, className = "", delay = 0, style }: {
    text: string; className?: string; delay?: number; style?: React.CSSProperties;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
        <motion.span
            className="inline-block"
            style={style}
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay }}
        >
            {text}
        </motion.span>
        </span>
    );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const duration = 1800;
        const start = performance.now();
        let raf: number;
        const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setCount(Math.round((1 - Math.pow(1 - progress, 4)) * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const team = [
    {
        name: "Sofía Ramos", role: "Fundadora & Directora", tag: "Veterinaria",
        img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
        bio: "Médico veterinario con 8 años de experiencia. Fundó Mimos Pet Club con la visión de crear el espacio ideal donde amor y profesionalismo van de la mano.",
        accent: "#f97316", emoji: "🩺",
    },
    {
        name: "Carlos Mendoza", role: "Entrenador Canino", tag: "Certificado ACPE",
        img: "https://i.pinimg.com/736x/fe/e6/b9/fee6b92aff3d1bb23295eb0cc23a173c.jpg",
        bio: "Especialista en conducta animal y refuerzo positivo. Certificado por la Asociación Canina del Perú, con más de 500 perros entrenados exitosamente.",
        accent: "#0ea5e9", emoji: "🎓",
    },
    {
        name: "Valentina Cruz", role: "Groomer Senior", tag: "Estilista",
        img: "https://i.pinimg.com/webp80/1200x/53/f8/e1/53f8e1f7d9ba691f4bcf1edf340c64fc.webp",
        bio: "Con más de 5 años en grooming profesional, ha transformado más de 2,000 mascotas. Especialista en razas difíciles y cortes de competición.",
        accent: "#a855f7", emoji: "✂️",
    },
];

const milestones = [
    { year: "2022", label: "Fundación del Club", desc: "Abrimos nuestras puertas con el sueño de crear el mejor espacio para mascotas en Tacna, comenzando con solo 3 servicios y un equipo de 4 personas.", icon: House, color: "from-sky-500 to-cyan-400", stat: "4 personas" },
    { year: "2023", label: "Colegio Canino", desc: "Incorporamos entrenadores certificados y lanzamos nuestro programa de educación positiva, revolucionando el bienestar conductual en Tacna.", icon: GraduationCap, color: "from-violet-500 to-purple-400", stat: "+200 alumnos" },
    { year: "2024", label: "Cámaras 24/7", desc: "Instalamos sistema de monitoreo en tiempo real para que los dueños vean a sus mascotas en cualquier momento desde su teléfono.", icon: Camera, color: "from-orange-500 to-amber-400", stat: "8 cámaras HD" },
    { year: "2025", label: "Probador IA", desc: "Integramos inteligencia artificial para visualizar estilos de grooming en tu mascota antes del servicio. Primera en Perú.", icon: Bot, color: "from-pink-500 to-rose-400", stat: "1° en Perú" },
];

const valores = [
    {
        label: "Amor",
        desc: "Cada animal que cruza nuestra puerta recibe cariño genuino, sin excepción.",
        icon: Heart,
        linear: "from-rose-500 to-pink-600",
        bg: "bg-linear-to-br from-rose-50 to-pink-50",
        border: "border-rose-200/60",
        iconBg: "bg-rose-500",
        accent: "text-rose-500",
        glow: "shadow-rose-200",
        pattern: "M10 10 Q20 0 30 10 Q20 20 10 10Z",
    },
    {
        label: "Responsabilidad",
        desc: "Compromiso total con la salud, seguridad y bienestar de tu compañero.",
        icon: ShieldCheck,
        linear: "from-sky-500 to-blue-600",
        bg: "bg-linear-to-br from-sky-50 to-blue-50",
        border: "border-sky-200/60",
        iconBg: "bg-sky-500",
        accent: "text-sky-500",
        glow: "shadow-sky-200",
        pattern: "M10 10 Q20 0 30 10 Q20 20 10 10Z",
    },
    {
        label: "Bienestar",
        desc: "Productos naturales y técnicas no invasivas que cuidan desde adentro.",
        icon: Sparkles,
        linear: "from-emerald-500 to-teal-600",
        bg: "bg-linear-to-br from-emerald-50 to-teal-50",
        border: "border-emerald-200/60",
        iconBg: "bg-emerald-500",
        accent: "text-emerald-500",
        glow: "shadow-emerald-200",
        pattern: "M10 10 Q20 0 30 10 Q20 20 10 10Z",
    },
    {
        label: "Confianza",
        desc: "Transparencia absoluta con los dueños en cada paso del servicio.",
        icon: Gem,
        linear: "from-violet-500 to-purple-600",
        bg: "bg-linear-to-br from-violet-50 to-purple-50",
        border: "border-violet-200/60",
        iconBg: "bg-violet-500",
        accent: "text-violet-500",
        glow: "shadow-violet-200",
        pattern: "M10 10 Q20 0 30 10 Q20 20 10 10Z",
    },
];

const metrics = [
    { value: 500, suffix: "+", label: "Mascotas atendidas" },
    { value: 98,  suffix: "%", label: "Clientes satisfechos" },
    { value: 3,   suffix: "",  label: "Años de experiencia" },
    { value: 9,   suffix: "",  label: "Especialistas" },
];

const testimonios = [
    { name: "María G.", pet: "Dueña de Rocky", comment: "El mejor lugar de Tacna para mi perro. Las cámaras 24/7 me dan una tranquilidad increíble mientras trabajo. Rocky llega a casa feliz y limpio siempre.", rating: 5, avatar: "MG", color: "bg-orange-500" },
    { name: "José P.", pet: "Papá de Luna", comment: "El entrenamiento de Carlos transformó completamente a Luna. Era muy ansiosa y ahora es un perro completamente equilibrado. ¡Increíble el cambio en solo 4 semanas!", rating: 5, avatar: "JP", color: "bg-sky-500" },
    { name: "Lucía R.", pet: "Dueña de Max y Coco", comment: "Valentina es una artista con las tijeras. El probador de IA es una genialidad — pude ver exactamente cómo quedaría el corte antes. Nunca más iré a otro groomer.", rating: 5, avatar: "LR", color: "bg-violet-500" },
];

export default function ConocenosClient() {
    const [activeTeam, setActiveTeam] = useState<number | null>(null);
    const heroRef = useRef(null);
    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
    const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

    const [hovering, setHovering] = useState(false);
    const hoverOn = useCallback(() => setHovering(true), []);
    const hoverOff = useCallback(() => setHovering(false), []);

    return (
        <main className="bg-[#fdfbf7] overflow-hidden min-h-screen">
        <WalkingPaws />
        <ProgressBar />

        <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0d0d0f]">
            <motion.div className="absolute inset-0 w-full h-full z-0" style={{ y: heroY }}>
                
                <Image
                    src="/images/hero1.webp" 
                    alt="Mimos Pet Club - Hospedaje y Colegio Canino"
                    fill
                    className="object-cover"
                    priority
                />
                
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-[#0d0d0f]" />
                <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />
            </motion.div>

            <motion.div className="relative z-10 max-w-7xl mx-auto px-6 w-full" style={{ opacity: heroOpacity }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                Tacna, Perú · Desde 2022
            </motion.div>

            <div className="overflow-hidden mb-4">
                <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
                className="text-[clamp(3.5rem,12vw,10rem)] font-black text-white leading-[0.9] tracking-tighter">
                MIMOS
                </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
                <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1], delay: 0.45 }}
                className="text-[clamp(3.5rem,12vw,10rem)] font-black leading-[0.9] tracking-tighter"
                style={{ WebkitTextStroke: "2px rgba(255,255,255,0.6)", color: "transparent" }}>
                PET CLUB
                </motion.h1>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16">
                <p className="text-white/60 text-lg font-light leading-relaxed max-w-sm">
                Redefiniendo el bienestar animal en Tacna con amor, tecnología y los mejores especialistas.
                </p>
                <div className="flex gap-4">
                <motion.a href="#equipo" onMouseEnter={hoverOn} onMouseLeave={hoverOff} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 bg-orange-500 text-white font-black rounded-full text-sm uppercase tracking-wider shadow-lg shadow-orange-500/30">
                    Conoce el equipo
                </motion.a>
                <motion.a href="https://wa.me/51952189680" onMouseEnter={hoverOn} onMouseLeave={hoverOff} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 border border-white/30 text-white font-medium rounded-full text-sm backdrop-blur-sm">
                    Agenda cita →
                </motion.a>
                </div>
            </motion.div>
            </motion.div>

            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/40">
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                <rect x="11" y="0" width="2" height="28" rx="1" fill="currentColor" />
                <path d="M6 24L12 32L18 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </motion.div>
        </section>

        <section className="py-32 px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-center">
            <TiltCard className="rounded-[3rem]">
                <div onMouseEnter={hoverOn} onMouseLeave={hoverOff}
                className="relative w-full h-145 rounded-[3rem] overflow-hidden shadow-2xl group">
                <Image src="/mimos.webp" fill className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 scale-[1.03] group-hover:scale-100" loading="lazy" alt="Instalaciones Mimos Pet Club" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6 bg-orange-500 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">Tacna, Perú</div>
                <div className="absolute bottom-10 left-8 right-8">
                    <p className="text-white text-2xl font-black leading-tight">
                    Más que un negocio,<br /><span className="text-orange-400">una comunidad.</span>
                    </p>
                </div>
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-6 right-6 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-2xl">
                    🐾
                </motion.div>
                </div>
            </TiltCard>

            <div>
                <div className="overflow-hidden mb-3">
                <RevealText text="Quiénes" className="text-[clamp(2.8rem,6vw,5rem)] font-black text-slate-900 leading-none tracking-tighter block" />
                </div>
                <div className="overflow-hidden mb-8">
                <RevealText text="somos" className="text-[clamp(2.8rem,6vw,5rem)] font-black text-orange-500 leading-none tracking-tighter block" delay={0.1} />
                </div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="space-y-6 text-slate-500 text-base leading-relaxed">
                <p>Mimos Pet Club nació de un simple pero poderoso deseo: crear un lugar donde las mascotas sean tratadas con el mismo cariño que recibirían en casa. Lo que comenzó como un sueño se convirtió en Tacna's premier destination para el bienestar animal.</p>
                <p>Combinamos tecnología de punta con el toque humano que tu mascota merece: desde cámaras 24/7 hasta un probador de estilos con inteligencia artificial, siempre innovamos para que confíes en nosotros.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="grid grid-cols-2 gap-6 mt-10">
                <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6">
                    <div className="text-sky-500 text-lg mb-3 font-black">◎ Misión</div>
                    <p className="text-slate-700 text-sm leading-relaxed">Cuidado, educación y estética animal con los más altos estándares de calidad y amor.</p>
                </div>
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                    <div className="text-orange-500 text-lg mb-3 font-black">◈ Visión</div>
                    <p className="text-slate-700 text-sm leading-relaxed">Ser el pet club de referencia en Perú, reconocido por la excelencia y el bienestar.</p>
                </div>
                </motion.div>
            </div>
            </div>

            <div className="mt-28">
            <div className="overflow-hidden mb-4 text-center">
                <RevealText text="Nuestros valores" className="text-4xl font-black text-slate-900 tracking-tight block" />
            </div>
            <p className="text-center text-slate-400 text-sm mb-14 max-w-sm mx-auto">
                Los principios que guían cada decisión que tomamos con tu mascota.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {valores.map((v, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -10, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                    onMouseEnter={hoverOn}
                    onMouseLeave={hoverOff}
                    className={`relative overflow-hidden ${v.bg} ${v.border} border rounded-3xl p-8 group cursor-default shadow-sm hover:shadow-xl hover:${v.glow} transition-shadow duration-500`}
                >
                    <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-linear-to-br ${v.linear} opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500`} />
                    <div className={`absolute -bottom-10 -left-6 w-24 h-24 rounded-full bg-linear-to-br ${v.linear} opacity-5 group-hover:opacity-15 transition-all duration-700`} />

                    <div className="relative mb-6">
                    <div className={`w-14 h-14 ${v.iconBg} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        <v.icon size={24} strokeWidth={2} />
                    </div>
                    <div className={`absolute inset-0 w-14 h-14 ${v.iconBg} rounded-2xl opacity-20 blur-md group-hover:opacity-40 group-hover:blur-lg transition-all duration-300`} />
                    </div>

                    <div className={`absolute top-7 right-7 text-5xl font-black ${v.accent} opacity-10 group-hover:opacity-20 transition-opacity duration-300 leading-none select-none`}>
                    0{i + 1}
                    </div>

                    <h4 className="font-black text-slate-900 text-xl mb-3 relative">{v.label}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed relative">{v.desc}</p>

                    <motion.div
                    className={`h-0.5 bg-linear-to-r ${v.linear} rounded-full mt-6 origin-left`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
                    />
                </motion.div>
                ))}
            </div>
            </div>
        </section>

        <section className="py-32 bg-slate-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
            <div className="overflow-hidden mb-24 text-center">
                <RevealText text="Nuestra historia" className="text-[clamp(2.5rem,7vw,5rem)] font-black text-white tracking-tighter block" />
            </div>
            <div className="relative">
                <div className="hidden md:block absolute top-4 left-[12.5%] right-[12.5%] h-0.5 bg-white/10 z-0" />
                <motion.div className="hidden md:block absolute top-4 left-[12.5%] h-0.5 bg-linear-to-r from-cyan-400 via-orange-500 to-pink-500 origin-left z-10 shadow-[0_0_20px_rgba(249,115,22,.8)]"
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} style={{ right: "12.5%" }} />
                <div className="grid md:grid-cols-4 gap-12 pt-14">
                {milestones.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                    whileHover={{ y: -6 }} onMouseEnter={hoverOn} onMouseLeave={hoverOff} className="relative group overflow-visible z-20">
                    <div className="absolute -top-13.5 left-1/2 -translate-x-1/2 z-50">
                        <motion.div whileHover={{ scale: 1.2 }}
                        className={`w-8.5 h-8.5 rounded-full bg-linear-to-br ${m.color} flex items-center justify-center border-4 border-slate-950 shadow-[0_0_30px_rgba(255,255,255,.4)]`}>
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        </motion.div>
                    </div>
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b1020]/90 backdrop-blur-xl px-8 py-12 min-h-107.5 text-center flex flex-col justify-center items-center shadow-[0_0_40px_rgba(0,0,0,0.45)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-cyan-400/30">
                        <div className="absolute inset-0 opacity-40 bg-[radial-linear(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
                        <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${m.color} flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,.6)] mb-5`}>
                        <m.icon size={28} className="text-white" />
                        </div>
                        <span className="text-cyan-400 font-bold text-xl mb-2">{m.year}</span>
                        <h4 className="text-white font-black text-[30px] leading-tight mb-4">{m.label}</h4>
                        <p className="text-white/60 text-sm leading-8 max-w-65">{m.desc}</p>
                        <div className="mt-6 px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm font-bold">{m.stat}</div>
                    </div>
                    </motion.div>
                ))}
                </div>
            </div>
            </div>
        </section>

        <section id="equipo" className="py-32 bg-[#fdfbf7]">
            <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
                <div>
                <div className="overflow-hidden mb-3">
                    <RevealText text="El equipo" className="text-[clamp(2.5rem,7vw,5rem)] font-black text-slate-900 tracking-tighter block" />
                </div>
                <p className="text-slate-400 text-base max-w-xs">Especialistas apasionados que cuidan a tu mascota como si fuera la suya.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {team.map((member, i) => (
                <TiltCard key={i}>
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                    onMouseEnter={() => { hoverOn(); setActiveTeam(i); }}
                    onMouseLeave={() => { hoverOff(); setActiveTeam(null); }}
                    className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-shadow duration-500">
                    <div className="relative h-80 overflow-hidden">
                        <motion.img src={member.img} className="w-full h-full object-cover" loading="lazy" alt={member.name}
                        animate={{ scale: activeTeam === i ? 1.07 : 1 }} transition={{ duration: 0.6, ease: "easeOut" }} />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-linear(to top, ${member.accent}dd, transparent)` }} />
                        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                        {member.tag}
                        </div>
                        <motion.div className="absolute top-5 right-5 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-xl shadow-md"
                        animate={{ rotate: activeTeam === i ? [0, -10, 10, 0] : 0 }} transition={{ duration: 0.4 }}>
                        {member.emoji}
                        </motion.div>
                        <AnimatePresence>
                        {activeTeam === i && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-0 left-0 right-0 p-6">
                            <p className="text-white text-sm leading-relaxed font-medium drop-shadow-lg">{member.bio}</p>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    <div className="p-7">
                        <h4 className="text-xl font-black text-slate-900 mb-1">{member.name}</h4>
                        <p className="text-sm font-bold uppercase tracking-wider" style={{ color: member.accent }}>{member.role}</p>
                        <motion.div className="h-0.5 rounded-full mt-4 origin-left" style={{ background: member.accent }}
                        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }} />
                    </div>
                    </motion.div>
                </TiltCard>
                ))}
            </div>
            </div>
        </section>


        <section className="relative py-40 overflow-hidden bg-[#fdfbf7] text-center">
            {[...Array(6)].map((_, i) => (
            <motion.div key={i} className="absolute text-slate-200 select-none pointer-events-none"
                style={{ left: `${10 + i * 16}%`, top: `${15 + (i % 3) * 30}%`, fontSize: `${2 + (i % 3)}rem`, rotate: `${-20 + i * 15}deg` }}
                animate={{ y: [0, -12, 0], rotate: [`${-20 + i * 15}deg`, `${-10 + i * 15}deg`, `${-20 + i * 15}deg`] }}
                transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}>
                🐾
            </motion.div>
            ))}
            <div className="relative z-10 max-w-4xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="overflow-hidden mb-2">
                <RevealText text="¿Quieres" className="text-[clamp(3rem,10vw,7rem)] font-black text-slate-900 leading-none tracking-tighter block" />
                </div>
                <div className="overflow-hidden mb-2">
                <RevealText text="conocernos" className="text-[clamp(3rem,10vw,7rem)] font-black text-orange-500 leading-none tracking-tighter block" delay={0.1} />
                </div>
                <div className="overflow-hidden mb-14">
                <RevealText
                    text="en persona?"
                    className="text-[clamp(3rem,10vw,7rem)] font-black leading-none tracking-tighter block"
                    style={{ WebkitTextStroke: "2px #1e293b", color: "transparent" }}
                    delay={0.2}
                />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a href="https://wa.me/51952189680" onMouseEnter={hoverOn} onMouseLeave={hoverOff}
                    whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-orange-500 text-white font-black rounded-full text-base uppercase tracking-wider shadow-2xl shadow-orange-500/30">
                    <span>🐶</span> Agendar visita por WhatsApp
                </motion.a>
                <motion.a href="#" onMouseEnter={hoverOn} onMouseLeave={hoverOff}
                    whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-slate-900 text-slate-900 font-black rounded-full text-base uppercase tracking-wider">
                    Ver servicios →
                </motion.a>
                </div>
            </motion.div>
            </div>
        </section>
        </main>
    );
}