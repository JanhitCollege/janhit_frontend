import { apiRequest } from "../../services/api";
import { Committee, CommitteeMember, CommitteeDocument } from "../../data/committees";

export function mapBackendToFrontendCommittee(item: any): Committee {
  if (!item) return {} as Committee;

  const campusIds: string[] = Array.isArray(item.campuses)
    ? item.campuses
        .map((c: any) => (typeof c === "string" ? c : c.campusId || c.id || c.campus?.id))
        .filter(Boolean)
    : [];

  const members: CommitteeMember[] = Array.isArray(item.members)
    ? item.members.map((m: any) => ({
        id: String(m.id),
        committeeId: String(m.committeeId || item.id),
        name: m.name || "",
        designation: m.designation || undefined,
        committeeRole: m.committeeRole || "Member",
        department: m.department || undefined,
        photo: m.photo || "",
        email: m.email || undefined,
        phone: m.phone || undefined,
        tenureFrom: m.tenureFrom || undefined,
        tenureTo: m.tenureTo || undefined,
        displayOrder: Number(m.displayOrder) || 0,
        isActive: Boolean(m.isActive),
      }))
    : [];

  const documents: CommitteeDocument[] = Array.isArray(item.documents)
    ? item.documents.map((d: any) => ({
        id: String(d.id),
        committeeId: String(d.committeeId || item.id),
        title: d.title || "",
        description: d.description || undefined,
        documentUrl: d.documentUrl || "",
        fileType: d.fileType || "application/octet-stream",
        documentType: d.documentType || "OTHER",
        displayOrder: Number(d.displayOrder) || 0,
        createdAt: d.createdAt || new Date().toISOString(),
      }))
    : [];

  return {
    id: String(item.id),
    title: item.title || "",
    slug: item.slug || "",
    category: item.category || undefined,
    shortDescription: item.shortDescription || undefined,
    description: item.description || undefined,
    objective: item.objective || undefined,
    committeeType: item.committeeType || undefined,
    academicSession: item.academicSession || undefined,
    tenureFrom: item.tenureFrom || undefined,
    tenureTo: item.tenureTo || undefined,
    bannerImage: item.bannerImage || "",
    status: item.status || "DRAFT",
    publishDate: item.publishDate || undefined,
    displayOrder: Number(item.displayOrder) || 0,
    isMainWebsite: Boolean(item.isMainWebsite),
    campuses: campusIds,
    members,
    documents,
    membersCount: item.membersCount ?? members.length,
    documentsCount: item.documentsCount ?? documents.length,
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString(),
  };
}

function buildCommitteeFormData(
  data: Partial<Committee>,
  bannerFile?: File | null
): FormData {
  const formData = new FormData();

  if (data.title !== undefined) formData.append("title", data.title);
  if (data.category !== undefined && data.category !== null) formData.append("category", data.category);
  if (data.shortDescription !== undefined && data.shortDescription !== null)
    formData.append("shortDescription", data.shortDescription);
  if (data.description !== undefined && data.description !== null)
    formData.append("description", data.description);
  if (data.objective !== undefined && data.objective !== null)
    formData.append("objective", data.objective);
  if (data.committeeType !== undefined && data.committeeType !== null)
    formData.append("committeeType", data.committeeType);
  if (data.academicSession !== undefined && data.academicSession !== null)
    formData.append("academicSession", data.academicSession);
  if (data.tenureFrom !== undefined && data.tenureFrom !== null)
    formData.append("tenureFrom", data.tenureFrom);
  if (data.tenureTo !== undefined && data.tenureTo !== null)
    formData.append("tenureTo", data.tenureTo);
  if (data.status !== undefined) formData.append("status", data.status);
  if (data.publishDate !== undefined && data.publishDate !== null)
    formData.append("publishDate", data.publishDate);
  if (data.displayOrder !== undefined) formData.append("displayOrder", String(data.displayOrder));
  if (data.isMainWebsite !== undefined) formData.append("isMainWebsite", String(data.isMainWebsite));

  if (data.campuses) {
    formData.append("campuses", JSON.stringify(data.campuses));
  }

  if (bannerFile) {
    formData.append("bannerImage", bannerFile);
  }

  return formData;
}

