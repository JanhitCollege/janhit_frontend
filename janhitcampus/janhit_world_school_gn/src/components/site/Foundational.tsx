import { motion } from "framer-motion";
import { BookOpen, Palette, Music, Shield, Sparkles, Blocks } from "lucide-react";
import img from "@/assets/foundational.jpg";

const items = [
  {
    icon: Blocks,
    title: "Montessori Lab",
    bgClass:
      "bg-rose-50/40 border-rose-100/60 hover:border-rose-300 hover:shadow-[0_12px_24px_rgba(244,63,94,0.08)]",
    iconClass: "bg-rose-500 text-white",
  },
  {
    icon: BookOpen,
    title: "Mini Library",
    bgClass:
      "bg-sky-50/40 border-sky-100/60 hover:border-sky-300 hover:shadow-[0_12px_24px_rgba(14,165,233,0.08)]",
    iconClass: "bg-sky-500 text-white",
  },
  {
    icon: Palette,
    title: "Creative Arts",
    bgClass:
      "bg-amber-50/40 border-amber-100/60 hover:border-amber-300 hover:shadow-[0_12px_24px_rgba(245,158,11,0.08)]",
    iconClass: "bg-amber-500 text-white",
  },
  {
    icon: Music,
    title: "Music & Activity Zone",
    bgClass:
      "bg-indigo-50/40 border-indigo-100/60 hover:border-indigo-300 hover:shadow-[0_12px_24px_rgba(99,102,241,0.08)]",
    iconClass: "bg-indigo-500 text-white",
  },
  {
    icon: Shield,
    title: "Safe & Joyful Environment",
    bgClass:
      "bg-emerald-50/40 border-emerald-100/60 hover:border-emerald-300 hover:shadow-[0_12px_24px_rgba(16,185,129,0.08)]",
    iconClass: "bg-emerald-500 text-white",
  },
  {
    icon: Sparkles,
    title: "Sensorial Discovery",
    bgClass:
      "bg-purple-50/40 border-purple-100/60 hover:border-purple-300 hover:shadow-[0_12px_24px_rgba(168,85,247,0.08)]",
    iconClass: "bg-purple-500 text-white",
  },
];

export function Foundational() {
  return (
    <section id="foundation" className="relative py-28 md:py-36 bg-white overflow-hidden">
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full gradient-navy opacity-5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
        <div>
          <div className="inline-flex items-center gap-3 text-gold text-xs tracking-[0.35em] uppercase">
            <span className="h-px w-8 bg-gold/60" /> Foundational Hub
          </div>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-[1.05]">
            A magical first chapter for{" "}
            <span className="italic text-gradient-gold">little learners.</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            From Playgroup to UKG, our dedicated Foundational Hub blends Montessori wisdom with
            premium, sensorial spaces — the kind of beginning every child deserves.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`group p-5 rounded-2xl border hover-lift h-full flex flex-col justify-start items-start ${it.bgClass}`}
              >
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center mb-3 group-hover:rotate-6 transition-transform shadow-sm ${it.iconClass}`}
                >
                  <it.icon className="size-5" />
                </div>
                <div className="font-serif text-lg text-navy font-semibold">{it.title}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <img
            src={img}
            alt="Foundational learning space"
            loading="lazy"
            width={1280}
            height={896}
            className="rounded-3xl shadow-luxury w-full object-cover aspect-[4/5]"
          />
          <div className="absolute -top-6 -left-6 glass rounded-2xl p-5 shadow-luxury">
            <div className="font-serif text-3xl text-navy">Early - Classes </div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
              Foundational Stage
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
