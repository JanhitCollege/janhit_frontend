import { createFileRoute } from "@tanstack/react-router";
import { NewsNoticeListing } from "@/admin/pages/NewsNoticeListing";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/news/")({
  component: NewsNoticeListingRouteComponent,
  head: () => ({
    meta: [{ title: "News & Notices Management — Janhit Group of Institutions" }],
  }),
});

function NewsNoticeListingRouteComponent() {
  return (
    <ProtectedRoute>
      <NewsNoticeListing />
    </ProtectedRoute>
  );
}
