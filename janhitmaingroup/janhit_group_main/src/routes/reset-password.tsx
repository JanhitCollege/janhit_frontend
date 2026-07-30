import { createFileRoute } from "@tanstack/react-router";
import { ResetPasswordPage } from "@/admin/pages/ResetPassword";

type ResetPasswordSearch = {
  token?: string;
};

export const Route = createFileRoute("/reset-password")({
  validateSearch: (search: Record<string, unknown>): ResetPasswordSearch => {
    return {
      token: (search.token as string) || undefined,
    };
  },
  component: ResetPasswordRouteComponent,
  head: () => ({
    meta: [{ title: "Reset Password — Janhit Group of Institutions" }],
  }),
});

function ResetPasswordRouteComponent() {
  const { token } = Route.useSearch();
  return <ResetPasswordPage token={token || ""} />;
}
