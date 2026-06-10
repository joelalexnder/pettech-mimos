import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter });
type CategoriaType = "medicamento" | "alimento" | "accesorio" | "ropa";
type UrgenciaType = "alta" | "media" | "baja";

const productos: {
  nombre: string;
  descripcion: string;
  categoria: CategoriaType;
  precio: number;
  imagen: string;
  stock: number;
  disponible: boolean;
  urgencia: UrgenciaType;
}[] = [
  // ── MEDICAMENTOS ──
  { nombre: "Frontline Plus Antipulgas Perros Grandes", descripcion: "Tratamiento antipulgas y garrapatas para perros de 20-40kg. Protección por 30 días.", categoria: "medicamento", precio: 65.90, imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80", stock: 24, disponible: true, urgencia: "alta" },
  { nombre: "Nexgard Antiparasitario Masticable", descripcion: "Comprimido masticable mensual contra pulgas y garrapatas. Sabor a res.", categoria: "medicamento", precio: 58.50, imagen: "https://images.unsplash.com/photo-1550159930-40066082a4fc?w=600&q=80", stock: 18, disponible: true, urgencia: "alta" },
  { nombre: "Bravecto Antipulgas 3 Meses", descripcion: "Una sola dosis protege por 3 meses contra pulgas y garrapatas. Para perros 10-20kg.", categoria: "medicamento", precio: 89.00, imagen: "https://images.unsplash.com/photo-1559181567-c3190ca9d5db?w=600&q=80", stock: 12, disponible: true, urgencia: "alta" },
  { nombre: "Advocate Pipeta Antiparasitaria", descripcion: "Pipeta spot-on contra pulgas, ácaros y parásitos internos. Para perros hasta 4kg.", categoria: "medicamento", precio: 42.00, imagen: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80", stock: 30, disponible: true, urgencia: "media" },
  { nombre: "Drontal Plus Desparasitante Interno", descripcion: "Tabletas desparasitantes de amplio espectro. Elimina lombrices, tenias y áscaris.", categoria: "medicamento", precio: 28.90, imagen: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80", stock: 45, disponible: true, urgencia: "media" },
  { nombre: "Meloxicam Veterinario 1mg/ml", descripcion: "Antiinflamatorio y analgésico para perros. Alivio del dolor articular y post-quirúrgico.", categoria: "medicamento", precio: 35.00, imagen: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&q=80", stock: 20, disponible: true, urgencia: "media" },
  { nombre: "Suplemento Omega 3 para Mascotas", descripcion: "Cápsulas de aceite de salmón. Mejora pelaje, piel y articulaciones. 60 cápsulas.", categoria: "medicamento", precio: 32.50, imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80", stock: 38, disponible: true, urgencia: "baja" },
  { nombre: "Vetmedin Corazón Canino 2.5mg", descripcion: "Medicamento cardíaco para perros con insuficiencia cardíaca. 50 tabletas.", categoria: "medicamento", precio: 120.00, imagen: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&q=80", stock: 8, disponible: true, urgencia: "alta" },
  { nombre: "Otoclean Limpiador de Oídos", descripcion: "Solución limpiadora auricular para perros y gatos. Previene otitis e infecciones.", categoria: "medicamento", precio: 22.00, imagen: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600&q=80", stock: 25, disponible: true, urgencia: "baja" },
  { nombre: "Cosequin DS Suplemento Articular", descripcion: "Glucosamina y condroitina para articulaciones. Ideal para perros mayores con artritis.", categoria: "medicamento", precio: 75.00, imagen: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&q=80", stock: 15, disponible: true, urgencia: "media" },
  { nombre: "Probiótico Fortiflora Canino", descripcion: "Suplemento probiótico para equilibrar la flora intestinal. Sobres x30.", categoria: "medicamento", precio: 45.00, imagen: "https://images.unsplash.com/photo-1559056961-1f3a7a8b8b0c?w=600&q=80", stock: 22, disponible: true, urgencia: "media" },
  { nombre: "Tramadol Veterinario 50mg", descripcion: "Analgésico opioide para dolor moderado a severo en perros. Requiere prescripción.", categoria: "medicamento", precio: 18.50, imagen: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&q=80", stock: 10, disponible: true, urgencia: "alta" },
  { nombre: "Ciprofloxacino Veterinario 250mg", descripcion: "Antibiótico de amplio espectro para infecciones bacterianas en perros. 20 tabletas.", categoria: "medicamento", precio: 25.00, imagen: "https://images.unsplash.com/photo-1576671414225-5b1b7b9c3a9b?w=600&q=80", stock: 16, disponible: true, urgencia: "alta" },
  { nombre: "Vitaminas B Complex Canino", descripcion: "Complejo vitamínico B para perros. Energía, sistema nervioso y metabolismo saludable.", categoria: "medicamento", precio: 19.90, imagen: "https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=600&q=80", stock: 40, disponible: true, urgencia: "baja" },
  { nombre: "Apoquel Antialérgico 16mg", descripcion: "Tratamiento para el prurito asociado a dermatitis alérgica. Alivio en 4 horas.", categoria: "medicamento", precio: 95.00, imagen: "https://images.unsplash.com/photo-1588776814546-1ffbb172d936?w=600&q=80", stock: 7, disponible: true, urgencia: "alta" },
  { nombre: "Shampoo Medicado Malaseb", descripcion: "Shampoo antifúngico y antibacteriano para dermatitis, sarna y hongos. 250ml.", categoria: "medicamento", precio: 38.00, imagen: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80", stock: 19, disponible: true, urgencia: "media" },
  { nombre: "Suero Oral Rehidratante Canino", descripcion: "Rehidratación rápida para perros con vómitos o diarrea. Sabor pollo. 500ml.", categoria: "medicamento", precio: 15.00, imagen: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=600&q=80", stock: 33, disponible: true, urgencia: "media" },
  { nombre: "Calmivet Ansiolítico Natural", descripcion: "Comprimidos calmantes con valeriana y melatonina. Para viajes, tormentas y estrés.", categoria: "medicamento", precio: 29.90, imagen: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80", stock: 28, disponible: true, urgencia: "baja" },

  // ── ALIMENTOS ──
  { nombre: "Royal Canin Adult Medium 15kg", descripcion: "Alimento balanceado para perros adultos de razas medianas.", categoria: "alimento", precio: 185.00, imagen: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80", stock: 14, disponible: true, urgencia: "alta" },
  { nombre: "Hills Science Diet Adulto 12kg", descripcion: "Nutrición precisa con ingredientes de calidad. Para perros adultos de 1-6 años.", categoria: "alimento", precio: 165.00, imagen: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&q=80", stock: 11, disponible: true, urgencia: "alta" },
  { nombre: "Purina Pro Plan Cachorro 3kg", descripcion: "Fórmula con pollo y arroz para cachorros. DHA para desarrollo cerebral óptimo.", categoria: "alimento", precio: 72.00, imagen: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80", stock: 20, disponible: true, urgencia: "alta" },
  { nombre: "Eukanuba Senior Large Breed 12kg", descripcion: "Alimento para perros senior de razas grandes. Glucosamina para articulaciones.", categoria: "alimento", precio: 155.00, imagen: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&q=80", stock: 9, disponible: true, urgencia: "media" },
  { nombre: "Acana Grain Free Pollo 6kg", descripcion: "Alimento sin granos con 70% de ingredientes de origen animal.", categoria: "alimento", precio: 135.00, imagen: "https://images.unsplash.com/photo-1585846328934-2a4d5e2b07af?w=600&q=80", stock: 6, disponible: true, urgencia: "media" },
  { nombre: "Snacks Dentales Pedigree DentaStix", descripcion: "Palitos dentales que reducen el sarro en un 80%. Pack x28.", categoria: "alimento", precio: 28.00, imagen: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&q=80", stock: 50, disponible: true, urgencia: "baja" },
  { nombre: "Alimento Húmedo Cesar Pollo x12", descripcion: "Bandejas de alimento húmedo gourmet para perros pequeños. Pack de 12.", categoria: "alimento", precio: 42.00, imagen: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=600&q=80", stock: 35, disponible: true, urgencia: "baja" },
  { nombre: "Brit Care Lamb & Rice 12kg", descripcion: "Alimento premium con cordero y arroz. Sin gluten, ideal para perros sensibles.", categoria: "alimento", precio: 148.00, imagen: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80", stock: 13, disponible: true, urgencia: "media" },
  { nombre: "Snacks Naturales Liofilizados Pollo", descripcion: "Trozos de pechuga de pollo liofilizados. 100% natural, sin aditivos. 100g.", categoria: "alimento", precio: 22.00, imagen: "https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=600&q=80", stock: 42, disponible: true, urgencia: "baja" },
  { nombre: "Royal Canin Dermacomfort 10kg", descripcion: "Para perros con piel sensible e irritaciones. Reduce el picor desde la primera semana.", categoria: "alimento", precio: 145.00, imagen: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80", stock: 8, disponible: true, urgencia: "alta" },
  { nombre: "Orijen Original Dog 2kg", descripcion: "85% de proteína animal. Pollo, pavo y huevo de corral.", categoria: "alimento", precio: 98.00, imagen: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600&q=80", stock: 5, disponible: true, urgencia: "media" },
  { nombre: "Pasta de Maní para Perros 300g", descripcion: "Mantequilla de maní especial para mascotas. Sin xilitol.", categoria: "alimento", precio: 18.90, imagen: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&q=80", stock: 60, disponible: true, urgencia: "baja" },
  { nombre: "Hills Prescription Diet i/d 3.8kg", descripcion: "Dieta gastrointestinal veterinaria. Para perros con problemas digestivos.", categoria: "alimento", precio: 88.00, imagen: "https://images.unsplash.com/photo-1611003228941-98852ba62227?w=600&q=80", stock: 10, disponible: true, urgencia: "alta" },
  { nombre: "Huesos Naturales Prensados x5", descripcion: "Huesos prensados de cuero natural para masticar. Limpieza dental.", categoria: "alimento", precio: 25.00, imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80", stock: 45, disponible: true, urgencia: "baja" },
  { nombre: "Purina ONE Senior 7+ años 3kg", descripcion: "Fórmula para perros mayores de 7 años. Omega 3 y glucosamina.", categoria: "alimento", precio: 68.00, imagen: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80", stock: 17, disponible: true, urgencia: "media" },
  { nombre: "Caldo de Hueso Natural Perros 500ml", descripcion: "Caldo 100% natural de huesos de res. Hidratación extra.", categoria: "alimento", precio: 16.50, imagen: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600&q=80", stock: 30, disponible: true, urgencia: "baja" },
  { nombre: "Zignature Trucha y Salmón 12.5kg", descripcion: "Alimento hipoalergénico con una sola fuente de proteína.", categoria: "alimento", precio: 210.00, imagen: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&q=80", stock: 4, disponible: true, urgencia: "media" },
  { nombre: "Snacks Entrenamiento Zukes Mini 170g", descripcion: "Premios suaves de 3 calorías para entrenamiento. Sabor salmón.", categoria: "alimento", precio: 32.00, imagen: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&q=80", stock: 38, disponible: true, urgencia: "baja" },

  // ── ACCESORIOS ──
  { nombre: "Cama Ortopédica Memory Foam L", descripcion: "Cama con espuma viscoelástica para perros grandes. Funda lavable. 90x70cm.", categoria: "accesorio", precio: 189.00, imagen: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80", stock: 7, disponible: true, urgencia: "media" },
  { nombre: "Correa Retráctil Premium 5 metros", descripcion: "Correa extensible con freno de seguridad. Hasta 50kg.", categoria: "accesorio", precio: 55.00, imagen: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&q=80", stock: 22, disponible: true, urgencia: "baja" },
  { nombre: "Arnés Antitirones Step-in Talla M", descripcion: "Arnés con clip frontal y dorsal que reduce el tirón.", categoria: "accesorio", precio: 72.00, imagen: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80", stock: 15, disponible: true, urgencia: "media" },
  { nombre: "Bebedero Automático con Filtro 3L", descripcion: "Fuente de agua con filtro de carbón activo. Circulación continua.", categoria: "accesorio", precio: 95.00, imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80", stock: 11, disponible: true, urgencia: "media" },
  { nombre: "Transportín Aéreo IATA Talla S", descripcion: "Transportín aprobado para cabina de avión. Para perros hasta 6kg.", categoria: "accesorio", precio: 145.00, imagen: "https://images.unsplash.com/photo-1585209386219-e60a9f31c41e?w=600&q=80", stock: 5, disponible: true, urgencia: "alta" },
  { nombre: "Juguete Kong Classic Talla L", descripcion: "Juguete rellenable de goma natural resistente. Estimulación mental.", categoria: "accesorio", precio: 48.00, imagen: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80", stock: 28, disponible: true, urgencia: "baja" },
  { nombre: "Collar GPS Tractive Perros", descripcion: "Localizador GPS en tiempo real. Resistente al agua. App incluida.", categoria: "accesorio", precio: 320.00, imagen: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&q=80", stock: 4, disponible: true, urgencia: "media" },
  { nombre: "Cepillo Furminator Perros Medios", descripcion: "Deslanador profesional que elimina el 90% del pelo muerto.", categoria: "accesorio", precio: 85.00, imagen: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80", stock: 13, disponible: true, urgencia: "baja" },
  { nombre: "Plato Antitragón Acero Inoxidable", descripcion: "Comedero con laberinto que reduce la velocidad de ingesta.", categoria: "accesorio", precio: 32.00, imagen: "https://images.unsplash.com/photo-1597843786186-8e4d06e90bde?w=600&q=80", stock: 24, disponible: true, urgencia: "media" },
  { nombre: "Mochila Transportadora Perros 6kg", descripcion: "Mochila con ventanas de malla para llevar a tu perro. Hasta 6kg.", categoria: "accesorio", precio: 120.00, imagen: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&q=80", stock: 8, disponible: true, urgencia: "media" },
  { nombre: "Juguete Snuffle Mat Olfativo", descripcion: "Alfombra de olfateo para estimulación mental. Lavable.", categoria: "accesorio", precio: 55.00, imagen: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80", stock: 16, disponible: true, urgencia: "baja" },
  { nombre: "Cinturón Seguridad Auto Perros M", descripcion: "Arnés homologado para viajes en auto. Se conecta al cinturón.", categoria: "accesorio", precio: 42.00, imagen: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&q=80", stock: 20, disponible: true, urgencia: "baja" },
  { nombre: "Piscina Plegable Perros XL 160cm", descripcion: "Piscina portátil de PVC para perros grandes. 160cm.", categoria: "accesorio", precio: 78.00, imagen: "https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=600&q=80", stock: 9, disponible: true, urgencia: "baja" },
  { nombre: "Kit Dental Perros (cepillo + pasta)", descripcion: "Cepillo de silicona + pasta dental sabor pollo sin flúor.", categoria: "accesorio", precio: 19.00, imagen: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80", stock: 20, disponible: true, urgencia: "media" },

  // ── ROPA ──
  { nombre: "Polera Adidog Roja Talla M", descripcion: "Polera deportiva estilo urbano con capucha y tela polar suave.", categoria: "ropa", precio: 39.00, imagen: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80", stock: 18, disponible: true, urgencia: "baja" },
  { nombre: "Casaca Impermeable Reflectiva Talla L", descripcion: "Chaqueta impermeable con bandas reflectivas para paseos nocturnos.", categoria: "ropa", precio: 58.00, imagen: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600&q=80", stock: 10, disponible: true, urgencia: "media" },
  { nombre: "Pijama Polar Estrellitas Talla S", descripcion: "Pijama térmico ultra suave para noches frías.", categoria: "ropa", precio: 32.00, imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80", stock: 15, disponible: true, urgencia: "baja" },
  { nombre: "Vestido Princesa Rosado", descripcion: "Vestido elegante con falda de tul y lazo brillante.", categoria: "ropa", precio: 49.00, imagen: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&q=80", stock: 9, disponible: true, urgencia: "baja" },
  { nombre: "Traje Formal Smoking Negro", descripcion: "Elegante traje tipo smoking con camisa y corbatín.", categoria: "ropa", precio: 65.00, imagen: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80", stock: 7, disponible: true, urgencia: "media" },
  { nombre: "Buzo Deportivo Azul Marino", descripcion: "Buzo deportivo cómodo y flexible. Tela respirable.", categoria: "ropa", precio: 42.00, imagen: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&q=80", stock: 16, disponible: true, urgencia: "baja" },
  { nombre: "Chaleco de Invierno Acolchado", descripcion: "Chaleco térmico acolchado con cierre de velcro.", categoria: "ropa", precio: 44.50, imagen: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&q=80", stock: 13, disponible: true, urgencia: "media" },
  { nombre: "Bandana Fashion Tropical", descripcion: "Bandana ligera con estampado tropical colorido.", categoria: "ropa", precio: 14.00, imagen: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&q=80", stock: 25, disponible: true, urgencia: "baja" },
  { nombre: "Gorro Navideño para Perros", descripcion: "Gorro suave estilo Santa Claus con ajuste elástico.", categoria: "ropa", precio: 18.00, imagen: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80", stock: 20, disponible: true, urgencia: "baja" },
  { nombre: "Sudadera StreetWear Negra", descripcion: "Sudadera urbana premium con capucha y estampado moderno.", categoria: "ropa", precio: 47.00, imagen: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&q=80", stock: 12, disponible: true, urgencia: "media" },
  { nombre: "Botitas Antideslizantes x4", descripcion: "Zapatos protectores para lluvia, tierra caliente o nieve.", categoria: "ropa", precio: 36.00, imagen: "https://images.unsplash.com/photo-1585846328934-2a4d5e2b07af?w=600&q=80", stock: 14, disponible: true, urgencia: "media" },
  { nombre: "Camisa Hawaiiana Verano", descripcion: "Camisa fresca estilo hawaiano con botones y estampado floral.", categoria: "ropa", precio: 29.00, imagen: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&q=80", stock: 17, disponible: true, urgencia: "baja" },
  { nombre: "Poncho Andino para Mascotas", descripcion: "Poncho artesanal inspirado en diseños andinos peruanos.", categoria: "ropa", precio: 52.00, imagen: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=600&q=80", stock: 8, disponible: true, urgencia: "media" },
  { nombre: "Polo Básico Blanco Premium", descripcion: "Polo ligero y cómodo para uso diario. Tela transpirable.", categoria: "ropa", precio: 22.00, imagen: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&q=80", stock: 30, disponible: true, urgencia: "baja" },
  { nombre: "Disfraz de Dinosaurio Verde", descripcion: "Disfraz divertido con capucha y cola acolchada. Para Halloween.", categoria: "ropa", precio: 55.00, imagen: "https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=600&q=80", stock: 6, disponible: true, urgencia: "baja" },
];

async function main() {
  console.log("🌱 Iniciando seed de productos Mimos Pet Club...\n");
  await prisma.reservaItem.deleteMany();
  await prisma.reserva.deleteMany();
  await prisma.producto.deleteMany();
  console.log("🗑️  Productos anteriores eliminados\n");

  const result = await prisma.producto.createMany({ data: productos });

  const porCategoria = {
    medicamento: productos.filter((p) => p.categoria === "medicamento").length,
    alimento:    productos.filter((p) => p.categoria === "alimento").length,
    accesorio:   productos.filter((p) => p.categoria === "accesorio").length,
    ropa:        productos.filter((p) => p.categoria === "ropa").length,
  };

  console.log(`🎉 Seed completado: ${result.count} productos creados`);
  console.log(`   💊 Medicamentos: ${porCategoria.medicamento}`);
  console.log(`   🍖 Alimentos:    ${porCategoria.alimento}`);
  console.log(`   🦮 Accesorios:   ${porCategoria.accesorio}`);
  console.log(`   👗 Ropa:         ${porCategoria.ropa}`);
}

main()
  .catch((e) => { console.error("❌ Error en seed:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });