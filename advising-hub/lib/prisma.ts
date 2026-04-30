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
  PrismaClient: new (options: { adapter: unknown }) => OptionalPrisma;
};

type PrismaPgModule = {
  PrismaPg: new (connectionString: string) => unknown;
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
    ) as <T>(specifier: string) => Promise<T>;
    const { PrismaClient } = await dynamicImport<PrismaModule>("@prisma/client");
    const { PrismaPg } = await dynamicImport<PrismaPgModule>("@prisma/adapter-pg");
    const adapter = new PrismaPg(process.env.DATABASE_URL);

    globalForPrisma.lu360Prisma ??= new PrismaClient({ adapter });
    return globalForPrisma.lu360Prisma as OptionalPrisma;
  } catch (error) {
    console.warn(
      "[LU360_DATABASE_UNAVAILABLE] Prisma client could not be initialized.",
      error,
    );
    return null;
  }
}
