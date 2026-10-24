import { useState, useEffect, useMemo } from "react";
import {
  Building2,
  ZoomIn,
  X,
  Calendar,
  Loader2,
  Maximize2,
  Image as ImageIcon,
} from "lucide-react";
import { galleryService, GalleryItem } from "@/services/galleryService";

export function AboutInfrastructure() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  // Fetch strictly from the backend Gallery API (No dummy fallback images)
  useEffect(() => {
    let isMounted = true;
    async function fetchInfrastructureGallery() {
      setLoading(true);
      try {
        const data = await galleryService.getPublicGallery({
          campusSlug: "janhit-college-of-law",
          limit: 60,
          page: 1,
        });

        if (isMounted) {
          if (data && data.items && data.items.length > 0) {
            setItems(data.items);
          } else {
            setItems([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch gallery items from API:", err);
        if (isMounted) {
          setItems([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchInfrastructureGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  // Derive categories dynamically from the real API response only
  const categories = useMemo(() => {
    const uniqueCats = Array.from(
      new Set(items.map((item) => item.category).filter(Boolean))
    );
    return ["All", ...uniqueCats];
  }, [items]);

  // Filter items based on selected category (up to 12 items)
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return items.slice(0, 12);
    }
    return items
      .filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      )
      .slice(0, 12);
  }, [items, selectedCategory]);

  return (
    <section id="infrastructure" className="py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <Building2 className="w-3.5 h-3.5 text-gold" />
            <span>State-of-the-Art Facilities</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
            Campus Infrastructure
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/70 leading-relaxed font-sans">
            Visual glimpse into our replica Moot Court Hall, modern central law library, cyber lab, smart classrooms, and campus environment.
          </p>
        </div>

        {/* Dynamic Category Filter Pills (Derived solely from API data) */}
        {categories.length > 1 && (
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-gold/30 shadow-md flex-wrap justify-center gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-navy text-white shadow-md"
                      : "text-navy/70 hover:text-navy hover:bg-gold/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
            <p className="text-xs uppercase tracking-widest text-navy/60 font-semibold font-sans">
              Loading Campus Infrastructure Media from API...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Clean Empty State - No Dummy Images */
          <div className="text-center py-16 px-6 bg-slate-50 rounded-3xl border-2 border-dashed border-gold/30 max-w-xl mx-auto space-y-3">
            <ImageIcon className="w-10 h-10 text-gold/60 mx-auto" />
            <h3 className="font-serif font-bold text-navy text-lg">
              No Images Available in this Category
            </h3>
            <p className="text-xs text-navy/65 font-sans">
              Please select another category or check back later as new infrastructure photos are added to the live gallery.
            </p>
          </div>
        ) : (
          /* Live Images Grid from Gallery API */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className="group relative bg-white rounded-3xl overflow-hidden border-2 border-gold/30 hover:border-gold shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Container with Zoom Effect */}
                <div className="relative h-60 w-full overflow-hidden bg-navy/10">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Dark Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-navy/85 backdrop-blur-md text-gold font-bold text-[10px] uppercase tracking-wider border border-gold/40">
                      {item.category}
                    </span>
                    <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white group-hover:bg-gold group-hover:text-navy transition-all shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3.5 inset-x-3.5 space-y-1.5 text-white z-10">
                    {item.date && (
                      <div className="flex items-center gap-1.5 text-[10px] text-gold font-semibold uppercase tracking-wider font-sans">
                        <Calendar className="w-3 h-3 text-gold" />
                        <span>{item.date}</span>
                      </div>
                    )}
                    <h3 className="font-serif text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Subtle Card Footer */}
                <div className="p-4 bg-slate-50 border-t border-gold/15 flex items-center justify-between text-xs text-navy/70 font-sans">
                  <span className="font-medium truncate">{item.title}</span>
                  <span className="text-gold font-bold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
                    <span>View</span>
                    <ZoomIn className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Zoom Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-navy/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-gold/40 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-navy text-white px-6 py-4 flex items-center justify-between border-b border-gold/30">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold px-2.5 py-0.5 rounded-full bg-white/10 border border-gold/30">
                  {activeImage.category}
                </span>
                <span className="text-xs text-white/70 font-sans">
                  Campus Infrastructure Showcase
                </span>
              </div>
              <button
                onClick={() => setActiveImage(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-gold hover:text-navy transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="rounded-2xl overflow-hidden border border-gold/25 relative shadow-lg bg-navy/5">
                <img
                  src={activeImage.imageUrl}
                  alt={activeImage.title}
                  className="w-full max-h-[500px] object-contain mx-auto"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-navy">
                  {activeImage.title}
                </h3>
                {activeImage.date && (
                  <p className="text-xs text-gold font-semibold uppercase tracking-wider flex items-center gap-1.5 font-sans">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>{activeImage.date}</span>
                  </p>
                )}
                {activeImage.description && (
                  <p className="text-sm text-navy/80 leading-relaxed font-sans pt-2 border-t border-gold/15">
                    {activeImage.description}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-gold/20 bg-slate-50 rounded-b-3xl flex items-center justify-between">
              <span className="text-xs text-navy/60 font-sans">
                Janhit College of Law • Knowledge Park-1, Greater Noida
              </span>
              <button
                onClick={() => setActiveImage(null)}
                className="px-5 py-2 rounded-xl bg-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-navy-deep transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
