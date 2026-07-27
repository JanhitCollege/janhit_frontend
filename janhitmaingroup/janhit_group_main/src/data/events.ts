import classroomImg from "@/assets/gallery-classroom.jpg";
import culturalImg from "@/assets/gallery-cultural.jpg";
import graduationImg from "@/assets/gallery-graduation.jpg";
import labImg from "@/assets/gallery-lab.jpg";
import libraryImg from "@/assets/gallery-library.jpg";
import sportsImg from "@/assets/gallery-sports.jpg";

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string;
  bannerImage: string | null; // Base64 or imported reference or empty
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

export const defaultEvents: EventItem[] = [
  {
    id: "evt-1",
    title: "Annual Sports Meet 'UDAAN 2026'",
    slug: "annual-sports-meet-udaan-2026",
    shortDescription:
      "Join the grand sports meet featuring track & field, team sports, and indoor contests across all campuses.",
    description:
      "Our annual sports meet UDAAN is back. It showcases sportsmanship, physical coordination, and teamwork. Students from all campuses can register to participate in track events (100m, 200m, relay), team games (football, basketball, volleyball), and indoor matches (table tennis, chess, carrom). Registration closes soon.",
    bannerImage: sportsImg,
    startDate: "2026-09-12",
    endDate: "2026-09-15",
    startTime: "09:00",
    endTime: "17:00",
    venue: "Main Ground, Greater Noida Campus",
    organizer: "Janhit Sports Council",
    registrationLink: "https://sports.janhitgroup.com/register",
    isMainWebsite: true,
    status: "PUBLISHED",
    campusIds: ["1", "2", "3"], // GN, Ghaziabad, Saharanpur
    createdAt: "2026-07-01T10:00:00Z",
    updatedAt: "2026-07-10T12:00:00Z",
  },
  {
    id: "evt-2",
    title: "National Moot Court Competition 2026",
    slug: "national-moot-court-competition-2026",
    shortDescription:
      "A highly prestigious moot court competition hosted by the Law Department for law schools nationwide.",
    description:
      "Janhit College of Law presents its annual National Moot Court Competition. Teams from leading law institutions across the country will compete in front of distinguished judges. The event features intense debates on modern constitutional challenges and cyber law themes. Winners stand to gain cash prizes and internships.",
    bannerImage: graduationImg,
    startDate: "2026-10-05",
    endDate: "2026-10-07",
    startTime: "10:00",
    endTime: "18:00",
    venue: "Seminar Hall & Moot Court Room, Greater Noida Campus 2",
    organizer: "Legal Aid & Moot Court Committee",
    registrationLink: "https://moot.janhitcollegeoflaw.com",
    isMainWebsite: true,
    status: "PUBLISHED",
    campusIds: ["4"], // Law College
    createdAt: "2026-07-05T09:30:00Z",
    updatedAt: "2026-07-05T09:30:00Z",
  },
  {
    id: "evt-3",
    title: "National Seminar on Generative AI in Higher Education",
    slug: "national-seminar-on-generative-ai-in-higher-education",
    shortDescription:
      "Explore the opportunities and challenges of Generative AI tools in curriculum development and assessments.",
    description:
      "Generative AI is transforming classrooms. This national seminar invites academicians, tech theorists, and researchers to discuss strategies for integrating AI tools into teaching methods, assessments, and research paradigms safely and constructively. Keynote address by industry experts.",
    bannerImage: labImg,
    startDate: "2026-08-20",
    endDate: null,
    startTime: "11:00",
    endTime: "15:30",
    venue: "Conference Room 102, Ghaziabad Campus",
    organizer: "Department of Computer Science & Education",
    registrationLink: null,
    isMainWebsite: false,
    status: "DRAFT",
    campusIds: ["1", "2"], // GN, Ghaziabad
    createdAt: "2026-07-15T08:00:00Z",
    updatedAt: "2026-07-15T08:00:00Z",
  },
  {
    id: "evt-4",
    title: "Alumni Meet & Networking Dinner 2026",
    slug: "alumni-meet-networking-dinner-2026",
    shortDescription:
      "Welcome back home! Connect with your classmates, share career paths, and build new professional alliances.",
    description:
      "Reconnect and network. We are hosting the annual alumni meet. This is an excellent opportunity to share experiences, inspire current batches, and explore collaborations. Dinner and musical evening included.",
    bannerImage: culturalImg,
    startDate: "2026-06-15",
    endDate: null,
    startTime: "18:00",
    endTime: "22:00",
    venue: "Open Air Theater, Greater Noida Campus 1",
    organizer: "Janhit Alumni Association",
    registrationLink: "https://alumni.janhitgroup.com/register",
    isMainWebsite: true,
    status: "ARCHIVED",
    campusIds: ["1", "2", "3", "4"], // All campuses
    createdAt: "2026-05-10T14:00:00Z",
    updatedAt: "2026-06-16T10:00:00Z",
  },
];

const LOCAL_STORAGE_KEY = "janhit_events";

export const getStoredEvents = (): EventItem[] => {
  if (typeof window === "undefined") return defaultEvents;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultEvents));
    return defaultEvents;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultEvents;
  }
};

export const saveEvents = (events: EventItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  }
};

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars (except -)
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
};

export const generateUniqueSlug = (title: string, excludeId: string | null = null): string => {
  const baseSlug = slugify(title);
  let uniqueSlug = baseSlug;
  let counter = 1;
  const events = getStoredEvents();

  while (true) {
    const collision = events.find(
      (e) => e.slug === uniqueSlug && (excludeId ? e.id !== excludeId : true),
    );
    if (!collision) {
      return uniqueSlug;
    }
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
};
