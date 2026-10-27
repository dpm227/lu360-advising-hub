import { requireAdvisor } from "@/lib/advisor-access";

export default async function AdvisorPage() {
  await requireAdvisor();

  return null;
}
