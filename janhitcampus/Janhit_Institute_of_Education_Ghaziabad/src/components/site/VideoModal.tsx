import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { VideoItem } from "@/data/lifeData";

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

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
          aria-label="Close Video"
        >
          <X className="h-8 w-8" />
        </button>

        <div
          className="max-w-3xl w-full bg-navy border border-gold/30 rounded-xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={video.embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          <div className="p-5 text-white">
            <h3 className="font-serif text-xl font-bold text-gold">{video.title}</h3>
            <p className="text-xs text-white/80 mt-1 leading-relaxed">{video.description}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
