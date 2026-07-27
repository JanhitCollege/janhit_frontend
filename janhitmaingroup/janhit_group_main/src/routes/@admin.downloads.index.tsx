import { createFileRoute } from "@tanstack/react-router";
import { DownloadListing } from "@/admin/pages/DownloadListing";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/downloads/")({
  component: DownloadsListingRouteComponent,
  head: () => ({
    meta: [{ title: "Download Management — Janhit Group of Institutions" }],
  }),
});

function DownloadsListingRouteComponent() {
  return (
    <ProtectedRoute>
      <DownloadListing />
    </ProtectedRoute>
  );
}
