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
import { EventForm } from "./EventForm";
import { getStoredEvents, saveEvents, EventItem } from "@/data/events";
import { toast } from "sonner";

interface EventEditProps {
  id: string;
}

export const EventEdit: React.FC<EventEditProps> = ({ id }) => {
  const navigate = useNavigate();
  const [record, setRecord] = useState<EventItem | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const list = getStoredEvents();
    const found = list.find((r) => r.id === id);
    if (found) {
      setRecord(found);
    } else {
      setErrorMsg("Event not found. It may have been deleted or the ID is invalid.");
    }
  }, [id]);

  const handleSubmit = (formData: Omit<EventItem, "id" | "createdAt" | "updatedAt">) => {
    if (!record) return;

    const list = getStoredEvents();
    const updated = list.map((r) => {
      if (r.id === id) {
        return {
          ...r,
          ...formData,
          updatedAt: new Date().toISOString(),
        };
      }
      return r;
    });

    saveEvents(updated);
    toast.success("Event updated successfully");
    navigate({ to: "/@admin/events" });
  };

  const handleCancel = () => {
    navigate({ to: "/@admin/events" });
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
                <Link to="/@admin/events">Events</Link>
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
          <h2 className="font-display text-lg font-bold text-foreground">Failed to Load Event</h2>
          <p className="text-sm text-muted-foreground mt-2">{errorMsg}</p>
          <Link
            to="/@admin/events"
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
              Edit Event
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Modify dates, venue, registrations, active switches, or mapped campuses for:{" "}
              <span className="font-medium text-foreground">{record.title}</span>
            </p>
          </div>

          {/* Form Container */}
          <div className="z-10 flex-grow">
            <EventForm
              initialData={record}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitButtonText="Save Changes"
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
