import { useParams, Link, Navigate } from "react";
import { Clock, GraduationCap, Award, BookOpen, CheckCircle, ArrowRight, HelpCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { AdmissionForm } from "@/components/site/AdmissionForm";
import { COURSES_DATA } from "@/data/coursesData";

export function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const course = COURSES_DATA.find((c) => c.slug === slug || c.id === slug);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.fullDescription,
    provider: {
      "@type": "CollegeOrUniversity",
      name: "Janhit Degree College",
      sameAs: "https://janhitdegreecollege.ac.in",
    },
  };

  return (
    <>
      <SEO
        title={`${course.name} Admissions & Details | Janhit Degree College Saharanpur`}
        description={`${course.name} at Janhit Degree College, Saharanpur. Duration: ${course.duration}. Eligibility: ${course.eligibility}. Affiliated to CCS University, Meerut.`}
        schema={courseSchema}
      />

      <Breadcrumb
        title={course.name}
        items={[
          { label: "Courses", path: "/courses" },
          { label: course.code },
        ]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-8">
              {/* Top Banner Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-navy bg-gold/20 px-3 py-1 rounded-full border border-gold/40">
                  {course.degreeType}
                </span>
                <span className="text-xs font-semibold text-navy/80 bg-beige px-3 py-1 rounded border border-gold/20">
                  {course.affiliation}
                </span>
                {course.approval && (
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
                    {course.approval}
                  </span>
                )}
              </div>

              {/* Course Title & Full Description */}
              <div className="space-y-4">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy">
                  {course.name}
                </h1>
                <div className="gold-divider w-24" />
                <p className="text-sm md:text-base text-navy/80 leading-relaxed">
                  {course.fullDescription}
                </p>
              </div>

              {/* Eligibility & Duration Highlight Card */}
              <div className="bg-beige/60 p-6 rounded-xl border border-gold/30 space-y-4">
                <h3 className="font-serif text-xl font-bold text-navy">Program Key Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gold/20">
                    <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block">Duration</span>
                      <span className="text-navy/70">{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gold/20">
                    <GraduationCap className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block">Eligibility Criteria</span>
                      <span className="text-navy/70">{course.eligibility}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specializations / Subjects Offered */}
              {course.specializations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-gold" />
                    <h3 className="font-serif text-2xl font-bold text-navy">
                      Available Subjects & Specializations
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.specializations.map((spec, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3.5 rounded-lg border border-gold/20 flex items-center gap-2.5 text-xs font-semibold text-navy shadow-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-gold shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Opportunities */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-gold" />
                  <h3 className="font-serif text-2xl font-bold text-navy">
                    Career Opportunities & Higher Studies Scope
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs md:text-sm text-navy/80 bg-beige/30 p-5 rounded-xl border border-gold/20">
                  {course.careerOpportunities.map((career, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <ArrowRight className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course FAQs */}
              {course.faqs.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-gold/20">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-gold" />
                    <h3 className="font-serif text-2xl font-bold text-navy">
                      Frequently Asked Questions ({course.code})
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {course.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl border border-gold/20 shadow-sm space-y-1.5"
                      >
                        <h4 className="font-semibold text-sm text-navy">{faq.question}</h4>
                        <p className="text-xs text-navy/70 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Admission Form */}
            <div className="lg:col-span-5 space-y-6">
              <AdmissionForm defaultCourseSlug={course.slug} />

              <div className="p-6 bg-navy text-white rounded-xl border border-gold/30 space-y-3">
                <h4 className="font-serif text-lg font-bold text-gold">Need Help Choosing?</h4>
                <p className="text-xs text-white/80">
                  Speak directly with our academic guidance team for subject selection, career counseling, and eligibility checks.
                </p>
                <Link
                  to="/contact"
                  className="block text-center py-2.5 rounded gradient-gold text-navy-deep font-bold text-xs uppercase tracking-wider"
                >
                  Contact Counselor Office
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
