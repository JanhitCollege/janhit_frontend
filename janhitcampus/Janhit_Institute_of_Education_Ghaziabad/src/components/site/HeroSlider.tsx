import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, GraduationCap, ArrowRight } from "lucide-react";

import heroBuildingFront from "@/assets/hero-building-front.png";
import heroBuildingSide from "@/assets/hero-building-side.png";

const backgroundImages = [heroBuildingFront, heroBuildingSide];

export function HeroSlider() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-navy border-b border-gold/20">
      {/* Auto-Sliding Background Hero Image Container */}
      <div className="relative w-full h-[260px] sm:h-[350px] md:h-[620px] lg:h-[680px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImgIndex}
            src={backgroundImages[currentImgIndex]}
            alt="Janhit Institute of Education & Information Campus Building"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Responsive Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-navy/20 md:hidden" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-l from-navy-deep/85 via-navy/30 to-transparent" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-navy/20" />
      </div>

      {/* Light Card Content Container */}
      {/* Mobile: Appears cleanly BELOW the hero image with zero overlap */}
      {/* Desktop (md+): Absolutely floating over the hero image on the far right */}
      <div className="relative z-10 max-w-[1536px] mx-auto px-3 sm:px-4 md:px-6 w-full py-4 md:py-0 md:absolute md:inset-0 md:flex md:items-center md:justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md sm:max-w-lg md:max-w-[360px] lg:max-w-[390px] mx-auto md:mx-0 bg-white/95 backdrop-blur-xl border border-white/80 p-5 sm:p-6 rounded-2xl shadow-2xl space-y-4 text-navy"
        >
          {/* Top Navy Pill Badge */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-navy-deep text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>ADMISSIONS OPEN • 2026-27</span>
            </span>
          </div>

          {/* Main Title in Sharp Deep Golden Yellow */}
          <h1 className="font-serif text-xl sm:text-2xl font-bold leading-snug tracking-tight text-[#D97706]">
            Janhit Institute of Education & Information
          </h1>

          {/* Subtext Description */}
          <p className="text-navy/80 text-xs sm:text-xs leading-relaxed font-medium">
            Empowering minds and shaping future leaders through quality higher education, modern infrastructure, and holistic academic development in Greater Noida.
          </p>

          {/* Feature Bullet Points */}
          <div className="space-y-2.5 pt-1 border-t border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-2.5 h-2.5 text-amber-600" />
              </div>
              <span className="text-navy font-semibold text-xs leading-snug">
                Affiliated to CCS University, Meerut & NCTE Approved
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-2.5 h-2.5 text-amber-600" />
              </div>
              <span className="text-navy font-semibold text-xs leading-snug">
                20+ Years Legacy • 35,000+ Alumni Network
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-2.5 h-2.5 text-amber-600" />
              </div>
              <span className="text-navy font-semibold text-xs leading-snug">
                Modern Labs, Sports Arena & Placement Cell
              </span>
            </div>
          </div>

          {/* Action CTAs Row */}
          <div className="pt-1 flex items-center gap-2">
            <Link
              to="/admission"
              className="flex-1 py-2.5 px-3 rounded-xl gradient-gold text-navy-deep font-bold text-[11px] sm:text-xs tracking-wide uppercase shadow-gold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer text-center whitespace-nowrap"
            >
              <GraduationCap className="h-3.5 w-3.5 shrink-0" />
              <span>Apply Now</span>
            </Link>

            <Link
              to="/courses"
              className="flex-1 py-2.5 px-3 rounded-xl border border-navy/30 text-navy hover:bg-navy/5 font-bold text-[11px] sm:text-xs tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer text-center whitespace-nowrap"
            >
              <span>Courses</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </Link>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center justify-center gap-2 pt-0.5">
            {backgroundImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImgIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentImgIndex === idx ? "w-5 bg-gold" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
