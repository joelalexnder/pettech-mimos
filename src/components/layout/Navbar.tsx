"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/* ─── tipos ─────────────────────────────────────────────── */
interface NavLink { label: string; href: string }
interface Social   { id: string; href: string; path: string; label: string }

/* ─── datos estáticos fuera del componente ───────────────── */
const NAV_LINKS: NavLink[] = [
  { label: "Inicio",           href: "/" },
  { label: "Servicios",        href: "/servicios" },
  { label: "Tienda & IA",      href: "/tienda" },
  { label: "Nosotros",         href: "/conocenos" },
  { label: "Conoce a tu Mascota",href: "/conoce-a-tu-perro" },
];

const SOCIALS: Social[] = [
  {
    id: "ig",
    label: "Instagram",
    href: "https://www.instagram.com/mimos.petclubtacna/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    id: "fb",
    label: "Facebook",
    href: "https://www.facebook.com/MimosPetClub/",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    id: "tk",
    label: "TikTok",
    href: "https://www.tiktok.com/@mimos.petclubtacna",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
  },
];

const WHATSAPP_URL =
  "https://wa.me/51910918802?text=Hola!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n";

/* ─── sub-componentes memoizados ─────────────────────────── */
const SocialIcon = memo(({ social }: { social: Social }) => (
  <a
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={social.label}
    className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
  >
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d={social.path} />
    </svg>
  </a>
));
SocialIcon.displayName = "SocialIcon";

const NavLinkItem = memo(
  ({ link, active, onClick }: { link: NavLink; active: boolean; onClick?: () => void }) => (
    <Link
      href={link.href}
      onClick={onClick}
      className={`
        relative px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-150
        ${active
          ? "text-white bg-white/20 shadow-inner"
          : "text-white/85 hover:text-white hover:bg-white/10"}
      `}
    >
      {link.label}
      {active && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400" />
      )}
    </Link>
  )
);
NavLinkItem.displayName = "NavLinkItem";

/* ─── componente principal ───────────────────────────────── */
export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? "bg-slate-900/35 backdrop-blur-md shadow-lg shadow-black/20 py-0"
            : "bg-linear-to-b from-black/60 to-transparent py-0"}
        `}
      >
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-4">

            {/* ── Logo ── */}
            {/*
              📌 INSTRUCCIONES PARA TU LOGO:
              - Reemplaza "/logo-mimos.png" con la ruta real de tu imagen en /public
              - Ajusta width y height al tamaño REAL de tu logo (en px)
              - Si tu logo tiene fondo transparente (PNG/WebP) funciona perfecto sobre cualquier hero
              - priority={true} porque está en el viewport inicial (LCP)
            */}
            <Link
              href="/"
              className="shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-xl"
              aria-label="Mimos Pet Club — Inicio"
            >
              <Image
                src="/logo-mimos-pet-club.png"
                alt="Mimos Pet Club"
                width={100}
                height={36}
                priority
                className="object-contain group-hover:scale-105 transition-transform duration-200 drop-shadow-md"
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Navegación principal"
            >
              {NAV_LINKS.map((link) => (
                <NavLinkItem key={link.href} link={link} active={pathname === link.href} />
              ))}
            </nav>

            {/* ── Sociales + CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-0.5 border-r border-white/20 pr-3">
                {SOCIALS.map((s) => (
                  <SocialIcon key={s.id} social={s} />
                ))}
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-linear-to-r from-orange-400 to-orange-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-400/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 whitespace-nowrap"
              >
                Contáctanos
              </a>
            </div>

            {/* ── Hamburger ── */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                {isOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        onClick={closeMenu}
        className={`lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <nav
        id="mobile-menu"
        aria-label="Menú móvil"
        className={`
          lg:hidden fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw]
          bg-slate-900 shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Image
            src="/logo-mimos-pet-club.png"  
            alt="Mimos Pet Club"
              width={84}
              height={32}
            priority
            className="object-contain"
          />
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar menú"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-1 px-3 py-4 flex-1 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`
                flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors
                ${pathname === link.href
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:bg-white/8 hover:text-white"}
              `}
            >
              {pathname === link.href && (
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
              )}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Footer del drawer */}
        <div className="px-4 py-5 border-t border-white/10 space-y-4">
          <div className="flex justify-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-3 rounded-xl bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-linear-to-r from-orange-400 to-orange-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-opacity hover:opacity-90"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contáctanos por WhatsApp
          </a>
        </div>
      </nav>
    </>
  );
}