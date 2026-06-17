"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const heroSlides = [
  { src: "/images/hero1.webp", alt: "Perros felices en Mimos Pet Club" },
  { src: "/images/hero2.webp", alt: "Mascota en hospedaje premium" },
  { src: "/images/hero3.webp", alt: "Cuidado profesional de mascotas" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const line3Ref   = useRef<HTMLSpanElement>(null);
  const chipRef    = useRef<HTMLDivElement>(null);
  const paraRef    = useRef<HTMLParagraphElement>(null);
  const btnsRef    = useRef<HTMLDivElement>(null);
  const card1Ref   = useRef<HTMLDivElement>(null);
  const card2Ref   = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      gsap.to(bgRef.current, {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "70% top",
          scrub: true,
        },
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(chipRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        0
      );
      tl.fromTo(line1Ref.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.85 },
        0.25
      );
      tl.fromTo(line2Ref.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.85 },
        0.42
      );
      tl.fromTo(line3Ref.current,
        { y: "100%", opacity: 0, skewX: -4 },
        { y: "0%", opacity: 1, skewX: 0, duration: 0.85 },
        0.58
      );
      tl.fromTo(paraRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.82
      );
      tl.fromTo(btnsRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.98
      );
      tl.fromTo(card1Ref.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "back.out(1.2)" },
        1.1
      );
      tl.fromTo(card2Ref.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "back.out(1.2)" },
        1.25
      );
      tl.fromTo(scrollRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.4
      );

      gsap.to(scrollRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 1.1,
        delay: 1.8,
      });

      [card1Ref, card2Ref].forEach((ref) => {
        if (!ref.current) return;
        ref.current.addEventListener("mouseenter", () => {
          gsap.to(ref.current, { x: -6, duration: 0.3, ease: "power2.out" });
        });
        ref.current.addEventListener("mouseleave", () => {
          gsap.to(ref.current, { x: 0, duration: 0.4, ease: "power2.inOut" });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-175 overflow-hidden flex items-center"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 scale-[1.15] will-change-transform"
      >
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop
          speed={1400}
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
                  quality={80}
                  sizes="100vw"
                  className="object-cover"
                  {...(i === 0 ? { fetchPriority: "high" } : {})}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 bg-linear-to-r from-slate-950/92 via-slate-900/55 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-900/25" />
      </div>
      <div
        ref={contentRef}
        className="relative z-10 w-full pt-24 pb-10 will-change-transform"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="max-w-3xl">

            <div
              ref={chipRef}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8 shadow-lg opacity-0"
            >
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
              Tacna, Perú
            </div>

            <h1 className="flex flex-col">
              <span className="overflow-hidden mb-1 block">
                <span
                  ref={line1Ref}
                  className="opacity-0 block text-[clamp(3rem,8vw,6.5rem)] font-black text-white leading-[0.95] tracking-tighter drop-shadow-lg"
                >
                  El cuidado que
                </span>
              </span>
              <span className="overflow-hidden mb-1 block">
                <span
                  ref={line2Ref}
                  className="opacity-0 block text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.95] tracking-tighter"
                  style={{ WebkitTextStroke: "2px rgba(255,255,255,0.7)", color: "transparent" }}
                >
                  tu mejor amigo
                </span>
              </span>
              <span className="overflow-hidden mb-8 block">
                <span
                  ref={line3Ref}
                  className="opacity-0 block text-[clamp(3rem,8vw,6.5rem)] font-black text-orange-400 leading-[0.95] tracking-tighter drop-shadow-lg"
                >
                  merece.
                </span>
              </span>
            </h1>

            <p
              ref={paraRef}
              className="text-white/75 text-lg sm:text-xl font-light leading-relaxed max-w-xl mb-10 drop-shadow-md opacity-0"
            >
              Hospedaje, educación, grooming y tecnología IA para que tu
              mascota viva la experiencia premium que siempre soñaste.
            </p>

            <div ref={btnsRef} className="flex flex-wrap gap-4 opacity-0">
              <a
                href="https://wa.me/51952189680"
                target="_blank"
                rel="noreferrer noopener"
                className="px-9 py-4 bg-linear-to-r from-orange-400 to-orange-600 text-white font-black rounded-full text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_32px_rgba(249,115,22,0.65)] hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-200"
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

          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-16 right-8 lg:right-16 z-20 flex-col gap-4">
        <div
          ref={card1Ref}
          className="opacity-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-6 py-4 flex items-center gap-4 cursor-default"
        >
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl border border-white/10">
            ⭐
          </div>
          <div>
            <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Calificación</p>
            <p className="font-black text-white text-xl leading-none mt-1">4.9 / 5.0</p>
          </div>
        </div>

        <div
          ref={card2Ref}
          className="opacity-0 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-6 py-4 cursor-default"
        >
          <p className="text-xs text-orange-400 font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400" /> Mascotas felices
          </p>
          <p className="text-3xl font-black text-white mt-1">500+</p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40 opacity-0"
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
          <rect x="10" y="0" width="2" height="26" rx="1" fill="currentColor" />
          <path d="M5 22L11 30L17 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
}