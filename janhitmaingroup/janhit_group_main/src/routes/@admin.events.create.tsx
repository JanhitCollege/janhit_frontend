import { createFileRoute } from "@tanstack/react-router";
import { EventCreate } from "@/admin/pages/EventCreate";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/events/create")({
  component: EventCreateRouteComponent,
  head: () => ({
    meta: [{ title: "Create Event — Janhit Group of Institutions" }],
  }),
});

function EventCreateRouteComponent() {
  return (
    <ProtectedRoute>
      <EventCreate />
    </ProtectedRoute>
  );
}
