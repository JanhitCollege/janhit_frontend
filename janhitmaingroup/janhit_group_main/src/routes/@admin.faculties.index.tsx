import { createFileRoute } from "@tanstack/react-router";
import { FacultyListing } from "@/admin/pages/FacultyListing";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/faculties/")({
  component: FacultyListingRouteComponent,
  head: () => ({
    meta: [{ title: "Faculty Management — Janhit Group of Institutions" }],
  }),
});

function FacultyListingRouteComponent() {
  return (
    <ProtectedRoute>
      <FacultyListing />
    </ProtectedRoute>
  );
}
