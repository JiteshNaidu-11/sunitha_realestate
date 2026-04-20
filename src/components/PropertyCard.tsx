import { Link } from "react-router-dom";
import { MapPin, IndianRupee } from "lucide-react";
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
  const [cacheBust, setCacheBust] = useState<number>(0);

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
      setCacheBust(v);
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

  useEffect(() => {
    // Debug root cause in dev only.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log("IMAGE:", property.slug, property.image);
      // eslint-disable-next-line no-console
      console.log("IMAGE PATH:", `/properties/${property.slug}.jpg`);
    }
  }, [property.slug, property.image]);

  const title = property.cardTitle ?? property.title;
  const tagline = property.cardTagline ?? property.location;
  const badge = property.cardBadge ?? property.configuration ?? property.configurations?.[0] ?? property.status ?? "";
  const priceLine = property.cardPrice ?? property.price ?? property.priceRange ?? property.startingPrice ?? "";
  const typeLine = property.propertyType ?? property.projectType ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border/40"
    >
      <div className="relative overflow-hidden h-[190px] sm:h-[220px] lg:h-[240px] bg-[#f5f5f5]">
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
            <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
          </>
        )}
        <div className="absolute top-3 left-3 right-3 sm:right-auto max-w-[calc(100%-1.5rem)] sm:max-w-[90%]">
          <span className="inline-block bg-background/95 text-foreground text-[11px] sm:text-xs font-semibold leading-snug px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm line-clamp-2">
            {badge}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 pt-12">
          <h3 className="font-display text-lg sm:text-xl font-bold text-white drop-shadow-sm leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-white/85 text-sm mt-1 line-clamp-2">{tagline}</p>
        </div>
      </div>
      <div className="p-5 bg-card">
        <h3 className="font-display text-lg sm:text-xl font-bold text-card-foreground leading-tight mb-2 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-start gap-2 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{property.location}</span>
        </div>
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground/90 mb-3">
          {typeLine}
        </p>
        <div
          className={`flex items-start gap-1.5 font-semibold text-base mb-4 ${showRupeeIcon(priceLine) ? "text-gold" : "text-foreground"}`}
        >
          {showRupeeIcon(priceLine) ? <IndianRupee className="w-4 h-4 shrink-0 mt-1" /> : null}
          <span className="leading-snug">{priceLine}</span>
        </div>
        <Link to={`/projects/${property.slug}`}>
          <Button variant="gold" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
