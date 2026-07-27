import { ShieldAlert, CheckCircle, FileText, ExternalLink } from "lucide-react";

export function Disclosures() {
  return (
    <section id="disclosures" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Public Disclosure
              </span>
              <h2 className="text-3xl font-serif font-bold text-navy">
                Affiliations & Approval Certificates
              </h2>
              <div className="h-1 w-20 bg-gold rounded" />
            </div>

            <p className="text-sm text-navy/80 leading-relaxed">
              Janhit College of Law maintains high academic standards and operates under official
              regulatory approvals. All academic courses, infrastructures, and student-intake counts
              are certified by state and national councils.
            </p>

            {/* Certs list */}
            <div className="space-y-4">
              <div className="flex gap-3 bg-background border border-gold/15 p-4 rounded-lg">
                <CheckCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy text-sm">
                    Bar Council of India (BCI) Approval
                  </h4>
                  <p className="text-xs text-navy/60 mt-0.5">
                    Recognized and approved by the BCI, New Delhi, allowing graduates to register as
                    Advocates in any Bar Council of India.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 bg-background border border-gold/15 p-4 rounded-lg">
                <CheckCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy text-sm">CCSU Meerut Affiliation</h4>
                  <p className="text-xs text-navy/60 mt-0.5">
                    Affiliated to Chaudhary Charan Singh University, Meerut. Exams and degrees are
                    certified and issued by the university.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Files */}
          <div className="lg:col-span-5 bg-navy-deep text-white p-6 md:p-8 rounded-2xl border border-gold/20 shadow-xl space-y-5">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <ShieldAlert className="h-5 w-5 text-gold" />
              <h3 className="font-serif text-lg font-bold text-gold">Compliance Disclosures</h3>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              In compliance with BCI guidelines, the following administrative records and approvals
              are maintained publicly:
            </p>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center bg-white/5 border border-white/10 px-4 py-2.5 rounded text-xs">
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gold" />
                  <span>BCI Recognition Letter</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-gold cursor-pointer flex items-center gap-0.5 hover:text-white transition-colors">
                  <span>View</span>
                  <ExternalLink className="h-3 w-3" />
                </span>
              </div>

              <div className="flex justify-between items-center bg-white/5 border border-white/10 px-4 py-2.5 rounded text-xs">
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gold" />
                  <span>CCSU Affiliation Letter</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-gold cursor-pointer flex items-center gap-0.5 hover:text-white transition-colors">
                  <span>View</span>
                  <ExternalLink className="h-3 w-3" />
                </span>
              </div>

              <div className="flex justify-between items-center bg-white/5 border border-white/10 px-4 py-2.5 rounded text-xs">
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gold" />
                  <span>Mandatory Public Disclosures</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-gold cursor-pointer flex items-center gap-0.5 hover:text-white transition-colors">
                  <span>View</span>
                  <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
