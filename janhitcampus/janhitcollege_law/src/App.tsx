import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";

import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { CoursesPage } from "@/pages/CoursesPage";
import { AdmissionsPage } from "@/pages/AdmissionsPage";
import { AcademicCalendarPage } from "@/pages/AcademicCalendarPage";
import { DownloadsPage } from "@/pages/DownloadsPage";
import { InfrastructurePage } from "@/pages/InfrastructurePage";
import { GalleryPage } from "@/pages/GalleryPage";
import { EventsPage } from "@/pages/EventsPage";
import { FacultyPage } from "@/pages/FacultyPage";
import { PlacementPage } from "@/pages/PlacementPage";
import { CommitteesPage } from "@/pages/CommitteesPage";
import { DisclosuresPage } from "@/pages/DisclosuresPage";
import { ContactPage } from "@/pages/ContactPage";
import { ApplyPage } from "@/pages/ApplyPage";

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="bg-background text-foreground min-h-screen flex flex-col font-sans">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/admissions" element={<AdmissionsPage />} />
              <Route path="/academic-calendar" element={<AcademicCalendarPage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/infrastructure" element={<InfrastructurePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/faculty" element={<FacultyPage />} />
              <Route path="/placement" element={<PlacementPage />} />
              <Route path="/committees" element={<CommitteesPage />} />
              <Route path="/disclosures" element={<DisclosuresPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/apply" element={<ApplyPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-center" />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
