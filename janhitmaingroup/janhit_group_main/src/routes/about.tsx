import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, FadeIn } from "@/components/Section";
import {
  Award,
  GraduationCap,
  Heart,
  Target,
  Users,
  Shield,
  Sparkles,
  ChevronRight,
  User,
  Landmark,
} from "lucide-react";
import heroImg from "@/assets/hero-luxurious-bright.png";
import galleryClassroom from "@/assets/gallery-classroom.jpg";
import galleryLibrary from "@/assets/gallery-library.jpg";
import galleryLab from "@/assets/gallery-lab.jpg";
import gallerySports from "@/assets/gallery-sports.jpg";
import galleryCultural from "@/assets/gallery-cultural.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Janhit Group of Institutions" },
      {
        name: "description",
        content:
          "Established in 2002, Janhit Group is a multi-campus education family across UP — approved by AICTE, NCTE, BCI, CBSE.",
      },
      { property: "og:title", content: "About Janhit Group" },
      {
        property: "og:description",
        content: "Two decades of nurturing minds across Uttar Pradesh.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="container-tight relative">
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-gold border border-gold/40">
              Our Story
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold max-w-3xl leading-tight">
              Building a legacy of <span className="text-gradient-gold">empowered learning</span>.
            </h1>
            <p className="mt-6 text-lg opacity-90 max-w-2xl">
              For over two decades, Janhit Group has stood for accessible, value-driven education
              that bridges tradition with the demands of a modern world.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* History & Legacy Section */}
      <section id="history" className="py-24 scroll-mt-32 bg-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-gold/5 blur-3xl rounded-full" />
        <div className="container-tight">
          <SectionHeader
            eyebrow="History & Legacy"
            title="Two Decades of Educational Excellence"
            subtitle="Since 2002, Janhit Group has been a beacon of academic rigor and access, shaping thousands of careers across Uttar Pradesh."
          />

          <div className="mt-16 max-w-4xl mx-auto relative">
            {/* The vertical timeline bar */}
            <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-border -translate-x-1/2" />

            <div className="space-y-12">
              {[
                {
                  year: "2002",
                  title: "Foundation of Janhit Group",
                  desc: "Established with a bold vision to democratize professional and technical education, our first campus commenced operations in Greater Noida.",
                  icon: GraduationCap,
                },
                {
                  year: "2008",
                  title: "Ghaziabad Campus Expansion",
                  desc: "Marked our entry into Ghaziabad by establishing the Janhit Institute of Education, focusing on teacher-training programs (B.Ed., D.El.Ed) to shape future educators.",
                  icon: Users,
                },
                {
                  year: "2010",
                  title: "Saharanpur College Establishment",
                  desc: "Expanded into western UP with a sprawling degree college in Saharanpur, offering multi-disciplinary programs in Commerce, Science, and Arts.",
                  icon: Landmark,
                },
                {
                  year: "2012",
                  title: "Launch of Janhit World School",
                  desc: "Recognizing the need for values-driven foundational schooling, we launched our first CBSE-affiliated K-12 school in Greater Noida.",
                  icon: Target,
                },
                {
                  year: "2015",
                  title: "Expanding School Network",
                  desc: "Opened CBSE schools in Ghaziabad and Saharanpur, creating a holistic education funnel from kindergarten to doctoral-ready graduates.",
                  icon: Award,
                },
                {
                  year: "Present Day",
                  title: "A Vibrant Community of 10,000+",
                  desc: "Today, Janhit Group stands proud with 7 elite institutions across 3 cities, backed by 100+ expert faculty and an alumni base driving global success.",
                  icon: Sparkles,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={item.year}
                    className="relative flex flex-col md:flex-row items-start md:items-center"
                  >
                    {/* Icon indicator in center */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center size-9 rounded-full bg-gradient-gold text-gold-foreground shadow-gold border-2 border-background">
                      <Icon className="size-4" />
                    </div>

                    {/* Timeline Box */}
                    <div
                      className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"}`}
                    >
                      <FadeIn delay={idx * 0.05}>
                        <div className="p-6 rounded-2xl bg-card border border-border hover:border-gold/30 hover:shadow-elegant transition duration-300 relative group overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-gold opacity-0 group-hover:opacity-5 blur-2xl transition duration-300" />
                          <span className="inline-block text-gold font-display text-2xl font-bold tracking-tight">
                            {item.year}
                          </span>
                          <h4 className="mt-2 text-lg font-bold text-foreground">{item.title}</h4>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </FadeIn>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Purpose & Values"
            title="Our Vision & Mission"
            subtitle="Guiding principles that drive our daily pursuit of educational excellence and leadership."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeIn>
              <div className="h-full p-8 rounded-3xl bg-card border border-border flex flex-col justify-between hover-lift relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 size-32 bg-gradient-gold opacity-10 group-hover:opacity-20 blur-3xl transition animate-float" />
                <div>
                  <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground">
                    <Target className="size-6 text-gold" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold">Our Vision</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    To be a leading center of educational excellence recognized nationally for
                    academic rigor, ethical values, and skill-based learning, transforming young
                    minds into confident, socially-responsible global citizens.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-border/60 text-xs uppercase tracking-wider text-gold font-bold">
                  Looking to the future
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="h-full p-8 rounded-3xl bg-card border border-border flex flex-col justify-between hover-lift relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 size-32 bg-gradient-primary opacity-5 group-hover:opacity-10 blur-3xl transition" />
                <div>
                  <div className="size-12 rounded-xl bg-gradient-gold grid place-items-center text-gold-foreground">
                    <GraduationCap className="size-6" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold">Our Mission</h3>
                  <ul className="mt-4 space-y-3 text-muted-foreground text-sm">
                    {[
                      "Provide state-of-the-art infrastructure and resources for hands-on, modern, and experiential learning.",
                      "Foster academic excellence through experienced faculty, industry partnerships, and practical exposure.",
                      "Encourage holistic development by integrating community engagement, leadership training, and athletic pursuits.",
                      "Ensure quality professional and technical education is accessible and affordable to all segments of society.",
                    ].map((m, idx) => (
                      <li key={idx} className="flex gap-2.5">
                        <ChevronRight className="size-4 text-gold flex-shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-border/60 text-xs uppercase tracking-wider text-primary font-bold">
                  Our day-to-day focus
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Core Values Sub-section */}
          <div className="mt-24">
            <h3 className="text-center font-display text-3xl font-bold mb-12">Our Core Values</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Integrity",
                  desc: "Upholding honesty, ethical conduct, and transparency in all academic and administrative activities.",
                  icon: Shield,
                },
                {
                  title: "Inclusivity",
                  desc: "Creating a welcoming environment that respects diversity and offers equal learning opportunities for all.",
                  icon: Heart,
                },
                {
                  title: "Innovation",
                  desc: "Embracing change, digital tools, and creative problem-solving in teaching and student projects.",
                  icon: Sparkles,
                },
                {
                  title: "Excellence",
                  desc: "Setting high standards for ourselves, striving for continuous improvement, and celebrating success.",
                  icon: Award,
                },
              ].map((val, idx) => {
                const Icon = val.icon;
                return (
                  <FadeIn key={val.title} delay={idx * 0.05}>
                    <div className="p-8 md:p-10 rounded-3xl bg-card border border-border text-center hover:border-gold/30 hover:shadow-elegant transition duration-300 h-full flex flex-col items-center justify-start">
                      <div className="size-14 rounded-full bg-gold/10 grid place-items-center text-gold mb-6">
                        <Icon className="size-7" />
                      </div>
                      <h4 className="font-display text-lg md:text-xl font-bold text-foreground">
                        {val.title}
                      </h4>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section id="management" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Leadership"
            title="Our Management & Leadership"
            subtitle="The visionaries and educators steering the Janhit Group toward academic leadership and societal growth."
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
            {[
              {
                name: "Shri Devendra Gupta",
                role: "Chairman, Janhit Group",
                credentials: "Philanthropist & Educationist",
                quote:
                  "Education is not merely preparation for life; education is life itself. Our goal has always been to make professional and value-based education accessible to every ambitious youth, enabling them to build meaningful careers.",
              },
              {
                name: "Dr. Shelly Gupta",
                role: "Executive Director",
                credentials: "Ph.D in Education, M.B.A.",
                quote:
                  "At Janhit, we cultivate an environment where critical thinking, technological skills, and moral integrity go hand in hand. We train students not just to pass exams, but to solve real-world problems and lead with empathy.",
              },
              {
                name: "Prof. (Dr.) N. K. Sharma",
                role: "Director Academics",
                credentials: "Ph.D, M.Tech, 20+ Years Experience",
                quote:
                  "Academic rigor, hands-on labs, and strong industry linkages are the cornerstones of our pedagogy. We ensure that our students graduate with the practical skills needed to thrive in today's competitive job market.",
              },
            ].map((member, idx) => (
              <FadeIn key={member.name} delay={idx * 0.08}>
                <div className="flex flex-col justify-between h-full p-8 rounded-3xl bg-card border border-border hover:border-gold/30 hover:shadow-elegant transition duration-300 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-gold opacity-5 blur-2xl rounded-full" />
                  <div>
                    {/* Management Avatar placeholder */}
                    <div className="size-20 rounded-2xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-elegant mb-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-black/10" />
                      <User className="size-8 text-gold" />
                    </div>

                    <h3 className="font-display text-xl font-bold text-foreground">
                      {member.name}
                    </h3>
                    <div className="text-sm font-semibold text-gold mt-1">{member.role}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{member.credentials}</div>

                    <p className="mt-6 text-sm text-muted-foreground italic leading-relaxed relative">
                      <span className="absolute -top-3 -left-2 text-4xl text-gold/20 font-serif leading-none font-bold">
                        “
                      </span>
                      {member.quote}
                      <span className="text-4xl text-gold/20 font-serif leading-none font-bold">
                        ”
                      </span>
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border/60 flex items-center gap-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Janhit Executive Board
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliations & Approvals Section */}
      <section id="affiliations" className="py-24 scroll-mt-32 bg-secondary/30 relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Accreditation"
            title="Affiliations & Approvals"
            subtitle="Janhit Group is fully recognized and affiliated with India's premier educational authorities, ensuring globally recognized credentials."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            {[
              {
                title: "AICTE Approved",
                body: "All India Council for Technical Education",
                desc: "Governs our business management and computing courses, validating that our curricula, faculty, and labs meet highest national technical standards.",
              },
              {
                title: "NCTE Recognized",
                body: "National Council for Teacher Education",
                desc: "Accredits our Education programs (B.Ed., D.El.Ed, B.P.Ed), ensuring our teacher-training courses meet teacher licensing standards.",
              },
              {
                title: "BCI Approved",
                body: "Bar Council of India",
                desc: "Approves our legal studies courses (LL.B, B.A. LL.B, LL.M), qualifying our graduates to enroll as advocates and practice law in any Indian court.",
              },
              {
                title: "CBSE Affiliated",
                body: "Central Board of Secondary Education",
                desc: "Affiliates our Janhit World School campuses, delivering a standardized, competitive, and skill-centric national K-12 syllabus.",
              },
              {
                title: "CCS University Affiliated",
                body: "Chaudhary Charan Singh University, Meerut",
                desc: "Affiliates our colleges in Greater Noida and Ghaziabad, awarding recognized bachelor and master degrees to our college graduates.",
              },
              {
                title: "Maa Shakumbhari University",
                body: "Affiliated Degree College",
                desc: "Affiliates our Saharanpur college, delivering undergraduate and postgraduate courses in line with the Uttar Pradesh state university rules.",
              },
            ].map((app, idx) => (
              <FadeIn key={app.title} delay={idx * 0.05}>
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-gold/30 hover:shadow-elegant transition duration-300 h-full flex flex-col justify-between group">
                  <div>
                    <div className="size-10 rounded-xl bg-gold/10 text-gold grid place-items-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Award className="size-5" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-foreground">{app.title}</h4>
                    <div className="text-xs font-semibold text-gold mt-1 uppercase tracking-wider">
                      {app.body}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{app.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section id="infrastructure" className="py-24 scroll-mt-32 bg-background relative">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Campuses"
            title="World-Class Infrastructure"
            subtitle="Our vibrant, eco-friendly campuses are equipped with cutting-edge spaces designed to fuel academic curiosity and creative discovery."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Smart Classrooms",
                desc: "Spacious, air-conditioned lecture halls equipped with premium interactive smartboards, high-speed Wi-Fi, and advanced audio-visual units to support collaborative learning.",
                image: galleryClassroom,
              },
              {
                title: "Research & E-Libraries",
                desc: "A massive repository of reference books, encyclopedias, national journals, law reports, and e-databases like Delnet to assist scholars in thorough academic research.",
                image: galleryLibrary,
              },
              {
                title: "Modern Laboratories",
                desc: "Advanced computing, science, legal aid clinics, and moot courts that provide mock practice and high-level training across management, technology, and arts.",
                image: galleryLab,
              },
              {
                title: "Sports & Recreation Fields",
                desc: "Large playgrounds, football, cricket turf, volleyball courts, indoor sports arenas, and fully equipped fitness gyms to support physical fitness and teamwork.",
                image: gallerySports,
              },
              {
                title: "Auditoriums & Seminar Halls",
                desc: "Air-conditioned corporate-style seminar rooms and large open auditoriums to host national conferences, guest webinars, workshops, and youth cultural festivals.",
                image: galleryCultural,
              },
              {
                title: "Eco-Friendly Green Campuses",
                desc: "Vast landscapes with solar power backup, clean water plants, sewage treatment, and open study spots promoting environmental sustainability and positive mental health.",
                image: heroImg,
              },
            ].map((infra, idx) => (
              <FadeIn key={infra.title} delay={idx * 0.08}>
                <div className="group rounded-3xl overflow-hidden bg-card border border-border hover:shadow-elegant transition duration-300 h-full flex flex-col justify-between">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={infra.image}
                      alt={infra.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="font-display text-lg font-bold leading-tight">
                        {infra.title}
                      </h4>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <p className="text-xs text-muted-foreground leading-relaxed">{infra.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
