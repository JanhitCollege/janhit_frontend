import { useState } from "react";
import { Users, Award, Shield, BookOpen, Scale, ChevronDown, CheckCircle, FileText, ArrowDown, Building2, UserCheck, ShieldCheck } from "lucide-react";

export function OrganogramManagement() {
  const [activeTab, setActiveTab] = useState<"tree" | "directory">("tree");
  const [selectedWing, setSelectedWing] = useState<number | null>(null);

  const wings = [
    {
      id: 1,
      title: "Academic & Clinical Division",
      badge: "Core Faculty & Studies",
      icon: BookOpen,
      head: "Dean / Senior Faculty In-Charge",
      entities: [
        "Department of B.A. LL.B. (5-Year Integrated)",
        "Department of LL.B. (3-Year Professional)",
        "Clinical Legal Education & Courtroom Training",
        "Moot Court Society (MCS) Faculty Directorate",
      ],
      desc: "Supervises curricular progression, clinical advocacy exercises, pedagogical standards, and research publications.",
    },
    {
      id: 2,
      title: "Statutory & Compliance Bodies",
      badge: "BCI & UGC Mandated",
      icon: ShieldCheck,
      head: "Presiding Officers & Conveners",
      entities: [
        "Internal Quality Assurance Cell (IQAC)",
        "Anti-Ragging Committee & Flying Squad",
        "Internal Complaints Committee (ICC / POSH)",
        "Students' Grievance Redressal Cell",
      ],
      desc: "Ensures absolute regulatory compliance, campus safety, gender justice, and zero tolerance for ragging.",
    },
    {
      id: 3,
      title: "Advocacy & Extension Wings",
      badge: "Practical Exposure & DLSA",
      icon: Scale,
      head: "Clinical In-Charge & Convener",
      entities: [
        "Free Legal Aid Clinic (DLSA Partner)",
        "Chamber Attachment & Internship Cell",
        "Human Rights & Pro-Bono Legal Cell",
        "ADR, Mediation & Debating Society",
      ],
      desc: "Coordinates high-court/district court chamber internships, pro-bono legal awareness drives, and national moot participation.",
    },
    {
      id: 4,
      title: "Administration & Infrastructure",
      badge: "Registrar & Campus Estate",
      icon: Building2,
      head: "Registrar & Campus Manager",
      entities: [
        "CCSU University Liaison & Examination Cell",
        "Law Library & E-Resource Cyber Center",
        "IT & Smart Classroom Support Wing",
        "Divyangjan Barrier-Free Access & Facilities",
      ],
      desc: "Manages university examinations, enrollment records, state-of-the-art law library resources, IT infrastructure, and campus maintenance.",
    },
  ];

  const managementMembers = [
    {
      name: "Mr. Narendra Chaudhary",
      role: "Chairman",
      body: "Board of Management / Janhit Educational Trust",
      qualification: "Visionary Educationist & Philanthropist",
      responsibility: "Overall strategic leadership, institutional policy formulation, and campus development.",
    },
    {
      name: "Dr. S. N. Yadav",
      role: "Principal & Head of Institution",
      body: "Academic & Administrative Directorate",
      qualification: "Ph.D. in Law, LL.M., Renowned Legal Scholar",
      responsibility: "Executive academic governance, Bar Council of India & CCSU university affairs, faculty supervision.",
    },
    {
      name: "Senior Advisory Jurist Panel",
      role: "Eminent Advisors",
      body: "Academic Advisory Council",
      qualification: "Retired High Court Judges & Senior Advocates",
      responsibility: "Curriculum enrichment, judicial internship tie-ups, and presiding over national moot court competitions.",
    },
    {
      name: "Registrar & Examination Officer",
      role: "Administrative Head",
      body: "University Examination & Liaison Wing",
      qualification: "Master of Public Administration / Law",
      responsibility: "CCSU Meerut university examinations, admissions record verification, and institutional disclosures.",
    },
  ];

  return (
    <section id="organogram" className="py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span>Governance Framework</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
            Management Body & Organogram
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/70 leading-relaxed font-sans">
            A transparent, multi-tiered institutional governance system ensuring academic distinction, statutory compliance, and progressive student welfare.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-50 border border-gold/30 shadow-md">
            <button
              onClick={() => setActiveTab("tree")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "tree"
                  ? "bg-navy text-white shadow-md"
                  : "text-navy/70 hover:text-navy hover:bg-gold/10"
              }`}
            >
              <Scale className="w-4 h-4 text-gold" />
              <span>Hierarchical Organogram</span>
            </button>
            <button
              onClick={() => setActiveTab("directory")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "directory"
                  ? "bg-navy text-white shadow-md"
                  : "text-navy/70 hover:text-navy hover:bg-gold/10"
              }`}
            >
              <Users className="w-4 h-4 text-gold" />
              <span>Management Body Directory</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Hierarchical Organogram (Tree View) */}
        {activeTab === "tree" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hierarchy Tree Visual Structure - Expanded to Full Width for generous card sizes */}
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Level 1: Sponsoring Body */}
              <div className="flex flex-col items-center">
                <div className="w-full max-w-md bg-navy text-white rounded-2xl p-5 border-2 border-gold/40 shadow-xl text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
                    Apex Governing Body
                  </span>
                  <h4 className="font-serif text-lg md:text-xl font-bold text-white">
                    Janhit Educational Trust / Sponsoring Society
                  </h4>
                  <p className="text-xs text-white/75 font-sans">
                    Founded in 2002 • Strategic Governance & Institutional Vision
                  </p>
                </div>
                {/* Vertical Stem */}
                <div className="w-0.5 h-8 bg-gold/50" />
              </div>

              {/* Level 2: Chairman */}
              <div className="flex flex-col items-center">
                <div className="w-full max-w-lg bg-white rounded-2xl p-5 border-2 border-gold/50 shadow-xl text-center space-y-1 relative">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/15 px-3 py-0.5 rounded-full inline-block border border-gold/30">
                    Visionary Leadership
                  </span>
                  <h4 className="font-serif text-xl md:text-2xl font-bold text-navy">
                    Mr. Narendra Chaudhary
                  </h4>
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider font-sans">
                    Chairman, Janhit Group of Institutions
                  </p>
                  <p className="text-xs text-navy/70 font-sans pt-1">
                    Directs institutional policy, infrastructure development, and overall expansion.
                  </p>
                </div>
                {/* Vertical Stem */}
                <div className="w-0.5 h-8 bg-gold/50" />
              </div>

              {/* Level 3: Academic Advisory Board & Jurist Panel */}
              <div className="flex flex-col items-center">
                <div className="w-full max-w-xl bg-slate-50 rounded-2xl p-4 border border-gold/35 shadow-md text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-navy/70 block">
                    Advisory Council
                  </span>
                  <h4 className="font-serif text-base md:text-lg font-bold text-navy">
                    Academic Advisory Council & Eminent Jurists Panel
                  </h4>
                  <p className="text-xs text-navy/60 font-sans">
                    Retired High Court Judges, Senior Advocates, Bar Council Mentors & Legal Academicians
                  </p>
                </div>
                {/* Vertical Stem */}
                <div className="w-0.5 h-8 bg-gold/50" />
              </div>

              {/* Level 4: Principal / Dean of Law */}
              <div className="flex flex-col items-center">
                <div className="w-full max-w-lg bg-white rounded-2xl p-5 border-2 border-gold/50 shadow-xl text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-navy bg-navy/10 px-3 py-0.5 rounded-full inline-block border border-navy/20">
                    Academic & Administrative Head
                  </span>
                  <h4 className="font-serif text-xl md:text-2xl font-bold text-navy">
                    Dr. S. N. Yadav
                  </h4>
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider font-sans">
                    Principal, Janhit College of Law
                  </p>
                  <p className="text-xs text-navy/70 font-sans pt-1">
                    Statutory head responsible for academic discipline, BCI/CCSU compliance, and faculty supervision.
                  </p>
                </div>
                {/* Vertical Stem & Branch Splitter */}
                <div className="w-0.5 h-8 bg-gold/50" />
                <div className="w-full max-w-6xl h-0.5 bg-gold/50 hidden md:block" />
              </div>

              {/* Level 5: 4 Functional Operational Wings - Wider Cards in a Single Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                {wings.map((wing) => {
                  const Icon = wing.icon;
                  const isSelected = selectedWing === wing.id;
                  return (
                    <div
                      key={wing.id}
                      onClick={() => setSelectedWing(isSelected ? null : wing.id)}
                      className={`p-6 md:p-7 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 ${
                        isSelected
                          ? "bg-navy text-white border-gold shadow-2xl scale-[1.02]"
                          : "bg-white text-navy border-gold/30 hover:border-gold hover:shadow-xl hover:-translate-y-1"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                              isSelected
                                ? "bg-gold/20 text-gold border-gold/40"
                                : "bg-gold/15 text-navy border-gold/30"
                            }`}
                          >
                            {wing.badge}
                          </span>
                          <Icon className="w-5 h-5 text-gold shrink-0" />
                        </div>

                        <h5 className="font-serif font-extrabold text-lg md:text-xl leading-snug">
                          {wing.title}
                        </h5>

                        <p
                          className={`text-xs md:text-sm leading-relaxed font-sans ${
                            isSelected ? "text-white/85" : "text-navy/80"
                          }`}
                        >
                          {wing.desc}
                        </p>
                      </div>

                      {/* Entities list */}
                      <div
                        className={`pt-4 border-t text-xs md:text-[13px] space-y-2 font-sans ${
                          isSelected ? "border-white/20" : "border-gold/20"
                        }`}
                      >
                        {wing.entities.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-gold shrink-0 mt-1" />
                            <span className={`leading-snug font-medium ${isSelected ? "text-white/90" : "text-navy/85"}`}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Management Body Directory */}
        {activeTab === "directory" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {managementMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-gold/30 shadow-md hover:shadow-xl hover:border-gold transition-all duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 leading-snug">
                        {member.body}
                      </span>
                      <div className="p-1.5 rounded-lg bg-navy/5 text-gold shrink-0 border border-gold/20 mt-0.5">
                        <UserCheck className="w-4 h-4 text-gold" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-serif text-xl font-bold text-navy">
                        {member.name}
                      </h4>
                      <p className="text-xs font-semibold text-gold uppercase tracking-wider font-sans">
                        {member.role}
                      </p>
                      <p className="text-[11px] text-navy/60 font-medium font-sans mt-0.5">
                        {member.qualification}
                      </p>
                    </div>

                    <p className="text-xs text-navy/75 leading-relaxed font-sans border-t border-gold/15 pt-3">
                      {member.responsibility}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-navy/60 font-semibold font-sans">
                    <span>Status:</span>
                    <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                      Active In-Office
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
