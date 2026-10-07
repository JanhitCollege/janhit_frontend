const BASE_URL = import.meta.env.VITE_API_URL || "https://api.janhitgroup.com/api";

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const formattedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${formattedEndpoint}`;
  
  const token = localStorage.getItem("janhit_admin_token");
  
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    let errorMessage = "An error occurred";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (_) {
      // Fallback if response is not JSON
    }
    throw new Error(errorMessage);
  }
  
  return response.json();
}

// ==========================================
// DISCLOSURE API FUNCTIONS
// ==========================================

export async function getCampusDisclosuresPublic(campusSlug: string) {
  return apiRequest(`/v1/campuses/${campusSlug}/disclosures`);
}

export async function getCampusDisclosuresAdmin(campusId: string) {
  return apiRequest(`/v1/admin/campuses/${campusId}/disclosures`);
}

export function getDisclosureDownloadUrl(documentId: string) {
  return `${BASE_URL}/v1/disclosures/documents/${documentId}/download`;
}

export async function createDisclosureDocumentAdmin(campusId: string, formData: FormData) {
  return apiRequest(`/v1/admin/campuses/${campusId}/documents`, {
    method: "POST",
    body: formData,
  });
}

export async function updateDisclosureDocumentAdmin(documentId: string, formData: FormData) {
  return apiRequest(`/v1/admin/disclosures/documents/${documentId}`, {
    method: "PUT",
    body: formData,
  });
}

export async function deleteDisclosureDocumentAdmin(documentId: string) {
  return apiRequest(`/v1/admin/disclosures/documents/${documentId}`, {
    method: "DELETE",
  });
}

export async function bulkUpdateCampusDetailsAdmin(campusId: string, details: any[]) {
  return apiRequest(`/v1/admin/campuses/${campusId}/disclosure-details`, {
    method: "PUT",
    body: JSON.stringify({ details }),
  });
}

export async function getCampusesListAdmin() {
  return apiRequest(`/campuses`);
}
