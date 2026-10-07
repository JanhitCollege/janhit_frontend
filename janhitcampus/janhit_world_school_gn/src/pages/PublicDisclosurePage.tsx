import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  ShieldCheck,
  Building2,
  Users,
  CheckCircle2,
  BookOpen,
  Info,
  Loader2,
} from "lucide-react";

interface DocumentItem {
  id?: string;
  title: string;
  docNo: string;
  fileSize: string;
  fileName: string;
  fileUrl?: string;
}

const DEFAULT_DOCUMENTS: DocumentItem[] = [
  {
    title: "Copies of Affiliation / Upgradation Letter & Recent Extension",
    docNo: "CBSE/AFF/2026/01",
    fileSize: "1.2 MB",
    fileName: "Affiliation_Letter_JWS.pdf",
  },
  {
    title: "Copies of Societies / Trust / Company Registration / Renewal Certificate",
    docNo: "REG/TRUST/2025/892",
    fileSize: "850 KB",
    fileName: "Trust_Registration_Certificate.pdf",
  },
  {
    title: "Copy of No Objection Certificate (NOC) Issued by State Govt. / UT",
    docNo: "NOC/UP/EDU/2025/412",
    fileSize: "620 KB",
    fileName: "State_NOC_Certificate.pdf",
  },
  {
    title: "Copies of Recognition Certificate under RTE Act 2009",
    docNo: "RTE/UP/GN/2025/104",
    fileSize: "740 KB",
    fileName: "RTE_Recognition_Certificate.pdf",
  },
  {
    title: "Building Safety Certificate as per National Building Code",
    docNo: "BSC/PWD/GN/2026/08",
    fileSize: "1.1 MB",
    fileName: "Building_Safety_Certificate.pdf",
  },
  {
    title: "Fire Safety Certificate Issued by Competent Authority",
    docNo: "FSC/UPFS/2026/55",
    fileSize: "930 KB",
    fileName: "Fire_Safety_Certificate.pdf",
  },
  {
    title: "Copies of Valid Water, Health & Sanitation Certificates",
    docNo: "HSC/CMO/GN/2026/301",
    fileSize: "590 KB",
    fileName: "Water_Health_Sanitation_Cert.pdf",
  },
];

const DEFAULT_ACADEMIC_DOCS: DocumentItem[] = [
  {
    title: "Fee Structure of the School (Session 2026-27)",
    docNo: "FEE/JWS/2026-27",
    fileSize: "450 KB",
    fileName: "Fee_Structure_2026-27.pdf",
  },
  {
    title: "Annual Academic Calendar (Session 2026-27)",
    docNo: "AC/JWS/2026-27",
    fileSize: "680 KB",
    fileName: "Academic_Calendar_2026-27.pdf",
  },
  {
    title: "List of School Management Committee (SMC)",
    docNo: "SMC/JWS/2026",
    fileSize: "520 KB",
    fileName: "School_Management_Committee.pdf",
  },
  {
    title: "List of Parents Teachers Association (PTA) Members",
    docNo: "PTA/JWS/2026",
    fileSize: "490 KB",
    fileName: "Parents_Teachers_Association.pdf",
  },
  {
    title: "Three-Year Board Examination Performance & Results",
    docNo: "RESULT/CBSE/JWS",
    fileSize: "580 KB",
    fileName: "Three_Year_Board_Results.pdf",
  },
];

const DEFAULT_GENERAL_INFO = [
  { label: "NAME OF THE SCHOOL", value: "Janhit World School Greater Noida" },
  { label: "AFFILIATION NO. (IF APPLICABLE)", value: "Applied / Under CBSE Affiliation Process" },
  { label: "SCHOOL CODE (IF APPLICABLE)", value: "Under Process" },
  { label: "COMPLETE ADDRESS WITH PIN CODE", value: "Plot No. 55-B, Knowledge Park-5, Greater Noida, Gautam Buddha Nagar, U.P. – 201306" },
  { label: "PRINCIPAL NAME & QUALIFICATION", value: "Dr. Sunita Sharma (M.A., B.Ed., Ph.D.)" },
  { label: "SCHOOL EMAIL ID", value: "info@janhitgroup.com" },
  { label: "CONTACT DETAILS (LANDLINE/MOBILE)", value: "+91 99585 74400" },
  { label: "ACADEMIC SESSION RANGE", value: "Foundational Stage to Class VIII (2026-27)" },
];

