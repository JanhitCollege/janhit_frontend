import { useState } from "react";
import { Maximize2, Tag } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { GalleryLightbox } from "@/components/site/GalleryLightbox";
import { GALLERY_DATA, GalleryItem } from "@/data/lifeData";

const categories = ["All", "Campus", "Classroom", "Events", "Activities", "Infrastructure", "Sports"];

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_DATA.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <>
      <SEO
        title="Photo Gallery | Janhit Degree College Saharanpur"
        description="Explore photo gallery of Janhit Degree College Saharanpur. Highlighting campus infrastructure, classrooms, labs, library, athletic sports, and cultural festivals."
      />

      <Breadcrumb
        title="Campus Photo Gallery"
        items={[
          { label: "Life at Janhit", path: "/life-at-janhit" },
          { label: "Image Gallery" },
        ]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "gradient-gold text-navy-deep shadow"
                    : "bg-beige/60 text-navy hover:bg-gold/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item: GalleryItem, idx: number) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="bg-beige/30 rounded-xl overflow-hidden border border-gold/20 shadow-sm hover-lift cursor-pointer group relative"
              >
                <div className="relative aspect-video sm:aspect-square overflow-hidden bg-navy">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm text-white">
                      <Maximize2 className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gold flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    <span>{item.category}</span>
                  </span>
                  <h3 className="font-serif text-base font-bold text-navy group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-navy/70 line-clamp-2">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <GalleryLightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % filteredItems.length : null
          )
        }
      />
    </>
  );
}
