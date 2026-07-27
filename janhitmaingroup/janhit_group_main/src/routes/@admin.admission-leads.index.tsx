import { createFileRoute } from "@tanstack/react-router";
import { AdmissionLeadListing } from "@/admin/pages/AdmissionLeadListing";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

export const Route = createFileRoute("/@admin/admission-leads/")({
  component: AdmissionLeadsListingRouteComponent,
  head: () => ({
    meta: [{ title: "Admission Leads — Janhit Group of Institutions" }],
  }),
});

function AdmissionLeadsListingRouteComponent() {
  return (
    <ProtectedRoute>
      <AdmissionLeadListing />
    </ProtectedRoute>
  );
}
