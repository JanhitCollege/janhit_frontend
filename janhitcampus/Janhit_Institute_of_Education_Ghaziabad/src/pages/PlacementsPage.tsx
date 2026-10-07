import { Link } from "react-router-dom";
import { Briefcase, CheckCircle2, GraduationCap, Users, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";

export function PlacementsPage() {
  return (
    <>
      <SEO
        title="Placement Cell & Career Services | Janhit Degree College Saharanpur"
        description="Career training, placement cell support, soft skills workshops, and recruitment guidance at Janhit Degree College Saharanpur."
      />

      <Breadcrumb
        title="Placement Cell & Career Support"
        items={[{ label: "Placement Cell" }]}
      />

      {/* Main Placement Overview */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-gold block">
                Career Guidance & Employability
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy leading-tight">
                Empowering Students for Corporate & Academic Careers
              </h1>
              <div className="gold-divider w-24" />
              <p className="text-sm md:text-base text-navy/80 leading-relaxed">
                The Placement and Career Guidance Cell at Janhit Degree College serves as a vital bridge between students and regional employers across IT, education, management, banking, and retail sectors.
              </p>
              <p className="text-sm text-navy/70 leading-relaxed">
                We focus on building strong core domain fundamentals, professional communication skills, interview readiness, and practical internship experiences so that our graduates step into the professional world with confidence.
              </p>
            </div>

            <div className="lg:col-span-5 bg-beige/50 p-8 rounded-2xl border border-gold/30 shadow-xl space-y-4">
              <h3 className="font-serif text-2xl font-bold text-navy">Key Placement Cell Initiatives</h3>
              <ul className="space-y-3 text-xs md:text-sm text-navy/80">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span><strong>Personality Development:</strong> Group discussions, soft skills training, and mock interview drills.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span><strong>Resume & Portfolio Building:</strong> Technical resume drafting for BCA, BBA, and B.Com graduates.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span><strong>School Internships:</strong> Mandatory 16-week teaching internships in recognized schools for B.Ed & D.El.Ed.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span><strong>Competitive Exam Guidance:</strong> Guidance for TET, CTET, NET, Banking, and Civil Services (UPSC/UPPSC).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Core Support Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gold/20">
            <div className="bg-beige/30 p-6 rounded-xl border border-gold/20 space-y-3">
              <Briefcase className="h-7 w-7 text-gold" />
              <h3 className="font-serif text-lg font-bold text-navy">Corporate & Industry Linkages</h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Connecting BCA, BBA, and B.Com final year students with regional IT software companies, accounting consultancies, and financial firms.
              </p>
            </div>

            <div className="bg-beige/30 p-6 rounded-xl border border-gold/20 space-y-3">
              <GraduationCap className="h-7 w-7 text-gold" />
              <h3 className="font-serif text-lg font-bold text-navy">Teacher Recruitment Support</h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Specialized placement assistance for B.Ed, D.El.Ed, and B.P.Ed teacher trainees across public and private schools in UP and Uttarakhand.
              </p>
            </div>

            <div className="bg-beige/30 p-6 rounded-xl border border-gold/20 space-y-3">
              <Users className="h-7 w-7 text-gold" />
              <h3 className="font-serif text-lg font-bold text-navy">Higher Education Advisory</h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Comprehensive counseling for graduates seeking entry into post-graduate studies (M.A., M.Sc, M.Com, MBA, MCA, M.Ed, M.P.Ed).
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-navy text-white rounded-2xl p-8 text-center space-y-4 border-2 border-gold/30">
            <h3 className="font-serif text-2xl font-bold text-gold">Ready to Start Your Career Journey?</h3>
            <p className="text-xs md:text-sm text-white/80 max-w-xl mx-auto">
              Explore our career-ready degree and professional courses at Janhit Degree College, Saharanpur.
            </p>
            <div className="pt-2">
              <Link
                to="/admission"
                className="px-8 py-3 rounded gradient-gold text-navy-deep font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow hover:opacity-90 transition-opacity"
              >
                <span>Apply for Admission 2026-27</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
