"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
      <footer className="bg-slate-950 text-white pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 pb-12 border-b border-white/10">

            <div className="md:col-span-1">
              <div className="font-black text-2xl tracking-tighter mb-4">
                MIMOS <span className="text-orange-500">PET</span> CLUB
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                El premier destination para el bienestar animal en Lima, Perú.
              </p>
              <div className="flex gap-3">
                {["IG", "FB", "TK", "YT"].map((s) => (
                  <motion.a
                    key={s}
                    href="#"
                    whileHover={{ y: -3, color: "#f97316" }}
                    className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/60 text-[10px] font-black hover:text-orange-400 hover:border-orange-400/40 transition-colors"
                  >
                    {s}
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-5">Servicios</div>
              <ul className="space-y-3">
                {["Grooming profesional", "Colegio canino", "Hotel para mascotas", "Veterinaria", "Probador IA"].map((s) => (
                  <li key={s}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2"
                    >
                      <span className="text-orange-500 text-xs">→</span>
                      {s}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-5">Empresa</div>
              <ul className="space-y-3">
                {["Sobre nosotros", "El equipo", "Nuestra historia", "Blog", "Trabaja con nosotros"].map((s) => (
                  <li key={s}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2"
                    >
                      <span className="text-orange-500 text-xs">→</span>
                      {s}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-5">Contacto</div>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <span className="text-orange-500 mt-0.5 shrink-0">📍</span>
                  <span className="text-white/50">Miraflores, Lima, Perú</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 shrink-0">📞</span>
                  <a href="tel:+51952189680" className="text-white/50 hover:text-white transition-colors">+51 952 189 680</a>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 shrink-0">📧</span>
                  <a href="mailto:hola@mimospetclub.pe" className="text-white/50 hover:text-white transition-colors">hola@mimospetclub.pe</a>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 shrink-0">🕐</span>
                  <span className="text-white/50">Lun–Sáb 8am–7pm</span>
                </li>
              </ul>

              <motion.a
                href="https://wa.me/51952189680"
                whileHover={{ scale: 1.04 }}
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-orange-500 text-white font-bold rounded-xl text-sm"
              >
                Escribir por WhatsApp →
              </motion.a>
            </div>
          </div>

          <div className="pt-8 flex col md:row items-center justify-between gap-4">
            <p className="text-white/25 text-xs tracking-widest uppercase">
              © 2026 Mimos Pet Club · Todos los derechos reservados
            </p>
            <div className="flex gap-6">
              {["Privacidad", "Términos", "Cookies"].map((l) => (
                <a key={l} href="#" className="text-white/25 hover:text-white/60 text-xs transition-colors uppercase tracking-wider">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
  );
}
