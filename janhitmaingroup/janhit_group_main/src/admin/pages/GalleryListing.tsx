import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  AlertCircle,
  Building,
  Image,
  Video,
  Play,
  Layers,
  Info,
  Calendar,
  EyeOff,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import { getStoredGallery, saveGallery, GalleryItem } from "@/data/gallery";

export const GalleryListing: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all"); // all, IMAGE, VIDEO
  const [filterCampus, setFilterCampus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all"); // all, active, inactive

  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "sortOrder" | "title">("sortOrder");
  const [sortOrderDirection, setSortOrderDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Modals
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Load data
  useEffect(() => {
    const timer = setTimeout(() => {
      setGallery(getStoredGallery());
      setCampuses(getStoredCampuses());
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const getCampusName = (campusId: string) => {
    const campus = campuses.find((c) => c.id === campusId);
    return campus ? `${campus.name} (${campus.shortName})` : "Unknown Campus";
  };

  // Status toggle confirm
  const handleToggleStatusClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsStatusModalOpen(true);
  };

  const confirmToggleStatus = async () => {
    if (!selectedItem) return;
    setIsActionLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const updated = gallery.map((g) => {
      if (g.id === selectedItem.id) {
        return {
          ...g,
          isActive: !g.isActive,
          updatedAt: new Date().toISOString(),
        };
      }
      return g;
    });

    setGallery(updated);
    saveGallery(updated);
    setIsActionLoading(false);
    setIsStatusModalOpen(false);

    toast.success(
      `Media "${selectedItem.title || selectedItem.fileName}" status changed successfully.`,
    );
    setSelectedItem(null);
  };

  // Delete confirm
  const handleDeleteClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;
    setIsActionLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const updated = gallery.filter((g) => g.id !== selectedItem.id);
    setGallery(updated);
    saveGallery(updated);
    setIsActionLoading(false);
    setIsDeleteModalOpen(false);

    toast.success(`Media item has been permanently deleted.`);
    setSelectedItem(null);
  };

  // Open Lightbox
  const handleLightboxClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  // Categories list
  const categoriesList = Array.from(
    new Set(gallery.map((g) => g.category).filter(Boolean)),
  ) as string[];

  // Filter & Sort
  const filteredItems = gallery.filter((g) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (g.title && g.title.toLowerCase().includes(q)) ||
      (g.description && g.description.toLowerCase().includes(q)) ||
      g.fileName.toLowerCase().includes(q) ||
      (g.category && g.category.toLowerCase().includes(q));
    const matchesType = filterType === "all" || g.mediaType === filterType;
    const matchesCampus = filterCampus === "all" || g.campusId === filterCampus;
    const matchesCategory = filterCategory === "all" || g.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" ? g.isActive === true : g.isActive === false);

    return matchesSearch && matchesType && matchesCampus && matchesCategory && matchesStatus;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "title") {
      const titleA = a.title || a.fileName;
      const titleB = b.title || b.fileName;
      comparison = titleA.localeCompare(titleB);
    } else if (sortBy === "oldest") {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === "sortOrder") {
      comparison = a.sortOrder - b.sortOrder;
    } else {
      // default: newest
      comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return sortOrderDirection === "asc" ? comparison : -comparison;
  });

  // Pagination
  const totalItems = sortedItems.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems = sortedItems.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="p-4 md:p-6 flex flex-col flex-grow space-y-6 relative">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 size-[400px] bg-gradient-gold opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-primary opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Gallery Management
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Upload, update, sort, and organize photos and video assets for your campuses.
          </p>
        </div>
        <Button
          asChild
          className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 flex items-center gap-1.5 shadow-sm text-sm"
        >
          <Link to="/@admin/gallery/create">
            <Plus className="size-4" /> Upload Media
          </Link>
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="glass rounded-xl p-4 border border-border/80 flex flex-col gap-4 z-10">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title, description, category or filename..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 h-10 rounded-lg bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm"
            />
          </div>

          {/* Quick select buttons */}
          <div className="flex items-center gap-2 border-l border-border/60 pl-0 lg:pl-4">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => {
                setFilterType("all");
                setCurrentPage(1);
              }}
              className="h-8 rounded-lg text-xs font-semibold px-3"
            >
              All Media
            </Button>
            <Button
              variant={filterType === "IMAGE" ? "default" : "outline"}
              onClick={() => {
                setFilterType("IMAGE");
                setCurrentPage(1);
              }}
              className="h-8 rounded-lg text-xs font-semibold px-3 flex items-center gap-1"
            >
              <Image className="size-3.5" /> Images
            </Button>
            <Button
              variant={filterType === "VIDEO" ? "default" : "outline"}
              onClick={() => {
                setFilterType("VIDEO");
                setCurrentPage(1);
              }}
              className="h-8 rounded-lg text-xs font-semibold px-3 flex items-center gap-1"
            >
              <Video className="size-3.5" /> Videos
            </Button>
          </div>
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          {/* Campus Filter */}
          <div className="flex flex-col space-y-1">
            <Select
              value={filterCampus}
              onValueChange={(val) => {
                setFilterCampus(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-9 rounded-lg border-border bg-background/50 hover:border-gold/40 text-xs">
                <SelectValue placeholder="All Campuses" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="all">All Campuses</SelectItem>
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

          {/* Category Filter */}
          <div className="flex flex-col space-y-1">
            <Select
              value={filterCategory}
              onValueChange={(val) => {
                setFilterCategory(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-9 rounded-lg border-border bg-background/50 hover:border-gold/40 text-xs">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="all">All Categories</SelectItem>
                {categoriesList.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
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
              <SelectTrigger className="h-9 rounded-lg border-border bg-background/50 hover:border-gold/40 text-xs">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active (Visible)</SelectItem>
                <SelectItem value="inactive">Inactive (Hidden)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By Field */}
          <div className="flex flex-col space-y-1">
            <Select
              value={sortBy}
              onValueChange={(val: any) => {
                setSortBy(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-9 rounded-lg border-border bg-background/50 hover:border-gold/40 text-xs">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="sortOrder">Sort Order Rank</SelectItem>
                <SelectItem value="newest">Uploaded Date</SelectItem>
                <SelectItem value="title">Media Title</SelectItem>
                <SelectItem value="oldest">Oldest Upload</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Direction */}
          <div className="flex flex-col space-y-1">
            <Select
              value={sortOrderDirection}
              onValueChange={(val: any) => {
                setSortOrderDirection(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-9 rounded-lg border-border bg-background/50 hover:border-gold/40 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="asc">Ascending Order</SelectItem>
                <SelectItem value="desc">Descending Order</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="z-10 flex-grow">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="glass rounded-2xl overflow-hidden border border-border/60 p-4 space-y-3"
              >
                <Skeleton className="w-full aspect-video rounded-xl" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-7 w-12 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : paginatedItems.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center border border-border/80 bg-card/45 backdrop-blur-md flex flex-col items-center justify-center">
            <SlidersHorizontal className="size-12 text-muted-foreground/60 mb-3" />
            <h3 className="font-display text-base font-bold text-foreground">
              No media assets found
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
              Try adjusting your query searches, or upload a new photo/video to start showcasing
              your campus.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-5 h-8 rounded-lg text-xs font-semibold border-border"
            >
              <Link to="/@admin/gallery/create">
                <Plus className="size-3.5 mr-1" /> Upload Media
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Grid display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  className={`group glass rounded-2xl border border-border/80 bg-card/50 overflow-hidden flex flex-col hover-lift relative ${
                    !item.isActive ? "opacity-75 border-slate-300 dark:border-slate-800" : ""
                  }`}
                >
                  {/* Media Preview Area */}
                  <div className="aspect-video w-full bg-slate-950 overflow-hidden relative border-b border-border/50">
                    {item.mediaType === "IMAGE" ? (
                      <img
                        src={item.fileUrl}
                        alt={item.title || "Gallery photo"}
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="relative size-full">
                        <img
                          src={item.thumbnail || ""}
                          alt={item.title || "Video thumbnail"}
                          className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 grid place-items-center">
                          <div className="size-12 rounded-full bg-white/20 backdrop-blur border border-white/30 grid place-items-center group-hover:bg-gold group-hover:text-gold-foreground transition-all duration-300">
                            <Play className="size-5 fill-current ml-0.5" />
                          </div>
                        </div>
                        {item.duration && (
                          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/75 text-[10px] text-white font-semibold">
                            {Math.floor(item.duration / 60)}:
                            {(item.duration % 60).toString().padStart(2, "0")}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Visibility/Active Badge Overlay */}
                    {!item.isActive && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur text-white text-[10px] font-semibold flex items-center gap-1 shadow-sm">
                        <EyeOff className="size-3" /> Inactive / Hidden
                      </div>
                    )}

                    {/* Format Indicator Badge */}
                    <span className="absolute top-2 right-2 size-6 rounded-lg bg-black/60 backdrop-blur text-white flex items-center justify-center shadow-sm">
                      {item.mediaType === "IMAGE" ? (
                        <Image className="size-3.5" />
                      ) : (
                        <Video className="size-3.5" />
                      )}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-semibold text-sm text-foreground line-clamp-1 leading-snug">
                          {item.title || item.fileName}
                        </span>
                        <Badge className="rounded-full text-[9px] px-2 font-medium tracking-wide uppercase bg-gold/10 text-gold-foreground border-transparent shrink-0">
                          {item.category || "General"}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.description || "No description provided."}
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Building className="size-3.5 text-primary shrink-0" />
                        <span className="truncate max-w-[120px] font-medium">
                          {getCampusName(item.campusId)}
                        </span>
                      </div>

                      <span className="font-mono text-muted-foreground">
                        Rank: {item.sortOrder}
                      </span>
                    </div>

                    {/* Hover Operations Bar */}
                    <div className="flex justify-between items-center gap-2 pt-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={item.isActive}
                          onCheckedChange={() => handleToggleStatusClick(item)}
                          className="scale-90"
                        />
                        <span className="text-[10px] font-medium text-muted-foreground">
                          Active
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleLightboxClick(item)}
                          className="size-8 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                          title="Preview Media"
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg hover:bg-gold/10 text-muted-foreground hover:text-gold transition-colors"
                          title="Edit Details"
                        >
                          <Link to="/@admin/gallery/$id/edit" params={{ id: item.id }}>
                            <Edit2 className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(item)}
                          className="size-8 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          title="Delete Item"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalItems > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border rounded-2xl bg-muted/20 border-border/80">
                <div className="text-xs text-muted-foreground font-medium">
                  Showing <span className="text-foreground">{startIndex + 1}</span> to{" "}
                  <span className="text-foreground">
                    {Math.min(startIndex + pageSize, totalItems)}
                  </span>{" "}
                  of <span className="text-foreground">{totalItems}</span> gallery assets
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Size:
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
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="24">24</SelectItem>
                        <SelectItem value="48">48</SelectItem>
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
        )}
      </div>

      {/* Modal: Toggle Status Confirm */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="rounded-2xl max-w-sm border border-border bg-card">
          <DialogHeader className="space-y-2">
            <DialogTitle className="font-display font-bold text-lg text-foreground flex items-center gap-2">
              <Info className="size-5 text-gold" />
              Toggle Visibility?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to change the status of{" "}
              <span className="font-semibold text-foreground">
                "{selectedItem?.title || selectedItem?.fileName}"
              </span>
              ? Hidden media will be completely excluded from public-facing screens.
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

      {/* Modal: Delete Confirm */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="rounded-2xl max-w-sm border border-border bg-card">
          <DialogHeader className="space-y-2">
            <DialogTitle className="font-display font-bold text-lg text-destructive flex items-center gap-2">
              <AlertCircle className="size-5" />
              Delete Media Item?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              This action is permanent and cannot be undone. Are you sure you want to delete this
              media asset?
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

      {/* Modal: Lightbox / Media Viewer */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="rounded-2xl max-w-3xl border border-border bg-card p-6">
          <DialogHeader className="pb-4 border-b border-border/40">
            <div className="flex justify-between items-start gap-4">
              <div>
                <DialogTitle className="font-display font-bold text-lg text-foreground">
                  {selectedItem?.title || "Media Preview"}
                </DialogTitle>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge
                    variant="secondary"
                    className="rounded-full text-[10px] px-2 bg-primary/10 text-primary border-transparent"
                  >
                    {selectedItem?.category || "General"}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                    <Building className="size-3 text-gold" />{" "}
                    {selectedItem ? getCampusName(selectedItem.campusId) : ""}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Media Player Box */}
          <div className="mt-4 aspect-video w-full bg-slate-950 rounded-xl overflow-hidden border border-border flex items-center justify-center relative">
            {selectedItem?.mediaType === "IMAGE" ? (
              <img
                src={selectedItem.fileUrl}
                alt={selectedItem.title || "Preview image"}
                className="max-h-full max-w-full object-contain"
              />
            ) : selectedItem ? (
              <video
                src={selectedItem.fileUrl}
                controls
                autoPlay
                poster={selectedItem.thumbnail || ""}
                className="size-full object-contain"
              />
            ) : null}
          </div>

          {/* Metadata information details */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-muted/30 rounded-xl border border-border/40 text-[11px] leading-snug">
            <div>
              <span className="text-muted-foreground block font-semibold text-[9px] uppercase tracking-wider mb-0.5">
                Filename
              </span>
              <span className="text-foreground font-mono truncate block max-w-[150px]">
                {selectedItem?.fileName}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block font-semibold text-[9px] uppercase tracking-wider mb-0.5">
                File Size
              </span>
              <span className="text-foreground font-semibold">
                {selectedItem ? formatBytes(selectedItem.fileSize) : ""}
              </span>
            </div>
            {selectedItem?.mediaType === "VIDEO" && selectedItem.duration && (
              <div>
                <span className="text-muted-foreground block font-semibold text-[9px] uppercase tracking-wider mb-0.5">
                  Duration
                </span>
                <span className="text-foreground font-semibold">
                  {selectedItem.duration} seconds
                </span>
              </div>
            )}
            {selectedItem?.width && selectedItem?.height && (
              <div>
                <span className="text-muted-foreground block font-semibold text-[9px] uppercase tracking-wider mb-0.5">
                  Resolution
                </span>
                <span className="text-foreground font-semibold">
                  {selectedItem.width} x {selectedItem.height} px
                </span>
              </div>
            )}
            <div>
              <span className="text-muted-foreground block font-semibold text-[9px] uppercase tracking-wider mb-0.5">
                Uploaded On
              </span>
              <span className="text-foreground font-semibold flex items-center gap-1">
                <Calendar className="size-3 text-gold" />
                {selectedItem ? new Date(selectedItem.createdAt).toLocaleDateString() : ""}
              </span>
            </div>
          </div>

          {selectedItem?.description && (
            <div className="mt-3 p-3 bg-background/50 rounded-xl border border-border/40 text-xs">
              <span className="text-muted-foreground block font-semibold text-[9px] uppercase tracking-wider mb-1">
                Description / Notes
              </span>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {selectedItem.description}
              </p>
            </div>
          )}

          <DialogFooter className="mt-6 pt-3 border-t border-border/40">
            <DialogClose asChild>
              <Button className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 text-xs w-full sm:w-auto">
                Close Preview
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
