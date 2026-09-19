import React, { useState, useRef, useEffect } from "react";
import { X, AlertCircle, Info, Image, Video, CheckCircle2, RefreshCw, Plus, Trash2 } from "lucide-react";
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
import { getStoredCampuses } from "@/data/campuses";
import {
  GalleryItem,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  IMAGE_SIZE_LIMIT,
  VIDEO_SIZE_LIMIT,
} from "@/data/gallery";

export interface SelectedFileItem {
  id: string;
  file?: File;
  fileName: string;
  fileSize: number;
  mimeType: string;
  previewUrl: string;
}

interface GalleryFormProps {
  initialData?: GalleryItem;
  onSubmit: (formDataList: FormData[]) => void;
  onCancel: () => void;
  submitButtonText: string;
  isSubmitting?: boolean;
}

export const GalleryForm: React.FC<GalleryFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText,
  isSubmitting = false,
}) => {
  // Load campuses from API
  const [campusesList, setCampusesList] = useState<any[]>([]);

  useEffect(() => {
    async function loadCampuses() {
      try {
        const res = await campusService.getAllCampuses({ limit: 100 });
        setCampusesList(res.campuses.filter((c: any) => c.status === "active" || c.isActive));
      } catch (err) {
        setCampusesList(getStoredCampuses().filter((c: any) => c.status === "active"));
      }
    }
    loadCampuses();
  }, []);

  // Form states
  const [campusId, setCampusId] = useState<string>(initialData?.campusId || "");
  const [mediaType, setMediaType] = useState<"IMAGE" | "VIDEO">(initialData?.mediaType || "IMAGE");
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "Events");
  const [sortOrder, setSortOrder] = useState<number>(
    initialData?.sortOrder !== undefined ? initialData.sortOrder : 0,
  );
  const [isActive, setIsActive] = useState<boolean>(
    initialData?.isActive !== undefined ? initialData.isActive : true,
  );

  // File upload state - Multiple files support
  const [selectedFiles, setSelectedFiles] = useState<SelectedFileItem[]>(() => {
    if (initialData) {
      return [
        {
          id: initialData.id,
          fileName: initialData.fileName,
          fileSize: initialData.fileSize,
          mimeType: initialData.mimeType,
          previewUrl: initialData.fileUrl,
        },
      ];
    }
    return [];
  });

  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean file states if mediaType changes
  const handleMediaTypeChange = (val: "IMAGE" | "VIDEO") => {
    setMediaType(val);
    if (initialData?.mediaType !== val) {
      handleClearAllFiles();
    } else if (initialData) {
      setSelectedFiles([
        {
          id: initialData.id,
          fileName: initialData.fileName,
          fileSize: initialData.fileSize,
          mimeType: initialData.mimeType,
          previewUrl: initialData.fileUrl,
        },
      ]);
    } else {
      handleClearAllFiles();
    }
    setErrors((prev) => ({ ...prev, file: "" }));
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const validateField = (fieldName: string, value: any): string => {
    if (fieldName === "campusId" && !value && !initialData) {
      return "Target Campus is required.";
    }
    if (fieldName === "mediaType" && !value) {
      return "Media Type is required.";
    }
    if (fieldName === "file" && selectedFiles.length === 0 && !initialData) {
      return `Please select at least one ${mediaType.toLowerCase()} file to upload.`;
    }
    return "";
  };

  const handleFieldChange = (fieldName: string, value: any, setter: (val: any) => void) => {
    setter(value);
    if (isTouched[fieldName]) {
      const errorMsg = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  const handleUploaderClick = () => {
    fileInputRef.current?.click();
  };

  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    const newItems: SelectedFileItem[] = [];
    let errorMessage = "";

    for (const file of fileArray) {
      const fileExt = "." + file.name.split(".").pop()?.toLowerCase();

      if (mediaType === "IMAGE") {
        if (
          !ALLOWED_IMAGE_TYPES.includes(file.type) &&
          ![".jpg", ".jpeg", ".png", ".webp"].includes(fileExt)
        ) {
          errorMessage = "Unsupported format. Allowed photo formats: JPG, JPEG, PNG, WEBP.";
          continue;
        }
        if (file.size > IMAGE_SIZE_LIMIT) {
          errorMessage = `File "${file.name}" exceeds the 20 MB image size limit.`;
          continue;
        }
      } else {
        if (
          !ALLOWED_VIDEO_TYPES.includes(file.type) &&
          ![".mp4", ".mov", ".avi", ".mkv", ".webm"].includes(fileExt)
        ) {
          errorMessage = "Unsupported format. Allowed video formats: MP4, MOV, AVI, MKV, WEBM.";
          continue;
        }
        if (file.size > VIDEO_SIZE_LIMIT) {
          errorMessage = `File "${file.name}" exceeds the 100 MB video size limit.`;
          continue;
        }
      }

      newItems.push({
        id: "file_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
        file,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type || (mediaType === "IMAGE" ? "image/jpeg" : "video/mp4"),
        previewUrl: URL.createObjectURL(file),
      });
    }

    if (errorMessage && newItems.length === 0) {
      setErrors((prev) => ({ ...prev, file: errorMessage }));
      return;
    }

    setErrors((prev) => ({ ...prev, file: "" }));

    if (mediaType === "VIDEO") {
      // Videos remain single-file selection
      setSelectedFiles(newItems.slice(0, 1));
    } else {
      // Images append to current list (multiple selection)
      setSelectedFiles((prev) => [...prev, ...newItems]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
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
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveSingleFile = (idToRemove: string) => {
    setSelectedFiles((prev) => {
      const updated = prev.filter((item) => item.id !== idToRemove);
      if (updated.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return updated;
    });
  };

  const handleClearAllFiles = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {
      campusId: validateField("campusId", campusId),
      mediaType: validateField("mediaType", mediaType),
      file: validateField("file", selectedFiles),
    };

    setErrors(newErrors);
    setIsTouched({
      campusId: true,
      mediaType: true,
      file: true,
    });

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) {
      return;
    }

    const formDataList: FormData[] = selectedFiles.map((item, index) => {
      const formData = new FormData();
      if (campusId) formData.append("campusId", campusId);
      if (mediaType) formData.append("mediaType", mediaType);
      if (item.file) formData.append("file", item.file);

      let itemTitle = title.trim();
      if (itemTitle && selectedFiles.length > 1) {
        itemTitle = `${itemTitle} (${index + 1}/${selectedFiles.length})`;
      }
      if (itemTitle) formData.append("title", itemTitle);
      if (description.trim()) formData.append("description", description.trim());
      if (category.trim()) formData.append("category", category.trim());
      formData.append("sortOrder", String(sortOrder + index));
      formData.append("isActive", String(isActive));

      return formData;
    });

    onSubmit(formDataList);
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
              Media Details
            </h2>

            {/* Title field */}
            <div className="space-y-1.5">
              <Label
                htmlFor="title"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Media Item Title (Optional)
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g. Science Exhibition Winners 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm"
              />
            </div>

            {/* Description field */}
            <div className="space-y-1.5">
              <Label
                htmlFor="description"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Description / Captions (Optional)
              </Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Provide a detailed caption describing this event, activity, or infrastructure highlight..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm leading-relaxed p-4 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="category"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
                >
                  Category
                </Label>
                <Select value={category} onValueChange={(val) => setCategory(val)}>
                  <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border text-sm">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-border">
                    <SelectItem value="Academics">Academics</SelectItem>
                    <SelectItem value="Events">Events</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Student Life">Student Life</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Order */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="sortOrder"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
                >
                  Starting Sort Order Rank
                </Label>
                <Input
                  id="sortOrder"
                  type="number"
                  placeholder="0"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                  className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section: File Attachment */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                  2
                </span>
                Media Upload ({mediaType === "IMAGE" ? "Multiple Photos" : "Video"})
              </h2>

              {selectedFiles.length > 0 && mediaType === "IMAGE" && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                    {selectedFiles.length} {selectedFiles.length === 1 ? "photo" : "photos"} selected
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClearAllFiles}
                    className="h-7 text-xs text-destructive hover:bg-destructive/10 px-2 rounded-lg"
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>

            {/* Drag & drop file area */}
            <div className="space-y-3">
              {/* Dropzone Box */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploaderClick}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all ${
                  isDragging
                    ? "border-gold bg-gold/5 text-foreground"
                    : "border-border bg-background/40 hover:bg-background/80 text-muted-foreground hover:border-gold/40"
                } ${selectedFiles.length > 0 ? "py-5" : "min-h-[180px]"}`}
              >
                {mediaType === "IMAGE" ? (
                  <Image className="size-9 text-muted-foreground mb-2 animate-pulse" />
                ) : (
                  <Video className="size-9 text-muted-foreground mb-2 animate-pulse" />
                )}
                <span className="text-sm font-semibold text-foreground mb-1 text-center">
                  {selectedFiles.length > 0
                    ? `Click or drag to add ${mediaType === "IMAGE" ? "more photos" : "a different video"}`
                    : `Drag and drop your ${mediaType === "IMAGE" ? "photos" : "video"} here, or click to browse`}
                </span>
                <span className="text-xs text-muted-foreground text-center max-w-sm">
                  {mediaType === "IMAGE"
                    ? "You can select multiple photos at once. JPG, JPEG, PNG, or WEBP (Max 20MB per photo)"
                    : "MP4, MOV, AVI, MKV, or WEBM (Max 100MB)"}
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple={mediaType === "IMAGE"}
                  accept={
                    mediaType === "IMAGE" ? ".jpg,.jpeg,.png,.webp" : ".mp4,.mov,.avi,.mkv,.webm"
                  }
                  className="hidden"
                />
              </div>

              {/* Selected Files Grid Preview */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5">
                    <span>Selected Preview ({selectedFiles.length})</span>
                    {mediaType === "IMAGE" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleUploaderClick}
                        className="h-7 text-xs rounded-lg border-border"
                      >
                        <Plus className="size-3.5 mr-1" /> Add More Photos
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto p-1">
                    {selectedFiles.map((item, index) => (
                      <div
                        key={item.id}
                        className="group relative rounded-xl border border-border bg-background/80 overflow-hidden shadow-sm flex flex-col"
                      >
                        {/* Preview Image / Video Thumbnail */}
                        <div className="aspect-video w-full bg-slate-950 overflow-hidden relative border-b border-border/50">
                          {mediaType === "IMAGE" ? (
                            <img
                              src={item.previewUrl}
                              alt={item.fileName}
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="size-full flex items-center justify-center bg-black/40">
                              <Video className="size-8 text-white" />
                            </div>
                          )}

                          {/* Index Badge */}
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-[10px] text-white font-mono font-bold">
                            #{index + 1}
                          </span>

                          {/* Remove button overlay */}
                          <button
                            type="button"
                            onClick={() => handleRemoveSingleFile(item.id)}
                            className="absolute top-1.5 right-1.5 size-6 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center hover:bg-destructive transition-colors shadow-md"
                            title="Remove photo"
                          >
                            <X className="size-3.5" />
                          </button>
                        </div>

                        {/* File Details */}
                        <div className="p-2 space-y-0.5">
                          <span className="text-xs font-medium text-foreground truncate block leading-tight">
                            {item.fileName}
                          </span>
                          <span className="text-[10px] text-muted-foreground block font-mono">
                            {formatBytes(item.fileSize)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
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

        {/* Right Column (1 span) - Settings & Routing */}
        <div className="space-y-6">
          {/* Section: Configurations */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                3
              </span>
              Configurations
            </h2>

            {/* Campus selection */}
            <div className="space-y-1.5">
              <Label
                htmlFor="campusId"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Target Campus {!initialData && <span className="text-destructive">*</span>}
              </Label>
              <Select
                value={campusId}
                onValueChange={(val) => handleFieldChange("campusId", val, setCampusId)}
                disabled={Boolean(initialData)}
              >
                <SelectTrigger
                  className={`h-11 rounded-xl bg-background/50 border-border text-sm ${
                    errors.campusId ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                >
                  <SelectValue placeholder="Select Campus" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border">
                  {campusesList.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} ({c.shortName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.campusId && (
                <p className="text-destructive text-xs mt-1 pl-0.5">{errors.campusId}</p>
              )}
            </div>

            {/* Media Type selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5">
                Media Format <span className="text-destructive">*</span>
              </Label>
              <Select
                value={mediaType}
                onValueChange={(val: "IMAGE" | "VIDEO") => handleMediaTypeChange(val)}
                disabled={Boolean(initialData)}
              >
                <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border">
                  <SelectItem value="IMAGE">IMAGE (Multiple Photos)</SelectItem>
                  <SelectItem value="VIDEO">VIDEO (MP4 / H264)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground pl-0.5 leading-relaxed">
                <Info className="size-3 inline mr-1 text-gold" />
                Photos are optimized and resized to WebP automatically. Videos will transcode to
                standard MP4 streaming format.
              </p>
            </div>

            {/* Active Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-border/60">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-foreground">Visible on Public</span>
                <span className="text-[10px] text-muted-foreground block">
                  Visible in campus gallery
                </span>
              </div>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
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
                <RefreshCw className="size-4 animate-spin mr-1" />
              ) : (
                <CheckCircle2 className="size-4" />
              )}
              {selectedFiles.length > 1
                ? `Upload ${selectedFiles.length} Photos`
                : submitButtonText}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
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
