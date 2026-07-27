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
  createdAt: string;
  updatedAt: string;
}

export const defaultCommittees: Committee[] = [
  {
    id: "comm-1",
    title: "Anti-Ragging Committee",
    slug: "anti-ragging-committee",
    category: "Student Welfare",
    shortDescription:
      "Ensuring a safe, ragging-free campus environment across all institutes of Janhit Group.",
    description:
      "In compliance with the regulations of AICTE and the UGC, the Anti-Ragging Committee of Janhit Group of Institutions oversees preventive drives, handles grievances, and holds regular awareness programs to protect student dignity.",
    objective:
      "To guarantee strict compliance with anti-ragging directives, investigate complaints, and cultivate a zero-tolerance culture towards ragging.",
    committeeType: "Statutory",
    academicSession: "2026-27",
    tenureFrom: "2026-07-01T00:00:00Z",
    tenureTo: "2027-06-30T00:00:00Z",
    bannerImage: "",
    status: "PUBLISHED",
    publishDate: "2026-07-01T09:00:00Z",
    displayOrder: 1,
    isMainWebsite: true,
    campuses: ["4", "1"], // Law and Greater Noida
    createdAt: "2026-06-15T10:00:00Z",
    updatedAt: "2026-07-01T09:00:00Z",
    members: [
      {
        id: "mem-1-1",
        committeeId: "comm-1",
        name: "Dr. Rajesh Kumar",
        designation: "Professor & Principal",
        committeeRole: "Chairperson",
        department: "Law",
        photo: "",
        email: "rajesh.kumar@janhit.edu.in",
        phone: "+91 98765 00123",
        tenureFrom: "2026-07-01T00:00:00Z",
        tenureTo: "2027-06-30T00:00:00Z",
        displayOrder: 1,
        isActive: true,
      },
      {
        id: "mem-1-2",
        committeeId: "comm-1",
        name: "Dr. Shalini Singh",
        designation: "Associate Professor",
        committeeRole: "Coordinator",
        department: "Law",
        photo: "",
        email: "shalini.singh@janhit.edu.in",
        phone: "+91 98765 00124",
        tenureFrom: "2026-07-01T00:00:00Z",
        tenureTo: "2027-06-30T00:00:00Z",
        displayOrder: 2,
        isActive: true,
      },
    ],
    documents: [
      {
        id: "doc-1-1",
        committeeId: "comm-1",
        title: "Anti-Ragging Circular & Regulations",
        description:
          "Official notifications, rules, and helpline contacts for the academic session 2026-27.",
        documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileType: "application/pdf",
        documentType: "CIRCULAR",
        displayOrder: 1,
        createdAt: "2026-07-01T10:30:00Z",
      },
    ],
  },
  {
    id: "comm-2",
    title: "Internal Complaints Committee (ICC)",
    slug: "internal-complaints-committee",
    category: "Women Protection",
    shortDescription:
      "Constituted in accordance with PoSH Guidelines to prevent harassment and promote gender equity.",
    description:
      "The ICC aims to provide protection against sexual harassment of women at the workplace and for the prevention and redressal of complaints of sexual harassment.",
    objective:
      "To address grievances, organize workshops to foster gender-sensitive workspaces, and provide counseling services.",
    committeeType: "Statutory",
    academicSession: "2026-27",
    tenureFrom: "2026-07-01T00:00:00Z",
    tenureTo: "2027-06-30T00:00:00Z",
    bannerImage: "",
    status: "PUBLISHED",
    publishDate: "2026-07-02T10:00:00Z",
    displayOrder: 2,
    isMainWebsite: true,
    campuses: ["4", "9"], // Law and Education
    createdAt: "2026-06-20T11:00:00Z",
    updatedAt: "2026-07-02T10:00:00Z",
    members: [
      {
        id: "mem-2-1",
        committeeId: "comm-2",
        name: "Dr. Shalini Singh",
        designation: "Associate Professor",
        committeeRole: "Chairperson",
        department: "Law",
        photo: "",
        email: "shalini.singh@janhit.edu.in",
        phone: "+91 98765 00124",
        tenureFrom: "2026-07-01T00:00:00Z",
        tenureTo: "2027-06-30T00:00:00Z",
        displayOrder: 1,
        isActive: true,
      },
    ],
    documents: [
      {
        id: "doc-2-1",
        committeeId: "comm-2",
        title: "PoSH Guidelines & Redressal Flow",
        description:
          "Official guide on harassment prevention rules, submission procedure, and redressal timelines.",
        documentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileType: "application/pdf",
        documentType: "ORDER",
        displayOrder: 1,
        createdAt: "2026-07-02T11:00:00Z",
      },
    ],
  },
  {
    id: "comm-3",
    title: "Library Committee",
    slug: "library-committee",
    category: "Academic Resources",
    shortDescription:
      "Steering selection, procurement, and digitalization of books and journal resources.",
    description:
      "The Library Committee plays an advisory role in the selection and procurement of textbooks, journals, e-libraries, and database subscriptions for academic research.",
    objective:
      "To evaluate library needs, select and approve book procurements, and coordinate the expansion of e-library infrastructure.",
    committeeType: "Non-statutory",
    academicSession: "2026-27",
    tenureFrom: "2026-08-01T00:00:00Z",
    tenureTo: "2027-07-31T00:00:00Z",
    bannerImage: "",
    status: "DRAFT",
    displayOrder: 3,
    isMainWebsite: false,
    campuses: ["1", "2"], // School Greater Noida, School Ghaziabad
    createdAt: "2026-07-10T14:00:00Z",
    updatedAt: "2026-07-10T14:00:00Z",
    members: [
      {
        id: "mem-3-1",
        committeeId: "comm-3",
        name: "Prof. Vinod K. Sharma",
        designation: "Dean & Professor",
        committeeRole: "Chairperson",
        department: "Education",
        photo: "",
        email: "vinod.sharma@janhit.edu.in",
        phone: "+91 98765 00222",
        tenureFrom: "2026-08-01T00:00:00Z",
        tenureTo: "2027-07-31T00:00:00Z",
        displayOrder: 1,
        isActive: true,
      },
    ],
    documents: [],
  },
];

const LOCAL_STORAGE_KEY = "janhit_committees";

export const getStoredCommittees = (): Committee[] => {
  if (typeof window === "undefined") return defaultCommittees;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultCommittees));
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
