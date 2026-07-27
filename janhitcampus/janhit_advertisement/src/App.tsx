import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  User, 
  School, 
  BookOpen, 
  CheckCircle2, 
  Facebook, 
  Instagram, 
  Sparkles,
  ArrowRight,
  MapPin
} from 'lucide-react';
import logo from './assets/logo-web.png';
import './styles/App.css';

interface Campus {
  name: string;
  courses: string[];
}

const campusData: Record<string, Campus> = {
  law_gn: {
    name: "Janhit College of Law, Greater Noida",
    courses: ["LL.M. – 2 Years", "LL.B. – 3 Years", "B.A.LL.B. – 5 Years"]
  },
  edu_info_gn: {
    name: "Janhit Institute of Education & Information, Greater Noida",
    courses: [
      "B.A.", 
      "BBA", 
      "BCA", 
      "B.Sc. (Biology)", 
      "B.Sc. (Mathematics)", 
      "B.Com.", 
      "B.Ed. – 2 Years", 
      "D.El.Ed. – 2 Years"
    ]
  },
  edu_gzb: {
    name: "Janhit Institute of Education, Ghaziabad",
    courses: [
      "B.A.", 
      "B.Com.", 
      "BBA", 
      "BCA", 
      "B.P.E.S.", 
      "B.P.Ed.", 
      "B.Ed.", 
      "D.El.Ed."
    ]
  },
  degree_srh: {
    name: "Janhit Degree College, Saharanpur",
    courses: [
      "B.A.", 
      "B.Com.", 
      "B.Sc. (Biology)", 
      "B.Sc. (Mathematics)", 
      "B.Sc. (Agriculture)", 
      "BBA", 
      "BCA", 
      "B.P.E.S.", 
      "B.Ed.", 
      "D.El.Ed."
    ]
  },
  school_gn: {
    name: "Janhit World School, Greater Noida",
    courses: ["Classes: 1st to 8th"]
  },
  school_gzb: {
    name: "Janhit World School, Ghaziabad",
    courses: ["Classes: 1st to 8th"]
  },
  school_srh: {
    name: "Janhit World School, Saharanpur",
    courses: ["Classes: 1st to 8th"]
  }
};

