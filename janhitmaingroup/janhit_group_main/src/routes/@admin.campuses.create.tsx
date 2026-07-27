import { createFileRoute } from "@tanstack/react-router";
import { CampusCreate } from "@/admin/pages/CampusCreate";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/campuses/create")({
  component: CampusCreateRouteComponent,
  head: () => ({
    meta: [{ title: "Create Campus — Janhit Group of Institutions" }],
  }),
});

function CampusCreateRouteComponent() {
  return (
    <ProtectedRoute>
      <CampusCreate />
    </ProtectedRoute>
  );
}
