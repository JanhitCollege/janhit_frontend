import { apiRequest } from "./api";

export interface CampusRelation {
  campus: {
    id: string;
    name: string;
    slug: string;
    code?: string;
  };
}

export interface NewsNoticeItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  type: "NEWS" | "NOTICE";
  visibility: "GROUP" | "CAMPUS";
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured: boolean;
  publishDate: string;
  expiryDate?: string | null;
  thumbnail?: string | null;
  attachment?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  viewCount: number;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | { id?: string; name?: string };
  campuses?: CampusRelation[];
}

export interface NewsNoticePagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NewsNoticesResponse {
  newsNotices: NewsNoticeItem[];
  pagination: NewsNoticePagination;
}

const DEFAULT_CAMPUS_SLUG = "janhit-college-of-law";

export const newsNoticeService = {
  /**
   * Get campus-specific news & notices (includes GROUP + CAMPUS notices)
   */
  async getCampusNews(params?: {
    campusSlug?: string;
    page?: number;
    limit?: number;
    type?: "NEWS" | "NOTICE" | "ALL";
    search?: string;
  }): Promise<NewsNoticesResponse> {
    const campusSlug = params?.campusSlug || DEFAULT_CAMPUS_SLUG;
    const queryParts: string[] = [];

    if (params?.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params?.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params?.type && params.type !== "ALL") queryParts.push(`type=${params.type}`);
    if (params?.search && params.search.trim()) queryParts.push(`search=${encodeURIComponent(params.search.trim())}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    try {
      const response = await apiRequest<{
        success: boolean;
        message: string;
        data: {
          newsNotices: NewsNoticeItem[];
          pagination: NewsNoticePagination;
        };
      }>(`/news-notices/public/campus/${encodeURIComponent(campusSlug)}${queryStr}`, {
        method: "GET",
      });

      if (response && response.success) {
        return response.data;
      }
      throw new Error(response?.message || "Failed to retrieve campus news & notices.");
    } catch (err: any) {
      // Fallback to group public news if campus not found
      if (String(err?.message || "").includes("404")) {
        const fallbackRes = await apiRequest<{
          success: boolean;
          message: string;
          data: {
            newsNotices: NewsNoticeItem[];
            pagination: NewsNoticePagination;
          };
        }>(`/news-notices/public/group${queryStr}`, {
          method: "GET",
        });
        if (fallbackRes && fallbackRes.success) {
          return fallbackRes.data;
        }
      }
      throw err;
    }
  },

  /**
   * Get group-wide public news & notices
   */
  async getGroupNews(params?: {
    page?: number;
    limit?: number;
  }): Promise<NewsNoticesResponse> {
    const queryParts: string[] = [];
    if (params?.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params?.limit !== undefined) queryParts.push(`limit=${params.limit}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        newsNotices: NewsNoticeItem[];
        pagination: NewsNoticePagination;
      };
    }>(`/news-notices/public/group${queryStr}`, {
      method: "GET",
    });

    if (response && response.success) {
      return response.data;
    }
    throw new Error(response?.message || "Failed to retrieve group news.");
  },

  /**
   * Get detailed news/notice by unique slug (atomically increments view count)
   */
  async getNewsNoticeDetails(slug: string): Promise<NewsNoticeItem> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        newsNotice: NewsNoticeItem;
      };
    }>(`/news-notices/public/details/${encodeURIComponent(slug)}`, {
      method: "GET",
    });

    if (response && response.success) {
      return response.data.newsNotice;
    }
    throw new Error(response?.message || "Failed to retrieve announcement details.");
  },

  /**
   * Get latest news with fallback
   */
  async getLatestNews(campusSlug = DEFAULT_CAMPUS_SLUG, limit = 5): Promise<NewsNoticeItem[]> {
    try {
      const response = await apiRequest<{
        success: boolean;
        message: string;
        data: {
          newsNotices?: NewsNoticeItem[];
        } | NewsNoticeItem[];
      }>(`/news-notices/public/latest/news?campusSlug=${encodeURIComponent(campusSlug)}&limit=${limit}`, {
        method: "GET",
      });

      if (response && response.success) {
        if (Array.isArray(response.data)) return response.data;
        if (response.data?.newsNotices) return response.data.newsNotices;
      }
    } catch (_) {
      // Fallback to campus endpoint with type=NEWS
      try {
        const fallback = await this.getCampusNews({ campusSlug, type: "NEWS", limit });
        return fallback.newsNotices || [];
      } catch (err) {
        // Fallback silently
      }
    }
    return [];
  },

  /**
   * Get latest notices with fallback
   */
  async getLatestNotices(campusSlug = DEFAULT_CAMPUS_SLUG, limit = 5): Promise<NewsNoticeItem[]> {
    try {
      const response = await apiRequest<{
        success: boolean;
        message: string;
        data: {
          newsNotices?: NewsNoticeItem[];
        } | NewsNoticeItem[];
      }>(`/news-notices/public/latest/notices?campusSlug=${encodeURIComponent(campusSlug)}&limit=${limit}`, {
        method: "GET",
      });

      if (response && response.success) {
        if (Array.isArray(response.data)) return response.data;
        if (response.data?.newsNotices) return response.data.newsNotices;
      }
    } catch (_) {
      // Fallback to campus endpoint with type=NOTICE
      try {
        const fallback = await this.getCampusNews({ campusSlug, type: "NOTICE", limit });
        return fallback.newsNotices || [];
      } catch (err) {
        // Fallback silently
      }
    }
    return [];
  },

  /**
   * Get featured news with fallback
   */
  async getFeaturedNews(campusSlug = DEFAULT_CAMPUS_SLUG): Promise<NewsNoticeItem[]> {
    try {
      const response = await apiRequest<{
        success: boolean;
        message: string;
        data: {
          newsNotices?: NewsNoticeItem[];
        } | NewsNoticeItem[];
      }>(`/news-notices/public/featured/news?campusSlug=${encodeURIComponent(campusSlug)}`, {
        method: "GET",
      });

      if (response && response.success) {
        if (Array.isArray(response.data)) return response.data;
        if (response.data?.newsNotices) return response.data.newsNotices;
      }
    } catch (_) {
      try {
        const fallback = await this.getCampusNews({ campusSlug, type: "NEWS" });
        return (fallback.newsNotices || []).filter((n) => n.featured);
      } catch (err) {
        // Fallback silently
      }
    }
    return [];
  },

  /**
   * Get featured notices with fallback
   */
  async getFeaturedNotices(campusSlug = DEFAULT_CAMPUS_SLUG): Promise<NewsNoticeItem[]> {
    try {
      const response = await apiRequest<{
        success: boolean;
        message: string;
        data: {
          newsNotices?: NewsNoticeItem[];
        } | NewsNoticeItem[];
      }>(`/news-notices/public/featured/notices?campusSlug=${encodeURIComponent(campusSlug)}`, {
        method: "GET",
      });

      if (response && response.success) {
        if (Array.isArray(response.data)) return response.data;
        if (response.data?.newsNotices) return response.data.newsNotices;
      }
    } catch (_) {
      try {
        const fallback = await this.getCampusNews({ campusSlug, type: "NOTICE" });
        return (fallback.newsNotices || []).filter((n) => n.featured);
      } catch (err) {
        // Fallback silently
      }
    }
    return [];
  },
};
