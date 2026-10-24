import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { LeadershipMessages } from "@/components/site/LeadershipMessages";
import { StakeholdersHub } from "@/components/site/StakeholdersHub";
import { AnnouncementsNews } from "@/components/site/AnnouncementsNews";
import { NoticesCirculars } from "@/components/site/NoticesCirculars";
import { UpcomingEvents } from "@/components/site/UpcomingEvents";
import { MediaGallery } from "@/components/site/MediaGallery";
import { QuickLinks } from "@/components/site/QuickLinks";
import { Courses } from "@/components/site/Courses";

export function HomePage() {
  return (
    <>
      {/* 1. Home / Hero with Admissions & Trust Metrics */}
      <Hero />

      {/* 2. About Us: History, Vision, Mission & Core Values */}
      <About />

      {/* 3. Welcome Message from Chairman Sir & Principal Sir */}
      <LeadershipMessages />

      {/* 4. Sections related to different stakeholders - Student, College & University */}
      <StakeholdersHub />

      {/* 5. Announcements & News */}
      <AnnouncementsNews />

      {/* 6. Notices and Circular */}
      <NoticesCirculars />

      {/* 7. Upcoming Events */}
      <UpcomingEvents />

      {/* 8. Photo/Video Gallery */}
      <MediaGallery />

      {/* 9. Quick Links */}
      <QuickLinks />

      {/* Academic Programs & Admissions Inquiry */}
      <Courses />
    </>
  );
}
