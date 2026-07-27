import React, { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/@admin" });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          {/* A premium loading spinner matching the gold gradient theme */}
          <div className="size-12 rounded-full border-4 border-muted border-t-gold animate-spin" />
          <p className="text-sm font-medium text-muted-foreground tracking-wide">
            Loading Janhit Admin...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Return empty or login loader during redirect
    return null;
  }

  return <>{children}</>;
};
