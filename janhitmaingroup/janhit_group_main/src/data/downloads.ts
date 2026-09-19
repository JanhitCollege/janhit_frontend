export interface Download {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  campusId: string | null; // null represents "global"
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number; // in bytes
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  campus?: {
    id: string;
    name: string;
    shortName?: string;
    code?: string;
    slug?: string;
    [key: string]: any;
  } | null;
}

export const ALLOWED_CATEGORIES = [
  "ADMISSION_FORM",
  "BROCHURE",
  "FEE_STRUCTURE",
  "PROSPECTUS",
  "ACADEMIC_CALENDAR",
  "SYLLABUS",
  "EXAM_SCHEDULE",
  "NOTICE",
  "HOSTEL_FORM",
  "SCHOLARSHIP_FORM",
  "PLACEMENT_BROCHURE",
  "MAGAZINE",
  "OTHER",
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  ADMISSION_FORM: "Admission Form",
  BROCHURE: "Brochure",
  FEE_STRUCTURE: "Fee Structure",
  PROSPECTUS: "Prospectus",
  ACADEMIC_CALENDAR: "Academic Calendar",
  SYLLABUS: "Syllabus",
  EXAM_SCHEDULE: "Exam Schedule",
  NOTICE: "Notice",
  HOSTEL_FORM: "Hostel Form",
  SCHOLARSHIP_FORM: "Scholarship Form",
  PLACEMENT_BROCHURE: "Placement Brochure",
  MAGAZINE: "Magazine",
  OTHER: "Other",
};

export const defaultDownloads: Download[] = [];

const LOCAL_STORAGE_KEY = "janhit_downloads";

export const getStoredDownloads = (): Download[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const saveDownloads = (downloads: Download[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(downloads));
  }
};

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const generateUniqueSlug = (title: string, excludeId: string | null = null): string => {
  const baseSlug = slugify(title);
  let uniqueSlug = baseSlug;
  let counter = 1;
  const downloads = getStoredDownloads();

  while (true) {
    const collision = downloads.find(
      (d) => d.slug === uniqueSlug && (excludeId ? d.id !== excludeId : true),
    );
    if (!collision) {
      return uniqueSlug;
    }
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
};
