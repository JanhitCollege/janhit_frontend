import { useParams, Link, Navigate } from "react";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { NEWS_DATA } from "@/data/lifeData";

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const item = NEWS_DATA.find((n) => n.slug === slug || n.id === slug);

  if (!item) {
    return <Navigate to="/news" replace />;
  }

  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    datePublished: item.date,
    author: {
      "@type": "Organization",
      name: "Janhit Degree College",
    },
  };

  return (
    <>
      <SEO
        title={`${item.title} | Janhit Degree College Saharanpur`}
        description={item.shortDescription}
        schema={newsSchema}
      />

      <Breadcrumb
        title={item.title}
        items={[
          { label: "News & Updates", path: "/news" },
          { label: item.category },
        ]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All News</span>
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs font-semibold text-navy/70">
              <span className="text-gold font-bold bg-gold/15 px-3 py-1 rounded border border-gold/30 flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" />
                <span>{item.category}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-navy/50" />
                <span>Published on {item.date}</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy leading-tight">
              {item.title}
            </h1>
            <div className="gold-divider w-24" />
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg border border-gold/20">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-80 md:h-96 object-cover"
            />
          </div>

          <div className="prose max-w-none text-navy/80 text-sm md:text-base leading-relaxed space-y-4">
            <p className="font-semibold text-navy text-base leading-relaxed">
              {item.shortDescription}
            </p>
            <p>{item.content}</p>
          </div>

          <div className="pt-8 border-t border-gold/20 flex justify-between items-center">
            <Link
              to="/news"
              className="px-5 py-2 rounded border border-gold/40 text-navy font-bold text-xs hover:bg-gold/10 transition-colors"
            >
              ← All News & Announcements
            </Link>

            <Link
              to="/admission"
              className="px-5 py-2 rounded gradient-gold text-navy-deep font-bold text-xs uppercase shadow"
            >
              Apply for Admission 2026
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
