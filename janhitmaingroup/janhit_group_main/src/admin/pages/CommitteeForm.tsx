import React, { useState, useRef, useEffect } from "react";
import { Camera, X, Upload, Info } from "lucide-react";
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
import { Committee } from "@/data/committees";

interface CommitteeFormProps {
  initialData?: Committee;
  onSubmit: (
    data: Omit<Committee, "id" | "members" | "documents" | "createdAt" | "updatedAt" | "slug">,
  ) => void;
  onCancel: () => void;
  submitButtonText: string;
}

export const CommitteeForm: React.FC<CommitteeFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText,
}) => {
  // Load campuses
  const campusesList = getStoredCampuses().filter((c) => c.status === "active");

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [objective, setObjective] = useState(initialData?.objective || "");
  const [committeeType, setCommitteeType] = useState(initialData?.committeeType || "Statutory");
  const [academicSession, setAcademicSession] = useState(initialData?.academicSession || "2026-27");

  // Date helpers
  const getLocalDateOnly = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      const pad = (n: number) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    } catch {
      return "";
    }
  };

  const getLocalDateTime = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      const pad = (n: number) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
      return "";
    }
  };

  const [tenureFrom, setTenureFrom] = useState(getLocalDateOnly(initialData?.tenureFrom) || "");
  const [tenureTo, setTenureTo] = useState(getLocalDateOnly(initialData?.tenureTo) || "");
  const [publishDate, setPublishDate] = useState(getLocalDateTime(initialData?.publishDate) || "");
  const [bannerImage, setBannerImage] = useState(initialData?.bannerImage || "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVED">(
    initialData?.status || "DRAFT",
  );
  const [displayOrder, setDisplayOrder] = useState(
    initialData?.displayOrder !== undefined ? String(initialData.displayOrder) : "0",
  );
  const [isMainWebsite, setIsMainWebsite] = useState(initialData?.isMainWebsite || false);
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>(initialData?.campuses || []);

  // Errors & Touches
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Field validation
  const validateField = (fieldName: string, value: any): string => {
    if (fieldName === "title" && !String(value).trim()) {
      return "Committee Title is required.";
    }
    if (fieldName === "displayOrder") {
      const parsed = Number(value);
      if (value.trim() === "" || isNaN(parsed) || !Number.isInteger(parsed)) {
        return "Display Order must be an integer.";
      }
    }
    if (fieldName === "tenureTo" && value && tenureFrom) {
      if (new Date(value) < new Date(tenureFrom)) {
        return "Tenure To date must be on or after Tenure From date.";
      }
    }
    return "";
  };

  const handleBlur = (fieldName: string, value: string) => {
    setIsTouched((prev) => ({ ...prev, [fieldName]: true }));
    const errorMsg = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
  };

  const handleFieldChange = (fieldName: string, value: string, setter: (val: string) => void) => {
    setter(value);
    if (isTouched[fieldName]) {
      const errorMsg = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  // Checkbox handlers
  const handleCampusToggle = (campusId: string) => {
    setSelectedCampuses((prev) =>
      prev.includes(campusId) ? prev.filter((id) => id !== campusId) : [...prev, campusId],
    );
  };

  // Image upload
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          bannerImage: "Banner image size exceeds allowed limit of 2MB.",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
        setErrors((prev) => ({ ...prev, bannerImage: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setBannerImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: validateField("title", title),
      displayOrder: validateField("displayOrder", displayOrder),
      tenureTo: validateField("tenureTo", tenureTo),
    };

    setErrors(newErrors);
    setIsTouched({
      title: true,
      displayOrder: true,
      tenureTo: true,
    });

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) {
      const firstErrorKey = Object.keys(newErrors).find(
        (k) => newErrors[k as keyof typeof newErrors] !== "",
      );
      if (firstErrorKey) {
        const element = document.getElementsByName(firstErrorKey)[0];
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
      return;
    }

    // Call submit
    onSubmit({
      title: title.trim(),
      category: category.trim(),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      objective: objective.trim(),
      committeeType,
      academicSession,
      tenureFrom: tenureFrom ? new Date(tenureFrom).toISOString() : undefined,
      tenureTo: tenureTo ? new Date(tenureTo).toISOString() : undefined,
      bannerImage,
      status,
      publishDate: publishDate ? new Date(publishDate).toISOString() : undefined,
      displayOrder: Number(displayOrder),
      isMainWebsite,
      campuses: selectedCampuses,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      {/* Banner Upload & Main Titles */}
      <div className="bg-card glass rounded-2xl p-6 border shadow-sm space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-2xl rounded-full pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Banner Image Uploader */}
          <div className="w-full lg:w-1/3 flex flex-col items-center">
            <Label className="text-xs font-bold text-foreground/80 mb-2 self-start">
              Committee Banner Image
            </Label>
            <div
              onClick={handleImageClick}
              className={`w-full h-44 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all relative ${
                bannerImage
                  ? "border-primary/40 bg-background"
                  : "border-muted-foreground/30 hover:border-primary/50 bg-background/50 hover:bg-background"
              }`}
            >
              {bannerImage ? (
                <img
                  src={bannerImage}
                  alt="Committee Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <Upload className="size-8 text-muted-foreground mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground font-semibold">
                    Upload Banner Image
                  </span>
                  <p className="text-[10px] text-muted-foreground/80 mt-1">
                    PNG, JPG, WEBP up to 2MB
                  </p>
                </div>
              )}

              {bannerImage && (
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="size-6 text-white" />
                </div>
              )}
            </div>

            {bannerImage && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveImage}
                className="mt-2 text-xs text-destructive hover:bg-destructive/10 rounded-xl"
              >
                <X className="size-3.5 mr-1" />
                Remove Banner Image
              </Button>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            {errors.bannerImage && (
              <p className="text-destructive text-[11px] font-semibold mt-1.5">
                {errors.bannerImage}
              </p>
            )}
          </div>

          {/* Title & Core Configs */}
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="title" className="text-xs font-bold text-foreground/80">
                Committee Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => handleFieldChange("title", e.target.value, setTitle)}
                onBlur={(e) => handleBlur("title", e.target.value)}
                placeholder="e.g. Anti-Ragging Committee"
                className={`mt-1.5 rounded-xl ${errors.title ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.title && (
                <p className="text-destructive text-[11px] font-semibold mt-1">{errors.title}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-xs font-bold text-foreground/80">
                  Category
                </Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Student Welfare, Academic, Women Protection"
                  className="mt-1.5 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="committeeType" className="text-xs font-bold text-foreground/80">
                  Committee Type
                </Label>
                <div className="mt-1.5">
                  <Select value={committeeType} onValueChange={setCommitteeType}>
                    <SelectTrigger className="rounded-xl bg-background">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border border-border/80">
                      <SelectItem value="Statutory">Statutory</SelectItem>
                      <SelectItem value="Non-statutory">Non-statutory</SelectItem>
                      <SelectItem value="Ad-hoc">Ad-hoc</SelectItem>
                      <SelectItem value="Grievance Cell">Grievance Cell</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Objective details */}
      <div className="bg-card glass rounded-2xl p-6 border shadow-sm space-y-4">
        <h3 className="font-display font-bold text-lg text-foreground border-b pb-2">
          Description & Objectives
        </h3>

        <div className="space-y-4">
          <div>
            <Label htmlFor="shortDescription" className="text-xs font-bold text-foreground/80">
              Short Description
            </Label>
            <Input
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="A brief 1-line description of the committee's purpose..."
              className="mt-1.5 rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-xs font-bold text-foreground/80">
              Detailed Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell a detailed story about the committee's regulatory compliance, responsibilities, and guidelines..."
              className="mt-1.5 rounded-xl h-28"
            />
          </div>

          <div>
            <Label htmlFor="objective" className="text-xs font-bold text-foreground/80">
              Core Objectives
            </Label>
            <Textarea
              id="objective"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="Outline the core objective milestones or duties of the committee..."
              className="mt-1.5 rounded-xl h-24"
            />
          </div>
        </div>
      </div>

      {/* Academic Session, Tenure dates, and Campus mappings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tenure & Sessions card */}
        <div className="bg-card glass rounded-2xl p-6 border shadow-sm space-y-4">
          <h3 className="font-display font-bold text-lg text-foreground border-b pb-2">
            Tenure & Session
          </h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="academicSession" className="text-xs font-bold text-foreground/80">
                Academic Session
              </Label>
              <Input
                id="academicSession"
                value={academicSession}
                onChange={(e) => setAcademicSession(e.target.value)}
                placeholder="e.g. 2026-27"
                className="mt-1.5 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tenureFrom" className="text-xs font-bold text-foreground/80">
                  Tenure From
                </Label>
                <Input
                  id="tenureFrom"
                  type="date"
                  value={tenureFrom}
                  onChange={(e) => setTenureFrom(e.target.value)}
                  className="mt-1.5 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="tenureTo" className="text-xs font-bold text-foreground/80">
                  Tenure To
                </Label>
                <Input
                  id="tenureTo"
                  name="tenureTo"
                  type="date"
                  value={tenureTo}
                  onChange={(e) => handleFieldChange("tenureTo", e.target.value, setTenureTo)}
                  onBlur={(e) => handleBlur("tenureTo", e.target.value)}
                  className={`mt-1.5 rounded-xl ${errors.tenureTo ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.tenureTo && (
                  <p className="text-destructive text-[11px] font-semibold mt-1">
                    {errors.tenureTo}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Campuses Multi-select card */}
        <div className="bg-card glass rounded-2xl p-6 border shadow-sm flex flex-col">
          <h3 className="font-display font-bold text-lg text-foreground border-b pb-2">
            Associated Campuses
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            Select the campus locations where this committee is active.
          </p>

          <div className="flex-1 mt-3.5 border rounded-xl p-4 bg-background/50 overflow-y-auto max-h-[160px] space-y-2">
            {campusesList.map((campus) => (
              <div key={campus.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`campus-${campus.id}`}
                  checked={selectedCampuses.includes(campus.id)}
                  onCheckedChange={() => handleCampusToggle(campus.id)}
                  className="rounded"
                />
                <Label
                  htmlFor={`campus-${campus.id}`}
                  className="text-xs font-semibold text-foreground/90 cursor-pointer select-none"
                >
                  {campus.name}
                </Label>
              </div>
            ))}
            {campusesList.length === 0 && (
              <p className="text-xs text-muted-foreground italic text-center py-4">
                No active campuses available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Admin Settings, publish configs, display order */}
      <div className="bg-card glass rounded-2xl p-6 border shadow-sm space-y-4">
        <h3 className="font-display font-bold text-lg text-foreground border-b pb-2">
          Publishing & Status Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div>
            <Label htmlFor="displayOrder" className="text-xs font-bold text-foreground/80">
              Display Order <span className="text-destructive">*</span>
            </Label>
            <Input
              id="displayOrder"
              name="displayOrder"
              value={displayOrder}
              onChange={(e) => handleFieldChange("displayOrder", e.target.value, setDisplayOrder)}
              onBlur={(e) => handleBlur("displayOrder", e.target.value)}
              type="number"
              placeholder="0"
              className={`mt-1.5 rounded-xl ${errors.displayOrder ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.displayOrder && (
              <p className="text-destructive text-[11px] font-semibold mt-1">
                {errors.displayOrder}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="status" className="text-xs font-bold text-foreground/80">
              Publish Status
            </Label>
            <div className="mt-1.5">
              <Select value={status} onValueChange={(val: any) => setStatus(val)}>
                <SelectTrigger className="rounded-xl bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-border/80">
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="publishDate" className="text-xs font-bold text-foreground/80">
              Scheduled Publish Date
            </Label>
            <Input
              id="publishDate"
              type="datetime-local"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="mt-1.5 rounded-xl"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/40">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="isMainWebsite" className="text-xs font-bold cursor-pointer">
                Main Web Visibility
              </Label>
              <span className="text-[10px] text-muted-foreground">Show on main group website</span>
            </div>
            <Switch id="isMainWebsite" checked={isMainWebsite} onCheckedChange={setIsMainWebsite} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} className="rounded-xl px-6">
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm rounded-xl px-8"
        >
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};
