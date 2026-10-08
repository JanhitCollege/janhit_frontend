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

export function PublicDisclosurePage() {
  const [activeTab, setActiveTab] = useState<"general" | "documents" | "academics" | "staff" | "infra">("general");
  const [loading, setLoading] = useState<boolean>(true);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [academicDocs, setAcademicDocs] = useState<DocumentItem[]>([]);
  const [generalInfo, setGeneralInfo] = useState<{ label: string; value: string }[]>([]);
  const [staffInfo, setStaffInfo] = useState<{ label: string; value: string }[]>([]);
  const [infraInfo, setInfraInfo] = useState<{ label: string; value: string }[]>([]);
  const [teacherRoster, setTeacherRoster] = useState<any[]>([]);

  useEffect(() => {
    async function fetchApiDisclosures() {
      setLoading(true);
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://api.janhitgroup.com/api";
        // Call backend GET API for Janhit World School Greater Noida (UUID: 2bc8bd1d-448b-440a-84a5-29846eac812a)
        let res = await fetch(`${baseUrl}/v1/campuses/2bc8bd1d-448b-440a-84a5-29846eac812a/disclosures`);
        if (!res.ok) {
          res = await fetch(`${baseUrl}/v1/campuses/jws-gn/disclosures`);
        }
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            // 1. Documents B (Statutory PDF Files from Database)
            if (Array.isArray(json.data.documents)) {
              setDocuments(
                json.data.documents.map((d: any) => ({
                  id: d.id,
                  title: d.title,
                  docNo: d.docNo || d.doc_number || "—",
                  fileSize: d.fileSize || d.file_size || "PDF",
                  fileName: d.fileName || d.file_name || `${d.title}.pdf`,
                  fileUrl: d.fileUrl || `${baseUrl}/v1/disclosures/documents/${d.id}/download`,
                }))
              );
            } else {
              setDocuments([]);
            }

            // 2. Academics C (Result & Academics Files from Database)
            if (Array.isArray(json.data.academics)) {
              setAcademicDocs(
                json.data.academics.map((d: any) => ({
                  id: d.id,
                  title: d.title,
                  docNo: d.docNo || d.doc_number || "—",
                  fileSize: d.fileSize || d.file_size || "PDF",
                  fileName: d.fileName || d.file_name || `${d.title}.pdf`,
                  fileUrl: d.fileUrl || `${baseUrl}/v1/disclosures/documents/${d.id}/download`,
                }))
              );
            } else {
              setAcademicDocs([]);
            }

            // 3. General Info A (from Database)
            if (Array.isArray(json.data.generalInfo)) {
              setGeneralInfo(
                json.data.generalInfo.map((g: any) => {
                  const val = g.value !== undefined && g.value !== null ? String(g.value).trim() : "";
                  return {
                    label: g.label || g.metricLabel || g.key,
                    value: val !== "" ? val : "—",
                  };
                })
              );
            } else {
              setGeneralInfo([]);
            }

            // 4. Staff D & Teacher Roster (from Database)
            let parsedRoster: any[] = [];
            if (json.data.teacherRoster) {
              try {
                const raw = typeof json.data.teacherRoster === "string" ? JSON.parse(json.data.teacherRoster) : json.data.teacherRoster;
                if (Array.isArray(raw)) parsedRoster = raw;
              } catch (e) {
                parsedRoster = [];
              }
            } else if (json.data.teacher_roster) {
              try {
                const raw = typeof json.data.teacher_roster === "string" ? JSON.parse(json.data.teacher_roster) : json.data.teacher_roster;
                if (Array.isArray(raw)) parsedRoster = raw;
              } catch (e) {
                parsedRoster = [];
              }
            }

            if (Array.isArray(json.data.staff)) {
              if (parsedRoster.length === 0) {
                const rosterItem = json.data.staff.find(
                  (s: any) =>
                    s.key === "TEACHER_ROSTER_JSON" ||
                    s.key === "teacher_roster_json" ||
                    s.key === "TEACHER_ROSTER" ||
                    s.key === "teacher_roster"
                );
                if (rosterItem && rosterItem.value) {
                  try {
                    const raw = typeof rosterItem.value === "string" ? JSON.parse(rosterItem.value) : rosterItem.value;
                    if (Array.isArray(raw)) parsedRoster = raw;
                  } catch (e) {
                    parsedRoster = [];
                  }
                }
              }

              setStaffInfo(
                json.data.staff
                  .filter(
                    (s: any) =>
                      s.key !== "TEACHER_ROSTER_JSON" &&
                      s.key !== "teacher_roster_json" &&
                      s.key !== "TEACHER_ROSTER" &&
                      s.key !== "teacher_roster"
                  )
                  .map((s: any) => {
                    const val = s.value !== undefined && s.value !== null ? String(s.value).trim() : "";
                    return {
                      label: s.label || s.metricLabel || s.key,
                      value: val !== "" ? val : "—",
                    };
                  })
              );
            } else {
              setStaffInfo([]);
            }

            setTeacherRoster(parsedRoster);

            // 5. Infrastructure E (from Database)
            if (Array.isArray(json.data.infrastructure)) {
              setInfraInfo(
                json.data.infrastructure.map((i: any) => {
                  const val = i.value !== undefined && i.value !== null ? String(i.value).trim() : "";
                  return {
                    label: i.label || i.metricLabel || i.key,
                    value: val !== "" ? val : "—",
                  };
                })
              );
            } else {
              setInfraInfo([]);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching public disclosures from GET API:", err);
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
            <span>Loading official mandatory disclosures from database...</span>
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

            {generalInfo.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-gray-200">
                <Info className="size-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-600 font-sans">No general information metrics saved yet in database.</p>
              </div>
            ) : (
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
            )}
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
                Statutory approvals, NOCs, building safety, and fire safety certificates uploaded via admin panel.
              </p>
            </div>

            {documents.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-gray-200">
                <FileText className="size-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-600 font-sans">No statutory certificates or documents uploaded yet for this branch.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc, idx) => (
                  <div
                    key={doc.id || idx}
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
                          <span className="bg-slate-100 px-2 py-0.5 rounded border border-gray-200 font-sans">Doc No: {doc.docNo}</span>
                          <span>•</span>
                          <span className="text-amber-700 font-semibold font-sans">{doc.fileSize}</span>
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
            )}
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
                Fee structure, academic calendar, School Management Committee (SMC), and PTA listings uploaded via admin panel.
              </p>
            </div>

            {academicDocs.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-gray-200">
                <BookOpen className="size-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-600 font-sans">No result or academic disclosure files uploaded yet for this branch.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {academicDocs.map((doc, idx) => (
                  <div
                    key={doc.id || idx}
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
                          <span className="bg-slate-100 px-2 py-0.5 rounded border border-gray-200 font-sans">Ref: {doc.docNo}</span>
                          <span>•</span>
                          <span className="text-amber-700 font-semibold font-sans">{doc.fileSize}</span>
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
            )}
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
              <p className="text-xs text-gray-500 mt-0.5 font-sans">Faculty qualifications, teacher ratio, and wellness staff details saved in database</p>
            </div>

            {staffInfo.length === 0 && teacherRoster.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-gray-200">
                <Users className="size-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-600 font-sans">No teaching staff metrics or roster configured yet in database.</p>
              </div>
            ) : (
              <>
                {staffInfo.length > 0 && (
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
                )}

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
                                {teacher.slNo || teacher.sl_no || teacher.sNo || teacher.s_no || idx + 1}
                              </td>
                              <td className="py-3 px-4 border-r border-gray-200 font-bold text-[#0B2566]">
                                {teacher.name || teacher.teacherName || teacher.teacher_name || teacher.fullName || "—"}
                              </td>
                              <td className="py-3 px-4 border-r border-gray-200 font-medium text-gray-800 uppercase tracking-wide text-xs">
                                {teacher.designation || teacher.role || teacher.post || "—"}
                              </td>
                              <td className="py-3 px-4 text-gray-700 font-medium">
                                {teacher.qualification || teacher.qualifications || teacher.edu || "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
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
              <p className="text-xs text-gray-500 mt-0.5 font-sans">Campus area, classroom metrics, laboratory facilities, and safety setup saved in database</p>
            </div>

            {infraInfo.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-gray-200">
                <Building2 className="size-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-600 font-sans">No school infrastructure metrics saved yet in database.</p>
              </div>
            ) : (
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
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
