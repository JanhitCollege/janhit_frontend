import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, FadeIn } from "@/components/Section";
import { useState } from "react";
import {
  FileText,
  Download,
  ShieldCheck,
  Clipboard,
  FileCheck,
  CheckCircle2,
  ChevronRight,
  Award,
} from "lucide-react";

export const Route = createFileRoute("/naac")({
  head: () => ({
    meta: [
      { title: "NAAC & IQAC — Janhit Group of Institutions" },
      {
        name: "description",
        content:
          "Explore Janhit Group's Quality Assurance reports, IQAC committee composition, AQAR submissions, SSR Criteria 1-7, and DVV clarifications.",
      },
    ],
  }),
  component: NaacPage,
});

const ssrCriteria = [
  {
    id: 1,
    title: "Criterion 1: Curricular Aspects",
    sub: "Curriculum planning, feedback systems, and academic flexibility.",
  },
  {
    id: 2,
    title: "Criterion 2: Teaching-Learning & Evaluation",
    sub: "Student enrolment, catering to diversity, evaluation processes.",
  },
  {
    id: 3,
    title: "Criterion 3: Research, Innovations & Extension",
    sub: "Research facilities, publications, and social extension works.",
  },
  {
    id: 4,
    title: "Criterion 4: Infrastructure & Learning Resources",
    sub: "Smart classrooms, libraries, moot court, labs, and IT services.",
  },
  {
    id: 5,
    title: "Criterion 5: Student Support & Progression",
    sub: "Scholarships, placement services, counseling, and alumni progression.",
  },
  {
    id: 6,
    title: "Criterion 6: Governance, Leadership & Management",
    sub: "Visionary governance, financial audits, professional training.",
  },
  {
    id: 7,
    title: "Criterion 7: Institutional Values & Best Practices",
    sub: "Green practices, gender equity, inclusivity, and distinctiveness.",
  },
];

