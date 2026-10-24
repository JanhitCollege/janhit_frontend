import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(url?: string): string {
  if (!url || typeof url !== "string" || !url.trim()) return "";
  const trimmed = url.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }
  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const baseHost = (import.meta.env.VITE_API_BASE_URL || "https://api.janhitgroup.com/api").replace(/\/api\/?$/, "");
  return `${baseHost}${cleanPath}`;
}
