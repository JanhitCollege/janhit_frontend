import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";

import { eventService, CampusEvent, formatDisplayDate } from "@/services/eventService";

import mootImg from "@/assets/gallery-classroom.jpg";
import academicImg from "@/assets/gallery-graduation.jpg";
import seminarImg from "@/assets/gallery-library.jpg";
import labImg from "@/assets/gallery-lab.jpg";

const FALLBACK_IMAGES = [mootImg, academicImg, seminarImg, labImg];

export function EventsActivities() {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past">("all");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    async function fetchAllEvents() {
      setLoading(true);
      try {
        const [upcomingRes, pastRes] = await Promise.all([
          eventService.getUpcomingEvents({ limit: 50 }),
          eventService.getPastEvents({ limit: 50 }),
        ]);

        if (isMounted) {
          const allList = [...(upcomingRes.events || []), ...(pastRes.events || [])];
          // Remove duplicates if any
          const uniqueMap = new Map<string, CampusEvent>();
          allList.forEach((e) => uniqueMap.set(e.id, e));
          setEvents(Array.from(uniqueMap.values()));
        }
      } catch (err) {
        if (isMounted) {
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchAllEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter based on active tab
  const now = new Date();
  const filteredEvents = events.filter((e) => {
    if (activeTab === "all") return true;
    const sDate = new Date(e.startDate);
    const eDate = e.endDate ? new Date(e.endDate) : sDate;
    const isPast = eDate < now;
    if (activeTab === "upcoming") return !isPast;
    if (activeTab === "past") return isPast;
    return true;
  });

  const upcomingCount = events.filter((e) => {
    const sDate = new Date(e.startDate);
    const eDate = e.endDate ? new Date(e.endDate) : sDate;
    return eDate >= now;
  }).length;

  const pastCount = events.length - upcomingCount;

  return (
    <div className="bg-white min-h-screen text-navy pb-20">
      {/* 1. Hero Header Banner */}
      <section className="relative bg-white text-navy py-16 md:py-20 overflow-hidden border-b border-gold/30">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-navy border border-gold/35 text-xs uppercase tracking-widest font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span>Campus Engagement & Holistic Advocacy</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-navy max-w-4xl mx-auto leading-tight">
            Events & Activities
          </h1>

          <div className="h-1 w-28 bg-gold mx-auto rounded-full" />

          <p className="text-sm md:text-base lg:text-lg text-navy/85 font-medium max-w-3xl mx-auto leading-relaxed">
            Experience transformative legal training beyond textbooks — from national moot court
            trial championships and pro-bono legal awareness camps to constitutional jurisprudence
            symposiums and rural welfare extension missions.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-gold/20">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gold/25 shadow-xs">
              <div className="text-2xl md:text-3xl font-bold text-gold font-serif">50+</div>
              <div className="text-[11px] text-navy/70 uppercase tracking-wider font-semibold mt-1">
                Annual Campus Events
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gold/25 shadow-xs">
              <div className="text-2xl md:text-3xl font-bold text-gold font-serif">100%</div>
              <div className="text-[11px] text-navy/70 uppercase tracking-wider font-semibold mt-1">
                Moot Trial Practical Training
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gold/25 shadow-xs">
              <div className="text-2xl md:text-3xl font-bold text-gold font-serif">1,500+</div>
              <div className="text-[11px] text-navy/70 uppercase tracking-wider font-semibold mt-1">
                Legal Aid Beneficiaries
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gold/25 shadow-xs">
              <div className="text-2xl md:text-3xl font-bold text-gold font-serif">DLSA</div>
              <div className="text-[11px] text-navy/70 uppercase tracking-wider font-semibold mt-1">
                Official Legal Aid Partner
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Navigation / Filter Bar */}
      <div className="sticky top-[68px] sm:top-[76px] z-40 bg-white/95 backdrop-blur-md border-b border-gold/25 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-navy text-white shadow-md border border-navy"
                  : "bg-slate-50 text-navy/80 hover:bg-gold/15 hover:text-navy border border-gold/25"
              }`}
            >
              All Events ({events.length})
            </button>

            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "upcoming"
                  ? "bg-navy text-white shadow-md border border-navy"
                  : "bg-slate-50 text-navy/80 hover:bg-gold/15 hover:text-navy border border-gold/25"
              }`}
            >
              <Calendar className={`w-3.5 h-3.5 ${activeTab === "upcoming" ? "text-gold" : "text-navy/60"}`} />
              <span>Upcoming Events ({upcomingCount})</span>
            </button>

            <button
              onClick={() => setActiveTab("past")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "past"
                  ? "bg-navy text-white shadow-md border border-navy"
                  : "bg-slate-50 text-navy/80 hover:bg-gold/15 hover:text-navy border border-gold/25"
              }`}
            >
              <Clock className={`w-3.5 h-3.5 ${activeTab === "past" ? "text-gold" : "text-navy/60"}`} />
              <span>Past Events ({pastCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Detailed Sections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gold/20 pb-5">
          <div className="space-y-2 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-wider border border-gold/30">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Academic & Student Activities</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-navy flex items-center gap-3">
              <span>
                {activeTab === "upcoming"
                  ? "Upcoming Events & Seminars"
                  : activeTab === "past"
                  ? "Past Events & Completed Activities"
                  : "Campus Events & Activities"}
              </span>
            </h2>
            <p className="text-sm md:text-base text-navy/85 font-medium leading-relaxed">
              Explore national moot courts, legal literacy drives, constitutional conventions, judicial lectures, and student activities organized at Janhit College of Law.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold/10 text-navy hover:bg-gold hover:text-navy-deep font-bold text-xs border border-gold/30 transition-all cursor-pointer shadow-xs"
            >
              <ImageIcon className="w-3.5 h-3.5 text-gold" />
              <span>View Photos in Gallery</span>
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gold/20 p-5 space-y-4 animate-pulse"
              >
                <div className="h-48 bg-slate-100 rounded-xl w-full" />
                <div className="h-4 bg-slate-100 rounded w-1/3" />
                <div className="h-6 bg-slate-100 rounded w-3/4" />
                <div className="h-16 bg-slate-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 px-6 bg-slate-50 border border-gold/20 rounded-3xl max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-navy">
              No Events Scheduled
            </h3>
            <p className="text-xs sm:text-sm text-navy/70 leading-relaxed max-w-md mx-auto">
              There are currently no events published under this filter. Please check back soon or explore our campus gallery.
            </p>
            <div className="pt-2">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl gradient-gold text-navy-deep font-bold text-xs uppercase tracking-wider shadow-gold hover:-translate-y-0.5 transition-all"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Explore Media Gallery</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Event Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((event, idx) => {
              const displayImg = event.bannerImage || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
              const dateStr = formatDisplayDate(event.startDate, event.endDate);

              return (
                <article
                  key={event.id}
                  className="bg-white rounded-2xl border border-gold/25 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                >
                  {/* Event Image */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                    <img
                      src={displayImg}
                      alt={event.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-80" />

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full bg-navy/90 backdrop-blur-sm text-gold text-[11px] font-bold uppercase tracking-wider border border-gold/30 shadow-xs">
                        {event.organizer || "Janhit College of Law"}
                      </span>
                    </div>

                    {/* Date on image */}
                    {dateStr && (
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                          <Calendar className="w-3.5 h-3.5 text-gold" />
                          <span>{dateStr}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      {event.venue && (
                        <div className="flex items-start gap-2 text-xs text-navy/60 font-medium">
                          <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{event.venue}</span>
                        </div>
                      )}

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-navy group-hover:text-gold transition-colors leading-snug">
                        {event.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-navy/85 font-medium leading-relaxed line-clamp-3">
                        {event.shortDescription || event.description}
                      </p>

                      {/* Timings */}
                      {event.startTime && (
                        <div className="flex items-center gap-1.5 text-xs text-navy/70 pt-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>
                            {event.startTime}
                            {event.endTime ? ` – ${event.endTime}` : ""}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {event.registrationLink && (
                      <div className="pt-3 border-t border-gold/15">
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl gradient-gold text-navy-deep font-bold text-xs uppercase tracking-wider shadow-gold hover:-translate-y-0.5 transition-all cursor-pointer"
                        >
                          <span>Register Online</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Connect to Photo Gallery Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-12">
        <div className="relative rounded-3xl bg-gradient-to-r from-navy via-navy-deep to-slate-900 border border-gold/30 p-8 sm:p-12 text-white overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs uppercase tracking-widest font-bold">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Visual Highlights & Photo Showcase</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Explore Event Photos & Campus Moments
              </h3>
              <p className="text-sm text-white/90 font-medium leading-relaxed">
                Browse our comprehensive media gallery showcasing courtroom sessions, legal outreach
                drives, academic seminars, sports tournaments, and student life at Janhit College of Law.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-gold text-navy-deep font-bold text-sm uppercase tracking-wider shadow-gold hover:-translate-y-0.5 hover:shadow-xl transition-all cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-navy-deep" />
                <span>Visit Photo Gallery</span>
                <ArrowRight className="w-4 h-4 text-navy-deep" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wider border border-white/20 transition-all cursor-pointer"
              >
                <span>Contact Law Office</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventsActivities;
