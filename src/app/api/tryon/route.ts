import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import sharp from "sharp";

const API_KEY = process.env.GENLOOK_API_KEY;

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const usageCookie = cookieStore.get("tryon_usos");
    let usosActuales = usageCookie ? parseInt(usageCookie.value) : 0;

    if (usosActuales >= 3) {
      return NextResponse.json(
        { error: "Has alcanzado el límite de 3 pruebas de ropa por hoy. ¡Regresa mañana para probar más estilos!" },
        { status: 429 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { error: "Error de configuración en el servidor." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const clothId = formData.get("clothId") as string;
    const clothImageUrl = formData.get("clothImageUrl") as string;
    const clothName = formData.get("clothName") as string;

    if (!file || !clothId || !clothImageUrl) {
      return NextResponse.json(
        { error: "Faltan datos de la imagen o de la prenda." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);


    const processedBuffer = await sharp(inputBuffer)
      .resize(900, 1200, {
        fit: "cover",         
        position: "attention",  
        withoutEnlargement: false,
      })
      .jpeg({ quality: 90 })
      .toBuffer();

    const processedBlob = new Blob([new Uint8Array(processedBuffer)], { type: "image/jpeg" });


    const uploadForm = new FormData();
    uploadForm.append("file", processedBlob, "pet_delivery.jpg");
    uploadForm.append("crop", "false");

    const uploadRes = await fetch("https://api.genlook.app/tryon/v1/images/upload", {
      method: "POST",
      headers: { "x-api-key": API_KEY },
      body: uploadForm,
    });

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) {
      return NextResponse.json(
        { error: "La imagen enviada no cumple con los requisitos del probador virtual.", details: uploadData }, 
        { status: 400 }
      );
    }

    const imageId = uploadData.imageId || uploadData.id || uploadData.customerImageId;

    if (!imageId) {
      return NextResponse.json({ error: "No se pudo mapear el identificador de la imagen subida." }, { status: 500 });
    }

    const tryOnBody = {
      product: {
        externalId: clothId,
        title: clothName,
        description: clothName,
        images: [{ url: clothImageUrl }],
      },
      customer: {
        url: uploadData.imageUrl,
      }
    };

    const tryOnRes = await fetch("https://api.genlook.app/tryon/v1/try-on", {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tryOnBody),
    });

    const tryOnData = await tryOnRes.json();

    if (!tryOnRes.ok) {
      return NextResponse.json({ error: "Error al procesar el montaje de la ropa en tu mascota." }, { status: 500 });
    }

    const generationId = tryOnData.generationId || tryOnData.id;

    if (!generationId) {
      return NextResponse.json({ error: "No se obtuvo una secuencia de generación válida." }, { status: 500 });
    }

    for (let i = 0; i < 20; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const resultRes = await fetch(`https://api.genlook.app/tryon/v1/generations/${generationId}`, {
        headers: { "x-api-key": API_KEY },
      });

      const resultData = await resultRes.json();

      if (resultData.status === "COMPLETED") {
        cookieStore.set("tryon_usos", (usosActuales + 1).toString(), {
          maxAge: 60 * 60 * 24, // 1 día completo
          httpOnly: true,
          secure: process.env.NODE_ENV === "production"
        });

        return NextResponse.json({
          image: resultData.resultImageUrl || resultData.imageUrl,
        });
      }

      if (resultData.status === "FAILED") {
        return NextResponse.json({ error: "La inteligencia artificial no pudo procesar la vestimenta en esta foto." }, { status: 500 });
      }
    }

    return NextResponse.json({ error: "Tiempo límite de espera agotado." }, { status: 504 });

  } catch (error: any) {
    console.error("Error crítico en backend Probador:", error);
    return NextResponse.json(
      { error: "Ocurrió un error inesperado al procesar la solicitud." },
      { status: 500 }
    );
  }
}