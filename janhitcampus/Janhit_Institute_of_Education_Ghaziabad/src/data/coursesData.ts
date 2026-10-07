export interface CourseItem {
  id: string;
  slug: string;
  name: string;
  code: string;
  degreeType: "Undergraduate" | "Professional" | "Diploma" | "Teacher Education";
  duration: string;
  eligibility: string;
  affiliation: string;
  approval?: string;
  shortDescription: string;
  fullDescription: string;
  specializations: string[];
  careerOpportunities: string[];
  syllabusOverview: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const COURSES_DATA: CourseItem[] = [
  {
    id: "ba",
    slug: "ba",
    name: "Bachelor of Arts (B.A.)",
    code: "BA",
    degreeType: "Undergraduate",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 (Intermediate) in any stream from a recognized Board with minimum pass marks.",
    affiliation: "Ch. Charan Singh University, Meerut",
    shortDescription:
      "A comprehensive undergraduate program in Humanities and Social Sciences with choices across Literature, Social Studies, and History.",
    fullDescription:
      "The Bachelor of Arts (B.A.) degree program at Janhit Degree College provides a versatile foundation in liberal arts, humanities, and social sciences. Students can choose from a rich bouquet of subjects tailored to build analytical, communication, and research capabilities suited for civil services, academic research, public administration, and media.",
    specializations: [
      "Hindi",
      "English",
      "Economics",
      "Education",
      "Sociology",
      "Political Science",
      "History",
    ],
    careerOpportunities: [
      "Civil Services (UPSC / UPPSC)",
      "Teaching & Academia",
      "Content Writing & Media",
      "Public Relations & NGO Management",
      "Social Work & Public Policy",
    ],
    syllabusOverview: [
      "Language & Literature (Hindi / English)",
      "Ancient, Medieval & Modern Indian History",
      "Indian Political System & International Relations",
      "Sociological Concepts & Social Dynamics",
      "Principles of Micro & Macro Economics",
      "Educational Psychology & System in India",
    ],
    faqs: [
      {
        question: "What subjects are available in B.A. at Janhit Degree College?",
        answer:
          "Students can choose combination of subjects from Hindi, English, Economics, Education, Sociology, Political Science, and History as per CCS University guidelines.",
      },
      {
        question: "Is B.A. eligible for Civil Services exams?",
        answer:
          "Yes, B.A. graduates from Janhit Degree College (affiliated to CCSU Meerut) are eligible for UPSC Civil Services, UPPSC, and all competitive exams.",
      },
    ],
  },
  {
    id: "bba",
    slug: "bba",
    name: "Bachelor of Business Administration (BBA)",
    code: "BBA",
    degreeType: "Professional",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 (Intermediate) in Commerce/Arts/Science with minimum 45% aggregate marks (40% for SC/ST).",
    affiliation: "Ch. Charan Singh University, Meerut",
    shortDescription:
      "Industry-focused management degree cultivating leadership, corporate strategy, marketing, and business analytics skills.",
    fullDescription:
      "The BBA program at Janhit Degree College prepares students for dynamic corporate careers and entrepreneurial ventures. Combining core management principles with practical case studies, group discussions, and industrial exposure, graduates develop executive communication, decision-making, and strategic business capabilities.",
    specializations: [
      "Marketing Management",
      "Financial Management",
      "Human Resource Management",
      "Information Technology in Business",
    ],
    careerOpportunities: [
      "Marketing & Sales Executive",
      "HR Manager / Talent Specialist",
      "Financial Analyst / Relationship Officer",
      "Business Operations Associate",
      "Entrepreneurship & Startup Founder",
    ],
    syllabusOverview: [
      "Principles of Management & Organisational Behaviour",
      "Business Economics & Financial Accounting",
      "Marketing Management & Consumer Behaviour",
      "Human Resource & Industrial Relations",
      "Business Law & Taxation",
      "Strategic Management & Entrepreneurship Project",
    ],
    faqs: [
      {
        question: "Does BBA program include practical exposure?",
        answer:
          "Yes, the BBA curriculum at Janhit includes case studies, industrial visits, personality development workshops, and summer training projects.",
      },
      {
        question: "Can I pursue MBA after BBA?",
        answer:
          "Absolutely! BBA provides the ideal foundational ground for MBA and post-graduate management certifications.",
      },
    ],
  },
  {
    id: "bca",
    slug: "bca",
    name: "Bachelor of Computer Applications (BCA)",
    code: "BCA",
    degreeType: "Professional",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 (Intermediate) with Mathematics/Computer Science/IT with minimum 45% aggregate marks.",
    affiliation: "Ch. Charan Singh University, Meerut",
    shortDescription:
      "Modern computer science & software development program covering programming languages, web technologies, and database management.",
    fullDescription:
      "The Bachelor of Computer Applications (BCA) course equips students with cutting-edge software programming, web architecture, database design, and cloud technologies. Supported by computer labs and practical software development modules, graduates step directly into tech roles or advanced study (MCA/M.Sc IT).",
    specializations: [
      "Software Engineering",
      "Web Application Development",
      "Database Administration",
      "Cyber Security Fundamentals",
    ],
    careerOpportunities: [
      "Software Developer / Programmer",
      "Full Stack Web Developer",
      "Database Administrator (DBA)",
      "System & Network Analyst",
      "IT Project Executive",
    ],
    syllabusOverview: [
      "Programming in C, C++, Java & Python",
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS / SQL)",
      "Web Technologies (HTML, CSS, JavaScript, Web Frameworks)",
      "Computer Networks & Operating Systems",
      "Software Engineering & Capstone Project",
    ],
    faqs: [
      {
        question: "What hardware/software lab facilities are available for BCA students?",
        answer:
          "Janhit Degree College maintains high-speed internet enabled computer labs equipped with modern development tools, compilers, and database management software.",
      },
      {
        question: "Is BCA equivalent to B.Tech for IT job roles?",
        answer:
          "Yes, BCA graduates are widely hired by IT software companies, tech startups, and government IT departments.",
      },
    ],
  },
  {
    id: "bcom",
    slug: "bcom",
    name: "Bachelor of Commerce (B.Com.)",
    code: "B.Com",
    degreeType: "Undergraduate",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 (Intermediate) with Commerce or Science/Arts with minimum pass percentage.",
    affiliation: "Ch. Charan Singh University, Meerut",
    shortDescription:
      "Foundational business, accounting, taxation, auditing, and corporate finance degree for financial domain careers.",
    fullDescription:
      "The B.Com. program at Janhit Degree College develops strong competence in financial accounting, corporate taxation, auditing, business economics, and banking operations. It is the premier choice for students aspiring towards CA, CS, CMA, banking careers, and corporate finance roles.",
    specializations: [
      "Financial Accounting & Auditing",
      "Corporate Taxation & GST",
      "Banking & Insurance",
      "Cost & Management Accounting",
    ],
    careerOpportunities: [
      "Accountant & Tax Consultant",
      "Auditing Assistant",
      "Banking Officer (IBPS/SBI)",
      "Financial Planner / Analyst",
      "Chartered Accountancy (CA) / CS Foundation Aspirant",
    ],
    syllabusOverview: [
      "Financial & Advanced Accounting",
      "Business Regulatory Framework & Company Law",
      "Income Tax Law & Goods and Services Tax (GST)",
      "Corporate Finance & Financial Management",
      "Cost Accounting & Management Accounting",
      "Auditing & Corporate Governance",
    ],
    faqs: [
      {
        question: "Does B.Com course help in preparing for CA or CS?",
        answer:
          "Yes, the B.Com curriculum aligns directly with syllabus topics of CA Foundation/Intermediate and CS Executive examinations.",
      },
    ],
  },
  {
    id: "bed",
    slug: "bed",
    name: "Bachelor of Education (B.Ed.)",
    code: "B.Ed",
    degreeType: "Teacher Education",
    duration: "2 Years (4 Semesters)",
    eligibility: "Graduation or Post-Graduation in any discipline with minimum 50% aggregate marks (45% for SC/ST).",
    affiliation: "Ch. Charan Singh University, Meerut",
    approval: "NCTE, New Delhi",
    shortDescription:
      "NCTE-approved teacher training program empowering future secondary and higher secondary school educators.",
    fullDescription:
      "The B.Ed. program at Janhit Degree College is a flagship NCTE-approved teacher education course designed to cultivate passionate, reflective, and technologically competent educators. The curriculum emphasizes pedagogy, educational psychology, practical teaching internship, assessment techniques, and classroom management.",
    specializations: [
      "Pedagogy of Languages (English / Hindi)",
      "Pedagogy of Social Sciences",
      "Pedagogy of Physical & Biological Sciences",
      "Pedagogy of Mathematics & Commerce",
    ],
    careerOpportunities: [
      "Secondary & Senior Secondary School Teacher (TGT/PGT)",
      "Educational Administrator / Principal",
      "Curriculum Designer & Educational Consultant",
      "Academic Content Specialist",
    ],
    syllabusOverview: [
      "Childhood and Growing Up",
      "Contemporary India and Education",
      "Learning and Teaching Psychology",
      "Pedagogy of School Subjects",
      "Assessment for Learning & Inclusive Education",
      "School Internship & Teaching Practice",
    ],
    faqs: [
      {
        question: "Is B.Ed at Janhit Degree College NCTE approved?",
        answer:
          "Yes, B.Ed. is approved by NCTE, New Delhi and affiliated to Ch. Charan Singh University, Meerut.",
      },
      {
        question: "Does B.Ed include mandatory school teaching practice?",
        answer:
          "Yes, a comprehensive 16-week school internship in recognized schools is an integral part of the B.Ed degree.",
      },
    ],
  },
  {
    id: "deled",
    slug: "deled",
    name: "Diploma in Elementary Education (D.El.Ed. / BTC)",
    code: "D.El.Ed",
    degreeType: "Diploma",
    duration: "2 Years (4 Semesters)",
    eligibility: "Bachelor's Degree in any discipline with minimum 50% marks (45% for reserved categories). Admission via state merit/entrance.",
    affiliation: "PNP UP Allahabad / CCSU Meerut",
    approval: "NCTE, New Delhi",
    shortDescription:
      "NCTE-recognized professional diploma for primary school teaching careers (Class 1 to 5).",
    fullDescription:
      "The Diploma in Elementary Education (D.El.Ed., formerly known as BTC) is a 2-year professional training program qualifying candidates for teaching positions in primary and upper primary schools. Training focuses on child development, foundational literacy, numeracy, and activity-based teaching methods.",
    specializations: [
      "Primary School Pedagogy",
      "Foundational Literacy & Numeracy",
      "Child Psychology & Development",
    ],
    careerOpportunities: [
      "Primary School Teacher (PRT in Govt. / Private Schools)",
      "CTET / UPTET Qualified Primary Educator",
      "Education Project Assistant",
    ],
    syllabusOverview: [
      "Child Development and Learning Process",
      "Teaching Methodology of Language, Math & EVS",
      "Educational Management & Administration",
      "Art, Physical & Work Education",
      "School Internship & Lesson Planning",
    ],
    faqs: [
      {
        question: "What is the eligibility for D.El.Ed (BTC)?",
        answer:
          "Graduation degree in any stream with minimum 50% aggregate marks (45% for SC/ST/OBC).",
      },
    ],
  },
  {
    id: "bped",
    slug: "bped",
    name: "Bachelor of Physical Education (B.P.Ed.)",
    code: "B.P.Ed",
    degreeType: "Teacher Education",
    duration: "2 Years (4 Semesters)",
    eligibility: "Graduation with 50% marks + representation in Sports/Games or B.PE degree with 45% marks.",
    affiliation: "Ch. Charan Singh University, Meerut",
    approval: "NCTE, New Delhi",
    shortDescription:
      "NCTE-approved physical education degree preparing sports coaches, physical instructors, and fitness directors.",
    fullDescription:
      "The B.P.Ed. program at Janhit Degree College provides specialized training in sports sciences, physical fitness, sports psychology, biomechanics, and athletic officiating. Graduates become certified Physical Education Teachers (PET), fitness directors, and sports officers across schools and sports academies.",
    specializations: [
      "Sports Coaching & Officiating",
      "Fitness Training & Kinesiology",
      "Sports Management & Organization",
    ],
    careerOpportunities: [
      "Physical Education Teacher (PET)",
      "Sports Coach & Trainer",
      "Fitness & Wellness Director",
      "Sports Event Organizer / Officiating Referee",
    ],
    syllabusOverview: [
      "History & Principles of Physical Education",
      "Anatomy, Physiology & Exercise Physiology",
      "Kinesiology & Biomechanics in Sports",
      "Sports Training, Coaching & Officiating",
      "Practical Outdoor Games & Athletic Training",
    ],
    faqs: [
      {
        question: "Is physical fitness test required for B.P.Ed admission?",
        answer:
          "Yes, candidates undergo a physical fitness efficiency test as per NCTE and CCS University guidelines.",
      },
    ],
  },
  {
    id: "bsc",
    slug: "bsc",
    name: "Bachelor of Science (B.Sc.)",
    code: "B.Sc",
    degreeType: "Undergraduate",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 (Intermediate) with Science (PCB for Bio, PCM for Maths/Agri) with minimum pass percentage.",
    affiliation: "Ch. Charan Singh University, Meerut",
    shortDescription:
      "Scientifically rigorous undergraduate program across Biology, Mathematics, and Agricultural Sciences.",
    fullDescription:
      "The B.Sc. program at Janhit Degree College offers specialized tracks in Biology (ZBC), Mathematics (PCM), and Agriculture. Combined with well-equipped science laboratories, practical field experiments, and research methodologies, B.Sc prepares students for scientific research, competitive exams, and industrial technology roles.",
    specializations: [
      "B.Sc. Biology (Zoology, Botany, Chemistry)",
      "B.Sc. Mathematics (Physics, Chemistry, Mathematics)",
      "B.Sc. Agriculture (Crop Science, Soil Science, Agronomy)",
    ],
    careerOpportunities: [
      "Scientific Research Assistant",
      "Agricultural Officer / Field Officer",
      "Pathology & Diagnostic Technician",
      "Quality Control Executive in Pharma / Chemical Industry",
      "Higher Studies (M.Sc. / Research / Civil Services)",
    ],
    syllabusOverview: [
      "Botany, Zoology & Bio-Chemistry Fundamentals",
      "Physics, Calculus, Algebra & Differential Equations",
      "Agronomy, Soil Science & Plant Pathology",
      "Organic, Inorganic & Physical Chemistry",
      "Laboratory Practicals & Field Experiments",
    ],
    faqs: [
      {
        question: "What B.Sc subject streams are offered at Janhit Degree College?",
        answer:
          "We offer B.Sc Biology (ZBC), B.Sc Mathematics (PCM), and B.Sc Agriculture tracks under CCS University syllabus.",
      },
    ],
  },
];
