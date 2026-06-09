/*
  Warnings:

  - Changed the type of `categoria` on the `Producto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('medicamento', 'alimento', 'accesorio', 'ropa');

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "categoria",
ADD COLUMN     "categoria" "Categoria" NOT NULL;

-- DropEnum
DROP TYPE "CategoriaProducto";

-- CreateIndex
CREATE INDEX "Producto_categoria_idx" ON "Producto"("categoria");
