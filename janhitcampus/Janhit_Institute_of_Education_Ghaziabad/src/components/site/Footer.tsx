import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Award, CheckCircle, ExternalLink } from "lucide-react";
import logo from "@/assets/logo.png";
import { COLLEGE_INFO } from "@/data/collegeInfo";

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8 border-t-4 border-gold relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Column 1: College Intro & Identity */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Janhit Institute of Education & Information Logo"
                className="h-12 w-12 object-contain bg-white rounded-md p-1 shrink-0"
              />
              <div className="leading-tight">
                <span className="font-serif text-base md:text-lg font-bold text-white tracking-tight block">
                  Janhit Institute of Education & Information
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold block">
                  Greater Noida • Est. 2001
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/75 leading-relaxed">
              Affiliated to Ch. Charan Singh University, Meerut & Approved by NCTE, New Delhi.
              Offering BA, BBA, BCA, B.Com, B.Ed, D.El.Ed, B.P.Ed and B.Sc.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-gold">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>CCSU Meerut Affiliated Code: 752</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>NCTE Approved Institution</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gold mb-4 border-b border-gold/30 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
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
                <Link to="/courses" className="hover:text-gold transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/admission" className="hover:text-gold transition-colors">
                  Admissions 2026
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-gold transition-colors">
                  Downloads Center
                </Link>
              </li>
              <li>
                <Link to="/life-at-janhit" className="hover:text-gold transition-colors">
                  Life at Janhit
                </Link>
              </li>
              <li>
                <Link to="/life-at-janhit/gallery" className="hover:text-gold transition-colors">
                  Image Gallery
                </Link>
              </li>
              <li>
                <Link to="/life-at-janhit/video-gallery" className="hover:text-gold transition-colors">
                  Video Gallery
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-gold transition-colors">
                  News & Announcements
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-gold transition-colors">
                  Events Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Important Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gold mb-4 border-b border-gold/30 pb-2">
              Important Links
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link to="/faculty" className="hover:text-gold transition-colors">
                  Faculty & Staff
                </Link>
              </li>
              <li>
                <Link to="/placements" className="hover:text-gold transition-colors">
                  Placement Cell
                </Link>
              </li>
              <li>
                <Link to="/committees" className="hover:text-gold transition-colors">
                  College Committees
                </Link>
              </li>
              <li>
                <Link to="/public-disclosure" className="hover:text-gold transition-colors">
                  Public Disclosure
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gold mb-4 border-b border-gold/30 pb-2">
              Contact Info
            </h3>
            <div className="space-y-3.5 text-xs md:text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span>{COLLEGE_INFO.address.full}</span>
                  <a
                    href={COLLEGE_INFO.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gold text-xs font-semibold hover:underline mt-1"
                  >
                    <span>Google Maps Link</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  {COLLEGE_INFO.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                      className="block hover:text-gold transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  {COLLEGE_INFO.emails.map((email, idx) => (
                    <a
                      key={idx}
                      href={`mailto:${email}`}
                      className="block hover:text-gold transition-colors break-all"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/admission"
                  className="w-full text-center py-2.5 px-4 rounded gradient-gold text-navy-deep font-bold text-xs uppercase tracking-wider block shadow hover:opacity-90 transition-opacity"
                >
                  Apply Online 2026-27
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} Janhit Institute of Education & Information, Greater Noida. All rights reserved.
            Part of Janhit Group of Institutions.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-gold cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gold cursor-pointer transition-colors">Terms of Use</span>
            <span>•</span>
            <Link to="/public-disclosure" className="hover:text-gold transition-colors">
              Mandatory Disclosures
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
