import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { institutions } from "@/data/institutions";

export function Footer() {
  return (
    <footer className="mt-24 bg-gradient-hero text-primary-foreground">
      <div className="container-tight py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="size-10 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
              <GraduationCap className="size-5 text-gold-foreground" />
            </div>
            <div>
              <div className="font-display text-lg font-bold">Janhit Group</div>
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">
                of Institutions
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed opacity-80">
            Empowering education across Uttar Pradesh since 2002. A trusted family of colleges and
            schools shaping the leaders of tomorrow.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="size-9 grid place-items-center rounded-lg glass-dark hover:bg-gradient-gold hover:text-gold-foreground transition"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gradient-gold">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-2.5 text-sm opacity-80">
            {[
              ["Home", "/"],
              ["About Group", "/about"],
              ["Institutions", "/institutions"],
              ["Courses", "/courses"],
              ["Gallery", "/gallery"],
              ["Admissions", "/admissions"],
              ["Contact", "/contact"],
            ].map(([l, h]) => (
              <li key={l}>
                <Link to={h as string} className="hover:text-gold transition">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gradient-gold">
            Our Institutions
          </h4>
          <ul className="mt-5 space-y-2.5 text-sm opacity-80">
            {institutions.slice(0, 6).map((i) => (
              <li key={i.slug}>
                <Link
                  to="/institutions/$slug"
                  params={{ slug: i.slug }}
                  className="hover:text-gold transition"
                >
                  {i.name} — {i.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gradient-gold">
            Contact
          </h4>
          <ul className="mt-5 space-y-3 text-sm opacity-90">
            <li className="flex gap-3">
              <MapPin className="size-4 mt-0.5 text-gold" /> Greater Noida · Ghaziabad · Saharanpur
            </li>
            <li className="flex gap-3">
              <Phone className="size-4 mt-0.5 text-gold" /> +91 98765 43210
            </li>
            <li className="flex gap-3">
              <Mail className="size-4 mt-0.5 text-gold" /> info@janhitgroup.org
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-tight py-5 text-xs flex flex-col sm:flex-row gap-2 justify-between opacity-70">
          <p>© {new Date().getFullYear()} Janhit Group of Institutions. All rights reserved.</p>
          <p>Crafted with care for the future of education.</p>
        </div>
      </div>
    </footer>
  );
}
