import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { allCourses } from "@/data/institutions";
import { SectionHeader } from "@/components/Section";
import { GraduationCap, Search } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Janhit Group" },
      {
        name: "description",
        content:
          "Search and filter all academic programs offered across Janhit colleges and schools.",
      },
      { property: "og:title", content: "All Courses — Janhit Group" },
      {
        property: "og:description",
        content: "Programs in Law, Management, Commerce, Science, Education and K-12.",
      },
    ],
  }),
  component: Courses,
});

const cats = [
  "All",
  "Law",
  "Management",
  "Commerce",
  "Science",
  "Education",
  "Arts",
  "School Education",
];

function Courses() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const list = allCourses.filter(
    (c) =>
      (cat === "All" || c.category === cat) &&
      (q === "" ||
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.institution.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <section className="py-16">
      <div className="container-tight">
        <SectionHeader
          eyebrow="Programs"
          title="Discover the right course for you"
          subtitle="From Law and Management to K-12 — find every program offered across the Janhit family."
        />

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search a course or institution…"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition ${
                cat === c
                  ? "bg-gradient-primary text-primary-foreground shadow-elegant"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((c, i) => (
            <article
              key={c.slug + c.name + i}
              className="group p-6 rounded-2xl bg-card border border-border hover-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="size-12 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
                  <GraduationCap className="size-5 text-gold-foreground" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-accent text-accent-foreground">
                  {c.category}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.institution}</p>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-secondary">
                  <dt className="text-muted-foreground">Duration</dt>
                  <dd className="font-semibold">{c.duration}</dd>
                </div>
                <div className="p-2.5 rounded-lg bg-secondary">
                  <dt className="text-muted-foreground">City</dt>
                  <dd className="font-semibold">{c.city}</dd>
                </div>
                <div className="p-2.5 rounded-lg bg-secondary col-span-2">
                  <dt className="text-muted-foreground">Eligibility</dt>
                  <dd className="font-semibold">{c.eligibility}</dd>
                </div>
                <div className="p-2.5 rounded-lg bg-secondary col-span-2">
                  <dt className="text-muted-foreground">Affiliation</dt>
                  <dd className="font-semibold">{c.affiliation}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        {list.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No matching courses.</p>
        )}
      </div>
    </section>
  );
}
