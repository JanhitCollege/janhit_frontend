import { useState, useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  ShieldCheck,
  FileText,
  Award,
  Users,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: "courses-offered", label: "Courses Offered", icon: BookOpen },
  { id: "academic-calendar", label: "Academic Calendar", icon: Calendar },
  { id: "academic-policies", label: "Academic Policies", icon: ShieldCheck },
  { id: "curriculum-syllabi", label: "Curriculum & Syllabi", icon: FileText },
  { id: "examination-system", label: "Examination System", icon: Award },
  { id: "faculty-directory", label: "Faculty Directory", icon: Users },
];

export function AcademicsHeader() {
  const [activeSection, setActiveSection] = useState<string>("courses-offered");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white border-b border-gold/20 pt-10 pb-4">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Page Title & Breadcrumb Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/35 shadow-sm">
            <GraduationCap className="w-4 h-4 text-gold" />
            <span>Academic Excellence & Jurisprudence</span>
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy tracking-tight">
            Academics at Janhit Law
          </h1>

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <p className="text-sm md:text-base text-navy/85 font-medium leading-relaxed font-sans">
            Cultivating analytical legal minds, constitutional values, and courtroom advocacy through
            comprehensive curriculum, distinguished mentorship, and statutory BCI standards.
          </p>
        </div>

        {/* Quick-Jump Section Navigator (Sticky-ready pills) */}
        <div className="pt-2">
          <div className="bg-slate-50 border-2 border-gold/30 rounded-2xl p-2 shadow-md flex items-center justify-center gap-1.5 flex-wrap">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-navy text-white shadow-md border border-gold/40"
                      : "text-navy/70 hover:text-navy hover:bg-white border border-transparent"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-gold" : "text-navy/50"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
