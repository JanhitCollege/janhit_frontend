export interface AdmissionLead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  course: string;
  campusId: string;
  status: "NEW" | "CONTACTED" | "ADMISSION_DONE" | "CLOSED";
  city?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
  campus?: {
    name: string;
  };
}

export const defaultLeads: AdmissionLead[] = [];

const LOCAL_STORAGE_KEY = "janhit_admission_leads";

export const getStoredAdmissionLeads = (): AdmissionLead[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    return [];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const saveAdmissionLeads = (leads: AdmissionLead[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
  }
};

export const createAdmissionLead = (
  leadData: Omit<AdmissionLead, "id" | "status" | "createdAt" | "updatedAt">,
): AdmissionLead => {
  const existing = getStoredAdmissionLeads();
  const newLead: AdmissionLead = {
    ...leadData,
    id: "lead-" + Date.now(),
    status: "NEW",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const updated = [newLead, ...existing];
  saveAdmissionLeads(updated);
  return newLead;
};
