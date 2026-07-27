import { getStoredCampuses } from "./campuses";

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

export const defaultDownloads: Download[] = [
  {
    id: "dl-1",
    title: "MBA Academic Calendar 2026-27",
    slug: "mba-academic-calendar-2026-27",
    description:
      "Detailed academic calendar for MBA program, including term dates, exam schedules, and holiday list.",
    category: "ACADEMIC_CALENDAR",
    campusId: "4",
    fileUrl: "/uploads/downloads/mba-academic-calendar-2026.pdf",
    fileName: "mba_academic_calendar_2026.pdf",
    fileType: "application/pdf",
    fileSize: 1258291, // ~1.2 MB
    isActive: true,
    createdAt: "2026-06-01T10:00:00Z",
    updatedAt: "2026-06-01T10:00:00Z",
  },
  {
    id: "dl-2",
    title: "Global Prospectus 2026",
    slug: "global-prospectus-2026",
    description:
      "Comprehensive prospectus covering all campuses, courses offered, fee structures, and campus amenities.",
    category: "PROSPECTUS",
    campusId: null, // Global
    fileUrl: "/uploads/downloads/global_prospectus_2026.pdf",
    fileName: "global_prospectus_2026.pdf",
    fileType: "application/pdf",
    fileSize: 15728640, // 15 MB
    isActive: true,
    createdAt: "2026-05-15T09:30:00Z",
    updatedAt: "2026-05-20T11:45:00Z",
  },
  {
    id: "dl-3",
    title: "B.Tech Computer Science Syllabus",
    slug: "btech-computer-science-syllabus",
    description: "Full curriculum outline and syllabus structure for all semesters of B.Tech CSE.",
    category: "SYLLABUS",
    campusId: "1",
    fileUrl: "/uploads/downloads/btech_cse_syllabus.docx",
    fileName: "btech_cse_syllabus.docx",
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    fileSize: 450560, // 440 KB
    isActive: true,
    createdAt: "2026-07-02T14:15:00Z",
    updatedAt: "2026-07-02T14:15:00Z",
  },
  {
    id: "dl-4",
    title: "Scholarship Scheme Application Form 2026",
    slug: "scholarship-scheme-application-form-2026",
    description:
      "Application form for Merit-cum-Means and Sports scholarship schemes running in current academic year.",
    category: "SCHOLARSHIP_FORM",
    campusId: null, // Global
    fileUrl: "/uploads/downloads/scholarship_form_2026.pdf",
    fileName: "scholarship_form_2026.pdf",
    fileType: "application/pdf",
    fileSize: 838860, // 820 KB
    isActive: false,
    createdAt: "2026-07-08T08:00:00Z",
    updatedAt: "2026-07-08T08:00:00Z",
  },
  {
    id: "dl-5",
    title: "Placement Brochure - Class of 2026",
    slug: "placement-brochure-class-of-2026",
    description:
      "Detailed profiles of students, recruiters list, placement highlights, and internships overview.",
    category: "PLACEMENT_BROCHURE",
    campusId: "2",
    fileUrl: "/uploads/downloads/placement_brochure_2026.pdf",
    fileName: "placement_brochure_2026.pdf",
    fileType: "application/pdf",
    fileSize: 8388608, // 8 MB
    isActive: true,
    createdAt: "2026-06-25T16:00:00Z",
    updatedAt: "2026-06-25T16:00:00Z",
  },
];

const LOCAL_STORAGE_KEY = "janhit_downloads";

export const getStoredDownloads = (): Download[] => {
  if (typeof window === "undefined") return defaultDownloads;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultDownloads));
    return defaultDownloads;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultDownloads;
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
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars (except -)
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
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
