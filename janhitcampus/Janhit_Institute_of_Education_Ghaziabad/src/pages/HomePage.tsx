import { Link } from "react-router-dom";
import {
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Users,
  Building2,
  ArrowRight,
  Download,
  Calendar,
  Newspaper,
  Briefcase,
  PhoneCall,
  ChevronRight,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { HeroSlider } from "@/components/site/HeroSlider";
import { CourseCard } from "@/components/site/CourseCard";
import { AdmissionForm } from "@/components/site/AdmissionForm";
import { COLLEGE_INFO } from "@/data/collegeInfo";
import { COURSES_DATA } from "@/data/coursesData";
import { FEE_STRUCTURE_DATA } from "@/data/feeData";
import { NEWS_DATA, EVENTS_DATA } from "@/data/lifeData";
import { ACHIEVEMENTS_DATA } from "@/data/peopleAndOrgData";
import aboutClassroom from "@/assets/about-classroom.png";

export function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: COLLEGE_INFO.name,
    url: "https://janhitdegreecollege.ac.in",
    logo: "https://janhitdegreecollege.ac.in/assets/logo.png",
    foundingDate: "2010",
    address: {
      "@type": "PostalAddress",
      streetAddress: COLLEGE_INFO.address.street,
      addressLocality: COLLEGE_INFO.address.locality,
      addressRegion: COLLEGE_INFO.address.state,
      postalCode: COLLEGE_INFO.address.pincode,
      addressCountry: "IN",
    },
    telephone: COLLEGE_INFO.phone,
    email: COLLEGE_INFO.email,
  };

  return (
    <>
      <SEO
        title="Janhit Degree College Saharanpur | Courses, Admissions & College Information"
        description="Janhit Degree College, Saharanpur, established in 2010, offers BA, BBA, BCA, B.Com, B.Ed, D.El.Ed, B.P.Ed and B.Sc courses. Explore admissions, courses, campus life and more."
        schema={schema}
      />

      {/* Section 1: Hero Banner Slider */}
      <HeroSlider />

      {/* Section 2: Trust / Highlights Bar */}
      <section className="bg-white text-navy py-10 border-b border-gold/30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-gold/40 hover:border-gold hover:shadow-md transition-all">
              <Award className="h-7 w-7 text-[#D97706] mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Est. 2002</span>
              <span className="text-xs text-navy/70 mt-1 font-medium">20+ Yrs Excellence</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-gold/40 hover:border-gold hover:shadow-md transition-all">
              <GraduationCap className="h-7 w-7 text-[#D97706] mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Affiliated</span>
              <span className="text-xs text-navy/70 mt-1 font-medium">CCSU Meerut</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-gold/40 hover:border-gold hover:shadow-md transition-all">
              <CheckCircle2 className="h-7 w-7 text-[#D97706] mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Approved</span>
              <span className="text-xs text-navy/70 mt-1 font-medium">NCTE New Delhi</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-gold/40 hover:border-gold hover:shadow-md transition-all">
              <BookOpen className="h-7 w-7 text-[#D97706] mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">8+ Courses</span>
              <span className="text-xs text-navy/70 mt-1 font-medium">UG & Professional</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-gold/40 hover:border-gold hover:shadow-md transition-all">
              <Users className="h-7 w-7 text-[#D97706] mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Faculty</span>
              <span className="text-xs text-navy/70 mt-1 font-medium">Expert Educators</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-gold/40 hover:border-gold hover:shadow-md transition-all">
              <Building2 className="h-7 w-7 text-[#D97706] mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Campus</span>
              <span className="text-xs text-navy/70 mt-1 font-medium">Modern Labs & Sports</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Concise About Section (Image Left, Text Right) */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={aboutClassroom}
                  alt="Janhit Smart Classroom Learning"
                  className="w-full h-80 lg:h-96 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-xs uppercase text-gold font-bold tracking-widest">
                      Knowledge Park 1, Greater Noida
                    </span>
                    <h3 className="font-serif text-lg font-bold">Smart Classroom Learning</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
                <span>About Janhit Institute of Education & Information</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy leading-tight">
                Nurturing Academic Potential & Professional Competency Since 2002
              </h2>
              <div className="gold-divider w-24" />
              <p className="text-sm md:text-base text-navy/80 leading-relaxed">
                {COLLEGE_INFO.aboutText}
              </p>
              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about"
                  className="px-6 py-3 rounded gradient-gold text-navy-deep font-bold text-sm tracking-wider uppercase shadow-gold hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
                >
                  <span>Read Full About Us</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/admission"
                  className="px-6 py-3 rounded bg-white border border-gold/40 text-navy font-bold text-sm tracking-wider uppercase hover:bg-gold/10 transition-all"
                >
                  Apply Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Featured Courses */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold block">
              Academic Programs
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">
              Explore Our Degree & Diploma Courses
            </h2>
            <div className="gold-divider w-24 mx-auto" />
            <p className="text-sm text-navy/70">
              Affiliated to CCS University, Meerut & NCTE approved programs designed for career readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {COURSES_DATA.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded gradient-navy text-white font-bold text-sm tracking-wider uppercase shadow-luxury hover:-translate-y-0.5 transition-all"
            >
              <span>View All Course Details</span>
              <ChevronRight className="h-4 w-4 text-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Fee Structure Summary */}
      <section className="py-16 md:py-20 bg-white border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold block">
              Transparent & Affordable
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">Fee Structure</h2>
            <div className="gold-divider w-24 mx-auto" />
            <p className="text-sm text-navy/70">
              Course fee schedules are governed by CCS University and NCTE regulatory guidelines.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gold/30 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-navy text-white uppercase text-[11px] tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-4 md:px-6">Course Name</th>
                    <th className="py-3.5 px-4">Duration</th>
                    <th className="py-3.5 px-4">Tuition Fee</th>
                    <th className="py-3.5 px-4">Admission Fee</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/15">
                  {FEE_STRUCTURE_DATA.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 md:px-6 font-bold text-navy">{item.courseName}</td>
                      <td className="py-3.5 px-4 text-navy/80">{item.duration}</td>
                      <td className="py-3.5 px-4 text-navy/80">{item.tuitionFee}</td>
                      <td className="py-3.5 px-4 text-navy/80">{item.admissionFee}</td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to="/contact"
                          className="px-3 py-1 rounded bg-gold/15 hover:bg-gold text-navy font-bold text-xs transition-colors"
                        >
                          Enquire Fee
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-navy/70">
                * Note: Fee details are subject to government and university regulations. Contact admission office for fee breakdown.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/downloads"
                  className="px-4 py-2 rounded bg-navy text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-navy-deep transition-colors"
                >
                  <Download className="h-3.5 w-3.5 text-gold" />
                  <span>Download Prospectus & Fee PDF</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Our Achievements */}
      <section className="py-16 md:py-20 bg-white border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold block">
              Institutional Milestones
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">Our Achievements</h2>
            <div className="gold-divider w-24 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACHIEVEMENTS_DATA.map((ach) => (
              <div
                key={ach.id}
                className="bg-white p-6 rounded-xl border border-gold/30 shadow-xs hover:shadow-md transition-all hover-lift space-y-3"
              >
                <span className="text-[10px] font-bold text-navy bg-gold/20 px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {ach.category} • {ach.year}
                </span>
                <h3 className="font-serif text-lg font-bold text-navy">{ach.title}</h3>
                <p className="text-xs text-navy/70 leading-relaxed">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: News & Upcoming Events Grid */}
      <section className="py-16 md:py-20 bg-white border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Latest News (3 items) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-gold" />
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                    Latest News & Updates
                  </h2>
                </div>
                <Link
                  to="/news"
                  className="text-xs font-bold text-navy hover:text-gold transition-colors flex items-center gap-1"
                >
                  <span>View All News</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {NEWS_DATA.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-5 rounded-xl border border-gold/30 shadow-xs flex flex-col sm:flex-row gap-4 hover:border-gold transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full sm:w-32 h-24 object-cover rounded-lg shrink-0"
                    />
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between text-[11px] text-navy/60">
                        <span className="font-semibold text-gold">{item.category}</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-navy line-clamp-2 hover:text-gold transition-colors">
                        <Link to={`/news/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p className="text-xs text-navy/70 line-clamp-2">{item.shortDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gold" />
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                    Upcoming Events
                  </h2>
                </div>
                <Link
                  to="/events"
                  className="text-xs font-bold text-navy hover:text-gold transition-colors flex items-center gap-1"
                >
                  <span>View All Events</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {EVENTS_DATA.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-white p-5 rounded-xl border border-gold/30 shadow-xs space-y-2 hover:border-gold transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {evt.status}
                      </span>
                      <span className="text-xs font-semibold text-navy/60">{evt.date}</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-navy">
                      <Link to={`/events/${evt.slug}`} className="hover:text-gold transition-colors">
                        {evt.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-navy/70 line-clamp-2">{evt.shortDescription}</p>

                    <div className="pt-2 text-[11px] text-navy/80 font-medium">
                      Venue: {evt.venue}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Placement Cell Brief */}
      <section className="py-16 md:py-20 bg-white border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-navy text-white rounded-2xl p-8 md:p-12 relative overflow-hidden border-2 border-gold/40 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold/20 text-gold text-xs font-bold uppercase tracking-widest">
                  <Briefcase className="h-4 w-4" />
                  <span>Career Guidance & Placement Support</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
                  Dedicated Placement Cell & Skill Development Center
                </h2>
                <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                  We empower our graduates with personality development, soft skills training, resume workshops, and campus interview opportunities across educational institutions, corporate firms, and IT services.
                </p>
              </div>

              <div className="lg:col-span-4 text-center lg:text-right">
                <Link
                  to="/placements"
                  className="px-8 py-3.5 rounded gradient-gold text-navy-deep font-bold text-sm uppercase tracking-wider shadow-gold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                >
                  <span>Explore Placement Cell</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Admission CTA & Enquiry Form Banner */}
      <section className="py-16 md:py-20 bg-white border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gold block">
                Admissions Session 2026-27
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy leading-tight">
                Secure Your Seat at Janhit Degree College
              </h2>
              <div className="gold-divider w-24" />
              <p className="text-sm md:text-base text-navy/80 leading-relaxed">
                Take the first step towards a bright academic future. Enquire today for counseling, seat reservation, and scholarship details across all BA, BBA, BCA, B.Com, B.Ed, D.El.Ed, B.P.Ed and B.Sc programs.
              </p>

              <div className="p-6 bg-slate-50 rounded-xl border border-gold/30 shadow-xs space-y-3">
                <div className="flex items-center gap-3 text-navy font-bold text-base">
                  <PhoneCall className="h-6 w-6 text-gold shrink-0" />
                  <div>
                    <div className="text-xs text-navy/60 font-semibold uppercase">
                      Admission Helpline Number
                    </div>
                    <a href={`tel:${COLLEGE_INFO.phone}`} className="hover:text-gold transition-colors">
                      {COLLEGE_INFO.phone}
                    </a>
                  </div>
                </div>
                <p className="text-xs text-navy/70">
                  Address: {COLLEGE_INFO.address.full}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <AdmissionForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
