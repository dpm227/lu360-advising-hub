export async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const { prisma } = await import("@/lib/prisma-client");
    return prisma;
  } catch (error) {
    console.warn(
      "[LU360_DATABASE_UNAVAILABLE] Prisma client could not be initialized.",
      error,
    );
    return null;
  }
}
