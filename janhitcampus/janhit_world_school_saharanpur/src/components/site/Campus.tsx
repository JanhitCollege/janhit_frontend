import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { CampusVideoPlayer } from "./CampusVideoPlayer";
import robotics from "@/assets/gallery-robotics.jpg";
import shooting from "@/assets/gallery-shooting.jpg";
import sports from "@/assets/gallery-sports.jpg";
import library from "@/assets/gallery-library.jpg";
import classroom from "@/assets/about-classroom.jpg";
import foundational from "@/assets/foundational.jpg";

const items = [
  { src: robotics, alt: "Robotics & STEM Lab", className: "md:row-span-2", w: 1200, h: 800 },
  { src: sports, alt: "Sports & Athletic Arena", className: "", w: 1200, h: 800 },
  { src: classroom, alt: "Smart Classroom", className: "", w: 1200, h: 800 },
  { src: library, alt: "Library & Resource Center", className: "md:row-span-2", w: 1200, h: 800 },
  { src: shooting, alt: "Campus Experience Showcase", className: "", w: 1200, h: 800 },
  { src: foundational, alt: "Foundational Stage Hub", className: "", w: 1200, h: 800 },
];

export function Campus() {
  return (
    <section id="campus" className="relative pt-10 md:pt-14 pb-20 md:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Campus Experience"
          title={
            <>
              Step inside the <span className="italic text-gradient-gold">Janhit world.</span>
            </>
          }
          description="A few frames from a campus designed for wonder, performance and lifelong friendships."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[240px] gap-4"
        >
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              className={`relative rounded-2xl overflow-hidden group shadow-glass ${it.className}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                width={it.w}
                height={it.h}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 text-white font-serif text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {it.alt}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Autopolaying Campus Video Player */}
        <CampusVideoPlayer />
      </div>
    </section>
  );
}
