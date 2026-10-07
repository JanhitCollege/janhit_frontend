import { useParams, Link, Navigate } from "react";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { EVENTS_DATA } from "@/data/lifeData";

export function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const evt = EVENTS_DATA.find((e) => e.slug === slug || e.id === slug);

  if (!evt) {
    return <Navigate to="/events" replace />;
  }

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: evt.title,
    startDate: evt.date,
    location: {
      "@type": "Place",
      name: evt.venue,
      address: "Gangali, Roorki, Dehradun Road, Chhutmalpur, Saharanpur, 247662",
    },
    description: evt.shortDescription,
  };

  return (
    <>
      <SEO
        title={`${evt.title} | Janhit Degree College Saharanpur`}
        description={evt.shortDescription}
        schema={eventSchema}
      />

      <Breadcrumb
        title={evt.title}
        items={[
          { label: "Events", path: "/events" },
          { label: evt.status },
        ]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Events</span>
          </Link>

          <div className="space-y-4">
            <span className="text-xs uppercase font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
              {evt.status} Event
            </span>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy leading-tight">
              {evt.title}
            </h1>
            <div className="gold-divider w-24" />
          </div>

          {/* Event Quick Info Card */}
          <div className="bg-beige/60 p-6 rounded-xl border border-gold/30 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm font-semibold text-navy">
            <div className="flex items-center gap-2.5">
              <Calendar className="h-5 w-5 text-gold shrink-0" />
              <div>
                <span className="text-navy/60 block text-[10px] uppercase">Date</span>
                <span>{evt.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="h-5 w-5 text-gold shrink-0" />
              <div>
                <span className="text-navy/60 block text-[10px] uppercase">Time</span>
                <span>{evt.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="h-5 w-5 text-gold shrink-0" />
              <div>
                <span className="text-navy/60 block text-[10px] uppercase">Venue</span>
                <span>{evt.venue}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg border border-gold/20">
            <img
              src={evt.image}
              alt={evt.title}
              className="w-full h-80 md:h-96 object-cover"
            />
          </div>

          <div className="prose max-w-none text-navy/80 text-sm md:text-base leading-relaxed space-y-4">
            <p className="font-semibold text-navy text-base">{evt.shortDescription}</p>
            <p>{evt.content}</p>
          </div>

          <div className="pt-8 border-t border-gold/20 flex justify-between items-center">
            <Link
              to="/events"
              className="px-5 py-2 rounded border border-gold/40 text-navy font-bold text-xs hover:bg-gold/10 transition-colors"
            >
              ← Back to Events Calendar
            </Link>

            <Link
              to="/contact"
              className="px-5 py-2 rounded gradient-gold text-navy-deep font-bold text-xs uppercase shadow"
            >
              Enquire College Office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
