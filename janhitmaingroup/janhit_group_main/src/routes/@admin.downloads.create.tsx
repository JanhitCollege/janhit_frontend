import { createFileRoute } from "@tanstack/react-router";
import { DownloadCreate } from "@/admin/pages/DownloadCreate";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/downloads/create")({
  component: DownloadCreateRouteComponent,
  head: () => ({
    meta: [{ title: "Add Download Document — Janhit Group of Institutions" }],
  }),
});

function DownloadCreateRouteComponent() {
  return (
    <ProtectedRoute>
      <DownloadCreate />
    </ProtectedRoute>
  );
}
