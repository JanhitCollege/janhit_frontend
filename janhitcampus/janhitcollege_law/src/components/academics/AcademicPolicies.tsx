import {
  ShieldCheck,
  Scale,
  Users,
  FileCheck,
  AlertTriangle,
  Shirt,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export function AcademicPolicies() {
  const policies = [
    {
      icon: Scale,
      badge: "Statutory BCI Rule 12",
      title: "Minimum 75% Attendance Requirement",
      desc: "In strict compliance with Rule 12 of the Bar Council of India Rules of Legal Education and CCSU Statutes, students must maintain a minimum of 75% aggregate attendance across all registered lecture courses, tutorials, and practical courtroom drills to be eligible to appear in University End-Term Examinations.",
      points: [
        "Attendance calculated independently for each subject per semester",
        "Discretionary medical relaxation up to a maximum 9% (subject to valid medical board approval)",
        "Short attendance leads to debarment from semester exams without exception",
      ],
    },
    {
      icon: ShieldCheck,
      badge: "Ethical Standards",
      title: "Academic Integrity & Anti-Plagiarism Policy",
      desc: "Legal education demands absolute intellectual honesty. The college maintains an uncompromising standard against academic dishonesty, plagiarism, examination malpractice, and fraudulent case citation in research papers, dissertations, and moot court memorials.",
      points: [
        "All seminar papers & memorials subjected to automated plagiarism scrutiny",
        "Breach of ethics referred directly to the College Disciplinary Committee",
        "Strict adherence to Standards of Professional Conduct under Advocates Act, 1961",
      ],
    },
    {
      icon: FileCheck,
      badge: "Continuous Evaluation",
      title: "Continuous Internal Evaluation (CIE) Scheme",
      desc: "Academics at Janhit Law emphasizes consistent learning through a structured continuous assessment mechanism contributing 20% to 30% of total course marks in conformity with CCSU examination ordinances.",
      points: [
        "Internal mid-semester written assessments and surprise case tests",
        "Grading of research projects, case-commentaries, and class participation",
        "Internal marks displayed on institutional notice boards for transparency prior to final submission",
      ],
    },
    {
      icon: Users,
      badge: "Clinical Mandate",
      title: "Mandatory Court & Chamber Internship Policy",
      desc: "Practical advocacy training is statutory. Every student is required to complete field internships with advocates, legal chambers, judicial officers, corporate law desks, or legal aid authorities during semester breaks.",
      points: [
        "Minimum 12 weeks internship for 3-Year LL.B. & 20 weeks for 5-Year B.A. LL.B.",
        "Maintenance of an official Internship Diary authenticated by the host advocate/firm",
        "Diary evaluation and viva-voce conducted during final-year practical examinations",
      ],
    },
    {
      icon: AlertTriangle,
      badge: "Zero Tolerance",
      title: "Anti-Ragging & Non-Discrimination Regulations",
      desc: "Janhit College of Law maintains an unequivocal zero-tolerance policy towards ragging, harassment, caste/gender discrimination, or intimidation in strict compliance with Hon'ble Supreme Court directives and UGC Regulations.",
      points: [
        "Proactive Anti-Ragging Committee and Flying Squad monitoring campus 24x7",
        "Immediate lodging of FIR and statutory expulsion upon substantiated violation",
        "Dedicated Equal Opportunity Cell and Women's Internal Complaints Committee (ICC)",
      ],
    },
    {
      icon: Shirt,
      badge: "Professional Decorum",
      title: "Dress Code & Courtroom Decorum Policy",
      desc: "To instill professional dignity and courtroom identity, students must strictly adhere to the designated legal attire on all weekdays, examination days, moot court competitions, and external court visits.",
      points: [
        "White formal shirt, black tailored trousers, black shoes, and college advocate tie",
        "Black blazer/coat compulsory during winter months, moot court trials, and formal events",
        "Casual attire or footwear strictly prohibited within academic blocks and the library",
      ],
    },
  ];

  return (
    <section id="academic-policies" className="py-16 md:py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Statutory Governance</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
            Academic Policies
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/85 font-medium leading-relaxed font-sans">
            Clear, transparent regulatory frameworks governing attendance, professional ethics,
            continuous evaluation, court internships, and campus discipline.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy, idx) => {
            const Icon = policy.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border-2 border-gold/30 hover:border-gold p-7 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-gold/15 text-navy border border-gold/30 font-sans">
                      {policy.badge}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-navy/5 text-navy group-hover:bg-navy group-hover:text-gold transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-navy group-hover:text-navy-deep transition-colors leading-snug">
                    {policy.title}
                  </h3>

                  <p className="text-xs text-navy/85 font-medium leading-relaxed font-sans">
                    {policy.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gold/15">
                    {policy.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-[11px] text-navy/85 font-medium font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gold/15 text-[11px] text-navy/60 font-sans flex items-center justify-between">
                  <span>Enforcement: Statutory</span>
                  <span className="text-gold font-bold uppercase">Active Mandate</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
