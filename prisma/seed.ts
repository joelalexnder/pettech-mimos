// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const productos = [
  // ─── MEDICAMENTOS (10) ────────────────────────────────────────────────────
  {
    nombre: "Nexgard Antipulgas (4–10 kg)",
    descripcion:
      "Antipulgas y garrapatas masticable de acción mensual. Protección total contra ectoparásitos con sabor a carne irresistible. Aprobado por veterinarios.",
    categoria: "medicamento" as const,
    precio: 45.0,
    imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80",
    stock: 15,
    disponible: true,
    urgencia: "alta" as const,
  },
  {
    nombre: "Nexgard Spectra (10–25 kg)",
    descripcion:
      "Protección 8 en 1: pulgas, garrapatas, ácaros, parásitos internos y lombrices. Una sola tableta mensual para razas medianas.",
    categoria: "medicamento" as const,
    precio: 62.0,
    imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80",
    stock: 10,
    disponible: true,
    urgencia: "alta" as const,
  },
  {
    nombre: "Simparica Trio (5–10 kg)",
    descripcion:
      "Antiparasitario triple acción contra pulgas, garrapatas y parásitos cardíacos. Fórmula de nueva generación, efecto en 4 horas.",
    categoria: "medicamento" as const,
    precio: 58.0,
    imagen: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=500&q=80",
    stock: 8,
    disponible: true,
    urgencia: "alta" as const,
  },
  {
    nombre: "Vitaminas Cani-Tabs Plus",
    descripcion:
      "Suplemento multivitamínico diario. Fortalece huesos, pelo brillante y sistema inmune activo. 60 tabletas masticables sabor hígado.",
    categoria: "medicamento" as const,
    precio: 32.5,
    imagen: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=500&q=80",
    stock: 20,
    disponible: true,
    urgencia: "media" as const,
  },
  {
    nombre: "Omega 3 & 6 Pelaje Brillante",
    descripcion:
      "Suplemento de ácidos grasos esenciales para piel saludable y pelaje con brillo natural. 90 cápsulas de gel. Ideal para razas de pelo largo.",
    categoria: "medicamento" as const,
    precio: 38.0,
    imagen: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=500&q=80",
    stock: 18,
    disponible: true,
    urgencia: "media" as const,
  },
  {
    nombre: "Shampoo Medicado Dermovet",
    descripcion:
      "Shampoo para piel sensible, dermatitis y alergias. Clorhexidina al 2% + miconazol. Uso veterinario. 250 ml. Calma el picor en el primer baño.",
    categoria: "medicamento" as const,
    precio: 28.0,
    imagen: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&q=80",
    stock: 12,
    disponible: true,
    urgencia: "media" as const,
  },
  {
    nombre: "Frontline Plus (20–40 kg)",
    descripcion:
      "Pipeta antiparasitaria de efecto residual hasta 30 días. Elimina pulgas adultas, huevos y larvas. Para perros grandes. Pack x 3 pipetas.",
    categoria: "medicamento" as const,
    precio: 52.0,
    imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80",
    stock: 9,
    disponible: true,
    urgencia: "alta" as const,
  },
  {
    nombre: "Condroprotector Artidог",
    descripcion:
      "Suplemento articular con glucosamina + condroitina + MSM. Ideal para perros adultos mayores con artrosis o displasia de cadera. 30 tabletas.",
    categoria: "medicamento" as const,
    precio: 48.0,
    imagen: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=500&q=80",
    stock: 14,
    disponible: true,
    urgencia: "media" as const,
  },
  {
    nombre: "Desparasitante Interno Drontal Plus",
    descripcion:
      "Antiparasitario interno de amplio espectro. Elimina áscaris, tenias y anquilostomas con una sola dosis. Para perros de 10 kg. Pack x 2 tabletas.",
    categoria: "medicamento" as const,
    precio: 22.0,
    imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80",
    stock: 25,
    disponible: true,
    urgencia: "alta" as const,
  },
  {
    nombre: "Spray Cicatrizante Vetericyn",
    descripcion:
      "Spray antiséptico y cicatrizante para heridas, cortes y raspaduras. Sin alcohol, no duele al aplicar. Acelera la recuperación de la piel.",
    categoria: "medicamento" as const,
    precio: 35.0,
    imagen: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&q=80",
    stock: 11,
    disponible: true,
    urgencia: "media" as const,
  },

  // ─── ALIMENTOS (9) ────────────────────────────────────────────────────────
  {
    nombre: "Royal Canin Medium Adult 3 kg",
    descripcion:
      "Croquetas premium para razas medianas de 1 a 7 años. Fórmula con proteínas de alta digestibilidad y antioxidantes para vitalidad total.",
    categoria: "alimento" as const,
    precio: 89.0,
    imagen: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80",
    stock: 8,
    disponible: true,
    urgencia: "alta" as const,
  },
  {
    nombre: "Royal Canin Maxi Adult 4 kg",
    descripcion:
      "Alimento balanceado para razas grandes de más de 26 kg. Croquetas grandes que favorecen la masticación y reducen tartar. Soporte articular incluido.",
    categoria: "alimento" as const,
    precio: 105.0,
    imagen: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80",
    stock: 6,
    disponible: true,
    urgencia: "alta" as const,
  },
  {
    nombre: "Hill's Science Diet Adulto 3 kg",
    descripcion:
      "Alimento clínico con nutrición precisa. Proteínas de alta calidad, sin colorantes artificiales. Recomendado por veterinarios para perros sanos.",
    categoria: "alimento" as const,
    precio: 95.0,
    imagen: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80",
    stock: 7,
    disponible: true,
    urgencia: "media" as const,
  },
  {
    nombre: "Purina Pro Plan Cachorro 1.5 kg",
    descripcion:
      "Fórmula DHA para desarrollo cerebral óptimo en cachorros hasta 1 año. Con colostro bovino para reforzar el sistema inmunitario desde el primer día.",
    categoria: "alimento" as const,
    precio: 72.0,
    imagen: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80",
    stock: 10,
    disponible: true,
    urgencia: "alta" as const,
  },
  {
    nombre: "Alimento Húmedo Purina Pro Plan Pollo",
    descripcion:
      "Lata de 400g con pollo y arroz en salsa. Alta palatabilidad para perros exigentes. Sin conservantes artificiales. Ideal como complemento o alimento único.",
    categoria: "alimento" as const,
    precio: 12.0,
    imagen: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80",
    stock: 25,
    disponible: true,
    urgencia: "media" as const,
  },
  {
    nombre: "Snacks Dentales Dentastix x7",
    descripcion:
      "Premios masticables con textura especial que limpia los dientes mientras el perro los come. Reduce el sarro hasta en 80%. Sabor pollo.",
    categoria: "alimento" as const,
    precio: 18.5,
    imagen: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=500&q=80",
    stock: 30,
    disponible: true,
    urgencia: "baja" as const,
  },
  {
    nombre: "Premios Freeze-Dried Pechuga de Pollo",
    descripcion:
      "Snacks liofilizados 100% pechuga de pollo. Sin aditivos, sin gluten. Alto en proteína. Perfectos para entrenamiento y refuerzo positivo. 80g.",
    categoria: "alimento" as const,
    precio: 25.0,
    imagen: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=500&q=80",
    stock: 22,
    disponible: true,
    urgencia: "baja" as const,
  },
  {
    nombre: "Royal Canin Urinary S/O 2 kg",
    descripcion:
      "Alimento terapéutico para perros con problemas urinarios. Disolución de cálculos de estruvita. Solo bajo prescripción o recomendación veterinaria.",
    categoria: "alimento" as const,
    precio: 118.0,
    imagen: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80",
    stock: 4,
    disponible: true,
    urgencia: "alta" as const,
  },
  {
    nombre: "Pasta de Atún y Salmón para Perros",
    descripcion:
      "Pasta húmeda en tubo con atún y salmón. Sin sal añadida. Fuente natural de Omega 3. Ideal para perros convalecientes o con poco apetito. 75g.",
    categoria: "alimento" as const,
    precio: 9.5,
    imagen: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80",
    stock: 35,
    disponible: true,
    urgencia: "baja" as const,
  },

  // ─── ACCESORIOS (9) ───────────────────────────────────────────────────────
  {
    nombre: "Collar Antipulgas Seresto 8 meses",
    descripcion:
      "Protección continua 8 meses contra pulgas y garrapatas. Resistente al agua, no mancha el pelaje. Tecnología de liberación lenta. Para perros grandes.",
    categoria: "accesorio" as const,
    precio: 75.0,
    imagen: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80",
    stock: 10,
    disponible: true,
    urgencia: "media" as const,
  },
  {
    nombre: "Cama Ortopédica Memory Foam Talla M",
    descripcion:
      "Cama con viscoelástica que distribuye el peso y alivia presión en articulaciones. Para perros de 10–20 kg. Funda lavable antialérgica. 70x50 cm.",
    categoria: "accesorio" as const,
    precio: 120.0,
    imagen: "https://images.unsplash.com/photo-1601758174493-e3b965d5edbb?w=500&q=80",
    stock: 5,
    disponible: true,
    urgencia: "baja" as const,
  },
  {
    nombre: "Correa Retráctil 5 metros (hasta 25 kg)",
    descripcion:
      "Correa extensible con freno de seguridad de un solo click. Mango ergonómico antideslizante. Cable resistente de nylon trenzado. Color negro.",
    categoria: "accesorio" as const,
    precio: 35.0,
    imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80",
    stock: 18,
    disponible: true,
    urgencia: "baja" as const,
  },
  {
    nombre: "Arnés Antitirones Julius-K9 Talla M",
    descripcion:
      "Arnés de control total con handle dorsal y parche personalizable. Redistribuye la presión del cuello al pecho. Para perros de 15–25 kg.",
    categoria: "accesorio" as const,
    precio: 95.0,
    imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80",
    stock: 7,
    disponible: true,
    urgencia: "media" as const,
  },
  {
    nombre: "Bebedero Automático 2L Anti-derrames",
    descripcion:
      "Dispensador de agua fresca con filtro de carbón activo. Bomba silenciosa de 1.5W. Ideal para perros que toman poca agua. Fácil limpieza.",
    categoria: "accesorio" as const,
    precio: 68.0,
    imagen: "https://images.unsplash.com/photo-1601758174493-e3b965d5edbb?w=500&q=80",
    stock: 9,
    disponible: true,
    urgencia: "baja" as const,
  },
  {
    nombre: "Cepillo Furminator Pelo Corto",
    descripcion:
      "Herramienta profesional que reduce la pérdida de pelo hasta en 90%. Peine de acero inoxidable con botón de expulsión. Para perros de pelo corto.",
    categoria: "accesorio" as const,
    precio: 55.0,
    imagen: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80",
    stock: 13,
    disponible: true,
    urgencia: "baja" as const,
  },
  {
    nombre: "Mochila Transportín Ventilada",
    descripcion:
      "Mochila portamascotas con panel de malla 360°, base rígida antideslizante y correas acolchadas. Hasta 8 kg. Ideal para viajes al veterinario.",
    categoria: "accesorio" as const,
    precio: 89.0,
    imagen: "https://images.unsplash.com/photo-1601758174493-e3b965d5edbb?w=500&q=80",
    stock: 6,
    disponible: true,
    urgencia: "baja" as const,
  },
  {
    nombre: "GPS Tractive para Perros",
    descripcion:
      "Localizador GPS en tiempo real con historial de rutas. Resistente al agua IPX7. Batería 7 días. Compatible con app iOS y Android. Suscripción mensual.",
    categoria: "accesorio" as const,
    precio: 145.0,
    imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80",
    stock: 4,
    disponible: true,
    urgencia: "baja" as const,
  },
  {
    nombre: "Kit Dental Perros (cepillo + pasta)",
    descripcion:
      "Cepillo de silicona para dedo + pasta dental sabor pollo sin flúor. Previene sarro y mal aliento. Seguro si el perro lo ingiere. Para todas las razas.",
    categoria: "accesorio" as const,
    precio: 19.0,
    imagen: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80",
    stock: 20,
    disponible: true,
    urgencia: "media" as const},

    // ─── ROPA Y MODA CANINA (15) ───────────────────────────────────────────────
{
  nombre: "Polera Adidog Roja Talla M",
  descripcion:
    "Polera deportiva estilo urbano con capucha y tela polar suave. Mantiene el calor en climas fríos y brinda máxima comodidad. Ideal para perros medianos.",
  categoria: "accesorio" as const,
  precio: 39.0,
  imagen: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&q=80",
  stock: 18,
  disponible: true,
  urgencia: "baja" as const,
},
{
  nombre: "Casaca Impermeable Reflectiva Talla L",
  descripcion:
    "Chaqueta impermeable con bandas reflectivas para paseos nocturnos. Interior acolchado y cierre ajustable. Protege del frío y la lluvia.",
  categoria: "accesorio" as const,
  precio: 58.0,
  imagen: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80",
  stock: 10,
  disponible: true,
  urgencia: "media" as const,
},
{
  nombre: "Pijama Polar Estrellitas Talla S",
  descripcion:
    "Pijama térmico ultra suave para noches frías. Diseño adorable con estampado de estrellas y ajuste cómodo para dormir tranquilo.",
  categoria: "accesorio" as const,
  precio: 32.0,
  imagen: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&q=80",
  stock: 15,
  disponible: true,
  urgencia: "baja" as const,
},
{
  nombre: "Vestido Princesa Rosado",
  descripcion:
    "Vestido elegante con falda de tul y lazo brillante. Perfecto para cumpleaños, sesiones de fotos y eventos especiales.",
  categoria: "accesorio" as const,
  precio: 49.0,
  imagen: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&q=80",
  stock: 9,
  disponible: true,
  urgencia: "baja" as const,
},
{
  nombre: "Traje Formal Smoking Negro",
  descripcion:
    "Elegante traje tipo smoking con camisa y corbatín incorporado. Ideal para bodas, fiestas y ocasiones especiales.",
  categoria: "accesorio" as const,
  precio: 65.0,
  imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80",
  stock: 7,
  disponible: true,
  urgencia: "media" as const,
},
{
  nombre: "Buzo Deportivo Azul Marino",
  descripcion:
    "Buzo deportivo cómodo y flexible para paseos o entrenamiento. Tela respirable y costuras reforzadas. Diseño moderno.",
  categoria: "accesorio" as const,
  precio: 42.0,
  imagen: "https://images.unsplash.com/photo-1601758174493-e3b965d5edbb?w=500&q=80",
  stock: 16,
  disponible: true,
  urgencia: "baja" as const,
},
{
  nombre: "Chaleco de Invierno Acolchado",
  descripcion:
    "Chaleco térmico acolchado con cierre de velcro. Ligero pero muy cálido. Perfecto para razas pequeñas y medianas.",
  categoria: "accesorio" as const,
  precio: 44.5,
  imagen: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80",
  stock: 13,
  disponible: true,
  urgencia: "media" as const,
},
{
  nombre: "Bandana Fashion Tropical",
  descripcion:
    "Bandana ligera con estampado tropical colorido. Ajustable y fresca para verano. Dale estilo único a tu mascota.",
  categoria: "accesorio" as const,
  precio: 14.0,
  imagen: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80",
  stock: 25,
  disponible: true,
  urgencia: "baja" as const,
},
{
  nombre: "Gorro Navideño para Perros",
  descripcion:
    "Gorro suave estilo Santa Claus con ajuste elástico cómodo. Accesorio perfecto para fotos navideñas y fiestas.",
  categoria: "accesorio" as const,
  precio: 18.0,
  imagen: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&q=80",
  stock: 20,
  disponible: true,
  urgencia: "baja" as const,
},
{
  nombre: "Sudadera StreetWear Negra",
  descripcion:
    "Sudadera urbana premium con capucha y estampado moderno. Tela suave tipo algodón fleece. Look moderno y cómodo.",
  categoria: "accesorio" as const,
  precio: 47.0,
  imagen: "https://images.unsplash.com/photo-1601758174493-e3b965d5edbb?w=500&q=80",
  stock: 12,
  disponible: true,
  urgencia: "media" as const,
},
{
  nombre: "Botitas Antideslizantes x4",
  descripcion:
    "Zapatos protectores para lluvia, tierra caliente o nieve. Suela antideslizante y ajuste con velcro resistente.",
  categoria: "accesorio" as const,
  precio: 36.0,
  imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80",
  stock: 14,
  disponible: true,
  urgencia: "media" as const,
},
{
  nombre: "Camisa Hawaiiana Verano",
  descripcion:
    "Camisa fresca estilo hawaiano con botones y estampado floral. Ideal para verano, playa y sesiones de fotos.",
  categoria: "accesorio" as const,
  precio: 29.0,
  imagen: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&q=80",
  stock: 17,
  disponible: true,
  urgencia: "baja" as const,
},
{
  nombre: "Poncho Andino para Mascotas",
  descripcion:
    "Poncho artesanal inspirado en diseños andinos peruanos. Tejido cálido y cómodo para días fríos.",
  categoria: "accesorio" as const,
  precio: 52.0,
  imagen: "https://images.unsplash.com/photo-1601758174493-e3b965d5edbb?w=500&q=80",
  stock: 8,
  disponible: true,
  urgencia: "media" as const,
},
{
  nombre: "Polo Básico Blanco Premium",
  descripcion:
    "Polo ligero y cómodo para uso diario. Tela transpirable de alta calidad y costuras resistentes.",
  categoria: "accesorio" as const,
  precio: 22.0,
  imagen: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&q=80",
  stock: 30,
  disponible: true,
  urgencia: "baja" as const,
},
{
  nombre: "Disfraz de Dinosaurio Verde",
  descripcion:
    "Disfraz divertido con capucha y cola acolchada. Tela suave y cómoda para eventos, Halloween y fotos virales.",
  categoria: "accesorio" as const,
  precio: 55.0,
  imagen: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80",
  stock: 6,
  disponible: true,
  urgencia: "baja" as const,
},
  
];

async function main() {
  console.log("🌱 Iniciando seed de productos Mimos Pet Club...\n");

  // Limpiar solo productos (no carnets ni reservas)
  const deleted = await prisma.producto.deleteMany();
  console.log(`🗑️  ${deleted.count} productos anteriores eliminados\n`);

  let creados = 0;
  for (const producto of productos) {
    await prisma.producto.create({ data: producto });
    console.log(`✅ [${producto.categoria.toUpperCase()}] ${producto.nombre} — S/ ${producto.precio}`);
    creados++;
  }

  const porCategoria = {
    medicamento: productos.filter((p) => p.categoria === "medicamento").length,
    alimento: productos.filter((p) => p.categoria === "alimento").length,
    accesorio: productos.filter((p) => p.categoria === "accesorio").length,
  };

  console.log(`
🎉 Seed completado: ${creados} productos creados
   💊 Medicamentos: ${porCategoria.medicamento}
   🍖 Alimentos:    ${porCategoria.alimento}
   🦮 Accesorios:   ${porCategoria.accesorio}
`);
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });