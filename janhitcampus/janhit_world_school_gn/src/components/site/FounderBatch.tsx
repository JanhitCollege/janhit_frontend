import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return <span ref={ref}>{n}</span>;
}

export function FounderBatch() {
  return (
    <section className="relative py-28 md:py-36 bg-white overflow-hidden">
      {/* Subtle gold background glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,oklch(0.74_0.12_85/.15),transparent_50%),radial-gradient(circle_at_80%_80%,oklch(0.74_0.12_85/.12),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-3 text-gold text-xs tracking-[0.35em] uppercase">
              <span className="h-px w-8 bg-gold/60" /> Founder's Batch
            </div>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-[1.05]">
              Privilege reserved for our{" "}
              <span className="italic text-gradient-gold">first families.</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-xl leading-relaxed">
              Joining the founder's batch is more than admission — it is a lifelong relationship
              with the school. A handful of seats remain.
            </p>

            <div className="flex flex-row items-center gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-4 px-10 h-16 rounded-2xl bg-beige border border-gold/20 shadow-glass"
              >
                <div className="font-serif text-4xl font-bold text-gradient-gold leading-none">
                  <Counter target={50} />
                </div>
                <div className="text-navy/85 text-sm tracking-[0.15em] uppercase font-bold whitespace-nowrap">
                  Seats Only
                </div>
              </motion.div>

              <motion.button
                onClick={() => window.dispatchEvent(new CustomEvent("open-admissions"))}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-10 h-16 rounded-2xl gradient-gold text-navy-deep font-semibold tracking-wide shadow-gold hover:-translate-y-0.5 transition-all cursor-pointer text-lg"
              >
                Apply Now <ArrowRight className="size-6" />
              </motion.button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group p-6 rounded-2xl bg-white border border-border shadow-glass hover:border-gold/60 transition-all hover-lift"
              >
                <div className="h-12 w-12 rounded-xl gradient-gold flex items-center justify-center text-navy-deep mb-4 shadow-gold group-hover:scale-110 transition-transform">
                  <b.icon className="size-5" />
                </div>
                <div className="font-serif text-xl text-navy">{b.title}</div>
                <div className="text-sm text-muted-foreground mt-2">{b.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
