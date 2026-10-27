import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma-client";
import { ensureStudentForUser } from "@/lib/student-profile";

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
    // The sign-in event receives the persisted user, including on first sign-in.
    async signIn({ user }) {
      if (!user.email) {
        throw new Error("An email address is required to set up a student profile.");
      }

      await ensureStudentForUser({
        id: user.id,
        email: user.email,
        name: user.name ?? null,
      });
    },
  },
};
