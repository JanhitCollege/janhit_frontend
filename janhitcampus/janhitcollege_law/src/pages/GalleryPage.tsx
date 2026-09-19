import { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Calendar,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { galleryService, GalleryItem } from "@/services/galleryService";

const CATEGORIES = [
  "All",
  "Academics",
  "Events",
  "Infrastructure",
  "Sports",
  "Student Life",
  "Other",
];

// 5 rows x 4 columns = 20 items per page capacity
const ITEMS_PER_PAGE = 20;

export function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch gallery items strictly from backend API
  useEffect(() => {
    let isMounted = true;
    async function fetchGallery() {
      setLoading(true);
      try {
        const data = await galleryService.getPublicGallery({
          campusSlug: "janhit-college-of-law",
          category: selectedCategory === "All" ? undefined : selectedCategory,
          search: searchQuery || undefined,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        });

        if (isMounted) {
          setItems(data.items || []);
          setTotalItems(data.pagination.totalItems || 0);
          setTotalPages(data.pagination.totalPages || 1);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Failed to load gallery items from API:", err?.message);
          setItems([]);
          setTotalItems(0);
          setTotalPages(1);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGallery();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white min-h-screen py-10 md:py-16 text-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-10">
        
        {/* Page Title & Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <ImageIcon className="w-3.5 h-3.5 text-gold" />
            <span>Campus Media Showcase</span>
          </span>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy leading-tight">
            Photo & Activity Gallery
          </h1>
          <div className="h-1 w-24 bg-gold mx-auto rounded" />
          
          <p className="text-sm md:text-base text-navy/70 leading-relaxed">
            Take a visual tour of Janhit College of Law — featuring our modern moot courtroom, legal research labs, academic symposia, sports tournaments, and student life.
          </p>
        </div>

        {/* Filter Bar & Search Box */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gold/25 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-navy text-white shadow-md border border-navy"
                      : "bg-white text-navy/80 border border-gold/30 hover:border-gold hover:bg-gold/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
              <input
                type="text"
                placeholder="Search gallery photos..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gold/30 bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto" />
            <p className="text-sm font-semibold text-navy/70">Loading gallery photos from API...</p>
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="py-16 text-center bg-white rounded-2xl border border-gold/20 p-8 max-w-md mx-auto space-y-3">
            <ImageIcon className="w-12 h-12 text-gold/60 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-navy">No Photos Found</h3>
            <p className="text-xs text-navy/70">
              No gallery items matched your search query or filter selection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-navy text-white rounded-lg text-xs font-bold hover:bg-navy-deep transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Gallery Photo Grid - 4 Column Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className="bg-white rounded-2xl border border-gold/25 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between hover-lift"
              >
                {/* Image Container with Hover Overlay */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-navy/85 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider border border-gold/30">
                      {item.category}
                    </span>
                  </div>

                  {/* Zoom Hover Icon */}
                  <div className="absolute inset-0 bg-navy/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-gold text-navy-deep font-bold shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Card Info Content (Title & Date only - no description) */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <h3 className="font-serif text-base font-bold text-navy group-hover:text-gold transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  {item.date && (
                    <div className="pt-2.5 border-t border-gold/15 flex items-center gap-1.5 text-[11px] text-navy/60 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{item.date}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="pt-8 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-semibold text-navy/70">
              Showing Page <span className="text-navy font-bold">{currentPage}</span> of{" "}
              <span className="text-navy font-bold">{totalPages}</span> ({totalItems} total items)
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-gold/30 bg-white text-navy font-bold text-xs flex items-center gap-1 hover:bg-gold/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              {/* Number Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-navy text-white shadow"
                      : "bg-white border border-gold/30 text-navy hover:bg-gold/10"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-gold/30 bg-white text-navy font-bold text-xs flex items-center gap-1 hover:bg-gold/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Lightbox / Zoom Modal */}
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

      </div>
    </div>
  );
}
