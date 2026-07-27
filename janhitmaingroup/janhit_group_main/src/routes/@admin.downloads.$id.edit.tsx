import { createFileRoute } from "@tanstack/react-router";
import { DownloadEdit } from "@/admin/pages/DownloadEdit";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/downloads/$id/edit")({
  component: DownloadEditRouteComponent,
  head: () => ({
    meta: [{ title: "Edit Download Document — Janhit Group of Institutions" }],
  }),
});

function DownloadEditRouteComponent() {
  const { id } = Route.useParams();
  return (
    <ProtectedRoute>
      <DownloadEdit id={id} />
    </ProtectedRoute>
  );
}
