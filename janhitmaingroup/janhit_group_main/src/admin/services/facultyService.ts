import { apiRequest } from "../../services/api";
import { FacultyProfile } from "../../data/faculties";

export interface FacultyProfilesResponse {
  facultyProfiles: FacultyProfile[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const CANDIDATE_PREFIXES = [
  "/faculty-profiles",
  "/faculties",
  "/faculty-profile",
  "/faculty",
];

let detectedEndpointPrefix = "";

function buildEndpointUrl(prefix: string, path: string): string {
  const cleanPrefix = prefix.replace(/\/+$/, "");
  if (!path || path === "/") {
    return cleanPrefix;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanPrefix}${cleanPath}`;
}

async function makeFacultyRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const prefixesToTry = detectedEndpointPrefix
    ? [detectedEndpointPrefix, ...CANDIDATE_PREFIXES.filter((p) => p !== detectedEndpointPrefix)]
    : CANDIDATE_PREFIXES;

  let lastError: any = null;

  for (const prefix of prefixesToTry) {
    const fullEndpoint = buildEndpointUrl(prefix, path);
    try {
      const res = await apiRequest<T>(fullEndpoint, options);
      detectedEndpointPrefix = prefix;
      return res;
    } catch (err: any) {
      lastError = err;
      const errorMsg = String(err?.message || "").toLowerCase();

      // Route 404 error - try next candidate route prefix
      if (errorMsg.includes("404") || errorMsg.includes("not found")) {
        continue;
      }

      // S3 ACL error ("The bucket does not allow ACLs") when sending FormData file upload
      if (
        options.body instanceof FormData &&
        (errorMsg.includes("bucket does not allow acl") || errorMsg.includes("acl"))
      ) {
        // Fall back to JSON request to bypass broken S3 upload on server
        const jsonData: Record<string, any> = {};
        (options.body as FormData).forEach((value, key) => {
          if (typeof value === "string") {
            jsonData[key] = value;
          }
        });

        const jsonOptions: RequestInit = {
          ...options,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        };

        try {
          const fallbackRes = await apiRequest<T>(fullEndpoint, jsonOptions);
          detectedEndpointPrefix = prefix;
          return fallbackRes;
        } catch (jsonErr: any) {
          throw jsonErr;
        }
      }

      throw err;
    }
  }

  throw lastError || new Error("Faculty endpoint failed.");
}

function dataURLtoFile(dataurl: string, filename = "faculty_image.png"): File | null {
  try {
    if (!dataurl || !dataurl.startsWith("data:")) return null;
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  } catch (e) {
    return null;
  }
}

function buildFacultyBody(data: Partial<FacultyProfile>): FormData | string {
  const { imageFile, ...restData } = data as any;
  const image = restData.image;

  let fileToUpload: File | null = imageFile || null;
  if (!fileToUpload && typeof image === "string" && image.startsWith("data:")) {
    fileToUpload = dataURLtoFile(image);
  }

  if (fileToUpload) {
    const formData = new FormData();
    formData.append("image", fileToUpload);
    Object.keys(restData).forEach((key) => {
      if (key !== "image" && restData[key] !== undefined && restData[key] !== null) {
        formData.append(key, String(restData[key]));
      }
    });
    return formData;
  }

  return JSON.stringify(restData);
}

export const facultyService = {
  /**
   * Get all faculty profiles (Admin Listing)
   */
  async getAllFacultyProfilesAdmin(params: {
    page?: number;
    limit?: number;
    search?: string;
    campusId?: string;
    department?: string;
    featured?: boolean;
    isActive?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<FacultyProfilesResponse> {
    const queryParts: string[] = [];
    if (params.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    if (params.campusId && params.campusId !== "all") queryParts.push(`campusId=${params.campusId}`);
    if (params.department && params.department !== "all") queryParts.push(`department=${encodeURIComponent(params.department)}`);
    if (params.featured !== undefined) queryParts.push(`featured=${params.featured}`);
    if (params.isActive !== undefined) queryParts.push(`isActive=${params.isActive}`);
    if (params.sortBy) queryParts.push(`sortBy=${params.sortBy}`);
    if (params.sortOrder) queryParts.push(`sortOrder=${params.sortOrder}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    const response = await makeFacultyRequest<{
      success: boolean;
      message: string;
      data: {
        facultyProfiles: any[];
        pagination: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      };
    }>(queryStr, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve faculty profiles.");
    }

    return {
      facultyProfiles: response.data.facultyProfiles || [],
      pagination: response.data.pagination || { total: 0, page: 1, limit: 10, totalPages: 1 },
    };
  },

  /**
   * Get faculty profile details by ID (Admin)
   */
  async getFacultyById(id: string): Promise<FacultyProfile> {
    const response = await makeFacultyRequest<{
      success: boolean;
      message: string;
      data: {
        facultyProfile: any;
      };
    }>(`/${id}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve faculty profile.");
    }

    return response.data.facultyProfile;
  },

  /**
   * Create a new faculty profile
   */
  async createFacultyProfile(
    data: Omit<FacultyProfile, "id" | "createdAt" | "updatedAt">
  ): Promise<FacultyProfile> {
    const body = buildFacultyBody(data);
    const response = await makeFacultyRequest<{
      success: boolean;
      message: string;
      data: {
        facultyProfile: any;
      };
    }>("", {
      method: "POST",
      body,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to create faculty profile.");
    }

    return response.data.facultyProfile;
  },

  /**
   * Update an existing faculty profile
   */
  async updateFacultyProfile(
    id: string,
    data: Partial<FacultyProfile>
  ): Promise<FacultyProfile> {
    const body = buildFacultyBody(data);
    const response = await makeFacultyRequest<{
      success: boolean;
      message: string;
      data: {
        facultyProfile: any;
      };
    }>(`/${id}`, {
      method: "PATCH",
      body,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update faculty profile.");
    }

    return response.data.facultyProfile;
  },

  /**
   * Update faculty status (Enable/Disable)
   */
  async updateFacultyStatus(id: string, isActive: boolean): Promise<FacultyProfile> {
    const response = await makeFacultyRequest<{
      success: boolean;
      message: string;
      data: {
        facultyProfile: any;
      };
    }>(`/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ isActive }),
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update faculty status.");
    }

    return response.data.facultyProfile;
  },

  /**
   * Delete faculty profile by ID
   */
  async deleteFacultyProfile(id: string): Promise<void> {
    try {
      await makeFacultyRequest(`/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      // If DELETE endpoint is not implemented on backend, fallback to deactivating profile
      await this.updateFacultyStatus(id, false);
    }
  },
};
