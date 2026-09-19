import { apiRequest } from "../../services/api";
import { EventItem } from "../../data/events";

/**
 * Helper function to format ISO date string into YYYY-MM-DD for form inputs
 */
const formatDateStr = (dateVal: any): string => {
  if (!dateVal) return "";
  if (typeof dateVal === "string") {
    if (dateVal.includes("T")) return dateVal.split("T")[0];
    return dateVal;
  }
  if (dateVal instanceof Date) {
    return dateVal.toISOString().split("T")[0];
  }
  return String(dateVal);
};

/**
 * Map backend Event object to frontend EventItem interface
 */
export function mapBackendToFrontendEvent(item: any): EventItem {
  if (!item) return {} as EventItem;

  const campusIds: string[] = Array.isArray(item.campuses)
    ? item.campuses
        .map((c: any) => (typeof c === "string" ? c : c.campusId || c.campus?.id || c.id))
        .filter(Boolean)
    : Array.isArray(item.campusIds)
    ? item.campusIds
    : [];

  return {
    id: String(item.id),
    title: item.title || "",
    slug: item.slug || "",
    shortDescription: item.shortDescription || null,
    description: item.description || "",
    bannerImage: item.bannerImage || null,
    startDate: formatDateStr(item.startDate),
    endDate: item.endDate ? formatDateStr(item.endDate) : null,
    startTime: item.startTime || null,
    endTime: item.endTime || null,
    venue: item.venue || null,
    organizer: item.organizer || null,
    registrationLink: item.registrationLink || null,
    isMainWebsite: Boolean(item.isMainWebsite),
    status: (item.status || "DRAFT") as "DRAFT" | "PUBLISHED" | "ARCHIVED",
    campusIds,
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString(),
  };
}

