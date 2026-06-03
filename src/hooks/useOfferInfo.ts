import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

export interface OfferData {
  id: string;
  isActive: boolean;
  isPrimaryExitOffer?: boolean;
  title: string;
  subtitle?: string;
  description: string;
  promoCode?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  discountPercentage: number;
  applicablePackages: string[];
}

async function fetchOffers(): Promise<OfferData[]> {
  const res = await fetch("/data/offer.json");
  if (!res.ok) throw new Error("Offers configuration not found");
  const json: OfferData[] | OfferData = await res.json();
  const arr = Array.isArray(json) ? json : [json];
  return arr.filter((o) => o && o.isActive === true && o.title && o.description);
}

export const useOfferInfo = () => {
  const { data: offers = [], isLoading: loading } = useQuery<OfferData[]>({
    queryKey: ["offers"],
    queryFn: fetchOffers,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const primaryOffer =
    offers.find((o) => o.isPrimaryExitOffer === true) ?? offers[0] ?? null;

  const getPackageOffer = useCallback(
    (packageId: string): OfferData | null => {
      if (!offers.length) return null;
      const matching = offers.filter(
        (o) => o.applicablePackages && o.applicablePackages.includes(packageId)
      );
      if (!matching.length) return null;
      return matching.reduce((best, cur) =>
        cur.discountPercentage > best.discountPercentage ? cur : best
      );
    },
    [offers]
  );

  const getDiscountedPrice = useCallback(
    (packageId: string, originalPrice: number) => {
      const matchingOffer = getPackageOffer(packageId);
      if (!matchingOffer) return null;
      return originalPrice - (originalPrice * (matchingOffer.discountPercentage || 0)) / 100;
    },
    [getPackageOffer]
  );

  return {
    offers,
    offer: primaryOffer,
    loading,
    getPackageOffer,
    getDiscountedPrice,
  };
};
