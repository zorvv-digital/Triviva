import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EthosSection from "@/components/EthosSection";
import PerfectDestinationSection from "@/components/PerfectDestinationSection";
import DestinationsSection from "@/components/DestinationsSection";
import SeasonalSuggestionsSection from "@/components/SeasonalSuggestionsSection";
import JourneyOrbitSectionNew from "@/components/JourneyOrbitSectionNew";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { TravelPackage } from "@/data/packages";
import { getImage } from "@/lib/images";

function PackagesPrefetch() {
  const { data: packages } = useQuery<TravelPackage[]>({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await fetch("/data/packages/packages.json");
      if (!res.ok) throw new Error("Failed");
      return res.json() as Promise<TravelPackage[]>;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    if (!packages?.length) return;
    const heroPackages = packages.filter((p) => p.showInHero).slice(0, 3);
    heroPackages.forEach((pkg) => {
      const img = new Image();
      img.src = getImage(pkg.image);
    });
  }, [packages]);

  return null;
}

const Index = () => {
  return (
    <div className="min-h-screen border-brand-primary relative">
      <PackagesPrefetch />
      <Navbar />
      <HeroSection />
      <PerfectDestinationSection />
      <SeasonalSuggestionsSection />
      <JourneyOrbitSectionNew />
      <DestinationsSection />
      <FeaturesSection />
      <EthosSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
