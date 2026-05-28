"use client";

import { motion } from "framer-motion";
import { generarLinkWhatsApp } from "@/lib/whatsapp";
import { ServiceItem } from "../constants";
import Link from "next/link"; 

interface Props {
  services: ServiceItem[];
}

export default function ServiciosClientView({ services }: Props) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {services.map((service, idx) => (
          <div
            key={service.id}
            id={service.id}
            className="scroll-mt-32 grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative z-20 rounded-4xl overflow-hidden shadow-xl aspect-4/3 w-full ${
                idx % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <img
                src={service.image}
                alt={`${service.title} - Mimos Pet Club`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6">
                <div className={`inline-flex items-center gap-2 ${service.badge} border border-white/20 shadow-md px-4 py-1.5 rounded-full text-xs font-bold`}>
                  <span>{service.emoji}</span>
                  {service.tagline}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`relative z-20 ${idx % 2 === 1 ? "lg:order-1" : ""}`}
            >
              <span className={`inline-block text-xs font-black uppercase tracking-[0.2em] mb-3 ${service.accent}`}>
                Mimos Pet Club
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6">
                {service.title}
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                {service.description}
              </p>

              <ul className="space-y-3.5 mb-10">
                {service.benefits.map((benefit, bi) => (
                  <li key={bi} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full bg-linear-to-br ${service.gradient} flex items-center justify-center shrink-0 mt-0.5`}>
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-600 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              {service.href ? (
                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-2.5 px-8 py-3.5 bg-linear-to-r ${service.gradient} text-white font-bold text-sm rounded-xl shadow-lg transition-all duration-200 active:scale-95 hover:-translate-y-0.5 cursor-pointer select-none text-center`}
                >
                  <span>🛍️</span> Explorar Tienda
                </Link>
              ) : (
                <a
                  href={generarLinkWhatsApp(service.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2.5 px-8 py-3.5 bg-linear-to-r ${service.gradient} text-white font-bold text-sm rounded-xl shadow-lg transition-all duration-200 active:scale-95 hover:-translate-y-0.5 cursor-pointer select-none text-center`}
                >
                  <span>💬</span> Reservar por WhatsApp
                </a>
              )}

            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}