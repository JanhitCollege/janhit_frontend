import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/Section";
import { Mail, MapPin, Phone } from "lucide-react";
import { institutions } from "@/data/institutions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Janhit Group" },
      {
        name: "description",
        content:
          "Get in touch with Janhit Group of Institutions. Campus addresses, phone numbers and email contacts.",
      },
      { property: "og:title", content: "Contact Janhit Group" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="py-16">
      <div className="container-tight">
        <SectionHeader
          eyebrow="Get in touch"
          title="We'd love to hear from you"
          subtitle="Reach the campus closest to you for admissions, partnerships or general queries."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {institutions.map((i) => (
            <div key={i.slug} className="p-6 rounded-2xl bg-card border border-border hover-lift">
              <h3 className="font-display text-lg font-bold">{i.name}</h3>
              <p className="text-xs text-muted-foreground">{i.city}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="size-4 mt-0.5 text-gold" />
                  {i.location}
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4 text-gold" />
                  {i.phone}
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="size-4 text-gold" />
                  {i.email}
                </li>
              </ul>
              <iframe
                title={i.name}
                src={`https://www.google.com/maps?q=${encodeURIComponent(i.location)}&output=embed`}
                className="mt-4 w-full aspect-video rounded-xl border-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
