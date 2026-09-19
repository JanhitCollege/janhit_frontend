import { Link } from "react-router-dom";
import { Image, Video, Newspaper, Calendar, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { GALLERY_DATA, VIDEO_DATA, NEWS_DATA, EVENTS_DATA } from "@/data/lifeData";

export function LifeAtJanhitPage() {
  return (
    <>
      <SEO
        title="Life at Janhit Degree College | Campus Life, Events & Gallery"
        description="Experience vibrant campus life at Janhit Degree College Saharanpur. Explore image galleries, video tours, latest news, academic updates, and annual events."
      />

      <Breadcrumb
        title="Life at Janhit Degree College"
        items={[{ label: "Life at Janhit" }]}
      />

      {/* Main Hub Introduction */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-gold block">
              Vibrant Campus Life
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy">
              Academic Rigor Meets Creative & Physical Excellence
            </h1>
            <div className="gold-divider w-24 mx-auto" />
            <p className="text-sm md:text-base text-navy/80 leading-relaxed">
              At Janhit Degree College, student development extends beyond classroom lectures. From cultural fests and athletic meets to computer programming hackathons and educational seminars, campus life is full of opportunities.
            </p>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/life-at-janhit/gallery"
              className="bg-beige/40 p-6 rounded-xl border border-gold/20 shadow-sm hover-lift space-y-3 group"
            >
              <Image className="h-8 w-8 text-gold group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors">
                Photo Gallery
              </h3>
              <p className="text-xs text-navy/70">
                Browse photos of academic campus, computer labs, library, sports, and cultural events.
              </p>
              <div className="pt-2 text-xs font-bold text-navy flex items-center gap-1">
                <span>Explore Photos</span>
                <ArrowRight className="h-3.5 w-3.5 text-gold" />
              </div>
            </Link>

            <Link
              to="/life-at-janhit/video-gallery"
              className="bg-beige/40 p-6 rounded-xl border border-gold/20 shadow-sm hover-lift space-y-3 group"
            >
              <Video className="h-8 w-8 text-gold group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors">
                Video Gallery
              </h3>
              <p className="text-xs text-navy/70">
                Watch virtual tours, annual athletic showcases, and teacher training workshops.
              </p>
              <div className="pt-2 text-xs font-bold text-navy flex items-center gap-1">
                <span>Watch Videos</span>
                <ArrowRight className="h-3.5 w-3.5 text-gold" />
              </div>
            </Link>

            <Link
              to="/news"
              className="bg-beige/40 p-6 rounded-xl border border-gold/20 shadow-sm hover-lift space-y-3 group"
            >
              <Newspaper className="h-8 w-8 text-gold group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors">
                News & Updates
              </h3>
              <p className="text-xs text-navy/70">
                Stay informed with CCS University results, merit announcements, and college notices.
              </p>
              <div className="pt-2 text-xs font-bold text-navy flex items-center gap-1">
                <span>Read News</span>
                <ArrowRight className="h-3.5 w-3.5 text-gold" />
              </div>
            </Link>

            <Link
              to="/events"
              className="bg-beige/40 p-6 rounded-xl border border-gold/20 shadow-sm hover-lift space-y-3 group"
            >
              <Calendar className="h-8 w-8 text-gold group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors">
                Events Calendar
              </h3>
              <p className="text-xs text-navy/70">
                Discover upcoming cultural fests, campus placement drives, and national seminars.
              </p>
              <div className="pt-2 text-xs font-bold text-navy flex items-center gap-1">
                <span>View Events</span>
                <ArrowRight className="h-3.5 w-3.5 text-gold" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Photo Highlights Grid */}
      <section className="py-12 md:py-16 bg-beige/40 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-navy">Campus Photo Highlights</h2>
            <Link
              to="/life-at-janhit/gallery"
              className="text-xs font-bold text-navy hover:text-gold transition-colors flex items-center gap-1"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_DATA.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden border border-gold/20 shadow-sm hover-lift group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gold">{item.category}</span>
                  <h3 className="font-serif text-base font-bold text-navy">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
