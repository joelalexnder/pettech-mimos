const WA_NUMBER = "51910918802";

const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

const services = [
  {
    id: "hospedaje",
    icon: "🏠",
    title: "Hospedaje Premium",
    tagline: "Tu peludito en casa, pero mejor",
    description:
      "Ofrecemos hospedaje cómodo, seguro y lleno de amor para tu mascota. Habitaciones individuales ambientadas, monitoreo 24/7 y actualizaciones constantes para que tú también estés tranquilo.",
    benefits: [
      "Habitaciones individuales con cama y colchón premium",
      "Cámaras en vivo accesibles desde tu celular",
      "Alimentación según las indicaciones del dueño",
      "Paseos diarios y tiempo de juego supervisado",
      "Personal capacitado disponible las 24 horas",
      "Reportes fotográficos cada día por WhatsApp",
    ],
    gradient: "from-sky-500 to-sky-700",
    lightBg: "from-sky-50 to-sky-100",
    accent: "text-sky-600",
    badge: "bg-sky-100 text-sky-700",
    border: "border-sky-200",
    waMessage: "Hola! Quiero reservar hospedaje para mi mascota en Mimos Pet Club 🐶",
    emoji: "🌙",
  },
  {
    id: "colegio",
    icon: "🎓",
    title: "Colegio Canino",
    tagline: "Un perro educado es un perro feliz",
    description:
      "Nuestro programa de entrenamiento positivo está diseñado para enseñarle a tu perro las habilidades sociales y de obediencia que necesita. Sin métodos agresivos, solo refuerzo positivo y mucho amor.",
    benefits: [
      "Clases grupales e individuales disponibles",
      "Entrenadores certificados con años de experiencia",
      "Técnicas de refuerzo positivo (sin castigos)",
      "Socialización con otros perros en ambiente seguro",
      "Control de conductas problemáticas (ladridos, saltos)",
      "Informe de progreso semanal para el dueño",
    ],
    gradient: "from-violet-500 to-violet-700",
    lightBg: "from-violet-50 to-violet-100",
    accent: "text-violet-600",
    badge: "bg-violet-100 text-violet-700",
    border: "border-violet-200",
    waMessage: "Hola! Me interesa el Colegio Canino en Mimos Pet Club 🎓",
    emoji: "🏅",
  },
  {
    id: "peluqueria",
    icon: "✂️",
    title: "Peluquería & Spa",
    tagline: "Belleza, higiene y bienestar total",
    description:
      "De la mano de nuestros estilistas expertos, tu mascota saldrá luciendo increíble. Usamos productos 100% naturales, seguros para todas las razas. Porque verse bien es sentirse bien.",
    benefits: [
      "Baño con champú natural según tipo de piel",
      "Corte de pelo a medida según raza y preferencia",
      "Hidratación profunda y acondicionador premium",
      "Corte de uñas y limpieza de orejas incluido",
      "Secado y peinado profesional",
      "Perfume y lazo de regalo al finalizar",
    ],
    gradient: "from-pink-500 to-pink-700",
    lightBg: "from-pink-50 to-pink-100",
    accent: "text-pink-600",
    badge: "bg-pink-100 text-pink-700",
    border: "border-pink-200",
    waMessage: "Hola! Quiero agendar una sesión de Peluquería & Spa en Mimos Pet Club ✂️",
    emoji: "💅",
  },
];

export default function ServiciosPage() {
  return (
    <main className="pt-20 overflow-hidden">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-slate-900 to-sky-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-bold text-sky-400 uppercase tracking-widest mb-4">
            Nuestros servicios
          </span>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-5">
            Todo lo que tu mascota necesita,{" "}
            <span className="text-sky-400">en un solo lugar</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Hospedaje, entrenamiento y grooming premium diseñados para el bienestar
            total de tu mejor amigo.
          </p>
        </div>
      </section>

      {/* Services */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, idx) => (
            <section key={service.id} id={service.id} className="scroll-mt-24">
              <div
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual */}
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div
                    className={`bg-gradient-to-br ${service.lightBg} border ${service.border} rounded-3xl p-12 text-center shadow-lg`}
                  >
                    <div className="text-9xl mb-6">{service.icon}</div>
                    <div
                      className={`inline-flex items-center gap-2 ${service.badge} px-4 py-2 rounded-full text-sm font-bold`}
                    >
                      <span>{service.emoji}</span>
                      {service.tagline}
                    </div>
                    {/* Replace with:
                    <Image
                      src={`/servicios/${service.id}.jpg`}
                      alt={service.title}
                      width={500}
                      height={400}
                      className="rounded-2xl object-cover"
                    /> */}
                  </div>
                </div>

                {/* Content */}
                <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                  <span
                    className={`inline-block text-sm font-bold uppercase tracking-widest mb-3 ${service.accent}`}
                  >
                    Mimos Pet Club
                  </span>
                  <h2 className="text-4xl font-black text-slate-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-slate-500 text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-10">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-slate-600 text-sm leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={waLink(service.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${service.gradient} text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200`}
                  >
                    <span className="text-xl">💬</span>
                    Reservar por WhatsApp
                  </a>
                </div>
              </div>

              {/* Divider */}
              {idx < services.length - 1 && (
                <div className="mt-24 border-t border-slate-100" />
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Pricing hint CTA */}
      <section className="bg-gradient-to-br from-slate-50 to-sky-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            ¿Quieres saber los precios?
          </h2>
          <p className="text-slate-500 text-lg mb-8">
            Los precios varían según raza, tamaño y duración del servicio.
            Escríbenos y te damos una cotización personalizada en minutos.
          </p>
          <a
            href={waLink(
              "Hola! Quisiera saber los precios de los servicios en Mimos Pet Club 🐾"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-all duration-200"
          >
            <span className="text-xl">💬</span>
            Consultar precios por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
