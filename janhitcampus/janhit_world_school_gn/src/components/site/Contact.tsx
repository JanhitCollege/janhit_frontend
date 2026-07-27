import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, QrCode, Mail, Send } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { toast } from "sonner";

export function Contact() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Enquiry submitted", {
        description: "Our admissions team will reach out within 24 hours.",
      });
    }, 900);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Get in Touch"
          title={
            <>
              Begin the <span className="italic text-gradient-gold">conversation.</span>
            </>
          }
          description="Talk to our admissions team, book a campus tour, or simply ask us anything."
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 p-8 md:p-10 rounded-3xl bg-white border border-border shadow-glass space-y-5"
          >
            <h3 className="font-serif text-2xl text-navy">Admission Enquiry</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" label="Parent Name" required />
              <Field name="child" label="Child's Name" required />
              <Field name="phone" label="Phone" type="tel" required />
              <Field name="email" label="Email" type="email" required />
              <Field name="grade" label="Grade Seeking" />
              <Field name="year" label="Session" defaultValue="2026-27" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                className="w-full rounded-lg border border-border bg-beige/40 px-4 py-3 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 h-12 rounded-md gradient-gold text-navy-deep font-semibold tracking-wide shadow-gold hover:-translate-y-0.5 transition-all disabled:opacity-60"
            >
              {loading ? "Sending..." : "Submit Enquiry"} <Send className="size-4" />
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="p-6 rounded-2xl gradient-navy text-white shadow-luxury">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-lg gradient-gold flex items-center justify-center text-navy-deep">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <div className="text-gold text-xs tracking-[0.25em] uppercase">Campus</div>
                  <div className="mt-1 font-serif text-lg leading-snug">
                    Plot No. 55-B, Knowledge Park-5,
                    <br /> Greater Noida, U.P. – 201306
                  </div>
                  <a
                    href="https://maps.app.goo.gl/BRJU2eUYEGZTfQUJ6"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm text-gold underline-offset-4 hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a
                href="tel:+910000000000"
                className="p-4 rounded-2xl bg-white border border-border hover:border-gold/50 hover-lift flex flex-col gap-2.5"
              >
                <Phone className="size-4.5 text-navy" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Call
                  </div>
                  <div className="font-serif text-sm text-navy font-semibold mt-0.5">
                    Admissions
                  </div>
                </div>
              </a>
              <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-white border border-border hover:border-gold/50 hover-lift flex flex-col gap-2.5"
              >
                <MessageCircle className="size-4.5 text-navy" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    WhatsApp
                  </div>
                  <div className="font-serif text-sm text-navy font-semibold mt-0.5">Chat Now</div>
                </div>
              </a>
              <a
                href="mailto:admissions@janhitworld.school"
                className="p-4 rounded-2xl bg-white border border-border hover:border-gold/50 hover-lift flex flex-col gap-2.5"
              >
                <Mail className="size-4.5 text-navy" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Email
                  </div>
                  <div className="font-serif text-sm text-navy font-semibold mt-0.5">Enquire</div>
                </div>
              </a>
              <div className="p-4 rounded-2xl bg-white border border-border flex flex-col gap-2.5">
                <QrCode className="size-4.5 text-navy" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Scan
                  </div>
                  <div className="font-serif text-sm text-navy font-semibold mt-0.5">QR Code</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border shadow-glass h-[180px] w-full">
              <iframe
                title="Janhit World School map"
                src="https://www.google.com/maps?q=Knowledge+Park+5,+Greater+Noida&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-border bg-beige/40 px-4 h-11 focus:border-gold focus:outline-none transition-colors"
      />
    </div>
  );
}
