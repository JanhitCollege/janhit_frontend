import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, FadeIn } from "@/components/Section";
import { useState } from "react";
import {
  Calendar,
  FileText,
  Bell,
  Scale,
  Award,
  BookOpen,
  Users,
  Compass,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — Janhit Group of Institutions" },
      {
        name: "description",
        content:
          "Stay updated with Janhit Group's recent news, academic announcements, moot court trials, legal awareness camps, and campus activities.",
      },
    ],
  }),
  component: NewsAndEvents,
});

const announcements = [
  {
    date: "12 Oct 2026",
    title: "CCS University Semester Examination Forms Open",
    desc: "Examination forms for LL.B. and B.A. LL.B. odd semesters are open. Last date to submit is 28th October 2026.",
    tag: "Academic",
  },
  {
    date: "05 Oct 2026",
    title: "Winter Vacation Dates Announcement",
    desc: "The campus will remain closed for winter vacation from 24th December 2026 to 5th January 2027.",
    tag: "Notice",
  },
  {
    date: "28 Sep 2026",
    title: "Admissions Extended for LL.M. Course 2026-27",
    desc: "Registration has been extended for our PG Law Program (LL.M.) till 20th October. Limited seats available.",
    tag: "Admissions",
  },
  {
    date: "15 Sep 2026",
    title: "National Moot Court Competition Registrations Open",
    desc: "Janhit College of Law invites colleges across the nation to register for the 5th National Moot Court Competition.",
    tag: "Event Notice",
  },
];

const eventsData = {
  academic: [
    {
      title: "Orientation Session 2026-27",
      date: "Aug 10, 2026",
      desc: "Inaugural session welcoming new batches of Law, BBA, BCA, and B.Ed. students. Conducted by senior members of the CCS University syndicate.",
      img: "gallery-classroom",
    },
    {
      title: "Guest Lecture on Artificial Intelligence and Law",
      date: "Sep 22, 2026",
      desc: "A panel discussion exploring copyright claims, algorithmic bias, and cyber laws with senior advocates from the Supreme Court.",
      img: "gallery-lab",
    },
  ],
  legal: [
    {
      title: "Free Legal Aid & Counseling Camp - Greater Noida Rural",
      date: "Sep 05, 2026",
      desc: "Our Legal Aid Cell organized a camp providing free consultation to over 150 local villagers on land issues, family disputes, and consumer rights.",
      img: "campus-school",
    },
    {
      title: "Know Your Rights Awareness Rally",
      date: "Sep 18, 2026",
      desc: "A march by B.A. LL.B. scholars in local sectors distributing pamphlets regarding basic constitutional rights, women safety, and traffic regulations.",
      img: "gallery-sports",
    },
  ],
  moot: [
    {
      title: "Internal Moot Court Selections 2026",
      date: "Aug 29, 2026",
      desc: "Competitive court sessions among law student teams to select candidates for national-level representations. Judged by alumni and local advocates.",
      img: "campus-law",
    },
    {
      title: "National Trial Advocacy Competition Mock Bench",
      date: "Oct 02, 2026",
      desc: "Preparation trials simulating cross-examination sequences, evidence filings, and oral arguments on criminal jurisprudence cases.",
      img: "campus-greater-noida",
    },
  ],
  seminars: [
    {
      title: "National Seminar on Intellectual Property Rights",
      date: "Sep 12, 2026",
      desc: "A workshop covering trademark fillings, patent disclosures, and academic research plagiarism rules under the guidance of industry controllers.",
      img: "gallery-library",
    },
    {
      title: "Workshop on Coding Foundations & Web Development",
      date: "Aug 18, 2026",
      desc: "Our BCA faculty hosted a hands-on workshop covering JavaScript frameworks and design principles for junior students.",
      img: "gallery-lab",
    },
  ],
  extension: [
    {
      title: "Tree Plantation & Swachh Janhit Campaign",
      date: "Sep 25, 2026",
      desc: "Environmental drive across GNIDA campus sectors. Students planted over 200 trees and campaigned for zero-single-use plastics.",
      img: "gallery-cultural",
    },
    {
      title: "Mega Blood Donation Camp",
      date: "Aug 15, 2026",
      desc: "Organized in collaboration with the Red Cross Society. Over 100 units of blood were contributed by student volunteers and staff members.",
      img: "campus-ghaziabad",
    },
  ],
};

