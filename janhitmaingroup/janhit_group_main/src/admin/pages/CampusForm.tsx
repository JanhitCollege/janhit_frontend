import React, { useState, useRef, useEffect } from "react";
import { Camera, X, Upload, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Campus } from "@/data/campuses";

interface CampusFormProps {
  initialData?: Campus;
  onSubmit: (data: {
    name: string;
    shortName: string;
    code: string;
    slug: string;
    subdomain: string;
    websiteUrl: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    pincode: string;
    address: string;
    logo: string;
    description: string;
    status: "active" | "inactive";
  }) => void;
  onCancel: () => void;
  submitButtonText: string;
}

export const CampusForm: React.FC<CampusFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText,
}) => {
  // State for form fields
  const [name, setName] = useState(initialData?.name || "");
  const [shortName, setShortName] = useState(initialData?.shortName || "");
  const [code, setCode] = useState(initialData?.code || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [subdomain, setSubdomain] = useState(initialData?.subdomain || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [stateVal, setStateVal] = useState(initialData?.state || "");
  const [pincode, setPincode] = useState(initialData?.pincode || "");
  const [logo, setLogo] = useState(initialData?.logo || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState<"active" | "inactive">(initialData?.status || "active");

  // Sync state with initialData when it loads/changes
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setShortName(initialData.shortName || "");
      setCode(initialData.code || "");
      setSlug(initialData.slug || "");
      setSubdomain(initialData.subdomain || "");
      setEmail(initialData.email || "");
      setPhone(initialData.phone || "");
      setAddress(initialData.address || "");
      setCity(initialData.city || "");
      setStateVal(initialData.state || "");
      setPincode(initialData.pincode || "");
      setLogo(initialData.logo || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "active");
    }
  }, [initialData]);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug and subdomain from name if name changed and fields not touched yet
  useEffect(() => {
    const hasNameChanged = !initialData || name !== initialData.name;

    if (hasNameChanged) {
      if (!isTouched.slug) {
        const generatedSlug = name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "") // remove special chars
          .trim()
          .replace(/\s+/g, "-") // replace spaces with hyphens
          .replace(/-+/g, "-"); // merge multiple hyphens
        setSlug(generatedSlug);
      }
      if (!isTouched.subdomain) {
        const generatedSubdomain = name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "") // remove non-alphanumeric
          .slice(0, 10);
        setSubdomain(generatedSubdomain);
      }
    }
  }, [name, initialData, isTouched.slug, isTouched.subdomain]);

  // Sync websiteUrl with subdomain
  const websiteUrl = subdomain ? `https://${subdomain}.janhitgroup.com` : "https://janhitgroup.com";

  // Validation function
  const validateField = (fieldName: string, value: string): string => {
    if (fieldName === "name" && !value.trim()) {
      return "Campus Name is required.";
    }
    if (fieldName === "code" && !value.trim()) {
      return "Campus Code is required.";
    }
    if (fieldName === "subdomain") {
      if (!value.trim()) {
        return "Subdomain is required.";
      }
      if (!/^[a-z0-9-]+$/.test(value)) {
        return "Subdomain can only contain lowercase letters, numbers, and hyphens.";
      }
    }
    if (fieldName === "slug" && value.trim()) {
      if (!/^[a-z0-9-]+$/.test(value)) {
        return "Slug can only contain lowercase letters, numbers, and hyphens.";
      }
    }
    if (fieldName === "email" && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address.";
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
  const handleLogoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      name: validateField("name", name),
      code: validateField("code", code),
      subdomain: validateField("subdomain", subdomain),
      slug: validateField("slug", slug),
      email: validateField("email", email),
    };

    setErrors(newErrors);
    setIsTouched({
      name: true,
      code: true,
      subdomain: true,
      slug: true,
      email: true,
    });

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) {
      // Find first error and scroll to it
      const firstErrorField = Object.keys(newErrors).find(
        (key) => newErrors[key as keyof typeof newErrors] !== "",
      );
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
      return;
    }

    onSubmit({
      name: name.trim(),
      shortName: shortName.trim(),
      code: code.trim().toUpperCase(),
      slug: slug.trim(),
      subdomain: subdomain.trim().toLowerCase(),
      websiteUrl,
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      state: stateVal.trim(),
      pincode: pincode.trim(),
      logo,
      description: description.trim(),
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-24">
      {/* 2 Column Layout on Desktop, 1 Column on Tablet/Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Section: Basic Information */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                1
              </span>
              Basic Information
            </h2>

            {/* Campus Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Campus Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Janhit World School Greater Noida"
                value={name}
                onChange={(e) => handleFieldChange("name", e.target.value, setName)}
                onBlur={(e) => handleBlur("name", e.target.value)}
                className={`h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all ${
                  errors.name ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
              />
              {errors.name && <p className="text-destructive text-xs mt-1 pl-0.5">{errors.name}</p>}
            </div>

            {/* Grid for Short Name and Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Short Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="shortName"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
                >
                  Short Name
                </Label>
                <Input
                  id="shortName"
                  type="text"
                  placeholder="e.g. JWS GN"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all"
                />
              </div>

              {/* Campus Code */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="code"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
                >
                  Campus Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="e.g. JWS-GN-01"
                  value={code}
                  onChange={(e) => handleFieldChange("code", e.target.value.toUpperCase(), setCode)}
                  onBlur={(e) => handleBlur("code", e.target.value)}
                  className={`h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all ${
                    errors.code ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                />
                {errors.code && (
                  <p className="text-destructive text-xs mt-1 pl-0.5">{errors.code}</p>
                )}
              </div>
            </div>

            {/* Grid for Slug and Subdomain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Slug */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="slug"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5 flex items-center gap-1.5"
                >
                  Slug
                  <span className="text-[10px] text-muted-foreground capitalize font-normal">
                    (auto-generated)
                  </span>
                </Label>
                <Input
                  id="slug"
                  type="text"
                  placeholder="e.g. janhit-world-school-greater-noida"
                  value={slug}
                  onChange={(e) => {
                    setIsTouched((prev) => ({ ...prev, slug: true }));
                    handleFieldChange("slug", e.target.value.toLowerCase(), setSlug);
                  }}
                  onBlur={(e) => handleBlur("slug", e.target.value)}
                  className={`h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all ${
                    errors.slug ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                />
                {errors.slug && (
                  <p className="text-destructive text-xs mt-1 pl-0.5">{errors.slug}</p>
                )}
              </div>

              {/* Subdomain */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="subdomain"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
                >
                  Subdomain <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="subdomain"
                  type="text"
                  placeholder="e.g. jwsgn"
                  value={subdomain}
                  onChange={(e) => {
                    setIsTouched((prev) => ({ ...prev, subdomain: true }));
                    handleFieldChange("subdomain", e.target.value.toLowerCase(), setSubdomain);
                  }}
                  onBlur={(e) => handleBlur("subdomain", e.target.value)}
                  className={`h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all ${
                    errors.subdomain ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                />
                {errors.subdomain && (
                  <p className="text-destructive text-xs mt-1 pl-0.5">{errors.subdomain}</p>
                )}
              </div>
            </div>

            {/* Generated Website URL Preview */}
            <div className="mt-1.5 p-3 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-2.5">
              <Info className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-muted-foreground uppercase tracking-wider block font-bold text-[9px] mb-0.5">
                  Auto-Generated Web Address
                </span>
                <code className="text-primary font-semibold break-all font-mono">{websiteUrl}</code>
              </div>
            </div>
          </div>

          {/* Section: Description */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                2
              </span>
              Campus Description
            </h2>
            <div className="space-y-1.5">
              <Label
                htmlFor="description"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Description
              </Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Describe the campus academic focus, campus size, facilities, established history..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all resize-none text-sm leading-relaxed p-3"
              />
            </div>
          </div>

          {/* Section: Status */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                3
              </span>
              Campus Status
            </h2>
            <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/60">
              <div className="space-y-0.5">
                <span className="text-sm font-semibold text-foreground">Active Status</span>
                <span className="text-xs text-muted-foreground block">
                  Toggle whether this campus is listed publicly and accepts logins.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${status === "active" ? "text-green-600" : "text-muted-foreground"}`}
                >
                  {status === "active" ? "Active" : "Inactive"}
                </span>
                <Switch
                  checked={status === "active"}
                  onCheckedChange={(checked) => setStatus(checked ? "active" : "inactive")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Section: Branding */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                4
              </span>
              Branding
            </h2>

            <div className="space-y-3">
              <Label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5 block">
                Campus Logo
              </Label>
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-background/40 border border-dashed border-border">
                {/* Image / Fallback Preview Box */}
                <div className="size-24 rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {logo ? (
                    <img src={logo} alt="Campus Logo Preview" className="size-full object-cover" />
                  ) : (
                    <div className="size-full bg-gradient-gold text-gold-foreground flex flex-col items-center justify-center font-bold text-lg select-none">
                      {name
                        ? name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()
                        : "IMG"}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
                  <span className="text-xs font-medium text-foreground">
                    Upload your high-res logo
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Supports PNG, JPG, or SVG. Maximum file size 2MB.
                  </span>

                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleLogoClick}
                      className="h-8 rounded-lg text-xs font-semibold px-3 flex items-center gap-1 border-border bg-background"
                    >
                      <Upload className="size-3" /> Upload Logo
                    </Button>
                    {logo && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleRemoveLogo}
                        className="h-8 rounded-lg text-xs font-semibold px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="size-3" /> Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Contact Information */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                5
              </span>
              Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g. info@jwsgn.org"
                  value={email}
                  onChange={(e) => handleFieldChange("email", e.target.value, setEmail)}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                  className={`h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all ${
                    errors.email ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-destructive text-xs mt-1 pl-0.5">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="phone"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g. +91 99585 74400"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section: Location */}
          <div className="glass rounded-2xl p-6 border border-border/80 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground pb-2 border-b border-border/40 flex items-center gap-2">
              <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">
                6
              </span>
              Location Details
            </h2>

            {/* Address Line */}
            <div className="space-y-1.5">
              <Label
                htmlFor="address"
                className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
              >
                Address
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="e.g. 55B, Knowledge Park 5"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all"
              />
            </div>

            {/* City, State, Pincode */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* City */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="city"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
                >
                  City
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="e.g. Greater Noida"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all"
                />
              </div>

              {/* State */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="state"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
                >
                  State
                </Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="e.g. Uttar Pradesh"
                  value={stateVal}
                  onChange={(e) => setStateVal(e.target.value)}
                  className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all"
                />
              </div>

              {/* Pincode */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="pincode"
                  className="text-xs font-semibold text-foreground/80 uppercase tracking-wider pl-0.5"
                >
                  Pincode
                </Label>
                <Input
                  id="pincode"
                  type="text"
                  placeholder="e.g. 201310"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="h-11 rounded-xl bg-background/50 border-border hover:border-gold/40 focus-visible:border-gold/60 focus-visible:ring-1 focus-visible:ring-gold transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-background/80 backdrop-blur-md border-t py-4 shadow-elegant">
        <div className="container-tight flex items-center justify-end gap-3 px-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="rounded-xl border-border font-semibold px-6 hover:bg-accent text-sm h-11"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded-xl bg-primary text-primary-foreground font-semibold px-8 hover:bg-primary/95 text-sm h-11 shadow-sm"
          >
            {submitButtonText}
          </Button>
        </div>
      </div>
    </form>
  );
};
