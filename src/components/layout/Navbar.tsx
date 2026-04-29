"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Tienda & IA", href: "/tienda" },
  { label: "Nosotros", href: "/conocenos" },
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
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white text-xl">🐾</span>
            </div>
            <div>
              <span className="font-bold text-xl text-sky-700 leading-none block">
                Mimos
              </span>
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest leading-none">
                Pet Club
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
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

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/51999999999?text=Hola!%20Quisiera%20más%20información%20sobre%20Mimos%20Pet%20Club"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-orange-200 hover:scale-105 transition-all duration-200"
            >
              Contáctanos
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-sky-50 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-current rounded transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current rounded transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current rounded transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
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
            <div className="mt-2 pt-2 border-t border-slate-100">
              <a
                href="https://wa.me/51999999999?text=Hola!%20Quisiera%20más%20información%20sobre%20Mimos%20Pet%20Club"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-semibold rounded-xl"
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
