import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { properties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, IndianRupee, Building, Layers, Home, CheckCircle, ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { buildAbsoluteUrl, useSeo } from "@/lib/seo";
import { toast } from "sonner";
import PropertyUnitConfigurationSection from "@/components/PropertyUnitConfigurationSection";

let propertyManifestCache: Record<string, string> | null = null;
let propertyManifestVersionCache: number | null = null;
let propertyManifestPromise: Promise<Record<string, string>> | null = null;

function getPropertyManifest(): Promise<Record<string, string>> {
  if (propertyManifestCache) return Promise.resolve(propertyManifestCache);
  if (propertyManifestPromise) return propertyManifestPromise;
  propertyManifestPromise = fetch("/properties/manifest.json", { cache: "no-cache" })
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => ({}))
    .then((data) => {
      const d = (data ?? {}) as { __v?: number; images?: Record<string, string> } | Record<string, string>;
      if ("images" in d && d.images) {
        propertyManifestVersionCache = typeof d.__v === "number" ? d.__v : Date.now();
        propertyManifestCache = d.images;
      } else {
        propertyManifestVersionCache = Date.now();
        propertyManifestCache = d as Record<string, string>;
      }
      return propertyManifestCache!;
    });
  return propertyManifestPromise;
}

function getPropertyFallbackImage() {
  return "/images/property-placeholder.svg";
}

