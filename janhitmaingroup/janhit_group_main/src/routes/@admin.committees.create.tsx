import { createFileRoute } from "@tanstack/react-router";
import { CommitteeCreate } from "@/admin/pages/CommitteeCreate";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/committees/create")({
  component: CommitteeCreateRouteComponent,
  head: () => ({
    meta: [{ title: "Create Committee — Janhit Group of Institutions" }],
  }),
});

function CommitteeCreateRouteComponent() {
  return (
    <ProtectedRoute>
      <CommitteeCreate />
    </ProtectedRoute>
  );
}
