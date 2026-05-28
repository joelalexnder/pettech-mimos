import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

export const prisma =
  globalForPrisma.prisma ??
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new PrismaClient({ adapter: adapter as any });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;