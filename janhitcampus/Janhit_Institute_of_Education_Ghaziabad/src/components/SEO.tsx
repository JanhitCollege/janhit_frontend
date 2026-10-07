import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  schema?: object;
}

export function SEO({
  title,
  description,
  canonicalUrl = "https://janhitdegreecollege.ac.in",
  ogType = "website",
  ogImage = "https://janhitdegreecollege.ac.in/assets/hero-1.jpg",
  schema,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title);

    // OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", description);

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);

    // JSON-LD Schema
    let scriptSchema = document.getElementById("jsonld-schema");
    if (schema) {
      if (!scriptSchema) {
        scriptSchema = document.createElement("script");
        scriptSchema.id = "jsonld-schema";
        scriptSchema.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = JSON.stringify(schema);
    } else if (scriptSchema) {
      scriptSchema.remove();
    }
  }, [title, description, canonicalUrl, ogType, ogImage, schema]);

  return null;
}
