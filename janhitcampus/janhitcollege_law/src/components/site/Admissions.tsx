import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FileText,
  CheckCircle2,
  Calendar,
  CreditCard,
  Download,
  Send,
  Scale,
  Award,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Clock,
  Sparkles,
  PhoneCall,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  FileCheck,
  Percent,
  CheckSquare,
} from "lucide-react";

import baLlbStructurePdf from "@/assets/B.A.LL.B. (Course Structure).pdf";
import baLlbSyllabusPdf from "@/assets/BA-LLB-Syllabus-2026-2027.pdf";
import llbStructurePdf from "@/assets/LL.B. (Course Structure).pdf";
import llbSyllabusPdf from "@/assets/LLB-(course syllabus ) 2026-2027.pdf";

interface NavSubItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const admissionNavItems: NavSubItem[] = [
  { id: "procedure", label: "Admission Procedure", icon: CheckCircle2 },
  { id: "eligibility", label: "Eligibility Criteria", icon: ShieldCheck },
  { id: "fee-structure", label: "Fee Structure", icon: CreditCard },
  { id: "prospectus", label: "Prospectus Download", icon: Download },
  { id: "online-registration", label: "Online Registration", icon: Send },
  { id: "important-dates", label: "Important Dates", icon: Calendar },
];

