import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, AdminUser } from "../services/authService";

interface AuthContextType {
  token: string | null;
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: Partial<AdminUser>) => void;
  fetchProfile: () => Promise<AdminUser>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem("janhit_admin_token");
      const savedUser = localStorage.getItem("janhit_admin_user");

      if (savedToken) {
        setToken(savedToken);
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {
            console.error("Failed to parse saved user details from localStorage", e);
          }
        }

        // Background fetch to verify token & get freshest data
        try {
          const profile = await authService.getProfile();
          setUser(profile);
          localStorage.setItem("janhit_admin_user", JSON.stringify(profile));
        } catch (e: any) {
          console.error("Failed to fetch profile on init", e);
          // If token expired (usually 401/Unauthorized), clear session
          if (
            e.message &&
            (e.message.includes("401") ||
              e.message.toLowerCase().includes("unauthorized") ||
              e.message.toLowerCase().includes("token"))
          ) {
            setToken(null);
            setUser(null);
            localStorage.removeItem("janhit_admin_token");
            localStorage.removeItem("janhit_admin_user");
            localStorage.removeItem("janhit_admin_refresh_token");
          }
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem("janhit_admin_token", response.token);
      localStorage.setItem("janhit_admin_user", JSON.stringify(response.user));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("API logout failed:", error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem("janhit_admin_token");
      localStorage.removeItem("janhit_admin_user");
      localStorage.removeItem("janhit_admin_refresh_token");
    }
  };

  const fetchProfile = async (): Promise<AdminUser> => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
      localStorage.setItem("janhit_admin_user", JSON.stringify(profile));
      return profile;
    } catch (error) {
      console.error("Failed to fetch profile in AuthProvider:", error);
      throw error;
    }
  };

  const updateUser = (updatedUser: Partial<AdminUser>) => {
    const baseUser = user || { id: "", name: "", email: "", phone: "", role: "", avatarUrl: "" };
    const newUser = { ...baseUser, ...updatedUser };
    setUser(newUser);
    localStorage.setItem("janhit_admin_user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        updateUser,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
