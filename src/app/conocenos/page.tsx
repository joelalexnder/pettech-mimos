const team = [
  {
    name: "Sofía Ramos",
    role: "Fundadora & Directora",
    emoji: "👩‍💼",
    bio: "Médico veterinario con 8 años de experiencia. Fundó Mimos Pet Club con la visión de crear el espacio ideal para el bienestar animal.",
  },
  {
    name: "Carlos Mendoza",
    role: "Entrenador Canino Certificado",
    emoji: "🏅",
    bio: "Especialista en conducta animal y refuerzo positivo. Certificado por la Asociación Canina del Perú.",
  },
  {
    name: "Valentina Cruz",
    role: "Estilista & Groomer Senior",
    emoji: "✂️",
    bio: "Con más de 5 años en grooming profesional, Valentina ha atendido más de 2,000 mascotas con cariño y precisión.",
  },
];

const milestones = [
  { year: "2022", label: "Fundación del club", icon: "🌱" },
  { year: "2023", label: "Apertura del colegio canino", icon: "🎓" },
  { year: "2024", label: "Implementación de cámaras 24/7", icon: "📹" },
  { year: "2025", label: "Lanzamiento del Probador IA", icon: "🤖" },
];

export default function ConocenosPage() {
  return (
    <main className="pt-20 overflow-hidden">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-sky-900 to-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-bold text-orange-400 uppercase tracking-widest mb-4">
            Nuestra historia
          </span>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-5">
            Somos Mimos <span className="text-sky-400">Pet Club</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Un equipo apasionado por el bienestar animal, dedicado a ser el hogar
            lejos de casa para tu mascota.
          </p>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-14 text-center shadow-lg border border-orange-200">
                <div className="text-9xl mb-4">🐾</div>
                <p className="text-orange-700 font-bold text-xl">
                  Cuidando mascotas desde 2022
                </p>
                {/* Replace with: <Image src="/local.jpg" alt="Nuestro local" ... /> */}
              </div>
              {/* Floating badge */}
              <div className="absolute -top-5 -right-5 bg-sky-600 text-white rounded-2xl shadow-xl p-4">
                <p className="text-xs font-medium opacity-80">Fundado en</p>
                <p className="text-3xl font-black">2022</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="inline-block text-sm font-bold text-sky-600 uppercase tracking-widest mb-3">
                Quiénes somos
              </span>
              <h2 className="text-4xl font-black text-slate-900 mb-6">
                Más que un negocio,{" "}
                <span className="text-sky-600">una comunidad</span>
              </h2>
              <div className="space-y-4 text-slate-500 leading-relaxed">
                <p>
                  Mimos Pet Club nació de un simple pero poderoso deseo: crear
                  un lugar donde las mascotas sean tratadas con el mismo cariño
                  que recibirían en casa. Somos un equipo de amantes de los
                  animales, veterinarios, entrenadores y estilistas comprometidos
                  con el bienestar total de tu peludito.
                </p>
                <p>
                  Creemos que cada mascota tiene su propia personalidad y
                  merece atención personalizada. Por eso, nuestros servicios
                  están diseñados para adaptarse a las necesidades únicas de
                  cada animal, sin importar la raza o el tamaño.
                </p>
                <p>
                  Con sede en Lima, atendemos a cientos de familias peruanas
                  que confían en nosotros para el cuidado, educación y bienestar
                  de sus compañeros de vida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Misión */}
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-md">
                🎯
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                Nuestra Misión
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Brindar servicios de cuidado, educación y estética animal con
                los más altos estándares de calidad y afecto, asegurando el
                bienestar físico y emocional de cada mascota que nos confían,
                mientras apoyamos a sus familias con tranquilidad y confianza.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-md">
                🔭
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                Nuestra Visión
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Ser el pet club de referencia en el Perú, reconocido por la
                excelencia en atención animal, la integración de tecnología
                innovadora y la construcción de una comunidad de dueños
                responsables y apasionados por sus mascotas.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="mt-8 bg-gradient-to-br from-sky-600 to-sky-800 rounded-3xl p-10 text-white">
            <h3 className="text-2xl font-black mb-8 text-center">
              Nuestros Valores
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "❤️", label: "Amor", desc: "Por cada animal que pasa por nuestras manos" },
                { icon: "🔬", label: "Responsabilidad", desc: "Compromiso con la salud y seguridad animal" },
                { icon: "🌿", label: "Bienestar", desc: "Productos naturales y técnicas no invasivas" },
                { icon: "🤝", label: "Confianza", desc: "Transparencia total con los dueños siempre" },
              ].map((v) => (
                <div key={v.label} className="text-center">
                  <div className="text-4xl mb-3">{v.icon}</div>
                  <h4 className="font-bold text-lg mb-1">{v.label}</h4>
                  <p className="text-sky-100 text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Historia - Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-bold text-sky-600 uppercase tracking-widest mb-3">
              Nuestra historia
            </span>
            <h2 className="text-4xl font-black text-slate-900">
              Creciendo juntos
            </h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sky-100 hidden sm:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex items-center gap-6 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg z-10 group-hover:scale-110 transition-transform">
                    {m.icon}
                  </div>
                  <div className="bg-slate-50 hover:bg-sky-50 rounded-2xl p-5 flex-1 border border-slate-100 hover:border-sky-200 transition-colors duration-200">
                    <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                      {m.year}
                    </span>
                    <p className="text-slate-800 font-bold mt-0.5">{m.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-bold text-sky-600 uppercase tracking-widest mb-3">
              El equipo
            </span>
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Personas que aman lo que hacen
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Nuestro equipo está formado por profesionales apasionados por el
              bienestar animal, siempre listos para dar lo mejor.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-sky-100 to-sky-200 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-5 shadow-md">
                  {member.emoji}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  {member.name}
                </h3>
                <span className="inline-block text-xs font-bold text-sky-600 uppercase tracking-wider mb-4">
                  {member.role}
                </span>
                <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5">
            ¿Quieres conocernos en persona?
          </h2>
          <p className="text-slate-400 mb-8">
            Visítanos en Lima o escríbenos para coordinar una visita sin compromiso.
            Tu mascota y tú son bienvenidos.
          </p>
          <a
            href="https://wa.me/51999999999?text=Hola!%20Quisiera%20visitar%20Mimos%20Pet%20Club%20🐾"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-all duration-200"
          >
            <span className="text-xl">💬</span>
            Escribirnos por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
