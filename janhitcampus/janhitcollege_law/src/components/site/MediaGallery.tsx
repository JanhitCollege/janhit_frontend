import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  GALLERY_VIDEOS,
  GalleryVideo,
} from "@/data/homeData";
import { galleryService, GalleryItem } from "@/services/galleryService";
import {
  Image as ImageIcon,
  Video,
  ZoomIn,
  Play,
  Calendar,
  ArrowRight,
  X,
  Layers,
} from "lucide-react";

export function MediaGallery() {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [photoItems, setPhotoItems] = useState<GalleryItem[]>([]);
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>("All");
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);

  // Fetch from API - no dummy fallback
  useEffect(() => {
    let isMounted = true;
    async function loadApiPhotos() {
      try {
        const data = await galleryService.getPublicGallery({
          campusSlug: "janhit-college-of-law",
          limit: 12,
          page: 1,
        });
        if (isMounted && data.items && data.items.length > 0) {
          setPhotoItems(data.items);
        }
      } catch (err) {
        if (isMounted) setPhotoItems([]);
      }
    }
    loadApiPhotos();
    return () => {
      isMounted = false;
    };
  }, []);

  const photoCategories = useMemo(() => {
    const cats = Array.from(new Set(photoItems.map((p) => p.category).filter(Boolean)));
    return ["All", ...cats];
  }, [photoItems]);

  const filteredPhotos =
    selectedPhotoCategory === "All"
      ? photoItems
      : photoItems.filter((p) => p.category.toLowerCase() === selectedPhotoCategory.toLowerCase());

  return (
    <section id="media-gallery" className="py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <ImageIcon className="w-3.5 h-3.5 text-gold" />
            <span>Campus Moments</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Photo & Video Gallery
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto rounded" />
          <p className="text-sm md:text-base text-navy/70 leading-relaxed">
            Witness the energy of our courtroom sessions, legal outreach camps, student seminars, and vibrant academic life in Greater Noida.
          </p>
        </div>

        {/* Media Type Switcher: Photos vs Videos */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-gold/30">
            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "photos"
                  ? "bg-navy text-white shadow-md"
                  : "text-navy/70 hover:text-navy hover:bg-gold/10"
              }`}
            >
              <ImageIcon className="w-4 h-4 text-gold" />
              <span>Photo Gallery</span>
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "videos"
                  ? "bg-navy text-white shadow-md"
                  : "text-navy/70 hover:text-navy hover:bg-gold/10"
              }`}
            >
              <Video className="w-4 h-4 text-gold" />
              <span>Video Tours & Moot Sessions</span>
            </button>
          </div>
        </div>

        {/* PHOTO TAB VIEW */}
        {activeTab === "photos" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Photo Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {photoCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedPhotoCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedPhotoCategory === cat
                      ? "bg-gold text-navy-deep font-bold shadow-xs"
                      : "bg-white text-navy/70 border border-gold/25 hover:border-gold hover:text-navy"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  className="bg-white rounded-2xl border border-gold/25 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between hover-lift"
                >
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full bg-navy/85 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider border border-gold/30">
                        {photo.category}
                      </span>
                    </div>

                    {/* Hover Zoom Icon */}
                    <div className="absolute inset-0 bg-navy/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-3 rounded-full bg-gold text-navy-deep font-bold shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <ZoomIn className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <h3 className="font-serif text-base font-bold text-navy group-hover:text-gold transition-colors leading-snug line-clamp-2">
                      {photo.title}
                    </h3>

                    {photo.date && (
                      <div className="pt-2 border-t border-gold/15 flex items-center gap-1.5 text-[11px] text-navy/60 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{photo.date}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIDEO TAB VIEW */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-300">
            {GALLERY_VIDEOS.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="bg-white rounded-3xl border border-gold/25 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between hover-lift"
              >
                <div className="relative h-52 overflow-hidden bg-black">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gold/90 text-navy-deep flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-bold">
                    {video.duration}
                  </div>
                </div>

                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <h3 className="font-serif text-lg font-bold text-navy group-hover:text-gold transition-colors leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-navy/70 leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                  <div className="pt-3 border-t border-gold/15 flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider">
                    <span>Watch Video</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center pt-4">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-navy text-white font-bold text-xs uppercase tracking-wider hover:bg-gold hover:text-navy transition-all shadow-md group cursor-pointer"
          >
            <span>Explore Full Campus Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* PHOTO LIGHTBOX MODAL */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-navy/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative border border-gold/40 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-navy/70 text-white hover:bg-gold hover:text-navy transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[65vh] bg-black overflow-hidden flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="w-full h-auto max-h-[65vh] object-contain"
              />
            </div>

            <div className="p-6 md:p-8 space-y-2 bg-white text-navy">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-gold/20 text-navy text-xs font-bold uppercase tracking-wider border border-gold/40">
                  {activePhoto.category}
                </span>
                {activePhoto.date && (
                  <span className="text-xs font-semibold text-navy/60">
                    {activePhoto.date}
                  </span>
                )}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy">
                {activePhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-navy/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="bg-black rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative border border-gold/40 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 text-white hover:bg-gold hover:text-navy transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 bg-navy text-white space-y-1">
              <h3 className="font-serif text-xl font-bold text-white">
                {activeVideo.title}
              </h3>
              <p className="text-xs text-white/70">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
