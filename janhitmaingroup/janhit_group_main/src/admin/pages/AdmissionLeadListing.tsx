import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  Eye,
  Mail,
  Phone,
  Building,
  Filter,
  RotateCcw,
  Loader2,
  AlertCircle,
  FileText,
  ArrowUpDown,
  Calendar,
  Layers,
  MapPin,
  ExternalLink,
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
import { getStoredAdmissionLeads, saveAdmissionLeads, AdmissionLead } from "@/data/admissionLeads";
import { getStoredCampuses } from "@/data/campuses";

export const AdmissionLeadListing: React.FC = () => {
  // State
  const [leads, setLeads] = useState<AdmissionLead[]>([]);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCampus, setFilterCampus] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Sorting
  const [sortBy, setSortBy] = useState<"name" | "course" | "status" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Status Change Dialog State
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [leadToToggle, setLeadToToggle] = useState<AdmissionLead | null>(null);
  const [nextStatus, setNextStatus] = useState<string>("");
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

  // Load initial data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLeads(getStoredAdmissionLeads());
      setCampuses(getStoredCampuses().filter((c) => c.status === "active"));
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterCampus("all");
    setFilterStatus("all");
    setCurrentPage(1);
    toast.success("Filters reset successfully");
  };

  // Open Status Confirmation Modal
  const handleOpenStatusModal = (lead: AdmissionLead, status: string) => {
    setLeadToToggle(lead);
    setNextStatus(status);
    setIsStatusModalOpen(true);
  };

  // Confirm Status Update
  const confirmStatusToggle = async () => {
    if (!leadToToggle || !nextStatus) return;
    setIsTogglingStatus(true);

    // Simulate brief network delay
    await new Promise((resolve) => setTimeout(resolve, 350));

    const updated = leads.map((l) => {
      if (l.id === leadToToggle.id) {
        return {
          ...l,
          status: nextStatus as any,
          updatedAt: new Date().toISOString(),
        };
      }
      return l;
    });

    setLeads(updated);
    saveAdmissionLeads(updated);

    // Save status log note inside localstorage timeline notes
    const storedNotesKey = `janhit_lead_notes_${leadToToggle.id}`;
    const storedNotes = localStorage.getItem(storedNotesKey);
    let notes = [];
    if (storedNotes) {
      try {
        notes = JSON.parse(storedNotes);
      } catch {
        notes = [];
      }
    }
    const newNote = {
      id: "note-status-" + Date.now(),
      text: `Lead status updated from ${leadToToggle.status} to ${nextStatus} via Listing Panel.`,
      createdAt: new Date().toISOString(),
      author: "Admin",
    };
    localStorage.setItem(storedNotesKey, JSON.stringify([newNote, ...notes]));

    setIsTogglingStatus(false);
    setIsStatusModalOpen(false);
    setLeadToToggle(null);
    toast.success(`Enquiry status updated to ${nextStatus} successfully.`);
  };

  // Sort toggle handler
  const handleSort = (field: "name" | "course" | "status" | "createdAt") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Filter & Search Logic
  const filteredLeads = leads.filter((lead) => {
    // Search query matches name, email, mobile
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchSearch =
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.mobile.includes(q) ||
        (lead.city && lead.city.toLowerCase().includes(q));
      if (!matchSearch) return false;
    }

    // Campus filter
    if (filterCampus !== "all" && lead.campusId !== filterCampus) {
      return false;
    }

    // Status filter
    if (filterStatus !== "all" && lead.status !== filterStatus) {
      return false;
    }

    return true;
  });

  // Sorting logic
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalItems = sortedLeads.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLeads = sortedLeads.slice(startIndex, startIndex + pageSize);

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

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-500/10 text-blue-600 border border-blue-500/20";
      case "CONTACTED":
        return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
      case "ADMISSION_DONE":
        return "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20";
      case "CLOSED":
        return "bg-slate-200 text-slate-600 border border-slate-300";
      default:
        return "bg-slate-200 text-slate-600 border border-slate-300";
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="p-4 md:p-6 flex flex-col flex-grow space-y-6 relative">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 size-[400px] bg-gradient-gold opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-primary opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Header Block */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Admission Leads
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Review, filter, track student queries, and transition candidates through the enrollment
          funnel.
        </p>
      </div>

      {/* Filters Box */}
      <div className="bg-card glass border rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Filter className="size-4 text-primary" />
            Filters & Search
          </div>
          {(searchQuery || filterCampus !== "all" || filterStatus !== "all") && (
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
              placeholder="Search leads by name, email, phone or city..."
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
                <SelectItem value="NEW">New Enquiry</SelectItem>
                <SelectItem value="CONTACTED">Contacted</SelectItem>
                <SelectItem value="ADMISSION_DONE">Admission Done</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
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
        ) : paginatedLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-background/80 border-b">
                <TableRow>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 w-1/4">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1 hover:text-foreground font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Enquirer Info
                      <ArrowUpDown className="size-3 text-muted-foreground" />
                    </button>
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 w-1/5">
                    <button
                      onClick={() => handleSort("course")}
                      className="flex items-center gap-1 hover:text-foreground font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Course Choice
                      <ArrowUpDown className="size-3 text-muted-foreground" />
                    </button>
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 w-1/4">
                    Selected Campus
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 text-center">
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="flex items-center gap-1 mx-auto hover:text-foreground font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Submitted Date
                      <ArrowUpDown className="size-3 text-muted-foreground" />
                    </button>
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5 text-center">
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-1 mx-auto hover:text-foreground font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Status
                      <ArrowUpDown className="size-3 text-muted-foreground" />
                    </button>
                  </TableHead>
                  <TableHead className="font-semibold text-xs py-3.5 text-right pr-6">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLeads.map((l) => (
                  <TableRow
                    key={l.id}
                    className="hover:bg-accent/40 border-b last:border-0 transition-colors"
                  >
                    {/* Candidate Info */}
                    <TableCell className="py-4">
                      <div>
                        <h3 className="font-sans text-sm font-semibold text-foreground flex items-center gap-1.5">
                          {l.name}
                          {l.city && (
                            <Badge
                              variant="outline"
                              className="text-[9px] rounded-md px-1 py-0 font-medium text-muted-foreground border-border bg-background/50"
                            >
                              {l.city}
                            </Badge>
                          )}
                        </h3>
                        <div className="flex flex-col gap-0.5 mt-1 text-[11px] text-muted-foreground">
                          <a
                            href={`mailto:${l.email}`}
                            className="hover:text-primary hover:underline"
                          >
                            {l.email}
                          </a>
                          <a href={`tel:${l.mobile}`} className="hover:text-primary font-medium">
                            {l.mobile}
                          </a>
                        </div>
                      </div>
                    </TableCell>

                    {/* Course Column */}
                    <TableCell className="py-4 text-xs font-bold text-foreground">
                      {l.course}
                    </TableCell>

                    {/* Campus Column */}
                    <TableCell className="py-4 text-xs font-semibold text-foreground/80">
                      <div
                        className="flex items-center gap-1.5 max-w-[190px] truncate"
                        title={getCampusName(l.campusId)}
                      >
                        <Building className="size-3.5 text-muted-foreground shrink-0" />
                        <span>{getCampusName(l.campusId)}</span>
                      </div>
                    </TableCell>

                    {/* Submission Date Column */}
                    <TableCell className="py-4 text-center text-xs font-medium text-foreground/80">
                      <div className="flex items-center justify-center gap-1">
                        <Calendar className="size-3.5 text-muted-foreground" />
                        <span>{formatDate(l.createdAt)}</span>
                      </div>
                    </TableCell>

                    {/* Status Column */}
                    <TableCell className="py-4 text-center">
                      <div className="flex items-center justify-center">
                        <Select
                          value={l.status}
                          onValueChange={(val) => handleOpenStatusModal(l, val)}
                        >
                          <SelectTrigger
                            className={`w-32 h-8 rounded-lg text-[10px] font-bold ${getStatusBadgeColor(l.status)}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl text-[10px] border border-border/80">
                            <SelectItem value="NEW">New</SelectItem>
                            <SelectItem value="CONTACTED">Contacted</SelectItem>
                            <SelectItem value="ADMISSION_DONE">Admission Done</SelectItem>
                            <SelectItem value="CLOSED">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>

                    {/* View Details Column */}
                    <TableCell className="py-4 text-right pr-6">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                        title="View Enquiry Profile"
                      >
                        <Link to="/@admin/admission-leads/$id" params={{ id: l.id }}>
                          <Eye className="size-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="py-16 px-4 text-center max-w-md mx-auto">
            <div className="size-12 rounded-2xl bg-primary/5 text-primary grid place-items-center mx-auto mb-4 border border-primary/10 shadow-inner">
              <FileText className="size-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">No Enquiries Found</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              No admission enquiries match your search queries or filter selections. Try clearing
              your filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="rounded-xl text-xs font-semibold mt-4"
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Table Footer with Pagination */}
        {!isLoading && sortedLeads.length > 0 && (
          <div className="border-t border-border/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-background/40">
            <div className="text-xs text-muted-foreground font-medium">
              Showing <span className="font-bold text-foreground">{startIndex + 1}</span> to{" "}
              <span className="font-bold text-foreground">
                {Math.min(startIndex + pageSize, totalItems)}
              </span>{" "}
              of <span className="font-bold text-foreground">{totalItems}</span> admission leads
            </div>

            <div className="flex items-center gap-4">
              {/* Rows per page */}
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

      {/* Confirmation Dialogs */}

      {/* Status Toggle Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="rounded-2xl border border-border/80 max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg flex items-center gap-2">
              <AlertCircle className="size-5 text-amber-500" />
              Update Lead Status
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Are you sure you want to change the status of <strong>{leadToToggle?.name}</strong>'s
              enquiry from <strong>{leadToToggle?.status}</strong> to <strong>{nextStatus}</strong>?
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
    </div>
  );
};
