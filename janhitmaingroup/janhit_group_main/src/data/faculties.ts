export interface FacultyProfile {
  id: string;
  campusId: string;
  image: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  specialization: string;
  experience: string;
  email: string;
  phone: string;
  linkedin: string;
  researchInterest: string;
  subjects: string;
  publications: string;
  awards: string;
  bio: string;
  message: string;
  displayOrder: number;
  isHod: boolean;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  campus?: {
    id: string;
    name: string;
    slug?: string;
  };
  imageFile?: File;
}

export const defaultFaculties: FacultyProfile[] = [];

const LOCAL_STORAGE_KEY = "janhit_faculties";

export const getStoredFaculties = (): FacultyProfile[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const saveFaculties = (faculties: FacultyProfile[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(faculties));
  }
};
