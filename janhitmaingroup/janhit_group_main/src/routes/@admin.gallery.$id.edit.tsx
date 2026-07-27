import { createFileRoute } from "@tanstack/react-router";
import { GalleryEdit } from "@/admin/pages/GalleryEdit";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/gallery/$id/edit")({
  component: GalleryEditRouteComponent,
  head: () => ({
    meta: [{ title: "Edit Gallery Media — Janhit Group of Institutions" }],
  }),
});

function GalleryEditRouteComponent() {
  const { id } = Route.useParams();
  return (
    <ProtectedRoute>
      <GalleryEdit id={id} />
    </ProtectedRoute>
  );
}
