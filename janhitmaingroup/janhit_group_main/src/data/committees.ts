export interface CommitteeMember {
  id: string;
  committeeId: string;
  name: string;
  designation?: string;
  committeeRole: string; // e.g., Chairperson, Coordinator, Member
  department?: string;
  photo?: string;
  email?: string;
  phone?: string;
  tenureFrom?: string;
  tenureTo?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface CommitteeDocument {
  id: string;
  committeeId: string;
  title: string;
  description?: string;
  documentUrl: string;
  fileType: string; // e.g., application/pdf
  documentType: "ORDER" | "NOTICE" | "MINUTES" | "REPORT" | "CIRCULAR" | "OTHER";
  displayOrder: number;
  createdAt: string;
}

export interface Committee {
  id: string;
  title: string;
  slug: string;
  category?: string;
  shortDescription?: string;
  description?: string;
  objective?: string;
  committeeType?: string; // e.g., Statutory, Non-statutory, Ad-hoc
  academicSession?: string; // e.g., 2026-27
  tenureFrom?: string;
  tenureTo?: string;
  bannerImage?: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishDate?: string;
  displayOrder: number;
  isMainWebsite: boolean;
  campuses: string[]; // campusIds
  members: CommitteeMember[];
  documents: CommitteeDocument[];
  membersCount?: number;
  documentsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export const defaultCommittees: Committee[] = [];

const LOCAL_STORAGE_KEY = "janhit_committees";

export const getStoredCommittees = (): Committee[] => {
  if (typeof window === "undefined") return defaultCommittees;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    return defaultCommittees;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultCommittees;
  }
};

export const saveCommittees = (committees: Committee[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(committees));
  }
};
