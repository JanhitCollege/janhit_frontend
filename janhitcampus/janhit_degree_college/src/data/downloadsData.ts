export interface DownloadDocument {
  id: string;
  title: string;
  category:
    | "Admission Forms"
    | "Prospectus"
    | "Fee Structure"
    | "Syllabus"
    | "Notices"
    | "Examination Documents"
    | "Public Disclosure Documents"
    | "Other Documents";
  date: string;
  fileType: "PDF" | "DOCX";
  fileSize: string;
  downloadUrl: string;
}

export const DOWNLOADS_DATA: DownloadDocument[] = [
  {
    id: "doc-1",
    title: "College Prospectus & Academic Brochure 2026-2027",
    category: "Prospectus",
    date: "2026-01-15",
    fileType: "PDF",
    fileSize: "2.4 MB",
    downloadUrl: "#",
  },
  {
    id: "doc-2",
    title: "General College Admission Enquiry & Registration Form",
    category: "Admission Forms",
    date: "2026-02-01",
    fileType: "PDF",
    fileSize: "520 KB",
    downloadUrl: "#",
  },
  {
    id: "doc-3",
    title: "Official Fee Structure Schedule (Session 2026-27)",
    category: "Fee Structure",
    date: "2026-01-20",
    fileType: "PDF",
    fileSize: "380 KB",
    downloadUrl: "#",
  },
  {
    id: "doc-4",
    title: "B.A. (Bachelor of Arts) Complete Course Syllabus - CCSU",
    category: "Syllabus",
    date: "2025-08-10",
    fileType: "PDF",
    fileSize: "1.8 MB",
    downloadUrl: "#",
  },
  {
    id: "doc-5",
    title: "BBA & BCA Integrated Syllabus & Exam Pattern",
    category: "Syllabus",
    date: "2025-08-12",
    fileType: "PDF",
    fileSize: "1.5 MB",
    downloadUrl: "#",
  },
  {
    id: "doc-6",
    title: "B.Ed. & D.El.Ed. Curriculum Framework & Internship Guidelines",
    category: "Syllabus",
    date: "2025-09-05",
    fileType: "PDF",
    fileSize: "2.1 MB",
    downloadUrl: "#",
  },
  {
    id: "doc-7",
    title: "B.Sc. & B.P.Ed. Academic Regulations & Practical Schedule",
    category: "Syllabus",
    date: "2025-08-18",
    fileType: "PDF",
    fileSize: "1.6 MB",
    downloadUrl: "#",
  },
  {
    id: "doc-8",
    title: "Examination Time Table & Admit Card Instructions (Even Semester)",
    category: "Examination Documents",
    date: "2026-03-10",
    fileType: "PDF",
    fileSize: "410 KB",
    downloadUrl: "#",
  },
  {
    id: "doc-9",
    title: "Mandatory Public Disclosure & Regulatory Approvals (NCTE / CCSU)",
    category: "Public Disclosure Documents",
    date: "2025-11-30",
    fileType: "PDF",
    fileSize: "1.2 MB",
    downloadUrl: "#",
  },
  {
    id: "doc-10",
    title: "Anti-Ragging Undertaking & Campus Discipline Code",
    category: "Other Documents",
    date: "2025-07-01",
    fileType: "PDF",
    fileSize: "350 KB",
    downloadUrl: "#",
  },
];
