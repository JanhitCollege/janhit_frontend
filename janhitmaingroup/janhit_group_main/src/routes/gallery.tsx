import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, FadeIn } from "@/components/Section";
import { useState, useEffect } from "react";
import {
  X,
  Play,
  Video,
  Image as ImageIcon,
  Sparkles,
  Loader2,
  Volume2,
  Maximize2,
  Pause,
} from "lucide-react";
import lib from "@/assets/gallery-library.jpg";
import lab from "@/assets/gallery-lab.jpg";
import grad from "@/assets/gallery-graduation.jpg";
import sports from "@/assets/gallery-sports.jpg";
import classroom from "@/assets/gallery-classroom.jpg";
import cultural from "@/assets/gallery-cultural.jpg";
import campus from "@/assets/hero-luxurious-bright.png";
import school from "@/assets/campus-school.jpg";
import law from "@/assets/campus-law.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Media Gallery — Janhit Group of Institutions" },
      {
        name: "description",
        content:
          "Explore campus photos and videos of Janhit institutions. View facilities, libraries, labs, sports events, convocations, and virtual campus tours.",
      },
      { property: "og:title", content: "Campus Media Gallery — Janhit Group" },
      { property: "og:description", content: "Glimpses of campus life across the Janhit family." },
      { property: "og:image", content: campus },
    ],
  }),
  component: Gallery,
});

// Photo Database
const photoItems = [
  { src: campus, label: "Main Campus Infrastructure", category: "campus" },
  { src: lib, label: "Central Library Study Hall", category: "academics" },
  { src: lab, label: "High-Tech Computer Science Lab", category: "academics" },
  { src: grad, label: "20th Convocation Day Celebrations", category: "life" },
  { src: sports, label: "Annual Athletics Meet", category: "sports" },
  { src: classroom, label: "Modern Smart Classroom", category: "academics" },
  { src: cultural, label: "Spandan Annual Cultural Festival", category: "sports" },
  { src: school, label: "Janhit World School Campus", category: "campus" },
  { src: law, label: "Moot Court Room - College of Law", category: "academics" },
];

// Video Database
const videoItems = [
  {
    cover: campus,
    title: "Virtual Campus Tour & Facilities Walkthrough",
    desc: "Take a virtual tour of our libraries, laboratories, moot courts, sports complexes, and learning hubs.",
    duration: "3:45",
    category: "tour",
  },
  {
    cover: classroom,
    title: "Inside Janhit: Smart Classroom Learning Sessions",
    desc: "Experience our case-study-based interactive teaching and live academic sessions conducted by senior faculty.",
    duration: "2:15",
    category: "academic",
  },
  {
    cover: cultural,
    title: "Spandan Fest - Annual Cultural Show Highlights",
    desc: "A vibrant recap of dance, music, theatrical plays, and fine art displays put together by our student clubs.",
    duration: "5:20",
    category: "event",
  },
  {
    cover: grad,
    title: "Convocation Ceremony: Student Graduation Diaries",
    desc: "Hear from our gold medalists and graduating alumni as they share their academic experiences and memories.",
    duration: "4:10",
    category: "event",
  },
];

