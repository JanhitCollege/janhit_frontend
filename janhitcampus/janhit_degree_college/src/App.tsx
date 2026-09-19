import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";

import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { CoursesPage } from "@/pages/CoursesPage";
import { CourseDetailPage } from "@/pages/CourseDetailPage";
import { AdmissionPage } from "@/pages/AdmissionPage";
import { AdmissionCoursePage } from "@/pages/AdmissionCoursePage";
import { DownloadsPage } from "@/pages/DownloadsPage";
import { LifeAtJanhitPage } from "@/pages/LifeAtJanhitPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { VideoGalleryPage } from "@/pages/VideoGalleryPage";
import { NewsPage } from "@/pages/NewsPage";
import { NewsDetailPage } from "@/pages/NewsDetailPage";
import { EventsPage } from "@/pages/EventsPage";
import { EventDetailPage } from "@/pages/EventDetailPage";
import { FacultyPage } from "@/pages/FacultyPage";
import { PlacementsPage } from "@/pages/PlacementsPage";
import { CommitteesPage } from "@/pages/CommitteesPage";
import { PublicDisclosurePage } from "@/pages/PublicDisclosurePage";
import { ContactPage } from "@/pages/ContactPage";

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
              <Route path="/courses/:slug" element={<CourseDetailPage />} />
              <Route path="/admission" element={<AdmissionPage />} />
              <Route path="/admission/:slug" element={<AdmissionCoursePage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/life-at-janhit" element={<LifeAtJanhitPage />} />
              <Route path="/life-at-janhit/gallery" element={<GalleryPage />} />
              <Route path="/life-at-janhit/video-gallery" element={<VideoGalleryPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:slug" element={<NewsDetailPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:slug" element={<EventDetailPage />} />
              <Route path="/faculty" element={<FacultyPage />} />
              <Route path="/placements" element={<PlacementsPage />} />
              <Route path="/committees" element={<CommitteesPage />} />
              <Route path="/public-disclosure" element={<PublicDisclosurePage />} />
              <Route path="/contact" element={<ContactPage />} />
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
