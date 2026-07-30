import React, { useState, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  GraduationCap,
  User,
  LogOut,
  ChevronDown,
  ArrowLeft,
  Camera,
  Edit2,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ProfilePage: React.FC = () => {
  const { user, logout, updateUser, fetchProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [role, setRole] = useState(user?.role || "Super Admin");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");

  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state with user data from context
  React.useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setRole(user.role || "Super Admin");
      setAvatarUrl(user.avatarUrl || "");
    }
  }, [user]);

  // Fetch profile on mount
  React.useEffect(() => {
    const loadProfile = async () => {
      setIsLoadingProfile(true);
      try {
        await fetchProfile();
      } catch (error) {
        console.error("Failed to load profile in ProfilePage:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/@admin" });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate short network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    updateUser({
      name,
      email,
      phone,
      avatarUrl,
    });

    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setAvatarUrl(user.avatarUrl || "");
    }
    setIsEditing(false);
  };

  const handlePhotoClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoadingProfile && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-12 rounded-full border-4 border-muted border-t-gold animate-spin" />
          <p className="text-sm font-medium text-muted-foreground tracking-wide">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  const adminName = user?.name || "Admin";
  const initials = adminName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="p-4 md:p-6 flex flex-col flex-grow relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/4 left-1/4 size-96 bg-gradient-gold opacity-5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-96 bg-primary opacity-5 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col justify-center max-w-2xl px-4 py-6 mx-auto w-full">
        {/* Navigation Link back */}
        <div className="mb-6">
          <Link
            to="/@admin/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to Dashboard
          </Link>
        </div>

        {/* Profile Details Card */}
        <div className="glass shadow-elegant rounded-2xl p-6 md:p-8 border border-border/80">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Admin Profile
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                View and manage your administration account details.
              </p>
            </div>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 flex items-center gap-2"
              >
                <Edit2 className="size-4" /> Edit Profile
              </Button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Avatar section */}
            <div className="flex flex-col items-center justify-center gap-3 border-b border-border pb-6">
              <div className="relative group">
                <Avatar
                  onClick={handlePhotoClick}
                  className={`size-24 rounded-2xl border-2 border-border shadow-md transition-all ${
                    isEditing ? "cursor-pointer hover:opacity-90" : ""
                  }`}
                >
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback className="bg-gradient-gold text-gold-foreground text-2xl font-bold font-sans">
                    {name
                      ? name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "A"}
                  </AvatarFallback>
                </Avatar>

                {isEditing && (
                  <div
                    onClick={handlePhotoClick}
                    className="absolute inset-0 bg-black/45 rounded-2xl flex items-center justify-center cursor-pointer transition opacity-0 group-hover:opacity-100"
                  >
                    <Camera className="size-6 text-white" />
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              {isEditing ? (
                <button
                  type="button"
                  onClick={handlePhotoClick}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Change Profile Photo
                </button>
              ) : (
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  Administrator Photo
                </span>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground/80 font-semibold">
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-10 rounded-xl bg-background/50 border-border"
                    required
                  />
                ) : (
                  <div className="h-10 px-3.5 flex items-center bg-accent/40 rounded-xl text-foreground font-medium text-sm">
                    {name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80 font-semibold">
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 rounded-xl bg-background/50 border-border"
                    required
                  />
                ) : (
                  <div className="h-10 px-3.5 flex items-center bg-accent/40 rounded-xl text-foreground font-medium text-sm">
                    {email}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground/80 font-semibold">
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 rounded-xl bg-background/50 border-border"
                    required
                  />
                ) : (
                  <div className="h-10 px-3.5 flex items-center bg-accent/40 rounded-xl text-foreground font-medium text-sm">
                    {phone}
                  </div>
                )}
              </div>

              {/* Role (Read-only) */}
              <div className="space-y-2">
                <Label className="text-foreground/80 font-semibold">Role</Label>
                <div className="h-10 px-3.5 flex items-center bg-accent/60 rounded-xl text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                  {role}
                </div>
              </div>
            </div>

            {/* Action Buttons in edit state */}
            {isEditing && (
              <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="rounded-xl border-border px-5"
                  disabled={isSaving}
                >
                  <X className="size-4 mr-1.5" /> Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 shadow-sm px-5"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="size-4 mr-1.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="size-4 mr-1.5" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};
