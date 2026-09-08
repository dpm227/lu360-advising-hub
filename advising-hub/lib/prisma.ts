import type { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  lu360Prisma?: PrismaClient;
};

export async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    // Keep imports visible to Next.js so serverless builds include the database dependencies.
    const { PrismaClient } = await import("@prisma/client");
    const { PrismaPg } = await import("@prisma/adapter-pg");
    const adapter = new PrismaPg(process.env.DATABASE_URL);

    globalForPrisma.lu360Prisma ??= new PrismaClient({ adapter });
    return globalForPrisma.lu360Prisma;
  } catch (error) {
    console.warn(
      "[LU360_DATABASE_UNAVAILABLE] Prisma client could not be initialized.",
      error,
    );
    return null;
  }
}
