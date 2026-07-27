import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/admin/pages/Profile";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/profile")({
  component: ProfileRouteComponent,
  head: () => ({
    meta: [{ title: "Admin Profile — Janhit Group of Institutions" }],
  }),
});

function ProfileRouteComponent() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
}
