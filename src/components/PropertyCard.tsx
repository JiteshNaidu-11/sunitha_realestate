import { Link } from "react-router-dom";
import { MapPin, IndianRupee } from "lucide-react";
import { Property } from "@/data/types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {property.configuration}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4" />
          {property.location}
        </div>
        <div className="flex items-center gap-1 text-gold font-semibold text-lg mb-4">
          <IndianRupee className="w-4 h-4" />
          {property.price}
        </div>
        <Link to={`/projects/${property.slug}`}>
          <Button variant="gold" className="w-full">View Details</Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
