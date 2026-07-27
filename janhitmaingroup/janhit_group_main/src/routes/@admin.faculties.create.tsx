import { createFileRoute } from "@tanstack/react-router";
import { FacultyCreate } from "@/admin/pages/FacultyCreate";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/faculties/create")({
  component: FacultyCreateRouteComponent,
  head: () => ({
    meta: [{ title: "Create Faculty — Janhit Group of Institutions" }],
  }),
});

function FacultyCreateRouteComponent() {
  return (
    <ProtectedRoute>
      <FacultyCreate />
    </ProtectedRoute>
  );
}
