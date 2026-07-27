import logo from "@/assets/janhitlawcollege_logo.png";
import { Phone, Mail, MapPin } from "lucide-react";

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
          <p className="text-xs text-white/70 leading-relaxed max-w-sm">
            Providing premium legal education, trial courtroom training, and free community outreach
            in association with the Bar Council of India and CCS University.
          </p>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-serif text-sm font-bold text-white border-b border-white/10 pb-2 uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="grid grid-cols-2 gap-2 text-xs text-white/75">
            <li>
              <a href="#home" className="hover:text-gold transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gold transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#courses" className="hover:text-gold transition-colors">
                Law Courses
              </a>
            </li>
            <li>
              <a href="#admissions" className="hover:text-gold transition-colors">
                Admissions
              </a>
            </li>
            <li>
              <a href="#calendar" className="hover:text-gold transition-colors">
                Calendar
              </a>
            </li>
            <li>
              <a href="#downloads" className="hover:text-gold transition-colors">
                Downloads
              </a>
            </li>
            <li>
              <a href="#faculty" className="hover:text-gold transition-colors">
                Faculty
              </a>
            </li>
            <li>
              <a href="#disclosures" className="hover:text-gold transition-colors">
                Disclosures
              </a>
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
