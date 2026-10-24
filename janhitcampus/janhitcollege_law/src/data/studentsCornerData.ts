import {
  FileText,
  ShieldCheck,
  Award,
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  Scale,
  FileCheck,
  Building,
  HelpCircle,
  AlertOctagon,
  Download,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Library,
  HeartHandshake,
  ShieldAlert,
} from "lucide-react";

import baLlbStructurePdf from "@/assets/B.A.LL.B. (Course Structure).pdf";
import baLlbSyllabusPdf from "@/assets/BA-LLB-Syllabus-2026-2027.pdf";
import llbStructurePdf from "@/assets/LL.B. (Course Structure).pdf";
import llbSyllabusPdf from "@/assets/LLB-(course syllabus ) 2026-2027.pdf";

export interface StudentSectionTab {
  id: string;
  tabKey: string;
  label: string;
  shortLabel: string;
  badge: string;
  icon: any;
  description: string;
}

export const STUDENT_SECTIONS: StudentSectionTab[] = [
  {
    id: "public-disclosure",
    tabKey: "disclosure",
    label: "Public Disclosure",
    shortLabel: "Disclosure",
    badge: "Statutory Transparency",
    icon: ShieldCheck,
    description: "Official institutional transparency records, regulatory compliance certificates, and mandatory audits.",
  },
  {
    id: "affiliation",
    tabKey: "affiliation",
    label: "Affiliation - B.A.LL.B., LLB & LL.M.",
    shortLabel: "Affiliation",
    badge: "BCI & CCSU Approved",
    icon: Award,
    description: "Official university affiliations and Bar Council of India recognitions for all law degrees.",
  },
  {
    id: "prospectus",
    tabKey: "prospectus",
    label: "College Prospectus",
    shortLabel: "Prospectus",
    badge: "Brochure 2026-27",
    icon: BookOpen,
    description: "Comprehensive prospectus covering campus facilities, academic programs, faculty, and student life.",
  },
  {
    id: "courses",
    tabKey: "courses",
    label: "Courses / Programs",
    shortLabel: "Courses",
    badge: "UG & PG Degrees",
    icon: GraduationCap,
    description: "In-depth overview of B.A. LL.B., LL.B., and LL.M. curricula, eligibility, intake, and career pathways.",
  },
  {
    id: "syllabus",
    tabKey: "syllabus",
    label: "Syllabus",
    shortLabel: "Syllabus",
    badge: "PDF Downloads",
    icon: FileText,
    description: "Semester-wise syllabus, course structures, and clinical papers approved by CCSU and BCI.",
  },
  {
    id: "code-of-conduct",
    tabKey: "code-of-conduct",
    label: "Code of Conduct",
    shortLabel: "Code of Conduct",
    badge: "Disciplinary Charter",
    icon: ShieldAlert,
    description: "Courtroom decorum, dress code, attendance ordinances, digital etiquette, and anti-ragging mandates.",
  },
  {
    id: "faculty-list",
    tabKey: "faculty-list",
    label: "Faculty List",
    shortLabel: "Faculty",
    badge: "Eminent Jurists",
    icon: Users,
    description: "Directory of qualified legal educators, judicial mentors, and distinguished advocate professors.",
  },
  {
    id: "alumni",
    tabKey: "alumni",
    label: "Alumni Association",
    shortLabel: "Alumni",
    badge: "Global Jurist Network",
    icon: HeartHandshake,
    description: "Alumni brotherhood, mentorship programs, judicial clerkships, and registration portal.",
  },
  {
    id: "rti",
    tabKey: "rti",
    label: "RTI",
    shortLabel: "RTI",
    badge: "Right to Information",
    icon: FileCheck,
    description: "Statutory RTI compliance cell, designated PIO details, Appellate Authority, and filing procedure.",
  },
  {
    id: "academic-calendar",
    tabKey: "academic-calendar",
    label: "Academic Calendar",
    shortLabel: "Calendar",
    badge: "Session 2026-27",
    icon: Calendar,
    description: "Annual schedule of semester lectures, moot court fixtures, exams, clinical camps, and holidays.",
  },
  {
    id: "management",
    tabKey: "management",
    label: "Management Committee",
    shortLabel: "Management",
    badge: "Governing Body",
    icon: Building,
    description: "Executive Management Committee and Governing Trust providing strategic leadership to Janhit College of Law.",
  },
  {
    id: "legal-aid",
    tabKey: "legal-aid",
    label: "Legal Aid (Committee Members)",
    shortLabel: "Legal Aid",
    badge: "DLSA Partner Clinic",
    icon: Scale,
    description: "Free legal aid clinic committee, para-legal volunteers, rural awareness camps, and pro-bono consultations.",
  },
  {
    id: "committees",
    tabKey: "committees",
    label: "Committees",
    shortLabel: "Committees",
    badge: "9 Statutory Bodies",
    icon: HelpCircle,
    description: "All 9 mandatory statutory, academic, and student welfare committees established on campus.",
  },
];

