import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Edit2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  School,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Loader2,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Campus } from "@/data/campuses";
import { campusService } from "@/admin/services/campusService";
import { toast } from "sonner";

interface CampusDetailsProps {
  id: string;
}

export const CampusDetails: React.FC<CampusDetailsProps> = ({ id }) => {
  const navigate = useNavigate();

  const [campus, setCampus] = useState<Campus | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Status Modal State
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

  // Retrieve campus on load
  const fetchCampus = async () => {
    setIsLoading(true);
    try {
      const data = await campusService.getCampusById(id);
      setCampus(data);
    } catch (error: any) {
      setErrorMsg(error.message || "Campus not found. It may have been deleted or the ID is invalid.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampus();
  }, [id]);

  const handleStatusToggle = async () => {
    if (!campus) return;
    setIsTogglingStatus(true);

    try {
      const newStatus = campus.status === "inactive";
      const updated = await campusService.updateCampusStatus(id, newStatus);
      setCampus(updated);
      toast.success("Campus status updated successfully.");
    } catch (error: any) {
      toast.error(error.message || "Failed to update campus status.");
    } finally {
      setIsTogglingStatus(false);
      setIsStatusModalOpen(false);
    }
  };

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
    } catch (e) {
      return dateStr;
    }
  };

  const initialsOfCampus = campus?.name
    ? campus.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <div className="p-4 md:p-6 flex flex-col flex-grow space-y-6 relative">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 size-[400px] bg-gradient-gold opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-primary opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Breadcrumb Navigation */}
      <div className="mb-5">
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
                <Link to="/@admin/campuses">Campus</Link>
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
        <div className="glass rounded-2xl p-8 border border-destructive/20 bg-destructive/5 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-12 z-10">
          <AlertCircle className="size-12 text-destructive mb-3" />
          <h2 className="font-display text-lg font-bold text-foreground">Failed to Load Campus</h2>
          <p className="text-sm text-muted-foreground mt-2">{errorMsg}</p>
          <Link
            to="/@admin/campuses"
            className="mt-6 inline-flex px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/95 shadow-sm"
          >
            Back to Campus Listing
          </Link>
        </div>
      ) : campus ? (
        <div className="space-y-6 z-10">
          {/* Top Section */}
          <div className="glass rounded-2xl p-6 border border-border/85 shadow-elegant flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              {/* Logo */}
              <div className="size-28 rounded-2xl border border-border bg-background grid place-items-center overflow-hidden shrink-0 shadow-sm">
                {campus.logo ? (
                  <img src={campus.logo} alt={campus.name} className="size-full object-cover" />
                ) : (
                  <div className="size-full bg-gradient-gold text-gold-foreground flex items-center justify-center font-bold text-2xl select-none">
                    {initialsOfCampus}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {campus.name}
                </h1>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <Badge
                    variant="outline"
                    className="font-mono text-xs bg-muted px-2 py-0.5 rounded border"
                  >
                    Code: {campus.code}
                  </Badge>
                  <Badge
                    variant={campus.status === "active" ? "default" : "secondary"}
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      campus.status === "active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {campus.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>

                {/* Web URL */}
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-primary font-medium">
                  <Globe className="size-3.5" />
                  <span className="hover:underline cursor-pointer">{campus.websiteUrl}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details grids */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Card: Basic Information */}
              <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
                <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
                  <Building className="size-4 text-primary" />
                  Basic Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1 p-3 rounded-lg bg-background/40 border">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                      Official Name
                    </span>
                    <span className="font-semibold text-foreground">{campus.name}</span>
                  </div>
                  <div className="space-y-1 p-3 rounded-lg bg-background/40 border">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                      Short Abbreviation
                    </span>
                    <span className="font-semibold text-foreground">{campus.shortName || "—"}</span>
                  </div>
                  <div className="space-y-1 p-3 rounded-lg bg-background/40 border">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                      Campus Identifier Code
                    </span>
                    <span className="font-semibold font-mono text-primary">{campus.code}</span>
                  </div>
                  <div className="space-y-1 p-3 rounded-lg bg-background/40 border">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                      Slug (URL Segment)
                    </span>
                    <span className="font-semibold font-mono text-muted-foreground">
                      {campus.slug}
                    </span>
                  </div>
                  <div className="space-y-1 p-3 rounded-lg bg-background/40 border sm:col-span-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                      Access Subdomain
                    </span>
                    <span className="font-semibold text-foreground">
                      {campus.subdomain}.janhitgroup.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Card: About */}
              {campus.description && (
                <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
                  <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
                    <School className="size-4 text-primary" />
                    About Campus
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {campus.description}
                  </p>
                </div>
              )}

              {/* Card: Physical Location */}
              <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
                <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  Physical Location
                </h2>
                <div className="space-y-4 text-sm">
                  <div className="p-3 rounded-lg bg-background/40 border space-y-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                      Street Address
                    </span>
                    <span className="font-semibold text-foreground">{campus.address || "—"}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg bg-background/40 border space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                        City
                      </span>
                      <span className="font-semibold text-foreground">{campus.city || "—"}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-background/40 border space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                        State
                      </span>
                      <span className="font-semibold text-foreground">{campus.state || "—"}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-background/40 border space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                        Pincode
                      </span>
                      <span className="font-semibold text-foreground">{campus.pincode || "—"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-6">
              {/* Action panel */}
              <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-3">
                <h2 className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/40">
                  Control Actions
                </h2>
                <Button
                  asChild
                  className="w-full rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 flex items-center justify-center gap-1.5 h-11"
                >
                  <Link to="/@admin/campuses/$id/edit" params={{ id: campus.id }}>
                    <Edit2 className="size-4" /> Edit Campus
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setIsStatusModalOpen(true)}
                  className="w-full rounded-xl border-border bg-background hover:bg-accent font-semibold flex items-center justify-center gap-1.5 h-11 text-foreground"
                >
                  {campus.status === "active" ? (
                    <>
                      <ToggleRight className="size-5 text-green-600" />
                      Deactivate Campus
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="size-5 text-muted-foreground" />
                      Activate Campus
                    </>
                  )}
                </Button>
              </div>

              {/* Card: Contact details */}
              <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
                <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
                  <Mail className="size-4 text-primary" />
                  Contact Details
                </h2>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3 items-start">
                    <div className="size-8 rounded-lg bg-primary/5 text-primary grid place-items-center shrink-0">
                      <Mail className="size-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-bold">
                        Email Address
                      </span>
                      <span className="font-semibold text-foreground break-all">
                        {campus.email || "—"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="size-8 rounded-lg bg-primary/5 text-primary grid place-items-center shrink-0">
                      <Phone className="size-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-bold">
                        Phone Number
                      </span>
                      <span className="font-semibold text-foreground">{campus.phone || "—"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card: System Timestamps */}
              <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
                <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
                  <Calendar className="size-4 text-primary" />
                  System Timestamps
                </h2>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3 items-start">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-bold">
                        Registered Date
                      </span>
                      <span className="font-medium text-foreground">
                        {formatDate(campus.createdDate)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-bold">
                        Last Modified Date
                      </span>
                      <span className="font-medium text-foreground">
                        {formatDate(campus.updatedDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center py-20">
          <Loader2 className="size-8 text-primary animate-spin" />
        </div>
      )}

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

          {campus && (
            <div className="my-2 p-3 bg-muted/40 rounded-xl border text-center">
              <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">
                Target Campus
              </span>
              <span className="text-sm font-bold text-foreground">{campus.name}</span>
              <div className="mt-2 flex items-center justify-center gap-2 text-xs">
                <span className="text-muted-foreground">Current:</span>
                <Badge
                  variant="outline"
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    campus.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {campus.status === "active" ? "Active" : "Inactive"}
                </Badge>
                <span className="text-muted-foreground">→</span>
                <span className="text-muted-foreground">New:</span>
                <Badge
                  variant="outline"
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    campus.status === "inactive"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {campus.status === "inactive" ? "Active" : "Inactive"}
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
              onClick={handleStatusToggle}
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
