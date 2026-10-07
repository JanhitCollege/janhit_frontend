export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience: string;
  photo?: string;
  email?: string;
}

export interface CommitteeItem {
  id: string;
  name: string;
  convener: string;
  members: string[];
  responsibilities: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: "Academic" | "Sports" | "Cultural" | "Institutional";
  year: string;
  description: string;
}

export const FACULTY_DATA: FacultyMember[] = [
  {
    id: "f-1",
    name: "Dr. R. K. Verma",
    designation: "Principal / Head of Institution",
    department: "Administration & Teacher Education",
    qualification: "M.A., M.Ed., Ph.D. (Education)",
    experience: "22+ Years",
  },
  {
    id: "f-2",
    name: "Dr. Sunita Sharma",
    designation: "Associate Professor & HOD",
    department: "Faculty of Arts (Humanities)",
    qualification: "M.A. (Hindi), Ph.D., NET Qualified",
    experience: "16+ Years",
  },
  {
    id: "f-3",
    name: "Prof. Amit Kumar Singh",
    designation: "Assistant Professor & HOD",
    department: "Faculty of Commerce & BBA",
    qualification: "M.Com, MBA, M.Phil",
    experience: "14+ Years",
  },
  {
    id: "f-4",
    name: "Er. Deepak Chaudhary",
    designation: "Assistant Professor & HOD",
    department: "Faculty of Computer Applications (BCA)",
    qualification: "MCA, M.Tech (CSE)",
    experience: "12+ Years",
  },
  {
    id: "f-5",
    name: "Dr. Priya Rastogi",
    designation: "Assistant Professor",
    department: "Faculty of Science (Chemistry & Bio)",
    qualification: "M.Sc. (Chemistry), Ph.D.",
    experience: "10+ Years",
  },
  {
    id: "f-6",
    name: "Mr. Vikas Pundir",
    designation: "Assistant Professor & Sports In-charge",
    department: "Faculty of Physical Education (B.P.Ed)",
    qualification: "M.P.Ed., NIS Coach",
    experience: "11+ Years",
  },
  {
    id: "f-7",
    name: "Mrs. Meenakshi Saini",
    designation: "Assistant Professor",
    department: "Faculty of Education (B.Ed / D.El.Ed)",
    qualification: "M.A. (English), M.Ed.",
    experience: "9+ Years",
  },
];

export const COMMITTEES_DATA: CommitteeItem[] = [
  {
    id: "c-1",
    name: "Anti-Ragging Committee",
    convener: "Dr. R. K. Verma (Principal)",
    members: [
      "Dr. Sunita Sharma (Associate Prof)",
      "Prof. Amit Kumar Singh (Assistant Prof)",
      "Local Police Inspector / District Rep",
      "Student Union Representative",
    ],
    responsibilities:
      "Ensures 100% zero-tolerance anti-ragging policy on campus. Conducts awareness workshops and handles student grievances in accordance with Supreme Court & UGC norms.",
  },
  {
    id: "c-2",
    name: "Internal Complaints / Women Grievance Cell",
    convener: "Dr. Priya Rastogi",
    members: ["Mrs. Meenakshi Saini", "Dr. Sunita Sharma", "External NGO Representative"],
    responsibilities:
      "Promotes gender equity, safety, and addresses harassment or safety concerns for female students and staff members on campus.",
  },
  {
    id: "c-3",
    name: "Academic & Examination Advisory Committee",
    convener: "Er. Deepak Chaudhary",
    members: ["Prof. Amit Kumar Singh", "Dr. Priya Rastogi", "University Exam Nodal Officer"],
    responsibilities:
      "Oversees internal mid-term examinations, CCS University practical dates, timetable coordination, and academic progress monitoring.",
  },
  {
    id: "c-4",
    name: "Cultural & Sports Affairs Board",
    convener: "Mr. Vikas Pundir",
    members: ["Mrs. Meenakshi Saini", "Student Cultural Secretary", "Student Sports Captain"],
    responsibilities:
      "Organizes annual fest 'Janhit Tarang', athletic meets, inter-college tournament participation, and youth talent programs.",
  },
  {
    id: "c-5",
    name: "Placement & Training Cell",
    convener: "Prof. Amit Kumar Singh",
    members: ["Er. Deepak Chaudhary", "Dr. Priya Rastogi"],
    responsibilities:
      "Coordinates corporate campus interviews, resume building sessions, soft skills training, and teacher recruitment drives.",
  },
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "a-1",
    title: "Consistently Top CCS University Pass Percentage",
    category: "Academic",
    year: "2024 - 2026",
    description:
      "Janhit Degree College achieved over 95% pass rate across BA, BBA, BCA, B.Com, and Science examinations.",
  },
  {
    id: "a-2",
    title: "100% NCTE Compliant Teacher Education Department",
    category: "Institutional",
    year: "2025",
    description:
      "B.Ed and D.El.Ed programs recognized for outstanding pedagogical labs, micro-teaching sessions, and school internships.",
  },
  {
    id: "a-3",
    title: "Zonal Athletics & Volleyball Champions",
    category: "Sports",
    year: "2026",
    description:
      "B.P.Ed athletic squad bagged 12 gold & silver medals at the regional university sports championship meet.",
  },
  {
    id: "a-4",
    title: "Over 1,000 Alumni Working in Education & Corporate Sectors",
    category: "Institutional",
    year: "2010 - 2026",
    description:
      "Graduates serving as educators, IT software professionals, banking officers, and civil service aspirants.",
  },
];

export const PUBLIC_DISCLOSURES = [
  {
    title: "NCTE Recognition Order for B.Ed & D.El.Ed Courses",
    fileSize: "1.2 MB",
    link: "#",
  },
  {
    title: "CCS University Meerut Affiliation Letter",
    fileSize: "850 KB",
    link: "#",
  },
  {
    title: "Building Safety & Fire NOC Certificates",
    fileSize: "620 KB",
    link: "#",
  },
  {
    title: "Land & Infrastructure Disclosure Form",
    fileSize: "940 KB",
    link: "#",
  },
  {
    title: "Faculty Qualifications & Staff Sanction List",
    fileSize: "710 KB",
    link: "#",
  },
];
