import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { CampusVideoPlayer } from "./CampusVideoPlayer";
import robotics from "@/assets/gallery-robotics.jpg";
import shooting from "@/assets/gallery-shooting.jpg";
import sports from "@/assets/gallery-sports.jpg";
import library from "@/assets/gallery-library.jpg";
import classroom from "@/assets/about-classroom.jpg";
import foundational from "@/assets/foundational.jpg";
import { Calendar, Image as ImageIcon, Video, Grid } from "lucide-react";

type FilterType = "all" | "image" | "video" | "events";

const items = [
  { src: robotics, alt: "Robotics & STEM Lab", className: "md:row-span-2", w: 1024, h: 1280 },
  { src: sports, alt: "Sports Field & Athletics", className: "", w: 1280, h: 896 },
  { src: classroom, alt: "Interactive Smart Classroom", className: "", w: 1024, h: 1024 },
  { src: library, alt: "Knowledge Hub & Library", className: "md:row-span-2", w: 1024, h: 1280 },
  { src: shooting, alt: "10m Indoor Shooting Range", className: "", w: 1280, h: 896 },
  { src: foundational, alt: "Foundational Stage Activity Zone", className: "", w: 1280, h: 896 },
];

const eventsList = [
  {
    title: "Annual Sports Meet & Athletic Championship",
    date: "Annual Event",
    desc: "Track and field competitions, archery, shooting exhibitions, and inter-house trophies.",
    img: sports,
  },
  {
    title: "Science, AI & Robotics Innovation Expo",
    date: "Innovators Expo",
    desc: "Student projects in robotics, AI coding, automation, and sustainable energy models.",
    img: robotics,
  },
  {
    title: "Cultural Festival & Performing Arts Gala",
    date: "Cultural Gala",
    desc: "Music performances, theatrical plays, classical dance, and visual art exhibitions.",
    img: classroom,
  },
];

export function Campus() {
  const location = useLocation();
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const hash = location.hash.toLowerCase();
    if (hash.includes("image")) {
      setFilter("image");
    } else if (hash.includes("video")) {
      setFilter("video");
    } else if (hash.includes("event")) {
      setFilter("events");
    } else {
      setFilter("all");
    }
  }, [location.hash]);

  return (
    <div className="bg-white min-h-screen pt-28 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Header & Intro */}
        <SectionHeader
          eyebrow="Campus Gallery & Media"
          title={
            <>
              Step inside the <span className="italic text-gradient-gold">Janhit world.</span>
            </>
          }
          description="Explore our campus through high-resolution photography, live interactive videos, and annual celebration highlights."
        />

        {/* Filter Navigation Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {[
            { id: "all", label: "All Media", icon: Grid },
            { id: "image", label: "Photo Gallery", icon: ImageIcon },
            { id: "video", label: "Video Gallery", icon: Video },
            { id: "events", label: "Events & Celebrations", icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as FilterType)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0B2566] text-white shadow-md scale-[1.02]"
                    : "bg-slate-100 text-gray-700 hover:bg-slate-200 border border-gray-200"
                }`}
              >
                <Icon className={`size-4 ${isActive ? "text-gold" : "text-gray-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Image Gallery Section (Shows ONLY when filter is "all" or "image") */}
        {(filter === "all" || filter === "image") && (
          <motion.section
            id="image-gallery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 scroll-mt-28"
          >
            {filter === "all" && (
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                <ImageIcon className="size-5 text-[#0B2566]" />
                <h2 className="font-serif text-2xl font-bold text-[#0B2566]">Photo Gallery</h2>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[240px] gap-4">
              {items.map((it, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className={`relative rounded-2xl overflow-hidden group shadow-glass ${it.className}`}
                >
                  <img
                    src={it.src}
                    alt={it.alt}
                    loading="lazy"
                    width={it.w}
                    height={it.h}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 text-white font-serif text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {it.alt}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Video Gallery Section (Shows ONLY when filter is "all" or "video") */}
        {(filter === "all" || filter === "video") && (
          <motion.section
            id="video-gallery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 scroll-mt-28"
          >
            {filter === "all" && (
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                <Video className="size-5 text-[#0B2566]" />
                <h2 className="font-serif text-2xl font-bold text-[#0B2566]">Video Gallery & Live Walkthrough</h2>
              </div>
            )}

            <CampusVideoPlayer />
          </motion.section>
        )}

        {/* Events Section (Shows ONLY when filter is "all" or "events") */}
        {(filter === "all" || filter === "events") && (
          <motion.section
            id="events"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="scroll-mt-28"
          >
            {filter === "all" && (
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                <Calendar className="size-5 text-[#0B2566]" />
                <h2 className="font-serif text-2xl font-bold text-[#0B2566]">Events & Annual Celebrations</h2>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {eventsList.map((ev, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:border-[#0B2566] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={ev.img}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-navy-deep/80 text-gold text-xs font-bold backdrop-blur-md">
                      {ev.date}
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#0B2566] group-hover:text-gold transition-colors">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      {ev.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
