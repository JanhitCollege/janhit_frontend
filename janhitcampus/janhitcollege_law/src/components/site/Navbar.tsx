import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  PhoneCall,
  Mail,
  Award,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import logo from "@/assets/janhitlawcollege_logo.png";

interface NavChild {
  label: string;
  path: string;
  subChildren?: { label: string; path: string }[];
}

interface NavGroup {
  label: string;
  path: string;
  layout?: "grid" | "list";
  children?: NavChild[];
}

// Strictly 10 items in the exact sequence requested by the college administration:
// 1. Home
// 2. About Us
// 3. Academics
// 4. Student Corner
// 5. Public Disclosure
// 6. Events & Activities
// 7. Admissions
// 8. NAAC & IQAC
// 9. Career
// 10. Contact Us
const navGroups: NavGroup[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About Us",
    path: "/about",
    layout: "list",
    children: [
      { label: "About Janhit College of Law", path: "/about#about-institution" },
      { label: "Vision, Mission & Core Values", path: "/about#vision-mission" },
      { label: "Leadership Messages (Chairman & Principal)", path: "/about#leadership" },
      { label: "Management Body & Organogram", path: "/about#organogram" },
      { label: "Affiliations & Approvals (BCI & CCSU)", path: "/about#affiliations" },
      { label: "Campus Infrastructure & Facilities", path: "/infrastructure" },
    ],
  },
  {
    label: "Academics",
    path: "/academics",
    layout: "list",
    children: [
      { label: "Academic Overview", path: "/academics" },
      { label: "Courses Offered (LL.B., B.A. LL.B., LL.M.)", path: "/academics#courses" },
      { label: "Curriculum & Syllabi", path: "/academics#curriculum" },
      { label: "Academic Calendar", path: "/academic-calendar" },
      { label: "Faculty Directory", path: "/faculty" },
      { label: "Examination System & Ordinances", path: "/academics#examination" },
      { label: "Academic Policies & Regulations", path: "/academics#policies" },
    ],
  },
  {
    label: "Student Corner",
    path: "/students-corner",
    layout: "grid",
    children: [
      { label: "Affiliation - B.A.LL.B., LLB & LL.M.", path: "/students-corner?tab=affiliation" },
      { label: "College Prospectus Download", path: "/students-corner?tab=prospectus" },
      { label: "Courses & Programs", path: "/students-corner?tab=courses" },
      { label: "Syllabus (Semester-wise)", path: "/students-corner?tab=syllabus" },
      { label: "Code of Conduct & Ethics", path: "/students-corner?tab=code-of-conduct" },
      { label: "Faculty List & Specializations", path: "/students-corner?tab=faculty-list" },
      { label: "Alumni Association & Network", path: "/students-corner?tab=alumni" },
      { label: "RTI (Right to Information)", path: "/students-corner?tab=rti" },
      { label: "Academic Calendar", path: "/students-corner?tab=academic-calendar" },
      { label: "Management Committee", path: "/students-corner?tab=management" },
      { label: "Legal Aid Clinic (Members)", path: "/students-corner?tab=legal-aid" },
      { label: "Committees (9 Statutory Bodies)", path: "/students-corner?tab=committees" },
    ],
  },
  {
    label: "Public Disclosure",
    path: "/disclosures",
    layout: "list",
    children: [
      { label: "Mandatory Statutory Disclosures", path: "/disclosures" },
      { label: "Bar Council of India (BCI) Recognition", path: "/students-corner?tab=affiliation" },
      { label: "CCSU Affiliation Letter", path: "/students-corner?tab=affiliation" },
      { label: "Land & Building Particulars", path: "/infrastructure" },
      { label: "Fee Structure & Scholarships", path: "/admissions#fee-structure" },
    ],
  },
  {
    label: "News & Notices",
    path: "/news-notices",
    layout: "list",
    children: [
      { label: "All News & Notices", path: "/news-notices" },
      { label: "College News Bulletins", path: "/news-notices?type=news" },
      { label: "Official Circulars & Notices", path: "/news-notices?type=notice" },
    ],
  },
  {
    label: "Events & Activities",
    path: "/events",
    layout: "list",
    children: [
      { label: "Academic Events & Conferences", path: "/events#academic-events" },
      { label: "Legal Awareness Camps & Outreach", path: "/events#legal-awareness-camps" },
      { label: "Moot Court Society & Activities", path: "/events#moot-court-activities" },
      { label: "Seminars, Symposia & Workshops", path: "/events#seminars-workshops" },
      { label: "Extension & Community Activities", path: "/events#extension-activities" },
      { label: "Photo & Video Gallery", path: "/gallery" },
    ],
  },
  {
    label: "Admissions",
    path: "/admissions",
    layout: "list",
    children: [
      { label: "Admission Procedure 2026-27", path: "/admissions#procedure" },
      { label: "Eligibility Criteria", path: "/admissions#eligibility" },
      { label: "Fee Structure & Payment", path: "/admissions#fee-structure" },
      { label: "Prospectus Download", path: "/admissions#prospectus" },
      { label: "Online Registration & Apply", path: "/apply" },
      { label: "Important Dates & Schedule", path: "/admissions#important-dates" },
    ],
  },
  {
    label: "NAAC & IQAC",
    path: "/naac",
    layout: "list",
    children: [
      { label: "IQAC Composition & Reports", path: "/naac#iqac" },
      { label: "IIQA Submission", path: "/naac#iiqa" },
      {
        label: "SSR (Self Study Report)",
        path: "/naac#ssr",
        subChildren: [
          { label: "Criterion 1: Curricular Aspects", path: "/naac#criterion-1" },
          { label: "Criterion 2: Teaching-Learning & Evaluation", path: "/naac#criterion-2" },
          { label: "Criterion 3: Research, Innovations & Extension", path: "/naac#criterion-3" },
          { label: "Criterion 4: Infrastructure & Learning Resources", path: "/naac#criterion-4" },
          { label: "Criterion 5: Student Support & Progression", path: "/naac#criterion-5" },
          { label: "Criterion 6: Governance, Leadership & Management", path: "/naac#criterion-6" },
          { label: "Criterion 7: Institutional Values & Best Practices", path: "/naac#criterion-7" },
        ],
      },
      { label: "Student Satisfaction Survey (SSS)", path: "/naac#survey" },
      { label: "DVV Clarifications", path: "/naac#dvv" },
      { label: "Best Practices & Initiatives", path: "/naac#best-practices" },
      { label: "Institutional Distinctiveness", path: "/naac#distinctiveness" },
      {
        label: "Feedback System (Students, Alumni, Faculty)",
        path: "/naac#feedback",
      },
    ],
  },
  {
    label: "Career",
    path: "/career",
    layout: "list",
    children: [
      { label: "Current Openings (Faculty & Staff)", path: "/career#openings" },
      { label: "Apply Online for Jobs", path: "/career#apply" },
    ],
  },
  {
    label: "Contact Us",
    path: "/contact",
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState<Record<string, boolean>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger compact styling when scrolling down
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }, 180);
  };

  const toggleMobileSub = (label: string) => {
    setMobileSubExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleDropdownClick = (path: string) => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    const [, hash] = path.split("#");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash) || document.querySelector(`#${hash}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const handleMobileLinkClick = (path: string) => {
    setMobileOpen(false);
    const [, hash] = path.split("#");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash) || document.querySelector(`#${hash}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  };

  // Determine if a top-level group is active
  const isGroupActive = (group: NavGroup) => {
    if (group.path === "/" && location.pathname === "/") return true;
    if (group.path !== "/" && location.pathname.startsWith(group.path)) return true;
    if (group.children) {
      return group.children.some(
        (child) =>
          child.path === location.pathname ||
          location.pathname + location.search === child.path ||
          location.pathname + location.hash === child.path
      );
    }
    return false;
  };

  return (
    <>
      {/* 1. TOP INSTITUTIONAL BAR */}
      <div className="bg-[#071630] text-slate-200 text-[11px] border-b border-gold/25 py-1.5 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Official Accreditations */}
          <div className="flex items-center gap-3 font-medium truncate">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Award className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">Approved by Bar Council of India (BCI), New Delhi</span>
            </div>
            <span className="hidden md:inline text-gold/40">•</span>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Affiliated to CCS University, Meerut (Code: 890)</span>
            </div>
          </div>

          {/* Right: Direct Helplines & Admissions Badge */}
          <div className="flex items-center gap-4 text-xs shrink-0">
            <a
              href="tel:9313402015"
              className="flex items-center gap-1.5 text-slate-300 hover:text-gold transition-colors font-medium"
              title="Call Admissions Helpline"
            >
              <PhoneCall className="w-3 h-3 text-[#D4AF37]" />
              <span className="hidden sm:inline">+91 9313402015</span>
            </a>
            <span className="hidden sm:inline text-gold/40">•</span>
            <a
              href="mailto:info@janhitcollege.com"
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-gold transition-colors font-medium"
              title="Email College Administration"
            >
              <Mail className="w-3 h-3 text-[#D4AF37]" />
              <span>info@janhitcollege.com</span>
            </a>
            <span className="hidden lg:inline text-gold/40">•</span>
            <Link
              to="/admissions"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-[10.5px] font-bold tracking-wide hover:bg-gold hover:text-navy transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admissions Open 2026-27</span>
            </Link>
          </div>
        </div>
      </div>

      {/* FULL HEADER STICKY CONTAINER (College Name + Navigation All Sticky Together) */}
      <header className="sticky top-0 z-50 w-full bg-white/98 backdrop-blur-md shadow-md border-b border-gold/25 transition-all duration-300">
        {/* 2. MAIN BRAND & PRIMARY CTA ROW (College Name, Logo, Greater Noida, Apply Now) */}
        <div
          className={`w-full border-b border-gold/15 transition-all duration-300 ${
            scrolled ? "py-1.5 sm:py-2 bg-white/98" : "py-2.5 sm:py-3.5 bg-white"
          }`}
        >
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* College Crest & Title */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <img
                src={logo}
                alt="Janhit College of Law Crest"
                className={`object-contain transition-all duration-300 group-hover:scale-105 ${
                  scrolled ? "h-9 w-9 sm:h-11 sm:w-11" : "h-11 w-11 sm:h-14 sm:w-14"
                }`}
              />
              <div className="leading-tight">
                <span
                  className={`font-serif font-bold text-navy tracking-tight group-hover:text-gold transition-all duration-300 block ${
                    scrolled ? "text-base sm:text-xl" : "text-lg sm:text-2xl"
                  }`}
                >
                  Janhit College of Law
                </span>
                <span className="text-[9px] sm:text-xs uppercase tracking-[0.22em] text-gold font-bold block">
                  Greater Noida
                </span>
              </div>
            </Link>

            {/* Right Action: Helpline + Prominent APPLY NOW Button */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Helpline badge for desktop */}
              <div className="hidden md:flex flex-col text-right pr-2 border-r border-gold/20 leading-tight">
                <span className="text-[10px] uppercase font-bold text-navy/60 tracking-wider">
                  Admissions Helpdesk
                </span>
                <span className="text-xs font-bold text-navy font-mono">
                  +91 9313402015
                </span>
              </div>

              {/* Permanent Apply Now Button */}
              <Link
                to="/apply"
                className={`inline-flex items-center gap-1.5 rounded-full gradient-gold text-navy-deep font-bold uppercase tracking-wider shadow-gold hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all duration-300 border border-gold/40 shrink-0 cursor-pointer ${
                  scrolled
                    ? "px-3.5 sm:px-4 py-1.5 text-xs"
                    : "px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm"
                }`}
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile / Tablet Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 rounded-lg text-navy hover:text-gold hover:bg-gold/10 transition-colors focus:outline-none shrink-0"
                aria-label="Toggle Navigation Menu"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. DEDICATED NAVIGATION RIBBON */}
        <nav
          className={`w-full transition-all duration-300 ${
            scrolled ? "py-1.5" : "py-2"
          }`}
        >
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            {/* Desktop 10-Item Nav Ribbon (Centered) */}
            <div className="hidden xl:flex items-center justify-center gap-1 2xl:gap-2">
              {navGroups.map((group, groupIdx) => {
                const active = isGroupActive(group);
                const hasDropdown = Boolean(group.children && group.children.length > 0);
                const isDropdownOpen = activeDropdown === group.label;
                // Align dropdown to right for items on the right side of the screen
                const isRightAligned = groupIdx >= 5;

                return (
                  <div
                    key={group.label}
                    className="relative py-1"
                    onMouseEnter={() => handleMouseEnter(group.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={group.path}
                      className={`flex items-center gap-0.5 text-[12px] 2xl:text-[13px] font-semibold py-1.5 px-2.5 2xl:px-3 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap relative ${
                        active
                          ? "text-gold font-bold bg-gold/10"
                          : "text-navy/90 hover:text-gold hover:bg-gold/5"
                      }`}
                    >
                      <span>{group.label}</span>
                      {hasDropdown && (
                        <ChevronDown
                          className={`h-3 w-3 ml-0.5 text-gold/70 transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180 text-gold" : ""
                          }`}
                        />
                      )}
                      {/* Active Accent underline */}
                      {active && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold rounded-full"
                        />
                      )}
                    </Link>

                    {/* Dropdown Popover */}
                    <AnimatePresence>
                      {hasDropdown && isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className={`absolute ${
                            isRightAligned ? "right-0" : "left-0"
                          } top-full pt-1 z-50`}
                        >
                          <div
                            className={`bg-white/98 backdrop-blur-xl border border-gold/30 rounded-2xl shadow-2xl p-3 ${
                              group.layout === "grid"
                                ? "w-[540px] grid grid-cols-2 gap-x-2 gap-y-1"
                                : "min-w-[270px] max-w-[320px] space-y-0.5"
                            }`}
                          >
                            {/* Dropdown Category Header */}
                            <div
                              className={`px-3 py-1.5 mb-1 text-[10px] uppercase font-bold tracking-wider text-gold/90 border-b border-gold/15 flex items-center justify-between ${
                                group.layout === "grid" ? "col-span-2" : ""
                              }`}
                            >
                              <span>{group.label} Section</span>
                              <span className="text-[9px] text-navy/40 font-normal lowercase tracking-normal">
                                click to jump
                              </span>
                            </div>

                            {group.children!.map((child) => {
                              const isChildActive =
                                location.pathname + location.search === child.path ||
                                location.pathname + location.hash === child.path ||
                                (location.pathname === child.path &&
                                  !location.search &&
                                  !location.hash);

                              return (
                                <div
                                  key={child.label}
                                  className="relative"
                                  onMouseEnter={() => {
                                    if (child.subChildren) {
                                      setActiveSubDropdown(child.label);
                                    } else {
                                      setActiveSubDropdown(null);
                                    }
                                  }}
                                >
                                  <Link
                                    to={child.path}
                                    onClick={() => handleDropdownClick(child.path)}
                                    className={`flex items-center justify-between px-3 py-2 text-[12px] rounded-xl transition-all font-medium ${
                                      isChildActive
                                        ? "bg-gold/15 text-navy font-bold"
                                        : "text-navy/80 hover:bg-gold/10 hover:text-navy"
                                    }`}
                                  >
                                    <span className="leading-snug">{child.label}</span>
                                    {child.subChildren && (
                                      <ChevronRight className="h-3.5 w-3.5 ml-2 text-gold shrink-0 opacity-70" />
                                    )}
                                  </Link>

                                  {/* Nested Sub-Menu Flyout (Criteria 1-7 opens leftward to avoid overflow) */}
                                  <AnimatePresence>
                                    {child.subChildren &&
                                      activeSubDropdown === child.label && (
                                        <motion.div
                                          initial={{ opacity: 0, x: -8 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: -8 }}
                                          transition={{ duration: 0.15 }}
                                          className="absolute right-full top-0 mr-1.5 min-w-[290px] bg-white border border-gold/30 rounded-2xl shadow-2xl p-2.5 z-50 space-y-0.5"
                                        >
                                          <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-gold border-b border-gold/15 mb-1.5 flex items-center justify-between">
                                            <span>SSR Criteria (1 to 7)</span>
                                            <span className="text-[9px] text-navy/50 font-normal">
                                              Select criterion
                                            </span>
                                          </div>
                                          {child.subChildren.map((subChild) => (
                                            <Link
                                              key={subChild.path}
                                              to={subChild.path}
                                              onClick={() => handleDropdownClick(subChild.path)}
                                              className={`block px-3 py-1.5 text-xs rounded-lg transition-all font-medium ${
                                                location.pathname + location.hash === subChild.path
                                                  ? "bg-gold/15 text-navy font-bold"
                                                  : "text-navy/80 hover:bg-gold/10 hover:text-navy"
                                              }`}
                                            >
                                              {subChild.label}
                                            </Link>
                                          ))}
                                        </motion.div>
                                      )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile menu indicator bar for small screens */}
          <div className="xl:hidden px-4 py-1 flex items-center justify-between text-xs text-navy/70">
            <span className="font-semibold text-navy">Quick Menu</span>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gold font-bold flex items-center gap-1 hover:underline"
            >
              <span>{mobileOpen ? "Close Menu" : "Explore All Sections"}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </nav>

        {/* 4. MOBILE NAVIGATION DRAWER */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden bg-white border-b-2 border-gold/30 overflow-hidden shadow-2xl relative z-50 w-full"
            >
              <div className="px-5 py-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
                {/* Mobile Quick Contact Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-gold/15 text-xs">
                  <a
                    href="tel:9313402015"
                    className="flex items-center gap-1.5 text-navy font-semibold hover:text-gold"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-gold" />
                    <span>Call Helpline</span>
                  </a>
                  <a
                    href="mailto:info@janhitcollege.com"
                    className="flex items-center gap-1.5 text-navy font-semibold hover:text-gold"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold" />
                    <span>Email Support</span>
                  </a>
                </div>

                {/* The 10 Nav items in exact sequence */}
                <div className="space-y-1">
                  {navGroups.map((group, idx) => {
                    const isExpanded = mobileSubExpanded[group.label];
                    const active = isGroupActive(group);

                    if (group.children && group.children.length > 0) {
                      return (
                        <div
                          key={group.label}
                          className="border-b border-slate-100 last:border-b-0 py-1"
                        >
                          <div className="flex items-center justify-between">
                            <Link
                              to={group.path}
                              onClick={() => setMobileOpen(false)}
                              className={`flex items-center gap-2 py-2 text-sm font-semibold transition-colors ${
                                active ? "text-gold font-bold" : "text-navy hover:text-gold"
                              }`}
                            >
                              <span className="text-[11px] text-gold/70 font-mono font-bold w-4">
                                {idx + 1}.
                              </span>
                              <span>{group.label}</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => toggleMobileSub(group.label)}
                              className="p-2 text-gold/80 hover:text-gold cursor-pointer"
                              aria-label={`Expand ${group.label} submenu`}
                            >
                              <ChevronDown
                                className={`h-4 w-4 transform transition-transform duration-200 ${
                                  isExpanded ? "rotate-180 text-gold" : ""
                                }`}
                              />
                            </button>
                          </div>

                          {/* Expanded mobile children */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4 pr-1 py-1.5 space-y-1 bg-gold/5 rounded-xl my-1 border-l-2 border-gold/40"
                              >
                                {group.children.map((child) => (
                                  <div key={child.label} className="py-0.5">
                                    <div className="flex items-center justify-between">
                                      <Link
                                        to={child.path}
                                        onClick={() => handleMobileLinkClick(child.path)}
                                        className="text-xs text-navy/85 hover:text-gold py-1 block font-medium"
                                      >
                                        {child.label}
                                      </Link>
                                      {child.subChildren && (
                                        <button
                                          type="button"
                                          onClick={() => toggleMobileSub(child.label)}
                                          className="p-1 text-gold hover:text-navy"
                                        >
                                          <ChevronDown
                                            className={`h-3.5 w-3.5 transform transition-transform duration-200 ${
                                              mobileSubExpanded[child.label] ? "rotate-180" : ""
                                            }`}
                                          />
                                        </button>
                                      )}
                                    </div>

                                    {/* Sub-children (e.g. Criteria 1-7) */}
                                    {child.subChildren && mobileSubExpanded[child.label] && (
                                      <div className="pl-3 py-1 space-y-1 border-l-2 border-gold/30 ml-2 bg-white/70 rounded-r-lg p-2 text-[11px]">
                                        {child.subChildren.map((subChild) => (
                                          <Link
                                            key={subChild.path}
                                            to={subChild.path}
                                            onClick={() => handleMobileLinkClick(subChild.path)}
                                            className="block py-0.5 text-navy/70 hover:text-gold"
                                          >
                                            {subChild.label}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={group.label}
                        className="border-b border-slate-100 last:border-b-0 py-1"
                      >
                        <Link
                          to={group.path}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-2 py-2 text-sm font-semibold transition-colors ${
                            active ? "text-gold font-bold" : "text-navy hover:text-gold"
                          }`}
                        >
                          <span className="text-[11px] text-gold/70 font-mono font-bold w-4">
                            {idx + 1}.
                          </span>
                          <span>{group.label}</span>
                        </Link>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile CTA */}
                <div className="pt-3 border-t border-gold/15 flex flex-col gap-2.5">
                  <Link
                    to="/apply"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-2.5 rounded-full gradient-gold text-navy-deep font-bold text-xs uppercase tracking-wider shadow-gold"
                  >
                    Apply Online for Admissions 2026-27
                  </Link>
                  <p className="text-center text-[10.5px] text-navy/75 font-medium">
                    Knowledge Park - 1, Greater Noida, Gautam Buddha Nagar (U.P.)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export default Navbar;
