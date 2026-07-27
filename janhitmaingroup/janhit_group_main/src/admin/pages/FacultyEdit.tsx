import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FacultyForm } from "./FacultyForm";
import { getStoredFaculties, saveFaculties, FacultyProfile } from "@/data/faculties";

interface FacultyEditProps {
  id: string;
}

export const FacultyEdit: React.FC<FacultyEditProps> = ({ id }) => {
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState<FacultyProfile | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Retrieve faculty on load
  useEffect(() => {
    const list = getStoredFaculties();
    const found = list.find((f) => f.id === id);
    if (found) {
      setFaculty(found);
    } else {
      setErrorMsg("Faculty profile not found. It may have been deleted or the ID is invalid.");
    }
  }, [id]);

  const handleSubmit = (formData: Omit<FacultyProfile, "id" | "createdAt" | "updatedAt">) => {
    if (!faculty) return;

    const existing = getStoredFaculties();
    const updated = existing.map((f) => {
      if (f.id === id) {
        return {
          ...f,
          ...formData,
          updatedAt: new Date().toISOString(),
        };
      }
      return f;
    });

    saveFaculties(updated);
    navigate({ to: "/@admin/faculties" });
  };

  const handleCancel = () => {
    navigate({ to: "/@admin/faculties" });
  };

  return (
    <div className="p-4 md:p-6 flex flex-col flex-grow relative">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 size-[400px] bg-gradient-gold opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-primary opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Breadcrumb Navigation */}
      <div className="mb-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/@admin/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/@admin/faculties">Faculty profiles</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Title Block */}
      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Edit Faculty Profile
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Modify the faculty details and click update to save changes.
        </p>
      </div>

      {errorMsg ? (
        <div className="glass rounded-2xl p-8 border border-destructive/20 bg-destructive/5 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-12 z-10">
          <AlertCircle className="size-12 text-destructive mb-3" />
          <h2 className="font-display text-lg font-bold text-foreground">
            Failed to Load Faculty Profile
          </h2>
          <p className="text-sm text-muted-foreground mt-2">{errorMsg}</p>
          <Link
            to="/@admin/faculties"
            className="mt-6 inline-flex px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/95 shadow-sm"
          >
            Back to Faculty Listing
          </Link>
        </div>
      ) : faculty ? (
        /* Form Container */
        <FacultyForm
          initialData={faculty}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="Update Profile"
        />
      ) : (
        /* Loading Spinner */
        <div className="flex-grow flex items-center justify-center py-20">
          <Loader2 className="size-8 text-primary animate-spin" />
        </div>
      )}
    </div>
  );
};
