import { Link } from "react-router-dom";
import { getWhatsAppLink } from "@/utils/whatsapp";
import { IndianRupee } from "lucide-react";
import { Property } from "@/data/types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

function showRupeeIcon(priceText?: string | null): boolean {
  const safe = (priceText ?? "").trim();
  if (!safe) return false;
  const t = safe.toLowerCase();
  if (t.includes("₹") || t.includes("cr") || t.includes("lac")) return true;
  if (/\d/.test(safe) && (t.includes("from ") || t.startsWith("from"))) return true;
  return false;
}

function getValidImage(img?: string | null): string {
  const fallback = "/images/property-placeholder.svg";
  if (!img || img.trim() === "") return fallback;
  // Avoid legacy grey placeholder to prevent patchy/blank cards.
  if (img.trim() === "/placeholder.svg") return fallback;
  return img.trim();
}

let manifestCache: Record<string, string> | null = null;
let manifestVersionCache: number | null = null;
let manifestPromise: Promise<Record<string, string>> | null = null;

function getManifest(): Promise<Record<string, string>> {
  // In dev, avoid module-level caching so asset updates reflect immediately.
  if (import.meta.env.DEV) {
    return fetch("/properties/manifest.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}))
      .then((data) => {
        const d = (data ?? {}) as { __v?: number; images?: Record<string, string> } | Record<string, string>;
        if ("images" in d && d.images) {
          manifestVersionCache = typeof d.__v === "number" ? d.__v : Date.now();
          manifestCache = d.images;
        } else {
          manifestVersionCache = Date.now();
          manifestCache = d as Record<string, string>;
        }
        return manifestCache ?? {};
      });
  }
  if (manifestCache) return Promise.resolve(manifestCache);
  if (manifestPromise) return manifestPromise;
  manifestPromise = fetch("/properties/manifest.json", { cache: "no-cache" })
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => ({}))
    .then((data) => {
      const d = (data ?? {}) as { __v?: number; images?: Record<string, string> } | Record<string, string>;
      if ("images" in d && d.images) {
        manifestVersionCache = typeof d.__v === "number" ? d.__v : Date.now();
        manifestCache = d.images;
      } else {
        manifestVersionCache = Date.now();
        manifestCache = d as Record<string, string>;
      }
      return manifestCache;
    });
  return manifestPromise;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  const preferredImage = useMemo(() => {
    return getValidImage(`/properties/${property.slug}.jpg`);
  }, [property.slug, property.image]);

  const [imgSrc, setImgSrc] = useState(preferredImage);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    setImgSrc(preferredImage);
    setIsLoading(true);
    setFailed(false);
    setResolved(false);
  }, [preferredImage]);

  useEffect(() => {
    // Resolve to the exact downloaded extension once (prevents patchy failures).
    getManifest().then((m) => {
      const ext = m[property.slug];
      const v = manifestVersionCache ?? Date.now();
      if (ext) {
        setImgSrc(`/properties/${property.slug}.${ext}?v=${v}`);
      } else {
        // Final fallback attempt: use local paths from data if present.
        const localFromImage = (property.image ?? "").trim().startsWith("/") ? (property.image ?? "").trim() : "";
        const localFromGallery =
          (property.gallery?.[0] ?? "").trim().startsWith("/") ? (property.gallery?.[0] ?? "").trim() : "";
        const fallbackSrc = localFromImage || localFromGallery || `/properties/${property.slug}.jpg`;
        setImgSrc(fallbackSrc ? `${fallbackSrc}?v=${v}` : fallbackSrc);
      }
      setResolved(true);
    });
  }, [property.slug, property.image, property.gallery]);

  const title = property.cardTitle ?? property.title;
  const developerLine = (property.developer ?? property.builder ?? "").trim();
  const statusLine = (property.status ?? "").trim();
  const locationLine = (property.microLocation ?? property.city ?? "").trim();
  const optionalTag = (property.cardBadge ?? property.hallmarkTitle ?? "").trim();

  const configurationLine = (() => {
    if (property.configurations?.length) {
      return property.configurations.join(" & ");
    }
    return (property.configuration ?? "").trim();
  })();

  const priceLine = property.cardPrice ?? property.price ?? property.priceRange ?? property.startingPrice ?? "";
  const typeLine = property.propertyType ?? property.projectType ?? "";

  const brochureSubject = encodeURIComponent(`Brochure request — ${property.title}`);
  const brochureBody = encodeURIComponent(
    `Hi,\n\nPlease share the brochure for "${property.title}" (${property.slug}).\n\nThanks`
  );
  const brochureHref = `mailto:sunitaestate@gmail.com?subject=${brochureSubject}&body=${brochureBody}`;

  const summaryLine = (() => {
    const parts: string[] = [];
    if (configurationLine) parts.push(`${configurationLine} in ${locationLine || property.city || "Navi Mumbai"}.`);
    const carpet = (property.carpetAreaRange ?? property.carpetArea ?? "").trim();
    if (carpet) parts.push(`Carpet ${carpet}.`);
    const possession = (property.possessionDate ?? "").trim();
    if (possession) parts.push(`Possession ${possession}.`);
    const joined = parts.join(" ").replace(/\s+/g, " ").trim();
    return joined || (property.description ?? property.overview ?? "").replace(/\s+/g, " ").trim();
  })();

  const reraLine = (() => {
    const r = (property.reraNumber ?? "").trim();
    if (!r) return "";
    if (/maha\s*rera/i.test(r) || /^rera\b/i.test(r)) return r;
    return `MahaRERA: ${r}`;
  })();

  const pricePill = (() => {
    const p = (priceLine ?? "").trim();
    if (!p) return "";
    if (/^from\b/i.test(p)) return p;
    if (/request/i.test(p.toLowerCase())) return p;
    return `From ${p}`;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border/40"
    >
      <div className="relative overflow-hidden h-[240px] sm:h-[280px] lg:h-[300px] bg-[#f5f5f5]">
        {/* Hard fallback UI (no overlay) */}
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
            <span className="text-neutral-600 font-medium">Image Coming Soon</span>
          </div>
        ) : (
          <>
            {/* Skeleton shimmer (prevents layout shift) */}
            {(isLoading || !resolved) && (
              <div className="absolute inset-0">
                <div className="absolute inset-0 animate-pulse bg-black/5" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent animate-[shimmer_1.2s_infinite] [background-size:200%_100%]" />
              </div>
            )}
            <img
              src={imgSrc}
              alt={`${property.title} in ${property.location}`}
              loading="lazy"
              className={`relative z-[1] block w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                isLoading || !resolved ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setIsLoading(false)}
              onError={(e) => {
                const fallback = "/images/property-placeholder.svg";
                if (imgSrc !== fallback) {
                  setImgSrc(fallback);
                  setIsLoading(true);
                  return;
                }
                setIsLoading(false);
                setFailed(true);
              }}
            />
            {/* Overlay only when we are actually rendering an image */}
            <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </>
        )}
        <div className="absolute top-3 left-3 right-3 z-[3] flex flex-wrap items-center gap-2">
          {statusLine ? (
            <span className="inline-flex items-center bg-background/95 text-foreground text-[11px] sm:text-xs font-semibold leading-snug px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
              {statusLine}
            </span>
          ) : null}
          {locationLine ? (
            <span className="inline-flex items-center bg-background/95 text-foreground text-[11px] sm:text-xs font-semibold leading-snug px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
              {locationLine}
            </span>
          ) : null}
          {optionalTag ? (
            <span className="inline-flex items-center bg-gold/90 text-dark text-[11px] sm:text-xs font-semibold leading-snug px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
              {optionalTag}
            </span>
          ) : null}
        </div>
      </div>
      <div className="p-6 sm:p-7 bg-card space-y-5">
        <div className="space-y-2">
          {developerLine ? <p className="text-xs text-muted-foreground">{developerLine}</p> : null}
          <h3 className="font-display text-xl sm:text-2xl font-bold text-card-foreground leading-tight line-clamp-2">{title}</h3>
          {typeLine ? (
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground/90">{typeLine}</p>
          ) : null}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{summaryLine}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {configurationLine ? (
            <span className="inline-flex items-center rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-semibold text-secondary-foreground">
              {configurationLine}
            </span>
          ) : null}
          {pricePill ? (
            <span
              className={`inline-flex items-center gap-1 rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-semibold text-secondary-foreground ${
                showRupeeIcon(pricePill) ? "text-gold" : ""
              }`}
            >
              {showRupeeIcon(pricePill) ? <IndianRupee className="w-3.5 h-3.5" /> : null}
              {pricePill}
            </span>
          ) : null}
          {reraLine ? (
            <span className="inline-flex items-center rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-semibold text-secondary-foreground">
              {reraLine}
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link to={`/projects/${property.slug}`} className="w-full">
            <Button variant="outline" className="w-full border-gold/40 hover:bg-secondary">
              View details
            </Button>
          </Link>
          <Button
            variant="gold"
            className="w-full"
            onClick={() => {
              const message = `Hi, I'm interested in ${property.title}. Please share details.`;
              window.open(getWhatsAppLink(message), "_blank");
            }}
          >
            Request Brochure
          </Button>
        </div>
        {property.projectWebsite ? (
          <a
            href={property.projectWebsite as string}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button variant="outline" className="w-full border-gold/40 hover:bg-secondary">
              Official Project Website
            </Button>
          </a>
        ) : null}
      </div>
    </motion.div>
  );
};

export default PropertyCard;
