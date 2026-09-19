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
import { DownloadForm } from "./DownloadForm";
import { downloadService } from "../services/downloadService";
import { toast } from "sonner";

export const DownloadCreate: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    const filesToUpload: File[] =
      formData.files && formData.files.length > 0
        ? formData.files
        : formData.file
        ? [formData.file]
        : [];

    if (filesToUpload.length === 0) {
      toast.error("Please upload at least one document file.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (filesToUpload.length === 1) {
        await downloadService.createDownload({
          title: formData.title,
          category: formData.category,
          campusId: formData.campusId,
          description: formData.description,
          isActive: formData.isActive,
          file: filesToUpload[0],
        });
        toast.success("Download document created successfully");
      } else {
        let successCount = 0;
        for (let i = 0; i < filesToUpload.length; i++) {
          const file = filesToUpload[i];
          const fileBaseName = file.name.replace(/\.[^/.]+$/, "");
          const docTitle =
            filesToUpload.length === 1
              ? formData.title
              : `${formData.title} - ${fileBaseName}`;

          await downloadService.createDownload({
            title: docTitle,
            category: formData.category,
            campusId: formData.campusId,
            description: formData.description,
            isActive: formData.isActive,
            file: file,
          });
          successCount++;
        }
        toast.success(`${successCount} download documents created successfully`);
      }

      navigate({ to: "/@admin/downloads" });
    } catch (err: any) {
      toast.error(err.message || "Failed to create download document(s)");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: "/@admin/downloads" });
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
                <Link to="/@admin/downloads">Downloads</Link>
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
          Add Download Document
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Upload and configure a new document, form, syllabus, or calendar for public downloads.
        </p>
      </div>

      {/* Form Container */}
      <div className="z-10 flex-grow">
        <DownloadForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="Create Document"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
