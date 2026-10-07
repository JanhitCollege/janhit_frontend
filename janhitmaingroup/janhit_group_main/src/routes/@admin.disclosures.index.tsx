import { createFileRoute } from "@tanstack/react-router";
import { DisclosureManagement } from "@/admin/pages/DisclosureManagement";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/disclosures/")({
  component: DisclosureManagementRouteComponent,
  head: () => ({
    meta: [{ title: "Public Disclosure Management — Janhit Group of Institutions" }],
  }),
});

function DisclosureManagementRouteComponent() {
  return (
    <ProtectedRoute>
      <DisclosureManagement />
    </ProtectedRoute>
  );
}
