import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, ShieldCheck, Award } from "lucide-react";
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

      {/* Dedicated Quick Trust Factors Bar */}
      <div className="bg-white border-b border-gold/20 py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-background border border-gold/20 p-5 rounded-lg flex items-start gap-3.5 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2.5 rounded bg-gold/10 text-gold shrink-0">
              <ShieldCheck className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-navy text-base font-bold">BCI Approved</h4>
              <p className="text-navy/75 text-sm mt-1">
                Approved by Bar Council of India, New Delhi
              </p>
            </div>
          </div>

          <div className="bg-background border border-gold/20 p-5 rounded-lg flex items-start gap-3.5 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2.5 rounded bg-gold/10 text-gold shrink-0">
              <Award className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-navy text-base font-bold">Affiliated to CCSU</h4>
              <p className="text-navy/75 text-sm mt-1">Chaudhary Charan Singh University, Meerut</p>
            </div>
          </div>

          <div className="bg-background border border-gold/20 p-5 rounded-lg flex items-start gap-3.5 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2.5 rounded bg-gold/10 text-gold shrink-0">
              <Calendar className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-navy text-base font-bold">5Yrs & 3Yrs Programs</h4>
              <p className="text-navy/75 text-sm mt-1">
                Comprehensive integrated & graduate law courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
