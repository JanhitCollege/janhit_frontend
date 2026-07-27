import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, MapPin } from "lucide-react";
import type { Institution } from "@/data/institutions";

export function InstitutionCard({ inst, index = 0 }: { inst: Institution; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative rounded-3xl overflow-hidden bg-card border border-border hover-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={inst.image}
          alt={inst.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {inst.approvals.map((a) => (
            <span
              key={a}
              className="px-2.5 py-1 rounded-full bg-gradient-gold text-gold-foreground text-[10px] font-bold tracking-wider shadow-gold"
            >
              {a}
            </span>
          ))}
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-primary-foreground">
          <div className="flex items-center gap-1.5 text-xs opacity-90">
            <MapPin className="size-3.5" /> {inst.location}
          </div>
          <h3 className="mt-1 font-display text-xl font-bold leading-tight">{inst.name}</h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-muted-foreground line-clamp-2">{inst.short}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {inst.courses.slice(0, 5).map((c) => (
            <span
              key={c}
              className="text-[11px] px-2 py-1 rounded-md bg-accent text-accent-foreground font-medium"
            >
              {c}
            </span>
          ))}
          {inst.courses.length > 5 && (
            <span className="text-[11px] px-2 py-1 rounded-md bg-muted text-muted-foreground">
              +{inst.courses.length - 5}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Link
            to="/institutions/$slug"
            params={{ slug: inst.slug }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-glow transition"
          >
            View Details <ArrowUpRight className="size-4" />
          </Link>
          <a
            href={inst.maps}
            target="_blank"
            rel="noreferrer"
            aria-label="Open in Google Maps"
            className="grid place-items-center size-10 rounded-xl border border-border hover:bg-accent transition"
          >
            <MapPin className="size-4" />
          </a>
          <a
            href={inst.website}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit website"
            className="grid place-items-center size-10 rounded-xl border border-border hover:bg-accent transition"
          >
            <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
