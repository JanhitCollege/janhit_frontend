import { createFileRoute } from "@tanstack/react-router";
import { EventEdit } from "@/admin/pages/EventEdit";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/events/$id/edit")({
  component: EventEditRouteComponent,
  head: () => ({
    meta: [{ title: "Edit Event — Janhit Group of Institutions" }],
  }),
});

function EventEditRouteComponent() {
  const { id } = Route.useParams();
  return (
    <ProtectedRoute>
      <EventEdit id={id} />
    </ProtectedRoute>
  );
}
