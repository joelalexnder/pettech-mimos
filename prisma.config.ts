import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx ts-node prisma/seed.ts", // ← agrega esto
  },
  datasource: {
    url: process.env["DIRECT_URL"]!,
  },
});