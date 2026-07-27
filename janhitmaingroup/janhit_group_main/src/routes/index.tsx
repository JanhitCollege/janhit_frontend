import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, BookOpen, Building2, Quote, Sparkles, Star, Users } from "lucide-react";
import heroImg from "@/assets/hero-luxurious-bright.png";
import { institutions } from "@/data/institutions";
import { InstitutionCard } from "@/components/InstitutionCard";
import { SectionHeader, FadeIn } from "@/components/Section";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Janhit Group of Institutions — Empowering Education Since 2002" },
      {
        name: "description",
        content:
          "A trusted family of colleges and schools across Greater Noida, Ghaziabad and Saharanpur. Explore programs in Law, Management, Education, Commerce, Science and K-12.",
      },
      { property: "og:title", content: "Janhit Group of Institutions" },
      {
        property: "og:description",
        content: "Empowering Education Across Uttar Pradesh Since 2002",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const reasons = [
  {
    icon: Users,
    title: "Experienced Faculty",
    desc: "Mentors with decades of academic and industry expertise.",
  },
  {
    icon: Building2,
    title: "Modern Infrastructure",
    desc: "Smart campuses with labs, libraries and sports complexes.",
  },
  { icon: Award, title: "Approved & Affiliated", desc: "Recognized by AICTE, NCTE, BCI and CBSE." },
  {
    icon: Sparkles,
    title: "Industry Exposure",
    desc: "Internships, expert sessions and live projects.",
  },
  {
    icon: Star,
    title: "Placement Assistance",
    desc: "Dedicated cell connecting students with top recruiters.",
  },
  {
    icon: BookOpen,
    title: "Affordable Education",
    desc: "Quality higher education accessible to every learner.",
  },
];

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "B.A. LL.B Alumna",
    quote: "Janhit gave me more than a degree — it shaped my voice as a future advocate.",
  },
  {
    name: "Rohit Verma",
    role: "BBA Student",
    quote: "From day one, the faculty pushed us to think like entrepreneurs.",
  },
  {
    name: "Mr. & Mrs. Kapoor",
    role: "Parents",
    quote: "We trust Janhit World School completely with our daughter's growth.",
  },
];

const timeline = [
  {
    y: "2002",
    t: "Foundation laid",
    d: "Janhit Group was established with a vision to democratize quality education.",
  },
  {
    y: "2008",
    t: "Ghaziabad Campus",
    d: "Expansion to Ghaziabad with the Institute of Education.",
  },
  { y: "2010", t: "Saharanpur Campus", d: "A sprawling degree college opened in Saharanpur." },
  { y: "2012", t: "K-12 Schools", d: "Launch of Janhit World Schools across NCR and Saharanpur." },
  {
    y: "Today",
    t: "10,000+ Students",
    d: "A thriving ecosystem of colleges and schools shaping the next generation.",
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="size-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative container-tight py-24 md:py-36 text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="size-3.5 text-gold" /> Since 2002 · 7 Institutions
            </span>
            <h1 className="mt-6 text-4xl md:text-7xl font-display font-bold leading-[1.05] drop-shadow-2xl">
              Janhit Group of <span className="text-gradient-gold">Institutions</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl opacity-90 max-w-2xl">
              Empowering education across Uttar Pradesh since 2002 — a trusted family of colleges
              and schools shaping the leaders of tomorrow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/institutions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-gold text-gold-foreground font-semibold shadow-gold hover:scale-[1.03] transition"
              >
                Explore Institutions <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-dark font-semibold hover:bg-white/10 transition"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>

          {/* counters */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: 22, s: "+", l: "Years of Excellence" },
              { n: 7, s: "", l: "Campuses" },
              { n: 10000, s: "+", l: "Students" },
              { n: 100, s: "+", l: "Faculty Members" },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="glass-dark rounded-2xl p-5"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient-gold">
                  <Counter to={c.n} suffix={c.s} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider opacity-80">{c.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24">
        <div className="container-tight grid lg:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-gold border border-gold/40 bg-gold/5">
              About the Group
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-display font-bold">
              Two decades of nurturing minds across{" "}
              <span className="text-gradient-gold">Uttar Pradesh</span>.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Established in 2002, Janhit Group has grown into a multi-campus education family with
              a presence in Greater Noida, Ghaziabad and Saharanpur — offering programs in Law,
              Education, Management, Commerce, Science and K-12 schooling.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["AICTE", "NCTE", "BCI", "CBSE", "CCS University", "Maa Shakumbhari University"].map(
                (t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-semibold"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              Read our story <ArrowRight className="size-4" />
            </Link>
          </FadeIn>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
            <div className="relative glass rounded-3xl p-8">
              <h3 className="font-display text-xl font-bold">Our Journey</h3>
              <ol className="mt-6 space-y-5 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-border">
                {timeline.map((m) => (
                  <li key={m.y} className="pl-10 relative">
                    <span className="absolute left-0 top-1 size-6 rounded-full bg-gradient-gold grid place-items-center text-[10px] font-bold text-gold-foreground shadow-gold">
                      ●
                    </span>
                    <div className="text-xs uppercase tracking-wider text-gold font-semibold">
                      {m.y}
                    </div>
                    <div className="font-semibold">{m.t}</div>
                    <div className="text-sm text-muted-foreground">{m.d}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONS */}
      <section className="py-24 bg-secondary/40">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Our Institutions"
            title="Explore the Janhit family of campuses"
            subtitle="Seven institutions across three cities, each crafted to empower its learners."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {institutions.map((i, idx) => (
              <InstitutionCard key={i.slug} inst={i} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-24">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Why Janhit"
            title="An ecosystem built for student success"
            subtitle="Every campus is anchored on the same promise: integrity, opportunity and excellence."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group p-6 rounded-2xl bg-card border border-border hover-lift relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 size-32 bg-gradient-gold opacity-0 group-hover:opacity-20 blur-3xl transition" />
                <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground">
                  <r.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-gradient-hero text-primary-foreground">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-gold border border-gold/40">
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-display font-bold">
              Voices of the Janhit family
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-dark p-6 rounded-2xl"
              >
                <Quote className="size-7 text-gold" />
                <p className="mt-4 text-sm md:text-base leading-relaxed opacity-90">"{t.quote}"</p>
                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs opacity-70">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-tight">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 md:p-16 text-primary-foreground">
            <div className="absolute -top-24 -right-24 size-64 bg-gradient-gold rounded-full blur-3xl opacity-40" />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                Begin your Janhit journey today.
              </h2>
              <p className="mt-4 opacity-90">
                Admissions are open across all our colleges and schools. Talk to our team and find
                the program that fits your dreams.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-gold text-gold-foreground font-semibold shadow-gold"
                >
                  Apply Now <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-dark font-semibold"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
