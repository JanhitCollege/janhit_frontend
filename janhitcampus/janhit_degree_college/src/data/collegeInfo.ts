export interface CollegeInfo {
  name: string;
  shortName: string;
  tagline: string;
  established: number;
  affiliation: string;
  approval: string;
  address: {
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  phone: string;
  phones: string[];
  email: string;
  emails: string[];
  mapLink: string;
  highlights: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  aboutText: string;
  groupAboutText: string;
  aboutSections: Array<{
    title: string;
    content: string;
  }>;
  whyJanhit: Array<{
    title: string;
    description: string;
  }>;
  chairmanMessage: {
    name: string;
    title: string;
    paragraphs: string[];
  };
  vision: string;
  missionText: string;
}

export const COLLEGE_INFO: CollegeInfo = {
  name: "Janhit Institute of Education & Information",
  shortName: "JIEI Greater Noida",
  tagline: "Empowering Minds, Shaping Tomorrow's Leaders",
  established: 2002,
  affiliation: "Ch. Charan Singh University, Meerut",
  approval: "NCTE, New Delhi",
  address: {
    street: "Plot No. 38-B",
    locality: "Knowledge Park 1",
    city: "Greater Noida, G B Nagar",
    state: "Uttar Pradesh",
    pincode: "201308",
    full: "Plot No. 38-B, Knowledge Park 1, Greater Noida, G B Nagar (U.P.) 201308",
  },
  phone: "+91-9773500615",
  phones: ["+91-9773500615", "+91-9958200440", "+91-9773500617"],
  email: "info@jiei.in",
  emails: ["info@jiei.in", "admission@jiei.in", "career@jiei.in"],
  mapLink: "https://maps.app.goo.gl/s5qmt9mbSFfrHuxb7",
  highlights: [
    {
      title: "Established 2001",
      description: "23+ years of educational service and leadership.",
      icon: "Award",
    },
    {
      title: "CCSU Affiliated",
      description: "Affiliated to Ch. Charan Singh University, Meerut.",
      icon: "GraduationCap",
    },
    {
      title: "NCTE Approved",
      description: "Approved by National Council for Teacher Education, New Delhi.",
      icon: "CheckCircle2",
    },
    {
      title: "35,000+ Alumni",
      description: "Shaped and transformed the futures of 35,000+ graduates.",
      icon: "Users",
    },
    {
      title: "Multiple Professional Courses",
      description: "Offering B.A., BBA, BCA, B.Com, B.Ed, D.El.Ed, B.P.Ed & B.Sc.",
      icon: "BookOpen",
    },
    {
      title: "Modern Facilities",
      description: "State-of-the-art computer labs, library, and sports grounds.",
      icon: "Building2",
    },
  ],
  aboutText:
    "Welcome to Janhit Institute of Education & Information, Greater Noida, a prestigious institution that has been at the forefront of higher education for over two decades. Founded in 2001 under the Indian Societies Registration Act XXI of 1860, our college has played a pivotal role in shaping the futures of more than 35,000+ students.",
  groupAboutText:
    "Janhit Group of Institutions operates high-quality educational institutions across Greater Noida, Saharanpur, and Ghaziabad. From schools to degree and law colleges, Janhit Group is dedicated to providing quality professional education that combines academic rigor with moral values and career readiness.",
  aboutSections: [
    {
      title: "About Janhit Institute of Education and Information",
      content:
        "Welcome to Janhit Institute of Education & Information, a prestigious institution that has been at the forefront of higher education for two decades. Our well renowned college has played a pivotal role in shaping and changing the futures of more than 35,000+ students, turning them into not only successful professionals but also enlightened beings. Founded with the vision of providing quality education that transcends traditional boundaries, we have evolved into a landmark of academic excellence and innovative learning.",
    },
    {
      title: "Our Educational Ethos",
      content:
        "At Janhit, education is more than just imparting knowledge; it's about creating a learning experience that is comprehensive, inclusive, and empowering. Our faculty, a distinguished assembly of scholars and industry veterans, are dedicated to crafting a curriculum that is both rigorous and relevant. Their expertise, coupled with a steadfast commitment to student success, ensures that our academic programs are not just current but also forward-thinking, preparing students to excel in a rapidly changing world.",
    },
    {
      title: "State-of-the-Art Campus Facilities",
      content:
        "Our campus is a reflection of our commitment to excellence in education. Encompassing modern classrooms equipped with the latest teaching aids, expansive sports facilities for a healthy body and mind, and cutting-edge computer labs that bridge the gap between theory and practice, Janhit Institute of Education and Information provides an educational environment that is both stimulating and supportive. The library, stocked with an extensive collection of books, journals, and digital resources, stands as a beacon of knowledge, encouraging exploration and intellectual growth.",
    },
    {
      title: "Creating Industry-Ready Professionals",
      content:
        "Our approach to education extends beyond the classroom. Through internships, workshops, and collaboration with industry leaders, we ensure that our students gain practical experience and industry exposure. This hands-on approach helps in molding our students into professionals who are not only academically proficient but also ready to meet the challenges of the professional world.",
    },
    {
      title: "A Legacy of Success",
      content:
        "The legacy of Janhit Institute of Education & Information is etched in the achievements of our alumni, who have excelled in various sectors globally. Their success stories are a testament to the quality and impact of our education. We take pride in our alumni network, which remains an integral part of our community, contributing to our institution through mentorship, collaborations, and continued engagement.",
    },
    {
      title: "Vibrant Campus Life",
      content:
        "Beyond academics, Janhit Institute of Education & Information is a hub of cultural and extracurricular activities. Our campus is alive with arts, sports, and cultural events, fostering a community where students can discover and develop their passions. This vibrant campus life not only enhances the college experience but also promotes holistic development, preparing our students to be well-rounded individuals.",
    },
    {
      title: "Join Us on This Remarkable Journey",
      content:
        "As we celebrate twenty-three years of educational leadership, we look forward to continuing our journey of excellence. Janhit Institute of Education & Information is not just a place for learning; it's where you can dream, innovate, and achieve. We invite you to visit our campus, meet our faculty, and discover how we can be part of your success story. Your future begins at Janhit Institute of Education & Information. Embrace the journey of education with us, where every day is an opportunity to learn, grow, and succeed.",
    },
    {
      title: "Founding Legacy Since 2001",
      content:
        "The year 2001 saw the birth of Janhit Institute of Education and Information, a non-profit making educational society registered under the Indian Societies Registration Act XXI of 1860.",
    },
  ],
  whyJanhit: [
    {
      title: "Established Legacy of Excellence",
      description:
        "With 23+ years of educational service, your college has a proven track record of providing quality education and nurturing successful graduates. This legacy is a testament to the institution's commitment to academic excellence and its established reputation in the educational sector.",
    },
    {
      title: "Dedicated and Expert Faculty",
      description:
        "Your college boasts a team of highly qualified and experienced educators who are dedicated to student success. With their expertise and commitment, they provide an enriching learning environment that equips students with the knowledge and skills needed to excel in their careers.",
    },
    {
      title: "Industry-Relevant Curriculum",
      description:
        "The curriculum is designed to be both comprehensive and relevant to the current demands of the professional world. This ensures that students are not only academically proficient but also industry-ready, with practical skills and experience that enhance their employability.",
    },
    {
      title: "Modern Facilities and Resources",
      description:
        "The state-of-the-art infrastructure, including advanced computer labs, well-equipped classrooms, and extensive sports facilities, provides a conducive environment for learning and personal development. These facilities support a holistic educational experience, fostering both intellectual and physical growth.",
    },
    {
      title: "Hands-On Experience and Exposure",
      description:
        "Through various initiatives like internships, workshops, and industry collaboration, students gain valuable practical experience and exposure to real-world scenarios. This not only enhances their learning but also prepares them for the challenges of the professional world.",
    },
    {
      title: "Vibrant Community and Campus Life",
      description:
        "The college offers a vibrant campus life enriched with cultural, sporting, and extracurricular activities. This community environment fosters personal growth, networking, and the development of a well-rounded personality.",
    },
    {
      title: "Strong Alumni Network",
      description:
        "The extensive network of successful alumni serves as a testament to the quality of education and offers current students mentoring, networking, and employment opportunities.",
    },
  ],
  vision:
    "To be a globally acclaimed beacon of higher education, recognized for pioneering innovative and interdisciplinary programs that transcend traditional boundaries. Our vision is to cultivate a diverse community of learners, thinkers, and leaders who are committed to driving sustainable change and making significant contributions to their fields and societies worldwide. We strive to create an environment that fosters intellectual curiosity, creative problem-solving, and ethical decision-making, preparing students to excel in a complex, interconnected world. Through continuous investment in research, technology, and global partnerships, we aim to set new standards in educational excellence, empowering our students to meet the challenges of the future with confidence and a sense of purpose.",
  missionText:
    "Our mission is to provide an empowering educational experience that combines rigorous academic study with practical, real-world skills development. We commit to nurturing critical thinking, creativity, and a passion for lifelong learning in our students, supported by a dedicated faculty and cutting-edge infrastructure. Through collaborative partnerships, community engagement, and a culture of excellence, we prepare our students to excel in their careers and lead with integrity and responsibility in addressing global challenges.",
  chairmanMessage: {
    name: "Mr. Narendra Chaudhary",
    title: "Chairman, Janhit Group of Institutions",
    paragraphs: [
      "Dear Students, Parents, and Esteemed Stakeholders,",
      "Education is the most powerful instrument for transforming lives, empowering individuals, and building a progressive nation. It not only provides knowledge but also shapes character, strengthens values, develops leadership, and inspires lifelong learning. At Janhit Group of Institutions, we believe that true education creates responsible citizens who contribute positively to society and lead with integrity, compassion, and excellence.",
      "With this belief, our journey began in 2002 with the establishment of our higher educational institutions. Our vision was simple yet ambitious—to make quality professional education accessible to every deserving student and to prepare graduates who are academically sound, professionally competent, socially responsible, and ethically grounded.",
      "Over the years, Janhit Group has grown into a trusted name in higher education, offering programmes in Law, Teacher Education, Management, Commerce, Science, Computer Applications, and Physical Education. Thousands of our alumni are today serving the nation with distinction in the legal profession, education, public service, business, and various other fields. Their achievements inspire us to continue raising the standards of academic excellence and innovation.",
      "The COVID-19 pandemic was a defining moment for the education sector and for society as a whole. It reminded us that education must begin by building strong foundations—not only in academics but also in resilience, discipline, emotional well-being, digital literacy, and moral values. The experiences of those challenging years strengthened our resolve to nurture young minds from the very beginning of their educational journey.",
      "This vision led to the establishment of Janhit World School, where every child is encouraged to learn with curiosity, think creatively, act responsibly, and grow into a confident global citizen while remaining firmly rooted in Indian culture and values. Our schools are committed to providing a safe, joyful, and inspiring learning environment that promotes holistic development through academics, sports, arts, technology, and life skills.",
      "Whether in our colleges or our schools, our commitment remains the same—to provide quality education through experienced faculty, modern infrastructure, innovative teaching practices, and a value-based learning environment. We continuously strive to create institutions where every learner is respected, every talent is nurtured, and every dream is given the opportunity to flourish.",
      "At Janhit Group, we do not merely educate students; we shape futures. We believe that the success of an institution is reflected in the success, integrity, and character of its students. Our mission is to empower every learner to become a responsible professional, a compassionate human being, and a proud citizen of India.",
      "I extend my heartfelt invitation to all students and parents to become a part of the Janhit family. Together, let us continue our journey of learning, innovation, and nation-building, creating opportunities that transform aspirations into achievements.",
      "I wish all our students a future filled with knowledge, confidence, success, and happiness.",
      "With warm regards,\nMr. Narendra Chaudhary\nChairman\nJanhit Group of Institutions",
    ],
  },
};
