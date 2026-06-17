export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  emoji: string;
  image: string;
  badge: string;
  accent: string;
  gradient: string;
  waMessage: string;
  benefits: string[];
  href?: string; 
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "veterinaria",
    title: "Clínica Veterinaria",
    tagline: "Salud integral y atención preventiva",
    description: "La salud de tu mascota es nuestra máxima prioridad. Contamos con médicos veterinarios altamente capacitados para brindar atención médica general, esquemas de vacunación, prevención de enfermedades y atención de emergencias primarias.",
    emoji: "🩺",
    image: "/images/veterinaria-mimos-pet-club.webp",
    badge: "bg-red-500/10 text-red-600 border-red-500/20",
    accent: "text-red-500",
    gradient: "from-red-500 to-rose-600",
    waMessage: "¡Hola Mimos Pet Club! Necesito agendar una consulta veterinaria para mi mascota.",
    benefits: [
      "Consultas médicas preventivas y generales",
      "Control estricto de vacunas y desparasitación",
      "Diagnóstico oportuno y orientación nutricional",
      "Atención primaria ante emergencias"
    ]
  },
  {
    id: "hospedaje-hotel",
    title: "Hotel & Hospedaje",
    tagline: "Monitoreo 24/7 y suites climatizadas",
    description: "Un segundo hogar diseñado para el confort absoluto de tu engreído. Contamos con habitaciones individuales, áreas de recreación seguras, supervisión constante y reportes diarios con fotos y videos directos a tu WhatsApp.",
    emoji: "🏨",
    image: "/images/hotel.webp", 
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    accent: "text-amber-500",
    gradient: "from-amber-500 to-orange-600",
    waMessage: "¡Hola Mimos Pet Club! Me gustaría reservar el servicio de Hotel y Hospedaje para mi mascota.",
    benefits: [
      "Suites individuales con control de temperatura",
      "Cámaras de seguridad y monitoreo las 24 horas",
      "Socialización guiada y horas de juego libre",
      "Reportes multimedia diarios a los dueños"
    ]
  },
  {
    id: "guarderia-canina",
    title: "Guardería Canina",
    tagline: "Juego supervisado y socialización",
    description: "La solución perfecta para que tu perro no se quede solo en casa. Durante el día, disfrutará de juegos estructurados, interacción segura con otros perros de su mismo nivel de energía y momentos de descanso en nuestras áreas adaptadas.",
    emoji: "🐾",
    image: "/images/guarderia-canina-mimos-pet-club.webp",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    accent: "text-emerald-500",
    gradient: "from-emerald-500 to-green-600",
    waMessage: "¡Hola! Quiero más información sobre la Guardería Canina para dejar a mi perro durante el día.",
    benefits: [
      "Ambientes seguros divididos por tamaño y energía",
      "Juegos que estimulan su instinto natural",
      "Reducción de estrés y ansiedad por separación",
      "Supervisión constante por personal calificado"
    ]
  },
  {
    id: "colegio-canino",
    title: "Colegio Canino & Adiestramiento",
    tagline: "Refuerzo positivo y equilibrio",
    description: "Estimulación cognitiva, física y social para que tu perro aprenda jugando. Nuestro equipo utiliza técnicas de reforzamiento positivo para mejorar su comportamiento, obediencia básica y canalizar su energía de forma completamente saludable.",
    emoji: "🎓",
    image: "/images/colegio.webp",
    badge: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
    accent: "text-indigo-500",
    gradient: "from-indigo-500 to-violet-600",
    waMessage: "¡Hola! Quisiera inscribir a mi perrito en el Colegio Canino de Mimos Pet Club. ¿Me dan info?",
    benefits: [
      "Rutinas personalizadas de estimulación mental",
      "Entrenamiento enfocado en bienestar y obediencia",
      "Modificación de conductas inadecuadas",
      "Reportes de avance y comportamiento semanal"
    ]
  },
  {
    id: "peluqueria-spa",
    title: "Peluquería & Spa",
    tagline: "Grooming profesional libre de estrés",
    description: "Mucho más que un baño estético. Nuestro servicio de spa canino está diseñado como una experiencia relajante que cuida la salud dermatológica de tu mascota usando productos e insumos premium, adaptados a cada tipo de pelaje.",
    emoji: "✂️",
    image: "/images/grooming.webp",
    badge: "bg-pink-500/10 text-pink-600 border-pink-500/20",
    accent: "text-pink-500",
    gradient: "from-pink-500 to-rose-500",
    waMessage: "¡Hola! Deseo agendar una cita en el Spa y Peluquería Canina para dejar a mi engreído impecable.",
    benefits: [
      "Baños con agua temperada y masajes relajantes",
      "Cortes de raza y deslanado profesional",
      "Corte de uñas seguro y limpieza de oídos",
      "Uso exclusivo de champús hipoalergénicos"
    ]
  },
  {
    id: "accesorios-premium",
    title: "Pet Shop & Boutique",
    tagline: "Todo lo que necesita en un solo lugar",
    description: "Explora nuestro catálogo exclusivo de productos diseñados para mejorar el día a día de tu compañero. Desde arneses ergonómicos de alta resistencia hasta juguetes de estimulación cognitiva, ropa de temporada y snacks saludables.",
    emoji: "🛍️",
    image: "/images/tienda-de-mascotas.webp", 
    badge: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    accent: "text-yellow-500",
    gradient: "from-yellow-500 to-orange-500",
    href: "/tienda", 
    waMessage: "", 
    benefits: [
      "Juguetes de estimulación mental e interactivos",
      "Collares y arneses ergonómicos garantizados",
      "Variedad en alimentos premium y super premium",
      "Snacks e insumos de alta calidad nutricional"
    ]
  }
];
export const PAW_POSITIONS = [
  { left: "10%", top: "15%", size: "24px" },
  { left: "85%", top: "20%", size: "32px" },
  { left: "45%", top: "75%", size: "20px" },
  { left: "70%", top: "60%", size: "28px" },
  { left: "20%", top: "50%", size: "36px" }
];