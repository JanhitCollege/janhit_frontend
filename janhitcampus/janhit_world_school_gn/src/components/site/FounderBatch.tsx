import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Award, Percent, Crown, Sparkles } from "lucide-react";

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
    <section className="relative py-28 md:py-36 bg-navy-deep overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,oklch(0.74_0.12_85/.25),transparent_50%),radial-gradient(circle_at_80%_80%,oklch(0.74_0.12_85/.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,oklch(0.74_0.12_85/.08)_95%)] bg-[length:100%_60px]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-3 text-gold text-xs tracking-[0.35em] uppercase">
              <span className="h-px w-8 bg-gold/60" /> Founder's Batch
            </div>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05]">
              Privilege reserved for our{" "}
              <span className="italic text-gradient-gold">first families.</span>
            </h2>
            <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">
              Joining the founder's batch is more than admission — it is a lifelong relationship
              with the school. A handful of seats remain.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-10 inline-flex items-baseline gap-4 px-8 py-6 rounded-2xl glass-dark"
            >
              <div className="font-serif text-7xl md:text-8xl text-gradient-gold leading-none">
                <Counter target={50} />
              </div>
              <div className="text-white/80 text-sm tracking-[0.25em] uppercase">
                Seats <br /> Only
              </div>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group p-6 rounded-2xl glass-dark hover:border-gold/60 transition-all hover-lift"
              >
                <div className="h-12 w-12 rounded-xl gradient-gold flex items-center justify-center text-navy-deep mb-4 shadow-gold group-hover:scale-110 transition-transform">
                  <b.icon className="size-5" />
                </div>
                <div className="font-serif text-xl text-white">{b.title}</div>
                <div className="text-sm text-white/65 mt-2">{b.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
