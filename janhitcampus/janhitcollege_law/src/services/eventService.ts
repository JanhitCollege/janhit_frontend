import { apiRequest } from "./api";

export interface CampusEvent {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string;
  bannerImage: string | null;
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  venue: string | null;
  organizer: string | null;
  registrationLink: string | null;
  isMainWebsite: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  campuses?: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface EventsPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface EventsApiResponse {
  events: CampusEvent[];
  pagination: EventsPagination;
}

export interface GetEventsParams {
  campusSlug?: string;
  page?: number;
  limit?: number;
  search?: string;
}

const DEFAULT_CAMPUS_SLUG = "janhit-college-of-law";

export const eventService = {
  /**
   * Get upcoming events for a campus
   * Primary endpoint: GET /public/campuses/:slug/events
   * Fallback: GET /public/events
   */
  async getUpcomingEvents(params?: GetEventsParams): Promise<EventsApiResponse> {
    const slug = params?.campusSlug || DEFAULT_CAMPUS_SLUG;
    const queryParts: string[] = [];
    if (params?.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params?.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    try {
      const response = await apiRequest<{
        success: boolean;
        message: string;
        data: {
          events: CampusEvent[];
          pagination: EventsPagination;
        };
      }>(`/public/campuses/${slug}/events${queryStr}`, {
        method: "GET",
      });

      if (response && response.success) {
        const eventsList = Array.isArray(response.data)
          ? response.data
          : response.data?.events || [];
        return {
          events: eventsList,
          pagination: response.data?.pagination || {
            page: 1,
            limit: 10,
            totalItems: eventsList.length,
            totalPages: 1,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        };
      }
    } catch (err: any) {
      // If campus-specific route returns 404 or fails, try general public upcoming events
      try {
        const fallback = await apiRequest<{
          success: boolean;
          message: string;
          data: {
            events?: CampusEvent[];
            pagination?: EventsPagination;
          } | CampusEvent[];
        }>(`/public/events${queryStr}`, {
          method: "GET",
        });

        if (fallback && fallback.success) {
          const fallbackList = Array.isArray(fallback.data)
            ? fallback.data
            : fallback.data?.events || [];
          return {
            events: fallbackList,
            pagination: fallback.data?.pagination || {
              page: 1,
              limit: 10,
              totalItems: fallbackList.length,
              totalPages: 1,
              hasNextPage: false,
              hasPreviousPage: false,
            },
          };
        }
      } catch (_) {
        // Try /events endpoint as another fallback
        try {
          const eventsFallback = await apiRequest<{
            success: boolean;
            message: string;
            data: {
              events?: CampusEvent[];
            } | CampusEvent[];
          }>(`/events?status=PUBLISHED${params?.search ? `&search=${encodeURIComponent(params.search)}` : ""}`, {
            method: "GET",
          });

          if (eventsFallback && eventsFallback.success) {
            const list = Array.isArray(eventsFallback.data)
              ? eventsFallback.data
              : eventsFallback.data?.events || [];
            return {
              events: list,
              pagination: {
                page: 1,
                limit: list.length,
                totalItems: list.length,
                totalPages: 1,
                hasNextPage: false,
                hasPreviousPage: false,
              },
            };
          }
        } catch (_) {
          // Fallback completed
        }
      }
    }

    return {
      events: [],
      pagination: {
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  },

  /**
   * Get past events for a campus
   * Primary endpoint: GET /public/campuses/:slug/events/past
   * Fallback: GET /public/events/past
   */
  async getPastEvents(params?: GetEventsParams): Promise<EventsApiResponse> {
    const slug = params?.campusSlug || DEFAULT_CAMPUS_SLUG;
    const queryParts: string[] = [];
    if (params?.page !== undefined) queryParts.push(`page=${params.page}`);
    if (params?.limit !== undefined) queryParts.push(`limit=${params.limit}`);
    if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);

    const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    try {
      const response = await apiRequest<{
        success: boolean;
        message: string;
        data: {
          events: CampusEvent[];
          pagination: EventsPagination;
        };
      }>(`/public/campuses/${slug}/events/past${queryStr}`, {
        method: "GET",
      });

      if (response && response.success) {
        return {
          events: response.data?.events || [],
          pagination: response.data?.pagination || {
            page: 1,
            limit: 10,
            totalItems: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        };
      }
    } catch (err: any) {
      try {
        const fallback = await apiRequest<{
          success: boolean;
          message: string;
          data: {
            events: CampusEvent[];
            pagination: EventsPagination;
          };
        }>(`/public/events/past${queryStr}`, {
          method: "GET",
        });

        if (fallback && fallback.success) {
          return {
            events: fallback.data?.events || [],
            pagination: fallback.data?.pagination || {
              page: 1,
              limit: 10,
              totalItems: 0,
              totalPages: 0,
              hasNextPage: false,
              hasPreviousPage: false,
            },
          };
        }
      } catch (_) {
        // ignored
      }
    }

    return {
      events: [],
      pagination: {
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  },

  /**
   * Get event by slug
   * GET /public/events/:slug
   */
  async getEventBySlug(slug: string): Promise<CampusEvent | null> {
    try {
      const response = await apiRequest<{
        success: boolean;
        message: string;
        data: {
          event: CampusEvent;
        };
      }>(`/public/events/${slug}`, {
        method: "GET",
      });

      if (response && response.success && response.data?.event) {
        return response.data.event;
      }
      return null;
    } catch (err) {
      return null;
    }
  },
};

/**
 * Format ISO date string into readable user display
 * e.g. "October 18-20, 2026" or "November 14, 2026"
 */
export function formatDisplayDate(startDate: string, endDate?: string | null): string {
  if (!startDate) return "";

  const start = new Date(startDate);
  if (isNaN(start.getTime())) return startDate;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const startMonth = monthNames[start.getMonth()];
  const startDay = start.getDate();
  const startYear = start.getFullYear();

  if (endDate) {
    const end = new Date(endDate);
    if (!isNaN(end.getTime())) {
      const endMonth = monthNames[end.getMonth()];
      const endDay = end.getDate();
      const endYear = end.getFullYear();

      if (startMonth === endMonth && startYear === endYear) {
        return `${startMonth} ${startDay}-${endDay}, ${startYear}`;
      }
      return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
    }
  }

  return `${startMonth} ${startDay}, ${startYear}`;
}

/**
 * Parse date into parts for calendar badges (day, month, year)
 */
export function parseDateBadge(dateStr: string): { day: string; month: string; year: string } {
  if (!dateStr) {
    return { day: "01", month: "JAN", year: "2026" };
  }

  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return { day: "01", month: "JAN", year: "2026" };
  }

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const day = String(d.getDate()).padStart(2, "0");
  const month = months[d.getMonth()];
  const year = String(d.getFullYear());

  return { day, month, year };
}
