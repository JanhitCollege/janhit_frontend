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
import { CommitteeForm } from "./CommitteeForm";
import { getStoredCommittees, saveCommittees, Committee } from "@/data/committees";

interface CommitteeEditProps {
  id: string;
}

export const CommitteeEdit: React.FC<CommitteeEditProps> = ({ id }) => {
  const navigate = useNavigate();

  const [committee, setCommittee] = useState<Committee | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Retrieve committee on load
  useEffect(() => {
    const list = getStoredCommittees();
    const found = list.find((c) => c.id === id);
    if (found) {
      setCommittee(found);
    } else {
      setErrorMsg("Committee not found. It may have been deleted or the ID is invalid.");
    }
  }, [id]);

  const handleSubmit = (
    formData: Omit<Committee, "id" | "members" | "documents" | "createdAt" | "updatedAt" | "slug">,
  ) => {
    if (!committee) return;

    const existing = getStoredCommittees();

    // Generate unique slug if title changed
    let slug = committee.slug;
    if (formData.title !== committee.title) {
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
      slug = baseSlug;
      let counter = 1;
      while (existing.some((c) => c.slug === slug && c.id !== id)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const updated = existing.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          ...formData,
          slug,
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });

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
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Title Block */}
      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Edit Committee
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Modify the committee specifications and click update to save changes.
        </p>
      </div>

      {errorMsg ? (
        <div className="glass rounded-2xl p-8 border border-destructive/20 bg-destructive/5 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-12 z-10">
          <AlertCircle className="size-12 text-destructive mb-3" />
          <h2 className="font-display text-lg font-bold text-foreground">
            Failed to Load Committee
          </h2>
          <p className="text-sm text-muted-foreground mt-2">{errorMsg}</p>
          <Link
            to="/@admin/committees"
            className="mt-6 inline-flex px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/95 shadow-sm"
          >
            Back to Committee Listing
          </Link>
        </div>
      ) : committee ? (
        /* Form Container */
        <CommitteeForm
          initialData={committee}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="Update Committee"
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
