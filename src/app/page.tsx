import Link from "next/link";

const featuredServices = [
  {
    icon: "🏠",
    title: "Hospedaje Premium",
    description:
      "Tu peludito duerme cómodo, seguro y feliz. Habitaciones individuales con cámaras en tiempo real.",
    color: "from-sky-50 to-sky-100",
    accent: "text-sky-600",
    border: "border-sky-200",
  },
  {
    icon: "🎓",
    title: "Colegio Canino",
    description:
      "Entrenamiento positivo con expertos. Tu perro aprende modales, obediencia y socialización.",
    color: "from-violet-50 to-violet-100",
    accent: "text-violet-600",
    border: "border-violet-200",
  },
  {
    icon: "✂️",
    title: "Peluquería & Spa",
    description:
      "Baño, corte, hidratación y perfume. Deja que tu mascota luzca increíble con nuestros expertos.",
    color: "from-pink-50 to-pink-100",
    accent: "text-pink-600",
    border: "border-pink-200",
  },
  {
    icon: "🤖",
    title: "Probador IA",
    description:
      "Prueba diferentes estilos y accesorios en tu mascota con nuestra tecnología de inteligencia artificial.",
    color: "from-amber-50 to-amber-100",
    accent: "text-amber-600",
    border: "border-amber-200",
  },
];

const stats = [
  { value: "500+", label: "Mascotas atendidas" },
  { value: "4.9★", label: "Calificación promedio" },
  { value: "3 años", label: "De experiencia" },
  { value: "24/7", label: "Monitoreo en vivo" },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-sky-50 via-white to-orange-50">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-sky-200">
                <span>🐾</span> Lima, Perú · Atención 7 días
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
                El cuidado y estilo que tu{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700">
                  mejor amigo
                </span>{" "}
                merece
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
                Hospedaje, educación, grooming y tecnología IA para que tu
                mascota viva la experiencia premium que siempre soñaste.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/servicios"
                  className="px-7 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold rounded-2xl shadow-lg shadow-sky-200 hover:scale-105 hover:shadow-sky-300 transition-all duration-200"
                >
                  Ver Servicios →
                </Link>
                <Link
                  href="/tienda"
                  className="px-7 py-4 bg-white text-slate-700 font-bold rounded-2xl shadow-md border border-slate-200 hover:border-sky-300 hover:text-sky-600 hover:scale-105 transition-all duration-200"
                >
                  🤖 Probar IA
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap gap-6">
                {[
                  "✅ Sin cargo extra nocturno",
                  "📹 Cámaras en vivo",
                  "💊 Atención veterinaria",
                ].map((badge) => (
                  <span key={badge} className="text-sm text-slate-500 font-medium">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-sky-100 bg-gradient-to-br from-sky-400 to-sky-600 aspect-square flex items-center justify-center">
                {/* Placeholder hero image */}
                <div className="text-center p-12">
                  <div className="text-9xl mb-4">🐶</div>
                  <p className="text-white/80 text-lg font-medium">
                    Tu mascota en buenas manos
                  </p>
                  {/* Replace with: <Image src="/hero-dog.jpg" alt="Mascota feliz" fill className="object-cover" /> */}
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100 z-20">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                  ⭐
                </div>
                <div>
                  <p className="text-xs text-slate-500">Calificación</p>
                  <p className="font-bold text-slate-900">4.9 / 5.0</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white rounded-2xl shadow-lg p-4 z-20">
                <p className="text-xs font-medium opacity-80">Mascotas felices</p>
                <p className="text-2xl font-black">500+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-slate-900 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICIOS DESTACADOS ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-bold text-sky-600 uppercase tracking-widest mb-3">
              Lo que ofrecemos
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              Todo para tu mascota
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              Servicios diseñados con amor, experiencia y la mejor tecnología para
              que tu compañero esté siempre en las mejores condiciones.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <div
                key={service.title}
                className={`bg-gradient-to-br ${service.color} border ${service.border} rounded-3xl p-7 hover:-translate-y-2 transition-transform duration-300 group`}
              >
                <div className="text-5xl mb-5">{service.icon}</div>
                <h3 className={`text-xl font-bold ${service.accent} mb-3`}>
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-sky-500 text-sky-600 font-bold rounded-2xl hover:bg-sky-50 transition-colors duration-200"
            >
              Ver todos los servicios →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gradient-to-br from-sky-400 to-sky-700 rounded-3xl p-12 text-center shadow-xl shadow-sky-200">
              <div className="text-8xl mb-4">🏆</div>
              <p className="text-white text-2xl font-black">
                El pet club favorito de Lima
              </p>
              <p className="text-sky-100 mt-2">
                Reconocidos por cientos de familias peruanas
              </p>
            </div>
            <div>
              <span className="inline-block text-sm font-bold text-sky-600 uppercase tracking-widest mb-3">
                ¿Por qué elegirnos?
              </span>
              <h2 className="text-4xl font-black text-slate-900 mb-8">
                Más que un servicio,{" "}
                <span className="text-sky-600">una familia</span>
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: "🔒",
                    title: "Seguridad garantizada",
                    desc: "Instalaciones cerradas, personal capacitado y cámaras 24/7.",
                  },
                  {
                    icon: "❤️",
                    title: "Trato personalizado",
                    desc: "Cada mascota es única y recibe atención individual adaptada a su personalidad.",
                  },
                  {
                    icon: "📱",
                    title: "Actualizaciones constantes",
                    desc: "Fotos y videos de tu peludito en tiempo real directo a tu WhatsApp.",
                  },
                  {
                    icon: "🌿",
                    title: "Productos naturales",
                    desc: "Usamos solo productos libres de químicos agresivos, seguros para todas las razas.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="py-24 bg-gradient-to-br from-sky-600 to-sky-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🐾</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            ¿Listo para consentirlos?
          </h2>
          <p className="text-sky-100 text-lg mb-10 max-w-xl mx-auto">
            Reserva hoy y deja que tu mascota viva la experiencia Mimos Pet Club.
            El primer servicio incluye una evaluación gratuita.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/51999999999?text=Hola!%20Quiero%20agendar%20un%20servicio%20en%20Mimos%20Pet%20Club"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition-all duration-200"
            >
              📅 Agendar ahora
            </a>
            <a
              href="https://wa.me/51999999999?text=Hola!%20Quisiera%20saber%20cómo%20llegar%20a%20Mimos%20Pet%20Club"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl border border-white/30 hover:scale-105 transition-all duration-200"
            >
              📍 Ver ubicación
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
