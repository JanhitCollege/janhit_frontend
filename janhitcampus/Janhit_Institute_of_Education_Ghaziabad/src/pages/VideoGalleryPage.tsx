import { useState } from "react";
import { Play, Clock } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { VideoModal } from "@/components/site/VideoModal";
import { VIDEO_DATA, VideoItem } from "@/data/lifeData";

export function VideoGalleryPage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <>
      <SEO
        title="Video Gallery | Janhit Degree College Saharanpur"
        description="Watch official campus virtual tours, annual sports day events, and academic workshops at Janhit Degree College Saharanpur."
      />

      <Breadcrumb
        title="Campus Video Gallery"
        items={[
          { label: "Life at Janhit", path: "/life-at-janhit" },
          { label: "Video Gallery" },
        ]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIDEO_DATA.map((vid: VideoItem) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className="bg-white rounded-xl overflow-hidden border border-gold/20 shadow-md hover-lift cursor-pointer group"
              >
                {/* Thumbnail Container with Play Overlay */}
                <div className="relative aspect-video w-full bg-navy overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-navy/40 flex items-center justify-center">
                    <div className="p-4 bg-gold rounded-full text-navy-deep shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="h-7 w-7 fill-navy-deep stroke-none ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-semibold flex items-center gap-1">
                    <Clock className="h-3 w-3 text-gold" />
                    <span>{vid.duration}</span>
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg font-bold text-navy group-hover:text-gold transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-navy/70 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </>
  );
}
