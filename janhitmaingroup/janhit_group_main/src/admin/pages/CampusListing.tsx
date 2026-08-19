import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  Plus,
  Eye,
  Edit2,
  Globe,
  Mail,
  Phone,
  Building,
  ToggleLeft,
  ToggleRight,
  Loader2,
  AlertCircle,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Campus } from "@/data/campuses";
import { campusService } from "@/admin/services/campusService";
import { toast } from "sonner";

export const CampusListing: React.FC = () => {
  // State
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "createdDate" | "updatedDate" | "name" | "code" | "city" | "state"
  >("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Status Modal State
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [campusToToggle, setCampusToToggle] = useState<Campus | null>(null);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

  // Load campuses from API
  const fetchCampuses = async () => {
    setIsLoading(true);
    try {
      const response = await campusService.getAllCampuses({
        page: currentPage,
        limit: pageSize,
        search: searchQuery || undefined,
        sortBy,
        sortOrder,
      });
      setCampuses(response.campuses);
      setTotalItems(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
    } catch (error: any) {
      toast.error(error.message || "Failed to load campuses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampuses();
  }, [currentPage, pageSize, searchQuery, sortBy, sortOrder]);

  // Open Status Confirmation Modal
  const openStatusModal = (campus: Campus) => {
    setCampusToToggle(campus);
    setIsStatusModalOpen(true);
  };

  // Confirm Status Change
  const confirmStatusToggle = async () => {
    if (!campusToToggle) return;
    setIsTogglingStatus(true);

    try {
      const newStatus = campusToToggle.status === "inactive";
      await campusService.updateCampusStatus(campusToToggle.id, newStatus);
      toast.success("Campus status updated successfully.");
      await fetchCampuses();
    } catch (error: any) {
      toast.error(error.message || "Failed to update campus status.");
    } finally {
      setIsTogglingStatus(false);
      setIsStatusModalOpen(false);
      setCampusToToggle(null);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCampuses = campuses;

  // Keep page index within bounds if filters change
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
            Campus Management
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Create, edit, toggle and manage various institutions, schools, and colleges.
          </p>
        </div>
        <Button
          asChild
          className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 flex items-center gap-1.5 shadow-sm text-sm"
        >
          <Link to="/@admin/campuses/create">
            <Plus className="size-4" /> Add Campus
          </Link>
        </Button>
      </div>

      {/* Filters and Search Bar Section */}
      <div className="glass rounded-xl p-4 border border-border/80 flex flex-col lg:flex-row gap-4 z-10">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search campus..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 pr-4 h-10 rounded-lg bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              Sort By
            </span>
            <Select
              value={sortBy}
              onValueChange={(val: any) => {
                setSortBy(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[150px] h-10 rounded-lg border-border bg-background/50 hover:border-gold/40 text-sm">
                <SelectValue placeholder="Sort Field" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="createdDate">Created Date</SelectItem>
                <SelectItem value="updatedDate">Updated Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="code">Code</SelectItem>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="state">State</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              Order
            </span>
            <Select
              value={sortOrder}
              onValueChange={(val: "asc" | "desc") => {
                setSortOrder(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[130px] h-10 rounded-lg border-border bg-background/50 hover:border-gold/40 text-sm">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Premium Campus Table View */}
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
                className="flex gap-4 items-center py-2 border-b border-border/40 last:border-0"
              >
                <Skeleton className="size-10 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-5 w-20 rounded" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            ))}
          </div>
        ) : paginatedCampuses.length > 0 ? (
          <div className="flex-grow flex flex-col justify-between">
            {/* Table Container */}
            <div className="overflow-x-auto w-full">
              <Table className="w-full min-w-[700px] border-collapse">
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="w-[65px] pl-5 text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Logo
                    </TableHead>
                    <TableHead className="min-w-[200px] text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Campus Name
                    </TableHead>
                    <TableHead className="hidden sm:table-cell text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Slug
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Website URL
                    </TableHead>
                    <TableHead className="hidden lg:table-cell text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Email
                    </TableHead>
                    <TableHead className="hidden lg:table-cell text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Phone No
                    </TableHead>
                    <TableHead className="pr-5 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCampuses.map((campus) => {
                    const campusInitials = campus.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    return (
                      <TableRow
                        key={campus.id}
                        className="hover:bg-gold/5 dark:hover:bg-gold/5 transition-colors border-b border-border/60"
                      >
                        {/* Logo cell */}
                        <TableCell className="pl-5 py-3.5">
                          <div className="size-10 rounded-lg overflow-hidden border border-border bg-background grid place-items-center shrink-0">
                            {campus.logo ? (
                              <img
                                src={campus.logo}
                                alt={campus.name}
                                className="size-full object-cover"
                              />
                            ) : (
                              <div className="size-full bg-gradient-gold text-gold-foreground flex items-center justify-center font-bold text-xs">
                                {campusInitials}
                              </div>
                            )}
                          </div>
                        </TableCell>

                        {/* Name and Mobile sub-details cell */}
                        <TableCell className="py-3.5">
                          <div>
                            <div className="font-semibold text-sm text-foreground">
                              {campus.name}
                            </div>
                            {/* Small responsive indicators visible on mobile viewports */}
                            <div className="text-[10px] font-mono text-muted-foreground mt-0.5 sm:hidden space-x-1.5 flex items-center">
                              <span className="bg-primary/5 text-primary border border-primary/10 px-1 py-0.5 rounded text-[8px] font-bold">
                                {campus.code}
                              </span>
                              <span>•</span>
                              <span>{campus.slug}</span>
                            </div>
                          </div>
                        </TableCell>

                        {/* Slug (hidden sm) */}
                        <TableCell className="hidden sm:table-cell text-xs font-mono py-3.5 text-muted-foreground">
                          {campus.slug}
                        </TableCell>

                        {/* Website URL (hidden md) */}
                        <TableCell className="hidden md:table-cell py-3.5 text-xs">
                          <a
                            href={campus.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-gold hover:underline font-medium whitespace-nowrap transition-colors"
                          >
                            {campus.websiteUrl.replace("https://", "")}
                          </a>
                        </TableCell>

                        {/* Email (hidden lg) */}
                        <TableCell className="hidden lg:table-cell text-xs py-3.5 max-w-[150px] truncate">
                          {campus.email ? (
                            <a
                              href={`mailto:${campus.email}`}
                              className="text-primary hover:text-gold hover:underline font-medium transition-colors"
                            >
                              {campus.email}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>

                        {/* Phone No (hidden lg) */}
                        <TableCell className="hidden lg:table-cell text-xs py-3.5 whitespace-nowrap text-muted-foreground">
                          {campus.phone || "—"}
                        </TableCell>

                        {/* Actions & Status Switch */}
                        <TableCell className="pr-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Status badge & Switch */}
                            <div className="flex items-center gap-1.5 mr-2">
                              <Badge
                                variant={campus.status === "active" ? "default" : "secondary"}
                                className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                  campus.status === "active"
                                    ? "bg-green-150 text-green-700 border-green-200"
                                    : "bg-gray-100 text-gray-700 border-gray-200"
                                }`}
                              >
                                {campus.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                              <button
                                onClick={() => openStatusModal(campus)}
                                className={`size-7 rounded-lg hover:bg-accent flex items-center justify-center transition-colors ${
                                  campus.status === "active"
                                    ? "text-green-600 hover:text-green-700"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                                title="Toggle Status"
                              >
                                {campus.status === "active" ? (
                                  <ToggleRight className="size-4.5" />
                                ) : (
                                  <ToggleLeft className="size-4.5" />
                                )}
                              </button>
                            </div>

                            {/* View link button */}
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                              asChild
                              title="View Details"
                            >
                              <Link to="/@admin/campuses/$id" params={{ id: campus.id }}>
                                <Eye className="size-4" />
                              </Link>
                            </Button>

                            {/* Edit link button */}
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                              asChild
                              title="Edit Campus"
                            >
                              <Link to="/@admin/campuses/$id/edit" params={{ id: campus.id }}>
                                <Edit2 className="size-3.5" />
                              </Link>
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
                  of <span className="font-semibold text-foreground">{totalItems}</span> campuses
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
              <Building className="size-8 text-muted-foreground" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">No Campuses Found</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
              Create your first campus to get started or adjust your search filters to find existing
              campuses.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="rounded-xl border-border font-semibold hover:bg-accent text-sm"
                >
                  Clear Search
                </Button>
              )}
              <Button
                asChild
                className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 flex items-center gap-1.5 shadow-sm text-sm"
              >
                <Link to="/@admin/campuses/create">
                  <Plus className="size-4" /> Add Campus
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="rounded-2xl max-w-sm border border-border/80 shadow-elegant p-6 bg-background/95 backdrop-blur-md">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="size-12 rounded-full bg-destructive/10 text-destructive grid place-items-center mb-3">
              <AlertCircle className="size-6" />
            </div>
            <DialogTitle className="font-display text-lg font-bold text-foreground">
              Change Campus Status
            </DialogTitle>
            <DialogDescription className="text-xs md:text-sm text-muted-foreground mt-1 leading-relaxed">
              Are you sure you want to change the status of this campus?
            </DialogDescription>
          </DialogHeader>

          {campusToToggle && (
            <div className="my-2 p-3 bg-muted/40 rounded-xl border text-center">
              <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">
                Target Campus
              </span>
              <span className="text-sm font-bold text-foreground">{campusToToggle.name}</span>
              <div className="mt-2 flex items-center justify-center gap-2 text-xs">
                <span className="text-muted-foreground">Current:</span>
                <Badge
                  variant="outline"
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    campusToToggle.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {campusToToggle.status === "active" ? "Active" : "Inactive"}
                </Badge>
                <span className="text-muted-foreground">→</span>
                <span className="text-muted-foreground">New:</span>
                <Badge
                  variant="outline"
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    campusToToggle.status === "inactive"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {campusToToggle.status === "inactive" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-row justify-center gap-3 mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="rounded-xl border-border font-semibold flex-1 text-sm"
                disabled={isTogglingStatus}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={confirmStatusToggle}
              className="rounded-xl bg-primary text-primary-foreground font-semibold flex-1 text-sm hover:bg-primary/95 flex items-center justify-center gap-1.5"
              disabled={isTogglingStatus}
            >
              {isTogglingStatus ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
