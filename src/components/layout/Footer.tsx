import Link from "next/link";

const quickLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Tienda & Probador IA", href: "/tienda" },
  { label: "Nosotros", href: "/conocenos" },
];

const services = [
  { label: "Hospedaje", href: "/servicios#hospedaje" },
  { label: "Colegio Canino", href: "/servicios#colegio" },
  { label: "Peluquería & Spa", href: "/servicios#peluqueria" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <span className="text-white text-xl">🐾</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white leading-none block">
                  Mimos
                </span>
                <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest leading-none">
                  Pet Club
                </span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs mb-6">
              El lugar donde tu mejor amigo recibe el cuidado, amor y estilo que
              se merece. Hospedaje, educación y grooming de primer nivel.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                {
                  icon: "📘",
                  label: "Facebook",
                  href: "https://facebook.com",
                },
                {
                  icon: "📸",
                  label: "Instagram",
                  href: "https://instagram.com",
                },
                {
                  icon: "🎵",
                  label: "TikTok",
                  href: "https://tiktok.com",
                },
                {
                  icon: "💬",
                  label: "WhatsApp",
                  href: "https://wa.me/51999999999",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-sky-600 flex items-center justify-center transition-colors duration-200 text-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Navegación
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-sky-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Servicios
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-slate-400 hover:text-sky-400 transition-colors text-sm"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-slate-800 rounded-xl">
              <p className="text-xs text-slate-400 mb-2">¿Tienes dudas?</p>
              <a
                href="https://wa.me/51999999999?text=Hola!%20Quisiera%20información"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
              >
                <span>💬</span> Escríbenos al WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Mimos Pet Club. Todos los derechos
            reservados.
          </p>
          <p className="text-slate-600 text-xs">
            Hecho con 🧡 para los mejores amigos
          </p>
        </div>
      </div>
    </footer>
  );
}