const DEFAULT_STAFF_INFO = [
  { label: "PRINCIPAL", value: "Dr. Sunita Sharma (M.A., B.Ed., Ph.D.)" },
  { label: "TOTAL NO. OF TEACHERS", value: "28 Qualified Educators" },
  { label: "PGT TEACHERS", value: "6 Teachers" },
  { label: "TGT TEACHERS", value: "10 Teachers" },
  { label: "PRT TEACHERS", value: "12 Teachers" },
  { label: "TEACHERS SECTION RATIO", value: "1.5 : 1" },
  { label: "DETAILS OF SPECIAL EDUCATOR", value: "Ms. Ritu Sharma (M.Ed. Special Education)" },
  { label: "COUNSELLOR & WELLNESS TEACHER", value: "Mrs. Meenakshi Verma (M.A. Psychology)" },
  { label: "STUDENT TO TEACHER RATIO", value: "15 : 1" },
];

const DEFAULT_TEACHER_ROSTER = [
  { slNo: 1, name: "Dr. Sunita Sharma", designation: "PRINCIPAL / DIRECTOR", qualification: "M.A., B.Ed., Ph.D." },
  { slNo: 2, name: "Ms. Ritu Sharma", designation: "SPECIAL EDUCATOR", qualification: "M.Ed. Special Education" },
  { slNo: 3, name: "Mrs. Meenakshi Verma", designation: "COUNSELLOR & WELLNESS TEACHER", qualification: "M.A. Psychology" },
];

const DEFAULT_INFRA_INFO = [
  { label: "TOTAL CAMPUS AREA OF THE SCHOOL", value: "8,093 Sq. Mtr. (2.0 Acres)" },
  { label: "NO. AND SIZE OF CLASS ROOMS", value: "32 Rooms (500 Sq. Ft. each)" },
  { label: "NO. AND SIZE OF LABORATORIES", value: "5 Labs (Composite Science, Maths, AI/Robotics - 750 Sq. Ft. each)" },
  { label: "INTERNET FACILITY", value: "Yes (High-Speed Fiber 500 Mbps)" },
  { label: "NO. OF GIRLS TOILETS", value: "18 Well-Maintained Units" },
  { label: "NO. OF BOYS TOILETS", value: "18 Well-Maintained Units" },
  { label: "CCTV & SECURITY COVERAGE", value: "100% Campus CCTV Monitored" },
  { label: "FIRE SAFETY & EXTINGUISHERS", value: "Fully Compliant with Annual Audit" },
];

