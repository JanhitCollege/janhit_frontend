import galleryClassroom from "@/assets/gallery-classroom.jpg";
import galleryLibrary from "@/assets/gallery-library.jpg";
import galleryLab from "@/assets/gallery-lab.jpg";
import gallerySports from "@/assets/gallery-sports.jpg";
import galleryCultural from "@/assets/gallery-cultural.jpg";
import galleryGraduation from "@/assets/gallery-graduation.jpg";

export interface LeadershipMessage {
  name: string;
  role: string;
  institution: string;
  quote: string;
  paragraphs: string[];
  signOff: string;
}

export const LEADERSHIP_MESSAGES: {
  chairman: LeadershipMessage;
  principal: LeadershipMessage;
} = {
  chairman: {
    name: "Mr. Narendra Chaudhary",
    role: "Chairman",
    institution: "Janhit Group of Institutions",
    quote:
      "Education is the most powerful instrument for transforming lives, empowering individuals, and building a progressive nation. It not only provides knowledge but also shapes character, strengthens values, develops leadership, and inspires lifelong learning.",
    paragraphs: [
      "Dear Students, Parents, and Esteemed Stakeholders,",
      "Education is the most powerful instrument for transforming lives, empowering individuals, and building a progressive nation. It not only provides knowledge but also shapes character, strengthens values, develops leadership, and inspires lifelong learning. At Janhit Group of Institutions, we believe that true education creates responsible citizens who contribute positively to society and lead with integrity, compassion, and excellence.",
      "With this belief, our journey began in 2002 with the establishment of our higher educational institutions. Our vision was simple yet ambitious—to make quality professional education accessible to every deserving student and to prepare graduates who are academically sound, professionally competent, socially responsible, and ethically grounded.",
      "Over the years, Janhit Group has grown into a trusted name in higher education, offering programmes in Law, Teacher Education, Management, Commerce, Science, Computer Applications, and Physical Education. Thousands of our alumni are today serving the nation with distinction in the legal profession, education, public service, business, and various other fields. Their achievements inspire us to continue raising the standards of academic excellence and innovation.",
      "The COVID-19 pandemic was a defining moment for the education sector and for society as a whole. It reminded us that education must begin by building strong foundations—not only in academics but also in resilience, discipline, emotional well-being, digital literacy, and moral values. The experiences of those challenging years strengthened our resolve to nurture young minds from the very beginning of their educational journey.",
      "This vision led to the establishment of Janhit World School, where every child is encouraged to learn with curiosity, think creatively, act responsibly, and grow into a confident global citizen while remaining firmly rooted in Indian culture and values. Our schools are committed to providing a safe, joyful, and inspiring learning environment that promotes holistic development through academics, sports, arts, technology, and life skills.",
      "Whether in our colleges or our schools, our commitment remains the same—to provide quality education through experienced faculty, modern infrastructure, innovative teaching practices, and a value-based learning environment. We continuously strive to create institutions where every learner is respected, every talent is nurtured, and every dream is given the opportunity to flourish.",
      "At Janhit Group, we do not merely educate students; we shape futures. We believe that the success of an institution is reflected in the success, integrity, and character of its students. Our mission is to empower every learner to become a responsible professional, a compassionate human being, and a proud citizen of India.",
      "I extend my heartfelt invitation to all students and parents to become a part of the Janhit family. Together, let us continue our journey of learning, innovation, and nation-building, creating opportunities that transform aspirations into achievements.",
      "I wish all our students a future filled with knowledge, confidence, success, and happiness.",
    ],
    signOff: "With warm regards,\nMr. Narendra Chaudhary\nChairman : Janhit Group of Institutions",
  },
  principal: {
    name: "Dr. S. N. Yadav",
    role: "Principal",
    institution: "Janhit College of Law Greater Noida",
    quote:
      "The study of law is not merely about understanding legal provisions; it is about developing a deep sense of justice, ethics, and social responsibility. The legal profession is one of the most respected fields, and its role in shaping a fair and just society cannot be overstated.",
    paragraphs: [
      "The study of law is not merely about understanding legal provisions; it is about developing a deep sense of justice, ethics, and social responsibility. The legal profession is one of the most respected fields, and its role in shaping a fair and just society cannot be overstated. At Janhit College of Law, we are committed to nurturing future legal professionals, advocates, academicians, and judicial officers who uphold the values of justice and integrity.",
      "With the growing demand for skilled legal professionals, it is essential that students receive a well-rounded education that balances legal theory, practical training, and moral values. Our curriculum is designed to provide students with a comprehensive understanding of law, while moot court sessions, legal aid initiatives, internships, and research projects offer valuable hands-on experience in real-world legal scenarios.",
      "At Janhit College of Law, we believe that law and morality go hand in hand. The principles of Natural Justice, the Rule of Law, and Constitutional Morality should not only be learned but also practised in everyday life. The ultimate purpose of law is to bring about socio-legal reforms, and our institution strives to prepare students to contribute meaningfully to this cause.",
      "We take pride in providing a stimulating academic environment supported by highly qualified faculty, modern infrastructure, and strong professional connections. Our students have opportunities to undertake internships and receive training with reputed law firms, corporate houses, the judiciary, government departments, and NGOs. We also encourage active participation in moot court competitions, legal conferences, debates, and community service programmes, helping students develop into well-rounded professionals ready to excel in the legal field.",
      "As Principal of Janhit College of Law, my mission is to instil in our students a deep sense of dedication, ethical responsibility, and commitment to excellence. I warmly welcome you to embark on this transformative journey with us, where education goes beyond the classroom and prepares you to become a professional who stands for truth, justice, and progress.",
      "I wish you every success in your academic journey at Janhit College of Law and in all your future endeavours.",
    ],
    signOff: "Dr. S. N. Yadav\nPrincipal : Janhit College of Law Greater Noida",
  },
};

