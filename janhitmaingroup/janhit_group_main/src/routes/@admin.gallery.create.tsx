import { createFileRoute } from "@tanstack/react-router";
import { GalleryCreate } from "@/admin/pages/GalleryCreate";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/gallery/create")({
  component: GalleryCreateRouteComponent,
  head: () => ({
    meta: [{ title: "Upload Gallery Media — Janhit Group of Institutions" }],
  }),
});

function GalleryCreateRouteComponent() {
  return (
    <ProtectedRoute>
      <GalleryCreate />
    </ProtectedRoute>
  );
}
