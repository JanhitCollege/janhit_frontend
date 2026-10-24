import React, { useState } from "react";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Scale,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MessageSquare,
  Building,
  CheckCircle2,
} from "lucide-react";

const SOCIAL_MEDIA_LINKS = [
  {
    name: "Facebook",
    handle: "@janhitgroup",
    url: "https://www.facebook.com/janhitgroup",
    icon: Facebook,
    color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    badge: "Official Page",
  },
  {
    name: "Instagram",
    handle: "@janhitgroup",
    url: "https://www.instagram.com/janhitgroup",
    icon: Instagram,
    color: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent",
    badge: "Campus Life",
  },
  {
    name: "LinkedIn",
    handle: "Janhit Group of Institutions",
    url: "https://www.linkedin.com/school/janhit-group-of-institutions/",
    icon: Linkedin,
    color: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
    badge: "Alumni & Placements",
  },
  {
    name: "YouTube",
    handle: "@janhitgroup",
    url: "https://www.youtube.com/@janhitgroup",
    icon: Youtube,
    color: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
    badge: "Lectures & Moots",
  },
  {
    name: "Twitter / X",
    handle: "@janhitgroup",
    url: "https://twitter.com/janhitgroup",
    icon: Twitter,
    color: "hover:bg-black hover:text-white hover:border-black",
    badge: "Announcements",
  },
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "ballb",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      toast.success("Enquiry Submitted Successfully!", {
        description: `Thank you, ${formData.name}. Our law admission cell will contact you shortly on ${formData.mobile}.`,
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        course: "ballb",
        message: "",
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-background border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-navy font-bold text-xs uppercase tracking-widest border border-gold/30">
            <MessageSquare className="w-3.5 h-3.5 text-gold" />
            <span>Connect With Us</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Contact Us & Campus Location
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-2 h-2 rotate-45 border border-gold bg-gold/40" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-sm md:text-base text-navy/85 font-medium leading-relaxed">
            Have questions regarding admissions, seat intake, fee structures, or campus visits? Our counselors and administration are here to assist you.
          </p>
        </div>

        {/* Top Grid: Contact Details & Enquiry Form */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Details & Campus Address */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">
            {/* 1. Contact Details */}
            <div className="bg-white rounded-3xl border border-gold/25 p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-gold/15 pb-4">
                <div className="w-10 h-10 rounded-xl bg-navy/5 text-gold flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-navy">Contact Details</h3>
                  <p className="text-xs text-navy/75 font-medium">Call or email our dedicated legal helpdesk</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold block">
                    Counseling Helplines
                  </span>
                  <div className="space-y-1 text-sm font-semibold text-navy">
                    <a href="tel:9313402015" className="block hover:text-gold transition-colors">
                      +91 9313402015
                    </a>
                    <a href="tel:9560614440" className="block hover:text-gold transition-colors">
                      +91 9560614440
                    </a>
                  </div>
                  <span className="text-[11px] text-navy/60 block">Direct Admission Assistance</span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold block">
                    Email Support
                  </span>
                  <div className="space-y-1 text-sm font-semibold text-navy">
                    <a
                      href="mailto:info@janhitlawcollege.org"
                      className="block hover:text-gold transition-colors text-xs sm:text-sm break-all"
                    >
                      info@janhitlawcollege.org
                    </a>
                    <a
                      href="mailto:admissions@janhitlawcollege.org"
                      className="block hover:text-gold transition-colors text-xs sm:text-sm break-all text-navy/70"
                    >
                      admissions@janhitlawcollege.org
                    </a>
                  </div>
                  <span className="text-[11px] text-navy/60 block">24-48 hr response turnaround</span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold block">
                    Working Hours
                  </span>
                  <p className="text-sm font-semibold text-navy">
                    Monday — Saturday
                  </p>
                  <p className="text-xs text-navy/85 font-medium">
                    09:00 AM to 04:00 PM
                  </p>
                  <span className="text-[11px] text-navy/50 block">Closed on Sundays & Gazetted Holidays</span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold block">
                    Institutional Desk
                  </span>
                  <p className="text-sm font-semibold text-navy">
                    Office of the Principal
                  </p>
                  <p className="text-xs text-navy/85 font-medium">
                    Janhit College of Law, Greater Noida
                  </p>
                  <span className="text-[11px] text-navy/50 block">Affiliated to CCSU & BCI Approved</span>
                </div>
              </div>
            </div>

            {/* 2. Address Details Card */}
            <div className="bg-white rounded-3xl border border-gold/25 p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gold/15 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy/5 text-gold flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-navy">Campus Address</h3>
                    <p className="text-xs text-navy/60">Greater Noida Institutional Hub</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Plot+No.+35,+Knowledge+Park+-+1,+Greater+Noida+(U.P.)+-+201307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/15 text-navy hover:bg-gold/30 text-xs font-bold transition-colors"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-2 text-sm text-navy/80">
                <p className="font-semibold text-navy">
                  Plot No. 35, Knowledge Park - 1,
                  <br />
                  Greater Noida, Gautam Buddha Nagar (U.P.) - 201307
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-navy/65 pt-1">
                  <span className="px-2.5 py-1 rounded-md bg-navy/5 border border-gold/15">
                    Near Pari Chowk
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-navy/5 border border-gold/15">
                    Knowledge Park II Metro Station
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-navy/5 border border-gold/15">
                    Expressway Connected
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div id="apply" className="lg:col-span-6">
            <div className="bg-white border border-gold/25 p-8 md:p-10 rounded-3xl shadow-xl space-y-6">
              <div className="space-y-2 text-center border-b border-gold/15 pb-6">
                <div className="p-3 bg-navy/5 text-navy rounded-full w-fit mx-auto">
                  <Scale className="h-7 w-7 text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Admission & General Enquiry Form
                </h3>
                <p className="text-xs text-navy/75 font-medium max-w-sm mx-auto">
                  Submit your query or register for legal academic counseling. Our admissions team will reach out promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-navy uppercase tracking-wide">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter student or candidate's full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full text-sm border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold bg-background transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-navy uppercase tracking-wide">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="candidate@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full text-sm border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold bg-background transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="mobile" className="text-xs font-bold text-navy uppercase tracking-wide">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      required
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full text-sm border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold bg-background transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="course" className="text-xs font-bold text-navy uppercase tracking-wide">
                    Preferred Course / Query Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full text-sm border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold bg-background transition-colors cursor-pointer"
                  >
                    <option value="ballb">B.A.LL.B (5 Academic Years - Integrated)</option>
                    <option value="llb">LL.B (3 Academic Years - Graduate Law)</option>
                    <option value="scholarship">Fee Structure & Scholarship Details</option>
                    <option value="hostel_transport">Hostel & Transport Inquiry</option>
                    <option value="other">General / Administrative Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-navy uppercase tracking-wide">
                    Your Message / Specific Query
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Enter any specific questions regarding eligibility, hostel, admission dates, or documents..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full text-sm border border-gold/25 px-4 py-3 rounded-xl focus:outline-none focus:border-gold bg-background transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 mt-2 rounded-xl gradient-gold text-navy-deep font-bold text-sm tracking-wider uppercase shadow-gold hover:-translate-y-0.5 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 3. Address & Location Map Embed Section */}
        <div className="bg-white rounded-3xl border border-gold/25 p-8 md:p-10 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold">Location Map</span>
              <h3 className="font-serif text-2xl font-bold text-navy">
                Interactive Campus Location Map
              </h3>
              <p className="text-xs text-navy/85 font-medium">
                Easily navigate to Janhit College of Law situated in the educational hub of Greater Noida.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Plot+No.+35,+Knowledge+Park+-+1,+Greater+Noida+(U.P.)+-+201307"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl gradient-gold text-navy-deep font-bold text-xs uppercase tracking-wider shadow-gold hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 w-fit"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="border border-gold/20 rounded-2xl overflow-hidden shadow-inner h-[380px] bg-slate-100">
            <iframe
              title="Janhit College of Law Campus Location"
              src="https://maps.google.com/maps?q=Plot%20No.%2035,%20Knowledge%20Park%20-%201,%20Greater%20Noida%20(U.P.)%20-%20201307&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* 4. Social Media Links Section */}
        <div className="bg-white rounded-3xl border border-gold/25 p-8 md:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">
              Social Media Links
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy">
              Follow Us on Official Social Channels
            </h3>
            <p className="text-xs md:text-sm text-navy/85 font-medium">
              Stay connected with moot court victories, guest lectures by high court judges, legal aid drives, and student achievements across our verified social profiles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SOCIAL_MEDIA_LINKS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border border-gold/25 rounded-2xl p-5 flex flex-col items-center text-center justify-between gap-3 transition-all duration-300 bg-background hover:shadow-xl hover:-translate-y-1 ${item.color} group`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white text-navy flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-current" />
                  </div>

                  <div>
                    <h4 className="font-bold text-sm group-hover:text-current">{item.name}</h4>
                    <p className="text-[11px] opacity-75 group-hover:opacity-100">{item.handle}</p>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-navy/5 group-hover:bg-white/20 text-navy group-hover:text-current border border-gold/20">
                    {item.badge}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
