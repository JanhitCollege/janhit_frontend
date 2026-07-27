import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Lock,
  Mail,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loggedInName, setLoggedInName] = useState("");

  // If already logged in and success popup is not active, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated && !showSuccessPopup) {
      navigate({ to: "/@admin/dashboard" });
    }
  }, [isAuthenticated, showSuccessPopup, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);

      // Fetch the saved user details to display name in popup
      const savedUserStr = localStorage.getItem("janhit_admin_user");
      let userName = "Admin";
      if (savedUserStr) {
        try {
          const parsed = JSON.parse(savedUserStr);
          userName = parsed.name || "Admin";
        } catch (err) {}
      }

      setLoggedInName(userName);
      setShowSuccessPopup(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong during login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceed = () => {
    setShowSuccessPopup(false);
    navigate({ to: "/@admin/dashboard" });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background relative px-4 overflow-hidden">
      {/* Premium ambient background blur effects */}
      <div className="absolute top-1/4 left-1/4 size-96 bg-gradient-gold opacity-10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-96 bg-primary opacity-5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="size-12 rounded-2xl bg-gradient-gold grid place-items-center shadow-gold mb-3 animate-float">
            <GraduationCap className="size-6 text-gold-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Janhit Admin Portal</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
            Empowering Education
          </p>
        </div>

        {/* Login Card */}
        <div className="glass shadow-elegant rounded-2xl p-8 border border-border/80 relative">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            Login
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
                <Mail className="absolute left-3.5 top-3 size-4 text-muted-foreground transition-colors group-focus-within:text-gold" />
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

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-foreground/80 font-semibold text-xs uppercase tracking-wider pl-1"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-10 h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-muted-foreground hover:text-gold transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end text-sm pt-1">
              <Link
                to="/@admin/forgot-password"
                className="text-xs text-muted-foreground font-semibold hover:text-gold transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-gradient-gold text-gold-foreground font-bold shadow-gold hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] transition-all duration-250 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </motion.div>

      {/* Success Popup Modal */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass max-w-sm w-full p-6 text-center rounded-2xl border border-border shadow-elegant relative z-50 bg-background/95"
            >
              <div className="flex flex-col items-center">
                <div className="size-14 rounded-2xl bg-gradient-gold grid place-items-center shadow-gold mb-4 text-gold-foreground">
                  <CheckCircle2 className="size-7 animate-pulse" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Login Successful
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Account login successful. Welcome back,{" "}
                  <span className="font-semibold text-foreground">{loggedInName}</span>!
                </p>
                <Button
                  onClick={handleProceed}
                  className="w-full h-10 rounded-xl bg-gradient-gold text-gold-foreground font-bold hover:brightness-105 transition-all shadow-gold cursor-pointer"
                >
                  Proceed to Dashboard
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
