import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordPage } from "@/admin/pages/ForgotPassword";

export const Route = createFileRoute("/@admin/forgot-password")({
  component: ForgotPasswordPage,
  head: () => ({
    meta: [{ title: "Forgot Password — Janhit Group of Institutions" }],
  }),
});
