import rawPackages from "./packages.json";

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
  included: string[];
  itinerary: { day: string; title: string; description: string }[];
  gallery: string[];
}

const basePackages: TravelPackage[] = rawPackages as TravelPackage[];

export const packages: TravelPackage[] = [
  ...basePackages,
  ...basePackages.map(pkg => ({
    ...pkg,
    id: `${pkg.id}-2`
  }))
];
