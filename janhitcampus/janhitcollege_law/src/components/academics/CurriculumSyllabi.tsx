import { useState } from "react";
import {
  FileText,
  Download,
  BookOpen,
  CheckCircle2,
  Award,
  Layers,
  ChevronRight,
  Scale,
  Sparkles,
} from "lucide-react";

import ballbSyllabusPdf from "@/assets/BA-LLB-Syllabus-2026-2027.pdf";
import ballbStructurePdf from "@/assets/B.A.LL.B. (Course Structure).pdf";
import llbSyllabusPdf from "@/assets/LLB-(course syllabus ) 2026-2027.pdf";
import llbStructurePdf from "@/assets/LL.B. (Course Structure).pdf";

export function CurriculumSyllabi() {
  const [activeTab, setActiveTab] = useState<"ballb" | "llb" | "clinical">("ballb");

  const ballbSemesters = [
    {
      sem: "Semesters I & II",
      title: "Foundations of Humanities & Basic Jurisprudence",
      subjects: [
        "General English & Legal Language",
        "Political Science-I & II (Political Theory & Indian Political Thought)",
        "Sociology-I & II (General Principles & Indian Society)",
        "History-I (Ancient & Medieval Indian Legal History)",
        "Law of Torts & Consumer Protection Act, 2019",
        "Law of Contract-I (General Principles & Specific Relief Act)",
      ],
    },
    {
      sem: "Semesters III & IV",
      title: "Constitutional Governance & Family Jurisprudence",
      subjects: [
        "Constitutional Law of India-I (Structure & Organs)",
        "Constitutional Law of India-II (Fundamental Rights & Writs)",
        "Family Law-I (Hindu Law - Marriage, Succession & Adoption)",
        "Family Law-II (Muslim Law - Waqf, Maintenance & Inheritance)",
        "Law of Crimes-I (Indian Penal Code / Bharatiya Nyaya Sanhita)",
        "Special Contracts-II (Indemnity, Guarantee, Bailment, Agency, Partnership)",
      ],
    },
    {
      sem: "Semesters V & VI",
      title: "Corporate, Labour & Property Jurisprudence",
      subjects: [
        "Jurisprudence (Legal Theory, Schools of Jurisprudence, Rights & Duties)",
        "Company Law & Corporate Governance",
        "Labour & Industrial Law-I & II (Factories, Trade Unions, Disputes)",
        "Property Law & Transfer of Property Act, 1882",
        "Environmental Law & National Green Tribunal Act",
        "Public International Law & Human Rights",
      ],
    },
    {
      sem: "Semesters VII & VIII",
      title: "Procedural Laws & Adjudication Codes",
      subjects: [
        "Code of Civil Procedure, 1908 & Law of Limitation",
        "Code of Criminal Procedure, 1973 / Bharatiya Nagarik Suraksha Sanhita",
        "Law of Evidence, 1872 / Bharatiya Sakshya Adhiniyam",
        "Administrative Law & Principles of Natural Justice",
        "Direct & Indirect Taxation Laws (Income Tax & GST)",
        "Criminology, Penology & Victimology",
      ],
    },
    {
      sem: "Semesters IX & X",
      title: "Clinical Advocacy & Advanced Specialization",
      subjects: [
        "Land Laws of Uttar Pradesh (UP Revenue Code, 2006)",
        "Intellectual Property Rights (Copyright, Patents, Trademarks)",
        "Cyber Laws & Information Technology Act, 2000",
        "Clinical Paper-I: Drafting, Pleading & Conveyancing",
        "Clinical Paper-II: Professional Ethics & Bar-Bench Relations",
        "Clinical Paper-III: Alternative Dispute Resolution (ADR)",
        "Clinical Paper-IV: Moot Court Exercise and Chamber Internship",
      ],
    },
  ];

  const llbSemesters = [
    {
      sem: "Semester I",
      title: "Foundations of Jurisprudence & Fundamental Law",
      subjects: [
        "Jurisprudence-I (Legal Theory)",
        "Constitutional Law of India-I (Organs of State)",
        "Law of Torts including Motor Vehicles Act & Consumer Protection",
        "Law of Crimes-I (IPC / Bharatiya Nyaya Sanhita)",
        "Law of Contract-I (General Principles)",
      ],
    },
    {
      sem: "Semester II",
      title: "Constitutional Writs, Commercial & International Law",
      subjects: [
        "Jurisprudence-II (Concepts of Law, Possession, Ownership)",
        "Constitutional Law of India-II (Fundamental Rights, DPSP & Writs)",
        "Family Law-I (Hindu Law)",
        "Law of Contract-II (Special Contracts, Partnership, Sale of Goods)",
        "Public International Law & Humanitarian Law",
      ],
    },
    {
      sem: "Semester III",
      title: "Family Law & Industrial Jurisprudence",
      subjects: [
        "Family Law-II (Muslim Law)",
        "Labour & Industrial Laws-I",
        "Company Law & Corporate Insolvency",
        "Property Law including Easements Act",
        "Law of Crimes-II (CrPC / Bharatiya Nagarik Suraksha Sanhita)",
      ],
    },
    {
      sem: "Semester IV",
      title: "Procedural Codes & Environmental Governance",
      subjects: [
        "Code of Civil Procedure, 1908 & Limitation Act",
        "Law of Evidence, 1872 / Bharatiya Sakshya Adhiniyam",
        "Labour & Industrial Laws-II (Social Security & Minimum Wages)",
        "Environmental Law & Protection Ordinances",
        "Administrative Law & Constitutional Remedies",
      ],
    },
    {
      sem: "Semester V",
      title: "Procedural Clinical Papers & Special Laws",
      subjects: [
        "Clinical Paper-I: Drafting, Pleading & Conveyancing (100 Marks)",
        "Clinical Paper-II: Professional Ethics & Accountancy for Lawyers (100 Marks)",
        "Land Laws of Uttar Pradesh (UP Revenue Code, 2006)",
        "Law of Taxation (Income Tax Act & GST Framework)",
        "Intellectual Property Law (Patents, Trademarks, Copyrights)",
      ],
    },
    {
      sem: "Semester VI",
      title: "Clinical Advocacy, ADR & Practical Viva",
      subjects: [
        "Clinical Paper-III: Alternative Dispute Resolution (ADR) (100 Marks)",
        "Clinical Paper-IV: Moot Court Exercise, Court Visits & Internship (100 Marks)",
        "Interpretation of Statutes & Principles of Legislation",
        "Human Rights Law & Practice",
        "Information Technology & Cyber Crime Law",
      ],
    },
  ];

  const clinicalPapers = [
    {
      paper: "Clinical Paper I",
      name: "Drafting, Pleading & Conveyancing",
      marks: "100 Marks (Theory & Practical Record)",
      desc: "Comprehensive training in drafting civil pleadings (plaint, written statement, interlocutory applications, execution petitions), criminal pleadings (complaint, bail applications, revision petitions), and conveyancing deeds (sale deed, mortgage deed, lease deed, gift deed, power of attorney, will).",
    },
    {
      paper: "Clinical Paper II",
      name: "Professional Ethics & Accountancy for Lawyers",
      marks: "100 Marks (Written Examination & Case Studies)",
      desc: "Detailed study of legal ethics under the Advocates Act, 1961, Bar Council of India Rules on professional conduct and etiquette, contempt of court jurisprudence, selected landmark judgments on professional misconduct, and lawyer's accountancy.",
    },
    {
      paper: "Clinical Paper III",
      name: "Alternative Dispute Resolution (ADR)",
      marks: "100 Marks (Practical Simulation & Field Visits)",
      desc: "Training in modern out-of-court resolution mechanisms under the Arbitration and Conciliation Act, 1996, Section 89 of CPC, Legal Services Authorities Act, 1987. Hands-on simulation exercises in commercial arbitration, court-annexed mediation, and Lok Adalat conciliations.",
    },
    {
      paper: "Clinical Paper IV",
      name: "Moot Court Exercise and Internship",
      marks: "100 Marks (Moot Memorials, Oral Rounds, Diary & Viva)",
      desc: "Three mandatory moot court trials with memorial drafting and oral presentations (30 marks), observance of real trial proceedings in civil and criminal courts (30 marks), interviewing techniques and pre-trial preparation in advocate chambers (30 marks), plus final viva-voce examination before external board (10 marks).",
    },
  ];

  return (
    <section id="curriculum-syllabi" className="py-16 md:py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <FileText className="w-3.5 h-3.5 text-gold" />
            <span>Comprehensive Legal Syllabi</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
            Curriculum & Syllabi
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/85 font-medium leading-relaxed font-sans">
            BCI-prescribed and CCSU-affiliated curricular ordinance blending core substantive codes,
            procedural statutes, modern emerging laws, and four compulsory clinical legal education papers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="bg-slate-50 border-2 border-gold/30 p-1.5 rounded-2xl shadow-md flex flex-wrap justify-center gap-1.5">
            <button
              onClick={() => setActiveTab("ballb")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "ballb"
                  ? "bg-navy text-white shadow-md border border-gold/40"
                  : "text-navy/70 hover:text-navy hover:bg-white"
              }`}
            >
              <BookOpen className="w-4 h-4 text-gold" />
              <span>B.A. LL.B. (10 Semesters)</span>
            </button>
            <button
              onClick={() => setActiveTab("llb")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "llb"
                  ? "bg-navy text-white shadow-md border border-gold/40"
                  : "text-navy/70 hover:text-navy hover:bg-white"
              }`}
            >
              <BookOpen className="w-4 h-4 text-gold" />
              <span>LL.B. (6 Semesters)</span>
            </button>
            <button
              onClick={() => setActiveTab("clinical")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "clinical"
                  ? "bg-navy text-white shadow-md border border-gold/40"
                  : "text-navy/70 hover:text-navy hover:bg-white"
              }`}
            >
              <Scale className="w-4 h-4 text-gold" />
              <span>4 Clinical Papers (BCI)</span>
            </button>
          </div>
        </div>

        {/* Content Views */}
        {activeTab === "ballb" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-gold/25">
              <div>
                <h3 className="font-serif text-xl font-bold text-navy">
                  Integrated B.A. LL.B. (5-Year Dual Degree Syllabus)
                </h3>
                <p className="text-xs text-navy/85 font-medium font-sans mt-0.5">
                  10 Semesters • Affiliated to Chaudhary Charan Singh University, Meerut
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={ballbSyllabusPdf}
                  download="BA-LLB-Syllabus-2026-2027.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy text-white hover:bg-navy-deep font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gold" />
                  <span>Download Full Syllabus</span>
                </a>
                <a
                  href={ballbStructurePdf}
                  download="B.A.LL.B. (Course Structure).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gold/40 text-navy hover:bg-gold/10 font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gold" />
                  <span>Course Structure</span>
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ballbSemesters.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border-2 border-gold/30 hover:border-gold p-6 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider font-sans block">
                      {item.sem}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-navy leading-snug">
                      {item.title}
                    </h4>
                    <ul className="space-y-2 pt-2 border-t border-gold/15">
                      {item.subjects.map((sub, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-xs text-navy/85 font-medium font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "llb" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-gold/25">
              <div>
                <h3 className="font-serif text-xl font-bold text-navy">
                  Professional LL.B. (3-Year Degree Syllabus)
                </h3>
                <p className="text-xs text-navy/85 font-medium font-sans mt-0.5">
                  6 Semesters • Affiliated to Chaudhary Charan Singh University, Meerut
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={llbSyllabusPdf}
                  download="LLB-(course syllabus ) 2026-2027.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy text-white hover:bg-navy-deep font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gold" />
                  <span>Download Full Syllabus</span>
                </a>
                <a
                  href={llbStructurePdf}
                  download="LL.B. (Course Structure).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gold/40 text-navy hover:bg-gold/10 font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-gold" />
                  <span>Course Structure</span>
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {llbSemesters.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border-2 border-gold/30 hover:border-gold p-6 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider font-sans block">
                      {item.sem}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-navy leading-snug">
                      {item.title}
                    </h4>
                    <ul className="space-y-2 pt-2 border-t border-gold/15">
                      {item.subjects.map((sub, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-xs text-navy/85 font-medium font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "clinical" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-gold/25 space-y-1">
              <h3 className="font-serif text-xl font-bold text-navy">
                Four Compulsory Practical Clinical Papers (BCI Schedule II)
              </h3>
              <p className="text-xs text-navy/85 font-medium font-sans">
                Statutory requirement under Bar Council of India Legal Education Rules to build procedural drafting,
                advocacy ethics, and trial proficiency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {clinicalPapers.map((paper, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border-2 border-gold/30 hover:border-gold p-7 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
                        {paper.paper}
                      </span>
                      <span className="text-xs font-semibold text-gold font-sans">
                        {paper.marks}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-navy">
                      {paper.name}
                    </h4>

                    <p className="text-xs md:text-sm text-navy/85 font-medium leading-relaxed font-sans">
                      {paper.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gold/15 flex items-center justify-between text-xs text-navy/60 font-sans">
                    <span>Evaluation: External Viva & Internal Diary</span>
                    <span className="text-gold font-bold uppercase">Mandatory BCI</span>
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
