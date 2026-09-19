import { useState } from "react";
import { toast } from "sonner";
import { Send, Phone, CheckCircle } from "lucide-react";
import { COLLEGE_INFO } from "@/data/collegeInfo";
import { COURSES_DATA } from "@/data/coursesData";

interface AdmissionFormProps {
  defaultCourseSlug?: string;
  className?: string;
}

export function AdmissionForm({ defaultCourseSlug, className }: AdmissionFormProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    mobileNumber: "",
    email: "",
    course: defaultCourseSlug || "BA",
    city: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.mobileNumber) {
      toast.error("Please fill in Student Name and Mobile Number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Enquiry submitted successfully! Admission office will contact you.");
    }, 800);
  };

  return (
    <div
      className={
        className ||
        "bg-white rounded-xl border border-gold/30 shadow-xl p-6 md:p-8 relative h-full flex flex-col justify-between"
      }
    >
      <div className="mb-6 border-b border-gold/20 pb-4">
        <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
          Admissions Open 2026-27
        </span>
        <h3 className="font-serif text-2xl font-bold text-navy">Admission Enquiry Form</h3>
        <p className="text-xs text-navy/70 mt-1">
          Fill out the form below or call admission helpline direct at{" "}
          <a href={`tel:${COLLEGE_INFO.phone}`} className="text-gold font-bold hover:underline">
            {COLLEGE_INFO.phone}
          </a>
        </p>
      </div>

      {submitted ? (
        <div className="text-center py-8 space-y-4 my-auto">
          <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto" />
          <h4 className="font-serif text-xl font-bold text-navy">Thank You for Your Enquiry!</h4>
          <p className="text-xs text-navy/70 max-w-sm mx-auto">
            Your admission enquiry has been submitted. Our admission counselor will get in touch with you shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                studentName: "",
                mobileNumber: "",
                email: "",
                course: defaultCourseSlug || "BA",
                city: "",
                message: "",
              });
            }}
            className="px-5 py-2 text-xs font-bold text-navy border border-gold rounded hover:bg-gold/10 transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Student Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-md border border-gold/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold bg-beige/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-md border border-gold/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold bg-beige/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="student@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-md border border-gold/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold bg-beige/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Select Course *
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-md border border-gold/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold bg-beige/50 text-navy font-medium"
                >
                  {COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  City / Native Town
                </label>
                <input
                  type="text"
                  placeholder="e.g. Greater Noida / Saharanpur"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-md border border-gold/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold bg-beige/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Query or Message
              </label>
              <textarea
                rows={3}
                placeholder="Ask about subject combinations, fees, or eligibility..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-md border border-gold/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold bg-beige/50"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md gradient-gold text-navy-deep font-bold text-sm tracking-wider uppercase shadow-gold hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Enquiry</span>
                </>
              )}
            </button>

            <div className="pt-2 text-center border-t border-gold/15">
              <a
                href={`tel:${COLLEGE_INFO.phone}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-navy hover:text-gold transition-colors"
              >
                <Phone className="h-4 w-4 text-gold" />
                <span>Call Admission Office Direct: {COLLEGE_INFO.phone}</span>
              </a>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