function NaacPage() {
  const [activeTab, setActiveTab] = useState("iqac");

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
              Quality Assurance Cell
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold max-w-3xl leading-tight">
              NAAC <span className="text-gradient-gold">& IQAC Portal</span>
            </h1>
            <p className="mt-6 text-lg opacity-90 max-w-2xl">
              Internal Quality Assurance Cell (IQAC) documentation, Self Study Reports (SSR), IIQA
              submissions, DVV clarifications, and stakeholder feedback portals.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Navigation Quick Links */}
      <section className="py-12 bg-secondary/30">
        <div className="container-tight">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "IQAC Composition", id: "iqac" },
              { label: "IIQA Submission", id: "iiqa" },
              { label: "SSR Criteria (1-7)", id: "ssr" },
              { label: "Satisfaction Survey", id: "survey" },
              { label: "DVV Clarifications", id: "dvv" },
              { label: "Best Practices", id: "practices" },
              { label: "Feedback System", id: "feedback" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-border hover:border-gold/30 hover:bg-gold/5 text-xs font-semibold text-foreground hover:text-gold transition duration-300 shadow-sm"
              >
                <ChevronRight className="size-3.5 text-gold" /> {link.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* IQAC Composition Section */}
      <section id="iqac" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Organization"
            title="IQAC Composition & Reports"
            subtitle="Meet the committee supervising standard metrics and annual quality assurance."
          />

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
            <div className="lg:col-span-2">
              <div className="p-8 md:p-10 rounded-3xl border border-border bg-card shadow-sm">
                <h3 className="font-display font-bold text-2xl mb-6 pb-4 border-b border-border/80 flex items-center gap-2">
                  <ShieldCheck className="size-6 text-gold" /> IQAC Committee Members
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="bg-secondary/40 border-b border-border">
                        <th className="p-3 font-bold">Name</th>
                        <th className="p-3 font-bold">Designation</th>
                        <th className="p-3 font-bold text-right">IQAC Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {[
                        { name: "Dr. N. K. Gupta", role: "Director", cell: "Chairperson" },
                        {
                          name: "Prof. S. C. Sharma",
                          role: "Dean (Academics)",
                          cell: "IQAC Coordinator",
                        },
                        { name: "Mr. Rajeev Kumar", role: "Management Nominee", cell: "Member" },
                        {
                          name: "Dr. Anjali Verma",
                          role: "Head (Law Dept)",
                          cell: "Faculty Member",
                        },
                        {
                          name: "Dr. P. K. Singh",
                          role: "Head (Education Dept)",
                          cell: "Faculty Member",
                        },
                        {
                          name: "Mr. Satish Chandra",
                          role: "Local Industry Expert",
                          cell: "External Nominee",
                        },
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-accent/40">
                          <td className="p-3 font-semibold text-foreground">{row.name}</td>
                          <td className="p-3 text-muted-foreground">{row.role}</td>
                          <td className="p-3 text-right font-bold text-gold">{row.cell}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="p-8 rounded-3xl border border-border bg-card shadow-sm">
                <h3 className="font-display font-bold text-lg mb-4">AQAR Submissions</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Annual Quality Assurance Reports submitted electronically to the NAAC portal.
                </p>
                <div className="mt-6 space-y-3">
                  {["AQAR Report 2024-25", "AQAR Report 2023-24", "AQAR Report 2022-23"].map(
                    (aqar) => (
                      <div
                        key={aqar}
                        className="p-4 rounded-xl border border-border bg-background flex items-center justify-between hover:border-gold/30 transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="size-4 text-gold" />
                          <span className="text-xs font-semibold">{aqar}</span>
                        </div>
                        <button className="text-xs text-gold font-bold hover:underline inline-flex items-center gap-1">
                          PDF <Download className="size-3" />
                        </button>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IIQA Submission Section */}
      <section id="iiqa" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Timeline"
            title="IIQA Submission"
            subtitle="Institutional Information for Quality Assessment (IIQA) registration and current compliance status."
          />

          <div className="max-w-3xl mx-auto mt-12 p-8 md:p-10 bg-card border border-border rounded-3xl shadow-sm hover:border-gold/30 transition">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/80">
              <div className="size-14 rounded-full bg-gold/10 text-gold grid place-items-center">
                <Clipboard className="size-7" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">
                  IIQA Status Dashboard
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Updated: Academic Year 2026-27
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2.5 border-b border-border/40 text-xs md:text-sm">
                <span className="font-bold text-muted-foreground">Registration Status</span>
                <span className="font-semibold text-green-600 bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/20">
                  Approved & Accepted
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-border/40 text-xs md:text-sm">
                <span className="font-bold text-muted-foreground">Submission Date</span>
                <span className="font-semibold text-foreground">22nd August 2026</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-border/40 text-xs md:text-sm">
                <span className="font-bold text-muted-foreground">Track Identification Number</span>
                <span className="font-semibold text-gold font-mono">UPCOGN102554</span>
              </div>
              <div className="flex justify-between items-center py-2.5 text-xs md:text-sm">
                <span className="font-bold text-muted-foreground">Official Letter Download</span>
                <button className="text-xs text-gold font-bold hover:underline inline-flex items-center gap-1.5">
                  Download IIQA PDF <Download className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SSR Section */}
      <section id="ssr" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Self Study"
            title="SSR (Self Study Report)"
            subtitle="Explore our seven quantitative assessment criteria with linked verification documents."
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-12">
            {ssrCriteria.map((cri) => (
              <FadeIn key={cri.id}>
                <div className="p-6 md:p-8 rounded-3xl bg-card border border-border h-full flex flex-col justify-between hover:border-gold/30 hover:shadow-elegant transition duration-300 group">
                  <div>
                    <div className="size-10 rounded-xl bg-gold/10 text-gold grid place-items-center mb-4">
                      <FileCheck className="size-5" />
                    </div>
                    <h3 className="font-display font-bold text-base md:text-lg text-foreground group-hover:text-gold transition-colors leading-snug">
                      {cri.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{cri.sub}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">
                      NAAC SSR Doc
                    </span>
                    <button className="text-xs text-gold font-bold hover:underline inline-flex items-center gap-1">
                      Download PDF <Download className="size-3.5" />
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Student Satisfactory Survey Section */}
      <section id="survey" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Survey"
            title="Student Satisfactory Survey (SSS)"
            subtitle="Academic infrastructure feedback gathered under guidelines."
          />

          <div className="max-w-4xl mx-auto mt-12 p-8 md:p-10 bg-card border border-border rounded-3xl shadow-sm text-center">
            <h3 className="font-display font-bold text-xl md:text-2xl mb-4">
              National Student Satisfaction Survey Analysis
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We compile anonymous student reviews concerning teaching patterns, internal
              evaluations, curriculum flexibilities, and college infrastructure availability.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="p-4 rounded-xl border border-border bg-background">
                <div className="text-2xl font-extrabold text-gold">4.62 / 5</div>
                <div className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">
                  Overall Rating
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background">
                <div className="text-2xl font-extrabold text-gold">94.8%</div>
                <div className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">
                  Syllabus Covered
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background">
                <div className="text-2xl font-extrabold text-gold">91.2%</div>
                <div className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">
                  IT Infrastructure
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-border flex items-center justify-center gap-4 flex-wrap">
              <button className="px-5 py-2.5 rounded-xl border border-border hover:border-gold/30 hover:bg-gold/5 text-xs font-semibold transition">
                Survey Questionnaire
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-gradient-gold text-gold-foreground font-semibold text-xs shadow-gold hover:scale-[1.02] transition">
                Download Survey Results PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DVV Clarifications Section */}
      <section id="dvv" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Verification"
            title="DVV Clarifications"
            subtitle="Data Validation and Verification clarifications, correspondence, and updated templates."
          />

          <div className="max-w-4xl mx-auto mt-12 p-8 md:p-10 border border-border bg-card rounded-3xl shadow-sm">
            <h3 className="font-display font-bold text-xl mb-6 pb-3 border-b border-border flex items-center gap-2">
              <Award className="size-5 text-gold" /> DVV Metrics & Clarification Files
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "Extended Profile Devise Clarification",
                  file: "Extended_Profile_DVV.pdf",
                },
                {
                  label: "Metric Level Deviations & Resubmission Data",
                  file: "Metric_Deviations_Clarified.pdf",
                },
                {
                  label: "Academic Audit & Support Documents",
                  file: "Academic_Audit_Clarification.pdf",
                },
              ].map((dvv, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-secondary/35 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-foreground">
                      {dvv.label}
                    </h4>
                    <span className="text-[10px] font-mono text-muted-foreground">{dvv.file}</span>
                  </div>
                  <button className="self-start sm:self-center text-xs text-gold font-bold hover:underline inline-flex items-center gap-1">
                    Download File <Download className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices & Distinctiveness Section */}
      <section id="practices" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Distinctiveness"
            title="Best Practices & Institutional Distinctiveness"
            subtitle="Explore our core values and unique contributions to rural educational welfare."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            <div className="p-8 md:p-10 rounded-3xl border border-border bg-card hover:border-gold/30 transition">
              <h3 className="font-display font-bold text-xl text-gold mb-4 border-b border-border/80 pb-2">
                Institutional Best Practices
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="size-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold">1. Free Legal Aid & Counseling Clinics</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Our students provide primary guidance under panel advocates to rural
                      residents, delivering hands-on court room practice while supporting the
                      community.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="size-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold">2. Digital Classroom Integration</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Transitioning all colleges to modern smart-boards and high-speed Wi-Fi centers
                      to enable virtual guest classes from leading law chambers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10 rounded-3xl border border-border bg-card hover:border-gold/30 transition">
              <h3 className="font-display font-bold text-xl text-primary mb-4 border-b border-border/80 pb-2">
                Institutional Distinctiveness
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Janhit Group's absolute distinctiveness lies in its deep commitment to rural
                empowerment. Situated at Greater Noida, Ghaziabad, and Saharanpur outskirts, we
                provide highly affordable world-class professional training to local youth.
              </p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-4">
                Through customized scholar programs, bus networks, and local legal counseling hubs,
                we break academic access barriers and enable professional integration for local
                student populations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback System Section */}
      <section id="feedback" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Feedback"
            title="Stakeholder Feedback System"
            subtitle="Annual feedback records gathered from Students, Teachers, Alumni, and Employers."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
            {[
              {
                role: "Students Feedback",
                desc: "Syllabus, teaching quality, and infra comfort ratings.",
              },
              {
                role: "Teachers Feedback",
                desc: "Curricular design modifications and library updates.",
              },
              {
                role: "Alumni Feedback",
                desc: "Placements feedback, courtroom practice suggestions.",
              },
              {
                role: "Employers Feedback",
                desc: "Core coding skills, professional ethics requirements.",
              },
            ].map((fb, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 border border-border bg-card rounded-2xl flex flex-col justify-between hover:border-gold/30 transition"
              >
                <div>
                  <h4 className="font-display font-bold text-base text-foreground leading-snug">
                    {fb.role}
                  </h4>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{fb.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                  <button className="text-xs text-gold font-bold hover:underline inline-flex items-center gap-1">
                    Survey Report <Download className="size-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
