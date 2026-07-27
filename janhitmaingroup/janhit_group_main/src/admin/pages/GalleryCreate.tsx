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
import { GalleryForm } from "./GalleryForm";
import { getStoredGallery, saveGallery, GalleryItem } from "@/data/gallery";
import { toast } from "sonner";

export const GalleryCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData: Omit<GalleryItem, "id" | "createdAt" | "updatedAt">) => {
    const existing = getStoredGallery();

    const newRecord: GalleryItem = {
      ...formData,
      id: "gal_" + Date.now() + "_" + Math.floor(Math.random() * 1000), // Unique ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newRecord, ...existing];
    saveGallery(updated);

    toast.success("Gallery item uploaded successfully");
    navigate({ to: "/@admin/gallery" });
  };

  const handleCancel = () => {
    navigate({ to: "/@admin/gallery" });
  };

  return (
    <div className="p-4 md:p-6 flex flex-col flex-grow relative">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 size-[400px] bg-gradient-gold opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-primary opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Breadcrumbs */}
      <div className="mb-5 z-10">
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
                <Link to="/@admin/gallery">Gallery</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Page Header */}
      <div className="mb-6 z-10">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Upload Gallery Item
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Add a new photo or video clip to campus galleries.
        </p>
      </div>

      {/* Form Container */}
      <div className="z-10 flex-grow">
        <GalleryForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="Upload Media"
        />
      </div>
    </div>
  );
};
