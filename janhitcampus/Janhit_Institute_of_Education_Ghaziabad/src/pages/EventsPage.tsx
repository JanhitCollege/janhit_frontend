import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { EVENTS_DATA, EventItem } from "@/data/lifeData";

export function EventsPage() {
  const [filter, setFilter] = useState<string>("All");

  const filteredEvents = EVENTS_DATA.filter((evt) => {
    if (filter === "Upcoming") return evt.status === "Upcoming";
    if (filter === "Completed") return evt.status === "Completed";
    return true;
  });

  return (
    <>
      <SEO
        title="College Events & Activities | Janhit Degree College Saharanpur"
        description="Discover upcoming and past events, annual youth festivals, campus placement drives, and academic seminars at Janhit Degree College Saharanpur."
      />

      <Breadcrumb
        title="College Events & Seminars"
        items={[{ label: "Events" }]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2.5 mb-10">
            {["All", "Upcoming", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-5 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  filter === status
                    ? "gradient-gold text-navy-deep shadow"
                    : "bg-slate-100 text-navy hover:bg-gold/20"
                }`}
              >
                {status} Events
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredEvents.map((evt: EventItem) => (
              <div
                key={evt.id}
                className="bg-beige/30 p-6 rounded-xl border border-gold/20 shadow-sm hover-lift flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-navy">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {evt.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-navy hover:text-gold transition-colors">
                    <Link to={`/events/${evt.slug}`}>{evt.title}</Link>
                  </h3>

                  <div className="space-y-1.5 text-xs text-navy/80 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gold shrink-0" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gold shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-navy/75 leading-relaxed pt-1">
                    {evt.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-gold/15">
                  <Link
                    to={`/events/${evt.slug}`}
                    className="text-xs font-bold text-navy hover:text-gold transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Event Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