// 1. PUBLIC DISCLOSURE DATA
export const PUBLIC_DISCLOSURE_DOCS = [
  {
    title: "Mandatory Public Disclosures (Session 2026-2027)",
    docNo: "MPD/JCL/2026-27",
    date: "July 2026",
    fileSize: "898 KB",
    category: "Statutory Compliance",
    description: "Comprehensive statutory disclosure covering campus land records, infrastructure carpet area, academic faculty ratios, fire safety, and balance sheets under BCI & UGC rules.",
    fileUrl: llbSyllabusPdf,
    fileName: "Mandatory_Public_Disclosures_2026-27.pdf",
  },
  {
    title: "Bar Council of India (BCI) Recognition & Sanction Order",
    docNo: "BCI/LE/JCL/2026",
    date: "Current Academic Year",
    fileSize: "1.4 MB",
    category: "BCI Statutory Order",
    description: "Official inspection order and certificate of recognition granted by the Legal Education Committee, Bar Council of India, New Delhi.",
    fileUrl: baLlbStructurePdf,
    fileName: "BCI_Recognition_Letter_2026.pdf",
  },
  {
    title: "Chaudhary Charan Singh University Affiliation Sanction",
    docNo: "CCSU/AFF/JCL/2026",
    date: "Academic Session 2026-27",
    fileSize: "1.8 MB",
    category: "University Affiliation",
    description: "Permanent / Continuous university affiliation certification issued by Chaudhary Charan Singh University, Meerut for Law programs (College Code 969).",
    fileUrl: baLlbSyllabusPdf,
    fileName: "CCSU_Affiliation_Extension_2026.pdf",
  },
  {
    title: "All India Survey on Higher Education (AISHE) Certificate",
    docNo: "AISHE/C-46134/2026",
    date: "MHRD / MoE Portal",
    fileSize: "450 KB",
    category: "Ministry of Education",
    description: "Statutory institutional registration under AISHE Code C-46134, Ministry of Education, Government of India.",
    fileUrl: llbStructurePdf,
    fileName: "AISHE_Certificate_C46134.pdf",
  },
  {
    title: "Land & Campus Infrastructure Compliance Certificate",
    docNo: "JCL/GN/EST/2026",
    date: "Annual Survey",
    fileSize: "620 KB",
    category: "Estate & Safety",
    description: "Certified municipal plan, non-encumbrance title deed, fire safety clearance, and barrier-free Divyangjan infrastructure compliance.",
    fileUrl: baLlbStructurePdf,
    fileName: "Infrastructure_Safety_Compliance.pdf",
  },
];

// 2. AFFILIATION DATA
export const AFFILIATION_DATA = [
  {
    courseName: "B.A. LL.B. (5-Year Integrated Honors)",
    degreeType: "Undergraduate Integrated Professional Law Degree",
    sanctionedIntake: "120 Seats (2 Sections of 60)",
    affiliatedUniversity: "Chaudhary Charan Singh (CCS) University, Meerut",
    collegeCode: "969",
    statutoryApproval: "Bar Council of India (BCI), New Delhi",
    bciOrderNo: "BCI:D:LE:2026/AFF-JCL",
    validity: "Recognized & Approved for Session 2026-2027",
    status: "Active & Accredited",
    eligibility: "10+2 / Intermediate in any stream with min 45% (Gen), 42% (OBC), 40% (SC/ST)",
  },
  {
    courseName: "LL.B. (3-Year Professional Course)",
    degreeType: "Graduate Professional Law Degree",
    sanctionedIntake: "120 Seats (2 Sections of 60)",
    affiliatedUniversity: "Chaudhary Charan Singh (CCS) University, Meerut",
    collegeCode: "969",
    statutoryApproval: "Bar Council of India (BCI), New Delhi",
    bciOrderNo: "BCI:D:LE:2026/REG-JCL",
    validity: "Recognized & Approved for Session 2026-2027",
    status: "Active & Accredited",
    eligibility: "Bachelor's Degree in any discipline with min 45% (Gen), 42% (OBC), 40% (SC/ST)",
  },
  {
    courseName: "LL.M. (2-Year Master of Laws)",
    degreeType: "Postgraduate Master of Laws Degree",
    sanctionedIntake: "60 Seats",
    affiliatedUniversity: "Chaudhary Charan Singh (CCS) University, Meerut",
    collegeCode: "969",
    statutoryApproval: "Approved under CCSU Meerut / State Higher Education Norms",
    bciOrderNo: "CCSU/PG-LAW/2026",
    validity: "Approved for Session 2026-2027",
    status: "Active & Accredited",
    eligibility: "LL.B. (3-Year) or B.A. LL.B. (5-Year) with minimum 50% aggregate marks",
  },
];

// 3. PROSPECTUS HIGHLIGHTS
export const PROSPECTUS_DETAILS = {
  session: "Academic Session 2026 - 2027",
  title: "Official Information Brochure & College Prospectus",
  pagesCount: "48 Pages Comprehensive Booklet",
  format: "High-Resolution PDF (6.2 MB)",
  highlights: [
    { title: "Institutional Heritage & Vision", desc: "Foundational philosophy of Janhit Educational Trust promoting accessible legal education and social justice since inception." },
    { title: "Bar Council of India Approved Curricula", desc: "Detailed breakdown of substantive jurisprudence, clinical education, courtroom mooting, and legal drafting." },
    { title: "Moot Court Hall & Cyber Law Lab", desc: "Air-conditioned replica courtroom with digital audio-video recording for trial advocacy drills and client counseling." },
    { title: "Rich Law Library & Electronic Databases", desc: "25,000+ legal volumes, All India Reporter (AIR 1950-Present), SCC, SCR, and online subscriptions to SCC Online & Manupatra." },
    { title: "Internship & Placement Cell", desc: "Structured chamber attachments with Senior Advocates of Delhi High Court & Supreme Court, Tier-1 corporate law firms, and NGOs." },
    { title: "Fee Structure & Scholarships", desc: "Transparent fee regulations, easy installment facilities, and full guidance for UP Post-Matric Social Welfare Scholarships." },
  ],
};

