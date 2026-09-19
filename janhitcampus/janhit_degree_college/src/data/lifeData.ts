import galleryClassroom from "@/assets/gallery-classroom.jpg";
import galleryLab from "@/assets/gallery-lab.jpg";
import galleryLibrary from "@/assets/gallery-library.jpg";
import gallerySports from "@/assets/gallery-sports.jpg";
import galleryCultural from "@/assets/gallery-cultural.jpg";
import galleryGraduation from "@/assets/gallery-graduation.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

export interface GalleryItem {
  id: string;
  title: string;
  category: "Campus" | "Classroom" | "Events" | "Activities" | "Infrastructure" | "Sports";
  image: string;
  caption: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  duration: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: "Academic" | "Achievement" | "Announcement" | "Campus Life";
  date: string;
  image: string;
  shortDescription: string;
  content: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  status: "Upcoming" | "Completed";
  date: string;
  time: string;
  venue: string;
  image: string;
  shortDescription: string;
  content: string;
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g-1",
    title: "Green Campus Infrastructure",
    category: "Campus",
    image: hero1,
    caption: "Spacious academic buildings amidst natural surroundings in Saharanpur.",
  },
  {
    id: "g-2",
    title: "Interactive Smart Classrooms",
    category: "Classroom",
    image: galleryClassroom,
    caption: "Modern lecture halls equipped with audio-visual learning tools.",
  },
  {
    id: "g-3",
    title: "Computer Science & IT Labs",
    category: "Infrastructure",
    image: galleryLab,
    caption: "High-speed internet software programming lab for BCA & Science students.",
  },
  {
    id: "g-4",
    title: "Central Academic Library",
    category: "Infrastructure",
    image: galleryLibrary,
    caption: "Extensive repository of textbooks, journals, reference materials, and e-learning resources.",
  },
  {
    id: "g-5",
    title: "Annual Athletic Meet & Sports",
    category: "Sports",
    image: gallerySports,
    caption: "Students participating in track, field, and indoor sports competitions.",
  },
  {
    id: "g-6",
    title: "Youth Cultural Fest",
    category: "Events",
    image: galleryCultural,
    caption: "Vibrant cultural celebrations featuring music, dance, and theatrical performances.",
  },
  {
    id: "g-7",
    title: "Annual Convocation Ceremony",
    category: "Activities",
    image: galleryGraduation,
    caption: "Honoring graduating scholars and gold medalists at Janhit Degree College.",
  },
  {
    id: "g-8",
    title: "Administrative Block & Lawn",
    category: "Campus",
    image: hero2,
    caption: "Front view of main campus courtyard and administrative offices.",
  },
];

export const VIDEO_DATA: VideoItem[] = [
  {
    id: "v-1",
    title: "Campus Virtual Tour — Janhit Degree College Saharanpur",
    description: "Take an immersive walkthrough of our academic blocks, computer labs, library, and sports grounds.",
    thumbnail: hero1,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "03:45",
  },
  {
    id: "v-2",
    title: "Annual Sports Day & B.P.Ed Athletic Showcase",
    description: "Highlights from our annual track and field tournament celebrating student athletic accomplishments.",
    thumbnail: gallerySports,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "04:20",
  },
  {
    id: "v-3",
    title: "Teacher Training & B.Ed Internship Program Overview",
    description: "Insights into practical school internship training and pedagogical workshops for teacher education.",
    thumbnail: galleryClassroom,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "02:50",
  },
];

