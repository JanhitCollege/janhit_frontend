import { useState } from "react";
import { LEADERSHIP_MESSAGES } from "@/data/homeData";
import { Award, BookOpen, ChevronRight, X, User } from "lucide-react";
import principalImg from "@/assets/principal-dr-sn-yadav.jpg";

export function LeadershipMessages() {
  const [activeLeader, setActiveLeader] = useState<"chairman" | "principal">("chairman");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentLeader = LEADERSHIP_MESSAGES[activeLeader];

  return (
    <section id="leadership-messages" className="py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>Visionary Leadership</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Leadership Welcome Messages
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/70 leading-relaxed">
            Guiding our students towards intellectual distinction, constitutional integrity, and purposeful legal careers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-gold/30 shadow-md">
            <button
              onClick={() => setActiveLeader("chairman")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeLeader === "chairman"
                  ? "bg-navy text-white shadow-md"
                  : "text-navy/70 hover:text-navy hover:bg-gold/10"
              }`}
            >
              <User className="w-4 h-4 text-gold" />
              <span>Chairman's Message</span>
            </button>
            <button
              onClick={() => setActiveLeader("principal")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeLeader === "principal"
                  ? "bg-navy text-white shadow-md"
                  : "text-navy/70 hover:text-navy hover:bg-gold/10"
              }`}
            >
              <BookOpen className="w-4 h-4 text-gold" />
              <span>Principal's Message</span>
            </button>
          </div>
        </div>

        {/* Message Showcase Card */}
        <div className="bg-white rounded-3xl border border-gold/30 shadow-xl overflow-hidden transition-all duration-300">
          <div className="grid lg:grid-cols-12 gap-8 items-center p-6 md:p-12">
            {/* Left Profile Badge & Details */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-gold/25 shadow-inner space-y-4">
              <div className="relative">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl md:rounded-3xl bg-navy/10 border-4 border-gold/40 flex items-center justify-center shadow-xl overflow-hidden">
                  {activeLeader === "principal" ? (
                    <img
                      src={principalImg}
                      alt={currentLeader.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-navy flex flex-col items-center justify-center text-gold">
                      <User className="w-16 h-16 opacity-80" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-3 inset-x-0 mx-auto w-max px-3.5 py-1 rounded-full bg-gold text-navy-deep font-bold text-[11px] uppercase tracking-wider shadow-md border border-white/50">
                  {currentLeader.role}
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <h3 className="font-serif text-2xl font-bold text-navy">
                  {currentLeader.name}
                </h3>
                <p className="text-xs font-semibold text-gold uppercase tracking-wider">
                  {currentLeader.institution}
                </p>
              </div>

              <div className="w-full pt-4 border-t border-gold/20 flex flex-col gap-2 text-xs text-navy/75">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-navy">Campus:</span>
                  <span>Knowledge Park-1, Greater Noida</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-navy">Affiliation:</span>
                  <span>CCSU & BCI Approved</span>
                </div>
              </div>
            </div>

            {/* Right Message Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Message Preview (First 2 paragraphs) */}
              <div className="space-y-4 text-base md:text-lg text-navy/90 leading-relaxed font-sans">
                <p>{currentLeader.paragraphs[0]}</p>
                {currentLeader.paragraphs.length > 1 && (
                  <p className="line-clamp-4">
                    {currentLeader.paragraphs[1]}
                  </p>
                )}
              </div>

              {/* Read Full Message Button & Sign-off Preview */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-gold/20">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-navy text-white font-bold text-xs md:text-sm tracking-wider uppercase hover:opacity-95 shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>Read Full Message</span>
                  <ChevronRight className="w-4 h-4 text-gold" />
                </button>

                <div className="text-right">
                  <p className="font-serif font-bold text-navy text-base">
                    {currentLeader.name}
                  </p>
                  <p className="text-xs text-navy/60 font-medium">
                    {currentLeader.role}, {currentLeader.institution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Message Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gold/40 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-navy text-white px-6 py-5 flex items-center justify-between border-b border-gold/30">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-gold font-bold">
                  Official Message
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  {activeLeader === "chairman"
                    ? "Message from the Chairman"
                    : "Message from the Principal"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-navy transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Leader Banner */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-gold/20">
                {activeLeader === "principal" ? (
                  <img
                    src={principalImg}
                    alt={currentLeader.name}
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-gold shadow shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-navy text-gold flex items-center justify-center shrink-0 font-serif font-bold text-xl">
                    {currentLeader.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-serif text-lg font-bold text-navy">
                    {currentLeader.name}
                  </h4>
                  <p className="text-xs text-gold font-semibold uppercase tracking-wider">
                    {currentLeader.institution}
                  </p>
                </div>
              </div>

              {/* All Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg text-navy/90 leading-relaxed divide-y divide-gold/10 font-sans">
                {currentLeader.paragraphs.map((para, index) => (
                  <p key={index} className={index > 0 ? "pt-4" : ""}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Formal Sign-off */}
              <div className="pt-6 border-t border-gold/30 bg-slate-50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-3xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-1">
                  Official Endorsement
                </p>
                <p className="font-serif font-bold text-navy text-lg">
                  {currentLeader.name}
                </p>
                <p className="text-xs text-navy/70 whitespace-pre-line mt-1 font-medium">
                  {currentLeader.signOff}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
