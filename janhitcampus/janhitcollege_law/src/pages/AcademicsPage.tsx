import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AcademicsHeader } from "@/components/academics/AcademicsHeader";
import { CoursesOffered } from "@/components/academics/CoursesOffered";
import { AcademicCalendarSection } from "@/components/academics/AcademicCalendarSection";
import { AcademicPolicies } from "@/components/academics/AcademicPolicies";
import { CurriculumSyllabi } from "@/components/academics/CurriculumSyllabi";
import { ExaminationSystem } from "@/components/academics/ExaminationSystem";
import { FacultyDirectorySection } from "@/components/academics/FacultyDirectorySection";

export function AcademicsPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          const offset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header & Quick Jump Navigation */}
      <AcademicsHeader />

      {/* 2. Courses Offered (LL.B., B.A. LL.B., LL.M.) */}
      <CoursesOffered />

      {/* 3. Academic Calendar */}
      <AcademicCalendarSection />

      {/* 4. Academic Policies */}
      <AcademicPolicies />

      {/* 5. Curriculum & Syllabi */}
      <CurriculumSyllabi />

      {/* 6. Examination System (Statutes & Ordinances) */}
      <ExaminationSystem />

      {/* 7. Faculty Directory */}
      <FacultyDirectorySection />
    </div>
  );
}
