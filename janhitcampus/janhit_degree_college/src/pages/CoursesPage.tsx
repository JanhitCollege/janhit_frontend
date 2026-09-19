import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { CourseCard } from "@/components/site/CourseCard";
import { COURSES_DATA } from "@/data/coursesData";
import { Search } from "lucide-react";

export function CoursesPage() {
  const [filter, setFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "UG" && course.degreeType === "Undergraduate") ||
      (filter === "Professional" && course.degreeType === "Professional") ||
      (filter === "Teacher" && (course.degreeType === "Teacher Education" || course.degreeType === "Diploma"));

    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.specializations.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Courses Offered | Janhit Degree College Saharanpur"
        description="Explore undergraduate and professional courses at Janhit Degree College Saharanpur: BA, BBA, BCA, B.Com, B.Ed, D.El.Ed, B.P.Ed and B.Sc. Affiliated to CCSU Meerut."
      />

      <Breadcrumb
        title="Our Academic Programs & Courses"
        items={[{ label: "Courses" }]}
      />

      <section className="py-12 md:py-16 bg-beige/40">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter & Search Bar */}
          <div className="bg-white p-4 md:p-6 rounded-xl border border-gold/30 shadow-md mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "All Courses", value: "All" },
                { label: "UG Degrees (BA, B.Com, B.Sc)", value: "UG" },
                { label: "Professional (BBA, BCA)", value: "Professional" },
                { label: "Teacher Ed (B.Ed, D.El.Ed, B.P.Ed)", value: "Teacher" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    filter === tab.value
                      ? "gradient-gold text-navy-deep shadow"
                      : "bg-beige/60 text-navy hover:bg-gold/20"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/50" />
              <input
                type="text"
                placeholder="Search course or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-md border border-gold/30 bg-beige/30 text-navy focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gold/20">
              <p className="text-navy font-serif text-lg">No matching courses found.</p>
              <button
                onClick={() => {
                  setFilter("All");
                  setSearchTerm("");
                }}
                className="mt-3 text-xs font-bold text-gold hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
