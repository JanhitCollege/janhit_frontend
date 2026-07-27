import { motion } from "framer-motion";
import { ClipboardList, MapPin, MessagesSquare, UserCheck, Gift, ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    icon: ClipboardList,
    title: "Inquiry & Registration",
    desc: "Submit the enquiry form to begin.",
  },
  { icon: MapPin, title: "Campus Experience", desc: "A guided tour of our spaces and ethos." },
  {
    icon: MessagesSquare,
    title: "Student Interaction",
    desc: "A friendly, age-appropriate session.",
  },
  {
    icon: UserCheck,
    title: "Principal Interaction",
    desc: "A meaningful conversation with the family.",
  },
  { icon: Gift, title: "Enrollment & Welcome Kit", desc: "Welcome to the Janhit family." },
];

export function Admissions() {
  return (
    <section id="admissions" className="relative py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Admissions 2026-27"
          title={
            <>
              A thoughtful, <span className="italic text-gradient-gold">five-step journey</span>.
            </>
          }
          description="We get to know every family personally. Here is what the path to Janhit looks like."
        />

        <div className="mt-20 relative">
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative h-full"
              >
                <div className="relative bg-white rounded-2xl p-6 border border-border hover:border-gold/50 hover-lift h-full flex flex-col justify-start">
                  <div className="absolute -top-5 left-6 h-10 w-10 rounded-full gradient-gold flex items-center justify-center font-serif text-navy-deep text-lg font-bold shadow-gold">
                    {i + 1}
                  </div>
                  <s.icon className="size-7 text-navy mt-3" />
                  <h3 className="mt-4 font-serif text-xl text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="mt-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="font-serif text-3xl md:text-4xl text-navy">
              Required <span className="italic text-gradient-gold">Documents</span> for Admission
            </h3>
            <p className="mt-3 text-muted-foreground text-sm font-medium">
              Please prepare self-attested copies of the following documents to ensure a seamless
              verification and enrollment process.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Group 1: Core Identification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 md:p-8 bg-white border border-gold/20 rounded-2xl shadow-luxury hover:border-gold/50 transition-all duration-300 h-full"
            >
              <div className="flex items-center gap-3 border-b border-gold/15 pb-4 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center font-bold font-serif">
                  1
                </div>
                <h4 className="font-serif text-lg md:text-xl text-navy font-semibold">
                  Core Identification
                </h4>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">Birth Certificate:</strong> A
                    self-attested copy issued by the Municipal Corporation / Gram Panchayat. (The
                    name on the certificate must match the admission form exactly).
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">Aadhar Card of the Child:</strong>{" "}
                    Mandatory for registration on the government UDISE+ portal and for creating the
                    APAAR ID (Permanent Education Number - PEN).
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">Aadhar Card of Both Parents:</strong>{" "}
                    Required for official school files and correspondence records.
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">Proof of Residence:</strong> Attested
                    copy of Voter ID, Passport, Electricity Bill, Water Bill, or Valid Rent
                    Agreement.
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">
                      Caste Certificate (if applicable):
                    </strong>{" "}
                    If the student belongs to SC / ST / OBC, an official certificate issued by the
                    Competent Authority must be provided for government records.
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Group 2: Academic & Photos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="p-6 md:p-8 bg-white border border-gold/20 rounded-2xl shadow-luxury hover:border-gold/50 transition-all duration-300 h-full"
            >
              <div className="flex items-center gap-3 border-b border-gold/15 pb-4 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center font-bold font-serif">
                  2
                </div>
                <h4 className="font-serif text-lg md:text-xl text-navy font-semibold">
                  Academic Records & Photos
                </h4>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">Transfer Certificate (TC):</strong>{" "}
                    Original TC from the previous school, duly signed by the Principal (Grade 2 &
                    above). If moving from a different State or a different Board (e.g., ICSE to
                    CBSE), the TC must be counter-signed by the Education Officer (BEO/DEO/CBSE
                    Regional Office).
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">Previous Year’s Report Card:</strong> A
                    self-attested copy of the final marksheet to verify the grade cleared
                    successfully (Grade 2 & above).
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">
                      PEN (Permanent Education Number):
                    </strong>{" "}
                    Must be obtained from the previous school’s leaving certificate or UDISE portal.
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">Passport Size Photographs:</strong> 2
                    recent photos of the Child, 1 photo of the Mother, 1 photo of the Father, and 1
                    photo of the Local Guardian (if applicable).
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Group 3: Medical & Health */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="p-6 md:p-8 bg-white border border-gold/20 rounded-2xl shadow-luxury hover:border-gold/50 transition-all duration-300 h-full"
            >
              <div className="flex items-center gap-3 border-b border-gold/15 pb-4 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center font-bold font-serif">
                  3
                </div>
                <h4 className="font-serif text-lg md:text-xl text-navy font-semibold">
                  Medical & Health Records
                </h4>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">Medical Fitness Certificate:</strong>{" "}
                    Original certificate from a registered Medical Practitioner (MBBS) certifying
                    the child is fit to attend school.
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">Blood Group Report:</strong> An official
                    laboratory blood analysis report is required.
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">Vaccination/Immunization Card:</strong>{" "}
                    Copy of the vaccination record (mainly required for Pre-Primary to Grade 3).
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">
                      Allergy Disclosure (if applicable):
                    </strong>{" "}
                    A written declaration by parents if the child has specific food/drug allergies
                    or chronic conditions (e.g., Asthma, Epilepsy).
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Group 4: Special Categories & Rules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-6 md:p-8 bg-white border border-gold/20 rounded-2xl shadow-luxury hover:border-gold/50 transition-all duration-300 h-full"
            >
              <div className="flex items-center gap-3 border-b border-gold/15 pb-4 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center font-bold font-serif">
                  4
                </div>
                <h4 className="font-serif text-lg md:text-xl text-navy font-semibold">
                  Special Categories & Rules
                </h4>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">EWS / RTE Documents:</strong> If the
                    admission is under the Right to Education (RTE) act, the parent Income
                    Certificate and BPL card must be provided as per state government norms.
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">Divorce / Custody Papers:</strong> In
                    case of single parents or legal disputes, a copy of the court order regarding
                    the child's custody and authorization details for picking the child up.
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-1">★</span>
                  <div className="text-xs leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-bold">Important Note:</strong> Please bring
                    the original documents along with self-attested copies during your campus
                    interaction session for quick verification.
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Fee Structure Section */}
        <div id="fee-structure" className="mt-28 border-t border-gold/10 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="font-serif text-3xl md:text-4xl text-navy">
              Fee Structure & <span className="italic text-gradient-gold">Payment Policy</span>
            </h3>
            <p className="mt-3 text-muted-foreground text-sm font-medium">
              Transparent fee structures, inaugural batch benefits, and clear refund guidelines for
              the 2026-2027 academic session.
            </p>
          </div>

          {/* Founder's Batch Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 p-6 md:p-8 bg-white border border-gold/20 rounded-2xl shadow-luxury hover:border-gold/50 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-4 mb-6">
              <div>
                <h4 className="font-serif text-xl md:text-2xl text-navy font-semibold">
                  Founder's Batch — <span className="italic text-gold">Exclusive Benefits</span>
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Exclusive privileges reserved for the first 50 admissions.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold tracking-wider uppercase">
                ★ 100% Admission Fee Waiver
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-gold/10 text-navy font-serif font-bold text-sm md:text-base">
                    <th className="py-3 px-4">Fee Component</th>
                    <th className="py-3 px-4">Type Of Fee</th>
                    <th className="py-3 px-4">General Applicants</th>
                    <th className="py-3 px-4 text-gold">Founder's Batch (First 50)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10 text-sm">
                  <tr className="hover:bg-beige/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-navy">Registration Fee</td>
                    <td className="py-3.5 px-4 text-muted-foreground">Non-refundable</td>
                    <td className="py-3.5 px-4 text-muted-foreground">1,000/-</td>
                    <td className="py-3.5 px-4 font-semibold text-navy">1,000/-</td>
                  </tr>
                  <tr className="hover:bg-beige/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-navy">Admission Fee</td>
                    <td className="py-3.5 px-4 text-muted-foreground">One Time (non-refundable)</td>
                    <td className="py-3.5 px-4 text-muted-foreground">25,000/-</td>
                    <td className="py-3.5 px-4 font-bold text-gold">100% Waived</td>
                  </tr>
                  <tr className="hover:bg-beige/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-navy">Miscellaneous Charges</td>
                    <td className="py-3.5 px-4 text-muted-foreground">Non-refundable</td>
                    <td className="py-3.5 px-4 text-muted-foreground">4,000/-</td>
                    <td className="py-3.5 px-4 text-muted-foreground">—</td>
                  </tr>
                  <tr className="hover:bg-beige/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-navy">Annual Tuition Fee</td>
                    <td className="py-3.5 px-4 text-muted-foreground">Non-refundable</td>
                    <td className="py-3.5 px-4 text-muted-foreground">As per grade</td>
                    <td className="py-3.5 px-4 text-muted-foreground">—</td>
                  </tr>
                  <tr className="hover:bg-beige/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-navy">Sports & Activity Fee</td>
                    <td className="py-3.5 px-4 text-muted-foreground">—</td>
                    <td className="py-3.5 px-4 text-muted-foreground">—</td>
                    <td className="py-3.5 px-4 text-muted-foreground">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* School Fee & Refund Policy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* School Fee Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 md:p-8 bg-white border border-gold/20 rounded-2xl shadow-luxury hover:border-gold/50 transition-all duration-300"
            >
              <div className="border-b border-gold/15 pb-4 mb-6">
                <h4 className="font-serif text-xl md:text-2xl text-navy font-semibold">
                  School Fee <span className="italic text-gold">(2026-2027)</span>
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Grade-wise composite fee schedule and school timings.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-gold/10 text-navy font-serif font-bold text-sm md:text-base">
                      <th className="py-3 px-4">Heads</th>
                      <th className="py-3 px-4">Classes</th>
                      <th className="py-3 px-4">Summer Timings</th>
                      <th className="py-3 px-4">Quarterly</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10 text-sm">
                    <tr className="hover:bg-beige/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-navy">Composite Fees</td>
                      <td className="py-3.5 px-4 text-muted-foreground">Bal-Vatika</td>
                      <td className="py-3.5 px-4 text-muted-foreground">8:55 am – 1:20 pm</td>
                      <td className="py-3.5 px-4 font-semibold text-navy">16,500/-</td>
                    </tr>
                    <tr className="hover:bg-beige/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-navy">Composite Fees</td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        Bal-Vatika 1 & Bal-Vatika 2
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">8:55 am – 1:20 pm</td>
                      <td className="py-3.5 px-4 font-semibold text-navy">18,000/-</td>
                    </tr>
                    <tr className="hover:bg-beige/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-navy">Composite Fees</td>
                      <td className="py-3.5 px-4 text-muted-foreground">Bal-Vatika 3</td>
                      <td className="py-3.5 px-4 text-muted-foreground">8:55 am – 2:40 pm</td>
                      <td className="py-3.5 px-4 font-semibold text-navy">18,000/-</td>
                    </tr>
                    <tr className="hover:bg-beige/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-navy">Composite Fees</td>
                      <td className="py-3.5 px-4 text-muted-foreground">Grade I - V</td>
                      <td className="py-3.5 px-4 text-muted-foreground">8:55 am – 2:40 pm</td>
                      <td className="py-3.5 px-4 font-semibold text-navy">19,500/-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-3 text-xs text-muted-foreground border-t border-gold/10 pt-4">
                <p className="flex gap-2">
                  <span className="text-gold font-bold">•</span>
                  <span>
                    The above fee structure includes the annual permissible fee hike (5%+CPI) as per
                    UP State Government order every session.
                  </span>
                </p>
                <p className="flex gap-2">
                  <span className="text-gold font-bold">•</span>
                  <span>
                    All fees are payable via bank transfer, cheque, or the school's online payment
                    portal. Cash payments are not accepted for amounts exceeding Rs. 2,000.
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Fee Refund Policy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 md:p-8 bg-white border border-gold/20 rounded-2xl shadow-luxury hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="border-b border-gold/15 pb-4 mb-6">
                  <h4 className="font-serif text-xl md:text-2xl text-navy font-semibold">
                    Fee Refund <span className="italic text-gold">Policy</span>
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Please read the refund terms carefully prior to enrollment.
                  </p>
                </div>

                <ul className="space-y-4">
                  <li className="flex gap-3 text-left">
                    <div className="h-6 w-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="text-sm leading-relaxed text-muted-foreground">
                      <strong className="text-navy font-bold">Registration Fee:</strong>{" "}
                      Registration Fee is strictly non-refundable under all circumstances.
                    </div>
                  </li>
                  <li className="flex gap-3 text-left">
                    <div className="h-6 w-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="text-sm leading-relaxed text-muted-foreground">
                      <strong className="text-navy font-bold">Session Commencement:</strong> No
                      refund of tuition or other fees will be made once the academic session
                      commences.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-beige/40 border border-gold/10 text-xs text-muted-foreground">
                <strong className="text-navy block mb-1 font-semibold">Need assistance?</strong>
                For any queries regarding fee structures, billing cycles, or payment portal setup,
                please contact our admissions office.
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reservation & Inclusion Policy */}
        <div id="reservation-policy" className="mt-28 border-t border-gold/10 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="font-serif text-3xl md:text-4xl text-navy">
              Reservation & <span className="italic text-gradient-gold">Inclusion Policy</span>
            </h3>
            <p className="mt-3 text-muted-foreground text-sm font-medium">
              Janhit World School is committed to inclusive education and provides equitable access
              to all eligible students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 md:p-8 bg-white border border-gold/20 rounded-2xl shadow-luxury hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 border-b border-gold/15 pb-4 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center font-bold font-serif">
                    ★
                  </div>
                  <h4 className="font-serif text-lg md:text-xl text-navy font-semibold">
                    Sibling Preference
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Siblings of currently enrolled students will receive priority consideration,
                  subject to seat availability.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-gold/5 border border-gold/10 text-xs text-navy font-medium">
                  <span className="text-gold font-bold mr-1.5">Benefit:</span>
                  25% concession on Admission Fees. On discretion, a 5% to 10% concession on
                  Quarterly Tuition fees.
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 md:p-8 bg-white border border-gold/20 rounded-2xl shadow-luxury hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 border-b border-gold/15 pb-4 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center font-bold font-serif">
                    ★
                  </div>
                  <h4 className="font-serif text-lg md:text-xl text-navy font-semibold">
                    Staff Ward Policy
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Children of school staff are eligible for defined concessions as per the staff
                  benefit schedule.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-gold/5 border border-gold/10 text-xs text-navy font-medium">
                  <span className="text-gold font-bold mr-1.5">Benefit:</span>
                  75% concession on Quarterly Tuition Fees.
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground max-w-xl mx-auto">
            The school does not discriminate on the basis of religion, caste, gender, or
            socioeconomic background.
          </div>
        </div>

        {/* Transfer Admissions & Code of Conduct */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-28 border-t border-gold/10 pt-20">
          {/* Transfer Admissions */}
          <motion.div
            id="transfer-admissions"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 md:p-8 bg-white border border-gold/20 rounded-2xl shadow-luxury hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="border-b border-gold/15 pb-4 mb-6">
                <h4 className="font-serif text-xl md:text-2xl text-navy font-semibold">
                  Transfer Admissions <span className="italic text-gold">(Grade 2 & Above)</span>
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Guidelines for students seeking mid-year or new-session transfer admissions.
                </p>
              </div>

              <ul className="space-y-4">
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-semibold">Transfer Certificate (TC):</strong>{" "}
                    Submit a valid TC from the previous school, duly signed and stamped.
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-semibold">Placement Assessment:</strong>{" "}
                    Appear for a grade-appropriate placement assessment.
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-gold font-bold mt-0.5">✔</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-navy font-semibold">Academic Records:</strong> Produce
                    the last years academic records.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-beige/40 border border-gold/10 text-xs text-muted-foreground">
              Transfer admissions are subject to seat availability and the school's assessment of
              the student's suitability for the target grade.
            </div>
          </motion.div>

          {/* Code of Conduct */}
          <motion.div
            id="conduct-policy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 md:p-8 bg-white border border-gold/20 rounded-2xl shadow-luxury hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="border-b border-gold/15 pb-4 mb-6">
                <h4 className="font-serif text-xl md:text-2xl text-navy font-semibold">
                  Code of Conduct <span className="italic text-gold">for Admission Process</span>
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Ethical guidelines and expectations during the enrollment process.
                </p>
              </div>

              <ul className="space-y-4">
                <li className="flex gap-3 text-left">
                  <span className="text-red-500 font-bold mt-0.5">!</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    All interactions during the admission process must be conducted with courtesy
                    and respect.
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-red-500 font-bold mt-0.5">!</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    Canvassing, influencing, or offering inducements to school staff is strictly
                    prohibited and will result in immediate disqualification of the application.
                  </div>
                </li>
                <li className="flex gap-3 text-left">
                  <span className="text-red-500 font-bold mt-0.5">!</span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    Any attempt to submit forged or misrepresented documents is a criminal offence
                    and will be reported to the appropriate authorities.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-xs text-muted-foreground">
              We maintain a fair, transparent, and merit-based admission policy to ensure equal
              opportunity for all families.
            </div>
          </motion.div>
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 relative rounded-3xl overflow-hidden gradient-navy p-10 md:p-14 shadow-luxury"
        >
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="text-gold text-xs tracking-[0.35em] uppercase">
                Limited · Invite-Only
              </div>
              <h3 className="mt-3 font-serif text-3xl md:text-5xl text-white max-w-xl leading-tight">
                Founding Batch <span className="italic text-gradient-gold">Admissions Open.</span>
              </h3>
              <p className="mt-3 text-white/70 max-w-lg">
                Be part of the inaugural cohort and enjoy exclusive founder's benefits.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 h-14 rounded-md gradient-gold text-navy-deep font-semibold tracking-wide shadow-gold hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              Reserve a Seat <ArrowRight className="size-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