function NewsAndEvents() {
  const [activeCategory, setActiveCategory] = useState("all");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Header */}
      <section className="relative py-24 bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="container-tight relative">
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-gold border border-gold/40">
              Campus Buzz & Updates
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold max-w-3xl leading-tight">
              News, Announcements <span className="text-gradient-gold">& Events</span>
            </h1>
            <p className="mt-6 text-lg opacity-90 max-w-2xl">
              Stay connected with daily academic notifications, legal cell outreach camps, moot
              court milestones, and extension activities across our campuses.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Navigation Quick Links */}
      <section className="py-12 bg-secondary/30">
        <div className="container-tight">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Announcements", id: "announcements", icon: Bell },
              { label: "Academic Events", id: "academic-events", icon: BookOpen },
              { label: "Legal Awareness", id: "legal-awareness", icon: Scale },
              { label: "Moot Court", id: "moot-court", icon: Award },
              { label: "Seminars & Workshops", id: "seminars", icon: Users },
              { label: "Extension Activities", id: "extension", icon: Compass },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-border hover:border-gold/30 hover:bg-gold/5 text-xs font-semibold text-foreground hover:text-gold transition duration-300 shadow-sm"
              >
                <link.icon className="size-4" /> {link.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News & Announcements Section */}
      <section id="announcements" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Notifications"
            title="News & Announcements"
            subtitle="Recent notices and university updates from CCS University and college boards."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
            {announcements.map((ann, idx) => (
              <FadeIn key={idx} delay={idx * 0.05}>
                <div className="p-8 md:p-10 rounded-3xl bg-card border border-border h-full flex flex-col justify-between hover:border-gold/30 hover:shadow-elegant transition duration-300 relative group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-gold">
                        {ann.tag}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="size-3.5" /> {ann.date}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg md:text-xl text-foreground leading-snug group-hover:text-gold transition-colors">
                      {ann.title}
                    </h3>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{ann.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/80 flex items-center justify-between text-xs font-semibold text-gold">
                    <span>CCS University Notice</span>
                    <button className="hover:underline flex items-center gap-1">
                      Read Full PDF <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Events Section */}
      <section id="academic-events" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Academic"
            title="Academic Events"
            subtitle="Campus orientations, visiting expert lectures, and learning panel discussions."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            {eventsData.academic.map((evt, idx) => (
              <EventCard key={idx} event={evt} icon={BookOpen} colorClass="text-gold" />
            ))}
          </div>
        </div>
      </section>

      {/* Legal Awareness Camps Section */}
      <section id="legal-awareness" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Outreach"
            title="Legal Awareness Camps"
            subtitle="Janhit Legal Aid Cell activities conducting legal knowledge camps in rural and suburban sectors."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            {eventsData.legal.map((evt, idx) => (
              <EventCard key={idx} event={evt} icon={Scale} colorClass="text-gold" />
            ))}
          </div>
        </div>
      </section>

      {/* Moot Court Activities Section */}
      <section id="moot-court" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Practical Law"
            title="Moot Court Activities"
            subtitle="Internal trial selections, mock pleadings, and regional championship prep sessions."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            {eventsData.moot.map((evt, idx) => (
              <EventCard key={idx} event={evt} icon={Award} colorClass="text-gold" />
            ))}
          </div>
        </div>
      </section>

      {/* Seminars & Workshops Section */}
      <section id="seminars" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Workshops"
            title="Seminars & Workshops"
            subtitle="Conferences covering intellectual property rights, legal research drafts, and technology setups."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            {eventsData.seminars.map((evt, idx) => (
              <EventCard key={idx} event={evt} icon={Users} colorClass="text-gold" />
            ))}
          </div>
        </div>
      </section>

      {/* Extension Activities Section */}
      <section id="extension" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Volunteering"
            title="Extension Activities"
            subtitle="NSS drives, environment sanitation rallies, and local contribution drives."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            {eventsData.extension.map((evt, idx) => (
              <EventCard key={idx} event={evt} icon={Compass} colorClass="text-gold" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function EventCard({
  event,
  icon: Icon,
  colorClass,
}: {
  event: { title: string; date: string; desc: string };
  icon: any;
  colorClass: string;
}) {
  return (
    <FadeIn>
      <div className="p-8 md:p-10 rounded-3xl bg-card border border-border h-full flex flex-col justify-between hover:border-gold/30 hover:shadow-elegant transition duration-300 group">
        <div>
          <div className="flex justify-between items-center mb-6">
            <div
              className={`size-14 rounded-full bg-gold/10 ${colorClass} grid place-items-center`}
            >
              <Icon className="size-7" />
            </div>
            <span className="text-xs text-muted-foreground font-mono font-medium">
              {event.date}
            </span>
          </div>
          <h3 className="font-display font-bold text-xl md:text-2xl text-foreground leading-tight group-hover:text-gold transition-colors">
            {event.title}
          </h3>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{event.desc}</p>
        </div>
        <div className="mt-8 pt-4 border-t border-border/80 flex items-center justify-between text-xs text-muted-foreground font-semibold">
          <span>Janhit Event Diaries</span>
          <span className="text-gold hover:underline flex items-center gap-1 cursor-pointer">
            View Media Gallery <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </FadeIn>
  );
}
