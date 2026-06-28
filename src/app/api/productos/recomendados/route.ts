// app/api/productos/recomendados/route.ts
export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/nose";
import type { Producto } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoria = searchParams.get("categoria") || "accesorio";
  const limit = parseInt(searchParams.get("limit") || "4", 10);

  try {
    const productos = await prisma.producto.findMany({
      where: {
        disponible: true,
        stock: { gt: 0 },
        OR: [
          { categoria: "accesorio" },
          { urgencia: "alta" },
        ],
      },
      orderBy: [
        { urgencia: "asc" },
        { stock: "desc" },
      ],
      take: limit * 3,
    });

    const urgOrder: Record<string, number> = { alta: 0, media: 1, baja: 2 };
    const catOrder: Record<string, number> = { accesorio: 0, alimento: 1, medicamento: 2 };

    const ordenados = productos
      .sort((a: Producto, b: Producto) => {
        if (a.categoria === categoria && b.categoria !== categoria) return -1;
        if (b.categoria === categoria && a.categoria !== categoria) return 1;
        return (
          (urgOrder[a.urgencia] ?? 9) - (urgOrder[b.urgencia] ?? 9) ||
          (catOrder[a.categoria] ?? 9) - (catOrder[b.categoria] ?? 9)
        );
      })
      .slice(0, limit);

    return NextResponse.json({ productos: ordenados });

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[recomendados] Error Prisma:", msg);
    return NextResponse.json(
      { error: "Error al obtener productos", detalle: msg, productos: [] },
      { status: 500 }
    );
  }
}