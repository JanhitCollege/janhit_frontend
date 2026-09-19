import { apiRequest } from "../../services/api";

export interface Download {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  campusId: string | null;
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
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

export interface GetDownloadsAdminParams {
  page?: number;
  limit?: number;
  search?: string;
  campusId?: string;
  category?: string;
  isActive?: boolean;
  sortBy?: string;
}

export interface GetDownloadsAdminResponse {
  downloads: Download[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const downloadService = {
  /**
   * Get all downloads (Admin)
   */
  async getDownloadsAdmin(params: GetDownloadsAdminParams = {}): Promise<GetDownloadsAdminResponse> {
    const queryParts: string[] = [];
    if (params.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    if (params.campusId) queryParts.push(`campusId=${encodeURIComponent(params.campusId)}`);
    if (params.category) queryParts.push(`category=${encodeURIComponent(params.category)}`);
    if (params.isActive !== undefined) queryParts.push(`isActive=${params.isActive}`);
    if (params.sortBy) queryParts.push(`sortBy=${encodeURIComponent(params.sortBy)}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        downloads: Download[];
        pagination: {
          page: number;
          limit: number;
          totalItems: number;
          totalPages: number;
          hasNextPage: boolean;
          hasPreviousPage: boolean;
        };
      };
    }>(`/downloads${queryStr}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch downloads.");
    }

    return response.data;
  },

  /**
   * Get single download details (Admin)
   */
  async getDownloadById(id: string): Promise<Download> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        download: Download;
      };
    }>(`/downloads/${id}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch download details.");
    }

    return response.data.download;
  },

  /**
   * Create a new Download (Admin)
   */
  async createDownload(data: {
    title: string;
    category: string;
    campusId?: string | null;
    description?: string | null;
    isActive?: boolean;
    file: File;
  }): Promise<Download> {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);

    if (data.campusId && data.campusId !== "global" && data.campusId !== "null") {
      formData.append("campusId", data.campusId);
    } else {
      formData.append("campusId", "null");
    }

    if (data.description !== undefined && data.description !== null) {
      formData.append("description", data.description);
    }

    if (data.isActive !== undefined) {
      formData.append("isActive", String(data.isActive));
    }

    formData.append("file", data.file);

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        download: Download;
      };
    }>("/downloads", {
      method: "POST",
      body: formData,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to create download.");
    }

    return response.data.download;
  },

  /**
   * Update download details (Admin)
   */
  async updateDownload(
    id: string,
    data: {
      title?: string;
      category?: string;
      campusId?: string | null;
      description?: string | null;
      isActive?: boolean;
      file?: File | null;
    }
  ): Promise<Download> {
    const formData = new FormData();
    if (data.title !== undefined) formData.append("title", data.title);
    if (data.category !== undefined) formData.append("category", data.category);

    if (data.campusId !== undefined) {
      if (data.campusId && data.campusId !== "global" && data.campusId !== "null") {
        formData.append("campusId", data.campusId);
      } else {
        formData.append("campusId", "null");
      }
    }

    if (data.description !== undefined) {
      formData.append("description", data.description || "");
    }

    if (data.isActive !== undefined) {
      formData.append("isActive", String(data.isActive));
    }

    if (data.file) {
      formData.append("file", data.file);
    }

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        download: Download;
      };
    }>(`/downloads/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update download.");
    }

    return response.data.download;
  },

  /**
   * Toggle Active Status of a Download (Admin)
   */
  async toggleStatus(id: string): Promise<Download> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        download: Download;
      };
    }>(`/downloads/${id}/status`, {
      method: "PATCH",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to toggle download status.");
    }

    return response.data.download;
  },
};
