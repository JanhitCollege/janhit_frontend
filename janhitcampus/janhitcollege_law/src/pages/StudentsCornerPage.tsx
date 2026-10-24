import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  GraduationCap,
  ShieldCheck,
  Award,
  BookOpen,
  FileText,
  Users,
  Calendar,
  Scale,
  FileCheck,
  Building,
  HelpCircle,
  Download,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  Library,
  HeartHandshake,
  ShieldAlert,
  Search,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import {
  STUDENT_SECTIONS,
  PUBLIC_DISCLOSURE_DOCS,
  AFFILIATION_DATA,
  PROSPECTUS_DETAILS,
  COURSES_DATA,
  SYLLABUS_DOCS,
  CODE_OF_CONDUCT_RULES,
  FACULTY_MEMBERS,
  ALUMNI_INFO,
  RTI_DETAILS,
  ACADEMIC_CALENDAR_EVENTS,
  MANAGEMENT_COMMITTEE_MEMBERS,
  LEGAL_AID_DETAILS,
  ALL_COMMITTEES,
} from "@/data/studentsCornerData";

import baLlbStructurePdf from "@/assets/B.A.LL.B. (Course Structure).pdf";
import baLlbSyllabusPdf from "@/assets/BA-LLB-Syllabus-2026-2027.pdf";
import llbStructurePdf from "@/assets/LL.B. (Course Structure).pdf";
import llbSyllabusPdf from "@/assets/LLB-(course syllabus ) 2026-2027.pdf";

