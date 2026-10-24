import { Award } from "lucide-react";

export function ExaminationSystem() {
  const assessmentStructure = [
    {
      title: "External University Theory Examination",
      weightage: "70% - 80% Weightage",
      desc: "Administered at the end of each semester under central CCSU Meerut notifications. External question papers evaluated through centralized university evaluation centres to ensure absolute grading neutrality.",
    },
    {
      title: "Continuous Internal Assessment (CIE)",
      weightage: "20% - 30% Weightage",
      desc: "Conducted continuously during the semester through mid-term written tests, research case-studies, presentation seminars, and classroom engagement evaluated by faculty mentors.",
    },
    {
      title: "Practical Clinical Viva-Voce Examination",
      weightage: "Mandatory Clinical Board",
      desc: "Held on campus for the 4 Clinical Legal Education papers before an external university-appointed board comprising senior advocates, judicial scholars, and CCSU examiners.",
    },
  ];

  return (
    <section id="examination-system" className="py-16 md:py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>Statutory Academic Ordinances</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
            Examination System
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/85 font-medium leading-relaxed font-sans">
            Evaluation framework governed by Chaudhary Charan Singh University statutes and BCI Rules of
            Legal Education ensuring transparent, rigorous, and merit-driven academic progression.
          </p>
        </div>

        {/* Assessment Triad Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {assessmentStructure.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-3xl border-2 border-gold/30 hover:border-gold p-7 shadow-md hover:shadow-xl transition-all duration-300 space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-navy text-white font-sans">
                  Component #{idx + 1}
                </span>
                <span className="text-xs font-bold text-gold uppercase tracking-wider font-sans">
                  {item.weightage}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-navy group-hover:text-navy-deep transition-colors">
                {item.title}
              </h3>

              <p className="text-xs md:text-sm text-navy/85 font-medium leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
