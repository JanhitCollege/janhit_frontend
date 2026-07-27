import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, FadeIn } from "@/components/Section";
import { useState } from "react";
import {
  FileText,
  Download,
  ShieldCheck,
  Users,
  Calendar,
  Award,
  Scale,
  HelpCircle,
  ChevronRight,
  Clipboard,
} from "lucide-react";

export const Route = createFileRoute("/disclosures")({
  head: () => ({
    meta: [
      { title: "Public Disclosures & Committees — Janhit Group" },
      {
        name: "description",
        content:
          "Access statutory disclosures, BCI/NCTE affiliation documents, code of conduct, syllabus, faculty lists, anti-ragging committees, and GRC members.",
      },
    ],
  }),
  component: DisclosuresPage,
});

const disclosures = [
  {
    label: "Affiliation Certificates (B.A.LL.B., LLB and LL.M.)",
    file: "Affiliation_Law_CCS_University.pdf",
  },
  { label: "College Prospectus & Guidelines 2026-27", file: "College_Prospectus_2026.pdf" },
  {
    label: "Courses / Programs Approvals (BCI, NCTE, AICTE)",
    file: "Program_Regulatory_Approvals.pdf",
  },
  {
    label: "Detailed Subject Syllabus (CCS University)",
    file: "Syllabus_CCS_University_Law_MGMT.pdf",
  },
  { label: "Code of Conduct (Students, Teachers & Staff)", file: "Code_of_Conduct_Janhit.pdf" },
  { label: "Core Faculty List & Academic Qualifications", file: "Faculty_List_Qualifications.pdf" },
  { label: "Alumni Association Registration & Bylaws", file: "Alumni_Association_Bylaws.pdf" },
  {
    label: "RTI Act Statutory Disclosures (Right to Information)",
    file: "RTI_Act_Statutory_Declaration.pdf",
  },
  { label: "Academic Calendar (Odd & Even Semesters 2026)", file: "Academic_Calendar_2026.pdf" },
  { label: "Management Committee Members & Governance", file: "Management_Committee_List.pdf" },
  { label: "Legal Aid Clinic Committee Roster", file: "Legal_Aid_Clinic_Members.pdf" },
];

const committees = [
  {
    name: "IQAC Committee",
    objective:
      "Coordinating quality parameters, planning curriculum enhancements, and designing annual AQAR reports.",
    head: "Prof. S. C. Sharma (Dean Academics)",
    members: ["Dr. Anjali Verma", "Dr. P. K. Singh", "Mr. Satish Chandra"],
  },
  {
    name: "Anti-Ragging Committee",
    objective:
      "Ensuring a 100% ragging-free campus. Conducting surprise checks and addressing student discipline.",
    head: "Dr. Arvind Kumar (Proctor)",
    members: ["Mr. Amit Bansal", "Ms. Ritu Rani", "Representative of Local Police Station"],
  },
  {
    name: "Grievance Redressal Committee (GRC)",
    objective:
      "Addressing student complaints, resource needs, examination concerns, and other administrative grievances.",
    head: "Dr. N. K. Gupta (Director)",
    members: ["Prof. S. C. Sharma", "Dr. Anjali Verma", "Mr. Rajeev Kumar"],
  },
  {
    name: "Internal Complaint Committee (ICC) / POSH",
    objective:
      "Ensuring gender equity, prevention of sexual harassment, and addressing safety matters for female students & staff.",
    head: "Dr. Anjali Verma (Chairperson)",
    members: ["Ms. Ritu Rani", "Ms. Neha Sharma", "Mrs. Savita Devi (NGO Nominee)"],
  },
  {
    name: "Sport & Cultural Committee",
    objective:
      "Organizing athletic sports meets, coordinating annual cultural festivals, and selecting teams for tournaments.",
    head: "Mr. P. K. Saxena (Physical Director)",
    members: ["Mr. Amit Bansal", "Ms. Ritu Rani", "Student Cultural Secretary"],
  },
  {
    name: "Library Committee",
    objective:
      "Reviewing text editions, processing research journals purchases, and upgrading digital library networks.",
    head: "Mrs. Manju Bala (Librarian)",
    members: ["Dr. P. K. Singh", "Dr. Anjali Verma", "Mr. Rajeev Kumar"],
  },
  {
    name: "Proctorial Board",
    objective:
      "Supervising campus discipline, issuing ID cards, enforcing dress code, and managing safety regulations.",
    head: "Dr. Arvind Kumar (Chief Proctor)",
    members: ["Mr. Amit Bansal", "Dr. P. K. Singh", "Security Supervisor"],
  },
  {
    name: "Equal Opportunity Cell",
    objective:
      "Ensuring equal learning assistance, coordinating scholarships and fee relaxation rules for SC/ST and OBC students.",
    head: "Mr. Rajeev Kumar (Registrar)",
    members: ["Dr. P. K. Singh", "Mr. Amit Bansal", "Mrs. Savita Devi"],
  },
];

