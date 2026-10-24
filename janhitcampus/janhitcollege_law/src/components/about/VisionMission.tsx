import { Scale, BookOpen, Compass, Shield, HeartHandshake, Sparkles, CheckCircle2 } from "lucide-react";

export function VisionMission() {
  const coreValues = [
    {
      num: "01",
      title: "Justitia et Veritas",
      subtitle: "Justice & Truth",
      icon: Scale,
      desc: "Upholding absolute truth, equity, and impartiality in all legal inquiries, research, and courtroom advocacy.",
    },
    {
      num: "02",
      title: "Constitutional Morality",
      subtitle: "Rule of Law & Rights",
      icon: Shield,
      desc: "Instilling deep fidelity to the Constitution of India, defending fundamental rights and secular democratic ethos.",
    },
    {
      num: "03",
      title: "Professional Integrity",
      subtitle: "Bar Council Ethics",
      icon: Sparkles,
      desc: "Maintaining the highest moral standards, professional dignity, and courtroom etiquette mandated by the Advocates Act.",
    },
    {
      num: "04",
      title: "Social Equity & Legal Aid",
      subtitle: "Pro-Bono Outreach",
      icon: HeartHandshake,
      desc: "Sensitizing students toward marginalized communities, offering free legal aid through active DLSA collaboration.",
    },
    {
      num: "05",
      title: "Inquisitive Jurisprudence",
      subtitle: "Research & Critical Thought",
      icon: BookOpen,
      desc: "Fostering empirical case-law synthesis, academic publications, and progressive socio-legal reform.",
    },
  ];

  return (
    <section id="vision-mission" className="py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span>Guiding Principles</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
            Our Vision, Mission & Core Values
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/70 leading-relaxed font-sans">
            The foundational ethos and constitutional compass that govern our academic pursuits and institutional advancement.
          </p>
        </div>

        {/* Vision & Mission Dual Pillars */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Vision Card */}
          <div className="bg-white rounded-3xl border border-gold/30 p-8 md:p-10 shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden group hover:border-gold transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full transition-transform group-hover:scale-110 pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-navy text-gold flex items-center justify-center shadow-md">
                  <Scale className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold block">
                    Institutional Direction
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                    Our Vision
                  </h3>
                </div>
              </div>

              <div className="h-0.5 w-16 bg-gold rounded" />

              <p className="text-base md:text-lg text-navy/85 leading-relaxed font-sans font-medium">
                To be an internationally acclaimed center of excellence in legal education, empirical jurisprudence, and public advocacy—producing ethical advocate leaders, constitutional scholars, and judicial officers who champion justice, public interest, and constitutional morality worldwide.
              </p>
            </div>

            <div className="space-y-2 pt-6 border-t border-gold/20 text-xs md:text-sm text-navy/75 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Nurturing judicial acumen and ethical courtroom advocacy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Championing constitutional values and equal access to justice</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Promoting world-class legal research and policy reform</span>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-3xl border border-gold/30 p-8 md:p-10 shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden group hover:border-gold transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full transition-transform group-hover:scale-110 pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-navy text-gold flex items-center justify-center shadow-md">
                  <BookOpen className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold block">
                    Strategic Objective
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                    Our Mission
                  </h3>
                </div>
              </div>

              <div className="h-0.5 w-16 bg-gold rounded" />

              <p className="text-base md:text-lg text-navy/85 leading-relaxed font-sans font-medium">
                To deliver a comprehensive legal curriculum that seamlessly blends doctrinal jurisprudence with clinical practice, regular moot courts, mandatory legal aid exposure, and professional integrity—empowering every student to excel across courts, corporate chambers, academia, and civil governance.
              </p>
            </div>

            <div className="space-y-2 pt-6 border-t border-gold/20 text-xs md:text-sm text-navy/75 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Rigorous Bar Council & University curriculum delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Hands-on trial advocacy through replica Moot Court proceedings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Empathetic pro-bono legal literacy camps in partnership with DLSA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Foundational Core Values Grid */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">
              The Five Pillars of Janhit Law
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">
              Institutional Core Values
            </h3>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
              <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
            </div>
            <p className="text-sm text-navy/70 max-w-xl mx-auto font-sans">
              The bedrock principles embedded in every lecture, moot court simulation, and community legal outreach.
            </p>
          </div>

          {/* Five Pillars Cards - All in a Single Row */}
          <div className="overflow-x-auto pb-4 lg:pb-0">
            <div className="grid grid-cols-5 gap-4 xl:gap-5 min-w-[1020px] lg:min-w-0">
              {coreValues.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.num}
                    className="p-5 xl:p-6 rounded-2xl bg-white border-2 border-gold/35 hover:border-gold shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-2xl xl:text-3xl font-extrabold text-navy group-hover:text-gold transition-colors">
                          {val.num}
                        </span>
                        <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30 group-hover:scale-110 group-hover:bg-gold/25 transition-all">
                          <Icon className="w-4 h-4 xl:w-5 xl:h-5 text-gold" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-navy text-base xl:text-lg leading-snug group-hover:text-navy-deep transition-colors">
                          {val.title}
                        </h4>
                        <div className="text-[10px] xl:text-[11px] font-bold uppercase tracking-wider text-amber-800 font-sans">
                          {val.subtitle}
                        </div>
                      </div>

                      <div className="h-0.5 w-10 bg-gold/50 rounded" />
                    </div>

                    <p className="text-xs xl:text-[13px] text-navy/85 leading-relaxed font-sans pt-1">
                      {val.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
