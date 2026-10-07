import { useState, useEffect } from "react";
import { FileText, Download, ShieldCheck, CheckCircle2, Users } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { PUBLIC_DISCLOSURES } from "@/data/peopleAndOrgData";
import { COLLEGE_INFO } from "@/data/collegeInfo";

const defaultTeacherRoster: any[] = [];

export function PublicDisclosurePage() {
  const [disclosures, setDisclosures] = useState<any[]>(PUBLIC_DISCLOSURES);
  const [teacherRoster, setTeacherRoster] = useState(defaultTeacherRoster);

  useEffect(() => {
    async function fetchApiDisclosures() {
      try {
        const stored = localStorage.getItem("janhit_teachers_jdc-saharanpur");
        if (stored) {
          try { setTeacherRoster(JSON.parse(stored)); } catch (e) {}
        }

        const baseUrl = import.meta.env.VITE_API_URL || "https://api.janhitgroup.com/api";
        const res = await fetch(`${baseUrl}/v1/campuses/jdc-saharanpur/disclosures`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const allDocs = [...(json.data.documents || []), ...(json.data.academics || [])];
            if (allDocs.length > 0) {
              setDisclosures(
                allDocs.map((d: any) => ({
                  title: d.title,
                  fileSize: d.fileSize || "1.2 MB",
                  link: `${baseUrl}/v1/disclosures/documents/${d.id}/download`,
                }))
              );
            }
            if (json.data.staff?.length > 0) {
              const rosterItem = json.data.staff.find((s: any) => s.key === "TEACHER_ROSTER_JSON");
              if (rosterItem && rosterItem.value) {
                try { setTeacherRoster(JSON.parse(rosterItem.value)); } catch (e) {}
              }
            }
          }
        }
      } catch (err) {
        // Fallback to static data
      }
    }
    fetchApiDisclosures();
  }, []);

  const handleDownload = (doc: any) => {
    if (doc.link && doc.link.startsWith("http")) {
      window.open(doc.link, "_blank");
    } else {
      alert(`Downloading Statutory Document: ${doc.title}`);
    }
  };

  return (
    <>
      <SEO
        title="Public Disclosure & Statutory Documents | Janhit Degree College Saharanpur"
        description="Mandatory public disclosures, NCTE recognition orders, building safety NOCs, and CCS University affiliation documents for Janhit Degree College Saharanpur."
      />

      <Breadcrumb
        title="Mandatory Public Disclosures"
        items={[{ label: "Public Disclosure" }]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold block">
              Regulatory Transparency
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy">
              Public Disclosure & Approval Records
            </h1>
            <div className="gold-divider w-24" />
            <p className="text-sm text-navy/70 leading-relaxed">
              In compliance with National Council for Teacher Education (NCTE), UGC norms, and Ch. Charan Singh University regulations, Janhit Degree College maintains transparent statutory records.
            </p>
          </div>

          {/* Quick Info Box */}
          <div className="bg-beige/50 p-6 rounded-xl border border-gold/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold text-navy">
            <div className="flex items-center gap-2.5 bg-white p-4 rounded border border-gold/20">
              <ShieldCheck className="h-5 w-5 text-gold shrink-0" />
              <div>
                <span className="text-navy/60 block text-[10px] uppercase">College Name</span>
                <span>{COLLEGE_INFO.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white p-4 rounded border border-gold/20">
              <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
              <div>
                <span className="text-navy/60 block text-[10px] uppercase">Affiliated To</span>
                <span>CCSU Meerut</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white p-4 rounded border border-gold/20">
              <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
              <div>
                <span className="text-navy/60 block text-[10px] uppercase">Approved By</span>
                <span>NCTE, New Delhi</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white p-4 rounded border border-gold/20">
              <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
              <div>
                <span className="text-navy/60 block text-[10px] uppercase">Establishment Year</span>
                <span>2010</span>
              </div>
            </div>
          </div>

          {/* TEACHER DETAILS TABLE */}
          <div className="pt-4 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="font-serif text-xl font-bold text-navy flex items-center gap-2">
                <Users className="h-5 w-5 text-gold" /> TEACHER DETAILS
              </h2>
              <span className="text-xs font-semibold text-gray-500">
                {teacherRoster.length} Teaching Staff Members
              </span>
            </div>

            <div className="overflow-x-auto border border-gold/20 rounded-xl bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-100/90 border-b border-gray-300 text-navy font-bold uppercase tracking-wider text-[11px] md:text-xs">
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
                      <td className="py-3 px-4 border-r border-gray-200 font-bold text-navy">
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

          {/* Document Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {disclosures.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-gold/20 shadow-sm hover-lift flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-6 w-6 text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-base font-bold text-navy">{doc.title}</h3>
                    <span className="text-xs text-navy/60">PDF Format • {doc.fileSize}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(doc)}
                  className="px-4 py-2 rounded gradient-gold text-navy-deep font-bold text-xs shadow hover:shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Document</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
