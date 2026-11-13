import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";

export async function proxy(request: NextRequest) {
  const sessionToken =
    request.cookies.get("__Secure-next-auth.session-token")?.value ??
    request.cookies.get("next-auth.session-token")?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: {
      user: {
        select: { role: true },
      },
    },
  });

  if (!session || session.expires <= new Date()) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (
    session.user.role !== "ADVISOR" &&
    session.user.role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/advisor/:path*"],
};
