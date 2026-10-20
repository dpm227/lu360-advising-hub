import type { User } from "@prisma/client";
import { prisma } from "@/lib/prisma-client";
import { getOrCreateLehighOrganization } from "@/lib/student-profile";

type UserIdentity = Pick<User, "id" | "email" | "name">;

function splitName(name?: string | null) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];

  return {
    firstName: parts[0] ?? null,
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : null,
  };
}

export async function ensureAdvisorForUser(user: UserIdentity) {
  const { firstName, lastName } = splitName(user.name);

  const existingAdvisor = await prisma.advisor.findFirst({
    where: {
      OR: [
        { userId: user.id },
        { email: { equals: user.email, mode: "insensitive" } },
      ],
    },
  });

  if (existingAdvisor) {
    return prisma.advisor.update({
      where: { id: existingAdvisor.id },
      data: {
        userId: user.id,
        email: user.email,
        firstName: existingAdvisor.firstName ?? firstName,
        lastName: existingAdvisor.lastName ?? lastName,
      },
    });
  }

  const organization = await getOrCreateLehighOrganization();

  return prisma.advisor.create({
    data: {
      userId: user.id,
      organizationId: organization.id,
      email: user.email,
      firstName,
      lastName,
    },
  });
}