export function StudentsCornerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "all";
  const [selectedTab, setSelectedTab] = useState<string>(initialTab);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>("iqac");
  const [alumniModalOpen, setAlumniModalOpen] = useState<boolean>(false);
  const [alumniForm, setAlumniForm] = useState({ name: "", email: "", phone: "", batch: "", designation: "" });

  // Sync state with URL params
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== selectedTab) {
      setSelectedTab(tab);
      const el = document.getElementById(tab);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [searchParams]);

  const handleTabChange = (tabKey: string, sectionId?: string) => {
    setSelectedTab(tabKey);
    setSearchParams(tabKey === "all" ? {} : { tab: tabKey });
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const handleDownload = (fileName: string, fileUrl?: string | null) => {
    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Downloading ${fileName}`, {
        description: "Official document download initiated.",
      });
    } else {
      toast.info(`Document: ${fileName}`, {
        description: "Document file is available at the administrative registrar desk.",
      });
    }
  };

  const handleAlumniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alumniForm.name || !alumniForm.email || !alumniForm.batch) {
      toast.error("Please fill in required fields (Name, Email, Passing Batch).");
      return;
    }
    toast.success("Alumni Registration Submitted!", {
      description: `Welcome to the Janhit Alumni Jurist Network, ${alumniForm.name}.`,
    });
    setAlumniModalOpen(false);
    setAlumniForm({ name: "", email: "", phone: "", batch: "", designation: "" });
  };

  const filteredFaculty = useMemo(() => {
    if (!searchTerm.trim()) return FACULTY_MEMBERS;
    const q = searchTerm.toLowerCase();
    return FACULTY_MEMBERS.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.role.toLowerCase().includes(q) ||
        f.specialization.toLowerCase().includes(q) ||
        f.department.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const isSectionVisible = (tabKey: string) => {
    if (selectedTab === "all") return true;
    return selectedTab === tabKey;
  };

  const currentCommittee = ALL_COMMITTEES.find((c) => c.id === selectedCommitteeId) || ALL_COMMITTEES[0];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24 font-sans text-navy">
      {/* 1. HERO BANNER */}
      <section className="bg-white text-navy pt-12 pb-10 border-b border-gold/30 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-8">
          {/* Breadcrumb Header */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/40 shadow-xs backdrop-blur-md">
              <GraduationCap className="w-4 h-4 text-gold" />
              <span>Jurist Nexus & Transparency Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy tracking-tight">
              Students Corner
            </h1>

            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold" />
              <span className="w-2.5 h-2.5 rotate-45 border border-gold bg-gold/50" />
              <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold" />
            </div>

            <p className="text-sm md:text-base text-navy/85 font-medium leading-relaxed font-sans max-w-3xl mx-auto">
              Welcome to the centralized student portal of <strong className="text-gold font-bold">Janhit College of Law</strong>,
              Greater Noida. Explore statutory public disclosures, university affiliations, syllabi, clinical legal aid,
              code of conduct, faculty directory, and mandatory institutional committees.
            </p>

            {/* Quick Helplines Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-navy/80">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-gold/25 shadow-xs">
                <AlertOctagon className="w-3.5 h-3.5 text-gold" />
                <span>Anti-Ragging Helpline: <strong className="text-navy font-bold">1800-180-5522</strong></span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-gold/25 shadow-xs">
                <Scale className="w-3.5 h-3.5 text-gold" />
                <span>DLSA Legal Aid Desk: <strong className="text-navy font-bold">Knowledge Park - 1</strong></span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-gold/25 shadow-xs">
                <PhoneCall className="w-3.5 h-3.5 text-gold" />
                <span>Campus Helpline: <strong className="text-navy font-bold">9313402015</strong></span>
              </div>
            </div>
          </div>

          {/* Quick-Filter Navigation Bar (13 Sections) */}
          <div className="pt-4">
            <div className="bg-slate-50 border-2 border-gold/30 rounded-2xl p-2.5 shadow-sm flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <button
                onClick={() => handleTabChange("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedTab === "all"
                    ? "bg-navy text-white shadow-md font-bold scale-102 border border-navy"
                    : "text-navy/70 hover:text-navy hover:bg-white border border-transparent"
                }`}
              >
                All Sections
              </button>
              {STUDENT_SECTIONS.map((sec) => {
                const Icon = sec.icon;
                const isActive = selectedTab === sec.tabKey;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleTabChange(sec.tabKey, sec.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-navy text-white shadow-md font-bold scale-102 border border-navy"
                        : "text-navy/70 hover:text-navy hover:bg-white border border-transparent"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-gold" : "text-gold"}`} />
                    <span>{sec.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-6 pt-12 space-y-16">
        {/* SECTION 1: PUBLIC DISCLOSURE */}
        {isSectionVisible("disclosure") && (
          <section id="public-disclosure" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Statutory Transparency</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                  Public Disclosure
                </h2>
                <p className="text-sm text-navy/85 font-medium max-w-2xl">
                  Mandatory statutory disclosures as prescribed by the Bar Council of India (BCI), Chaudhary Charan Singh University, and University Grants Commission (UGC).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-navy/5 text-navy px-3 py-1.5 rounded-lg border border-gold/20 font-mono">
                  AISHE Code: <strong>C-46134</strong>
                </span>
                <span className="text-xs bg-navy/5 text-navy px-3 py-1.5 rounded-lg border border-gold/20 font-mono">
                  CCSU Code: <strong>969</strong>
                </span>
              </div>
            </div>

            {/* Quick Overview Highlights */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-gold/20 space-y-1">
                <div className="text-xs font-bold text-gold uppercase tracking-wider">Campus Area</div>
                <div className="text-xl font-bold font-serif text-navy">5+ Acres</div>
                <div className="text-xs text-navy/60">Knowledge Park-1, Greater Noida</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-gold/20 space-y-1">
                <div className="text-xs font-bold text-gold uppercase tracking-wider">Regulatory Council</div>
                <div className="text-xl font-bold font-serif text-navy">BCI, New Delhi</div>
                <div className="text-xs text-navy/60">Under Advocates Act, 1961</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-gold/20 space-y-1">
                <div className="text-xs font-bold text-gold uppercase tracking-wider">Affiliating University</div>
                <div className="text-xl font-bold font-serif text-navy">CCSU Meerut</div>
                <div className="text-xs text-navy/60">State University, NAAC A++</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-gold/20 space-y-1">
                <div className="text-xs font-bold text-gold uppercase tracking-wider">Compliance Status</div>
                <div className="text-xl font-bold font-serif text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Approved</span>
                </div>
                <div className="text-xs text-navy/60">Session 2026-2027 Validated</div>
              </div>
            </div>

            {/* Public Disclosure Documents List */}
            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
                <FileText className="w-4 h-4 text-gold" />
                <span>Statutory Compliance Documents & Sanctions</span>
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {PUBLIC_DISCLOSURE_DOCS.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-gold/20 bg-white hover:border-gold hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold/15 text-navy border border-gold/30">
                          {doc.category}
                        </span>
                        <span className="text-xs font-mono text-navy/50">{doc.docNo}</span>
                      </div>
                      <h4 className="font-bold text-navy text-sm group-hover:text-gold transition-colors">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-navy/85 font-medium leading-relaxed">
                        {doc.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gold/10 flex items-center justify-between">
                      <span className="text-xs text-navy/50 font-medium">Size: {doc.fileSize}</span>
                      <button
                        onClick={() => handleDownload(doc.fileName, doc.fileUrl)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy text-white hover:bg-gold hover:text-navy text-xs font-bold transition-all cursor-pointer shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: AFFILIATION - B.A.LL.B., LLB & LL.M. */}
        {isSectionVisible("affiliation") && (
          <section id="affiliation" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="space-y-1.5 border-b border-gold/15 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                <Award className="w-3.5 h-3.5 text-gold" />
                <span>Statutory Approvals</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                Affiliation - B.A.LL.B., LLB and LL.M.
              </h2>
              <p className="text-sm text-navy/85 font-medium max-w-3xl">
                Janhit College of Law holds official statutory recognition from the Bar Council of India (BCI) and permanent affiliation with Chaudhary Charan Singh (CCS) University, Meerut for all its law programs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {AFFILIATION_DATA.map((prog, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-gold/30 bg-gradient-to-b from-white to-slate-50 p-6 flex flex-col justify-between space-y-5 hover:border-gold hover:shadow-lg transition-all"
                >
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-navy text-gold inline-block">
                        {prog.status}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-navy">{prog.courseName}</h3>
                      <p className="text-xs text-gold font-semibold">{prog.degreeType}</p>
                    </div>

                    <div className="space-y-2.5 text-xs text-navy/80 pt-2 border-t border-gold/15">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-navy/60">Affiliated To:</span>
                        <span className="text-right font-medium text-navy">{prog.affiliatedUniversity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-navy/60">College Code:</span>
                        <span className="font-bold text-navy font-mono">{prog.collegeCode}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-navy/60">Statutory Body:</span>
                        <span className="text-right font-medium text-navy">{prog.statutoryApproval}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-navy/60">Sanctioned Intake:</span>
                        <span className="font-bold text-navy bg-gold/15 px-2 py-0.5 rounded text-navy-deep">{prog.sanctionedIntake}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-navy/60">Validity Period:</span>
                        <span className="font-medium text-emerald-700">{prog.validity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gold/20 text-[11px] text-navy/70 bg-white p-3 rounded-xl border border-gold/15">
                    <strong>Eligibility:</strong> {prog.eligibility}
                  </div>
                </div>
              ))}
            </div>

            {/* BCI Regulatory Declaration Note */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-xs text-amber-950">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Advocate Enrollment Eligibility:</strong> All graduates passing out from Janhit College of Law in B.A. LL.B. and LL.B. are automatically eligible to register as Advocates under the Advocates Act, 1961 with the Bar Council of Uttar Pradesh, Delhi Bar Council, or any State Bar Council across India to practice before all District Courts, High Courts, and the Supreme Court of India.
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: COLLEGE PROSPECTUS */}
        {isSectionVisible("prospectus") && (
          <section id="prospectus" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                  <BookOpen className="w-3.5 h-3.5 text-gold" />
                  <span>Information Brochure</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                  College Prospectus
                </h2>
                <p className="text-sm text-navy/85 font-medium max-w-2xl">
                  Download the official Janhit College of Law Prospectus & Information Brochure for the academic session 2026-2027.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleDownload("Janhit_Law_College_Prospectus_2026-27.pdf", baLlbSyllabusPdf)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-navy-deep font-bold text-xs uppercase tracking-wider shadow-md hover:bg-gold/90 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Prospectus (PDF)</span>
                </button>
                <Link
                  to="/apply"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-navy-deep transition-all"
                >
                  <span>Apply Online</span>
                  <ChevronRight className="w-4 h-4 text-gold" />
                </Link>
              </div>
            </div>

            {/* Prospectus Layout Cards */}
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 bg-gradient-to-br from-navy-deep to-navy text-white rounded-3xl p-8 border border-gold/30 shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/15 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-white/10 px-3 py-1 rounded-full border border-gold/30 inline-block">
                    {PROSPECTUS_DETAILS.session}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {PROSPECTUS_DETAILS.title}
                  </h3>
                  <p className="text-xs text-white/85 font-medium">
                    {PROSPECTUS_DETAILS.pagesCount} • {PROSPECTUS_DETAILS.format}
                  </p>
                </div>

                <div className="space-y-3 text-xs text-white/85 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Complete B.A. LL.B., LL.B., & LL.M. Course Guides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Moot Court, DLSA Legal Clinic & Internship Framework</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Fee Structure, Concessions & UP Govt Scholarship Matrix</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Faculty Directory, Campus Amenities & Hostel Rules</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload("Janhit_Law_Prospectus_2026-27.pdf", baLlbSyllabusPdf)}
                  className="w-full py-3 rounded-xl bg-gold text-navy-deep font-bold text-xs uppercase tracking-wider text-center shadow-lg hover:bg-gold/90 transition-all cursor-pointer"
                >
                  Get Digital Copy Now
                </button>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {PROSPECTUS_DETAILS.highlights.map((h, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-gold/20 space-y-1.5 hover:border-gold transition-colors">
                    <h4 className="font-bold text-navy text-sm font-serif">{h.title}</h4>
                    <p className="text-xs text-navy/85 font-medium leading-relaxed">{h.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: COURSES / PROGRAMS */}
        {isSectionVisible("courses") && (
          <section id="courses" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="space-y-1.5 border-b border-gold/15 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                <GraduationCap className="w-3.5 h-3.5 text-gold" />
                <span>Academic Curricula</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                Courses / Programs
              </h2>
              <p className="text-sm text-navy/85 font-medium max-w-3xl">
                Premier law programs combining high-level academic theory with clinical legal education, court visits, mock trials, and Bar Council requirements.
              </p>
            </div>

            <div className="space-y-8">
              {COURSES_DATA.map((c) => (
                <div
                  key={c.id}
                  className="rounded-3xl border-2 border-gold/25 hover:border-gold p-6 md:p-8 bg-slate-50/50 shadow-sm transition-all space-y-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-gold/20 text-navy-deep border border-gold/40">
                        {c.duration} • {c.seats}
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-navy mt-1.5">{c.name}</h3>
                      <p className="text-xs text-gold font-semibold">{c.affiliation}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      {c.pdfDownload && (
                        <button
                          onClick={() => handleDownload(c.pdfName || `${c.name}.pdf`, c.pdfDownload)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gold/30 text-navy hover:bg-gold hover:text-navy text-xs font-bold transition-all cursor-pointer shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5 text-gold" />
                          <span>Course PDF</span>
                        </button>
                      )}
                      <Link
                        to="/apply"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy text-white hover:bg-navy-deep text-xs font-bold transition-all shadow-sm"
                      >
                        <span>Apply For {c.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gold" />
                      </Link>
                    </div>
                  </div>

                  <p className="text-sm text-navy/85 font-medium leading-relaxed font-sans">{c.overview}</p>

                  <div className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-3 bg-white p-5 rounded-2xl border border-gold/15 shadow-2xs">
                      <h4 className="font-serif font-bold text-sm text-navy flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold" />
                        <span>Key Program Highlights</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-navy/75">
                        {c.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 bg-white p-5 rounded-2xl border border-gold/15 shadow-2xs">
                      <h4 className="font-serif font-bold text-sm text-navy flex items-center gap-2">
                        <Scale className="w-4 h-4 text-gold" />
                        <span>Career Prospects & Practice Paths</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-navy/75">
                        {c.careerOpportunities.map((opp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                            <span>{opp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="text-xs bg-gold/10 p-3.5 rounded-xl border border-gold/25 text-navy">
                    <strong className="text-navy font-semibold">Eligibility Criteria:</strong> {c.eligibility}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: SYLLABUS */}
        {isSectionVisible("syllabus") && (
          <section id="syllabus" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="space-y-1.5 border-b border-gold/15 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                <FileText className="w-3.5 h-3.5 text-gold" />
                <span>Course Structures & Syllabi</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                Syllabus
              </h2>
              <p className="text-sm text-navy/85 font-medium max-w-3xl">
                Official syllabus booklets, paper-wise distribution, landmark case citations, and clinical training outlines issued by CCS University Meerut and Bar Council of India.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SYLLABUS_DOCS.map((doc, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-gold/25 bg-slate-50/50 p-6 flex flex-col justify-between space-y-4 hover:border-gold hover:shadow-md transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold/20 text-navy border border-gold/30">
                        {doc.program}
                      </span>
                      <span className="text-xs text-navy/50">{doc.semesters}</span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-navy group-hover:text-gold transition-colors">
                      {doc.courseTitle}
                    </h3>

                    <p className="text-xs text-navy/85 font-medium leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gold/15 flex items-center justify-between">
                    <span className="text-xs font-mono text-navy/50">{doc.fileSize}</span>
                    <button
                      onClick={() => handleDownload(doc.fileName, doc.fileUrl)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-navy text-white hover:bg-gold hover:text-navy text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Practical Papers Notice */}
            <div className="p-5 rounded-2xl bg-slate-100/80 border border-gold/25 space-y-2">
              <h4 className="font-serif font-bold text-sm text-navy flex items-center gap-2">
                <Scale className="w-4 h-4 text-gold" />
                <span>Bar Council of India Clinical Papers (Compulsory Practical Modules)</span>
              </h4>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-navy/80 pt-1">
                <div className="p-2.5 rounded-lg bg-white border border-gold/15">
                  <strong>Clinical Paper I:</strong> Drafting, Pleading & Conveyancing
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-gold/15">
                  <strong>Clinical Paper II:</strong> Professional Ethics & Bar-Bench Relations
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-gold/15">
                  <strong>Clinical Paper III:</strong> Alternative Dispute Resolution (ADR)
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-gold/15">
                  <strong>Clinical Paper IV:</strong> Moot Court Exercise & Internship Diary
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 6: CODE OF CONDUCT */}
        {isSectionVisible("code-of-conduct") && (
          <section id="code-of-conduct" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="space-y-1.5 border-b border-gold/15 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                <ShieldAlert className="w-3.5 h-3.5 text-gold" />
                <span>Institutional Charter</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                Code of Conduct
              </h2>
              <p className="text-sm text-navy/85 font-medium max-w-3xl">
                Janhit College of Law upholds high ethical standards, advocate courtroom decorum, and strict compliance with university attendance ordinances.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {CODE_OF_CONDUCT_RULES.map((sec, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-gold/25 bg-slate-50/60 p-6 space-y-4 hover:border-gold transition-colors shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-gold/15 pb-3">
                    <h3 className="font-serif font-bold text-base text-navy">{sec.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold/20 text-navy border border-gold/30">
                      {sec.badge}
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-navy/80">
                    {sec.rules.map((rule, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-navy text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-gold shrink-0" />
                <div className="text-xs">
                  <strong className="text-gold block font-serif text-sm">Strict Zero-Tolerance for Harassment</strong>
                  Ragging, eve-teasing, or gender harassment is strictly prohibited and punished with immediate rustication and police filing.
                </div>
              </div>
              <a
                href="tel:18001805522"
                className="px-4 py-2 rounded-xl bg-gold text-navy-deep font-bold text-xs uppercase tracking-wider shrink-0 shadow-md hover:bg-gold/90"
              >
                Helpline: 1800-180-5522
              </a>
            </div>
          </section>
        )}

        {/* SECTION 7: FACULTY LIST */}
        {isSectionVisible("faculty-list") && (
          <section id="faculty-list" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                  <Users className="w-3.5 h-3.5 text-gold" />
                  <span>Faculty Directory</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                  Faculty List
                </h2>
                <p className="text-sm text-navy/85 font-medium max-w-2xl">
                  Distinguished legal scholars, seasoned advocate professors, and judicial mentors teaching across B.A. LL.B., LL.B., and LL.M.
                </p>
              </div>

              {/* Live Search */}
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search faculty, subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gold/30 bg-slate-50 text-xs text-navy focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredFaculty.map((f, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-gold/20 hover:border-gold bg-slate-50/50 p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center font-serif font-bold text-lg border border-gold/30 shrink-0 shadow-sm group-hover:bg-navy-deep">
                        <Scale className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-sm text-navy group-hover:text-gold transition-colors leading-tight">
                          {f.name}
                        </h3>
                        <p className="text-[11px] font-bold text-gold uppercase tracking-wider mt-0.5">
                          {f.role}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-navy/75 pt-2 border-t border-gold/15">
                      <div className="text-[11px] text-navy/60 font-medium">{f.department}</div>
                      <div className="font-semibold text-navy text-[11px]">{f.qualification}</div>
                      <div className="text-[11px] text-navy/70">Exp: {f.experience}</div>
                      <div className="text-[11px] text-gold/90 font-medium pt-1">
                        Specialization: {f.specialization}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gold/10 flex items-center justify-between text-[11px]">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold/15 text-navy">
                      {f.status}
                    </span>
                    <a
                      href={`mailto:${f.email}`}
                      className="text-navy hover:text-gold font-medium flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3 text-gold" />
                      <span>Contact</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 8: ALUMNI ASSOCIATION */}
        {isSectionVisible("alumni") && (
          <section id="alumni" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                  <HeartHandshake className="w-3.5 h-3.5 text-gold" />
                  <span>Jurist Brotherhood</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                  Alumni Association
                </h2>
                <p className="text-sm text-navy/85 font-medium max-w-2xl">
                  {ALUMNI_INFO.associationName} — connecting {ALUMNI_INFO.membershipCount} judges, senior litigators, and corporate counsels.
                </p>
              </div>

              <button
                onClick={() => setAlumniModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-navy-deep font-bold text-xs uppercase tracking-wider shadow-md hover:bg-gold/90 transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Join Alumni Network</span>
              </button>
            </div>

            {/* Alumni Distribution Metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ALUMNI_INFO.notableSectors.map((sec, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-gold/20 space-y-2 hover:border-gold transition-colors">
                  <div className="text-xs font-bold text-gold uppercase tracking-wider">{sec.title}</div>
                  <div className="text-xl font-serif font-bold text-navy">{sec.count}</div>
                  <p className="text-xs text-navy/85 font-medium leading-relaxed">{sec.desc}</p>
                </div>
              ))}
            </div>

            {/* Alumni Initiatives */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-navy to-navy-deep text-white border border-gold/30 space-y-4">
              <h3 className="font-serif text-lg font-bold text-gold flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                <span>Alumni Mentorship & Placement Initiatives</span>
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-white/85">
                {ALUMNI_INFO.activities.map((act, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 9: RTI */}
        {isSectionVisible("rti") && (
          <section id="rti" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="space-y-1.5 border-b border-gold/15 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                <FileCheck className="w-3.5 h-3.5 text-gold" />
                <span>Statutory Transparency</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                RTI (Right to Information)
              </h2>
              <p className="text-sm text-navy/85 font-medium max-w-3xl">
                {RTI_DETAILS.actName}. Janhit College of Law is committed to complete public transparency under the statutory framework of the RTI Act, 2005.
              </p>
            </div>

            {/* Designated Officers Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {RTI_DETAILS.officers.map((off, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-gold/30 bg-slate-50/70 p-6 space-y-4 hover:border-gold transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-navy text-gold inline-block">
                      {off.role}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-navy">{off.name}</h3>
                    <p className="text-xs text-gold font-semibold">{off.designation}</p>
                  </div>

                  <div className="space-y-2 text-xs text-navy/80 pt-2 border-t border-gold/15">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <span>{off.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{off.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                      <a href={`mailto:${off.email}`} className="text-navy hover:text-gold font-semibold underline">
                        {off.email}
                      </a>
                    </div>
                  </div>

                  <p className="text-[11px] text-navy/85 font-medium bg-white p-3 rounded-xl border border-gold/15">
                    <strong>Functions:</strong> {off.responsibilities}
                  </p>
                </div>
              ))}
            </div>

            {/* Application Procedure Guide */}
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
              <h3 className="font-serif text-sm font-bold text-amber-950 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-700" />
                <span>Procedure to File an RTI Application</span>
              </h3>
              <ol className="space-y-2 text-xs text-amber-900/90 list-decimal pl-5">
                {RTI_DETAILS.procedure.map((step, sIdx) => (
                  <li key={sIdx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* SECTION 10: ACADEMIC CALENDAR */}
        {isSectionVisible("academic-calendar") && (
          <section id="academic-calendar" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  <span>Session Timeline 2026-27</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                  Academic Calendar
                </h2>
                <p className="text-sm text-navy/85 font-medium max-w-2xl">
                  Annual calendar of teaching, mid-terms, intra-college moot courts, DLSA legal aid camps, court visits, and university semester examinations.
                </p>
              </div>

              <button
                onClick={() => handleDownload("Janhit_Academic_Calendar_2026-27.pdf", baLlbStructurePdf)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy text-white hover:bg-gold hover:text-navy text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Calendar PDF</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {ACADEMIC_CALENDAR_EVENTS.map((phase, pIdx) => (
                <div
                  key={pIdx}
                  className="rounded-2xl border border-gold/30 bg-slate-50/70 p-6 space-y-5"
                >
                  <div className="border-b border-gold/20 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold px-2.5 py-0.5 rounded-full bg-navy inline-block">
                      {phase.duration}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-navy mt-1.5">{phase.phase}</h3>
                  </div>

                  <div className="space-y-3">
                    {phase.milestones.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gold/15"
                      >
                        <span className="w-24 text-[11px] font-bold text-gold font-mono shrink-0 pt-0.5">
                          {m.month}
                        </span>
                        <span className="text-xs text-navy/85 leading-relaxed">{m.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 11: MANAGEMENT COMMITTEE */}
        {isSectionVisible("management") && (
          <section id="management" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="space-y-1.5 border-b border-gold/15 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                <Building className="w-3.5 h-3.5 text-gold" />
                <span>Institutional Governance</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                Management Committee
              </h2>
              <p className="text-sm text-navy/85 font-medium max-w-3xl">
                The Board of Management and Governing Trust of Janhit College of Law steering strategic institutional leadership, academic expansion, and philanthropic education.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {MANAGEMENT_COMMITTEE_MEMBERS.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-gold/20 hover:border-gold bg-slate-50/50 p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-all group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold/15 text-navy border border-gold/30 inline-block">
                      {m.designation}
                    </span>
                    <h3 className="font-serif font-bold text-base text-navy group-hover:text-gold transition-colors leading-tight">
                      {m.name}
                    </h3>
                    <p className="text-[11px] text-gold font-semibold">{m.body}</p>
                    <p className="text-xs text-navy/60 italic">{m.qualification}</p>
                  </div>

                  <p className="text-xs text-navy/85 font-medium pt-3 border-t border-gold/15 leading-relaxed">
                    {m.profile}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 12: LEGAL AID (COMMITTEE MEMBERS) */}
        {isSectionVisible("legal-aid") && (
          <section id="legal-aid" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                  <Scale className="w-3.5 h-3.5 text-gold" />
                  <span>Clinical Education</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                  Legal Aid (Committee Members)
                </h2>
                <p className="text-sm text-navy/85 font-medium max-w-2xl">
                  {LEGAL_AID_DETAILS.clinicName} — established in collaboration with the {LEGAL_AID_DETAILS.affiliatedWith}.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs bg-navy/5 px-3 py-1.5 rounded-xl border border-gold/20 text-navy font-medium">
                <PhoneCall className="w-3.5 h-3.5 text-gold" />
                <span>Free Helpline: 9313402015</span>
              </div>
            </div>

            {/* Clinic Core Mission */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gold/20 space-y-3">
              <h3 className="font-serif font-bold text-sm text-navy flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Core Objectives & Free Community Services</span>
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-navy/80">
                {LEGAL_AID_DETAILS.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-gold/15">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Committee Members Grid */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-navy flex items-center gap-2">
                <Users className="w-4 h-4 text-gold" />
                <span>Legal Aid Clinic Committee Members</span>
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {LEGAL_AID_DETAILS.committeeMembers.map((mem, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-gold/20 hover:border-gold shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-2 group"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold/15 text-navy inline-block">
                        {mem.role}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-navy mt-1 group-hover:text-gold transition-colors">
                        {mem.name}
                      </h4>
                    </div>
                    <p className="text-xs text-navy/85 font-medium leading-relaxed border-t border-gold/10 pt-2">
                      {mem.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 13: COMMITTEES (ALL 9 STATUTORY BODIES) */}
        {isSectionVisible("committees") && (
          <section id="committees" className="scroll-mt-24 space-y-8 bg-white border border-gold/25 rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="space-y-1.5 border-b border-gold/15 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                <HelpCircle className="w-3.5 h-3.5 text-gold" />
                <span>Statutory Governance</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                Committees
              </h2>
              <p className="text-sm text-navy/85 font-medium max-w-3xl">
                Mandatory statutory, regulatory, and student welfare bodies functioning at Janhit College of Law in accordance with BCI, UGC, and CCSU norms.
              </p>
            </div>

            {/* Committee Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {ALL_COMMITTEES.map((comm) => {
                const Icon = comm.icon;
                const isSelected = selectedCommitteeId === comm.id;
                return (
                  <button
                    key={comm.id}
                    onClick={() => setSelectedCommitteeId(comm.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-navy text-white shadow-md border-b-2 border-gold scale-102"
                        : "bg-slate-50 text-navy/70 hover:bg-gold/15 hover:text-navy border border-gold/20"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-gold" : "text-navy/50"}`} />
                    <span>{comm.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Committee Detailed View */}
            <div className="rounded-3xl border-2 border-gold/30 bg-slate-50/70 p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/20 pb-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-gold/20 text-navy-deep border border-gold/40">
                    {currentCommittee.badge}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-navy mt-1.5">{currentCommittee.fullName}</h3>
                  <p className="text-xs text-navy/85 font-medium mt-1 max-w-2xl">{currentCommittee.purpose}</p>
                </div>

                <div className="space-y-1 text-xs text-navy/80 bg-white p-4 rounded-2xl border border-gold/20 shadow-2xs">
                  <div>
                    <span className="font-semibold text-navy/60">Chairperson:</span>{" "}
                    <strong className="text-navy">{currentCommittee.chairperson}</strong>
                  </div>
                  <div>
                    <span className="font-semibold text-navy/60">Convener / In-Charge:</span>{" "}
                    <span className="text-gold font-bold">{currentCommittee.coordinator}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Members list */}
                <div className="bg-white p-5 rounded-2xl border border-gold/15 space-y-3">
                  <h4 className="font-serif font-bold text-sm text-navy flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold" />
                    <span>Committee Members</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-navy/80">
                    {currentCommittee.members.map((mem, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span>{mem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Responsibilities */}
                <div className="bg-white p-5 rounded-2xl border border-gold/15 space-y-3">
                  <h4 className="font-serif font-bold text-sm text-navy flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <span>Key Functions & Responsibilities</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-navy/80">
                    {currentCommittee.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Grid of All 9 Committees for fast reference */}
            <div className="space-y-3 pt-4">
              <h4 className="font-serif text-sm font-bold text-navy text-center uppercase tracking-wider text-gold">
                All 9 Mandatory Committees at a Glance
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {ALL_COMMITTEES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCommitteeId(c.id);
                      const el = document.getElementById("committees");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedCommitteeId === c.id
                        ? "bg-navy text-white border-gold shadow-md"
                        : "bg-white hover:bg-slate-50 border-gold/20 text-navy"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center justify-between">
                      <span>{c.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <div className="text-[11px] opacity-75 truncate mt-0.5">{c.fullName}</div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ALUMNI REGISTRATION MODAL */}
      {alumniModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border-2 border-gold/40 space-y-6 relative">
            <div className="flex items-center justify-between border-b border-gold/20 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/15 px-2.5 py-0.5 rounded">
                  JCLAA Network
                </span>
                <h3 className="text-xl font-serif font-bold text-navy mt-1">Alumni Association Registration</h3>
              </div>
              <button
                onClick={() => setAlumniModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-gold hover:text-navy text-navy/70 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAlumniSubmit} className="space-y-4 text-xs text-navy">
              <div>
                <label className="block font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Adv. / Mr. / Ms."
                  value={alumniForm.name}
                  onChange={(e) => setAlumniForm({ ...alumniForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 bg-slate-50 focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="advocate@bar.org"
                    value={alumniForm.email}
                    onChange={(e) => setAlumniForm({ ...alumniForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 bg-slate-50 focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91"
                    value={alumniForm.phone}
                    onChange={(e) => setAlumniForm({ ...alumniForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 bg-slate-50 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Passing Batch / Year *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2021 (B.A. LL.B.)"
                    value={alumniForm.batch}
                    onChange={(e) => setAlumniForm({ ...alumniForm, batch: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 bg-slate-50 focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Current Designation / Chamber</label>
                  <input
                    type="text"
                    placeholder="Advocate, High Court / Judicial Officer"
                    value={alumniForm.designation}
                    onChange={(e) => setAlumniForm({ ...alumniForm, designation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 bg-slate-50 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gold text-navy-deep font-bold text-xs uppercase tracking-wider shadow-md hover:bg-gold/90 transition-all cursor-pointer"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