// Comprehensive list of all courses offered across the group (deduplicated)
const ALL_COURSES = [
  "LL.M. – 2 Years",
  "LL.B. – 3 Years",
  "B.A.LL.B. – 5 Years",
  "B.A.",
  "BBA",
  "BCA",
  "B.Sc. (Biology)",
  "B.Sc. (Mathematics)",
  "B.Sc. (Agriculture)",
  "B.Com.",
  "B.Ed. – 2 Years",
  "D.El.Ed. – 2 Years",
  "B.Ed.",
  "D.El.Ed.",
  "B.P.E.S.",
  "B.P.Ed.",
  "Classes: 1st to 8th"
];

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    altPhone: '',
    campus: '',
    course: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (formData.altPhone.trim() && !/^[6-9]\d{9}$/.test(formData.altPhone.trim())) {
      newErrors.altPhone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.campus) newErrors.campus = 'Please select a campus';
    if (!formData.course) newErrors.course = 'Please select a course/class';

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log('Lead Captured:', {
        ...formData,
        campusName: campusData[formData.campus]?.name
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Top Banner / Header (Fully responsive sizes) */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gold/15 py-2.5 sm:py-3.5 px-4 sm:px-6 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img src={logo} alt="Janhit Logo" className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-contain shrink-0" />
            <div className="leading-tight text-left">
              <div className="font-serif text-sm sm:text-base md:text-xl tracking-wide font-semibold text-navy">
                Janhit Education Group
              </div>
              <div className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold font-bold">
                Colleges & Schools
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Hidden on mobile, shown on desktop */}
            <a
              href="mailto:info@janhitgroup.com"
              className="hidden md:flex items-center gap-2.5 text-navy hover:text-gold transition-colors text-left"
            >
              <Mail className="size-5 text-gold shrink-0" />
              <div className="leading-tight flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold">Email Us</span>
                <span className="text-sm font-semibold text-navy">info@janhitgroup.com</span>
              </div>
            </a>
            
            <a
              href="tel:+919286777770"
              className="text-navy hover:text-gold transition-colors flex items-center gap-1.5 sm:gap-2.5 text-right"
            >
              <Phone className="size-4.5 sm:size-5 text-gold shrink-0 animate-bounce" style={{ animationDuration: '3s' }} />
              <div className="leading-tight flex flex-col items-end">
                <span className="hidden sm:inline-block text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-gold">Admissions Helpline</span>
                <span className="text-xs sm:text-sm font-semibold text-navy whitespace-nowrap">+91 9286777770</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* Main Centered Inquiry Form Section */}
      <main className="flex-grow flex items-center justify-center py-6 sm:py-10 lg:py-16 px-4 sm:px-6">
        <div className="w-full flex flex-col items-center justify-center space-y-5">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy text-white border border-gold/30 shadow-sm">
            <Sparkles className="size-3.5 text-gold animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
              Admissions Open 2026-27
            </span>
          </div>

          {/* Form Container (Responsive padding p-5 sm:p-8 md:p-12) */}
          <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl p-5 sm:p-8 md:p-12 shadow-luxury relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 gradient-gold" />
            
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="font-serif text-2xl sm:text-3xl text-navy">Admission Inquiry Form</h2>
                  <p className="text-[11px] sm:text-xs text-navy-deep/60 mt-1 sm:mt-1.5">Fill out the details below to receive a call back from our counsellor.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
                  {/* Student Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-navy-deep/80 mb-1.5 sm:mb-2">
                      Student Name *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center text-navy-deep/40">
                        <User className="size-4.5 sm:size-5" />
                      </span>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter student's full name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-11 pr-4 py-3 sm:py-3.5 sm:pl-12 rounded-xl border bg-gray-50/50 text-navy-deep text-sm sm:text-base outline-none transition-all ${
                          errors.name ? 'border-red-500 ring-1 ring-red-500/20' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email ID & Phone Row */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-navy-deep/80 mb-1.5 sm:mb-2">
                        Email ID *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center text-navy-deep/40">
                          <Mail className="size-4.5 sm:size-5" />
                        </span>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-11 pr-4 py-3 sm:py-3.5 sm:pl-12 rounded-xl border bg-gray-50/50 text-navy-deep text-sm sm:text-base outline-none transition-all ${
                            errors.email ? 'border-red-500 ring-1 ring-red-500/20' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-navy-deep/80 mb-1.5 sm:mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center text-navy-deep/40">
                          <Phone className="size-4.5 sm:size-5" />
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          placeholder="10-digit mobile number"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-11 pr-4 py-3 sm:py-3.5 sm:pl-12 rounded-xl border bg-gray-50/50 text-navy-deep text-sm sm:text-base outline-none transition-all ${
                            errors.phone ? 'border-red-500 ring-1 ring-red-500/20' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Alternate Mobile No */}
                  <div>
                    <label htmlFor="altPhone" className="block text-xs sm:text-sm font-semibold text-navy-deep/80 mb-1.5 sm:mb-2">
                      Alternate Mobile No (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center text-navy-deep/40">
                        <Phone className="size-4.5 sm:size-5" />
                      </span>
                      <input
                        type="tel"
                        name="altPhone"
                        id="altPhone"
                        placeholder="Alternate 10-digit mobile number"
                        value={formData.altPhone}
                        onChange={handleChange}
                        className={`w-full pl-11 pr-4 py-3 sm:py-3.5 sm:pl-12 rounded-xl border bg-gray-50/50 text-navy-deep text-sm sm:text-base outline-none transition-all ${
                          errors.altPhone ? 'border-red-500 ring-1 ring-red-500/20' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10'
                        }`}
                      />
                    </div>
                    {errors.altPhone && <p className="text-xs text-red-500 mt-1">{errors.altPhone}</p>}
                  </div>

                  {/* Campus Select */}
                  <div>
                    <label htmlFor="campus" className="block text-xs sm:text-sm font-semibold text-navy-deep/80 mb-1.5 sm:mb-2">
                      Select Campus / Institute *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center text-navy-deep/40">
                        <School className="size-4.5 sm:size-5" />
                      </span>
                      <select
                        name="campus"
                        id="campus"
                        value={formData.campus}
                        onChange={handleChange}
                        className={`w-full pl-11 pr-8 py-3 sm:py-3.5 sm:pl-12 rounded-xl border bg-gray-50/50 text-navy-deep text-sm sm:text-base outline-none appearance-none transition-all ${
                          errors.campus ? 'border-red-500 ring-1 ring-red-500/20' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10'
                        }`}
                      >
                        <option value="">-- Choose Institution / Campus --</option>
                        {Object.entries(campusData).map(([key, campus]) => (
                          <option key={key} value={key}>{campus.name}</option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 right-0 pr-3.5 sm:pr-4 flex items-center pointer-events-none text-navy-deep/40 text-xs">
                        ▼
                      </span>
                    </div>
                    {errors.campus && <p className="text-xs text-red-500 mt-1">{errors.campus}</p>}
                  </div>

                  {/* Course Select */}
                  <div>
                    <label htmlFor="course" className="block text-xs sm:text-sm font-semibold text-navy-deep/80 mb-1.5 sm:mb-2">
                      Select Course / Class *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center text-navy-deep/40">
                        <BookOpen className="size-4.5 sm:size-5" />
                      </span>
                      <select
                        name="course"
                        id="course"
                        value={formData.course}
                        onChange={handleChange}
                        className={`w-full pl-11 pr-8 py-3 sm:py-3.5 sm:pl-12 rounded-xl border bg-gray-50/50 text-navy-deep text-sm sm:text-base outline-none appearance-none transition-all ${
                          errors.course ? 'border-red-500 ring-1 ring-red-500/20' : 'border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/10'
                        }`}
                      >
                        <option value="">-- Choose Course / Class --</option>
                        {ALL_COURSES.map((course, idx) => (
                          <option key={idx} value={course}>{course}</option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 right-0 pr-3.5 sm:pr-4 flex items-center pointer-events-none text-navy-deep/40 text-xs">
                        ▼
                      </span>
                    </div>
                    {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 h-12 sm:h-14 rounded-xl gradient-gold text-navy font-bold text-sm sm:text-base tracking-wide shadow-gold hover:-translate-y-0.5 hover:shadow-luxury duration-300 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="h-5 sm:h-6 w-5 sm:w-6 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Inquiry <ArrowRight className="size-4.5 sm:size-5" />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8 sm:py-10 text-center flex flex-col items-center justify-center space-y-4 sm:space-y-5">
                <div className="h-16 sm:h-20 w-16 sm:w-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center border border-green-100 animate-bounce">
                  <CheckCircle2 className="size-10 sm:size-12" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-navy">Registration Successful!</h2>
                <p className="text-sm sm:text-base text-navy-deep/70 max-w-md leading-relaxed">
                  Thank you, <span className="font-semibold">{formData.name}</span>. We have captured your admission enquiry for <span className="font-semibold">{campusData[formData.campus]?.name}</span> ({formData.course}).
                </p>
                <p className="text-xs sm:text-sm text-navy-deep/50">
                  Our admissions advisor will connect with you on <span className="font-semibold">{formData.phone}</span> shortly.
                </p>
                
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      altPhone: '',
                      campus: '',
                      course: ''
                    });
                  }}
                  className="mt-4 sm:mt-6 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl border border-navy/20 text-navy hover:bg-navy/5 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy-deep text-white py-10 sm:py-12 px-6 border-t border-gold/20 relative">
        <div className="absolute top-0 inset-x-0 gold-divider opacity-40" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <img src={logo} alt="Janhit Logo" className="h-14 w-14 sm:h-16 sm:w-16 object-contain" />
            <div className="text-center sm:text-left">
              <div className="font-serif text-lg">Janhit Education Group</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold mb-2">Empowering Minds since 2000</div>
              
              <div className="flex items-start justify-center sm:justify-start gap-1.5 text-xs text-white/60 mb-3 max-w-md">
                <MapPin className="size-4 text-gold shrink-0 mt-0.5" />
                <span>Plot No. 55-B, Knowledge Park-5, Greater Noida, U.P. – 201306</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs text-white/60">
                <a href="tel:+919286777770" className="hover:text-gold flex items-center justify-center sm:justify-start gap-1.5 transition-colors">
                  <Phone className="size-3.5 text-gold" /> +91 9286777770
                </a>
                <span className="hidden sm:inline text-white/20">|</span>
                <a href="mailto:info@janhitgroup.com" className="hover:text-gold flex items-center justify-center sm:justify-start gap-1.5 transition-colors">
                  <Mail className="size-3.5 text-gold" /> info@janhitgroup.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold">Social Media</span>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/janhiteducation"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy-deep transition-all"
                aria-label="Facebook Page"
              >
                <Facebook className="size-4.5" />
              </a>
              <a
                href="https://www.instagram.com/janhiteducation"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy-deep transition-all"
                aria-label="Instagram Page"
              >
                <Instagram className="size-4.5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 max-w-7xl mx-auto text-center text-[11px] text-white/40 tracking-wider">
          &copy; {new Date().getFullYear()} Janhit Education Group. All rights reserved. Admissions Session 2026-27.
        </div>
      </footer>
    </div>
  );
}

export default App;
