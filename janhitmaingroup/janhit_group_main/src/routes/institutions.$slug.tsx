import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { institutions, type Institution } from "@/data/institutions";
import {
  Award,
  Calendar,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Check,
} from "lucide-react";
import { FadeIn, SectionHeader } from "@/components/Section";
import { SchoolAdmissions } from "@/components/SchoolAdmissions";
import lib from "@/assets/gallery-library.jpg";
import lab from "@/assets/gallery-lab.jpg";
import grad from "@/assets/gallery-graduation.jpg";
import sports from "@/assets/gallery-sports.jpg";
import classroom from "@/assets/gallery-classroom.jpg";
import cultural from "@/assets/gallery-cultural.jpg";

const gallery = [lib, lab, grad, sports, classroom, cultural];

export const Route = createFileRoute("/institutions/$slug")({
  loader: ({ params }): { inst: Institution } => {
    const inst = institutions.find((i) => i.slug === params.slug);
    if (!inst) throw notFound();
    return { inst };
  },
  head: ({ loaderData }) => {
    const inst = loaderData?.inst;
    if (!inst) return {};
    return {
      meta: [
        { title: `${inst.name} — ${inst.city} | Janhit Group` },
        { name: "description", content: inst.short },
        { property: "og:title", content: `${inst.name} — ${inst.city}` },
        { property: "og:description", content: inst.short },
        { property: "og:image", content: inst.image },
      ],
    };
  },
  component: Detail,
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="text-3xl font-bold">Institution not found</h1>
      <Link to="/institutions" className="text-primary mt-4 inline-block">
        Browse all institutions
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="py-32 text-center">{error.message}</div>,
});

function Detail() {
  const { inst } = Route.useLoaderData() as { inst: Institution };

  return (
    <>
      <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
        <img src={inst.image} alt={inst.name} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
        <div className="relative container-tight h-full flex flex-col justify-end pb-12 text-primary-foreground">
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-3">
              {inst.approvals.map((a) => (
                <span
                  key={a}
                  className="px-3 py-1 rounded-full bg-gradient-gold text-gold-foreground text-xs font-bold"
                >
                  {a} Approved
                </span>
              ))}
              <span className="px-3 py-1 rounded-full glass-dark text-xs font-semibold">
                Est. {inst.established}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight max-w-3xl">
              {inst.name}
            </h1>
            <div className="mt-3 flex items-center gap-2 opacity-90">
              <MapPin className="size-4" /> {inst.location}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16">
        <div className="container-tight grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <FadeIn>
              <h2 className="text-3xl font-display font-bold">Overview</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{inst.description}</p>
            </FadeIn>

            <FadeIn>
              <h2 className="text-3xl font-display font-bold">Courses Offered</h2>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary text-secondary-foreground">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Programme</th>
                      <th className="text-left px-4 py-3 font-semibold">Affiliation</th>
                      <th className="text-left px-4 py-3 font-semibold">Eligibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inst.courses.map((c) => (
                      <tr key={c} className="border-t border-border">
                        <td className="px-4 py-3 font-semibold">{c}</td>
                        <td className="px-4 py-3 text-muted-foreground">{inst.affiliation}</td>
                        <td className="px-4 py-3 text-muted-foreground">As per university norms</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>

            <FadeIn>
              <h2 className="text-3xl font-display font-bold">Facilities</h2>
              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                {[
                  "Smart classrooms",
                  "Modern library",
                  "Science & computer labs",
                  "Sports complex",
                  "Hostel & cafeteria",
                  "Wi-Fi enabled campus",
                  "Auditorium",
                  "Medical room",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="size-7 rounded-md bg-gradient-gold grid place-items-center">
                      <Check className="size-4 text-gold-foreground" />
                    </div>
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn>
              <h2 className="text-3xl font-display font-bold">Campus Gallery</h2>
              <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
                {gallery.map((g, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden">
                    <img
                      src={g}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover hover:scale-110 transition duration-700"
                    />
                  </div>
                ))}
              </div>
            </FadeIn>

            {inst.type === "School" ? (
              <SchoolAdmissions />
            ) : (
              <FadeIn>
                <h2 className="text-3xl font-display font-bold">Admission Process</h2>
                <ol className="mt-5 space-y-4">
                  {[
                    ["Inquire", "Submit your interest via the inquiry form or call our team."],
                    ["Apply", "Fill the online application and upload required documents."],
                    ["Counselling", "Attend a counselling session to choose the right program."],
                    ["Enroll", "Complete fee payment and confirm your seat."],
                  ].map(([t, d], i) => (
                    <li key={t} className="flex gap-4">
                      <div className="size-9 shrink-0 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{t}</h4>
                        <p className="text-sm text-muted-foreground">{d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </FadeIn>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 self-start">
            <div className="p-6 rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
              <h3 className="font-display text-xl font-bold">Quick Facts</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Calendar className="size-4 text-gold" /> Established {inst.established}
                </li>
                <li className="flex items-center gap-2">
                  <Award className="size-4 text-gold" /> {inst.affiliation}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="size-4 text-gold" /> {inst.location}
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4 text-gold" /> {inst.phone}
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="size-4 text-gold" /> {inst.email}
                </li>
              </ul>
              <Link
                to="/admissions"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-gold text-gold-foreground font-semibold"
              >
                Apply Now <ArrowRight className="size-4" />
              </Link>
              <a
                href={inst.website}
                target="_blank"
                rel="noreferrer"
                className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass-dark font-semibold"
              >
                Visit Website <ExternalLink className="size-4" />
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border">
              <iframe
                title="map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(inst.location)}&output=embed`}
                className="w-full aspect-square border-0"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
