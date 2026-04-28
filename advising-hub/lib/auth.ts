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
    async signIn({ user }) {
      if (user.id && user.email) {
        try {
          await ensureStudentForUser({
            id: user.id,
            email: user.email,
            name: user.name ?? null,
          });
        } catch (error) {
          console.error("Failed to ensure student profile during sign-in", error);
        }
      }

      return true;
    },
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
    async createUser({ user }) {
      if (!user.email) {
        return;
      }

      try {
        await ensureStudentForUser({
          id: user.id,
          email: user.email,
          name: user.name ?? null,
        });
      } catch (error) {
        console.error("Failed to create student profile for new user", error);
      }
    },
  },
};
