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
