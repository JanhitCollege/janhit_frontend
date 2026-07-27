import { motion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import hero from "@/assets/jwsheroimage.jpeg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative w-full flex flex-col md:aspect-[16/9] bg-white overflow-hidden z-0 mt-24"
    >
      {/* 
        Hero Background Image Container:
        Locked to aspect-[4/3] on mobile for a much larger and taller image size.
        Locked to full cover on desktop inside the 16:9 parent container.
      */}
      <div className="relative w-full aspect-[4/3] md:absolute md:inset-0 md:w-full md:h-full z-0 overflow-hidden bg-white">
        <motion.img
          src={hero}
          alt="Janhit World School campus"
          className="w-full h-full object-cover"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      {/* 
        Main Overlay Content Container:
        Expanded width to max-w-[1360px] and adjusted right padding to pull the card closer to the right margin.
      */}
      <div className="relative z-10 w-full md:absolute md:inset-0 md:z-20 md:max-w-[1360px] md:mx-auto md:pl-6 md:pr-4 lg:pr-8 md:pb-8 lg:pb-12 md:flex md:items-end md:justify-end">
        {/* Floating White Glassmorphic Card (Shifted further Right & Compact) */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: 15 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative max-w-lg w-full bg-white md:bg-white/85 md:backdrop-blur-md border border-gray-100 md:border-white/40 rounded-3xl p-6 lg:p-8 shadow-luxury text-left mx-auto md:mx-0 mt-4 md:mt-0"
        >
          {/* Admissions Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B2566] border border-gold/30 shadow-sm self-start">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
            </span>
            <span className="text-white text-[10px] font-bold tracking-widest uppercase font-sans">
              Admissions Open · 2026-27
            </span>
          </div>

          {/* Compact Title */}
          <h1 className="mt-4 font-serif text-[#0B2566] text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight">
            Building Future <span className="italic text-gradient-gold">Leaders</span> <br /> From
            Day One.
          </h1>

          {/* Compact Subtitle Description */}
          <p className="mt-4 text-[#0B2566]/85 text-xs sm:text-sm leading-relaxed font-sans font-normal">
            A next-generation school blending academics, innovation, sports, creativity, and life
            skills — designed for the founding cohort of 2026-27 in Greater Noida.
          </p>

          {/* Compact Differentiators Checklist */}
          <div className="mt-5 space-y-2.5">
            <div className="flex items-center gap-2.5 text-[#0B2566]/90">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/25">
                <Sparkles className="size-2.5" />
              </div>
              <span className="text-[11px] font-semibold tracking-wide font-sans">
                Ivy-League Inspired Green Campus
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-[#0B2566]/90">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/25">
                <Sparkles className="size-2.5" />
              </div>
              <span className="text-[11px] font-semibold tracking-wide font-sans">
                Future-Ready Robotics & AI Labs
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-[#0B2566]/90">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/25">
                <Sparkles className="size-2.5" />
              </div>
              <span className="text-[11px] font-semibold tracking-wide font-sans">
                Olympic-Standard Arena & Shooting Range
              </span>
            </div>
          </div>

          {/* Compact CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 h-11 rounded-md gradient-gold text-navy-deep font-semibold text-xs tracking-wide shadow-gold hover:-translate-y-0.5 hover:shadow-luxury duration-300 transition-all"
            >
              <Calendar className="size-3.5" /> Book Campus Tour
            </a>
            <a
              href="#admissions"
              className="inline-flex items-center gap-2 px-5 h-11 rounded-md border border-[#0B2566]/40 text-[#0B2566] hover:bg-[#0B2566]/5 hover:-translate-y-0.5 duration-300 transition-all tracking-wide text-xs font-bold"
            >
              Apply for Admission <ArrowRight className="size-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
