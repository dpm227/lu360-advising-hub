import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AuthLandingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/signin");
  }

  if (session.user.role === "ADVISOR" || session.user.role === "ADMIN") {
    redirect("/advisor");
  }

  redirect("/");
}
