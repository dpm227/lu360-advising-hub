import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma-client";

export async function requireAdvisor() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/signin");
  }

  if (session.user.role !== "ADVISOR" && session.user.role !== "ADMIN") {
    redirect("/");
  }

  if (session.user.role === "ADMIN") {
    return {
      userId: session.user.id,
      role: "ADMIN" as const,
      advisor: null,
    };
  }

  const advisor = await prisma.advisor.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!advisor) {
    redirect("/");
  }

  return {
    userId: session.user.id,
    role: "ADVISOR" as const,
    advisor,
  };
}

export class AdvisorForbiddenError extends Error {
  readonly status = 403;

  constructor() {
    super("FORBIDDEN");
    this.name = "AdvisorForbiddenError";
  }
}

export async function assertAdvisorCanViewStudent(
  access: Awaited<ReturnType<typeof requireAdvisor>>,
  studentId: string,
) {
  if (access.role === "ADMIN") {
    return;
  }

  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
    select: {
      organizationId: true,
    },
  });

  if (
    !student ||
    student.organizationId !== access.advisor.organizationId
  ) {
    throw new AdvisorForbiddenError();
  }
}
