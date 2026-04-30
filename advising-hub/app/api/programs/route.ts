import { getProgramRecords } from "@/lib/program-records";

export async function GET() {
  const { programs, source } = await getProgramRecords("programs API");

  return Response.json({ programs, source });
}