export const ANNOUNCEMENTS: string[] = [];

export interface StakeholderSection {
  id: "student" | "college" | "university";
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  points: { title: string; desc: string }[];
  quickActions: { label: string; href: string }[];
}

export const STAKEHOLDERS_DATA: StakeholderSection[] = [
  {
    id: "student",
    title: "Student Stakeholders",
    badge: "Empowering Jurists",
    subtitle: "Comprehensive Courtroom Training & Academic Excellence",
    description:
      "Our students receive 360-degree legal mentorship combining classroom jurisprudence with real-world courtroom advocacy, mooting skills, and social legal responsibility.",
    points: [
      {
        title: "Dedicated Replica Moot Court",
        desc: "Regular inter-semester trials, memorial drafting, and national moot courtroom competitions.",
      },
      {
        title: "Free Legal Aid Clinic (DLSA)",
        desc: "Active participation in community legal consultation drives in association with District Legal Services Authority.",
      },
      {
        title: "Chamber & Court Internships",
        desc: "Structured internship attachments with Delhi High Court chambers, District Courts, and corporate legal wings.",
      },
      {
        title: "Rich Law Library & Electronic Databases",
        desc: "Access to over 10,000 legal volumes, SCC Online, AIR manual, Bare Acts, and international law journals.",
      },
      {
        title: "Judicial & Civil Services Guidance",
        desc: "Specialized weekend guest sessions by sitting advocates and former judges for competitive exam preparation.",
      },
      {
        title: "Anti-Ragging & Student Grievance Cells",
        desc: "Zero-tolerance anti-ragging measures and 24x7 grievance redressal mechanisms ensuring safety.",
      },
    ],
    quickActions: [
      { label: "Apply Online", href: "/admissions" },
      { label: "Download Syllabus", href: "/downloads" },
      { label: "Moot Court Society", href: "/committees" },
      { label: "Academic Calendar", href: "/academic-calendar" },
    ],
  },
  {
    id: "college",
    title: "College & Faculty Stakeholders",
    badge: "Academic Governance",
    subtitle: "Pedagogical Excellence, IQAC & Research Culture",
    description:
      "Our faculty members and administrators uphold rigorous academic governance, continuous curriculum enrichment, and transparent institutional management.",
    points: [
      {
        title: "Distinguished Law Faculty",
        desc: "Eminent academicians, doctorate holders in Constitutional & Criminal law, and practicing legal writers.",
      },
      {
        title: "Internal Quality Assurance Cell (IQAC)",
        desc: "Continuous evaluation of teaching methodologies, feedback systems, and institutional benchmarks.",
      },
      {
        title: "Research & Faculty Development (FDP)",
        desc: "Regular national seminars, legal symposia, and publication of peer-reviewed articles.",
      },
      {
        title: "Mandatory Public Disclosures",
        desc: "Transparent institutional compliance, audited infrastructure reports, and statutory declarations.",
      },
      {
        title: "Campus Infrastructure & Technology",
        desc: "Smart Wi-Fi enabled lecture rooms, seminar halls, computerized laboratories, and conference halls.",
      },
      {
        title: "Active Institutional Committees",
        desc: "Equal Opportunity Cell, Internal Complaints Committee (ICC), and Proctorial Board maintaining decorum.",
      },
    ],
    quickActions: [
      { label: "Faculty Directory", href: "/faculty" },
      { label: "College Committees", href: "/committees" },
      { label: "Infrastructure", href: "/infrastructure" },
      { label: "Mandatory Disclosures", href: "/students-corner?tab=disclosure" },
    ],
  },
  {
    id: "university",
    title: "University & Regulatory Stakeholders",
    badge: "Regulatory Standards",
    subtitle: "CCSU Meerut Affiliation & Bar Council of India Approvals",
    description:
      "Janhit College of Law operates in strict compliance with the statutory standards established by regulatory bodies and Chaudhary Charan Singh University.",
    points: [
      {
        title: "Bar Council of India (BCI) Approved",
        desc: "Statutory recognition and approved seat intake for 5-Year Integrated B.A.LL.B and 3-Year LL.B degrees.",
      },
      {
        title: "Affiliated to CCS University, Meerut",
        desc: "Curriculum, examination conduct, degree award, and academic regulations governed by state university statutes.",
      },
      {
        title: "Adherence to UGC & NCTE Norms",
        desc: "Full conformity with higher education regulatory benchmarks, teacher-student ratios, and library standards.",
      },
      {
        title: "University Examination & Results Portal",
        desc: "Timely form submissions, admit cards issuance, and university exam centers coordination.",
      },
      {
        title: "Periodic Inspection & Compliance Reports",
        desc: "Up-to-date compliance reports submitted to regulatory councils, state education department, and CCSU.",
      },
      {
        title: "Statutory Code of Conduct",
        desc: "Implementation of statutory regulations protecting equity, inclusive education, and professional ethics.",
      },
    ],
    quickActions: [
      { label: "BCI Approval Letters", href: "/students-corner?tab=affiliation" },
      { label: "CCSU Affiliation Docs", href: "/students-corner?tab=affiliation" },
      { label: "Fee & Ordinance Details", href: "/downloads" },
      { label: "University Exam Updates", href: "/downloads" },
    ],
  },
];

