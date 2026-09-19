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
import { DownloadForm } from "./DownloadForm";
import { downloadService, Download } from "../services/downloadService";
import { toast } from "sonner";

interface DownloadEditProps {
  id: string;
}

export const DownloadEdit: React.FC<DownloadEditProps> = ({ id }) => {
  const navigate = useNavigate();
  const [record, setRecord] = useState<Download | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setIsLoading(true);
        const download = await downloadService.getDownloadById(id);
        setRecord(download);
      } catch (err: any) {
        setErrorMsg(err.message || "Download document not found. It may have been deleted or the ID is invalid.");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchRecord();
    }
  }, [id]);

  const handleSubmit = async (formData: any) => {
    if (!record) return;

    try {
      setIsSubmitting(true);
      await downloadService.updateDownload(id, {
        title: formData.title,
        category: formData.category,
        campusId: formData.campusId,
        description: formData.description,
        isActive: formData.isActive,
        file: formData.file || null,
      });

      toast.success("Download document updated successfully");
      navigate({ to: "/@admin/downloads" });
    } catch (err: any) {
      toast.error(err.message || "Failed to update download document");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: "/@admin/downloads" });
  };

  return (
    <div className="p-4 md:p-6 flex flex-col flex-grow relative">
      {/* Ambient backgrounds */}
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
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {errorMsg ? (
        <div className="glass rounded-2xl p-8 border border-destructive/20 bg-destructive/5 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-12 z-10">
          <AlertCircle className="size-12 text-destructive mb-3" />
          <h2 className="font-display text-lg font-bold text-foreground">
            Failed to Load Document
          </h2>
          <p className="text-sm text-muted-foreground mt-2">{errorMsg}</p>
          <Link
            to="/@admin/downloads"
            className="mt-6 text-sm font-semibold text-primary hover:underline hover:text-gold transition-colors"
          >
            Back to Listing
          </Link>
        </div>
      ) : record ? (
        <>
          {/* Page Header */}
          <div className="mb-6 z-10">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Edit Download Document
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Modify properties, scope, status, or replace file for the document:{" "}
              <span className="font-medium text-foreground">{record.title}</span>
            </p>
          </div>

          {/* Form Container */}
          <div className="z-10 flex-grow">
            <DownloadForm
              initialData={record}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitButtonText="Save Changes"
              isSubmitting={isSubmitting}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center min-h-[300px] z-10">
          <span className="text-sm text-muted-foreground">Loading record details...</span>
        </div>
      )}
    </div>
  );
};
