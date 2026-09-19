import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/data/lifeData";

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  if (currentIndex === null || !items[currentIndex]) return null;

  const item = items[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white/80 hover:text-gold transition-colors z-50 cursor-pointer"
          aria-label="Close Preview"
        >
          <X className="h-8 w-8" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-gold transition-colors bg-white/10 rounded-full z-50 cursor-pointer"
          aria-label="Previous Image"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-gold transition-colors bg-white/10 rounded-full z-50 cursor-pointer"
          aria-label="Next Image"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        <div
          className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[70vh] w-auto object-contain rounded-lg border border-gold/30 shadow-2xl"
          />
          <div className="mt-4 text-center text-white">
            <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
              {item.category}
            </span>
            <h3 className="font-serif text-xl font-bold">{item.title}</h3>
            <p className="text-xs text-white/70 mt-1 max-w-md mx-auto">{item.caption}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