function Gallery() {
  const [activePhotoTab, setActivePhotoTab] = useState("all");
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<(typeof videoItems)[0] | null>(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);

  // Filter Photos
  const filteredPhotos =
    activePhotoTab === "all"
      ? photoItems
      : photoItems.filter((item) => item.category === activePhotoTab);

  // Mock Video Player Timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeVideo && isPlaying) {
      timer = setInterval(() => {
        setVideoTime((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [activeVideo, isPlaying]);

  const handleVideoSelect = (video: (typeof videoItems)[0]) => {
    setActiveVideo(video);
    setVideoLoading(true);
    setIsPlaying(false);
    setVideoTime(0);
    setTimeout(() => {
      setVideoLoading(false);
      setIsPlaying(true);
    }, 1500);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="container-tight relative">
          <FadeIn>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-gold border border-gold/40">
              <Sparkles className="size-3 text-gold" /> Media Archive
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold max-w-3xl leading-tight">
              Life and learning. <span className="text-gradient-gold">Captured</span>.
            </h1>
            <p className="mt-6 text-lg opacity-90 max-w-2xl">
              Explore photo highlights and video tours showing the state-of-the-art infrastructure,
              sports arenas, classrooms, and memorable campus events at Janhit.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Info Quick Links */}
      <section className="py-12 bg-secondary/30">
        <div className="container-tight">
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <a
              href="#photos"
              className="p-8 rounded-3xl bg-card border border-border flex items-center gap-5 hover:border-gold/30 hover:shadow-elegant transition duration-300 group"
            >
              <div className="size-14 rounded-full bg-gold/10 text-gold grid place-items-center shrink-0">
                <ImageIcon className="size-7" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg md:text-xl text-foreground group-hover:text-gold transition-colors">
                  Photo Gallery
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  View campus buildings, labs, classrooms, and convocation moments.
                </p>
              </div>
            </a>
            <a
              href="#videos"
              className="p-8 rounded-3xl bg-card border border-border flex items-center gap-5 hover:border-gold/30 hover:shadow-elegant transition duration-300 group"
            >
              <div className="size-14 rounded-full bg-gold/10 text-gold grid place-items-center shrink-0">
                <Video className="size-7" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg md:text-xl text-foreground group-hover:text-gold transition-colors">
                  Video Gallery
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Watch virtual tours, cultural celebrations, and academic session highlights.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="photos" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Visuals"
            title="Photo Gallery"
            subtitle="Browse snapshots of academic projects, celebrations, and sports activities."
          />

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-10 mb-12">
            {[
              { id: "all", label: "All Photos" },
              { id: "campus", label: "Campus & Infrastructure" },
              { id: "academics", label: "Classrooms & Labs" },
              { id: "sports", label: "Sports & Culture" },
              { id: "life", label: "Student Life" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePhotoTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activePhotoTab === tab.id
                    ? "bg-gradient-gold text-gold-foreground shadow-gold"
                    : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Photo Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] max-w-6xl mx-auto">
            {filteredPhotos.map((item, i) => (
              <FadeIn key={i}>
                <button
                  onClick={() => setActivePhoto(item.src)}
                  className="mb-6 block w-full overflow-hidden rounded-3xl group relative border border-border bg-card shadow-sm hover:shadow-elegant hover:border-gold/20 transition-all duration-500"
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-auto object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                        {item.category}
                      </span>
                      <h4 className="text-white font-display font-semibold text-sm md:text-base mt-1 text-left">
                        {item.label}
                      </h4>
                    </div>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section id="videos" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Media"
            title="Video Gallery & Tours"
            subtitle="Walk through our campuses virtually and look back at our festival keynotes."
          />

          {/* Video Cards Grid - Enlarged Sizing & Bigger Fonts */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            {videoItems.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="rounded-3xl bg-card border border-border overflow-hidden h-full flex flex-col justify-between hover:border-gold/30 hover:shadow-elegant transition duration-300 group">
                  {/* Video Thumbnail */}
                  <div
                    onClick={() => handleVideoSelect(item)}
                    className="relative aspect-video w-full overflow-hidden cursor-pointer bg-black"
                  >
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <div className="size-16 rounded-full bg-gold/90 text-gold-foreground flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-gold transition-all duration-300">
                        <Play className="size-6 fill-current pl-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-4 right-4 bg-black/75 text-white font-mono text-[10px] tracking-wide font-bold px-2 py-0.5 rounded">
                      {item.duration}
                    </span>
                  </div>

                  {/* Video details */}
                  <div className="p-8 md:p-10 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg md:text-xl text-foreground group-hover:text-gold transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-border flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                        Campus Video
                      </span>
                      <button
                        onClick={() => handleVideoSelect(item)}
                        className="inline-flex items-center gap-1 text-xs text-gold font-bold hover:underline"
                      >
                        Watch Now <Play className="size-3 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Lightbox */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/95 grid place-items-center p-4 backdrop-blur-sm animate-fade-in"
        >
          <button className="absolute top-6 right-6 size-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition">
            <X className="size-6" />
          </button>
          <img
            src={activePhoto}
            alt=""
            className="max-h-[85vh] max-w-full rounded-2xl border border-white/10 shadow-2xl animate-zoom-in"
          />
        </div>
      )}

      {/* Mock Video Lightbox Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl rounded-2xl border border-white/15 bg-[#0e0e0f] overflow-hidden shadow-2xl flex flex-col">
            {/* Header control */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between text-white bg-black/35">
              <span className="text-xs font-semibold tracking-wide truncate max-w-md">
                {activeVideo.title}
              </span>
              <button
                onClick={() => {
                  setActiveVideo(null);
                  setIsPlaying(false);
                }}
                className="size-8 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Video viewport area */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center select-none">
              {videoLoading ? (
                <div className="flex flex-col items-center gap-3 text-white">
                  <Loader2 className="size-8 animate-spin text-gold" />
                  <span className="text-xs font-medium tracking-wide">Buffering HD Stream...</span>
                </div>
              ) : (
                <>
                  <img
                    src={activeVideo.cover}
                    alt=""
                    className="w-full h-full object-cover opacity-60"
                  />

                  {/* Play/Pause state animation indicator */}
                  {!isPlaying && (
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="absolute size-20 rounded-full bg-gold/90 text-gold-foreground flex items-center justify-center shadow-2xl border border-white/10 scale-105 transition"
                    >
                      <Play className="size-8 fill-current pl-1 animate-pulse" />
                    </button>
                  )}

                  {/* Mock subtitles or overlay */}
                  {isPlaying && (
                    <div className="absolute bottom-16 inset-x-0 text-center">
                      <span className="bg-black/70 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-lg border border-white/10 select-none">
                        * Streaming Virtual Campus Tour: {activeVideo.duration} mins *
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Custom media player bar */}
            <div className="p-4 bg-black/60 border-t border-white/10 flex flex-col gap-3">
              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/50 font-mono">0:00</span>
                <div className="flex-1 h-1 bg-white/20 rounded-full relative cursor-pointer group">
                  <div
                    className="h-full bg-gold rounded-full relative"
                    style={{ width: `${videoLoading ? 0 : videoTime}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 size-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>
                <span className="text-[10px] text-white/50 font-mono">{activeVideo.duration}</span>
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-between text-white/80">
                <div className="flex items-center gap-4">
                  <button
                    disabled={videoLoading}
                    onClick={() => setIsPlaying((p) => !p)}
                    className="hover:text-white transition disabled:opacity-50"
                  >
                    {isPlaying ? (
                      <Pause className="size-4" />
                    ) : (
                      <Play className="size-4 fill-current" />
                    )}
                  </button>
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="size-4" />
                    <div className="w-16 h-1 bg-white/30 rounded-full">
                      <div className="w-4/5 h-full bg-white rounded-full" />
                    </div>
                  </div>
                </div>
                <div>
                  <button className="hover:text-white transition">
                    <Maximize2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
