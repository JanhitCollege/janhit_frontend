import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  Download,
  Award,
  CheckCircle2,
  ChevronRight,
  Users,
  Scale,
  Building2,
  GraduationCap,
  Briefcase,
  FileCheck,
  BarChart3,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Calendar,
  Check,
  Landmark,
  BookOpen,
} from "lucide-react";

interface SSRCriterion {
  id: number;
  slug: string;
  number: string;
  title: string;
  summary: string;
  subheads: { code: string; title: string; desc: string }[];
  docTitle: string;
  fileSize: string;
}

const ssrCriteriaData: SSRCriterion[] = [
  {
    id: 1,
    slug: "criterion-1",
    number: "Criterion 1",
    title: "Curricular Aspects",
    summary:
      "Curriculum delivery, planning, academic flexibility, value-added legal programs, and institutional stakeholder feedback mechanisms aligned with CCS University and Bar Council of India standards.",
    subheads: [
      {
        code: "1.1",
        title: "Curricular Planning & Implementation",
        desc: "Structured semester-wise academic lesson plans, clinical legal pedagogy, and integration of constitutional ethos.",
      },
      {
        code: "1.2",
        title: "Academic Flexibility",
        desc: "Electives in Cyber Law, Intellectual Property Rights (IPR), Corporate Insolvency, and Human Rights Jurisprudence.",
      },
      {
        code: "1.3",
        title: "Curriculum Enrichment",
        desc: "Mandatory Moot Court training, drafting petitions, ADR mediation workshops, and Lok Adalat observational training.",
      },
      {
        code: "1.4",
        title: "Feedback System",
        desc: "Structured feedback collection, analysis, and comprehensive Action Taken Reports (ATR) from Students, Teachers, Alumni, and Legal Employers.",
      },
    ],
    docTitle: "Criterion_1_Curricular_Aspects_SSR.pdf",
    fileSize: "3.8 MB",
  },
  {
    id: 2,
    slug: "criterion-2",
    number: "Criterion 2",
    title: "Teaching-Learning & Evaluation",
    summary:
      "Admissions transparently adhering to state reservation policies, socratic teaching pedagogy, moot court exercises, clinical training, faculty credentials, and robust evaluation reforms.",
    subheads: [
      {
        code: "2.1",
        title: "Student Enrolment & Diversity",
        desc: "Transparent merit admissions adhering to government reservation quotas and BCI eligibility norms.",
      },
      {
        code: "2.2",
        title: "Catering to Diverse Learners",
        desc: "Bilingual legal terminology glossaries (Hindi/English), remedial law sessions, and advanced case law research groups.",
      },
      {
        code: "2.3",
        title: "Teaching-Learning Process",
        desc: "Experiential learning via Mock Trials, Prison and Police Station visits, Lok Adalat attendance, and courtroom simulations.",
      },
      {
        code: "2.4",
        title: "Teacher Profile & Quality",
        desc: "BCI-qualified full-time faculty holding UGC NET and Ph.D. degrees, with active bar courtroom litigation experience.",
      },
      {
        code: "2.5",
        title: "Evaluation Process & Reforms",
        desc: "Continuous internal assessments, memorial drafting reviews, viva voce evaluations, and fair grievance handling.",
      },
      {
        code: "2.6",
        title: "Student Performance & Learning Outcomes",
        desc: "Clear Program Outcomes (POs) and Course Outcomes (COs) assessing courtroom readiness and judicial aptitude.",
      },
    ],
    docTitle: "Criterion_2_Teaching_Learning_SSR.pdf",
    fileSize: "4.2 MB",
  },
  {
    id: 3,
    slug: "criterion-3",
    number: "Criterion 3",
    title: "Research, Innovations & Extension",
    summary:
      "Faculty publications in UGC CARE listed law journals, Legal Aid Clinic extension programs in adopted villages, Para-Legal Volunteer training, and active MoUs with Bar Associations.",
    subheads: [
      {
        code: "3.1",
        title: "Resource Mobilization for Research",
        desc: "Institutional seed grants for legal research papers, empirical studies, and seminar publications.",
      },
      {
        code: "3.2",
        title: "Innovation Ecosystem",
        desc: "Dedicated Law Review Committee, Legal Research & Incubation Cell, and student law bulletins.",
      },
      {
        code: "3.3",
        title: "Research Publications & Awards",
        desc: "Books, book chapters, and research articles on Indian Constitutional Law, Criminal Procedure, and Cyber Crimes.",
      },
      {
        code: "3.4",
        title: "Extension & Outreach Activities",
        desc: "Free Legal Aid Camps in rural Gautam Buddha Nagar, DLSA collaboration, and Rights Awareness for women and children.",
      },
      {
        code: "3.5",
        title: "Collaborations & Linkages",
        desc: "Active MoUs with District Bar Associations, Legal Aid Authorities, Senior Advocates' Chambers, and NGO forums.",
      },
    ],
    docTitle: "Criterion_3_Research_Extension_SSR.pdf",
    fileSize: "5.1 MB",
  },
  {
    id: 4,
    slug: "criterion-4",
    number: "Criterion 4",
    title: "Infrastructure & Learning Resources",
    summary:
      "Dedicated Moot Court Hall with judge's dais and witness box, fully-cataloged Law Library with All India Reporter (AIR) and SCC Online, ICT-enabled classrooms, and green campus infrastructure.",
    subheads: [
      {
        code: "4.1",
        title: "Physical Facilities",
        desc: "Formal Moot Court Hall, ICT seminar rooms, separate boys and girls common rooms, and conference facilities.",
      },
      {
        code: "4.2",
        title: "Library as a Learning Resource",
        desc: "15,000+ law volumes, Supreme Court Cases (SCC Online), CDJ Law Journal, Bare Acts, e-library portal, and DELNET.",
      },
      {
        code: "4.3",
        title: "IT Infrastructure",
        desc: "High-speed campus Wi-Fi, computer research lab, digital podiums, and campus-wide CCTV monitoring.",
      },
      {
        code: "4.4",
        title: "Maintenance of Campus Facilities",
        desc: "Annual maintenance contracts for IT, library air-conditioning, campus gardens, and hygienic cafeteria.",
      },
    ],
    docTitle: "Criterion_4_Infrastructure_SSR.pdf",
    fileSize: "3.4 MB",
  },
  {
    id: 5,
    slug: "criterion-5",
    number: "Criterion 5",
    title: "Student Support & Progression",
    summary:
      "Government scholarship facilitation, PCS-J / Judiciary exam mentorship circles, active placement & internship cell, national moot court participation, and registered alumni network.",
    subheads: [
      {
        code: "5.1",
        title: "Student Support Schemes",
        desc: "UP Social Welfare scholarships, institutional tuition concessions for economically weaker students, and fee waivers.",
      },
      {
        code: "5.2",
        title: "Student Progression",
        desc: "Advocacy enrollment in State Bar Councils, judicial clerkships, corporate counsel recruitment, and LL.M. progression.",
      },
      {
        code: "5.3",
        title: "Student Participation & Activities",
        desc: "Participation in National Moot Court Competitions, Youth Parliament, Legal Aid drives, sports tournaments, and cultural fests.",
      },
      {
        code: "5.4",
        title: "Alumni Association",
        desc: "Janhit Law Alumni Association (JLAA) conducting guest mentorship, chamber placements, and moot trials.",
      },
    ],
    docTitle: "Criterion_5_Student_Support_SSR.pdf",
    fileSize: "4.6 MB",
  },
  {
    id: 6,
    slug: "criterion-6",
    number: "Criterion 6",
    title: "Governance, Leadership & Management",
    summary:
      "Visionary democratic governance, decentralized academic management, faculty development support, audited financial accounts, and IQAC continuous quality monitoring.",
    subheads: [
      {
        code: "6.1",
        title: "Institutional Vision & Leadership",
        desc: "Decentralized management with faculty representation on academic, exam, and discipline committees.",
      },
      {
        code: "6.2",
        title: "Strategy Development & Deployment",
        desc: "Perspective 5-year developmental plan with institutional milestones and ERP automation.",
      },
      {
        code: "6.3",
        title: "Faculty Empowerment Strategies",
        desc: "Financial assistance for national law conferences, professional development workshops, and faculty welfare.",
      },
      {
        code: "6.4",
        title: "Financial Management & Resource Mobilization",
        desc: "Regular statutory external and internal audits, transparent allocation for library and moot court infrastructure.",
      },
      {
        code: "6.5",
        title: "Internal Quality Assurance System (IQAC)",
        desc: "Periodic IQAC reviews, institutional audits, AQAR submissions, and academic benchmarking.",
      },
    ],
    docTitle: "Criterion_6_Governance_SSR.pdf",
    fileSize: "3.9 MB",
  },
  {
    id: 7,
    slug: "criterion-7",
    number: "Criterion 7",
    title: "Institutional Values & Best Practices",
    summary:
      "Gender equity promotion, environmental stewardship, constitutional duties & legal literacy, distinctiveness in rural legal empowerment, and clinical courtroom readiness.",
    subheads: [
      {
        code: "7.1",
        title: "Institutional Values & Social Responsibilities",
        desc: "ICC gender equity cell, green campus initiatives, solar lighting, Constitution Day and Human Rights Day observances.",
      },
      {
        code: "7.2",
        title: "Best Practices",
        desc: "Best Practice 1: Free Rural Legal Aid Clinic. Best Practice 2: Integrated Year-Round Clinical Moot Court Pedagogy.",
      },
      {
        code: "7.3",
        title: "Institutional Distinctiveness",
        desc: "Empowering rural and first-generation learners into ethical, court-ready advocates in Greater Noida.",
      },
    ],
    docTitle: "Criterion_7_Institutional_Values_SSR.pdf",
    fileSize: "4.0 MB",
  },
];

