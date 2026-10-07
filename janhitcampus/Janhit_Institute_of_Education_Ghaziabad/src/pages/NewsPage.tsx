import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { NEWS_DATA, NewsItem } from "@/data/lifeData";

const categories = ["All", "Academic", "Achievement", "Announcement", "Campus Life"];

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredNews = NEWS_DATA.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <>
      <SEO
        title="College News & Notices | Janhit Degree College Saharanpur"
        description="Latest news, academic announcements, CCS University merit lists, and campus notices from Janhit Degree College Saharanpur."
      />

      <Breadcrumb
        title="College News & Announcements"
        items={[{ label: "News & Updates" }]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "gradient-gold text-navy-deep shadow"
                    : "bg-slate-100 text-navy hover:bg-gold/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* News List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredNews.map((item: NewsItem) => (
              <div
                key={item.id}
                className="bg-beige/30 p-6 rounded-xl border border-gold/20 shadow-sm hover-lift flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-navy">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-navy/70 pt-1">
                    <span className="font-bold text-gold flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      <span>{item.category}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-navy/50" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-navy hover:text-gold transition-colors">
                    <Link to={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>

                  <p className="text-xs md:text-sm text-navy/75 leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-gold/15">
                  <Link
                    to={`/news/${item.slug}`}
                    className="text-xs font-bold text-navy hover:text-gold transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Story</span>
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