export function Admissions() {
  const [activeSection, setActiveSection] = useState<string>("procedure");
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    mobile: "",
    program: "ballb",
    category: "General",
    percentage: "",
    city: "",
    query: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  // Scroll to hash on mount or when hash changes
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          const offset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          setActiveSection(elementId);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of admissionNavItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name || !regForm.mobile) {
      toast.error("Please enter your name and contact mobile number.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Application Registration Received!", {
        description: `Thank you, ${regForm.name}. Your application for ${
          regForm.program === "ballb" ? "B.A. LL.B. (5 Years)" : "LL.B. (3 Years)"
        } has been registered. Our legal admission team will contact you on ${regForm.mobile}.`,
      });
      setRegForm({
        name: "",
        email: "",
        mobile: "",
        program: "ballb",
        category: "General",
        percentage: "",
        city: "",
        query: "",
      });
    }, 1200);
  };

  return (
    <div className="bg-slate-50/50 pb-24 text-navy">
      {/* 1. Admissions Hero Banner */}
      <section className="relative overflow-hidden bg-white text-navy pt-16 md:pt-20 pb-16 border-b border-gold/30">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-navy text-xs font-semibold uppercase tracking-widest mb-3 backdrop-blur-sm shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Admissions 2026–27 Open</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy tracking-tight">
                Admissions
              </h1>
              <p className="mt-3 text-base md:text-lg text-navy/85 max-w-2xl font-medium leading-relaxed">
                Step into legal excellence at Janhit College of Law, Greater Noida. Approved by the Bar Council of India (BCI) and affiliated with Chaudhary Charan Singh University (CCSU), Meerut.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="#online-registration"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("online-registration");
                }}
                className="px-6 py-3 rounded-lg gradient-gold text-navy font-bold text-sm uppercase tracking-wider text-center shadow-gold hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Register Online
              </a>
              <a
                href="#prospectus"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("prospectus");
                }}
                className="px-6 py-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-navy font-semibold text-sm border border-gold/35 text-center transition-all duration-300 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-gold" />
                <span>Get Prospectus</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gold/20">
            <div className="bg-slate-50 p-4 rounded-xl border border-gold/25 shadow-xs">
              <div className="text-gold font-serif text-2xl font-bold">120 Seats</div>
              <div className="text-xs text-navy/70 uppercase tracking-wider mt-1 font-semibold">B.A. LL.B. (5 Yrs) Intake</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-gold/25 shadow-xs">
              <div className="text-gold font-serif text-2xl font-bold">120 Seats</div>
              <div className="text-xs text-navy/70 uppercase tracking-wider mt-1 font-semibold">LL.B. (3 Yrs) Intake</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-gold/25 shadow-xs">
              <div className="text-gold font-serif text-2xl font-bold">BCI & CCSU</div>
              <div className="text-xs text-navy/70 uppercase tracking-wider mt-1 font-semibold">Statutory Approvals</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-gold/25 shadow-xs">
              <div className="text-gold font-serif text-2xl font-bold">Merit & Aid</div>
              <div className="text-xs text-navy/70 uppercase tracking-wider mt-1 font-semibold">Scholarships Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Quick-Jump Navigation Header */}
      <div className="sticky top-[73px] z-40 bg-white/95 backdrop-blur-md border-b border-gold/20 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 py-3 min-w-max">
            {admissionNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "gradient-gold text-navy shadow-md font-bold scale-[1.02]"
                      : "text-navy/70 hover:text-navy hover:bg-gold/10"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-navy" : "text-gold"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-20 pt-12">
        {/* SECTION 1: Admission Procedure */}
        <section id="procedure" className="scroll-mt-36">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-lg bg-navy/5 text-gold border border-gold/20">
              <CheckCircle2 className="w-5 h-5 text-gold" />
            </span>
            <span className="text-xs uppercase tracking-widest font-bold text-gold">Step-by-Step Pathway</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Admission Procedure 2026–2027
          </h2>
          <p className="mt-2 text-sm md:text-base text-navy/85 font-medium max-w-3xl leading-relaxed">
            Admissions to the undergraduate legal degree programmes (B.A. LL.B. 5-Year Integrated and LL.B. 3-Year) at Janhit College of Law are carried out in strict accordance with the norms of the Bar Council of India (BCI), New Delhi, and Chaudhary Charan Singh University (CCSU), Meerut.
          </p>

          <div className="grid md:grid-cols-5 gap-6 mt-8">
            {[
              {
                step: "01",
                title: "Inquiry & Form Registration",
                desc: "Fill the online application form on this website or visit the Campus Admission Desk at Knowledge Park-1, Greater Noida to purchase the college brochure & form.",
                badge: "Online / In-Person",
              },
              {
                step: "02",
                title: "CCSU Portal Pre-Registration",
                desc: "As per statutory state norms, complete university web registration on the official CCS University portal (ccsuniversity.ac.in) selecting Janhit College of Law.",
                badge: "University Portal",
              },
              {
                step: "03",
                title: "Document Verification & Counselling",
                desc: "Present original and attested Xerox copies of 10th, 12th / Graduation marksheets, category & domicile certificates at the admission desk for physical verification.",
                badge: "Faculty Interaction",
              },
              {
                step: "04",
                title: "Merit Evaluation & Seat Allotment",
                desc: "Candidates are evaluated based on qualifying academic merit and personal interactive interview. Provisional seat allotment letter is granted.",
                badge: "Merit List",
              },
              {
                step: "05",
                title: "Fee Deposit & Enrollment",
                desc: "Pay the prescribed course fee via online gateway, Net Banking, or DD. Receive your official student enrollment number, ID card, and academic starter kit.",
                badge: "Enrollment Complete",
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-xl p-5 border border-gold/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-extrabold text-gold/40 group-hover:text-gold transition-colors">
                      {s.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-navy/5 text-navy border border-navy/10">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-navy text-base leading-snug">{s.title}</h3>
                  <p className="text-xs text-navy/85 font-medium leading-relaxed">{s.desc}</p>
                </div>
                <div className="h-1 w-full bg-gold/20 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-gold transition-all duration-500 w-1/3 group-hover:w-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Verification Checklist */}
          <div className="mt-8 bg-white border border-gold/20 rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-navy flex items-center gap-2 mb-4">
              <FileCheck className="w-5 h-5 text-gold" />
              <span>Mandatory Documents Checklist for Verification</span>
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {[
                "10th (High School) Marksheet & Certificate (DOB Proof)",
                "12th (Intermediate) Marksheet & Passing Certificate",
                "Graduation Degree & All Semester Marksheets (For 3-Yr LL.B.)",
                "Transfer Certificate (TC) & Character Certificate (Original)",
                "Migration Certificate (Original for non-CCSU Board/Univ)",
                "Aadhaar Card / Government Photo Identity Proof",
                "Category Certificate (SC / ST / OBC / EWS) if applicable",
                "Domicile Certificate (for UP State Reservation benefits)",
                "6 Recent Passport Size Color Photographs",
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-navy/5 border border-gold/10 text-xs text-navy/85"
                >
                  <CheckSquare className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: Eligibility Criteria */}
        <section id="eligibility" className="scroll-mt-36">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-lg bg-navy/5 text-gold border border-gold/20">
              <ShieldCheck className="w-5 h-5 text-gold" />
            </span>
            <span className="text-xs uppercase tracking-widest font-bold text-gold">Admissions Standards</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Eligibility Criteria & Seat Intake
          </h2>
          <p className="mt-2 text-sm md:text-base text-navy/85 font-medium max-w-3xl leading-relaxed">
            Prescribed as per Bar Council of India (BCI) Legal Education Rules and Chaudhary Charan Singh University, Meerut ordinances.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Card 1: B.A. LL.B. */}
            <div className="bg-white rounded-2xl border border-gold/30 shadow-md p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-gold text-navy text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                5-Year Integrated Course
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-navy text-gold">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl md:text-2xl text-navy">
                      B.A. LL.B. (Honours)
                    </h3>
                    <p className="text-xs text-gold font-bold uppercase tracking-wider">
                      Bachelor of Arts & Bachelor of Laws
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-gold/15 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-navy/60">
                      Qualifying Examination
                    </div>
                    <p className="text-sm text-navy/90 font-medium">
                      Passed 10+2 / Senior Secondary / Intermediate examination in any stream (Arts, Science, Commerce) from CBSE, ICSE, UP Board or any recognized equivalent Board.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-xl bg-navy/5 border border-gold/15">
                      <div className="text-lg font-serif font-bold text-navy">45%</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-navy/60 mt-0.5">
                        General
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-navy/5 border border-gold/15">
                      <div className="text-lg font-serif font-bold text-navy">42%</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-navy/60 mt-0.5">
                        OBC Category
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-navy/5 border border-gold/15">
                      <div className="text-lg font-serif font-bold text-navy">40%</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-navy/60 mt-0.5">
                        SC / ST
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gold/10 text-xs text-navy/80 space-y-2 pt-2">
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-navy">Approved Annual Intake:</span>
                      <span className="font-bold text-gold">120 Seats (2 Sections)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-navy">Duration:</span>
                      <span>5 Academic Years (10 Semesters)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-navy">Age Limit:</span>
                      <span>As per Hon'ble Supreme Court & BCI Rules</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between">
                <a
                  href={baLlbStructurePdf}
                  download="BA-LLB-Course-Structure.pdf"
                  className="text-xs font-bold text-navy hover:text-gold flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-gold" />
                  <span>Download Curriculum</span>
                </a>
                <a
                  href="#online-registration"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("online-registration");
                  }}
                  className="px-4 py-2 rounded-lg gradient-gold text-navy font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow transition-all"
                >
                  Apply B.A. LL.B.
                </a>
              </div>
            </div>

            {/* Card 2: LL.B. */}
            <div className="bg-white rounded-2xl border border-gold/30 shadow-md p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-navy text-gold text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl border-l border-b border-gold/30">
                3-Year Graduate Course
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-navy text-gold">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl md:text-2xl text-navy">
                      LL.B. (3 Years)
                    </h3>
                    <p className="text-xs text-gold font-bold uppercase tracking-wider">
                      Bachelor of Laws (Graduate Degree)
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-gold/15 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-navy/60">
                      Qualifying Examination
                    </div>
                    <p className="text-sm text-navy/90 font-medium">
                      Graduation in any discipline (B.A., B.Sc., B.Com., B.Tech, B.B.A., B.C.A., or equivalent) from any UGC recognized University.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-xl bg-navy/5 border border-gold/15">
                      <div className="text-lg font-serif font-bold text-navy">45%</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-navy/60 mt-0.5">
                        General
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-navy/5 border border-gold/15">
                      <div className="text-lg font-serif font-bold text-navy">42%</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-navy/60 mt-0.5">
                        OBC Category
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-navy/5 border border-gold/15">
                      <div className="text-lg font-serif font-bold text-navy">40%</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-navy/60 mt-0.5">
                        SC / ST
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gold/10 text-xs text-navy/80 space-y-2 pt-2">
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-navy">Approved Annual Intake:</span>
                      <span className="font-bold text-gold">120 Seats (2 Sections)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-navy">Duration:</span>
                      <span>3 Academic Years (6 Semesters)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-navy">Bar Council Norms:</span>
                      <span>Full-Time Regular Degree Program</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between">
                <a
                  href={llbStructurePdf}
                  download="LLB-Course-Structure.pdf"
                  className="text-xs font-bold text-navy hover:text-gold flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-gold" />
                  <span>Download Curriculum</span>
                </a>
                <a
                  href="#online-registration"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("online-registration");
                  }}
                  className="px-4 py-2 rounded-lg gradient-gold text-navy font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow transition-all"
                >
                  Apply LL.B.
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Fee Structure */}
        <section id="fee-structure" className="scroll-mt-36">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-lg bg-navy/5 text-gold border border-gold/20">
              <CreditCard className="w-5 h-5 text-gold" />
            </span>
            <span className="text-xs uppercase tracking-widest font-bold text-gold">Affordable & Transparent</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Fee Structure (Session 2026–2027)
          </h2>
          <p className="mt-2 text-sm md:text-base text-navy/85 font-medium max-w-3xl leading-relaxed">
            Janhit College of Law maintains complete transparency in all institutional fees without any hidden capitation charges. Installment options and government scholarship guidance are provided.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Table 1: B.A. LL.B. */}
            <div className="bg-white rounded-2xl border border-gold/20 shadow-sm overflow-hidden">
              <div className="bg-navy p-5 text-white flex items-center justify-between border-b border-gold/30">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">B.A. LL.B. (5 Years)</h3>
                  <p className="text-xs text-gold">Undergraduate Integrated Law Degree</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-serif font-bold text-gold">₹36,000 / Yr</div>
                  <div className="text-[10px] text-slate-300">₹18,000 per semester</div>
                </div>
              </div>
              <div className="p-6 divide-y divide-gold/10 text-xs md:text-sm">
                <div className="py-2.5 flex justify-between text-navy">
                  <span className="font-medium">Tuition & Clinical Academic Fee:</span>
                  <span className="font-bold">₹28,000 / year</span>
                </div>
                <div className="py-2.5 flex justify-between text-navy">
                  <span className="font-medium">Moot Court, Library & Legal Aid Clinic:</span>
                  <span className="font-bold">₹5,000 / year</span>
                </div>
                <div className="py-2.5 flex justify-between text-navy">
                  <span className="font-medium">Campus Development & Sports Facilities:</span>
                  <span className="font-bold">₹3,000 / year</span>
                </div>
                <div className="py-2.5 flex justify-between text-navy">
                  <span className="font-medium">One-Time Registration & Prospectus Fee:</span>
                  <span className="font-bold text-gold">₹1,000 (At Admission)</span>
                </div>
                <div className="py-2.5 flex justify-between text-navy bg-gold/5 -mx-6 px-6 font-semibold">
                  <span>University Exam & Registration Fee:</span>
                  <span className="text-navy/70">As per CCSU Norms</span>
                </div>
              </div>
            </div>

            {/* Table 2: LL.B. */}
            <div className="bg-white rounded-2xl border border-gold/20 shadow-sm overflow-hidden">
              <div className="bg-navy p-5 text-white flex items-center justify-between border-b border-gold/30">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">LL.B. (3 Years)</h3>
                  <p className="text-xs text-gold">Graduate Professional Law Degree</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-serif font-bold text-gold">₹32,000 / Yr</div>
                  <div className="text-[10px] text-slate-300">₹16,000 per semester</div>
                </div>
              </div>
              <div className="p-6 divide-y divide-gold/10 text-xs md:text-sm">
                <div className="py-2.5 flex justify-between text-navy">
                  <span className="font-medium">Tuition & Lecture Instruction Fee:</span>
                  <span className="font-bold">₹24,000 / year</span>
                </div>
                <div className="py-2.5 flex justify-between text-navy">
                  <span className="font-medium">Moot Court Trials & Legal Database Access:</span>
                  <span className="font-bold">₹5,000 / year</span>
                </div>
                <div className="py-2.5 flex justify-between text-navy">
                  <span className="font-medium">Library Subscriptions & Book Bank:</span>
                  <span className="font-bold">₹3,000 / year</span>
                </div>
                <div className="py-2.5 flex justify-between text-navy">
                  <span className="font-medium">One-Time Registration & Prospectus Fee:</span>
                  <span className="font-bold text-gold">₹1,000 (At Admission)</span>
                </div>
                <div className="py-2.5 flex justify-between text-navy bg-gold/5 -mx-6 px-6 font-semibold">
                  <span>University Exam & Registration Fee:</span>
                  <span className="text-navy/70">As per CCSU Norms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scholarships & Concessions Callout */}
          <div className="mt-8 bg-gradient-to-r from-navy via-navy to-navy-deep text-white rounded-2xl p-6 md:p-8 border border-gold/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Merit Scholarships & Financial Aid</span>
              </div>
              <h4 className="font-serif font-bold text-xl text-white">
                Empowering Merit, Supporting Diversity
              </h4>
              <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed">
                Special fee concessions are awarded to meritorious students achieving 85%+ in qualifying examinations, female applicants under our "Beti Padhao" initiative, and state scholarship facilitation for SC/ST/OBC/Minority students via the UP Social Welfare (Samaj Kalyan) Portal.
              </p>
            </div>
            <a
              href="#online-registration"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("online-registration");
              }}
              className="px-6 py-3 rounded-lg gradient-gold text-navy font-bold text-xs uppercase tracking-wider shrink-0 shadow-gold"
            >
              Enquire For Scholarship
            </a>
          </div>
        </section>

        {/* SECTION 4: Prospectus Download */}
        <section id="prospectus" className="scroll-mt-36">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-lg bg-navy/5 text-gold border border-gold/20">
              <Download className="w-5 h-5 text-gold" />
            </span>
            <span className="text-xs uppercase tracking-widest font-bold text-gold">Official Downloads</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Prospectus Download & Syllabi
          </h2>
          <p className="mt-2 text-sm md:text-base text-navy/85 font-medium max-w-3xl leading-relaxed">
            Download the official Information Brochure & Prospectus 2026–27 containing full details on the academic curriculum, faculty credentials, moot court fixtures, legal aid clinic, and campus ordinances.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              {
                title: "College Prospectus 2026–27",
                subtitle: "Official Information Brochure",
                file: baLlbStructurePdf,
                filename: "Janhit-College-Of-Law-Prospectus-2026.pdf",
                size: "PDF • 2.4 MB",
                icon: BookOpen,
                highlight: true,
              },
              {
                title: "B.A. LL.B. Course Structure",
                subtitle: "5-Year Integrated Degree Matrix",
                file: baLlbStructurePdf,
                filename: "BA-LLB-Course-Structure.pdf",
                size: "PDF • 215 KB",
                icon: GraduationCap,
                highlight: false,
              },
              {
                title: "B.A. LL.B. Detailed Syllabus",
                subtitle: "Semester-wise CCSU Curricula",
                file: baLlbSyllabusPdf,
                filename: "BA-LLB-Syllabus-2026-2027.pdf",
                size: "PDF • 1.8 MB",
                icon: FileText,
                highlight: false,
              },
              {
                title: "LL.B. 3-Year Course Syllabus",
                subtitle: "Clinical & Bar Subjects Matrix",
                file: llbSyllabusPdf,
                filename: "LLB-Syllabus-2026-2027.pdf",
                size: "PDF • 898 KB",
                icon: Scale,
                highlight: false,
              },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 ${
                    p.highlight
                      ? "bg-gradient-to-b from-navy to-navy-deep text-white border-gold/40 shadow-lg"
                      : "bg-white text-navy border-gold/20 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="space-y-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        p.highlight ? "bg-gold text-navy" : "bg-navy/5 text-gold border border-gold/20"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`font-serif font-bold text-base ${p.highlight ? "text-white" : "text-navy"}`}>
                        {p.title}
                      </h4>
                      <p className={`text-xs mt-1 font-medium ${p.highlight ? "text-slate-200" : "text-navy/85"}`}>
                        {p.subtitle}
                      </p>
                    </div>
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        p.highlight
                          ? "bg-white/10 text-gold border border-gold/20"
                          : "bg-slate-100 text-navy/60"
                      }`}
                    >
                      {p.size}
                    </span>
                  </div>

                  <a
                    href={p.file}
                    download={p.filename}
                    className={`mt-6 w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      p.highlight
                        ? "gradient-gold text-navy shadow-gold hover:shadow-lg"
                        : "bg-navy text-white hover:bg-gold hover:text-navy border border-gold/20"
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: Online Registration */}
        <section id="online-registration" className="scroll-mt-36">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-lg bg-navy/5 text-gold border border-gold/20">
              <Send className="w-5 h-5 text-gold" />
            </span>
            <span className="text-xs uppercase tracking-widest font-bold text-gold">Admissions Portal</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Online Registration 2026–2027
          </h2>
          <p className="mt-2 text-sm md:text-base text-navy/85 font-medium max-w-3xl leading-relaxed">
            Submit your pre-registration details to lock your application slot. Our admissions counsellor will get in touch to assist you with document verification and university pre-registration.
          </p>

          <div className="grid lg:grid-cols-12 gap-8 mt-8">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gold/25 p-6 md:p-8 shadow-sm">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={regForm.name}
                      onChange={handleFormChange}
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gold/30 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                      Contact Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={regForm.mobile}
                      onChange={handleFormChange}
                      required
                      placeholder="e.g. 9811400263"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gold/30 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={regForm.email}
                      onChange={handleFormChange}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gold/30 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                      Desired Programme *
                    </label>
                    <select
                      name="program"
                      value={regForm.program}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gold/30 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy"
                    >
                      <option value="ballb">B.A. LL.B. (5 Years Integrated)</option>
                      <option value="llb">LL.B. (3 Years Professional)</option>
                      <option value="llm">LL.M. (2 Years Postgraduate)</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                      Category
                    </label>
                    <select
                      name="category"
                      value={regForm.category}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gold/30 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy"
                    >
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="EWS">EWS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                      Qualifying %
                    </label>
                    <input
                      type="text"
                      name="percentage"
                      value={regForm.percentage}
                      onChange={handleFormChange}
                      placeholder="e.g. 78%"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gold/30 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                      City / State
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={regForm.city}
                      onChange={handleFormChange}
                      placeholder="e.g. Noida, UP"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gold/30 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5">
                    Questions / Notes (Optional)
                  </label>
                  <textarea
                    name="query"
                    rows={3}
                    value={regForm.query}
                    onChange={handleFormChange}
                    placeholder="Enter any questions regarding hostel, transport, or scholarships..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gold/30 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 text-navy"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-lg gradient-gold text-navy font-bold text-xs uppercase tracking-wider shadow-gold hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Registering..." : "Submit Online Registration"}</span>
                  </button>
                  <Link
                    to="/apply"
                    className="text-xs font-bold text-navy hover:text-gold flex items-center gap-1 transition-colors"
                  >
                    <span>Or Fill Full Interactive Application &rarr;</span>
                  </Link>
                </div>
              </form>
            </div>

            {/* Help & Contact Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-navy text-white rounded-2xl p-6 md:p-8 border border-gold/30 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold">Direct Helpline</span>
                  <h3 className="font-serif font-bold text-2xl text-white mt-1">Admission Desk</h3>
                  <p className="text-xs text-slate-200 font-medium mt-2 leading-relaxed">
                    Need guidance regarding eligibility calculation, university web registration code, or hostel accommodation? Speak directly with our law faculty advisors.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-gold/20 text-gold border border-gold/30">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 uppercase">Calling Hotline</div>
                      <a href="tel:9313402015" className="font-bold text-gold text-sm hover:underline">
                        +91 9313402015 / 9811400263
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-gold/20 text-gold border border-gold/30">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 uppercase">Admissions Email</div>
                      <a href="mailto:admission@janhitlaw.edu.in" className="font-bold text-white text-sm hover:underline">
                        admission@janhitlaw.edu.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-gold/20 text-gold border border-gold/30">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 uppercase">Campus Address</div>
                      <span className="font-semibold text-white">
                        Knowledge Park - 1, Greater Noida, UP - 201310
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-gold/20 text-gold border border-gold/30">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 uppercase">Admission Office Hours</div>
                      <span className="font-semibold text-white">Mon – Sat: 9:00 AM – 4:30 PM</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gold/20">
                  <div className="text-xs text-gold font-bold">University College Code: 1111</div>
                  <div className="text-[11px] text-slate-300">CCSU Law Department Affiliation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Important Dates */}
        <section id="important-dates" className="scroll-mt-36">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-lg bg-navy/5 text-gold border border-gold/20">
              <Calendar className="w-5 h-5 text-gold" />
            </span>
            <span className="text-xs uppercase tracking-widest font-bold text-gold">Admissions Calendar</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Important Dates (Session 2026–2027)
          </h2>
          <p className="mt-2 text-sm md:text-base text-navy/85 font-medium max-w-3xl leading-relaxed">
            Key calendar deadlines for applications, merit announcements, document verification, and classroom commencement.
          </p>

          <div className="mt-8 bg-white rounded-2xl border border-gold/20 shadow-sm overflow-hidden">
            <div className="bg-navy p-4 px-6 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Admission Milestone Event</span>
              <span>Timeline / Status</span>
            </div>
            <div className="divide-y divide-gold/10 text-xs md:text-sm">
              {[
                {
                  event: "Online Application & Registration Portal Open",
                  date: "May 1, 2026",
                  status: "Active / Open",
                  statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
                },
                {
                  event: "Phase 1 Legal Aptitude & Career Counselling Sessions",
                  date: "June 1 – June 30, 2026",
                  status: "Ongoing",
                  statusClass: "bg-gold/15 text-gold border-gold/30",
                },
                {
                  event: "CCSU Portal Law Pre-Registration Closes",
                  date: "July 15, 2026",
                  status: "University Schedule",
                  statusClass: "bg-navy/5 text-navy border-navy/20",
                },
                {
                  event: "First Merit Cut-Off List & Document Verification Window",
                  date: "July 20 – July 31, 2026",
                  status: "Upcoming",
                  statusClass: "bg-blue-50 text-blue-700 border-blue-200",
                },
                {
                  event: "Second Merit List & Seat Confirmation Against Vacancies",
                  date: "August 1 – August 10, 2026",
                  status: "Upcoming",
                  statusClass: "bg-blue-50 text-blue-700 border-blue-200",
                },
                {
                  event: "Induction Ceremony & Moot Court Orientation Day",
                  date: "August 16, 2026",
                  status: "Campus Event",
                  statusClass: "bg-purple-50 text-purple-700 border-purple-200",
                },
                {
                  event: "Commencement of Regular Classroom Teaching (Odd Term)",
                  date: "August 18, 2026",
                  status: "Academic Start",
                  statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
                },
              ].map((row, idx) => (
                <div key={idx} className="p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-gold/5 transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-bold text-navy block text-sm">{row.event}</span>
                    <span className="text-xs text-navy/60 block">{row.date}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border self-start sm:self-auto ${row.statusClass}`}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
