import { createFileRoute } from "@tanstack/react-router";
import { CampusDetails } from "@/admin/pages/CampusDetails";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/campuses/$id/")({
  component: CampusDetailsRouteComponent,
  head: () => ({
    meta: [{ title: "Campus Details — Janhit Group of Institutions" }],
  }),
});

function CampusDetailsRouteComponent() {
  const { id } = Route.useParams();
  return (
    <ProtectedRoute>
      <CampusDetails id={id} />
    </ProtectedRoute>
  );
}
