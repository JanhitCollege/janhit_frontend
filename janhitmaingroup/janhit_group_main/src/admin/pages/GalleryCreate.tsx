import React, { useState } from "react";
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
import { galleryService } from "../services/galleryService";
import { toast } from "sonner";

export const GalleryCreate: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressMsg, setProgressMsg] = useState("");

  const handleSubmit = async (formDataList: FormData[]) => {
    if (formDataList.length === 0) return;
    setIsSubmitting(true);

    try {
      if (formDataList.length === 1) {
        setProgressMsg("Uploading media...");
        await galleryService.createGalleryItem(formDataList[0]);
        toast.success("Gallery item uploaded successfully");
      } else {
        let successCount = 0;
        for (let i = 0; i < formDataList.length; i++) {
          setProgressMsg(`Uploading photo ${i + 1} of ${formDataList.length}...`);
          try {
            await galleryService.createGalleryItem(formDataList[i]);
            successCount++;
          } catch (err: any) {
            toast.error(`Photo ${i + 1} upload failed: ${err.message || "Server error"}`);
          }
        }
        if (successCount > 0) {
          toast.success(`Successfully uploaded ${successCount} of ${formDataList.length} photos.`);
        }
      }
      navigate({ to: "/@admin/gallery" });
    } catch (error: any) {
      toast.error(error.message || "Failed to upload gallery items");
    } finally {
      setIsSubmitting(false);
      setProgressMsg("");
    }
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
          Upload Gallery Items
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Select one or multiple photos/video clips to showcase in your campus galleries.
        </p>
      </div>

      {/* Form Container */}
      <div className="z-10 flex-grow">
        <GalleryForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText={isSubmitting ? progressMsg || "Uploading..." : "Upload Media"}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