function buildMemberFormData(
  data: Partial<CommitteeMember>,
  photoFile?: File | null
): FormData {
  const formData = new FormData();

  if (data.name !== undefined) formData.append("name", data.name);
  if (data.designation !== undefined && data.designation !== null)
    formData.append("designation", data.designation);
  if (data.committeeRole !== undefined) formData.append("committeeRole", data.committeeRole);
  if (data.department !== undefined && data.department !== null)
    formData.append("department", data.department);
  if (data.email !== undefined && data.email !== null) formData.append("email", data.email);
  if (data.phone !== undefined && data.phone !== null) formData.append("phone", data.phone);
  if (data.displayOrder !== undefined) formData.append("displayOrder", String(data.displayOrder));
  if (data.isActive !== undefined) formData.append("isActive", String(data.isActive));
  if (data.tenureFrom !== undefined && data.tenureFrom !== null)
    formData.append("tenureFrom", data.tenureFrom);
  if (data.tenureTo !== undefined && data.tenureTo !== null)
    formData.append("tenureTo", data.tenureTo);

  if (photoFile) {
    formData.append("photo", photoFile);
  }

  return formData;
}

function buildDocumentFormData(
  data: Partial<CommitteeDocument>,
  docFile?: File | null
): FormData {
  const formData = new FormData();

  if (data.title !== undefined) formData.append("title", data.title);
  if (data.description !== undefined && data.description !== null)
    formData.append("description", data.description);
  if (data.documentType !== undefined) formData.append("documentType", data.documentType);
  if (data.displayOrder !== undefined) formData.append("displayOrder", String(data.displayOrder));

  if (docFile) {
    formData.append("document", docFile);
  }

  return formData;
}

