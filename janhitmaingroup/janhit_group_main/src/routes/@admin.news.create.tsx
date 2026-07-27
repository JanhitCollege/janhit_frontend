import { createFileRoute } from "@tanstack/react-router";
import { NewsNoticeCreate } from "@/admin/pages/NewsNoticeCreate";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/news/create")({
  component: NewsNoticeCreateRouteComponent,
  head: () => ({
    meta: [{ title: "Create Announcement — Janhit Group of Institutions" }],
  }),
});

function NewsNoticeCreateRouteComponent() {
  return (
    <ProtectedRoute>
      <NewsNoticeCreate />
    </ProtectedRoute>
  );
}