export interface NewsItem {
  id: string;
  title: string;
  category: "Moot Court" | "Legal Aid" | "Academic" | "Guest Lecture" | "Admissions";
  date: string;
  readTime: string;
  summary: string;
  content: string;
  badge?: string;
  location?: string;
  subcategories?: string;
}

export const NEWS_LIST: NewsItem[] = [];

export interface NoticeItem {
  id: string;
  circularNo: string;
  title: string;
  department: string;
  date: string;
  category: "Exams" | "Admissions" | "Academic" | "General";
  isUrgent?: boolean;
  fileUrl?: string;
}

export const NOTICES_LIST: NoticeItem[] = [];

export interface UpcomingEvent {
  id: string;
  title: string;
  day: string;
  month: string;
  year: string;
  time: string;
  venue: string;
  category: string;
  description: string;
  badge?: string;
}

export const UPCOMING_EVENTS: UpcomingEvent[] = [];

export interface QuickLinkItem {
  title: string;
  desc: string;
  href: string;
  iconName:
    | "GraduationCap"
    | "FileText"
    | "DollarSign"
    | "Calendar"
    | "Download"
    | "ShieldCheck"
    | "Phone"
    | "Scale"
    | "Briefcase";
  badge?: string;
}

export const QUICK_LINKS: QuickLinkItem[] = [
  {
    title: "Apply for Admission 2026-27",
    desc: "Online application form, eligibility guidelines, and document submission",
    href: "/admissions",
    iconName: "GraduationCap",
    badge: "Open Now",
  },
  {
    title: "B.A.LL.B (5 Years Program)",
    desc: "Integrated undergraduate legal program curriculum & career prospectus",
    href: "/courses",
    iconName: "Scale",
  },
  {
    title: "LL.B (3 Years Program)",
    desc: "Graduate law degree focusing on litigation, corporate law & judiciary",
    href: "/courses",
    iconName: "FileText",
  },
  {
    title: "Fee Structure & Scholarships",
    desc: "Tuition fees governed by CCSU & NCTE rules with merit fee concessions",
    href: "/downloads",
    iconName: "DollarSign",
  },
  {
    title: "Academic Calendar & Exams",
    desc: "Semester timeline, internal moot rounds, vacations, and exam slots",
    href: "/academic-calendar",
    iconName: "Calendar",
  },
  {
    title: "Download Syllabus & Forms",
    desc: "Official course structures, syllabus PDFs, and scholarship applications",
    href: "/downloads",
    iconName: "Download",
  },
  {
    title: "Career & Current Openings",
    desc: "Faculty recruitment, moot court trainer, law librarian, and academic staff openings",
    href: "/career",
    iconName: "Briefcase",
    badge: "Hiring",
  },
  {
    title: "Mandatory Disclosures & BCI",
    desc: "BCI recognition letters, university affiliation orders & public transparency",
    href: "/students-corner?tab=disclosure",
    iconName: "ShieldCheck",
  },
  {
    title: "Campus Helpdesk & Contact",
    desc: "Admission cell phone numbers, location map, and direct inquiry support",
    href: "/contact",
    iconName: "Phone",
  },
];

