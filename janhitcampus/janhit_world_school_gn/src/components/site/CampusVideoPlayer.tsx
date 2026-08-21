import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Film } from "lucide-react";
import classroomImg from "@/assets/about-classroom.jpg";
import shootingImg from "@/assets/gallery-shooting.jpg";
import sportsImg from "@/assets/gallery-sports.jpg";
import roboticsImg from "@/assets/gallery-robotics.jpg";

const scenes = [
  {
    id: 1,
    title: "Interactive Classroom Reading & Smart Learning",
    subtitle: "Students reading, engaging with teachers, and exploring smart lessons.",
    img: classroomImg,
    badge: "Classroom Reading",
  },
  {
    id: 2,
    title: "10m Indoor Shooting Range Practice",
    subtitle: "Precision focus and target practice under expert coaches.",
    img: shootingImg,
    badge: "10m Shooting Range",
  },
  {
    id: 3,
    title: "Robotics & STEM Innovation Lab",
    subtitle: "Hands-on coding, mechanical design, and AI projects.",
    img: roboticsImg,
    badge: "Robotics Lab",
  },
  {
    id: 4,
    title: "Sports Arena & Outdoor Athletics",
    subtitle: "Football, cricket, athletics, and physical wellness electives.",
    img: sportsImg,
    badge: "Sports & Athletics",
  },
];

export function CampusVideoPlayer() {
  const [activeScene, setActiveScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-advance scenes for live presentation feel if fallback video is playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % scenes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const toggleFullScreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        containerRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const current = scenes[activeScene];

  return (
    <div
      ref={containerRef}
      className="mt-12 relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-navy-deep shadow-luxury group select-none border border-gold/30"
    >
      {/* Background Video Element with autoplays, muted, loop */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        poster={current.img}
        className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-1000"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-children-in-a-classroom-answering-a-teacher-41484-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Animated Scene Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent pointer-events-none" />

      {/* Top Header Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 flex items-center justify-between z-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-deep/80 backdrop-blur-md border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          <Film className="size-3.5" /> Campus Video · Autoplay
        </div>

        {/* Scene indicators */}
        <div className="hidden sm:flex items-center gap-2 bg-navy-deep/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          {scenes.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveScene(idx)}
              className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                activeScene === idx
                  ? "bg-gold text-navy-deep shadow-gold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {s.badge}
            </button>
          ))}
        </div>
      </div>

      {/* Center Play/Pause Trigger */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <button
          onClick={togglePlay}
          className="h-20 w-20 md:h-24 md:w-24 rounded-full gradient-gold flex items-center justify-center text-navy-deep shadow-luxury hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/40"
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? (
            <Pause className="size-8 md:size-10 text-navy-deep fill-current" />
          ) : (
            <Play className="size-8 md:size-10 text-navy-deep fill-current ml-1" />
          )}
        </button>
      </div>

      {/* Bottom Scene Details & Player Controls */}
      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4 bg-navy-deep/85 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-gold/20 shadow-luxury">
        <div className="space-y-1 max-w-xl">
          <div className="text-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.25em]">
            Scene {activeScene + 1} of {scenes.length} · {current.badge}
          </div>
          <h3 className="font-serif text-xl md:text-2xl text-white font-semibold leading-snug">
            {current.title}
          </h3>
          <p className="text-xs text-white/75 font-sans leading-relaxed">
            {current.subtitle}
          </p>
        </div>

        {/* Video Control Buttons */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <button
            onClick={toggleMute}
            className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="size-4.5" /> : <Volume2 className="size-4.5" />}
          </button>
          <button
            onClick={toggleFullScreen}
            className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
            title="Full Screen"
          >
            <Maximize className="size-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
