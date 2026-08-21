import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Linkedin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo-web.png";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Why Us", href: "/why-us" },
  { label: "Foundation", href: "/foundation" },
  { label: "Sports", href: "/sports" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative bg-navy-deep text-white pt-20 pb-10 overflow-hidden">
      <div className="absolute top-0 inset-x-0 gold-divider opacity-60" />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-3 group inline-flex">
            <img src={logo} alt="Janhit World School Logo" className="h-20 w-20 object-contain" />
            <div>
              <div className="font-serif text-xl">Janhit World School</div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold">Greater Noida</div>
            </div>
          </Link>
          <p className="mt-6 text-white/65 max-w-md leading-relaxed">
            Where Global Foundations Meet Elite Excellence. To be affiliated with CBSE. Foundational
            Stage to Class 8 · Session 2026-27.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, href: "https://www.instagram.com/janhitworldschool/" },
              { Icon: Facebook, href: "https://www.facebook.com/jws.gzb/" },
              { Icon: Youtube, href: "#" },
              { Icon: Linkedin, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target={href !== "#" ? "_blank" : undefined}
                rel={href !== "#" ? "noopener noreferrer" : undefined}
                aria-label="Social link"
                className="h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy-deep transition-all"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-5">Explore</div>
          <ul className="space-y-3 text-white/75">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="hover:text-gold transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-5">Visit</div>
          <p className="text-white/75 leading-relaxed">
            Plot No. 55-B,
            <br /> Knowledge Park-5,
            <br /> Greater Noida, U.P. – 201306
          </p>
          <a
            href="https://maps.app.goo.gl/XhyLojU9h8RMsvUF9"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-gold underline-offset-4 hover:underline"
          >
            Get Directions →
          </a>
          <div className="mt-4 space-y-2.5 text-sm text-white/75 border-t border-gold/15 pt-3">
            <a
              href="tel:+919958574400"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Phone className="size-4 text-gold shrink-0" />
              <span>+91 99585 74400</span>
            </a>
            <a
              href="mailto:Info@janhitgroup.com"
              className="flex items-center gap-2 hover:text-gold transition-colors break-all"
            >
              <Mail className="size-4 text-gold shrink-0" />
              <span>Info@janhitgroup.com</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-7xl mx-auto px-6">
        <div className="gold-divider opacity-40" />
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50 tracking-wide">
          <div>© {new Date().getFullYear()} Janhit World School. All rights reserved.</div>
          <div>To be affiliated with CBSE · Session 2026-27</div>
        </div>
      </div>
    </footer>
  );
}