export interface EventsAdminResponse {
  events: EventItem[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface GetEventsAdminParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  campusId?: string;
  isMainWebsite?: boolean | string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface EventInputData {
  title: string;
  slug?: string;
  shortDescription?: string | null;
  description: string;
  startDate: string;
  endDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  venue?: string | null;
  organizer?: string | null;
  registrationLink?: string | null;
  isMainWebsite?: boolean;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  campusIds?: string[];
  bannerImage?: string | null;
  bannerFile?: File | null;
}

export const eventService = {
  /**
   * List Events (Admin with search, filters, pagination)
   * GET /events
   */
  async getEventsAdmin(params: GetEventsAdminParams = {}): Promise<EventsAdminResponse> {
    const queryParts: string[] = [];
    if (params.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params.search && params.search.trim()) {
      queryParts.push(`search=${encodeURIComponent(params.search.trim())}`);
    }
    if (params.status && params.status !== "all") {
      queryParts.push(`status=${params.status}`);
    }
    if (params.campusId && params.campusId !== "all") {
      queryParts.push(`campusId=${params.campusId}`);
    }
    if (params.isMainWebsite !== undefined && params.isMainWebsite !== "all") {
      const boolVal =
        params.isMainWebsite === true ||
        params.isMainWebsite === "main" ||
        params.isMainWebsite === "true";
      queryParts.push(`isMainWebsite=${boolVal}`);
    }
    if (params.sortBy) {
      queryParts.push(`sortBy=${params.sortBy}`);
    }
    if (params.sortOrder) {
      queryParts.push(`sortOrder=${params.sortOrder}`);
    }

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        events: any[];
        pagination: {
          page: number;
          limit: number;
          totalItems: number;
          totalPages: number;
          hasNextPage: boolean;
          hasPreviousPage: boolean;
        };
      };
    }>(`/events${queryStr}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve events.");
    }

    return {
      events: (response.data.events || []).map(mapBackendToFrontendEvent),
      pagination: response.data.pagination || {
        page: params.page || 1,
        limit: params.limit || 10,
        totalItems: (response.data.events || []).length,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  },

  /**
   * Get Event Details by ID (Admin)
   * GET /events/:id
   */
  async getEventById(id: string): Promise<EventItem> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        event: any;
      };
    }>(`/events/${id}`, {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve event details.");
    }

    return mapBackendToFrontendEvent(response.data.event);
  },

  /**
   * Create a new Event (Admin)
   * POST /events
   */
  async createEvent(data: EventInputData): Promise<EventItem> {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.shortDescription !== undefined && data.shortDescription !== null) {
      formData.append("shortDescription", data.shortDescription);
    }
    formData.append("description", data.description);
    formData.append("startDate", data.startDate);
    if (data.endDate) formData.append("endDate", data.endDate);
    if (data.startTime) formData.append("startTime", data.startTime);
    if (data.endTime) formData.append("endTime", data.endTime);
    if (data.venue) formData.append("venue", data.venue);
    if (data.organizer) formData.append("organizer", data.organizer);
    if (data.registrationLink) formData.append("registrationLink", data.registrationLink);
    formData.append("isMainWebsite", String(Boolean(data.isMainWebsite)));
    if (data.status) formData.append("status", data.status);
    if (data.campusIds && data.campusIds.length > 0) {
      formData.append("campuses", JSON.stringify(data.campusIds));
    }

    if (data.bannerFile) {
      formData.append("bannerImage", data.bannerFile);
    }

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        event: any;
      };
    }>("/events", {
      method: "POST",
      body: formData,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to create event.");
    }

    return mapBackendToFrontendEvent(response.data.event);
  },

  /**
   * Update an existing Event (Admin)
   * PUT /events/:id
   */
  async updateEvent(id: string, data: Partial<EventInputData>): Promise<EventItem> {
    const formData = new FormData();
    if (data.title !== undefined) formData.append("title", data.title);
    if (data.shortDescription !== undefined) {
      formData.append("shortDescription", data.shortDescription || "");
    }
    if (data.description !== undefined) formData.append("description", data.description);
    if (data.startDate !== undefined) formData.append("startDate", data.startDate);
    if (data.endDate !== undefined) formData.append("endDate", data.endDate || "");
    if (data.startTime !== undefined) formData.append("startTime", data.startTime || "");
    if (data.endTime !== undefined) formData.append("endTime", data.endTime || "");
    if (data.venue !== undefined) formData.append("venue", data.venue || "");
    if (data.organizer !== undefined) formData.append("organizer", data.organizer || "");
    if (data.registrationLink !== undefined) {
      formData.append("registrationLink", data.registrationLink || "");
    }
    if (data.isMainWebsite !== undefined) {
      formData.append("isMainWebsite", String(Boolean(data.isMainWebsite)));
    }
    if (data.status !== undefined) formData.append("status", data.status);
    if (data.campusIds !== undefined) {
      formData.append("campuses", JSON.stringify(data.campusIds));
    }

    if (data.bannerFile) {
      formData.append("bannerImage", data.bannerFile);
    }

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        event: any;
      };
    }>(`/events/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to update event.");
    }

    return mapBackendToFrontendEvent(response.data.event);
  },

  /**
   * Publish Event (Admin)
   * PATCH /events/:id/publish
   */
  async publishEvent(id: string): Promise<EventItem> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        event: any;
      };
    }>(`/events/${id}/publish`, {
      method: "PATCH",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to publish event.");
    }

    return mapBackendToFrontendEvent(response.data.event);
  },

  /**
   * Archive Event (Admin)
   * PATCH /events/:id/archive
   */
  async archiveEvent(id: string): Promise<EventItem> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        event: any;
      };
    }>(`/events/${id}/archive`, {
      method: "PATCH",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to archive event.");
    }

    return mapBackendToFrontendEvent(response.data.event);
  },

  /**
   * Delete Event (Admin)
   * DELETE /events/:id
   */
  async deleteEvent(id: string): Promise<boolean> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: null;
    }>(`/events/${id}`, {
      method: "DELETE",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to delete event.");
    }

    return true;
  },
};
