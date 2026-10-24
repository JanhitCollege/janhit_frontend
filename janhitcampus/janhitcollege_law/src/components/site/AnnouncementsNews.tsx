import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { newsNoticeService, NewsNoticeItem } from "@/services/newsNoticeService";
import {
  Bell,
  Newspaper,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  X,
  Volume2,
  MapPin,
  Sparkles,
  BookOpen,
  Download,
  AlertCircle,
  Building,
} from "lucide-react";

function formatPublishDate(dateStr?: string | null): string {
  if (!dateStr) return "Recent";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function AnnouncementsNews() {
  const [newsList, setNewsList] = useState<NewsNoticeItem[]>([]);
  const [tickerItems, setTickerItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeArticle, setActiveArticle] = useState<NewsNoticeItem | null>(null);

  const filters = ["All", "Campus News", "Featured", "High Priority"];

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        // Fetch latest news and notices concurrently
        const [newsData, noticesData] = await Promise.allSettled([
          newsNoticeService.getLatestNews("janhit-college-of-law", 8),
          newsNoticeService.getLatestNotices("janhit-college-of-law", 5),
        ]);

        if (!isMounted) return;

        const liveNews: NewsNoticeItem[] =
          newsData.status === "fulfilled" && Array.isArray(newsData.value) ? newsData.value : [];
        const liveNotices: NewsNoticeItem[] =
          noticesData.status === "fulfilled" && Array.isArray(noticesData.value) ? noticesData.value : [];

        setNewsList(liveNews);

        // Derive ticker announcements from live high-priority items, notices, and news
        const tickerTitles: string[] = [];
        liveNotices.forEach((n) => {
          if (n.title) tickerTitles.push(n.title);
        });
        liveNews.forEach((n) => {
          if (n.priority === "HIGH" && n.title && !tickerTitles.includes(n.title)) {
            tickerTitles.push(n.title);
          }
        });
        if (tickerTitles.length === 0) {
          liveNews.forEach((n) => {
            if (n.title && !tickerTitles.includes(n.title)) {
              tickerTitles.push(n.title);
            }
          });
        }

        if (tickerTitles.length === 0) {
          tickerTitles.push(
            "Welcome to Janhit College of Law • Official Campus News & Notices",
            "Admissions Open for B.A.LL.B (5 Years) & LL.B (3 Years) Programs",
            "State-of-the-Art Replica Moot Court & Legal Aid Clinic Outreach"
          );
        }

        setTickerItems(tickerTitles);
      } catch (_) {
        if (isMounted) {
          setNewsList([]);
          setTickerItems([
            "Welcome to Janhit College of Law • Official Campus Bulletins",
            "Admissions Open for Academic Session 2026-27",
          ]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredNews = newsList.filter((item) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Campus News") return item.visibility === "CAMPUS" || item.type === "NEWS";
    if (selectedFilter === "Featured") return Boolean(item.featured);
    if (selectedFilter === "High Priority") return item.priority === "HIGH";
    return true;
  });

  return (
    <section id="news-announcements" className="relative py-16 md:py-24 bg-white border-b border-gold/20 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-80 h-80 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-10 md:space-y-12 relative z-10">
        {/* Urgent Announcements Running Ticker */}
        <div className="rounded-2xl bg-navy border border-gold/30 shadow-md p-3 md:p-4 flex flex-col md:flex-row items-stretch md:items-center gap-4 text-white">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-gold text-navy-deep font-bold text-xs uppercase tracking-wider shrink-0 w-max shadow">
            <Volume2 className="w-4 h-4 text-navy-deep animate-pulse" />
            <span>Announcements</span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
              {tickerItems.concat(tickerItems).map((ann, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span>{ann}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30 shadow-xs">
            <Newspaper className="w-3.5 h-3.5 text-gold" />
            <span>Campus Journalism & Bulletins</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy tracking-tight">
            News & Updates
          </h2>

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <p className="text-sm md:text-base text-navy/70 leading-relaxed max-w-2xl mx-auto">
            Stay abreast of the latest legal seminars, moot court triumphs, academic notifications, and social outreach milestones.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedFilter === filter
                  ? "bg-navy text-white shadow-md border border-navy"
                  : "bg-white text-navy/70 border border-gold/25 hover:border-gold hover:text-navy hover:bg-gold/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* News Cards Grid / Skeleton Loading / Empty State */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-gold/20 p-6 shadow-xs animate-pulse space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="h-5 w-20 bg-slate-200 rounded-full" />
                  <div className="h-4 w-12 bg-slate-200 rounded-full" />
                </div>
                <div className="h-6 w-full bg-slate-200 rounded" />
                <div className="h-4 w-3/4 bg-slate-200 rounded" />
                <div className="space-y-2 pt-2">
                  <div className="h-3 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-5/6 bg-slate-100 rounded" />
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="h-3 w-16 bg-slate-200 rounded" />
                  <div className="h-3 w-16 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="bg-slate-50 rounded-3xl border border-gold/30 p-10 text-center space-y-4 max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-gold/15 text-navy flex items-center justify-center mx-auto border border-gold/30">
              <Newspaper className="w-7 h-7 text-gold" />
            </div>
            <h3 className="font-serif text-xl font-bold text-navy">No News Updates Available</h3>
            <p className="text-xs sm:text-sm text-navy/65 leading-relaxed">
              There are currently no active news articles published in this category. You can explore all official circulars and campus notices.
            </p>
            <div className="pt-2">
              <Link
                to="/news-notices"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white hover:bg-gold hover:text-navy text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>View All Notices & Circulars</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNews.map((news) => (
              <div
                key={news.id}
                onClick={() => setActiveArticle(news)}
                className="bg-white rounded-2xl border border-gold/25 p-6 shadow-sm hover:shadow-xl hover:border-gold/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer group relative overflow-hidden"
              >
                {/* Top hairline accent on hover */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-navy text-[11px] font-bold uppercase tracking-wider border border-gold/30">
                      {news.visibility === "CAMPUS" ? "Campus News" : "Group News"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {news.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-navy text-gold text-[10px] font-bold uppercase tracking-wider border border-gold/30">
                          Featured
                        </span>
                      )}
                      {news.priority === "HIGH" && (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider border border-red-200">
                          Urgent
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl md:text-[22px] font-bold text-navy group-hover:text-gold transition-colors line-clamp-2 leading-snug tracking-tight">
                    {news.title}
                  </h3>

                  <p className="text-xs text-navy/70 leading-relaxed line-clamp-3">
                    {news.excerpt ||
                      (news.description
                        ? news.description.replace(/<[^>]+>/g, "").slice(0, 140)
                        : "Click to read full article...")}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gold/15 flex items-center justify-between text-[11px] text-navy/60 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{formatPublishDate(news.publishDate)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gold font-bold group-hover:translate-x-0.5 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Live News & Notices CTA */}
        <div className="flex justify-center pt-4">
          <Link
            to="/news-notices"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-gold hover:bg-gold hover:text-navy-deep font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
          >
            <span>Explore All News & Official Notices</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gold/40 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-navy text-white px-6 py-5 flex items-center justify-between border-b border-gold/30 shadow-md">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-gold text-navy-deep font-bold text-[10px] uppercase tracking-wider">
                  {activeArticle.type === "NEWS" ? "Campus News" : "Official Notice"}
                </span>
                {activeArticle.featured && (
                  <span className="px-2.5 py-0.5 rounded-full bg-gold/20 border border-gold text-gold font-bold text-[10px] uppercase tracking-wider">
                    Featured
                  </span>
                )}
                {activeArticle.priority === "HIGH" && (
                  <span className="px-2.5 py-0.5 rounded-full bg-red-900/60 border border-red-400 text-red-200 font-bold text-[10px] uppercase tracking-wider">
                    High Priority
                  </span>
                )}
                <span className="text-xs text-white/70">
                  {formatPublishDate(activeArticle.publishDate)}
                </span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-navy transition-colors cursor-pointer shrink-0 ml-2"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Optional Thumbnail Image */}
              {activeArticle.thumbnail && (
                <div className="w-full rounded-2xl overflow-hidden border border-gold/25 shadow">
                  <img
                    src={activeArticle.thumbnail}
                    alt={activeArticle.title}
                    className="w-full max-h-72 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              )}

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-navy/70 border-y border-gold/15 py-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  <span>Published: {formatPublishDate(activeArticle.publishDate)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-gold" />
                  <span>
                    Scope: {activeArticle.visibility === "CAMPUS" ? "Janhit College of Law" : "Group of Institutions"}
                  </span>
                </div>
                {activeArticle.viewCount !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-gold" />
                    <span>{activeArticle.viewCount} Views</span>
                  </div>
                )}
              </div>

              {/* Summary Highlight Card */}
              {activeArticle.excerpt && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gold/10 border border-gold/30 text-sm text-navy/85 leading-relaxed font-medium">
                  "{activeArticle.excerpt}"
                </div>
              )}

              {/* Formatted Article Body */}
              <div className="space-y-4 pt-2">
                {(activeArticle.description || "").split("\n\n").map((chunk, idx) => {
                  const trimmed = chunk.trim();
                  if (!trimmed) return null;

                  // Headings
                  const isNumbered = /^[0-9]\.\s+[A-Za-z0-9\s,&–—':()]+$/.test(trimmed);
                  const isShortTitle =
                    trimmed.length < 80 &&
                    !trimmed.endsWith(".") &&
                    !trimmed.includes("\n") &&
                    !trimmed.startsWith("•") &&
                    !trimmed.startsWith("Institution:") &&
                    !trimmed.startsWith("Address:") &&
                    !trimmed.startsWith("Enquiry:") &&
                    !trimmed.startsWith("Contact:");

                  if (isNumbered || isShortTitle) {
                    return (
                      <h4
                        key={idx}
                        className="font-serif font-bold text-navy text-lg sm:text-xl pt-3 pb-1 border-b border-gold/20"
                      >
                        {trimmed}
                      </h4>
                    );
                  }

                  // Bullet lists
                  if (trimmed.includes("•")) {
                    const lines = trimmed.split("\n").filter((l) => l.trim().length > 0);
                    return (
                      <ul key={idx} className="space-y-2 py-1 pl-1">
                        {lines.map((line, lineIdx) => (
                          <li
                            key={lineIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-navy/80 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                            <span>{line.replace(/^[•\-*]\s*/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  // Institutional contact block
                  if (
                    trimmed.includes("Institution:") ||
                    trimmed.includes("Address:") ||
                    trimmed.includes("Contact:") ||
                    trimmed.includes("Enquiry:")
                  ) {
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 border border-gold/25 space-y-1 text-xs text-navy/80"
                      >
                        {trimmed.split("\n").map((contactLine, clIdx) => (
                          <div key={clIdx} className="font-sans">
                            {contactLine}
                          </div>
                        ))}
                      </div>
                    );
                  }

                  // Standard paragraph
                  return (
                    <p
                      key={idx}
                      className="text-xs sm:text-sm text-navy/80 leading-relaxed whitespace-pre-line"
                    >
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* Optional Attachment Download */}
              {activeArticle.attachment && (
                <div className="pt-2">
                  <a
                    href={activeArticle.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-gold hover:bg-gold hover:text-navy text-xs font-bold uppercase tracking-wider transition-all shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Attached Document</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-navy/60">
                  Janhit College of Law • Official Campus Bulletin
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-xl bg-navy text-white font-bold text-xs uppercase tracking-wider hover:bg-gold hover:text-navy transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
