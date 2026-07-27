import { Scale, BookOpen, Globe, Laptop, Presentation, Award } from "lucide-react";

const items = [
  {
    icon: Scale,
    title: "Moot Court Hall",
    description:
      "A replica courtroom simulating live judicial proceedings. Students draft petitions, prepare arguments, and practice advocacy under the guidance of retired judges and senior lawyers.",
  },
  {
    icon: Award,
    title: "Legal Aid Clinic",
    description:
      "An active clinic operating in association with the District Legal Services Authority (DLSA). It provides free legal assistance to nearby communities, training students in real advocacy.",
  },
  {
    icon: BookOpen,
    title: "Vast Law Library",
    description:
      "An expansive collection of legal textbooks, reference manuals, AIR (All India Reporter), Supreme Court cases, local acts, and international legal publications.",
  },
  {
    icon: Globe,
    title: "E-Library & Research Databases",
    description:
      "High-speed internet access equipped with premium legal databases (like SCC Online and Manupatra) to assist students with comprehensive research for moot presentations and academic papers.",
  },
  {
    icon: Laptop,
    title: "Computer Laboratory",
    description:
      "A fully networked computer center helping students familiarize themselves with e-filing systems, judicial portal operations, and legal formatting tools.",
  },
  {
    icon: Presentation,
    title: "Smart Classrooms & Seminar Hall",
    description:
      "Well-ventilated classrooms with modern audio-visual teaching aids. Our seminar hall hosts guest lectures, national symposia, and legal orientations.",
  },
];

export function Infrastructure() {
  return (
    <section id="infrastructure" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">
            State-Of-The-Art Facilities
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            College Infrastructure
          </h2>
          <div className="h-1 w-20 bg-gold mx-auto rounded" />
          <p className="text-sm text-navy/70">
            Our campus offers excellent facilities designed to nurture professional competency and
            practical legal research.
          </p>
        </div>

        {/* Infrastructure Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-background border border-gold/15 p-8 rounded-xl shadow-sm hover-lift relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 h-16 w-16 bg-gold/5 rounded-bl-full transition-all group-hover:scale-110" />
                <div className="p-3 bg-navy/5 text-navy rounded-lg w-fit mb-5">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-base text-navy/70 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
