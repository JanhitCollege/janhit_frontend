export interface FeeStructureItem {
  courseName: string;
  code: string;
  duration: string;
  tuitionFee: string; // "Contact Admission Office" / "As per University Norms"
  admissionFee: string;
  examOtherFee: string;
  category: "UG Degree" | "Professional" | "Teacher Education" | "Diploma";
}

export const FEE_STRUCTURE_DATA: FeeStructureItem[] = [
  {
    courseName: "Bachelor of Arts (B.A.)",
    code: "B.A.",
    duration: "3 Years",
    tuitionFee: "As per University Norms",
    admissionFee: "Contact Office",
    examOtherFee: "As per CCSU Norms",
    category: "UG Degree",
  },
  {
    courseName: "Bachelor of Business Administration (BBA)",
    code: "BBA",
    duration: "3 Years",
    tuitionFee: "As per University Norms",
    admissionFee: "Contact Office",
    examOtherFee: "As per CCSU Norms",
    category: "Professional",
  },
  {
    courseName: "Bachelor of Computer Applications (BCA)",
    code: "BCA",
    duration: "3 Years",
    tuitionFee: "As per University Norms",
    admissionFee: "Contact Office",
    examOtherFee: "As per CCSU Norms",
    category: "Professional",
  },
  {
    courseName: "Bachelor of Commerce (B.Com.)",
    code: "B.Com",
    duration: "3 Years",
    tuitionFee: "As per University Norms",
    admissionFee: "Contact Office",
    examOtherFee: "As per CCSU Norms",
    category: "UG Degree",
  },
  {
    courseName: "Bachelor of Education (B.Ed.)",
    code: "B.Ed",
    duration: "2 Years",
    tuitionFee: "As per Govt / NCTE Norms",
    admissionFee: "Contact Office",
    examOtherFee: "As per CCSU Norms",
    category: "Teacher Education",
  },
  {
    courseName: "Diploma in Elementary Education (D.El.Ed.)",
    code: "D.El.Ed",
    duration: "2 Years",
    tuitionFee: "As per Govt / PNP Norms",
    admissionFee: "Contact Office",
    examOtherFee: "As per PNP Norms",
    category: "Diploma",
  },
  {
    courseName: "Bachelor of Physical Education (B.P.Ed.)",
    code: "B.P.Ed",
    duration: "2 Years",
    tuitionFee: "As per Govt / NCTE Norms",
    admissionFee: "Contact Office",
    examOtherFee: "As per CCSU Norms",
    category: "Teacher Education",
  },
  {
    courseName: "Bachelor of Science (B.Sc.)",
    code: "B.Sc",
    duration: "3 Years",
    tuitionFee: "As per University Norms",
    admissionFee: "Contact Office",
    examOtherFee: "As per CCSU Norms",
    category: "UG Degree",
  },
];
