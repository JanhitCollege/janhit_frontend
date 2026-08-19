import { apiRequest } from "../../services/api";
import { Campus } from "../../data/campuses";

// Backend API returns campus objects with isActive (boolean), createdAt, and updatedAt.
// Frontend UI uses status ("active" | "inactive"), createdDate (ISO string), and updatedDate (ISO string).
export function mapBackendToFrontendCampus(backendCampus: any): Campus {
  return {
    id: String(backendCampus.id),
    name: backendCampus.name || "",
    shortName: backendCampus.shortName || "",
    code: backendCampus.code || "",
    slug: backendCampus.slug || "",
    subdomain: backendCampus.subdomain || "",
    websiteUrl: backendCampus.websiteUrl || `https://${backendCampus.subdomain}.janhitgroup.com`,
    email: backendCampus.email || "",
    phone: backendCampus.phone || "",
    city: backendCampus.city || "",
    state: backendCampus.state || "",
    pincode: backendCampus.pincode || "",
    address: backendCampus.address || "",
    logo: backendCampus.logo || "",
    description: backendCampus.description || "",
    status: backendCampus.isActive ? "active" : "inactive",
    createdDate: backendCampus.createdAt || new Date().toISOString(),
    updatedDate: backendCampus.updatedAt || new Date().toISOString(),
  };
}

export function mapFrontendToBackendCampus(frontendCampus: any) {
  return {
    name: frontendCampus.name,
    shortName: frontendCampus.shortName || "",
    code: frontendCampus.code,
    slug: frontendCampus.slug || "",
    subdomain: frontendCampus.subdomain,
    logo: frontendCampus.logo || "",
    email: frontendCampus.email || "",
    phone: frontendCampus.phone || "",
    address: frontendCampus.address || "",
    city: frontendCampus.city || "",
    state: frontendCampus.state || "",
    pincode: frontendCampus.pincode || "",
    description: frontendCampus.description || "",
    isActive: frontendCampus.status === "active",
  };
}

export interface CampusesResponse {
  campuses: Campus[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const campusService = {
  /**
   * Get all campuses with pagination, search, and sorting
   */
  async getAllCampuses(params: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<CampusesResponse> {
    const queryParts: string[] = [];
    if (params.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    if (params.sortBy) {
      // Map frontend sort names to backend ones
      let backendSortBy = params.sortBy;
      if (params.sortBy === "createdDate") backendSortBy = "createdAt";
      if (params.sortBy === "updatedDate") backendSortBy = "updatedAt";
      if (params.sortBy === "status") backendSortBy = "isActive";
      queryParts.push(`sortBy=${backendSortBy}`);
    }
    if (params.sortOrder) queryParts.push(`sortOrder=${params.sortOrder}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        campuses: any[];
        pagination: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      };
    }>(`/campuses${queryStr}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve campuses.");
    }

    return {
      campuses: response.data.campuses.map(mapBackendToFrontendCampus),
      pagination: response.data.pagination,
    };
  },

  /**
   * Get a single campus by ID
   */
  async getCampusById(id: string): Promise<Campus> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        campus: any;
      };
    }>(`/campuses/${id}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve campus.");
    }

    return mapBackendToFrontendCampus(response.data.campus);
  },

  /**
   * Create a new campus
   */
  async createCampus(data: Omit<Campus, "id" | "createdDate" | "updatedDate">): Promise<Campus> {
    const payload = mapFrontendToBackendCampus(data);
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        campus: any;
      };
    }>("/campuses", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to create campus.");
    }

    return mapBackendToFrontendCampus(response.data.campus);
  },

  /**
   * Update a campus by ID (PUT)
   */
  async updateCampus(
    id: string,
    data: Omit<Campus, "id" | "createdDate" | "updatedDate">
  ): Promise<Campus> {
    const payload = mapFrontendToBackendCampus(data);
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        campus: any;
      };
    }>(`/campuses/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update campus.");
    }

    return mapBackendToFrontendCampus(response.data.campus);
  },

  /**
   * Update campus status by ID (PATCH status)
   */
  async updateCampusStatus(id: string, isActive: boolean): Promise<Campus> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        campus: any;
      };
    }>(`/campuses/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ isActive }),
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update campus status.");
    }

    return mapBackendToFrontendCampus(response.data.campus);
  },
};
