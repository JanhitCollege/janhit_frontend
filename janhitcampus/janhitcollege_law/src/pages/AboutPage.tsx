import { AboutInstitution } from "@/components/about/AboutInstitution";
import { VisionMission } from "@/components/about/VisionMission";
import { OrganogramManagement } from "@/components/about/OrganogramManagement";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AffiliationsApprovals } from "@/components/about/AffiliationsApprovals";
import { AboutInfrastructure } from "@/components/about/AboutInfrastructure";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. About the Institution */}
      <AboutInstitution />

      {/* 2. Vision and Mission */}
      <VisionMission />

      {/* 3. Management body / Organogram */}
      <OrganogramManagement />

      {/* 4 & 5. Chairman’s Message & Principal’s Message */}
      <AboutLeadership />

      {/* 6. Affiliations & Approvals (BCI and University) */}
      <AffiliationsApprovals />

      {/* 7. Infrastructure (All 11 Facilities) */}
      <AboutInfrastructure />
    </div>
  );
}
