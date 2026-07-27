import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import robotics from "@/assets/gallery-robotics.jpg";
import shooting from "@/assets/gallery-shooting.jpg";
import sports from "@/assets/gallery-sports.jpg";
import library from "@/assets/gallery-library.jpg";
import classroom from "@/assets/about-classroom.jpg";
import foundational from "@/assets/foundational.jpg";

const items = [
  { src: robotics, alt: "Robotics & STEM lab", className: "md:row-span-2", w: 1024, h: 1280 },
  { src: sports, alt: "Sports field", className: "", w: 1280, h: 896 },
  { src: classroom, alt: "Smart classroom", className: "", w: 1024, h: 1024 },
  { src: library, alt: "Library", className: "md:row-span-2", w: 1024, h: 1280 },
  { src: shooting, alt: "Indoor shooting range", className: "", w: 1280, h: 896 },
  { src: foundational, alt: "Foundational stage", className: "", w: 1280, h: 896 },
];

export function Campus() {
  return (
    <section id="campus" className="relative py-28 md:py-36 bg-beige">
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
          className="mt-16 grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[240px] gap-4"
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 relative rounded-3xl overflow-hidden aspect-[21/9] gradient-navy shadow-luxury group cursor-pointer"
        >
          <img
            src={sports}
            alt="Campus video preview"
            loading="lazy"
            width={1280}
            height={896}
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full gradient-gold flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform">
              <Play className="size-10 text-navy-deep fill-current ml-1" />
            </div>
          </div>
          <div className="absolute bottom-8 left-8 text-white">
            <div className="text-gold text-xs tracking-[0.3em] uppercase">Campus Film</div>
            <div className="font-serif text-2xl md:text-3xl mt-2">A day at Janhit World School</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