// 4. COURSES / PROGRAMS DETAILED
export const COURSES_DATA = [
  {
    id: "ballb",
    name: "B.A. LL.B. (5-Year Integrated)",
    duration: "5 Academic Years (10 Semesters)",
    seats: "120 Seats",
    affiliation: "Chaudhary Charan Singh University & Bar Council of India",
    eligibility: "Passed 10+2 or equivalent examination in Arts, Science, or Commerce with 45% for General, 42% for OBC, and 40% for SC/ST.",
    overview:
      "A flagship dual-degree integrated program tailored for ambitious high school graduates. The curriculum fuses political science, sociology, history, and economics with substantive law, courtroom simulations, and mandatory legal aid field training.",
    highlights: [
      "Direct entry right after 12th grade, saving one valuable academic year",
      "Rigorous training in Constitutional, Criminal, Corporate, and International Jurisprudence",
      "Mandatory 20 weeks of courtroom, chamber, and NGO internships across 5 years",
      "Intensive practical training in Memorial Drafting, Client Counseling, and Trial Advocacy",
      "Qualifies graduates to enroll as Advocates with any State Bar Council across India",
    ],
    careerOpportunities: [
      "Advocate in High Courts & Supreme Court of India",
      "Judicial Magistrate / Civil Judge (PCS-J Exams)",
      "Corporate Legal Counsel & Compliance Officer in MNCs",
      "Public Prosecutor & Government Law Officer",
      "Civil Services (IAS, IPS, State Administration)",
    ],
    pdfDownload: baLlbStructurePdf,
    pdfName: "B.A. LL.B. Course Structure.pdf",
  },
  {
    id: "llb",
    name: "LL.B. (3-Year Professional)",
    duration: "3 Academic Years (6 Semesters)",
    seats: "120 Seats",
    affiliation: "Chaudhary Charan Singh University & Bar Council of India",
    eligibility: "Graduation in any discipline (B.A., B.Sc., B.Com., B.Tech, etc.) with 45% for General, 42% for OBC, and 40% for SC/ST.",
    overview:
      "An intensive 3-year professional graduate program designed for graduates wanting to transition into active litigation, corporate advisory, arbitration, and the judiciary with immediate procedural readiness.",
    highlights: [
      "Accelerated, practice-oriented curriculum focused on substantive and procedural laws",
      "Detailed study of Civil Procedure Code (CPC), Criminal Procedure (BNSS), and Law of Evidence (BSA)",
      "Mandatory 12 weeks of structured legal internships in chambers and judicial forums",
      "Active engagement in District Legal Services Authority (DLSA) legal awareness camps",
      "Intensive drafting of plaints, written statements, conveyancing deeds, and writ petitions",
    ],
    careerOpportunities: [
      "Litigation Specialist in Civil, Criminal, Taxation, and Labour Courts",
      "State Judicial Magistrate / Munsif Magistrate",
      "Law Officer in Nationalized Banks, PSUs, and Financial Institutions",
      "Legal Advisor for Real Estate, Infrastructure, and Industrial Conglomerates",
      "Arbitrator, Mediator, and Alternative Dispute Resolution (ADR) Professional",
    ],
    pdfDownload: llbStructurePdf,
    pdfName: "LL.B. Course Structure.pdf",
  },
  {
    id: "llm",
    name: "LL.M. (2-Year Master of Laws)",
    duration: "2 Academic Years (4 Semesters)",
    seats: "60 Seats",
    affiliation: "Chaudhary Charan Singh University / State Higher Education",
    eligibility: "LL.B. (3-Year) or B.A. LL.B. (5-Year) with minimum 50% aggregate marks from a BCI-recognized law school.",
    overview:
      "An advanced postgraduate law degree cultivating scholarly jurisprudence, comparative constitutional research, corporate transaction analysis, and pedagogical readiness for aspiring law professors and higher judicial aspirants.",
    highlights: [
      "Specializations in Constitutional & Administrative Law, Corporate & Commercial Law, Criminal Law",
      "In-depth research methodology with mandatory Master's Dissertation under faculty mentors",
      "Classroom teaching apprenticeship and legal pedagogy training",
      "Exploration of contemporary frontiers: AI & Jurisprudence, Cyber Crime, IPR, and Green Tribunals",
      "Direct preparation for UGC-NET / JRF and Higher Judicial Services (District Judge Cadre)",
    ],
    careerOpportunities: [
      "Assistant Professor / Dean of Law in State and Private Universities",
      "Higher Judicial Services (Direct District Judge Cadre)",
      "Senior Research Fellow at National Law Institutes and Public Policy Think Tanks",
      "Specialized Mergers & Acquisitions and Corporate Legal Consultant",
      "Empanelled Legal Specialist for Statutory Commissions and Tribunals",
    ],
    pdfDownload: null,
    pdfName: null,
  },
];

