import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/nose";

interface VetFormData {
  nombre: string;
  edad: string;
  raza: string;
  sintomas: string[];
  duracion: string;
  descripcionExtra: string;
}

// ── Productos de la DB (con fallback al catálogo hardcodeado) ─────────────────

async function obtenerProductosDB() {
  try {
    return await prisma.producto.findMany({
      where: { disponible: true, stock: { gt: 0 } },
      orderBy: { urgencia: "asc" },
      select: { id: true, nombre: true, descripcion: true, categoria: true, precio: true, urgencia: true, stock: true },
    });
  } catch {
    return [];
  }
}

const CATALOGO_RESPALDO = [
  { nombre: "Omeprazol Veterinario 20mg", categoria: "medicamento", descripcion: "Protector gástrico para perros con problemas digestivos.", precio: 35, urgencia: "alta" },
  { nombre: "Ivermectina 1% Solución", categoria: "medicamento", descripcion: "Antiparasitario externo e interno de amplio espectro.", precio: 28, urgencia: "alta" },
  { nombre: "Suplemento Articular Condroitín + Glucosamina", categoria: "medicamento", descripcion: "Para perros con problemas de articulaciones o mayores de 7 años.", precio: 62, urgencia: "media" },
  { nombre: "Vitaminas B Complex Canino", categoria: "medicamento", descripcion: "Refuerza el sistema nervioso y el pelaje.", precio: 42, urgencia: "media" },
  { nombre: "Probióticos Caninos FortiFlora", categoria: "medicamento", descripcion: "Restaura la flora intestinal tras diarrea o antibióticos.", precio: 55, urgencia: "alta" },
  { nombre: "Antipulgas Frontline Plus", categoria: "medicamento", descripcion: "Protección mensual contra pulgas y garrapatas.", precio: 48, urgencia: "media" },
  { nombre: "Colirio Veterinario Gentamicina", categoria: "medicamento", descripcion: "Tratamiento de infecciones oculares bacterianas.", precio: 22, urgencia: "alta" },
  { nombre: "Omega 3 + 6 Cápsulas Dermatológicas", categoria: "medicamento", descripcion: "Mejora la piel seca, picazón y brillo del pelaje.", precio: 38, urgencia: "baja" },
  { nombre: "Royal Canin Gastrointestinal 2kg", categoria: "alimento", descripcion: "Dieta terapéutica para problemas digestivos, diarrea y vómitos.", precio: 95, urgencia: "alta" },
  { nombre: "Hill's Prescription Diet z/d Alergia 1.8kg", categoria: "alimento", descripcion: "Para perros con alergias alimentarias diagnosticadas.", precio: 115, urgencia: "alta" },
  { nombre: "Purina Pro Plan Senior 7+ 3kg", categoria: "alimento", descripcion: "Fórmula para perros mayores con soporte articular y renal.", precio: 85, urgencia: "media" },
  { nombre: "Royal Canin Maxi Adult 4kg", categoria: "alimento", descripcion: "Nutrición completa para razas grandes adultas.", precio: 110, urgencia: "baja" },
  { nombre: "Snacks Dentales Pedigree DentaStix", categoria: "alimento", descripcion: "Reduce sarro y cuida la salud dental diariamente.", precio: 18, urgencia: "baja" },
  { nombre: "Collar Isabelino Transparente M", categoria: "accesorio", descripcion: "Previene que el perro se lama heridas o suturas postoperatorias.", precio: 25, urgencia: "alta" },
  { nombre: "Cama Ortopédica Memory Foam L", categoria: "accesorio", descripcion: "Para perros con displasia de cadera o dolor articular.", precio: 145, urgencia: "media" },
  { nombre: "Bebedero Automático Filtrado 2L", categoria: "accesorio", descripcion: "Fomenta la hidratación con agua siempre fresca y filtrada.", precio: 68, urgencia: "baja" },
  { nombre: "Pipetas Antiparasitarias Seresto", categoria: "accesorio", descripcion: "Collar repelente de larga duración contra pulgas y garrapatas.", precio: 78, urgencia: "media" },
];

function buildSystemPrompt(productos: { nombre: string; categoria: string; descripcion: string; precio: number; urgencia: string }[], desdeDB: boolean): string {
  const catalogoTexto = productos
    .map(p => `- [${p.categoria.toUpperCase()}] ${p.nombre} (S/ ${p.precio.toFixed ? p.precio.toFixed(2) : p.precio}): ${p.descripcion} | urgencia: ${p.urgencia}`)
    .join("\n");

  return `Eres VetBot, el asistente veterinario IA de Mimos Pet Club. Eres cálido, profesional y empático.

REGLAS:
1. Solo atiendes consultas sobre PERROS.
2. Siempre recuerda que eres una IA y que no reemplazas a un veterinario presencial.
3. Al final de cada consulta recomienda productos de nuestro catálogo según los síntomas.
4. Recomienda máximo 3-4 productos relevantes para el caso.
5. Responde siempre en español. Sé conciso pero completo. Usa párrafos cortos.
6. Si la situación es urgente (sangrado, convulsiones, dificultad respiratoria), indica CLARAMENTE urgencias INMEDIATAMENTE.
${desdeDB ? "7. ⚠️ Los productos del catálogo son el INVENTARIO REAL con stock disponible HOY en la tienda." : ""}

CATÁLOGO ${desdeDB ? "REAL" : "DE REFERENCIA"} DE NUESTRA TIENDA:
${catalogoTexto}

FORMATO DE RESPUESTA FINAL:
- Breve análisis de los síntomas
- Recomendaciones de cuidado en casa
- Señales de alerta (cuándo ir al veterinario)
- PRODUCTOS RECOMENDADOS DE NUESTRA TIENDA: [2-4 productos con nombre exacto y motivo]
- Recordatorio de consulta presencial`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "API key no configurada." }, { status: 500 });

    const productosDB = await obtenerProductosDB();
    const usandoDB = productosDB.length > 0;
    const productos = usandoDB ? productosDB : CATALOGO_RESPALDO;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: buildSystemPrompt(productos, usandoDB),
      generationConfig: { temperature: 0.4 },
    });

    // ── Formulario ─────────────────────────────────────────────────────────
    if (body.formData) {
      const fd: VetFormData = body.formData;
      const prompt = `
Analiza el siguiente caso veterinario:
Paciente: ${fd.nombre || "Sin nombre"}
Raza: ${fd.raza || "No especificada"}
Edad: ${fd.edad}
Síntomas: ${fd.sintomas.join(", ")}
Duración: ${fd.duracion}
Descripción adicional: ${fd.descripcionExtra || "Ninguna"}
Proporciona tu análisis completo siguiendo el formato de tus instrucciones.`.trim();

      const result = await model.generateContent(prompt);
      return NextResponse.json({ text: result.response.text(), usandoDB });
    }

    // ── Chat ───────────────────────────────────────────────────────────────
    if (body.message) {
      const rawHistory: { role: string; parts: { text: string }[] }[] = body.history ?? [];
      const firstUserIndex = rawHistory.findIndex(h => h.role === "user");
      const safeHistory = firstUserIndex >= 0 ? rawHistory.slice(firstUserIndex) : [];

      const chat = model.startChat({
        history: safeHistory.map(h => ({ role: h.role as "user" | "model", parts: h.parts })),
      });

      const result = await chat.sendMessage(body.message);
      return NextResponse.json({ text: result.response.text(), usandoDB });
    }

    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });

  } catch (err) {
    console.error("[VetBot API Error]", err);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}