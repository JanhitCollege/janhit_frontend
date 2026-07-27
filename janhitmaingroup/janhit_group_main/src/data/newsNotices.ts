import classroomImg from "@/assets/gallery-classroom.jpg";
import culturalImg from "@/assets/gallery-cultural.jpg";
import graduationImg from "@/assets/gallery-graduation.jpg";
import labImg from "@/assets/gallery-lab.jpg";
import libraryImg from "@/assets/gallery-library.jpg";
import sportsImg from "@/assets/gallery-sports.jpg";

export interface NewsNotice {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  type: "news" | "notice";
  visibility: "group" | "campus";
  status: "draft" | "published" | "archived";
  priority: "high" | "medium" | "low";
  featured: "yes" | "no";
  campusIds: string[]; // Campus IDs mapped to when visibility = "campus"
  publishDate: string;
  expiryDate?: string;
  thumbnail?: string; // Image base64 or import reference URL
  attachmentName?: string;
  attachmentSize?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  viewCount: number;
  downloadCount: number;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
}

export const defaultNewsNotices: NewsNotice[] = [
  {
    id: "1",
    title: "Janhit College of Law Achieves Grade 'A' BCI Accreditation",
    slug: "janhit-college-of-law-achieves-grade-a-bci-accreditation",
    excerpt:
      "The Bar Council of India (BCI) has officially awarded Grade 'A' accreditation to Janhit College of Law after a rigorous inspection of academics and moot court programs.",
    description: `<h3><strong>Major Milestone for Law Department</strong></h3><p>We are proud to announce that the Bar Council of India (BCI) has officially awarded <strong>Grade 'A' Accreditation</strong> to Janhit College of Law. This prestigious certification reflects our ongoing dedication to academic excellence, state-of-the-art facilities, and practical exposure through our Moot Court programs.</p><p>Key areas praised by the accreditation committee include:</p><ul><li>Mock trial training modules</li><li>Comprehensive legal aid clinics</li><li>Highly qualified faculty members</li><li>Fully digitized law library facilities</li></ul><p>We extend our deepest gratitude to all our staff, students, and legal experts who contributed to this outstanding achievement.</p>`,
    type: "news",
    visibility: "campus",
    status: "published",
    priority: "high",
    featured: "yes",
    campusIds: ["4"], // Janhit College of Law
    publishDate: "2026-07-01T10:00:00Z",
    expiryDate: "2027-07-01T18:00:00Z",
    thumbnail: graduationImg,
    attachmentName: "bci_accreditation_report.pdf",
    attachmentSize: "2.4 MB",
    metaTitle: "Janhit College of Law Grade A BCI Accreditation",
    metaDescription:
      "BCI awards Grade 'A' accreditation to Janhit College of Law for outstanding moot court, legal clinic and faculty standard achievements.",
    metaKeywords: "BCI, Law Accreditation, Janhit Law, Moot Court, Grade A",
    viewCount: 342,
    downloadCount: 89,
    createdDate: "2026-06-30T09:15:00Z",
    updatedDate: "2026-07-01T10:00:00Z",
    createdBy: "Prof. R. K. Sharma",
  },
  {
    id: "2",
    title: "Annual Sports Meet 'UDAAN 2026' Registrations Open",
    slug: "annual-sports-meet-udaan-2026-registrations-open",
    excerpt:
      "Registrations are now open for the annual multi-campus sports event UDAAN 2026. Students from all institutions can register online.",
    description: `<h3><strong>Unleash Your Athletic Potential!</strong></h3><p>The annual multi-campus sports championship <strong>UDAAN 2026</strong> is back. Get ready to represent your campus in a variety of athletic events, team sports, and indoor challenges.</p><p><strong>Event Categories:</strong></p><ul><li>Track and Field (100m, 200m, Relay)</li><li>Football, Basketball, Volleyball</li><li>Badminton, Table Tennis, Chess</li></ul><p>Register online via the students portal before the deadline. Late entries will not be accepted.</p>`,
    type: "notice",
    visibility: "group",
    status: "published",
    priority: "medium",
    featured: "no",
    campusIds: [], // All campuses (Group visibility)
    publishDate: "2026-07-10T08:00:00Z",
    expiryDate: "2026-08-15T18:00:00Z",
    thumbnail: sportsImg,
    attachmentName: "sports_meet_schedule.pdf",
    attachmentSize: "1.1 MB",
    metaTitle: "Annual Sports Meet UDAAN 2026 Registration",
    metaDescription:
      "Registration open for multi-campus sports championship UDAAN 2026. Sign up for track, field, football, and indoor sports.",
    metaKeywords: "Sports Meet, Udaan 2026, Athletics, Janhit Group Sports",
    viewCount: 512,
    downloadCount: 120,
    createdDate: "2026-07-09T14:30:00Z",
    updatedDate: "2026-07-10T08:00:00Z",
    createdBy: "Sports Council Admin",
  },
  {
    id: "3",
    title: "National Seminar on Generative AI in Higher Education",
    slug: "national-seminar-on-generative-ai-in-higher-education",
    excerpt:
      "Join us for an enlightening seminar featuring eminent computer scientists discussing the role and challenges of AI in classrooms.",
    description: `<h3><strong>Embracing the Future: AI in Academics</strong></h3><p>We are organizing a national seminar on <strong>Generative AI in Higher Education</strong>. Learn how AI tools are reshaping curriculum design, student assessment, and research methodologies.</p><p><strong>Speakers include:</strong></p><ul><li>Dr. Amit Sen (Senior AI Researcher)</li><li>Prof. Sunita Verma (EdTech Innovator)</li></ul><p>All BCA, B.Sc, and teaching faculty are highly encouraged to attend.</p>`,
    type: "news",
    visibility: "group",
    status: "draft",
    priority: "medium",
    featured: "no",
    campusIds: [],
    publishDate: "2026-07-20T09:00:00Z",
    thumbnail: labImg,
    metaTitle: "Generative AI in Higher Education Seminar",
    metaDescription:
      "National seminar on Generative AI implementation in syllabus, research, and classroom teaching strategies.",
    metaKeywords: "AI Seminar, Generative AI, EdTech, Computer Science Janhit",
    viewCount: 0,
    downloadCount: 0,
    createdDate: "2026-07-14T11:00:00Z",
    updatedDate: "2026-07-14T11:00:00Z",
    createdBy: "BCA Department Head",
  },
  {
    id: "4",
    title: "Official Holiday Notice: Independence Day Celebration",
    slug: "official-holiday-notice-independence-day-celebration",
    excerpt:
      "All campuses will remain closed on August 15th, 2026 in observance of Independence Day. Flag hoisting details enclosed.",
    description: `<h3><strong>79th Independence Day Celebrations</strong></h3><p>All institutions, colleges, and schools under the Janhit Group will remain closed on <strong>August 15th, 2026</strong> in celebration of Independence Day.</p><p>Flag hoisting ceremonies will be held at the central administrative block in Greater Noida starting at 8:30 AM. Attendance is optional but encouraged for local students and staff members.</p>`,
    type: "notice",
    visibility: "group",
    status: "published",
    priority: "high",
    featured: "no",
    campusIds: [],
    publishDate: "2026-07-12T09:00:00Z",
    expiryDate: "2026-08-16T18:00:00Z",
    thumbnail: culturalImg,
    metaTitle: "Independence Day Holiday Notice - Janhit Group",
    metaDescription:
      "Holiday notice for Independence Day. Central flag hoisting ceremony details at Greater Noida block.",
    metaKeywords: "Holiday Notice, Independence Day, Flag Hoisting, Janhit Group",
    viewCount: 890,
    downloadCount: 0,
    createdDate: "2026-07-12T08:00:00Z",
    updatedDate: "2026-07-12T09:00:00Z",
    createdBy: "Registrar Office",
  },
  {
    id: "5",
    title: "Admissions Open for Academic Session 2026-27",
    slug: "admissions-open-for-academic-session-2026-27",
    excerpt:
      "Janhit Group announces open registration for K-12, law, education, and degree college courses for the upcoming academic cycle.",
    description: `<h3><strong>Shape Your Future with Janhit</strong></h3><p>Applications are now open for various courses across our campuses for the academic session 2026-27. We offer state-of-the-art infrastructure, experienced faculty, and industry-oriented academic tracks.</p><p><strong>Offered Courses:</strong></p><ul><li>CBSE K-12 Education (Greater Noida, Ghaziabad, Saharanpur)</li><li>B.A. LL.B, LL.B, and LL.M Programs</li><li>BBA, BCA, B.Sc, B.Com Degrees</li><li>Teacher Education (B.Ed, D.El.Ed)</li></ul><p>Early application scholarships are available for high-merit students.</p>`,
    type: "news",
    visibility: "group",
    status: "published",
    priority: "high",
    featured: "yes",
    campusIds: [],
    publishDate: "2026-05-01T10:00:00Z",
    expiryDate: "2026-09-30T18:00:00Z",
    thumbnail: classroomImg,
    attachmentName: "janhit_admissions_brochure_2026.pdf",
    attachmentSize: "5.8 MB",
    metaTitle: "Janhit Group Admissions 2026-27 Open",
    metaDescription:
      "Apply online for K-12, Law, Management, Teacher Training, and Degree programs. Scholarships available.",
    metaKeywords: "Admissions Open, College Admission, School Admission 2026, Janhit Group",
    viewCount: 1420,
    downloadCount: 450,
    createdDate: "2026-04-28T09:00:00Z",
    updatedDate: "2026-05-01T10:00:00Z",
    createdBy: "Director Admissions",
  },
  {
    id: "6",
    title: "Mandatory Parent-Teacher Meeting (PTM) at Greater Noida School",
    slug: "mandatory-parent-teacher-meeting-ptm-at-greater-noida-school",
    excerpt:
      "The first term parent-teacher meet for classes I to XII will be held this Saturday. Detailed time slots are allocated roll-number wise.",
    description: `<h3><strong>Parent-Teacher Collaboration Meet</strong></h3><p>Janhit World School Greater Noida is organizing the term's first <strong>Parent-Teacher Meeting (PTM)</strong> this Saturday, July 18th, 2026.</p><p>Please note that attendance is mandatory for parents to review and discuss academic progress, classroom behavior, and co-curricular performance.</p><p><strong>Schedule:</strong></p><ul><li>Roll No. 1 to 15: 9:00 AM - 10:30 AM</li><li>Roll No. 16 to 30: 10:45 AM - 12:15 PM</li><li>Roll No. 31 onwards: 1:00 PM - 2:30 PM</li></ul>`,
    type: "notice",
    visibility: "campus",
    status: "published",
    priority: "medium",
    featured: "no",
    campusIds: ["1"], // Greater Noida School
    publishDate: "2026-07-13T09:00:00Z",
    expiryDate: "2026-07-19T18:00:00Z",
    thumbnail: classroomImg,
    attachmentName: "ptm_guidelines_and_map.pdf",
    attachmentSize: "450 KB",
    metaTitle: "PTM Schedule Janhit World School Greater Noida",
    metaDescription:
      "Parent teacher meeting time slots and guidelines for classes I to XII at Janhit World School Greater Noida.",
    metaKeywords: "PTM, Parent Teacher Meeting, School PTM, JWS Greater Noida",
    viewCount: 215,
    downloadCount: 45,
    createdDate: "2026-07-12T10:00:00Z",
    updatedDate: "2026-07-13T09:00:00Z",
    createdBy: "Principal JWS-GN",
  },
  {
    id: "7",
    title: "Semester Examination Fee Submission & Admit Card Notice",
    slug: "semester-examination-fee-submission-admit-card-notice",
    excerpt:
      "All law students must clear outstanding dues and submit their semester exam forms online by July 25th, 2026 to obtain admit cards.",
    description: `<h3><strong>Law Exams Fee Notice</strong></h3><p>This is to inform all LL.B and B.A. LL.B students of Janhit College of Law that the portal for exam form submissions is now active. All outstanding fee dues must be cleared before the admit cards can be generated.</p><p><strong>Key Deadlines:</strong></p><ul><li>Last date for fee clearance: July 22, 2026</li><li>Last date for exam form submission: July 25, 2026</li><li>Admit card downloads start: July 28, 2026</li></ul><p>No late submissions will be processed under any circumstances.</p>`,
    type: "notice",
    visibility: "campus",
    status: "published",
    priority: "high",
    featured: "no",
    campusIds: ["4"],
    publishDate: "2026-07-14T08:30:00Z",
    expiryDate: "2026-07-26T18:00:00Z",
    thumbnail: libraryImg,
    attachmentName: "exam_form_guidelines.pdf",
    attachmentSize: "890 KB",
    metaTitle: "Law Semester Exam Fee Submission Deadlines",
    metaDescription:
      "Deadlines and instructions for Law students to clear dues, submit exam forms and download admit cards.",
    metaKeywords: "Exam Form, Fee Notice, Law Students, Admit Cards",
    viewCount: 154,
    downloadCount: 98,
    createdDate: "2026-07-13T12:00:00Z",
    updatedDate: "2026-07-14T08:30:00Z",
    createdBy: "Law Controller of Exams",
  },
  {
    id: "8",
    title: "Mega Campus Placement Drive 2026 for BBA/BCA Grads",
    slug: "mega-campus-placement-drive-2026-for-bba-bca-grads",
    excerpt:
      "Top corporate partners will visit Janhit Institute of Education & Information for a placement drive on July 29th-30th.",
    description: `<h3><strong>Your Career Gateway is Here</strong></h3><p>We are delighted to host the <strong>Mega Campus Placement Drive 2026</strong>. Over 15 leading IT and business consulting firms will visit our Greater Noida campus to recruit final-year BBA and BCA students.</p><p><strong>Top Recruiting Partners:</strong></p><ul><li>Infosys, TCS, Wipro</li><li>ICICI Bank, HDFC Sales</li><li>Tech Mahindra, Genpact</li></ul><p>Students must report in formal attire with 5 copies of their resume and portfolio.</p>`,
    type: "news",
    visibility: "campus",
    status: "published",
    priority: "high",
    featured: "yes",
    campusIds: ["7"],
    publishDate: "2026-07-08T09:00:00Z",
    expiryDate: "2026-07-31T18:00:00Z",
    thumbnail: graduationImg,
    attachmentName: "placement_companies_and_jd.pdf",
    attachmentSize: "2.1 MB",
    metaTitle: "Placement Drive 2026 BCA BBA Graduates",
    metaDescription:
      "Top corporates visiting Janhit campus for BBA and BCA recruitment drives on July 29-30. Prepare resume.",
    metaKeywords: "Placement Drive, Job Recruitment, BCA placements, Janhit Careers",
    viewCount: 432,
    downloadCount: 165,
    createdDate: "2026-07-07T11:00:00Z",
    updatedDate: "2026-07-08T09:00:00Z",
    createdBy: "Placement Officer",
  },
  {
    id: "9",
    title: "Merit-cum-Means Scholarship Program Launch",
    slug: "merit-cum-means-scholarship-program-launch",
    excerpt:
      "Janhit Group introduces the 2026 scholarship program supporting outstanding academic performers from financially weaker sections.",
    description: `<h3><strong>Supporting Deserving Minds</strong></h3><p>In line with our mission of inclusive education, the Janhit Group of Institutions is proud to announce the <strong>Merit-cum-Means Scholarship Scheme</strong>. This initiative provides tuition waiver benefits ranging from 25% to 100% for students meeting criteria.</p><p><strong>Eligibility Criteria:</strong></p><ul><li>Minimum score of 85% in last qualifying examination</li><li>Annual family income below ₹3.5 Lakhs</li><li>Clean disciplinary record</li></ul><p>Application forms can be collected from the financial aid cell at any campus.</p>`,
    type: "news",
    visibility: "group",
    status: "published",
    priority: "low",
    featured: "no",
    campusIds: [],
    publishDate: "2026-06-25T11:00:00Z",
    expiryDate: "2026-08-30T18:00:00Z",
    thumbnail: libraryImg,
    attachmentName: "scholarship_rules_and_application.pdf",
    attachmentSize: "1.5 MB",
    metaTitle: "Merit cum Means Scholarship Scheme 2026",
    metaDescription:
      "Apply for merit cum means scholarships at Janhit Colleges. Eligibility criteria and family income details.",
    metaKeywords: "Scholarships, Tuition Waiver, Financial Aid, Merit College",
    viewCount: 310,
    downloadCount: 142,
    createdDate: "2026-06-24T10:30:00Z",
    updatedDate: "2026-06-25T11:00:00Z",
    createdBy: "Financial Aid Committee",
  },
  {
    id: "10",
    title: "Archived: New Library Digital Regulations & Guidelines",
    slug: "archived-new-library-digital-regulations-guidelines",
    excerpt:
      "Important update regarding barcode-based issuing and late return fine policies implemented across college libraries.",
    description: `<h3><strong>Digitized Library System Upgrade</strong></h3><p>Libraries across all Janhit campuses have been updated with automated barcode scanning software. To facilitate this transition, students are requested to replace their legacy paper cards with the new digital identity cards.</p><p><strong>Key Regulations:</strong></p><ul><li>Maximum books issued: 3 for UG, 5 for PG</li><li>Issue duration: 14 days maximum</li><li>Late fine: ₹5 per day thereafter</li></ul>`,
    type: "notice",
    visibility: "group",
    status: "archived",
    priority: "low",
    featured: "no",
    campusIds: [],
    publishDate: "2026-04-10T09:00:00Z",
    expiryDate: "2026-05-10T18:00:00Z",
    thumbnail: libraryImg,
    metaTitle: "Digital Library Regulations Janhit Group",
    metaDescription:
      "Barcode system rules, issuing quota and delay penalties at Janhit digital libraries.",
    metaKeywords: "Library rules, digital library card, book issuing, library fine",
    viewCount: 180,
    downloadCount: 0,
    createdDate: "2026-04-09T08:00:00Z",
    updatedDate: "2026-04-10T09:00:00Z",
    createdBy: "Chief Librarian",
  },
  {
    id: "11",
    title: "Saharanpur School Wins Regional Inter-School Science Exhibition",
    slug: "saharanpur-school-wins-regional-inter-school-science-exhibition",
    excerpt:
      "Students of classes X and XI from Saharanpur campus secure 1st prize in the Western UP Science Olympiad.",
    description: `<h3><strong>Science Scholars Bring Laurels Home!</strong></h3><p>We are thrilled to share that Janhit World School Saharanpur has bagged the first runner-up and champion trophies at the Western UP Science Olympiad held last week.</p><p>Our students' project on <strong>Smart Rainwater Harvesting and IoT Irrigation</strong> won the best innovation award out of 75 participating schools.</p><p>Congratulations to the winners and their mentor, Mrs. Kalpana Sen!</p>`,
    type: "news",
    visibility: "campus",
    status: "published",
    priority: "medium",
    featured: "no",
    campusIds: ["3"], // Saharanpur School
    publishDate: "2026-07-05T09:00:00Z",
    thumbnail: labImg,
    metaTitle: "Janhit Saharanpur wins Regional Science Exhibition",
    metaDescription:
      "Janhit World School Saharanpur wins 1st prize in Western UP Science Olympiad for IoT Rainwater project.",
    metaKeywords: "Science Olympiad, School Award, Saharanpur School, IoT Project",
    viewCount: 220,
    downloadCount: 0,
    createdDate: "2026-07-04T10:00:00Z",
    updatedDate: "2026-07-05T09:00:00Z",
    createdBy: "PR Coordinator Saharanpur",
  },
  {
    id: "12",
    title: "Orientation Program Schedule for Newly Admitted Students",
    slug: "orientation-program-schedule-for-newly-admitted-students",
    excerpt:
      "Orientation events to welcome freshers will begin on August 1st. Read the schedule and venue instructions.",
    description: `<h3><strong>Welcome to the Janhit Family!</strong></h3><p>The academic orientation programs for first-semester students across all courses (BBA, BCA, B.Sc, LL.B, B.Ed) will commence from August 1st, 2026.</p><p><strong>Highlights:</strong></p><ul><li>Address by Director Generals</li><li>Interactive icebreakers and team challenges</li><li>Familiarization with campus facilities, libraries, labs</li><li>Syllabus outline and club registrations</li></ul>`,
    type: "notice",
    visibility: "group",
    status: "published",
    priority: "medium",
    featured: "yes",
    campusIds: [],
    publishDate: "2026-07-15T12:00:00Z",
    expiryDate: "2026-08-05T18:00:00Z",
    thumbnail: culturalImg,
    attachmentName: "orientation_venue_and_dates.pdf",
    attachmentSize: "720 KB",
    metaTitle: "Janhit Orientation Ceremony Schedule 2026",
    metaDescription:
      "Welcome orientation schedules, venues, and timings for first-year undergraduate and postgraduate students.",
    metaKeywords: "Orientation, Fresher Welcoming, Campus Ceremony, Janhit Freshers",
    viewCount: 40,
    downloadCount: 12,
    createdDate: "2026-07-15T06:00:00Z",
    updatedDate: "2026-07-15T12:00:00Z",
    createdBy: "Student Welfare Committee",
  },
  {
    id: "13",
    title: "Hostel Maintenance & Security Infrastructure Upgrades",
    slug: "hostel-maintenance-security-infrastructure-upgrades",
    excerpt:
      "Scheduled renovation and CCTV camera installation will be executed across law and information technology boy/girl hostel blocks.",
    description: `<h3><strong>Enhancing Hostel Security & Comfort</strong></h3><p>This is to notify all hostel residents that maintenance work, room whitewashing, and installation of upgraded high-resolution CCTV cameras will take place over the next two weeks.</p><p><strong>Renovation Phases:</strong></p><ul><li>Phase 1 (Boys Block A & B): July 20 to July 25</li><li>Phase 2 (Girls Block C): July 27 to August 1</li></ul><p>We request students to cooperate with the authorized technician teams during scheduled hours.</p>`,
    type: "notice",
    visibility: "campus",
    status: "draft",
    priority: "low",
    featured: "no",
    campusIds: ["1", "4", "7"], // Multi campus
    publishDate: "2026-07-19T08:00:00Z",
    thumbnail: classroomImg,
    metaTitle: "Hostel CCTV and Renovation Schedules",
    metaDescription:
      "Hostel maintenance work and CCTV installation schedules for Greater Noida Boys & Girls blocks.",
    metaKeywords: "Hostel Notice, Hostel CCTV, Campus Renovation, Security Upgrade",
    viewCount: 0,
    downloadCount: 0,
    createdDate: "2026-07-14T15:00:00Z",
    updatedDate: "2026-07-14T15:00:00Z",
    createdBy: "Warden General Office",
  },
  {
    id: "14",
    title: "Guest Lecture: Intellectual Property Rights in Digital Age",
    slug: "guest-lecture-intellectual-property-rights-in-digital-age",
    excerpt:
      "Supreme Court Senior Advocate Mr. Vivek Malhotra will lecture law students on patent and copyright law changes.",
    description: `<h3><strong>Expert Insights into IPR Legislation</strong></h3><p>The Department of Corporate Law at Janhit College of Law is presenting a guest seminar on <strong>Intellectual Property Rights (IPR) in the Digital Age</strong>.</p><p>The session will cover patent claims, copyright disputes, and digital piracy protections in modern litigation.</p><p><strong>Venue:</strong> Moot Court Auditorium, Greater Noida Campus<br/><strong>Time:</strong> July 22, 11:30 AM onwards</p>`,
    type: "news",
    visibility: "campus",
    status: "published",
    priority: "low",
    featured: "no",
    campusIds: ["4"],
    publishDate: "2026-07-11T10:00:00Z",
    thumbnail: classroomImg,
    metaTitle: "Guest Lecture on Digital IPR - Janhit Law",
    metaDescription:
      "Supreme Court Advocate Vivek Malhotra guest lecture on patent claims and piracy legislation in Moot Court.",
    metaKeywords: "IPR Lecture, Patent Law, Law Seminar, Supreme Court Advocate",
    viewCount: 167,
    downloadCount: 0,
    createdDate: "2026-07-10T11:00:00Z",
    updatedDate: "2026-07-11T10:00:00Z",
    createdBy: "Corporate Law Society",
  },
  {
    id: "15",
    title: "Revised School Bus Routes & Student Pickup Times",
    slug: "revised-school-bus-routes-student-pickup-times",
    excerpt:
      "Transportation department updates bus routes and pickup time slots for Noida and Greater Noida regions starting next week.",
    description: `<h3><strong>Updated Transport Schedule</strong></h3><p>Due to recent road construction projects and flyover adjustments in the Greater Noida area, the transport department has revised student pickup routes and bus timings.</p><p>Please look at the attached PDF to check your specific route number, driver mobile details, and adjusted timing (shifted 10-15 minutes earlier).</p><p>For queries, contact the transport helpline at +91 99999 55500.</p>`,
    type: "notice",
    visibility: "group",
    status: "published",
    priority: "high",
    featured: "no",
    campusIds: [],
    publishDate: "2026-07-14T09:00:00Z",
    expiryDate: "2026-08-30T18:00:00Z",
    thumbnail: sportsImg,
    attachmentName: "noida_bus_routes_revised_july_2026.pdf",
    attachmentSize: "1.3 MB",
    metaTitle: "Revised School Bus Routes Noida Greater Noida",
    metaDescription:
      "New pickup timings, route changes and driver contact details for school bus commuters starting next week.",
    metaKeywords: "School Bus, Transport Routes, Pickup Timings, School Bus Noida",
    viewCount: 420,
    downloadCount: 110,
    createdDate: "2026-07-13T15:00:00Z",
    updatedDate: "2026-07-14T09:00:00Z",
    createdBy: "Transport Manager",
  },
];

const LOCAL_STORAGE_KEY = "janhit_news_notices";

export const getStoredNewsNotices = (): NewsNotice[] => {
  if (typeof window === "undefined") return defaultNewsNotices;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultNewsNotices));
    return defaultNewsNotices;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultNewsNotices;
  }
};

export const saveNewsNotices = (records: NewsNotice[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }
};