// 5. SYLLABUS DATA
export const SYLLABUS_DOCS = [
  {
    courseTitle: "B.A. LL.B. (5-Year Integrated Course Structure)",
    program: "B.A. LL.B.",
    semesters: "Semesters I to X",
    fileSize: "215 KB",
    fileName: "B.A.LL.B. (Course Structure).pdf",
    fileUrl: baLlbStructurePdf,
    description: "Official CCS University semester-wise credit layout, distribution of liberal arts subjects, core law papers, and clinical practical modules.",
  },
  {
    courseTitle: "B.A. LL.B. Complete Academic Syllabus (2026-2027)",
    program: "B.A. LL.B.",
    semesters: "Semesters I to X Detailed Topics",
    fileSize: "1.8 MB",
    fileName: "BA-LLB-Syllabus-2026-2027.pdf",
    fileUrl: baLlbSyllabusPdf,
    description: "Full syllabus textbook citations, landmark Supreme Court case laws, unit-wise topic lists, and clinical examination guidelines.",
  },
  {
    courseTitle: "LL.B. (3-Year Professional Course Structure)",
    program: "LL.B.",
    semesters: "Semesters I to VI",
    fileSize: "252 KB",
    fileName: "LL.B. (Course Structure).pdf",
    fileUrl: llbStructurePdf,
    description: "Course architecture, evaluation schemes, internal assessment marks distribution, and Bar Council of India mandatory practical papers.",
  },
  {
    courseTitle: "LL.B. Complete Academic Syllabus (2026-2027)",
    program: "LL.B.",
    semesters: "Semesters I to VI Detailed Topics",
    fileSize: "898 KB",
    fileName: "LLB-(course syllabus ) 2026-2027.pdf",
    fileUrl: llbSyllabusPdf,
    description: "Comprehensive subject syllabi covering substantive laws, procedural codes, Moot Court exercises, drafting, pleading, and conveyancing.",
  },
  {
    courseTitle: "LL.M. Master of Laws Research Curriculum Outline",
    program: "LL.M.",
    semesters: "Semesters I to IV",
    fileSize: "410 KB",
    fileName: "LLM_Curriculum_Outline_2026.pdf",
    fileUrl: baLlbStructurePdf,
    description: "Advanced jurisprudence, comparative public law, research methodology, elective legal streams, and Master's dissertation framework.",
  },
];

// 6. CODE OF CONDUCT
export const CODE_OF_CONDUCT_RULES = [
  {
    title: "1. Attendance & Examination Ordinance",
    badge: "BCI Rule 12 Mandate",
    rules: [
      "Every registered law student must maintain a minimum aggregate attendance of 75% in all lectures, tutorials, and practical court exercises.",
      "As per Bar Council of India Rule 12 and CCS University regulations, students falling below 75% attendance are strictly debarred from appearing in end-semester exams.",
      "Medical leaves (up to a maximum relaxation of 10%) require timely submission of hospital discharge summaries and proctorial approval within 7 days of illness.",
      "Internal continuous assessments (20/30 marks) evaluate class attendance, mock court advocacy, research submissions, and viva voce.",
    ],
  },
  {
    title: "2. Advocate Court Uniform & Professional Decorum",
    badge: "Mandatory Dress Code",
    rules: [
      "Male Students: Crisp white formal full-sleeve shirt, black tailored formal trousers, black blazer / black coat, black tie, and polished black formal shoes.",
      "Female Students: White salwar-kameez with white dupatta or white formal shirt with black trousers, black blazer / black coat, and formal black footwear.",
      "Wearing advocate uniform is strictly compulsory on all designated uniform days, during Moot Court hall sessions, court visits, and semester examinations.",
      "Casual garments such as jeans, round-neck T-shirts, athletic trackpants, and slippers are strictly prohibited within the academic blocks.",
    ],
  },
  {
    title: "3. Zero-Tolerance Anti-Ragging Policy",
    badge: "Non-Bailable Offense",
    rules: [
      "Janhit College of Law maintains an uncompromising zero-tolerance stance against any form of ragging, teasing, bullying, or intimidatory conduct.",
      "Ragging is a cognizable criminal offense punishable under UGC Regulations and Supreme Court orders with immediate expulsion, degree cancellation, and FIR registration.",
      "Anti-Ragging Flying Squads conduct unannounced vigilance rounds across campus corridors, canteens, hostels, and bus terminals.",
      "24x7 Anti-Ragging Emergency Helpline: 1800-180-5522 | Campus Proctorial Cell: 9313402015.",
    ],
  },
  {
    title: "4. Campus Discipline & Digital Library Hygiene",
    badge: "Institutional Decorum",
    rules: [
      "College Identity Cards must be visibly displayed around the neck at all times. Entry without ID card is strictly denied by campus security.",
      "Mobile phones must be switched to silent mode inside lecture halls, the Moot Court, and the Law Library. Phone conversations in corridors are prohibited.",
      "Smoking, consumption of alcohol, narcotics, or gutkha/pan masala inside the campus is strictly prohibited and subject to immediate police reporting and expulsion.",
      "Vandalism or defacement of college furniture, library volumes, legal journals, or IT infrastructure attracts severe financial penalties and suspension.",
    ],
  },
];

