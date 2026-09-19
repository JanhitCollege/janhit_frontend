import { apiRequest } from "../../services/api";
import { NewsNotice } from "../../data/newsNotices";

export function mapBackendToFrontendNewsNotice(item: any): NewsNotice {
  if (!item) return {} as NewsNotice;

  const campusIds: string[] = Array.isArray(item.campuses)
    ? item.campuses
        .map((c: any) => (typeof c === "string" ? c : c.campusId || c.campus?.id || c.id))
        .filter(Boolean)
    : [];

  return {
    id: String(item.id),
    title: item.title || "",
    slug: item.slug || "",
    excerpt: item.excerpt || "",
    description: item.description || "",
    type: (item.type || "").toLowerCase() === "notice" ? "notice" : "news",
    visibility: (item.visibility || "").toLowerCase() === "campus" ? "campus" : "group",
    status: (item.status || "DRAFT").toLowerCase() as "draft" | "published" | "archived",
    priority: (item.priority || "MEDIUM").toLowerCase() as "high" | "medium" | "low",
    featured: item.featured === true || item.featured === "yes" ? "yes" : "no",
    campusIds,
    publishDate: item.publishDate || new Date().toISOString(),
    expiryDate: item.expiryDate || undefined,
    thumbnail: item.thumbnail || undefined,
    attachmentName: item.attachmentName || (item.attachment ? String(item.attachment).split("/").pop() : undefined),
    attachmentSize: item.attachmentSize || undefined,
    metaTitle: item.metaTitle || undefined,
    metaDescription: item.metaDescription || undefined,
    metaKeywords: item.metaKeywords || undefined,
    viewCount: Number(item.viewCount) || 0,
    downloadCount: Number(item.downloadCount) || 0,
    createdDate: item.createdAt || item.createdDate || new Date().toISOString(),
    updatedDate: item.updatedAt || item.updatedDate || new Date().toISOString(),
    createdBy:
      typeof item.createdBy === "object" && item.createdBy !== null
        ? item.createdBy.name || item.createdBy.id
        : item.createdBy || "Administrator",
  };
}

export function ensureValidImageExtension(thumbnail?: string | null): string | null {
  if (!thumbnail || typeof thumbnail !== "string" || thumbnail.trim() === "") {
    return null;
  }

  const str = thumbnail.trim();
  const allowed = [".jpg", ".png", ".webp"];
  const lastDot = str.lastIndexOf(".");
  if (lastDot !== -1) {
    const ext = str.slice(lastDot).toLowerCase();
    if (allowed.includes(ext)) {
      return str;
    }
  }

  let targetExt = ".png";
  if (str.startsWith("data:image/jpeg") || str.startsWith("data:image/jpg")) {
    targetExt = ".jpg";
  } else if (str.startsWith("data:image/webp")) {
    targetExt = ".webp";
  } else if (str.startsWith("data:image/png")) {
    targetExt = ".png";
  }

  return `${str}#thumbnail${targetExt}`;
}

export function ensureValidAttachmentExtension(attachment?: string | null): string | null {
  if (!attachment || typeof attachment !== "string" || attachment.trim() === "") {
    return null;
  }

  const str = attachment.trim();
  const allowed = [".pdf", ".doc", ".docx"];
  const lastDot = str.lastIndexOf(".");
  if (lastDot !== -1) {
    const ext = str.slice(lastDot).toLowerCase();
    if (allowed.includes(ext)) {
      return str;
    }
  }

  return `${str}#attachment.pdf`;
}

export function mapFrontendToBackendNewsNotice(data: Partial<NewsNotice>) {
  const payload: any = {
    title: data.title,
    excerpt: data.excerpt,
    description: data.description,
    type: data.type ? data.type.toUpperCase() : "NEWS",
    visibility: data.visibility ? data.visibility.toUpperCase() : "GROUP",
    priority: data.priority ? data.priority.toUpperCase() : "MEDIUM",
    status: data.status ? data.status.toUpperCase() : "DRAFT",
    featured: (data.featured as any) === "yes" || (data.featured as any) === true,
    publishDate: data.publishDate,
    expiryDate: data.expiryDate ? data.expiryDate : null,
    metaTitle: data.metaTitle || null,
    metaDescription: data.metaDescription || null,
    metaKeywords: data.metaKeywords || null,
  };

  if ((data.visibility as any) === "campus" || (data.visibility as any) === "CAMPUS") {
    payload.campuses = data.campusIds || [];
  }

  if (data.thumbnail) {
    payload.thumbnail = ensureValidImageExtension(data.thumbnail);
  }

  if (data.attachmentName || (data as any).attachment) {
    payload.attachment = ensureValidAttachmentExtension(data.attachmentName || (data as any).attachment);
  }

  return payload;
}

