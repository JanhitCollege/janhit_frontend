import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FacultyForm } from "./FacultyForm";
import { facultyService } from "@/admin/services/facultyService";
import { FacultyProfile } from "@/data/faculties";

export const FacultyCreate: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: Omit<FacultyProfile, "id" | "createdAt" | "updatedAt"> & { imageFile?: File }) => {
    setIsSubmitting(true);
    try {
      await facultyService.createFacultyProfile(formData);
      toast.success("Faculty profile created successfully.");
      navigate({ to: "/@admin/faculties" });
    } catch (error: any) {
      toast.error(error.message || "Failed to create faculty profile.");
    } finally {
      setIsSubmitting(false);
    }
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
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Title Block */}
      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Create Faculty Profile
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Add new faculty profiles to be displayed in selected campus directories.
        </p>
      </div>

      {/* Form Container */}
      <FacultyForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitButtonText="Save Profile"
      />
    </div>
  );
};
