import lawImg from "@/assets/campus-law.jpg";
import gnImg from "@/assets/campus-greater-noida.jpg";
import gzbImg from "@/assets/campus-ghaziabad.jpg";
import sahImg from "@/assets/campus-saharanpur.jpg";
import schoolImg from "@/assets/janhit-world-school-hero.png";

export interface Campus {
  id: string;
  name: string;
  shortName: string;
  code: string;
  slug: string;
  subdomain: string;
  websiteUrl: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  logo: string; // Base64 string or image reference URL or empty
  description: string;
  status: "active" | "inactive";
  createdDate: string;
  updatedDate: string;
}

export const defaultCampuses: Campus[] = [
  {
    id: "1",
    name: "Janhit World School Greater Noida",
    shortName: "JWS GN",
    code: "JWS-GN-01",
    slug: "janhit-world-school-greater-noida",
    subdomain: "jwsgn",
    websiteUrl: "https://jwsgn.janhitgroup.com",
    email: "info@jwsgn.janhitgroup.com",
    phone: "+91 99585 74400",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    pincode: "201310",
    address: "55B, Knowledge Park 5, Greater Noida, Uttar Pradesh",
    logo: schoolImg,
    description:
      "A premier K-12 school offering world-class CBSE education with smart classrooms, advanced sciences, and sports training modules.",
    status: "active",
    createdDate: "2026-01-10T10:30:00Z",
    updatedDate: "2026-06-15T12:00:00Z",
  },
  {
    id: "2",
    name: "Janhit World School Ghaziabad",
    shortName: "JWS GZB",
    code: "JWS-GZB-02",
    slug: "janhit-world-school-ghaziabad",
    subdomain: "jwsgzb",
    websiteUrl: "https://jwsgzb.janhitgroup.com",
    email: "ghaziabad@janhitworldschool.com",
    phone: "+91 98765 43215",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201001",
    address: "Sanjay Nagar, Ghaziabad, Uttar Pradesh",
    logo: schoolImg,
    description:
      "A CBSE school committed to empowering students through innovative learning, modern laboratories, and extensive extracurricular programs.",
    status: "active",
    createdDate: "2026-02-12T09:15:00Z",
    updatedDate: "2026-05-18T14:22:00Z",
  },
  {
    id: "3",
    name: "Janhit World School Saharanpur",
    shortName: "JWS SRE",
    code: "JWS-SRE-03",
    slug: "janhit-world-school-saharanpur",
    subdomain: "jwssre",
    websiteUrl: "https://jwssre.janhitgroup.com",
    email: "saharanpur@janhitworldschool.com",
    phone: "+91 98765 43216",
    city: "Saharanpur",
    state: "Uttar Pradesh",
    pincode: "247001",
    address: "Delhi Road, Saharanpur, Uttar Pradesh",
    logo: schoolImg,
    description:
      "Nurturing excellence and global competence in students, this campus features expansive sports grounds, creative studios, and science labs.",
    status: "active",
    createdDate: "2026-03-01T11:45:00Z",
    updatedDate: "2026-04-10T08:30:00Z",
  },
  {
    id: "4",
    name: "Janhit College of Law",
    shortName: "JCL",
    code: "JCL-KP-04",
    slug: "janhit-college-of-law",
    subdomain: "jcl",
    websiteUrl: "https://jcl.janhitgroup.com",
    email: "info@janhitcollegeoflaw.com",
    phone: "+91 98765 43210",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    pincode: "201310",
    address: "38, Knowledge Park 1, Greater Noida, Uttar Pradesh",
    logo: lawImg,
    description:
      "Approved by the Bar Council of India, offering specialized legal education in B.A. LL.B, LL.B, and LL.M programs with moot-court activities.",
    status: "active",
    createdDate: "2026-01-05T08:00:00Z",
    updatedDate: "2026-07-01T16:00:00Z",
  },
  {
    id: "5",
    name: "Janhit Institute of Education",
    shortName: "JIE GZB",
    code: "JIE-GZB-05",
    slug: "janhit-institute-of-education-ghaziabad",
    subdomain: "jiegzb",
    websiteUrl: "https://jiegzb.janhitgroup.com",
    email: "info@janhitghaziabad.com",
    phone: "+91 98765 43212",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201002",
    address: "Mariam Nagar, Ghaziabad, Uttar Pradesh",
    logo: gzbImg,
    description:
      "Offering B.Ed and D.El.Ed programs, this campus focuses on producing highly skilled educators using modern pedagogical methods.",
    status: "active",
    createdDate: "2026-02-20T10:00:00Z",
    updatedDate: "2026-02-20T10:00:00Z",
  },
  {
    id: "6",
    name: "Janhit Degree College",
    shortName: "JDC SRE",
    code: "JDC-SRE-06",
    slug: "janhit-degree-college",
    subdomain: "jdcsre",
    websiteUrl: "https://jdcsre.janhitgroup.com",
    email: "info@janhitdegreecollege.com",
    phone: "+91 98765 43213",
    city: "Saharanpur",
    state: "Uttar Pradesh",
    pincode: "247001",
    address: "Tapri Road, Saharanpur, Uttar Pradesh",
    logo: sahImg,
    description:
      "A comprehensive university-affiliated degree college with a wide array of programs in Humanities, Science, Commerce, and Teacher Education.",
    status: "active",
    createdDate: "2026-03-10T14:30:00Z",
    updatedDate: "2026-06-20T11:15:00Z",
  },
  {
    id: "7",
    name: "Janhit Institute of Education & Information",
    shortName: "JIEI GN",
    code: "JIEI-GN-07",
    slug: "janhit-institute-education-information",
    subdomain: "jieign",
    websiteUrl: "https://jieign.janhitgroup.com",
    email: "admissions@janhitinstitute.com",
    phone: "+91 98765 43211",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    pincode: "201310",
    address: "Knowledge Park 3, Greater Noida, Uttar Pradesh",
    logo: gnImg,
    description:
      "Co-educational institute specializing in BBA, BCA, B.Sc, B.Com, and B.Ed, focused on job placements and industry-readiness.",
    status: "active",
    createdDate: "2026-01-20T09:00:00Z",
    updatedDate: "2026-07-02T09:00:00Z",
  },
  {
    id: "8",
    name: "Janhit Business School Greater Noida",
    shortName: "JBS GN",
    code: "JBS-GN-08",
    slug: "janhit-business-school-greater-noida",
    subdomain: "jbsgn",
    websiteUrl: "https://jbsgn.janhitgroup.com",
    email: "info@jbsgn.janhitgroup.com",
    phone: "+91 99999 12345",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    pincode: "201310",
    address: "Knowledge Park 2, Greater Noida, Uttar Pradesh",
    logo: "",
    description:
      "An elite business school offering postgraduate and undergraduate courses in business management, entrepreneurship, and international trade.",
    status: "inactive",
    createdDate: "2026-04-05T09:00:00Z",
    updatedDate: "2026-04-05T09:00:00Z",
  },
  {
    id: "9",
    name: "Janhit College of Education Greater Noida",
    shortName: "JCE GN",
    code: "JCE-GN-09",
    slug: "janhit-college-of-education-greater-noida",
    subdomain: "jcegn",
    websiteUrl: "https://jcegn.janhitgroup.com",
    email: "admissions@jcegn.janhitgroup.com",
    phone: "+91 88888 54321",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    pincode: "201310",
    address: "Knowledge Park 1, Greater Noida, Uttar Pradesh",
    logo: "",
    description:
      "An education training campus focusing on advanced teaching practices, teacher-education research, and special educational workshops.",
    status: "active",
    createdDate: "2026-05-01T10:00:00Z",
    updatedDate: "2026-05-01T10:00:00Z",
  },
];

const LOCAL_STORAGE_KEY = "janhit_campuses";

export const getStoredCampuses = (): Campus[] => {
  if (typeof window === "undefined") return defaultCampuses;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultCampuses));
    return defaultCampuses;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultCampuses;
  }
};

export const saveCampuses = (campuses: Campus[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(campuses));
  }
};
