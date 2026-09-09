import { motion } from "framer-motion";
import {
  Target,
  Cpu,
  Coins,
  Baby,
  Monitor,
  Lightbulb,
  Globe,
  Users,
  FlaskConical,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const features = [
  {
    icon: Target,
    title: "10m Indoor Shooting Range",
    desc: "A first-of-its-kind facility for precision, focus and Olympic-track exposure.",
  },
  {
    icon: Cpu,
    title: "Robotics & STEM Labs",
    desc: "Hands-on innovation labs for coding, robotics and design thinking.",
  },
  {
    icon: Coins,
    title: "Financial Literacy",
    desc: "Money, markets and mindful decisions — taught from an early age.",
  },
  {
    icon: Baby,
    title: "Montessori Foundation",
    desc: "Joyful, child-led discovery built on the proven Montessori method.",
  },
  {
    icon: Monitor,
    title: "Tech-Integrated Smart Classes",
    desc: "Every classroom is digital-first, immersive and interactive.",
  },
  {
    icon: Lightbulb,
    title: "Project-Based Learning",
    desc: "Real problems, real outcomes — learning that sticks for life.",
  },
  {
    icon: Globe,
    title: "International Curriculum",
    desc: "Globally benchmarked standards woven into the CBSE framework.",
  },
  {
    icon: Users,
    title: "Individual Attention",
    desc: "Small classes and personalised pathways for every learner.",
  },
  {
    icon: FlaskConical,
    title: "Experiential Learning",
    desc: "Outdoor labs, field trips and exhibitions that ignite curiosity.",
  },
];

export function WhyChoose() {
  return (
    <section id="why" className="relative py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Why Janhit"
          title={
            <>
              An education designed{" "}
              <span className="italic text-gradient-gold">without compromise.</span>
            </>
          }
          description="Every detail — from the curriculum to the corridor — has been engineered to give your child a decisive head-start."
        />

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.7 }}
              className="group relative p-8 rounded-2xl bg-white border border-border hover:border-gold/50 hover-lift overflow-hidden h-full flex flex-col justify-start"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,oklch(0.74_0.12_85/.12),transparent_60%)]" />
              <div className="relative flex flex-col h-full justify-start items-start">
                <div className="h-14 w-14 rounded-xl gradient-navy flex items-center justify-center text-gold shadow-glass mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="size-6" />
                </div>
                <h3 className="font-serif text-2xl text-navy">{f.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="mt-6 gold-divider opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
