import {
  Check,
  Info,
  FileText,
  UserPlus,
  CreditCard,
  AlertCircle,
  BookOpen,
  Star,
  Sparkles,
  Laptop,
  Music,
  Wallet,
  GraduationCap,
  Trophy,
  Target,
  Dumbbell,
  Library,
  Mic2,
  Heart,
} from "lucide-react";
import { FadeIn } from "./Section";

export function SchoolAdmissions() {
  return (
    <div className="space-y-20">
      {/* 1. Vision & Admission Philosophy */}
      <FadeIn>
        <div className="p-8 md:p-16 rounded-[2.5rem] bg-gradient-primary text-primary-foreground relative overflow-hidden">
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-8 border border-gold/30">
              <Sparkles className="size-4" /> Admissions Open 2026-27
            </div>
            <h2 className="text-2xl md:text-6xl font-display font-bold mb-8 leading-tight">
              "We don't just teach — we prepare your child for a world that{" "}
              <span className="italic text-gold">hasn't been imagined yet.</span>"
            </h2>
            <p className="text-xl opacity-90 leading-relaxed font-light">
              At Janhit World School, admissions are guided by our commitment to providing every
              child with an environment where curiosity thrives, character is built, and global
              competencies are developed.
            </p>
          </div>
          <Sparkles className="absolute -right-12 -top-12 size-64 opacity-10 rotate-12" />
          <Target className="absolute -left-12 -bottom-12 size-64 opacity-5 -rotate-12" />
        </div>
      </FadeIn>

      {/* Why Choose JANHIT WORLD SCHOOL? (From Image 2) */}
      <FadeIn>
        <section id="why-choose">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-5xl font-display font-bold mb-4">
              Why Choose JANHIT WORLD SCHOOL?
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: "School In The Vicinity",
                desc: "With a professional Indoor Shooting Range integrated into the daily routine — a rare, real-world skill from day one.",
              },
              {
                icon: Laptop,
                title: "Robotics & STEM From The Start",
                desc: "Fully equipped Robotics Lab where students build, code and solve real problems — not just read about them.",
              },
              {
                icon: Heart,
                title: "Montessori-Rooted Foundation",
                desc: "Our Foundational Hub for Playgroup to UKG blends Montessori principles with structured modern learning.",
              },
              {
                icon: Wallet,
                title: "Financial Literacy In Curriculum",
                desc: "We teach children how money, budgeting and the economy work — skills most schools ignore entirely.",
              },
              {
                icon: GraduationCap,
                title: "International-Level Curriculum",
                desc: "Globally benchmarked academics with local relevance, preparing students for national and international opportunities.",
              },
              {
                icon: UserPlus,
                title: "Every Child Matters",
                desc: "Small class sizes and a structured individual-attention model ensure no child is left behind or unchallenged.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-5 p-8 rounded-3xl bg-card border border-border hover:border-gold/50 transition-all duration-500 hover:shadow-elegant group"
              >
                <div className="size-14 shrink-0 rounded-2xl bg-primary/5 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500 shadow-sm">
                  <item.icon className="size-7" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Sports @ JWS (From Image 1) */}
      <FadeIn>
        <section
          id="sports"
          className="p-8 md:p-12 rounded-[2.5rem] bg-secondary/50 border border-border"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">Sports @ JWS</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                The only school in the vicinity with professional-grade sports infrastructure
                integrated into the morning routine.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Target, title: "Indoor Shooting Range", highlight: true },
                  { icon: Dumbbell, title: "Football" },
                  { icon: Trophy, title: "Cricket" },
                  { icon: Target, title: "Table Tennis" },
                  { icon: Heart, title: "Yoga & Wellness" },
                  { icon: Sparkles, title: "Morning Sports Electives" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-2xl border ${s.highlight ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-card border-border"}`}
                  >
                    <s.icon className={`size-5 ${s.highlight ? "text-gold" : "text-primary"}`} />
                    <span className="font-bold text-sm">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent group-hover:opacity-0 transition-opacity duration-700" />
              <img
                src="https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=2072&auto=format&fit=crop"
                alt="Sports Infrastructure"
                className="size-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-dark rounded-2xl">
                <p className="text-white font-medium text-center">
                  "A school built differently, for children who will change things."
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* The Foundational Hub (From Image 1) */}
      <FadeIn>
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <div className="p-10 rounded-[2.5rem] bg-card border border-border shadow-sm flex flex-col justify-center">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-4">
              The Foundational Hub
            </h2>
            <p className="text-muted-foreground mb-8">
              Crafted for our little explorers — Playgroup to UKG.
            </p>
            <div className="space-y-4">
              {[
                { icon: Laptop, title: "Montessori Lab" },
                { icon: Library, title: "Mini-Library" },
                { icon: BookOpen, title: "Class Library System" },
                { icon: Mic2, title: "Music & Creative Arts" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div className="size-10 rounded-xl bg-white shadow-sm grid place-items-center text-primary">
                    <item.icon className="size-5" />
                  </div>
                  <span className="font-bold">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-[2.5rem] bg-gradient-gold text-gold-foreground flex flex-col justify-center shadow-gold">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 italic">
              Future-Ready Academics
            </h2>
            <p className="text-gold-foreground/80 mb-8">
              A curriculum built for the world of tomorrow.
            </p>
            <ul className="space-y-5">
              {[
                "Robotics & STEM Labs",
                "Financial Literacy Programme",
                "International Level Curriculum",
                "Hands-on Project-Based Learning",
                "Tech-Integrated Smart Classrooms",
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="size-2 rounded-full bg-gold-foreground" />
                  <span className="font-bold text-lg">{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 p-6 rounded-2xl bg-gold-foreground/5 border border-gold-foreground/10">
              <p className="font-medium italic">
                "Innovation-first classroom culture and holistic development from day one."
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Eligibility & Age Criteria */}
      <FadeIn>
        <section id="eligibility">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-gold/10 text-gold grid place-items-center">
              <Info className="size-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Eligibility & Age Criteria
            </h2>
          </div>
          <p className="mb-6 text-muted-foreground">
            Age is calculated as on <strong>31st March 2026</strong>. The following table outlines
            the age criteria for each class:
          </p>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-foreground">Class / Grade</th>
                  <th className="px-6 py-4 text-left font-bold text-foreground">Minimum Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Playgroup", "2.5 years"],
                  ["Nursery", "3 years"],
                  ["LKG", "3.5 – 4.5 years"],
                  ["UKG", "4.5 – 5.5 years"],
                  ["Grade 1", "6 years"],
                  ["Grade 2–5", "As applicable"],
                ].map(([cls, age]) => (
                  <tr key={cls} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">{cls}</td>
                    <td className="px-6 py-4 text-muted-foreground">{age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-accent/50 border border-border flex gap-3 text-sm italic text-muted-foreground">
            <AlertCircle className="size-5 shrink-0 text-gold" />
            <p>
              Note: Management reserves the right to assess school readiness beyond age criteria for
              Playgroup and Nursery admissions.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Admission Process */}
      <FadeIn>
        <section id="process">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
              <UserPlus className="size-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Admission Process</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "STEP 1",
                title: "Registration",
                desc: "Obtain and complete the official Registration Form. Submit along with required documents and registration fee.",
              },
              {
                step: "STEP 2",
                title: "Campus Visit",
                desc: "School tour and parent orientation session will be conducted on the day of interaction.",
              },
              {
                step: "STEP 3",
                title: "Interaction",
                desc: "Play-based interaction for Pre-Primary; simple written/oral assessment for Grade 1 and above.",
              },
              {
                step: "STEP 4",
                title: "Verification",
                desc: "Self-attested document verification. Admission confirmed only after all correct documents are submitted.",
                highlight: true,
              },
              {
                step: "STEP 5",
                title: "Offer & Payment",
                desc: "Selected candidates receive admission call. Pay fees within 2-3 working days to secure the seat.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`relative p-6 rounded-2xl bg-card border shadow-sm transition-all duration-300 group flex flex-col ${s.highlight ? "border-gold/50 shadow-gold/10" : "border-border hover:border-primary/30"}`}
              >
                <div className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-2">
                  {s.step}
                </div>
                <h3 className="font-display font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-4 pt-4 flex justify-end border-t border-border/50">
                  <div
                    className={`size-8 rounded-full border border-border grid place-items-center text-[10px] font-bold ${s.highlight ? "bg-gold/10 text-gold border-gold/20" : "text-muted-foreground"}`}
                  >
                    {i + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Fee Structure & Payment Policy */}
      <FadeIn>
        <section id="fees">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-10 rounded-xl bg-gold/10 text-gold grid place-items-center">
              <CreditCard className="size-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Fee Structure & Payment Policy
            </h2>
          </div>

          {/* Founder's Batch (Updated) */}
          <div className="mb-12 p-8 md:p-12 rounded-[2.5rem] bg-gradient-gold text-gold-foreground border border-gold/20 shadow-gold relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-foreground/10 text-xs font-bold uppercase tracking-wider mb-6 border border-gold-foreground/20">
                  <Star className="size-3 fill-current" /> Join the Founder's Batch!
                </div>
                <h3 className="text-2xl md:text-5xl font-display font-bold mb-6">
                  Exclusive benefits for the first 50 admissions only.
                </h3>
                <div className="space-y-3">
                  {[
                    "100% Admission Fee Waiver",
                    "Founder's Batch Discount",
                    "Priority: Shooting & Robotics Clubs",
                  ].map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gold-foreground/10 border border-gold-foreground/20 font-bold"
                    >
                      <Check className="size-5" /> {benefit}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gold-foreground/5 p-8 rounded-3xl border border-gold-foreground/10 text-center">
                <div className="text-7xl font-display font-bold mb-2">50</div>
                <div className="text-sm uppercase tracking-[0.2em] font-bold mb-6">Seats Only</div>
                <p className="text-lg opacity-90 leading-relaxed italic">
                  "Limited seats reserved for founding families. Secure priority access to all
                  premium clubs and facilities from day one."
                </p>
                <div className="mt-8 size-32 bg-white/10 mx-auto rounded-2xl flex flex-col items-center justify-center border border-white/20">
                  <div className="size-16 border-4 border-gold-foreground/40 border-t-gold-foreground animate-spin rounded-full" />
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-tighter opacity-60">
                    Scan to Inquire
                  </span>
                </div>
              </div>
            </div>
            <Sparkles className="absolute -right-8 -bottom-8 size-64 opacity-20" />
          </div>

          {/* Tables ... (Same as before) */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Fee Components */}
            <div>
              <h4 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <div className="size-2 rounded-full bg-gold" /> Fee Components
              </h4>
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold">Type</th>
                      <th className="px-4 py-3 text-left font-bold">General</th>
                      <th className="px-4 py-3 text-left font-bold">Founder's</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 font-medium">Registration Fee</td>
                      <td className="px-4 py-3">1000/-</td>
                      <td className="px-4 py-3">1000/-</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Admission Fee (One Time)</td>
                      <td className="px-4 py-3">25,000/-</td>
                      <td className="px-4 py-3 text-green-600 font-bold">Waived</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Miscellaneous Charges</td>
                      <td className="px-4 py-3">4,000/-</td>
                      <td className="px-4 py-3">—</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Annual Tuition Fee</td>
                      <td className="px-4 py-3">As per grade</td>
                      <td className="px-4 py-3">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* School Fee 2026-2027 */}
            <div>
              <h4 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <div className="size-2 rounded-full bg-gold" /> School Fee (2026-2027)
              </h4>
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold">Classes</th>
                      <th className="px-4 py-3 text-left font-bold">Timings</th>
                      <th className="px-4 py-3 text-left font-bold">Quarterly</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      ["Bal-Vatika", "8:55 am – 1:20 pm", "16,500/-"],
                      ["Bal-Vatika 1 & 2", "8:55 am – 1:20 pm", "18,000/-"],
                      ["Bal-Vatika 3", "8:55 am – 2:40 pm", "18,000/-"],
                      ["Grade I - V", "8:55 am – 2:40 pm", "19,500/-"],
                    ].map(([cls, time, fee]) => (
                      <tr key={cls}>
                        <td className="px-4 py-3 font-medium">{cls}</td>
                        <td className="px-4 py-3 text-muted-foreground">{time}</td>
                        <td className="px-4 py-3 font-bold text-primary">{fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-3 p-6 rounded-2xl bg-secondary/30 border border-border text-sm text-muted-foreground">
            <p>
              *The above fee structure includes the annual permissible fee hike (5%+CPI) as per UP
              State Government order every session.
            </p>
            <p>
              *All fees are payable via bank transfer, cheque, or the school's online payment
              portal. Cash payments are not accepted for amounts exceeding Rs. 2,000.
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {/* 6. Fee Refund Policy */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-4"> Fee Refund Policy</h3>
              <ul className="space-y-3">
                <li className="flex gap-4 text-muted-foreground">
                  <span className="font-bold text-primary">1.</span>
                  <p>Registration Fee is strictly non-refundable under all circumstances.</p>
                </li>
                <li className="flex gap-4 text-muted-foreground">
                  <span className="font-bold text-primary">2.</span>
                  <p>
                    No refund of tuition or other fees will be made once the academic session
                    commences.
                  </p>
                </li>
              </ul>
            </div>

            {/* 7. Reservation & Inclusion Policy */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-4">
                {" "}
                Reservation & Inclusion Policy
              </h3>
              <p className="text-muted-foreground mb-4 italic">
                Janhit World School is committed to inclusive education and provides equitable
                access to all eligible students:
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  <div>
                    <p className="text-muted-foreground">
                      <strong>Sibling Preference:</strong> Siblings of currently enrolled students
                      will receive priority consideration, subject to seat availability. 25% off on
                      Admission Fees, On discretion 5-10% off on Quarterly fees.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  <div>
                    <p className="text-muted-foreground">
                      <strong>Staff Ward Policy:</strong> Children of school staff are eligible for
                      defined concessions as per the staff benefit schedule. (75% on Quarterly
                      Fees).
                    </p>
                  </div>
                </li>
              </ul>
              <p className="mt-4 text-sm font-medium text-primary">
                The school does not discriminate on the basis of religion, caste, gender, or
                socioeconomic background.
              </p>
            </div>

            {/* 8. Transfer Admissions */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-4">
                {" "}
                Transfer Admissions (Grade 2 and above)
              </h3>
              <p className="text-muted-foreground mb-4 italic">
                Students seeking mid-year or new-session transfer admissions must:
              </p>
              <ul className="space-y-3">
                {[
                  "Submit a valid Transfer Certificate (TC) from the previous school duly signed and stamped.",
                  "Appear for a grade-appropriate placement assessment.",
                  "Produce the last years academic records.",
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <Check className="size-5 text-gold shrink-0" /> {text}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Transfer admissions are subject to seat availability and the school's assessment of
                the student's suitability for the target grade.
              </p>
            </div>

            {/* 9. Code of Conduct */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-4">
                {" "}
                Code of Conduct for Admission Process
              </h3>
              <ul className="space-y-4">
                {[
                  "All interactions during the admission process must be conducted with courtesy and respect.",
                  "Canvassing, influencing, or offering inducements to school staff is strictly prohibited and will result in immediate disqualification of the application.",
                  "Any attempt to submit forged or misrepresented documents is a criminal offence and will be reported to the appropriate authorities.",
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <div className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive" /> {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* 10. Management Rights */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-4">
                {" "}
                Management Rights & General Clauses
              </h3>
              <ul className="space-y-3">
                {[
                  "The school management reserves the sole right to grant or decline admission without being obligated to provide reasons.",
                  "Admission once granted may be cancelled if any submitted information is found to be false or misleading.",
                  "The school reserves the right to amend the admission policy at any time. Updates will be communicated via the school website and notice board.",
                  "In case of any dispute, the decision of the Principal and School Management shall be final and binding.",
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <div className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/30" /> {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* 11. Academic Highlights */}
            <div className="pt-10 border-t border-border">
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
                {" "}
                Academic Highlights at Janhit World School
              </h3>
              <p className="text-muted-foreground mb-8 italic">
                Admissions to Janhit World School grant access to a world-class educational
                ecosystem:
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: Sparkles,
                    text: "Tech-Integrated Smart Classrooms with interactive learning tools",
                  },
                  { icon: Laptop, text: "Robotics & STEM Labs for future-ready skill development" },
                  {
                    icon: Target,
                    text: "Indoor Shooting Range — the only professional-grade facility in the vicinity",
                  },
                  {
                    icon: BookOpen,
                    text: "Montessori Lab & Mini-Library for our youngest learners",
                  },
                  { icon: Music, text: "Music & Creative Arts Programme" },
                  { icon: Wallet, text: "Financial Literacy as part of the curriculum" },
                  {
                    icon: GraduationCap,
                    text: "International-level curriculum with experiential learning at the core",
                  },
                  { icon: UserPlus, text: "Individual attention through structured class sizes" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm"
                  >
                    <div className="size-10 shrink-0 rounded-xl bg-primary/5 text-primary grid place-items-center">
                      <item.icon className="size-5" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Code of Conduct */}
      <FadeIn>
        <div className="p-8 rounded-3xl bg-destructive/5 border border-destructive/20 text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mb-2">
            Janhit World School
          </p>
          <h3 className="text-2xl font-display font-bold italic">
            "A new school — built with vision, not habit. Join us at the very beginning and help
            shape something extraordinary."
          </h3>
        </div>
      </FadeIn>
    </div>
  );
}
