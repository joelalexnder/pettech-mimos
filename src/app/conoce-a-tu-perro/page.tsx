import { redirect } from 'next/navigation';

export default function EscanerPage() {
    redirect('/'); 
}
/*
"use client";

import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { ScrollBar } from "@/components/inicio/shared";
import { main } from "framer-motion/client";

const EscanerMascota = dynamic(() => import("@/components/features/EscanerMascota"), {
    loading: () => (
        <div className="w-full min-h-150 lg:min-h-112.5 rounded-4xl bg-slate-100 animate-pulse border-2 border-slate-200/50" aria-hidden />
    ),
    ssr: false, 
});

const heroVariant: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const badgeVariant: Variants = {
    hidden: { opacity: 0, scale: 0.88 },
    show: {
        opacity: 1, scale: 1,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
};

const scannerVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
    },
};

const PETS = ["🐶", "🐕", "🦮", "🐩"] as const;

export default function ConoceATuPerroPage() {
    return (
        <main>
            <ScrollBar />
        
        <div className="min-h-screen bg-[#f8faf9] pt-28 pb-24 px-4 lg:px-8 relative overflow-hidden">

            <div aria-hidden className="absolute top-0 right-0 w-[55%] h-[70%] bg-linear-to-bl from-teal-50 to-transparent rounded-bl-[120px] pointer-events-none" />
            <div aria-hidden className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100/60 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3" />
            <div aria-hidden className="absolute top-40 right-16 w-3 h-3 bg-teal-300 rounded-full opacity-60 pointer-events-none" />
            <div aria-hidden className="absolute top-64 right-32 w-2 h-2 bg-orange-300 rounded-full opacity-60 pointer-events-none" />
            <div aria-hidden className="absolute bottom-48 left-16 w-4 h-4 bg-teal-200 rounded-full opacity-50 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">

                <motion.div
                    variants={heroVariant}
                    initial="hidden"
                    animate="show"
                    className="mb-14 max-w-2xl"
                >
                    <motion.div
                        variants={badgeVariant}
                        initial="hidden"
                        animate="show"
                        className="inline-flex items-center gap-2 bg-white border border-teal-200 text-teal-700 font-bold text-xs tracking-widest px-4 py-2 rounded-full shadow-sm mb-6"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-teal-500" aria-hidden />
                        MIMOS VISION AI
                        <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-5 leading-[1.1] tracking-tight">
                        Descubre qué hace{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-teal-600">único</span>
                            <svg
                                aria-hidden
                                className="absolute -bottom-1 left-0 w-full"
                                viewBox="0 0 100 8"
                                preserveAspectRatio="none"
                                style={{ height: 6 }}
                            >
                                <path
                                    d="M0,6 Q50,0 100,6"
                                    stroke="#2dd4bf"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                    opacity="0.5"
                                />
                            </svg>
                        </span>{" "}
                        a tu perro
                    </h1>

                    <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                        Nuestra IA analiza los rasgos físicos de tu mascota en segundos.
                        Toma una foto y descubre su raza, personalidad y qué servicios de{" "}
                        <span className="font-semibold text-slate-700">Mimos Pet Club</span> le van mejor.
                    </p>

                    <div className="flex items-center gap-3 mt-6">
                        <div className="flex -space-x-2" aria-hidden>
                            {PETS.map((emoji, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center text-sm"
                                >
                                    {emoji}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex items-center gap-0.5" aria-label="5 estrellas">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" aria-hidden />
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 font-medium">+1,200 mascotas identificadas</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    variants={scannerVariant}
                    initial="hidden"
                    animate="show"
                >
                    <EscanerMascota />
                </motion.div>
                <p className="text-center text-xs text-slate-400 mt-16 max-w-md mx-auto leading-relaxed">
                    Los resultados son orientativos. Para una identificación precisa de la raza,
                    consulta a un veterinario.
                </p>
            </div>
        </div>
        </main>
    );
}

*/