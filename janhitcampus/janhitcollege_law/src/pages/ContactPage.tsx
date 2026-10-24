import { ContactForm } from "@/components/site/ContactForm";
import { MessageSquare } from "lucide-react";

export function ContactPage() {
  return (
    <div className="pt-2">
      {/* Contact Page Header */}
      <section className="relative py-16 bg-white text-navy overflow-hidden border-b border-gold/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,oklch(0.74_0.12_85/0.15),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy text-xs font-bold uppercase tracking-widest border border-gold/35 shadow-xs">
              <MessageSquare className="w-3.5 h-3.5 text-gold" />
              <span>Get In Touch</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy leading-tight">
              Contact <span className="text-gold italic font-serif">Janhit College of Law</span>
            </h1>
            <p className="text-navy/85 text-sm md:text-base font-medium leading-relaxed">
              We welcome prospective law students, parents, legal scholars, and visitors. Find our campus address, helpline numbers, enquiry form, interactive map, and social media links below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <ContactForm />
    </div>
  );
}
