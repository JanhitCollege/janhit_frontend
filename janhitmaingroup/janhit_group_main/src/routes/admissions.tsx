import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader, FadeIn } from "@/components/Section";
import {
  Download,
  Phone,
  Send,
  GraduationCap,
  ArrowRight,
  BookOpen,
  CheckCircle,
  FileText,
  UserCheck,
  CreditCard,
} from "lucide-react";
import { institutions } from "@/data/institutions";
import { useState } from "react";
import { getStoredCampuses } from "@/data/campuses";
import { createAdmissionLead } from "@/data/admissionLeads";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Janhit Group of Institutions" },
      {
        name: "description",
        content:
          "Apply online to Janhit colleges and schools. Review the step-by-step admission process, academic eligibility, fee structure, and prospectus.",
      },
      { property: "og:title", content: "Admissions Open — Janhit Group" },
      { property: "og:description", content: "Begin your Janhit journey today." },
    ],
  }),
  component: Admissions,
});

function Admissions() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const course = formData.get("course") as string;
    const campusSlug = formData.get("campus") as string;
    const city = formData.get("city") as string;
    const message = formData.get("message") as string;

    // Find campus ID from campusSlug
    const campuses = getStoredCampuses();
    let campusId = "1"; // Default fallback
    const matchedCampus = campuses.find(
      (c) => c.slug === campusSlug || c.slug.includes(campusSlug) || campusSlug.includes(c.slug),
    );
    if (matchedCampus) {
      campusId = matchedCampus.id;
    } else {
      const matchedByName = campuses.find(
        (c) =>
          c.name.toLowerCase().includes(campusSlug.toLowerCase()) ||
          c.shortName.toLowerCase().includes(campusSlug.toLowerCase()),
      );
      if (matchedByName) {
        campusId = matchedByName.id;
      }
    }

    // Call database create
    createAdmissionLead({
      name: name || "",
      email: email || "",
      mobile: phone || "",
      course: course || "",
      campusId,
      city: city || "",
      message: message || "",
    });

    setSent(true);
    setTimeout(() => setSent(false), 4000);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <>
      {/* Hero Header */}
      <section className="relative py-24 bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="container-tight relative">
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-gold border border-gold/40">
              Admissions Open 2026-27
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold max-w-3xl leading-tight">
              Shape your future. <span className="text-gradient-gold">Join Janhit</span>.
            </h1>
            <p className="mt-6 text-lg opacity-90 max-w-2xl">
              We welcome ambitious minds to our colleges and schools across Uttar Pradesh. Review
              our criteria, download our brochure, and submit your application online.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Info Quick Links */}
      <section className="py-12 bg-secondary/30">
        <div className="container-tight">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Send,
                title: "Apply Online",
                desc: "Fill the application inquiry form below to initiate your process.",
              },
              {
                icon: Download,
                title: "Download Prospectus",
                desc: "Get detailed brochure PDFs for all programs.",
              },
              { icon: Phone, title: "Admission Helpline", desc: "+91 98765 43210 (10 AM to 6 PM)" },
            ].map((c) => (
              <div
                key={c.title}
                className="p-8 md:p-10 rounded-3xl bg-card border border-border flex items-start gap-6 hover:shadow-elegant hover:border-gold/20 transition-all duration-300"
              >
                <div className="size-14 rounded-full bg-gold/10 text-gold grid place-items-center shrink-0">
                  <c.icon className="size-7" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process Section */}
      <section id="process" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Admissions"
            title="Admission Process"
            subtitle="Follow these simple steps to secure your enrollment at any of our campuses."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Online Inquiry / Registration",
                desc: "Fill out our brief online registration form with your choice of course, campus, and contact details.",
                icon: FileText,
              },
              {
                step: "02",
                title: "Academic Counseling",
                desc: "Our senior counselors will contact you to explain course parameters, campus selections, and career opportunities.",
                icon: Phone,
              },
              {
                step: "03",
                title: "Verification & Eligibility Check",
                desc: "Visit the selected campus or upload documents online to verify your marks, age proof, and category eligibility.",
                icon: UserCheck,
              },
              {
                step: "04",
                title: "Seat Allocation & Fee Receipt",
                desc: "Pay the required registration or semester fees to secure your seat and receive your official enrollment kit.",
                icon: CreditCard,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.step} delay={idx * 0.05}>
                  <div className="p-8 md:p-10 rounded-3xl bg-card border border-border h-full flex flex-col justify-between hover:border-gold/30 hover:shadow-elegant transition duration-300 relative group">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div className="size-14 rounded-full bg-gold/10 text-gold grid place-items-center group-hover:scale-105 transition-transform duration-300">
                          <Icon className="size-7" />
                        </div>
                        <span className="font-display font-bold text-3xl text-gold/30">
                          {item.step}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-lg md:text-xl text-foreground leading-tight">
                        {item.title}
                      </h4>
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria Section */}
      <section id="eligibility" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Requirements"
            title="Eligibility Criteria"
            subtitle="Review the academic prerequisites for entering our colleges and schools."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
            {/* College eligibility */}
            <FadeIn>
              <div className="p-10 md:p-12 rounded-3xl bg-card border border-border h-full hover:border-gold/30 hover:shadow-elegant transition duration-300">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border/80">
                  <div className="size-12 rounded-xl bg-gold/10 text-gold grid place-items-center">
                    <GraduationCap className="size-6" />
                  </div>
                  <h3 className="font-display font-bold text-2xl">Colleges & Degree Courses</h3>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      course: "B.A. LL.B (5 Years Program)",
                      req: "10+2 passing marks from any recognized board. General category: Min 50%, Reserved category: Min 45% (based on CCS University and BCI directives).",
                    },
                    {
                      course: "LL.B (3 Years Program)",
                      req: "Graduation degree in any stream. Min 50% score for General candidates, with appropriate relaxation according to government laws.",
                    },
                    {
                      course: "BBA / BCA / B.Sc / B.Com",
                      req: "10+2 pass marks in any stream (Science PCB/PCM specifically required for B.Sc courses) with a minimum of 50% marks in aggregate.",
                    },
                    {
                      course: "B.Ed / D.El.Ed / B.P.Ed (Teacher Ed)",
                      req: "Graduation or Post-Graduation degree in arts, commerce, or science with at least 50% marks. Subjects vary per course specification.",
                    },
                  ].map((item) => (
                    <div key={item.course} className="flex gap-4">
                      <CheckCircle className="size-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-foreground">{item.course}</div>
                        <div className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed">
                          {item.req}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* School eligibility */}
            <FadeIn delay={0.1}>
              <div className="p-10 md:p-12 rounded-3xl bg-card border border-border h-full hover:border-gold/30 hover:shadow-elegant transition duration-300">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border/80">
                  <div className="size-12 rounded-xl bg-primary/10 text-primary grid place-items-center">
                    <BookOpen className="size-6" />
                  </div>
                  <h3 className="font-display font-bold text-2xl">Janhit World School (K-12)</h3>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      course: "Pre-Primary (Nursery, LKG, UKG)",
                      req: "Age criteria as of 31st March of the academic year: Nursery (3+ years), LKG (4+ years), UKG (5+ years). No written entrance tests.",
                    },
                    {
                      course: "Primary & Middle School (Grades I to VIII)",
                      req: "Pass records, transfer certificate (TC), and report card of the previous grade. Interactive meeting with the subject tutors and principal.",
                    },
                    {
                      course: "Secondary & Senior Secondary (Grades IX to XII)",
                      req: "Passing board certificates of Class X for entry into Grade XI. Choice of Streams (Science, Commerce, Humanities) based on class average and entrance assessment.",
                    },
                  ].map((item) => (
                    <div key={item.course} className="flex gap-4">
                      <CheckCircle className="size-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-foreground">{item.course}</div>
                        <div className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed">
                          {item.req}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Fee Structure Section */}
      <section id="fees" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Financials"
            title="Fee Structure"
            subtitle="Clear, honest, and competitive tuition fees across our main disciplines."
          />

          <div className="mt-12 max-w-4xl mx-auto overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-secondary/40 border-b border-border font-display">
                    <th className="p-4 md:p-5 font-bold">Course Group</th>
                    <th className="p-4 md:p-5 font-bold">Duration</th>
                    <th className="p-4 md:p-5 font-bold text-right">Indicative Fee (Annual)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {[
                    { course: "B.A. LL.B (Law)", duration: "5 Years", fee: "₹ 65,000" },
                    { course: "LL.B (3-Year Law)", duration: "3 Years", fee: "₹ 55,000" },
                    { course: "LL.M (Post-Grad Law)", duration: "2 Years", fee: "₹ 80,000" },
                    { course: "BBA / BCA (Management & CS)", duration: "3 Years", fee: "₹ 45,000" },
                    { course: "B.Ed (Teacher Training)", duration: "2 Years", fee: "₹ 51,250" },
                    {
                      course: "B.Sc / B.Com / B.A",
                      duration: "3 Years",
                      fee: "₹ 25,000 - ₹ 35,000",
                    },
                    {
                      course: "Schooling (Nursery to Class XII)",
                      duration: "Grade Wise",
                      fee: "Contact Campus",
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-accent/40 transition-colors">
                      <td className="p-4 md:p-5 font-semibold text-foreground">{row.course}</td>
                      <td className="p-4 md:p-5 text-muted-foreground">{row.duration}</td>
                      <td className="p-4 md:p-5 text-right font-display font-bold text-gold">
                        {row.fee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 md:p-5 bg-secondary/20 text-xs text-muted-foreground border-t border-border leading-relaxed">
              * Note: The annual fees mentioned above are subject to revision according to State
              Government guidelines and university affiliations. Exam fees, bus transport, hostel,
              and uniform charges are billed separately based on individual utilization.
            </div>
          </div>
        </div>
      </section>

      {/* Prospectus Section */}
      <section id="prospectus" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Downloads"
            title="Download Prospectus"
            subtitle="Get access to comprehensive brochures detailing college policies, course syllabus, and campus rules."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            {[
              {
                title: "Colleges Prospectus 2026-27",
                desc: "Contains details regarding Law programs, BCA, BBA, B.Ed and general degree courses across our Greater Noida, Ghaziabad, and Saharanpur colleges.",
                file: "Janhit_Higher_Education_Brochure_2026.pdf",
              },
              {
                title: "Janhit World School Brochure",
                desc: "Contains curriculum details, co-curricular highlights, sports academies info, fee rules, and admission criteria for Nursery to Class XII.",
                file: "Janhit_World_School_Prospectus.pdf",
              },
            ].map((brochure, idx) => (
              <FadeIn key={brochure.title} delay={idx * 0.1}>
                <div className="p-10 md:p-12 rounded-3xl bg-card border border-border h-full flex flex-col justify-between hover:border-gold/30 hover:shadow-elegant transition duration-300">
                  <div>
                    <div className="size-14 rounded-full bg-gold/10 text-gold grid place-items-center mb-6">
                      <Download className="size-7" />
                    </div>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">
                      {brochure.title}
                    </h3>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {brochure.desc}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                      PDF File
                    </span>
                    <button className="inline-flex items-center gap-1.5 text-sm text-gold font-bold hover:underline">
                      Download Now <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Online Section */}
      <section id="apply" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Form"
            title="Apply Online / Inquiry"
            subtitle="Complete the form below. Our admissions helpdesk will review your submission and contact you within 24 hours."
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-3xl border border-border bg-card">
                <h3 className="font-display font-bold text-lg mb-4">Admissions Help Desk</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Have questions about the admission process, eligibility requirements, or transport
                  lines? Get in touch directly with our counselors.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="size-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">+91 99585 74400</div>
                      <div className="text-muted-foreground mt-0.5">Greater Noida College</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="size-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">9958574400, 9773500617</div>
                      <div className="text-muted-foreground mt-0.5">Janhit World School Desk</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form
                onSubmit={onSubmit}
                className="grid md:grid-cols-2 gap-4 p-8 rounded-3xl bg-card border border-border"
              >
                <Field label="Full Name" name="name" required />
                <Field label="Phone" name="phone" type="tel" required />
                <Field label="Email" name="email" type="email" required />
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                    Course
                  </label>
                  <select
                    name="course"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm"
                  >
                    <option value="">Select a course</option>
                    {[
                      "LL.B",
                      "LL.M",
                      "B.A. LL.B",
                      "BBA",
                      "BCA",
                      "B.Sc",
                      "B.Com",
                      "B.A",
                      "B.Ed",
                      "D.El.Ed",
                      "B.P.Ed",
                      "Agriculture",
                      "K-12 School",
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                    Campus
                  </label>
                  <select
                    name="campus"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm"
                  >
                    <option value="">Select a campus</option>
                    {institutions.map((i) => (
                      <option key={i.slug} value={i.slug}>
                        {i.name} — {i.city}
                      </option>
                    ))}
                  </select>
                </div>
                <Field label="City" name="city" />
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm"
                  />
                </div>
                <div className="md:col-span-2 flex items-center justify-between gap-3 mt-4">
                  {sent ? (
                    <p className="text-sm text-green-600 font-semibold">
                      ✓ Inquiry received. We'll be in touch shortly.
                    </p>
                  ) : (
                    <span />
                  )}
                  <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-gold text-gold-foreground font-semibold shadow-gold hover:scale-[1.02] transition">
                    Submit Inquiry <Send className="size-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={120}
        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm"
      />
    </div>
  );
}
