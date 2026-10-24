import logo from "@/assets/janhitlawcollege_logo.png";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const FOOTER_SOCIAL_LINKS = [
  { name: "Facebook", href: "https://www.facebook.com/janhitgroup", icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/janhitgroup", icon: Instagram },
  { name: "LinkedIn", href: "https://www.linkedin.com/school/janhit-group-of-institutions/", icon: Linkedin },
  { name: "YouTube", href: "https://www.youtube.com/@janhitgroup", icon: Youtube },
  { name: "Twitter", href: "https://twitter.com/janhitgroup", icon: Twitter },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/90 border-t border-gold/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
        {/* About column */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Janhit College of Law Logo" className="h-12 w-12 object-contain" />
            <div>
              <h4 className="font-serif text-base font-bold text-white tracking-wide">
                Janhit College of Law
              </h4>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold block">
                Greater Noida
              </span>
            </div>
          </div>
          <p className="text-xs text-white/85 font-medium leading-relaxed max-w-sm">
            Providing premium legal education, trial courtroom training, moot court advocacy, and free community outreach in association with the Bar Council of India and CCS University.
          </p>

          {/* Social Media Links */}
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold block mb-2.5">
              Connect on Social Media
            </span>
            <div className="flex items-center gap-2.5">
              {FOOTER_SOCIAL_LINKS.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-gold text-white hover:text-navy-deep flex items-center justify-center transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-serif text-sm font-bold text-white border-b border-white/10 pb-2 uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="grid grid-cols-2 gap-2 text-xs text-white/75">
            <li>
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/academics" className="hover:text-gold transition-colors">
                Academics
              </Link>
            </li>
            <li>
              <Link to="/students-corner" className="hover:text-gold transition-colors font-medium text-gold/90">
                Students Corner
              </Link>
            </li>
            <li>
              <Link to="/admissions" className="hover:text-gold transition-colors">
                Admissions
              </Link>
            </li>
            <li>
              <Link to="/naac" className="hover:text-gold transition-colors font-medium text-gold/90">
                NAAC & IQAC
              </Link>
            </li>
            <li>
              <Link to="/career" className="hover:text-gold transition-colors font-semibold text-gold">
                Career Openings
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/downloads" className="hover:text-gold transition-colors">
                Downloads
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-gold transition-colors font-medium text-gold/90">
                Events & Activities
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-gold transition-colors">
                Photo Gallery
              </Link>
            </li>
            <li>
              <Link to="/disclosures" className="hover:text-gold transition-colors">
                Public Disclosure
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="font-serif text-sm font-bold text-white border-b border-white/10 pb-2 uppercase tracking-wider">
            Campus Office
          </h4>
          <ul className="space-y-3 text-xs text-white/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <span>Plot No. 35, Knowledge Park - 1, Greater Noida (U.P.) - 201307</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-gold shrink-0" />
              <div className="flex gap-2">
                <a href="tel:9313402015" className="hover:text-gold">
                  9313402015
                </a>
                <span>,</span>
                <a href="tel:9560614440" className="hover:text-gold">
                  9560614440
                </a>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-gold shrink-0" />
              <a href="mailto:info@janhitlawcollege.org" className="hover:text-gold">
                info@janhitlawcollege.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Credits */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/60">
        <div>&copy; {new Date().getFullYear()} Janhit College of Law. All rights reserved.</div>
        <div className="flex gap-3 font-semibold uppercase tracking-wider">
          <span>Affiliated to CCS University</span>
          <span>&bull;</span>
          <span>BCI Approved</span>
        </div>
      </div>
    </footer>
  );
}
