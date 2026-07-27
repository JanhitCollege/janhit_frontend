import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  Calendar,
  Building,
  User,
  AlertCircle,
  Loader2,
  ChevronRight,
  MessageSquare,
  Clock,
  Send,
  Trash2,
  CheckCircle,
  ExternalLink,
  MapPin,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getStoredAdmissionLeads, saveAdmissionLeads, AdmissionLead } from "@/data/admissionLeads";
import { getStoredCampuses } from "@/data/campuses";
import { toast } from "sonner";

interface AdmissionLeadDetailsProps {
  id: string;
}

interface TimelineNote {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export const AdmissionLeadDetails: React.FC<AdmissionLeadDetailsProps> = ({ id }) => {
  const [lead, setLead] = useState<AdmissionLead | null>(null);
  const [campusName, setCampusName] = useState<string>("Unknown Campus");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Status updating state
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Notes state
  const [notes, setNotes] = useState<TimelineNote[]>([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Retrieve lead and notes on load
  useEffect(() => {
    const timer = setTimeout(() => {
      const leadsList = getStoredAdmissionLeads();
      const found = leadsList.find((l) => l.id === id);
      if (found) {
        setLead(found);
        setCurrentStatus(found.status);

        // Find campus name
        const campuses = getStoredCampuses();
        const camp = campuses.find((c) => c.id === found.campusId);
        if (camp) {
          setCampusName(camp.name);
        }

        // Load notes from localstorage for this lead
        const storedNotesKey = `janhit_lead_notes_${id}`;
        const storedNotes = localStorage.getItem(storedNotesKey);
        if (storedNotes) {
          try {
            setNotes(JSON.parse(storedNotes));
          } catch {
            setNotes([]);
          }
        } else {
          // Default initial note
          const initialNotes: TimelineNote[] = [
            {
              id: "init-1",
              text: `Admission enquiry submitted by student choosing course: ${found.course}.`,
              createdAt: found.createdAt,
              author: "System",
            },
          ];
          setNotes(initialNotes);
          localStorage.setItem(storedNotesKey, JSON.stringify(initialNotes));
        }
      } else {
        setErrorMsg("Admission lead not found. It may have been deleted or the ID is invalid.");
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  const handleStatusChange = async (nextStatus: string) => {
    if (!lead) return;
    setIsUpdatingStatus(true);

    // Simulate brief network delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    const leadsList = getStoredAdmissionLeads();
    const updated = leadsList.map((l) => {
      if (l.id === id) {
        return {
          ...l,
          status: nextStatus as any,
          updatedAt: new Date().toISOString(),
        };
      }
      return l;
    });

    saveAdmissionLeads(updated);

    // Add timeline entry for status update
    const newNote: TimelineNote = {
      id: "note-status-" + Date.now(),
      text: `Lead status updated from ${lead.status} to ${nextStatus}.`,
      createdAt: new Date().toISOString(),
      author: "Admin",
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem(`janhit_lead_notes_${id}`, JSON.stringify(updatedNotes));

    // Update local state
    setLead({ ...lead, status: nextStatus as any, updatedAt: new Date().toISOString() });
    setCurrentStatus(nextStatus);
    setIsUpdatingStatus(false);

    toast.success(`Lead status updated to ${nextStatus} successfully.`);
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !lead) return;
    setIsAddingNote(true);

    // Simulate short network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const newNote: TimelineNote = {
      id: "note-" + Date.now(),
      text: newNoteText.trim(),
      createdAt: new Date().toISOString(),
      author: "Admin",
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem(`janhit_lead_notes_${id}`, JSON.stringify(updatedNotes));

    setNewNoteText("");
    setIsAddingNote(false);
    toast.success("Timeline comment added successfully.");
  };

  const handleDeleteNote = (noteId: string) => {
    const updated = notes.filter((n) => n.id !== noteId);
    setNotes(updated);
    localStorage.setItem(`janhit_lead_notes_${id}`, JSON.stringify(updated));
    toast.success("Timeline comment deleted.");
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

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center py-20">
        <Loader2 className="size-8 text-primary animate-spin" />
      </div>
    );
  }

  if (errorMsg || !lead) {
    return (
      <div className="p-4 md:p-6 flex flex-col flex-grow relative">
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
                  <Link to="/@admin/admission-leads">Admission Leads</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="glass rounded-2xl p-8 border border-destructive/20 bg-destructive/5 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-12 z-10">
          <AlertCircle className="size-12 text-destructive mb-3" />
          <h2 className="font-display text-lg font-bold text-foreground">Failed to Load Lead</h2>
          <p className="text-sm text-muted-foreground mt-2">{errorMsg || "An error occurred."}</p>
          <Link
            to="/@admin/admission-leads"
            className="mt-6 inline-flex px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/95 shadow-sm"
          >
            Back to Leads Listing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 flex flex-col flex-grow space-y-6 relative">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 size-[400px] bg-gradient-gold opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-primary opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Header and Breadcrumb */}
      <div>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/@admin/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/@admin/admission-leads">Admission Leads</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lead.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Lead Details
            </h1>
            <Badge
              className={`rounded-xl text-[10px] font-semibold tracking-wide py-0.5 px-2.5 ${getStatusBadgeColor(lead.status)}`}
            >
              {lead.status}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-semibold">Change Status:</span>
            <Select
              value={currentStatus}
              onValueChange={handleStatusChange}
              disabled={isUpdatingStatus}
            >
              <SelectTrigger className="w-40 h-9 rounded-xl bg-background text-xs font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl text-xs border border-border/80">
                <SelectItem value="NEW">New Enquiry</SelectItem>
                <SelectItem value="CONTACTED">Contacted</SelectItem>
                <SelectItem value="ADMISSION_DONE">Admission Done</SelectItem>
                <SelectItem value="CLOSED">Closed / No Action</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Lead info display & notes history grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Lead Info profile card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card glass border rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full pointer-events-none" />

            {/* Big Initial Badge */}
            <div className="size-20 rounded-2xl bg-gradient-gold text-gold-foreground flex items-center justify-center font-display font-bold text-2xl shadow-sm mb-4">
              {lead.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>

            <h2 className="font-display text-xl font-bold text-foreground">{lead.name}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Enquired for Course: <span className="font-bold text-foreground">{lead.course}</span>
            </p>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-2 mt-5">
              <Button
                asChild
                variant="outline"
                className="rounded-xl text-xs py-5 px-3 flex flex-col items-center justify-center gap-1 hover:border-primary/30 hover:bg-primary/5 text-primary"
                title="Send Email"
              >
                <a href={`mailto:${lead.email}`}>
                  <Mail className="size-4 shrink-0" />
                  <span>Email</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl text-xs py-5 px-3 flex flex-col items-center justify-center gap-1 hover:border-primary/30 hover:bg-primary/5 text-primary"
                title="Call Candidate"
              >
                <a href={`tel:${lead.mobile}`}>
                  <Phone className="size-4 shrink-0" />
                  <span>Call</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl text-xs py-5 px-3 flex flex-col items-center justify-center gap-1 hover:border-green-500/30 hover:bg-green-50 text-green-600"
                title="WhatsApp Candidate"
              >
                <a
                  href={`https://wa.me/91${lead.mobile.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="size-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </Button>
            </div>

            {/* Inquirer details */}
            <div className="w-full border-t border-border/40 mt-6 pt-5 space-y-4">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Mobile Number
                </p>
                <p className="text-xs text-foreground font-semibold mt-1">{lead.mobile}</p>
              </div>

              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Email Address
                </p>
                <p className="text-xs text-foreground font-semibold mt-1 break-all">{lead.email}</p>
              </div>

              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Selected Campus
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Building className="size-3.5 text-muted-foreground" />
                  <p className="text-xs text-foreground font-semibold">{campusName}</p>
                </div>
              </div>

              {lead.city && (
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    City / Location
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="size-3.5 text-muted-foreground" />
                    <p className="text-xs text-foreground font-semibold">{lead.city}</p>
                  </div>
                </div>
              )}

              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Submission Date
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Calendar className="size-3.5 text-muted-foreground" />
                  <p className="text-xs text-foreground font-semibold">
                    {formatDate(lead.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Message & Timeline / notes log */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enquiry message card */}
          <div className="bg-card glass border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-lg text-foreground border-b pb-2 flex items-center gap-2">
              <MessageSquare className="size-5 text-primary" />
              Candidate Message
            </h3>
            {lead.message ? (
              <p className="text-sm text-foreground/80 leading-relaxed bg-background/50 border border-border/40 p-4 rounded-xl whitespace-pre-line italic">
                "{lead.message}"
              </p>
            ) : (
              <p className="text-sm text-muted-foreground italic bg-background/30 p-3 rounded-xl border border-border/40 text-center">
                No custom message provided during submission.
              </p>
            )}
          </div>

          {/* Timeline / notes logger */}
          <div className="bg-card glass border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-lg text-foreground border-b pb-2 flex items-center gap-2">
              <Clock className="size-5 text-primary" />
              Activity Log & Comments
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleAddNote} className="space-y-3">
              <Textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Type a log update (e.g., 'Called candidate, they requested brochure via WhatsApp', 'Asked them to visit the Greater Noida campus next Monday')..."
                className="rounded-xl min-h-20 text-xs bg-background"
                required
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isAddingNote || !newNoteText.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary/95 text-xs rounded-xl px-5 h-9"
                >
                  {isAddingNote ? (
                    <Loader2 className="size-3 animate-spin mr-1.5" />
                  ) : (
                    <Send className="size-3 mr-1.5" />
                  )}
                  Add Log Entry
                </Button>
              </div>
            </form>

            {/* Logs List */}
            <div className="relative pl-6 border-l-2 border-border/60 ml-2.5 space-y-6">
              {notes.map((note) => (
                <div key={note.id} className="relative group">
                  {/* Timeline Bullet */}
                  <span className="absolute -left-[31px] top-1 rounded-full size-4 bg-background border-2 border-primary flex items-center justify-center">
                    <span className="rounded-full size-1.5 bg-primary" />
                  </span>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">{note.author}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold">
                          {formatDate(note.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/80 leading-relaxed mt-1.5 whitespace-pre-line">
                        {note.text}
                      </p>
                    </div>

                    {/* Delete action button (System comments cannot be deleted) */}
                    {note.author !== "System" && (
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all shrink-0"
                        title="Delete note"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {notes.length === 0 && (
                <p className="text-xs text-muted-foreground italic py-4 text-center">
                  No comments logged yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
