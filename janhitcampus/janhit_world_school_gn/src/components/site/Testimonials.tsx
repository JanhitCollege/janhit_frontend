import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const reviews = [
  {
    quote:
      "The vision Janhit has for foundational education is unlike anything we've seen in NCR. Our daughter looks forward to school every single day.",
    name: "Aarti & Rohit Mehra",
    role: "Parents · Grade 2",
  },
  {
    quote:
      "From robotics to the shooting range, the breadth of opportunity here is extraordinary. It feels like a school built a decade ahead of its time.",
    name: "Captain Vivek Sharma",
    role: "Parent · Grade 5",
  },
  {
    quote:
      "Small classes, exceptional teachers and a campus that feels world-class. We chose Janhit for the founder's batch and have zero regrets.",
    name: "Dr. Sneha Kapoor",
    role: "Parent · Pre-K",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const r = reviews[i];
  const next = () => setI((v) => (v + 1) % reviews.length);
  const prev = () => setI((v) => (v - 1 + reviews.length) % reviews.length);

  return (
    <section className="relative py-28 md:py-36 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          eyebrow="Parent Voices"
          title={
            <>
              Trusted by <span className="italic text-gradient-gold">founding families.</span>
            </>
          }
        />

        <div className="mt-16 relative">
          <Quote className="absolute -top-8 left-0 size-24 text-gold/15" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative font-serif text-2xl md:text-4xl text-navy leading-relaxed italic"
            >
              "{r.quote}"
              <footer className="mt-10 not-italic font-sans">
                <div className="text-base font-semibold text-navy">{r.name}</div>
                <div className="text-sm tracking-wider uppercase text-gold mt-1">{r.role}</div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between">
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Review ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-10 bg-gold" : "w-4 bg-gold/30"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                aria-label="Previous"
                className="h-12 w-12 rounded-full border border-gold/40 flex items-center justify-center text-navy hover:bg-gold hover:text-navy-deep transition-all"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="h-12 w-12 rounded-full border border-gold/40 flex items-center justify-center text-navy hover:bg-gold hover:text-navy-deep transition-all"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
