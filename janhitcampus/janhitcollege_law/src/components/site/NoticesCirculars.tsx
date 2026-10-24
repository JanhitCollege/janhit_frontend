import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { newsNoticeService, NewsNoticeItem } from "@/services/newsNoticeService";
import {
  FileText,
  Download,
  Search,
  AlertCircle,
  ExternalLink,
  Calendar,
  Building,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

function formatPublishDate(dateStr?: string | null): string {
  if (!dateStr) return "Recent";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function NoticesCirculars() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<NewsNoticeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Urgent / Important", "Campus Circulars", "Group Notices", "Featured"];

  useEffect(() => {
    let isMounted = true;

    async function loadNotices() {
      try {
        setLoading(true);
        const data = await newsNoticeService.getLatestNotices("janhit-college-of-law", 10);
        if (isMounted) {
          setNotices(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setNotices([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadNotices();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredNotices = notices.filter((item) => {
    // Category match
    let matchesCategory = true;
    if (activeCategory === "Urgent / Important") {
      matchesCategory = item.priority === "HIGH";
    } else if (activeCategory === "Campus Circulars") {
      matchesCategory = item.visibility === "CAMPUS";
    } else if (activeCategory === "Group Notices") {
      matchesCategory = item.visibility === "GROUP";
    } else if (activeCategory === "Featured") {
      matchesCategory = Boolean(item.featured);
    }

    // Search query match
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      item.id.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const handleDownload = (notice: NewsNoticeItem) => {
    if (notice.attachment) {
      toast.success(`Opening circular: ${notice.title}`);
      window.open(notice.attachment, "_blank", "noopener,noreferrer");
    } else {
      toast.info(`Opening notice details: ${notice.title}`);
      navigate(`/news-notices`);
    }
  };

  return (
    <section id="notices-circulars" className="py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <FileText className="w-3.5 h-3.5 text-gold" />
            <span>Official Circulars</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Notices & University Circulars
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto rounded" />
          <p className="text-sm md:text-base text-navy/70 leading-relaxed">
            Authorized administrative, examination, and statutory notices issued by the Dean's Office, CCS University, and examination controllers.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-gold/25">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-navy text-white shadow-xs"
                    : "bg-white text-navy/70 border border-gold/20 hover:border-gold hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
            <input
              type="text"
              placeholder="Search circulars, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-gold/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-navy placeholder:text-navy/40"
            />
          </div>
        </div>

        {/* Notices Table / Card Deck */}
        <div className="bg-white rounded-3xl border border-gold/30 shadow-md overflow-hidden">
          <div className="divide-y divide-gold/15">
            {loading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="animate-pulse space-y-2 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-24 bg-slate-200 rounded" />
                      <div className="h-4 w-32 bg-slate-200 rounded" />
                    </div>
                    <div className="h-5 w-3/4 bg-slate-200 rounded" />
                    <div className="h-3 w-40 bg-slate-100 rounded" />
                  </div>
                ))}
              </div>
            ) : filteredNotices.length === 0 ? (
              <div className="py-14 text-center text-navy/60 text-sm space-y-2">
                <FileText className="w-8 h-8 text-gold/60 mx-auto" />
                <p className="font-semibold text-navy">No notices found matching your criteria.</p>
                <p className="text-xs text-navy/50">
                  New examination and administrative circulars will be displayed here as soon as they are issued.
                </p>
              </div>
            ) : (
              filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-5 md:p-6 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  {/* Left Column: Metadata & Title */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      {notice.priority === "HIGH" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold uppercase tracking-wider border border-red-200 animate-pulse">
                          <AlertCircle className="w-3 h-3" />
                          <span>Urgent Notice</span>
                        </span>
                      )}
                      <span className="font-mono font-bold text-navy bg-gold/15 px-2 py-0.5 rounded border border-gold/30">
                        NOTICE #{notice.id.slice(0, 8).toUpperCase()}
                      </span>
                      <span className="text-navy/60 font-medium">
                        Dept: {notice.visibility === "CAMPUS" ? "Janhit College of Law" : "Central Office"}
                      </span>
                      {notice.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-navy text-gold font-bold text-[10px] uppercase tracking-wider border border-gold/30">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-base md:text-lg font-bold text-navy group-hover:text-gold transition-colors leading-snug">
                      {notice.title}
                    </h3>

                    {notice.excerpt && (
                      <p className="text-xs text-navy/70 line-clamp-2 leading-relaxed">
                        {notice.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-xs text-navy/55 pt-1">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>Date of Notification: {formatPublishDate(notice.publishDate)}</span>
                    </div>
                  </div>

                  {/* Right Column: Download / View Action */}
                  <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
                    <button
                      onClick={() => handleDownload(notice)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-navy transition-all shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{notice.attachment ? "PDF Download" : "View Circular"}</span>
                    </button>
                    <Link
                      to="/news-notices?type=notice"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-gold/20 text-navy transition-colors"
                      title="View all circulars"
                    >
                      <ExternalLink className="w-4 h-4 text-navy/70" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="p-4 bg-slate-50 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-navy/70">
            <span>
              * Official notices are also displayed physically on the central campus notice board outside Room 102.
            </span>
            <Link
              to="/news-notices?type=notice"
              className="font-bold text-navy hover:text-gold transition-colors uppercase tracking-wider text-[11px]"
            >
              View All Official Circulars & Notices &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
