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
import { EventForm } from "./EventForm";
import { eventService } from "@/admin/services/eventService";
import { toast } from "sonner";

export const EventCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    try {
      await eventService.createEvent(formData);
      toast.success("Event created successfully");
      navigate({ to: "/@admin/events" });
    } catch (err: any) {
      toast.error(err.message || "Failed to create event");
    }
  };

  const handleCancel = () => {
    navigate({ to: "/@admin/events" });
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
                <Link to="/@admin/events">Events</Link>
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
          Create Event
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Publish a new academic, cultural, or departmental event and map it to campuses.
        </p>
      </div>

      {/* Form Container */}
      <div className="z-10 flex-grow">
        <EventForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="Create Event"
        />
      </div>
    </div>
  );
};
