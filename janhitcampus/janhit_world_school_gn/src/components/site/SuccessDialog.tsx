import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

export function SuccessDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-success-dialog", handleOpen);
    return () => window.removeEventListener("open-success-dialog", handleOpen);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md w-[90vw] rounded-2xl p-8 bg-white border border-gold/30 shadow-luxury z-[110] text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-gold/10 text-gold flex items-center justify-center">
            <CheckCircle2 className="size-10" />
          </div>
          <DialogHeader className="text-center">
            <DialogTitle className="font-serif text-2xl md:text-3xl text-[#0B2566]">
              Enquiry <span className="italic text-gradient-gold">Received!</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-2 font-sans">
              Thank you for choosing Janhit World School. Your admission enquiry has been successfully recorded. Our admissions team will get in touch with you shortly.
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full inline-flex items-center justify-center px-6 h-12 rounded-md gradient-gold text-navy-deep font-semibold tracking-wide shadow-gold hover:-translate-y-0.5 transition-all cursor-pointer text-sm"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
