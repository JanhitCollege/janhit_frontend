import React, { useState, useRef, useEffect } from "react";
import { Camera, X, Upload, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStoredCampuses } from "@/data/campuses";
import { FacultyProfile } from "@/data/faculties";

interface FacultyFormProps {
  initialData?: FacultyProfile;
  onSubmit: (data: Omit<FacultyProfile, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
  submitButtonText: string;
}

export const FacultyForm: React.FC<FacultyFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText,
}) => {
  // Load campuses for campus select dropdown
  const campusesList = getStoredCampuses().filter((c) => c.status === "active");

  // Form states
  const [name, setName] = useState(initialData?.name || "");
  const [designation, setDesignation] = useState(initialData?.designation || "");
  const [department, setDepartment] = useState(initialData?.department || "");
  const [campusId, setCampusId] = useState(initialData?.campusId || "");
  const [qualification, setQualification] = useState(initialData?.qualification || "");
  const [specialization, setSpecialization] = useState(initialData?.specialization || "");
  const [experience, setExperience] = useState(initialData?.experience || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [linkedin, setLinkedin] = useState(initialData?.linkedin || "");
  const [researchInterest, setResearchInterest] = useState(initialData?.researchInterest || "");
  const [subjects, setSubjects] = useState(initialData?.subjects || "");
  const [publications, setPublications] = useState(initialData?.publications || "");
  const [awards, setAwards] = useState(initialData?.awards || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [message, setMessage] = useState(initialData?.message || "");
  const [displayOrder, setDisplayOrder] = useState(
    initialData?.displayOrder !== undefined ? String(initialData.displayOrder) : "0",
  );

  const [isHod, setIsHod] = useState(initialData?.isHod || false);
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [isActive, setIsActive] = useState(
    initialData?.isActive !== undefined ? initialData.isActive : true,
  );
  const [image, setImage] = useState(initialData?.image || "");

  // Error & Touch states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Field validation function
  const validateField = (fieldName: string, value: string): string => {
    if (fieldName === "name" && !value.trim()) {
      return "Faculty Name is required.";
    }
    if (fieldName === "campusId" && !value) {
      return "Please select a campus.";
    }
    if (fieldName === "email" && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address.";
      }
    }
    if (fieldName === "displayOrder") {
      const parsed = Number(value);
      if (value.trim() === "" || isNaN(parsed) || !Number.isInteger(parsed)) {
        return "Display Order must be an integer.";
      }
    }
    return "";
  };

  const handleBlur = (fieldName: string, value: string) => {
    setIsTouched((prev) => ({ ...prev, [fieldName]: true }));
    const errorMsg = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
  };

  const handleFieldChange = (fieldName: string, value: string, setter: (val: string) => void) => {
    setter(value);
    if (isTouched[fieldName]) {
      const errorMsg = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  // Image Upload Logic
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (limit to 1.5MB for local storage storage)
      if (file.size > 1.5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Image must be less than 1.5MB." }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setErrors((prev) => ({ ...prev, image: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      name: validateField("name", name),
      campusId: validateField("campusId", campusId),
      email: validateField("email", email),
      displayOrder: validateField("displayOrder", displayOrder),
    };

    setErrors(newErrors);
    setIsTouched({
      name: true,
      campusId: true,
      email: true,
      displayOrder: true,
    });

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) {
      // Find first error and scroll to it
      const firstErrorKey = Object.keys(newErrors).find(
        (k) => newErrors[k as keyof typeof newErrors] !== "",
      );
      if (firstErrorKey) {
        const element = document.getElementsByName(firstErrorKey)[0];
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
      return;
    }

    // Call submit handler
    onSubmit({
      name: name.trim(),
      designation: designation.trim(),
      department: department.trim(),
      campusId,
      qualification: qualification.trim(),
      specialization: specialization.trim(),
      experience: experience.trim(),
      email: email.trim(),
      phone: phone.trim(),
      linkedin: linkedin.trim(),
      researchInterest: researchInterest.trim(),
      subjects: subjects.trim(),
      publications: publications.trim(),
      awards: awards.trim(),
      bio: bio.trim(),
      message: message.trim(),
      displayOrder: Number(displayOrder),
      isHod,
      isFeatured,
      isActive,
      image,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      {/* Profile Image & Primary Meta */}
      <div className="bg-card glass rounded-2xl p-6 border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-2xl rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Avatar Upload */}
          <div className="relative group">
            <div
              onClick={handleImageClick}
              className={`size-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all relative ${
                image
                  ? "border-primary/40 bg-background"
                  : "border-muted-foreground/30 hover:border-primary/50 bg-background/50 hover:bg-background"
              }`}
            >
              {image ? (
                <img src={image} alt="Faculty Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <Camera className="size-6 text-muted-foreground mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] text-muted-foreground font-medium">
                    Upload Photo
                  </span>
                </div>
              )}

              {/* Overlay on hover */}
              {image && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="size-6 text-white" />
                </div>
              )}
            </div>

            {/* Remove button */}
            {image && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full shadow-md transition-colors"
                title="Remove photo"
              >
                <X className="size-3.5" />
              </button>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            {errors.image && (
              <p className="text-destructive text-[11px] font-semibold mt-1.5 text-center">
                {errors.image}
              </p>
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-xs font-bold text-foreground/80">
                Faculty Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => handleFieldChange("name", e.target.value, setName)}
                onBlur={(e) => handleBlur("name", e.target.value)}
                placeholder="Dr. Rajesh Kumar"
                className={`mt-1.5 rounded-xl ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.name && (
                <p className="text-destructive text-[11px] font-semibold mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="campusId" className="text-xs font-bold text-foreground/80">
                Campus <span className="text-destructive">*</span>
              </Label>
              <div className="mt-1.5">
                <Select
                  value={campusId}
                  onValueChange={(val) => {
                    handleFieldChange("campusId", val, setCampusId);
                  }}
                >
                  <SelectTrigger
                    className={`rounded-xl bg-background ${errors.campusId ? "border-destructive focus:ring-destructive" : ""}`}
                  >
                    <SelectValue placeholder="Select Campus" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-border/80">
                    {campusesList.map((campus) => (
                      <SelectItem key={campus.id} value={campus.id}>
                        {campus.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.campusId && (
                <p className="text-destructive text-[11px] font-semibold mt-1">{errors.campusId}</p>
              )}
            </div>

            <div>
              <Label htmlFor="designation" className="text-xs font-bold text-foreground/80">
                Designation
              </Label>
              <Input
                id="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Professor & Principal, Associate Professor, PGT, etc."
                className="mt-1.5 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="department" className="text-xs font-bold text-foreground/80">
                Department
              </Label>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Computer Science, Law, Education, Science, etc."
                className="mt-1.5 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Qualifications & Specializations */}
      <div className="bg-card glass rounded-2xl p-6 border shadow-sm space-y-4">
        <h3 className="font-display font-bold text-lg text-foreground border-b pb-2">
          Academic & Experience Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="qualification" className="text-xs font-bold text-foreground/80">
              Qualification
            </Label>
            <Input
              id="qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              placeholder="e.g. M.Tech, Ph.D. in CS"
              className="mt-1.5 rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="specialization" className="text-xs font-bold text-foreground/80">
              Specialization
            </Label>
            <Input
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="e.g. Constitutional Law, AI, Pedagogy"
              className="mt-1.5 rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="experience" className="text-xs font-bold text-foreground/80">
              Total Experience
            </Label>
            <Input
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 12 Years, 8 Months"
              className="mt-1.5 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Contact & Professional Links */}
      <div className="bg-card glass rounded-2xl p-6 border shadow-sm space-y-4">
        <h3 className="font-display font-bold text-lg text-foreground border-b pb-2">
          Contact & Professional Links
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="email" className="text-xs font-bold text-foreground/80">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => handleFieldChange("email", e.target.value, setEmail)}
              onBlur={(e) => handleBlur("email", e.target.value)}
              placeholder="e.g. name@janhit.edu.in"
              className={`mt-1.5 rounded-xl ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.email && (
              <p className="text-destructive text-[11px] font-semibold mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-xs font-bold text-foreground/80">
              Phone Number
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 00000"
              className="mt-1.5 rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="linkedin" className="text-xs font-bold text-foreground/80">
              LinkedIn Profile URL
            </Label>
            <Input
              id="linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="e.g. https://linkedin.com/in/username"
              className="mt-1.5 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Research, Publications, Subjects */}
      <div className="bg-card glass rounded-2xl p-6 border shadow-sm space-y-4">
        <h3 className="font-display font-bold text-lg text-foreground border-b pb-2">
          Research & Publications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="researchInterest" className="text-xs font-bold text-foreground/80">
              Research Interest
            </Label>
            <Textarea
              id="researchInterest"
              value={researchInterest}
              onChange={(e) => setResearchInterest(e.target.value)}
              placeholder="Focus areas, ongoing research projects, core research domains..."
              className="mt-1.5 rounded-xl h-24 resize-none"
            />
          </div>

          <div>
            <Label htmlFor="subjects" className="text-xs font-bold text-foreground/80">
              Subjects Taught
            </Label>
            <Textarea
              id="subjects"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              placeholder="Subjects taught across classes/courses (comma-separated)..."
              className="mt-1.5 rounded-xl h-24 resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="publications" className="text-xs font-bold text-foreground/80">
              Key Publications
            </Label>
            <Textarea
              id="publications"
              value={publications}
              onChange={(e) => setPublications(e.target.value)}
              placeholder="List journals, conferences, book chapters, or publications (numbered list format)..."
              className="mt-1.5 rounded-xl h-28 resize-y"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="awards" className="text-xs font-bold text-foreground/80">
              Awards & Honors
            </Label>
            <Textarea
              id="awards"
              value={awards}
              onChange={(e) => setAwards(e.target.value)}
              placeholder="Academic recognitions, teaching excellence, research honors..."
              className="mt-1.5 rounded-xl h-24 resize-y"
            />
          </div>
        </div>
      </div>

      {/* Biography & Personal Message */}
      <div className="bg-card glass rounded-2xl p-6 border shadow-sm space-y-4">
        <h3 className="font-display font-bold text-lg text-foreground border-b pb-2">
          Biography & Personal Message
        </h3>

        <div className="space-y-4">
          <div>
            <Label htmlFor="bio" className="text-xs font-bold text-foreground/80">
              Full Biography
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell a detailed story about the faculty member's professional background, accomplishments, and career highlights..."
              className="mt-1.5 rounded-xl h-36"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-xs font-bold text-foreground/80">
              Personal Message / Quote
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A welcome message, motto, or personal philosophy on education..."
              className="mt-1.5 rounded-xl h-24"
            />
          </div>
        </div>
      </div>

      {/* Admin Settings & Switches */}
      <div className="bg-card glass rounded-2xl p-6 border shadow-sm space-y-4">
        <h3 className="font-display font-bold text-lg text-foreground border-b pb-2">
          Publishing & Admin Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div>
            <Label htmlFor="displayOrder" className="text-xs font-bold text-foreground/80">
              Display Order <span className="text-destructive">*</span>
            </Label>
            <Input
              id="displayOrder"
              name="displayOrder"
              value={displayOrder}
              onChange={(e) => handleFieldChange("displayOrder", e.target.value, setDisplayOrder)}
              onBlur={(e) => handleBlur("displayOrder", e.target.value)}
              type="number"
              placeholder="0"
              className={`mt-1.5 rounded-xl ${errors.displayOrder ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.displayOrder && (
              <p className="text-destructive text-[11px] font-semibold mt-1">
                {errors.displayOrder}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/40">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="isHod" className="text-xs font-bold cursor-pointer">
                Department Head (HOD)
              </Label>
              <span className="text-[10px] text-muted-foreground">Sets HOD priority flag</span>
            </div>
            <Switch id="isHod" checked={isHod} onCheckedChange={setIsHod} />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/40">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="isFeatured" className="text-xs font-bold cursor-pointer">
                Featured Faculty
              </Label>
              <span className="text-[10px] text-muted-foreground">Promote on home screen</span>
            </div>
            <Switch id="isFeatured" checked={isFeatured} onCheckedChange={setIsFeatured} />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/40">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="isActive" className="text-xs font-bold cursor-pointer">
                Active Status
              </Label>
              <span className="text-[10px] text-muted-foreground">Visible on public list</span>
            </div>
            <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} className="rounded-xl px-6">
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm rounded-xl px-8"
        >
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};
