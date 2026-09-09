import { motion } from "framer-motion";

export function SectionHeader({
  eyebrow,
  title,
  description,
  light = false,
  center = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className={`${center ? "text-center mx-auto" : ""} max-w-3xl`}
    >
      <div className="inline-flex items-center gap-3 text-gold text-xs tracking-[0.35em] uppercase">
        <span className="h-px w-8 bg-gold/60" /> {eyebrow} <span className="h-px w-8 bg-gold/60" />
      </div>
      <h2
        className={`mt-5 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base md:text-lg leading-relaxed ${
            light ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
