type PrismaDelegate = {
  findMany: (args?: unknown) => Promise<unknown>;
  findUnique: (args: unknown) => Promise<{ id: string } | null>;
  create: (args: unknown) => Promise<{ id: string }>;
};

export type OptionalPrisma = {
  program: PrismaDelegate;
  chatThread: PrismaDelegate;
  chatMessage: PrismaDelegate;
  $connect: () => Promise<void>;
  $disconnect: () => Promise<void>;
};

type PrismaModule = {
  PrismaClient: new () => OptionalPrisma;
};

const globalForPrisma = globalThis as typeof globalThis & {
  lu360Prisma?: InstanceType<PrismaModule["PrismaClient"]>;
};

export async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const dynamicImport = new Function(
      "specifier",
      "return import(specifier)",
    ) as (specifier: string) => Promise<PrismaModule>;
    const { PrismaClient } = await dynamicImport("@prisma/client");

    globalForPrisma.lu360Prisma ??= new PrismaClient();
    return globalForPrisma.lu360Prisma as OptionalPrisma;
  } catch {
    return null;
  }
}
