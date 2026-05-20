"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Tienda & IA", href: "/tienda" },
  { label: "Nosotros", href: "/conocenos" },
  { label: "Conoce a tu perro", href: "/conoce-a-tu-perro" },
  { label: "Consulta IA", href: "/consulta" },
  { label: "Probador Virtual", href: "/probador-virtual" },
];

const socials = [
  { 
    id: "ig", 
    href: "https://www.instagram.com/mimos.petclubtacna/", // 👈 Tu enlace de Instagram
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" 
  },
  { 
    id: "fb", 
    href: "https://www.facebook.com/MimosPetClub/", // 👈 Tu enlace de Facebook
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" 
  },
  { 
    id: "tk", 
    href: "https://www.tiktok.com/@mimos.petclubtacna", // 👈 Tu enlace de TikTok
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" 
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Logo (Alineado a la izquierda) */}
          <div className="w-1/4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="text-white text-xl">🐾</span>
              </div>
              <div>
                <span className="font-bold text-xl text-sky-700 leading-none block">
                  Mimos
                </span>
                <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest leading-none block mt-0.5">
                  Pet Club
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav (Centrado) */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-sky-600 bg-sky-50"
                    : "text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Redes y CTA Button (Alineado a la derecha) */}
          <div className="hidden lg:flex items-center justify-end gap-5 w-1/4">
            
            {/* Íconos sociales Desktop */}
            <div className="flex items-center gap-2 border-r border-slate-200 pr-5">
              {socials.map((s) => (
                <a 
                  key={s.id} 
                  href={s.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-50 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/51910918802?text=Hola!%20Quisiera%20más%20información"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 transition-all duration-200"
            >
              Contáctanos
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-sky-50 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-sky-600 bg-sky-50"
                    : "text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="mt-3 pt-4 border-t border-slate-100">
              {/* Íconos sociales Mobile */}
              <div className="flex justify-center gap-4 mb-4">
                {socials.map((s) => (
                  <a 
                    key={s.id} 
                    href={s.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-sky-500 transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
              
              <a
                href="https://wa.me/51910918802?text=Hola!%20Quisiera%20más%20información"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-semibold rounded-xl shadow-md"
              >
                Contáctanos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}