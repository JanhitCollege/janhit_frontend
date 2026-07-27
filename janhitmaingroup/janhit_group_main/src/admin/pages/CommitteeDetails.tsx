import React, { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  Calendar,
  Building,
  User,
  Users,
  AlertCircle,
  Loader2,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  FileText,
  Clock,
  Layers,
  Sparkles,
  ExternalLink,
  Upload,
  BookOpen,
  Camera,
  Check,
  CheckCircle2,
  CircleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getStoredCommittees,
  saveCommittees,
  Committee,
  CommitteeMember,
  CommitteeDocument,
} from "@/data/committees";
import { getStoredCampuses } from "@/data/campuses";
import { toast } from "sonner";

interface CommitteeDetailsProps {
  id: string;
  initialTab?: "overview" | "members" | "documents";
}

export const CommitteeDetails: React.FC<CommitteeDetailsProps> = ({ id, initialTab }) => {
  const [committee, setCommittee] = useState<Committee | null>(null);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Tab control
  const [activeTab, setActiveTab] = useState<"overview" | "members" | "documents">(
    initialTab || "overview",
  );

  // Sync activeTab with search parameter initialTab
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Member Modals
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const [isSavingMember, setIsSavingMember] = useState(false);

  // Member Form State
  const [mName, setMName] = useState("");
  const [mDesignation, setMDesignation] = useState("");
  const [mRole, setMRole] = useState("");
  const [mDepartment, setMDepartment] = useState("");
  const [mEmail, setMEmail] = useState("");
  const [mPhone, setMPhone] = useState("");
  const [mTenureFrom, setMTenureFrom] = useState("");
  const [mTenureTo, setMTenureTo] = useState("");
  const [mDisplayOrder, setMDisplayOrder] = useState("0");
  const [mIsActive, setMIsActive] = useState(true);
  const [mPhoto, setMPhoto] = useState("");

  const [isDeleteMemberOpen, setIsDeleteMemberOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<CommitteeMember | null>(null);
  const [isDeletingMember, setIsDeletingMember] = useState(false);

  // Document Modals
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);

  // Document Form State
  const [dTitle, setDTitle] = useState("");
  const [dDescription, setDDescription] = useState("");
  const [dType, setDType] = useState<CommitteeDocument["documentType"]>("ORDER");
  const [dDisplayOrder, setDDisplayOrder] = useState("0");
  const [dFileBase64, setDFileBase64] = useState("");
  const [dFileName, setDFileName] = useState("");
  const [dFileType, setDFileType] = useState("");

  const [isDeleteDocOpen, setIsDeleteDocOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState<CommitteeDocument | null>(null);
  const [isDeletingDoc, setIsDeletingDoc] = useState(false);

  // File input refs
  const photoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // Validation states
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch committee details
  const loadCommittee = () => {
    const list = getStoredCommittees();
    const found = list.find((c) => c.id === id);
    if (found) {
      setCommittee(found);
      setCampuses(getStoredCampuses());
    } else {
      setErrorMsg("Committee not found. It may have been deleted or the ID is invalid.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(loadCommittee, 300);
    return () => clearTimeout(timer);
  }, [id]);

  const formatDate = (dateStr?: string, showTime = false) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        ...(showTime && { hour: "2-digit", minute: "2-digit" }),
      });
    } catch {
      return dateStr;
    }
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

  const getCampusNames = () => {
    if (!committee) return "Global";
    return (
      committee.campuses
        .map((cid) => {
          const found = campuses.find((c) => c.id === cid);
          return found ? found.shortName || found.name : null;
        })
        .filter(Boolean)
        .join(", ") || "Global / All"
    );
  };

  // ==========================================
  // MEMBER CRUD
  // ==========================================
  const openMemberModal = (member?: CommitteeMember) => {
    setFormErrors({});
    if (member) {
      setEditingMember(member);
      setMName(member.name);
      setMDesignation(member.designation || "");
      setMRole(member.committeeRole);
      setMDepartment(member.department || "");
      setMEmail(member.email || "");
      setMPhone(member.phone || "");

      const getLocalDate = (isoStr?: string) => (isoStr ? isoStr.split("T")[0] : "");
      setMTenureFrom(getLocalDate(member.tenureFrom));
      setMTenureTo(getLocalDate(member.tenureTo));
      setMDisplayOrder(String(member.displayOrder));
      setMIsActive(member.isActive);
      setMPhoto(member.photo || "");
    } else {
      setEditingMember(null);
      setMName("");
      setMDesignation("");
      setMRole("Member");
      setMDepartment("");
      setMEmail("");
      setMPhone("");
      setMTenureFrom("");
      setMTenureTo("");
      setMDisplayOrder("0");
      setMIsActive(true);
      setMPhoto("");
    }
    setIsMemberModalOpen(true);
  };

  const handlePhotoClick = () => {
    if (photoInputRef.current) photoInputRef.current.click();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFormErrors((prev) => ({ ...prev, photo: "Photo size exceeds allowed limit of 2MB." }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setMPhoto(reader.result as string);
        setFormErrors((prev) => ({ ...prev, photo: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setMPhoto("");
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const saveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!committee) return;

    // Validation
    const errors: Record<string, string> = {};
    if (!mName.trim()) errors.name = "Member Name is required.";
    if (!mRole.trim()) errors.role = "Committee Role is required.";
    const orderNum = Number(mDisplayOrder);
    if (mDisplayOrder.trim() === "" || isNaN(orderNum) || !Number.isInteger(orderNum)) {
      errors.displayOrder = "Display Order must be an integer.";
    }
    if (mTenureTo && mTenureFrom && new Date(mTenureTo) < new Date(mTenureFrom)) {
      errors.tenureTo = "Tenure To must be on or after Tenure From.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSavingMember(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    let updatedMembers = [...committee.members];
    if (editingMember) {
      // Update
      updatedMembers = updatedMembers.map((m) => {
        if (m.id === editingMember.id) {
          return {
            ...m,
            name: mName.trim(),
            designation: mDesignation.trim() || undefined,
            committeeRole: mRole.trim(),
            department: mDepartment.trim() || undefined,
            email: mEmail.trim() || undefined,
            phone: mPhone.trim() || undefined,
            tenureFrom: mTenureFrom ? new Date(mTenureFrom).toISOString() : undefined,
            tenureTo: mTenureTo ? new Date(mTenureTo).toISOString() : undefined,
            displayOrder: orderNum,
            isActive: mIsActive,
            photo: mPhoto,
          };
        }
        return m;
      });
    } else {
      // Create
      const newMember: CommitteeMember = {
        id: "mem-" + Date.now(),
        committeeId: id,
        name: mName.trim(),
        designation: mDesignation.trim() || undefined,
        committeeRole: mRole.trim(),
        department: mDepartment.trim() || undefined,
        email: mEmail.trim() || undefined,
        phone: mPhone.trim() || undefined,
        tenureFrom: mTenureFrom ? new Date(mTenureFrom).toISOString() : undefined,
        tenureTo: mTenureTo ? new Date(mTenureTo).toISOString() : undefined,
        displayOrder: orderNum,
        isActive: mIsActive,
        photo: mPhoto,
      };
      updatedMembers.push(newMember);
    }

    // Sort updated members by displayOrder
    updatedMembers.sort((a, b) => a.displayOrder - b.displayOrder);

    // Save
    const list = getStoredCommittees();
    const updatedCommittees = list.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          members: updatedMembers,
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });

    saveCommittees(updatedCommittees);
    setCommittee({ ...committee, members: updatedMembers, updatedAt: new Date().toISOString() });

    setIsSavingMember(false);
    setIsMemberModalOpen(false);
    toast.success(editingMember ? "Member details updated." : "New member added to committee.");
  };

  const handleOpenDeleteMember = (member: CommitteeMember) => {
    setMemberToDelete(member);
    setIsDeleteMemberOpen(true);
  };

  const confirmDeleteMember = async () => {
    if (!memberToDelete || !committee) return;
    setIsDeletingMember(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const updatedMembers = committee.members.filter((m) => m.id !== memberToDelete.id);
    const list = getStoredCommittees();
    const updatedCommittees = list.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          members: updatedMembers,
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });

    saveCommittees(updatedCommittees);
    setCommittee({ ...committee, members: updatedMembers, updatedAt: new Date().toISOString() });

    setIsDeletingMember(false);
    setIsDeleteMemberOpen(false);
    setMemberToDelete(null);
    toast.success("Member removed from committee successfully.");
  };

  // ==========================================
  // DOCUMENT CRUD
  // ==========================================
  const openDocModal = () => {
    setFormErrors({});
    setDTitle("");
    setDDescription("");
    setDType("ORDER");
    setDDisplayOrder("0");
    setDFileBase64("");
    setDFileName("");
    setDFileType("");
    setIsDocModalOpen(true);
  };

  const handleDocClick = () => {
    if (docInputRef.current) docInputRef.current.click();
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          document: "Document size exceeds allowed limit of 5MB for mock storage.",
        }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setDFileBase64(reader.result as string);
        setDFileName(file.name);
        setDFileType(file.type);
        setFormErrors((prev) => ({ ...prev, document: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveDocFile = () => {
    setDFileBase64("");
    setDFileName("");
    setDFileType("");
    if (docInputRef.current) docInputRef.current.value = "";
  };

  const saveDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!committee) return;

    // Validation
    const errors: Record<string, string> = {};
    if (!dTitle.trim()) errors.title = "Document Title is required.";
    if (!dFileBase64) errors.document = "Please upload a document file.";
    const orderNum = Number(dDisplayOrder);
    if (dDisplayOrder.trim() === "" || isNaN(orderNum) || !Number.isInteger(orderNum)) {
      errors.displayOrder = "Display Order must be an integer.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsUploadingDoc(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newDoc: CommitteeDocument = {
      id: "doc-" + Date.now(),
      committeeId: id,
      title: dTitle.trim(),
      description: dDescription.trim() || undefined,
      documentUrl: dFileBase64, // Saved as base64 data url
      fileType: dFileType || "application/octet-stream",
      documentType: dType,
      displayOrder: orderNum,
      createdAt: new Date().toISOString(),
    };

    const updatedDocs = [...committee.documents, newDoc].sort(
      (a, b) => a.displayOrder - b.displayOrder,
    );

    // Save
    const list = getStoredCommittees();
    const updatedCommittees = list.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          documents: updatedDocs,
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });

    saveCommittees(updatedCommittees);
    setCommittee({ ...committee, documents: updatedDocs, updatedAt: new Date().toISOString() });

    setIsUploadingDoc(false);
    setIsDocModalOpen(false);
    toast.success("Document uploaded and linked successfully.");
  };

  const handleOpenDeleteDoc = (doc: CommitteeDocument) => {
    setDocToDelete(doc);
    setIsDeleteDocOpen(true);
  };

  const confirmDeleteDoc = async () => {
    if (!docToDelete || !committee) return;
    setIsDeletingDoc(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const updatedDocs = committee.documents.filter((d) => d.id !== docToDelete.id);
    const list = getStoredCommittees();
    const updatedCommittees = list.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          documents: updatedDocs,
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });

    saveCommittees(updatedCommittees);
    setCommittee({ ...committee, documents: updatedDocs, updatedAt: new Date().toISOString() });

    setIsDeletingDoc(false);
    setIsDeleteDocOpen(false);
    setDocToDelete(null);
    toast.success("Document deleted successfully.");
  };

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center py-20">
        <Loader2 className="size-8 text-primary animate-spin" />
      </div>
    );
  }

  if (errorMsg || !committee) {
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
                  <Link to="/@admin/committees">Committees</Link>
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
          <CircleAlert className="size-12 text-destructive mb-3" />
          <h2 className="font-display text-lg font-bold text-foreground">
            Failed to Load Committee
          </h2>
          <p className="text-sm text-muted-foreground mt-2">{errorMsg || "An error occurred."}</p>
          <Link
            to="/@admin/committees"
            className="mt-6 inline-flex px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/95 shadow-sm"
          >
            Back to Committees
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                  <Link to="/@admin/committees">Committees</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{committee.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {committee.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="rounded-xl px-5 bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm"
          >
            <Link to="/@admin/committees/$id/edit" params={{ id: committee.id }}>
              <Edit2 className="size-4 mr-2" />
              Edit Committee
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero card details banner */}
      <div className="bg-card glass border rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-gold opacity-5 blur-2xl rounded-full pointer-events-none" />

        {/* Banner image or icon fallback */}
        <div className="w-full md:w-44 h-28 rounded-2xl overflow-hidden border bg-muted flex items-center justify-center shrink-0 shadow-inner">
          {committee.bannerImage ? (
            <img
              src={committee.bannerImage}
              alt={committee.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="size-full bg-gradient-gold flex items-center justify-center text-gold-foreground font-display font-bold text-3xl">
              {committee.title
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
          )}
        </div>

        {/* Committee summary */}
        <div className="flex-grow space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/10 border border-indigo-500/20 font-semibold rounded-lg text-[10px]">
              {committee.committeeType || "General"}
            </Badge>
            {committee.category && (
              <Badge
                variant="outline"
                className="text-[10px] rounded-lg px-2 py-0.5 font-medium text-muted-foreground border-border bg-background/40"
              >
                {committee.category}
              </Badge>
            )}
            <Badge
              variant="outline"
              className="text-[10px] rounded-lg px-2 py-0.5 font-medium text-foreground bg-slate-200"
            >
              Session: {committee.academicSession || "—"}
            </Badge>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed max-w-3xl">
            {committee.shortDescription || "No short description provided."}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground font-medium pt-1.5 border-t border-border/40">
            <span className="flex items-center gap-1.5">
              <Building className="size-3.5" /> Campuses:{" "}
              <strong className="text-foreground">{getCampusNames()}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" /> Tenure:{" "}
              <strong className="text-foreground">
                {formatDate(committee.tenureFrom)} to {formatDate(committee.tenureTo)}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Tabs list navigation */}
      <div className="flex border-b border-border/60">
        {[
          { id: "overview", label: "Overview" },
          { id: "members", label: `Members (${committee.members.length})` },
          { id: "documents", label: `Documents (${committee.documents.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 text-sm font-semibold border-b-2 -mb-[2px] transition-all cursor-pointer ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content area */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Detailed Description */}
              <div className="bg-card glass border rounded-2xl p-6 shadow-sm space-y-3.5">
                <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                  <FileText className="size-5 text-primary" />
                  Detailed Committee Description
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                  {committee.description || "No detailed description provided."}
                </p>
              </div>

              {/* Objectives */}
              <div className="bg-card glass border rounded-2xl p-6 shadow-sm space-y-3.5">
                <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                  <BookOpen className="size-5 text-primary" />
                  Key Responsibilities & Objectives
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                  {committee.objective || "No objectives defined."}
                </p>
              </div>
            </div>

            {/* Right sidebar of overview */}
            <div className="space-y-6">
              <div className="bg-card glass border rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-display font-bold text-base text-foreground border-b pb-2">
                  Publishing Status
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-semibold">Publish Status</span>
                    <Badge
                      className={`rounded-xl text-[9px] font-bold ${getStatusBadgeColor(committee.status)}`}
                    >
                      {committee.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-semibold">Publish Date</span>
                    <span className="text-foreground font-medium">
                      {formatDate(committee.publishDate, true)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-semibold">Display Order</span>
                    <span className="text-foreground font-bold">{committee.displayOrder}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-semibold">Main Web Visibility</span>
                    <span className="text-foreground font-semibold">
                      {committee.isMainWebsite ? "Visible" : "Hidden"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-muted-foreground font-semibold">Created At</span>
                    <span className="text-muted-foreground font-medium">
                      {formatDate(committee.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-foreground">Committee Roster</h3>
              <Button
                onClick={() => openMemberModal()}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl text-xs font-semibold px-4 h-9"
              >
                <Plus className="size-4 mr-1.5" />
                Add Member
              </Button>
            </div>

            {committee.members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {committee.members.map((member) => (
                  <div
                    key={member.id}
                    className={`bg-card glass border rounded-2xl p-5 shadow-sm flex flex-col relative overflow-hidden ${
                      !member.isActive ? "opacity-60" : ""
                    }`}
                  >
                    {/* Position order badge */}
                    <div className="absolute top-2 right-2 text-[10px] bg-background border px-1.5 py-0.5 rounded font-bold text-muted-foreground">
                      #{member.displayOrder}
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="size-16 rounded-xl overflow-hidden border bg-muted flex items-center justify-center shrink-0 shadow-sm">
                        {member.photo ? (
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="size-full bg-gradient-gold text-gold-foreground flex items-center justify-center font-display font-bold text-lg">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-foreground truncate">
                          {member.name}
                        </h4>
                        <div className="text-xs text-primary font-bold mt-0.5">
                          {member.committeeRole}
                        </div>
                        {member.designation && (
                          <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
                            {member.designation}
                          </div>
                        )}
                        {member.department && (
                          <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">
                            {member.department}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Member details / contact details */}
                    <div className="border-t border-border/40 mt-4 pt-3.5 space-y-2 text-[11px] text-muted-foreground">
                      {member.email && (
                        <div className="flex items-center gap-2 truncate">
                          <Mail className="size-3.5 text-muted-foreground shrink-0" />
                          <a
                            href={`mailto:${member.email}`}
                            className="hover:text-primary hover:underline"
                          >
                            {member.email}
                          </a>
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="size-3.5 text-muted-foreground shrink-0" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                      {(member.tenureFrom || member.tenureTo) && (
                        <div className="flex items-center gap-2">
                          <Calendar className="size-3.5 text-muted-foreground shrink-0" />
                          <span>
                            Tenure: {formatDate(member.tenureFrom)} to {formatDate(member.tenureTo)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Roster action tools */}
                    <div className="flex items-center justify-end gap-1.5 mt-4 pt-3 border-t border-border/30">
                      <Button
                        onClick={() => openMemberModal(member)}
                        variant="ghost"
                        size="sm"
                        className="h-8 rounded-lg text-xs font-semibold px-3 py-1 hover:bg-accent text-muted-foreground hover:text-foreground"
                      >
                        <Edit2 className="size-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleOpenDeleteMember(member)}
                        variant="ghost"
                        size="sm"
                        className="h-8 rounded-lg text-xs font-semibold px-3 py-1 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card glass border border-dashed rounded-2xl p-10 text-center max-w-md mx-auto">
                <Users className="size-10 text-muted-foreground/60 mx-auto mb-3" />
                <h4 className="font-display font-semibold text-base text-foreground">
                  No Members Added
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Start constructing the roster by adding chairpersons, coordinators, and member
                  faculty profiles.
                </p>
                <Button
                  onClick={() => openMemberModal()}
                  size="sm"
                  className="mt-4 rounded-xl text-xs"
                >
                  Add Committee Member
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-foreground">
                Official Records & Orders
              </h3>
              <Button
                onClick={openDocModal}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl text-xs font-semibold px-4 h-9"
              >
                <Plus className="size-4 mr-1.5" />
                Upload Document
              </Button>
            </div>

            {committee.documents.length > 0 ? (
              <div className="bg-card glass border rounded-2xl overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-background/80 border-b">
                    <TableRow>
                      <TableHead className="font-semibold text-xs py-3.5 w-1/3">
                        Document Title
                      </TableHead>
                      <TableHead className="font-semibold text-xs py-3.5">Document Type</TableHead>
                      <TableHead className="font-semibold text-xs py-3.5">File Format</TableHead>
                      <TableHead className="font-semibold text-xs py-3.5 text-center">
                        Display Order
                      </TableHead>
                      <TableHead className="font-semibold text-xs py-3.5 text-center">
                        Uploaded Date
                      </TableHead>
                      <TableHead className="font-semibold text-xs py-3.5 text-right pr-6">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {committee.documents.map((doc) => (
                      <TableRow
                        key={doc.id}
                        className="hover:bg-accent/40 border-b last:border-0 transition-colors"
                      >
                        <TableCell className="py-4">
                          <div>
                            <h4 className="text-sm font-semibold text-foreground">{doc.title}</h4>
                            {doc.description && (
                              <p className="text-[11px] text-muted-foreground mt-0.5 max-w-[300px] truncate">
                                {doc.description}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-700 font-bold text-[9px] rounded px-1.5 py-0"
                          >
                            {doc.documentType}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 text-xs font-medium text-muted-foreground uppercase">
                          {doc.fileType.split("/")[1] || "File"}
                        </TableCell>
                        <TableCell className="py-4 text-center text-xs font-bold text-foreground">
                          {doc.displayOrder}
                        </TableCell>
                        <TableCell className="py-4 text-center text-xs text-muted-foreground">
                          {formatDate(doc.createdAt)}
                        </TableCell>
                        <TableCell className="py-4 text-right pr-6">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              asChild
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-lg hover:bg-accent text-primary shrink-0"
                              title="Download/Open document"
                            >
                              <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="size-4" />
                              </a>
                            </Button>
                            <Button
                              onClick={() => handleOpenDeleteDoc(doc)}
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive shrink-0"
                              title="Delete document"
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
              <div className="bg-card glass border border-dashed rounded-2xl p-10 text-center max-w-md mx-auto">
                <FileText className="size-10 text-muted-foreground/60 mx-auto mb-3" />
                <h4 className="font-display font-semibold text-base text-foreground">
                  No Documents Uploaded
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Upload official committee orders, constitution circulars, notices or meeting
                  minutes.
                </p>
                <Button onClick={openDocModal} size="sm" className="mt-4 rounded-xl text-xs">
                  Upload Document File
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Member Add/Edit Modal Dialog */}
      <Dialog open={isMemberModalOpen} onOpenChange={setIsMemberModalOpen}>
        <DialogContent className="rounded-3xl border border-border/80 max-w-lg overflow-y-auto max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg">
              {editingMember ? "Edit Committee Member" : "Add Committee Member"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Provide candidate information to add/modify their credentials in this committee
              roster.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={saveMember} className="space-y-5 pt-3">
            {/* Photo Uploader */}
            <div className="flex flex-col items-center">
              <div
                onClick={handlePhotoClick}
                className={`size-20 rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all relative ${
                  mPhoto
                    ? "border-primary/40"
                    : "border-muted-foreground/30 hover:border-primary/50 bg-background/50"
                }`}
              >
                {mPhoto ? (
                  <img src={mPhoto} alt="Member preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="size-5 text-muted-foreground" />
                )}
                {mPhoto && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="size-4 text-white" />
                  </div>
                )}
              </div>
              {mPhoto && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="mt-1 text-[10px] text-destructive hover:underline font-semibold"
                >
                  Remove Photo
                </button>
              )}
              <input
                type="file"
                ref={photoInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
              {formErrors.photo && (
                <p className="text-destructive text-[10px] font-semibold mt-1">
                  {formErrors.photo}
                </p>
              )}
            </div>

            {/* Inputs grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mName" className="text-[11px] font-bold">
                  Member Name *
                </Label>
                <Input
                  id="mName"
                  value={mName}
                  onChange={(e) => setMName(e.target.value)}
                  placeholder="e.g. Dr. Shalini Singh"
                  className={`mt-1 h-9 rounded-lg text-xs ${formErrors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {formErrors.name && (
                  <p className="text-destructive text-[10px] font-semibold mt-1">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="mRole" className="text-[11px] font-bold">
                  Committee Role *
                </Label>
                <Input
                  id="mRole"
                  value={mRole}
                  onChange={(e) => setMRole(e.target.value)}
                  placeholder="e.g. Chairperson, Secretary, Member"
                  className={`mt-1 h-9 rounded-lg text-xs ${formErrors.role ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {formErrors.role && (
                  <p className="text-destructive text-[10px] font-semibold mt-1">
                    {formErrors.role}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="mDesignation" className="text-[11px] font-bold">
                  Designation
                </Label>
                <Input
                  id="mDesignation"
                  value={mDesignation}
                  onChange={(e) => setMDesignation(e.target.value)}
                  placeholder="e.g. Associate Professor"
                  className="mt-1 h-9 rounded-lg text-xs"
                />
              </div>

              <div>
                <Label htmlFor="mDepartment" className="text-[11px] font-bold">
                  Department
                </Label>
                <Input
                  id="mDepartment"
                  value={mDepartment}
                  onChange={(e) => setMDepartment(e.target.value)}
                  placeholder="e.g. Law, Applied Sciences"
                  className="mt-1 h-9 rounded-lg text-xs"
                />
              </div>

              <div>
                <Label htmlFor="mEmail" className="text-[11px] font-bold">
                  Email Address
                </Label>
                <Input
                  id="mEmail"
                  type="email"
                  value={mEmail}
                  onChange={(e) => setMEmail(e.target.value)}
                  placeholder="e.g. shalini@janhit.edu.in"
                  className="mt-1 h-9 rounded-lg text-xs"
                />
              </div>

              <div>
                <Label htmlFor="mPhone" className="text-[11px] font-bold">
                  Phone Number
                </Label>
                <Input
                  id="mPhone"
                  value={mPhone}
                  onChange={(e) => setMPhone(e.target.value)}
                  placeholder="e.g. +91 98765 00000"
                  className="mt-1 h-9 rounded-lg text-xs"
                />
              </div>

              <div>
                <Label htmlFor="mTenureFrom" className="text-[11px] font-bold">
                  Tenure From
                </Label>
                <Input
                  id="mTenureFrom"
                  type="date"
                  value={mTenureFrom}
                  onChange={(e) => setMTenureFrom(e.target.value)}
                  className="mt-1 h-9 rounded-lg text-xs"
                />
              </div>

              <div>
                <Label htmlFor="mTenureTo" className="text-[11px] font-bold">
                  Tenure To
                </Label>
                <Input
                  id="mTenureTo"
                  type="date"
                  value={mTenureTo}
                  onChange={(e) => setMTenureTo(e.target.value)}
                  className={`mt-1 h-9 rounded-lg text-xs ${formErrors.tenureTo ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {formErrors.tenureTo && (
                  <p className="text-destructive text-[10px] font-semibold mt-1">
                    {formErrors.tenureTo}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="mDisplayOrder" className="text-[11px] font-bold">
                  Display Order *
                </Label>
                <Input
                  id="mDisplayOrder"
                  type="number"
                  value={mDisplayOrder}
                  onChange={(e) => setMDisplayOrder(e.target.value)}
                  className={`mt-1 h-9 rounded-lg text-xs ${formErrors.displayOrder ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {formErrors.displayOrder && (
                  <p className="text-destructive text-[10px] font-semibold mt-1">
                    {formErrors.displayOrder}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-background/50 border border-border/60 self-end h-9">
                <Label
                  htmlFor="mIsActive"
                  className="text-[11px] font-bold cursor-pointer select-none"
                >
                  Active Status
                </Label>
                <Switch id="mIsActive" checked={mIsActive} onCheckedChange={setMIsActive} />
              </div>
            </div>

            <DialogFooter className="flex items-center justify-end gap-2 pt-3 border-t">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl text-xs font-semibold"
                  disabled={isSavingMember}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl text-xs font-semibold"
                disabled={isSavingMember}
              >
                {isSavingMember ? (
                  <>
                    <Loader2 className="size-3.5 mr-1.5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Roster"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Roster Member Delete Modal Dialog */}
      <Dialog open={isDeleteMemberOpen} onOpenChange={setIsDeleteMemberOpen}>
        <DialogContent className="rounded-2xl border border-border/80 max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg text-destructive flex items-center gap-2">
              <AlertCircle className="size-5" />
              Remove Member
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Are you sure you want to remove <strong>{memberToDelete?.name}</strong> from this
              committee's roster? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-xs font-semibold"
                disabled={isDeletingMember}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={confirmDeleteMember}
              variant="destructive"
              size="sm"
              className="rounded-xl text-xs font-semibold"
              disabled={isDeletingMember}
            >
              {isDeletingMember ? (
                <>
                  <Loader2 className="size-3.5 mr-1.5 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Upload Modal Dialog */}
      <Dialog open={isDocModalOpen} onOpenChange={setIsDocModalOpen}>
        <DialogContent className="rounded-3xl border border-border/80 max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg">
              Upload Committee Document
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Link an official order, minutes report, circular or other documents to this committee
              records.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={saveDocument} className="space-y-4 pt-3">
            <div>
              <Label htmlFor="dTitle" className="text-[11px] font-bold">
                Document Title *
              </Label>
              <Input
                id="dTitle"
                value={dTitle}
                onChange={(e) => setDTitle(e.target.value)}
                placeholder="e.g. Committee Constitution Order 2026"
                className={`mt-1 h-9 rounded-lg text-xs ${formErrors.title ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {formErrors.title && (
                <p className="text-destructive text-[10px] font-semibold mt-1">
                  {formErrors.title}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="dDescription" className="text-[11px] font-bold">
                Description / Brief Notes
              </Label>
              <Textarea
                id="dDescription"
                value={dDescription}
                onChange={(e) => setDDescription(e.target.value)}
                placeholder="Type a brief summary of what this document covers..."
                className="mt-1 rounded-lg text-xs min-h-16"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dType" className="text-[11px] font-bold">
                  Document Category Type
                </Label>
                <div className="mt-1">
                  <Select value={dType} onValueChange={(val: any) => setDType(val)}>
                    <SelectTrigger className="h-9 rounded-lg bg-background text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border border-border/80 text-xs">
                      <SelectItem value="ORDER">Order</SelectItem>
                      <SelectItem value="NOTICE">Notice</SelectItem>
                      <SelectItem value="MINUTES">Minutes</SelectItem>
                      <SelectItem value="REPORT">Report</SelectItem>
                      <SelectItem value="CIRCULAR">Circular</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="dDisplayOrder" className="text-[11px] font-bold">
                  Display Order *
                </Label>
                <Input
                  id="dDisplayOrder"
                  type="number"
                  value={dDisplayOrder}
                  onChange={(e) => setDDisplayOrder(e.target.value)}
                  className={`mt-1 h-9 rounded-lg text-xs ${formErrors.displayOrder ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {formErrors.displayOrder && (
                  <p className="text-destructive text-[10px] font-semibold mt-1">
                    {formErrors.displayOrder}
                  </p>
                )}
              </div>
            </div>

            {/* Document file selector */}
            <div>
              <Label className="text-[11px] font-bold mb-1.5 block">Document File *</Label>
              <div
                onClick={handleDocClick}
                className={`w-full py-6 border-2 border-dashed rounded-xl cursor-pointer flex flex-col items-center justify-center transition ${
                  dFileBase64
                    ? "border-primary/40 bg-background/50"
                    : "border-border hover:border-primary/40 bg-background/20"
                }`}
              >
                {dFileBase64 ? (
                  <div className="text-center px-4 flex items-center gap-2">
                    <Check className="size-5 text-emerald-500 shrink-0" />
                    <span
                      className="text-xs font-semibold text-foreground truncate max-w-[200px]"
                      title={dFileName}
                    >
                      {dFileName}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveDocFile();
                      }}
                      className="text-[10px] text-destructive hover:underline font-bold shrink-0 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-2">
                    <Upload className="size-6 text-muted-foreground mx-auto mb-1.5" />
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      Click to upload file document
                    </span>
                    <p className="text-[9px] text-muted-foreground/80 mt-0.5">
                      PDF, DOC, DOCX, JPG, PNG up to 5MB
                    </p>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={docInputRef}
                onChange={handleDocUpload}
                accept=".pdf,.doc,.docx,image/*"
                className="hidden"
              />
              {formErrors.document && (
                <p className="text-destructive text-[10px] font-semibold mt-1">
                  {formErrors.document}
                </p>
              )}
            </div>

            <DialogFooter className="flex items-center justify-end gap-2 pt-3 border-t">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl text-xs font-semibold"
                  disabled={isUploadingDoc}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl text-xs font-semibold"
                disabled={isUploadingDoc}
              >
                {isUploadingDoc ? (
                  <>
                    <Loader2 className="size-3.5 mr-1.5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Link Document"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Document Delete Confirmation Dialog */}
      <Dialog open={isDeleteDocOpen} onOpenChange={setIsDeleteDocOpen}>
        <DialogContent className="rounded-2xl border border-border/80 max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg text-destructive flex items-center gap-2">
              <AlertCircle className="size-5" />
              Delete Document
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Are you sure you want to delete the committee document{" "}
              <strong>{docToDelete?.title}</strong>? This will permanently delete the file record.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-xs font-semibold"
                disabled={isDeletingDoc}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={confirmDeleteDoc}
              variant="destructive"
              size="sm"
              className="rounded-xl text-xs font-semibold"
              disabled={isDeletingDoc}
            >
              {isDeletingDoc ? (
                <>
                  <Loader2 className="size-3.5 mr-1.5 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete File"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
