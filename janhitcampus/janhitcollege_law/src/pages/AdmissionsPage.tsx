import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Admissions } from "@/components/site/Admissions";

export function AdmissionsPage() {
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
      <Admissions />
    </div>
  );
}
export default AdmissionsPage;
