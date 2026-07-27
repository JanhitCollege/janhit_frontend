import lawImg from "@/assets/campus-law.jpg";
import gnImg from "@/assets/campus-greater-noida.jpg";
import gzbImg from "@/assets/campus-ghaziabad.jpg";
import sahImg from "@/assets/campus-saharanpur.jpg";
import schoolImg from "@/assets/janhit-world-school-hero.png";

export type Institution = {
  slug: string;
  name: string;
  short: string;
  description: string;
  location: string;
  city: string;
  type: "College" | "School";
  image: string;
  courses: string[];
  approvals: string[];
  affiliation: string;
  website: string;
  maps: string;
  established: string;
  email: string;
  phone: string;
};

export const institutions: Institution[] = [
  {
    slug: "janhit-college-of-law",
    name: "Janhit College of Law",
    short: "Premier institution shaping the legal minds of tomorrow.",
    description:
      "Janhit College of Law is recognized for its rigorous legal curriculum, eminent faculty, and a moot-court culture that prepares advocates, judges, and legal scholars of national repute.",
    location: "Greater Noida, Uttar Pradesh",
    city: "Greater Noida",
    type: "College",
    image: lawImg,
    courses: ["LL.M", "LL.B", "B.A. LL.B"],
    approvals: ["BCI"],
    affiliation: "CCS University",
    website: "https://janhitcollegeoflaw.com",
    maps: "https://www.google.com/maps?q=Greater+Noida",
    established: "2002",
    email: "info@janhitcollegeoflaw.com",
    phone: "+91 98765 43210",
  },
  {
    slug: "janhit-institute-education-information-greater-noida",
    name: "Janhit Institute of Education & Information",
    short: "Multidisciplinary campus offering future-ready professional programs.",
    description:
      "A flagship campus combining business, computer applications, sciences, commerce, and teacher education — anchored by industry-led labs, internships, and a vibrant student life.",
    location: "Greater Noida, Uttar Pradesh",
    city: "Greater Noida",
    type: "College",
    image: gnImg,
    courses: ["BBA", "BCA", "B.Sc", "B.Com", "B.Ed", "D.El.Ed"],
    approvals: ["AICTE", "NCTE"],
    affiliation: "CCS University",
    website: "https://janhitinstitute.com",
    maps: "https://www.google.com/maps?q=Greater+Noida",
    established: "2002",
    email: "admissions@janhitinstitute.com",
    phone: "+91 98765 43211",
  },
  {
    slug: "janhit-institute-education-ghaziabad",
    name: "Janhit Institute of Education",
    short: "Holistic education for tomorrow's educators and entrepreneurs.",
    description:
      "Located in Ghaziabad, the institute blends traditional liberal arts with modern professional courses, offering pathways into teaching, business, technology, and physical education.",
    location: "Ghaziabad, Uttar Pradesh",
    city: "Ghaziabad",
    type: "College",
    image: gzbImg,
    courses: ["B.A", "B.Com", "BBA", "BCA", "B.P.Ed", "D.El.Ed"],
    approvals: ["NCTE"],
    affiliation: "CCS University",
    website: "https://janhitghaziabad.com",
    maps: "https://www.google.com/maps?q=Ghaziabad",
    established: "2008",
    email: "info@janhitghaziabad.com",
    phone: "+91 98765 43212",
  },
  {
    slug: "janhit-degree-college-saharanpur",
    name: "Janhit Degree College",
    short: "A sprawling Saharanpur campus with diverse degree programs.",
    description:
      "From agriculture to applied sciences, business to teacher training — Janhit Degree College, Saharanpur, brings affordable, high-quality higher education to the region.",
    location: "Saharanpur, Uttar Pradesh",
    city: "Saharanpur",
    type: "College",
    image: sahImg,
    courses: ["B.A", "B.Com", "B.Sc", "Agriculture", "BBA", "BCA", "B.Ed"],
    approvals: ["NCTE"],
    affiliation: "Maa Shakumbhari University",
    website: "https://janhitdegreecollege.com",
    maps: "https://www.google.com/maps?q=Saharanpur",
    established: "2010",
    email: "info@janhitdegreecollege.com",
    phone: "+91 98765 43213",
  },
  {
    slug: "janhit-world-school-greater-noida",
    name: "Janhit World School",
    short: "CBSE-affiliated school nurturing curiosity and character.",
    description:
      "A modern K-12 school where global pedagogy meets Indian values — with smart classrooms, performing arts, sports, and STEAM labs.",
    location: "55B, Knowledge Park 5, Greater Noida, Uttar Pradesh",
    city: "Greater Noida",
    type: "School",
    image: schoolImg,
    courses: ["Pre-Primary", "Primary", "Middle School", "Secondary", "Senior Secondary"],
    approvals: ["CBSE"],
    affiliation: "CBSE",
    website: "https://janhitworldschool.com",
    maps: "https://www.google.com/maps?q=Greater+Noida",
    established: "2012",
    email: "info@janhitworldschool.com",
    phone: "9958574400, 9773500617",
  },
  {
    slug: "janhit-world-school-ghaziabad",
    name: "Janhit World School",
    short: "A vibrant Ghaziabad campus rooted in academic excellence.",
    description:
      "Janhit World School Ghaziabad offers a balanced curriculum blending academics, athletics, and the arts in a safe and inspiring environment.",
    location: "Ghaziabad, Uttar Pradesh",
    city: "Ghaziabad",
    type: "School",
    image: schoolImg,
    courses: ["Pre-Primary", "Primary", "Middle School", "Secondary", "Senior Secondary"],
    approvals: ["CBSE"],
    affiliation: "CBSE",
    website: "https://janhitworldschool.com",
    maps: "https://www.google.com/maps?q=Ghaziabad",
    established: "2014",
    email: "ghaziabad@janhitworldschool.com",
    phone: "+91 98765 43215",
  },
  {
    slug: "janhit-world-school-saharanpur",
    name: "Janhit World School",
    short: "Saharanpur's school of choice for holistic learning.",
    description:
      "With expansive grounds, modern infrastructure, and dedicated mentors, Janhit World School Saharanpur shapes confident, compassionate global citizens.",
    location: "Saharanpur, Uttar Pradesh",
    city: "Saharanpur",
    type: "School",
    image: schoolImg,
    courses: ["Pre-Primary", "Primary", "Middle School", "Secondary", "Senior Secondary"],
    approvals: ["CBSE"],
    affiliation: "CBSE",
    website: "https://janhitworldschool.com",
    maps: "https://www.google.com/maps?q=Saharanpur",
    established: "2015",
    email: "saharanpur@janhitworldschool.com",
    phone: "+91 98765 43216",
  },
];

