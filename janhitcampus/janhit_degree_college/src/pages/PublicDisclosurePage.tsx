import { FileText, Download, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { PUBLIC_DISCLOSURES } from "@/data/peopleAndOrgData";
import { COLLEGE_INFO } from "@/data/collegeInfo";

export function PublicDisclosurePage() {
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

          {/* Document Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {PUBLIC_DISCLOSURES.map((doc, idx) => (
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

                <a
                  href={doc.link}
                  download
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading Statutory Document: ${doc.title}`);
                  }}
                  className="px-4 py-2 rounded gradient-gold text-navy-deep font-bold text-xs shadow hover:shadow-md transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Document</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
