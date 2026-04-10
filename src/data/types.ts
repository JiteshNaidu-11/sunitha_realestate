export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  price: string;
  startingPrice: string;
  configuration: string;
  builder: string;
  propertyType: string;
  carpetArea: string;
  totalFloors: number;
  unitsAvailable: number;
  possessionDate: string;
  /** Thumbnail on project cards / grids. Keep stable when you only add photos to the detail page. */
  image: string;
  /** Optional: card heading (detail page still uses `title`). */
  cardTitle?: string;
  /** Optional: line under title on the card image overlay (defaults to `location`). */
  cardTagline?: string;
  /** Optional: top pill on cards (defaults to `configuration`). */
  cardBadge?: string;
  /** Optional: price line on cards only (defaults to `price`). */
  cardPrice?: string;
  /** Detail-page hero (first item) + gallery grid. Add new shots here without changing `image` if the card should stay the same. */
  gallery: string[];
  /** Hero artwork already includes project name/logo; omit large title overlay to avoid double branding. */
  heroBranded?: boolean;
  /** Optional transparent brand mark layered over hero image (for branded hero artwork). */
  heroOverlayImage?: string;
  hallmarkIcons?: { src: string; label: string }[];
  /** Optional heading above the hallmark marquee (e.g. old-site tagline) */
  hallmarkTitle?: string;
  overview: string;
  /** Short meta description for SEO (recommended ≤160 chars). Falls back to overview. */
  metaDescription?: string;
  highlights: string[];
  locationAdvantages: string[];
  investmentPotential: string;
  amenities: string[];
  amenityImages?: string[];
  mapLink: string;
  /** Google Maps iframe embed URL (e.g. .../maps?q=lat,lng&output=embed) */
  mapEmbedUrl?: string;
  /** Optional banner above footer area */
  ctaTitle?: string;
  ctaDescription?: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}
