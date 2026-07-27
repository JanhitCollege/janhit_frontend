import { Download, FileText, ArrowRight, Shield } from "lucide-react";

// Import PDF assets
import ballbStructure from "@/assets/B.A.LL.B. (Course Structure).pdf";
import ballbSyllabus from "@/assets/BA-LLB-Syllabus-2026-2027.pdf";
import llbStructure from "@/assets/LL.B. (Course Structure).pdf";
import llbSyllabus from "@/assets/LLB-(course syllabus ) 2026-2027.pdf";

const downloadItems = [
  {
    title: "B.A.LL.B (5 Years) Course Structure",
    description: "Detailed subject mapping across semesters and years.",
    file: ballbStructure,
    filename: "B.A.LL.B_Course_Structure.pdf",
    category: "Academics",
  },
  {
    title: "B.A.LL.B (5 Years) Detailed Syllabus",
    description: "Full syllabus prescribed by CCS University and BCI.",
    file: ballbSyllabus,
    filename: "B.A.LL.B_Syllabus.pdf",
    category: "Academics",
  },
  {
    title: "LL.B (3 Years) Course Structure",
    description: "Semester-wise distribution of core law papers.",
    file: llbStructure,
    filename: "LL.B_Course_Structure.pdf",
    category: "Academics",
  },
  {
    title: "LL.B (3 Years) Detailed Syllabus",
    description: "Official legal subjects syllabus and credits layout.",
    file: llbSyllabus,
    filename: "LL.B_Syllabus.pdf",
    category: "Academics",
  },
];

export function Downloads() {
  return (
    <section id="downloads" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">
            Resources Hub
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">Downloads Center</h2>
          <div className="h-1 w-20 bg-gold mx-auto rounded" />
          <p className="text-sm text-navy/70">
            Quickly download syllabuses, college brochures, and mandatory legal education forms.
          </p>
        </div>

        {/* Downloads Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {downloadItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-background border border-gold/15 p-6 rounded-xl flex items-start gap-4 hover:border-gold transition-all shadow-sm"
            >
              <div className="p-3 bg-navy/5 text-navy rounded-lg shrink-0">
                <FileText className="h-6 w-6 text-gold" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-navy">{item.title}</h3>
                <p className="text-xs text-navy/60 leading-relaxed">{item.description}</p>
                <div className="pt-2">
                  <a
                    href={item.file}
                    download={item.filename}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-gold transition-colors uppercase tracking-wider"
                  >
                    <span>Download File</span>
                    <Download className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* General Form downloads (admission query info) */}
        <div className="mt-12 bg-navy text-white p-8 rounded-2xl max-w-5xl mx-auto border border-navy-deep flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-lg md:text-xl font-bold text-gold flex items-center justify-center md:justify-start gap-2">
              <Shield className="h-5 w-5" />
              <span>Looking for Admissions Form?</span>
            </h4>
            <p className="text-xs text-white/70 max-w-md">
              You can instantly fill out our digital admission enquiry form below to secure your
              counseling seat. Our representatives will get back to you.
            </p>
          </div>
          <a
            href="#apply"
            className="px-6 py-3 bg-white text-navy-deep font-bold rounded-md text-xs tracking-wider uppercase hover:bg-gold hover:text-navy-deep transition-all shrink-0 shadow-md"
          >
            Apply Online <ArrowRight className="h-3.5 w-3.5 inline ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
