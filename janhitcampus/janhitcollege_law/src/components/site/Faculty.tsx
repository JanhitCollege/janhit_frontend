import { Mail, Briefcase, GraduationCap, Scale, Building2 } from "lucide-react";

const facultyList = [
  {
    name: "Dr. Ashok Kumar Sharma",
    role: "Dean & Professor of Law",
    education: "Ph.D. in Constitutional Law, LL.M. (Gold Medalist)",
    experience: "22+ Years in Academic & Judicial Training",
    email: "dean.law@janhit.org",
  },
  {
    name: "Ms. Priyanka Chaudhary",
    role: "Assistant Professor (Criminal Law)",
    education: "LL.M. (National Law University), UGC-NET Qualified",
    experience: "8+ Years in Teaching & Research",
    email: "priyanka.c@janhit.org",
  },
  {
    name: "Mr. Rajeev Kumar Singh",
    role: "Assistant Professor (Corporate & IP Law)",
    education: "LL.M., MBA (Business Law), UGC-NET",
    experience: "6+ Years in Corporate Legal practice & Teaching",
    email: "rajeev.singh@janhit.org",
  },
  {
    name: "Ms. Neha Dwivedi",
    role: "Moot Court Trainer & Lecturer",
    education: "LL.M., BA.LL.B. (Hons)",
    experience: "4+ Years in Trial Advocacy Training",
    email: "neha.d@janhit.org",
  },
];

const recruiters = [
  "District Courts Noida",
  "Delhi High Court Chambers",
  "Leading Legal Corporate Firms",
  "Legal Aid NGOs",
  "Real Estate Legal Cells",
];

export function Faculty() {
  return (
    <section id="faculty" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Faculty Section */}
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">
              Academic Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">Faculty & Staff</h2>
            <div className="h-1 w-20 bg-gold mx-auto rounded" />
            <p className="text-sm text-navy/70">
              Classes are guided by senior legal experts, former judges, and research scholars
              committed to student success.
            </p>
          </div>

          {/* Faculty Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facultyList.map((member, idx) => (
              <div
                key={idx}
                className="bg-white border border-gold/15 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Profile Card Header */}
                <div className="space-y-3">
                  <div className="h-12 w-12 bg-navy/5 rounded-full flex items-center justify-center text-gold">
                    <Scale className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-navy">{member.name}</h3>
                    <span className="text-sm text-gold font-semibold uppercase tracking-wider block mt-0.5">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Profile Card Info */}
                <div className="mt-4 pt-4 border-t border-gold/10 space-y-2.5 text-sm text-navy/75">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 text-navy/50 shrink-0 mt-0.5" />
                    <span>{member.education}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-navy/50 shrink-0 mt-0.5" />
                    <span>{member.experience}</span>
                  </div>
                </div>

                {/* Email Footer */}
                <div className="mt-5 pt-3 border-t border-gold/5 flex items-center justify-between text-xs text-navy/60">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-gold" />
                    <span>{member.email}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Section */}
        <div
          id="placement"
          className="bg-white border border-gold/15 rounded-2xl p-8 md:p-10 shadow-lg grid lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Career Development
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                Placement & Internship Cell
              </h2>
              <div className="h-1 w-20 bg-gold rounded" />
            </div>

            <p className="text-sm text-navy/80 leading-relaxed">
              Our dedicated Placement Cell bridges the gap between classrooms and courtrooms. We
              mandate internship terms in Trial Courts, High Courts, and Corporate law departments
              to ensure students graduate with real-world case exposure.
            </p>

            <p className="text-sm text-navy/80 leading-relaxed">
              We conduct weekly legal drafting clinics, guest lectures on soft skills, CV builder
              workshops, and invite local legal partners to hire on-campus.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {recruiters.map((rec, i) => (
                <span
                  key={i}
                  className="bg-navy/5 text-navy border border-navy/10 px-3 py-1.5 rounded-full text-xs font-semibold"
                >
                  {rec}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-navy text-white p-6 rounded-xl space-y-4 border border-navy-deep relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-gold/5 rounded-bl-full" />
            <h3 className="font-serif text-lg font-bold text-gold border-b border-white/10 pb-2">
              Internship Programs
            </h3>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                <span>1st-2nd Year: Placements in NGOs and District Legal Aid Clinics.</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                <span>3rd Year: Internships under Senior District Court Advocates.</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                <span>
                  4th-5th Year: Internships in High Courts, Supreme Court chambers, and Corporate
                  Legal Cells.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
