import { useState, useMemo, useEffect } from "react";
import {
  Users,
  GraduationCap,
  Briefcase,
  Mail,
  Scale,
  Search,
  BookOpen,
  Loader2,
} from "lucide-react";
import { facultyService, FacultyProfile } from "@/services/facultyService";
import { getImageUrl } from "@/utils/utils";

interface FacultyCardProps {
  member: FacultyProfile;
}

function FacultyCard({ member }: FacultyCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getImageUrl(member.image);

  const roleText = member.role || member.designation || "Faculty Member";
  const educationText = member.education || member.qualification || "";

  return (
    <div
      className="bg-white rounded-3xl border-2 border-gold/30 hover:border-gold p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-4"
    >
      <div className="space-y-4">
        {/* Photo / Avatar Header */}
        <div className="flex items-center gap-3.5">
          {imageUrl && !imgError ? (
            <img
              src={imageUrl}
              alt={member.name}
              className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-gold/40 shadow-md shrink-0"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-navy/5 border-2 border-gold/30 flex items-center justify-center text-gold shadow-sm shrink-0 group-hover:bg-navy group-hover:text-gold transition-colors font-serif font-bold text-base">
              <Scale className="w-7 h-7" />
            </div>
          )}

          <div>
            <h3 className="font-serif text-lg font-bold text-navy leading-tight group-hover:text-navy-deep transition-colors">
              {member.name}
            </h3>
            <p className="text-[11px] font-bold text-gold uppercase tracking-wider font-sans mt-0.5">
              {roleText}
            </p>
          </div>
        </div>

        {/* Department Pill */}
        {member.department && (
          <div className="inline-block">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-gold/25 text-[10px] font-semibold text-navy/80 uppercase font-sans">
              {member.department}
            </span>
          </div>
        )}

        {/* Credentials & Bio */}
        <div className="space-y-2 pt-2 border-t border-gold/15 text-xs text-navy/85 font-medium font-sans">
          {educationText && (
            <div className="flex items-start gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
              <span className="font-semibold text-navy/90">{educationText}</span>
            </div>
          )}

          {member.experience && (
            <div className="flex items-start gap-2">
              <Briefcase className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
              <span>{member.experience}</span>
            </div>
          )}

          {member.specialization && (
            <div className="flex items-start gap-2">
              <BookOpen className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
              <span className="line-clamp-2">{member.specialization}</span>
            </div>
          )}
        </div>
      </div>

      {/* Email Contact Footer */}
      {member.email && (
        <div className="pt-3 border-t border-gold/15">
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-1.5 text-xs text-navy/70 hover:text-gold transition-colors font-sans truncate w-full"
          >
            <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="truncate">{member.email}</span>
          </a>
        </div>
      )}
    </div>
  );
}

export function FacultyDirectorySection() {
  const [facultyList, setFacultyList] = useState<FacultyProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    async function loadFaculty() {
      try {
        setIsLoading(true);
        const data = await facultyService.getPublicFacultyList({
          campusSlug: "janhit-college-of-law",
        });
        if (isMounted) {
          setFacultyList(data || []);
        }
      } catch (err: any) {
        console.error("Failed to fetch faculty directory:", err);
        if (isMounted) {
          setFacultyList([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadFaculty();
    return () => {
      isMounted = false;
    };
  }, []);

  const departments = useMemo(() => {
    const depts = new Set<string>();
    facultyList.forEach((member) => {
      if (member.department && member.department.trim()) {
        depts.add(member.department.trim());
      }
    });

    if (depts.size === 0) {
      return [
        "All",
        "Constitutional Law",
        "Criminal Law",
        "Corporate & Commercial",
        "Clinical Advocacy",
      ];
    }

    return ["All", ...Array.from(depts)];
  }, [facultyList]);

  const filteredFaculty = useMemo(() => {
    return facultyList.filter((member) => {
      const memberDept = member.department || "";
      const matchesDept =
        selectedDept === "All" || memberDept.toLowerCase() === selectedDept.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        member.name.toLowerCase().includes(query) ||
        (member.specialization && member.specialization.toLowerCase().includes(query)) ||
        (member.role && member.role.toLowerCase().includes(query)) ||
        (member.designation && member.designation.toLowerCase().includes(query)) ||
        (member.education && member.education.toLowerCase().includes(query)) ||
        (member.qualification && member.qualification.toLowerCase().includes(query)) ||
        memberDept.toLowerCase().includes(query);

      return matchesDept && matchesSearch;
    });
  }, [facultyList, selectedDept, searchQuery]);

  return (
    <section id="faculty-directory" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span>Distinguished Legal Scholars</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
            Faculty Directory
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/85 font-medium leading-relaxed font-sans">
            Mentorship led by distinguished legal scholars, former judges, Ph.D. holders, and senior
            practicing advocates dedicated to nurturing ethical advocacy.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-gold/30">
          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 justify-center md:justify-start">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedDept === dept
                    ? "bg-navy text-white shadow-md border border-gold/40"
                    : "text-navy/70 hover:text-navy hover:bg-white"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty or subject..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gold/30 text-navy placeholder:text-navy/40 text-xs focus:outline-none focus:border-gold shadow-sm font-sans"
            />
          </div>
        </div>

        {/* Faculty Grid or Loading / Empty States */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border border-gold/20 space-y-3">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
            <p className="text-xs font-semibold text-navy/60 uppercase tracking-wider font-sans">
              Loading faculty directory...
            </p>
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-gold/20">
            <p className="text-sm font-medium text-navy/70">
              No faculty members found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFaculty.map((member) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
