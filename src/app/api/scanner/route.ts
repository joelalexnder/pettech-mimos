// -> BACKEND IA: Recibe la foto, procesa la IA y devuelve la raza.

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cookies } from "next/headers";
import sharp from "sharp";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");


export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const usageCookie = cookieStore.get("carga");
        let usosActuales = usageCookie ? parseInt(usageCookie.value) : 0;

        if (usosActuales >= 4) {
        return NextResponse.json(
            { error: "Has alcanzado el límite de 4 escaneos gratuitos por hoy. ¡Contacta a Mimos Pet Club por WhatsApp para más información!" }, 
            { status: 429 } 
        );
        }

        const formData = await request.formData();
        const imageFile = formData.get("image") as File;

        if (!imageFile) {
        return NextResponse.json({ error: "No se proporcionó ninguna imagen." }, { status: 400 });
        }
        

        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const compressedBuffer = await sharp(buffer)
        .resize({ width: 800, withoutEnlargement: true }) 
        .jpeg({ quality: 80 }) 
        .toBuffer();

        const base64Data = compressedBuffer.toString("base64");
        
        const imagePart = {
        inlineData: {
            data: base64Data,
            mimeType: "image/jpeg",
        },
        };

        
        const prompt = `
        Actúa como un experto veterinario y analista de comportamiento canino de "Mimos Pet Club".
        Analiza la imagen adjunta con cuidado.
        
        REGLA 1: Si la imagen NO contiene un perro, debes devolver estrictamente un JSON con este formato:
        { "error": "No se detectó un perro en la imagen. Por favor, sube una foto válida de tu perrito." }
        
        REGLA 2: Si la imagen SÍ contiene un perro, identifica su raza. Si observas que es mestizo, especifica las dos razas predominantes que observes (ej. 'Cruce de Labrador y Beagle').
        Devuelve un JSON con esta estructura exacta:
        {
            "raza": "Nombre de la raza o cruce",
            "personalidad": "Breve descripción de su temperamento típico",
            "cuidados": "Un consejo principal de cuidado",
            "curiosidad": "Un dato curioso e interesante de la raza",
            "servicioRecomendado": "Elige SOLO UNO de los siguientes servicios de Mimos Pet Club, basándote estrictamente en las necesidades físicas, de edad o raza detectada: 
            - 'Clínica Veterinaria' (Para cachorros, perros que se vean enfermos, razas con problemas genéticos de salud conocidos, o chequeo preventivo general).
            - 'Peluquería y Styling' (Solo para razas de pelo largo o rizado que requieren corte, ej. Poodle, Shih Tzu, Schnauzer).
            - 'Baño Spa y Deslanado' (Para razas que mudan mucho pelo o de pelo corto, ej. Husky, Golden, Pug, Beagle).
            - 'Colegio y Entrenamiento' (Para razas de alta energía, de trabajo o muy inteligentes, ej. Border Collie, Pastor Alemán).
            - 'Guardería de Día' (Para razas muy sociables, falderas o propensas a la ansiedad por separación).
            - 'Hotel Canino' (Opción general para perros de tamaño grande y protectores).
            - 'Pet Shop y Accesorios' (Si el perro se ve sano y es una raza muy juguetona que requiere estimulación con juguetes o ropa).",
            "motivoServicio": "Sé muy específico y persuasivo explicando por qué necesita ese servicio en Mimos Pet Club basándote en su raza y características. Haz que el cliente sienta que el consejo es totalmente personalizado."
        }
        `;

        
        const model = genAI.getGenerativeModel({ 
        model: "gemini-flash-lite-latest",
        generationConfig: {
            temperature: 0.4, 
            responseMimeType: "application/json", 
        }
        });
        
        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text();
        
        const jsonResponse = JSON.parse(responseText);

        if (jsonResponse.error) {
        return NextResponse.json({ error: jsonResponse.error }, { status: 400 });
        }

        cookieStore.set("carga", (usosActuales + 1).toString(), { 
            maxAge: 60 * 60 * 24, 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });

        return NextResponse.json(jsonResponse, { status: 200 });

    } catch (error) {
        console.error("Error al procesar la IA:", error);
        return NextResponse.json({ error: "Hubo un error al analizar la imagen. Inténtalo de nuevo." }, { status: 500 });
    }
}