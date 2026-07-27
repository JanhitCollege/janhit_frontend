import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  X,
  AlertCircle,
  Info,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStoredCampuses } from "@/data/campuses";
import { EventItem } from "@/data/events";

interface EventFormProps {
  initialData?: EventItem;
  onSubmit: (data: {
    title: string;
    slug: string;
    shortDescription: string | null;
    description: string;
    bannerImage: string | null;
    startDate: string;
    endDate: string | null;
    startTime: string | null;
    endTime: string | null;
    venue: string | null;
    organizer: string | null;
    registrationLink: string | null;
    isMainWebsite: boolean;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    campusIds: string[];
  }) => void;
  onCancel: () => void;
  submitButtonText: string;
}

export const EventForm: React.FC<EventFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText,
}) => {
  // Load campuses
  const activeCampuses = getStoredCampuses().filter((c) => c.status === "active");

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [endDate, setEndDate] = useState(initialData?.endDate || "");
  const [startTime, setStartTime] = useState(initialData?.startTime || "");
  const [endTime, setEndTime] = useState(initialData?.endTime || "");
  const [venue, setVenue] = useState(initialData?.venue || "");
  const [organizer, setOrganizer] = useState(initialData?.organizer || "");
  const [registrationLink, setRegistrationLink] = useState(initialData?.registrationLink || "");
  const [isMainWebsite, setIsMainWebsite] = useState<boolean>(
    initialData?.isMainWebsite !== undefined ? initialData.isMainWebsite : true,
  );
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVED">(
    initialData?.status || "DRAFT",
  );
  const [campusIds, setCampusIds] = useState<string[]>(initialData?.campusIds || []);

  // Banner upload states
  const [bannerName, setBannerName] = useState(
    initialData?.bannerImage ? "current_banner_image.jpg" : "",
  );
  const [bannerSize, setBannerSize] = useState<number>(0);
  const [bannerImage, setBannerImage] = useState<string | null>(initialData?.bannerImage || null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Errors & Touch
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug on title change
  useEffect(() => {
    if (!initialData) {
      if (!isTouched.slug) {
        const generatedSlug = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
        setSlug(generatedSlug);
      }
    }
  }, [title, initialData, isTouched.slug]);

  // Validators
  const validateField = (fieldName: string, value: any): string => {
    if (fieldName === "title" && !String(value).trim()) {
      return "Title is required.";
    }
    if (fieldName === "slug") {
      if (!String(value).trim()) return "Slug is required.";
      if (!/^[a-z0-9-]+$/.test(value)) {
        return "Slug can only contain lowercase letters, numbers, and hyphens.";
      }
    }
    if (fieldName === "description" && !String(value).trim()) {
      return "Detailed Description is required.";
    }
    if (fieldName === "startDate" && !value) {
      return "Start Date is required.";
    }
    if (fieldName === "endDate" && value && startDate) {
      if (new Date(value) < new Date(startDate)) {
        return "End Date must be on or after Start Date.";
      }
    }
    return "";
  };

  const handleBlur = (fieldName: string, value: any) => {
    setIsTouched((prev) => ({ ...prev, [fieldName]: true }));
    const errorMsg = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
  };

  const handleFieldChange = (fieldName: string, value: any, setter: (val: any) => void) => {
    setter(value);
    if (isTouched[fieldName]) {
      const errorMsg = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  // Multiple Campus Checkbox toggle
  const handleCampusToggle = (id: string) => {
    const updated = campusIds.includes(id)
      ? campusIds.filter((cid) => cid !== id)
      : [...campusIds, id];
    setCampusIds(updated);
  };

  // Uploader Handlers
  const handleUploaderClick = () => {
    fileInputRef.current?.click();
  };

  const processFile = (file: File) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      setErrors((prev) => ({
        ...prev,
        banner: "Invalid file type. Allowed formats: JPG, JPEG, PNG, WEBP",
      }));
      return;
    }

    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        banner: "Banner file size exceeds the 20 MB limit.",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, banner: "" }));
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setBannerName(file.name);
          setBannerSize(file.size);
          const reader = new FileReader();
          reader.onloadend = () => {
            setBannerImage(reader.result as string);
          };
          reader.readAsDataURL(file);
          setTimeout(() => setUploadProgress(null), 800);
          return 100;
        }
        return prev + 25;
      });
    }, 100);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveBanner = () => {
    setBannerName("");
    setBannerSize(0);
    setBannerImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {
      title: validateField("title", title),
      slug: validateField("slug", slug),
      description: validateField("description", description),
      startDate: validateField("startDate", startDate),
      endDate: validateField("endDate", endDate),
    };

    setErrors(newErrors);
    setIsTouched({
      title: true,
      slug: true,
      description: true,
      startDate: true,
      endDate: true,
    });

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) {
      return;
    }

    onSubmit({
      title: title.trim(),
      slug: slug.trim(),
      shortDescription: shortDescription.trim() || null,
      description: description.trim(),
      bannerImage,
      startDate,
      endDate: endDate || null,
      startTime: startTime || null,
      endTime: endTime || null,
      venue: venue.trim() || null,
      organizer: organizer.trim() || null,
      registrationLink: registrationLink.trim() || null,
      isMainWebsite,
      status,
      campusIds,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans) - Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Basic Details */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                1
              </span>
              General Information
            </h2>

            {/* Title field */}
            <div className="space-y-1.5">
              <Label
                htmlFor="title"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Event Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g. Annual Convocation and Graduation Day 2026"
                value={title}
                onChange={(e) => handleFieldChange("title", e.target.value, setTitle)}
                onBlur={(e) => handleBlur("title", e.target.value)}
                className={`h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm ${
                  errors.title ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
              />
              {errors.title && (
                <p className="text-destructive text-xs mt-1 pl-0.5">{errors.title}</p>
              )}
            </div>

            {/* Short Description */}
            <div className="space-y-1.5">
              <Label
                htmlFor="shortDescription"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Short Description (Optional)
              </Label>
              <Input
                id="shortDescription"
                type="text"
                placeholder="Provide a brief one-line catchphrase to display on lists or cards..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm"
              />
            </div>

            {/* Full Description field */}
            <div className="space-y-1.5">
              <Label
                htmlFor="description"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Detailed Event Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                rows={6}
                placeholder="Describe the full schedule, highlights, eligibility, registration procedures, and instructions for attendees..."
                value={description}
                onChange={(e) => handleFieldChange("description", e.target.value, setDescription)}
                onBlur={(e) => handleBlur("description", e.target.value)}
                className={`rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm leading-relaxed p-4 min-h-[140px] ${
                  errors.description ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
              />
              {errors.description && (
                <p className="text-destructive text-xs mt-1 pl-0.5">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Section: Event Logistics (Dates, Venues, Links) */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                2
              </span>
              Date, Venue & Logistics
            </h2>

            {/* Dates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="startDate"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5 flex items-center gap-1"
                >
                  <Calendar className="size-3.5 text-gold" /> Start Date{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => handleFieldChange("startDate", e.target.value, setStartDate)}
                  onBlur={(e) => handleBlur("startDate", e.target.value)}
                  className={`h-11 rounded-xl bg-background/50 border-border text-sm ${
                    errors.startDate ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                />
                {errors.startDate && (
                  <p className="text-destructive text-xs mt-1 pl-0.5">{errors.startDate}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="endDate"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5 flex items-center gap-1"
                >
                  <Calendar className="size-3.5 text-gold" /> End Date (Optional)
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => handleFieldChange("endDate", e.target.value, setEndDate)}
                  onBlur={(e) => handleBlur("endDate", e.target.value)}
                  className={`h-11 rounded-xl bg-background/50 border-border text-sm ${
                    errors.endDate ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                />
                {errors.endDate && (
                  <p className="text-destructive text-xs mt-1 pl-0.5">{errors.endDate}</p>
                )}
              </div>
            </div>

            {/* Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="startTime"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5 flex items-center gap-1"
                >
                  <Clock className="size-3.5 text-gold" /> Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-11 rounded-xl bg-background/50 border-border text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="endTime"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5 flex items-center gap-1"
                >
                  <Clock className="size-3.5 text-gold" /> End Time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="h-11 rounded-xl bg-background/50 border-border text-sm"
                />
              </div>
            </div>

            {/* Venue & Organizer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="venue"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5 flex items-center gap-1"
                >
                  <MapPin className="size-3.5 text-gold" /> Venue
                </Label>
                <Input
                  id="venue"
                  type="text"
                  placeholder="e.g. Auditorium Hall C"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="organizer"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
                >
                  Organizing Committee / Dept
                </Label>
                <Input
                  id="organizer"
                  type="text"
                  placeholder="e.g. Science Council Admin"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm"
                />
              </div>
            </div>

            {/* Registration URL */}
            <div className="space-y-1.5">
              <Label
                htmlFor="registrationLink"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                External Registration / Details Link (Optional)
              </Label>
              <Input
                id="registrationLink"
                type="url"
                placeholder="e.g. https://forms.gle/... or external portal URL"
                value={registrationLink}
                onChange={(e) => setRegistrationLink(e.target.value)}
                className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm"
              />
            </div>
          </div>

          {/* Section: Banner Image */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                3
              </span>
              Event Banner Image
            </h2>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5">
                Banner Banner image (Max 20MB)
              </Label>

              {!bannerImage && uploadProgress === null ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleUploaderClick}
                  className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all min-h-[160px] ${
                    isDragging
                      ? "border-gold bg-gold/5 text-foreground"
                      : "border-border bg-background/40 hover:bg-background/80 text-muted-foreground hover:border-gold/40"
                  }`}
                >
                  <Upload className="size-8 text-muted-foreground mb-3 animate-pulse" />
                  <span className="text-sm font-semibold text-foreground mb-1">
                    Drag and drop banner here, or click to browse
                  </span>
                  <span className="text-xs text-muted-foreground text-center">
                    JPG, JPEG, PNG, or WEBP formats supported
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.webp"
                    className="hidden"
                  />
                </div>
              ) : uploadProgress !== null ? (
                <div className="flex flex-col items-center justify-center border rounded-xl p-8 bg-background/40 min-h-[160px]">
                  <Upload className="size-8 text-gold mb-3 animate-bounce" />
                  <span className="text-sm font-semibold text-foreground mb-2">
                    Processing Banner... {uploadProgress}%
                  </span>
                  <div className="w-full max-w-xs bg-muted h-2 rounded-full overflow-hidden border border-border">
                    <div
                      className="bg-gradient-gold h-full rounded-full transition-all duration-100"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-background/60 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-28 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                      <img
                        src={bannerImage}
                        alt="Banner Preview"
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-semibold text-foreground block max-w-xs truncate">
                        {bannerName}
                      </span>
                      {bannerSize > 0 && (
                        <span className="text-[10px] text-muted-foreground block">
                          Size: {(bannerSize / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleUploaderClick}
                      className="h-8 rounded-lg text-xs font-semibold px-3 bg-background border-border text-foreground hover:bg-accent"
                    >
                      Replace Banner
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleRemoveBanner}
                      className="h-8 rounded-lg text-xs font-semibold px-2 text-destructive hover:bg-destructive/10"
                    >
                      <X className="size-4 mr-1" /> Remove
                    </Button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.webp"
                    className="hidden"
                  />
                </div>
              )}

              {errors.banner && (
                <p className="text-destructive text-xs mt-1.5 pl-0.5 flex items-center gap-1">
                  <AlertCircle className="size-3.5" />
                  {errors.banner}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1 span) - Settings & Multiple Campus Selections */}
        <div className="space-y-6">
          {/* Section: Publishing Parameters */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                4
              </span>
              Configurations
            </h2>

            {/* Status selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5">
                Default Status
              </Label>
              <Select value={status} onValueChange={(val: any) => setStatus(val)}>
                <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border">
                  <SelectItem value="DRAFT">DRAFT (Hidden)</SelectItem>
                  <SelectItem value="PUBLISHED">PUBLISHED (Live)</SelectItem>
                  <SelectItem value="ARCHIVED">ARCHIVED (Past Event)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* visible on main website */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-border/60">
              <div className="space-y-0.5 pr-2">
                <span className="text-xs font-semibold text-foreground block">Main Website</span>
                <span className="text-[10px] text-muted-foreground block leading-tight">
                  Show on global institutions page
                </span>
              </div>
              <Switch checked={isMainWebsite} onCheckedChange={setIsMainWebsite} />
            </div>

            {/* Slug manual override */}
            <div className="space-y-1.5 pt-2">
              <Label
                htmlFor="slug"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                URL Slug
              </Label>
              <Input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => {
                  setIsTouched((prev) => ({ ...prev, slug: true }));
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                }}
                onBlur={(e) => handleBlur("slug", e.target.value)}
                className={`h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 transition-all font-mono text-xs ${
                  errors.slug ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
              />
              {errors.slug && <p className="text-destructive text-xs mt-1 pl-0.5">{errors.slug}</p>}
            </div>
          </div>

          {/* Section: Multi-Campus Mapping */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                5
              </span>
              Campus Mappings
            </h2>

            <p className="text-[10px] text-muted-foreground leading-normal pl-0.5">
              <Info className="size-3.5 inline mr-1 text-gold" />
              Select all schools/colleges where this event is hosted or should be published.
            </p>

            <div className="space-y-2.5 pt-1">
              {activeCampuses.length === 0 ? (
                <span className="text-xs text-muted-foreground block pl-0.5">
                  No active campuses available.
                </span>
              ) : (
                activeCampuses.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <Checkbox
                      id={`campus-${c.id}`}
                      checked={campusIds.includes(c.id)}
                      onCheckedChange={() => handleCampusToggle(c.id)}
                      className="mt-0.5 rounded border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    <div className="leading-tight">
                      <Label
                        htmlFor={`campus-${c.id}`}
                        className="text-xs font-semibold text-foreground cursor-pointer block"
                      >
                        {c.name}
                      </Label>
                      <span className="text-[9px] text-muted-foreground uppercase mt-0.5 block">
                        {c.shortName} • {c.city}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-3">
            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 flex items-center justify-center gap-1.5 shadow-sm text-sm"
            >
              <CheckCircle2 className="size-4" /> {submitButtonText}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-full h-11 rounded-xl border border-border text-muted-foreground hover:text-foreground font-semibold bg-background hover:bg-accent text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
