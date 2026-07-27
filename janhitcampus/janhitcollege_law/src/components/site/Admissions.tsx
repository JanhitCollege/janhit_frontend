import { Calendar, UserPlus, ClipboardList, CheckSquare, Award } from "lucide-react";

export function Admissions() {
  return (
    <section id="admissions" className="py-20 bg-beige/10 border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Admissions Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Admissions 2026-27
              </span>
              <h2 className="text-3xl font-serif font-bold text-navy">Admission Guidelines</h2>
              <div className="h-1 w-20 bg-gold rounded" />
            </div>

            <p className="text-sm text-navy/80 leading-relaxed">
              Admissions to the B.A.LL.B (5 Years) and LL.B (3 Years) programs are carried out in
              strict accordance with the norms of the Bar Council of India (BCI) and Chaudhary
              Charan Singh (CCS) University, Meerut.
            </p>

            {/* Admission Steps */}
            <div className="space-y-5 pt-3">
              <div className="flex gap-4">
                <div className="h-10 w-10 bg-navy text-white font-bold flex items-center justify-center rounded-lg shrink-0 border border-gold/20 shadow">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-navy text-lg">Online/Offline Registration</h4>
                  <p className="text-base text-navy/70 mt-1">
                    Fill out the online application form below or visit the campus admission desk to
                    purchase the registration prospectus.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 bg-navy text-white font-bold flex items-center justify-center rounded-lg shrink-0 border border-gold/20 shadow">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-navy text-lg">
                    Document Verification & Counselling
                  </h4>
                  <p className="text-base text-navy/70 mt-1">
                    Bring original and Xerox copies of required academic transcripts, identity
                    proofs, category certificates, and photographs for verification.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 bg-navy text-white font-bold flex items-center justify-center rounded-lg shrink-0 border border-gold/20 shadow">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-navy text-lg">Personal Interview</h4>
                  <p className="text-base text-navy/70 mt-1">
                    Candidates undergo a brief interactive interview to assess writing logic,
                    general knowledge, and interest in legal science.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 bg-navy text-white font-bold flex items-center justify-center rounded-lg shrink-0 border border-gold/20 shadow">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-navy text-lg">Seat Allotment & Enrollment</h4>
                  <p className="text-base text-navy/70 mt-1">
                    Selected candidates complete admission formalities by paying the prescribed fee
                    under University registration timelines.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Calendar Column */}
          <div id="calendar" className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                University Schedule
              </span>
              <h2 className="text-3xl font-serif font-bold text-navy">Academic Calendar</h2>
              <div className="h-1 w-20 bg-gold rounded" />
            </div>

            <p className="text-sm text-navy/80 leading-relaxed">
              Janhit College of Law aligns its academic terms to ensure sufficient time for
              theoretical teaching, moot practice, and examinations.
            </p>

            {/* Calendar Table */}
            <div className="bg-white border border-gold/15 rounded-xl shadow-md overflow-hidden">
              <div className="bg-navy text-white p-4 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Calendar className="h-4.5 w-4.5 text-gold" />
                <span>Standard Academic Cycle</span>
              </div>
              <div className="divide-y divide-gold/10">
                <div className="p-4 flex justify-between items-start gap-4">
                  <div>
                    <span className="text-sm font-bold text-navy block">Odd Semester (Term I)</span>
                    <span className="text-sm text-navy/60 block mt-0.5">July — December</span>
                  </div>
                  <span className="text-xs bg-gold/10 text-gold border border-gold/20 font-bold px-2 py-1 rounded uppercase tracking-wider">
                    Instructional System
                  </span>
                </div>

                <div className="p-4 flex justify-between items-start gap-4">
                  <div>
                    <span className="text-sm font-bold text-navy block">
                      Even Semester (Term II)
                    </span>
                    <span className="text-sm text-navy/60 block mt-0.5">February — June</span>
                  </div>
                  <span className="text-xs bg-gold/10 text-gold border border-gold/20 font-bold px-2 py-1 rounded uppercase tracking-wider">
                    Instructional System
                  </span>
                </div>

                <div className="p-4 flex justify-between items-start gap-4">
                  <div>
                    <span className="text-sm font-bold text-navy block">
                      Annual System Vacation & Exams
                    </span>
                    <span className="text-sm text-navy/60 block mt-0.5">August — May Cycle</span>
                  </div>
                  <span className="text-xs bg-gold/10 text-gold border border-gold/20 font-bold px-2 py-1 rounded uppercase tracking-wider">
                    CCSU Timeline
                  </span>
                </div>

                <div className="p-4 flex justify-between items-start gap-4">
                  <div>
                    <span className="text-sm font-bold text-navy block">
                      Practical Moot Competitions
                    </span>
                    <span className="text-sm text-navy/60 block mt-0.5">October & March Slots</span>
                  </div>
                  <span className="text-xs bg-navy/5 text-navy border border-navy/10 font-bold px-2 py-1 rounded uppercase tracking-wider">
                    Internal Events
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
