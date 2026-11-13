import { requireAdvisor } from "@/lib/advisor-access";

export default async function AdvisorPage() {
  await requireAdvisor();

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Advisor Portal</h1>
      <p className="mt-4 text-gray-600">
        You are authenticated and authorized to access the advisor portal.
      </p>
    </main>
  );
}