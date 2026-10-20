import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma-client";
import { ensureStudentForUser } from "@/lib/student-profile";
import { ensureAdvisorForUser } from "@/lib/advisor-profile";

function isAdvisorEmail(email: string) {
  const advisorEmails = (process.env.ADVISOR_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return advisorEmails.includes(email.toLowerCase());
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "database",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role ?? "STUDENT";
      }

      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  events: {
    async signIn({ user }) {
      if (!user.email) {
        throw new Error("An email address is required to sign in.");
      }

      const identity = {
        id: user.id,
        email: user.email,
        name: user.name ?? null,
      };

      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      });

      if (existingUser?.role === "ADMIN") {
        return;
      }

      const seededAdvisor = await prisma.advisor.findFirst({
        where: {
          OR: [
            { userId: user.id },
            { email: { equals: user.email, mode: "insensitive" } },
          ],
        },
        select: { id: true },
      });

      if (
        isAdvisorEmail(user.email) ||
        seededAdvisor !== null ||
        existingUser?.role === "ADVISOR"
      ) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: "ADVISOR" },
        });

        await ensureAdvisorForUser(identity);
        return;
      }

      await ensureStudentForUser(identity);
    },
  },
};