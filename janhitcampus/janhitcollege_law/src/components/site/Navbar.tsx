import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/janhitlawcollege_logo.png";

const navGroups = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  {
    label: "Academics",
    children: [
      { label: "Admissions", href: "#admissions" },
      { label: "Academic Calendar", href: "#calendar" },
      { label: "Downloads", href: "#downloads" },
    ],
  },
  {
    label: "Campus Life",
    children: [
      { label: "Infrastructure", href: "#infrastructure" },
      { label: "Gallery", href: "#gallery" },
      { label: "Events & Activities", href: "#events" },
    ],
  },
  {
    label: "People & Org",
    children: [
      { label: "Faculty & Staff", href: "#faculty" },
      { label: "Placement Cell", href: "#placement" },
      { label: "Committees", href: "#committees" },
      { label: "Public Disclosure", href: "#disclosures" },
    ],
  },
  { label: "Contact Us", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${
          scrolled
            ? "bg-white shadow-xl py-3 border-b border-gold/20"
            : "bg-white/95 backdrop-blur-md py-4 border-b border-gold/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#home" className="flex items-center gap-3.5 group">
            <img
              src={logo}
              alt="Janhit College of Law Logo"
              className="h-14 w-14 object-contain transition-transform group-hover:scale-105"
            />
            <div className="leading-tight">
              <span className="font-serif text-lg md:text-xl font-bold text-navy tracking-wide block">
                Janhit College of Law
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold font-semibold block">
                Greater Noida
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navGroups.map((group) => {
              if (group.children) {
                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(group.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 text-sm font-medium text-navy/90 hover:text-gold py-2 transition-colors cursor-pointer">
                      <span>{group.label}</span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === group.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-1 min-w-[200px] bg-white border border-gold/20 rounded-lg shadow-2xl p-2 z-50"
                        >
                          {group.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-navy/80 hover:bg-gold/10 hover:text-navy rounded-md transition-all font-medium"
                            >
                              {child.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <a
                  key={group.href}
                  href={group.href}
                  className="text-sm font-medium text-navy/90 hover:text-gold py-2 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {group.label}
                </a>
              );
            })}
          </nav>

          {/* Apply Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#apply"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-md gradient-gold text-navy-deep font-bold text-sm tracking-wider shadow-gold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 uppercase cursor-pointer"
            >
              Apply Now
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-navy hover:text-gold transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gold/20 overflow-hidden shadow-inner"
            >
              <div className="px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {navGroups.map((group) => {
                  if (group.children) {
                    return (
                      <div key={group.label} className="space-y-2">
                        <div className="text-xs uppercase tracking-wider text-gold font-bold">
                          {group.label}
                        </div>
                        <div className="pl-4 space-y-2 border-l border-gold/20">
                          {group.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-1 text-sm font-medium text-navy/80 hover:text-gold transition-colors"
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <a
                      key={group.href}
                      href={group.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-base font-semibold text-navy hover:text-gold transition-colors"
                    >
                      {group.label}
                    </a>
                  );
                })}
                <div className="pt-4 border-t border-gold/10 flex flex-col gap-3">
                  <a
                    href="#apply"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-3 rounded-md gradient-gold text-navy-deep font-bold text-sm tracking-wider shadow-gold"
                  >
                    APPLY ONLINE
                  </a>
                  <div className="text-center text-xs text-navy/60 space-y-1">
                    <div>Admissions Help: 9313402015</div>
                    <div>Knowledge Park - 1, Greater Noida</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
