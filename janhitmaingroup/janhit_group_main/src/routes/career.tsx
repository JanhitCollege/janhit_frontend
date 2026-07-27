import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, FadeIn } from "@/components/Section";
import { useState } from "react";
import { Briefcase, Send, CheckCircle, Clock, GraduationCap, Upload } from "lucide-react";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Careers — Janhit Group of Institutions" },
      {
        name: "description",
        content:
          "Join the faculty or administration team at Janhit Group. Explore current openings and apply online today.",
      },
    ],
  }),
  component: Career,
});

const jobs = [
  {
    title: "Professor / Associate Professor",
    dept: "Department of Law",
    experience: "8+ Years of Teaching / Research Experience",
    qual: "LL.M. with Ph.D. in Law and NET qualified as per UGC norms.",
    type: "Full-Time",
  },
  {
    title: "Assistant Professor",
    dept: "Management & Computer Applications",
    experience: "3+ Years of Experience preferred",
    qual: "MBA / MCA / PG degree with UGC-NET or Ph.D. in the relevant stream.",
    type: "Full-Time",
  },
  {
    title: "PGT / TGT Teachers",
    dept: "Janhit World School (K-12)",
    experience: "2-5 Years in CBSE/ICSE Schools",
    qual: "Post-Graduate / Graduate degree with B.Ed. and CTET certification.",
    type: "Full-Time",
  },
  {
    title: "Admissions & Marketing Officer",
    dept: "Administration & Relations",
    experience: "1-3 Years in Educational Admissions",
    qual: "Graduate degree in any stream with excellent communication and client skills.",
    type: "Full-Time",
  },
];

function Career() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    (e.currentTarget as HTMLFormElement).reset();
  };

  const handleApplyNow = () => {
    const el = document.getElementById("apply");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Header */}
      <section className="relative py-24 bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="container-tight relative">
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-gold border border-gold/40">
              Join Our Faculty & Staff
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold max-w-3xl leading-tight">
              Build your career. <span className="text-gradient-gold">Inspire minds</span>.
            </h1>
            <p className="mt-6 text-lg opacity-90 max-w-2xl">
              Become part of a highly qualified team committed to excellence in legal, teacher,
              computer science, and schooling education.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Current Openings Section */}
      <section id="openings" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Positions"
            title="Current Openings"
            subtitle="Explore our active job openings across colleges and school branches."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
            {jobs.map((job, idx) => (
              <FadeIn key={idx} delay={idx * 0.05}>
                <div className="p-8 md:p-10 rounded-3xl bg-card border border-border h-full flex flex-col justify-between hover:border-gold/30 hover:shadow-elegant transition duration-300 group">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="size-14 rounded-full bg-gold/10 text-gold grid place-items-center group-hover:scale-105 transition-transform duration-300">
                        <Briefcase className="size-7" />
                      </div>
                      <span className="text-xs font-semibold bg-secondary px-3 py-1 rounded-full text-muted-foreground">
                        {job.type}
                      </span>
                    </div>
                    <div className="text-[11px] uppercase tracking-wider font-bold text-gold">
                      {job.dept}
                    </div>
                    <h3 className="mt-2 font-display font-bold text-xl md:text-2xl text-foreground leading-snug">
                      {job.title}
                    </h3>

                    <div className="mt-6 space-y-4 pt-4 border-t border-border/80">
                      <div className="flex gap-3">
                        <Clock className="size-5 text-gold flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-foreground">
                            Experience Required
                          </div>
                          <div className="text-xs md:text-sm text-muted-foreground mt-1 leading-relaxed">
                            {job.experience}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <GraduationCap className="size-5 text-gold flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-foreground">
                            Desired Qualification
                          </div>
                          <div className="text-xs md:text-sm text-muted-foreground mt-1 leading-relaxed">
                            {job.qual}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <button
                      onClick={handleApplyNow}
                      className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl border border-border hover:border-gold/40 hover:bg-gold/5 text-sm font-semibold text-foreground group-hover:text-gold transition duration-300"
                    >
                      Apply for this Role
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Online Form Section */}
      <section id="apply" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Application"
            title="Apply Online"
            subtitle="Submit your details and CV here. Our recruitment committee will review and schedule an interview."
          />

          <div className="max-w-3xl mx-auto mt-12">
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-5 p-8 md:p-12 rounded-3xl bg-card border border-border shadow-sm"
            >
              <div className="md:col-span-2 pb-2 border-b border-border/80 mb-2">
                <h3 className="font-display font-bold text-2xl text-foreground">
                  Job Application Form
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Please fill all fields accurately.
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  maxLength={100}
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                  Contact Number
                </label>
                <input
                  required
                  type="tel"
                  maxLength={15}
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  maxLength={100}
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                  Position Applied For
                </label>
                <select
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:border-gold focus:outline-none"
                >
                  <option value="">Select a position</option>
                  <option value="Professor">Professor / Associate Professor</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="PGT/TGT Teacher">PGT / TGT Teacher</option>
                  <option value="Admissions Officer">Admissions Officer</option>
                  <option value="Other">Other Administrative Staff</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                  Highest Qualification
                </label>
                <input
                  required
                  type="text"
                  maxLength={120}
                  placeholder="e.g. Ph.D. in Law, MBA, B.Ed"
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                  Brief Professional Summary
                </label>
                <textarea
                  rows={4}
                  placeholder="Summary of experience, publications, and background details..."
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                  Upload Resume / CV
                </label>
                <div className="border-2 border-dashed border-border/80 hover:border-gold/40 rounded-xl p-6 text-center cursor-pointer transition bg-background/50 flex flex-col items-center justify-center">
                  <Upload className="size-8 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground font-semibold">
                    Drag and drop or click to upload PDF/Word file (Max 5MB)
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 mt-1">
                    Simulated Attachment Upload
                  </span>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-border/80">
                {submitted ? (
                  <p className="text-sm text-green-600 font-semibold flex items-center gap-1.5 animate-pulse">
                    <CheckCircle className="size-4" /> Application submitted successfully! We'll
                    email you shortly.
                  </p>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-gold text-gold-foreground font-semibold shadow-gold hover:scale-[1.02] transition"
                >
                  Submit Application <Send className="size-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
