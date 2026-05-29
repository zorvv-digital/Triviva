import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EthosSection from "@/components/EthosSection";
import PerfectDestinationSection from "@/components/PerfectDestinationSection";
import DestinationsSection from "@/components/DestinationsSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingPackagesButton from "@/components/FloatingPackagesButton";

const Index = () => {
  return (
    <div className="min-h-screen border-brand-primary relative">
      <Navbar />
      <HeroSection />
      <PerfectDestinationSection />
      <DestinationsSection />
      <FeaturesSection />
      <EthosSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <FloatingPackagesButton />
    </div>
  );
};

export default Index;
