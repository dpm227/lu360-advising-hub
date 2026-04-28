import { programs } from "@/lib/program-data";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const prisma = await getPrisma();

  if (!prisma) {
    return Response.json({ programs, source: "seed" });
  }

  try {
    const dbPrograms = await prisma.program.findMany({
      orderBy: [{ featured: "desc" }, { title: "asc" }],
      include: {
        eligibleClassYears: { include: { classYear: true } },
        colleges: { include: { college: true } },
        opportunityTypes: { include: { opportunityType: true } },
        sdgTags: { include: { sdgTag: true } },
        requirements: true,
      },
    });

    return Response.json({ programs: dbPrograms, source: "database" });
  } catch {
    return Response.json({ programs, source: "seed" });
  }
}
