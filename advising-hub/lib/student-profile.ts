import type { User } from "@prisma/client";
import { prisma } from "@/lib/prisma-client";

type UserIdentity = Pick<User, "id" | "email" | "name">;

function splitName(name?: string | null) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  return {
    firstName: parts[0] ?? null,
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : null,
  };
}

export async function getOrCreateLehighOrganization() {
  return prisma.organization.upsert({
    where: { domain: "lehigh.edu" },
    update: {},
    create: {
      name: "Lehigh University",
      domain: "lehigh.edu",
      orgSlug: "lehigh_university",
    },
  });
}

export async function ensureStudentForUser(user: UserIdentity) {
  const organization = await getOrCreateLehighOrganization();
  const { firstName, lastName } = splitName(user.name);

  try {
    return await prisma.student.upsert({
      where: { userId: user.id },
      update: {
        email: user.email,
        firstName,
        lastName,
        organizationId: organization.id,
      },
      create: {
        userId: user.id,
        organizationId: organization.id,
        email: user.email,
        firstName,
        lastName,
      },
    });
  } catch {
    const existingByEmail = await prisma.student.findUnique({
      where: { email: user.email },
    });

    if (existingByEmail) {
      return prisma.student.update({
        where: { id: existingByEmail.id },
        data: {
          userId: user.id,
          organizationId: organization.id,
          firstName: existingByEmail.firstName ?? firstName,
          lastName: existingByEmail.lastName ?? lastName,
        },
      });
    }

    throw new Error(`Unable to create student profile for ${user.email}`);
  }
}

