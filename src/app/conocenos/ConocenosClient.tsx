"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ConocenosClient() {
    const heroRef = useRef(null);
    const { scrollYProgress: heroScroll } = useScroll({ 
        target: heroRef, 
        offset: ["start start", "end start"] 
    });
    
    const heroY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
    const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
    return (
        <main className="bg-[#fdfbf7] selection:bg-orange-500 selection:text-white">
        <section 
            ref={heroRef} 
            className="relative h-[75vh] min-h-150 w-full flex items-center justify-center overflow-hidden bg-[#0d0d0f]"
        >
            <motion.div className="absolute inset-0 w-full h-full z-0" style={{ y: heroY }}>
            <Image
                src="/images/hero1.webp" 
                alt="Fondo Mimos Pet Club"
                fill
                className="object-cover opacity-50"
                priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/30 to-[#0d0d0f]" />
            </motion.div>

            <motion.div 
            className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center mt-8"
            style={{ opacity: heroOpacity }}
            >
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-8 backdrop-blur-md"
            >
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                Nuestra Esencia
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
                className="relative w-70 sm:w-87.5 md:w-112.5 lg:w-125 aspect-square md:aspect-video"
            >
                <div className="relative w-full h-full rounded-4xl overflow-hidden shadow-2xl shadow-yellow-500/20 ring-1 ring-white/10 group">
                <Image 
                    src="/mimos.webp" 
                    alt="Logo Banner Mimos Pet Club"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                </div>
                <div className="absolute -inset-4 bg-yellow-500/20 blur-3xl rounded-full -z-10 opacity-50" />
            </motion.div>
            
            </motion.div>
        </section>
        <section className="relative z-20 -mt-10 bg-[#fdfbf7] rounded-t-[3rem] py-24 md:py-32 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="lg:col-span-7 flex flex-col justify-center"
            >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                No cuidamos mascotas,<br />
                <span className="text-[#00a3e0]">protegemos familia.</span> {/* Usé el azul de tu logo para el contraste */}
                </h2>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                className="lg:col-span-5 flex flex-col justify-center"
            >
                <p className="text-lg md:text-xl font-light text-slate-600 tracking-wide leading-relaxed max-w-md">
                Mimos Pet Club nace de una devoción innegociable. Hemos diseñado un santuario premium donde la empatía humana y el rigor clínico convergen en cada detalle.
                </p>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 lg:mt-16"
            >
                <div className="relative h-100 md:h-125 rounded-3xl overflow-hidden group shadow-xl shadow-orange-500/5">
                <Image 
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80" 
                    alt="Interacción amorosa con perros" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                </div>
                <div className="relative h-100 md:h-125 rounded-3xl overflow-hidden group shadow-xl shadow-slate-900/5 lg:-translate-y-12">
                <Image 
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" 
                    alt="Instalaciones premium" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                </div>
                <div className="relative h-100 md:h-125 rounded-3xl overflow-hidden group shadow-xl shadow-orange-500/5 sm:hidden lg:block">
                <Image 
                    src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80" 
                    alt="Atención veterinaria delicada" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                </div>
            </motion.div>
            </div>
        </section>  
    </main>
    );
}



