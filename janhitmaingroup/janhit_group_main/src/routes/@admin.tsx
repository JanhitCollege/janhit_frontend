import React, { useState } from "react";
import { createFileRoute, Outlet, useLocation, Link, useNavigate } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "@/admin/context/AuthContext";
import {
  GraduationCap,
  User,
  LogOut,
  ChevronDown,
  Building,
  LayoutDashboard,
  Menu,
  X,
  Newspaper,
  FileText,
  Layers,
  FileDown,
  Image,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/@admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AuthProvider>
      <AdminLayoutContent />
    </AuthProvider>
  );
}

function AdminLayoutContent() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    setIsMobileOpen(false);
    await logout();
    navigate({ to: "/@admin" });
  };

  const adminName = user?.name || "Admin";
  const initials = adminName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Check if we are on Login or Forgot Password pages
  const isAuthPage =
    location.pathname === "/@admin" ||
    location.pathname === "/@admin/" ||
    location.pathname === "/@admin/forgot-password" ||
    location.pathname === "/@admin/forgot-password/";

  // Render normal route outlet for login/forgot-password
  if (isAuthPage || !isAuthenticated) {
    return <Outlet />;
  }

  // Sidebar Menu Items
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      to: "/@admin/dashboard" as const,
      active: location.pathname.startsWith("/@admin/dashboard"),
    },
    {
      label: "Campus Management",
      icon: Building,
      to: "/@admin/campuses" as const,
      active: location.pathname.startsWith("/@admin/campuses"),
    },
    {
      label: "Faculty Management",
      icon: GraduationCap,
      to: "/@admin/faculties" as const,
      active: location.pathname.startsWith("/@admin/faculties"),
    },
    {
      label: "Committee Management",
      icon: Layers,
      to: "/@admin/committees" as const,
      active: location.pathname.startsWith("/@admin/committees"),
    },
    {
      label: "Admission Leads",
      icon: FileText,
      to: "/@admin/admission-leads" as const,
      active: location.pathname.startsWith("/@admin/admission-leads"),
    },
    {
      label: "News & Notices",
      icon: Newspaper,
      to: "/@admin/news" as const,
      active: location.pathname.startsWith("/@admin/news"),
    },
    {
      label: "Download Management",
      icon: FileDown,
      to: "/@admin/downloads" as const,
      active: location.pathname.startsWith("/@admin/downloads"),
    },
    {
      label: "Gallery Management",
      icon: Image,
      to: "/@admin/gallery" as const,
      active: location.pathname.startsWith("/@admin/gallery"),
    },
    {
      label: "Event Management",
      icon: Calendar,
      to: "/@admin/events" as const,
      active: location.pathname.startsWith("/@admin/events"),
    },
    {
      label: "My Profile",
      icon: User,
      to: "/@admin/profile" as const,
      active: location.pathname.startsWith("/@admin/profile"),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Top Fixed Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-b shadow-sm py-3">
        <div className="flex items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-1.5 rounded-lg hover:bg-accent text-muted-foreground mr-1 transition-colors"
              aria-label="Open Sidebar"
            >
              <Menu className="size-5" />
            </button>

            {/* Left: Brand Logo */}
            <Link to="/@admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="size-10 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
                <GraduationCap className="size-5 text-gold-foreground" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-lg font-bold text-foreground">Janhit</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Group of Institutions
                </div>
              </div>
            </Link>
          </div>

          {/* Right: User Dropdown */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-accent border border-transparent hover:border-border transition-all focus:outline-none">
                <Avatar className="size-8 rounded-lg shadow-sm border border-border">
                  <AvatarImage src={user?.avatarUrl} alt={adminName} />
                  <AvatarFallback className="bg-gradient-gold text-gold-foreground text-xs font-bold font-sans">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-xs font-semibold text-foreground">{adminName}</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">
                    {user?.role || "Administrator"}
                  </span>
                </div>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 rounded-xl p-1.5 shadow-elegant border border-border/80 mt-1"
              >
                <DropdownMenuLabel className="px-2 py-1 text-xs text-muted-foreground uppercase tracking-wider">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/@admin/profile"
                    className="flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer text-sm hover:bg-accent transition"
                  >
                    <User className="size-4 text-muted-foreground" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer text-sm text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive transition"
                >
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 pt-[65px]">
        {/* Desktop Sidebar (Left panel, fixed, hidden on mobile) */}
        <aside className="fixed top-[65px] left-0 bottom-0 w-64 bg-card border-r hidden md:flex flex-col justify-between p-4 z-30">
          <nav className="space-y-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-3 block mb-4 mt-2">
              Navigation Menu
            </span>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  item.active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout button at bottom of sidebar */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-200 text-left w-full cursor-pointer"
          >
            <LogOut className="size-4" />
            <span>Logout</span>
          </button>
        </aside>

        {/* Mobile slide-out Drawer Sidebar */}
        {isMobileOpen && (
          <>
            {/* Backdrop overlay */}
            <div
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden animate-in fade-in duration-200"
            />
            {/* Sidebar drawer content */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-card border-r z-50 p-4 flex flex-col justify-between shadow-elegant animate-in slide-in-from-left duration-250 md:hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-gradient-gold grid place-items-center">
                      <GraduationCap className="size-4 text-gold-foreground" />
                    </div>
                    <span className="font-display font-bold text-foreground text-sm">
                      Janhit Admin
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1 rounded-lg hover:bg-accent text-muted-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <nav className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-2 block mb-3">
                    Navigation Menu
                  </span>
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        item.active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-200 text-left w-full cursor-pointer"
              >
                <LogOut className="size-4" />
                <span>Logout</span>
              </button>
            </aside>
          </>
        )}

        {/* Content Container (pl-64 on desktop, none on mobile) */}
        <div className="flex-1 md:pl-64 flex flex-col min-h-[calc(100vh-65px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
