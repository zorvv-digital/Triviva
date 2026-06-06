import { useState, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SplashScreen from "@/components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import ExitIntentModal from "./components/ExitIntentModal";
import BottomCTABar from "./components/BottomCTABar";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Packages = lazy(() => import("./pages/Packages"));
const PackageDetail = lazy(() => import("./pages/PackageDetail"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Rentals = lazy(() => import("./pages/Rentals"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!splashDone && (
          <SplashScreen
            onComplete={() => {
              setSplashDone(true);
              (window as any).splashDone = true;
              window.dispatchEvent(new CustomEvent("splashComplete"));
            }}
          />
        )}
        <BrowserRouter>
          <ScrollToTop />
          {splashDone && <ExitIntentModal />}
          <BottomCTABar />
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/packages/:id" element={<PackageDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
