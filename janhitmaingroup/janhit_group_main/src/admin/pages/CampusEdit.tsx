import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CampusForm } from "./CampusForm";
import { Campus } from "@/data/campuses";
import { campusService } from "@/admin/services/campusService";
import { toast } from "sonner";

interface CampusEditProps {
  id: string;
}

export const CampusEdit: React.FC<CampusEditProps> = ({ id }) => {
  const navigate = useNavigate();

  const [campus, setCampus] = useState<Campus | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve campus on load
  const fetchCampus = async () => {
    setIsLoading(true);
    try {
      const data = await campusService.getCampusById(id);
      setCampus(data);
    } catch (error: any) {
      setErrorMsg(error.message || "Campus not found. It may have been deleted or the ID is invalid.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampus();
  }, [id]);

  const handleSubmit = async (formData: Omit<Campus, "id" | "createdDate" | "updatedDate">) => {
    if (!campus) return;

    try {
      await campusService.updateCampus(id, formData);
      toast.success("Campus updated successfully.");
      navigate({ to: "/@admin/campuses" });
    } catch (error: any) {
      toast.error(error.message || "Failed to update campus.");
    }
  };

  const handleCancel = () => {
    navigate({ to: "/@admin/campuses" });
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
                <Link to="/@admin/campuses">Campus</Link>
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
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Edit Campus</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Modify the campus details and click update to save changes.
        </p>
      </div>

      {errorMsg ? (
        <div className="glass rounded-2xl p-8 border border-destructive/20 bg-destructive/5 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-12 z-10">
          <AlertCircle className="size-12 text-destructive mb-3" />
          <h2 className="font-display text-lg font-bold text-foreground">Failed to Load Campus</h2>
          <p className="text-sm text-muted-foreground mt-2">{errorMsg}</p>
          <Link
            to="/@admin/campuses"
            className="mt-6 inline-flex px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/95 shadow-sm"
          >
            Back to Campus Listing
          </Link>
        </div>
      ) : campus ? (
        /* Form Container */
        <CampusForm
          initialData={campus}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="Update Campus"
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

// Loader helper
const Loader2 = ({ className }: { className?: string }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
