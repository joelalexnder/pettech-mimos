// src/app/api/productos/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/nose";

type CategoriaProducto =
  | "medicamento"
  | "alimento"
  | "accesorio";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // múltiples categorías
    const categorias = searchParams.getAll("categoria");

    // disponibilidad
    const soloDisponibles =
      searchParams.get("disponible") !== "false";

    // límite
    const limit = parseInt(
      searchParams.get("limit") || "20"
    );

    const productos = await prisma.producto.findMany({
      where: {
        ...(categorias.length > 0
          ? {
              categoria: {
                in: categorias as CategoriaProducto[],
              },
            }
          : {}),

        ...(soloDisponibles
          ? {
              disponible: true,

              stock: {
                gt: 0,
              },
            }
          : {}),
      },

      orderBy: [
        {
          urgencia: "asc",
        },
        {
          nombre: "asc",
        },
      ],

      take: limit,

      select: {
        id: true,
        nombre: true,
        descripcion: true,
        categoria: true,
        precio: true,
        imagen: true,
        stock: true,
        urgencia: true,
      },
    });

    return NextResponse.json({
      productos,
    });
  } catch (err) {
    console.error("[API /productos GET]", err);

    return NextResponse.json(
      {
        error: "Error al obtener productos.",
      },
      {
        status: 500,
      }
    );
  }
}