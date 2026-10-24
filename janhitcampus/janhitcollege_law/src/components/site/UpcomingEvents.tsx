import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { eventService, parseDateBadge } from "@/services/eventService";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  ArrowRight,
  ExternalLink,
  X,
  CheckCircle,
  Tag,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export interface UpcomingEventDisplay {
  id: string;
  title: string;
  day: string;
  month: string;
  year: string;
  time: string;
  venue: string;
  category: string;
  description: string;
  badge?: string;
  registrationLink?: string | null;
}

export function UpcomingEvents() {
  const [events, setEvents] = useState<UpcomingEventDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEventDisplay | null>(null);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    let isMounted = true;
    async function loadUpcoming() {
      try {
        setLoading(true);
        const res = await eventService.getUpcomingEvents({ limit: 10 });
        if (isMounted) {
          const mapped: UpcomingEventDisplay[] = (res.events || []).map((e) => {
            const badge = parseDateBadge(e.startDate);
            let timeStr = "";
            if (e.startTime) {
              timeStr = e.endTime ? `${e.startTime} - ${e.endTime}` : e.startTime;
            } else {
              timeStr = "Campus Timings";
            }
            return {
              id: String(e.id),
              title: e.title,
              day: badge.day,
              month: badge.month,
              year: badge.year,
              time: timeStr,
              venue: e.venue || "Campus Auditorium, Greater Noida",
              category: e.organizer || "Advocacy & Legal",
              badge: "Official Event",
              description: e.shortDescription || e.description || "",
              registrationLink: e.registrationLink,
            };
          });
          setEvents(mapped);
        }
      } catch (err) {
        if (isMounted) setEvents([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadUpcoming();
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamically derive category pills from loaded events if available
  const uniqueCategories = Array.from(new Set(events.map((e) => e.category).filter(Boolean)));
  const categories =
    uniqueCategories.length > 1
      ? ["All", ...uniqueCategories]
      : ["All", "Advocacy & Legal", "Mooting & Trial", "Workshops", "Academic"];

  const filteredEvents = events.filter((item) => {
    const matchesCategory =
      activeCategory === "All" ||
      item.category.toLowerCase() === activeCategory.toLowerCase() ||
      item.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
      item.description.toLowerCase().includes(activeCategory.toLowerCase());

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.venue.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationSubmitted(true);
    toast.success("Registration request submitted successfully!");
    setTimeout(() => {
      setSelectedEvent(null);
      setRegistrationSubmitted(false);
    }, 2000);
  };

  return (
    <section id="upcoming-events" className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-gold/20 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-10 md:space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Academic & Advocacy Calendar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy tracking-tight">
            Upcoming Events & Seminars
          </h2>

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <p className="text-sm md:text-base text-navy/70 leading-relaxed max-w-2xl mx-auto">
            Participate in our vibrant calendar of national moot courts, legal literacy drives, constitutional conventions, and guest lectures.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-gold/25 shadow-xs">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-navy text-white shadow-xs"
                    : "bg-slate-50 text-navy/70 border border-gold/20 hover:border-gold hover:text-navy hover:bg-gold/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
            <input
              type="text"
              placeholder="Search events, seminars, venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-gold/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-navy placeholder:text-navy/40"
            />
          </div>
        </div>

        {/* Events Table / Card Deck */}
        <div className="bg-white rounded-3xl border border-gold/30 shadow-md overflow-hidden">
          <div className="divide-y divide-gold/15">
            {loading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="animate-pulse space-y-2 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-28 bg-slate-200 rounded-full" />
                      <div className="h-5 w-32 bg-slate-200 rounded-full" />
                    </div>
                    <div className="h-6 w-2/3 bg-slate-200 rounded" />
                    <div className="h-4 w-5/6 bg-slate-100 rounded" />
                    <div className="flex items-center gap-4 pt-1">
                      <div className="h-4 w-24 bg-slate-100 rounded" />
                      <div className="h-4 w-36 bg-slate-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="py-14 text-center text-navy/60 text-sm space-y-2">
                <Calendar className="w-8 h-8 text-gold/60 mx-auto" />
                <p className="font-semibold text-navy">No upcoming events scheduled at this moment.</p>
                <p className="text-xs text-navy/50">
                  Please check back soon or browse the full academic calendar for past seminars and moot proceedings.
                </p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-5 md:p-6 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-5 group"
                >
                  {/* Left Column: Event Information */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="font-bold text-navy bg-gold/15 px-2.5 py-0.5 rounded-full border border-gold/30 uppercase tracking-wider">
                        {event.category}
                      </span>
                      {event.badge && (
                        <span className="font-bold text-navy/80 bg-navy/5 px-2.5 py-0.5 rounded-full border border-navy/15 uppercase tracking-wider">
                          {event.badge}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-navy font-semibold text-[11px] border border-gold/25">
                        <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{event.day} {event.month} {event.year}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-xl md:text-[22px] font-bold text-navy group-hover:text-gold transition-colors leading-snug tracking-tight">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="font-sans text-xs sm:text-sm text-navy/70 leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs text-navy/65 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>Time: {event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>Venue: {event.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Register / Details Action */}
                  <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 self-start md:self-center">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-navy transition-all shadow-xs cursor-pointer"
                    >
                      <span>Register / Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      to="/events"
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-gold/20 text-navy transition-colors"
                      title="View all events"
                    >
                      <ExternalLink className="w-4 h-4 text-navy/70" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="p-4 bg-slate-50 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy/70">
            <span>
              * Open to all enrolled law students, advocates, and inter-collegiate delegates. Pre-registration is mandatory for mooting competitions.
            </span>
            <Link
              to="/events"
              className="font-bold text-navy hover:text-gold transition-colors uppercase tracking-wider text-[11px] shrink-0"
            >
              View Full Academic Calendar &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Event Registration / Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gold/40 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-navy text-white px-6 py-5 flex items-center justify-between border-b border-gold/30">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-gold font-bold">
                  Event Registration
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold line-clamp-1">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-navy transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {registrationSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-navy">
                    Seat Requested!
                  </h4>
                  <p className="text-xs text-navy/70 max-w-xs mx-auto">
                    Thank you for showing interest. Our events coordinator will verify your registration and dispatch confirmation via email.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-gold/20 text-xs text-navy/80 space-y-2">
                    <p className="font-semibold text-navy text-sm font-serif">
                      {selectedEvent.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>
                        Date: {selectedEvent.day} {selectedEvent.month} {selectedEvent.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>Time: {selectedEvent.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <span>Venue: {selectedEvent.venue}</span>
                    </div>
                    {selectedEvent.registrationLink && (
                      <div className="pt-2">
                        <a
                          href={selectedEvent.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-gold hover:underline font-bold"
                        >
                          <span>External Registration Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Advocate / Student Name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 text-xs focus:outline-none focus:ring-1 focus:ring-gold text-navy bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 text-xs focus:outline-none focus:ring-1 focus:ring-gold text-navy bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 text-xs focus:outline-none focus:ring-1 focus:ring-gold text-navy bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                        College / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="Institution / Bar Chamber"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 text-xs focus:outline-none focus:ring-1 focus:ring-gold text-navy bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-navy text-white font-bold text-xs uppercase tracking-wider hover:bg-gold hover:text-navy transition-all shadow-md cursor-pointer"
                    >
                      Confirm Registration
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
