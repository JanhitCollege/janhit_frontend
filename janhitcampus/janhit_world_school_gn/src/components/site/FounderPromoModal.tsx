import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X, Gift, Award, Trophy, Sparkles, ArrowRight } from "lucide-react";

export function FounderPromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the modal automatically on load/refresh with a slight delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleApplyNow = () => {
    setIsOpen(false);
    // Let the animation finish before opening the next dialog
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-admissions"));
    }, 200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl w-[94vw] p-0 overflow-hidden rounded-3xl bg-navy-deep text-white border border-gold/30 shadow-luxury z-[100] [&>button]:hidden">
        <div className="relative grid md:grid-cols-12">
          {/* Custom yellow hover circular close button */}
          <DialogClose className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full border border-white/20 bg-navy-deep/80 hover:bg-gold hover:text-navy-deep hover:border-gold hover:scale-105 transition-all duration-300 cursor-pointer shadow-luxury flex items-center justify-center">
            <X className="size-5 shrink-0" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {/* Left Column: Headline & Intro */}
          <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between relative bg-navy-deep/40 z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="inline-block text-gold text-xs font-bold tracking-[0.25em] uppercase mb-4">
                Founder's Batch
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                Privilege reserved for our <span className="italic text-gradient-gold">first families.</span>
              </h2>
              <p className="mt-4 text-sm text-white/75 leading-relaxed font-sans">
                Joining the founder's batch is more than admission — it is a lifelong relationship with the school. A handful of seats remain.
              </p>
            </div>

            {/* 50 Seats Badge */}
            <div className="mt-8 flex items-center gap-4 border border-gold/25 rounded-2xl p-4 bg-navy/60">
              <div className="font-serif text-3xl md:text-4xl font-bold text-gold tracking-tighter">
                50
              </div>
              <div className="text-[11px] font-sans font-bold tracking-widest uppercase text-white/90 leading-tight">
                Seats<br />Only
              </div>
            </div>
          </div>

          {/* Right Column: Benefits Grid & CTA */}
          <div className="md:col-span-6 bg-navy/80 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gold/15 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="text-white/60 text-xs tracking-wider uppercase font-semibold">
                Exclusive Privileges
              </div>

              {/* Benefit 1 */}
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Gift className="size-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Admission Fee Waiver</h4>
                  <p className="text-xs text-white/70 mt-0.5">Save the full admission fee as a founding family.</p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Award className="size-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Founder's Batch Discount</h4>
                  <p className="text-xs text-white/70 mt-0.5">Locked tuition advantage for foundational years.</p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Trophy className="size-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Priority Access to Clubs</h4>
                  <p className="text-xs text-white/70 mt-0.5">First pick of clubs, electives and leadership tracks.</p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Sparkles className="size-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Limited Seats Available</h4>
                  <p className="text-xs text-white/70 mt-0.5">Curated cohort, deeper teacher attention.</p>
                </div>
              </div>
            </div>

            {/* Apply Now Button */}
            <div className="mt-8">
              <button
                onClick={handleApplyNow}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 h-12 rounded-lg gradient-gold text-navy-deep font-bold tracking-wide shadow-gold hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Apply Now <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
