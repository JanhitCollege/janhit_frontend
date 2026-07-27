import { motion } from "framer-motion";
import { GraduationCap, Heart, Sparkles, Globe2 } from "lucide-react";
import img from "@/assets/about-classroom.jpg";

const pillars = [
  { icon: Globe2, title: "International Curriculum", desc: "Globally benchmarked, CBSE-aligned." },
  { icon: Heart, title: "Individual Attention", desc: "Low ratios. Deeper learning." },
  { icon: Sparkles, title: "Holistic Development", desc: "Mind, body, character, creativity." },
  { icon: GraduationCap, title: "Future-Ready", desc: "STEM, AI literacy, life skills." },
];

export function About() {
  return (
    <section id="about" className="relative pt-24 pb-28 md:pt-32 md:pb-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="absolute -inset-4 gradient-gold opacity-20 blur-3xl rounded-3xl" />
          <img
            src={img}
            alt="Premium classroom"
            loading="lazy"
            width={1024}
            height={1024}
            className="relative rounded-2xl shadow-luxury w-full object-cover aspect-[4/5]"
          />
          <div className="absolute -bottom-6 -right-6 hidden md:block glass rounded-xl p-5 shadow-luxury">
            <div className="font-serif text-3xl text-navy">15:1</div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
              Student – Teacher
            </div>
          </div>
        </motion.div>

        <div>
          <div className="inline-flex items-center gap-3 text-gold text-xs tracking-[0.35em] uppercase">
            <span className="h-px w-8 bg-gold/60" /> About the School
          </div>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-[1.05]">
            A school built for the <span className="italic text-gradient-gold">next century</span>{" "}
            of learning.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Janhit World School is being established as a premium CBSE-affiliated institution in
            Knowledge Park-5, Greater Noida. From the Foundational Stage to Class 8, every
            classroom, lab and corridor is crafted to nurture confident, curious, and grounded
            global citizens.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group p-5 rounded-xl bg-beige/40 border border-gold/20 hover-lift h-full flex flex-col justify-start items-start"
              >
                <div className="h-10 w-10 rounded-md gradient-navy flex items-center justify-center text-gold mb-3 group-hover:scale-110 transition-transform">
                  <p.icon className="size-5" />
                </div>
                <div className="font-serif text-xl text-navy font-semibold">{p.title}</div>
                <div className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
