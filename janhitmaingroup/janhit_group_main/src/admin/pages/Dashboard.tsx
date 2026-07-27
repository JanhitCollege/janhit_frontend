import React from "react";
import { useAuth } from "../context/AuthContext";

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const adminName = user?.name || "Admin";

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 size-96 bg-gradient-gold opacity-5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-96 bg-primary opacity-5 blur-[100px] rounded-full pointer-events-none" />

      <div className="text-center max-w-lg z-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
          Welcome, <span className="text-gradient-gold">{adminName}</span>
        </h1>
        <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          You are securely logged into the Janhit Group of Institutions administration panel. Use
          the sidebar menu to navigate through admin modules.
        </p>
      </div>
    </div>
  );
};
