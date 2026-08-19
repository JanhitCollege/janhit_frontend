import { createFileRoute } from "@tanstack/react-router";
import { NewsNoticeDetails } from "@/admin/pages/NewsNoticeDetails";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/news/$id/")({
  component: NewsNoticeDetailsRouteComponent,
  head: () => ({
    meta: [{ title: "Announcement Details — Janhit Group of Institutions" }],
  }),
});

function NewsNoticeDetailsRouteComponent() {
  const { id } = Route.useParams();
  return (
    <ProtectedRoute>
      <NewsNoticeDetails id={id} />
    </ProtectedRoute>
  );
}
