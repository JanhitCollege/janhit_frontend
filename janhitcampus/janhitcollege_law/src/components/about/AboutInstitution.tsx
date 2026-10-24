import { Building2, Award, Scale, BookOpen, Users, Compass, CheckCircle } from "lucide-react";
import heroImg1 from "@/assets/janhit hero image 1.jpg";

export function AboutInstitution() {
  const highlights = [
    {
      icon: Scale,
      title: "Bar Council of India Approved",
      desc: "Full statutory recognition enabling graduates to enroll as Advocates with any State Bar Council in India.",
    },
    {
      icon: Compass,
      title: "Strategic Greater Noida Campus",
      desc: "Located in Knowledge Park-1, the prestigious educational corridor with easy connectivity across Delhi NCR.",
    },
    {
      icon: Users,
      title: "Clinical Advocacy & Mooting",
      desc: "State-of-the-art replica Moot Court Hall and dedicated DLSA Free Legal Aid Clinic for real-world legal training.",
    },
    {
      icon: BookOpen,
      title: "Rich Legal Research Arsenal",
      desc: "Comprehensive law library featuring 15,000+ legal volumes, All India Reporter (AIR), Supreme Court Cases, and SCC Online.",
    },
  ];

  const stats = [
    {
      value: "2002",
      label: "Year Established",
      detail: "Over 2 decades of educational legacy",
    },
    {
      value: "100%",
      label: "BCI Statutory Compliance",
      detail: "Approved under Advocates Act, 1961",
    },
    {
      value: "15,000+",
      label: "Law Books & E-Resources",
      detail: "AIR, SCC, Bare Acts & Journals",
    },
    {
      value: "5,000+",
      label: "Distinguished Alumni",
      detail: "Serving Bench, Bar & Corporate Chambers",
    },
  ];

  return (
    <section id="about-institution" className="pt-6 pb-16 md:pt-8 md:pb-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-10 md:space-y-12">
        {/* Section Header - Positioned higher up as requested */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/35 shadow-sm">
            <Building2 className="w-4 h-4 text-gold" />
            <span>Institutional Heritage</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
            About Janhit College of Law
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2.5 h-2.5 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        {/* Narrative & Image Grid - Equal Height Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-base text-navy/85 leading-relaxed font-sans">
              <p>
                <strong className="text-navy font-bold">Janhit College of Law</strong>, established under the aegis of the renowned{" "}
                <span className="text-gold font-semibold">Janhit Group of Institutions (founded in 2002)</span>, stands as a beacon of academic rigor and professional legal training in Greater Noida. The institution was conceived with the noble objective of democratizing legal education and preparing advocates who possess both profound doctrinal jurisprudence and uncompromised ethical character.
              </p>

              <p>
                Approved by the <strong className="text-navy font-bold">Bar Council of India (BCI)</strong> and affiliated with{" "}
                <strong className="text-navy font-bold">Chaudhary Charan Singh (CCS) University, Meerut</strong>, Janhit College of Law offers premier integrated and graduate law programs: the 5-Year Integrated <span className="font-semibold text-navy">B.A. LL.B.</span> and the 3-Year Graduate <span className="font-semibold text-navy">LL.B.</span>.
              </p>

              <p>
                Our educational philosophy bridges the gap between traditional classroom lectures and active judicial advocacy. Students are immersed in a dynamic ecosystem featuring simulated court trials in our replica Moot Court Hall, empirical dispute resolution via our DLSA-affiliated Legal Aid Clinic, mandatory chamber internships with senior advocates and law firms, and regular visits to District Courts, High Courts, and the Supreme Court of India.
              </p>

              <p>
                Guided by seasoned jurists, retired judicial officers, and accomplished legal scholars, Janhit College of Law nurtures students not merely to clear examinations, but to champion constitutional values, defend human rights, and excel in the Bar, Judiciary, Corporate Legal Chambers, and Civil Services.
              </p>
            </div>

            {/* Core Badges List - In crisp white background with bigger & bolder headings */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-gold/30 hover:border-gold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 space-y-2 group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-navy/5 text-gold group-hover:bg-gold/15 group-hover:scale-105 transition-all">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <h4 className="font-serif font-extrabold text-navy text-base md:text-lg leading-snug group-hover:text-navy-deep transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs md:text-[13px] text-navy/75 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Visual Presentation - Equal Height to About Us Content */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 h-full">
            {/* Main Campus Image Card filling available height */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-gold/35 shadow-luxury group flex-1 min-h-[340px] flex flex-col">
              <img
                src={heroImg1}
                alt="Janhit College of Law Campus"
                className="w-full h-full object-cover flex-1 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/35 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold px-3 py-1 rounded-full bg-navy/90 border border-gold/40 inline-block">
                  Campus Knowledge Park-1
                </span>
                <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                  State-of-the-Art Law Campus
                </h3>
                <p className="text-xs md:text-sm text-white/90 font-sans leading-relaxed">
                  Serene, modern academic environment designed for rigorous legal scholarship.
                </p>
              </div>
            </div>

            {/* Quick Quote / Crest Card */}
            <div className="p-6 rounded-2xl bg-navy text-white border border-gold/40 space-y-3 shadow-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gold/20 text-gold shrink-0">
                  <Award className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-gold text-lg">
                    Lex Semper Dabit Remedium
                  </h4>
                  <p className="text-xs text-white/75 font-sans">
                    "The law will always provide a remedy" — Our Guiding Maxim
                  </p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-white/85 leading-relaxed font-sans border-t border-white/10 pt-3">
                We believe that law without morality is a vessel without a compass. Our mission is to instill constitutional integrity, ethical dedication, and fearless advocacy in every law graduate.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Key Statistics Strip - High contrast, razor-sharp visibility & premium hover effect */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="relative p-6 md:p-8 rounded-2xl bg-white border-2 border-gold/35 shadow-md hover:shadow-2xl hover:border-gold hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-amber-50/30 transition-all duration-300 text-center space-y-3 group overflow-hidden cursor-default"
            >
              {/* Subtle top gold accent line that expands on hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-70 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300" />

              {/* Number - Deep, bold, clear font-serif with zoom on hover */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-navy tracking-tight group-hover:scale-105 group-hover:text-navy-deep transition-all duration-300">
                {s.value}
              </div>

              {/* Category Label - High contrast readable badge */}
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider font-sans border border-gold/40 group-hover:bg-gold/25 group-hover:border-gold transition-colors">
                  {s.label}
                </span>
              </div>

              {/* Detail - High contrast readable text */}
              <p className="text-xs md:text-[13px] text-navy/80 font-medium font-sans leading-snug pt-1">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
