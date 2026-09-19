import { apiRequest } from "./api";

export interface PublicDownload {
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
    slug?: string;
  } | null;
}

export const downloadService = {
  /**
   * Get active downloads for public consumption
   */
  async getPublicDownloads(params?: {
    campus?: string;
    campusId?: string;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ downloads: PublicDownload[]; pagination: any }> {
    const queryParts: string[] = [];
    if (params?.campus) queryParts.push(`campus=${encodeURIComponent(params.campus)}`);
    if (params?.campusId) queryParts.push(`campusId=${encodeURIComponent(params.campusId)}`);
    if (params?.category) queryParts.push(`category=${encodeURIComponent(params.category)}`);
    if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    if (params?.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params?.limit !== undefined) queryParts.push(`limit=${params.limit}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        downloads: PublicDownload[];
        pagination: any;
      };
    }>(`/public/downloads${queryStr}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to fetch public downloads.");
    }

    return response.data;
  },
};
