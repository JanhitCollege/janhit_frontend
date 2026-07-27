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
  Star,
  Loader2,
  AlertCircle,
  GraduationCap,
  Sparkles,
  ArrowUpDown,
  BookOpen,
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
import { getStoredFaculties, saveFaculties, FacultyProfile } from "@/data/faculties";
import { getStoredCampuses } from "@/data/campuses";

export const FacultyListing: React.FC = () => {
  // State
  const [faculties, setFaculties] = useState<FacultyProfile[]>([]);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCampus, setFilterCampus] = useState<string>("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterHod, setFilterHod] = useState<string>("all");
  const [filterFeatured, setFilterFeatured] = useState<string>("all");

  // Sorting
  const [sortBy, setSortBy] = useState<"name" | "displayOrder" | "createdAt" | "updatedAt">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modals state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState<FacultyProfile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [facultyToToggle, setFacultyToToggle] = useState<FacultyProfile | null>(null);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

  // Load initial data
  useEffect(() => {
    const timer = setTimeout(() => {
      setFaculties(getStoredFaculties());
      setCampuses(getStoredCampuses().filter((c) => c.status === "active"));
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Get unique departments for filters
  const departmentsList = Array.from(
    new Set(faculties.map((f) => f.department).filter((d) => d && d.trim() !== "")),
  ).sort();

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterCampus("all");
    setFilterDepartment("all");
    setFilterStatus("all");
    setFilterHod("all");
    setFilterFeatured("all");
    setCurrentPage(1);
    toast.success("Filters reset successfully");
  };

  // Open Status Confirmation Modal
  const openStatusModal = (faculty: FacultyProfile) => {
    setFacultyToToggle(faculty);
    setIsStatusModalOpen(true);
  };

  // Confirm Status Toggle (isActive)
  const confirmStatusToggle = async () => {
    if (!facultyToToggle) return;
    setIsTogglingStatus(true);

    // Simulate brief network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const updated = faculties.map((f) => {
      if (f.id === facultyToToggle.id) {
        const nextActive = !f.isActive;
        return {
          ...f,
          isActive: nextActive,
          updatedAt: new Date().toISOString(),
        };
      }
      return f;
    });

    setFaculties(updated);
    saveFaculties(updated);
    setIsTogglingStatus(false);
    setIsStatusModalOpen(false);
    setFacultyToToggle(null);
    toast.success(`Faculty profile status updated successfully.`);
  };

  // Open Delete Modal
  const openDeleteModal = (faculty: FacultyProfile) => {
    setFacultyToDelete(faculty);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!facultyToDelete) return;
    setIsDeleting(true);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    const updated = faculties.filter((f) => f.id !== facultyToDelete.id);
    setFaculties(updated);
    saveFaculties(updated);

    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setFacultyToDelete(null);
    toast.success("Faculty profile deleted successfully.");
  };

  // Sort toggle handler
  const handleSort = (field: "name" | "displayOrder" | "createdAt" | "updatedAt") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Filter & Search Logic
  const filteredFaculties = faculties.filter((faculty) => {
    // Search
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchSearch =
        faculty.name.toLowerCase().includes(q) ||
        (faculty.designation && faculty.designation.toLowerCase().includes(q)) ||
        (faculty.department && faculty.department.toLowerCase().includes(q)) ||
        (faculty.qualification && faculty.qualification.toLowerCase().includes(q)) ||
        (faculty.specialization && faculty.specialization.toLowerCase().includes(q));
      if (!matchSearch) return false;
    }

    // Campus filter
    if (filterCampus !== "all" && faculty.campusId !== filterCampus) {
      return false;
    }

    // Department filter
    if (filterDepartment !== "all" && faculty.department !== filterDepartment) {
      return false;
    }

    // Status filter
    if (filterStatus !== "all") {
      const isActiveValue = filterStatus === "active";
      if (faculty.isActive !== isActiveValue) return false;
    }

    // HOD filter
    if (filterHod !== "all") {
      const isHodValue = filterHod === "yes";
      if (faculty.isHod !== isHodValue) return false;
    }

    // Featured filter
    if (filterFeatured !== "all") {
      const isFeaturedValue = filterFeatured === "yes";
      if (faculty.isFeatured !== isFeaturedValue) return false;
    }

    return true;
  });

  // Sorting logic
  const sortedFaculties = [...filteredFaculties].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalItems = sortedFaculties.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedFaculties = sortedFaculties.slice(startIndex, startIndex + pageSize);

  // Keep page index within bounds if filters update
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Helper to resolve campus name
  const getCampusName = (cid: string) => {
    const found = campuses.find((c) => c.id === cid);
    return found ? found.name : "Unknown Campus";
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
            Faculty profiles
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Manage academic and school faculty profiles, designations, contact details, and display
            visibility.
          </p>
        </div>

        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm rounded-xl px-5 self-start sm:self-center"
        >
          <Link to="/@admin/faculties/create">
            <Plus className="size-4 mr-2" />
            Add Faculty
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
            filterDepartment !== "all" ||
            filterStatus !== "all" ||
            filterHod !== "all" ||
            filterFeatured !== "all") && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline transition-all"
            >
              <RotateCcw className="size-3" />
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {/* Search bar */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search faculty..."
              className="pl-9 rounded-xl text-xs bg-background"
            />
          </div>

          {/* Campus Select */}
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

          {/* Department Select */}
          <div>
            <Select
              value={filterDepartment}
              onValueChange={(val) => {
                setFilterDepartment(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="rounded-xl text-xs bg-background">
                <SelectValue placeholder="All Depts" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-border/80 text-xs">
                <SelectItem value="all">All Departments</SelectItem>
                {departmentsList.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Select */}
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* HOD / Featured Select */}
          <div>
            <Select
              value={filterFeatured}
              onValueChange={(val) => {
                setFilterFeatured(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="rounded-xl text-xs bg-background">
                <SelectValue placeholder="Featured: All" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-border/80 text-xs">
                <SelectItem value="all">Featured: All</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
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
        ) : paginatedFaculties.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-background/80 border-b">
                <TableRow>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 w-1/4">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1 hover:text-foreground font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Faculty Member
                      <ArrowUpDown className="size-3 text-muted-foreground" />
                    </button>
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 w-1/4">
                    Campus
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 w-1/4">
                    Role / Department
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
                {paginatedFaculties.map((f) => (
                  <TableRow
                    key={f.id}
                    className="hover:bg-accent/40 border-b last:border-0 transition-colors"
                  >
                    {/* Faculty profile details column */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-11 rounded-xl overflow-hidden border bg-muted flex items-center justify-center shrink-0 shadow-sm">
                          {f.image ? (
                            <img
                              src={f.image}
                              alt={f.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="size-full bg-gradient-gold text-gold-foreground flex items-center justify-center font-sans font-bold text-sm">
                              {f.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-sans text-sm font-semibold text-foreground truncate">
                            {f.name}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {f.isHod && (
                              <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/10 border border-amber-500/20 text-[9px] rounded-md px-1.5 py-0">
                                HOD
                              </Badge>
                            )}
                            {f.isFeatured && (
                              <Badge className="bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/10 border border-indigo-500/20 text-[9px] rounded-md px-1.5 py-0 flex items-center gap-0.5">
                                <Star className="size-2.5 fill-indigo-500 text-indigo-500" />
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Campus Column */}
                    <TableCell className="py-4 text-xs font-semibold text-foreground/80">
                      <div
                        className="flex items-center gap-1.5 max-w-[180px] truncate"
                        title={getCampusName(f.campusId)}
                      >
                        <Building className="size-3.5 text-muted-foreground shrink-0" />
                        <span>{getCampusName(f.campusId)}</span>
                      </div>
                    </TableCell>

                    {/* Role & Dept Column */}
                    <TableCell className="py-4">
                      <div className="text-xs font-medium text-foreground">
                        {f.designation || "—"}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-semibold mt-0.5 uppercase tracking-wider">
                        {f.department || "—"}
                      </div>
                    </TableCell>

                    {/* Display Order Column */}
                    <TableCell className="py-4 text-center text-xs font-bold text-foreground">
                      {f.displayOrder}
                    </TableCell>

                    {/* Status Column */}
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center">
                        <Switch
                          checked={f.isActive}
                          onCheckedChange={() => openStatusModal(f)}
                          className="data-[state=checked]:bg-emerald-500"
                        />
                      </div>
                    </TableCell>

                    {/* Actions Column */}
                    <TableCell className="py-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Details */}
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                          title="View Details"
                        >
                          <Link to="/@admin/faculties/$id" params={{ id: f.id }}>
                            <Eye className="size-4" />
                          </Link>
                        </Button>

                        {/* Edit */}
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                          title="Edit Profile"
                        >
                          <Link to="/@admin/faculties/$id/edit" params={{ id: f.id }}>
                            <Edit2 className="size-4" />
                          </Link>
                        </Button>

                        {/* Delete */}
                        <Button
                          onClick={() => openDeleteModal(f)}
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                          title="Delete Profile"
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
              <GraduationCap className="size-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">
              No Faculty Profiles Found
            </h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              No results match your search queries or filter selections. Try clearing your filters
              or add a new faculty member.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="rounded-xl text-xs font-semibold"
              >
                Clear Search
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm rounded-xl text-xs font-semibold"
              >
                <Link to="/@admin/faculties/create">Add Faculty</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Table Footer with Pagination */}
        {!isLoading && sortedFaculties.length > 0 && (
          <div className="border-t border-border/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-background/40">
            <div className="text-xs text-muted-foreground font-medium">
              Showing <span className="font-bold text-foreground">{startIndex + 1}</span> to{" "}
              <span className="font-bold text-foreground">
                {Math.min(startIndex + pageSize, totalItems)}
              </span>{" "}
              of <span className="font-bold text-foreground">{totalItems}</span> faculty profiles
            </div>

            <div className="flex items-center gap-4">
              {/* Items per page selector */}
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
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
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
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNum = index + 1;
                      return (
                        <PaginationItem key={pageNum}>
                          <Button
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
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
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
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
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
              Toggle Active Status
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Are you sure you want to change the active status of{" "}
              <strong>{facultyToToggle?.name}</strong>?
              {facultyToToggle?.isActive ? (
                <span> Deactivating this profile will hide it from all public lists.</span>
              ) : (
                <span>
                  {" "}
                  Activating this profile will make it visible in directories on the public portal.
                </span>
              )}
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
              onClick={confirmStatusToggle}
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
              Delete Faculty Profile
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Are you sure you want to delete the faculty profile for{" "}
              <strong>{facultyToDelete?.name}</strong>? This action cannot be undone and will
              permanently remove the record from the directory database.
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
