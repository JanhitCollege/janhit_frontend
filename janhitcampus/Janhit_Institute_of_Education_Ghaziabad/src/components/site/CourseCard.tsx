import { Link } from "react-router-dom";
import { Clock, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { CourseItem } from "@/data/coursesData";

interface CourseCardProps {
  course: CourseItem;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gold/30 shadow-md hover:shadow-xl hover-lift p-5 sm:p-6 flex flex-col sm:flex-row items-stretch justify-between gap-5 relative overflow-hidden group">
      {/* Left Main Area: Badges, Title, Description & Action */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-navy bg-gold/15 px-3 py-0.5 rounded-full border border-gold/40">
              {course.degreeType}
            </span>
            {course.approval && (
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {course.approval}
              </span>
            )}
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy group-hover:text-gold transition-colors leading-snug">
            {course.name}
          </h3>

          <p className="text-xs sm:text-sm text-navy/80 leading-relaxed font-normal line-clamp-2 mt-1">
            {course.shortDescription}
          </p>
        </div>

        <div className="pt-1">
          <Link
            to={`/courses/${course.slug}`}
            className="text-xs sm:text-sm font-bold text-navy hover:text-gold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Full Details</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Right Column Box: Details & Apply Button */}
      <div className="w-full sm:w-60 md:w-64 bg-slate-50 p-4 rounded-xl border border-gold/25 flex flex-col justify-between space-y-3 shrink-0">
        <div className="space-y-2 text-xs sm:text-sm text-navy/85">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold shrink-0" />
            <span className="font-bold text-navy">Duration:</span>
            <span>{course.duration}</span>
          </div>

          <div className="flex items-start gap-2">
            <GraduationCap className="h-4 w-4 text-gold shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-navy">Eligibility: </span>
              <span className="text-navy/80">{course.eligibility}</span>
            </div>
          </div>

          {course.specializations.length > 0 && (
            <div className="flex items-start gap-2">
              <BookOpen className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-navy">Subjects: </span>
                <span className="text-navy/80">{course.specializations.slice(0, 3).join(", ")}</span>
              </div>
            </div>
          )}
        </div>

        <Link
          to={`/admission/${course.slug}`}
          className="w-full py-2 px-3 rounded-lg gradient-gold text-navy-deep font-bold text-xs sm:text-sm tracking-wide uppercase shadow-gold hover:-translate-y-0.5 transition-all text-center block cursor-pointer"
        >
          Apply for Admission
        </Link>
      </div>
    </div>
  );
}
