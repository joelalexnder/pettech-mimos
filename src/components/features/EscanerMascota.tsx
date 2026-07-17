/*
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion"; 
import { UploadCloud, Camera, Sparkles, AlertCircle, Heart, CheckCircle2, RefreshCw, MessageCircle, Info } from "lucide-react";
import { generarLinkWhatsApp } from "@/lib/whatsapp";

import { SERVICES_DATA } from "@/app/servicios/constants"; 

interface ResultadoIA {
    raza: string;
    personalidad: string;
    cuidados: string;
    curiosidad: string;
    servicioRecomendado: string;
    motivoServicio: string;
}

const optimizarImagenCliente = (file: File, maxDimension: number = 800): Promise<File> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;

            if (width > maxDimension || height > maxDimension) {
            const ratio = Math.min(maxDimension / width, maxDimension / height);
            width *= ratio;
            height *= ratio;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
            if (blob) {
                resolve(new File([blob], "mascota_optimizada.jpg", { type: "image/jpeg" }));
            } else {
                reject(new Error("No se pudo crear la imagen optimizada."));
            }
            }, "image/jpeg", 0.85); 
        };
        img.onerror = () => reject(new Error("Error al cargar la imagen original."));
    };
    reader.onerror = () => reject(new Error("Error al leer el archivo."));
});
};

const fadeUp: Variants = { 
hidden: { opacity: 0, y: 16 },
show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
exit:  { opacity: 0, y: -8, transition: { duration: 0.22 } },
};
const cardAnim: Variants = { 
hidden: { opacity: 0, y: 12 }, 
show: { opacity: 1, y: 0, transition: { duration: 0.35 } } 
};
const staggerContainerVariant: Variants = {
hidden: { opacity: 0, y: 16 },
show: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 } 
},
exit: { opacity: 0, y: -8, transition: { duration: 0.22 } },
};

const PASOS = [
{ icon: Camera,  teal: true,  num: "01", title: "Toma la foto",        desc: "Usa la cámara o sube desde galería." },
{ icon: Sparkles, teal: false, num: "02", title: "Análisis con IA",        desc: "Compara los rasgos con miles de razas." },
{ icon: Heart,    teal: true,  num: "03", title: "Cuidados personalizados", desc: "Descubre el servicio ideal para él." },
];

export default function EscanerMascota() {
const [imagenUrl, setImagenUrl]   = useState<string | null>(null);
const [analizando, setAnalizando] = useState(false);
const [resultado, setResultado]   = useState<ResultadoIA | null>(null);
const [error, setError]           = useState<string | null>(null);
const [dragOver, setDragOver]     = useState(false);
const blobRef = useRef<string | null>(null);

useEffect(() => () => { if (blobRef.current) URL.revokeObjectURL(blobRef.current); }, []);

const procesar = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (blobRef.current) URL.revokeObjectURL(blobRef.current);
    
    const url = URL.createObjectURL(file);
    blobRef.current = url;
    setImagenUrl(url);
    setAnalizando(true);
    setResultado(null);
    setError(null);
    
    try {
        const optimizedFile = await optimizarImagenCliente(file);
        const fd = new FormData();
        fd.append("image", optimizedFile); 

        const res  = await fetch("/api/scanner", { method: "POST", body: fd });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || "No pudimos analizar la imagen.");
        setResultado(data);
    } catch (e: any) {
        setError(e.message ?? "Error inesperado.");
    } finally {
        setAnalizando(false);
    }
}, []);

const onInput  = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) procesar(f); e.target.value = ""; }, [procesar]);
const onDrop   = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) procesar(f); }, [procesar]);
const reiniciar = useCallback(() => { if (blobRef.current) { URL.revokeObjectURL(blobRef.current); blobRef.current = null; } setImagenUrl(null); setResultado(null); setError(null); }, []);

const obtenerServicioIdeal = () => {
    if (!resultado) return null;
    const recomendacionIA = resultado.servicioRecomendado.toLowerCase();
    
    if (recomendacionIA.includes("clínica") || recomendacionIA.includes("veterinaria")) {
        return SERVICES_DATA.find(s => s.id.includes("veterinaria")) || SERVICES_DATA[0];
    }
    if (recomendacionIA.includes("peluquería") || recomendacionIA.includes("spa") || recomendacionIA.includes("deslanado")) {
        return SERVICES_DATA.find(s => s.id.includes("peluqueria")) || SERVICES_DATA[4];
    }
    if (recomendacionIA.includes("colegio") || recomendacionIA.includes("entrenamiento")) {
        return SERVICES_DATA.find(s => s.id.includes("colegio")) || SERVICES_DATA[3];
    }
    if (recomendacionIA.includes("guardería")) {
        return SERVICES_DATA.find(s => s.id.includes("guarderia")) || SERVICES_DATA[2];
    }
    if (recomendacionIA.includes("hotel")) {
        return SERVICES_DATA.find(s => s.id.includes("hospedaje")) || SERVICES_DATA[1];
    }
    if (recomendacionIA.includes("pet shop") || recomendacionIA.includes("accesorios")) {
        return SERVICES_DATA.find(s => s.id.includes("accesorios")) || SERVICES_DATA[5];
    }

    return SERVICES_DATA[0]; 
};

const servicioIdeal = obtenerServicioIdeal();

const whatsApp  = useCallback(() => { 
    if (!resultado || !servicioIdeal) return; 
    const mensajeBase = servicioIdeal.waMessage || "Hola Mimos Pet Club!";
    const mensajeFinal = `${mensajeBase} (La IA escaneó a mi ${resultado.raza})`;
    window.open(generarLinkWhatsApp(mensajeFinal), "_blank", "noopener,noreferrer"); 
}, [resultado, servicioIdeal]);

return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
    <div className="lg:col-span-5 lg:sticky lg:top-8">
        <AnimatePresence mode="wait">
        {!imagenUrl ? (
            <motion.div key="upload" variants={fadeUp} initial="hidden" animate="show" exit="exit"
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`relative rounded-4xl border-2 border-dashed overflow-hidden transition-all duration-300 ${dragOver ? "border-teal-400 bg-teal-50/80" : "border-slate-200 bg-white hover:border-teal-300"}`}
            >
            <div aria-hidden className="absolute -top-12 -right-12 w-52 h-52 bg-orange-100/50 rounded-full pointer-events-none" />
            <div aria-hidden className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-100/50 rounded-full pointer-events-none" />
            <div className="relative p-8 flex flex-col items-center text-center gap-6">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="w-24 h-24 bg-linear-to-br from-teal-400 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl shadow-teal-200/70">
                <Camera className="w-11 h-11 text-white" aria-hidden />
                </motion.div>
                <div>
                <h3 className="text-xl font-bold text-slate-800">Sube a tu mascota</h3>
                <p className="text-slate-400 text-sm mt-1">{dragOver ? "¡Suéltalo aquí! 🐾" : "Arrastra aquí o usa los botones"}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                <label className="flex flex-col items-center gap-2 p-5 bg-orange-50 hover:bg-orange-100 active:scale-95 rounded-2xl cursor-pointer transition-all border border-orange-100 hover:border-orange-300 shadow-sm">
                    <Camera className="w-7 h-7 text-orange-500" aria-hidden />
                    <span className="text-sm font-semibold text-orange-700">Cámara</span>
                    <input type="file" accept="image/*" capture="environment" onChange={onInput} className="sr-only" />
                </label>
                <label className="flex flex-col items-center gap-2 p-5 bg-teal-50 hover:bg-teal-100 active:scale-95 rounded-2xl cursor-pointer transition-all border border-teal-100 hover:border-teal-300 shadow-sm">
                    <UploadCloud className="w-7 h-7 text-teal-500" aria-hidden />
                    <span className="text-sm font-semibold text-teal-700">Galería</span>
                    <input type="file" accept="image/*" onChange={onInput} className="sr-only" />
                </label>
                </div>
                <p className="text-xs text-slate-400">JPG, PNG · Muestra bien la carita 🐶</p>
            </div>
            </motion.div>
        ) : (
            <motion.div key="photo" variants={fadeUp} initial="hidden" animate="show" exit="exit"
            className="rounded-4xl overflow-hidden shadow-2xl shadow-slate-300/40">
            <div className="aspect-4/5 bg-slate-900 relative overflow-hidden">
                <img src={imagenUrl} alt="Tu mascota" decoding="async"
                className="object-cover w-full h-full transition-opacity duration-500"
                style={{ opacity: analizando ? 0.55 : 1 }} />
                {analizando && (
                <>
                    <div aria-hidden className="absolute inset-0 bg-teal-900/20 z-10 pointer-events-none" />
                    <motion.div aria-hidden
                    initial={{ top: "0%" }} animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-0.75 z-20 pointer-events-none"
                    style={{ background: "linear-gradient(90deg,transparent,#2dd4bf 30%,#5eead4 50%,#2dd4bf 70%,transparent)", boxShadow: "0 0 18px 5px rgba(45,212,191,0.65)" }} />
                    {["top-4 left-4 border-t-[3px] border-l-[3px]","top-4 right-4 border-t-[3px] border-r-[3px]","bottom-4 left-4 border-b-[3px] border-l-[3px]","bottom-4 right-4 border-b-[3px] border-r-[3px]"].map((c, i) => (
                    <div key={i} aria-hidden className={`absolute ${c} w-6 h-6 border-teal-400 rounded-sm z-20`} />
                    ))}
                </>
                )}
                {resultado && !analizando && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl flex items-center gap-3 shadow-xl">
                    <div className="bg-teal-100 p-2 rounded-xl shrink-0"><CheckCircle2 className="text-teal-600 w-5 h-5" aria-hidden /></div>
                    <div className="min-w-0">
                    <p className="text-[11px] font-bold text-teal-600 uppercase tracking-wider">Raza identificada</p>
                    <p className="font-bold text-slate-800 text-sm truncate">{resultado.raza}</p>
                    </div>
                </motion.div>
                )}
            </div>
            <button onClick={reiniciar} className="w-full bg-white py-3 flex items-center justify-center gap-2 text-sm font-semibold text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-colors">
                <RefreshCw className="w-4 h-4" aria-hidden /> Escanear otra mascota
            </button>
            </motion.div>
        )}
        </AnimatePresence>
    </div>

    <div className="lg:col-span-7 min-h-105 flex flex-col justify-center">
        <AnimatePresence mode="wait">

        {!imagenUrl && !analizando && !resultado && (
            <motion.div key="instructions" variants={staggerContainerVariant} initial="hidden" animate="show" exit="exit" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">¿Cómo funciona?</h2>
            {PASOS.map(({ icon: Icon, teal, num, title, desc }) => (
                <motion.div key={num} variants={cardAnim}
                className="flex gap-4 items-start bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all will-change-transform">
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${teal ? "bg-teal-50" : "bg-orange-50"}`}>
                    <Icon className={`w-6 h-6 ${teal ? "text-teal-500" : "text-orange-500"}`} aria-hidden />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-black tracking-widest ${teal ? "text-teal-400" : "text-orange-400"}`}>{num}</span>
                    <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
                </motion.div>
            ))}
            </motion.div>
        )}

        {analizando && (
            <motion.div key="analyzing" variants={fadeUp} initial="hidden" animate="show" exit="exit"
            className="flex flex-col items-center justify-center text-center py-12 space-y-8" aria-live="polite">
            <div className="relative flex items-center justify-center">
                <motion.div aria-hidden animate={{ scale: [1, 1.65, 1], opacity: [0.3, 0, 0.3] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="absolute w-36 h-36 bg-orange-200 rounded-full" />
                <motion.div animate={{ y: [0, -14, 0], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
                className="relative bg-linear-to-br from-orange-100 to-orange-200 p-7 rounded-4xl border-2 border-orange-200 shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                </motion.div>
            </div>
            <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Analizando a tu perro…</h3>
                <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">Examinando pelaje, orejas y rasgos faciales.</p>
                <div className="flex justify-center gap-2 mt-4" aria-hidden>
                {[0, 0.28, 0.56].map((d, i) => (
                    <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.1, delay: d }}
                    className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                ))}
                </div>
            </div>
            </motion.div>
        )}

        {resultado && !analizando && servicioIdeal && (
            <motion.div key="results" variants={staggerContainerVariant} initial="hidden" animate="show" exit="exit" className="space-y-6">
            
            <motion.div variants={cardAnim}>
                <p className="text-xs font-bold text-teal-500 tracking-widest uppercase mb-2">Análisis completado ✓</p>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                Tu amigo es un<br /><span className="text-teal-600">{resultado.raza}</span>
                </h2>
            </motion.div>

            <motion.div variants={cardAnim} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-orange-500" aria-hidden />
                </div>
                <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Personalidad</p>
                <p className="text-sm text-slate-700 leading-relaxed">{resultado.personalidad}</p>
                </div>
            </motion.div>

            <motion.div variants={cardAnim} className="bg-white border border-slate-200 rounded-4xl overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Sugerencia Mimos Pet Club</span>
                </div>

                <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-1">{servicioIdeal.title}</h3>
                    <p className="text-slate-500 text-sm font-medium">{servicioIdeal.tagline || resultado.cuidados}</p>
                    </div>
                </div>

                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-900 leading-relaxed">
                    <span className="font-bold">Análisis IA:</span> {resultado.motivoServicio}
                    </p>
                </div>

                <div>
                    <p className="text-sm font-bold text-slate-800 mb-3">¿Qué incluye nuestro servicio?</p>
                    <ul className="space-y-3">
                    {servicioIdeal.benefits?.map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 ${servicioIdeal.accent || "text-emerald-500"}`} />
                        <span className="leading-tight pt-0.5">{benefit}</span>
                        </li>
                    ))}
                    </ul>
                </div>

                <button 
                    onClick={whatsApp}
                    className="w-full sm:w-auto mt-8 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-orange-500/30 hover:-translate-y-0.5"
                >
                    <MessageCircle className="w-5 h-5" fill="currentColor" />
                    Reservar este servicio
                </button>
                </div>
            </motion.div>
            </motion.div>
        )}
        </AnimatePresence>

        {error && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="alert"
            className="mt-5 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden />
            <div><p className="font-bold text-sm">Algo salió mal</p><p className="text-sm opacity-80 mt-0.5">{error}</p></div>
        </motion.div>
        )}
    </div>
    </div>
);
}

*/