import { createFileRoute } from "@tanstack/react-router";
import { CommitteeDetails } from "@/admin/pages/CommitteeDetails";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

type CommitteeSearch = {
  tab?: "overview" | "members" | "documents";
};

export const Route = createFileRoute("/@admin/committees/$id/")({
  validateSearch: (search: Record<string, unknown>): CommitteeSearch => {
    return {
      tab: (search.tab as "overview" | "members" | "documents") || undefined,
    };
  },
  component: CommitteeDetailsRouteComponent,
  head: () => ({
    meta: [{ title: "Committee Details — Janhit Group of Institutions" }],
  }),
});

function CommitteeDetailsRouteComponent() {
  const { id } = Route.useParams();
  const { tab } = Route.useSearch();
  return (
    <ProtectedRoute>
      <CommitteeDetails id={id} initialTab={tab} />
    </ProtectedRoute>
  );
}
