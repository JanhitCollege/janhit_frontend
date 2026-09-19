export interface NewsNotice {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  type: "news" | "notice";
  visibility: "group" | "campus";
  status: "draft" | "published" | "archived";
  priority: "high" | "medium" | "low";
  featured: "yes" | "no";
  campusIds: string[]; // Campus IDs mapped when visibility = "campus"
  publishDate: string;
  expiryDate?: string;
  thumbnail?: string;
  attachmentName?: string;
  attachmentSize?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  viewCount: number;
  downloadCount: number;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
}

export const defaultNewsNotices: NewsNotice[] = [];

const LOCAL_STORAGE_KEY = "janhit_news_notices";

export const getStoredNewsNotices = (): NewsNotice[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const saveNewsNotices = (records: NewsNotice[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }
};
