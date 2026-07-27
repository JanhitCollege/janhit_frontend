import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Mail, AlertCircle, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { authService } from "../services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.forgotPassword(email);
      setShowPopup(true);
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Failed to process request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate({ to: "/@admin" });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background relative px-4 overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-1/4 left-1/4 size-96 bg-gradient-gold opacity-10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-96 bg-primary opacity-5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="size-12 rounded-2xl bg-gradient-gold grid place-items-center shadow-gold mb-3 animate-float">
            <GraduationCap className="size-6 text-gold-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Janhit Admin Portal</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
            Empowering Education
          </p>
        </div>

        {/* Forgot Password Card */}
        <div className="glass shadow-elegant rounded-2xl p-8 border border-border/80 relative">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-2.5 p-3.5 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20"
              >
                <AlertCircle className="size-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-foreground/80 font-semibold text-xs uppercase tracking-wider pl-1"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@janhit.org"
                  className="pl-11 pr-4 h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-gradient-gold text-gold-foreground font-bold shadow-gold hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] transition-all duration-250 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending link...
                </>
              ) : (
                "Submit"
              )}
            </Button>

            <div className="pt-2 text-center">
              <Link
                to="/@admin"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors font-semibold"
              >
                <ArrowLeft className="size-3.5" /> Back to Login
              </Link>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Success Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass max-w-sm w-full p-6 text-center rounded-2xl border border-border shadow-elegant relative z-50 bg-background/95"
            >
              <div className="flex flex-col items-center">
                <div className="size-14 rounded-2xl bg-gradient-gold grid place-items-center shadow-gold mb-4 text-gold-foreground">
                  <CheckCircle2 className="size-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Link Shared!
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Forgot password link shared to your registered email.
                </p>
                <Button
                  onClick={handleClosePopup}
                  className="w-full h-10 rounded-xl bg-gradient-gold text-gold-foreground font-bold hover:brightness-105 transition-all shadow-gold cursor-pointer"
                >
                  Back to Login
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
