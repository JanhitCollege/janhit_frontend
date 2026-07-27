import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  CheckCircle,
  GraduationCap,
  Clock,
  FileCheck,
  Shirt,
} from "lucide-react";

// Import PDF assets
import ballbStructure from "@/assets/B.A.LL.B. (Course Structure).pdf";
import ballbSyllabus from "@/assets/BA-LLB-Syllabus-2026-2027.pdf";
import llbStructure from "@/assets/LL.B. (Course Structure).pdf";
import llbSyllabus from "@/assets/LLB-(course syllabus ) 2026-2027.pdf";

export function Courses() {
  const [activeTab, setActiveTab] = useState<"ballb" | "llb">("ballb");

  return (
    <section id="courses" className="py-20 bg-beige/30 border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">
            Courses Offered
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">Academic Programs</h2>
          <div className="h-1 w-20 bg-gold mx-auto rounded" />
          <p className="text-sm text-navy/70">
            Janhit College of Law offers recognized programs tailored to equip students with sound
            legal logic and practical advocacy.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white border border-gold/20 p-1.5 rounded-full shadow-md flex gap-2">
            <button
              onClick={() => setActiveTab("ballb")}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "ballb"
                  ? "bg-navy text-white shadow-md"
                  : "text-navy/75 hover:text-navy hover:bg-navy/5"
              }`}
            >
              B.A.LL.B (5 Years)
            </button>
            <button
              onClick={() => setActiveTab("llb")}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "llb"
                  ? "bg-navy text-white shadow-md"
                  : "text-navy/75 hover:text-navy hover:bg-navy/5"
              }`}
            >
              LL.B (3 Years)
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-gold/15 rounded-2xl shadow-xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            {activeTab === "ballb" ? (
              <motion.div
                key="ballb"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12"
              >
                {/* Left details */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Title & Duration */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gold/10 pb-5 gap-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-navy">
                        Bachelor of Arts & Bachelor of Laws (B.A.LL.B)
                      </h3>
                      <p className="text-xs text-navy/60 mt-1">
                        Integrated 5-Year Dual Degree Course
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-lg border border-gold/20 shrink-0 self-start md:self-center">
                      <Clock className="h-4.5 w-4.5" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        5 Years / 10 Semesters
                      </span>
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-serif text-lg font-bold text-navy">
                      <GraduationCap className="h-5 w-5 text-gold" />
                      <span>Eligibility Criteria</span>
                    </h4>
                    <ul className="space-y-2.5 text-sm text-navy/80 pl-2">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>
                          Completed 10+2 in any stream from a recognized University / Board.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>
                          Minimum of <strong>45% marks for General</strong> candidates and{" "}
                          <strong>40% marks for SC / ST</strong> candidates (As per BCI / University
                          Norms).
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>
                          Candidates appearing/appeared for the Annual Examination in March/April
                          are also eligible to apply.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>Age: As per C.C.S. University and Bar Council of India norms.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Semester Info */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-serif text-lg font-bold text-navy">
                      <Clock className="h-5 w-5 text-gold" />
                      <span>Course Duration & Semester System</span>
                    </h4>
                    <ul className="space-y-2.5 text-sm text-navy/80 pl-2">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>The duration of the course shall be Five academic years.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>
                          Each academic year is divided into two semesters (July-Dec. & Feb.-June) /
                          Annual System (Aug-May).
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Dress Code */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-serif text-lg font-bold text-navy">
                      <Shirt className="h-5 w-5 text-gold" />
                      <span>Prescribed Dress Code</span>
                    </h4>
                    <p className="text-sm text-navy/70 leading-relaxed pl-2 mb-2">
                      Students must follow the prescribed college dress code from Tuesday to
                      Saturday and during Inter-Class Moot Court Competitions, Guest Lectures,
                      Seminars, Presentations etc.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 pl-2">
                      <div className="bg-navy-deep/5 border border-navy/10 p-4 rounded-lg">
                        <span className="text-sm font-bold text-navy uppercase tracking-wider block mb-1">
                          Boys
                        </span>
                        <p className="text-base text-navy/80">
                          White Shirt, Black Trousers, Tie, Black Blazer, Black Shoes.
                        </p>
                      </div>
                      <div className="bg-navy-deep/5 border border-navy/10 p-4 rounded-lg">
                        <span className="text-sm font-bold text-navy uppercase tracking-wider block mb-1">
                          Girls
                        </span>
                        <p className="text-base text-navy/80">
                          White Shalwar Kameez, White Dupatta, Black Blazer, Black Shoes{" "}
                          <br className="hidden md:inline" />
                          <strong className="text-xs text-gold uppercase tracking-widest block my-1">
                            OR
                          </strong>
                          White Shirt, Black Trousers, Tie, Black Blazer, Black Shoes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right sidebar for downloads & interview info */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Interview Documents */}
                  <div className="bg-beige/25 border border-gold/15 p-6 rounded-xl space-y-4">
                    <h4 className="flex items-center gap-2 font-serif text-lg font-bold text-navy border-b border-gold/10 pb-2">
                      <FileCheck className="h-5 w-5 text-gold" />
                      <span>Interview Checklist</span>
                    </h4>
                    <p className="text-sm text-navy/60 leading-relaxed">
                      Documents to carry at the time of Personal Interview (Xerox & Original):
                    </p>
                    <ul className="space-y-2 text-sm text-navy/80 pl-1">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                        <span>10th Mark Sheet/Certificate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                        <span>12th Mark Sheet/Certificate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                        <span>Aadhar Card</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                        <span>Category Certificate (SC/ST/OBC)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                        <span>Six passport size recent photographs</span>
                      </li>
                    </ul>
                  </div>

                  {/* PDF Downloads */}
                  <div className="bg-navy border border-navy-deep p-6 rounded-xl text-white space-y-4 shadow-xl">
                    <h4 className="font-serif text-xl font-bold text-gold border-b border-white/10 pb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      <span>Program Resources</span>
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Download the official CCS University syllabus and structural map for B.A.LL.B.
                    </p>
                    <div className="flex flex-col gap-2 pt-2">
                      <a
                        href={ballbStructure}
                        download="B.A.LL.B_Course_Structure.pdf"
                        className="flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2.5 rounded text-sm font-semibold tracking-wide transition-all"
                      >
                        <span>Course Structure PDF</span>
                        <Download className="h-4 w-4 text-gold" />
                      </a>
                      <a
                        href={ballbSyllabus}
                        download="B.A.LL.B_Syllabus.pdf"
                        className="flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2.5 rounded text-sm font-semibold tracking-wide transition-all"
                      >
                        <span>Course Syllabus PDF</span>
                        <Download className="h-4 w-4 text-gold" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="llb"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12"
              >
                {/* Left details */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Title & Duration */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gold/10 pb-5 gap-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-navy">
                        Bachelor of Laws (LL.B)
                      </h3>
                      <p className="text-xs text-navy/60 mt-1">
                        Professional Graduate 3-Year Degree Course
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-lg border border-gold/20 shrink-0 self-start md:self-center">
                      <Clock className="h-4.5 w-4.5" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        3 Years / 6 Semesters
                      </span>
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-serif text-lg font-bold text-navy">
                      <GraduationCap className="h-5 w-5 text-gold" />
                      <span>Eligibility Criteria</span>
                    </h4>
                    <ul className="space-y-2.5 text-sm text-navy/80 pl-2">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>
                          Completed 10+2+3 (Graduation) in any discipline from a recognized College
                          / University.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>
                          Minimum of <strong>45% marks for General</strong> candidates and{" "}
                          <strong>40% marks for SC / ST</strong> candidates (As per BCI / University
                          Norms).
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>
                          Candidates appearing/appeared for the Annual Examination in March/April
                          are also eligible to apply.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>Age: As per C.C.S. University and Bar Council of India norms.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Semester Info */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-serif text-lg font-bold text-navy">
                      <Clock className="h-5 w-5 text-gold" />
                      <span>Course Duration & Semester System</span>
                    </h4>
                    <ul className="space-y-2.5 text-sm text-navy/80 pl-2">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>The duration of the course shall be Three academic years.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>
                          Each academic year is divided into two semesters (July-Dec. & Feb.-June) /
                          Annual System (Aug-May).
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Dress Code */}
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-serif text-lg font-bold text-navy">
                      <Shirt className="h-5 w-5 text-gold" />
                      <span>Prescribed Dress Code</span>
                    </h4>
                    <p className="text-sm text-navy/70 leading-relaxed pl-2 mb-2">
                      Students must follow the prescribed college dress code from Tuesday to
                      Saturday and during Inter-Class Moot Court Competitions, Guest Lectures,
                      Seminars, Presentations etc.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 pl-2">
                      <div className="bg-navy-deep/5 border border-navy/10 p-4 rounded-lg">
                        <span className="text-sm font-bold text-navy uppercase tracking-wider block mb-1">
                          Boys
                        </span>
                        <p className="text-base text-navy/80">
                          White Shirt, Black Trousers, Tie, Black Blazer, Black Shoes.
                        </p>
                      </div>
                      <div className="bg-navy-deep/5 border border-navy/10 p-4 rounded-lg">
                        <span className="text-sm font-bold text-navy uppercase tracking-wider block mb-1">
                          Girls
                        </span>
                        <p className="text-base text-navy/80">
                          White Shalwar Kameez, White Dupatta, Black Blazer, Black Shoes <br />
                          <strong className="text-xs text-gold uppercase tracking-widest block my-1">
                            OR
                          </strong>
                          White Shirt, Black Trousers, Tie, Black Blazer, Black Shoes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right sidebar for downloads & interview info */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Interview Documents */}
                  <div className="bg-beige/25 border border-gold/15 p-6 rounded-xl space-y-4">
                    <h4 className="flex items-center gap-2 font-serif text-lg font-bold text-navy border-b border-gold/10 pb-2">
                      <FileCheck className="h-5 w-5 text-gold" />
                      <span>Interview Checklist</span>
                    </h4>
                    <p className="text-sm text-navy/60 leading-relaxed">
                      Documents to carry at the time of Personal Interview (Xerox & Original):
                    </p>
                    <ul className="space-y-2 text-sm text-navy/80 pl-1">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                        <span>10th Mark Sheet/Certificate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                        <span>12th Mark Sheet/Certificate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                        <span>Graduation Mark Sheet/Certificate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                        <span>Aadhar Card</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                        <span>Category Certificate (SC/ST/OBC)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-gold rounded-full" />
                        <span>Six passport size recent photographs</span>
                      </li>
                    </ul>
                  </div>

                  {/* PDF Downloads */}
                  <div className="bg-navy border border-navy-deep p-6 rounded-xl text-white space-y-4 shadow-xl">
                    <h4 className="font-serif text-xl font-bold text-gold border-b border-white/10 pb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      <span>Program Resources</span>
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Download the official CCS University syllabus and structural map for LL.B.
                    </p>
                    <div className="flex flex-col gap-2 pt-2">
                      <a
                        href={llbStructure}
                        download="LL.B_Course_Structure.pdf"
                        className="flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2.5 rounded text-sm font-semibold tracking-wide transition-all"
                      >
                        <span>Course Structure PDF</span>
                        <Download className="h-4 w-4 text-gold" />
                      </a>
                      <a
                        href={llbSyllabus}
                        download="LL.B_Syllabus.pdf"
                        className="flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2.5 rounded text-sm font-semibold tracking-wide transition-all"
                      >
                        <span>Course Syllabus PDF</span>
                        <Download className="h-4 w-4 text-gold" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
