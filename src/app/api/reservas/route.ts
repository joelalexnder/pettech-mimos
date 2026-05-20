// src/app/api/reservas/route.ts
// POST /api/reservas → guarda la reserva y devuelve el link de WhatsApp

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/nose";

// Número de WhatsApp de Mimos Pet Club (sin + ni espacios)
const WHATSAPP_NUMBER =
  process.env.WHATSAPP_NUMBER || "51999999999";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      productoIds,
      nombrePerro,
      propietario,
    }: {
      productoIds: number[];
      nombrePerro?: string;
      propietario?: string;
    } = body;

    // Validar productos
    if (!productoIds || productoIds.length === 0) {
      return NextResponse.json(
        {
          error: "Debes seleccionar al menos un producto.",
        },
        {
          status: 400,
        }
      );
    }

    // Buscar productos disponibles
    const productos = await prisma.producto.findMany({
      where: {
        id: {
          in: productoIds,
        },
        disponible: true,
        stock: {
          gt: 0,
        },
      },
    });

    // Validar existencia
    if (productos.length === 0) {
      return NextResponse.json(
        {
          error: "Los productos seleccionados no están disponibles.",
        },
        {
          status: 400,
        }
      );
    }

    // Crear reserva
    const reserva = await prisma.reserva.create({
      data: {
        nombrePerro: nombrePerro || null,
        propietario: propietario || null,

        items: {
          create: productos.map((p: any) => ({
            productoId: p.id,
            cantidad: 1,
          })),
        },
      },

      include: {
        items: {
          include: {
            producto: true,
          },
        },
      },
    });

    // Crear lista de productos
    const lineasProductos = productos
      .map(
        (p: any) =>
          `• ${p.nombre} — S/ ${Number(p.precio).toFixed(2)}`
      )
      .join("\n");

    // Calcular total
    const totalEstimado = productos.reduce(
      (sum: number, p: any) => sum + Number(p.precio),
      0
    );

    // Mensaje WhatsApp
    const mensaje =
      `🐾 *Reserva Mimos Pet Club* 🐾\n\n` +
      `${nombrePerro ? `🐶 Paciente: *${nombrePerro}*\n` : ""}` +
      `${propietario ? `👤 Propietario: *${propietario}*\n` : ""}` +
      `\n📦 *Productos reservados:*\n${lineasProductos}\n\n` +
      `💰 *Total estimado: S/ ${totalEstimado.toFixed(2)}*\n\n` +
      `📋 ID de reserva: *${reserva.id}*\n\n` +
      `Por favor confirmar disponibilidad y coordinar el recojo o delivery. ¡Gracias! 🐾`;

    // URL WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      mensaje
    )}`;

    // Respuesta
    return NextResponse.json({
      reservaId: reserva.id,

      whatsappUrl,

      productos: productos.map((p: any) => ({
        id: p.id,
        nombre: p.nombre,
        precio: p.precio,
      })),
    });
  } catch (err) {
    console.error("[API /reservas POST]", err);

    return NextResponse.json(
      {
        error: "Error al crear la reserva.",
      },
      {
        status: 500,
      }
    );
  }
}