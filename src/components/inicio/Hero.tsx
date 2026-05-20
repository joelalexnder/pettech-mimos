"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Reveal } from "./shared";
import "swiper/css";
import "swiper/css/effect-fade";

const heroSlides = [
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1920&q=80",
];

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden flex items-center">
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
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-900/30" />
      </motion.div>

      <motion.div className="relative z-10 w-full pt-24 pb-10" style={{ opacity: heroOpacity }}>
        <div className="max-w-360 mx-auto px-6 sm:px-12 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8 shadow-lg"
            >
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
              Tacna, Perú · Atención 7 días
            </motion.div>

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

      <motion.div
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
        className="hidden md:flex absolute bottom-16 right-8 lg:right-16 z-20 flex-col gap-4"
      >
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
  );
}