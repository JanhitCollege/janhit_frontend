import { Bell, Award, Calendar, Image as ImageIcon, ExternalLink } from "lucide-react";
import hero1 from "@/assets/janhit hero image 1.jpg";
import hero2 from "@/assets/janhit hero image 2.jpg";

const notices = [
  {
    date: "July 12, 2026",
    title: "Odd Semester Admission Counseling begins.",
    desc: "First list counselling slots for B.A.LL.B & LL.B published on the board.",
    tag: "Admissions",
  },
  {
    date: "July 08, 2026",
    title: "CCS University Main Exam Schedule released.",
    desc: "Odd semester examination forms submission last date extended.",
    tag: "Exams",
  },
  {
    date: "June 25, 2026",
    title: "Anti-Ragging Undertaking mandatory submission.",
    desc: "All enrolled students must file their anti-ragging affidavits online.",
    tag: "Notice",
  },
];

const events = [
  {
    title: "National Moot Court Competition 2026",
    date: "October 18-20, 2026",
    details:
      "Host court mock cases covering criminal trial proceedings. Registration opens next month.",
  },
  {
    title: "Guest Lecture: Constitutional Law & Rights",
    date: "July 24, 2026",
    details: "Delivered by senior High Court advocates on modern fundamental rights issues.",
  },
  {
    title: "Legal Aid Camp in KP-1 Villagers Outreach",
    date: "August 12, 2026",
    details: "Free legal consulting camp organized by legal clinic in KP-1, Greater Noida.",
  },
];

const galleryImages = [
  { src: hero1, title: "Moot Court Hall Training" },
  { src: hero2, title: "Front Campus View" },
  { src: hero1, title: "Well-equipped Law Library" },
  { src: hero2, title: "Legal Aid Clinic Office" },
];

export function NewsEvents() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* News & Events Dual Grid */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* News & Notices Board */}
          <div id="notices" className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Updates Bulletin
              </span>
              <h2 className="text-3xl font-serif font-bold text-navy flex items-center gap-2">
                <Bell className="h-7 w-7 text-gold animate-bounce" />
                <span>News & Notices</span>
              </h2>
              <div className="h-1 w-20 bg-gold rounded" />
            </div>

            <div className="bg-white border border-gold/15 rounded-2xl shadow-md p-6 divide-y divide-gold/10">
              {notices.map((n, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-sm text-navy/50 font-semibold">{n.date}</span>
                    <span className="text-xs bg-navy/5 text-navy border border-navy/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {n.tag}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-navy hover:text-gold transition-colors cursor-pointer flex items-center gap-1">
                    <span>{n.title}</span>
                    <ExternalLink className="h-3 w-3 text-navy/40" />
                  </h4>
                  <p className="text-sm text-navy/60 leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Events & Activities */}
          <div id="events" className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Student Activities
              </span>
              <h2 className="text-3xl font-serif font-bold text-navy flex items-center gap-2">
                <Calendar className="h-7 w-7 text-gold" />
                <span>Events & Activities</span>
              </h2>
              <div className="h-1 w-20 bg-gold rounded" />
            </div>

            <div className="space-y-4">
              {events.map((e, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gold/15 p-5 rounded-xl shadow-sm hover:border-gold transition-all flex gap-4"
                >
                  <div className="bg-gold/10 text-gold border border-gold/20 p-3 h-fit rounded-lg hidden sm:block shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gold uppercase tracking-wider font-bold block">
                      {e.date}
                    </span>
                    <h4 className="font-serif text-base font-bold text-navy">{e.title}</h4>
                    <p className="text-sm text-navy/60 leading-relaxed">{e.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Showcase */}
        <div id="gallery" className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">
              Campus in Focus
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy flex items-center justify-center gap-2">
              <ImageIcon className="h-7 w-7 text-gold" />
              <span>Campus Gallery</span>
            </h2>
            <div className="h-1 w-20 bg-gold mx-auto rounded" />
            <p className="text-sm text-navy/70">
              Take a visual tour around our campus facilities, training libraries, and student moot
              activities.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl border border-gold/15 shadow-sm bg-navy-deep h-56 cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-[0.8] group-hover:brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h4 className="text-white font-serif text-sm font-semibold">{img.title}</h4>
                  <span className="text-[10px] text-gold uppercase tracking-wider mt-0.5">
                    Janhit College of Law
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
