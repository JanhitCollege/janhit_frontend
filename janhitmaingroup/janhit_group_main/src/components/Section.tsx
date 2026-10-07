import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
  containerClassName = "max-w-2xl",
  eyebrowClassName,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  containerClassName?: string;
  eyebrowClassName?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`${containerClassName} ${center ? "mx-auto text-center" : ""} mb-12`}
    >
      {eyebrow && (
        <span
          className={
            eyebrowClassName ||
            "inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-gold border border-gold/40 bg-gold/5"
          }
        >
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl md:text-5xl font-bold text-foreground">{title}</h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
