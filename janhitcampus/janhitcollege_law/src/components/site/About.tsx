import { BookOpen, Scale, Award, Users, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                About Institution
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
                Janhit College of Law
              </h2>
              <div className="h-1 w-20 bg-gold rounded" />
            </div>

            <p className="text-base text-navy/80 leading-relaxed">
              Janhit College of Law, situated in the premium educational hub of Greater Noida, is a
              premier institution dedicated to cultivating legal professionals of the highest
              calibre. Approved by the Bar Council of India (BCI) and affiliated with Chaudhary
              Charan Singh (CCS) University, Meerut, we provide a rigorous academic ecosystem
              combined with extensive practical exposure.
            </p>

            <p className="text-base text-navy/80 leading-relaxed">
              Our campus fosters legal advocacy, research-driven learning, and social consciousness.
              With state-of-the-art facilities including a dedicated Moot Court Hall, free Legal Aid
              Clinic, and a comprehensive law library, we prepare our students to excel in courts,
              corporate legal chambers, and civil services.
            </p>

            {/* Vision & Mission grid */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white border border-gold/15 p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 text-gold font-bold mb-3 font-serif text-xl">
                  <Scale className="h-5 w-5 text-gold" />
                  <span>Our Vision</span>
                </div>
                <p className="text-base text-navy/70 leading-relaxed">
                  To be a leading center for legal education and research, producing ethical
                  advocate leaders who champion justice, public interest, and constitutional values
                  worldwide.
                </p>
              </div>

              <div className="bg-white border border-gold/15 p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 text-gold font-bold mb-3 font-serif text-xl">
                  <BookOpen className="h-5 w-5 text-gold" />
                  <span>Our Mission</span>
                </div>
                <p className="text-base text-navy/70 leading-relaxed">
                  To deliver a comprehensive legal curriculum that integrates academic excellence
                  with hands-on practice, legal aid sensitization, and professional integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Graphical sidebar of achievements */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gold/10 rounded-3xl -rotate-2 transform scale-105" />
            <div className="relative bg-white border border-gold/25 p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="font-serif text-2xl font-bold text-navy border-b border-gold/10 pb-3">
                Why Choose Janhit Law?
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="p-3 bg-navy/5 text-navy rounded-lg shrink-0">
                    <GraduationCap className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-base">Professional Curriculum</h4>
                    <p className="text-sm text-navy/70 mt-0.5">
                      Tailored syllabus aligned with university standards and industry expectations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-navy/5 text-navy rounded-lg shrink-0">
                    <Scale className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-base">Moot Court Practice</h4>
                    <p className="text-sm text-navy/70 mt-0.5">
                      Regular inter-class & state competitions inside our replica moot court room.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-navy/5 text-navy rounded-lg shrink-0">
                    <Users className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-base">Legal Aid & Outreach</h4>
                    <p className="text-sm text-navy/70 mt-0.5">
                      Active legal clinics helping rural communities and giving real exposure.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-navy/5 text-navy rounded-lg shrink-0">
                    <Award className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-base">Distinguished Mentors</h4>
                    <p className="text-sm text-navy/70 mt-0.5">
                      Classes conducted by senior academicians, practicing advocates, and legal
                      writers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
