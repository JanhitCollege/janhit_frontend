import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const scrollToHash = () => {
        const element =
          document.getElementById(targetId) || document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };

      if (!scrollToHash()) {
        const t1 = setTimeout(scrollToHash, 80);
        const t2 = setTimeout(scrollToHash, 250);
        const t3 = setTimeout(scrollToHash, 500);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        };
      }
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
