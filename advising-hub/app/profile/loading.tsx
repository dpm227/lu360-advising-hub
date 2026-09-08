import { AppShell } from "@/components/AppShell";
import { ProfileSkeleton } from "@/components/PageSkeletons";

export default function Loading() {
  return (
    <AppShell active="profile" title="Profile">
      <ProfileSkeleton />
    </AppShell>
  );
}
