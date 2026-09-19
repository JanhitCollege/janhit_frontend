import React, { useState, useRef, useEffect } from "react";
import { Upload, FileText, X, AlertCircle, Info, FileDown, CheckCircle2, Loader2, Files } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { campusService } from "../services/campusService";
import { ALLOWED_CATEGORIES, CATEGORY_LABELS } from "@/data/downloads";
import { Download } from "../services/downloadService";

interface DownloadFormProps {
  initialData?: Download;
  onSubmit: (data: {
    title: string;
    slug: string;
    description: string | null;
    category: string;
    campusId: string | null;
    fileUrl: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    isActive: boolean;
    file?: File | null;
    files?: File[];
  }) => void;
  onCancel: () => void;
  submitButtonText: string;
  isSubmitting?: boolean;
}

export const DownloadForm: React.FC<DownloadFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText,
  isSubmitting = false,
}) => {
  // Campuses state
  const [campusesList, setCampusesList] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCampuses() {
      try {
        const res = await campusService.getAllCampuses({ limit: 100 });
        setCampusesList((res.campuses || []).filter((c: any) => c.status === "active" || c.isActive));
      } catch (err) {
        setCampusesList([]);
      }
    }
    fetchCampuses();
  }, []);

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState<string>(initialData?.category || "ADMISSION_FORM");
  const [campusId, setCampusId] = useState<string>(initialData?.campusId || "global");
  const [isActive, setIsActive] = useState<boolean>(
    initialData?.isActive !== undefined ? initialData.isActive : true,
  );

  // File upload states (Supports single or multiple files selection)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileName, setFileName] = useState(initialData?.fileName || "");
  const [fileSize, setFileSize] = useState<number>(initialData?.fileSize || 0);
  const [fileType, setFileType] = useState(initialData?.fileType || "");
  const [fileUrl, setFileUrl] = useState(initialData?.fileUrl || "");

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Error & Touch validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug on title change if not editing and slug has not been touched
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

  // File size formatter utility
  const formatBytes = (bytes: number, decimals = 2) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Validation function
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
    if (fieldName === "category" && !value) {
      return "Category is required.";
    }
    if (fieldName === "file" && !fileName && selectedFiles.length === 0) {
      return "Please upload at least one document file.";
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

  // Uploader Handlers
  const handleUploaderClick = () => {
    fileInputRef.current?.click();
  };

  const processFiles = (filesList: FileList | File[]) => {
    const filesArray = Array.from(filesList);
    const allowedExtensions = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx"];
    const validFiles: File[] = [];

    for (const file of filesArray) {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        setErrors((prev) => ({
          ...prev,
          file: `Invalid file type for "${file.name}". Allowed: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX`,
        }));
        return;
      }
      const maxSize = 50 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          file: `File "${file.name}" exceeds allowed limit of 50 MB.`,
        }));
        return;
      }
      validFiles.push(file);
    }

    setErrors((prev) => ({ ...prev, file: "" }));

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      if (validFiles.length === 1) {
        setFileName(validFiles[0].name);
        setFileSize(validFiles[0].size);
        setFileType(validFiles[0].type || "application/octet-stream");
        setFileUrl(URL.createObjectURL(validFiles[0]));
      } else {
        setFileName(`${validFiles.length} files selected`);
        setFileSize(validFiles.reduce((acc, f) => acc + f.size, 0));
        setFileType("application/pdf");
        setFileUrl(URL.createObjectURL(validFiles[0]));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFiles([]);
    setFileName("");
    setFileSize(0);
    setFileType("");
    setFileUrl("");
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
      category: validateField("category", category),
      file: validateField("file", fileName),
    };

    setErrors(newErrors);
    setIsTouched({
      title: true,
      slug: true,
      category: true,
      file: true,
    });

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) {
      return;
    }

    onSubmit({
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim() || null,
      category,
      campusId: campusId === "global" ? null : campusId,
      fileUrl,
      fileName,
      fileType,
      fileSize,
      isActive,
      file: selectedFiles.length > 0 ? selectedFiles[0] : null,
      files: selectedFiles,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans wide) - Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Basic Info */}
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
                Download Document Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g. B.Ed Prospectus and Admission Guide 2026"
                value={title}
                onChange={(e) => handleFieldChange("title", e.target.value, setTitle)}
                onBlur={(e) => handleBlur("title", e.target.value)}
                className={`h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm ${
                  errors.title
                    ? "border-destructive focus-visible:ring-destructive focus-visible:border-destructive"
                    : ""
                }`}
              />
              {errors.title && (
                <p className="text-destructive text-xs mt-1 pl-0.5">{errors.title}</p>
              )}
            </div>

            {/* Description field */}
            <div className="space-y-1.5">
              <Label
                htmlFor="description"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Description / Details (Optional)
              </Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Provide a brief summary of the contents, rules, or instructions related to this download..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm leading-relaxed p-4 min-h-[120px]"
              />
            </div>
          </div>

          {/* Section: File Attachment */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                2
              </span>
              Document File Upload
            </h2>

            {/* Drag & drop file area */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5">
                Upload File(s) <span className="text-destructive">*</span>
              </Label>

              {!fileName && uploadProgress === null ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleUploaderClick}
                  className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all min-h-[180px] ${
                    isDragging
                      ? "border-gold bg-gold/5 text-foreground"
                      : "border-border bg-background/40 hover:bg-background/80 text-muted-foreground hover:border-gold/40"
                  }`}
                >
                  <Upload className="size-8 text-muted-foreground mb-3 animate-pulse" />
                  <span className="text-sm font-semibold text-foreground mb-1">
                    Drag and drop file(s) here, or click to browse
                  </span>
                  <span className="text-xs text-muted-foreground text-center max-w-sm">
                    Select single or multiple PDFs, DOC, DOCX, PPT, PPTX, XLS, or XLSX formats (Max 50MB per file)
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    multiple
                    className="hidden"
                  />
                </div>
              ) : uploadProgress !== null ? (
                /* Uploading progress indicator */
                <div className="flex flex-col items-center justify-center border rounded-xl p-8 bg-background/40 min-h-[180px]">
                  <Upload className="size-8 text-gold mb-3 animate-bounce" />
                  <span className="text-sm font-semibold text-foreground mb-2">
                    Uploading Documents... {uploadProgress}%
                  </span>
                  <div className="w-full max-w-xs bg-muted h-2 rounded-full overflow-hidden border border-border">
                    <div
                      className="bg-gradient-gold h-full rounded-full transition-all duration-100"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                /* File info view */
                <div className="flex flex-col items-stretch gap-3 p-4 rounded-xl border border-border bg-background/60 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                        {selectedFiles.length > 1 ? (
                          <Files className="size-6" />
                        ) : (
                          <FileText className="size-6" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm font-semibold text-foreground block max-w-md truncate">
                          {selectedFiles.length > 1
                            ? `${selectedFiles.length} PDF / Document Files Selected`
                            : fileName}
                        </span>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-muted-foreground">
                          <span>Total Size: {formatBytes(fileSize)}</span>
                          <span>•</span>
                          <span className="uppercase">{selectedFiles.length > 1 ? `${selectedFiles.length} FILES` : (fileType ? fileType.split("/").pop() : "File")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleUploaderClick}
                        className="h-8 rounded-lg text-xs font-semibold px-3 bg-background border-border text-foreground hover:bg-accent"
                      >
                        Change Files
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleRemoveFile}
                        className="h-8 rounded-lg text-xs font-semibold px-2 text-destructive hover:bg-destructive/10"
                      >
                        <X className="size-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>

                  {selectedFiles.length > 1 && (
                    <div className="pt-2 border-t border-border/40 flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                      {selectedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 text-[11px] bg-muted/50 border border-border/60 px-2 py-1 rounded-md text-foreground/80 font-mono"
                        >
                          <FileText className="size-3 text-gold shrink-0" />
                          <span className="truncate max-w-[200px]">{file.name}</span>
                          <span className="text-[9px] text-muted-foreground ml-1">
                            ({formatBytes(file.size)})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    multiple
                    className="hidden"
                  />
                </div>
              )}

              {errors.file && (
                <p className="text-destructive text-xs mt-1.5 pl-0.5 flex items-center gap-1">
                  <AlertCircle className="size-3.5" />
                  {errors.file}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1 span wide) - Settings & Routing */}
        <div className="space-y-6">
          {/* Section: Publishing Parameters */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                3
              </span>
              Configurations
            </h2>

            {/* Category selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select value={category} onValueChange={(val) => setCategory(val)}>
                <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border text-sm">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border">
                  {ALLOWED_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campus selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5">
                Campus Scope
              </Label>
              <Select value={campusId} onValueChange={(val) => setCampusId(val)}>
                <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border text-sm">
                  <SelectValue placeholder="Scope" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border">
                  <SelectItem value="global">Global (All Campuses)</SelectItem>
                  {campusesList.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name} ({c.shortName || c.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground pl-0.5 leading-relaxed">
                <Info className="size-3 inline mr-1 text-gold" />
                Assign this document to a specific school/college campus, or publish globally.
              </p>
            </div>

            {/* Active Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-border/60">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-foreground">Active Status</span>
                <span className="text-[10px] text-muted-foreground block">
                  Is document downloadable
                </span>
              </div>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
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
                  errors.slug
                    ? "border-destructive focus-visible:ring-destructive focus-visible:border-destructive"
                    : ""
                }`}
              />
              {errors.slug && <p className="text-destructive text-xs mt-1 pl-0.5">{errors.slug}</p>}
            </div>
          </div>

          {/* Form Actions Card */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 flex items-center justify-center gap-1.5 shadow-sm text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4" /> {submitButtonText}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
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
