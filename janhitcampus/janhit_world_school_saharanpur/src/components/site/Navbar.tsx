import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo-web.png";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Why Us", href: "/why-us" },
  { label: "Sports", href: "/sports" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Public Disclosure", href: "/public-disclosure" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [admissionsHovered, setAdmissionsHovered] = useState(false);
  const [galleryHovered, setGalleryHovered] = useState(false);
  const [mobileAdmissionsOpen, setMobileAdmissionsOpen] = useState(false);
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileAdmissionsOpen(false);
    setMobileGalleryOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-white border-b border-gold/20 shadow-md ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Janhit World School Logo" className="h-14 w-14 object-contain" />
          <div className="leading-tight">
            <div className="font-serif text-lg tracking-wide font-semibold text-[#0B2566] transition-colors duration-300">
              Janhit World School
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-gold">Saharanpur</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => {
            const isActive =
              l.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(l.href);

            if (l.label === "Admissions") {
              return (
                <div
                  key={l.href}
                  className="relative py-2"
                  onMouseEnter={() => setAdmissionsHovered(true)}
                  onMouseLeave={() => setAdmissionsHovered(false)}
                >
                  <Link
                    to={l.href}
                    className={`text-sm tracking-wide font-medium transition-colors duration-300 flex items-center gap-1 cursor-pointer ${
                      isActive ? "text-gold font-bold" : "text-[#0B2566]/85 hover:text-[#0B2566]"
                    }`}
                  >
                    {l.label}
                    <svg
                      className={`size-3.5 transition-transform duration-300 ${
                        admissionsHovered ? "rotate-180 text-gold" : "text-[#0B2566]/60"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                  {admissionsHovered && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 rounded-xl bg-white border border-gold/20 p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <Link
                        to="/admissions#admissions"
                        className="block px-4 py-2.5 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-beige/40 rounded-lg transition-colors"
                      >
                        Required Documents
                      </Link>
                      <Link
                        to="/admissions#fee-structure"
                        className="block px-4 py-2.5 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-beige/40 rounded-lg transition-colors"
                      >
                        Fee Structure & Policy
                      </Link>
                      <Link
                        to="/admissions#transfer-admissions"
                        className="block px-4 py-2.5 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-beige/40 rounded-lg transition-colors"
                      >
                        Transfer Admissions
                      </Link>
                      <Link
                        to="/admissions#conduct-policy"
                        className="block px-4 py-2.5 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-beige/40 rounded-lg transition-colors"
                      >
                        Admission Conduct
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            if (l.label === "Gallery") {
              return (
                <div
                  key={l.href}
                  className="relative py-2"
                  onMouseEnter={() => setGalleryHovered(true)}
                  onMouseLeave={() => setGalleryHovered(false)}
                >
                  <Link
                    to={l.href}
                    className={`text-sm tracking-wide font-medium transition-colors duration-300 flex items-center gap-1 cursor-pointer ${
                      isActive ? "text-gold font-bold" : "text-[#0B2566]/85 hover:text-[#0B2566]"
                    }`}
                  >
                    {l.label}
                    <svg
                      className={`size-3.5 transition-transform duration-300 ${
                        galleryHovered ? "rotate-180 text-gold" : "text-[#0B2566]/60"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                  {galleryHovered && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 rounded-xl bg-white border border-gold/20 p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <Link
                        to="/gallery#image-gallery"
                        className="block px-4 py-2.5 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-beige/40 rounded-lg transition-colors"
                      >
                        Image Gallery
                      </Link>
                      <Link
                        to="/gallery#video-gallery"
                        className="block px-4 py-2.5 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-beige/40 rounded-lg transition-colors"
                      >
                        Video Gallery
                      </Link>
                      <Link
                        to="/gallery#events"
                        className="block px-4 py-2.5 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-beige/40 rounded-lg transition-colors"
                      >
                        Events & Celebrations
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={l.href}
                to={l.href}
                className={`text-sm tracking-wide font-medium transition-colors duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-gold hover:after:w-full after:transition-all after:duration-300 ${
                  isActive
                    ? "text-gold font-bold after:w-full"
                    : "text-[#0B2566]/85 hover:text-[#0B2566] after:w-0"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-md gradient-gold text-navy-deep font-semibold text-sm tracking-wide shadow-gold hover:-translate-y-0.5 transition-all"
        >
          Apply Now
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 text-[#0B2566] transition-colors duration-300 cursor-pointer"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mt-3 mx-4 rounded-2xl bg-white border border-gold/30 p-4 space-y-1.5 shadow-2xl font-sans"
        >
          {links.map((l) => {
            const isActive =
              l.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(l.href);

            if (l.label === "Admissions") {
              return (
                <div key={l.href} className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <Link
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className={`flex-1 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-between ${
                        isActive
                          ? "bg-[#0B2566] text-white font-bold shadow-sm"
                          : "text-[#0B2566] hover:bg-slate-100 hover:text-gold hover:pl-4"
                      }`}
                    >
                      <span>{l.label}</span>
                    </Link>
                    <button
                      onClick={() => setMobileAdmissionsOpen((prev) => !prev)}
                      className="p-2.5 text-[#0B2566] hover:text-gold transition-colors rounded-xl hover:bg-slate-100 cursor-pointer"
                      aria-label="Toggle admissions dropdown"
                    >
                      <ChevronDown
                        className={`size-4 transition-transform duration-300 ${
                          mobileAdmissionsOpen ? "rotate-180 text-gold" : "text-[#0B2566]/60"
                        }`}
                      />
                    </button>
                  </div>

                  {mobileAdmissionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pl-3 border-l-2 border-gold/40 space-y-1 my-1 ml-3"
                    >
                      <Link
                        to="/admissions#admissions"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-slate-100 rounded-lg transition-all hover:pl-4"
                      >
                        Required Documents
                      </Link>
                      <Link
                        to="/admissions#fee-structure"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-slate-100 rounded-lg transition-all hover:pl-4"
                      >
                        Fee Structure & Policy
                      </Link>
                      <Link
                        to="/admissions#transfer-admissions"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-slate-100 rounded-lg transition-all hover:pl-4"
                      >
                        Transfer Admissions
                      </Link>
                      <Link
                        to="/admissions#conduct-policy"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-slate-100 rounded-lg transition-all hover:pl-4"
                      >
                        Admission Conduct
                      </Link>
                    </motion.div>
                  )}
                </div>
              );
            }

            if (l.label === "Gallery") {
              return (
                <div key={l.href} className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <Link
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className={`flex-1 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-between ${
                        isActive
                          ? "bg-[#0B2566] text-white font-bold shadow-sm"
                          : "text-[#0B2566] hover:bg-slate-100 hover:text-gold hover:pl-4"
                      }`}
                    >
                      <span>{l.label}</span>
                    </Link>
                    <button
                      onClick={() => setMobileGalleryOpen((prev) => !prev)}
                      className="p-2.5 text-[#0B2566] hover:text-gold transition-colors rounded-xl hover:bg-slate-100 cursor-pointer"
                      aria-label="Toggle gallery dropdown"
                    >
                      <ChevronDown
                        className={`size-4 transition-transform duration-300 ${
                          mobileGalleryOpen ? "rotate-180 text-gold" : "text-[#0B2566]/60"
                        }`}
                      />
                    </button>
                  </div>

                  {mobileGalleryOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pl-3 border-l-2 border-gold/40 space-y-1 my-1 ml-3"
                    >
                      <Link
                        to="/gallery#image-gallery"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-slate-100 rounded-lg transition-all hover:pl-4"
                      >
                        Image Gallery
                      </Link>
                      <Link
                        to="/gallery#video-gallery"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-slate-100 rounded-lg transition-all hover:pl-4"
                      >
                        Video Gallery
                      </Link>
                      <Link
                        to="/gallery#events"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-slate-100 rounded-lg transition-all hover:pl-4"
                      >
                        Events & Celebrations
                      </Link>
                    </motion.div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#0B2566] text-white font-bold shadow-sm"
                    : "text-[#0B2566] hover:bg-slate-100 hover:text-gold hover:pl-4"
                }`}
              >
                {l.label}
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block text-center px-5 py-3 rounded-xl gradient-gold text-navy-deep font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              Apply Now
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
