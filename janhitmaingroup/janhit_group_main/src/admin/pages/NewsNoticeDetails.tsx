import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Edit2,
  Calendar,
  Building,
  ArrowLeft,
  Eye,
  FileDown,
  User,
  Star,
  Activity,
  AlertCircle,
  Hash,
  Download,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getStoredNewsNotices, saveNewsNotices, NewsNotice } from "@/data/newsNotices";
import { getStoredCampuses } from "@/data/campuses";
import { toast } from "sonner";

interface NewsNoticeDetailsProps {
  id: string;
}

export const NewsNoticeDetails: React.FC<NewsNoticeDetailsProps> = ({ id }) => {
  const navigate = useNavigate();

  const [record, setRecord] = useState<NewsNotice | null>(null);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load record and increment view count
  useEffect(() => {
    const list = getStoredNewsNotices();
    const foundIdx = list.findIndex((r) => r.id === id);
    if (foundIdx !== -1) {
      const found = list[foundIdx];
      // Increment view count on details page load
      const updatedRecord = {
        ...found,
        viewCount: found.viewCount + 1,
      };

      const updatedList = [...list];
      updatedList[foundIdx] = updatedRecord;

      setRecord(updatedRecord);
      saveNewsNotices(updatedList);
      setCampuses(getStoredCampuses());
    } else {
      setErrorMsg("Announcement not found. It may have been deleted or the ID is invalid.");
    }
  }, [id]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  // Simulating downloading the attachment
  const handleDownload = () => {
    if (!record) return;

    const list = getStoredNewsNotices();
    const foundIdx = list.findIndex((r) => r.id === id);
    if (foundIdx !== -1) {
      const updatedRecord = {
        ...record,
        downloadCount: record.downloadCount + 1,
      };
      const updatedList = [...list];
      updatedList[foundIdx] = updatedRecord;

      setRecord(updatedRecord);
      saveNewsNotices(updatedList);

      // Simulate file download
      toast.success(`Downloading attachment: ${record.attachmentName}`);

      // In a real application, this would trigger window.open or a link download.
    }
  };

  const getCampusNamesList = (ids: string[]) => {
    if (!ids || ids.length === 0) return [];
    return ids.map((id) => campuses.find((c) => c.id === id)?.name || id);
  };

  return (
    <div className="p-4 md:p-6 flex flex-col flex-grow space-y-6 relative">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 size-[400px] bg-gradient-gold opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-primary opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Breadcrumbs */}
      <div className="mb-2 z-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/@admin/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/@admin/news">News & Notices</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {errorMsg ? (
        <div className="glass rounded-2xl p-8 border border-destructive/20 bg-destructive/5 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-12 z-10 animate-in fade-in">
          <AlertCircle className="size-12 text-destructive mb-3" />
          <h2 className="font-display text-lg font-bold text-foreground">Details Unavailable</h2>
          <p className="text-sm text-muted-foreground mt-2">{errorMsg}</p>
          <Link
            to="/@admin/news"
            className="mt-6 text-sm font-semibold text-primary hover:underline hover:text-gold transition-colors"
          >
            Back to Listing
          </Link>
        </div>
      ) : record ? (
        <div className="space-y-6 z-10">
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-xl border-border bg-background hover:bg-accent"
                asChild
              >
                <Link to="/@admin/news">
                  <ArrowLeft className="size-4" />
                </Link>
              </Button>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                  Announcement Profile
                </span>
                <h1
                  className="font-display text-xl md:text-2xl font-bold text-foreground max-w-[500px] truncate"
                  title={record.title}
                >
                  {record.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                className="rounded-xl border-border bg-background hover:bg-accent flex-1 sm:flex-initial text-sm"
                asChild
              >
                <Link to="/@admin/news">Back to List</Link>
              </Button>
              <Button
                className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 flex items-center justify-center gap-1.5 shadow-sm text-sm flex-1 sm:flex-initial"
                asChild
              >
                <Link to="/@admin/news/$id/edit" params={{ id: record.id }}>
                  <Edit2 className="size-3.5" /> Edit Details
                </Link>
              </Button>
            </div>
          </div>

          {/* 3-Column Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left & Middle Column (2 spans) - Core Content & Excerpt */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main glass card: Content Details */}
              <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-6">
                {/* Header section with badges */}
                <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-border/40">
                  {/* Type */}
                  <Badge
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      record.type === "news"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-purple-100 text-purple-800 border-purple-200"
                    }`}
                  >
                    {record.type}
                  </Badge>

                  {/* Status */}
                  <Badge
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      record.status === "published"
                        ? "bg-green-150 text-green-700 border-green-200"
                        : record.status === "draft"
                          ? "bg-gray-100 text-gray-700 border-gray-200"
                          : "bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    {record.status}
                  </Badge>

                  {/* Priority */}
                  <Badge
                    variant="outline"
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      record.priority === "high"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : record.priority === "medium"
                          ? "bg-orange-50 text-orange-700 border-orange-200"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {record.priority} Priority
                  </Badge>

                  {/* Featured */}
                  {record.featured === "yes" && (
                    <Badge className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-white border-transparent flex items-center gap-1">
                      <Star className="size-2.5 fill-white" /> Featured
                    </Badge>
                  )}

                  {/* Visibility */}
                  <Badge
                    variant="outline"
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      record.visibility === "group"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-sky-50 text-sky-700 border-sky-200"
                    }`}
                  >
                    {record.visibility === "group" ? "Group-wide" : "Campus Specific"}
                  </Badge>
                </div>

                {/* Excerpt Section */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/60">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    Teaser Excerpt
                  </span>
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    {record.excerpt}
                  </p>
                </div>

                {/* Main Body text */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Description
                  </span>
                  <div
                    className="text-sm text-foreground/90 leading-relaxed font-sans prose prose-sm max-w-none space-y-4"
                    dangerouslySetInnerHTML={{ __html: record.description }}
                  />
                </div>
              </div>

              {/* Attachment Preview Card */}
              {record.attachmentName && (
                <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
                  <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                    <FileDown className="size-4 text-primary" /> Attachment Document
                  </h3>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-xl bg-background/50 border">
                    <div className="flex items-center gap-3">
                      <div className="size-11 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                        <FileDown className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-foreground block truncate max-w-[280px]">
                          {record.attachmentName}
                        </span>
                        <span className="text-xs text-muted-foreground block font-mono">
                          Size: {record.attachmentSize || "—"}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={handleDownload}
                      className="rounded-lg bg-primary text-primary-foreground font-semibold px-4 hover:bg-primary/95 text-xs h-9 flex items-center gap-1.5 w-full sm:w-auto justify-center"
                    >
                      <Download className="size-3.5" /> Download PDF
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Thumbnail, Scheduling & Stats */}
            <div className="space-y-6">
              {/* Thumbnail Display Card */}
              <div className="glass rounded-2xl overflow-hidden border border-border/80 shadow-sm flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-6 pt-5 pb-2 block">
                  Post Thumbnail
                </span>
                <div className="aspect-video w-full border-y border-border/40 relative bg-muted overflow-hidden">
                  {record.thumbnail ? (
                    <img
                      src={record.thumbnail}
                      alt="Post Thumbnail"
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="size-full bg-gradient-gold text-gold-foreground flex items-center justify-center font-bold text-2xl select-none">
                      {record.title
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="p-4 bg-muted/10 text-center">
                  <span className="text-[10px] font-semibold text-muted-foreground font-mono truncate block max-w-full">
                    Slug: {record.slug}
                  </span>
                </div>
              </div>

              {/* Mapped Campuses (Conditional display) */}
              {record.visibility === "campus" && (
                <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
                  <h3 className="font-display text-sm font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-1.5">
                    <Building className="size-4 text-primary" /> Mapped Campuses
                  </h3>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {getCampusNamesList(record.campusIds).map((cName, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="rounded-lg px-2.5 py-1 text-[10px] font-medium text-foreground bg-accent/40 border-border"
                      >
                        {cName}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Scheduling Card */}
              <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
                <h3 className="font-display text-sm font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-1.5">
                  <Calendar className="size-4 text-primary" /> Scheduling Timings
                </h3>

                <div className="space-y-3.5 pt-1 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">
                      Publish Date
                    </span>
                    <span className="font-semibold text-foreground">
                      {formatDate(record.publishDate)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">
                      Expiry Date
                    </span>
                    <span className="font-semibold text-foreground">
                      {record.expiryDate ? formatDate(record.expiryDate) : "Never Expires"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Metadata & Stat Card */}
              <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
                <h3 className="font-display text-sm font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-1.5">
                  <Activity className="size-4 text-primary" /> Analytics & Logs
                </h3>

                <div className="space-y-3.5 pt-1 text-xs">
                  {/* Grid for counters */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-background/50 border border-border/60 text-center">
                      <Eye className="size-4 text-muted-foreground mx-auto mb-1" />
                      <span className="font-mono text-base font-bold text-foreground">
                        {record.viewCount}
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wider block mt-0.5">
                        Views
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-background/50 border border-border/60 text-center">
                      <Download className="size-4 text-muted-foreground mx-auto mb-1" />
                      <span className="font-mono text-base font-bold text-foreground">
                        {record.downloadCount}
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wider block mt-0.5">
                        Downloads
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-3 space-y-2">
                    <div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                        Created By
                      </span>
                      <span className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                        <User className="size-3 text-muted-foreground" /> {record.createdBy}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                        Created Date
                      </span>
                      <span className="font-semibold text-foreground">
                        {formatDate(record.createdDate)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                        Last Updated
                      </span>
                      <span className="font-semibold text-foreground">
                        {formatDate(record.updatedDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO Tags Card */}
              {(record.metaTitle || record.metaDescription || record.metaKeywords) && (
                <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
                  <h3 className="font-display text-sm font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-1.5">
                    <Hash className="size-4 text-primary" /> SEO Tags
                  </h3>

                  <div className="space-y-3.5 pt-1 text-xs leading-relaxed">
                    {record.metaTitle && (
                      <div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                          Meta Title
                        </span>
                        <span className="font-medium text-foreground block mt-0.5">
                          {record.metaTitle}
                        </span>
                      </div>
                    )}
                    {record.metaDescription && (
                      <div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                          Meta Description
                        </span>
                        <p className="text-muted-foreground block mt-0.5">
                          {record.metaDescription}
                        </p>
                      </div>
                    )}
                    {record.metaKeywords && (
                      <div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                          Meta Keywords
                        </span>
                        <span className="font-mono text-foreground block mt-0.5 bg-muted/60 p-1.5 rounded border border-border/60">
                          {record.metaKeywords}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center py-20">
          <span className="text-sm text-muted-foreground">Loading announcement details...</span>
        </div>
      )}
    </div>
  );
};
