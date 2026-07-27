import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  Building,
  AlertCircle,
  FileText,
  Clock,
  ExternalLink,
  Info,
  CheckCircle,
  Archive,
  Send,
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
import { toast } from "sonner";
import { getStoredCampuses } from "@/data/campuses";
import { getStoredEvents, saveEvents, EventItem } from "@/data/events";

export const EventListing: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [events, setEvents] = useState<EventItem[]>([]);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCampus, setFilterCampus] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all"); // all, DRAFT, PUBLISHED, ARCHIVED
  const [filterWebsite, setFilterWebsite] = useState<string>("all"); // all, main, campus

  const [sortBy, setSortBy] = useState<"startDate" | "createdAt" | "title">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isStatusActionModalOpen, setIsStatusActionModalOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [pendingStatusAction, setPendingStatusAction] = useState<"PUBLISHED" | "ARCHIVED" | null>(
    null,
  );
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Load events & campuses
  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(getStoredEvents());
      setCampuses(getStoredCampuses());
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  // Helper to get campus name list for display
  const getMappedCampusesNames = (campusIds: string[]) => {
    if (campusIds.length === 0) return ["Global Institutions"];
    return campusIds.map((id) => {
      const c = campuses.find((item) => item.id === id);
      return c ? c.shortName : "Unknown";
    });
  };

  // Delete event
  const handleDeleteClick = (event: EventItem) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedEvent) return;
    setIsActionLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const updated = events.filter((e) => e.id !== selectedEvent.id);
    setEvents(updated);
    saveEvents(updated);
    setIsActionLoading(false);
    setIsDeleteModalOpen(false);

    toast.success(`Event "${selectedEvent.title}" deleted successfully.`);
    setSelectedEvent(null);
  };

  // Status transitions: Publish or Archive
  const handleStatusActionClick = (event: EventItem, action: "PUBLISHED" | "ARCHIVED") => {
    setSelectedEvent(event);
    setPendingStatusAction(action);
    setIsStatusActionModalOpen(true);
  };

  const confirmStatusAction = async () => {
    if (!selectedEvent || !pendingStatusAction) return;
    setIsActionLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const updated = events.map((e) => {
      if (e.id === selectedEvent.id) {
        return {
          ...e,
          status: pendingStatusAction,
          updatedAt: new Date().toISOString(),
        };
      }
      return e;
    });

    setEvents(updated);
    saveEvents(updated);
    setIsActionLoading(false);
    setIsStatusActionModalOpen(false);

    toast.success(`Event status transitioned to ${pendingStatusAction} successfully.`);
    setSelectedEvent(null);
    setPendingStatusAction(null);
  };

  const handleDetailsClick = (event: EventItem) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    if (status === "PUBLISHED") {
      return (
        <Badge className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold border-transparent bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400">
          PUBLISHED
        </Badge>
      );
    }
    if (status === "ARCHIVED") {
      return (
        <Badge className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold border-transparent bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
          ARCHIVED
        </Badge>
      );
    }
    return (
      <Badge className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold border-transparent bg-gold/10 text-gold-foreground">
        DRAFT
      </Badge>
    );
  };

  // Filters & Sorting logic
  const filteredEvents = events.filter((e) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      e.title.toLowerCase().includes(q) ||
      (e.venue && e.venue.toLowerCase().includes(q)) ||
      (e.organizer && e.organizer.toLowerCase().includes(q));
    const matchesCampus = filterCampus === "all" || e.campusIds.includes(filterCampus);
    const matchesStatus = filterStatus === "all" || e.status === filterStatus;
    const matchesWebsite =
      filterWebsite === "all" ||
      (filterWebsite === "main" ? e.isMainWebsite === true : e.isMainWebsite === false);

    return matchesSearch && matchesCampus && matchesStatus && matchesWebsite;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === "startDate") {
      comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    } else {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Pagination
  const totalItems = sortedEvents.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + pageSize);

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
            Event Management
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Create, edit, publish and map events, programs, conferences and examinations to
            campuses.
          </p>
        </div>
        <Button
          asChild
          className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 flex items-center gap-1.5 shadow-sm text-sm"
        >
          <Link to="/@admin/events/create">
            <Plus className="size-4" /> Add Event
          </Link>
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="glass rounded-xl p-4 border border-border/80 flex flex-col xl:flex-row gap-4 z-10">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search events by title, venue or organizer..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 pr-4 h-10 rounded-lg bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm"
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 w-full xl:w-auto">
          {/* Campus Filter */}
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
                <SelectItem value="DRAFT">DRAFT</SelectItem>
                <SelectItem value="PUBLISHED">PUBLISHED</SelectItem>
                <SelectItem value="ARCHIVED">ARCHIVED</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Main Website visibility */}
          <div className="flex flex-col space-y-1">
            <Select
              value={filterWebsite}
              onValueChange={(val) => {
                setFilterWebsite(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-10 rounded-lg border-border bg-background/50 hover:border-gold/40 text-xs">
                <SelectValue placeholder="Website Filter" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="all">All Visibility</SelectItem>
                <SelectItem value="main">Institutional Site</SelectItem>
                <SelectItem value="campus">Campus Portal Only</SelectItem>
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
              <SelectTrigger className="h-10 rounded-lg border-border bg-background/50 hover:border-gold/40 text-xs">
                <SelectValue placeholder="Sort Field" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="createdAt">Date Created</SelectItem>
                <SelectItem value="startDate">Event Date</SelectItem>
                <SelectItem value="title">Event Title</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order Direction */}
          <div className="flex flex-col space-y-1">
            <Select
              value={sortOrder}
              onValueChange={(val: any) => {
                setSortOrder(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-10 rounded-lg border-border bg-background/50 hover:border-gold/40 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
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
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex gap-4 items-center py-3 border-b border-border/40 last:border-0"
              >
                <Skeleton className="h-14 w-24 rounded-lg shrink-0" />
                <div className="flex-grow space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            ))}
          </div>
        ) : paginatedEvents.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Calendar className="size-12 text-muted-foreground/60 mb-3 animate-pulse" />
            <h3 className="font-display text-base font-bold text-foreground">No events found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
              We couldn't find any events matching your filters. Try checking different status or
              create a new event.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-4 h-8 rounded-lg text-xs font-semibold border-border"
            >
              <Link to="/@admin/events/create">
                <Plus className="size-3.5 mr-1" /> Add Event
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto flex-grow">
            <Table>
              <TableHeader className="bg-muted/40 hover:bg-muted/40 border-b border-border">
                <TableRow>
                  <TableHead className="w-[120px] pl-4 text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Banner
                  </TableHead>
                  <TableHead className="min-w-[200px] text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Event Details
                  </TableHead>
                  <TableHead className="min-w-[120px] text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Event Date & Time
                  </TableHead>
                  <TableHead className="min-w-[150px] text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Campuses
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Venue
                  </TableHead>
                  <TableHead className="text-center w-24 text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Status
                  </TableHead>
                  <TableHead className="text-right pr-6 w-40 text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEvents.map((event) => (
                  <TableRow
                    key={event.id}
                    className="hover:bg-muted/20 border-b border-border/40 transition-colors"
                  >
                    <TableCell className="pl-4 py-3">
                      <div className="h-12 w-20 bg-slate-900 border border-border rounded-lg overflow-hidden shrink-0 shadow-sm relative">
                        {event.bannerImage ? (
                          <img
                            src={event.bannerImage}
                            alt="Event Banner"
                            className="size-full object-cover"
                          />
                        ) : (
                          <div className="size-full flex items-center justify-center text-muted-foreground/40 text-[9px] uppercase font-bold text-center p-1 leading-none">
                            No Banner
                          </div>
                        )}
                        {event.isMainWebsite && (
                          <span
                            title="Institution Site Visible"
                            className="absolute bottom-1 right-1 size-3.5 rounded-full bg-gold/90 text-gold-foreground flex items-center justify-center text-[7px] font-extrabold border border-white/20"
                          >
                            G
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-foreground leading-snug">
                          {event.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
                          {event.shortDescription || "No short description."}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-xs font-medium text-foreground">
                      <div className="flex flex-col">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3 text-gold" />
                          {event.startDate}
                        </span>
                        {event.startTime && (
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5 pl-4">
                            {event.startTime} {event.endTime ? `- ${event.endTime}` : ""}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {getMappedCampusesNames(event.campusIds).map((name, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-[9px] px-2 py-0.5 rounded-full border border-primary/10 bg-primary/10 text-primary font-semibold"
                          >
                            {name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="size-3.5 text-gold shrink-0" />
                        <span className="line-clamp-1">{event.venue || "Campus-wide"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-3">
                      {getStatusBadge(event.status)}
                    </TableCell>
                    <TableCell className="text-right pr-6 py-3">
                      <div className="flex justify-end gap-1.5">
                        {/* Publish quick action */}
                        {event.status !== "PUBLISHED" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStatusActionClick(event, "PUBLISHED")}
                            className="size-8 rounded-lg hover:bg-green-100 dark:hover:bg-green-950/40 text-muted-foreground hover:text-green-600 transition-colors"
                            title="Publish Event"
                          >
                            <Send className="size-3.5" />
                          </Button>
                        )}
                        {/* Archive quick action */}
                        {event.status === "PUBLISHED" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStatusActionClick(event, "ARCHIVED")}
                            className="size-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-muted-foreground hover:text-slate-600 transition-colors"
                            title="Archive Event"
                          >
                            <Archive className="size-3.5" />
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDetailsClick(event)}
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
                          title="Edit Event"
                        >
                          <Link to="/@admin/events/$id/edit" params={{ id: event.id }}>
                            <Edit2 className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(event)}
                          className="size-8 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          title="Delete Event"
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

        {/* Pagination Footer */}
        {!isLoading && totalItems > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t border-border bg-muted/20">
            <div className="text-xs text-muted-foreground font-medium">
              Showing <span className="text-foreground">{startIndex + 1}</span> to{" "}
              <span className="text-foreground">{Math.min(startIndex + pageSize, totalItems)}</span>{" "}
              of <span className="text-foreground">{totalItems}</span> events
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
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
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

      {/* Modal: Status Action Confirmation */}
      <Dialog open={isStatusActionModalOpen} onOpenChange={setIsStatusActionModalOpen}>
        <DialogContent className="rounded-2xl max-w-sm border border-border bg-card">
          <DialogHeader className="space-y-2">
            <DialogTitle className="font-display font-bold text-lg text-foreground flex items-center gap-2">
              <Info className="size-5 text-gold" />
              Transition Event Status?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to transition{" "}
              <span className="font-semibold text-foreground">"{selectedEvent?.title}"</span> to{" "}
              <span className="font-semibold text-foreground">{pendingStatusAction}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl border border-border text-xs flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={confirmStatusAction}
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
        <DialogContent className="rounded-2xl max-w-sm border border-border bg-card">
          <DialogHeader className="space-y-2">
            <DialogTitle className="font-display font-bold text-lg text-destructive flex items-center gap-2">
              <AlertCircle className="size-5" />
              Delete Event?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              This action is permanent and cannot be undone. Are you sure you want to delete event{" "}
              <span className="font-semibold text-foreground">"{selectedEvent?.title}"</span>?
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
        <DialogContent className="rounded-2xl max-w-xl border border-border bg-card p-6 overflow-y-auto max-h-[90vh]">
          <DialogHeader className="pb-4 border-b border-border/40">
            <div className="flex items-start gap-4">
              <div className="h-16 w-24 bg-slate-900 border border-border rounded-lg overflow-hidden shrink-0 shadow-sm">
                {selectedEvent?.bannerImage ? (
                  <img
                    src={selectedEvent.bannerImage}
                    alt="Event Banner"
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center text-muted-foreground/35 text-[9px] uppercase font-bold text-center p-1 leading-none">
                    No Banner
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <DialogTitle className="font-display font-bold text-lg text-foreground leading-tight">
                  {selectedEvent?.title}
                </DialogTitle>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedEvent && getStatusBadge(selectedEvent.status)}
                  {selectedEvent?.isMainWebsite && (
                    <Badge
                      variant="outline"
                      className="rounded-full text-[9px] border-gold/30 bg-gold/5 text-gold-foreground font-medium px-2.5"
                    >
                      Main Institutions Site
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Details */}
          <div className="mt-4 space-y-4 text-xs">
            {/* description */}
            <div className="space-y-1 p-3.5 bg-muted/30 rounded-xl border border-border/40">
              <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                Description
              </span>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {selectedEvent?.description}
              </p>
            </div>

            {/* schedule grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  Event Date
                </span>
                <span className="text-foreground font-semibold flex items-center gap-1.5 mt-0.5">
                  <Calendar className="size-3.5 text-gold" />
                  {selectedEvent?.startDate}{" "}
                  {selectedEvent?.endDate ? `to ${selectedEvent.endDate}` : ""}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  Event Timings
                </span>
                <span className="text-foreground font-semibold flex items-center gap-1.5 mt-0.5">
                  <Clock className="size-3.5 text-gold" />
                  {selectedEvent?.startTime
                    ? `${selectedEvent.startTime} ${selectedEvent.endTime ? `- ${selectedEvent.endTime}` : ""}`
                    : "Not Specified"}
                </span>
              </div>
            </div>

            {/* venue/organizer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-0.5">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  Venue / Location
                </span>
                <span className="text-foreground font-semibold flex items-center gap-1.5 mt-0.5">
                  <MapPin className="size-3.5 text-gold" />
                  {selectedEvent?.venue || "Campus-wide"}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  Organized By
                </span>
                <span className="text-foreground font-semibold mt-0.5 block">
                  {selectedEvent?.organizer || "Admin Committee"}
                </span>
              </div>
            </div>

            {/* mapping list */}
            <div className="space-y-1">
              <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                Mapped Campuses
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {selectedEvent &&
                  getMappedCampusesNames(selectedEvent.campusIds).map((name, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="rounded-full text-[9px] border-primary/20 bg-primary/5 text-primary-foreground font-semibold px-2.5 py-0.5"
                    >
                      <Building className="size-3 text-gold mr-1" />
                      {name}
                    </Badge>
                  ))}
              </div>
            </div>

            {/* links */}
            {selectedEvent?.registrationLink && (
              <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                <span className="font-bold text-muted-foreground uppercase tracking-wider text-[10px]">
                  Registration URL
                </span>
                <a
                  href={selectedEvent.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline hover:text-gold flex items-center gap-1 font-semibold"
                >
                  Go to Link <ExternalLink className="size-3.5" />
                </a>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-1 border-t border-border/40 mt-4">
              <div className="space-y-0.5">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  URL Slug
                </span>
                <span className="text-foreground font-mono block mt-0.5 break-all">
                  {selectedEvent?.slug}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-muted-foreground uppercase tracking-wider block text-[10px]">
                  Record ID
                </span>
                <span className="text-foreground font-mono block mt-0.5 break-all">
                  {selectedEvent?.id}
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
