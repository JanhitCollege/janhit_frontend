import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  X,
  Upload,
  Info,
  Bold,
  Italic,
  Underline,
  List,
  Link as LinkIcon,
  FileText,
} from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { getStoredCampuses } from "@/data/campuses";
import { NewsNotice } from "@/data/newsNotices";

interface NewsNoticeFormProps {
  initialData?: NewsNotice;
  onSubmit: (data: {
    title: string;
    slug: string;
    excerpt: string;
    description: string;
    type: "news" | "notice";
    visibility: "group" | "campus";
    priority: "high" | "medium" | "low";
    status: "draft" | "published" | "archived";
    featured: "yes" | "no";
    campusIds: string[];
    publishDate: string;
    expiryDate?: string;
    thumbnail?: string;
    attachmentName?: string;
    attachmentSize?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    createdBy: string;
  }) => void;
  onCancel: () => void;
  submitButtonText: string;
}

export const NewsNoticeForm: React.FC<NewsNoticeFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText,
}) => {
  // Load campuses from store
  const campusesList = getStoredCampuses().filter((c) => c.status === "active");

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [type, setType] = useState<"news" | "notice">(initialData?.type || "news");
  const [visibility, setVisibility] = useState<"group" | "campus">(
    initialData?.visibility || "group",
  );
  const [priority, setPriority] = useState<"high" | "medium" | "low">(
    initialData?.priority || "medium",
  );
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    initialData?.status || "draft",
  );
  const [featured, setFeatured] = useState<"yes" | "no">(initialData?.featured || "no");
  const [campusIds, setCampusIds] = useState<string[]>(initialData?.campusIds || []);

  // Convert ISO to local datetime string for input
  const getLocalDateTime = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      // Format to YYYY-MM-DDThh:mm
      const pad = (n: number) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
      return "";
    }
  };

  const [publishDate, setPublishDate] = useState(
    getLocalDateTime(initialData?.publishDate) || getLocalDateTime(new Date().toISOString()),
  );
  const [expiryDate, setExpiryDate] = useState(getLocalDateTime(initialData?.expiryDate) || "");

  // Media upload states
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "");
  const [attachmentName, setAttachmentName] = useState(initialData?.attachmentName || "");
  const [attachmentSize, setAttachmentSize] = useState(initialData?.attachmentSize || "");

  // SEO states
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "");
  const [metaKeywords, setMetaKeywords] = useState(initialData?.metaKeywords || "");

  // Error & Touch validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug and meta tags on title change
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
      if (!isTouched.metaTitle) {
        setMetaTitle(title.trim().slice(0, 60));
      }
    }
  }, [title, initialData, isTouched.slug, isTouched.metaTitle]);

  // Validation function
  const validateField = (fieldName: string, value: any): string => {
    if (fieldName === "title" && !String(value).trim()) {
      return "Title is required.";
    }
    if (fieldName === "excerpt" && !String(value).trim()) {
      return "Excerpt is required.";
    }
    if (fieldName === "description" && !String(value).trim()) {
      return "Description is required.";
    }
    if (fieldName === "slug") {
      if (!String(value).trim()) return "Slug is required.";
      if (!/^[a-z0-9-]+$/.test(value)) {
        return "Slug can only contain lowercase letters, numbers, and hyphens.";
      }
    }
    if (fieldName === "campusIds" && visibility === "campus" && (!value || value.length === 0)) {
      return "Please select at least one campus.";
    }
    if (fieldName === "publishDate" && !value) {
      return "Publish Date is required.";
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

  // Thumbnail Upload
  const handleThumbnailClick = () => {
    thumbnailInputRef.current?.click();
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Attachment Upload
  const handleAttachmentClick = () => {
    attachmentInputRef.current?.click();
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
      // Format file size
      const sizeInMB = file.size / (1024 * 1024);
      setAttachmentSize(
        sizeInMB < 0.1 ? `${Math.round(file.size / 1024)} KB` : `${sizeInMB.toFixed(1)} MB`,
      );
    }
  };

  const handleRemoveAttachment = () => {
    setAttachmentName("");
    setAttachmentSize("");
    if (attachmentInputRef.current) {
      attachmentInputRef.current.value = "";
    }
  };

  // Campus Selection toggle
  const handleCampusToggle = (campusId: string) => {
    const updated = campusIds.includes(campusId)
      ? campusIds.filter((id) => id !== campusId)
      : [...campusIds, campusId];

    handleFieldChange("campusIds", updated, setCampusIds);
  };

  const handleSubmit = (e: React.FormEvent, customStatus?: typeof status) => {
    e.preventDefault();

    const targetStatus = customStatus || status;

    // Validate fields
    const newErrors = {
      title: validateField("title", title),
      excerpt: validateField("excerpt", excerpt),
      description: validateField("description", description),
      slug: validateField("slug", slug),
      publishDate: validateField("publishDate", publishDate),
      campusIds: validateField("campusIds", campusIds),
    };

    setErrors(newErrors);
    setIsTouched({
      title: true,
      excerpt: true,
      description: true,
      slug: true,
      publishDate: true,
      campusIds: true,
    });

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) {
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors).find(
        (key) => newErrors[key as keyof typeof newErrors] !== "",
      );
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
      return;
    }

    onSubmit({
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      description: description.trim(),
      type,
      visibility,
      priority,
      status: targetStatus,
      featured,
      campusIds: visibility === "campus" ? campusIds : [],
      publishDate: new Date(publishDate).toISOString(),
      expiryDate: expiryDate ? new Date(expiryDate).toISOString() : undefined,
      thumbnail: thumbnail || undefined,
      attachmentName: attachmentName || undefined,
      attachmentSize: attachmentSize || undefined,
      metaTitle: metaTitle.trim() || undefined,
      metaDescription: metaDescription.trim() || undefined,
      metaKeywords: metaKeywords.trim() || undefined,
      createdBy: initialData?.createdBy || "Administrator",
    });
  };

  // Rich Text Editor Mock functions
  const insertMockTag = (tagOpen: string, tagClose: string) => {
    const textEl = document.getElementById("description") as HTMLTextAreaElement;
    if (!textEl) return;

    const start = textEl.selectionStart;
    const end = textEl.selectionEnd;
    const text = textEl.value;
    const selected = text.substring(start, end);
    const replacement = tagOpen + selected + tagClose;

    const newValue = text.substring(0, start) + replacement + text.substring(end);
    setDescription(newValue);

    setTimeout(() => {
      textEl.focus();
      textEl.setSelectionRange(start + tagOpen.length, start + tagOpen.length + selected.length);
    }, 50);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans wide) - Core Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Basic Information */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                1
              </span>
              Content Information
            </h2>

            {/* Title */}
            <div className="space-y-1.5">
              <Label
                htmlFor="title"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter title here..."
                value={title}
                onChange={(e) => handleFieldChange("title", e.target.value, setTitle)}
                onBlur={(e) => handleBlur("title", e.target.value)}
                className={`h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all ${
                  errors.title ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
              />
              {errors.title && (
                <p className="text-destructive text-xs mt-1 pl-0.5">{errors.title}</p>
              )}
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5">
              <Label
                htmlFor="excerpt"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Excerpt (Brief summary) <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="excerpt"
                rows={2}
                placeholder="Provide a short, compelling teaser summary..."
                value={excerpt}
                onChange={(e) => handleFieldChange("excerpt", e.target.value, setExcerpt)}
                onBlur={(e) => handleBlur("excerpt", e.target.value)}
                className={`rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all resize-none text-sm p-3 ${
                  errors.excerpt ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
              />
              {errors.excerpt && (
                <p className="text-destructive text-xs mt-1 pl-0.5">{errors.excerpt}</p>
              )}
            </div>

            {/* Rich Text Editor Mock UI */}
            <div className="space-y-1.5">
              <Label
                htmlFor="description"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Description <span className="text-destructive">*</span>
              </Label>

              <div
                className={`rounded-xl border bg-background/30 overflow-hidden flex flex-col ${
                  errors.description ? "border-destructive" : "border-border"
                }`}
              >
                {/* Formatting Toolbar */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-muted/40 border-b border-border/80">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded hover:bg-accent text-muted-foreground hover:text-foreground"
                    title="Bold"
                    onClick={() => insertMockTag("<strong>", "</strong>")}
                  >
                    <Bold className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded hover:bg-accent text-muted-foreground hover:text-foreground"
                    title="Italic"
                    onClick={() => insertMockTag("<em>", "</em>")}
                  >
                    <Italic className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded hover:bg-accent text-muted-foreground hover:text-foreground"
                    title="Underline"
                    onClick={() => insertMockTag("<u>", "</u>")}
                  >
                    <Underline className="size-4" />
                  </Button>
                  <span className="h-5 w-px bg-border/80 mx-1" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded hover:bg-accent text-muted-foreground hover:text-foreground"
                    title="Heading"
                    onClick={() => insertMockTag("<h3>", "</h3>")}
                  >
                    <span className="font-display font-bold text-xs">H3</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded hover:bg-accent text-muted-foreground hover:text-foreground"
                    title="Paragraph"
                    onClick={() => insertMockTag("<p>", "</p>")}
                  >
                    <span className="font-sans font-medium text-xs">P</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded hover:bg-accent text-muted-foreground hover:text-foreground"
                    title="List Item"
                    onClick={() => insertMockTag("<li>", "</li>")}
                  >
                    <List className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded hover:bg-accent text-muted-foreground hover:text-foreground"
                    title="Insert Link"
                    onClick={() => insertMockTag('<a href="#">', "</a>")}
                  >
                    <LinkIcon className="size-4" />
                  </Button>
                </div>

                <Textarea
                  id="description"
                  rows={8}
                  placeholder="Write the full details here (supports HTML formatting)..."
                  value={description}
                  onChange={(e) => handleFieldChange("description", e.target.value, setDescription)}
                  onBlur={(e) => handleBlur("description", e.target.value)}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none bg-transparent text-sm leading-relaxed p-4 min-h-[220px]"
                />
              </div>
              {errors.description && (
                <p className="text-destructive text-xs mt-1 pl-0.5">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Section: Media Uploads */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                2
              </span>
              Media Attachments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thumbnail upload */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5 block">
                  Featured Thumbnail
                </Label>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background/40 border border-dashed border-border min-h-[120px]">
                  <div className="size-20 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt="Thumbnail Preview"
                        className="size-full object-cover"
                      />
                    ) : (
                      <Upload className="size-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-foreground block">
                      Upload thumbnail image
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      PNG, JPG up to 1MB.
                    </span>
                    <input
                      type="file"
                      ref={thumbnailInputRef}
                      onChange={handleThumbnailChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleThumbnailClick}
                        className="h-7 rounded-lg text-[10px] font-semibold px-2.5 bg-background border-border"
                      >
                        Choose File
                      </Button>
                      {thumbnail && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setThumbnail("")}
                          className="h-7 rounded-lg text-[10px] font-semibold px-2 text-destructive hover:bg-destructive/10"
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Attachment upload */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5 block">
                  Document Attachment (PDF)
                </Label>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background/40 border border-dashed border-border min-h-[120px]">
                  <div className="size-20 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    {attachmentName ? (
                      <FileText className="size-8 text-primary" />
                    ) : (
                      <Upload className="size-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    {attachmentName ? (
                      <>
                        <span className="text-xs font-semibold text-foreground block truncate">
                          {attachmentName}
                        </span>
                        <span className="text-[10px] text-muted-foreground block mb-1">
                          {attachmentSize}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleRemoveAttachment}
                          className="h-7 rounded-lg text-[10px] font-semibold px-2.5 text-destructive hover:bg-destructive/10 p-0"
                        >
                          Remove File
                        </Button>
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-medium text-foreground block">
                          Upload notice document
                        </span>
                        <span className="text-[10px] text-muted-foreground block">
                          PDF, DOCX up to 5MB.
                        </span>
                        <input
                          type="file"
                          ref={attachmentInputRef}
                          onChange={handleAttachmentChange}
                          accept=".pdf,.docx,.doc"
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAttachmentClick}
                          className="h-7 rounded-lg text-[10px] font-semibold px-2.5 bg-background border-border mt-1"
                        >
                          Select Document
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: SEO */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                3
              </span>
              SEO Settings
            </h2>

            <div className="space-y-4">
              {/* Meta Title */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="metaTitle"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5 flex justify-between"
                >
                  <span>Meta Title</span>
                  <span className="text-[10px] text-muted-foreground">
                    {metaTitle.length}/60 chars
                  </span>
                </Label>
                <Input
                  id="metaTitle"
                  type="text"
                  placeholder="Search engine title..."
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value.slice(0, 60))}
                  className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 transition-all"
                />
              </div>

              {/* Meta Description */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="metaDescription"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5 flex justify-between"
                >
                  <span>Meta Description</span>
                  <span className="text-[10px] text-muted-foreground">
                    {metaDescription.length}/160 chars
                  </span>
                </Label>
                <Textarea
                  id="metaDescription"
                  rows={2}
                  placeholder="Enter meta description for search snippets..."
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
                  className="rounded-xl bg-background/50 border-border hover:border-gold/40 transition-all resize-none text-sm p-3"
                />
              </div>

              {/* Meta Keywords */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="metaKeywords"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
                >
                  Meta Keywords
                </Label>
                <Input
                  id="metaKeywords"
                  type="text"
                  placeholder="e.g. notices, exam, janhit law (comma separated)"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 span wide) - Meta and Classifications */}
        <div className="space-y-6">
          {/* Section: Publishing Parameters */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                4
              </span>
              Publishing Options
            </h2>

            {/* Type selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5">
                Type
              </Label>
              <Select value={type} onValueChange={(val: any) => setType(val)}>
                <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="notice">Notice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Visibility selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5">
                Visibility
              </Label>
              <Select value={visibility} onValueChange={(val: any) => setVisibility(val)}>
                <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="group">Group-wide (All Campuses)</SelectItem>
                  <SelectItem value="campus">Campus Mapping (Select Campuses)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5">
                Priority
              </Label>
              <Select value={priority} onValueChange={(val: any) => setPriority(val)}>
                <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5">
                Default Status
              </Label>
              <Select value={status} onValueChange={(val: any) => setStatus(val)}>
                <SelectTrigger className="h-11 rounded-xl bg-background/50 border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Featured Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-border/60">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-foreground">Featured Post</span>
                <span className="text-[10px] text-muted-foreground block">
                  Highlight on main page
                </span>
              </div>
              <Switch
                checked={featured === "yes"}
                onCheckedChange={(checked) => setFeatured(checked ? "yes" : "no")}
              />
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
                  setSlug(e.target.value.toLowerCase());
                }}
                onBlur={(e) => handleBlur("slug", e.target.value)}
                className={`h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 transition-all font-mono text-xs ${
                  errors.slug ? "border-destructive" : ""
                }`}
              />
              {errors.slug && <p className="text-destructive text-xs mt-1 pl-0.5">{errors.slug}</p>}
            </div>
          </div>

          {/* Section: Dates */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                5
              </span>
              Scheduling
            </h2>

            {/* Publish Date */}
            <div className="space-y-1.5">
              <Label
                htmlFor="publishDate"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Publish Date & Time <span className="text-destructive">*</span>
              </Label>
              <Input
                id="publishDate"
                type="datetime-local"
                value={publishDate}
                onChange={(e) => handleFieldChange("publishDate", e.target.value, setPublishDate)}
                onBlur={(e) => handleBlur("publishDate", e.target.value)}
                className={`h-11 rounded-xl bg-background/50 border-border text-sm ${
                  errors.publishDate ? "border-destructive" : ""
                }`}
              />
              {errors.publishDate && (
                <p className="text-destructive text-xs mt-1 pl-0.5">{errors.publishDate}</p>
              )}
            </div>

            {/* Expiry Date */}
            <div className="space-y-1.5">
              <Label
                htmlFor="expiryDate"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Expiry Date & Time (Optional)
              </Label>
              <Input
                id="expiryDate"
                type="datetime-local"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="h-11 rounded-xl bg-background/50 border-border text-sm"
              />
            </div>
          </div>

          {/* Section: Campus Mapping (Conditional) */}
          {visibility === "campus" && (
            <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4 animate-in fade-in duration-300">
              <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
                <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                  6
                </span>
                Campus Mapping
              </h2>

              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {campusesList.map((campus) => (
                  <div
                    key={campus.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/40 transition"
                  >
                    <Checkbox
                      id={`campus-${campus.id}`}
                      checked={campusIds.includes(campus.id)}
                      onCheckedChange={() => handleCampusToggle(campus.id)}
                      className="rounded"
                    />
                    <Label
                      htmlFor={`campus-${campus.id}`}
                      className="text-xs font-medium text-foreground cursor-pointer flex-1 select-none"
                    >
                      {campus.name}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.campusIds && (
                <p className="text-destructive text-xs mt-1 pl-0.5">{errors.campusIds}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-background/80 backdrop-blur-md border-t py-4 shadow-elegant">
        <div className="container-tight flex items-center justify-between gap-3 px-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="rounded-xl border-border font-semibold px-6 hover:bg-accent text-sm h-11"
          >
            Cancel
          </Button>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={(e) => handleSubmit(e, "draft")}
              className="rounded-xl border-border font-semibold px-5 hover:bg-accent text-sm h-11"
            >
              Save Draft
            </Button>
            <Button
              type="button"
              onClick={(e) => handleSubmit(e, "published")}
              className="rounded-xl bg-primary text-primary-foreground font-semibold px-7 hover:bg-primary/95 text-sm h-11 shadow-sm"
            >
              {submitButtonText}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
