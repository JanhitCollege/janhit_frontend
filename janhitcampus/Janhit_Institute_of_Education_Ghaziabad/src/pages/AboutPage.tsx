import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Award, CheckCircle2, Target, Eye, Building2, GraduationCap, Users, Shield, Sparkles, BookOpen, HeartHandshake, UserCheck } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { COLLEGE_INFO } from "@/data/collegeInfo";
import aboutClassroom from "@/assets/about-classroom.png";
import hero2 from "@/assets/hero-2.jpg";

export function AboutPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  return (
    <>
      <SEO
        title="About Us | Janhit Institute of Education & Information"
        description="Learn about Janhit Institute of Education & Information, established in 2001. Discover our 23+ years legacy, 35,000+ alumni, Why Janhit, Vision & Mission, and Chairman Narendra Chaudhary's message."
      />

      <Breadcrumb
        title="About Janhit Institute of Education & Information"
        items={[{ label: "About Us" }]}
      />

      {/* Quick Navigation Tabs for About Page */}
      <div className="bg-white border-b border-gold/20 sticky top-[72px] z-40 shadow-xs hidden sm:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-6 py-3 text-xs md:text-sm font-bold text-navy">
          <a href="#about-us" className="hover:text-gold transition-colors flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-gold" />
            <span>About Us</span>
          </a>
          <span className="text-gold/40">|</span>
          <a href="#why-janhit" className="hover:text-gold transition-colors flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-gold" />
            <span>Why Janhit</span>
          </a>
          <span className="text-gold/40">|</span>
          <a href="#vision-mission" className="hover:text-gold transition-colors flex items-center gap-1.5">
            <Eye className="h-4 w-4 text-gold" />
            <span>Vision & Mission</span>
          </a>
          <span className="text-gold/40">|</span>
          <a href="#chairman-message" className="hover:text-gold transition-colors flex items-center gap-1.5">
            <UserCheck className="h-4 w-4 text-gold" />
            <span>Chairman's Message</span>
          </a>
        </div>
      </div>

      {/* SECTION 1: ABOUT US (Image Left, Text Right) */}
      <section id="about-us" className="py-16 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Smart Classroom Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={aboutClassroom}
                  alt="Janhit Smart Classroom Learning"
                  className="w-full h-96 lg:h-[420px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-xs uppercase text-gold font-bold tracking-widest">
                      Knowledge Park 1, Greater Noida
                    </span>
                    <h3 className="font-serif text-lg font-bold">Interactive Smart Classroom</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-gold block">
                Established 2002 • 24+ Years of Educational Leadership
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy leading-tight">
                About Janhit Institute of Education & Information
              </h1>
              <div className="gold-divider w-24" />
              <p className="text-sm md:text-base text-navy/80 leading-relaxed font-medium">
                {COLLEGE_INFO.aboutSections[0].content}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 bg-white rounded-xl border border-gold/30 shadow-xs text-center">
                  <span className="font-serif text-2xl font-bold text-gold block">24+</span>
                  <span className="text-[11px] font-semibold text-navy">Years Legacy</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-gold/30 shadow-xs text-center">
                  <span className="font-serif text-2xl font-bold text-gold block">35,000+</span>
                  <span className="text-[11px] font-semibold text-navy">Students Shaped</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-gold/30 shadow-xs text-center col-span-2 sm:col-span-1">
                  <span className="font-serif text-2xl font-bold text-gold block">2002</span>
                  <span className="text-[11px] font-semibold text-navy">Founding Year</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed About Sub-Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {COLLEGE_INFO.aboutSections.slice(1, 7).map((sec, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-gold/30 shadow-xs hover:shadow-md transition-all hover-lift space-y-3"
              >
                <h3 className="font-serif text-lg font-bold text-navy">{sec.title}</h3>
                <p className="text-xs md:text-sm text-navy/75 leading-relaxed">{sec.content}</p>
              </div>
            ))}
          </div>

          {/* Founding Legacy Banner */}
          <div className="bg-navy text-white p-6 rounded-xl border-2 border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-gold">Founding Society</span>
              <h4 className="font-serif text-base md:text-lg font-bold">
                Registered Under the Indian Societies Registration Act XXI of 1860 (Est. 2002)
              </h4>
            </div>
            <Link
              to="/admission"
              className="px-6 py-2.5 rounded gradient-gold text-navy-deep font-bold text-xs uppercase tracking-wider shrink-0 shadow"
            >
              Apply Online 2026-27
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY JANHIT */}
      <section id="why-janhit" className="py-16 bg-beige/40 border-y border-gold/20 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold block">
              Why Choose Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">Why Janhit?</h2>
            <div className="gold-divider w-24 mx-auto" />
            <p className="text-sm text-navy/70">
              Discover what makes Janhit Institute of Education & Information a trusted choice for higher education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLLEGE_INFO.whyJanhit.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-gold/30 shadow-sm hover-lift space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 text-navy font-serif font-bold text-lg flex items-center justify-center border border-gold/40">
                    0{idx + 1}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy">{item.title}</h3>
                  <p className="text-xs md:text-sm text-navy/75 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: VISION & MISSION */}
      <section id="vision-mission" className="py-16 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold block">
              Our Core Ethos
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">Vision & Mission</h2>
            <div className="gold-divider w-24 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-beige/40 p-8 rounded-2xl border border-gold/30 shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gold/20 rounded-full">
                  <Eye className="h-7 w-7 text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">Our Vision</h3>
              </div>
              <p className="text-xs md:text-sm text-navy/80 leading-relaxed font-medium">
                "{COLLEGE_INFO.vision}"
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-beige/40 p-8 rounded-2xl border border-gold/30 shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gold/20 rounded-full">
                  <Target className="h-7 w-7 text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">Our Mission</h3>
              </div>
              <p className="text-xs md:text-sm text-navy/80 leading-relaxed font-medium">
                "{COLLEGE_INFO.missionText}"
              </p>
            </div>
          </div>

          <div className="bg-navy/5 p-6 rounded-xl border border-gold/20 text-center max-w-3xl mx-auto">
            <p className="text-xs md:text-sm font-semibold text-navy leading-relaxed">
              By choosing Janhit, students embark on a journey of comprehensive education that is rich in tradition and innovation, offering them the tools, skills, and experiences necessary to succeed in their future careers and lives.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: CHAIRMAN'S MESSAGE */}
      <section id="chairman-message" className="py-16 bg-beige/40 border-t border-gold/20 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-navy text-white rounded-2xl p-8 md:p-12 relative overflow-hidden border-2 border-gold/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Chairman Profile */}
              <div className="lg:col-span-4 text-center lg:text-left space-y-4 lg:sticky lg:top-28">
                <div className="w-32 h-32 mx-auto lg:mx-0 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center font-serif text-4xl font-bold text-gold shadow-lg">
                  NC
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-gold">
                    {COLLEGE_INFO.chairmanMessage.name}
                  </h3>
                  <p className="text-xs text-white/80 font-medium">
                    {COLLEGE_INFO.chairmanMessage.title}
                  </p>
                </div>
                <div className="pt-2">
                  <span className="text-[11px] uppercase tracking-wider text-gold font-bold bg-gold/20 px-3 py-1 rounded border border-gold/30">
                    Leader & Educationist
                  </span>
                </div>
              </div>

              {/* Chairman Full Message */}
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gold block">
                  Leadership Message
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white border-b border-gold/20 pb-3">
                  Message from the Chairman
                </h2>

                <div className="space-y-4 text-xs md:text-sm text-white/90 leading-relaxed pt-2">
                  {COLLEGE_INFO.chairmanMessage.paragraphs.map((para, idx) => (
                    <p key={idx} className={idx === 0 ? "font-serif text-base font-bold text-gold" : ""}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
