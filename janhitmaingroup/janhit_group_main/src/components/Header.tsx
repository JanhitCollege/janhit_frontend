import { Link } from "@tanstack/react-router";
import {
  Menu,
  X,
  GraduationCap,
  Sun,
  Moon,
  Search,
  ChevronDown,
  Landmark,
  Target,
  Users,
  Award,
  Building2,
  Image as ImageIcon,
  Video,
  FileText,
  Bell,
  Scale,
  Compass,
  Briefcase,
  ShieldCheck,
  Clipboard,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { institutions } from "@/data/institutions";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/institutions", label: "Institutions" },
  { to: "/admissions", label: "Admissions" },
  { to: "/gallery", label: "Gallery" },
  { to: "/disclosures", label: "Disclosures" },
  { to: "/contact", label: "Contact" },
] as const;

function AboutDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to="/about"
        activeProps={{ className: "text-primary bg-accent" }}
        className="px-3.5 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent transition inline-flex items-center gap-1"
      >
        About{" "}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-80 p-3 rounded-2xl bg-card border border-border shadow-elegant z-50"
          >
            <div className="flex flex-col gap-1">
              {[
                {
                  label: "History & Legacy",
                  hash: "history",
                  desc: "Our 20-year journey of educational service.",
                  icon: Landmark,
                },
                {
                  label: "Vision & Mission",
                  hash: "vision",
                  desc: "The values and goals guiding our daily work.",
                  icon: Target,
                },
                {
                  label: "Management",
                  hash: "management",
                  desc: "Meet the leadership team behind Janhit.",
                  icon: Users,
                },
                {
                  label: "Affiliations & Approvals",
                  hash: "affiliations",
                  desc: "Recognized by AICTE, NCTE, BCI, and CBSE.",
                  icon: Award,
                },
                {
                  label: "Infrastructure",
                  hash: "infrastructure",
                  desc: "Explore our modern learning campuses.",
                  icon: Building2,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.hash}
                    to="/about"
                    hash={item.hash}
                    onClick={() => {
                      setIsOpen(false);
                      if (window.location.pathname === "/about") {
                        handleScrollTo(item.hash);
                      }
                    }}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent text-left transition"
                  >
                    <div className="size-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors leading-none">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1 leading-tight">
                        {item.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InstitutionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const colleges = institutions.filter((i) => i.type === "College");
  const schools = institutions.filter((i) => i.type === "School");

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to="/institutions"
        activeProps={{ className: "text-primary bg-accent" }}
        className="px-3.5 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent transition inline-flex items-center gap-1"
      >
        Institutions{" "}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-[560px] p-5 rounded-2xl bg-card border border-border shadow-elegant z-50 grid grid-cols-2 gap-6"
          >
            {/* Colleges Column */}
            <div>
              <div className="text-xs uppercase tracking-wider text-gold font-bold mb-3 border-b border-border/60 pb-1.5 flex items-center gap-1.5">
                <Landmark className="size-3.5" /> Colleges & Higher Ed
              </div>
              <div className="flex flex-col gap-1">
                {colleges.map((inst) => (
                  <Link
                    key={inst.slug}
                    to="/institutions/$slug"
                    params={{ slug: inst.slug }}
                    onClick={() => setIsOpen(false)}
                    className="group flex flex-col p-2.5 rounded-xl hover:bg-accent text-left transition"
                  >
                    <div className="text-xs font-semibold text-foreground group-hover:text-gold transition-colors leading-tight">
                      {inst.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">{inst.location}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Schools Column */}
            <div>
              <div className="text-xs uppercase tracking-wider text-primary font-bold mb-3 border-b border-border/60 pb-1.5 flex items-center gap-1.5">
                <Building2 className="size-3.5" /> K-12 Schools
              </div>
              <div className="flex flex-col gap-1">
                {schools.map((inst) => (
                  <Link
                    key={inst.slug}
                    to="/institutions/$slug"
                    params={{ slug: inst.slug }}
                    onClick={() => setIsOpen(false)}
                    className="group flex flex-col p-2.5 rounded-xl hover:bg-accent text-left transition"
                  >
                    <div className="text-xs font-semibold text-foreground group-hover:text-gold transition-colors leading-tight">
                      {inst.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">{inst.location}</div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AdmissionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to="/admissions"
        activeProps={{ className: "text-primary bg-accent" }}
        className="px-3.5 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent transition inline-flex items-center gap-1"
      >
        Admissions{" "}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-80 p-3 rounded-2xl bg-card border border-border shadow-elegant z-50"
          >
            <div className="flex flex-col gap-1">
              {[
                {
                  label: "Admission Process",
                  hash: "process",
                  desc: "Step-by-step registration path.",
                  icon: FileText,
                },
                {
                  label: "Eligibility",
                  hash: "eligibility",
                  desc: "Academic and age requirements.",
                  icon: Target,
                },
                {
                  label: "Fee Structure",
                  hash: "fees",
                  desc: "Course-wise yearly tuition details.",
                  icon: Award,
                },
                {
                  label: "Prospectus",
                  hash: "prospectus",
                  desc: "Download college & school brochures.",
                  icon: Landmark,
                },
                {
                  label: "Apply Online",
                  hash: "apply",
                  desc: "Fill the admission inquiry form.",
                  icon: Users,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.hash}
                    to="/admissions"
                    hash={item.hash}
                    onClick={() => {
                      setIsOpen(false);
                      if (window.location.pathname === "/admissions") {
                        handleScrollTo(item.hash);
                      }
                    }}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent text-left transition"
                  >
                    <div className="size-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors leading-none">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1 leading-tight">
                        {item.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to="/gallery"
        activeProps={{ className: "text-primary bg-accent" }}
        className="px-3.5 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent transition inline-flex items-center gap-1"
      >
        Gallery{" "}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-80 p-3 rounded-2xl bg-card border border-border shadow-elegant z-50"
          >
            <div className="flex flex-col gap-1">
              {[
                {
                  label: "Photo Gallery",
                  hash: "photos",
                  desc: "Campus highlights & student life.",
                  icon: ImageIcon,
                },
                {
                  label: "Video Gallery",
                  hash: "videos",
                  desc: "Virtual tours & fest highlights.",
                  icon: Video,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.hash}
                    to="/gallery"
                    hash={item.hash}
                    onClick={() => {
                      setIsOpen(false);
                      if (window.location.pathname === "/gallery") {
                        handleScrollTo(item.hash);
                      }
                    }}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent text-left transition"
                  >
                    <div className="size-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors leading-none">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1 leading-tight">
                        {item.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DisclosuresDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to="/disclosures"
        activeProps={{ className: "text-primary bg-accent" }}
        className="px-3.5 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent transition inline-flex items-center gap-1"
      >
        Disclosures{" "}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-[760px] p-6 rounded-2xl bg-card border border-border shadow-elegant z-50 grid grid-cols-3 gap-6"
          >
            {/* Column 1: Careers & Public Info */}
            <div>
              <div className="text-xs uppercase tracking-wider text-gold font-bold mb-3 border-b border-border/60 pb-1.5 flex items-center gap-1.5 font-display">
                <Briefcase className="size-3.5" /> Careers & Public
              </div>
              <div className="flex flex-col gap-1">
                {[
                  {
                    label: "Current Openings",
                    to: "/career",
                    hash: "openings",
                    desc: "Faculty & admin jobs.",
                  },
                  {
                    label: "Apply Online",
                    to: "/career",
                    hash: "apply",
                    desc: "Online job registration.",
                  },
                  {
                    label: "Public Disclosures",
                    to: "/disclosures",
                    hash: "disclosures",
                    desc: "Affiliations, RTI & syllabus.",
                  },
                  {
                    label: "College Committees",
                    to: "/disclosures",
                    hash: "committees",
                    desc: "Anti-ragging, POSH & GRC.",
                  },
                ].map((item) => (
                  <Link
                    key={item.hash}
                    to={item.to}
                    hash={item.hash}
                    onClick={() => {
                      setIsOpen(false);
                      if (window.location.pathname === item.to) {
                        handleScrollTo(item.hash);
                      }
                    }}
                    className="group flex flex-col p-2 rounded-xl hover:bg-accent text-left transition"
                  >
                    <span className="text-xs font-semibold text-foreground group-hover:text-gold transition-colors leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 leading-none">
                      {item.desc}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: News & Events */}
            <div>
              <div className="text-xs uppercase tracking-wider text-primary font-bold mb-3 border-b border-border/60 pb-1.5 flex items-center gap-1.5 font-display">
                <Bell className="size-3.5" /> News & Activities
              </div>
              <div className="flex flex-col gap-1">
                {[
                  {
                    label: "News & Notices",
                    to: "/news",
                    hash: "announcements",
                    desc: "Exam sheets & holiday alerts.",
                  },
                  {
                    label: "Academic Events",
                    to: "/news",
                    hash: "academic-events",
                    desc: "Orientations & guest lectures.",
                  },
                  {
                    label: "Legal Awareness Camps",
                    to: "/news",
                    hash: "legal-awareness",
                    desc: "Social legal cell activities.",
                  },
                  {
                    label: "Moot Court Trials",
                    to: "/news",
                    hash: "moot-court",
                    desc: "Practice rounds & selections.",
                  },
                  {
                    label: "Seminars & Workshops",
                    to: "/news",
                    hash: "seminars",
                    desc: "IPR & tech workshops.",
                  },
                  {
                    label: "Extension Activities",
                    to: "/news",
                    hash: "extension",
                    desc: "NSS & blood donation drives.",
                  },
                ].map((item) => (
                  <Link
                    key={item.hash}
                    to={item.to}
                    hash={item.hash}
                    onClick={() => {
                      setIsOpen(false);
                      if (window.location.pathname === item.to) {
                        handleScrollTo(item.hash);
                      }
                    }}
                    className="group flex flex-col p-2 rounded-xl hover:bg-accent text-left transition"
                  >
                    <span className="text-xs font-semibold text-foreground group-hover:text-gold transition-colors leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 leading-none">
                      {item.desc}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Quality & NAAC */}
            <div>
              <div className="text-xs uppercase tracking-wider text-gold font-bold mb-3 border-b border-border/60 pb-1.5 flex items-center gap-1.5 font-display">
                <ShieldCheck className="size-3.5" /> Quality & NAAC
              </div>
              <div className="flex flex-col gap-1">
                {[
                  {
                    label: "IQAC Reports",
                    to: "/naac",
                    hash: "iqac",
                    desc: "Cell members & AQAR.",
                  },
                  {
                    label: "IIQA Status",
                    to: "/naac",
                    hash: "iiqa",
                    desc: "IIQA submission tracking.",
                  },
                  {
                    label: "SSR Criteria (1-7)",
                    to: "/naac",
                    hash: "ssr",
                    desc: "Self Study Report download.",
                  },
                  {
                    label: "Satisfaction Survey",
                    to: "/naac",
                    hash: "survey",
                    desc: "Student survey ratings.",
                  },
                  {
                    label: "DVV Clarifications",
                    to: "/naac",
                    hash: "dvv",
                    desc: "Metric levels clarified.",
                  },
                  {
                    label: "Best Practices",
                    to: "/naac",
                    hash: "practices",
                    desc: "Outreach & distinctiveness.",
                  },
                  {
                    label: "Feedback System",
                    to: "/naac",
                    hash: "feedback",
                    desc: "Stakeholder feedback forms.",
                  },
                  {
                    label: "Placements & Honors",
                    to: "/achievements",
                    hash: "placements",
                    desc: "Recruiters & placements.",
                  },
                ].map((item) => (
                  <Link
                    key={item.hash}
                    to={item.to}
                    hash={item.hash}
                    onClick={() => {
                      setIsOpen(false);
                      if (window.location.pathname === item.to) {
                        handleScrollTo(item.hash);
                      }
                    }}
                    className="group flex flex-col p-2 rounded-xl hover:bg-accent text-left transition"
                  >
                    <span className="text-xs font-semibold text-foreground group-hover:text-gold transition-colors leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 leading-none">
                      {item.desc}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm py-2" : "py-4"
      }`}
    >
      <div className="container-tight flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="size-10 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
            <GraduationCap className="size-5 text-gold-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold text-foreground">Janhit</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Group of Institutions
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            if (n.label === "About") {
              return <AboutDropdown key={n.to} />;
            }
            if (n.label === "Institutions") {
              return <InstitutionsDropdown key={n.to} />;
            }
            if (n.label === "Admissions") {
              return <AdmissionsDropdown key={n.to} />;
            }
            if (n.label === "Gallery") {
              return <GalleryDropdown key={n.to} />;
            }
            if (n.label === "Disclosures") {
              return <DisclosuresDropdown key={n.to} />;
            }
            return (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-primary bg-accent" }}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent transition"
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="hidden md:grid place-items-center size-9 rounded-lg hover:bg-accent transition"
          >
            <Search className="size-4" />
          </button>
          <button
            aria-label="Toggle theme"
            onClick={() => setDark((v) => !v)}
            className="grid place-items-center size-9 rounded-lg hover:bg-accent transition"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <Link
            to="/admissions"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-gradient-gold text-gold-foreground text-sm font-semibold shadow-gold hover:scale-[1.03] transition"
          >
            Apply Now
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid place-items-center size-9 rounded-lg hover:bg-accent"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden container-tight mt-2">
          <div className="bg-background border shadow-xl rounded-2xl p-3 flex flex-col gap-1 max-h-[75vh] overflow-y-auto">
            {nav.map((n) => {
              if (n.label === "About") {
                return (
                  <div key={n.to} className="flex flex-col">
                    <button
                      onClick={() =>
                        setActiveMobileSection(activeMobileSection === "About" ? null : "About")
                      }
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold hover:bg-accent text-primary flex items-center justify-between transition-colors"
                    >
                      <span>{n.label}</span>
                      <ChevronDown
                        className={`size-4 transition-transform duration-200 ${activeMobileSection === "About" ? "rotate-180" : ""}`}
                      />
                    </button>
                    {activeMobileSection === "About" && (
                      <div className="pl-4 flex flex-col border-l border-border/80 ml-3 mt-1 mb-2 gap-0.5">
                        {[
                          { label: "History & Legacy", hash: "history" },
                          { label: "Vision & Mission", hash: "vision" },
                          { label: "Management", hash: "management" },
                          { label: "Affiliations & Approvals", hash: "affiliations" },
                          { label: "Infrastructure", hash: "infrastructure" },
                        ].map((sub) => (
                          <Link
                            key={sub.hash}
                            to="/about"
                            hash={sub.hash}
                            onClick={() => {
                              setOpen(false);
                              if (window.location.pathname === "/about") {
                                setTimeout(() => {
                                  const element = document.getElementById(sub.hash);
                                  if (element) element.scrollIntoView({ behavior: "smooth" });
                                }, 100);
                              }
                            }}
                            className="px-3 py-2 rounded-lg text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-accent"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (n.label === "Institutions") {
                return (
                  <div key={n.to} className="flex flex-col">
                    <button
                      onClick={() =>
                        setActiveMobileSection(
                          activeMobileSection === "Institutions" ? null : "Institutions",
                        )
                      }
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold hover:bg-accent text-primary flex items-center justify-between transition-colors"
                    >
                      <span>{n.label}</span>
                      <ChevronDown
                        className={`size-4 transition-transform duration-200 ${activeMobileSection === "Institutions" ? "rotate-180" : ""}`}
                      />
                    </button>
                    {activeMobileSection === "Institutions" && (
                      <div className="pl-4 flex flex-col border-l border-border/80 ml-3 mt-1 mb-2 gap-0.5">
                        {institutions.map((inst) => (
                          <Link
                            key={inst.slug}
                            to="/institutions/$slug"
                            params={{ slug: inst.slug }}
                            onClick={() => setOpen(false)}
                            className="px-3 py-2 rounded-lg text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-accent"
                          >
                            {inst.name} ({inst.city})
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (n.label === "Admissions") {
                return (
                  <div key={n.to} className="flex flex-col">
                    <button
                      onClick={() =>
                        setActiveMobileSection(
                          activeMobileSection === "Admissions" ? null : "Admissions",
                        )
                      }
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold hover:bg-accent text-primary flex items-center justify-between transition-colors"
                    >
                      <span>{n.label}</span>
                      <ChevronDown
                        className={`size-4 transition-transform duration-200 ${activeMobileSection === "Admissions" ? "rotate-180" : ""}`}
                      />
                    </button>
                    {activeMobileSection === "Admissions" && (
                      <div className="pl-4 flex flex-col border-l border-border/80 ml-3 mt-1 mb-2 gap-0.5">
                        {[
                          { label: "Admission Process", hash: "process" },
                          { label: "Eligibility", hash: "eligibility" },
                          { label: "Fee Structure", hash: "fees" },
                          { label: "Prospectus", hash: "prospectus" },
                          { label: "Apply Online", hash: "apply" },
                        ].map((sub) => (
                          <Link
                            key={sub.hash}
                            to="/admissions"
                            hash={sub.hash}
                            onClick={() => {
                              setOpen(false);
                              if (window.location.pathname === "/admissions") {
                                setTimeout(() => {
                                  const element = document.getElementById(sub.hash);
                                  if (element) element.scrollIntoView({ behavior: "smooth" });
                                }, 100);
                              }
                            }}
                            className="px-3 py-2 rounded-lg text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-accent"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (n.label === "Gallery") {
                return (
                  <div key={n.to} className="flex flex-col">
                    <button
                      onClick={() =>
                        setActiveMobileSection(activeMobileSection === "Gallery" ? null : "Gallery")
                      }
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold hover:bg-accent text-primary flex items-center justify-between transition-colors"
                    >
                      <span>{n.label}</span>
                      <ChevronDown
                        className={`size-4 transition-transform duration-200 ${activeMobileSection === "Gallery" ? "rotate-180" : ""}`}
                      />
                    </button>
                    {activeMobileSection === "Gallery" && (
                      <div className="pl-4 flex flex-col border-l border-border/80 ml-3 mt-1 mb-2 gap-0.5">
                        {[
                          { label: "Photo Gallery", hash: "photos" },
                          { label: "Video Gallery", hash: "videos" },
                        ].map((sub) => (
                          <Link
                            key={sub.hash}
                            to="/gallery"
                            hash={sub.hash}
                            onClick={() => {
                              setOpen(false);
                              if (window.location.pathname === "/gallery") {
                                setTimeout(() => {
                                  const element = document.getElementById(sub.hash);
                                  if (element) element.scrollIntoView({ behavior: "smooth" });
                                }, 100);
                              }
                            }}
                            className="px-3 py-2 rounded-lg text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-accent"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (n.label === "Disclosures") {
                return (
                  <div key={n.to} className="flex flex-col">
                    <button
                      onClick={() =>
                        setActiveMobileSection(
                          activeMobileSection === "Disclosures" ? null : "Disclosures",
                        )
                      }
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold hover:bg-accent text-primary flex items-center justify-between transition-colors"
                    >
                      <span>{n.label}</span>
                      <ChevronDown
                        className={`size-4 transition-transform duration-200 ${activeMobileSection === "Disclosures" ? "rotate-180" : ""}`}
                      />
                    </button>
                    {activeMobileSection === "Disclosures" && (
                      <div className="pl-4 flex flex-col border-l border-border/80 ml-3 mt-1 mb-2 gap-0.5">
                        <div className="text-[10px] uppercase tracking-widest text-gold font-bold mt-2 mb-1 pl-3 font-display">
                          Careers & Public
                        </div>
                        {[
                          { label: "Current Openings", to: "/career", hash: "openings" },
                          { label: "Apply Online", to: "/career", hash: "apply" },
                          { label: "Public Disclosures", to: "/disclosures", hash: "disclosures" },
                          { label: "College Committees", to: "/disclosures", hash: "committees" },
                        ].map((sub) => (
                          <Link
                            key={sub.hash}
                            to={sub.to}
                            hash={sub.hash}
                            onClick={() => setOpen(false)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-accent"
                          >
                            {sub.label}
                          </Link>
                        ))}

                        <div className="text-[10px] uppercase tracking-widest text-primary font-bold mt-2 mb-1 pl-3 font-display">
                          News & Activities
                        </div>
                        {[
                          { label: "News & Notices", to: "/news", hash: "announcements" },
                          { label: "Academic Events", to: "/news", hash: "academic-events" },
                          { label: "Legal Awareness Camps", to: "/news", hash: "legal-awareness" },
                          { label: "Moot Court Trials", to: "/news", hash: "moot-court" },
                          { label: "Seminars & Workshops", to: "/news", hash: "seminars" },
                          { label: "Extension Activities", to: "/news", hash: "extension" },
                        ].map((sub) => (
                          <Link
                            key={sub.hash}
                            to={sub.to}
                            hash={sub.hash}
                            onClick={() => setOpen(false)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-accent"
                          >
                            {sub.label}
                          </Link>
                        ))}

                        <div className="text-[10px] uppercase tracking-widest text-gold font-bold mt-2 mb-1 pl-3 font-display">
                          NAAC & Quality
                        </div>
                        {[
                          { label: "IQAC Reports", to: "/naac", hash: "iqac" },
                          { label: "IIQA Status", to: "/naac", hash: "iiqa" },
                          { label: "SSR Criteria (1-7)", to: "/naac", hash: "ssr" },
                          { label: "Satisfaction Survey", to: "/naac", hash: "survey" },
                          { label: "DVV Clarifications", to: "/naac", hash: "dvv" },
                          { label: "Best Practices", to: "/naac", hash: "practices" },
                          { label: "Feedback System", to: "/naac", hash: "feedback" },
                          { label: "Placements & Honors", to: "/achievements", hash: "placements" },
                        ].map((sub) => (
                          <Link
                            key={sub.hash}
                            to={sub.to}
                            hash={sub.hash}
                            onClick={() => setOpen(false)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-accent"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent"
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
