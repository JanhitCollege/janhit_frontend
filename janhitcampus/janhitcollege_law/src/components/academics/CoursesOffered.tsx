import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Clock,
  CheckCircle2,
  Download,
  ArrowRight,
  Scale,
  Users,
  Award,
  Sparkles,
  FileCheck,
} from "lucide-react";

import ballbStructure from "@/assets/B.A.LL.B. (Course Structure).pdf";
import llbStructure from "@/assets/LL.B. (Course Structure).pdf";

export function CoursesOffered() {
  const [activeCourse, setActiveCourse] = useState<"ballb" | "llb" | "llm">("ballb");

  const courses = [
    {
      id: "ballb",
      badge: "5-Year Integrated Program",
      name: "B.A. LL.B.",
      fullName: "Bachelor of Arts & Bachelor of Laws (Integrated)",
      duration: "5 Years (10 Semesters)",
      eligibility: "10+2 / Intermediate in any stream (Gen: 45%, OBC: 42%, SC/ST: 40%)",
      affiliation: "CCSU Meerut • Approved by Bar Council of India (BCI)",
      seats: "120 Seats",
      overview:
        "An integrated honors curriculum bridging Liberal Arts (Political Science, Sociology, History, Economics) with substantive jurisprudence, courtroom mooting, and clinical advocacy from day one.",
      highlights: [
        "Direct entry into law after Class 12, saving one academic year",
        "Comprehensive training in Constitutional, Criminal, Corporate, and International Law",
        "Mandatory 20 weeks of court, chamber, and NGO internships across 5 years",
        "Regular moot court drills, client counseling, and legal drafting workshops",
        "Eligibility to enroll directly as an Advocate with any State Bar Council in India",
      ],
      careerProspects: [
        "Advocate in High Courts & Supreme Court of India",
        "Judicial Magistrate / Civil Judge (PCS-J Exams)",
        "Corporate Legal Counsel & Compliance Officer",
        "Public Prosecutor & State Legal Services Authority Officer",
      ],
      pdfDownload: ballbStructure,
      pdfName: "B.A. LL.B. Course Structure.pdf",
    },
    {
      id: "llb",
      badge: "3-Year Graduate Program",
      name: "LL.B.",
      fullName: "Bachelor of Laws (Professional Degree)",
      duration: "3 Years (6 Semesters)",
      eligibility: "Graduation in any discipline (B.A., B.Sc., B.Com., B.Tech) with Gen: 45%, OBC: 42%, SC/ST: 40%",
      affiliation: "CCSU Meerut • Approved by Bar Council of India (BCI)",
      seats: "120 Seats",
      overview:
        "The flagship professional law degree designed for graduates aspiring to enter the legal profession, corporate law chambers, judiciary, and public legal services with intensive procedural training.",
      highlights: [
        "Accelerated professional curriculum designed specifically for graduates",
        "In-depth focus on procedural codes (CPC, CrPC/BNSS, Evidence/BSA) and substantive law",
        "Mandatory 12 weeks of structured legal internships in law chambers and courts",
        "Active participation in District Legal Services Authority (DLSA) legal aid clinics",
        "Rigorous trial advocacy and drafting of petitions, plaints, and conveyancing deeds",
      ],
      careerProspects: [
        "Litigation Specialist in Civil, Criminal, and Taxation Bars",
        "State Judicial Services (Judicial Magistrate / Munsif)",
        "Law Officer in Nationalized Banks, PSUs, and Corporate Entities",
        "Legal Advisor for Real Estate, Labour, and Industrial Tribunals",
      ],
      pdfDownload: llbStructure,
      pdfName: "LL.B. Course Structure.pdf",
    },
    {
      id: "llm",
      badge: "Postgraduate Research",
      name: "LL.M.",
      fullName: "Master of Laws (Proposed / Advanced Specialization)",
      duration: "2 Years / 1 Year (Postgraduate)",
      eligibility: "LL.B. (3 Years) or B.A. LL.B. (5 Years) with minimum 50% marks from a recognized university",
      affiliation: "Proposed under CCSU Meerut / Regulatory Norms",
      seats: "Proposed Intake",
      overview:
        "An advanced postgraduate program cultivating specialized legal scholars, constitutional researchers, and prospective law professors through deep comparative jurisprudence and research methodology.",
      highlights: [
        "Advanced specialization streams in Constitutional, Corporate, and Criminal Jurisprudence",
        "Comprehensive research methodology and mandatory master's dissertation",
        "Pedagogical training and university teaching apprenticeship",
        "Analysis of emerging legal areas: Cyber Jurisprudence, AI & Law, IPR, and Environmental Governance",
        "Preparation for UGC-NET / JRF and Higher Judicial Services",
      ],
      careerProspects: [
        "Assistant Professor & Academic Researcher in Law Universities",
        "Higher Judicial Services (District Judge Cadre)",
        "Senior Legal Consultant to Think Tanks and Regulatory Bodies",
        "Specialized Arbitrator & Corporate M&A Legal Advisor",
      ],
      pdfDownload: null,
      pdfName: null,
    },
  ];

  const currentCourse = courses.find((c) => c.id === activeCourse) || courses[0];

  return (
    <section id="courses-offered" className="py-16 md:py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <BookOpen className="w-3.5 h-3.5 text-gold" />
            <span>Programs of Study</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
            Courses Offered
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/85 font-medium leading-relaxed font-sans">
            BCI-recognized professional degree programs designed to provide solid jurisprudential grounding,
            advocacy expertise, and ethical commitment.
          </p>
        </div>

        {/* Course Switcher Tabs */}
        <div className="flex justify-center">
          <div className="bg-slate-50 border-2 border-gold/30 p-1.5 rounded-2xl shadow-md flex flex-wrap justify-center gap-1.5">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setActiveCourse(course.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeCourse === course.id
                    ? "bg-navy text-white shadow-lg border border-gold/40"
                    : "text-navy/70 hover:text-navy hover:bg-white"
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${activeCourse === course.id ? "text-gold" : "text-navy/50"}`} />
                <span>{course.name}</span>
                {course.id === "llm" && (
                  <span className="text-[9px] bg-gold/20 text-navy font-semibold px-1.5 py-0.5 rounded border border-gold/30 ml-1">
                    Proposed
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Course Card */}
        <div className="bg-white rounded-3xl border-2 border-gold/35 p-6 md:p-10 shadow-xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-bl-full pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gold/20 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                  {currentCourse.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-navy/10 text-navy font-bold text-xs uppercase tracking-wider border border-navy/20">
                  {currentCourse.affiliation}
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-navy">
                {currentCourse.fullName}
              </h3>
              <p className="text-xs md:text-sm text-gold font-bold uppercase tracking-wider font-sans">
                Approved Intake: {currentCourse.seats} • Knowledge Park-1, Greater Noida
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {currentCourse.pdfDownload && (
                <a
                  href={currentCourse.pdfDownload}
                  download={currentCourse.pdfName || "Course-Structure.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border-2 border-gold/40 text-navy hover:border-gold hover:bg-gold/10 font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4 text-gold" />
                  <span>Course Structure PDF</span>
                </a>
              )}
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy hover:bg-navy-deep text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md border border-gold/40 group cursor-pointer"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-gold/25 space-y-1">
              <span className="text-[11px] font-bold text-gold uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>Program Duration</span>
              </span>
              <p className="font-serif font-bold text-navy text-lg">{currentCourse.duration}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-gold/25 space-y-1 lg:col-span-2">
              <span className="text-[11px] font-bold text-gold uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <FileCheck className="w-3.5 h-3.5 text-gold" />
                <span>Eligibility Norms</span>
              </span>
              <p className="font-sans font-semibold text-navy text-xs md:text-sm">
                {currentCourse.eligibility}
              </p>
            </div>
          </div>

          {/* Overview Prose */}
          <div className="space-y-2">
            <h4 className="font-serif text-xl font-bold text-navy flex items-center gap-2">
              <Scale className="w-5 h-5 text-gold" />
              <span>Program Architecture & Vision</span>
            </h4>
            <p className="text-sm md:text-base text-navy/85 font-medium leading-relaxed font-sans">
              {currentCourse.overview}
            </p>
          </div>

          {/* Two-Column Grid: Highlights & Career Prospects */}
          <div className="grid md:grid-cols-2 gap-6 pt-2">
            {/* Key Academic Features */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-gold/25 space-y-4">
              <h4 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
                <Award className="w-4 h-4 text-gold" />
                <span>Academic & Clinical Highlights</span>
              </h4>
              <ul className="space-y-2.5">
                {currentCourse.highlights.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-navy/85 font-medium font-sans">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Opportunities */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-gold/25 space-y-4">
              <h4 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
                <Users className="w-4 h-4 text-gold" />
                <span>Career & Professional Pathways</span>
              </h4>
              <ul className="space-y-2.5">
                {currentCourse.careerProspects.map((career, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-navy/85 font-medium font-sans">
                    <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{career}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
