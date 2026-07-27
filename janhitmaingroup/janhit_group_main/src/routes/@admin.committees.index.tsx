import { createFileRoute } from "@tanstack/react-router";
import { CommitteeListing } from "@/admin/pages/CommitteeListing";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/committees/")({
  component: CommitteesListingRouteComponent,
  head: () => ({
    meta: [{ title: "Committees Management — Janhit Group of Institutions" }],
  }),
});

function CommitteesListingRouteComponent() {
  return (
    <ProtectedRoute>
      <CommitteeListing />
    </ProtectedRoute>
  );
}
