import { AppShell } from "@/components/AppShell";
import { DiscoverSkeleton } from "@/components/PageSkeletons";

export default function Loading() {
  return (
    <AppShell active="discover" title="Discover">
      <DiscoverSkeleton />
    </AppShell>
  );
}
