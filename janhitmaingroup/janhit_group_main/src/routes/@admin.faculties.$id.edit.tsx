import { createFileRoute } from "@tanstack/react-router";
import { FacultyEdit } from "@/admin/pages/FacultyEdit";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/faculties/$id/edit")({
  component: FacultyEditRouteComponent,
  head: () => ({
    meta: [{ title: "Edit Faculty Profile — Janhit Group of Institutions" }],
  }),
});

function FacultyEditRouteComponent() {
  const { id } = Route.useParams();
  return (
    <ProtectedRoute>
      <FacultyEdit id={id} />
    </ProtectedRoute>
  );
}
