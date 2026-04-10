import { Link } from "react-router-dom";
import { MapPin, IndianRupee } from "lucide-react";
import { Property } from "@/data/types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

function showRupeeIcon(priceText: string): boolean {
  const t = priceText.toLowerCase();
  if (t.includes("₹") || t.includes("cr") || t.includes("lac")) return true;
  if (/\d/.test(priceText) && (t.includes("from ") || t.startsWith("from"))) return true;
  return false;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  const cardImage = property.image?.trim() ? property.image : property.gallery?.[0] ?? "";
  const title = property.cardTitle ?? property.title;
  const tagline = property.cardTagline ?? property.location;
  const badge = property.cardBadge ?? property.configuration;
  const priceLine = property.cardPrice ?? property.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border/40"
    >
      <div className="relative overflow-hidden min-h-[220px] h-56 sm:h-64">
        <img
          src={cardImage}
          alt={`${property.title} in ${property.location}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
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
        <div className="flex items-start gap-2 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{property.location}</span>
        </div>
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground/90 mb-3">
          {property.propertyType}
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
