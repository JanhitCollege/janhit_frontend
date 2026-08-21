import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const faqs = [
  {
    q: "What is the admission process?",
    a: "Inquiry → Campus Experience → Student Interaction → Principal Interaction → Enrollment. Each step is personal and unhurried.",
  },
  {
    q: "What is the fee structure?",
    a: "Our detailed fee structure and refund policy are available on the Admissions page under the Fee Structure section. Founder's batch families enjoy a 100% admission fee waiver.",
  },
  {
    q: "Which curriculum is followed?",
    a: "An internationally benchmarked curriculum aligned with the CBSE framework, enriched by STEM, arts, and life-skills programmes.",
  },
  {
    q: "Is transportation available?",
    a: "Yes — GPS-tracked, attendant-supervised buses cover key residential pockets of Greater Noida.",
  },
  {
    q: "What safety measures are in place?",
    a: "24x7 CCTV, biometric access, trained staff, a fully-equipped infirmary and strict visitor protocols.",
  },
  {
    q: "What is the CBSE affiliation status?",
    a: "Janhit World School is in the process of CBSE affiliation for the 2026-27 academic session.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="relative py-28 md:py-36 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          eyebrow="Questions"
          title={
            <>
              Everything you'd like <span className="italic text-gradient-gold">to know.</span>
            </>
          }
        />
        <div className="mt-16 space-y-5">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-white border-gold/40 shadow-luxury"
                    : "bg-white border-gray-100 shadow-luxury/5 hover:border-gold/30 hover:shadow-luxury/15 hover:-translate-y-0.5"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 text-left p-6 md:p-7"
                >
                  <span className="font-serif text-lg md:text-xl text-navy font-medium leading-snug">
                    {f.q}
                  </span>
                  <span
                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen
                        ? "gradient-gold text-navy-deep rotate-45 shadow-gold"
                        : "border border-gold/40 text-navy hover:bg-gold/10"
                    }`}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 md:px-7 md:pb-7 text-muted-foreground leading-relaxed text-sm md:text-base border-t border-gray-50 pt-4 mt-1">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
