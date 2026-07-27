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
}

export const defaultLeads: AdmissionLead[] = [
  {
    id: "lead-1",
    name: "Aman Sharma",
    email: "aman.sharma@gmail.com",
    mobile: "9876543210",
    course: "LL.B",
    campusId: "4", // Janhit College of Law
    status: "NEW",
    city: "Greater Noida",
    message:
      "I am interested in taking admission in 3-year LL.B. Please let me know the eligibility and fee details.",
    createdAt: "2026-07-17T09:00:00Z",
    updatedAt: "2026-07-17T09:00:00Z",
  },
  {
    id: "lead-2",
    name: "Riya Verma",
    email: "riya.v@yahoo.com",
    mobile: "9876543211",
    course: "BBA",
    campusId: "1", // Janhit World School / Campus 1
    status: "CONTACTED",
    city: "Ghaziabad",
    message: "What is the scholarship percentage for students scoring above 90% in class 12?",
    createdAt: "2026-07-16T10:15:00Z",
    updatedAt: "2026-07-17T11:30:00Z",
  },
  {
    id: "lead-3",
    name: "Devendra Singh",
    email: "dev.singh@outlook.com",
    mobile: "9876543212",
    course: "B.Ed",
    campusId: "9", // Janhit College of Education
    status: "ADMISSION_DONE",
    city: "Noida",
    message: "Looking for admission guidelines in B.Ed course.",
    createdAt: "2026-07-15T08:30:00Z",
    updatedAt: "2026-07-18T10:00:00Z",
  },
  {
    id: "lead-4",
    name: "Sneha Gupta",
    email: "sneha.gupta@rediffmail.com",
    mobile: "9876543213",
    course: "BCA",
    campusId: "2", // Campus 2
    status: "CLOSED",
    city: "Ghaziabad",
    message: "Enquiring about BCA placements and lab facilities.",
    createdAt: "2026-07-14T11:00:00Z",
    updatedAt: "2026-07-16T14:00:00Z",
  },
  {
    id: "lead-5",
    name: "Kartik Malhotra",
    email: "kartik.m@gmail.com",
    mobile: "9876543214",
    course: "B.A. LL.B",
    campusId: "4", // Janhit College of Law
    status: "NEW",
    city: "Delhi",
    message: "Is hostel facility available for 5-year law students?",
    createdAt: "2026-07-18T05:30:00Z",
    updatedAt: "2026-07-18T05:30:00Z",
  },
];

const LOCAL_STORAGE_KEY = "janhit_admission_leads";

export const getStoredAdmissionLeads = (): AdmissionLead[] => {
  if (typeof window === "undefined") return defaultLeads;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultLeads));
    return defaultLeads;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultLeads;
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
  const updated = [newLead, ...existing]; // Show new leads at the top
  saveAdmissionLeads(updated);
  return newLead;
};
