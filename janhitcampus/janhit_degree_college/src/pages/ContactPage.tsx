import { MapPin, Phone, Mail, Clock, PhoneCall, ExternalLink } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { AdmissionForm } from "@/components/site/AdmissionForm";
import { COLLEGE_INFO } from "@/data/collegeInfo";

export function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: COLLEGE_INFO.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: COLLEGE_INFO.address.street,
      addressLocality: COLLEGE_INFO.address.locality,
      addressRegion: COLLEGE_INFO.address.state,
      postalCode: COLLEGE_INFO.address.pincode,
      addressCountry: "IN",
    },
    telephone: COLLEGE_INFO.phone,
    email: COLLEGE_INFO.email,
    hasMap: COLLEGE_INFO.mapLink,
  };

  return (
    <>
      <SEO
        title="Contact Us | Janhit Degree College"
        description={`Contact Janhit Degree College. Address: ${COLLEGE_INFO.address.full}. Mobile: ${COLLEGE_INFO.phones.join(", ")}. Email: ${COLLEGE_INFO.emails.join(", ")}.`}
        schema={localBusinessSchema}
      />

      <Breadcrumb
        title="Contact Janhit Degree College"
        items={[{ label: "Contact Us" }]}
      />

      {/* Contact Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Address Card */}
            <div className="bg-beige/40 p-6 rounded-xl border border-gold/30 shadow-sm space-y-3 hover-lift flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-3 bg-gold/20 rounded-full w-12 h-12 flex items-center justify-center text-navy font-bold">
                  <MapPin className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-navy">College Address</h3>
                <p className="text-xs md:text-sm text-navy/80 leading-relaxed">
                  {COLLEGE_INFO.address.full}
                </p>
              </div>

              <div className="pt-3 border-t border-gold/20">
                <a
                  href={COLLEGE_INFO.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-gold transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5 text-gold" />
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-beige/40 p-6 rounded-xl border border-gold/30 shadow-sm space-y-3 hover-lift flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-3 bg-gold/20 rounded-full w-12 h-12 flex items-center justify-center text-navy font-bold">
                  <Phone className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-navy">Admission Helpline</h3>
                <div className="space-y-1 text-xs md:text-sm font-bold text-navy">
                  {COLLEGE_INFO.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                      className="block hover:text-gold transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <p className="text-xs text-navy/60 pt-2 border-t border-gold/15">Mon - Sat: 09:00 AM - 04:30 PM</p>
            </div>

            {/* Email Card */}
            <div className="bg-beige/40 p-6 rounded-xl border border-gold/30 shadow-sm space-y-3 hover-lift flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-3 bg-gold/20 rounded-full w-12 h-12 flex items-center justify-center text-navy font-bold">
                  <Mail className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-navy">Email Desk</h3>
                <div className="space-y-1 text-xs md:text-sm font-bold text-navy">
                  {COLLEGE_INFO.emails.map((email, idx) => (
                    <a
                      key={idx}
                      href={`mailto:${email}`}
                      className="block hover:text-gold transition-colors break-all"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
              <p className="text-xs text-navy/60 pt-2 border-t border-gold/15">Official inquiries, admissions & career</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form & Office Timings */}
      <section className="py-12 md:py-16 bg-beige/40 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Card: Info & Timings */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-gold/30 shadow-xl p-6 md:p-8 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gold block">
                  Get In Touch
                </span>
                <h2 className="font-serif text-3xl font-bold text-navy">
                  Visit Campus or Send an Enquiry
                </h2>
                <div className="gold-divider w-24" />
                <p className="text-sm text-navy/80 leading-relaxed">
                  Have questions about course eligibility, subject combinations, or admission counseling? Reach out using the enquiry form or call our counselor office directly.
                </p>
              </div>

              {/* College Timings */}
              <div className="bg-beige/40 p-5 rounded-xl border border-gold/20 space-y-3 my-auto">
                <div className="flex items-center gap-2 text-navy font-bold font-serif text-lg">
                  <Clock className="h-5 w-5 text-gold" />
                  <span>College Office Hours</span>
                </div>
                <div className="space-y-2 text-xs md:text-sm text-navy/80">
                  <div className="flex justify-between border-b border-gold/15 pb-1.5">
                    <span>Monday - Saturday:</span>
                    <span className="font-semibold text-navy">09:00 AM - 04:30 PM</span>
                  </div>
                  <div className="flex justify-between pt-1 text-navy/60">
                    <span>Sunday & Govt Holidays:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              {/* Call Now CTA Box */}
              <div className="bg-navy text-white p-5 rounded-xl border border-gold/30 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] text-gold font-bold uppercase">Direct Admission Phone</span>
                  <h4 className="font-serif text-base md:text-lg font-bold">{COLLEGE_INFO.phone}</h4>
                </div>
                <a
                  href={`tel:${COLLEGE_INFO.phone.replace(/[^0-9+]/g, "")}`}
                  className="px-4 py-2.5 rounded gradient-gold text-navy-deep font-bold text-xs uppercase tracking-wider shadow flex items-center gap-1.5 shrink-0 hover:opacity-90 transition-opacity"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Right Card: Admission Enquiry Form */}
            <div className="lg:col-span-6 h-full">
              <AdmissionForm />
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps / Location Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
                College Campus Location & Map Preview
              </h2>
              <p className="text-xs md:text-sm text-navy/70">
                {COLLEGE_INFO.address.full}
              </p>
            </div>

            <a
              href={COLLEGE_INFO.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded gradient-gold text-navy-deep font-bold text-xs uppercase tracking-wider shadow hover:opacity-90 transition-opacity shrink-0"
            >
              <MapPin className="h-4 w-4" />
              <span>Open Google Maps Location</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border-2 border-gold/30 shadow-xl h-96 bg-beige/50 relative">
            <iframe
              title="Janhit Campus Location Map"
              src="https://maps.google.com/maps?q=Knowledge+Park+1+Greater+Noida&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