// 7. FACULTY LIST
export const FACULTY_MEMBERS = [
  {
    name: "Dr. S. N. Yadav",
    role: "Principal & Professor of Law",
    department: "Department of Legal Studies",
    qualification: "Ph.D. in Law, LL.M. (Gold Medalist), LL.B.",
    experience: "22+ Years in Legal Academia & Administrative Leadership",
    specialization: "Constitutional Jurisprudence, Administrative Law & Clinical Advocacy",
    email: "principal.law@janhitgroup.com",
    status: "Head of Institution",
  },
  {
    name: "Ms. Priyanka Chaudhary",
    role: "Assistant Professor & Academic Coordinator",
    department: "Department of Criminal & Family Jurisprudence",
    qualification: "LL.M., UGC-NET Qualified, B.A. LL.B.",
    experience: "8+ Years of Teaching & Moot Court Mentorship",
    specialization: "Criminal Procedure (BNSS), Family Laws, Gender Studies & Human Rights",
    email: "priyanka.law@janhitgroup.com",
    status: "Convener - GRC & ICC",
  },
  {
    name: "Ms. Neha Dwivedi",
    role: "Assistant Professor & Legal Aid Director",
    department: "Department of Environmental & Civil Law",
    qualification: "LL.M., UGC-NET Qualified, LL.B.",
    experience: "7+ Years in Clinical Legal Education & DLSA Coordination",
    specialization: "Law of Torts, Consumer Protection, Environmental Jurisprudence & ADR",
    email: "neha.law@janhitgroup.com",
    status: "In-Charge - Free Legal Aid Clinic",
  },
  {
    name: "Dr. R. K. Sharma",
    role: "Associate Professor of Law",
    department: "Department of Corporate & Commercial Jurisprudence",
    qualification: "Ph.D. in Law, LL.M. (Corporate Law), M.Com., LL.B.",
    experience: "15+ Years in Corporate Law & Research Publications",
    specialization: "Company Law, Banking & Insurance Law, Commercial Arbitration & Competition Act",
    email: "rksharma.law@janhitgroup.com",
    status: "Senior Research Mentor",
  },
  {
    name: "Mr. Ankit Verma",
    role: "Assistant Professor of Law",
    department: "Department of Cyber Law & IPR",
    qualification: "LL.M. (Cyber Laws), UGC-NET Qualified, B.Tech, LL.B.",
    experience: "6+ Years of Teaching & Cyber Forensics Training",
    specialization: "Information Technology Act, Intellectual Property Rights, AI Ethics & Data Privacy",
    email: "ankit.law@janhitgroup.com",
    status: "Faculty In-Charge - Cyber Law Society",
  },
  {
    name: "Ms. Shweta Singh",
    role: "Assistant Professor of Law",
    department: "Department of Procedural Jurisprudence",
    qualification: "LL.M., UGC-NET Qualified, LL.B.",
    experience: "5+ Years of Procedural Drafting & Litigation Training",
    specialization: "Civil Procedure Code (CPC), Law of Evidence (BSA), Pleadings & Conveyancing",
    email: "shweta.law@janhitgroup.com",
    status: "Faculty Mentor - Moot Court Society",
  },
  {
    name: "Dr. Arvind Kumar",
    role: "Assistant Professor of Jurisprudence",
    department: "Department of Public International Law",
    qualification: "Ph.D. in International Law, LL.M., LL.B.",
    experience: "10+ Years in International Treaty Law & Human Rights",
    specialization: "Public International Law, Humanitarian Law, Labour Codes & Jurisprudence",
    email: "arvind.law@janhitgroup.com",
    status: "Coordinator - IQAC",
  },
  {
    name: "Adv. Rajesh Pathak",
    role: "Adjunct Professor & Senior Litigation Mentor",
    department: "Litigation Practice & Trial Advocacy Cell",
    qualification: "LL.M., Senior Practicing Advocate (Allahabad High Court & Supreme Court)",
    experience: "18+ Years Active Court Practice",
    specialization: "Constitutional Writs, Criminal Trial Advocacy & Cross-Examination Techniques",
    email: "litigation.mentor@janhitgroup.com",
    status: "Visiting Jurist Panel",
  },
];

// 8. ALUMNI ASSOCIATION
export const ALUMNI_INFO = {
  associationName: "Janhit College of Law Alumni Association (JCLAA)",
  registeredUnder: "Societies Registration Act & Janhit Educational Trust",
  membershipCount: "1,850+ Registered Law Alumni",
  overview:
    "The Janhit College of Law Alumni Association serves as an unbroken professional bridge between practicing jurists, judicial officers, corporate leaders, and the current batches of aspiring law students.",
  notableSectors: [
    { title: "Judicial Services", count: "35+ Judges & Magistrates", desc: "Serving in State Judicial Services across Uttar Pradesh, Delhi, Bihar, and Haryana." },
    { title: "High Courts & Supreme Court", count: "450+ Active Advocates", desc: "Litigation specialists, arguing counsel, and chamber juniors in premier appellate benches." },
    { title: "Corporate & Law Firms", count: "320+ Legal Associates", desc: "Working in Big-4 corporate advisory, leading law firms, and tech conglomerate compliance desks." },
    { title: "Public Sector & PSUs", count: "110+ Law Officers", desc: "Serving nationalized banks, state oil corporations, DLSA, and public prosecution departments." },
  ],
  activities: [
    "Annual Alumni Jurists Conclave & Mentorship Roundtable",
    "One-on-one judicial preparation mentoring for PCS-J and APO aspirants",
    "Chamber attachment referrals and internship placements for final-year students",
    "Presiding as external judges for National Moot Court and Client Counseling competitions",
  ],
};

// 9. RTI (RIGHT TO INFORMATION)
export const RTI_DETAILS = {
  actName: "Right to Information Act, 2005 (Statutory Disclosure under Section 4(1)(b))",
  complianceStatement:
    "In accordance with the statutory mandates of the Right to Information Act, 2005, Janhit College of Law ensures total institutional transparency, public accountability, and prompt dissemination of verifiable administrative information to citizens of India.",
  officers: [
    {
      role: "Public Information Officer (PIO)",
      name: "Registrar / Administrative Officer",
      designation: "Public Information Officer, Janhit College of Law",
      address: "Administrative Block, Plot No. 35, Knowledge Park - 1, Greater Noida, U.P. - 201307",
      phone: "+91 9313402015 / 9560614440",
      email: "rti@janhitgroup.com",
      responsibilities: "Receives initial RTI applications, initiates file verifications, and dispatches statutory replies within 30 days.",
    },
    {
      role: "First Appellate Authority (FAA)",
      name: "Dr. S. N. Yadav",
      designation: "Principal & Head of Institution, Janhit College of Law",
      address: "Office of the Principal, Janhit College of Law, Knowledge Park - 1, Greater Noida - 201307",
      phone: "+91 9313402015",
      email: "principal.law@janhitgroup.com",
      responsibilities: "Adjudicates first appeals filed by applicants aggrieved by PIO decisions within statutory 30-45 day timelines.",
    },
  ],
  procedure: [
    "Written application addressed to the Public Information Officer (PIO) with clear statement of information requested.",
    "Application fee of ₹10 payable via Indian Postal Order (IPO), Demand Draft, or cash receipt at the college accounts desk.",
    "Statutory response timeline: 30 days from date of receipt (or 48 hours in cases involving life or liberty).",
    "Right to First Appeal: May be preferred before the First Appellate Authority within 30 days of the PIO order.",
  ],
};

