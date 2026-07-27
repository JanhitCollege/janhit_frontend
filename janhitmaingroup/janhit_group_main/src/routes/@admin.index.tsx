import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/admin/pages/Login";

export const Route = createFileRoute("/@admin/")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Admin Login — Janhit Group of Institutions" },
      {
        name: "description",
        content: "Access the Janhit Group of Institutions administration panel.",
      },
    ],
  }),
});
