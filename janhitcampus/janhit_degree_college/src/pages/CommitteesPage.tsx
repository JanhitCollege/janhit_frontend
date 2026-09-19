import { ShieldAlert, Users, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { COMMITTEES_DATA, CommitteeItem } from "@/data/peopleAndOrgData";

export function CommitteesPage() {
  return (
    <>
      <SEO
        title="College Committees & Boards | Janhit Degree College Saharanpur"
        description="Learn about academic and statutory committees at Janhit Degree College Saharanpur: Anti-Ragging Committee, Women Cell, Internal Quality, and Exam Board."
      />

      <Breadcrumb
        title="Academic & Statutory Committees"
        items={[{ label: "Committees" }]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold block">
              Governance & Discipline
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy">
              Institutional Committees & Bodies
            </h1>
            <div className="gold-divider w-24" />
            <p className="text-sm text-navy/70 leading-relaxed">
              In accordance with UGC, NCTE, and CCS University regulations, Janhit Degree College maintains active committees for campus safety, anti-ragging compliance, academic quality, and student welfare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMMITTEES_DATA.map((item: CommitteeItem) => (
              <div
                key={item.id}
                className="bg-beige/30 p-6 rounded-xl border border-gold/30 shadow-sm hover-lift space-y-4"
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="h-6 w-6 text-gold shrink-0" />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-navy">{item.name}</h3>
                    <span className="text-xs text-navy/70 font-medium">
                      Convener: {item.convener}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-navy/80 bg-white p-4 rounded-lg border border-gold/20">
                  <span className="font-bold text-navy block text-[11px] uppercase tracking-wider text-gold">
                    Committee Members
                  </span>
                  <ul className="space-y-1">
                    {item.members.map((mem, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-gold shrink-0" />
                        <span>{mem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs text-navy/75 leading-relaxed pt-1">
                  <span className="font-bold text-navy block mb-1">Responsibilities & Scope:</span>
                  <span>{item.responsibilities}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
