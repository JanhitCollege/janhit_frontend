import { motion } from "framer-motion";
import { Trophy, CircleDot, TableProperties, Wind, Sunrise, Target } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const sports = [
  { icon: Trophy, title: "Football", desc: "Full-size practice field with certified coaching." },
  { icon: CircleDot, title: "Cricket", desc: "Nets, pitches and structured league play." },
  { icon: TableProperties, title: "Table Tennis", desc: "Indoor courts for precision and reflex." },
  { icon: Wind, title: "Yoga & Wellness", desc: "Mindfulness, breathwork and physical strength." },
  {
    icon: Sunrise,
    title: "Morning Sports Electives",
    desc: "Choose your sport. Start every day energised.",
  },
  { icon: Target, title: "Indoor Shooting Range", desc: "A signature facility unique to Janhit." },
];

export function Sports() {
  return (
    <section id="sports" className="relative py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Sports & Activities"
          title={
            <>
              Champions are built <span className="italic text-gradient-gold">on the field</span>{" "}
              too.
            </>
          }
          description="A world-class athletics programme that develops grit, teamwork and the unmistakable confidence of a winner."
        />

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              className="group relative p-8 rounded-2xl gradient-navy text-white overflow-hidden hover-lift border border-gold/20 h-full flex flex-col justify-start"
            >
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gold/10 blur-3xl group-hover:bg-gold/20 transition-colors duration-500" />
              <div className="relative flex items-start gap-5 h-full">
                <div className="h-14 w-14 rounded-xl gradient-gold flex items-center justify-center text-navy-deep shadow-gold shrink-0 group-hover:scale-110 transition-transform">
                  <s.icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl">{s.title}</h3>
                  <p className="mt-2 text-white/70 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
