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
   * TODO: Implement actual backend POST call to '/api/admin/login'.
   * @param email The admin email address
   * @param password The admin password
   */
  async login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock validation
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check email
    if (normalizedEmail !== "admin@janhit.org") {
      throw new Error("Email not registered");
    }

    // Check password
    if (password !== "admin123") {
      throw new Error("Invalid password");
    }

    // Mock successful response
    return {
      token: "mock-jwt-token-janhit-admin-xyz",
      user: {
        id: "admin-1",
        name: "Janhit Admin",
        email: "admin@janhit.org",
        phone: "+91 9876543210",
        role: "Super Admin",
        avatarUrl: "", // Empty for default avatar
      },
    };
  },

  /**
   * Requests a password reset link for the provided email address.
   *
   * TODO: Implement actual backend POST call to '/api/admin/forgot-password'.
   * @param email The registered admin email address
   */
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!email) {
      throw new Error("Email is required.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Mock check (assume the email is valid for demonstration)
    if (normalizedEmail !== "admin@janhit.org") {
      throw new Error("Email not registered");
    }

    return {
      success: true,
      message: "Forgot password link shared to your registered email.",
    };
  },
};
