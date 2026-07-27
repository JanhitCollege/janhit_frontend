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
import { CommitteeForm } from "./CommitteeForm";
import { getStoredCommittees, saveCommittees, Committee } from "@/data/committees";

export const CommitteeCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (
    formData: Omit<Committee, "id" | "members" | "documents" | "createdAt" | "updatedAt" | "slug">,
  ) => {
    const existing = getStoredCommittees();

    // Generate unique slug
    const slugify = (text: string) => {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    };

    const baseSlug = slugify(formData.title);
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (existing.some((c) => c.slug === uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create new committee
    const newCommittee: Committee = {
      ...formData,
      id: "comm-" + Date.now(),
      slug: uniqueSlug,
      members: [],
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...existing, newCommittee];
    saveCommittees(updated);

    navigate({ to: "/@admin/committees" });
  };

  const handleCancel = () => {
    navigate({ to: "/@admin/committees" });
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
                <Link to="/@admin/committees">Committees</Link>
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
          Create Committee
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Formulate a new academic, PoSH, or regulatory committee, and map it to campuses.
        </p>
      </div>

      {/* Form Container */}
      <CommitteeForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitButtonText="Save Committee"
      />
    </div>
  );
};
