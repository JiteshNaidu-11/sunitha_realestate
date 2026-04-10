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
  image: string;
<<<<<<< HEAD
=======
  /** Optional: card heading (detail page still uses `title`). */
  cardTitle?: string;
  /** Optional: line under title on the card image overlay (defaults to `location`). */
  cardTagline?: string;
  /** Optional: top pill on cards (defaults to `configuration`). */
  cardBadge?: string;
  /** Optional: price line on cards only (defaults to `price`). */
  cardPrice?: string;
  /** Detail-page hero (first item) + gallery grid. Add new shots here without changing `image` if the card should stay the same. */
>>>>>>> c378f3d (feat: projects, FormSubmit contact, legal pages, property cards, social links)
  gallery: string[];
  overview: string;
  highlights: string[];
  locationAdvantages: string[];
  investmentPotential: string;
  amenities: string[];
  mapLink: string;
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
