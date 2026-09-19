import { apiRequest } from "./api";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  date?: string;
  campusId?: string;
  mediaType?: "IMAGE" | "VIDEO";
}

export interface GalleryPagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface GalleryResponse {
  items: GalleryItem[];
  pagination: GalleryPagination;
}

export function mapBackendToFrontendGalleryItem(item: any): GalleryItem {
  return {
    id: String(item.id),
    title: item.title || item.fileName || "Gallery Item",
    category: item.category || "Campus & Infrastructure",
    imageUrl: item.fileUrl || item.imageUrl || item.thumbnail || "",
    description: item.description || "",
    date: item.createdAt ? new Date(item.createdAt).toISOString().split("T")[0] : item.date || "",
    campusId: item.campusId || "",
    mediaType: item.mediaType || "IMAGE",
  };
}

export const galleryService = {
  /**
   * Get public gallery items from backend API with filtering & pagination
   */
  async getPublicGallery(params?: {
    campusSlug?: string;
    category?: string;
    search?: string;
    mediaType?: string;
    page?: number;
    limit?: number;
  }): Promise<GalleryResponse> {
    const slug = params?.campusSlug || "janhit-college-of-law";
    const queryParts: string[] = [];
    if (params?.category && params.category !== "All") {
      queryParts.push(`category=${encodeURIComponent(params.category)}`);
    }
    if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    if (params?.mediaType) queryParts.push(`mediaType=${encodeURIComponent(params.mediaType)}`);
    if (params?.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params?.limit !== undefined) queryParts.push(`limit=${params.limit}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    let response: any;
    try {
      response = await apiRequest(`/public/campuses/${slug}/gallery${queryStr}`, { method: "GET" });
    } catch (_) {
      try {
        response = await apiRequest(`/public/gallery${queryStr}`, { method: "GET" });
      } catch (_) {
        response = await apiRequest(`/gallery${queryStr}`, { method: "GET" });
      }
    }

    if (!response || response.success === false) {
      throw new Error(response?.message || "Failed to fetch public gallery.");
    }

    const rawData = response.data || response;
    const rawItems = rawData.gallery || rawData.items || (Array.isArray(rawData) ? rawData : []);
    const items = rawItems.map(mapBackendToFrontendGalleryItem);

    const rawPagination = rawData.pagination || {};
    const totalItems = Number(rawPagination.totalItems || rawPagination.total || items.length);
    const limit = Number(rawPagination.limit || rawPagination.itemsPerPage || params?.limit || 9);
    const totalPages = Number(rawPagination.totalPages || Math.ceil(totalItems / limit) || 1);
    const currentPage = Number(rawPagination.page || rawPagination.currentPage || params?.page || 1);

    return {
      items,
      pagination: {
        totalItems,
        totalPages,
        currentPage,
        itemsPerPage: limit,
        hasNextPage: rawPagination.hasNextPage !== undefined ? rawPagination.hasNextPage : currentPage < totalPages,
        hasPreviousPage: rawPagination.hasPreviousPage !== undefined ? rawPagination.hasPreviousPage : currentPage > 1,
      },
    };
  },
};
