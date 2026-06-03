export interface TravelPackage {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  highlights: string[];
  region: "domestic" | "international";
  categories: string[];
  priority: number;
  bestTimeToVisit: string[];
  showInHero?: boolean;
}

export interface TravelPackageDetail extends Omit<TravelPackage, 'id'> {
  included: (string | { icon: string; text: string })[];
  itinerary: { day: string; title: string; description: string }[];
  gallery: string[];
}

