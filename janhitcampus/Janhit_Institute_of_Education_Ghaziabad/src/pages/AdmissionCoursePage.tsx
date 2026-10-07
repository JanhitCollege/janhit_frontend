import { useParams, Navigate, Link } from "react";
import { CheckCircle2, Clock, GraduationCap, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { AdmissionForm } from "@/components/site/AdmissionForm";
import { COURSES_DATA } from "@/data/coursesData";
import { COLLEGE_INFO } from "@/data/collegeInfo";

export function AdmissionCoursePage() {
  const { slug } = useParams<{ slug: string }>();

  const course = COURSES_DATA.find((c) => c.slug === slug || c.id === slug);

  if (!course) {
    return <Navigate to="/admission" replace />;
  }

  return (
    <>
      <SEO
        title={`${course.name} Admission 2026-27 | Janhit Degree College Saharanpur`}
        description={`Apply for ${course.name} admission 2026-27 at Janhit Degree College Saharanpur. Eligibility: ${course.eligibility}. Affiliated to CCS University, Meerut.`}
      />

      <Breadcrumb
        title={`${course.name} Admission 2026-27`}
        items={[
          { label: "Admissions", path: "/admission" },
          { label: `${course.code} Admission` },
        ]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/15 px-3 py-1 rounded border border-gold/30">
                  Admissions Open • Session 2026-27
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy">
                  Direct Admission Process for {course.name}
                </h1>
                <div className="gold-divider w-24" />
                <p className="text-sm md:text-base text-navy/80 leading-relaxed">
                  {course.shortDescription}
                </p>
              </div>

              {/* Eligibility & Key Specs */}
              <div className="bg-beige/50 p-6 rounded-xl border border-gold/30 space-y-4">
                <h3 className="font-serif text-xl font-bold text-navy">
                  {course.code} Admission Eligibility & Duration
                </h3>
                <div className="space-y-3 text-xs md:text-sm">
                  <div className="flex items-start gap-3 bg-white p-3.5 rounded border border-gold/20">
                    <GraduationCap className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block">Eligibility:</span>
                      <span className="text-navy/70">{course.eligibility}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-3.5 rounded border border-gold/20">
                    <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block">Duration:</span>
                      <span className="text-navy/70">{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-3.5 rounded border border-gold/20">
                    <ShieldCheck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block">University Affiliation:</span>
                      <span className="text-navy/70">{course.affiliation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Janhit for this course */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Why Choose Janhit Degree College for {course.code}?
                </h3>
                <div className="space-y-2.5 text-xs md:text-sm text-navy/80">
                  <div className="flex items-start gap-2.5 bg-white p-3 rounded border border-gold/20">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span>Experienced academic faculty and dedicated subject mentors.</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white p-3 rounded border border-gold/20">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span>Well-equipped computer programming and science laboratories.</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white p-3 rounded border border-gold/20">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span>Central academic library with vast textbook & digital study materials.</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white p-3 rounded border border-gold/20">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span>Career placement counseling and competitive exam guidance.</span>
                  </div>
                </div>
              </div>

              {/* FAQs for Course */}
              {course.faqs.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-gold/20">
                  <h3 className="font-serif text-2xl font-bold text-navy">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    {course.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-beige/30 p-4 rounded-lg border border-gold/20">
                        <h4 className="font-semibold text-sm text-navy">{faq.question}</h4>
                        <p className="text-xs text-navy/70 mt-1">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Admission Enquiry Form */}
            <div className="lg:col-span-5 space-y-6">
              <AdmissionForm defaultCourseSlug={course.slug} />

              <div className="p-6 bg-navy text-white rounded-xl border border-gold/30 text-center space-y-3">
                <span className="text-xs uppercase text-gold font-bold tracking-widest block">
                  Have Questions?
                </span>
                <h4 className="font-serif text-lg font-bold">Call Helpline Direct</h4>
                <a
                  href={`tel:${COLLEGE_INFO.phone}`}
                  className="text-gold font-bold text-xl block hover:underline"
                >
                  {COLLEGE_INFO.phone}
                </a>
                <p className="text-xs text-white/70">
                  College Address: {COLLEGE_INFO.address.full}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
