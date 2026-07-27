import { createFileRoute } from "@tanstack/react-router";
import { GalleryListing } from "@/admin/pages/GalleryListing";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/gallery/")({
  component: GalleryListingRouteComponent,
  head: () => ({
    meta: [{ title: "Gallery Management — Janhit Group of Institutions" }],
  }),
});

function GalleryListingRouteComponent() {
  return (
    <ProtectedRoute>
      <GalleryListing />
    </ProtectedRoute>
  );
}
