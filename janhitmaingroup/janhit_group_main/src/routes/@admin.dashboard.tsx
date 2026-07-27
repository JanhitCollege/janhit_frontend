import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/admin/pages/Dashboard";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/dashboard")({
  component: DashboardRouteComponent,
  head: () => ({
    meta: [{ title: "Admin Dashboard — Janhit Group of Institutions" }],
  }),
});

function DashboardRouteComponent() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}
