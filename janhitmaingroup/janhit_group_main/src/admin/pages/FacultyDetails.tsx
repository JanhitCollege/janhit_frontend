import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Edit2,
  Mail,
  Phone,
  Linkedin,
  Award,
  BookOpen,
  Calendar,
  Building,
  User,
  GraduationCap,
  Sparkles,
  AlertCircle,
  Loader2,
  ListOrdered,
  FileText,
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
import { getStoredFaculties, FacultyProfile } from "@/data/faculties";
import { getStoredCampuses } from "@/data/campuses";

interface FacultyDetailsProps {
  id: string;
}

export const FacultyDetails: React.FC<FacultyDetailsProps> = ({ id }) => {
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState<FacultyProfile | null>(null);
  const [campusName, setCampusName] = useState<string>("Unknown Campus");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve faculty and campus details on load
  useEffect(() => {
    const timer = setTimeout(() => {
      const list = getStoredFaculties();
      const found = list.find((f) => f.id === id);
      if (found) {
        setFaculty(found);

        // Find campus name
        const campuses = getStoredCampuses();
        const camp = campuses.find((c) => c.id === found.campusId);
        if (camp) {
          setCampusName(camp.name);
        }
      } else {
        setErrorMsg("Faculty profile not found. It may have been deleted or the ID is invalid.");
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

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

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center py-20">
        <Loader2 className="size-8 text-primary animate-spin" />
      </div>
    );
  }

  if (errorMsg || !faculty) {
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
                  <Link to="/@admin/faculties">Faculty profiles</Link>
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
          <h2 className="font-display text-lg font-bold text-foreground">Failed to Load Faculty</h2>
          <p className="text-sm text-muted-foreground mt-2">{errorMsg || "An error occurred."}</p>
          <Link
            to="/@admin/faculties"
            className="mt-6 inline-flex px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/95 shadow-sm"
          >
            Back to Faculty Listing
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
                  <Link to="/@admin/faculties">Faculty profiles</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{faculty.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Faculty details
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="rounded-xl px-5 bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm"
          >
            <Link to="/@admin/faculties/$id/edit" params={{ id: faculty.id }}>
              <Edit2 className="size-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Grid: Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Avatar Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card glass border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full pointer-events-none" />

            {/* Avatar image */}
            <div className="size-36 rounded-2xl overflow-hidden border bg-muted flex items-center justify-center shadow-inner mb-4">
              {faculty.image ? (
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="size-full bg-gradient-gold flex items-center justify-center text-gold-foreground font-display font-bold text-4xl">
                  {faculty.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}
            </div>

            <h2 className="font-display text-xl font-bold text-foreground">{faculty.name}</h2>
            <p className="text-sm font-semibold text-primary/80 mt-1">
              {faculty.designation || "Faculty Member"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{faculty.department} Department</p>

            {/* Active / Featured Badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {faculty.isActive ? (
                <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 border border-emerald-500/20 font-semibold rounded-lg text-[10px]">
                  Active
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-slate-200 text-slate-600 border border-slate-300 font-semibold rounded-lg text-[10px]"
                >
                  Inactive
                </Badge>
              )}
              {faculty.isHod && (
                <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/10 border border-amber-500/20 font-semibold rounded-lg text-[10px]">
                  Head of Dept
                </Badge>
              )}
              {faculty.isFeatured && (
                <Badge className="bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/10 border border-indigo-500/20 font-semibold rounded-lg text-[10px]">
                  Featured
                </Badge>
              )}
            </div>

            {/* General Metadata */}
            <div className="w-full border-t border-border/40 mt-6 pt-4 text-left space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <Building className="size-4 text-muted-foreground/80 shrink-0" />
                <span className="text-foreground/90 font-medium truncate" title={campusName}>
                  {campusName}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <ListOrdered className="size-4 text-muted-foreground/80 shrink-0" />
                <span>
                  Display Order:{" "}
                  <span className="font-semibold text-foreground">{faculty.displayOrder}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <Calendar className="size-4 text-muted-foreground/80 shrink-0" />
                <span>
                  Created:{" "}
                  <span className="text-foreground/90">{formatDate(faculty.createdAt)}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <Calendar className="size-4 text-muted-foreground/80 shrink-0" />
                <span>
                  Updated:{" "}
                  <span className="text-foreground/90">{formatDate(faculty.updatedAt)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-card glass border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-foreground border-b pb-2">
              Contact Info
            </h3>

            <div className="space-y-3.5">
              {faculty.email && (
                <div className="flex items-start gap-3">
                  <Mail className="size-4 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                      Email
                    </p>
                    <a
                      href={`mailto:${faculty.email}`}
                      className="text-xs text-primary hover:underline font-medium break-all"
                    >
                      {faculty.email}
                    </a>
                  </div>
                </div>
              )}

              {faculty.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="size-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                      Phone
                    </p>
                    <p className="text-xs text-foreground font-medium">{faculty.phone}</p>
                  </div>
                </div>
              )}

              {faculty.linkedin && (
                <div className="flex items-start gap-3">
                  <Linkedin className="size-4 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                      LinkedIn
                    </p>
                    <a
                      href={faculty.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline font-medium truncate block"
                    >
                      {faculty.linkedin}
                    </a>
                  </div>
                </div>
              )}

              {!faculty.email && !faculty.phone && !faculty.linkedin && (
                <p className="text-xs text-muted-foreground italic text-center py-2">
                  No contact information provided.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Professional / Bio Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Biography & Message Section */}
          <div className="bg-card glass border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-lg text-foreground border-b pb-2 flex items-center gap-2">
              <User className="size-5 text-primary" />
              Biography & Message
            </h3>

            {faculty.bio ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Biography
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                    {faculty.bio}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">No biography provided.</p>
            )}

            {faculty.message && (
              <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10 relative">
                <span className="text-3xl text-primary/20 font-serif absolute top-1 left-2">“</span>
                <div className="pl-6">
                  <h4 className="text-[10px] font-bold text-primary/70 uppercase tracking-wider mb-1">
                    Message to Students
                  </h4>
                  <p className="text-sm text-foreground/80 italic leading-relaxed">
                    {faculty.message}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Academic & Professional Profile */}
          <div className="bg-card glass border rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="font-display font-bold text-lg text-foreground border-b pb-2 flex items-center gap-2">
              <GraduationCap className="size-5 text-primary" />
              Academic Profile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-background/50 border rounded-xl">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Qualifications
                </p>
                <p className="text-sm text-foreground font-semibold mt-1">
                  {faculty.qualification || "—"}
                </p>
              </div>

              <div className="p-3 bg-background/50 border rounded-xl">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Specialization
                </p>
                <p className="text-sm text-foreground font-semibold mt-1">
                  {faculty.specialization || "—"}
                </p>
              </div>

              <div className="p-3 bg-background/50 border rounded-xl">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Experience
                </p>
                <p className="text-sm text-foreground font-semibold mt-1">
                  {faculty.experience || "—"}
                </p>
              </div>
            </div>

            {faculty.subjects && (
              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Subjects Taught
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {faculty.subjects.split(",").map((s, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-background rounded-lg text-xs py-1 px-2.5 font-medium border border-border/80 text-foreground/80"
                    >
                      {s.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {faculty.researchInterest && (
              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="size-3.5 text-primary" />
                  Research Interests
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {faculty.researchInterest}
                </p>
              </div>
            )}
          </div>

          {/* Publications & Awards */}
          {(faculty.publications || faculty.awards) && (
            <div className="bg-card glass border rounded-2xl p-6 shadow-sm space-y-5">
              <h3 className="font-display font-bold text-lg text-foreground border-b pb-2 flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                Publications & Awards
              </h3>

              {faculty.publications && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="size-3.5 text-primary" />
                    Publications
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line bg-background/30 p-3 rounded-xl border border-border/40">
                    {faculty.publications}
                  </p>
                </div>
              )}

              {faculty.awards && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="size-3.5 text-primary" />
                    Awards & Recognitions
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line bg-background/30 p-3 rounded-xl border border-border/40">
                    {faculty.awards}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
