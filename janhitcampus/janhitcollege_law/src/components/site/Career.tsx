import React, { useState } from "react";
import { toast } from "sonner";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  Send,
  Building2,
  BookOpen,
  Award,
  Users,
  Scale,
  FileText,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  dept: string;
  positions: string;
  experience: string;
  qualification: string;
  specialization: string;
  type: string;
  location: string;
}

const JOB_OPENINGS: JobOpening[] = [
  {
    id: "prof-law",
    title: "Professor / Associate Professor (Law)",
    dept: "Department of Law (B.A.LL.B. & LL.B.)",
    positions: "02 Positions",
    experience: "8+ Years of Academic / Research Experience",
    qualification: "LL.M. with minimum 55% marks, Ph.D. in Law & UGC-NET qualified as per UGC/BCI norms.",
    specialization: "Constitutional Law, Criminal Law, Corporate Law, Cyber Law",
    type: "Full-Time",
    location: "Greater Noida Campus",
  },
  {
    id: "asst-prof-law",
    title: "Assistant Professor (Law)",
    dept: "Department of Law",
    positions: "04 Positions",
    experience: "2-5 Years preferred (Fresh LL.M. with UGC-NET eligible)",
    qualification: "Master of Laws (LL.M.) with minimum 55% marks and UGC-NET / SLET qualification.",
    specialization: "Civil Procedure Code, Jurisprudence, Family Law, Law of Torts, International Law",
    type: "Full-Time",
    location: "Greater Noida Campus",
  },
  {
    id: "moot-court-trainer",
    title: "Moot Court Trainer & Legal Aid Director",
    dept: "Practical Training & Moot Court Society",
    positions: "01 Position",
    experience: "3+ Years of active Bar practice or Moot Court coaching",
    qualification: "LL.B. / LL.M., Bar Council enrolled advocate with notable mooting/trial records.",
    specialization: "Memorial drafting, trial advocacy, legal aid clinics, appellate court argumentation",
    type: "Full-Time / Visiting",
    location: "Greater Noida Campus",
  },
  {
    id: "law-librarian",
    title: "Law Librarian / Assistant Librarian",
    dept: "Digital Legal Information Resource Centre",
    positions: "01 Position",
    experience: "2+ Years managing law library repositories & digital subscriptions",
    qualification: "M.Lib.I.Sc / B.Lib.I.Sc with hands-on proficiency in SCC Online, Manupatra & AIR databases.",
    specialization: "Digital legal database administration, cataloguing & legal periodicals management",
    type: "Full-Time",
    location: "Greater Noida Campus",
  },
  {
    id: "academic-coordinator",
    title: "Academic Coordinator & Legal Admin Officer",
    dept: "Law Academic Operations & University Liaison",
    positions: "02 Positions",
    experience: "2-4 Years in higher educational administration / exam cell management",
    qualification: "Graduate / Post Graduate degree with proficiency in ERP portals, MS Office & BCI documentation.",
    specialization: "CCSU examination liaisons, attendance registry, academic timetable governance",
    type: "Full-Time",
    location: "Greater Noida Campus",
  },
];

const PERKS = [
  {
    icon: Scale,
    title: "Academic Autonomy",
    desc: "Freedom to design innovative legal pedagogy, case law seminars, and moot court curricula.",
  },
  {
    icon: Award,
    title: "UGC / BCI Scale & Perks",
    desc: "Competitive remuneration aligned with UGC/BCI norms, commensurate with experience and merit.",
  },
  {
    icon: BookOpen,
    title: "Research & Publication",
    desc: "Full institutional backing for research papers, judicial publications, and international conferences.",
  },
  {
    icon: Building2,
    title: "Modern Infrastructure",
    desc: "Hi-tech air-conditioned moot courtroom, Wi-Fi campus, and digital law research library.",
  },
];

