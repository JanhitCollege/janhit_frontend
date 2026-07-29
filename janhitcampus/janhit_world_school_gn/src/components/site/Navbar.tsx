import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-web.png";

const links = [
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why" },
  { label: "Foundation", href: "#foundation" },
  { label: "Sports", href: "#sports" },
  { label: "Admissions", href: "#admissions" },
  { label: "Campus", href: "#campus" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [admissionsHovered, setAdmissionsHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a href="#top" className="flex items-center gap-3 group">
          <img src={logo} alt="Janhit World School Logo" className="h-14 w-14 object-contain" />
          <div className="leading-tight">
            <div className="font-serif text-lg tracking-wide font-semibold text-[#0B2566] transition-colors duration-300">
              Janhit World School
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-gold">Greater Noida</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => {
            if (l.label === "Admissions") {
              return (
                <div
                  key={l.href}
                  className="relative py-2"
                  onMouseEnter={() => setAdmissionsHovered(true)}
                  onMouseLeave={() => setAdmissionsHovered(false)}
                >
                  <a
                    href={l.href}
                    className="text-sm tracking-wide font-medium text-[#0B2566]/85 hover:text-[#0B2566] transition-colors duration-300 flex items-center gap-1 cursor-pointer"
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
                  </a>
                  {admissionsHovered && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 rounded-xl bg-white border border-gold/20 p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <a
                        href="#admissions"
                        className="block px-4 py-2.5 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-beige/40 rounded-lg transition-colors"
                      >
                        Required Documents
                      </a>
                      <a
                        href="#fee-structure"
                        className="block px-4 py-2.5 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-beige/40 rounded-lg transition-colors"
                      >
                        Fee Structure & Policy
                      </a>
                      <a
                        href="#transfer-admissions"
                        className="block px-4 py-2.5 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-beige/40 rounded-lg transition-colors"
                      >
                        Transfer Admissions
                      </a>
                      <a
                        href="#conduct-policy"
                        className="block px-4 py-2.5 text-xs font-semibold text-[#0B2566]/80 hover:text-gold hover:bg-beige/40 rounded-lg transition-colors"
                      >
                        Admission Conduct
                      </a>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={l.href}
                href={l.href}
                className="text-sm tracking-wide font-medium text-[#0B2566]/85 hover:text-[#0B2566] transition-colors duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-md gradient-gold text-navy-deep font-semibold text-sm tracking-wide shadow-gold hover:-translate-y-0.5 transition-all"
        >
          Apply Now
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 text-[#0B2566] transition-colors duration-300"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mt-3 mx-4 rounded-xl bg-white border border-gold/20 p-6 space-y-3 shadow-2xl"
        >
          {links.map((l) => {
            if (l.label === "Admissions") {
              return (
                <div key={l.href} className="space-y-2">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-[#0B2566]/90 hover:text-gold tracking-wide font-medium"
                  >
                    {l.label}
                  </a>
                  <div className="pl-4 border-l-2 border-gold/30 space-y-2 ml-1">
                    <a
                      href="#admissions"
                      onClick={() => setOpen(false)}
                      className="block text-sm text-[#0B2566]/70 hover:text-gold font-medium"
                    >
                      Required Documents
                    </a>
                    <a
                      href="#fee-structure"
                      onClick={() => setOpen(false)}
                      className="block text-sm text-[#0B2566]/70 hover:text-gold font-medium"
                    >
                      Fee Structure & Policy
                    </a>
                    <a
                      href="#transfer-admissions"
                      onClick={() => setOpen(false)}
                      className="block text-sm text-[#0B2566]/70 hover:text-gold font-medium"
                    >
                      Transfer Admissions
                    </a>
                    <a
                      href="#conduct-policy"
                      onClick={() => setOpen(false)}
                      className="block text-sm text-[#0B2566]/70 hover:text-gold font-medium"
                    >
                      Admission Conduct
                    </a>
                  </div>
                </div>
              );
            }
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-[#0B2566]/90 hover:text-gold tracking-wide font-medium"
              >
                {l.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block text-center px-5 py-3 rounded-md gradient-gold text-navy-deep font-semibold"
          >
            Apply Now
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
