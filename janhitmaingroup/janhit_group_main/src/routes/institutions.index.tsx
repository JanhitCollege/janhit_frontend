import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { institutions } from "@/data/institutions";
import { InstitutionCard } from "@/components/InstitutionCard";
import { SectionHeader } from "@/components/Section";

export const Route = createFileRoute("/institutions/")({
  head: () => ({
    meta: [
      { title: "Institutions — Janhit Group" },
      {
        name: "description",
        content:
          "Explore all colleges and schools in the Janhit Group across Greater Noida, Ghaziabad and Saharanpur.",
      },
      { property: "og:title", content: "Our Institutions — Janhit Group" },
      { property: "og:description", content: "Seven institutions across three cities." },
    ],
  }),
  component: InstitutionsPage,
});

function InstitutionsPage() {
  const [filter, setFilter] = useState<"All" | "College" | "School">("All");
  const [city, setCity] = useState<"All" | string>("All");

  const cities = ["All", ...Array.from(new Set(institutions.map((i) => i.city)))];
  const list = institutions.filter(
    (i) => (filter === "All" || i.type === filter) && (city === "All" || i.city === city),
  );

  return (
    <section className="py-16">
      <div className="container-tight">
        <SectionHeader
          eyebrow="Institutions"
          title="Find your campus"
          subtitle="Filter by type or city to discover the right Janhit institution for you."
        />

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <div className="flex gap-1 p-1 rounded-xl bg-secondary">
            {(["All", "College", "School"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
                  filter === t ? "bg-card shadow-elegant text-primary" : "text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold"
          >
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((i, idx) => (
            <InstitutionCard key={i.slug} inst={i} index={idx} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="text-center text-muted-foreground py-20">
            No institutions match your filters.
          </p>
        )}
      </div>
    </section>
  );
}
