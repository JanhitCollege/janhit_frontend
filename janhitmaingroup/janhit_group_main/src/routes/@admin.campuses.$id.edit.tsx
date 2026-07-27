import { createFileRoute } from "@tanstack/react-router";
import { CampusEdit } from "@/admin/pages/CampusEdit";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/campuses/$id/edit")({
  component: CampusEditRouteComponent,
  head: () => ({
    meta: [{ title: "Edit Campus — Janhit Group of Institutions" }],
  }),
});

function CampusEditRouteComponent() {
  const { id } = Route.useParams();
  return (
    <ProtectedRoute>
      <CampusEdit id={id} />
    </ProtectedRoute>
  );
}
