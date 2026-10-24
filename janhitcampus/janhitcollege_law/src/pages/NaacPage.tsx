import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Naac } from "@/components/site/Naac";

export function NaacPage() {
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
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Naac />
    </div>
  );
}

export default NaacPage;
