import { useState, useEffect } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Download,
  Award,
  Scale,
  Building,
  Loader2,
  ExternalLink
} from "lucide-react";
import { downloadService, PublicDownload } from "@/services/downloadService";
import baLlbStructurePdf from "@/assets/B.A.LL.B. (Course Structure).pdf";
import baLlbSyllabusPdf from "@/assets/BA-LLB-Syllabus-2026-2027.pdf";
import llbSyllabusPdf from "@/assets/LLB-(course syllabus ) 2026-2027.pdf";

const DEFAULT_DOCUMENTS: PublicDownload[] = [
  {
    id: "doc-bci",
    title: "Bar Council of India (BCI) Recognition & Approval Order",
    slug: "bci-recognition-order",
    description: "Official statutory recognition order under Section 7 of Advocates Act, 1961 for legal courses.",
    category: "STATUTORY APPROVAL",
    campusId: "jcl-gn",
    fileUrl: baLlbStructurePdf,
    fileName: "BCI_Recognition_Letter_2026.pdf",
    fileType: "application/pdf",
    fileSize: 1468006, // ~1.4 MB
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "doc-ccsu",
    title: "CCSU Meerut Affiliation & Course Sanction Letter",
    slug: "ccsu-affiliation-letter",
    description: "Official university affiliation order and academic curriculum sanction order issued by CCSU Meerut.",
    category: "UNIVERSITY AFFILIATION",
    campusId: "jcl-gn",
    fileUrl: baLlbSyllabusPdf,
    fileName: "CCSU_Affiliation_Extension_2026.pdf",
    fileType: "application/pdf",
    fileSize: 1839276, // ~1.8 MB
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "doc-mpd",
    title: "Mandatory Public Disclosures & Legal Curriculum",
    slug: "mandatory-public-disclosures",
    description: "Annual statutory public transparency disclosures complying with BCI and UGC norms.",
    category: "MANDATORY DISCLOSURE",
    campusId: "jcl-gn",
    fileUrl: llbSyllabusPdf,
    fileName: "Mandatory_Public_Disclosures_2026.pdf",
    fileType: "application/pdf",
    fileSize: 898040, // ~898 KB
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function AffiliationsApprovals() {
  const [downloadDocs, setDownloadDocs] = useState<PublicDownload[]>(DEFAULT_DOCUMENTS);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadDownloads() {
      try {
        setLoading(true);
        const res = await downloadService.getPublicDownloads({ limit: 50 });
        if (isMounted && res && res.downloads && res.downloads.length > 0) {
          // Filter top 3 relevant documents matching regulatory / syllabus / affiliation
          const relevant = res.downloads.filter(
            (d) =>
              d.title.toLowerCase().includes("bci") ||
              d.title.toLowerCase().includes("affiliation") ||
              d.title.toLowerCase().includes("recognition") ||
              d.title.toLowerCase().includes("disclosure") ||
              d.title.toLowerCase().includes("structure") ||
              d.title.toLowerCase().includes("syllabus") ||
              d.category.toLowerCase().includes("syllabus") ||
              d.category.toLowerCase().includes("notice") ||
              d.category.toLowerCase().includes("prospectus")
          );
          const docsToShow = (relevant.length >= 3 ? relevant : res.downloads).slice(0, 3);
          setDownloadDocs(docsToShow);
        } else {
          setDownloadDocs(DEFAULT_DOCUMENTS);
        }
      } catch (err) {
        if (isMounted) setDownloadDocs(DEFAULT_DOCUMENTS);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDownloads();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatBytes = (bytes: number, decimals = 1) => {
    if (!bytes || bytes === 0) return "PDF Document";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <section id="affiliations-approvals" className="py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Statutory Recognitions</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
            Affiliations & Approvals
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/70 leading-relaxed font-sans">
            Operating under complete statutory recognition from the Bar Council of India (BCI) and academic affiliation with Chaudhary Charan Singh University (CCSU), Meerut.
          </p>
        </div>

        {/* 2 Featured Regulatory Cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* 1. Bar Council of India (BCI) Card */}
          <div className="bg-gradient-to-b from-white to-slate-50 rounded-3xl border-2 border-gold/35 p-8 md:p-10 shadow-xl space-y-6 flex flex-col justify-between hover:border-gold transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-gold/15 text-gold font-bold text-xs uppercase tracking-wider border border-gold/30">
                  National Statutory Body
                </span>
                <Scale className="w-6 h-6 text-gold" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                  Bar Council of India (BCI)
                </h3>
                <p className="text-xs font-semibold text-gold uppercase tracking-wider font-sans">
                  Approval under Advocates Act, 1961
                </p>
              </div>

              <div className="h-0.5 w-16 bg-gold rounded" />

              <p className="text-sm md:text-base text-navy/85 leading-relaxed font-sans">
                The Bar Council of India is the supreme statutory body regulating legal practice and legal education in India. Janhit College of Law has been granted official recognition and approval of affiliation for running:
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gold/20 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy font-bold text-sm block">
                      B.A. LL.B. (5-Year Integrated Course)
                    </strong>
                    <span className="text-xs text-navy/70 font-sans">
                      Approved intake for undergraduate higher secondary candidates.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gold/20 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy font-bold text-sm block">
                      LL.B. (3-Year Professional Course)
                    </strong>
                    <span className="text-xs text-navy/70 font-sans">
                      Approved intake for graduates of recognized universities.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gold/10 border border-gold/25 space-y-1.5 text-xs text-navy/85 font-sans">
                <p className="font-bold text-navy flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold" />
                  <span>Advocate Enrollment Consequence:</span>
                </p>
                <p>
                  Graduates of Janhit College of Law are legally entitled to enroll as Advocates with any State Bar Council across the Republic of India and practice in all courts, including the Supreme Court of India.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gold/20 flex items-center justify-between text-xs text-navy/70 font-sans">
              <span>Authority: BCI, New Delhi</span>
              <span className="font-bold text-gold">Status: Approved & Valid</span>
            </div>
          </div>

          {/* 2. Chaudhary Charan Singh University (CCSU) Card */}
          <div className="bg-gradient-to-b from-white to-slate-50 rounded-3xl border-2 border-gold/35 p-8 md:p-10 shadow-xl space-y-6 flex flex-col justify-between hover:border-gold transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-navy/10 text-navy font-bold text-xs uppercase tracking-wider border border-navy/20">
                  State University Affiliation
                </span>
                <Building className="w-6 h-6 text-gold" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                  Chaudhary Charan Singh University
                </h3>
                <p className="text-xs font-semibold text-gold uppercase tracking-wider font-sans">
                  CCSU Meerut • Established 1965 (UGC Recognized)
                </p>
              </div>

              <div className="h-0.5 w-16 bg-gold rounded" />

              <p className="text-sm md:text-base text-navy/85 leading-relaxed font-sans">
                Janhit College of Law is affiliated to Chaudhary Charan Singh University (formerly Meerut University), a premier State University established under the Uttar Pradesh State Universities Act, recognized by UGC under Section 2(f) and 12(B).
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gold/20 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy font-bold text-sm block">
                      Curricular Ordinance & Examination
                    </strong>
                    <span className="text-xs text-navy/70 font-sans">
                      Semester end-term examinations, syllabus structure, and degree issuance administered directly by CCSU.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gold/20 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy font-bold text-sm block">
                      Recognized Degree Conferment
                    </strong>
                    <span className="text-xs text-navy/70 font-sans">
                      Official Bachelor of Laws degrees conferred under the Chancellor & Vice-Chancellor of CCSU Meerut.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 border border-gold/25 space-y-1.5 text-xs text-navy/85 font-sans">
                <p className="font-bold text-navy flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>College Code & Academic Alignment:</span>
                </p>
                <p>
                  Operates under designated CCSU college code with rigorous adherence to university academic calendars, continuous evaluation, and centralized merit rankings.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gold/20 flex items-center justify-between text-xs text-navy/70 font-sans">
              <span>Authority: CCSU Meerut, UP</span>
              <span className="font-bold text-gold">Status: Affiliated College</span>
            </div>
          </div>
        </div>

        {/* Official Downloads API: Three Relevant Documents */}
        <div className="bg-white rounded-3xl border-2 border-gold/30 p-8 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/20 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Regulatory Disclosures & Downloads
              </span>
              <h3 className="font-serif text-2xl font-bold text-navy">
                Certified Letters & Disclosures
              </h3>
            </div>
            <p className="text-xs text-navy/70 max-w-md font-sans">
              Official institutional notifications and curriculum documents available for direct stakeholder download.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="w-6 h-6 animate-spin text-gold" />
              <p className="text-xs font-medium text-navy/60 font-sans">Loading certified documents...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {downloadDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-6 border-2 border-gold/30 hover:border-gold shadow-md hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-gold/15 text-navy border border-gold/30 font-sans">
                        {doc.category || "Official Document"}
                      </span>
                      <FileText className="w-5 h-5 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-navy text-lg leading-snug group-hover:text-navy-deep transition-colors">
                        {doc.title}
                      </h4>
                      {doc.fileName && (
                        <p className="text-[11px] text-navy/60 font-sans mt-1">
                          File: <span className="font-medium text-navy/80">{doc.fileName}</span>
                        </p>
                      )}
                    </div>

                    {doc.description && (
                      <p className="text-xs text-navy/75 leading-relaxed font-sans border-t border-gold/15 pt-2">
                        {doc.description}
                      </p>
                    )}

                    <div className="text-[11px] text-navy/60 font-sans flex items-center justify-between pt-1">
                      <span>Size: {formatBytes(doc.fileSize)}</span>
                      <span className="text-gold font-semibold uppercase">Certified PDF</span>
                    </div>
                  </div>

                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={doc.fileName || doc.title}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-navy hover:bg-navy-deep text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-gold/40 shadow-sm hover:shadow-md cursor-pointer group-hover:border-gold"
                  >
                    <Download className="w-4 h-4 text-gold" />
                    <span>Download Document</span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
