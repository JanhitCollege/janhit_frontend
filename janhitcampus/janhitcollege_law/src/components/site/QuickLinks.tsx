import { Link } from "react-router-dom";
import { QUICK_LINKS } from "@/data/homeData";
import {
  GraduationCap,
  Scale,
  FileText,
  DollarSign,
  Calendar,
  Download,
  ShieldCheck,
  Phone,
  ArrowRight,
  Compass,
  Briefcase,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  GraduationCap,
  Scale,
  FileText,
  DollarSign,
  Calendar,
  Download,
  ShieldCheck,
  Phone,
  Briefcase,
};

export function QuickLinks() {
  return (
    <section id="quick-links" className="py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span>Direct Navigation</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Quick Links & Key Portals
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/70 leading-relaxed">
            Fast access to admissions, examination ordinances, statutory disclosures, syllabus downloads, and student welfare services.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_LINKS.map((link, idx) => {
            const IconComponent = ICON_MAP[link.iconName] || Scale;
            return (
              <Link
                key={idx}
                to={link.href}
                className="bg-white rounded-2xl border border-gold/25 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-gold"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-navy/5 text-gold flex items-center justify-center group-hover:bg-navy group-hover:text-gold transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {link.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-navy text-[10px] font-bold uppercase tracking-wider border border-gold/40">
                        {link.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-navy group-hover:text-gold transition-colors leading-snug">
                    {link.title}
                  </h3>

                  <p className="text-xs text-navy/70 leading-relaxed">
                    {link.desc}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-gold/15 flex items-center justify-between text-xs font-bold text-navy group-hover:text-gold transition-colors">
                  <span>Access Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
