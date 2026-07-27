import { createFileRoute } from "@tanstack/react-router";
import { CampusListing } from "@/admin/pages/CampusListing";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/campuses/")({
  component: CampusesListingRouteComponent,
  head: () => ({
    meta: [{ title: "Campus Management — Janhit Group of Institutions" }],
  }),
});

function CampusesListingRouteComponent() {
  return (
    <ProtectedRoute>
      <CampusListing />
    </ProtectedRoute>
  );
}