export interface FallbackGalleryItem {
  id: string;
  title: string;
  category: "Moot Court" | "Campus Life" | "Academics" | "Events" | "Facilities";
  imageUrl: string;
  date?: string;
}

export const FALLBACK_GALLERY_PHOTOS: FallbackGalleryItem[] = [
  {
    id: "g-1",
    title: "State-of-the-Art Replica Moot Court Hall",
    category: "Moot Court",
    imageUrl: galleryClassroom,
    date: "Session 2026",
  },
  {
    id: "g-2",
    title: "Comprehensive Central Law Library & Research Room",
    category: "Facilities",
    imageUrl: galleryLibrary,
    date: "Knowledge Park-1",
  },
  {
    id: "g-3",
    title: "Legal Aid & Cyber Law Laboratory",
    category: "Academics",
    imageUrl: galleryLab,
    date: "Greater Noida",
  },
  {
    id: "g-4",
    title: "Annual Sports Meet & Athletics Championship",
    category: "Campus Life",
    imageUrl: gallerySports,
    date: "Sports Ground",
  },
  {
    id: "g-5",
    title: "Constitution Day & Law Fest Cultural Celebrations",
    category: "Events",
    imageUrl: galleryCultural,
    date: "Campus Auditorium",
  },
  {
    id: "g-6",
    title: "Convocation & Degree Felicitation Ceremony",
    category: "Events",
    imageUrl: galleryGraduation,
    date: "Convocation Hall",
  },
];

export interface GalleryVideo {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
  description: string;
}

export const GALLERY_VIDEOS: GalleryVideo[] = [
  {
    id: "v-1",
    title: "Campus Virtual Walkthrough & Moot Court Simulation",
    duration: "4:15",
    thumbnail: galleryClassroom,
    youtubeId: "dQw4w9WgXcQ", // Fallback video id
    description: "Explore the modern academic blocks, moot courtroom, and lush green campus in Greater Noida.",
  },
  {
    id: "v-2",
    title: "Highlights of Janhit National Moot Court Competition",
    duration: "6:20",
    thumbnail: galleryLibrary,
    youtubeId: "dQw4w9WgXcQ",
    description: "Watch young student advocates argue constitutional appeals before seasoned high court advocates.",
  },
  {
    id: "v-3",
    title: "Community Outreach & Free Legal Aid Camp Drive",
    duration: "3:45",
    thumbnail: galleryLab,
    youtubeId: "dQw4w9WgXcQ",
    description: "Student advocates in action during community legal literacy drives organized across Gautam Buddha Nagar.",
  },
];
