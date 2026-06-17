-- CreateEnum
CREATE TYPE "CategoriaProducto" AS ENUM ('medicamento', 'alimento', 'accesorio');

-- CreateEnum
CREATE TYPE "UrgenciaProducto" AS ENUM ('alta', 'media', 'baja');

-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('pendiente', 'confirmada', 'cancelada');

-- CreateTable
CREATE TABLE "Carnet" (
    "id" SERIAL NOT NULL,
    "carnetId" TEXT NOT NULL,
    "nombrePerro" TEXT NOT NULL,
    "raza" TEXT,
    "edad" TEXT,
    "propietario" TEXT,
    "peso" TEXT,
    "color" TEXT,
    "sintomas" JSONB,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carnet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "categoria" "CategoriaProducto" NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "imagen" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "urgencia" "UrgenciaProducto" NOT NULL DEFAULT 'media',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "nombrePerro" TEXT,
    "propietario" TEXT,
    "estado" "EstadoReserva" NOT NULL DEFAULT 'pendiente',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservaItem" (
    "id" SERIAL NOT NULL,
    "reservaId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ReservaItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Carnet_carnetId_key" ON "Carnet"("carnetId");

-- CreateIndex
CREATE INDEX "Carnet_nombrePerro_propietario_idx" ON "Carnet"("nombrePerro", "propietario");

-- CreateIndex
CREATE INDEX "Producto_categoria_idx" ON "Producto"("categoria");

-- CreateIndex
CREATE INDEX "Producto_disponible_idx" ON "Producto"("disponible");

-- AddForeignKey
ALTER TABLE "ReservaItem" ADD CONSTRAINT "ReservaItem_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaItem" ADD CONSTRAINT "ReservaItem_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
