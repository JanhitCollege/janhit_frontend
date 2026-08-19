import { createFileRoute } from "@tanstack/react-router";
import { FacultyDetails } from "@/admin/pages/FacultyDetails";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/faculties/$id/")({
  component: FacultyDetailsRouteComponent,
  head: () => ({
    meta: [{ title: "Faculty Details — Janhit Group of Institutions" }],
  }),
});

function FacultyDetailsRouteComponent() {
  const { id } = Route.useParams();
  return (
    <ProtectedRoute>
      <FacultyDetails id={id} />
    </ProtectedRoute>
  );
}
