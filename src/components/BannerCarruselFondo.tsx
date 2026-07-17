"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { SERVICES_DATA, PAW_POSITIONS } from "@/app/servicios/constants";

import "swiper/css";
import "swiper/css/effect-fade";

const HERO_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1920&auto=format&fit=crop",
    label: "🏨 Hotel & Hospedaje",
  },
  {
    url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1920&auto=format&fit=crop",
    label: "🐕 Mascotas Felices",
  },
  {
    url: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=1920&auto=format&fit=crop",
    label: "🎓 Entrenamiento Canino",
  },
  {
    url: "https://images.unsplash.com/photo-1625794084867-8ddd239946b1?q=80&w=1920&auto=format&fit=crop",
    label: "✂️ Grooming & Spa",
  },
];

export default function BannerCarruselFondo() {
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-[85vh] w-full flex items-center overflow-hidden bg-slate-700">

      <div className="absolute inset-0 z-0 w-full h-full">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          speed={1200}
          className="w-full h-full"
        >
          {HERO_SLIDES.map((slide, i) => (
            <SwiperSlide key={i} className="w-full h-full">
              <div
                className="w-full h-full absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.url})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none opacity-10">
        {PAW_POSITIONS.map((paw, i) => (
          <span
            key={i}
            className="absolute text-white"
            style={{ left: paw.left, top: paw.top, fontSize: paw.size }}
          >
            🐾
          </span>
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-left">


      <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black tracking-tighter leading-[0.95] max-w-4xl">
        <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-300 via-orange-400 to-amber-500">Todo lo que tu mascota necesita,</span>
        <span className="text-white"> en un solo lugar.</span>
      </h1>

        <p className="text-white/70 text-lg leading-relaxed max-w-2xl mt-6">
          Hospedaje, entrenamiento y grooming de categoría internacional,
          diseñados bajo el concepto de bienestar y reforzamiento positivo de Mimos Pet Club.
        </p>

        <div className="flex flex-wrap gap-3 mt-10">
          {SERVICES_DATA.map((s) => (
            <button
              key={s.id}
              onClick={() => handleScrollToSection(s.id)}
              className="px-5 py-2 bg-white/10 hover:bg-orange-500/20 border border-white/20 hover:border-orange-400/40 text-white text-sm font-semibold rounded-full backdrop-blur-sm transition-all duration-300 cursor-pointer"
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
