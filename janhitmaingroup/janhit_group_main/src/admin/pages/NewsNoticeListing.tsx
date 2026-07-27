import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Filter,
  RotateCcw,
  Newspaper,
  Calendar,
  Building,
  EyeOff,
  Star,
  FileDown,
  ArrowUpDown,
  AlertCircle,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { getStoredNewsNotices, saveNewsNotices, NewsNotice } from "@/data/newsNotices";
import { getStoredCampuses } from "@/data/campuses";

export const NewsNoticeListing: React.FC = () => {
  // Database state
  const [records, setRecords] = useState<NewsNotice[]>([]);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterVisibility, setFilterVisibility] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterFeatured, setFilterFeatured] = useState<string>("all");
  const [filterCampus, setFilterCampus] = useState<string>("all");
  const [filterPublishDate, setFilterPublishDate] = useState<string>("");

  // Sort state
  const [sortBy, setSortBy] = useState<
    "publishDate" | "createdDate" | "title" | "viewCount" | "downloadCount"
  >("publishDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<NewsNotice | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Load records
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecords(getStoredNewsNotices());
      setCampuses(getStoredCampuses());
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Format Helper
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
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

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterType("all");
    setFilterVisibility("all");
    setFilterStatus("all");
    setFilterPriority("all");
    setFilterFeatured("all");
    setFilterCampus("all");
    setFilterPublishDate("");
    setCurrentPage(1);
    toast.success("Filters reset successfully");
  };

  // Delete handlers
  const openDeleteModal = (record: NewsNotice) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!recordToDelete) return;
    setIsDeleting(true);

    // Simulate short network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updated = records.filter((r) => r.id !== recordToDelete.id);
    setRecords(updated);
    saveNewsNotices(updated);

    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
    toast.success("Post deleted successfully");
  };

  // Filter logic
  const filteredRecords = records.filter((r) => {
    const q = searchQuery.toLowerCase().trim();

    // Search query match
    const matchesSearch =
      !q || r.title.toLowerCase().includes(q) || r.excerpt.toLowerCase().includes(q);

    // Type match
    const matchesType = filterType === "all" || r.type === filterType;

    // Visibility match
    const matchesVisibility = filterVisibility === "all" || r.visibility === filterVisibility;

    // Status match
    const matchesStatus = filterStatus === "all" || r.status === filterStatus;

    // Priority match
    const matchesPriority = filterPriority === "all" || r.priority === filterPriority;

    // Featured match
    const matchesFeatured = filterFeatured === "all" || r.featured === filterFeatured;

    // Campus mapping match
    const matchesCampus =
      filterCampus === "all" || (r.visibility === "campus" && r.campusIds.includes(filterCampus));

    // Date filter: record publishDate must be on or after the selected filter date
    let matchesDate = true;
    if (filterPublishDate) {
      const filterDateObj = new Date(filterPublishDate);
      const recordDateObj = new Date(r.publishDate);
      // Reset hours to compare dates only
      filterDateObj.setHours(0, 0, 0, 0);
      recordDateObj.setHours(0, 0, 0, 0);
      matchesDate = recordDateObj >= filterDateObj;
    }

    return (
      matchesSearch &&
      matchesType &&
      matchesVisibility &&
      matchesStatus &&
      matchesPriority &&
      matchesFeatured &&
      matchesCampus &&
      matchesDate
    );
  });

  // Sort logic
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    let valA = a[sortBy] || "";
    let valB = b[sortBy] || "";

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalItems = sortedRecords.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRecords = sortedRecords.slice(startIndex, startIndex + pageSize);

  // Keep page index within bounds if filters change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Helper for Campus Chip names
  const getCampusNames = (ids: string[]) => {
    if (!ids || ids.length === 0) return "—";
    const names = ids.map((id) => campuses.find((c) => c.id === id)?.shortName || id);
    return names.join(", ");
  };

  const FilterControls = () => (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {/* Type */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
          Type
        </span>
        <Select
          value={filterType}
          onValueChange={(val) => {
            setFilterType(val);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="h-9 rounded-lg border-border bg-background/50 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="notice">Notice</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Visibility */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
          Visibility
        </span>
        <Select
          value={filterVisibility}
          onValueChange={(val) => {
            setFilterVisibility(val);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="h-9 rounded-lg border-border bg-background/50 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="all">All Visibility</SelectItem>
            <SelectItem value="group">Group-wide</SelectItem>
            <SelectItem value="campus">Campus Specific</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
          Status
        </span>
        <Select
          value={filterStatus}
          onValueChange={(val) => {
            setFilterStatus(val);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="h-9 rounded-lg border-border bg-background/50 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campus */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
          Campus Mapped
        </span>
        <Select
          value={filterCampus}
          onValueChange={(val) => {
            setFilterCampus(val);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="h-9 rounded-lg border-border bg-background/50 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="all">All Campuses</SelectItem>
            {campuses.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.shortName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Publish Date */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
          Published After
        </span>
        <Input
          type="date"
          value={filterPublishDate}
          onChange={(e) => {
            setFilterPublishDate(e.target.value);
            setCurrentPage(1);
          }}
          className="h-9 rounded-lg border-border bg-background/50 text-xs"
        />
      </div>

      {/* Reset */}
      <div className="flex items-end">
        <Button
          onClick={handleResetFilters}
          variant="outline"
          className="h-9 w-full rounded-lg border-border bg-background hover:bg-accent text-xs font-semibold flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="size-3.5" />
          Reset Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 flex flex-col flex-grow space-y-6 relative">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/4 left-1/4 size-[400px] bg-gradient-gold opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-primary opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      {/* Header Block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            News & Notices
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Publish announcements, school notices, event updates, and news bulletins.
          </p>
        </div>
        <Button
          asChild
          className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 flex items-center gap-1.5 shadow-sm text-sm"
        >
          <Link to="/@admin/news/create">
            <Plus className="size-4" /> Create Notice
          </Link>
        </Button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass rounded-xl p-4 border border-border/80 space-y-4 z-10">
        <div className="flex gap-3 items-center">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title or summary..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 h-10 rounded-lg bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm animate-in fade-in"
            />
          </div>

          {/* Sort selection */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
              Sort
            </span>
            <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
              <SelectTrigger className="h-10 w-[120px] rounded-lg border-border bg-background/50 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                <SelectItem value="publishDate">Publish Date</SelectItem>
                <SelectItem value="createdDate">Created Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-lg border-border bg-background/50 hover:bg-accent"
              onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
              title="Toggle Sort Order"
            >
              <ArrowUpDown className="size-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Mobile Filter Sheet Trigger */}
          <div className="lg:hidden">
            <Sheet open={isMobileDrawerOpen} onOpenChange={setIsMobileDrawerOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10 rounded-lg border-border bg-background/50 hover:bg-accent"
                  title="Open Filters"
                >
                  <SlidersHorizontal className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] p-6 border-l border-border/80 bg-background/95 backdrop-blur-md"
              >
                <SheetHeader className="pb-4 border-b border-border/40 mb-4">
                  <SheetTitle className="font-display font-bold text-lg flex items-center gap-2">
                    <Filter className="size-4 text-primary" /> Filter Options
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-4 pt-2">
                  <FilterControls />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Filter Controls Panel */}
        <div className="hidden lg:block border-t border-border/40 pt-4">
          <FilterControls />
        </div>
      </div>

      {/* Premium Table Container */}
      <div className="rounded-2xl border border-border/80 shadow-elegant bg-card/45 backdrop-blur-md overflow-hidden flex-grow flex flex-col z-10">
        {isLoading ? (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-2">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/12" />
            </div>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex gap-4 items-center py-2.5 border-b border-border/40 last:border-0"
              >
                <Skeleton className="size-12 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-5 w-16 rounded" />
                <Skeleton className="h-5 w-20 rounded" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            ))}
          </div>
        ) : paginatedRecords.length > 0 ? (
          <div className="flex-grow flex flex-col justify-between">
            <div className="overflow-x-auto w-full">
              <Table className="w-full min-w-[700px] border-collapse">
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="w-[60px] pl-5 text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Post
                    </TableHead>
                    <TableHead className="min-w-[220px] text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Details
                    </TableHead>
                    <TableHead className="w-[80px] text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Type
                    </TableHead>
                    <TableHead className="w-[100px] text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Visibility
                    </TableHead>
                    <TableHead className="w-[130px] text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Mapped Campus
                    </TableHead>
                    <TableHead className="w-[90px] text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Status
                    </TableHead>
                    <TableHead className="w-[100px] text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Publish Date
                    </TableHead>
                    <TableHead className="pr-5 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRecords.map((record) => {
                    const initials = record.title
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase();

                    return (
                      <TableRow
                        key={record.id}
                        className="hover:bg-gold/5 dark:hover:bg-gold/5 transition-colors border-b border-border/60"
                      >
                        {/* Thumbnail cell */}
                        <TableCell className="pl-5 py-3.5">
                          <div className="size-11 rounded-lg overflow-hidden border border-border bg-background grid place-items-center shrink-0">
                            {record.thumbnail ? (
                              <img
                                src={record.thumbnail}
                                alt={record.title}
                                className="size-full object-cover"
                              />
                            ) : (
                              <div className="size-full bg-gradient-gold text-gold-foreground flex items-center justify-center font-bold text-xs select-none">
                                {initials}
                              </div>
                            )}
                          </div>
                        </TableCell>

                        {/* Title & Excerpt */}
                        <TableCell className="py-3.5">
                          <div className="max-w-[280px]">
                            <Link
                              to="/@admin/news/$id"
                              params={{ id: record.id }}
                              className="font-semibold text-sm text-foreground hover:text-gold transition-colors block leading-tight truncate"
                              title={record.title}
                            >
                              {record.title}
                            </Link>
                            <span
                              className="text-[10px] text-muted-foreground block truncate mt-0.5"
                              title={record.excerpt}
                            >
                              {record.excerpt}
                            </span>
                          </div>
                        </TableCell>

                        {/* Type badge */}
                        <TableCell className="py-3.5">
                          <Badge
                            variant="secondary"
                            className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              record.type === "news"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200"
                                : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200"
                            }`}
                          >
                            {record.type}
                          </Badge>
                        </TableCell>

                        {/* Visibility badge */}
                        <TableCell className="py-3.5">
                          <Badge
                            variant="outline"
                            className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              record.visibility === "group"
                                ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200"
                                : "bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400 border-sky-200"
                            }`}
                          >
                            {record.visibility === "group" ? "Group-wide" : "Campus"}
                          </Badge>
                        </TableCell>

                        {/* Mapped Campus */}
                        <TableCell className="py-3.5 text-xs text-muted-foreground truncate max-w-[140px]">
                          {record.visibility === "group" ? (
                            <span className="font-semibold text-foreground/70">All Campuses</span>
                          ) : (
                            <span className="font-medium">{getCampusNames(record.campusIds)}</span>
                          )}
                        </TableCell>

                        {/* Status */}
                        <TableCell className="py-3.5">
                          <Badge
                            variant="default"
                            className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              record.status === "published"
                                ? "bg-green-150 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-green-200"
                                : record.status === "draft"
                                  ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-red-200"
                            }`}
                          >
                            {record.status}
                          </Badge>
                        </TableCell>

                        {/* Publish date */}
                        <TableCell className="py-3.5 text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(record.publishDate)}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="pr-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {/* View details */}
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                              asChild
                              title="View Details"
                            >
                              <Link to="/@admin/news/$id" params={{ id: record.id }}>
                                <Eye className="size-4" />
                              </Link>
                            </Button>

                            {/* Edit */}
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                              asChild
                              title="Edit Notice"
                            >
                              <Link to="/@admin/news/$id/edit" params={{ id: record.id }}>
                                <Edit2 className="size-3.5" />
                              </Link>
                            </Button>

                            {/* Delete */}
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                              onClick={() => openDeleteModal(record)}
                              title="Delete Notice"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Bottom Pagination & Metadata Bar */}
            <div className="p-4 border-t border-border/60 bg-muted/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                <div className="text-xs text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{startIndex + 1}</span> to{" "}
                  <span className="font-semibold text-foreground">
                    {Math.min(startIndex + pageSize, totalItems)}
                  </span>{" "}
                  of <span className="font-semibold text-foreground">{totalItems}</span> notices
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Rows
                  </span>
                  <Select
                    value={String(pageSize)}
                    onValueChange={(val) => {
                      setPageSize(Number(val));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[65px] h-7 rounded-md border-border bg-background text-[11px] font-bold px-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-border">
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="w-full sm:w-auto flex justify-end">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => {
                            if (currentPage > 1) {
                              setCurrentPage((prev) => prev - 1);
                            }
                          }}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50 select-none"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, index) => {
                        const p = index + 1;
                        return (
                          <PaginationItem key={p}>
                            <PaginationLink
                              isActive={currentPage === p}
                              onClick={() => setCurrentPage(p)}
                              className="cursor-pointer size-8 rounded-lg text-xs font-semibold"
                            >
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => {
                            if (currentPage < totalPages) {
                              setCurrentPage((prev) => prev + 1);
                            }
                          }}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50 select-none"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 min-h-[350px]">
            <div className="size-16 rounded-2xl bg-muted/60 grid place-items-center mb-4 border border-border">
              <Newspaper className="size-8 text-muted-foreground" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">
              No Announcements Found
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
              Create your first news post or notice to get started, or change filters to find
              matching records.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {(searchQuery ||
                filterType !== "all" ||
                filterStatus !== "all" ||
                filterVisibility !== "all" ||
                filterPriority !== "all" ||
                filterFeatured !== "all" ||
                filterCampus !== "all" ||
                filterPublishDate) && (
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  className="rounded-xl border-border font-semibold hover:bg-accent text-sm"
                >
                  Clear Filters
                </Button>
              )}
              <Button
                asChild
                className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 flex items-center gap-1.5 shadow-sm text-sm"
              >
                <Link to="/@admin/news/create">
                  <Plus className="size-4" /> Create Notice
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="rounded-2xl max-w-sm border border-border/80 shadow-elegant p-6 bg-background/95 backdrop-blur-md">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="size-12 rounded-full bg-destructive/10 text-destructive grid place-items-center mb-3">
              <AlertCircle className="size-6" />
            </div>
            <DialogTitle className="font-display text-lg font-bold text-foreground">
              Delete Announcement
            </DialogTitle>
            <DialogDescription className="text-xs md:text-sm text-muted-foreground mt-1 leading-relaxed">
              This action cannot be undone. Are you sure you want to permanently delete this record?
            </DialogDescription>
          </DialogHeader>

          {recordToDelete && (
            <div className="my-2 p-3 bg-muted/40 rounded-xl border text-center">
              <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">
                Target Record
              </span>
              <span className="text-xs font-bold text-foreground block max-w-[280px] mx-auto truncate">
                {recordToDelete.title}
              </span>
              <div className="mt-2 flex items-center justify-center gap-2 text-[10px]">
                <Badge variant="outline" className="px-1.5 uppercase font-bold text-[8px]">
                  {recordToDelete.type}
                </Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="outline" className="px-1.5 uppercase font-bold text-[8px]">
                  {recordToDelete.status}
                </Badge>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-row justify-center gap-3 mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="rounded-xl border-border font-semibold flex-1 text-sm"
                disabled={isDeleting}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={confirmDelete}
              className="rounded-xl bg-destructive text-destructive-foreground font-semibold flex-1 text-sm hover:bg-destructive/90 flex items-center justify-center gap-1.5"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
