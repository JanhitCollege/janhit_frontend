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
import { NewsNoticeForm } from "./NewsNoticeForm";
import { getStoredNewsNotices, saveNewsNotices, NewsNotice } from "@/data/newsNotices";
import { toast } from "sonner";

export const NewsNoticeCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (
    formData: Omit<
      NewsNotice,
      "id" | "viewCount" | "downloadCount" | "createdDate" | "updatedDate"
    >,
  ) => {
    const existing = getStoredNewsNotices();

    const newRecord: NewsNotice = {
      ...formData,
      id: "nn_" + Date.now() + "_" + Math.floor(Math.random() * 1000), // Unique ID
      viewCount: 0,
      downloadCount: 0,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    const updated = [newRecord, ...existing];
    saveNewsNotices(updated);

    toast.success("Notice published successfully");
    navigate({ to: "/@admin/news" });
  };

  const handleCancel = () => {
    navigate({ to: "/@admin/news" });
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
                <Link to="/@admin/news">News & Notices</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Title block */}
      <div className="mb-6 z-10">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Create Announcement
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Publish a new announcement, school notice, or news article.
        </p>
      </div>

      {/* Form Container */}
      <div className="z-10 flex-grow">
        <NewsNoticeForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="Publish Announcement"
        />
      </div>
    </div>
  );
};
