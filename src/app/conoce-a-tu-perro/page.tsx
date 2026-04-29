"use client";

import EscanerMascota from "@/components/features/EscanerMascota";
import { motion } from "framer-motion";

export default function ConoceATuPerroPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 lg:px-8 relative overflow-hidden">
        {/* Fondo decorativo*/}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-50 rounded-l-[100px] opacity-50 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 lg:w-2/3"
            >
            <span className="inline-block py-1.5 px-4 rounded-full bg-teal-100 text-teal-700 font-bold text-xs tracking-widest mb-6 border border-teal-200 shadow-sm">
                MIMOS VISION AI
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Descubre qué hace <br />
                <span className="text-teal-600">único a tu perro</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Nuestra IA analiza los rasgos físicos de tu mascota en segundos. Toma una foto y descubre su raza, nivel de energía y qué servicios de Mimos Pet Club le convienen más.
            </p>
            </motion.div>

            {/* el componente ahora manejará su propia distribución */}
            <EscanerMascota />
        </div>
        </div>
    );
}