import { createFileRoute } from "@tanstack/react-router";
import { EventListing } from "@/admin/pages/EventListing";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/events/")({
  component: EventsListingRouteComponent,
  head: () => ({
    meta: [{ title: "Event Management — Janhit Group of Institutions" }],
  }),
});

function EventsListingRouteComponent() {
  return (
    <ProtectedRoute>
      <EventListing />
    </ProtectedRoute>
  );
}
