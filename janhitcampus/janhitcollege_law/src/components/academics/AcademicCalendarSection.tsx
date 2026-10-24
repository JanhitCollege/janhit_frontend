import { useState } from "react";
import {
  Calendar,
  Clock,
  Download,
  AlertCircle,
  CheckCircle2,
  Bookmark,
  Scale,
  Sparkles,
} from "lucide-react";

interface CalendarEvent {
  month: string;
  title: string;
  category: "Academics" | "Moot Court" | "Examinations" | "Legal Aid" | "Recess";
  details: string;
  status: "Completed" | "Upcoming" | "Active";
}

export function AcademicCalendarSection() {
  const [activeSemester, setActiveSemester] = useState<"odd" | "even">("odd");

  const oddSemesterEvents: CalendarEvent[] = [
    {
      month: "July - August",
      title: "Academic Session Inauguration & Orientation",
      category: "Academics",
      details:
        "Commencement of regular lectures for Odd Semesters (I, III, V, VII, IX). Formal orientation, white-coat/robe ceremony, and introduction to library e-resources (SCC Online/AIR).",
      status: "Completed",
    },
    {
      month: "September",
      title: "Intra-College Moot Court Competition & Trial Advocacy Workshop",
      category: "Moot Court",
      details:
        "Preliminary memorial submissions, moot problem orientation on Constitutional and Criminal law, followed by courtroom oral arguments in the replica Moot Court Hall.",
      status: "Completed",
    },
    {
      month: "October",
      title: "Continuous Internal Assessment (CIE-I) & Case Study Submissions",
      category: "Academics",
      details:
        "First mid-term internal written examinations, project topic allocations, and continuous assessment evaluations under CCSU guidelines.",
      status: "Active",
    },
    {
      month: "November",
      title: "National Legal Services Day & Free Legal Aid Outreach Camp",
      category: "Legal Aid",
      details:
        "Community legal literacy camp conducted in nearby rural panchayats in collaboration with District Legal Services Authority (DLSA) Gautam Buddha Nagar.",
      status: "Upcoming",
    },
    {
      month: "December",
      title: "CCSU Odd Semester University Theory & Clinical Viva Exams",
      category: "Examinations",
      details:
        "End-term centralized written examinations conducted by Chaudhary Charan Singh University, Meerut, alongside practical clinical viva-voce evaluations.",
      status: "Upcoming",
    },
    {
      month: "Late Dec - Early Jan",
      title: "Winter Recess & Mandatory Legal Chamber Internships",
      category: "Recess",
      details:
        "Winter break combined with compulsory 3-week court/advocate chamber/law firm internships as mandated by Bar Council of India norms.",
      status: "Upcoming",
    },
  ];

  const evenSemesterEvents: CalendarEvent[] = [
    {
      month: "January",
      title: "Even Semester Session Commencement",
      category: "Academics",
      details:
        "Resumption of classroom teaching for Even Semesters (II, IV, VI, VIII, X). Distribution of updated course plans, Bare Acts, and clinical journal formats.",
      status: "Upcoming",
    },
    {
      month: "February",
      title: "Supreme Court & High Court Study Visit",
      category: "Academics",
      details:
        "Guided institutional observation visit to the Supreme Court of India and Delhi/Allahabad High Court benches to witness live constitutional proceedings.",
      status: "Upcoming",
    },
    {
      month: "March",
      title: "National Law Conference & Second Internal Evaluation (CIE-II)",
      category: "Academics",
      details:
        "National seminar on contemporary legal and human rights developments with research paper presentations, plus second internal evaluation exams.",
      status: "Upcoming",
    },
    {
      month: "April",
      title: "Annual Sports Meet & Inter-Departmental Lex Fest",
      category: "Academics",
      details:
        "Annual collegiate cultural, athletic, and literary competitions encouraging holistic student development beyond classroom legal theory.",
      status: "Upcoming",
    },
    {
      month: "May - June",
      title: "CCSU Even Semester University Theory Exams & Clinical Viva",
      category: "Examinations",
      details:
        "End-term centralized university examinations by CCSU Meerut. Submission of internship diaries, moot court memorials, and ADR practical portfolios.",
      status: "Upcoming",
    },
    {
      month: "June - July",
      title: "Summer Vacation & Long-Term Institutional Internships",
      category: "Recess",
      details:
        "Summer break with mandatory 4-week corporate, judicial clerkship, or legal NGO internships complying with the BCI 20-week/12-week total mandate.",
      status: "Upcoming",
    },
  ];

  const currentEvents = activeSemester === "odd" ? oddSemesterEvents : evenSemesterEvents;

  const getCategoryBadgeClass = (category: CalendarEvent["category"]) => {
    switch (category) {
      case "Examinations":
        return "bg-rose-100 text-rose-800 border-rose-300";
      case "Moot Court":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Legal Aid":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Recess":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-navy/10 text-navy border-navy/20";
    }
  };

  return (
    <section id="academic-calendar" className="py-16 md:py-20 bg-white border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Structured Timelines</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
            Academic Calendar
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/85 font-medium leading-relaxed font-sans">
            Comprehensive annual roadmap mapping semester teaching schedules, internal evaluations,
            national moot courts, legal aid camps, and CCSU university end-term examinations.
          </p>
        </div>

        {/* Semester Tab Switcher */}
        <div className="flex justify-center">
          <div className="bg-slate-50 border-2 border-gold/30 p-1.5 rounded-2xl shadow-md flex gap-2">
            <button
              onClick={() => setActiveSemester("odd")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeSemester === "odd"
                  ? "bg-navy text-white shadow-md border border-gold/40"
                  : "text-navy/70 hover:text-navy hover:bg-white"
              }`}
            >
              <Clock className="w-4 h-4 text-gold" />
              <span>Odd Semester (July – December)</span>
            </button>
            <button
              onClick={() => setActiveSemester("even")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeSemester === "even"
                  ? "bg-navy text-white shadow-md border border-gold/40"
                  : "text-navy/70 hover:text-navy hover:bg-white"
              }`}
            >
              <Clock className="w-4 h-4 text-gold" />
              <span>Even Semester (January – June)</span>
            </button>
          </div>
        </div>

        {/* Timeline Event Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEvents.map((event, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border-2 border-gold/30 hover:border-gold p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gold uppercase tracking-wider font-sans flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>{event.month}</span>
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(
                      event.category
                    )}`}
                  >
                    {event.category}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-navy leading-snug group-hover:text-navy-deep transition-colors">
                  {event.title}
                </h3>

                <p className="text-xs text-navy/85 font-medium leading-relaxed font-sans">
                  {event.details}
                </p>
              </div>

              <div className="pt-3 border-t border-gold/15 flex items-center justify-between text-[11px] text-navy/60 font-sans">
                <span>Phase: Milestone #{idx + 1}</span>
                <span className="text-gold font-bold uppercase tracking-wider">
                  {event.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Statutory Compliance Advisory Banner */}
        <div className="bg-slate-50 border-2 border-gold/35 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-gold/15 border border-gold/30 text-navy shrink-0 mt-0.5">
              <AlertCircle className="w-6 h-6 text-gold" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-bold text-navy">
                Statutory Regulatory Alignment
              </h4>
              <p className="text-xs md:text-sm text-navy/85 font-medium leading-relaxed font-sans max-w-2xl">
                The academic calendar operates strictly under the academic ordinances of Chaudhary Charan Singh
                University, Meerut and Rule 10 of the Bar Council of India Rules of Legal Education. Exact examination
                schedules are notified per university date sheets.
              </p>
            </div>
          </div>

          <a
            href="/downloads"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-navy hover:bg-navy-deep text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 border border-gold/30 cursor-pointer"
          >
            <Download className="w-4 h-4 text-gold" />
            <span>Download Calendar PDF</span>
          </a>
        </div>
      </div>
    </section>
  );
}