export const allCourses = Array.from(
  new Map(
    institutions.flatMap((i) =>
      i.courses.map((c) => [
        `${c}-${i.slug}`,
        {
          name: c,
          institution: i.name,
          slug: i.slug,
          city: i.city,
          category: categorize(c),
          duration: duration(c),
          eligibility: eligibility(c),
          affiliation: i.affiliation,
        },
      ]),
    ),
  ).values(),
);

function categorize(c: string) {
  if (c.includes("LL")) return "Law";
  if (["BBA"].includes(c)) return "Management";
  if (["B.Com"].includes(c)) return "Commerce";
  if (["B.Sc", "BCA", "Agriculture"].includes(c)) return "Science";
  if (["B.Ed", "D.El.Ed", "B.P.Ed"].includes(c)) return "Education";
  if (["B.A"].includes(c)) return "Arts";
  return "School Education";
}
function duration(c: string) {
  if (c === "B.A. LL.B") return "5 Years";
  if (c === "LL.M") return "2 Years";
  if (c === "LL.B") return "3 Years";
  if (["D.El.Ed"].includes(c)) return "2 Years";
  if (["BBA", "BCA", "B.Sc", "B.Com", "B.A", "B.Ed", "B.P.Ed", "Agriculture"].includes(c))
    return "3 Years";
  return "1-12 Years";
}
function eligibility(c: string) {
  if (c === "LL.M") return "LL.B with 50%";
  if (c === "LL.B") return "Graduation with 50%";
  if (c === "B.A. LL.B") return "10+2 with 50%";
  if (["B.Ed", "D.El.Ed", "B.P.Ed"].includes(c)) return "Graduation with 50%";
  if (c === "Agriculture") return "10+2 (PCB/PCM)";
  return "10+2 in any stream";
}
