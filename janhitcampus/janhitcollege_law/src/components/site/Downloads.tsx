import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Download, FileText, ArrowRight, Shield, Loader2, AlertCircle, Search } from "lucide-react";
import { downloadService, PublicDownload } from "@/services/downloadService";

const CATEGORY_LABELS: Record<string, string> = {
  ADMISSION_FORM: "Admission Form",
  BROCHURE: "Brochure",
  FEE_STRUCTURE: "Fee Structure",
  PROSPECTUS: "Prospectus",
  ACADEMIC_CALENDAR: "Academic Calendar",
  SYLLABUS: "Syllabus",
  EXAM_SCHEDULE: "Exam Schedule",
  NOTICE: "Notice",
  HOSTEL_FORM: "Hostel Form",
  SCHOLARSHIP_FORM: "Scholarship Form",
  PLACEMENT_BROCHURE: "Placement Brochure",
  MAGAZINE: "Magazine",
  OTHER: "Other",
};

interface DownloadsProps {
  isHomePage?: boolean;
  limit?: number;
}

export function Downloads({ isHomePage = false, limit }: DownloadsProps = {}) {
  const [downloads, setDownloads] = useState<PublicDownload[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  useEffect(() => {
    async function fetchDownloads() {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch public downloads with limit 100 to retrieve all live documents
        const res = await downloadService.getPublicDownloads({
          limit: 100,
        });
        setDownloads(res.downloads || []);
      } catch (err: any) {
        console.error("Failed to fetch public downloads:", err);
        setError(err.message || "Failed to load download documents.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchDownloads();
  }, []);

  const formatBytes = (bytes: number, decimals = 1) => {
    if (!bytes || bytes === 0) return "";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Filter downloads by search and category
  const filteredDownloads = downloads.filter((item) => {
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase().trim())) ||
      (item.fileName && item.fileName.toLowerCase().includes(searchQuery.toLowerCase().trim()));

    const matchesCategory =
      selectedCategory === "ALL" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const effectiveLimit = limit || (isHomePage ? 5 : undefined);
  const displayedDownloads = effectiveLimit
    ? filteredDownloads.slice(0, effectiveLimit)
    : filteredDownloads;

  // Extract available unique categories from fetched downloads
  const availableCategories = Array.from(
    new Set(downloads.map((d) => d.category).filter(Boolean))
  );

  return (
    <section id="downloads" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">
            Resources Hub
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">Downloads Center</h2>
          <div className="h-1 w-20 bg-gold mx-auto rounded" />
          <p className="text-sm text-navy/70">
            Quickly download syllabuses, college brochures, academic calendars, notices, and mandatory legal forms.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        {!isLoading && !error && downloads.length > 0 && (
          <div className="max-w-5xl mx-auto mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search Box */}
              <div className="relative w-full md:w-80 shrink-0">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-navy/40" />
                <input
                  type="text"
                  placeholder="Search document title or file..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:border-gold text-navy transition-all"
                />
              </div>

              {/* Categories Filter Tabs */}
              {availableCategories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-start md:justify-end w-full">
                  <button
                    onClick={() => setSelectedCategory("ALL")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                      selectedCategory === "ALL"
                        ? "bg-navy text-gold border-navy shadow-sm"
                        : "bg-white text-navy/70 border-slate-200 hover:bg-slate-50 hover:text-navy hover:border-slate-300"
                    }`}
                  >
                    All ({downloads.length})
                  </button>
                  {availableCategories.map((cat) => {
                    const count = downloads.filter((d) => d.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                          selectedCategory === cat
                            ? "bg-navy text-gold border-navy shadow-sm"
                            : "bg-white text-navy/70 border-slate-200 hover:bg-slate-50 hover:text-navy hover:border-slate-300"
                        }`}
                      >
                        {CATEGORY_LABELS[cat] || cat} ({count})
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Loader2 className="h-8 w-8 text-gold animate-spin" />
            <p className="text-xs font-medium text-navy/60">Loading download documents...</p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="p-8 text-center bg-red-50 border border-red-200 rounded-xl max-w-lg mx-auto flex flex-col items-center space-y-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <p className="text-sm font-semibold text-red-700">{error}</p>
          </div>
        ) : filteredDownloads.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center bg-white border border-slate-200 rounded-xl max-w-lg mx-auto flex flex-col items-center space-y-2 shadow-sm">
            <FileText className="h-10 w-10 text-navy/30" />
            <h3 className="font-serif text-base font-bold text-navy">No Downloads Found</h3>
            <p className="text-xs text-navy/60">
              {searchQuery || selectedCategory !== "ALL"
                ? "No documents match your filter criteria. Try clearing search or selecting another category."
                : "Check back later for updated course documents and forms."}
            </p>
          </div>
        ) : (
          /* Row-wise Downloads List */
          <div className="flex flex-col gap-3.5 max-w-5xl mx-auto">
            {displayedDownloads.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gold hover:shadow-md transition-all"
              >
                {/* Left Side: Icon & Document Details */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="p-3 bg-navy/5 text-gold rounded-lg shrink-0 border border-navy/10 mt-0.5">
                    <FileText className="h-6 w-6 text-gold" />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] bg-navy/5 text-navy font-bold border border-navy/15 px-2 py-0.5 rounded uppercase tracking-wider">
                        {CATEGORY_LABELS[item.category] || item.category}
                      </span>
                      {item.fileSize > 0 && (
                        <span className="text-[10px] text-navy/50 font-mono">
                          • {formatBytes(item.fileSize)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-base font-bold text-navy leading-snug">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-navy/60 leading-relaxed max-w-3xl">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Side: Download Button */}
                <div className="shrink-0 self-end sm:self-center">
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={item.fileName}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy text-gold hover:bg-gold hover:text-navy font-bold text-xs rounded-lg transition-all shadow-sm uppercase tracking-wider border border-navy"
                  >
                    <span>Download File</span>
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}

            {isHomePage && (
              <div className="text-center pt-6">
                <Link
                  to="/downloads"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-gold hover:bg-gold hover:text-navy font-bold text-sm transition-all shadow-md group cursor-pointer border border-navy"
                >
                  <span>View All Downloads</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* General Form downloads (admission query info) */}
        <div className="mt-12 bg-navy text-white p-8 rounded-2xl max-w-5xl mx-auto border border-navy-deep flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-lg md:text-xl font-bold text-gold flex items-center justify-center md:justify-start gap-2">
              <Shield className="h-5 w-5" />
              <span>Looking for Admissions Form?</span>
            </h4>
            <p className="text-xs text-white/70 max-w-md">
              You can instantly fill out our digital admission enquiry form below to secure your
              counseling seat. Our representatives will get back to you.
            </p>
          </div>
          <a
            href="#apply"
            className="px-6 py-3 bg-white text-navy-deep font-bold rounded-md text-xs tracking-wider uppercase hover:bg-gold hover:text-navy-deep transition-all shrink-0 shadow-md"
          >
            Apply Online <ArrowRight className="h-3.5 w-3.5 inline ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
