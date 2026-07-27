import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  FileText,
  Building,
  DownloadCloud,
  Layers,
  CheckCircle2,
  FileDown,
  Info,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { getStoredCampuses } from "@/data/campuses";
import { getStoredDownloads, saveDownloads, Download, CATEGORY_LABELS } from "@/data/downloads";

export const DownloadListing: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterCampus, setFilterCampus] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [sortBy, setSortBy] = useState<"title" | "newest" | "oldest" | "size">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modal states
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [selectedDownload, setSelectedDownload] = useState<Download | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Load downloads and campuses
  useEffect(() => {
    const timer = setTimeout(() => {
      setDownloads(getStoredDownloads());
      setCampuses(getStoredCampuses());
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  // File size formatter utility
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Helper to get campus name
  const getCampusName = (campusId: string | null) => {
    if (!campusId) return "Global / All Campuses";
    const campus = campuses.find((c) => c.id === campusId);
    return campus ? `${campus.name} (${campus.shortName})` : "Unknown Campus";
  };

  // Status Toggles
  const handleToggleStatusClick = (download: Download) => {
    setSelectedDownload(download);
    setIsStatusModalOpen(true);
  };

  const confirmToggleStatus = async () => {
    if (!selectedDownload) return;
    setIsActionLoading(true);

    // Simulate short network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const updated = downloads.map((d) => {
      if (d.id === selectedDownload.id) {
        return {
          ...d,
          isActive: !d.isActive,
          updatedAt: new Date().toISOString(),
        };
      }
      return d;
    });

    setDownloads(updated);
    saveDownloads(updated);
    setIsActionLoading(false);
    setIsStatusModalOpen(false);

    toast.success(`Document "${selectedDownload.title}" status toggled successfully.`);
    setSelectedDownload(null);
  };

  // Delete Action
  const handleDeleteClick = (download: Download) => {
    setSelectedDownload(download);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedDownload) return;
    setIsActionLoading(true);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    const updated = downloads.filter((d) => d.id !== selectedDownload.id);
    setDownloads(updated);
    saveDownloads(updated);
    setIsActionLoading(false);
    setIsDeleteModalOpen(false);

    toast.success(`Document "${selectedDownload.title}" has been deleted.`);
    setSelectedDownload(null);
  };

  // Details Modal
  const handleDetailsClick = (download: Download) => {
    setSelectedDownload(download);
    setIsDetailModalOpen(true);
  };

  // Get color styled icons based on file type
  const getFileIcon = (fileName: string) => {
    const ext = "." + fileName.split(".").pop()?.toLowerCase();

    if (ext === ".pdf") {
      return (
        <div className="size-10 rounded-lg bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 grid place-items-center border border-red-200 dark:border-red-900/50">
          <span className="text-[10px] font-extrabold font-sans leading-none uppercase">PDF</span>
        </div>
      );
    }
    if (ext === ".doc" || ext === ".docx") {
      return (
        <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 grid place-items-center border border-blue-200 dark:border-blue-900/50">
          <span className="text-[10px] font-extrabold font-sans leading-none uppercase">DOC</span>
        </div>
      );
    }
    if (ext === ".xls" || ext === ".xlsx") {
      return (
        <div className="size-10 rounded-lg bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 grid place-items-center border border-green-200 dark:border-green-900/50">
          <span className="text-[10px] font-extrabold font-sans leading-none uppercase">XLS</span>
        </div>
      );
    }
    if (ext === ".ppt" || ext === ".pptx") {
      return (
        <div className="size-10 rounded-lg bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 grid place-items-center border border-orange-200 dark:border-orange-900/50">
          <span className="text-[10px] font-extrabold font-sans leading-none uppercase">PPT</span>
        </div>
      );
    }
    return (
      <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 grid place-items-center border border-slate-200 dark:border-slate-800">
        <FileText className="size-5" />
      </div>
    );
  };

  // Filter & Sort logic
  const filteredDownloads = downloads.filter((d) => {
    // Search filter
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      d.title.toLowerCase().includes(q) ||
      (d.description && d.description.toLowerCase().includes(q)) ||
      d.fileName.toLowerCase().includes(q);

    // Category filter
    const matchesCategory = filterCategory === "all" || d.category === filterCategory;

    // Campus filter
    const matchesCampus =
      filterCampus === "all" ||
      (filterCampus === "global" ? d.campusId === null : d.campusId === filterCampus);

    // Status filter
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" ? d.isActive === true : d.isActive === false);

    return matchesSearch && matchesCategory && matchesCampus && matchesStatus;
  });

  const sortedDownloads = [...filteredDownloads].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === "size") {
      return b.fileSize - a.fileSize;
    }
    // default: newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Pagination calculations
  const totalItems = sortedDownloads.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedDownloads = sortedDownloads.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="p-4 md:p-6 flex flex-col flex-grow space-y-6 relative">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/4 left-1/4 size-[400px] bg-gradient-gold opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-primary opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Download Management
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Manage academic calendars, admission forms, prospectuses, notices and syllabus download
            documents.
          </p>
        </div>
        <Button
          asChild
          className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 flex items-center gap-1.5 shadow-sm text-sm"
        >
          <Link to="/@admin/downloads/create">
            <Plus className="size-4" /> Add Document
          </Link>
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="glass rounded-xl p-4 border border-border/80 flex flex-col xl:flex-row gap-4 z-10">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search downloads by title or filename..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 pr-4 h-10 rounded-lg bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm"
          />
        </div>

        {/* Dropdowns Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full xl:w-auto">
          {/* Category Filter */}
          <div className="flex flex-col space-y-1">
            <Select
              value={filterCategory}
              onValueChange={(val) => {
                setFilterCategory(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-10 rounded-lg border-border bg-background/50 hover:border-gold/40 text-xs">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campus Scope Filter */}
          <div className="flex flex-col space-y-1">
            <Select
              value={filterCampus}
              onValueChange={(val) => {
                setFilterCampus(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-10 rounded-lg border-border bg-background/50 hover:border-gold/40 text-xs">
                <SelectValue placeholder="All Campuses" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="all">All Campuses</SelectItem>
                <SelectItem value="global">Global (No Campus)</SelectItem>
                {campuses
                  .filter((c) => c.status === "active")
                  .map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.shortName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col space-y-1">
            <Select
              value={filterStatus}
              onValueChange={(val) => {
                setFilterStatus(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-10 rounded-lg border-border bg-background/50 hover:border-gold/40 text-xs">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort selection */}
          <div className="flex flex-col space-y-1">
            <Select
              value={sortBy}
              onValueChange={(val: any) => {
                setSortBy(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-10 rounded-lg border-border bg-background/50 hover:border-gold/40 text-xs">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">Alphabetical (A-Z)</SelectItem>
                <SelectItem value="size">Size (Large to Small)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Table */}
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
                className="flex gap-4 items-center py-3 border-b border-border/40 last:border-0"
              >
                <Skeleton className="size-10 rounded-lg shrink-0" />
                <div className="flex-grow space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            ))}
          </div>
        ) : paginatedDownloads.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <FileDown className="size-12 text-muted-foreground/60 mb-3" />
            <h3 className="font-display text-base font-bold text-foreground">No downloads found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
              We couldn't find any documents matching your criteria. Try adjusting your query or
              upload a new file.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-4 h-8 rounded-lg text-xs font-semibold border-border"
            >
              <Link to="/@admin/downloads/create">
                <Plus className="size-3.5 mr-1" /> Add Document
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto flex-grow">
            <Table>
              <TableHeader className="bg-muted/40 hover:bg-muted/40 border-b border-border">
                <TableRow>
                  <TableHead className="w-12 text-center pl-4 text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Type
                  </TableHead>
                  <TableHead className="min-w-[200px] text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Document Title & Filename
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Category
                  </TableHead>
                  <TableHead className="min-w-[150px] text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Campus Scope
                  </TableHead>
                  <TableHead className="text-center w-24 text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Size
                  </TableHead>
                  <TableHead className="text-center w-24 text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Active
                  </TableHead>
                  <TableHead className="text-right pr-6 w-32 text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDownloads.map((download) => (
                  <TableRow
                    key={download.id}
                    className="hover:bg-muted/20 border-b border-border/40 transition-colors"
                  >
                    <TableCell className="text-center pl-4 py-3">
                      {getFileIcon(download.fileName)}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-foreground leading-snug">
                          {download.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono mt-0.5 max-w-[320px] truncate">
                          {download.fileName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge
                        variant="secondary"
                        className="rounded-full font-medium px-2.5 py-0.5 text-[10px] bg-primary/10 text-primary border border-primary/10"
                      >
                        {CATEGORY_LABELS[download.category] || download.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Building className="size-3.5 shrink-0 text-gold" />
                        <span className="truncate max-w-[180px]">
                          {download.campusId
                            ? getCampusName(download.campusId)
                            : "Global (All Campuses)"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-xs font-medium text-foreground py-3">
                      {formatBytes(download.fileSize)}
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <Switch
                        checked={download.isActive}
                        onCheckedChange={() => handleToggleStatusClick(download)}
                      />
                    </TableCell>
                    <TableCell className="text-right pr-6 py-3">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDetailsClick(download)}
                          className="size-8 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                          title="View Details"
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg hover:bg-gold/10 text-muted-foreground hover:text-gold transition-colors"
                          title="Edit Document"
                        >
                          <Link to="/@admin/downloads/$id/edit" params={{ id: download.id }}>
                            <Edit2 className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(download)}
                          className="size-8 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Footer and Pagination */}
        {!isLoading && totalItems > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t border-border bg-muted/20">
            <div className="text-xs text-muted-foreground font-medium">
              Showing <span className="text-foreground">{startIndex + 1}</span> to{" "}
              <span className="text-foreground">{Math.min(startIndex + pageSize, totalItems)}</span>{" "}
              of <span className="text-foreground">{totalItems}</span> documents
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Rows per page:
                </span>
                <Select
                  value={String(pageSize)}
                  onValueChange={(val) => {
                    setPageSize(Number(val));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-16 h-8 rounded-lg border-border text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-border">
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="size-8 rounded-lg border border-border bg-background disabled:opacity-50"
                      >
                        <PaginationPrevious className="size-4 p-0 shrink-0" />
                      </Button>
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`size-8 rounded-lg cursor-pointer text-xs font-semibold ${
                            currentPage === i + 1
                              ? "bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm"
                              : "border border-border bg-background text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="size-8 rounded-lg border border-border bg-background disabled:opacity-50"
                      >
                        <PaginationNext className="size-4 p-0 shrink-0" />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Toggle Status Confirmation */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="rounded-2xl max-w-sm border-border bg-card">
          <DialogHeader className="space-y-2">
            <DialogTitle className="font-display font-bold text-lg text-foreground flex items-center gap-2">
              <Info className="size-5 text-gold" />
              Toggle Active Status?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to change the status of{" "}
              <span className="font-semibold text-foreground">"{selectedDownload?.title}"</span>?
              Inactive documents will not be visible on the public download portal.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl border border-border text-xs flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={confirmToggleStatus}
              disabled={isActionLoading}
              className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 text-xs flex-1"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Delete Confirmation */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="rounded-2xl max-w-sm border-border bg-card">
          <DialogHeader className="space-y-2">
            <DialogTitle className="font-display font-bold text-lg text-destructive flex items-center gap-2">
              <AlertCircle className="size-5" />
              Delete Document?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              This action is permanent. Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">"{selectedDownload?.title}"</span>?
              The file and all its associated configuration will be removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl border border-border text-xs flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={confirmDelete}
              disabled={isActionLoading}
              className="rounded-xl bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/95 text-xs flex-1"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: View Details */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="rounded-2xl max-w-lg border border-border bg-card p-6">
          <DialogHeader className="pb-4 border-b border-border/40">
            <div className="flex items-center gap-3">
              {selectedDownload && getFileIcon(selectedDownload.fileName)}
              <div className="space-y-0.5">
                <DialogTitle className="font-display font-bold text-lg text-foreground leading-tight">
                  {selectedDownload?.title}
                </DialogTitle>
                <div className="flex gap-2">
                  <Badge className="rounded-full text-[10px] bg-primary/10 text-primary border-transparent">
                    {selectedDownload
                      ? CATEGORY_LABELS[selectedDownload.category] || selectedDownload.category
                      : ""}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`rounded-full text-[10px] font-semibold ${
                      selectedDownload?.isActive
                        ? "border-green-500/30 bg-green-50/50 text-green-600 dark:text-green-400"
                        : "border-slate-500/30 bg-slate-50 text-slate-500"
                    }`}
                  >
                    {selectedDownload?.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Details Grid */}
          <div className="mt-4 space-y-4 text-xs">
            {selectedDownload?.description && (
              <div className="space-y-1 p-3.5 bg-muted/30 rounded-xl border border-border/40">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  Description
                </span>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedDownload.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  Campus Scope
                </span>
                <span className="text-foreground font-semibold flex items-center gap-1.5 mt-0.5">
                  <Building className="size-3.5 text-gold" />
                  {selectedDownload ? getCampusName(selectedDownload.campusId) : ""}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  File Size
                </span>
                <span className="text-foreground font-semibold flex items-center gap-1.5 mt-0.5">
                  <Layers className="size-3.5 text-primary" />
                  {selectedDownload ? formatBytes(selectedDownload.fileSize) : ""}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="space-y-0.5">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  File Path
                </span>
                <span className="text-foreground font-mono break-all mt-0.5 block leading-relaxed">
                  {selectedDownload?.fileUrl}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  URL Slug
                </span>
                <span className="text-foreground font-mono break-all mt-0.5 block leading-relaxed">
                  {selectedDownload?.slug}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1 border-t border-border/40 mt-4">
              <div className="space-y-0.5">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  Created Date
                </span>
                <span className="text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Calendar className="size-3.5" />
                  {selectedDownload ? new Date(selectedDownload.createdAt).toLocaleString() : ""}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  Last Updated
                </span>
                <span className="text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Calendar className="size-3.5" />
                  {selectedDownload ? new Date(selectedDownload.updatedAt).toLocaleString() : ""}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6 pt-3 border-t border-border/40">
            <DialogClose asChild>
              <Button className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 text-xs w-full sm:w-auto">
                Close Details
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
