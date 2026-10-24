import { useState } from "react";
import { Link } from "react-router-dom";
import { STAKEHOLDERS_DATA } from "@/data/homeData";
import {
  GraduationCap,
  Building2,
  Landmark,
  CheckCircle2,
  ArrowRight,
  Scale,
  HeartHandshake,
  Briefcase,
  BookOpen,
  Compass,
  ShieldAlert,
  Users,
  Award,
  Sparkles,
  FileCheck,
  Network,
  Stamp,
  Scroll,
  CalendarCheck,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";

function getPointIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("moot court")) return Scale;
  if (lower.includes("legal aid")) return HeartHandshake;
  if (lower.includes("internship") || lower.includes("chamber")) return Briefcase;
  if (lower.includes("library") || lower.includes("database")) return BookOpen;
  if (lower.includes("civil services") || lower.includes("guidance")) return Compass;
  if (lower.includes("ragging") || lower.includes("grievance")) return ShieldAlert;
  if (lower.includes("faculty")) return Users;
  if (lower.includes("quality") || lower.includes("iqac")) return Award;
  if (lower.includes("research") || lower.includes("fdp")) return Sparkles;
  if (lower.includes("disclosure")) return FileCheck;
  if (lower.includes("infrastructure") || lower.includes("technology")) return Building2;
  if (lower.includes("committee")) return Network;
  if (lower.includes("bar council") || lower.includes("bci")) return Stamp;
  if (lower.includes("affiliated") || lower.includes("university")) return Landmark;
  if (lower.includes("ugc") || lower.includes("norms") || lower.includes("code")) return Scroll;
  if (lower.includes("examination") || lower.includes("results")) return CalendarCheck;
  if (lower.includes("inspection") || lower.includes("compliance reports")) return ClipboardCheck;
  return ShieldCheck;
}

const TABS = [
  {
    id: "student" as const,
    label: "Students",
    icon: GraduationCap,
    badge: "Jurist Training",
  },
  {
    id: "college" as const,
    label: "College & Faculty",
    icon: Building2,
    badge: "Academic Governance",
  },
  {
    id: "university" as const,
    label: "University & Regulators",
    icon: Landmark,
    badge: "Statutory Standards",
  },
];

export function StakeholdersHub() {
  const [activeTab, setActiveTab] = useState<"student" | "college" | "university">("student");

  const currentStakeholder =
    STAKEHOLDERS_DATA.find((item) => item.id === activeTab) || STAKEHOLDERS_DATA[0];

  return (
    <section id="stakeholders" className="relative py-16 md:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-gold/20 overflow-hidden">
      {/* Subtle ambient luxury backdrop glows */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-10 md:space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30 shadow-xs">
            <Landmark className="w-3.5 h-3.5 text-gold" />
            <span>Inclusive Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy tracking-tight">
            Institutional Stakeholders
          </h2>

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <p className="text-sm md:text-base text-navy/70 leading-relaxed max-w-2xl mx-auto">
            Delivering dedicated resources, statutory governance, and academic opportunities for our students, faculty, and university partners.
          </p>
        </div>

        {/* 3-Tab Segmented Dock */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-gold/30 shadow-lg shadow-navy/5 gap-1.5 max-w-2xl w-full">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 sm:px-4 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-navy text-white shadow-md shadow-navy/20"
                      : "text-navy/70 hover:text-navy hover:bg-gold/10"
                  }`}
                >
                  <IconComp className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isActive ? "text-gold scale-110" : "text-gold"}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stakeholder View Showcase */}
        <div
          key={activeTab}
          className="relative bg-white border border-gold/30 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl shadow-navy/5 space-y-8 md:space-y-10 animate-in fade-in duration-300 overflow-hidden"
        >
          {/* Subtle top gold accent bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Top Intro & Description */}
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{currentStakeholder.badge}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy leading-tight">
              {currentStakeholder.subtitle}
            </h3>

            <p className="text-sm md:text-base text-navy/75 leading-relaxed pt-1">
              {currentStakeholder.description}
            </p>
          </div>

          {/* Direct Portals & Quick Actions Bar */}
          <div className="pt-5 border-t border-gold/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy/60">
              <Compass className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>Direct Portals:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {currentStakeholder.quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  to={action.href}
                  className={`group/btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    idx === 0
                      ? "bg-navy text-white hover:bg-gold hover:text-navy shadow-sm"
                      : "bg-white border border-gold/30 text-navy hover:bg-gold/15 hover:border-gold/60 shadow-xs"
                  }`}
                >
                  <span>{action.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* 6 Key Points High-Fi Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 pt-2">
            {currentStakeholder.points.map((pt, idx) => {
              const PointIcon = getPointIcon(pt.title);
              return (
                <div
                  key={idx}
                  className="group relative p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50/60 border border-gold/20 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                >
                  {/* Card Top: Distinctive Icon & Index */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-300 shadow-xs">
                        <PointIcon className="w-5 h-5 transition-colors group-hover:text-navy" strokeWidth={2.2} />
                      </div>
                      <span className="font-sans font-bold text-xs px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/25 text-navy/70 tracking-wider">
                        0{idx + 1}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-xl md:text-[22px] text-navy leading-snug group-hover:text-gold transition-colors tracking-tight">
                      {pt.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-navy/80 leading-relaxed mt-2.5">
                      {pt.desc}
                    </p>
                  </div>

                  {/* Card Bottom: Micro Verification Tag */}
                  <div className="mt-5 pt-3 border-t border-gold/10 flex items-center justify-between text-[11px] font-semibold text-navy/60">
                    <span className="uppercase tracking-wider">Verified Provision</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
