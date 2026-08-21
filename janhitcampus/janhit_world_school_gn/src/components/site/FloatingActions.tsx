import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";

export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openAdmissions = () => {
    window.dispatchEvent(new CustomEvent("open-admissions"));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 items-end"
        >
          {/* Apply Now Floating Button */}
          <button
            onClick={openAdmissions}
            className="group relative flex items-center justify-center h-14 w-14 rounded-full gradient-gold text-navy-deep font-semibold shadow-luxury hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gold/40"
            aria-label="Apply Now"
          >
            <span className="absolute -left-24 scale-0 group-hover:scale-100 bg-navy-deep text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md transition-all duration-200 pointer-events-none tracking-wide whitespace-nowrap">
              Apply Now
            </span>
            <FileText className="size-6 shrink-0" />
          </button>

          {/* WhatsApp Floating Button */}
          <a
            href="https://wa.me/919958574400"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-luxury hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-[#20ba5a]"
            aria-label="Chat on WhatsApp"
          >
            {/* Pulsing ring around WhatsApp button */}
            <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-7 shrink-0 text-white"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489 0 9.954-4.43 9.957-9.884.002-2.64-1.019-5.123-2.877-6.986-1.858-1.864-4.329-2.89-6.973-2.89-5.49 0-9.953 4.43-9.957 9.885-.001 2.025.528 4.004 1.532 5.761l-.97 3.55 3.69-.966zm10.457-7.142c-.27-.135-1.597-.788-1.847-.879-.25-.09-.432-.135-.613.135-.18.27-.7 1.35-.858 1.53-.158.18-.317.202-.587.067-.27-.135-1.14-.42-2.17-1.34-.8-.715-1.34-1.6-1.498-1.872-.158-.27-.017-.417.118-.552.12-.12.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.613-1.477-.84-2.02-.22-.53-.442-.457-.613-.466-.156-.008-.337-.01-.518-.01s-.476.068-.724.337c-.249.27-.95.928-.95 2.264s.973 2.628 1.109 2.81c.135.18 1.914 2.923 4.637 4.103.648.28 1.153.448 1.547.573.65.207 1.242.178 1.71.108.522-.078 1.597-.652 1.821-1.25.225-.598.225-1.11.158-1.218-.067-.108-.25-.18-.52-.315z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
