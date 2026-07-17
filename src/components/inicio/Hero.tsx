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
  { src: "/images/hero1.webp", alt: "Clínica veterinaria y cuidado de mascotas" },
  { src: "/images/hero2.webp", alt: "Mascota en hospedaje premium" },
  { src: "/images/hero3.webp", alt: "Cuidado profesional de mascotas" },
];

const tickerItems = [
  "Clínica Veterinaria",
  "Hospedaje 24/7",
  "Grooming Spa",
  "Escuela Canina",
  "Transporte Pet",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(imageWrapRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(eyebrowRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8 }, 0)
        .fromTo([line1Ref.current, line2Ref.current, line3Ref.current], { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0.15)
        .fromTo(metaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, 0.7)
        .fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, 0.85)
        .fromTo(bentoRef.current?.children ?? [], { opacity: 0, y: 40, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.1, ease: "back.out(1.4)" }, 0.6)
        .fromTo(tickerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.1);

      const btn = magneticRef.current;
      if (btn) {
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.2, y: y * 0.3, duration: 0.4, ease: "power3.out" });
        };
        const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-125 overflow-hidden bg-[#071120] text-white flex flex-col justify-between">
      
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }}
      />

      <div className="flex-1 w-full h-full relative z-10">
        
        <div className="relative z-20 w-full lg:w-[60%] h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-20 pb-32">
          
          <div ref={eyebrowRef} className="opacity-0 flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-orange-400" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-white/60 font-medium">
              Pet Club · Tacna, Perú
            </span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
            </span>
          </div>

          <h1 className="font-black leading-[0.85] tracking-[-0.04em] text-[clamp(3.5rem,9vw,8rem)]">
            <span className="block overflow-hidden">
              <span ref={line1Ref} className="block text-transparent bg-clip-text bg-linear-to-r from-orange-300 via-orange-400 to-amber-500">
                El cuidado
              </span>
            </span>
            <span className="block overflow-hidden">
              <span ref={line2Ref} className="block italic font-light text-transparent bg-clip-text bg-linear-to-r from-orange-300 via-orange-400 to-amber-500" style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif" }}>
                que se siente
              </span>
            </span>
            <span className="block overflow-hidden">
              <span ref={line3Ref} className="block text-white">
                como hogar.
              </span>
            </span>
          </h1>

          <div ref={metaRef} className="opacity-0 mt-10 flex flex-col sm:flex-row items-start gap-6 max-w-xl">
            <div className="h-px sm:h-12 w-12 sm:w-px bg-white/30 mt-3 shrink-0" />
            <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light">
              Clínica veterinaria, hospedaje, grooming y educación canina.
            </p>
          </div>

          <div ref={ctaRef} className="opacity-0 mt-10 flex flex-wrap items-center gap-6">
            <a
              ref={magneticRef}
              href="https://wa.me/51952189680"
              target="_blank"
              rel="noreferrer noopener"
              className="group relative inline-flex items-center gap-3 bg-white text-black pl-7 pr-3 py-3 rounded-full font-bold text-sm uppercase tracking-wider overflow-hidden will-change-transform"
            >
              <span className="relative z-10">Reservar visita</span>
              <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-orange-400 text-black transition-transform duration-300 group-hover:rotate-45">
                →
              </span>
              <span className="absolute inset-0 bg-orange-400 rounded-full scale-0 group-hover:scale-100 origin-left transition-transform duration-500 ease-out" />
            </a>

            <Link href="/servicios" className="group inline-flex items-center gap-2 text-sm uppercase tracking-wider text-white/80 hover:text-white font-medium transition-colors">
              <span className="relative">
                Explorar servicios
                <span className="absolute -bottom-1 left-0 h-px w-full bg-white/30 group-hover:bg-orange-400 transition-colors" />
              </span>
            </Link>
          </div>
        </div>

        <div 
          ref={imageWrapRef} 
          className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[55%] h-full z-0 lg:z-10"
          style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)" }}
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
                    quality={85}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent lg:from-[#0a0a0a]/30 lg:via-transparent lg:to-transparent z-10" />
        </div>

      </div>

      <div ref={bentoRef} className="hidden lg:flex absolute bottom-28 right-10 z-30 gap-4">
        <div className="backdrop-blur-xl bg-orange-500 text-black rounded-2xl p-5 shadow-2xl shadow-orange-500/20 w-40">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-80">Mascotas</p>
          <p className="text-3xl font-black leading-none mt-2">500+</p>
          <p className="text-xs mt-1 font-semibold opacity-80">felices este año</p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 shadow-2xl w-40">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold">Online</p>
          <p className="text-3xl font-black leading-none mt-2 text-white">24/7</p>
          <p className="text-xs mt-1 text-white/70 font-medium">cámaras en vivo</p>
        </div>
      </div>

      <div 
        ref={tickerRef} 
        className="opacity-0 absolute bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md py-4 overflow-hidden"
      >
        <div 
          className="flex whitespace-nowrap w-max"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-12 text-sm font-semibold uppercase tracking-[0.25em] text-white/60 px-6">
              <span>{item}</span>
              <span className="text-orange-500">✦</span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />

    </section>
  );
}