function DisclosuresPage() {
  const [selectedCommittee, setSelectedCommittee] = useState<number>(0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Header */}
      <section className="relative py-24 bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="container-tight relative">
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-gold border border-gold/40">
              Statutory Disclosures
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold max-w-3xl leading-tight">
              Public Disclosures <span className="text-gradient-gold">& Committees</span>
            </h1>
            <p className="mt-6 text-lg opacity-90 max-w-2xl">
              Mandatory university and government disclosures, affiliation certificates, code of
              conduct declarations, and student welfare committee compositions.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Navigation Quick Links */}
      <section className="py-12 bg-secondary/30">
        <div className="container-tight">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection("disclosures")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-card border border-border hover:border-gold/30 hover:bg-gold/5 text-sm font-semibold text-foreground hover:text-gold transition duration-300 shadow-sm"
            >
              <Clipboard className="size-4 text-gold" /> Public Disclosures
            </button>
            <button
              onClick={() => scrollToSection("committees")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-card border border-border hover:border-gold/30 hover:bg-gold/5 text-sm font-semibold text-foreground hover:text-gold transition duration-300 shadow-sm"
            >
              <Users className="size-4 text-gold" /> Student & Staff Committees
            </button>
          </div>
        </div>
      </section>

      {/* Public Disclosures List Section */}
      <section id="disclosures" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Mandatory Reports"
            title="Public Disclosures"
            subtitle="View or download statutory certificates, syllabus guides, code of conduct, and academic calendars."
          />

          <div className="max-w-4xl mx-auto mt-12 border border-border bg-card rounded-3xl shadow-sm overflow-hidden divide-y divide-border/60">
            {disclosures.map((disc, idx) => (
              <div
                key={idx}
                className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-secondary/20 transition duration-150"
              >
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-gold/10 text-gold grid place-items-center shrink-0 mt-0.5">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-foreground leading-snug">
                      {disc.label}
                    </h3>
                    <span className="text-[10px] font-mono text-muted-foreground block mt-1">
                      {disc.file}
                    </span>
                  </div>
                </div>

                <button className="self-start sm:self-center inline-flex items-center gap-1 text-xs text-gold font-bold hover:underline shrink-0 bg-secondary/50 px-3 py-1.5 rounded-lg border border-border">
                  Download PDF <Download className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committees Section */}
      <section id="committees" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Grievance & Welfare"
            title="College Committees"
            subtitle="Statutory cells established to monitor anti-ragging, GRC, library codes, POSH, and proctorial rules."
          />

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
            {/* Committee Navigation tabs */}
            <div className="lg:col-span-1 space-y-2">
              {committees.map((com, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCommittee(idx)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs md:text-sm font-semibold flex items-center justify-between transition-all ${
                    selectedCommittee === idx
                      ? "bg-gradient-gold text-gold-foreground border-transparent shadow-gold scale-[1.01]"
                      : "bg-card text-foreground border-border hover:bg-accent"
                  }`}
                >
                  <span>{com.name}</span>
                  <ChevronRight className="size-4 shrink-0" />
                </button>
              ))}
            </div>

            {/* Committee details view card */}
            <div className="lg:col-span-2">
              <FadeIn key={selectedCommittee}>
                <div className="p-8 md:p-12 rounded-3xl border border-border bg-card shadow-sm h-full flex flex-col justify-between hover:border-gold/20 transition duration-300">
                  <div>
                    <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-border/80">
                      <div className="size-12 rounded-xl bg-gold/10 text-gold grid place-items-center">
                        <ShieldCheck className="size-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">
                          {committees[selectedCommittee].name}
                        </h3>
                        <span className="text-xs text-muted-foreground font-semibold">
                          Statutory Committee Cell
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-bold text-gold mb-2">
                          Objective / Scope
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {committees[selectedCommittee].objective}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-border/60">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-bold text-gold mb-2">
                            Committee Head
                          </h4>
                          <span className="text-sm font-bold text-foreground block">
                            {committees[selectedCommittee].head}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">
                            Chairperson / Proctor
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-bold text-gold mb-2">
                            Key Members
                          </h4>
                          <ul className="space-y-1">
                            {committees[selectedCommittee].members.map((member, mIdx) => (
                              <li
                                key={mIdx}
                                className="text-xs md:text-sm text-muted-foreground flex items-center gap-1.5"
                              >
                                <span className="size-1.5 rounded-full bg-gold shrink-0" /> {member}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                    <span>CCS University / Government Mandated Cell</span>
                    <button className="text-gold font-bold hover:underline inline-flex items-center gap-1">
                      PDF Guidelines <Download className="size-3.5" />
                    </button>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
