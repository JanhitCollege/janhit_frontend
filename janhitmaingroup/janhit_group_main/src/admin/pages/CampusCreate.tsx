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
import { CampusForm } from "./CampusForm";
import { getStoredCampuses, saveCampuses, Campus } from "@/data/campuses";

export const CampusCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData: Omit<Campus, "id" | "createdDate" | "updatedDate">) => {
    const existing = getStoredCampuses();

    // Create new campus object
    const newCampus: Campus = {
      ...formData,
      id: String(existing.length + 1) + "_" + Date.now(), // Unique ID
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    const updated = [...existing, newCampus];
    saveCampuses(updated);

    // Navigate back to listing page
    navigate({ to: "/@admin/campuses" });
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

      {/* Form Container */}
      <CampusForm onSubmit={handleSubmit} onCancel={handleCancel} submitButtonText="Save Campus" />
    </div>
  );
};
