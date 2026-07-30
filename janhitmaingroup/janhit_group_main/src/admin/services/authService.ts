import { apiRequest } from "../../services/api";

/**
 * AuthService provides authentication services for the Admin panel.
 *
 * TODO: Integrate with backend API endpoints (e.g., /api/admin/login, /api/admin/forgot-password).
 */

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl?: string;
}

export const authService = {
  /**
   * Performs authentication using email and password.
   *
   * @param email The admin email address
   * @param password The admin password
   */
  async login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        user: {
          id: string;
          name: string;
          email: string;
          mobile: string;
          role: string;
          isActive: boolean;
          createdAt: string;
          updatedAt: string;
        };
        accessToken: string;
        refreshToken: string;
      };
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!response.success) {
      throw new Error(response.message || "Login failed");
    }

    // Save refresh token
    if (response.data.refreshToken) {
      localStorage.setItem("janhit_admin_refresh_token", response.data.refreshToken);
    }

    return {
      token: response.data.accessToken,
      user: {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.mobile || "",
        role: response.data.user.role,
        avatarUrl: "", // Empty for default avatar
      },
    };
  },

  /**
   * Requests a password reset link for the provided email address.
   *
   * @param email The registered admin email address
   */
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    if (!email) {
      throw new Error("Email is required.");
    }

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to request password reset");
    }

    return {
      success: response.success,
      message: response.message,
    };
  },

  /**
   * Resets the user's password using the token sent in the email.
   *
   * @param token The reset token
   * @param password The new password
   */
  async resetPassword(token: string, password: string): Promise<{ success: boolean; message: string }> {
    if (!token || !password) {
      throw new Error("Token and password are required.");
    }

    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });

    if (!response.success) {
      throw new Error(response.message || "Password reset failed");
    }

    return {
      success: response.success,
      message: response.message,
    };
  },

  /**
   * Retrieves the current user's profile details.
   */
  async getProfile(): Promise<AdminUser> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: {
        user: {
          id: string;
          name: string;
          email: string;
          mobile: string;
          role: string;
          isActive: boolean;
          createdAt: string;
          updatedAt: string;
        };
      };
    }>("/auth/profile", {
      method: "GET",
    });

    if (!response.success) {
      throw new Error(response.message || "Failed to retrieve profile");
    }

    return {
      id: response.data.user.id,
      name: response.data.user.name,
      email: response.data.user.email,
      phone: response.data.user.mobile || "",
      role: response.data.user.role,
      avatarUrl: "",
    };
  },

  /**
   * Terminates the current admin session.
   */
  async logout(): Promise<void> {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>("/auth/logout", {
      method: "POST",
    });

    if (!response.success) {
      throw new Error(response.message || "Logout failed");
    }
  },
};
