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
    location: "Plot No. 35, Knowledge Park-1, Greater Noida, Gautam Buddh Nagar, U.P. – 201308",
    city: "Greater Noida",
    type: "College",
    image: lawImg,
    courses: ["LL.M", "LL.B", "B.A. LL.B"],
    approvals: ["BCI"],
    affiliation: "Ch. Charan Singh University, Meerut",
    website: "https://jclgn.janhitgroup.com",
    maps: "https://goo.gl/maps/4sBiuPa63R4TX73B9",
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
    location: "Plot No. 38-B, Knowledge Park-1, Greater Noida, Gautam Buddh Nagar, U.P. – 201308",
    city: "Greater Noida",
    type: "College",
    image: gnImg,
    courses: ["B.A", "BBA", "BCA", "B.Sc (Biology, Mathematics)", "B.Com", "B.Ed", "D.El.Ed"],
    approvals: ["AICTE", "NCTE"],
    affiliation: "Ch. Charan Singh University, Meerut",
    website: "https://jieign.janhitgroup.com",
    maps: "https://goo.gl/maps/y5GEJMn9XTZWRavDA",
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
    location: "Madhuban-Bapudham Yojna, Near Govindpuram, Ghaziabad, U.P. – 201013",
    city: "Ghaziabad",
    type: "College",
    image: gzbImg,
    courses: ["B.A", "B.Com", "BBA", "BCA", "B.P.E.S", "B.Ed", "D.El.Ed"],
    approvals: ["AICTE", "NCTE"],
    affiliation: "Ch. Charan Singh University, Meerut",
    website: "https://jiegzb.janhitgroup.com",
    maps: "https://goo.gl/maps/pcFx23Gcr2eRH8nw5",
    established: "2004",
    email: "info@janhitghaziabad.com",
    phone: "+91 98765 43212",
  },
  {
    slug: "janhit-degree-college-saharanpur",
    name: "Janhit Degree College",
    short: "A sprawling Saharanpur campus with diverse degree programs.",
    description:
      "From agriculture to applied sciences, business to teacher training — Janhit Degree College, Saharanpur, brings affordable, high-quality higher education to the region.",
    location: "Gangali, Roorki-Dehradun Road, Chhutmalpur, Saharanpur, U.P. – 247662",
    city: "Saharanpur",
    type: "College",
    image: sahImg,
    courses: ["B.A", "B.Com", "B.Sc (Biology, Mathematics, Agriculture)", "BBA", "BCA", "B.P.E.S", "B.Ed", "D.El.Ed"],
    approvals: ["AICTE", "NCTE"],
    affiliation: "Maa Shakumbhari University, Saharanpur",
    website: "https://jdcsre.janhitgroup.com",
    maps: "https://goo.gl/maps/BNjk9TqhZaYbnhPH8",
    established: "2010",
    email: "info@janhitdegreecollege.com",
    phone: "+91 98765 43213",
  },
  {
    slug: "janhit-world-school-greater-noida",
    name: "Janhit World School",
    short: "School education nurturing curiosity and character.",
    description:
      "A modern school in Greater Noida where global pedagogy meets Indian values — with smart classrooms, performing arts, sports, and STEAM labs.",
    location: "Plot No. 55-B, Knowledge Park-5, Greater Noida, U.P. – 201306",
    city: "Greater Noida",
    type: "School",
    image: schoolImg,
    courses: ["Classes 1st to 8th"],
    approvals: ["CBSE"],
    affiliation: "To be affiliated with CBSE",
    website: "https://jwsgn.janhitgroup.com",
    maps: "https://maps.app.goo.gl/BRJU2eUYEGZTfQUJ6",
    established: "2026",
    email: "info@janhitworldschool.com",
    phone: "9958574400, 9773500617",
  },
  {
    slug: "janhit-world-school-ghaziabad",
    name: "Janhit World School",
    short: "A vibrant Ghaziabad campus rooted in academic excellence.",
    description:
      "Janhit World School Ghaziabad offers a balanced curriculum blending academics, athletics, and the arts in a safe and inspiring environment.",
    location: "Madhuban-Bapudham Yojna, Near Govindpuram, Ghaziabad, U.P. – 201013",
    city: "Ghaziabad",
    type: "School",
    image: schoolImg,
    courses: ["Classes 1st to 8th"],
    approvals: ["CBSE"],
    affiliation: "CBSE",
    website: "https://jwsgzb.janhitgroup.com",
    maps: "https://goo.gl/maps/pcFx23Gcr2eRH8nw5",
    established: "2019",
    email: "ghaziabad@janhitworldschool.com",
    phone: "+91 98765 43215",
  },
  {
    slug: "janhit-world-school-saharanpur",
    name: "Janhit World School",
    short: "Saharanpur's school of choice for holistic learning.",
    description:
      "With expansive grounds, modern infrastructure, and dedicated mentors, Janhit World School Saharanpur shapes confident, compassionate global citizens.",
    location: "Gangali, Chhutmalpur, Saharanpur, U.P. – 247662",
    city: "Saharanpur",
    type: "School",
    image: schoolImg,
    courses: ["Classes 1st to 8th"],
    approvals: ["CBSE"],
    affiliation: "CBSE",
    website: "https://jwssre.janhitgroup.com",
    maps: "https://goo.gl/maps/BNjk9TqhZaYbnhPH8",
    established: "2022",
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
