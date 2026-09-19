import { apiRequest } from "../../services/api";
import { GalleryItem } from "../../data/gallery";

export function mapBackendToFrontendGallery(item: any): GalleryItem {
  if (!item) return {} as GalleryItem;

  return {
    id: String(item.id),
    campusId: item.campusId || item.campus?.id || "",
    mediaType: item.mediaType || "IMAGE",
    title: item.title || null,
    description: item.description || null,
    category: item.category || null,
    fileUrl: item.fileUrl || "",
    thumbnail: item.thumbnail || null,
    fileName: item.fileName || "",
    mimeType: item.mimeType || "",
    fileSize: Number(item.fileSize) || 0,
    width: item.width !== null && item.width !== undefined ? Number(item.width) : null,
    height: item.height !== null && item.height !== undefined ? Number(item.height) : null,
    duration: item.duration !== null && item.duration !== undefined ? Number(item.duration) : null,
    sortOrder: Number(item.sortOrder) || 0,
    isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString(),
  };
}

export interface GalleryAdminResponse {
  gallery: GalleryItem[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const galleryService = {
  /**
   * Get gallery items list (Admin)
   */
  async getGalleryList(params: {
    page?: number;
    limit?: number;
    search?: string;
    campusId?: string;
    category?: string;
    mediaType?: string;
    isActive?: boolean | string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<GalleryAdminResponse> {
    const queryParts: string[] = [];
    if (params.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    if (params.campusId && params.campusId !== "all") queryParts.push(`campusId=${params.campusId}`);
    if (params.category && params.category !== "all") queryParts.push(`category=${encodeURIComponent(params.category)}`);
    if (params.mediaType && params.mediaType !== "all") queryParts.push(`mediaType=${params.mediaType}`);
    if (params.isActive !== undefined && params.isActive !== "all") {
      const activeBool = params.isActive === true || params.isActive === "active" || params.isActive === "true";
      queryParts.push(`isActive=${activeBool}`);
    }
    if (params.sortBy) {
      let backendSortBy = params.sortBy;
      if (params.sortBy === "newest" || params.sortBy === "oldest") backendSortBy = "createdAt";
      queryParts.push(`sortBy=${backendSortBy}`);
    }
    if (params.sortOrder) queryParts.push(`sortOrder=${params.sortOrder}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        gallery: any[];
        pagination: {
          page: number;
          limit: number;
          totalItems: number;
          totalPages: number;
          hasNextPage: boolean;
          hasPreviousPage: boolean;
        };
      };
    }>(`/gallery${queryStr}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve gallery items.");
    }

    return {
      gallery: (response.data.gallery || []).map(mapBackendToFrontendGallery),
      pagination: response.data.pagination || {
        page: params.page || 1,
        limit: params.limit || 10,
        totalItems: (response.data.gallery || []).length,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  },

  /**
   * Get a single gallery item by ID (Admin)
   */
  async getGalleryItemById(id: string): Promise<GalleryItem> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        gallery: any;
      };
    }>(`/gallery/${id}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve gallery item.");
    }

    return mapBackendToFrontendGallery(response.data.gallery);
  },

  /**
   * Create a new gallery item (Admin)
   */
  async createGalleryItem(formData: FormData): Promise<GalleryItem> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        gallery: any;
      };
    }>("/gallery", {
      method: "POST",
      body: formData,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to upload gallery item.");
    }

    return mapBackendToFrontendGallery(response.data.gallery);
  },

  /**
   * Update a gallery item by ID (Admin)
   */
  async updateGalleryItem(id: string, formData: FormData): Promise<GalleryItem> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        gallery: any;
      };
    }>(`/gallery/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update gallery item.");
    }

    return mapBackendToFrontendGallery(response.data.gallery);
  },

  /**
   * Delete a gallery item by ID (Admin)
   */
  async deleteGalleryItem(id: string): Promise<boolean> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: null;
    }>(`/gallery/${id}`, {
      method: "DELETE",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to delete gallery item.");
    }

    return true;
  },

  /**
   * Toggle status of a gallery item (Admin)
   */
  async toggleStatus(id: string, isActive: boolean): Promise<GalleryItem> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        gallery: any;
      };
    }>(`/gallery/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ isActive }),
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update gallery status.");
    }

    return mapBackendToFrontendGallery(response.data.gallery);
  },
};
