"use client";

import { motion } from "framer-motion";

export default function Location() {
    return (
    <section id="ubicacion" className="relative pt-24 pb-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
                <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-black text-orange-500 uppercase tracking-[0.22em] mb-4 block"
                >
                Ubicación
                </motion.span>
                <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[clamp(2.5rem,5vw,3.5rem)] font-black text-slate-900 tracking-tighter leading-tight mb-10"
                >
                Encuéntranos en <span className="text-orange-500">Tacna</span>
                </motion.h2>

                <address className="not-italic space-y-8">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-5 items-start"
                >
                    <div className="mt-1 w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 text-orange-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    </div>
                    <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Dirección</h3>
                    <p className="text-slate-500 leading-relaxed">
                        Av. 200 Millas esq. Cristo Rey<br />
                        Tacna, Perú
                    </p>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-5 items-start"
                >
                    <div className="mt-1 w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 text-orange-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                    </div>
                    <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Referencia</h3>
                    <p className="text-slate-500 leading-relaxed">
                        A media cuadra del parque principal, frente al grifo.
                    </p>
                    </div>
                </motion.div>
                </address>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full h-100 lg:h-120 rounded-4xl overflow-hidden shadow-2xl shadow-slate-200/50 border-4 border-white relative z-10"
            >
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1896.9294020092586!2d-70.274669!3d-18.0317552!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915acf67326e1c01%3A0x349e198fd06e6f2!2sMIMOS%20Pet%20Club!5e0!3m2!1ses!2spe!4v1780460959305!5m2!1ses!2spe" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Mimos Pet Club"
                />
            </motion.div>

            </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-15 lg:h-25">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.98,130.12,201.3,121.21,242.45,116.03,283.43,84.4,321.39,56.44Z" fill="#fdfbf7" />
            </svg>
        </div>
    </section>
);
}