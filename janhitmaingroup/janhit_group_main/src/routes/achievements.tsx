import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, FadeIn } from "@/components/Section";
import { Award, Briefcase, GraduationCap, Building, Star, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements & Placements — Janhit Group of Institutions" },
      {
        name: "description",
        content:
          "Explore placement records, university gold medalists, moot court champions, and recruitment statistics at Janhit Group of Institutions.",
      },
    ],
  }),
  component: Achievements,
});

const stats = [
  { value: "92%", label: "Placement Success Rate" },
  { value: "₹ 8.4 LPA", label: "Highest Package Offered" },
  { value: "₹ 4.2 LPA", label: "Average Package" },
  { value: "150+", label: "Recruiting Partners" },
];

const achievementsList = [
  {
    icon: GraduationCap,
    year: "Academic Year 2025-26",
    title: "CCS University Gold Medalists",
    desc: "Three of our LL.B. and B.A. LL.B. graduates secured 1st and 2nd rank rankings in Chaudhary Charan Singh University, Meerut merit list.",
  },
  {
    icon: Award,
    year: "National Championship 2026",
    title: "National Moot Court Winners",
    desc: "Janhit College of Law moot court team won the prestigious State Moot Court Championship trophy, defeating 24 law colleges.",
  },
  {
    icon: Star,
    year: "Inter-College Sports Meet",
    title: "Athletics Championship Trophy",
    desc: "Our sports team secured 12 gold medals and the overall runners-up trophy at the annual inter-college sports festival.",
  },
];

const placementsList = [
  {
    student: "Priyanka Sharma",
    course: "B.A. LL.B.",
    company: "Singhania & Partners Law Firm",
    package: "₹ 7.2 LPA",
    desc: "Selected as an Associate counsel in corporate drafting team during the on-campus recruitment drive.",
  },
  {
    student: "Amit Chaudhary",
    course: "BCA (Computer Applications)",
    company: "Tech Mahindra",
    package: "₹ 5.8 LPA",
    desc: "Joined as a software engineer trainee. Excelled in college projects and database system coding assessments.",
  },
  {
    student: "Rohit Verma",
    course: "BBA (Management)",
    company: "HDFC Bank",
    package: "₹ 5.0 LPA",
    desc: "Secured placement as a Relationship Manager. Credited his analytical assignments and internship experience.",
  },
];

function Achievements() {
  return (
    <>
      {/* Hero Header */}
      <section className="relative py-24 bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="container-tight relative">
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-gold border border-gold/40">
              Honors & Career Placement
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold max-w-3xl leading-tight">
              Achievements <span className="text-gradient-gold">& Placements</span>
            </h1>
            <p className="mt-6 text-lg opacity-90 max-w-2xl">
              Celebrating our students' university academic ranks, moot court trophies, and record
              placement drives in law chambers and corporate panels.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Placement Stats counters */}
      <section className="py-12 bg-secondary/30 border-b border-border/80">
        <div className="container-tight">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 bg-card border border-border rounded-2xl text-center shadow-sm hover:border-gold/20 transition"
              >
                <div className="text-3xl md:text-4xl font-display font-extrabold text-gold">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs md:text-sm text-muted-foreground font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Milestones"
            title="Academic & Sports Achievements"
            subtitle="Explore our honors list, academic merit rank holders, and co-curricular championships."
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
            {achievementsList.map((ach, idx) => {
              const Icon = ach.icon;
              return (
                <FadeIn key={idx} delay={idx * 0.05}>
                  <div className="p-8 md:p-10 rounded-3xl bg-card border border-border h-full flex flex-col justify-between hover:border-gold/30 hover:shadow-elegant transition duration-300 group">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div className="size-14 rounded-full bg-gold/10 text-gold grid place-items-center group-hover:scale-105 transition-transform duration-300">
                          <Icon className="size-7" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                          {ach.year}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg md:text-xl text-foreground leading-tight group-hover:text-gold transition-colors">
                        {ach.title}
                      </h3>
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                        {ach.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Placements Section */}
      <section id="placements" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Success Stories"
            title="Student Placements"
            subtitle="View student diaries, recruitment packages, and corporate partners."
          />

          {/* Student placement cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
            {placementsList.map((pl, idx) => (
              <FadeIn key={idx} delay={idx * 0.05}>
                <div className="p-8 md:p-10 rounded-3xl bg-card border border-border h-full flex flex-col justify-between hover:border-gold/30 hover:shadow-elegant transition duration-300 group">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="font-display font-bold text-lg text-foreground">
                          {pl.student}
                        </h4>
                        <span className="text-xs text-muted-foreground font-semibold">
                          Class of 2026 · {pl.course}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-full shrink-0">
                        {pl.package}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-primary mb-3 flex items-center gap-1.5">
                      <Building className="size-3.5" /> {pl.company}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "{pl.desc}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/80 flex items-center gap-2 text-xs text-green-600 font-semibold">
                    <CheckCircle className="size-4" /> Placed Candidate
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Recruiter Logotypes block */}
          <div className="mt-20 max-w-5xl mx-auto text-center">
            <h4 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-8">
              Our Primary Recruitment Networks
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-75">
              {[
                "Tech Mahindra",
                "Infosys Ltd",
                "HDFC Bank",
                "Singhania & Partners",
                "Wipro Technologies",
                "ICICI Bank",
                "Patnaik & Co Chambers",
                "Garg Associates",
              ].map((name) => (
                <div
                  key={name}
                  className="p-6 rounded-2xl bg-card border border-border flex items-center justify-center font-display font-bold text-sm text-muted-foreground tracking-wide hover:border-gold/20 hover:text-foreground transition cursor-default"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
