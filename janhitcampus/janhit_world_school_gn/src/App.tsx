import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AdmissionsDialog } from "@/components/site/AdmissionsDialog";
import { FloatingActions } from "@/components/site/FloatingActions";
import { FounderPromoModal } from "@/components/site/FounderPromoModal";
import { SuccessDialog } from "@/components/site/SuccessDialog";
import { ScrollToTop } from "@/components/ScrollToTop";

import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { WhyUsPage } from "@/pages/WhyUsPage";
import { FoundationPage } from "@/pages/FoundationPage";
import { SportsPage } from "@/pages/SportsPage";
import { AdmissionsPage } from "@/pages/AdmissionsPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { FaqPage } from "@/pages/FaqPage";
import { ContactPage } from "@/pages/ContactPage";

// Initialize standard React QueryClient
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
        <div className="bg-background text-foreground min-h-screen flex flex-col justify-between">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/why-us" element={<WhyUsPage />} />
              <Route path="/foundation" element={<FoundationPage />} />
              <Route path="/sports" element={<SportsPage />} />
              <Route path="/admissions" element={<AdmissionsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/campus" element={<GalleryPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
          <FloatingActions />
          <FounderPromoModal />
          <AdmissionsDialog />
          <SuccessDialog />
          <Toaster position="top-center" />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
