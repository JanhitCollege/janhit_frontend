import { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Newspaper,
  Calendar,
  FileText,
  Search,
  Download,
  Eye,
  ExternalLink,
  ChevronRight,
  Filter,
  ArrowRight,
  X,
  Building,
  Clock,
  Sparkles,
  AlertCircle,
  Share2,
  RefreshCw,
} from "lucide-react";
import {
  newsNoticeService,
  NewsNoticeItem,
  NewsNoticePagination,
} from "@/services/newsNoticeService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export function NewsNoticesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query States
  const typeParam = searchParams.get("type")?.toUpperCase() || "ALL";
  const slugParam = searchParams.get("slug") || "";

  // Data states
  const [items, setItems] = useState<NewsNoticeItem[]>([]);
  const [pagination, setPagination] = useState<NewsNoticePagination>({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"ALL" | "NEWS" | "NOTICE" | "FEATURED">(
    typeParam === "NEWS" || typeParam === "NOTICE" ? typeParam : "ALL"
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Selected announcement for detail modal
  const [selectedNotice, setSelectedNotice] = useState<NewsNoticeItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  // Sync tab with URL query parameter changes
  useEffect(() => {
    const t = searchParams.get("type")?.toUpperCase();
    if (t === "NEWS" || t === "NOTICE") {
      setActiveTab(t);
    } else {
      setActiveTab("ALL");
    }
  }, [searchParams]);

  // Fetch announcements from live API
  const fetchNewsNotices = async (page = 1) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const response = await newsNoticeService.getCampusNews({
        page,
        limit: 12,
        type: activeTab === "ALL" || activeTab === "FEATURED" ? "ALL" : activeTab,
        search: searchQuery.trim() || undefined,
      });

      setItems(response.newsNotices || []);
      setPagination(
        response.pagination || {
          total: response.newsNotices?.length || 0,
          page: 1,
          limit: 12,
          totalPages: Math.ceil((response.newsNotices?.length || 0) / 12) || 1,
        }
      );
    } catch (err: any) {
      console.error("Failed to load news & notices:", err);
      setIsError(true);
      setErrorMessage(err?.message || "Failed to load announcements from server.");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsNotices(currentPage);
  }, [activeTab, currentPage]);

  // If a slug param is present on load, fetch that specific item details
  useEffect(() => {
    if (slugParam) {
      const openBySlug = async () => {
        setIsLoadingDetail(true);
        try {
          const detail = await newsNoticeService.getNewsNoticeDetails(slugParam);
          setSelectedNotice(detail);
          setIsDetailOpen(true);
        } catch (err: any) {
          toast.error("Could not find the requested announcement.");
        } finally {
          setIsLoadingDetail(false);
        }
      };
      openBySlug();
    }
  }, [slugParam]);

  // Handle Search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchNewsNotices(1);
  };

  // Switch Tab
  const handleTabChange = (tab: "ALL" | "NEWS" | "NOTICE" | "FEATURED") => {
    setActiveTab(tab);
    setCurrentPage(1);
    if (tab === "NEWS" || tab === "NOTICE") {
      setSearchParams({ type: tab.toLowerCase() });
    } else {
      setSearchParams({});
    }
  };

  // Open modal for details
  const handleOpenNotice = async (item: NewsNoticeItem) => {
    setSelectedNotice(item);
    setIsDetailOpen(true);
    // Fetch full details if needed to record view count
    try {
      const full = await newsNoticeService.getNewsNoticeDetails(item.slug);
      if (full) {
        setSelectedNotice(full);
      }
    } catch (_) {
      // Ignore background view increment error
    }
  };

  // Share notice link
  const handleShare = (notice: NewsNoticeItem) => {
    const url = `${window.location.origin}/news-notices?slug=${encodeURIComponent(notice.slug)}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } else {
      toast.info(`Share link: ${url}`);
    }
  };

  // Filter items by search / featured tab on client side if API doesn't filter featured
  const displayedItems = useMemo(() => {
    let result = [...items];
    if (activeTab === "FEATURED") {
      result = result.filter((i) => i.featured);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.excerpt.toLowerCase().includes(q) ||
          i.slug.toLowerCase().includes(q)
      );
    }
    return result;
  }, [items, activeTab, searchQuery]);

  // Format Date helper
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "Recent";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-[#FAF9F6] text-navy min-h-screen">
      {/* 1. HERO BANNER */}
      <section className="relative py-16 md:py-20 bg-white text-navy border-b border-gold/30 overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-navy/60 mb-6 font-medium">
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold font-semibold">News & Notices</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30 shadow-xs">
              <Bell className="w-3.5 h-3.5 text-gold animate-bounce" />
              <span>Official Institutional Bulletin</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-navy leading-tight">
              News, Notices & <span className="text-gold">Official Circulars</span>
            </h1>

            <p className="text-navy/80 text-sm md:text-base leading-relaxed font-medium">
              Stay up to date with official announcements, CCS University examination schedules, Bar Council of
              India advisories, student activities, and moot court achievements at Janhit College of Law.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH TOOLBAR */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gold/20 shadow-xs py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => handleTabChange("ALL")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "ALL"
                  ? "bg-navy text-gold shadow-md border border-gold/40"
                  : "bg-slate-100 text-navy/70 hover:bg-slate-200"
              }`}
            >
              All Updates
            </button>
            <button
              onClick={() => handleTabChange("NOTICE")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === "NOTICE"
                  ? "bg-navy text-gold shadow-md border border-gold/40"
                  : "bg-slate-100 text-navy/70 hover:bg-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-gold" />
              <span>Official Notices</span>
            </button>
            <button
              onClick={() => handleTabChange("NEWS")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === "NEWS"
                  ? "bg-navy text-gold shadow-md border border-gold/40"
                  : "bg-slate-100 text-navy/70 hover:bg-slate-200"
              }`}
            >
              <Newspaper className="w-3.5 h-3.5 text-gold" />
              <span>Campus News</span>
            </button>
            <button
              onClick={() => handleTabChange("FEATURED")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === "FEATURED"
                  ? "bg-navy text-gold shadow-md border border-gold/40"
                  : "bg-slate-100 text-navy/70 hover:bg-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Featured</span>
            </button>
          </div>

          {/* Live Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notices, exams, circulars..."
              className="w-full bg-slate-50 border border-gold/30 hover:border-gold focus:border-gold rounded-xl pl-10 pr-24 py-2 text-xs sm:text-sm text-navy focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  fetchNewsNotices(1);
                }}
                className="absolute right-12 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-navy text-gold font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-navy-deep transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* 3. MAIN CONTENT AREA */}
      <section className="py-12 md:py-16 px-6 max-w-7xl mx-auto space-y-10">
        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gold/20 rounded-2xl p-6 shadow-sm space-y-4 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-20 rounded-md" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Skeleton className="h-4 w-16 rounded-md" />
                  <Skeleton className="h-8 w-28 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          /* Error State */
          <div className="bg-white border-2 border-red-200 rounded-3xl p-10 text-center max-w-xl mx-auto shadow-sm space-y-4">
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-navy">Unable to Load Announcements</h3>
            <p className="text-sm text-navy/70 leading-relaxed">
              {errorMessage || "We encountered an issue communicating with the institutional server."}
            </p>
            <button
              onClick={() => fetchNewsNotices(currentPage)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-gold font-bold text-xs uppercase tracking-wider hover:bg-navy-deep transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Connection</span>
            </button>
          </div>
        ) : displayedItems.length === 0 ? (
          /* Clean Empty State (No dummy data) */
          <div className="bg-white border border-gold/25 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm space-y-5">
            <div className="w-16 h-16 bg-gold/10 text-gold rounded-2xl flex items-center justify-center mx-auto border border-gold/30">
              <Bell className="w-8 h-8 text-gold" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-navy">No Announcements Found</h3>
              <p className="text-sm text-navy/70 leading-relaxed">
                {searchQuery
                  ? `No news or notices matched your query "${searchQuery}". Try searching for another keyword or clear the search filter.`
                  : activeTab !== "ALL"
                  ? `No ${activeTab.toLowerCase()} entries have been published in this category yet. Check back soon for official updates.`
                  : "All official circulars, examination schedules, and news updates will appear here once published."}
              </p>
            </div>
            {(searchQuery || activeTab !== "ALL") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleTabChange("ALL");
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy text-gold font-bold text-xs uppercase tracking-wider hover:bg-navy-deep transition-all shadow-sm"
              >
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item) => {
              const isNotice = item.type === "NOTICE";
              const hasAttachment = Boolean(item.attachment);
              const hasThumbnail = Boolean(item.thumbnail);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-gold/20 hover:border-gold rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Top Badge Ribbon */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`rounded-lg px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            isNotice
                              ? "bg-amber-50 text-amber-900 border-amber-300"
                              : "bg-blue-50 text-blue-900 border-blue-300"
                          }`}
                        >
                          {item.type}
                        </Badge>

                        {item.priority === "HIGH" && (
                          <Badge className="bg-red-600 text-white border-0 text-[10px] font-bold uppercase px-2 py-0.5">
                            High Priority
                          </Badge>
                        )}

                        {item.featured && (
                          <span
                            className="text-gold"
                            title="Featured Announcement"
                          >
                            <Sparkles className="w-3.5 h-3.5 fill-gold" />
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-navy/50 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        <span>{formatDate(item.publishDate)}</span>
                      </div>
                    </div>

                    {/* Optional Thumbnail Image */}
                    {hasThumbnail && (
                      <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          src={item.thumbnail || ""}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}

                    {/* Title & Excerpt */}
                    <div className="space-y-2">
                      <h3
                        onClick={() => handleOpenNotice(item)}
                        className="font-serif font-bold text-lg text-navy group-hover:text-gold transition-colors leading-snug cursor-pointer line-clamp-2"
                        title={item.title}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-navy/70 leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom / Actions */}
                  <div className="pt-5 mt-4 border-t border-gold/15 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 text-navy/50 font-medium">
                      <span className="flex items-center gap-1" title="Total Views">
                        <Eye className="w-3.5 h-3.5 text-navy/40" />
                        <span>{item.viewCount || 0}</span>
                      </span>

                      {hasAttachment && (
                        <span
                          className="flex items-center gap-1 text-gold font-bold"
                          title="Official Document Attached"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleShare(item)}
                        className="p-1.5 text-navy/40 hover:text-gold rounded-lg hover:bg-gold/10 transition-colors"
                        title="Share Announcement"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleOpenNotice(item)}
                        className="inline-flex items-center gap-1 font-bold text-navy hover:text-gold transition-colors cursor-pointer"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* 4. SERVER PAGINATION */}
        {!isLoading && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-xl border border-gold/30 bg-white text-navy font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gold/10 transition-colors"
            >
              Previous
            </button>
            <span className="text-xs font-semibold text-navy/70 px-3">
              Page {currentPage} of {pagination.totalPages}
            </span>
            <button
              disabled={currentPage >= pagination.totalPages}
              onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
              className="px-4 py-2 rounded-xl border border-gold/30 bg-white text-navy font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gold/10 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* 5. INTERACTIVE DETAILS DIALOG MODAL */}
      <Dialog
        open={isDetailOpen}
        onOpenChange={(open) => {
          setIsDetailOpen(open);
          if (!open) {
            setSelectedNotice(null);
            // Clear slug param if modal closed
            if (searchParams.has("slug")) {
              const updated = new URLSearchParams(searchParams);
              updated.delete("slug");
              setSearchParams(updated);
            }
          }
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {selectedNotice && (
            <div className="space-y-6">
              <DialogHeader className="space-y-3 text-left">
                {/* Badges Bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`rounded-lg px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      selectedNotice.type === "NOTICE"
                        ? "bg-amber-50 text-amber-900 border-amber-300"
                        : "bg-blue-50 text-blue-900 border-blue-300"
                    }`}
                  >
                    {selectedNotice.type}
                  </Badge>

                  {selectedNotice.priority === "HIGH" && (
                    <Badge className="bg-red-600 text-white border-0 text-[10px] font-bold uppercase px-2 py-0.5">
                      High Priority Notice
                    </Badge>
                  )}

                  {selectedNotice.featured && (
                    <Badge className="bg-gold text-navy-deep font-bold text-[10px] uppercase border-0">
                      Featured
                    </Badge>
                  )}

                  <span className="text-xs text-navy/50 font-medium ml-auto flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>{formatDate(selectedNotice.publishDate)}</span>
                  </span>
                </div>

                <DialogTitle className="text-2xl sm:text-3xl font-serif font-bold text-navy leading-snug">
                  {selectedNotice.title}
                </DialogTitle>

                <DialogDescription className="text-sm font-medium text-navy/70 leading-relaxed border-l-2 border-gold pl-3 italic">
                  {selectedNotice.excerpt}
                </DialogDescription>
              </DialogHeader>

              {/* Optional Thumbnail */}
              {selectedNotice.thumbnail && (
                <div className="rounded-2xl overflow-hidden border border-gold/20 max-h-80 w-full bg-slate-100">
                  <img
                    src={selectedNotice.thumbnail}
                    alt={selectedNotice.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* HTML Description Body */}
              <div className="space-y-4 text-sm md:text-base text-navy/85 leading-relaxed font-sans prose prose-navy max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: selectedNotice.description }}
                  className="space-y-3"
                />
              </div>

              {/* Attachment Download Action */}
              {selectedNotice.attachment && (
                <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-navy text-gold flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-navy uppercase tracking-wider">
                        Official Document Attached
                      </h4>
                      <p className="text-xs text-navy/70 font-mono truncate max-w-xs sm:max-w-sm">
                        {selectedNotice.attachment.split("/").pop() || "official_circular.pdf"}
                      </p>
                    </div>
                  </div>

                  <a
                    href={selectedNotice.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-gold text-navy-deep font-bold text-xs uppercase tracking-wider hover:shadow-lg transition-all shadow-sm w-full sm:w-auto justify-center"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Attachment</span>
                  </a>
                </div>
              )}

              {/* Metadata / Campus Tagging Footer */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-navy/60">
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-gold" />
                  <span>
                    Scope:{" "}
                    <strong>
                      {selectedNotice.visibility === "CAMPUS"
                        ? "Janhit College of Law"
                        : "Group-Wide Announcement"}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-mono">
                    <Eye className="w-3.5 h-3.5 text-navy/40" />
                    <span>{selectedNotice.viewCount || 0} views</span>
                  </span>

                  <button
                    onClick={() => handleShare(selectedNotice)}
                    className="flex items-center gap-1 text-gold font-bold hover:underline cursor-pointer"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
