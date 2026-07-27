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
}

export const defaultFaculties: FacultyProfile[] = [
  {
    id: "fac-1",
    campusId: "4", // Janhit College of Law
    image: "",
    name: "Dr. Rajesh Kumar",
    designation: "Professor & Principal",
    department: "Law",
    qualification: "LL.M, Ph.D. in Constitutional Law",
    specialization: "Constitutional Law, Human Rights",
    experience: "18 Years",
    email: "rajesh.kumar@janhit.edu.in",
    phone: "+91 98765 00123",
    linkedin: "https://linkedin.com/in/dr-rajesh-kumar-law",
    researchInterest:
      "Constitutional governance, legislative processes, judicial activism in developing nations.",
    subjects: "Constitutional Law, Jurisprudence, Administrative Law",
    publications:
      "1. 'Constitutional Reforms in India' (2024), 2. 'Judicial Activism vs. Restraint' (2022) published in Indian Law Journal.",
    awards: "Outstanding Legal Educator Award (2023), Best Researcher Award (2021).",
    bio: "Dr. Rajesh Kumar is a visionary academic leader with over 18 years of teaching and administrative experience in law. He is currently heading the legal education program at Janhit College of Law and acts as an advisor to several state legal agencies.",
    message:
      "Education is the most powerful tool to bring social justice and equity to society. I welcome all students to a transformative legal learning journey.",
    displayOrder: 1,
    isHod: true,
    isFeatured: true,
    isActive: true,
    createdAt: "2026-01-15T09:00:00Z",
    updatedAt: "2026-06-20T11:30:00Z",
  },
  {
    id: "fac-2",
    campusId: "4", // Janhit College of Law
    image: "",
    name: "Dr. Shalini Singh",
    designation: "Associate Professor",
    department: "Law",
    qualification: "LL.M, Ph.D. in Corporate Law",
    specialization: "Corporate & Insolvency Laws",
    experience: "12 Years",
    email: "shalini.singh@janhit.edu.in",
    phone: "+91 98765 00124",
    linkedin: "https://linkedin.com/in/dr-shalini-singh",
    researchInterest:
      "Mergers and acquisitions, regulatory frameworks for startups, and insolvency laws.",
    subjects: "Corporate Law, Contract Law, Insolvency Laws",
    publications:
      "1. 'Startup Legal Handbook' (2023), 2. 'Analyzing the Insolvency and Bankruptcy Code' (2021).",
    awards: "Best Teacher in Corporate Law (2022).",
    bio: "Dr. Shalini Singh specializes in corporate finance, corporate governance, and insolvency regimes. She teaches undergraduate and graduate programs and conducts corporate law workshops.",
    message:
      "Understanding law is key to running clean, ethical, and highly successful businesses.",
    displayOrder: 2,
    isHod: false,
    isFeatured: false,
    isActive: true,
    createdAt: "2026-02-10T10:15:00Z",
    updatedAt: "2026-02-10T10:15:00Z",
  },
  {
    id: "fac-3",
    campusId: "9", // Janhit College of Education Greater Noida
    image: "",
    name: "Prof. Vinod K. Sharma",
    designation: "Dean & Professor",
    department: "Education",
    qualification: "M.Ed, Ph.D. in Pedagogy",
    specialization: "Educational Psychology, Instructional Design",
    experience: "22 Years",
    email: "vinod.sharma@janhit.edu.in",
    phone: "+91 98765 00222",
    linkedin: "https://linkedin.com/in/prof-vinod-sharma-edu",
    researchInterest:
      "Modern digital pedagogies, student-centered learning methodologies, and cognitive development in learners.",
    subjects: "Educational Psychology, Methodology of Teaching, Teacher Education",
    publications:
      "1. 'Teaching in the Digital Age' (2023), 2. 'Psychological Foundations of Education' (2020) textbook.",
    awards: "Shikshak Samman award from UP Government (2021).",
    bio: "Prof. Vinod K. Sharma is a renowned academician in the field of teacher training and educational psychology. He has supervised over 15 Ph.D. candidates and coordinates modern teacher education curricula.",
    message:
      "A teacher's role is to ignite the spark of curiosity in students. We train future educators to build tomorrow's leaders.",
    displayOrder: 1,
    isHod: true,
    isFeatured: true,
    isActive: true,
    createdAt: "2026-01-20T08:30:00Z",
    updatedAt: "2026-07-05T09:45:00Z",
  },
  {
    id: "fac-4",
    campusId: "1", // Janhit World School Greater Noida
    image: "",
    name: "Mrs. Meenakshi Joshi",
    designation: "Senior PGT Teacher",
    department: "Science",
    qualification: "M.Sc. Physics, B.Ed.",
    specialization: "Electromagnetism, Quantum Physics",
    experience: "8 Years",
    email: "meenakshi.joshi@jws.edu.in",
    phone: "+91 98765 00333",
    linkedin: "",
    researchInterest:
      "Interactive physics laboratories, science exhibition designs, STEM curriculum optimization.",
    subjects: "Physics, Science, Applied Mathematics",
    publications: "1. Physics Activity Book for K-12 (2022).",
    awards: "Best Science Educator award (JWS school level, 2024).",
    bio: "Mrs. Meenakshi Joshi has been leading the Physics and Science department at Janhit World School, guiding students through practical experiments, boards preparation, and physics Olympiads.",
    message:
      "Physics is not just about memorizing formulas; it is about seeing how the universe dances.",
    displayOrder: 1,
    isHod: true,
    isFeatured: false,
    isActive: true,
    createdAt: "2026-03-05T11:00:00Z",
    updatedAt: "2026-03-05T11:00:00Z",
  },
  {
    id: "fac-5",
    campusId: "2", // Janhit World School Ghaziabad
    image: "",
    name: "Mr. Rakesh Saxena",
    designation: "PGT Mathematics",
    department: "Mathematics",
    qualification: "M.Sc. Mathematics, B.Ed.",
    specialization: "Calculus, Linear Algebra",
    experience: "10 Years",
    email: "rakesh.saxena@jws.edu.in",
    phone: "+91 98765 00444",
    linkedin: "",
    researchInterest: "Mathematical modeling for secondary students, Vedic math strategies.",
    subjects: "Mathematics, Statistics",
    publications: "1. 'Fun with Calculus' worksheet series.",
    awards: "Excellent Pedagogical Style Award (2023).",
    bio: "Mr. Rakesh Saxena has over 10 years of experience teaching mathematics to high school students, with a focus on logical deduction and competitive exam preparation.",
    message: "Numbers have a beautiful story to tell if you learn to listen with patience.",
    displayOrder: 2,
    isHod: false,
    isFeatured: false,
    isActive: false,
    createdAt: "2026-04-12T14:00:00Z",
    updatedAt: "2026-04-15T10:00:00Z",
  },
];

const LOCAL_STORAGE_KEY = "janhit_faculties";

export const getStoredFaculties = (): FacultyProfile[] => {
  if (typeof window === "undefined") return defaultFaculties;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultFaculties));
    return defaultFaculties;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultFaculties;
  }
};

export const saveFaculties = (faculties: FacultyProfile[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(faculties));
  }
};
