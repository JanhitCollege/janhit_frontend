import { apiRequest } from "../../services/api";

export interface AdmissionLead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  course: string;
  campusId: string;
  status: "NEW" | "CONTACTED" | "ADMISSION_DONE" | "CLOSED";
  city?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
  campus?: {
    name: string;
  };
}

export interface GetAdmissionLeadsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  campusId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetAdmissionLeadsResponse {
  leads: AdmissionLead[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const admissionLeadService = {
  /**
   * Submit a new admission enquiry (Public)
   */
  async createAdmissionLead(data: {
    name: string;
    email: string;
    mobile: string;
    course: string;
    campusId: string;
  }): Promise<AdmissionLead> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        lead: AdmissionLead;
      };
    }>("/admission-leads", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to submit admission enquiry.");
    }

    return response.data.lead;
  },

  /**
   * Retrieve all admission leads with pagination, filters, search, and sorting (Admin)
   */
  async getAllAdmissionLeads(
    params: GetAdmissionLeadsParams = {}
  ): Promise<GetAdmissionLeadsResponse> {
    const queryParts: string[] = [];
    if (params.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    if (params.status && params.status !== "all") {
      queryParts.push(`status=${encodeURIComponent(params.status)}`);
    }
    if (params.campusId && params.campusId !== "all") {
      queryParts.push(`campusId=${encodeURIComponent(params.campusId)}`);
    }
    if (params.sortBy) queryParts.push(`sortBy=${encodeURIComponent(params.sortBy)}`);
    if (params.sortOrder) queryParts.push(`sortOrder=${encodeURIComponent(params.sortOrder)}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        leads: AdmissionLead[];
        pagination: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      };
    }>(`/admin/admission-leads${queryStr}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve admission leads.");
    }

    return response.data;
  },

  /**
   * Retrieve a single admission lead by ID (Admin)
   */
  async getAdmissionLeadById(id: string): Promise<AdmissionLead> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        lead: AdmissionLead;
      };
    }>(`/admin/admission-leads/${id}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve admission lead.");
    }

    return response.data.lead;
  },

  /**
   * Update the status of a single admission lead by ID (Admin)
   */
  async updateAdmissionLeadStatus(
    id: string,
    status: string
  ): Promise<AdmissionLead> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        lead: AdmissionLead;
      };
    }>(`/admin/admission-leads/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update admission lead status.");
    }

    return response.data.lead;
  },
};