// 10. ACADEMIC CALENDAR
export const ACADEMIC_CALENDAR_EVENTS = [
  {
    phase: "Odd Semester Phase (Semesters I, III, V, VII, IX)",
    duration: "August 2026 – December 2026",
    milestones: [
      { month: "August 2026", event: "Induction Ceremony & Bar Council Orientation for New Batches" },
      { month: "September 2026", event: "Intra-College Moot Court Trials & DLSA Legal Literacy Camp" },
      { month: "October 2026", event: "Mid-Term Sessional Tests & Clinical Memorial Submissions" },
      { month: "November 2026", event: "National Seminar on Constitutional Jurisprudence & Guest Lectures" },
      { month: "December 2026", event: "CCSU Meerut Odd Semester Theory & Practical University Examinations" },
    ],
  },
  {
    phase: "Even Semester Phase (Semesters II, IV, VI, VIII, X)",
    duration: "January 2027 – June 2027",
    milestones: [
      { month: "January 2027", event: "Commencement of Even Semester Classes & Winter Internship Debrief" },
      { month: "February 2027", event: "Janhit National Moot Court Competition (NMCC 2027)" },
      { month: "March 2027", event: "Annual Law Fest 'Lex Fiesta 2027' & Court Observation Diary Submissions" },
      { month: "April 2027", event: "Pre-University Preparatory Tests & Practical Viva-Voce" },
      { month: "May – June 2027", event: "CCSU Meerut Even Semester University Examinations & Summer Chamber Recess" },
    ],
  },
];

// 11. MANAGEMENT COMMITTEE
export const MANAGEMENT_COMMITTEE_MEMBERS = [
  {
    name: "Mr. Narendra Chaudhary",
    designation: "Chairman",
    body: "Janhit Educational Trust & Governing Body",
    qualification: "Visionary Educationist & Philanthropist",
    profile: "Steering institutional policy, state-of-the-art infrastructure development, and scholarship funds for deserving students.",
  },
  {
    name: "Dr. S. N. Yadav",
    designation: "Principal & Member Secretary",
    body: "Executive Management & Directorate",
    qualification: "Ph.D. in Law, LL.M., LL.B.",
    profile: "Executive academic head overseeing BCI affiliations, CCSU university liaison, faculty appointments, and student welfare.",
  },
  {
    name: "Mr. Amit Chaudhary",
    designation: "Vice Chairman & Managing Trustee",
    body: "Board of Trustees",
    qualification: "MBA, Legal Administrator",
    profile: "Supervising campus operations, smart infrastructure deployment, IT digitization, and university tie-ups.",
  },
  {
    name: "Smt. Sunita Chaudhary",
    designation: "Trustee Member",
    body: "Board of Trustees",
    qualification: "Educationist & Social Worker",
    profile: "Focusing on women empowerment in legal education, equal opportunity initiatives, and campus welfare facilities.",
  },
  {
    name: "Prof. (Dr.) K. N. Kapoor",
    designation: "University Nominee / Academic Advisor",
    body: "Academic Advisory Council",
    qualification: "Former Dean & Professor of Law, CCSU Meerut",
    profile: "Ensuring curricular rigor, university ordinance compliance, and continuous academic benchmark enhancements.",
  },
  {
    name: "Senior Adv. J. P. Sharma",
    designation: "Legal Luminary & Bar Nominee",
    body: "Advisory Council",
    qualification: "Senior Advocate, High Court of Allahabad",
    profile: "Guiding courtroom practical training, high court chamber internships, and legal ethics alignment.",
  },
  {
    name: "Ms. Priyanka Chaudhary",
    designation: "Faculty Representative",
    body: "Executive Council",
    qualification: "Assistant Professor of Law",
    profile: "Representing academic faculty interests, exam coordinators, and student grievance cells.",
  },
  {
    name: "Mr. R. P. Singh",
    designation: "Administrative & Accounts Officer",
    body: "Finance & Administration Wing",
    qualification: "M.Com., Financial Controller",
    profile: "Management of transparent statutory budgets, audit disclosures, scholarships, and fee concessions.",
  },
];

// 12. LEGAL AID (COMMITTEE MEMBERS)
export const LEGAL_AID_DETAILS = {
  clinicName: "Janhit Free Legal Aid Clinic & Legal Literacy Cell",
  affiliatedWith: "District Legal Services Authority (DLSA), Surajpur District Court, Greater Noida",
  objectives: [
    "Providing free, confidential legal advice to marginalized, rural, and economically disadvantaged citizens.",
    "Drafting legal notices, affidavits, RTI applications, and complaints for needy litigants.",
    "Conducting periodic rural legal literacy camps in Gautam Buddha Nagar villages.",
    "Promoting Alternative Dispute Resolution (ADR), pre-litigation mediation, and Lok Adalat settlement support.",
    "Training law students as official Para-Legal Volunteers (PLVs) certified by DLSA.",
  ],
  committeeMembers: [
    { name: "Dr. S. N. Yadav", role: "Chairman / Patron", details: "Principal & Senior Professor of Law" },
    { name: "Ms. Neha Dwivedi", role: "Faculty Convener / Legal Aid In-Charge", details: "Assistant Professor (Specialist in Clinical Legal Education)" },
    { name: "Ms. Priyanka Chaudhary", role: "Co-Convener", details: "Assistant Professor & Criminal Jurisprudence Coordinator" },
    { name: "Adv. R. S. Bhati", role: "Empanelled Retainer Advocate", details: "DLSA Panel Lawyer & Senior Litigator, District Court Surajpur" },
    { name: "Adv. Manish Tomar", role: "Litigation Advisory Counsel", details: "Practicing Advocate, Greater Noida Bar Association" },
    { name: "Ananya Sharma", role: "Student Para-Legal Volunteer (PLV)", details: "Final Year B.A. LL.B. (Student Team Lead)" },
    { name: "Rahul Verma", role: "Student Para-Legal Volunteer (PLV)", details: "3rd Year LL.B. (Field Camp Coordinator)" },
    { name: "Priya Pandey", role: "Student Para-Legal Volunteer (PLV)", details: "4th Year B.A. LL.B. (Documentation & Research)" },
    { name: "Vikram Rathore", role: "Student Para-Legal Volunteer (PLV)", details: "2nd Year LL.B. (Community Outreach)" },
  ],
};

