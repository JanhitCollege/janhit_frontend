import React, { useState, useRef, useEffect } from "react";
import { Upload, X, AlertCircle, Info, Image, Video, CheckCircle2, RefreshCw } from "lucide-react";
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
import { getStoredCampuses } from "@/data/campuses";
import {
  GalleryItem,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  IMAGE_SIZE_LIMIT,
  VIDEO_SIZE_LIMIT,
} from "@/data/gallery";

interface GalleryFormProps {
  initialData?: GalleryItem;
  onSubmit: (data: {
    campusId: string;
    mediaType: "IMAGE" | "VIDEO";
    title: string | null;
    description: string | null;
    category: string | null;
    fileUrl: string;
    thumbnail: string | null;
    fileName: string;
    mimeType: string;
    fileSize: number;
    width: number | null;
    height: number | null;
    duration: number | null;
    sortOrder: number;
    isActive: boolean;
  }) => void;
  onCancel: () => void;
  submitButtonText: string;
}

export const GalleryForm: React.FC<GalleryFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText,
}) => {
  // Load campuses
  const campusesList = getStoredCampuses().filter((c) => c.status === "active");

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

  // File states
  const [fileName, setFileName] = useState(initialData?.fileName || "");
  const [fileSize, setFileSize] = useState<number>(initialData?.fileSize || 0);
  const [mimeType, setMimeType] = useState(initialData?.mimeType || "");
  const [fileUrl, setFileUrl] = useState(initialData?.fileUrl || "");
  const [thumbnail, setThumbnail] = useState<string | null>(initialData?.thumbnail || null);
  const [width, setWidth] = useState<number | null>(initialData?.width || null);
  const [height, setHeight] = useState<number | null>(initialData?.height || null);
  const [duration, setDuration] = useState<number | null>(initialData?.duration || null);

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean file states if mediaType changes
  const handleMediaTypeChange = (val: "IMAGE" | "VIDEO") => {
    setMediaType(val);
    // Reset uploaded file if we toggle types
    if (initialData?.mediaType !== val) {
      handleRemoveFile();
    } else {
      // Restore initial data if switching back to original
      setFileName(initialData.fileName);
      setFileSize(initialData.fileSize);
      setMimeType(initialData.mimeType);
      setFileUrl(initialData.fileUrl);
      setThumbnail(initialData.thumbnail);
      setWidth(initialData.width);
      setHeight(initialData.height);
      setDuration(initialData.duration);
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
    if (fieldName === "campusId" && !value) {
      return "Target Campus is required.";
    }
    if (fieldName === "mediaType" && !value) {
      return "Media Type is required.";
    }
    if (fieldName === "file" && !fileName) {
      return `Please upload a gallery ${mediaType.toLowerCase()} file.`;
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

  const handleUploaderClick = () => {
    fileInputRef.current?.click();
  };

  const processFile = (file: File) => {
    const fileExt = "." + file.name.split(".").pop()?.toLowerCase();

    if (mediaType === "IMAGE") {
      // Validate image format
      if (
        !ALLOWED_IMAGE_TYPES.includes(file.type) &&
        ![".jpg", ".jpeg", ".png", ".webp"].includes(fileExt)
      ) {
        setErrors((prev) => ({
          ...prev,
          file: "Unsupported image format. Allowed formats: JPG, JPEG, PNG, WEBP",
        }));
        return;
      }
      // Validate image size limit (20MB)
      if (file.size > IMAGE_SIZE_LIMIT) {
        setErrors((prev) => ({
          ...prev,
          file: "Image file size exceeds the 20 MB limit.",
        }));
        return;
      }
    } else {
      // Validate video format
      if (
        !ALLOWED_VIDEO_TYPES.includes(file.type) &&
        ![".mp4", ".mov", ".avi", ".mkv", ".webm"].includes(fileExt)
      ) {
        setErrors((prev) => ({
          ...prev,
          file: "Unsupported video format. Allowed formats: MP4, MOV, AVI, MKV, WEBM",
        }));
        return;
      }
      // Validate video size limit (100MB)
      if (file.size > VIDEO_SIZE_LIMIT) {
        setErrors((prev) => ({
          ...prev,
          file: "Video file size exceeds the 100 MB limit.",
        }));
        return;
      }
    }

    setErrors((prev) => ({ ...prev, file: "" }));
    setUploadProgress(0);

    // Mock progress bar
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setFileName(file.name);
          setFileSize(file.size);
          setMimeType(file.type || (mediaType === "IMAGE" ? "image/webp" : "video/mp4"));

          if (mediaType === "IMAGE") {
            const reader = new FileReader();
            reader.onloadend = () => {
              setFileUrl(reader.result as string);
              setThumbnail(null);
              setWidth(1920);
              setHeight(1080);
              setDuration(null);
            };
            reader.readAsDataURL(file);
          } else {
            // Mock Video Settings
            setFileUrl(
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            );
            setThumbnail(
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&auto=format&fit=crop&q=60",
            ); // Mock placeholder thumbnail
            setWidth(1920);
            setHeight(1080);
            setDuration(12); // Simulated video duration in seconds
          }
          setTimeout(() => setUploadProgress(null), 850);
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

  const handleRemoveFile = () => {
    setFileName("");
    setFileSize(0);
    setMimeType("");
    setFileUrl("");
    setThumbnail(null);
    setWidth(null);
    setHeight(null);
    setDuration(null);
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
      file: validateField("file", fileName),
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

    onSubmit({
      campusId,
      mediaType,
      title: title.trim() || null,
      description: description.trim() || null,
      category: category.trim() || null,
      fileUrl,
      thumbnail,
      fileName,
      mimeType,
      fileSize,
      width,
      height,
      duration,
      sortOrder,
      isActive,
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
                  Sort Order Rank
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
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                2
              </span>
              Media Upload ({mediaType})
            </h2>

            {/* Drag & drop file area */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5">
                Upload File <span className="text-destructive">*</span>
              </Label>

              {!fileName && uploadProgress === null ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleUploaderClick}
                  className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all min-h-[200px] ${
                    isDragging
                      ? "border-gold bg-gold/5 text-foreground"
                      : "border-border bg-background/40 hover:bg-background/80 text-muted-foreground hover:border-gold/40"
                  }`}
                >
                  {mediaType === "IMAGE" ? (
                    <Image className="size-10 text-muted-foreground mb-3 animate-pulse" />
                  ) : (
                    <Video className="size-10 text-muted-foreground mb-3 animate-pulse" />
                  )}
                  <span className="text-sm font-semibold text-foreground mb-1">
                    Drag and drop your {mediaType.toLowerCase()} here, or click to browse
                  </span>
                  <span className="text-xs text-muted-foreground text-center max-w-sm">
                    {mediaType === "IMAGE"
                      ? "JPG, JPEG, PNG, or WEBP (Max 20MB)"
                      : "MP4, MOV, AVI, MKV, or WEBM (Max 100MB)"}
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={
                      mediaType === "IMAGE" ? ".jpg,.jpeg,.png,.webp" : ".mp4,.mov,.avi,.mkv,.webm"
                    }
                    className="hidden"
                  />
                </div>
              ) : uploadProgress !== null ? (
                /* Uploading progress indicator */
                <div className="flex flex-col items-center justify-center border rounded-xl p-8 bg-background/40 min-h-[200px]">
                  <RefreshCw className="size-8 text-gold mb-3 animate-spin" />
                  <span className="text-sm font-semibold text-foreground mb-2">
                    Processing {mediaType.toLowerCase()}... {uploadProgress}%
                  </span>
                  <div className="w-full max-w-xs bg-muted h-2 rounded-full overflow-hidden border border-border">
                    <div
                      className="bg-gradient-gold h-full rounded-full transition-all duration-100"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                /* Media uploaded preview info */
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-background/60 shadow-sm">
                  <div className="flex items-center gap-4">
                    {/* Preview box */}
                    <div className="size-20 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative">
                      {mediaType === "IMAGE" && fileUrl ? (
                        <img
                          src={fileUrl}
                          alt="Uploaded preview"
                          className="size-full object-cover"
                        />
                      ) : thumbnail ? (
                        <div className="relative size-full">
                          <img
                            src={thumbnail}
                            alt="Video thumbnail"
                            className="size-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 grid place-items-center">
                            <Video className="size-5 text-white" />
                          </div>
                        </div>
                      ) : (
                        <Video className="size-8 text-muted-foreground" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="text-sm font-semibold text-foreground block max-w-md truncate">
                        {fileName}
                      </span>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-muted-foreground">
                        <span>Size: {formatBytes(fileSize)}</span>
                        <span>•</span>
                        <span>Mimetype: {mimeType}</span>
                        {duration && (
                          <>
                            <span>•</span>
                            <span>Duration: {duration}s</span>
                          </>
                        )}
                        {width && height && (
                          <>
                            <span>•</span>
                            <span>
                              Resolution: {width}x{height}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleUploaderClick}
                      className="h-8 rounded-lg text-xs font-semibold px-3 bg-background border-border text-foreground hover:bg-accent"
                    >
                      Replace
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
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={
                      mediaType === "IMAGE" ? ".jpg,.jpeg,.png,.webp" : ".mp4,.mov,.avi,.mkv,.webm"
                    }
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
                Target Campus <span className="text-destructive">*</span>
              </Label>
              <Select
                value={campusId}
                onValueChange={(val) => handleFieldChange("campusId", val, setCampusId)}
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
              >
                <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-border">
                  <SelectItem value="IMAGE">IMAGE (WebP Optimized)</SelectItem>
                  <SelectItem value="VIDEO">VIDEO (MP4 / H264)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground pl-0.5 leading-relaxed">
                <Info className="size-3 inline mr-1 text-gold" />
                Images are optimized and resized to WebP automatically. Videos will transcode to
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
