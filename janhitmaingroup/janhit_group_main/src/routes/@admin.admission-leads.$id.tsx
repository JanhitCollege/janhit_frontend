import { createFileRoute } from "@tanstack/react-router";
import { AdmissionLeadDetails } from "@/admin/pages/AdmissionLeadDetails";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/admission-leads/$id")({
  component: AdmissionLeadDetailsRouteComponent,
  head: () => ({
    meta: [{ title: "Admission Lead Details — Janhit Group of Institutions" }],
  }),
});

function AdmissionLeadDetailsRouteComponent() {
  const { id } = Route.useParams();
  return (
    <ProtectedRoute>
      <AdmissionLeadDetails id={id} />
    </ProtectedRoute>
  );
}