export interface CommitteesAdminResponse {
  committees: Committee[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const committeeService = {
  /**
   * Get all committees (Admin) with pagination, search, sorting, and filters
   */
  async getCommittees(params: {
    page?: number;
    limit?: number;
    search?: string;
    publishStatus?: string;
    status?: string;
    campusId?: string;
    category?: string;
    academicSession?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<CommitteesAdminResponse> {
    const queryParts: string[] = [];
    if (params.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    if (params.publishStatus) queryParts.push(`publishStatus=${params.publishStatus}`);
    if (params.status) queryParts.push(`status=${params.status}`);
    if (params.campusId) queryParts.push(`campusId=${params.campusId}`);
    if (params.category) queryParts.push(`category=${encodeURIComponent(params.category)}`);
    if (params.academicSession)
      queryParts.push(`academicSession=${encodeURIComponent(params.academicSession)}`);
    if (params.sortBy) queryParts.push(`sortBy=${params.sortBy}`);
    if (params.sortOrder) queryParts.push(`sortOrder=${params.sortOrder}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        committees: any[];
        pagination: {
          page: number;
          limit: number;
          totalItems: number;
          totalPages: number;
          hasNextPage: boolean;
          hasPreviousPage: boolean;
        };
      };
    }>(`/committees${queryStr}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve committees.");
    }

    return {
      committees: (response.data.committees || []).map(mapBackendToFrontendCommittee),
      pagination: response.data.pagination || {
        page: params.page || 1,
        limit: params.limit || 10,
        totalItems: (response.data.committees || []).length,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  },

  /**
   * Get single committee details by ID (Admin)
   */
  async getCommitteeById(id: string): Promise<Committee> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        committee: any;
      };
    }>(`/committees/${id}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve committee details.");
    }

    return mapBackendToFrontendCommittee(response.data.committee);
  },

  /**
   * Create a new committee (Admin)
   */
  async createCommittee(
    data: Partial<Committee>,
    bannerFile?: File | null
  ): Promise<Committee> {
    const body = buildCommitteeFormData(data, bannerFile);

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        committee: any;
      };
    }>("/committees", {
      method: "POST",
      body,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to create committee.");
    }

    return mapBackendToFrontendCommittee(response.data.committee);
  },

  /**
   * Update an existing committee by ID (Admin)
   */
  async updateCommittee(
    id: string,
    data: Partial<Committee>,
    bannerFile?: File | null
  ): Promise<Committee> {
    const body = buildCommitteeFormData(data, bannerFile);

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        committee: any;
      };
    }>(`/committees/${id}`, {
      method: "PUT",
      body,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update committee.");
    }

    return mapBackendToFrontendCommittee(response.data.committee);
  },

  /**
   * Delete a committee by ID (Admin)
   */
  async deleteCommittee(id: string): Promise<boolean> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: null;
    }>(`/committees/${id}`, {
      method: "DELETE",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to delete committee.");
    }

    return true;
  },

  /**
   * Publish a committee by ID (Admin)
   */
  async publishCommittee(id: string): Promise<Committee> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        committee: any;
      };
    }>(`/committees/${id}/publish`, {
      method: "PATCH",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to publish committee.");
    }

    return mapBackendToFrontendCommittee(response.data.committee);
  },

  /**
   * Archive a committee by ID (Admin)
   */
  async archiveCommittee(id: string): Promise<Committee> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        committee: any;
      };
    }>(`/committees/${id}/archive`, {
      method: "PATCH",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to archive committee.");
    }

    return mapBackendToFrontendCommittee(response.data.committee);
  },

  /**
   * Add a member to a committee (Admin)
   */
  async addMember(
    committeeId: string,
    data: Partial<CommitteeMember>,
    photoFile?: File | null
  ): Promise<CommitteeMember> {
    const body = buildMemberFormData(data, photoFile);

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        member: any;
      };
    }>(`/committees/${committeeId}/members`, {
      method: "POST",
      body,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to add member to committee.");
    }

    const m = response.data.member;
    return {
      id: String(m.id),
      committeeId: String(m.committeeId || committeeId),
      name: m.name || "",
      designation: m.designation || undefined,
      committeeRole: m.committeeRole || "Member",
      department: m.department || undefined,
      photo: m.photo || "",
      email: m.email || undefined,
      phone: m.phone || undefined,
      tenureFrom: m.tenureFrom || undefined,
      tenureTo: m.tenureTo || undefined,
      displayOrder: Number(m.displayOrder) || 0,
      isActive: Boolean(m.isActive),
    };
  },

  /**
   * Update a committee member by ID (Admin)
   */
  async updateMember(
    committeeId: string,
    memberId: string,
    data: Partial<CommitteeMember>,
    photoFile?: File | null
  ): Promise<CommitteeMember> {
    const body = buildMemberFormData(data, photoFile);

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        member: any;
      };
    }>(`/committees/${committeeId}/members/${memberId}`, {
      method: "PUT",
      body,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update member details.");
    }

    const m = response.data.member;
    return {
      id: String(m.id),
      committeeId: String(m.committeeId || committeeId),
      name: m.name || "",
      designation: m.designation || undefined,
      committeeRole: m.committeeRole || "Member",
      department: m.department || undefined,
      photo: m.photo || "",
      email: m.email || undefined,
      phone: m.phone || undefined,
      tenureFrom: m.tenureFrom || undefined,
      tenureTo: m.tenureTo || undefined,
      displayOrder: Number(m.displayOrder) || 0,
      isActive: Boolean(m.isActive),
    };
  },

  /**
   * Delete a member from a committee (Admin)
   */
  async deleteMember(committeeId: string, memberId: string): Promise<boolean> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: null;
    }>(`/committees/${committeeId}/members/${memberId}`, {
      method: "DELETE",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to delete member.");
    }

    return true;
  },

  /**
   * Upload a document to a committee (Admin)
   */
  async uploadDocument(
    committeeId: string,
    data: Partial<CommitteeDocument>,
    docFile: File
  ): Promise<CommitteeDocument> {
    const body = buildDocumentFormData(data, docFile);

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        document: any;
      };
    }>(`/committees/${committeeId}/documents`, {
      method: "POST",
      body,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to upload document.");
    }

    const d = response.data.document;
    return {
      id: String(d.id),
      committeeId: String(d.committeeId || committeeId),
      title: d.title || "",
      description: d.description || undefined,
      documentUrl: d.documentUrl || "",
      fileType: d.fileType || "application/octet-stream",
      documentType: d.documentType || "OTHER",
      displayOrder: Number(d.displayOrder) || 0,
      createdAt: d.createdAt || new Date().toISOString(),
    };
  },

  /**
   * Delete a document from a committee (Admin)
   */
  async deleteDocument(committeeId: string, documentId: string): Promise<boolean> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: null;
    }>(`/committees/${committeeId}/documents/${documentId}`, {
      method: "DELETE",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to delete document.");
    }

    return true;
  },
};
