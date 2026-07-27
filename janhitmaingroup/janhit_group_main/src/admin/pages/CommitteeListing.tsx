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
  Building,
  EyeOff,
  Users,
  FileText,
  ArrowUpDown,
  Calendar,
  Layers,
  AlertCircle,
  Loader2,
  BookOpen,
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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { getStoredCommittees, saveCommittees, Committee } from "@/data/committees";
import { getStoredCampuses } from "@/data/campuses";

export const CommitteeListing: React.FC = () => {
  // State
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCampus, setFilterCampus] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Sorting
  const [sortBy, setSortBy] = useState<"title" | "displayOrder" | "createdAt">("displayOrder");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modals state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [committeeToDelete, setCommitteeToDelete] = useState<Committee | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [committeeToToggle, setCommitteeToToggle] = useState<Committee | null>(null);
  const [nextStatus, setNextStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVED" | "">("");
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

  // Load initial data
  useEffect(() => {
    const timer = setTimeout(() => {
      setCommittees(getStoredCommittees());
      setCampuses(getStoredCampuses().filter((c) => c.status === "active"));
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Unique categories list
  const categoriesList = Array.from(
    new Set(
      committees.map((c) => c.category).filter((cat): cat is string => !!cat && cat.trim() !== ""),
    ),
  ).sort();

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterCampus("all");
    setFilterStatus("all");
    setFilterCategory("all");
    setCurrentPage(1);
    toast.success("Filters reset successfully");
  };

  // Open Status Dialog
  const handleOpenStatusModal = (
    committee: Committee,
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED",
  ) => {
    setCommitteeToToggle(committee);
    setNextStatus(status);
    setIsStatusModalOpen(true);
  };

  // Confirm Status update
  const confirmStatusUpdate = async () => {
    if (!committeeToToggle || !nextStatus) return;
    setIsTogglingStatus(true);

    await new Promise((resolve) => setTimeout(resolve, 350));

    const updated = committees.map((c) => {
      if (c.id === committeeToToggle.id) {
        return {
          ...c,
          status: nextStatus as any,
          publishDate:
            nextStatus === "PUBLISHED" && !c.publishDate ? new Date().toISOString() : c.publishDate,
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });

    setCommittees(updated);
    saveCommittees(updated);

    setIsTogglingStatus(false);
    setIsStatusModalOpen(false);
    setCommitteeToToggle(null);
    toast.success(`Committee status updated to ${nextStatus} successfully.`);
  };

  // Open Delete Modal
  const openDeleteModal = (committee: Committee) => {
    setCommitteeToDelete(committee);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!committeeToDelete) return;
    setIsDeleting(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    const updated = committees.filter((c) => c.id !== committeeToDelete.id);
    setCommittees(updated);
    saveCommittees(updated);

    // Also clean up any linked local storage member photos or doc references if simulated
    // ...

    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setCommitteeToDelete(null);
    toast.success("Committee and cascade records deleted.");
  };

  // Sort handler
  const handleSort = (field: "title" | "displayOrder" | "createdAt") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Filter & Search Logic
  const filteredCommittees = committees.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchSearch =
        c.title.toLowerCase().includes(q) ||
        (c.category && c.category.toLowerCase().includes(q)) ||
        (c.shortDescription && c.shortDescription.toLowerCase().includes(q)) ||
        (c.description && c.description.toLowerCase().includes(q)) ||
        c.members.some(
          (m) => m.name.toLowerCase().includes(q) || m.committeeRole.toLowerCase().includes(q),
        );
      if (!matchSearch) return false;
    }

    // Campus filter
    if (filterCampus !== "all" && !c.campuses.includes(filterCampus)) {
      return false;
    }

    // Status filter
    if (filterStatus !== "all" && c.status !== filterStatus) {
      return false;
    }

    // Category filter
    if (filterCategory !== "all" && c.category !== filterCategory) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedCommittees = [...filteredCommittees].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalItems = sortedCommittees.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCommittees = sortedCommittees.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Helper to resolve campus tags
  const getCampusBadges = (campIds: string[]) => {
    return campIds
      .map((cid) => {
        const found = campuses.find((c) => c.id === cid);
        return found ? found.shortName || found.name : null;
      })
      .filter(Boolean);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20";
      case "DRAFT":
        return "bg-blue-500/10 text-blue-600 border border-blue-500/20";
      case "ARCHIVED":
        return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
      default:
        return "bg-slate-200 text-slate-600 border border-slate-300";
    }
  };

  return (
    <div className="p-4 md:p-6 flex flex-col flex-grow space-y-6 relative">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 size-[400px] bg-gradient-gold opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-primary opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Committees
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Manage academic boards, Internal Complaint cells, anti-ragging committees, members and
            regulatory documents.
          </p>
        </div>

        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm rounded-xl px-5 self-start sm:self-center"
        >
          <Link to="/@admin/committees/create">
            <Plus className="size-4 mr-2" />
            Add Committee
          </Link>
        </Button>
      </div>

      {/* Filters Box */}
      <div className="bg-card glass border rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Filter className="size-4 text-primary" />
            Filters & Search
          </div>
          {(searchQuery ||
            filterCampus !== "all" ||
            filterStatus !== "all" ||
            filterCategory !== "all") && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline transition-all"
            >
              <RotateCcw className="size-3" />
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          {/* Search bar */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title, category, description, members..."
              className="pl-9 rounded-xl text-xs bg-background"
            />
          </div>

          {/* Campus Filter */}
          <div>
            <Select
              value={filterCampus}
              onValueChange={(val) => {
                setFilterCampus(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="rounded-xl text-xs bg-background">
                <SelectValue placeholder="All Campuses" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-border/80 text-xs">
                <SelectItem value="all">All Campuses</SelectItem>
                {campuses.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.shortName || c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div>
            <Select
              value={filterStatus}
              onValueChange={(val) => {
                setFilterStatus(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="rounded-xl text-xs bg-background">
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-border/80 text-xs">
                <SelectItem value="all">Status: All</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-card glass border rounded-2xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-8 space-y-4">
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        ) : paginatedCommittees.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-background/80 border-b">
                <TableRow>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 w-1/3">
                    <button
                      onClick={() => handleSort("title")}
                      className="flex items-center gap-1 hover:text-foreground font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Committee Info
                      <ArrowUpDown className="size-3 text-muted-foreground" />
                    </button>
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 w-1/4">
                    Associated Campuses
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 text-center">
                    Members
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 text-center">
                    Documents
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 text-center">
                    <button
                      onClick={() => handleSort("displayOrder")}
                      className="flex items-center gap-1 mx-auto hover:text-foreground font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Display Order
                      <ArrowUpDown className="size-3 text-muted-foreground" />
                    </button>
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 text-center">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 text-right pr-6">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCommittees.map((c) => (
                  <TableRow
                    key={c.id}
                    className="hover:bg-accent/40 border-b last:border-0 transition-colors"
                  >
                    {/* Committee Info */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="size-11 rounded-xl overflow-hidden border bg-muted flex items-center justify-center shrink-0 shadow-sm">
                          {c.bannerImage ? (
                            <img
                              src={c.bannerImage}
                              alt={c.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="size-full bg-gradient-gold text-gold-foreground flex items-center justify-center font-sans font-bold text-sm">
                              {c.title
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-sans text-sm font-semibold text-foreground truncate">
                            {c.title}
                          </h3>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <Badge
                              variant="secondary"
                              className="text-[9px] rounded-md px-1.5 py-0 font-bold bg-background/60 border text-foreground/80"
                            >
                              {c.committeeType || "General"}
                            </Badge>
                            {c.category && (
                              <Badge
                                variant="outline"
                                className="text-[9px] rounded-md px-1.5 py-0 font-medium text-muted-foreground border-border bg-background/30"
                              >
                                {c.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Campuses */}
                    <TableCell className="py-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {getCampusBadges(c.campuses).map((name, idx) => (
                          <Badge
                            key={idx}
                            className="bg-primary/5 text-primary/80 border border-primary/10 rounded-md text-[9px] font-semibold py-0 px-1.5"
                          >
                            {name}
                          </Badge>
                        ))}
                        {c.campuses.length === 0 && (
                          <span className="text-xs text-muted-foreground italic">Global / All</span>
                        )}
                      </div>
                    </TableCell>

                    {/* Member Count */}
                    <TableCell className="py-4 text-center">
                      <Link
                        to="/@admin/committees/$id"
                        params={{ id: c.id }}
                        search={{ tab: "members" }}
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer group"
                      >
                        <Users className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span>{c.members.length}</span>
                      </Link>
                    </TableCell>

                    {/* Document Count */}
                    <TableCell className="py-4 text-center">
                      <Link
                        to="/@admin/committees/$id"
                        params={{ id: c.id }}
                        search={{ tab: "documents" }}
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer group"
                      >
                        <FileText className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span>{c.documents.length}</span>
                      </Link>
                    </TableCell>

                    {/* Display Order */}
                    <TableCell className="py-4 text-center text-xs font-bold text-foreground">
                      {c.displayOrder}
                    </TableCell>

                    {/* Publish Status Dropdown select */}
                    <TableCell className="py-4 text-center">
                      <div className="flex items-center justify-center">
                        <Select
                          value={c.status}
                          onValueChange={(val: any) => handleOpenStatusModal(c, val)}
                        >
                          <SelectTrigger
                            className={`w-28 h-8 rounded-lg text-[10px] font-bold ${getStatusBadgeColor(c.status)}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl text-[10px] border border-border/80">
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="PUBLISHED">Published</SelectItem>
                            <SelectItem value="ARCHIVED">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                          title="View Details"
                        >
                          <Link to="/@admin/committees/$id" params={{ id: c.id }}>
                            <Eye className="size-4" />
                          </Link>
                        </Button>

                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                          title="Edit Committee"
                        >
                          <Link to="/@admin/committees/$id/edit" params={{ id: c.id }}>
                            <Edit2 className="size-4" />
                          </Link>
                        </Button>

                        <Button
                          onClick={() => openDeleteModal(c)}
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                          title="Delete Committee"
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
        ) : (
          <div className="py-16 px-4 text-center max-w-md mx-auto">
            <div className="size-12 rounded-2xl bg-primary/5 text-primary grid place-items-center mx-auto mb-4 border border-primary/10 shadow-inner">
              <Layers className="size-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">No Committees Found</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              No committees match your search filters. Try resetting filters or create a new
              committee.
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="rounded-xl text-xs font-semibold"
              >
                Clear Filters
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl text-xs font-semibold"
              >
                <Link to="/@admin/committees/create">Add Committee</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Table Footer with Pagination */}
        {!isLoading && sortedCommittees.length > 0 && (
          <div className="border-t border-border/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-background/40">
            <div className="text-xs text-muted-foreground font-medium">
              Showing <span className="font-bold text-foreground">{startIndex + 1}</span> to{" "}
              <span className="font-bold text-foreground">
                {Math.min(startIndex + pageSize, totalItems)}
              </span>{" "}
              of <span className="font-bold text-foreground">{totalItems}</span> committees
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground font-semibold">
                  Rows per page
                </span>
                <Select
                  value={String(pageSize)}
                  onValueChange={(val) => {
                    setPageSize(Number(val));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-16 h-8 rounded-lg text-xs bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl text-xs">
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="size-8 rounded-lg"
                  >
                    <span className="sr-only">Previous Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </Button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "ghost"}
                        size="icon"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`size-8 rounded-lg text-xs ${
                          currentPage === pageNum
                            ? "bg-primary text-primary-foreground font-bold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="size-8 rounded-lg"
                  >
                    <span className="sr-only">Next Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modals */}

      {/* Status Toggle Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="rounded-2xl border border-border/80 max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg flex items-center gap-2">
              <AlertCircle className="size-5 text-amber-500" />
              Update Committee Status
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Are you sure you want to change the status of{" "}
              <strong>{committeeToToggle?.title}</strong> to <strong>{nextStatus}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-xs font-semibold"
                disabled={isTogglingStatus}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={confirmStatusUpdate}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl text-xs font-semibold"
              disabled={isTogglingStatus}
            >
              {isTogglingStatus ? (
                <>
                  <Loader2 className="size-3.5 mr-1.5 animate-spin" />
                  Updating...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="rounded-2xl border border-border/80 max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg text-destructive flex items-center gap-2">
              <AlertCircle className="size-5" />
              Delete Committee
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Are you sure you want to delete the committee{" "}
              <strong>{committeeToDelete?.title}</strong>? This will permanently delete the
              committee, its member rosters, and linked documents. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-xs font-semibold"
                disabled={isDeleting}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={confirmDelete}
              variant="destructive"
              size="sm"
              className="rounded-xl text-xs font-semibold"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-3.5 mr-1.5 animate-spin" />
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
