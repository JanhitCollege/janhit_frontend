export interface EventItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string;
  bannerImage: string | null;
  startDate: string; // ISO Date String YYYY-MM-DD
  endDate: string | null; // ISO Date String YYYY-MM-DD
  startTime: string | null; // HH:MM
  endTime: string | null; // HH:MM
  venue: string | null;
  organizer: string | null;
  registrationLink: string | null;
  isMainWebsite: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  campusIds: string[]; // Associated Campus UUIDs
  createdAt: string;
  updatedAt: string;
}

export const defaultEvents: EventItem[] = [];

export const getStoredEvents = (): EventItem[] => {
  return [];
};

export const saveEvents = (_events: EventItem[]) => {};
