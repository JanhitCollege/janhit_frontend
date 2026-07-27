import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
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

export const FacultyCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData: Omit<FacultyProfile, "id" | "createdAt" | "updatedAt">) => {
    const existing = getStoredFaculties();

    // Create new faculty profile
    const newFaculty: FacultyProfile = {
      ...formData,
      id: "fac-" + Date.now(), // Generate a unique ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...existing, newFaculty];
    saveFaculties(updated);

    // Navigate back to listing page
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