// 13. ALL 9 COMMITTEES
export const ALL_COMMITTEES = [
  {
    id: "iqac",
    name: "IQAC Committee",
    fullName: "Internal Quality Assurance Cell (IQAC)",
    badge: "UGC & NAAC Mandate",
    icon: Award,
    purpose:
      "To build and sustain a culture of excellence in teaching, legal research, curriculum delivery, and institutional governance through continuous quality self-assessments.",
    chairperson: "Dr. S. N. Yadav (Principal & Chairperson)",
    coordinator: "Dr. Arvind Kumar (Associate Professor & IQAC Coordinator)",
    members: [
      "Ms. Priyanka Chaudhary (Faculty Member)",
      "Dr. R. K. Sharma (Faculty Member)",
      "Mr. Amit Chaudhary (Management Representative)",
      "Adv. Rajesh Pathak (Alumni / Industrial Expert)",
      "Aditya Narayan (Student Council Representative)",
    ],
    responsibilities: [
      "Annual pedagogical audit and review of classroom teaching plans",
      "Organizing faculty development programs (FDPs) and research publication workshops",
      "Collection and institutional analysis of stakeholder feedback from students, parents, and alumni",
      "Supervising digital learning infrastructure and e-law library resources",
    ],
  },
  {
    id: "anti-ragging",
    name: "Anti-Ragging Committee",
    fullName: "Anti-Ragging Committee & Flying Squad",
    badge: "Zero Tolerance",
    icon: AlertOctagon,
    purpose:
      "To completely prohibit, prevent, and eliminate the scourge of ragging from the college campus, buses, hostels, and student common spaces.",
    chairperson: "Dr. S. N. Yadav (Principal & Presiding Officer)",
    coordinator: "Chief Proctor & Student Welfare Officer",
    members: [
      "Station House Officer (SHO), Surajpur Police Station (Police Administration)",
      "Mr. Sunil Sharma (Local Media / Civil Society Representative)",
      "Ms. Neha Dwivedi (Senior Lady Faculty Member)",
      "Mr. Ankit Verma (Proctorial Squad Member)",
      "Mr. Ramesh Chand (Parent Representative)",
      "Kavita Saxena (1st Year Student Representative)",
    ],
    responsibilities: [
      "24x7 monitoring across campus corridors, canteens, and sports grounds",
      "Immediate investigation of any ragging complaints within 24 hours of reporting",
      "Submission of mandatory online compliance reports to the National Anti-Ragging Portal",
      "Emergency 24x7 National Helpline: 1800-180-5522 | Campus Desk: 9313402015",
    ],
  },
  {
    id: "grc",
    name: "Grievance Redressal Committee (GRC)",
    fullName: "Students' Grievance Redressal Committee",
    badge: "Student Welfare",
    icon: HelpCircle,
    purpose:
      "To provide an impartial, transparent, and prompt forum for redressing individual and collective student grievances regarding academics, facilities, exams, and amenities.",
    chairperson: "Dr. S. N. Yadav (Principal)",
    coordinator: "Ms. Priyanka Chaudhary (Convener)",
    members: [
      "Dr. R. K. Sharma (Senior Faculty Member)",
      "Ms. Shweta Singh (Assistant Professor)",
      "Mr. R. P. Singh (Administrative Officer)",
      "Rohan Mehra (Final Year Student Representative)",
    ],
    responsibilities: [
      "Maintenance of secure physical grievance drop-boxes and confidential online portal",
      "Convening fortnightly review meetings to resolve lodged complaints within 7 business days",
      "Ensuring fair hearing, natural justice, and non-retaliatory protection for complainants",
    ],
  },
  {
    id: "icc",
    name: "Internal Complaint Committee (ICC)/POSH Committee",
    fullName: "Internal Complaints Committee against Sexual Harassment (POSH)",
    badge: "Gender Safety & Equality",
    icon: ShieldCheck,
    purpose:
      "To enforce the provisions of the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 and ensure a safe, dignified campus environment for women students and staff.",
    chairperson: "Ms. Priyanka Chaudhary (Presiding Officer - Senior Woman Faculty)",
    coordinator: "Ms. Neha Dwivedi (Member Secretary)",
    members: [
      "Ms. Shweta Singh (Faculty Member)",
      "Adv. Sunita Malik (External Lady Advocate / NGO Representative, Child & Women Welfare)",
      "Mr. R. P. Singh (Administrative Staff Representative)",
      "Pooja Joshi (Female Student Representative - 5th Year B.A. LL.B.)",
    ],
    responsibilities: [
      "Conducting regular gender sensitization programs and self-defense workshops",
      "Confidential time-bound inquiry into harassment complaints under POSH statutory guidelines",
      "Recommending disciplinary penalties and police reporting where warranted",
      "Confidential Contact: icc.law@janhitgroup.com",
    ],
  },
  {
    id: "sports-cultural",
    name: "Sport & Cultural Committee",
    fullName: "Sports, Co-Curricular & Cultural Events Committee",
    badge: "Campus Life & Talent",
    icon: Sparkles,
    purpose:
      "To foster holistic physical fitness, artistic expression, team spirit, and cultural harmony through sports tournaments, law fests, theatricals, and musical meets.",
    chairperson: "Dr. S. N. Yadav (Patron)",
    coordinator: "Director of Physical Education & Cultural Faculty Coordinator",
    members: [
      "Mr. Ankit Verma (Faculty Coordinator - Sports)",
      "Ms. Shweta Singh (Faculty Coordinator - Cultural)",
      "Sports Secretary (Student Council)",
      "Cultural Secretary (Student Council)",
      "Captains of College Cricket, Volleyball, Badminton, and Chess Teams",
    ],
    responsibilities: [
      "Organizing the Annual Inter-College Sports Meet (Janhit Law Olympiad)",
      "Planning and executing the flagship Annual Cultural Fest 'Lex Fiesta'",
      "Coordinating student delegations for national cultural and legal youth festivals",
    ],
  },
  {
    id: "library",
    name: "Library Committee",
    fullName: "Law Library Advisory & E-Resource Committee",
    badge: "Knowledge Hub",
    icon: Library,
    purpose:
      "To ensure continuous modernization of legal literature, acquisition of landmark law reports, maintenance of digital databases, and equitable book bank services for students.",
    chairperson: "Dr. S. N. Yadav (Principal)",
    coordinator: "Chief Law Librarian",
    members: [
      "Dr. Arvind Kumar (Faculty Member)",
      "Ms. Neha Dwivedi (Faculty Member)",
      "Mr. Ankit Verma (IT & Cyber Library Coordinator)",
      "Two Student Legal Researchers (UG & PG)",
    ],
    responsibilities: [
      "Selection and procurement of latest law journals, AIR, SCC, and international digests",
      "Managing campus subscriptions to SCC Online Web Edition, Manupatra, and digital gazettes",
      "Overseeing the Book Bank scheme providing free text book sets to SC/ST and needy jurists",
      "Maintaining digital research workstations and quiet study decorum",
    ],
  },
  {
    id: "proctorial",
    name: "Proctorial Board",
    fullName: "Campus Proctorial Board & Discipline Council",
    badge: "Law & Order",
    icon: ShieldAlert,
    purpose:
      "To uphold highest standards of student discipline, enforce advocate courtroom dress decorum, secure parking hygiene, and protect campus property.",
    chairperson: "Chief Proctor (Senior Law Professor)",
    coordinator: "Deputy Proctor & Proctorial Squad",
    members: [
      "Ms. Priyanka Chaudhary (Proctorial Member)",
      "Mr. Ankit Verma (Proctorial Member)",
      "Campus Estate & Security Superintendent",
      "Two Nominated Senior Student Marshals",
    ],
    responsibilities: [
      "Enforcing mandatory student ID card display and advocate uniform dress code",
      "Investigating incidents of indiscipline, classroom disruptions, or misconduct",
      "Regulating vehicle parking, vehicular speed limits, and smoke-free campus guidelines",
      "Issuing proctorial warnings, notices, and disciplinary penalty recommendations",
    ],
  },
  {
    id: "equal-opportunity",
    name: "Equal Opportunity Cell",
    fullName: "Equal Opportunity & SC/ST/OBC Welfare Cell",
    badge: "Social Justice",
    icon: HeartHandshake,
    purpose:
      "To ensure an inclusive, non-discriminatory environment for students from socially backward communities, SC/ST, OBC, minority backgrounds, and Divyangjan students.",
    chairperson: "Dr. S. N. Yadav (Patron)",
    coordinator: "Equal Opportunity Liaison Officer",
    members: [
      "Dr. Arvind Kumar (Assistant Professor)",
      "Ms. Neha Dwivedi (Assistant Professor)",
      "Mr. R. P. Singh (Scholarship Desk In-Charge)",
      "Nominated SC/ST Student Representatives",
      "Nominated Divyangjan Student Representative",
    ],
    responsibilities: [
      "Guidance and fast-track processing for UP Post-Matric Social Welfare Scholarships",
      "Organizing special remedial English language and legal research drafting tutorials",
      "Ensuring barrier-free ramps, accessible washrooms, and audio learning aids for Divyangjan",
      "Addressing any subtle discrimination issues with highest institutional priority",
    ],
  },
  {
    id: "student-council",
    name: "Student Council",
    fullName: "Janhit Student Jurist Council",
    badge: "Student Governance",
    icon: Users,
    purpose:
      "To represent the collective student voice, foster legal leadership skills, and bridge communication between students and college administration.",
    chairperson: "Staff Advisor & Principal",
    coordinator: "Elected / Nominated Student Council Executive Board",
    members: [
      "President (Final Year B.A. LL.B. / LL.B.)",
      "Vice President (Pre-Final Year)",
      "General Secretary (Academics & Coordination)",
      "Moot Court Secretary (Moot Court Society)",
      "Legal Aid Secretary (DLSA Field Drives)",
      "Cultural & Sports Secretaries",
      "Class Representatives (CRs) from each academic semester",
    ],
    responsibilities: [
      "Acting as the premier consultative body communicating student welfare proposals",
      "Assisting faculty in organizing national moot court competitions and legal seminars",
      "Facilitating peer tutoring, debate clubs, and model United Nations (MUN) chapters",
    ],
  },
];
