import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import { COLLEGE_INFO } from "@/data/collegeInfo";

const navLinks = [
  { label: "Home", path: "/" },
  {
    label: "About",
    path: "/about",
    children: [
      { label: "About Us", path: "/about#about-us" },
      { label: "Why Janhit", path: "/about#why-janhit" },
      { label: "Vision & Mission", path: "/about#vision-mission" },
      { label: "Chairman Message", path: "/about#chairman-message" },
    ],
  },
  { label: "Courses", path: "/courses" },
  { label: "Admission", path: "/admission" },
  { label: "Downloads", path: "/downloads" },
  {
    label: "Life at Janhit",
    path: "/life-at-janhit",
    children: [
      { label: "Life at Janhit Hub", path: "/life-at-janhit" },
      { label: "Image Gallery", path: "/life-at-janhit/gallery" },
      { label: "Video Gallery", path: "/life-at-janhit/video-gallery" },
      { label: "News & Updates", path: "/news" },
      { label: "Events", path: "/events" },
    ],
  },
  {
    label: "Institutional",
    children: [
      { label: "Faculty & Staff", path: "/faculty" },
      { label: "Placement Cell", path: "/placements" },
      { label: "Committees", path: "/committees" },
      { label: "Public Disclosure", path: "/public-disclosure" },
    ],
  },
  { label: "Contact Us", path: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChildClick = (path: string) => {
    setActiveDropdown(null);
    setMobileOpen(false);

    const [basePath, hash] = path.split("#");
    if (hash && location.pathname === basePath) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Main Sticky Navbar */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${
          scrolled
            ? "bg-white shadow-xl py-2 border-b border-gold/30"
            : "bg-white/95 backdrop-blur-md py-3 border-b border-gold/20"
        }`}
      >
        <div className="w-full max-w-[1536px] mx-auto px-3 sm:px-5 md:px-8 flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <img
              src={logo}
              alt="Janhit Institute of Education & Information Logo"
              className="h-11 w-11 md:h-13 md:w-13 object-contain transition-transform group-hover:scale-105 shrink-0"
            />
            <div className="leading-tight">
              <span className="font-serif text-sm sm:text-base md:text-lg lg:text-xl font-bold text-navy tracking-tight whitespace-nowrap block">
                Janhit Institute of Education & Information
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.22em] text-gold font-bold block mt-0.5">
                Greater Noida
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6 shrink-0">
            {navLinks.map((item) => {
              if (item.children) {
                const isChildActive = item.children.some(
                  (child) => child.path.split("#")[0] === location.pathname
                );
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1 text-xs xl:text-sm font-semibold py-2 transition-colors cursor-pointer ${
                        isChildActive ? "text-gold font-bold" : "text-navy/90 hover:text-gold"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-0 mt-1 min-w-[210px] bg-white border border-gold/30 rounded-lg shadow-2xl p-2 z-50"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => handleChildClick(child.path)}
                              className={`block px-4 py-2.5 text-xs xl:text-sm rounded-md transition-all font-medium ${
                                location.pathname + location.hash === child.path ||
                                (location.pathname === child.path.split("#")[0] && !location.hash && child.path.endsWith("#about-us"))
                                  ? "bg-gold/15 text-navy font-bold"
                                  : "text-navy/80 hover:bg-gold/10 hover:text-navy"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xs xl:text-sm font-semibold py-2 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-gold hover:after:w-full after:transition-all after:duration-300 ${
                    isActive
                      ? "text-gold font-bold after:w-full"
                      : "text-navy/90 hover:text-gold after:w-0"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/admission"
              className="hidden sm:inline-flex items-center justify-center px-4 md:px-5 py-2 md:py-2.5 rounded-md gradient-gold text-navy-deep font-bold text-xs md:text-sm tracking-wider shadow-gold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 uppercase cursor-pointer shrink-0"
            >
              Apply Now
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-navy hover:text-gold transition-colors focus:outline-none cursor-pointer"
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
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-gold/20 overflow-hidden shadow-inner"
            >
              <div className="px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {navLinks.map((item) => {
                  if (item.children) {
                    return (
                      <div key={item.label} className="space-y-2">
                        <div className="text-xs uppercase tracking-wider text-gold font-bold">
                          {item.label}
                        </div>
                        <div className="pl-4 space-y-2 border-l-2 border-gold/30">
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => handleChildClick(child.path)}
                              className={`block py-1.5 text-sm font-medium transition-colors ${
                                location.pathname + location.hash === child.path
                                  ? "text-gold font-bold"
                                  : "text-navy/80 hover:text-gold"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block text-base font-semibold transition-colors ${
                        location.pathname === item.path
                          ? "text-gold font-bold"
                          : "text-navy hover:text-gold"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-gold/20 space-y-3">
                  <Link
                    to="/admission"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-3 rounded-md gradient-gold text-navy-deep font-bold text-sm tracking-wider shadow-gold block"
                  >
                    APPLY FOR ADMISSION
                  </Link>
                  <div className="text-center text-xs text-navy/70 space-y-1">
                    <div>Helpline: {COLLEGE_INFO.phone}</div>
                    <div>{COLLEGE_INFO.address.locality}, Greater Noida</div>
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
