import { AppShell } from "@/components/AppShell";
import { ChatSkeleton } from "@/components/PageSkeletons";

export default function Loading() {
  return (
    <AppShell active="chat" title="Advisor Chat" hidePageHeader>
      <ChatSkeleton />
    </AppShell>
  );
}
