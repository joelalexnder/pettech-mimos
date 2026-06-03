"use client";

import Link from "next/link";
import Image from "next/image";

const SERVICES = [
  { label: "Grooming profesional", href: "/servicios" },
  { label: "Colegio canino",       href: "/servicios" },
  { label: "Hotel para mascotas",  href: "/servicios" },
  { label: "Consulta IA",          href: "/consulta"  },
  { label: "Probador Virtual",     href: "/probador-virtual" },
];

const COMPANY = [
  { label: "Sobre nosotros", href: "/conocenos" },
  { label: "Conoce a tu mascota", href: "/conoce-a-tu-perro" },
  { label: "Tienda & IA", href: "/tienda" },
];

const SOCIALS = [
  {
    id: "ig", label: "Instagram",
    href: "https://www.instagram.com/mimos.petclubtacna/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    id: "fb", label: "Facebook",
    href: "https://www.facebook.com/MimosPetClub/",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    id: "tk", label: "TikTok",
    href: "https://www.tiktok.com/@mimos.petclubtacna",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
  },
];

const WHATSAPP_URL = "https://wa.me/51952189680?text=Hola!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n";
const MAPS_URL = "https://maps.app.goo.gl/eWnQrMFpFPc5Hgrv8";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">

          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo-mimos-pet-club.png"
                alt="Mimos Pet Club"
                width={110}
                height={40}
                className="object-contain brightness-0 invert hover:scale-105 transition-transform duration-300"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-[220px]">
              El cuidado premium que tu mascota merece en Tacna, Perú.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-orange-400 hover:border-orange-400/40 hover:bg-orange-400/10 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-5">Servicios</p>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="group flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    <span className="text-orange-500 text-xs group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-5">Empresa</p>
            <ul className="space-y-3">
              {COMPANY.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="group flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    <span className="text-orange-500 text-xs group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-5">Contacto</p>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 text-white/50 hover:text-white transition-colors duration-200 group"
                >
                  <span className="text-orange-500 mt-0.5 shrink-0">📍</span>
                  <span>Av. 200 Millas esq. Cristo Rey, Tacna</span>
                </a>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 shrink-0">🕐</span>
                <span className="text-white/50">Lunes a Sábado · 8:00 am – 6:00 pm</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 shrink-0">📧</span>
                <a href="mailto:inversionesinovadorasmmsac@gmail.com" className="text-white/50 hover:text-white transition-colors duration-200 break-all">
                  inversionesinovadorasmmsac@gmail.com
                </a>
              </li>
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2.5 w-full py-3 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 font-bold rounded-xl text-sm hover:bg-[#25D366] hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat en WhatsApp
            </a>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-widest uppercase font-medium">
            © 2026 Mimos Pet Club · Todos los derechos reservados
          </p>
          <div className="flex gap-6">
            {["Privacidad", "Términos", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors duration-200 uppercase tracking-wider font-medium">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}