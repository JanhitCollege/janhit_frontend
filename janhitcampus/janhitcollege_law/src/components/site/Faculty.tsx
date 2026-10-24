import { useEffect, useState } from "react";
import { Mail, Briefcase, GraduationCap, Scale, Loader2 } from "lucide-react";
import { facultyService, FacultyProfile } from "@/services/facultyService";
import { getImageUrl } from "@/utils/utils";

const recruiters = [
  "District Courts Noida",
  "Delhi High Court Chambers",
  "Leading Legal Corporate Firms",
  "Legal Aid NGOs",
  "Real Estate Legal Cells",
];

export function Faculty() {
  const [facultyList, setFacultyList] = useState<FacultyProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;
    async function fetchFaculty() {
      try {
        setIsLoading(true);
        const data = await facultyService.getPublicFacultyList({
          campusSlug: "janhit-college-of-law",
        });
        if (isMounted) {
          setFacultyList(data || []);
        }
      } catch (err) {
        console.error("Failed to load faculty list:", err);
        if (isMounted) {
          setFacultyList([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchFaculty();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="faculty" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Faculty Section */}
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">
              Academic Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">Faculty & Staff</h2>
            <div className="h-1 w-20 bg-gold mx-auto rounded" />
            <p className="text-sm text-navy/85 font-medium">
              Classes are guided by senior legal experts, former judges, and research scholars
              committed to student success.
            </p>
          </div>

          {/* Faculty Grid or Loading / Empty */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-gold animate-spin" />
              <p className="text-xs text-navy/60 font-semibold uppercase tracking-wider mt-3">
                Loading faculty...
              </p>
            </div>
          ) : facultyList.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 border border-gold/20 rounded-xl">
              <p className="text-sm text-navy/85 font-medium">No faculty profiles available at this moment.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facultyList.map((member) => {
                const imageUrl = getImageUrl(member.image);
                const hasImgError = failedImages[member.id];
                const roleText = member.role || member.designation || "Faculty Member";
                const educationText = member.education || member.qualification || "";

                return (
                  <div
                    key={member.id}
                    className="bg-white border border-gold/15 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* Profile Card Header */}
                    <div className="space-y-3">
                      {imageUrl && !hasImgError ? (
                        <img
                          src={imageUrl}
                          alt={member.name}
                          onError={() => handleImageError(member.id)}
                          className="h-16 w-16 rounded-full object-cover object-top border-2 border-gold/40 shadow-md"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-navy/5 rounded-full flex items-center justify-center text-gold">
                          <Scale className="h-6 w-6" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-serif text-lg font-bold text-navy">{member.name}</h3>
                        <span className="text-sm text-gold font-semibold uppercase tracking-wider block mt-0.5">
                          {roleText}
                        </span>
                      </div>
                    </div>

                    {/* Profile Card Info */}
                    <div className="mt-4 pt-4 border-t border-gold/10 space-y-2.5 text-sm text-navy/75">
                      {educationText && (
                        <div className="flex items-start gap-2">
                          <GraduationCap className="h-4 w-4 text-navy/50 shrink-0 mt-0.5" />
                          <span>{educationText}</span>
                        </div>
                      )}
                      {member.experience && (
                        <div className="flex items-start gap-2">
                          <Briefcase className="h-4 w-4 text-navy/50 shrink-0 mt-0.5" />
                          <span>{member.experience}</span>
                        </div>
                      )}
                    </div>

                    {/* Email Footer */}
                    {member.email && (
                      <div className="mt-5 pt-3 border-t border-gold/5 flex items-center justify-between text-xs text-navy/60">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-gold" />
                          <span>{member.email}</span>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Placement Section */}
        <div
          id="placement"
          className="bg-white border border-gold/15 rounded-2xl p-8 md:p-10 shadow-lg grid lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Career Development
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                Placement & Internship Cell
              </h2>
              <div className="h-1 w-20 bg-gold rounded" />
            </div>

            <p className="text-sm text-navy/85 font-medium leading-relaxed">
              Our dedicated Placement Cell bridges the gap between classrooms and courtrooms. We
              mandate internship terms in Trial Courts, High Courts, and Corporate law departments
              to ensure students graduate with real-world case exposure.
            </p>

            <p className="text-sm text-navy/85 font-medium leading-relaxed">
              We conduct weekly legal drafting clinics, guest lectures on soft skills, CV builder
              workshops, and invite local legal partners to hire on-campus.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {recruiters.map((rec, i) => (
                <span
                  key={i}
                  className="bg-navy/5 text-navy border border-navy/10 px-3 py-1.5 rounded-full text-xs font-semibold"
                >
                  {rec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
