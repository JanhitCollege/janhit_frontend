import { Bell, Award, Calendar, ExternalLink } from "lucide-react";

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

export function NewsEvents() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
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
      </div>
    </section>
  );
}
