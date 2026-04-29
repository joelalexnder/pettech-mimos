"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Camera, Sparkles, Bone, AlertCircle, Heart, ShieldCheck, CheckCircle2 } from "lucide-react";
import { generarLinkWhatsApp } from "@/lib/whatsapp";

interface ResultadoIA {
    raza: string;
    personalidad: string;
    cuidados: string;
    curiosidad: string;
    servicioRecomendado: string;
    motivoServicio: string;
}

export default function EscanerMascota() {
    const [imagenUrl, setImagenUrl] = useState<string | null>(null);
    const [analizando, setAnalizando] = useState(false);
    const [resultado, setResultado] = useState<ResultadoIA | null>(null);
    const [errorTexto, setErrorTexto] = useState<string | null>(null);

    const manejarSubida = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImagenUrl(URL.createObjectURL(file));
        setAnalizando(true);
        setResultado(null);
        setErrorTexto(null);

        const formData = new FormData();
        formData.append("image", file);

        try {
        const res = await fetch("/api/scanner", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "No pudimos analizar la imagen.");
        setResultado(data);
        } catch (error: any) {
        setErrorTexto(error.message);
        } finally {
        setAnalizando(false);
        }
    };

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* =========================================
            LADO IZQUIERDO: ZONA DE FOTO 
            ========================================= */}
        <div className="lg:col-span-5 lg:sticky lg:top-8">
            <motion.div 
            layout
            className="bg-white rounded-4xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden relative"
            >
            {!imagenUrl ? (
                <div className="p-8 flex flex-col gap-4">
                <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-10 h-10 text-teal-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Sube a tu mascota</h3>
                    <p className="text-slate-500 text-sm mt-2">Formatos: JPG, PNG. Intenta que su carita se vea clara.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Botón: Abrir Cámara (Funciona perfecto en móviles con capture="environment") */}
                    <label className="flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all group">
                    <Camera className="w-8 h-8 mb-3 text-slate-400 group-hover:text-orange-500 transition-colors" />
                    <span className="font-semibold text-sm text-center">Tomar Foto</span>
                    <input type="file" accept="image/*" capture="environment" onChange={manejarSubida} className="hidden" />
                    </label>

                    {/* Botón: Subir de Galería */}
                    <label className="flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-teal-50 hover:border-teal-200 hover:text-teal-600 transition-all group">
                    <UploadCloud className="w-8 h-8 mb-3 text-slate-400 group-hover:text-teal-500 transition-colors" />
                    <span className="font-semibold text-sm text-center">Subir Galería</span>
                    <input type="file" accept="image/*" onChange={manejarSubida} className="hidden" />
                    </label>
                </div>
                </div>
            ) : (
                <div className="relative aspect-4/5 w-full bg-slate-900 flex justify-center items-center overflow-hidden">
                <img src={imagenUrl} alt="Tu perrito" className="object-cover w-full h-full opacity-70" />
                
                {/* Efecto de Escáner en proceso */}
                {analizando && (
                    <>
                    <motion.div 
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-full h-1 bg-teal-400 shadow-[0_0_25px_rgba(45,212,191,1)] z-10"
                    />
                    <div className="absolute inset-0 bg-teal-900/30 z-0"></div>
                    </>
                )}

                {/* Efecto de Éxito al terminar */}
                {resultado && !analizando && (
                    <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-2xl flex items-center gap-3 shadow-lg"
                    >
                    <CheckCircle2 className="text-teal-500 w-6 h-6" />
                    <div>
                        <p className="text-xs font-bold text-teal-600 uppercase">Match Encontrado</p>
                        <p className="font-bold text-slate-800 line-clamp-1">{resultado.raza}</p>
                    </div>
                    </motion.div>
                )}
                </div>
            )}
            </motion.div>

            
            <AnimatePresence>
            {imagenUrl && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex justify-center">
                <button onClick={() => {setImagenUrl(null); setResultado(null);}} className="text-sm text-slate-500 hover:text-orange-500 font-semibold flex items-center gap-2 transition-colors">
                    <Camera className="w-4 h-4" /> Intentar con otra foto
                </button>
                </motion.div>
            )}
            </AnimatePresence>
        </div>


        {/* =========================================
            LADO DERECHO: ZONA DE DATOS Y ESTADOS
            ========================================= */}
        <div className="lg:col-span-7 flex flex-col justify-center min-h-100">
            
            {/* ESTADO 1: Inicial (Sin foto) */}
            <AnimatePresence mode="wait">
            {!imagenUrl && !analizando && !resultado && (
                <motion.div 
                key="inicio"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
                >
                <h2 className="text-2xl font-bold text-slate-800">¿Cómo funciona?</h2>
                <div className="grid gap-4">
                    <div className="flex gap-4 items-start bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <div className="bg-teal-50 p-3 rounded-xl"><Camera className="text-teal-600 w-6 h-6" /></div>
                    <div>
                        <h4 className="font-bold text-slate-800">1. Toma la foto</h4>
                        <p className="text-sm text-slate-500 mt-1">Usa la cámara de tu celular o sube una desde tu galería.</p>
                    </div>
                    </div>
                    <div className="flex gap-4 items-start bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <div className="bg-orange-50 p-3 rounded-xl"><Sparkles className="text-orange-600 w-6 h-6" /></div>
                    <div>
                        <h4 className="font-bold text-slate-800">2. Análisis de IA</h4>
                        <p className="text-sm text-slate-500 mt-1">Nuestra tecnología comparará sus rasgos con miles de razas.</p>
                    </div>
                    </div>
                    <div className="flex gap-4 items-start bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <div className="bg-teal-50 p-3 rounded-xl"><Heart className="text-teal-600 w-6 h-6" /></div>
                    <div>
                        <h4 className="font-bold text-slate-800">3. Resultados y Cuidados</h4>
                        <p className="text-sm text-slate-500 mt-1">Recibe información valiosa y recomendaciones de Mimos Pet Club.</p>
                    </div>
                    </div>
                </div>
                </motion.div>
            )}

            {/* ESTADO 2: Analizando (Animación de hueso) */}
            {analizando && (
                <motion.div 
                key="cargando"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center h-full space-y-6"
                >
                {/* El Huesito Rebotando */}
                <motion.div 
                    animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="bg-orange-100 p-6 rounded-3xl shadow-inner border border-orange-200"
                >
                    <Bone className="w-16 h-16 text-orange-500" />
                </motion.div>
                <div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Extrayendo ADN Canino...</h3>
                    <p className="text-slate-500">Nuestra IA está buscando en su base de datos.</p>
                </div>
                </motion.div>
            )}

            {/* ESTADO 3: Resultados Cards alineadas*/}
            {resultado && !analizando && (
                <motion.div 
                key="resultados"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ staggerChildren: 0.1 }}
                className="space-y-6"
                >
                {/* Título de Resultados */}
                <div className="mb-8">
                    <h2 className="text-4xl font-black text-slate-800 leading-tight">
                    Parece que tu mejor amigo es un <br/>
                    <span className="text-teal-600">{resultado.raza}</span>
                    </h2>
                </div>

                {/* Grid de Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg"><Heart className="w-5 h-5 text-orange-600"/></div>
                        <h3 className="font-bold text-slate-800">Personalidad</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{resultado.personalidad}</p>
                    </motion.div>

                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-teal-100 p-2 rounded-lg"><Bone className="w-5 h-5 text-teal-600"/></div>
                        <h3 className="font-bold text-slate-800">Dato Curioso</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{resultado.curiosidad}</p>
                    </motion.div>
                </div>

                {/* Tarjeta CTA de Venta */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-slate-900 rounded-4xl p-8 mt-4 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
                    <div className="relative z-10">
                    <span className="text-teal-400 font-bold text-xs tracking-widest uppercase mb-2 block">
                        Sugerencia Mimos Pet Club
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-3">
                        {resultado.servicioRecomendado}
                    </h3>
                    <p className="text-slate-300 text-sm mb-6 max-w-md leading-relaxed">
                        {resultado.motivoServicio} <br/><br/>
                        <strong className="text-white">{resultado.cuidados}</strong>
                    </p>
                    
                    <button 
                        onClick={() => window.open(generarLinkWhatsApp(`Hola Mimos Pet Club, mi perro es un ${resultado.raza} y la IA me recomendó su servicio de ${resultado.servicioRecomendado}. ¿Me dan más info?`), "_blank")}
                        className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-6 rounded-xl w-full sm:w-auto transition-colors shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
                    >
                        Reserva este servicio
                    </button>
                    </div>
                </motion.div>

                </motion.div>
            )}
            </AnimatePresence>

            {/* Zona de Errores */}
            {errorTexto && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{errorTexto}</p>
            </div>
            )}

        </div>
        </div>
    );
}