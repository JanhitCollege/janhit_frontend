import React, { useState } from "react";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send, Scale } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "ballb",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      toast.success("Enquiry Submitted!", {
        description: `Thank you, ${formData.name}. Our law admission cell will contact you shortly on ${formData.mobile}.`,
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        course: "ballb",
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-beige/30 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact Details & Map */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Reach Out
              </span>
              <h2 className="text-3xl font-serif font-bold text-navy">Campus Location & Contact</h2>
              <div className="h-1 w-20 bg-gold rounded" />
            </div>

            <p className="text-sm text-navy/80 leading-relaxed">
              Have questions regarding seat intake, fee structures, or transport facilities? Visit
              our campus or get in touch with our counselors.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy text-sm">Campus Address</h4>
                  <p className="text-xs text-navy/70 mt-1 leading-relaxed">
                    Plot No. 35, Knowledge Park - 1,
                    <br />
                    Greater Noida (U.P.) - 201307
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy text-sm">Counseling Helplines</h4>
                  <p className="text-xs text-navy/70 mt-1 space-y-1">
                    <a href="tel:9313402015" className="block hover:text-gold">
                      9313402015
                    </a>
                    <a href="tel:9560614440" className="block hover:text-gold">
                      9560614440
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy text-sm">Official Email</h4>
                  <p className="text-xs text-navy/70 mt-1">
                    <a href="mailto:info@janhitlawcollege.org" className="hover:text-gold">
                      info@janhitlawcollege.org
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy text-sm">Working Hours</h4>
                  <p className="text-xs text-navy/70 mt-1">
                    Monday — Saturday: 09:00 AM to 04:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="border border-gold/20 rounded-xl overflow-hidden shadow-sm h-64 bg-white">
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

          {/* Admission Apply Form */}
          <div id="apply" className="lg:col-span-6">
            <div className="bg-white border border-gold/15 p-8 rounded-2xl shadow-xl space-y-6">
              <div className="space-y-2 text-center">
                <div className="p-3 bg-navy/5 text-navy rounded-full w-fit mx-auto">
                  <Scale className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-navy">Admission Enquiry Form</h3>
                <p className="text-xs text-navy/60">
                  Fill in your academic preferences and register for personal interview rounds.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold text-navy/85 uppercase tracking-wide"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter candidate's full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full text-sm border border-gold/20 px-4 py-3 rounded-lg focus:outline-none focus:border-gold bg-background transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold text-navy/85 uppercase tracking-wide"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="candidate@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-sm border border-gold/20 px-4 py-3 rounded-lg focus:outline-none focus:border-gold bg-background transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="mobile"
                    className="text-xs font-bold text-navy/85 uppercase tracking-wide"
                  >
                    Mobile Number
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
                    className="w-full text-sm border border-gold/20 px-4 py-3 rounded-lg focus:outline-none focus:border-gold bg-background transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="course"
                    className="text-xs font-bold text-navy/85 uppercase tracking-wide"
                  >
                    Select Law Course
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full text-sm border border-gold/20 px-4 py-3 rounded-lg focus:outline-none focus:border-gold bg-background transition-colors cursor-pointer"
                  >
                    <option value="ballb">B.A.LL.B (5 Academic Years)</option>
                    <option value="llb">LL.B (3 Academic Years)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 mt-2 rounded-lg gradient-gold text-navy-deep font-bold text-sm tracking-wider uppercase shadow-gold hover:-translate-y-0.5 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