export interface NewsNoticesAdminResponse {
  newsNotices: NewsNotice[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const newsNoticeService = {
  /**
   * Get all news and notices (Admin with pagination, search, filters, sorting)
   */
  async getAllNewsNoticesAdmin(params: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    visibility?: string;
    status?: string;
    featured?: string | boolean;
    priority?: string;
    campus?: string;
    publishDate?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<NewsNoticesAdminResponse> {
    const queryParts: string[] = [];
    if (params.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    if (params.type && params.type !== "all") queryParts.push(`type=${params.type.toUpperCase()}`);
    if (params.visibility && params.visibility !== "all")
      queryParts.push(`visibility=${params.visibility.toUpperCase()}`);
    if (params.status && params.status !== "all") queryParts.push(`status=${params.status.toUpperCase()}`);
    if (params.featured && params.featured !== "all")
      queryParts.push(
        `featured=${params.featured === "yes" || params.featured === "true" || params.featured === true}`
      );
    if (params.priority && params.priority !== "all")
      queryParts.push(`priority=${params.priority.toUpperCase()}`);
    if (params.campus && params.campus !== "all") queryParts.push(`campus=${params.campus}`);
    if (params.publishDate) queryParts.push(`publishDate=${encodeURIComponent(params.publishDate)}`);
    if (params.sortBy) {
      let backendSortBy = params.sortBy;
      if (params.sortBy === "createdDate") backendSortBy = "createdAt";
      if (params.sortBy === "updatedDate") backendSortBy = "updatedAt";
      queryParts.push(`sortBy=${backendSortBy}`);
    }
    if (params.sortOrder) queryParts.push(`sortOrder=${params.sortOrder}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        newsNotices: any[];
        pagination: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      };
    }>(`/news-notices/admin${queryStr}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve news/notices.");
    }

    return {
      newsNotices: (response.data.newsNotices || []).map(mapBackendToFrontendNewsNotice),
      pagination: response.data.pagination || {
        total: (response.data.newsNotices || []).length,
        page: params.page || 1,
        limit: params.limit || 10,
        totalPages: 1,
      },
    };
  },

  /**
   * Get news/notice details by ID (Admin)
   */
  async getNewsNoticeById(id: string): Promise<NewsNotice> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        newsNotice: any;
      };
    }>(`/news-notices/admin/${id}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve news/notice.");
    }

    return mapBackendToFrontendNewsNotice(response.data.newsNotice);
  },

  /**
   * Create a new news/notice (Admin)
   */
  async createNewsNotice(data: Partial<NewsNotice>): Promise<NewsNotice> {
    const payload = mapFrontendToBackendNewsNotice(data);

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        newsNotice: any;
      };
    }>("/news-notices", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to create news/notice.");
    }

    return mapBackendToFrontendNewsNotice(response.data.newsNotice);
  },

  /**
   * Update a news/notice by ID (Admin)
   */
  async updateNewsNotice(id: string, data: Partial<NewsNotice>): Promise<NewsNotice> {
    const payload = mapFrontendToBackendNewsNotice(data);

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        newsNotice: any;
      };
    }>(`/news-notices/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update news/notice.");
    }

    return mapBackendToFrontendNewsNotice(response.data.newsNotice);
  },

  /**
   * Delete a news/notice by ID (Admin)
   */
  async deleteNewsNotice(id: string): Promise<boolean> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: { id: string } | null;
    }>(`/news-notices/${id}`, {
      method: "DELETE",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to delete news/notice.");
    }

    return true;
  },
};