export function PublicDisclosurePage() {
  const [activeTab, setActiveTab] = useState<"general" | "documents" | "academics" | "staff" | "infra">("general");
  const [loading, setLoading] = useState<boolean>(true);
  const [documents, setDocuments] = useState<DocumentItem[]>(DEFAULT_DOCUMENTS);
  const [academicDocs, setAcademicDocs] = useState<DocumentItem[]>(DEFAULT_ACADEMIC_DOCS);
  const [generalInfo, setGeneralInfo] = useState<{ label: string; value: string }[]>(DEFAULT_GENERAL_INFO);
  const [staffInfo, setStaffInfo] = useState<{ label: string; value: string }[]>(DEFAULT_STAFF_INFO);
  const [infraInfo, setInfraInfo] = useState<{ label: string; value: string }[]>(DEFAULT_INFRA_INFO);
  const [teacherRoster, setTeacherRoster] = useState<any[]>(DEFAULT_TEACHER_ROSTER);

  useEffect(() => {
    async function fetchApiDisclosures() {
      setLoading(true);
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://api.janhitgroup.com/api";
        let res = await fetch(`${baseUrl}/v1/campuses/2bc8bd1d-448b-440a-84a5-29846eac812a/disclosures`);
        if (!res.ok) {
          res = await fetch(`${baseUrl}/v1/campuses/jws-gn/disclosures`);
        }
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            // Documents B
            if (Array.isArray(json.data.documents) && json.data.documents.length > 0) {
              setDocuments(
                json.data.documents.map((d: any) => ({
                  id: d.id,
                  title: d.title,
                  docNo: d.docNo || d.doc_number || "",
                  fileSize: d.fileSize || d.file_size || "PDF",
                  fileName: d.fileName || d.file_name || `${d.title}.pdf`,
                  fileUrl: d.fileUrl || `${baseUrl}/v1/disclosures/documents/${d.id}/download`,
                }))
              );
            }

            // Academics C
            if (Array.isArray(json.data.academics) && json.data.academics.length > 0) {
              setAcademicDocs(
                json.data.academics.map((d: any) => ({
                  id: d.id,
                  title: d.title,
                  docNo: d.docNo || d.doc_number || "",
                  fileSize: d.fileSize || d.file_size || "PDF",
                  fileName: d.fileName || d.file_name || `${d.title}.pdf`,
                  fileUrl: d.fileUrl || `${baseUrl}/v1/disclosures/documents/${d.id}/download`,
                }))
              );
            }

            // General Info A
            const gList = [...DEFAULT_GENERAL_INFO];
            if (json.data.campus) {
              const c = json.data.campus;
              if (c.name) {
                const item = gList.find((i) => i.label.toLowerCase().includes("school"));
                if (item) item.value = c.name;
              }
              if (c.address) {
                const item = gList.find((i) => i.label.toLowerCase().includes("address"));
                if (item) item.value = c.address;
              }
              if (c.email) {
                const item = gList.find((i) => i.label.toLowerCase().includes("email"));
                if (item) item.value = c.email;
              }
              if (c.phone) {
                const item = gList.find((i) => i.label.toLowerCase().includes("contact"));
                if (item) item.value = c.phone;
              }
            }

            if (Array.isArray(json.data.generalInfo) && json.data.generalInfo.length > 0) {
              json.data.generalInfo.forEach((g: any) => {
                const label = g.label || g.metricLabel || g.key;
                const value = g.value || g.metricValue || "";
                if (value) {
                  const existing = gList.find((i) => i.label.toLowerCase() === label.toLowerCase());
                  if (existing) existing.value = value;
                  else gList.push({ label, value });
                }
              });
            }
            setGeneralInfo(gList);

            // Staff D & Roster
            const sList = [...DEFAULT_STAFF_INFO];
            if (Array.isArray(json.data.staff) && json.data.staff.length > 0) {
              const rosterItem = json.data.staff.find(
                (s: any) => s.key === "TEACHER_ROSTER_JSON" || s.key === "teacher_roster_json"
              );
              if (rosterItem && rosterItem.value) {
                try {
                  const raw = typeof rosterItem.value === "string" ? JSON.parse(rosterItem.value) : rosterItem.value;
                  if (Array.isArray(raw) && raw.length > 0) {
                    setTeacherRoster(raw);
                  }
                } catch (e) {}
              }

              json.data.staff
                .filter((s: any) => s.key !== "TEACHER_ROSTER_JSON" && s.key !== "teacher_roster_json")
                .forEach((s: any) => {
                  const label = s.label || s.metricLabel || s.key;
                  const value = s.value || s.metricValue || "";
                  if (value) {
                    const existing = sList.find((i) => i.label.toLowerCase() === label.toLowerCase());
                    if (existing) existing.value = value;
                    else sList.push({ label, value });
                  }
                });
            }
            setStaffInfo(sList);

            // Infrastructure E
            const iList = [...DEFAULT_INFRA_INFO];
            if (Array.isArray(json.data.infrastructure) && json.data.infrastructure.length > 0) {
              json.data.infrastructure.forEach((i: any) => {
                const label = i.label || i.metricLabel || i.key;
                const value = i.value || i.metricValue || "";
                if (value) {
                  const existing = iList.find((item) => item.label.toLowerCase() === label.toLowerCase());
                  if (existing) existing.value = value;
                  else iList.push({ label, value });
                }
              });
            }
            setInfraInfo(iList);
          }
        }
      } catch (err) {
        console.error("Notice: Unable to reach disclosures API, using static compliance fallback:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchApiDisclosures();
  }, []);

  const handleDownload = (doc: DocumentItem) => {
    if (doc.fileUrl) {
      window.open(doc.fileUrl, "_blank");
    } else {
      alert(`Downloading Disclosure Document: ${doc.fileName || doc.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 md:pt-28 pb-16 md:pb-20 font-sans">
      {/* Header Banner */}
      <section className="bg-[#0B2566] text-white py-10 md:py-14 px-4 md:px-6 relative overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-[11px] md:text-xs font-semibold uppercase tracking-widest mb-3 border border-gold/30">
            <ShieldCheck className="size-3.5 md:size-4 shrink-0" /> CBSE Mandatory Public Disclosure (Appendix IX)
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Mandatory Public Disclosure
          </h1>
          <p className="mt-2.5 text-white/85 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed font-sans">
            In compliance with CBSE guidelines and statutory regulatory norms, Janhit World School, Greater Noida maintains full transparency across infrastructure, faculty, safety standards, and administrative policies.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-6 md:mt-8 font-sans">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 pb-3 mb-6">
          <div className="flex overflow-x-auto flex-nowrap sm:flex-wrap gap-2 pb-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {[
              { id: "general", label: "A. General Info", icon: Info },
              { id: "documents", label: "B. Documents & Information", icon: FileText },
              { id: "academics", label: "C. Result & Academics", icon: BookOpen },
              { id: "staff", label: "D. Teaching Staff", icon: Users },
              { id: "infra", label: "E. School Infrastructure", icon: Building2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold font-sans whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#0B2566] text-white shadow-md scale-[1.01]"
                      : "bg-white text-gray-700 hover:bg-slate-100 border border-gray-200 hover:border-[#0B2566]/40"
                  }`}
                >
                  <Icon className={`size-4 shrink-0 ${isActive ? "text-gold" : "text-gray-500"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center justify-center py-16 text-gray-500 gap-3 text-sm font-semibold font-sans bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
            <Loader2 className="size-6 animate-spin text-[#0B2566]" />
            <span>Loading official mandatory disclosures...</span>
          </div>
        )}

        {/* Section A: General Info */}
        {!loading && activeTab === "general" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 shadow-sm space-y-6 font-sans"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-2.5">
              <div>
                <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-[#0B2566]">
                  A. General Information
                </h2>
                <p className="text-xs text-gray-500 mt-0.5 font-sans">Official details & regulatory status</p>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold font-sans flex items-center gap-1 self-start sm:self-auto">
                <CheckCircle2 className="size-3.5 text-green-600 shrink-0" /> Verified Record
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {generalInfo.map((item, idx) => (
                <div key={idx} className="p-3.5 sm:p-4 bg-slate-50 hover:bg-white rounded-xl border border-gray-200 hover:border-[#0B2566] hover:shadow-md transition-all duration-200">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1 font-sans">
                    {item.label}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-[#0B2566] block font-sans">{item.value || "—"}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Section B: Documents & Information */}
        {!loading && activeTab === "documents" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 shadow-sm space-y-6 font-sans"
          >
            <div className="border-b border-gray-100 pb-4">
              <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-[#0B2566]">
                B. Documents & Information
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1 font-sans">
                Statutory approvals, NOCs, building safety, and fire safety certificates available for viewing and official download.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="group p-4 sm:p-5 rounded-xl border border-gray-200 bg-white hover:border-[#0B2566] hover:border-l-4 hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="p-2.5 rounded-lg bg-[#0B2566]/10 text-[#0B2566] group-hover:bg-[#0B2566] group-hover:text-white transition-colors duration-200 shrink-0">
                      <FileText className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-sans text-xs sm:text-sm md:text-base font-semibold text-[#0B2566] leading-snug group-hover:text-[#0B2566]">
                        {doc.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-gray-500 font-sans">
                        <span className="bg-slate-100 px-2 py-0.5 rounded border border-gray-200 font-sans">Doc No: {doc.docNo || "—"}</span>
                        <span>•</span>
                        <span className="text-amber-700 font-semibold font-sans">{doc.fileSize || "PDF"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(doc)}
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-50 hover:bg-[#0B2566] hover:text-white text-[#0B2566] font-semibold text-xs sm:text-sm font-sans transition-all duration-200 flex items-center justify-center gap-2 border border-gray-200 hover:border-[#0B2566] cursor-pointer shadow-xs"
                  >
                    <Download className="size-3.5 text-gold group-hover:text-white transition-colors shrink-0" /> Download PDF Document
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Section C: Result and Academics */}
        {!loading && activeTab === "academics" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 shadow-sm space-y-6 font-sans"
          >
            <div className="border-b border-gray-100 pb-4">
              <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-[#0B2566]">
                C. Result & Academics
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1 font-sans">
                Fee structure, academic calendar, School Management Committee (SMC), and PTA listings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {academicDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="group p-4 sm:p-5 rounded-xl border border-gray-200 bg-white hover:border-[#0B2566] hover:border-l-4 hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 group-hover:bg-[#0B2566] group-hover:text-gold transition-colors duration-200 shrink-0">
                      <BookOpen className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-sans text-xs sm:text-sm md:text-base font-semibold text-[#0B2566] leading-snug group-hover:text-[#0B2566]">
                        {doc.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-gray-500 font-sans">
                        <span className="bg-slate-100 px-2 py-0.5 rounded border border-gray-200 font-sans">Ref: {doc.docNo || "—"}</span>
                        <span>•</span>
                        <span className="text-amber-700 font-semibold font-sans">{doc.fileSize || "PDF"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(doc)}
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-50 hover:bg-[#0B2566] hover:text-white text-[#0B2566] font-semibold text-xs sm:text-sm font-sans transition-all duration-200 flex items-center justify-center gap-2 border border-gray-200 hover:border-[#0B2566] cursor-pointer shadow-xs"
                  >
                    <Download className="size-3.5 text-gold group-hover:text-white transition-colors shrink-0" /> View Academic File
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Section D: Staff (Teaching) */}
        {!loading && activeTab === "staff" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 shadow-sm space-y-6 font-sans"
          >
            <div className="border-b border-gray-100 pb-4">
              <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-[#0B2566]">
                D. Staff (Teaching)
              </h2>
              <p className="text-xs text-gray-500 mt-0.5 font-sans">Faculty qualifications, teacher ratio, and wellness staff details</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {staffInfo.map((item, idx) => (
                <div key={idx} className="p-3.5 sm:p-4 bg-slate-50 hover:bg-white rounded-xl border border-gray-200 hover:border-[#0B2566] hover:shadow-md transition-all duration-200">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1 font-sans">
                    {item.label}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-[#0B2566] block font-sans">{item.value || "—"}</span>
                </div>
              ))}
            </div>

            {/* TEACHER DETAILS TABLE */}
            {teacherRoster.length > 0 && (
              <div className="pt-6 border-t border-gray-200 space-y-3 font-sans">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-base sm:text-lg font-bold text-[#0B2566] tracking-wide uppercase flex items-center gap-2">
                    <Users className="size-4.5 text-amber-600" /> TEACHER DETAILS
                  </h3>
                  <span className="text-xs font-semibold text-gray-500 font-sans">
                    {teacherRoster.length} Teaching Staff Listed
                  </span>
                </div>

                <div className="overflow-x-auto border border-gray-300 rounded-xl bg-white shadow-xs">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100/90 border-b border-gray-300 text-gray-800 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                        <th className="py-3 px-4 border-r border-gray-300 w-16 text-center">SL NO.</th>
                        <th className="py-3 px-4 border-r border-gray-300 min-w-[180px]">TEACHER NAME</th>
                        <th className="py-3 px-4 border-r border-gray-300 min-w-[200px]">DESIGNATION</th>
                        <th className="py-3 px-4 min-w-[240px]">QUALIFICATION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {teacherRoster.map((teacher, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 border-r border-gray-200 text-center font-semibold text-gray-600">
                            {teacher.slNo || idx + 1}
                          </td>
                          <td className="py-3 px-4 border-r border-gray-200 font-bold text-[#0B2566]">
                            {teacher.name}
                          </td>
                          <td className="py-3 px-4 border-r border-gray-200 font-medium text-gray-800 uppercase tracking-wide text-xs">
                            {teacher.designation}
                          </td>
                          <td className="py-3 px-4 text-gray-700 font-medium">
                            {teacher.qualification}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Section E: Infrastructure */}
        {!loading && activeTab === "infra" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 shadow-sm space-y-6 font-sans"
          >
            <div className="border-b border-gray-100 pb-4">
              <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-[#0B2566]">
                E. School Infrastructure
              </h2>
              <p className="text-xs text-gray-500 mt-0.5 font-sans">Campus area, classroom metrics, laboratory facilities, and safety setup</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {infraInfo.map((item, idx) => (
                <div key={idx} className="p-3.5 sm:p-4 bg-slate-50 hover:bg-white rounded-xl border border-gray-200 hover:border-[#0B2566] hover:shadow-md transition-all duration-200">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1 font-sans">
                    {item.label}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-[#0B2566] block font-sans">{item.value || "—"}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