export function Naac() {
  const [activeFeedbackTab, setActiveFeedbackTab] = useState<
    "students" | "teachers" | "alumni" | "employers"
  >("students");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white text-navy font-sans">
      {/* 1. Hero Header */}
      <section className="relative py-16 md:py-20 bg-white text-navy overflow-hidden border-b border-gold/30">
        <div className="absolute inset-0 bg-[radial-gradient(#C8A44D_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/35 text-navy text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <ShieldCheck className="h-4 w-4 text-gold" />
            <span>Internal Quality Assurance Cell (IQAC)</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-navy max-w-4xl leading-tight">
            NAAC & <span className="text-gold">IQAC Accreditation</span> Portal
          </h1>
          <p className="mt-5 text-navy/85 font-medium max-w-3xl text-sm sm:text-base leading-relaxed">
            Welcome to the official National Assessment and Accreditation Council (NAAC) & Internal
            Quality Assurance Cell (IQAC) repository of Janhit College of Law, Greater Noida.
            Access comprehensive compliance documentation, IIQA submissions, SSR Criteria 1–7,
            Student Satisfaction Survey reports, DVV clarifications, best practices, and stakeholder
            feedback systems.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold">
            <div className="px-4 py-2.5 rounded-lg bg-slate-50 border border-gold/25 text-navy/85 flex items-center gap-2 shadow-xs">
              <Landmark className="h-4 w-4 text-gold" />
              <span>Affiliated to CCS University, Meerut</span>
            </div>
            <div className="px-4 py-2.5 rounded-lg bg-slate-50 border border-gold/25 text-navy/85 flex items-center gap-2 shadow-xs">
              <Scale className="h-4 w-4 text-gold" />
              <span>Approved by Bar Council of India (BCI)</span>
            </div>
            <div className="px-4 py-2.5 rounded-lg bg-slate-50 border border-gold/25 text-navy/85 flex items-center gap-2 shadow-xs">
              <Award className="h-4 w-4 text-gold" />
              <span>NAAC Accreditation Cycle - 1</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Jump Navigation Bar */}
      <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md border-y border-gold/20 shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold scrollbar-none">
            <span className="text-gold uppercase tracking-wider text-[11px] font-bold shrink-0 mr-1 flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5" /> Jump To:
            </span>
            {[
              { label: "IQAC Composition", id: "iqac" },
              { label: "IIQA Submission", id: "iiqa" },
              { label: "SSR (Criteria 1-7)", id: "ssr" },
              { label: "Student Survey (SSS)", id: "survey" },
              { label: "DVV Clarifications", id: "dvv" },
              { label: "Best Practices", id: "best-practices" },
              { label: "Distinctiveness", id: "distinctiveness" },
              { label: "Feedback System", id: "feedback" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3.5 py-1.5 rounded-full bg-navy/5 text-navy hover:bg-gold hover:text-navy-deep transition-all shrink-0 border border-gold/20"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. IQAC Composition & Reports Section */}
      <section id="iqac" className="py-16 md:py-24 border-b border-gold/15 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-gold block mb-1">
                Governance & Monitoring
              </span>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-navy">
                IQAC Composition & Reports
              </h2>
              <p className="text-navy/85 font-medium text-sm mt-2 max-w-2xl">
                The Internal Quality Assurance Cell (IQAC) spearheads continuous institutional
                quality enhancement, academic auditing, and standards compliance.
              </p>
            </div>
            <div className="shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gold/10 text-gold-deep border border-gold/30 text-xs font-bold">
                <CheckCircle2 className="h-4 w-4 text-gold" /> IQAC Tenure: 2024–2026
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Committee Table */}
            <div className="lg:col-span-8 bg-card rounded-2xl border border-gold/20 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-navy text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-gold" />
                  <h3 className="font-serif text-lg font-bold">IQAC Executive Committee Members</h3>
                </div>
                <span className="text-xs text-gold font-medium">As per NAAC Guidelines</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-navy/5 text-navy border-b border-gold/20">
                    <tr>
                      <th className="py-3 px-4 font-bold">Designation / Role in College</th>
                      <th className="py-3 px-4 font-bold">Member Name</th>
                      <th className="py-3 px-4 font-bold text-right">IQAC Designation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10">
                    {[
                      {
                        role: "Principal & Director",
                        name: "Dr. S. N. Yadav",
                        iqac: "Chairperson",
                      },
                      {
                        role: "Senior Associate Professor, Law",
                        name: "Dr. S. P. Tyagi",
                        iqac: "IQAC Coordinator",
                      },
                      {
                        role: "Head, Dept of Constitutional Law",
                        name: "Dr. Vandana Sharma",
                        iqac: "Faculty Member",
                      },
                      {
                        role: "Assistant Professor, Criminal Law",
                        name: "Dr. Manoj Kumar",
                        iqac: "Faculty Member",
                      },
                      {
                        role: "Assistant Professor, Procedural Law",
                        name: "Ms. Priyanka Roy",
                        iqac: "Faculty Member",
                      },
                      {
                        role: "Registrar / Senior Administration",
                        name: "Mr. R. P. Sharma",
                        iqac: "Administrative Officer",
                      },
                      {
                        role: "Chief Accounts Officer",
                        name: "Mr. Amit Kumar",
                        iqac: "Administrative Officer",
                      },
                      {
                        role: "Trustee, Janhit Group of Institutions",
                        name: "Shri Manjit Singh",
                        iqac: "Management Representative",
                      },
                      {
                        role: "Educationist & Social Worker",
                        name: "Shri Anand Swarup",
                        iqac: "Local Society Nominee",
                      },
                      {
                        role: "Senior Advocate, District Bar Association",
                        name: "Adv. Rakesh Saxena",
                        iqac: "Bar / Employer Nominee",
                      },
                      {
                        role: "Advocate, High Court of Judicature",
                        name: "Adv. Vikrant Choudhary",
                        iqac: "Alumni Representative",
                      },
                      {
                        role: "Final Year Student (B.A. LL.B)",
                        name: "Ms. Simran Kaur",
                        iqac: "Student Representative",
                      },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gold/5 transition-colors">
                        <td className="py-3 px-4 text-navy/80 font-medium">{row.role}</td>
                        <td className="py-3 px-4 font-semibold text-navy">{row.name}</td>
                        <td className="py-3 px-4 text-right">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold ${
                              row.iqac === "Chairperson"
                                ? "bg-navy text-gold"
                                : row.iqac === "IQAC Coordinator"
                                ? "bg-gold/20 text-navy-deep font-bold"
                                : "bg-navy/5 text-navy/90"
                            }`}
                          >
                            {row.iqac}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AQAR Submissions & Minutes Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-gold/20 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gold/15">
                  <FileText className="h-5 w-5 text-gold" />
                  <h3 className="font-serif text-lg font-bold text-navy">
                    AQAR Submissions (NAAC)
                  </h3>
                </div>
                <p className="text-xs text-navy/85 font-medium leading-relaxed mb-4">
                  Annual Quality Assurance Reports submitted electronically to the National
                  Assessment and Accreditation Council.
                </p>
                <div className="space-y-3">
                  {[
                    { year: "AQAR 2025–26", status: "Submitted & Approved", size: "2.4 MB" },
                    { year: "AQAR 2024–25", status: "Approved by NAAC", size: "2.1 MB" },
                    { year: "AQAR 2023–24", status: "Approved by NAAC", size: "1.9 MB" },
                    { year: "AQAR 2022–23", status: "Approved by NAAC", size: "1.8 MB" },
                  ].map((aqar, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-gold/20 bg-navy/5 hover:bg-gold/10 hover:border-gold transition flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-navy">{aqar.year}</div>
                        <div className="text-[10px] text-green-700 font-semibold flex items-center gap-1 mt-0.5">
                          <Check className="h-3 w-3" /> {aqar.status}
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`Downloading ${aqar.year} documentation...`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white text-navy font-bold text-xs hover:text-gold border border-gold/30 shadow-xs cursor-pointer"
                      >
                        PDF <Download className="h-3 w-3 text-gold" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* IQAC Minutes & ATR */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-navy-deep to-navy text-white shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-gold" />
                  <h3 className="font-serif text-lg font-bold text-white">IQAC Meeting Minutes</h3>
                </div>
                <p className="text-xs text-white/85 font-medium leading-relaxed mb-4">
                  Review the quarterly meeting records, agendas, resolutions, and subsequent Action
                  Taken Reports (ATR).
                </p>
                <div className="space-y-2">
                  {[
                    "IQAC Minutes & ATR (Q4 2025–26)",
                    "IQAC Minutes & ATR (Q3 2025–26)",
                    "IQAC Minutes & ATR (Q2 2025–26)",
                    "IQAC Minutes & ATR (Q1 2025–26)",
                  ].map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 transition cursor-pointer"
                      onClick={() => alert(`Accessing ${m}...`)}
                    >
                      <span className="font-medium text-white/90">{m}</span>
                      <Download className="h-3.5 w-3.5 text-gold shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IIQA Submission Section */}
      <section id="iiqa" className="py-16 md:py-24 bg-navy/5 border-b border-gold/15 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-gold block mb-1">
              Institutional Eligibility
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-navy">
              IIQA Submission Status
            </h2>
            <p className="text-navy/85 font-medium text-sm mt-2">
              Institutional Information for Quality Assessment (IIQA) validation records,
              statutory compliance, and application tracking numbers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gold/30 shadow-lg p-6 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gold/20">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gold/15 text-gold flex items-center justify-center shrink-0 border border-gold/30">
                  <FileCheck className="h-7 w-7 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-navy">
                    IIQA Institutional Dashboard
                  </h3>
                  <span className="text-xs text-navy/60">
                    Janhit College of Law, Knowledge Park - 1, Greater Noida
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-bold self-start sm:self-auto">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>IIQA Accepted & Verified</span>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-navy/5 border border-gold/15">
                <div className="text-[11px] uppercase font-bold text-navy/60">
                  Track Identification No (TIN)
                </div>
                <div className="text-base font-bold text-navy font-mono mt-1 text-gold">
                  UPCOGN108422
                </div>
                <div className="text-[11px] text-navy/60 mt-0.5">NAAC Portal Application</div>
              </div>

              <div className="p-4 rounded-xl bg-navy/5 border border-gold/15">
                <div className="text-[11px] uppercase font-bold text-navy/60">
                  AISHE Institutional Code
                </div>
                <div className="text-base font-bold text-navy font-mono mt-1">C-46231</div>
                <div className="text-[11px] text-navy/60 mt-0.5">Ministry of Education, GoI</div>
              </div>

              <div className="p-4 rounded-xl bg-navy/5 border border-gold/15">
                <div className="text-[11px] uppercase font-bold text-navy/60">
                  BCI Approval Recognition
                </div>
                <div className="text-base font-bold text-navy font-mono mt-1">
                  BCI:D:1432/2002 (LE)
                </div>
                <div className="text-[11px] text-navy/60 mt-0.5">Bar Council of India, New Delhi</div>
              </div>

              <div className="p-4 rounded-xl bg-navy/5 border border-gold/15">
                <div className="text-[11px] uppercase font-bold text-navy/60">
                  University Affiliation Code
                </div>
                <div className="text-base font-bold text-navy font-mono mt-1">College Code: 969</div>
                <div className="text-[11px] text-navy/60 mt-0.5">CCS University, Meerut</div>
              </div>

              <div className="p-4 rounded-xl bg-navy/5 border border-gold/15">
                <div className="text-[11px] uppercase font-bold text-navy/60">
                  Assessment Cycle
                </div>
                <div className="text-base font-bold text-navy mt-1">Cycle - 1 (First Cycle)</div>
                <div className="text-[11px] text-navy/60 mt-0.5">Autonomous & Affiliated HEI</div>
              </div>

              <div className="p-4 rounded-xl bg-navy/5 border border-gold/15">
                <div className="text-[11px] uppercase font-bold text-navy/60">
                  Date of Submission & Approval
                </div>
                <div className="text-base font-bold text-navy mt-1">14th October 2025</div>
                <div className="text-[11px] text-navy/60 mt-0.5">Verified on HEI Portal</div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-navy/70">
                Official documents submitted and stamped by the Head of Institution (Dr. S. N. Yadav).
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => alert("Downloading Approved IIQA Application PDF...")}
                  className="px-4 py-2 rounded-lg gradient-gold text-navy-deep font-bold text-xs shadow-gold hover:-translate-y-0.5 transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" /> Download IIQA Form (PDF)
                </button>
                <button
                  onClick={() => alert("Downloading Statutory Undertaking & Affiliation Letters...")}
                  className="px-4 py-2 rounded-lg bg-navy text-white font-bold text-xs hover:bg-navy-deep transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-gold" /> Statutory Undertaking
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SSR (Self Study Report) & Criteria 1-7 Section */}
      <section id="ssr" className="py-16 md:py-24 border-b border-gold/15 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-gold block mb-1">
                Comprehensive Assessment
              </span>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-navy">
                SSR (Self Study Report) — Criteria 1 to 7
              </h2>
              <p className="text-navy/85 font-medium text-sm mt-2 max-w-3xl leading-relaxed">
                The Self Study Report (SSR) encompasses detailed quantitative and qualitative metrics
                divided systematically across all seven NAAC criteria with associated verification
                documents for legal education standards.
              </p>
            </div>
            <div className="shrink-0">
              <button
                onClick={() => alert("Downloading Complete Institutional SSR Dossier (18.4 MB)...")}
                className="px-5 py-3 rounded-xl bg-navy text-white font-bold text-xs md:text-sm hover:bg-navy-deep transition border border-gold/30 shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="h-4 w-4 text-gold" /> Download Master SSR Dossier (All Criteria)
              </button>
            </div>
          </div>

          {/* Quick jump to individual criteria */}
          <div className="mb-10 p-4 rounded-2xl bg-gold/10 border border-gold/20 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-navy shrink-0 mr-1 flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-gold" /> Direct Criterion Jump:
            </span>
            {ssrCriteriaData.map((cri) => (
              <button
                key={cri.id}
                onClick={() => scrollToSection(cri.slug)}
                className="px-3 py-1 rounded-md bg-white text-navy font-semibold text-xs hover:bg-gold hover:text-navy-deep transition border border-gold/30 shadow-xs cursor-pointer"
              >
                {cri.number}
              </button>
            ))}
          </div>

          {/* Criteria Cards */}
          <div className="space-y-8">
            {ssrCriteriaData.map((cri) => (
              <div
                key={cri.id}
                id={cri.slug}
                className="rounded-3xl border border-gold/20 bg-card p-6 md:p-8 shadow-sm hover:border-gold/40 hover:shadow-md transition scroll-mt-32"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-gold/15">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-navy/5 text-gold font-mono text-xs font-bold mb-2">
                      <Sparkles className="h-3.5 w-3.5" /> NAAC {cri.number}
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-navy">
                      {cri.number}: {cri.title}
                    </h3>
                    <p className="text-xs md:text-sm text-navy/85 font-medium mt-1.5 max-w-3xl leading-relaxed">
                      {cri.summary}
                    </p>
                  </div>
                  <div className="shrink-0 self-start">
                    <button
                      onClick={() => alert(`Downloading verified documentation for ${cri.title}...`)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gold/15 text-navy font-bold text-xs hover:bg-gold hover:text-navy-deep transition border border-gold/30 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5 text-gold" /> {cri.docTitle} ({cri.fileSize})
                    </button>
                  </div>
                </div>

                {/* Sub-heads grid */}
                <div className="mt-6">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-gold mb-3">
                    Sub-Heads & Metric Areas:
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cri.subheads.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-xl bg-navy/5 border border-gold/10 hover:border-gold/30 transition flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-navy text-xs mb-1">
                            <span className="text-gold font-mono">[{sub.code}]</span>
                            <span>{sub.title}</span>
                          </div>
                          <p className="text-[11px] text-navy/85 font-medium leading-relaxed">{sub.desc}</p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-gold/10 flex items-center justify-between text-[10px] text-navy/60 font-medium">
                          <span>Metric Proofs</span>
                          <span className="text-green-700 font-bold">Uploaded ✓</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Student Satisfactory Survey (SSS) Section */}
      <section id="survey" className="py-16 md:py-24 bg-navy/5 border-b border-gold/15 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-gold block mb-1">
              Feedback & Transparency
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-navy">
              Student Satisfactory Survey (SSS)
            </h2>
            <p className="text-navy/85 font-medium text-sm mt-2">
              National Student Satisfaction Survey evaluating teaching-learning methodology,
              courtroom clinical pedagogy, moot court mentorship, and institutional support.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gold/30 shadow-lg p-6 md:p-10">
            <div className="grid sm:grid-cols-3 gap-6 text-center pb-8 border-b border-gold/20">
              <div className="p-4 rounded-2xl bg-gold/10 border border-gold/20">
                <div className="text-3xl font-extrabold text-navy font-serif">4.72 / 5.0</div>
                <div className="text-xs font-bold text-gold uppercase tracking-wider mt-1">
                  Overall SSS Score
                </div>
                <div className="text-[11px] text-navy/60 mt-0.5">94.4% Satisfaction Index</div>
              </div>
              <div className="p-4 rounded-2xl bg-navy/5 border border-gold/20">
                <div className="text-3xl font-extrabold text-navy font-serif">92.8%</div>
                <div className="text-xs font-bold text-navy/80 uppercase tracking-wider mt-1">
                  Student Participation
                </div>
                <div className="text-[11px] text-navy/60 mt-0.5">Valid Verified Responses</div>
              </div>
              <div className="p-4 rounded-2xl bg-navy/5 border border-gold/20">
                <div className="text-3xl font-extrabold text-navy font-serif">96.5%</div>
                <div className="text-xs font-bold text-navy/80 uppercase tracking-wider mt-1">
                  Moot & Clinical Training
                </div>
                <div className="text-[11px] text-navy/60 mt-0.5">Practical Advocacy Rating</div>
              </div>
            </div>

            {/* Key Metric Gauges */}
            <div className="mt-8 space-y-4">
              <h3 className="font-serif text-lg font-bold text-navy mb-4">
                Detailed Evaluation Parameters (SSS 2025–26)
              </h3>
              {[
                {
                  metric: "Curriculum Delivery & Classroom Legal Discussion",
                  score: 95,
                  desc: "Socratic method, case laws explanation, and concept clarity.",
                },
                {
                  metric: "Moot Court Coaching & Memorial Drafting Guidance",
                  score: 97,
                  desc: "Individual faculty feedback on memorial structuring and courtroom arguments.",
                },
                {
                  metric: "Law Library Access, SCC Online & Research Infrastructure",
                  score: 93,
                  desc: "Availability of AIR, Supreme Court Cases, Bare Acts, and e-database workstations.",
                },
                {
                  metric: "Fairness in Internal Continuous Evaluation & Viva Voce",
                  score: 92,
                  desc: "Transparent rubrics for assessments, clinical assignments, and internships.",
                },
                {
                  metric: "Guidance for Bar Council Exam & Judicial Services (PCS-J)",
                  score: 91,
                  desc: "Regular competitive test prep workshops and special legal lectures.",
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-navy/5 border border-gold/15">
                  <div className="flex justify-between items-center text-xs md:text-sm font-bold text-navy">
                    <span>{item.metric}</span>
                    <span className="text-gold font-mono">{item.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-navy/10 mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold to-navy rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-navy/75 font-medium mt-1.5">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-navy/70">
                Administered via anonymous questionnaire in accordance with NAAC guidelines.
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => alert("Downloading SSS Analysis & Action Taken Report PDF...")}
                  className="px-4 py-2 rounded-lg gradient-gold text-navy-deep font-bold text-xs shadow-gold hover:-translate-y-0.5 transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" /> Full SSS Report (PDF)
                </button>
                <button
                  onClick={() => alert("Downloading NAAC Student Survey Questionnaire...")}
                  className="px-4 py-2 rounded-lg bg-navy text-white font-bold text-xs hover:bg-navy-deep transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5 text-gold" /> Survey Questionnaire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DVV Clarifications Section */}
      <section id="dvv" className="py-16 md:py-24 border-b border-gold/15 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-gold block mb-1">
                Data Verification
              </span>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-navy">
                DVV Clarifications
              </h2>
              <p className="text-navy/85 font-medium text-sm mt-2 max-w-2xl">
                Data Validation and Verification (DVV) metric-level responses, clarification files,
                and revised templates attested by the Head of Institution.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-bold">
                <Check className="h-4 w-4" /> All Clarifications Addressed
              </span>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-gold/20 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-navy text-white">
                  <tr>
                    <th className="py-3 px-4 font-bold">Metric ID</th>
                    <th className="py-3 px-4 font-bold">Metric Description</th>
                    <th className="py-3 px-4 font-bold">HEI Clarification & Justification</th>
                    <th className="py-3 px-4 font-bold text-right">Support Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  {[
                    {
                      id: "1.2.1",
                      desc: "Number of Certificate/Value Added courses offered for law students",
                      hei: "Course completion lists, syllabus documents, and certificates for Cyber Law & ADR verified.",
                      doc: "DVV_1.2.1_Clarification.pdf",
                    },
                    {
                      id: "2.1.2",
                      desc: "Seats filled against seats reserved for various categories (SC, ST, OBC)",
                      hei: "Admission extract authenticated by CCS University & state reservation rosters submitted.",
                      doc: "DVV_2.1.2_Reservation_List.pdf",
                    },
                    {
                      id: "2.4.2",
                      desc: "Full time teachers with Ph.D. / NET and Bar Council enrollment",
                      hei: "Degree certificates, NET qualification letters, and Bar Council ID copies furnished.",
                      doc: "DVV_2.4.2_Faculty_Credentials.pdf",
                    },
                    {
                      id: "3.4.3",
                      desc: "Extension activities carried out in neighborhood community / Legal Aid",
                      hei: "Detailed reports, geo-tagged photos, and attendance logs of free rural legal aid camps.",
                      doc: "DVV_3.4.3_Legal_Aid_Reports.pdf",
                    },
                    {
                      id: "4.1.3",
                      desc: "Classrooms and seminar halls with ICT-enabled smart facilities",
                      hei: "Master facilities list, geo-tagged photographs, and internet bandwidth invoices provided.",
                      doc: "DVV_4.1.3_ICT_Classrooms.pdf",
                    },
                    {
                      id: "5.1.1",
                      desc: "Students benefited by scholarships and freeships provided by Government",
                      hei: "UP Social Welfare scholarship sanction letters and student bank disbursements verified.",
                      doc: "DVV_5.1.1_Scholarships_List.pdf",
                    },
                    {
                      id: "6.3.2",
                      desc: "Teachers provided with financial support to attend conferences and workshops",
                      hei: "Audited ledger accounts, registration receipts, and certificates of attendance verified.",
                      doc: "DVV_6.3.2_Faculty_Support.pdf",
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gold/5 transition">
                      <td className="py-3 px-4 font-mono font-bold text-gold">{row.id}</td>
                      <td className="py-3 px-4 font-semibold text-navy max-w-xs">{row.desc}</td>
                      <td className="py-3 px-4 text-navy/70 text-xs leading-relaxed max-w-sm">
                        {row.hei}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => alert(`Downloading ${row.doc}...`)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-navy/5 text-navy font-bold text-xs hover:bg-gold hover:text-navy-deep transition border border-gold/30 cursor-pointer"
                        >
                          <Download className="h-3 w-3 text-gold" /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Best Practices Section */}
      <section id="best-practices" className="py-16 md:py-24 bg-navy/5 border-b border-gold/15 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-gold block mb-1">
              Criterion 7.2
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-navy">
              Institutional Best Practices
            </h2>
            <p className="text-navy/85 font-medium text-sm mt-2">
              Two flagship pedagogical and social empowerment practices systematically institutionalized
              at Janhit College of Law.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Best Practice 1 */}
            <div className="p-8 rounded-3xl bg-white border border-gold/30 shadow-sm flex flex-col justify-between hover:border-gold transition">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold/15 text-navy-deep font-bold text-xs mb-4">
                  <Scale className="h-4 w-4 text-gold" /> Best Practice 1
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy leading-snug">
                  Community Legal Aid Clinics & Lok Adalat Social Immersion
                </h3>
                <div className="mt-4 space-y-3 text-xs md:text-sm text-navy/75 leading-relaxed">
                  <div>
                    <strong className="text-navy">Context & Objectives:</strong> To bridge the gap
                    between abstract statutory provisions and grassroots legal needs in rural
                    villages surrounding Greater Noida, providing free consultation while cultivating
                    ethical empathy in budding advocates.
                  </div>
                  <div>
                    <strong className="text-navy">The Practice:</strong> Organized under the Janhit
                    Legal Aid Society in close collaboration with the District Legal Services Authority
                    (DLSA). Law students act as Para-Legal Volunteers (PLVs), organizing door-to-door
                    rights camps, counseling marginalized litigants, preparing affidavits, and
                    attending National Lok Adalats.
                  </div>
                  <div>
                    <strong className="text-navy">Evidence of Success:</strong> Over 450+ villagers
                    provided with free legal counseling in the past three years; 80+ compoundable
                    disputes amicably mediated before pre-litigation stages; significant rise in
                    student awareness of real-world courtroom processes.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between">
                <span className="text-xs text-navy/60 font-medium">Janhit Legal Aid Society</span>
                <button
                  onClick={() => alert("Downloading Best Practice 1 Full Report (PDF)...")}
                  className="inline-flex items-center gap-1.5 text-xs text-gold font-bold hover:underline cursor-pointer"
                >
                  Download Report <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Best Practice 2 */}
            <div className="p-8 rounded-3xl bg-white border border-gold/30 shadow-sm flex flex-col justify-between hover:border-gold transition">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold/15 text-navy-deep font-bold text-xs mb-4">
                  <Award className="h-4 w-4 text-gold" /> Best Practice 2
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy leading-snug">
                  Integrated Year-Round Clinical Moot Court & Trial Advocacy Pedagogy
                </h3>
                <div className="mt-4 space-y-3 text-xs md:text-sm text-navy/75 leading-relaxed">
                  <div>
                    <strong className="text-navy">Context & Objectives:</strong> Traditional law
                    degrees frequently suffer from overly theoretical rote learning. Janhit College
                    of Law overcomes this by mandating formal courtroom trial simulation from the
                    very first semester of legal study.
                  </div>
                  <div>
                    <strong className="text-navy">The Practice:</strong> Every student undergoes
                    structured weekly sessions in the college’s formal Moot Court Hall. Training
                    covers case research via SCC Online, memorial drafting, oral advocacy decorum,
                    witness examination, and mock cross-examinations judged by retired judicial
                    officers and active High Court advocates.
                  </div>
                  <div>
                    <strong className="text-navy">Evidence of Success:</strong> Students have won
                    accolades in State and National Moot Court Competitions; graduates exhibit immediate
                    courtroom confidence upon enrollment with State Bar Councils; elevated
                    internship placement rates in designated Senior Advocates' chambers.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between">
                <span className="text-xs text-navy/60 font-medium">Moot Court Society</span>
                <button
                  onClick={() => alert("Downloading Best Practice 2 Full Report (PDF)...")}
                  className="inline-flex items-center gap-1.5 text-xs text-gold font-bold hover:underline cursor-pointer"
                >
                  Download Report <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Institutional Distinctiveness Section */}
      <section id="distinctiveness" className="py-16 md:py-24 border-b border-gold/15 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-navy/5 text-gold font-bold text-xs mb-3">
              <Sparkles className="h-4 w-4" /> Criterion 7.3
            </div>
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-navy">
              Institutional Distinctiveness
            </h2>
            <h3 className="text-base md:text-lg font-serif italic text-gold-deep mt-1 mb-6">
              "Empowering Rural and First-Generation Learners into Ethical, Court-Ready Advocates"
            </h3>

            <div className="prose text-navy/80 text-sm md:text-base leading-relaxed space-y-4">
              <p>
                Situated strategically in Knowledge Park - 1, Greater Noida, Janhit College of Law
                holds a uniquely distinctive mission: bridging the deep socioeconomic and educational
                chasm separating first-generation rural youths from world-class legal education and
                courtroom career success.
              </p>
              <p>
                While premier national law schools cater predominantly to privileged urban aspirants,
                Janhit College of Law has intentionally structured its pedagogy, fee architecture,
                bilingual mentorship, and transport connectivity to welcome students from rural
                farming backgrounds, backward classes, and modest suburban families across Gautam
                Buddha Nagar, Bulandshahr, Ghaziabad, and western Uttar Pradesh.
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "1. Affordable World-Class Legal Education",
                  desc: "Transparent fees and comprehensive government scholarship facilitation ensuring no eligible student is turned away due to financial adversity.",
                },
                {
                  title: "2. Bilingual Socratic Classroom Support",
                  desc: "Assisting students from Hindi-medium schooling to master English legal phrasing, Bare Acts, drafting, and national case laws without intimidation.",
                },
                {
                  title: "3. Pro-Bono Social Justice Consciousness",
                  desc: "Instilling deep respect for constitutional morality, civil liberties, and free legal aid for underprivileged rural litigants.",
                },
                {
                  title: "4. Dedicated PCS-J & Judiciary Coaching Cell",
                  desc: "Providing specialized weekend study circles, landmark judgment analysis, and mock interviews for civil judge and prosecution examinations.",
                },
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-navy/5 border border-gold/20 flex flex-col justify-between"
                >
                  <h4 className="font-bold text-navy text-sm mb-1">{point.title}</h4>
                  <p className="text-xs text-navy/85 font-medium leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-navy-deep to-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg font-bold">Institutional Distinctiveness Dossier</h4>
                <p className="text-xs text-white/85 font-medium mt-0.5">
                  Full text submission documented under NAAC Criterion 7.3.
                </p>
              </div>
              <button
                onClick={() => alert("Downloading Institutional Distinctiveness Dossier PDF...")}
                className="px-4 py-2 rounded-lg gradient-gold text-navy-deep font-bold text-xs shadow-gold hover:opacity-95 transition inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" /> Download Full Dossier
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Feedback System Section */}
      <section id="feedback" className="py-16 md:py-24 bg-navy/5 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-gold block mb-1">
              Continuous Improvement
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-navy">
              Stakeholder Feedback System
            </h2>
            <p className="text-navy/85 font-medium text-sm mt-2">
              Structured 360-degree feedback collection, comprehensive analysis, and Action Taken
              Reports (ATR) from Students, Teachers, Alumni, and Legal Employers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gold/30 shadow-lg overflow-hidden">
            {/* Feedback Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-gold/20 text-xs font-bold text-center">
              {[
                { key: "students", label: "Students Feedback", icon: GraduationCap },
                { key: "teachers", label: "Teachers Feedback", icon: Users },
                { key: "alumni", label: "Alumni Feedback", icon: Award },
                { key: "employers", label: "Employers Feedback", icon: Briefcase },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeFeedbackTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveFeedbackTab(tab.key as any)}
                    className={`py-4 px-3 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? "bg-navy text-gold border-b-2 border-gold font-bold shadow-xs"
                        : "bg-navy/5 text-navy/70 hover:bg-gold/10 hover:text-navy"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="p-6 md:p-8">
              {activeFeedbackTab === "students" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-gold/15">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-navy">
                        Student Feedback & Action Taken Report
                      </h3>
                      <p className="text-xs text-navy/85 font-medium mt-0.5">
                        Feedback gathered systematically at end of each semester regarding syllabus
                        coverage, moot court training, and library resources.
                      </p>
                    </div>
                    <span className="text-xs bg-gold/15 text-navy-deep px-3 py-1 rounded-full font-bold">
                      AY 2025–26
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-navy/5 border border-gold/15">
                      <div className="text-xs font-bold text-navy mb-1">
                        Student Feedback Highlight:
                      </div>
                      <p className="text-xs text-navy/85 font-medium leading-relaxed">
                        Students requested expanded weekend access to digital law workstations (SCC
                        Online, AIR) and additional workshops on Hindi-to-English legal translation.
                      </p>
                      <div className="mt-3 pt-2 border-t border-gold/10 text-xs">
                        <strong className="text-green-700">Action Taken by IQAC:</strong> E-library
                        hours extended to 7:00 PM on working Saturdays, and 20 additional online
                        search licenses acquired. Bilingual terminology guest series inaugurated.
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => alert("Downloading Students Feedback Analysis & ATR (PDF)...")}
                      className="px-4 py-2 rounded-lg gradient-gold text-navy-deep font-bold text-xs shadow-gold hover:opacity-95 transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" /> Download Student ATR (PDF)
                    </button>
                    <Link
                      to="/contact#feedback"
                      className="px-4 py-2 rounded-lg bg-navy text-white font-bold text-xs hover:bg-navy-deep transition inline-flex items-center gap-1.5"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-gold" /> Fill Student Feedback Form
                    </Link>
                  </div>
                </div>
              )}

              {activeFeedbackTab === "teachers" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-gold/15">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-navy">
                        Teacher Feedback & Action Taken Report
                      </h3>
                      <p className="text-xs text-navy/85 font-medium mt-0.5">
                        Annual faculty feedback on curriculum updates, academic calendar rigidity,
                        library books, and research funding.
                      </p>
                    </div>
                    <span className="text-xs bg-gold/15 text-navy-deep px-3 py-1 rounded-full font-bold">
                      AY 2025–26
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-navy/5 border border-gold/15">
                      <div className="text-xs font-bold text-navy mb-1">
                        Teacher Feedback Highlight:
                      </div>
                      <p className="text-xs text-navy/85 font-medium leading-relaxed">
                        Faculty recommended inclusion of updated modules covering the newly enacted
                        criminal laws (Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita,
                        Bharatiya Sakshya Adhiniyam).
                      </p>
                      <div className="mt-3 pt-2 border-t border-gold/10 text-xs">
                        <strong className="text-green-700">Action Taken by IQAC:</strong> Special
                        certificate course on New Criminal Laws initiated; relevant Bare Acts and
                        treatises added to the library collection within four weeks.
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => alert("Downloading Teachers Feedback Analysis & ATR (PDF)...")}
                      className="px-4 py-2 rounded-lg gradient-gold text-navy-deep font-bold text-xs shadow-gold hover:opacity-95 transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" /> Download Teacher ATR (PDF)
                    </button>
                    <Link
                      to="/contact#feedback"
                      className="px-4 py-2 rounded-lg bg-navy text-white font-bold text-xs hover:bg-navy-deep transition inline-flex items-center gap-1.5"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-gold" /> Fill Teacher Feedback Form
                    </Link>
                  </div>
                </div>
              )}

              {activeFeedbackTab === "alumni" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-gold/15">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-navy">
                        Alumni Feedback & Action Taken Report
                      </h3>
                      <p className="text-xs text-navy/85 font-medium mt-0.5">
                        Feedback from practicing advocates, corporate counsels, and judicial
                        officers regarding real-world legal skill requirements.
                      </p>
                    </div>
                    <span className="text-xs bg-gold/15 text-navy-deep px-3 py-1 rounded-full font-bold">
                      AY 2025–26
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-navy/5 border border-gold/15">
                      <div className="text-xs font-bold text-navy mb-1">
                        Alumni Feedback Highlight:
                      </div>
                      <p className="text-xs text-navy/85 font-medium leading-relaxed">
                        Alumni highlighted that junior lawyers need deeper training in drafting bail
                        applications, written statements, and consumer court complaints.
                      </p>
                      <div className="mt-3 pt-2 border-t border-gold/10 text-xs">
                        <strong className="text-green-700">Action Taken by IQAC:</strong> Clinical
                        Legal Drafting Workshops introduced as mandatory Saturday clinics with live
                        sample pleadings reviewed by practicing High Court advocates.
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => alert("Downloading Alumni Feedback Analysis & ATR (PDF)...")}
                      className="px-4 py-2 rounded-lg gradient-gold text-navy-deep font-bold text-xs shadow-gold hover:opacity-95 transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" /> Download Alumni ATR (PDF)
                    </button>
                    <Link
                      to="/student-corner#alumni-corner"
                      className="px-4 py-2 rounded-lg bg-navy text-white font-bold text-xs hover:bg-navy-deep transition inline-flex items-center gap-1.5"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-gold" /> Alumni Network Portal
                    </Link>
                  </div>
                </div>
              )}

              {activeFeedbackTab === "employers" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-gold/15">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-navy">
                        Employers & Chambers Feedback & ATR
                      </h3>
                      <p className="text-xs text-navy/85 font-medium mt-0.5">
                        Feedback from Senior Advocates, Law Firms, and Corporate Legal Chambers on
                        graduate work readiness, drafting precision, and ethics.
                      </p>
                    </div>
                    <span className="text-xs bg-gold/15 text-navy-deep px-3 py-1 rounded-full font-bold">
                      AY 2025–26
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-navy/5 border border-gold/15">
                      <div className="text-xs font-bold text-navy mb-1">
                        Employer Feedback Highlight:
                      </div>
                      <p className="text-xs text-navy/85 font-medium leading-relaxed">
                        Recruiting advocates suggested improving students' speed in citation research,
                        courtroom decorum, and familiarity with e-filing portals of High Courts and
                        the Supreme Court.
                      </p>
                      <div className="mt-3 pt-2 border-t border-gold/10 text-xs">
                        <strong className="text-green-700">Action Taken by IQAC:</strong> Added
                        practical e-courts and e-filing modules to the ICT curriculum; organized
                        Court Decorum masterclasses with senior members of the Bar.
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => alert("Downloading Employers Feedback Analysis & ATR (PDF)...")}
                      className="px-4 py-2 rounded-lg gradient-gold text-navy-deep font-bold text-xs shadow-gold hover:opacity-95 transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" /> Download Employer ATR (PDF)
                    </button>
                    <Link
                      to="/placement"
                      className="px-4 py-2 rounded-lg bg-navy text-white font-bold text-xs hover:bg-navy-deep transition inline-flex items-center gap-1.5"
                    >
                      <Briefcase className="h-3.5 w-3.5 text-gold" /> Internship & Placement Cell
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Naac;
