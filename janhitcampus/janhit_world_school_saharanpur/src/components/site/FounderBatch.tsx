import { motion } from "framer-motion";
import { Award, Percent, Crown, Sparkles, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: Percent,
    title: "Admission Fee Waiver",
    desc: "Save the full admission fee as a founding family.",
  },
  {
    icon: Award,
    title: "Founder's Batch Discount",
    desc: "Locked tuition advantage for foundational years.",
  },
  {
    icon: Crown,
    title: "Priority Access to Clubs",
    desc: "First pick of clubs, electives and leadership tracks.",
  },
  {
    icon: Sparkles,
    title: "Limited Seats Available",
    desc: "Curated cohort, deeper teacher attention.",
  },
];

export function FounderBatch() {
  return (
    <section className="relative pt-8 md:pt-10 pb-16 md:pb-20 bg-white overflow-hidden">
      {/* Subtle gold background glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,oklch(0.74_0.12_85/.15),transparent_50%),radial-gradient(circle_at_80%_80%,oklch(0.74_0.12_85/.12),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-5xl text-navy leading-tight whitespace-normal sm:whitespace-nowrap">
            A Legacy of Excellence <span className="italic text-gradient-gold">Begins Here.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            More than a school, Janhit World School is an environment designed to inspire excellence, nurture character, and prepare young minds for a changing world.
          </p>
          <p className="mt-2 text-gold font-medium text-sm tracking-wide">
            Limited seats available for the next session.
          </p>
        </div>

        {/* All 4 cards in ONE single row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-6 rounded-2xl bg-white border border-border shadow-glass hover:border-gold/60 transition-all hover-lift flex flex-col justify-start"
            >
              <div className="h-12 w-12 rounded-xl gradient-gold flex items-center justify-center text-navy-deep mb-4 shadow-gold group-hover:scale-110 transition-transform shrink-0">
                <b.icon className="size-5" />
              </div>
              <div className="font-serif text-xl text-navy font-semibold">{b.title}</div>
              <div className="text-sm text-muted-foreground mt-2 leading-relaxed">{b.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button centered below */}
        <div className="flex justify-center mt-10">
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent("open-admissions"))}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-10 h-14 rounded-2xl gradient-gold text-navy-deep font-semibold tracking-wide shadow-gold hover:-translate-y-0.5 transition-all cursor-pointer text-base"
          >
            Apply Now <ArrowRight className="size-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
