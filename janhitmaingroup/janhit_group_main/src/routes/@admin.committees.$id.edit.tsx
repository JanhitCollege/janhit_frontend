import { createFileRoute } from "@tanstack/react-router";
import { CommitteeEdit } from "@/admin/pages/CommitteeEdit";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/committees/$id/edit")({
  component: CommitteeEditRouteComponent,
  head: () => ({
    meta: [{ title: "Edit Committee — Janhit Group of Institutions" }],
  }),
});

function CommitteeEditRouteComponent() {
  const { id } = Route.useParams();
  return (
    <ProtectedRoute>
      <CommitteeEdit id={id} />
    </ProtectedRoute>
  );
}
