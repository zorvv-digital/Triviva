import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Compass, ArrowRight, Copy, Check, Sparkles } from "lucide-react";
import { useOfferInfo } from "../hooks/useOfferInfo";

let exitIntentShown = false;

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { offers, offer, getDiscountedPrice } = useOfferInfo();
  const highestDiscount = offers.length > 0
    ? Math.max(...offers.map((o) => o.discountPercentage || 0))
    : 0;
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const homeEntryTimeRef = useRef<number | null>(null);

  const destinations = [
    {
      id: "dubai-luxury",
      name: "Dubai, UAE",
      details: "5 Days / 4 Nights",
      image: "/data/packages/packages_image/dubai-luxury/01-Dubai.webp",
      originalPrice: 25000
    },
    {
      id: "himachal-package",
      name: "Himachal Pradesh, India",
      details: "6 Days / 5 Nights",
      image: "/data/packages/packages_image/himachal-package/01_Himachal.webp",
      originalPrice: 25000
    },
    {
      id: "thailand-explorer",
      name: "Thailand",
      details: "7 Days / 6 Nights",
      image: "/data/packages/packages_image/thailand-explorer/01-Thailand.webp",
      originalPrice: 25000
    }
  ];

  useEffect(() => {
    if (location.pathname === "/") {
      if (homeEntryTimeRef.current === null) {
        homeEntryTimeRef.current = Date.now();
      }
    } else {
      // Close the modal immediately when navigating away from the homepage
      setIsOpen(false);

      // If the user was on the homepage and navigated away within 10 seconds,
      // they are actively exploring, so we disable the exit intent modal permanently.
      if (homeEntryTimeRef.current !== null) {
        const timeSpentOnHome = Date.now() - homeEntryTimeRef.current;
        if (timeSpentOnHome < 10000) {
          exitIntentShown = true;
        }
        homeEntryTimeRef.current = null;
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    // Only trigger on the homepage
    if (location.pathname !== "/") return;

    // Check if shown in this session
    if (exitIntentShown) return;

    // Trigger on exit intent (mouse leaving window top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        triggerModal();
      }
    };

    // Trigger on timer (e.g. 10 seconds)
    const timer = setTimeout(() => {
      triggerModal();
    }, 10000);

    const triggerModal = () => {
      setIsOpen(true);
      exitIntentShown = true;
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.12 }}
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white p-6 sm:p-8 text-slate-900 border border-black/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-10"
          >
            {/* Ambient Glows */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#ea580c]/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-full bg-[#ea580c]/10 p-2 text-[#ea580c] border border-[#ea580c]/20 hover:bg-[#ea580c]/20 hover:border-[#ea580c]/40 transition-all duration-300"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Visual Overlapping Card Stack (Always Shown) */}
            <div className="relative w-full h-[155px] sm:h-[210px] flex items-center justify-center mb-4 sm:mb-6 mt-6 sm:mt-4">
              {destinations.map((dest, index) => {
                let cardStyle = "";
                if (index === 0) {
                  cardStyle = "rotate-[-10deg] -translate-x-10 sm:-translate-x-14 translate-y-2 sm:translate-y-3 scale-[0.86] z-10 hover:z-[40] hover:-translate-y-2 hover:rotate-0 hover:scale-95";
                } else if (index === 1) {
                  cardStyle = "rotate-0 scale-100 z-30 -translate-y-2 sm:-translate-y-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.15)] sm:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:z-[40] hover:-translate-y-6 hover:scale-105";
                } else {
                  cardStyle = "rotate-[10deg] translate-x-10 sm:translate-x-14 translate-y-2 sm:translate-y-3 scale-[0.86] z-20 hover:z-[40] hover:-translate-y-2 hover:rotate-0 hover:scale-95";
                }

                const discountedPrice = getDiscountedPrice(dest.id, dest.originalPrice);

                return (
                  <Link
                    key={dest.id || index}
                    to={dest.id ? `/packages/${dest.id}` : "/packages"}
                    onClick={handleClose}
                    className={`absolute w-[105px] sm:w-[145px] h-[140px] sm:h-[190px] rounded-xl sm:rounded-2xl overflow-hidden border border-black/[0.04] transition-all duration-300 cursor-pointer shadow-md ${cardStyle}`}
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />
                    
                    {/* Location badge */}
                    <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 rounded-full bg-slate-900/40 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 border border-white/10">
                      <p className="text-[5.5px] sm:text-[6.5px] font-bold uppercase tracking-wider text-white">
                        {dest.name.split(",")[1]?.trim() || dest.name}
                      </p>
                    </div>
                    
                    {/* Text at bottom */}
                    <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 text-white text-left">
                      <h4 className="font-display text-[9px] sm:text-[11px] font-bold leading-tight text-white mb-0.5">
                        {dest.name.split(",")[0]?.trim() || dest.name}
                      </h4>
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-[7px] sm:text-[8px] text-white/80 line-clamp-1 font-body leading-normal">
                          {dest.details}
                        </p>
                        {discountedPrice && (
                          <span className="text-[6.5px] sm:text-[7.5px] font-extrabold text-[#ea580c] bg-white/95 px-1 py-0.5 rounded-sm shrink-0 shadow-sm leading-none">
                            ₹{discountedPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Content */}
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-display font-bold mb-1.5 sm:mb-2 tracking-tight text-[#111827]">
                {highestDiscount > 0 ? `Get Upto ${highestDiscount}% Off!` : "Explore Trending Destinations"}
              </h2>
              
              <p className="text-slate-500 font-body text-[11px] sm:text-xs leading-relaxed mb-4 sm:mb-6 max-w-xs mx-auto">
                {offer ? `Unlock a ${highestDiscount}% discount on selected international packages. Book within the next 24 hours to claim this special rates curation.` : "Click on a featured destination above, or browse our curated packages catalog to customize your journey."}
              </p>



              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <Link
                  to={offer ? (offer.ctaLink || "/packages") : "/packages"}
                  onClick={handleClose}
                  className="btn-primary-travel py-3 sm:py-3.5 px-5 sm:px-6 text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  {offer ? (offer.ctaText || "Claim Offer") : "Explore All Packages"} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/contact"
                  onClick={handleClose}
                  className="btn-outline-travel py-3 sm:py-3.5 px-5 sm:px-6 text-[11px] sm:text-xs font-semibold flex items-center justify-center w-full sm:w-auto"
                >
                  Contact Curator
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
