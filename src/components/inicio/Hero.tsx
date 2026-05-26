"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Reveal } from "./shared";
import "swiper/css";
import "swiper/css/effect-fade";

const heroSlides = [
  { src: "/images/hero1.webp", alt: "Perros felices en Mimos Pet Club" },
  { src: "/images/hero2.webp", alt: "Mascota en hospedaje premium" },
  { src: "/images/hero3.webp", alt: "Cuidado profesional de mascotas" },
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
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  quality={85}
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-900/30" />
      </motion.div>

      <motion.div className="relative z-10 w-full pt-24 pb-10" style={{ opacity: heroOpacity }}>
        <div className="max-w-360 mx-auto px-6 sm:px-12 w-full">
          <div className="max-w-3xl">

            {/* Chip — CSS puro con animate-fade-in-up */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8 shadow-lg animate-fade-in-up">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
              Tacna, Perú · Atención 7 días
            </div>

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

            <p className="text-white/80 text-lg sm:text-xl font-light leading-relaxed max-w-xl mb-10 drop-shadow-md animate-fade-in" style={{ animationDelay: "0.85s" }}>
              Hospedaje, educación, grooming y tecnología IA para que tu
              mascota viva la experiencia premium que siempre soñaste.
            </p>

            <div className="flex flex-wrap gap-4 mb-14 animate-fade-in-up" style={{ animationDelay: "1s" }}>
              {/* hover CSS reemplaza whileHover en botones */}
              <a
                href="https://wa.me/51910918802"
                className="px-9 py-4 bg-linear-to-r from-orange-400 to-orange-600 text-white font-black rounded-full text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-200"
              >
                📅 Agendar ahora
              </a>

              <Link
                href="/servicios"
                className="px-9 py-4 border border-white/30 text-white font-medium rounded-full text-sm backdrop-blur-md flex items-center gap-2 hover:bg-white/15 hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-200"
              >
                Ver servicios →
              </Link>
            </div>

            {/* Trust badges — CSS puro */}
            <div className="flex flex-wrap gap-6 animate-fade-in" style={{ animationDelay: "1.15s" }}>
              {["✅ Sin cargo extra nocturno", "📹 Cámaras en vivo", "💊 Atención veterinaria"].map(b => (
                <span key={b} className="text-white/60 text-sm font-medium drop-shadow-md">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tarjetas flotantes — mantienen motion por la entrada coordinada */}
      <motion.div
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
        className="hidden md:flex absolute bottom-16 right-8 lg:right-16 z-20 flex-col gap-4"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-6 py-4 flex items-center gap-4 hover:-translate-x-2 hover:bg-white/15 transition-all duration-300">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl border border-white/10">⭐</div>
          <div>
            <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Calificación</p>
            <p className="font-black text-white text-xl leading-none mt-1">4.9 / 5.0</p>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-6 py-4 hover:-translate-x-2 hover:bg-white/15 transition-all duration-300">
          <p className="text-xs text-orange-400 font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400" /> Mascotas felices
          </p>
          <p className="text-3xl font-black text-white mt-1">500+</p>
        </div>
      </motion.div>

      {/* Scroll indicator — CSS puro reemplaza motion animate */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/50 animate-bounce-slow">
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
          <rect x="10" y="0" width="2" height="26" rx="1" fill="currentColor" />
          <path d="M5 22L11 30L17 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
}