export function Career() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    position: JOB_OPENINGS[0].title,
    qualification: "",
    experience: "",
    currentOrg: "",
    resumeLink: "",
    coverNote: "",
  });
  const [loading, setLoading] = useState(false);

  const handleApplyClick = (jobTitle: string) => {
    setFormData((prev) => ({ ...prev, position: jobTitle }));
    const el = document.getElementById("apply");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Application Submitted Successfully!", {
        description: `Thank you, ${formData.fullName}. Your application for "${formData.position}" has been received. Our recruitment committee will contact you shortly.`,
      });
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        position: JOB_OPENINGS[0].title,
        qualification: "",
        experience: "",
        currentOrg: "",
        resumeLink: "",
        coverNote: "",
      });
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative py-16 md:py-20 bg-white text-navy overflow-hidden border-b border-gold/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.74_0.12_85/0.15),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 text-navy text-xs font-bold uppercase tracking-widest border border-gold/35 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Career Opportunities</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-navy leading-tight">
              Build Your Career in <span className="text-gold italic font-serif">Legal Education</span>
            </h1>
            <p className="text-navy/85 text-sm md:text-base font-medium leading-relaxed">
              Join the distinguished faculty and professional administrative team at Janhit College of Law, Greater Noida. Inspire the next generation of jurists, advocates, and legal scholars in an intellectually vibrant environment.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#openings"
                className="px-6 py-3 rounded-xl gradient-gold text-navy-deep font-bold text-sm tracking-wider uppercase shadow-gold hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>View Current Openings</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#apply"
                className="px-6 py-3 rounded-xl border border-gold/40 text-navy hover:bg-gold/10 font-bold text-sm tracking-wider uppercase transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs bg-slate-50"
              >
                <span>Apply Online</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Join Us Highlights */}
      <section className="py-16 bg-white border-b border-gold/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Work Culture</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
              Why Teach & Work at Janhit College of Law?
            </h2>
            <div className="h-1 w-16 bg-gold mx-auto rounded" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gold/20 p-6 shadow-xs hover:shadow-lg transition-all hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy/5 text-gold flex items-center justify-center group-hover:bg-navy group-hover:text-gold transition-colors mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-navy group-hover:text-gold transition-colors mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-navy/85 font-medium leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Current Openings Section */}
      <section id="openings" className="py-20 scroll-mt-24 bg-white border-b border-gold/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Current Openings
              </span>
              <h2 className="text-3xl font-serif font-bold text-navy">
                Open Faculty & Administrative Positions
              </h2>
              <div className="h-1 w-20 bg-gold rounded" />
              <p className="text-sm text-navy/85 font-medium max-w-2xl pt-1">
                Explore active career positions for the current and upcoming academic sessions. We welcome applications from passionate educators and legal practitioners.
              </p>
            </div>
            <div className="text-xs text-navy/70 bg-gold/15 border border-gold/30 px-4 py-2 rounded-xl font-medium w-fit">
              Campus: Knowledge Park - 1, Greater Noida
            </div>
          </div>

          <div className="grid gap-6">
            {JOB_OPENINGS.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gold/20 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-gold flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-navy text-gold text-xs font-bold tracking-wide">
                      {job.type}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gold/20 text-navy text-xs font-semibold">
                      {job.positions}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-navy/70">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      {job.location}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-navy mb-1">
                      {job.title}
                    </h3>
                    <p className="text-xs md:text-sm font-semibold text-gold">{job.dept}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-xs text-navy/80 pt-2 border-t border-gold/10">
                    <div>
                      <span className="font-bold text-navy block">Eligibility / Qualification:</span>
                      <span className="leading-relaxed text-navy/70">{job.qualification}</span>
                    </div>
                    <div>
                      <span className="font-bold text-navy block">Experience Required:</span>
                      <span className="leading-relaxed text-navy/70">{job.experience}</span>
                    </div>
                  </div>

                  {job.specialization && (
                    <div className="text-xs text-navy/80">
                      <span className="font-bold text-navy">Core Subjects / Specialization: </span>
                      <span className="text-navy/70">{job.specialization}</span>
                    </div>
                  )}
                </div>

                <div className="lg:pl-6 lg:border-l border-gold/20 flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <button
                    onClick={() => handleApplyClick(job.title)}
                    className="px-6 py-3 rounded-xl gradient-gold text-navy-deep font-bold text-xs uppercase tracking-wider shadow-gold hover:-translate-y-0.5 transition-all text-center cursor-pointer"
                  >
                    Apply for this Role
                  </button>
                  <a
                    href="mailto:careers@janhitlawcollege.org"
                    className="px-5 py-2.5 rounded-xl border border-navy/20 hover:bg-navy/5 text-navy text-xs font-semibold text-center transition-colors"
                  >
                    Email Resume
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Application Form Section */}
      <section id="apply" className="py-20 scroll-mt-24 bg-white border-t border-gold/15">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/5 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
              <Briefcase className="w-3.5 h-3.5 text-gold" />
              <span>Direct Recruitment Portal</span>
            </span>
            <h2 className="text-3xl font-serif font-bold text-navy">Submit Your Job Application</h2>
            <div className="h-1 w-20 bg-gold mx-auto rounded" />
            <p className="text-xs md:text-sm text-navy/85 font-medium">
              Fill in your professional credentials below. Candidates shortlisted for interview rounds will be contacted via telephone or email.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gold/25 p-8 md:p-12 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="text-xs font-bold text-navy uppercase tracking-wide">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="e.g. Dr. Ramesh Kumar"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full text-sm bg-white border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-navy uppercase tracking-wide">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="e.g. candidate@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-sm bg-white border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="mobile" className="text-xs font-bold text-navy uppercase tracking-wide">
                    Mobile / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full text-sm bg-white border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="position" className="text-xs font-bold text-navy uppercase tracking-wide">
                    Position Applied For <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full text-sm bg-white border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold transition-colors cursor-pointer"
                  >
                    {JOB_OPENINGS.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                    <option value="Other Academic Position">Other Academic Position</option>
                    <option value="Other Administrative Staff">Other Administrative Staff</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="qualification" className="text-xs font-bold text-navy uppercase tracking-wide">
                    Highest Qualification <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    required
                    placeholder="e.g. Ph.D. in Law / LL.M. with NET"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full text-sm bg-white border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="experience" className="text-xs font-bold text-navy uppercase tracking-wide">
                    Total Experience (Years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    required
                    placeholder="e.g. 5 Years in Teaching / 3 Years at Bar"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full text-sm bg-white border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="currentOrg" className="text-xs font-bold text-navy uppercase tracking-wide">
                    Current Organization & Designation
                  </label>
                  <input
                    type="text"
                    id="currentOrg"
                    name="currentOrg"
                    placeholder="e.g. Assistant Professor at ABC College"
                    value={formData.currentOrg}
                    onChange={handleChange}
                    className="w-full text-sm bg-white border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="resumeLink" className="text-xs font-bold text-navy uppercase tracking-wide">
                    Google Drive / LinkedIn / Resume Link
                  </label>
                  <input
                    type="url"
                    id="resumeLink"
                    name="resumeLink"
                    placeholder="https://drive.google.com/... or LinkedIn URL"
                    value={formData.resumeLink}
                    onChange={handleChange}
                    className="w-full text-sm bg-white border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="coverNote" className="text-xs font-bold text-navy uppercase tracking-wide">
                  Brief Cover Note / Research & Teaching Statement
                </label>
                <textarea
                  id="coverNote"
                  name="coverNote"
                  rows={4}
                  placeholder="Outline your areas of legal expertise, recent publications, and teaching methodology..."
                  value={formData.coverNote}
                  onChange={handleChange}
                  className="w-full text-sm bg-white border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="declaration"
                  required
                  className="mt-1 h-4 w-4 rounded border-gold/30 text-gold focus:ring-gold"
                />
                <label htmlFor="declaration" className="text-xs text-navy/70 leading-relaxed cursor-pointer">
                  I hereby declare that the information furnished above is authentic and complete to the best of my knowledge. I understand that false or misleading details will disqualify my candidature.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl gradient-gold text-navy-deep font-bold text-sm tracking-wider uppercase shadow-gold hover:-translate-y-0.5 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Direct HR email assistance */}
            <div className="mt-8 pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy/75">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>
                  Or email your CV directly to{" "}
                  <a
                    href="mailto:info@janhitlawcollege.org"
                    className="font-bold text-navy hover:text-gold underline"
                  >
                    info@janhitlawcollege.org
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>
                  Recruitment Helplines:{" "}
                  <a href="tel:9313402015" className="font-bold text-navy hover:text-gold">
                    9313402015
                  </a>
                  {" / "}
                  <a href="tel:9560614440" className="font-bold text-navy hover:text-gold">
                    9560614440
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
