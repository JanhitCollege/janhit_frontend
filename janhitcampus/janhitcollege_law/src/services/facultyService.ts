import { apiRequest } from "./api";

export interface FacultyProfile {
  id: string;
  name: string;
  designation?: string;
  role?: string;
  department?: string;
  qualification?: string;
  education?: string;
  specialization?: string;
  experience?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  researchInterest?: string;
  subjects?: string;
  publications?: string;
  awards?: string;
  bio?: string;
  message?: string;
  image?: string;
  displayOrder?: number;
  isHod?: boolean;
  isFeatured?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  campusId?: string;
  campus?: {
    id: string;
    name: string;
    slug?: string;
  };
}

export function mapBackendToFrontendFaculty(raw: any): FacultyProfile {
  const roleText = raw.designation || raw.role || "Faculty Member";
  const educationText = raw.qualification || raw.education || "";
  const specText = raw.specialization || raw.researchInterest || "";

  return {
    id: String(raw.id || ""),
    name: raw.name || "Faculty Member",
    designation: roleText,
    role: roleText,
    department: raw.department || "Law",
    qualification: educationText,
    education: educationText,
    specialization: specText,
    experience: raw.experience || "",
    email: raw.email || "",
    phone: raw.phone || "",
    linkedin: raw.linkedin || "",
    researchInterest: raw.researchInterest || "",
    subjects: raw.subjects || "",
    publications: raw.publications || "",
    awards: raw.awards || "",
    bio: raw.bio || "",
    message: raw.message || "",
    image: raw.image || "",
    displayOrder: typeof raw.displayOrder === "number" ? raw.displayOrder : 0,
    isHod: Boolean(raw.isHod),
    isFeatured: Boolean(raw.isFeatured),
    isActive: raw.isActive !== undefined ? Boolean(raw.isActive) : true,
    createdAt: raw.createdAt || "",
    updatedAt: raw.updatedAt || "",
    campusId: raw.campusId || "",
    campus: raw.campus,
  };
}

export const facultyService = {
  /**
   * Get all active public faculty profiles
   */
  async getPublicFacultyList(params?: {
    campusSlug?: string;
    department?: string;
    featured?: boolean;
  }): Promise<FacultyProfile[]> {
    const campusSlug = params?.campusSlug !== undefined ? params.campusSlug : "janhit-college-of-law";
    const queryParts: string[] = [];

    if (campusSlug) {
      queryParts.push(`campusSlug=${encodeURIComponent(campusSlug)}`);
    }
    if (params?.department && params.department !== "All") {
      queryParts.push(`department=${encodeURIComponent(params.department)}`);
    }
    if (params?.featured !== undefined) {
      queryParts.push(`featured=${params.featured}`);
    }

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    const candidateEndpoints = [
      `/faculty-profiles/public/faculty${queryStr}`,
      `/faculties/public/faculty${queryStr}`,
      `/faculty/public/faculty${queryStr}`,
      `/public/faculty${queryStr}`,
    ];

    let response: any = null;
    let lastError: any = null;

    for (const endpoint of candidateEndpoints) {
      try {
        response = await apiRequest(endpoint, { method: "GET" });
        if (response && response.success !== false) {
          break;
        }
      } catch (err: any) {
        lastError = err;
        const msg = String(err?.message || "").toLowerCase();
        if (msg.includes("404") || msg.includes("not found")) {
          continue;
        }
        throw err;
      }
    }

    if (!response || response.success === false) {
      if (campusSlug) {
        try {
          response = await apiRequest(`/faculty-profiles/public/faculty`, { method: "GET" });
        } catch (_) {
          throw lastError || new Error(response?.message || "Failed to retrieve faculty profiles.");
        }
      } else {
        throw lastError || new Error(response?.message || "Failed to retrieve faculty profiles.");
      }
    }

    const rawData = response.data || response;
    const rawList = rawData.facultyProfiles || rawData.faculties || (Array.isArray(rawData) ? rawData : []);
    let profiles = rawList.map(mapBackendToFrontendFaculty);

    // If campusSlug was provided and yielded matches, filter
    if (campusSlug && profiles.length > 0) {
      const filteredByCampus = profiles.filter((p: FacultyProfile) => {
        if (!p.campus?.slug) return false;
        return p.campus.slug.toLowerCase() === campusSlug.toLowerCase();
      });
      if (filteredByCampus.length > 0) {
        profiles = filteredByCampus;
      } else {
        // Check if any profiles in DB have a campus name or slug containing 'law'
        const lawMatches = profiles.filter((p: FacultyProfile) =>
          p.campus?.slug?.toLowerCase().includes("law") ||
          p.campus?.name?.toLowerCase().includes("law")
        );
        profiles = lawMatches;
      }
    }

    return profiles;
  },

  /**
   * Get single public faculty profile details by ID
   */
  async getPublicFacultyById(id: string): Promise<FacultyProfile> {
    const candidateEndpoints = [
      `/faculty-profiles/public/faculty/${id}`,
      `/faculties/public/faculty/${id}`,
      `/public/faculty/${id}`,
    ];

    let response: any = null;
    let lastError: any = null;

    for (const endpoint of candidateEndpoints) {
      try {
        response = await apiRequest(endpoint, { method: "GET" });
        if (response && response.success !== false) break;
      } catch (err: any) {
        lastError = err;
        continue;
      }
    }

    if (!response || response.success === false) {
      throw lastError || new Error(response?.message || "Failed to retrieve faculty profile details.");
    }

    const rawData = response.data || response;
    return mapBackendToFrontendFaculty(rawData.facultyProfile || rawData.faculty || rawData);
  },
};
