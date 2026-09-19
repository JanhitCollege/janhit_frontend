import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image as ImageIcon, Calendar, ArrowRight, Loader2, ZoomIn, X } from "lucide-react";
import { galleryService, GalleryItem } from "@/services/galleryService";

export function HomeGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchHomeGallery() {
      setLoading(true);
      try {
        const data = await galleryService.getPublicGallery({
          campusSlug: "janhit-college-of-law",
          limit: 6,
          page: 1,
        });

        if (isMounted && data.items) {
          setItems(data.items.slice(0, 6));
        }
      } catch (err: any) {
        console.error("Failed to load home gallery images from API:", err?.message);
        if (isMounted) {
          setItems([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchHomeGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!loading && items.length === 0) {
    return null; // Hide home gallery section if no API items exist
  }

  return (
    <section className="py-20 bg-slate-50 border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <ImageIcon className="w-3.5 h-3.5 text-gold" />
            <span>Campus Visuals</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Photo Gallery Highlights
          </h2>
          <div className="h-1 w-20 bg-gold mx-auto rounded" />
          <p className="text-sm text-navy/70 leading-relaxed">
            Glance through recent photos and campus moments at Janhit College of Law.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-12 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto" />
            <p className="text-sm font-semibold text-navy/70">Loading gallery photos from API...</p>
          </div>
        ) : (
          /* Gallery 6-Photo Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className="bg-white rounded-2xl border border-gold/25 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between hover-lift"
              >
                {/* Image Container with Hover Overlay */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-navy/85 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider border border-gold/30">
                      {item.category}
                    </span>
                  </div>

                  {/* Zoom Hover Icon */}
                  <div className="absolute inset-0 bg-navy/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-3 rounded-full bg-gold text-navy-deep font-bold shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <h3 className="font-serif text-lg font-bold text-navy group-hover:text-gold transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  {item.date && (
                    <div className="pt-3 border-t border-gold/15 flex items-center gap-1.5 text-[11px] text-navy/60 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{item.date}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button Footer */}
        <div className="text-center pt-4">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-white font-bold text-sm hover:bg-gold hover:text-navy transition-all shadow-md group cursor-pointer"
          >
            <span>View All Gallery Photos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-navy/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative border border-gold/40 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-navy/70 text-white hover:bg-gold hover:text-navy transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative max-h-[65vh] bg-black overflow-hidden flex items-center justify-center">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title}
                className="w-full h-auto max-h-[65vh] object-contain"
              />
            </div>

            {/* Modal Details */}
            <div className="p-6 md:p-8 space-y-3 bg-white text-navy">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-gold/20 text-navy text-xs font-bold uppercase tracking-wider border border-gold/40">
                  {activeImage.category}
                </span>
                {activeImage.date && (
                  <span className="text-xs font-semibold text-navy/60">
                    Date: {activeImage.date}
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl font-bold text-navy">
                {activeImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