export const NEWS_DATA: NewsItem[] = [
  {
    id: "n-1",
    slug: "admissions-open-2026-27",
    title: "Admissions Open for Academic Session 2026-27 Across All Degree Courses",
    category: "Announcement",
    date: "2026-03-01",
    image: hero1,
    shortDescription:
      "Janhit Degree College announces commencement of online & offline admission registrations for BA, BBA, BCA, B.Com, B.Ed, D.El.Ed, B.P.Ed and B.Sc.",
    content:
      "Janhit Degree College, Saharanpur hereby invites applications for admission into various undergraduate and professional teacher training programs for the academic session 2026-27. Prospective candidates can register online via the website or visit the campus admission desk in Chhutmalpur, Saharanpur. Merit-based scholarships and seat allocations will follow CCS University guidelines.",
  },
  {
    id: "n-2",
    slug: "ccsu-merit-list-announcement",
    title: "CCS University Semester Examination Results & Academic Merit List Declared",
    category: "Academic",
    date: "2026-02-18",
    image: galleryGraduation,
    shortDescription:
      "Janhit Degree College students secure top ranks in CCS University examination results across Science and Humanities streams.",
    content:
      "Ch. Charan Singh University, Meerut has released semester examination results. Janhit Degree College scholars demonstrated exemplary performance with high pass percentages in B.Sc, BCA, and BA programs. Congratulations to all toppers and dedicated faculty mentors!",
  },
  {
    id: "n-3",
    slug: "national-science-day-workshop",
    title: "National Science Day Workshop Organised by Faculty of Science",
    category: "Campus Life",
    date: "2026-02-28",
    image: galleryLab,
    shortDescription:
      "Interactive science exhibition and paper presentations held to mark National Science Day at JDC Saharanpur.",
    content:
      "The Department of Science hosted a day-long seminar featuring student project exhibitions, working models, and expert talks on sustainable agriculture, computing innovations, and environmental conservation.",
  },
  {
    id: "n-4",
    slug: "bped-inter-college-sports-trophy",
    title: "JDC Sports Squad Wins Inter-College Athletic Championship Trophy",
    category: "Achievement",
    date: "2026-01-25",
    image: gallerySports,
    shortDescription:
      "B.P.Ed and degree students brought home 12 medals at the regional university athletics tournament.",
    content:
      "The physical education sports team of Janhit Degree College clinched top positions in 100m sprint, relay races, shot put, and volleyball matches at the zonal inter-college meet. Management applauded the athletes and coaching team.",
  },
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: "e-1",
    slug: "annual-cultural-fest-2026",
    title: "Janhit Tarang 2026 — Annual Cultural Fest & Talent Hunt",
    status: "Upcoming",
    date: "2026-04-15",
    time: "09:30 AM onwards",
    venue: "Main Campus Auditorium, JDC Saharanpur",
    image: galleryCultural,
    shortDescription:
      "Two days of inter-departmental competitions in music, folk dance, debate, theatrical plays, and fine arts.",
    content:
      "Janhit Degree College presents its flagship annual youth festival 'Janhit Tarang 2026'. Students across BA, BBA, BCA, B.Com, B.Ed, B.P.Ed, and B.Sc streams will showcase artistic talents before distinguished guests and judges.",
  },
  {
    id: "e-2",
    slug: "campus-placement-drive-2026",
    title: "Mega Campus Job Fair & Career Guidance Drive",
    status: "Upcoming",
    date: "2026-05-10",
    time: "10:00 AM - 04:00 PM",
    venue: "Placement Cell & Seminar Hall",
    image: hero2,
    shortDescription:
      "Top regional recruiters, schools, IT firms, and finance companies visiting campus for final year graduate hiring.",
    content:
      "The Placement Cell at Janhit Degree College is hosting a campus recruitment drive inviting companies from IT, banking, education, and sales sectors for BCA, BBA, B.Com, and B.Ed final year students.",
  },
  {
    id: "e-3",
    slug: "national-teacher-education-seminar",
    title: "National Seminar on Modern Pedagogy & Inclusive Education",
    status: "Completed",
    date: "2026-01-12",
    time: "10:00 AM - 03:30 PM",
    venue: "Seminar Hall, JDC Saharanpur",
    image: galleryClassroom,
    shortDescription:
      "NCTE guidelines & NEP 2020 teacher education strategies discussed by eminent educationists.",
    content:
      "A national seminar focusing on child-centered learning, digital classroom integration, and inclusive pedagogical practices was attended by over 200 teacher trainees and educators.",
  },
];
