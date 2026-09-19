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
