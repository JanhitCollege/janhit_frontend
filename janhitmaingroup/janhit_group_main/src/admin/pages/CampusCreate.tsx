import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CampusForm } from "./CampusForm";
import { Campus } from "@/data/campuses";
import { campusService } from "@/admin/services/campusService";
import { toast } from "sonner";

export const CampusCreate: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleSubmit = async (formData: Omit<Campus, "id" | "createdDate" | "updatedDate">) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      await campusService.createCampus(formData);
      setSubmitSuccess("Campus created successfully!");
      toast.success("Campus created successfully.");
      setTimeout(() => {
        navigate({ to: "/@admin/campuses" });
      }, 1000);
    } catch (error: any) {
      const errMsg = error.message || "Failed to create campus. Please try again.";
      setSubmitError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
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
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Title Block */}
      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Create Campus
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Fill in the information below to register a new campus location.
        </p>
      </div>

      {/* Inline Feedback Alerts */}
      {submitError && (
        <Alert variant="destructive" className="mb-6 rounded-2xl border-destructive/30 bg-destructive/10">
          <AlertCircle className="size-5" />
          <AlertTitle className="font-bold text-base">Error Creating Campus</AlertTitle>
          <AlertDescription className="text-xs md:text-sm mt-1">{submitError}</AlertDescription>
        </Alert>
      )}

      {submitSuccess && (
        <Alert className="mb-6 rounded-2xl border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400">
          <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
          <AlertTitle className="font-bold text-base">Success</AlertTitle>
          <AlertDescription className="text-xs md:text-sm mt-1">{submitSuccess}</AlertDescription>
        </Alert>
      )}

      {/* Form Container */}
      <CampusForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitButtonText="Save Campus"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
