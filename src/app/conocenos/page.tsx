const team = [
  {
    name: "Sofía Ramos",
    role: "Fundadora & Directora",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    bio: "Médico veterinario con 8 años de experiencia. Fundó Mimos Pet Club con la visión de crear el espacio ideal para el bienestar animal.",
  },
  {
    name: "Carlos Mendoza",
    role: "Entrenador Canino Certificado",
    image: "https://i.pinimg.com/736x/fe/e6/b9/fee6b92aff3d1bb23295eb0cc23a173c.jpg",
    bio: "Especialista en conducta animal y refuerzo positivo. Certificado por la Asociación Canina del Perú.",
  },
  {
    name: "Valentina Cruz",
    role: "Estilista & Groomer Senior",
    image: "https://i.pinimg.com/webp80/1200x/53/f8/e1/53f8e1f7d9ba691f4bcf1edf340c64fc.webp",
    bio: "Con más de 5 años en grooming profesional, Valentina ha atendido más de 2,000 mascotas con cariño y precisión.",
  },
];

const milestones = [
  {
    year: "2022",
    label: "Fundación del club",
    desc: "Abrimos nuestras puertas con el sueño de crear el mejor espacio para mascotas en Lima.",
    color: "from-sky-400 to-sky-600",
    text: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
  },
  {
    year: "2023",
    label: "Apertura del colegio canino",
    desc: "Incorporamos entrenadores certificados y lanzamos nuestro programa de educación positiva.",
    color: "from-violet-400 to-violet-600",
    text: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  {
    year: "2024",
    label: "Implementación de cámaras 24/7",
    desc: "Instalamos sistema de monitoreo en tiempo real para que los dueños estén siempre tranquilos.",
    color: "from-orange-400 to-orange-600",
    text: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    year: "2025",
    label: "Lanzamiento del Probador IA",
    desc: "Integramos inteligencia artificial para que puedas visualizar estilos en tu mascota antes del servicio.",
    color: "from-pink-400 to-pink-600",
    text: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
];

const valores = [
  {
    label: "Amor",
    desc: "Por cada animal que pasa por nuestras manos",
    color: "bg-rose-500",
  },
  {
    label: "Responsabilidad",
    desc: "Compromiso con la salud y seguridad animal",
    color: "bg-sky-500",
  },
  {
    label: "Bienestar",
    desc: "Productos naturales y técnicas no invasivas",
    color: "bg-emerald-500",
  },
  {
    label: "Confianza",
    desc: "Transparencia total con los dueños siempre",
    color: "bg-violet-500",
  },
];

export default function ConocenosPage() {
  return (
    <main className="pt-20 overflow-hidden">

      {/* ─── HEADER ─── */}
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

      {/* ─── QUIÉNES SOMOS ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Imagen real */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=800&q=80)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-8">
                  <p className="text-white font-bold text-lg">
                    Cuidando mascotas desde 2022
                  </p>
                  <p className="text-white/70 text-sm">Lima, Perú</p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-5 -right-5 bg-sky-600 text-white rounded-2xl shadow-xl p-4 z-10">
                <p className="text-xs font-medium opacity-80">Fundado en</p>
                <p className="text-3xl font-black">2022</p>
              </div>
            </div>

            {/* Texto */}
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

      {/* ─── MISIÓN Y VISIÓN ─── */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Misión */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80)",
                }}
              />
              <div className="p-10">
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
            </div>

            {/* Visión */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80)",
                }}
              />
              <div className="p-10">
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
          </div>

          {/* ─── VALORES ─── */}
          <div className="mt-8 bg-gradient-to-br from-sky-600 to-sky-800 rounded-3xl p-10 text-white">
            <h3 className="text-2xl font-black mb-8 text-center">
              Nuestros Valores
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valores.map((v) => (
                <div key={v.label} className="text-center">
                  {/* Línea decorativa de color en vez de emoji */}
                  <div className="flex justify-center mb-4">
                    <div className={`w-10 h-1.5 rounded-full ${v.color}`} />
                  </div>
                  <h4 className="font-bold text-lg mb-1">{v.label}</h4>
                  <p className="text-sky-100 text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
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

          <div className="space-y-6">
            {milestones.map((m) => (
              <div
                key={m.year}
                className={`flex items-start gap-6 rounded-3xl border ${m.border} ${m.bg} p-6 hover:-translate-y-0.5 transition-transform duration-200`}
              >
                {/* Año en grande como elemento visual */}
                <div className={`flex-shrink-0 w-24 text-center`}>
                  <span className={`text-4xl font-black ${m.text} leading-none`}>
                    {m.year}
                  </span>
                  {/* Barra de color debajo del año */}
                  <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${m.color} mx-auto mt-2`} />
                </div>

                {/* Contenido */}
                <div className="flex-1 pt-1">
                  <p className="text-slate-900 font-black text-lg mb-1">
                    {m.label}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EQUIPO ─── */}
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
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300"
              >
                {/* Foto real */}
                <div
                  className="h-64 bg-cover bg-center bg-top"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <div className="p-8 text-center">
                  <h3 className="text-xl font-black text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <span className="inline-block text-xs font-bold text-sky-600 uppercase tracking-wider mb-4">
                    {member.role}
                  </span>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
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
            href="https://wa.me/51910918802?text=Hola!%20Quisiera%20visitar%20Mimos%20Pet%20Club%20🐾"
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