const PropertyDetail = () => {
  const { slug } = useParams();
  const property = properties.find((p) => p.slug === slug);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [heroSrc, setHeroSrc] = useState<string>("");
  const [cacheBust, setCacheBust] = useState<number>(0);

  useEffect(() => {
    if (!property) return;
    getPropertyManifest().then((m) => {
      const ext = m[property.slug];
      const v = propertyManifestVersionCache ?? Date.now();
      setCacheBust(v);
      if (ext) {
        setHeroSrc(`/properties/${property.slug}.${ext}?v=${v}`);
      } else {
        const localFromImage = (property.image ?? "").trim().startsWith("/") ? (property.image ?? "").trim() : "";
        const localFromGallery =
          (property.gallery?.[0] ?? "").trim().startsWith("/") ? (property.gallery?.[0] ?? "").trim() : "";
        const fallbackSrc = localFromImage || localFromGallery || `/properties/${property.slug}.jpg`;
        setHeroSrc(`${fallbackSrc}?v=${v}`);
      }
    });
  }, [property]);

  const seoImage = useMemo(() => {
    if (!property) return "";
    const ext = propertyManifestCache?.[property.slug];
    return ext ? `/properties/${property.slug}.${ext}` : `/properties/${property.slug}.jpg`;
  }, [property, cacheBust]);

  const seoDescription =
    property?.metaDescription?.trim() ||
    (property?.overview ? property.overview.replace(/\s+/g, " ").trim().slice(0, 160) : "");

  const safeLower = (v?: string | null) => (v ?? "").toLowerCase();
  const derivedBuilder = (property?.builder ?? property?.developer ?? "").trim();
  const derivedConfig = (property?.configuration ?? property?.configurations?.join(", ") ?? "").trim();
  const derivedType = (property?.propertyType ?? property?.projectType ?? "").trim();
  const derivedPrice = (property?.price ?? property?.priceRange ?? property?.startingPrice ?? "").trim();
  const derivedCarpet = (property?.carpetArea ?? property?.carpetAreaRange ?? "").trim();

  const propertyKeywords = property
    ? Array.from(
        new Set(
          [
            safeLower(property.title),
            `${safeLower(property.title)} ${safeLower(property.city)}`,
            `${safeLower(property.title)} ${safeLower(property.location)}`,
            `${safeLower(derivedBuilder)} projects in ${safeLower(property.city)}`,
            `${safeLower(derivedConfig)} in ${safeLower(property.location)}`,
            `${safeLower(derivedType)} property in ${safeLower(property.city)}`,
            `buy property in ${safeLower(property.city)}`,
            `${safeLower(property.location)} real estate`,
            `real estate ${safeLower(property.city)}`,
            `navi mumbai real estate`,
            `${safeLower(derivedType)} navi mumbai`,
            property.slug.replace(/-/g, " "),
          ].filter(Boolean)
        )
      )
    : [];

  useSeo(
    property
      ? {
          title: `${property.title} in ${property.location} - Project Details`,
          description: seoDescription || property.overview,
          path: `/projects/${property.slug}`,
          keywords: propertyKeywords,
          type: "article",
          image: seoImage,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            name: property.title,
            url: buildAbsoluteUrl(`/projects/${property.slug}`),
            image: [seoImage].filter(Boolean),
            description: seoDescription || property.overview,
            address: {
              "@type": "PostalAddress",
              addressLocality: property.location,
              addressRegion: "Maharashtra",
              addressCountry: "IN",
            },
          },
        }
      : {
          title: "Property Not Found",
          description: "The requested project page could not be found.",
          path: `/projects/${slug || ""}`,
          noIndex: true,
        }
  );

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const ph = phone.trim();
    if (!n || !em || !ph) {
      toast.error("Please enter your name, email, and phone number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you — we'll contact you shortly. You can also call +91 77383 84100.");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  if (!property) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Property Not Found</h1>
          <Button
            variant="gold"
            className="mt-4"
            onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/projects"))}
          >
            Back to Projects
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative pt-24 pb-0">
        <div className="h-[50vh] relative">
          <img
            src={heroSrc || seoImage || property.image}
            alt={`${property.title} in ${property.location}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const fallback = getPropertyFallbackImage();
              const tried = new Set<string>([
                (heroSrc || "").split("?")[0],
                (seoImage || "").split("?")[0],
                (property.image || "").split("?")[0],
                fallback,
              ].filter(Boolean));

              const candidates = [
                (seoImage || "").trim(),
                (property.image || "").trim(),
                (property.gallery?.[0] || "").trim(),
                fallback,
              ]
                .filter(Boolean)
                .map((s) => (s.startsWith("/") ? `${s}?v=${cacheBust}` : s));

              const next = candidates.find((c) => !tried.has(c.split("?")[0])) || fallback;
              if (e.currentTarget.src === next) return;
              e.currentTarget.src = next;
            }}
          />
          <div className="absolute inset-0 bg-dark/25" />
          <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <button
                type="button"
                onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/projects"))}
                className="text-primary-foreground/80 text-sm flex items-center gap-2 mb-4 hover:text-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Projects
              </button>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">{property.title}</h1>
              <div className="flex items-center gap-2 text-primary-foreground/80 mt-2">
                <MapPin className="w-4 h-4" /> {property.location}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card p-6 rounded-lg shadow-md grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: IndianRupee, label: "Price", value: derivedPrice || "Price on Request" },
                  { icon: Home, label: "Configuration", value: derivedConfig || "—" },
                  { icon: Layers, label: "Carpet Area", value: derivedCarpet || "—" },
                  { icon: Building, label: "Floors", value: property.totalFloors ? `${property.totalFloors} Floors` : "—" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <item.icon className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-sm text-card-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-card p-6 rounded-lg shadow-md">
                <h2 className="font-display text-2xl font-bold text-card-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{property.overview ?? property.description ?? ""}</p>
              </div>

              {property.unitConfigurations ? <PropertyUnitConfigurationSection data={property.unitConfigurations} /> : null}

              <div className="bg-card p-6 rounded-lg shadow-md">
                <h2 className="font-display text-2xl font-bold text-card-foreground mb-4">Project Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(property.highlights ?? []).map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="text-card-foreground text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-md">
                <h2 className="font-display text-2xl font-bold text-card-foreground mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(property.amenities ?? []).map((a) => (
                    <div key={a} className="flex items-center gap-2 bg-secondary p-3 rounded-md">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="text-secondary-foreground text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-md">
                <h2 className="font-display text-2xl font-bold text-card-foreground mb-4">Location Advantages</h2>
                <div className="space-y-2">
                  {(property.locationAdvantages ?? []).map((l) => (
                    <div key={l} className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="text-card-foreground text-sm">{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-md">
                <h2 className="font-display text-2xl font-bold text-card-foreground mb-4">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(property.gallery?.length ? property.gallery : Array.from({ length: 6 }, () => heroSrc)).map((img, i) => {
                    const candidate = typeof img === "string" ? img.trim() : "";
                    const isLocal = candidate.startsWith("/");
                    const src = isLocal ? `${candidate}?v=${cacheBust}` : heroSrc || seoImage || getPropertyFallbackImage();
                    return (
                      <img
                        key={i}
                        src={src}
                        alt={`${property.title} ${property.location} image ${i + 1}`}
                        className="rounded-lg w-full h-48 object-cover bg-muted"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = heroSrc || seoImage || getPropertyFallbackImage();
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg shadow-md sticky top-24">
                <h3 className="font-display text-xl font-bold text-card-foreground mb-4">Enquire Now</h3>
                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    placeholder="Full Name"
                    required
                    autoComplete="name"
                    className="w-full bg-secondary text-secondary-foreground rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    autoComplete="email"
                    className="w-full bg-secondary text-secondary-foreground rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="Phone Number"
                    required
                    autoComplete="tel"
                    className="w-full bg-secondary text-secondary-foreground rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    name="message"
                    placeholder="Message (optional)"
                    rows={3}
                    className="w-full bg-secondary text-secondary-foreground rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                  <Button variant="gold" type="submit" className="w-full">
                    Send Enquiry
                  </Button>
                </form>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Builder: {derivedBuilder || "—"}</p>
                  <p className="text-xs text-muted-foreground mb-1">Possession: {property.possessionDate}</p>
                  <p className="text-xs text-muted-foreground">
                    Units Available: {property.unitsAvailable > 0 ? property.unitsAvailable : "Check with our team"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PropertyDetail;
