import { Link } from "react-router-dom";
import { CheckCircle2, FileText, Phone, Award, ShieldCheck, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { AdmissionForm } from "@/components/site/AdmissionForm";
import { COLLEGE_INFO } from "@/data/collegeInfo";
import { COURSES_DATA } from "@/data/coursesData";

export function AdmissionPage() {
  return (
    <>
      <SEO
        title="College Admissions 2026-27 | Janhit Degree College Saharanpur"
        description="Apply online for admissions 2026-27 at Janhit Degree College Saharanpur for BA, BBA, BCA, B.Com, B.Ed, D.El.Ed, B.P.Ed and B.Sc courses. Affiliated to CCSU Meerut."
      />

      <Breadcrumb
        title="College Admissions 2026-2027"
        items={[{ label: "Admissions" }]}
      />

      {/* Hero Admissions Open Announcement */}
      <section className="bg-navy text-white py-12 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold font-bold bg-gold/20 px-3 py-1 rounded border border-gold/30">
              Registration Open
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
              Admissions Open for Academic Session 2026-2027
            </h1>
            <p className="text-xs md:text-sm text-white/80">
              Ch. Charan Singh University, Meerut Affiliated & NCTE Approved Degree Programs
            </p>
          </div>

          <a
            href={`tel:${COLLEGE_INFO.phone}`}
            className="px-6 py-3 rounded gradient-gold text-navy-deep font-bold text-sm uppercase tracking-wider shadow-gold flex items-center gap-2 shrink-0"
          >
            <Phone className="h-4 w-4" />
            <span>Call Helpline: {COLLEGE_INFO.phone}</span>
          </a>
        </div>
      </section>

      {/* Main Admission Process & Form Section */}
      <section className="py-16 bg-white border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Process & Guidelines */}
            <div className="lg:col-span-7 space-y-8">
              {/* Overview */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gold block">
                  Admission Overview
                </span>
                <h2 className="font-serif text-3xl font-bold text-navy">
                  Simple Step-by-Step Admission Process
                </h2>
                <div className="gold-divider w-20" />
                <p className="text-sm text-navy/80 leading-relaxed">
                  Janhit Degree College welcomes applications from motivated students across humanities, commerce, science, management, IT, and teacher education disciplines. Admissions follow CCS University merit rules and NCTE guidelines.
                </p>
              </div>

              {/* Admission Steps */}
              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "Submit Online / Offline Registration Form",
                    desc: "Fill out the admission enquiry form on this portal or collect the application form from the college admission desk in Chhutmalpur, Saharanpur.",
                  },
                  {
                    step: "02",
                    title: "Document Verification & Eligibility Check",
                    desc: "Submit academic marksheets (10th, 12th, Graduation as applicable), Aadhaar card, transfer certificate, and category certificates for verification.",
                  },
                  {
                    step: "03",
                    title: "Merit Confirmation & Seat Allocation",
                    desc: "Seats are allotted based on academic merit percentage or entrance counseling rank as per CCS University & UP State norms.",
                  },
                  {
                    step: "04",
                    title: "Fee Payment & Final Admission",
                    desc: "Complete the admission formalities by depositing course fees to confirm your seat for the 2026-27 session.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="bg-white p-5 rounded-xl border border-gold/20 shadow-sm flex items-start gap-4"
                  >
                    <span className="font-serif text-2xl font-bold text-gold shrink-0 w-10 text-center">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-navy">{item.title}</h3>
                      <p className="text-xs text-navy/70 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Required Documents Checklist */}
              <div className="bg-white p-6 rounded-xl border border-gold/30 shadow-md space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gold" />
                  <h3 className="font-serif text-xl font-bold text-navy">
                    Required Documents Checklist
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-navy/80 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>10th Marksheet & Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>12th Marksheet & Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Graduation Marksheet (for B.Ed / D.El.Ed)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Transfer & Character Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Aadhaar Card Copy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Passport Size Photographs (6 copies)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Caste / Income Certificate (if applicable)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Migration Certificate (if outside CCSU)</span>
                  </div>
                </div>
              </div>

              {/* Course Admission Landing Pages Grid */}
              <div className="space-y-4 pt-4 border-t border-gold/20">
                <h3 className="font-serif text-xl font-bold text-navy">
                  Course-Specific Admission Pages
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {COURSES_DATA.map((c) => (
                    <Link
                      key={c.id}
                      to={`/admission/${c.slug}`}
                      className="p-3 bg-white rounded-lg border border-gold/20 hover:border-gold hover:bg-gold/10 text-center transition-colors"
                    >
                      <span className="font-serif text-sm font-bold text-navy block">{c.code} Admission</span>
                      <span className="text-[10px] text-navy/60 block">View Rules</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Admission Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <AdmissionForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
