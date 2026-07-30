import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Lock, AlertCircle, Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { authService } from "../services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResetPasswordPageProps {
  token: string;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ token }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Invalid or missing password reset token. Please check the link from your email.");
      return;
    }

    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authService.resetPassword(token, password);
      setSuccessMessage(response.message || "Password has been reset successfully. Please login with your new password.");
      setShowPopup(true);
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Failed to reset password.");
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

        {/* Reset Password Card */}
        <div className="glass shadow-elegant rounded-2xl p-8 border border-border/80 relative bg-background/60 backdrop-blur-md">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            Reset Password
          </h2>

          {!token ? (
            <div className="space-y-5 text-center">
              <div className="flex items-center gap-2.5 p-4 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20">
                <AlertCircle className="size-5 shrink-0" />
                <span className="text-left font-medium leading-relaxed">
                  Missing reset token. The link is invalid or expired. Please request another password reset.
                </span>
              </div>
              <div className="pt-2">
                <Link
                  to="/@admin/forgot-password"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-semibold"
                >
                  Request Reset Link
                </Link>
              </div>
            </div>
          ) : (
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

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-foreground/80 font-semibold text-xs uppercase tracking-wider pl-1"
                >
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-11 pr-10 h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-foreground/80 font-semibold text-xs uppercase tracking-wider pl-1"
                >
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-11 pr-10 h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
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
                    Resetting password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
        </div>
      </motion.div>

      {/* Success Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
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
                  Success!
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {successMessage}
                </p>
                <Button
                  onClick={handleClosePopup}
                  className="w-full h-10 rounded-xl bg-gradient-gold text-gold-foreground font-bold hover:brightness-105 transition-all shadow-gold cursor-pointer"
                >
                  Go to Login
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
