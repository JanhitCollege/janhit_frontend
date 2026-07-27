import { createFileRoute } from "@tanstack/react-router";
import { NewsNoticeEdit } from "@/admin/pages/NewsNoticeEdit";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/news/$id/edit")({
  component: NewsNoticeEditRouteComponent,
  head: () => ({
    meta: [{ title: "Edit Announcement — Janhit Group of Institutions" }],
  }),
});

function NewsNoticeEditRouteComponent() {
  const { id } = Route.useParams();
  return (
    <ProtectedRoute>
      <NewsNoticeEdit id={id} />
    </ProtectedRoute>
  );
}
