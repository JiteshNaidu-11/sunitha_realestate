import { useEffect } from "react";

export type SeoOptions = {
  title: string;
  description: string;
  /** App route, e.g. `/contact` or `/projects/foo` */
  path: string;
  keywords?: string[];
  structuredData?: Record<string, unknown>;
  /** Maps to Open Graph type; defaults to `website` unless `article` is passed */
  type?: string;
  image?: string;
  noIndex?: boolean;
};

function getSiteOrigin(): string {
  const fromEnv = typeof import.meta.env.VITE_SITE_URL === "string" ? import.meta.env.VITE_SITE_URL.trim() : "";
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "";
}

/** Absolute URL for the current site + path (for canonical, JSON-LD, OG). */
export function buildAbsoluteUrl(path: string): string {
  const origin = getSiteOrigin();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!origin) {
    return normalized;
  }
  return `${origin}${normalized}`;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

function absoluteImageUrl(image: string): string {
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  const path = image.startsWith("/") ? image : `/${image}`;
  return buildAbsoluteUrl(path);
}

/**
 * Client-side SEO: title, description, canonical, Open Graph, Twitter, optional JSON-LD.
 */
export function useSeo(options: SeoOptions) {
  const {
    title,
    description,
    path,
    keywords,
    structuredData,
    type = "website",
    image,
    noIndex,
  } = options;

  useEffect(() => {
    const absoluteUrl = buildAbsoluteUrl(path);
    const prevTitle = document.title;
    document.title = title;

    upsertMeta("name", "description", description);
    if (keywords?.length) {
      upsertMeta("name", "keywords", keywords.join(", "));
    }
    upsertCanonical(absoluteUrl);

    const ogType = type === "article" ? "article" : "website";
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", absoluteUrl);
    upsertMeta("property", "og:type", ogType);

    if (image) {
      upsertMeta("property", "og:image", absoluteImageUrl(image));
    }

    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    if (image) {
      upsertMeta("name", "twitter:image", absoluteImageUrl(image));
    }

    if (noIndex) {
      upsertMeta("name", "robots", "noindex, nofollow");
    } else {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots?.getAttribute("content")?.includes("noindex")) {
        robots.remove();
      }
    }

    let jsonLd: HTMLScriptElement | null = null;
    if (structuredData) {
      jsonLd = document.createElement("script");
      jsonLd.type = "application/ld+json";
      jsonLd.setAttribute("data-app-seo", "1");
      jsonLd.textContent = JSON.stringify(structuredData);
      document.head.appendChild(jsonLd);
    }

    return () => {
      document.title = prevTitle;
      jsonLd?.remove();
    };
  }, [
    title,
    description,
    path,
    keywords?.join(","),
    structuredData ? JSON.stringify(structuredData) : "",
    type,
    image,
    noIndex,
  ]);
}
