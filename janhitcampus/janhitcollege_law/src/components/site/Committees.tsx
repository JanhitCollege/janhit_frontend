import { ShieldCheck, UserCheck, AlertOctagon, HelpCircle } from "lucide-react";

const committeeList = [
  {
    icon: AlertOctagon,
    title: "Anti-Ragging Committee",
    description:
      "Janhit College of Law maintains a strict zero-tolerance policy towards ragging. The committee monitors student behavior, conducts sensitization, and addresses any concerns instantly.",
    head: "Dr. Ashok Kumar Sharma (Presiding Officer)",
  },
  {
    icon: HelpCircle,
    title: "Grievance Redressal Cell",
    description:
      "Formed to address student queries, general infrastructure issues, and academic grievances. Ensures a highly transparent, friendly, and objective solution matrix.",
    head: "Ms. Priyanka Chaudhary (Convener)",
  },
  {
    icon: UserCheck,
    title: "Legal Aid & Awareness Committee",
    description:
      "Coordinates free consulting drives in association with DLSA, creates legal awareness camps in rural spots, and allows students to participate in social activism.",
    head: "Ms. Neha Dwivedi (In-Charge)",
  },
  {
    icon: ShieldCheck,
    title: "Internal Complaint Committee (ICC)",
    description:
      "Ensures safety, equality, and dignity of female students and staff members. Handles matters relating to gender discrimination and harassment, as per POSH Act guidelines.",
    head: "Ms. Priyanka Chaudhary (Presiding Officer)",
  },
];

export function Committees() {
  return (
    <section id="committees" className="py-20 bg-beige/30 border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">
            Regulatory Compliance
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            College Committees
          </h2>
          <div className="h-1 w-20 bg-gold mx-auto rounded" />
          <p className="text-sm text-navy/70">
            Mandatory committees established in accordance with BCI, UGC, and CCS University
            regulations to ensure a safe, ethical campus environment.
          </p>
        </div>

        {/* Committees Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {committeeList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gold/15 p-6 rounded-xl shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-navy/5 text-navy rounded-lg">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-navy">{item.title}</h3>
                </div>
                <p className="text-base text-navy/70 leading-relaxed">{item.description}</p>
                <div className="pt-2 border-t border-gold/10 flex justify-between items-center text-xs text-navy/60 font-semibold uppercase tracking-wider">
                  <span>Contact In-Charge:</span>
                  <span className="text-gold">{item.head}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
