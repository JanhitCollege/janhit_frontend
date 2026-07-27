import classroomImg from "@/assets/gallery-classroom.jpg";
import culturalImg from "@/assets/gallery-cultural.jpg";
import graduationImg from "@/assets/gallery-graduation.jpg";
import labImg from "@/assets/gallery-lab.jpg";
import libraryImg from "@/assets/gallery-library.jpg";
import sportsImg from "@/assets/gallery-sports.jpg";

export interface GalleryItem {
  id: string;
  campusId: string; // Target campus UUID, required
  mediaType: "IMAGE" | "VIDEO";
  title: string | null;
  description: string | null;
  category: string | null; // e.g. Academics, Events, Infrastructure, Sports, etc.
  fileUrl: string;
  thumbnail: string | null; // Thumbnail image URL (required for videos, null for images)
  fileName: string;
  mimeType: string;
  fileSize: number; // in bytes
  width: number | null;
  height: number | null;
  duration: number | null; // in seconds, only for videos
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime", // .mov
  "video/x-msvideo", // .avi
  "video/x-matroska", // .mkv
  "video/webm", // .webm
];

export const IMAGE_SIZE_LIMIT = 20 * 1024 * 1024; // 20 MB
export const VIDEO_SIZE_LIMIT = 100 * 1024 * 1024; // 100 MB

export const defaultGalleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    campusId: "1", // Greater Noida
    mediaType: "IMAGE",
    title: "Advanced Science Laboratory",
    description:
      "Students performing physics and chemistry experiments inside our fully equipped laboratory.",
    category: "Academics",
    fileUrl: labImg,
    thumbnail: null,
    fileName: "science_lab_session.jpg",
    mimeType: "image/jpeg",
    fileSize: 1245890,
    width: 1920,
    height: 1080,
    duration: null,
    sortOrder: 1,
    isActive: true,
    createdAt: "2026-06-10T10:00:00Z",
    updatedAt: "2026-06-10T10:00:00Z",
  },
  {
    id: "gal-2",
    campusId: "4", // Law College
    mediaType: "IMAGE",
    title: "Convocation Ceremony Class of 2025",
    description: "Celebrating the graduation of our legal studies students at the main auditorium.",
    category: "Events",
    fileUrl: graduationImg,
    thumbnail: null,
    fileName: "graduation_ceremony.jpg",
    mimeType: "image/jpeg",
    fileSize: 2050800,
    width: 1920,
    height: 1200,
    duration: null,
    sortOrder: 2,
    isActive: true,
    createdAt: "2026-07-01T11:30:00Z",
    updatedAt: "2026-07-01T11:30:00Z",
  },
  {
    id: "gal-3",
    campusId: "1", // Greater Noida
    mediaType: "VIDEO",
    title: "UDAAN 2026 Sports Highlights",
    description:
      "Recap video of the high-energy athletic matches, volleyball, and football finals.",
    category: "Sports",
    fileUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Free public video link
    thumbnail: sportsImg,
    fileName: "udaan_sports_highlights.mp4",
    mimeType: "video/mp4",
    fileSize: 15482910, // ~15.4 MB
    width: 1280,
    height: 720,
    duration: 15,
    sortOrder: 3,
    isActive: true,
    createdAt: "2026-07-11T09:00:00Z",
    updatedAt: "2026-07-11T09:00:00Z",
  },
  {
    id: "gal-4",
    campusId: "2", // Ghaziabad
    mediaType: "IMAGE",
    title: "Smart Classroom Interactive Session",
    description:
      "High school students engaging with digital whiteboards and cooperative learning modules.",
    category: "Academics",
    fileUrl: classroomImg,
    thumbnail: null,
    fileName: "smart_classroom.jpg",
    mimeType: "image/jpeg",
    fileSize: 1450200,
    width: 1920,
    height: 1080,
    duration: null,
    sortOrder: 4,
    isActive: true,
    createdAt: "2026-05-18T14:00:00Z",
    updatedAt: "2026-05-18T14:00:00Z",
  },
  {
    id: "gal-5",
    campusId: "1", // Greater Noida
    mediaType: "VIDEO",
    title: "Annual Cultural Festival - Folk Dance",
    description:
      "Brilliant stage performance by our college dance troupe celebrating regional heritage.",
    category: "Events",
    fileUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail: culturalImg,
    fileName: "folk_dance_performance.mp4",
    mimeType: "video/mp4",
    fileSize: 22890010, // ~22.8 MB
    width: 1280,
    height: 720,
    duration: 60,
    sortOrder: 5,
    isActive: false,
    createdAt: "2026-06-25T15:30:00Z",
    updatedAt: "2026-06-25T15:30:00Z",
  },
  {
    id: "gal-6",
    campusId: "3", // Saharanpur
    mediaType: "IMAGE",
    title: "Main Library Reading Hall",
    description:
      "Quiet study spaces and extensive bookshelves housing over 20,000 journals and volumes.",
    category: "Infrastructure",
    fileUrl: libraryImg,
    thumbnail: null,
    fileName: "campus_library.jpg",
    mimeType: "image/jpeg",
    fileSize: 1890200,
    width: 1920,
    height: 1080,
    duration: null,
    sortOrder: 6,
    isActive: true,
    createdAt: "2026-04-12T08:30:00Z",
    updatedAt: "2026-04-12T08:30:00Z",
  },
];

const LOCAL_STORAGE_KEY = "janhit_gallery";

export const getStoredGallery = (): GalleryItem[] => {
  if (typeof window === "undefined") return defaultGalleryItems;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultGalleryItems));
    return defaultGalleryItems;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultGalleryItems;
  }
};

export const saveGallery = (items: GalleryItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }
};
