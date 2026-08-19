import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Send } from "lucide-react";
import { toast } from "sonner";

export function AdmissionsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-admissions", handleOpen);
    return () => window.removeEventListener("open-admissions", handleOpen);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const parentName = formData.get("name") as string;
    const childName = formData.get("child") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const grade = formData.get("grade") as string;
    const session = formData.get("year") as string;
    const messageText = formData.get("message") as string;

    // Sanitize phone number to exactly 10 digits as required by the backend regex validator
    const cleanPhone = phone.replace(/\D/g, "");
    const mobile = cleanPhone.length > 10 ? cleanPhone.slice(-10) : cleanPhone;

    if (mobile.length !== 10) {
      toast.error("Invalid Phone Number", {
        description: "Please enter a valid 10-digit mobile number.",
      });
      setLoading(false);
      return;
    }


    try {
      const BASE_URL = "https://api.janhitgroup.com/api";
      const apiResponse = await fetch(`${BASE_URL}/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: parentName,
          parentName: parentName,
          childName: childName,
          email: email,
          mobile: mobile,
          phone: mobile,
          grade: grade,
          course: grade,
          session: session,
          message: messageText,
          campus: "jwsgn",
        }),
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit enquiry to the database.");
      }

      // Reset form and close dialog
      (e.target as HTMLFormElement).reset();
      setIsOpen(false);

      // Trigger custom success popup event
      window.dispatchEvent(new CustomEvent("open-success-dialog"));

      toast.success("Enquiry submitted successfully", {
        description: "Your details have been successfully received.",
      });
    } catch (err: any) {
      console.error(err);
      toast.error("Submission Failed", {
        description: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xl w-[92vw] overflow-y-auto max-h-[90vh] rounded-2xl p-6 md:p-8 bg-white border border-border shadow-luxury z-[100]">
        <DialogHeader className="text-left mb-4">
          <DialogTitle className="font-serif text-2xl md:text-3xl text-navy">
            Admission <span className="italic text-gradient-gold">Enquiry</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Please fill in the details below. Our admissions office will get back to you shortly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
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
              rows={3}
              placeholder="Any specific queries or details you would like to share..."
              className="w-full rounded-lg border border-border bg-beige/40 px-4 py-3 focus:border-gold focus:outline-none transition-colors text-sm text-navy"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-8 h-12 rounded-md gradient-gold text-navy-deep font-semibold tracking-wide shadow-gold hover:-translate-y-0.5 transition-all disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Sending..." : "Submit Enquiry"} <Send className="size-4" />
          </button>
        </form>
      </DialogContent>
    </Dialog>
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
      <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-border bg-beige/40 px-4 h-11 focus:border-gold focus:outline-none transition-colors text-sm text-navy"
      />
    </div>
  );
}
