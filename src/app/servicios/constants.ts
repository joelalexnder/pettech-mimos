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
  href?: string; // 👈 Propiedad opcional para redirigir a rutas internas como /tienda
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "hospedaje-hotel",
    title: "Hotel & Hospedaje de Lujo",
    tagline: "Monitoreo 24/7 y suites climatizadas",
    description: "Un segundo hogar diseñado para el confort absoluto de tu engreído. Contamos con habitaciones individuales, áreas de recreación seguras, supervisión veterinaria constante y reportes diarios con fotos y videos directos a tu WhatsApp.",
    emoji: "🏨",
    image: "https://content.nationalgeographic.com.es/medio/2023/03/16/perro-en-la-cama_3546ed19_230316131039_1280x853.jpg", 
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    accent: "text-amber-500",
    gradient: "from-amber-500 to-orange-600",
    waMessage: "¡Hola Mimos Pet Club! Me gustaría reservar el servicio de Hotel y Hospedaje para mi mascota. 🐾",
    benefits: [
      "Suites individuales con control de temperatura",
      "Cámaras de seguridad y monitoreo las 24 horas",
      "Socialización guiada y horas de juego libre",
      "Atención médica preventiva en caso de emergencias"
    ]
  },
  {
    id: "colegio-canino",
    title: "Colegio Canino & Adiestramiento",
    tagline: "Refuerzo positivo y socialización activa",
    description: "Estimulación cognitiva, física y social para que tu perro aprenda jugando. Nuestro equipo de etólogos utiliza técnicas de reforzamiento positivo para mejorar su comportamiento, obediencia básica y canalizar su energía de forma saludable.",
    emoji: "🎓",
    image: "https://st3.depositphotos.com/1006075/36406/i/450/depositphotos_364067980-stock-photo-small-white-dog-sitting-school.jpg",
    badge: "bg-sky-500/10 text-sky-600 border-sky-500/20",
    accent: "text-sky-500",
    gradient: "from-sky-500 to-blue-600",
    waMessage: "¡Hola! Quisiera inscribir a mi perrito en el Colegio Canino de Mimos Pet Club. ¿Me dan info? 🎓",
    benefits: [
      "Rutinas personalizadas de estimulación mental",
      "Entrenamiento enfocado en bienestar y obediencia",
      "Trasporte escolar seguro (Ida y Vuelta)",
      "Reportes de avance y comportamiento semanal"
    ]
  },
  {
    id: "peluqueria-spa",
    title: "Peluquería & Spa Premium",
    tagline: "Grooming profesional libre de estrés",
    description: "Mucho más que un baño estético. Nuestro servicio de spa canino está diseñado como una experiencia relajante que cuida la salud dermatológica de tu mascota usando productos e insumos premium, adaptados a cada tipo de pelaje.",
    emoji: "✂️",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=600&auto=format&fit=crop",
    badge: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    accent: "text-purple-500",
    gradient: "from-purple-500 to-indigo-600",
    waMessage: "¡Hola! Deseo agendar una cita en el Spa y Peluquería Canina para dejar a mi engreído impecable. ✂️",
    benefits: [
      "Baños con agua temperada y masajes relajantes",
      "Cortes de raza y deslanado profesional",
      "Corte de uñas seguro y limpieza de oídos",
      "Uso exclusivo de champús hipoalergénicos orgánicos"
    ]
  },
  {
    id: "accesorios-premium",
    title: "Accesorios & Boutique",
    tagline: "Moda, juguetes interactivos y estilo único",
    description: "Explora nuestro catálogo exclusivo de productos diseñados para mejorar el día a día de tu compañero. Desde arneses ergonómicos de alta resistencia hasta juguetes de estimulación cognitiva y snacks interactivos saludables.",
    emoji: "🛍️",
    image: "https://m.media-amazon.com/images/I/81mYgpgslRL.jpg", // Imagen estética de una mascota con accesorios/juguetes
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    accent: "text-emerald-500",
    gradient: "from-emerald-500 to-teal-600",
    href: "/tienda", // 👈 Apunta directo a tu página de tienda
    waMessage: "", // Queda vacío ya que priorizaremos el link interno
    benefits: [
      "Juguetes de estimulación mental e interactivos",
      "Collares y arneses ergonómicos garantizados",
      "Platos anti-ansiedad y accesorios de paseo",
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