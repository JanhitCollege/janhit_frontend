import { useState } from "react";
import { UserCheck, GraduationCap, Award } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { FACULTY_DATA, FacultyMember } from "@/data/peopleAndOrgData";

const departments = [
  "All",
  "Administration & Teacher Education",
  "Faculty of Arts (Humanities)",
  "Faculty of Commerce & BBA",
  "Faculty of Computer Applications (BCA)",
  "Faculty of Science (Chemistry & Bio)",
  "Faculty of Physical Education (B.P.Ed)",
  "Faculty of Education (B.Ed / D.El.Ed)",
];

export function FacultyPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");

  const filteredFaculty = FACULTY_DATA.filter(
    (f) => selectedCategoryMatch(f.department, selectedDept)
  );

  function selectedCategoryMatch(dept: string, selected: string) {
    if (selected === "All") return true;
    return dept.toLowerCase().includes(selected.toLowerCase());
  }

  return (
    <>
      <SEO
        title="Faculty & Academic Staff | Janhit Degree College Saharanpur"
        description="Meet the experienced faculty, professors, and academic department heads at Janhit Degree College Saharanpur."
      />

      <Breadcrumb
        title="Faculty & Academic Staff"
        items={[{ label: "Faculty & Staff" }]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Department Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  selectedDept === dept
                    ? "gradient-gold text-navy-deep shadow"
                    : "bg-beige/60 text-navy hover:bg-gold/20"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Faculty Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map((fac: FacultyMember) => (
              <div
                key={fac.id}
                className="bg-beige/30 rounded-xl p-6 border border-gold/20 shadow-sm hover-lift space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-navy text-gold font-serif text-xl font-bold flex items-center justify-center shrink-0 border-2 border-gold shadow">
                      {fac.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-bold text-navy">{fac.name}</h3>
                      <span className="text-xs font-semibold text-gold block">
                        {fac.designation}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-navy/80 pt-2 border-t border-gold/15">
                    <div className="flex items-start gap-2">
                      <UserCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-navy block">Department</span>
                        <span className="text-navy/70">{fac.department}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <GraduationCap className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-navy block">Qualification</span>
                        <span className="text-navy/70">{fac.qualification}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-gold shrink-0" />
                      <span className="font-bold text-navy">Experience:</span>
                      <span className="text-navy/70">{fac.experience}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
