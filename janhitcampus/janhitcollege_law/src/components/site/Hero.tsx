import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ShieldCheck,
  Award,
  Clock,
  Scale,
  GraduationCap,
  Users,
} from "lucide-react";
import hero1 from "@/assets/janhit hero image 1.jpg";
import hero2 from "@/assets/janhit hero image 2.jpg";

const slides = [
  {
    image: hero1,
    title: "Empowering Legal Minds of Tomorrow",
    subtitle: "Excellence in legal education, practical court training, and values that matter.",
  },
  {
    image: hero2,
    title: "Shape Your Future in Law",
    subtitle: "BCI approved courses, distinguished faculty, and dedicated Moot Court hall.",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-black"
      >
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slides[current].image}
                alt="Janhit College of Law Campus"
                className="w-full h-full object-cover object-center brightness-[0.45]"
              />
              {/* Elegant overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-3xl space-y-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gold/15 backdrop-blur-md border border-gold/40 px-4 py-2 rounded-full text-gold text-xs font-bold uppercase tracking-widest shadow-lg"
            >
              <Award className="h-4 w-4 text-gold animate-pulse" />
              <span>Admissions Open 2026-27</span>
            </motion.div>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight"
              >
                {slides[current].title}
              </motion.h1>
            </AnimatePresence>

            {/* Subheading */}
            <AnimatePresence mode="wait">
              <motion.p
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-white/85 font-sans font-light max-w-2xl leading-relaxed"
              >
                {slides[current].subtitle}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#apply"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md gradient-gold text-navy-deep font-bold text-sm tracking-wider uppercase shadow-gold hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Apply Online <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md border border-white/30 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-semibold text-sm tracking-wide uppercase transition-all duration-300 cursor-pointer"
              >
                Explore Courses
              </a>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 right-8 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                current === index ? "w-8 bg-gold" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Dedicated Quick Trust Factors Bar with Glassmorphism & Hover Effects */}
      <div className="relative py-12 px-6 bg-slate-50/90 border-b border-gold/25 overflow-hidden">
        {/* Soft Ambient Glows for Glassmorphism backdrop-blur depth */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-28 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-28 bg-navy/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 relative z-10">
          {/* Card 1: Est. 2002 */}
          <div className="group relative bg-white/95 hover:bg-white backdrop-blur-md border border-gold/30 hover:border-gold p-5 sm:p-6 rounded-2xl flex flex-col items-center text-center justify-center shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer overflow-hidden min-h-[150px]">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 group-hover:bg-gold group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center text-gold group-hover:text-navy-deep mb-3 shrink-0 shadow-xs">
              <Clock className="h-6 w-6" />
            </div>
            <h4 className="text-navy group-hover:text-gold transition-colors font-sans font-bold text-xs sm:text-sm uppercase tracking-wider">
              Est. 2002
            </h4>
            <p className="text-slate-700 font-medium text-xs sm:text-sm mt-1">
              20+ Yrs Excellence
            </p>
          </div>

          {/* Card 2: BCI Approved */}
          <div className="group relative bg-white/95 hover:bg-white backdrop-blur-md border border-gold/30 hover:border-gold p-5 sm:p-6 rounded-2xl flex flex-col items-center text-center justify-center shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer overflow-hidden min-h-[150px]">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 group-hover:bg-gold group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center text-gold group-hover:text-navy-deep mb-3 shrink-0 shadow-xs">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-navy group-hover:text-gold transition-colors font-sans font-bold text-xs sm:text-sm uppercase tracking-wider">
              BCI Approved
            </h4>
            <p className="text-slate-700 font-medium text-xs sm:text-sm mt-1">
              Bar Council of India
            </p>
          </div>

          {/* Card 3: Affiliated */}
          <div className="group relative bg-white/95 hover:bg-white backdrop-blur-md border border-gold/30 hover:border-gold p-5 sm:p-6 rounded-2xl flex flex-col items-center text-center justify-center shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer overflow-hidden min-h-[150px]">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 group-hover:bg-gold group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center text-gold group-hover:text-navy-deep mb-3 shrink-0 shadow-xs">
              <Award className="h-6 w-6" />
            </div>
            <h4 className="text-navy group-hover:text-gold transition-colors font-sans font-bold text-xs sm:text-sm uppercase tracking-wider">
              Affiliated
            </h4>
            <p className="text-slate-700 font-medium text-xs sm:text-sm mt-1">
              CCSU Meerut
            </p>
          </div>

          {/* Card 4: Moot Court */}
          <div className="group relative bg-white/95 hover:bg-white backdrop-blur-md border border-gold/30 hover:border-gold p-5 sm:p-6 rounded-2xl flex flex-col items-center text-center justify-center shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer overflow-hidden min-h-[150px]">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 group-hover:bg-gold group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center text-gold group-hover:text-navy-deep mb-3 shrink-0 shadow-xs">
              <Scale className="h-6 w-6" />
            </div>
            <h4 className="text-navy group-hover:text-gold transition-colors font-sans font-bold text-xs sm:text-sm uppercase tracking-wider">
              Moot Court
            </h4>
            <p className="text-slate-700 font-medium text-xs sm:text-sm mt-1">
              Courtroom & Legal Aid
            </p>
          </div>

          {/* Card 5: 5Yr & 3Yr Law */}
          <div className="group relative bg-white/95 hover:bg-white backdrop-blur-md border border-gold/30 hover:border-gold p-5 sm:p-6 rounded-2xl flex flex-col items-center text-center justify-center shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer overflow-hidden min-h-[150px]">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 group-hover:bg-gold group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center text-gold group-hover:text-navy-deep mb-3 shrink-0 shadow-xs">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h4 className="text-navy group-hover:text-gold transition-colors font-sans font-bold text-xs sm:text-sm uppercase tracking-wider">
              5Yr & 3Yr Law
            </h4>
            <p className="text-slate-700 font-medium text-xs sm:text-sm mt-1">
              UG & Graduate Degrees
            </p>
          </div>

          {/* Card 6: 35,000+ Alumni */}
          <div className="group relative bg-white/95 hover:bg-white backdrop-blur-md border border-gold/30 hover:border-gold p-5 sm:p-6 rounded-2xl flex flex-col items-center text-center justify-center shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer overflow-hidden min-h-[150px]">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 group-hover:bg-gold group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center text-gold group-hover:text-navy-deep mb-3 shrink-0 shadow-xs">
              <Users className="h-6 w-6" />
            </div>
            <h4 className="text-navy group-hover:text-gold transition-colors font-sans font-bold text-xs sm:text-sm uppercase tracking-wider">
              35,000+ Alumni
            </h4>
            <p className="text-slate-700 font-medium text-xs sm:text-sm mt-1">
              Group Legacy
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
