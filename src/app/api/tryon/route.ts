import { NextResponse } from "next/server";

const API_KEY = process.env.GENLOOK_API_KEY;

export async function POST(req: Request) {
  try {
    // Verificar API KEY
    if (!API_KEY) {
      console.error("Falta GENLOOK_API_KEY");

      return NextResponse.json(
        { error: "Falta GENLOOK_API_KEY en .env.local" },
        { status: 500 }
      );
    }

    // Leer formData
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const clothId = formData.get("clothId") as string;
    const clothImageUrl = formData.get("clothImageUrl") as string;
    const clothName = formData.get("clothName") as string;

    console.log("Datos recibidos:");
    console.log({
      clothId,
      clothImageUrl,
      clothName,
      fileName: file?.name,
    });

    // Validar imagen
    if (!file) {
      return NextResponse.json(
        { error: "No se encontró imagen" },
        { status: 400 }
      );
    }

    // =========================
    // 1. SUBIR FOTO DEL PERRO
    // =========================

    const uploadForm = new FormData();

    uploadForm.append("file", file);
    uploadForm.append("crop", "false");

    const uploadRes = await fetch(
      "https://api.genlook.app/tryon/v1/images/upload",
      {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
        },
        body: uploadForm,
      }
    );

    const uploadData = await uploadRes.json();

    console.log("UPLOAD RESPONSE:");
    console.log(uploadData);

    if (!uploadRes.ok) {
      return NextResponse.json(
        {
          error: "Error subiendo imagen",
          details: uploadData,
        },
        { status: 500 }
      );
    }

    // Obtener imageId
    const imageId =
      uploadData.imageId ||
      uploadData.id ||
      uploadData.customerImageId;

    console.log("IMAGE ID:", imageId);

    if (!imageId) {
      return NextResponse.json(
        {
          error: "No se obtuvo imageId",
          details: uploadData,
        },
        { status: 500 }
      );
    }

    // =========================
    // 2. GENERAR TRY-ON
    // =========================

   const tryOnBody = {
  product: {
    externalId: clothId,
    title: clothName,
    description: clothName,
    images: [
      {
        url: clothImageUrl,
      },
    ],
  },

 customer: {
  id: uploadData.imageId,
}
};

    console.log("TRYON BODY:");
    console.log(JSON.stringify(tryOnBody, null, 2));

    const tryOnRes = await fetch(
      "https://api.genlook.app/tryon/v1/try-on",
      {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tryOnBody),
      }
    );

    const tryOnData = await tryOnRes.json();

    console.log("TRYON RESPONSE:");
    console.log(tryOnData);

    if (!tryOnRes.ok) {
      return NextResponse.json(
        {
          error: "Error generando try-on",
          details: tryOnData,
        },
        { status: 500 }
      );
    }

    const generationId =
      tryOnData.generationId ||
      tryOnData.id;

    console.log("GENERATION ID:", generationId);

    if (!generationId) {
      return NextResponse.json(
        {
          error: "No se obtuvo generationId",
          details: tryOnData,
        },
        { status: 500 }
      );
    }

    // =========================
    // 3. ESPERAR RESULTADO
    // =========================

    for (let i = 0; i < 20; i++) {
      console.log(`Polling intento ${i + 1}`);

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      const resultRes = await fetch(
        `https://api.genlook.app/tryon/v1/generations/${generationId}`,
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );

      const resultData = await resultRes.json();

      console.log("RESULT:");
      console.log(resultData);

      // COMPLETADO
      if (resultData.status === "COMPLETED") {
        return NextResponse.json({
          image:
            resultData.resultImageUrl ||
            resultData.imageUrl,
        });
      }

      // FALLÓ
      if (resultData.status === "FAILED") {
        return NextResponse.json(
          {
            error: "La generación falló",
            details: resultData,
          },
          { status: 500 }
        );
      }
    }

    // Timeout
    return NextResponse.json(
      { error: "Tiempo agotado" },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("ERROR GENERAL:");
    console.error(error);

    return NextResponse.json(
      {
        error: "Error interno",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}