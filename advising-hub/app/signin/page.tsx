import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { authOptions } from "@/lib/auth";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/profile");

  const { callbackUrl } = await searchParams;

  return (
    <AppShell active="profile" title="Sign In">
      <section className="signin-panel">
        <div>
          <p className="eyebrow">Google OAuth</p>
          <h2>Sign in to LU360 AI Chat Assistant</h2>
          <p>
            Use your Google account to save profile details, chat history, and
            program recommendations.
          </p>
        </div>
        <GoogleSignInButton callbackUrl={callbackUrl || "/profile"} />
      </section>
    </AppShell>
  );
}
