import { useState } from "react";
import { LEADERSHIP_MESSAGES } from "@/data/homeData";
import { Award, BookOpen, ChevronRight, X, User, CheckCircle2, Quote } from "lucide-react";
import principalImg from "@/assets/principal-dr-sn-yadav.jpg";

export function AboutLeadership() {
  const [activeTab, setActiveTab] = useState<"both" | "chairman" | "principal">("both");
  const [modalLeader, setModalLeader] = useState<"chairman" | "principal" | null>(null);

  const chairman = LEADERSHIP_MESSAGES.chairman;
  const principal = LEADERSHIP_MESSAGES.principal;

  return (
    <section id="leadership-messages" className="py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>Visionary Leadership</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
            Messages from Our Leadership
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/70 leading-relaxed font-sans">
            Guiding our students towards intellectual distinction, constitutional integrity, and purposeful legal careers.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-gold/30 shadow-md">
            <button
              onClick={() => setActiveTab("both")}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "both"
                  ? "bg-navy text-white shadow-md"
                  : "text-navy/70 hover:text-navy hover:bg-gold/10"
              }`}
            >
              All Messages
            </button>
            <button
              onClick={() => setActiveTab("chairman")}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "chairman"
                  ? "bg-navy text-white shadow-md"
                  : "text-navy/70 hover:text-navy hover:bg-gold/10"
              }`}
            >
              <User className="w-4 h-4 text-gold" />
              <span>Chairman's Message</span>
            </button>
            <button
              onClick={() => setActiveTab("principal")}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "principal"
                  ? "bg-navy text-white shadow-md"
                  : "text-navy/70 hover:text-navy hover:bg-gold/10"
              }`}
            >
              <BookOpen className="w-4 h-4 text-gold" />
              <span>Principal's Message</span>
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="space-y-16">
          {/* 1. Chairman's Message */}
          {(activeTab === "both" || activeTab === "chairman") && (
            <div
              id="chairmans-message"
              className="bg-white rounded-3xl border border-gold/30 shadow-xl overflow-hidden hover:border-gold transition-all duration-300"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center p-6 md:p-10">
                {/* Left Profile Card */}
                <div className="lg:col-span-4 flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-gold/25 shadow-sm space-y-4">
                  <div className="relative">
                    <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl md:rounded-3xl bg-navy border-4 border-gold/40 flex items-center justify-center shadow-xl text-gold">
                      <User className="w-20 h-20 opacity-90" />
                    </div>
                    <div className="absolute -bottom-3 inset-x-0 mx-auto w-max px-3.5 py-1 rounded-full bg-gold text-navy-deep font-bold text-[11px] uppercase tracking-wider shadow-md border border-white/50">
                      Chairman
                    </div>
                  </div>

                  <div className="space-y-1 pt-2">
                    <h3 className="font-serif text-2xl font-bold text-navy">
                      {chairman.name}
                    </h3>
                    <p className="text-xs font-semibold text-gold uppercase tracking-wider">
                      {chairman.institution}
                    </p>
                  </div>

                  <div className="w-full pt-4 border-t border-gold/20 flex flex-col gap-2 text-xs text-navy/75 font-sans">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-navy">Role:</span>
                      <span>Visionary Founder & Chairman</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-navy">Legacy:</span>
                      <span>Since 2002</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-navy">Campus:</span>
                      <span>Greater Noida</span>
                    </div>
                  </div>
                </div>

                {/* Right Message Body */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex items-center gap-2 text-gold">
                    <Quote className="w-8 h-8 opacity-40 rotate-180" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">
                      Chairman's Perspective
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                    "Education is the most powerful instrument for transforming lives and building a progressive nation."
                  </h3>

                  <div className="space-y-3 text-base text-navy/85 leading-relaxed font-sans">
                    <p>{chairman.paragraphs[0]}</p>
                    <p className="line-clamp-3 text-navy/75">{chairman.paragraphs[1]}</p>
                    <p className="line-clamp-2 text-navy/75">{chairman.paragraphs[2]}</p>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-gold/20">
                    <button
                      onClick={() => setModalLeader("chairman")}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-white font-bold text-xs md:text-sm tracking-wider uppercase hover:bg-navy-deep shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <span>Read Chairman's Full Letter</span>
                      <ChevronRight className="w-4 h-4 text-gold" />
                    </button>

                    <div className="text-right">
                      <p className="font-serif font-bold text-navy text-base">
                        {chairman.name}
                      </p>
                      <p className="text-xs text-navy/60 font-medium">
                        Chairman, Janhit Group of Institutions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Principal's Message */}
          {(activeTab === "both" || activeTab === "principal") && (
            <div
              id="principals-message"
              className="bg-white rounded-3xl border border-gold/30 shadow-xl overflow-hidden hover:border-gold transition-all duration-300"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center p-6 md:p-10">
                {/* Left Profile Card with Photo */}
                <div className="lg:col-span-4 flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-gold/25 shadow-sm space-y-4">
                  <div className="relative">
                    <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl md:rounded-3xl bg-navy/10 border-4 border-gold/40 flex items-center justify-center shadow-xl overflow-hidden">
                      <img
                        src={principalImg}
                        alt={principal.name}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-3 inset-x-0 mx-auto w-max px-3.5 py-1 rounded-full bg-gold text-navy-deep font-bold text-[11px] uppercase tracking-wider shadow-md border border-white/50">
                      Principal
                    </div>
                  </div>

                  <div className="space-y-1 pt-2">
                    <h3 className="font-serif text-2xl font-bold text-navy">
                      {principal.name}
                    </h3>
                    <p className="text-xs font-semibold text-gold uppercase tracking-wider">
                      {principal.institution}
                    </p>
                  </div>

                  <div className="w-full pt-4 border-t border-gold/20 flex flex-col gap-2 text-xs text-navy/75 font-sans">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-navy">Designation:</span>
                      <span>Principal & Head of Institution</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-navy">Academic Focus:</span>
                      <span>Jurisprudence & Constitutional Law</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-navy">Affiliation:</span>
                      <span>BCI Approved & CCSU Affiliated</span>
                    </div>
                  </div>
                </div>

                {/* Right Message Body */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex items-center gap-2 text-gold">
                    <Quote className="w-8 h-8 opacity-40 rotate-180" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">
                      Principal's Address
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                    "The study of law is about developing a deep sense of justice, ethics, and social responsibility."
                  </h3>

                  <div className="space-y-3 text-base text-navy/85 leading-relaxed font-sans">
                    <p>{principal.paragraphs[0]}</p>
                    <p className="line-clamp-3 text-navy/75">{principal.paragraphs[1]}</p>
                    <p className="line-clamp-2 text-navy/75">{principal.paragraphs[2]}</p>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-gold/20">
                    <button
                      onClick={() => setModalLeader("principal")}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-white font-bold text-xs md:text-sm tracking-wider uppercase hover:bg-navy-deep shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <span>Read Principal's Full Letter</span>
                      <ChevronRight className="w-4 h-4 text-gold" />
                    </button>

                    <div className="text-right">
                      <p className="font-serif font-bold text-navy text-base">
                        {principal.name}
                      </p>
                      <p className="text-xs text-navy/60 font-medium">
                        Principal, Janhit College of Law Greater Noida
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Leadership Full Message Modal */}
      {modalLeader && (
        <div
          className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalLeader(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gold/40 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-navy text-white px-6 py-5 flex items-center justify-between border-b border-gold/30">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-gold font-bold">
                  Official Leadership Address
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  {modalLeader === "chairman"
                    ? "Chairman's Official Welcome Message"
                    : "Principal's Official Welcome Message"}
                </h3>
              </div>
              <button
                onClick={() => setModalLeader(null)}
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
                {modalLeader === "principal" ? (
                  <img
                    src={principalImg}
                    alt={principal.name}
                    className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-gold shadow shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-navy text-gold flex items-center justify-center shrink-0 font-serif font-bold text-2xl border-2 border-gold shadow">
                    {chairman.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-serif text-xl font-bold text-navy">
                    {modalLeader === "chairman" ? chairman.name : principal.name}
                  </h4>
                  <p className="text-xs text-gold font-semibold uppercase tracking-wider">
                    {modalLeader === "chairman" ? chairman.institution : principal.institution}
                  </p>
                </div>
              </div>

              {/* All Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg text-navy/90 leading-relaxed font-sans divide-y divide-gold/10">
                {(modalLeader === "chairman" ? chairman.paragraphs : principal.paragraphs).map(
                  (para, idx) => (
                    <p key={idx} className={idx > 0 ? "pt-4" : ""}>
                      {para}
                    </p>
                  )
                )}
              </div>

              {/* Official Sign-off */}
              <div className="pt-6 border-t border-gold/30 bg-slate-50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-3xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-1">
                  Official Endorsement & Seal
                </p>
                <p className="font-serif font-bold text-navy text-lg">
                  {modalLeader === "chairman" ? chairman.name : principal.name}
                </p>
                <p className="text-xs text-navy/70 whitespace-pre-line mt-1 font-medium font-sans">
                  {modalLeader === "chairman" ? chairman.signOff : principal.signOff}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
