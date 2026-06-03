import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TravelPackage } from "@/data/packages";
import { getImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import { useOfferInfo } from "@/hooks/useOfferInfo";

interface FeaturedCarouselHeroProps {
  isMobile: boolean;
  packages: TravelPackage[];
  loading: boolean;
}

const FeaturedCarouselHero = ({ isMobile, packages, loading }: FeaturedCarouselHeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [firstSlideDone, setFirstSlideDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { offer, getPackageOffer, getDiscountedPrice } = useOfferInfo();

  const explicitlyFeatured = packages.filter((pkg) => pkg.showInHero);
  const featuredPackages = explicitlyFeatured.length > 0 
    ? explicitlyFeatured 
    : packages.slice(0, 5);

  useEffect(() => {
    if (isPaused || shouldReduceMotion || featuredPackages.length <= 1) {
      return;
    }

    if (!firstSlideDone) {
      const timeoutId = window.setTimeout(() => {
        setActiveIndex((curr) => (curr + 1) % featuredPackages.length);
        setFirstSlideDone(true);
      }, 2000);
      return () => window.clearTimeout(timeoutId);
    } else {
      const intervalId = window.setInterval(() => {
        setActiveIndex((curr) => (curr + 1) % featuredPackages.length);
      }, 6000);
      return () => window.clearInterval(intervalId);
    }
  }, [isPaused, shouldReduceMotion, firstSlideDone, featuredPackages.length]);

  useEffect(() => {
    featuredPackages.forEach((pkg) => {
      const img = new Image();
      img.src = getImage(pkg.image);
    });
  }, [featuredPackages]);

  if (loading || featuredPackages.length === 0) {
    return (
      <section className="relative overflow-hidden h-screen min-h-screen flex flex-col justify-end pt-16 sm:pt-20 md:pt-28 bg-slate-950 animate-pulse select-none w-full">
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative section-padding pb-8 md:pb-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8 lg:gap-12 md:min-h-[72vh]">
            <div className="max-w-2xl md:w-[48%] lg:w-[52%] space-y-4">
              <div className="h-16 bg-slate-800 rounded-2xl w-3/4" />
              <div className="h-4 bg-slate-800 rounded-md w-full" />
              <div className="h-4 bg-slate-800 rounded-md w-5/6" />
              <div className="flex gap-4 pt-2">
                <div className="h-12 bg-slate-800 rounded-full w-36" />
                <div className="h-12 bg-slate-800 rounded-full w-36" />
              </div>
            </div>
            <div className="hidden md:block w-full md:ml-auto md:w-[48%] lg:w-[45%] md:max-w-[32rem] lg:max-w-[36rem] space-y-4">
              <div className="flex justify-end gap-2">
                <div className="h-10 w-10 bg-slate-800 rounded-full" />
                <div className="h-10 w-10 bg-slate-800 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-48 bg-slate-800 rounded-[1.75rem]" />
                <div className="h-48 bg-slate-800 rounded-[1.75rem]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const activePackage = featuredPackages[activeIndex];
  const pkgOffer = activePackage ? getPackageOffer(activePackage.id) : null;
  const discountedPrice = activePackage ? getDiscountedPrice(activePackage.id, activePackage.price) : null;

  const goToSlide = (index: number) => {
    setActiveIndex((index + featuredPackages.length) % featuredPackages.length);
  };

  const getSlide = (offset: number) =>
    featuredPackages[(activeIndex + offset) % featuredPackages.length];
  const slidePreview = [getSlide(0), getSlide(1), getSlide(2)];

  return (
    <section
      className="relative isolate overflow-hidden h-screen min-h-screen flex flex-col justify-end pt-16 sm:pt-20 md:pt-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.img
            key={activePackage.image}
            src={getImage(activePackage.image)}
            alt={activePackage.title}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.28)_0%,rgba(2,6,23,0.4)_45%,rgba(255,255,255,0.7)_80%,rgba(255,255,255,1)_100%)]" />
      </div>

      <div className="relative section-padding pb-8 md:pb-10">
        {/* Desktop Carousel Layout */}
        <div className="mx-auto hidden max-w-7xl flex-col gap-6 md:flex md:min-h-[72vh] md:flex-row md:items-end md:gap-8 lg:gap-12">
          <div className="max-w-2xl text-white md:w-[48%] lg:w-[52%] min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePackage.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <h1 className="max-w-xl font-display text-4xl sm:text-5xl md:text-5xl lg:text-7xl xl:text-8xl font-black uppercase leading-[0.88] tracking-tight break-words">
                  {activePackage.location.split(",")[0]}
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 md:text-base">
                  {activePackage.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/packages/${activePackage.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Explore package
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/packages"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/15"
                  >
                    View all packages
                  </Link>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-xs md:text-sm">
                  <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                    {activePackage.duration}
                  </div>
                  {discountedPrice ? (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#ea580c]/30 bg-[#ea580c]/15 px-4 py-2 backdrop-blur-md">
                      <span className="text-white/50 line-through">₹{activePackage.price.toLocaleString()}</span>
                      <span className="font-bold text-[#ff7a2f]">₹{discountedPrice.toLocaleString()}</span>
                      <span className="bg-[#ea580c] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                        {pkgOffer?.discountPercentage}% OFF
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                      ₹{activePackage.price.toLocaleString()}
                    </div>
                  )}
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                    <Star className="h-4 w-4 fill-current text-amber-300" />
                    <span>{activePackage.rating.toFixed(2)} rating</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full md:ml-auto md:w-[48%] lg:w-[45%] md:max-w-[32rem] lg:max-w-[36rem] min-w-0">
            <div className="mb-4 flex items-center justify-end text-white/85">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToSlide(activeIndex - 1)}
                  aria-label="Previous featured package"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(activeIndex + 1)}
                  aria-label="Next featured package"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-3">
              {slidePreview.map((pkg, index) => {
                const isPrimary = index === 0;
                return (
                  <motion.article
                    key={pkg.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 32,
                      opacity: { duration: 0.25, delay: index * 0.05 },
                      y: { type: "spring", stiffness: 280, damping: 32, delay: index * 0.05 },
                      layout: { type: "spring", stiffness: 280, damping: 32 }
                    }}
                    className={cn(
                      "group overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-950/10 shadow-[0_20px_60px_rgba(2,6,23,0.22)] backdrop-blur-md w-full min-w-0",
                      isPrimary
                        ? "w-[82vw] min-w-[82vw] snap-start sm:w-[60vw] sm:min-w-[60vw] md:col-span-2 md:row-span-2 md:w-auto md:min-w-0 lg:col-span-2 lg:row-span-2"
                        : "w-[72vw] min-w-[72vw] snap-start sm:w-[52vw] sm:min-w-[52vw] md:w-auto md:min-w-0"
                    )}
                  >
                    <Link to={`/packages/${pkg.id}`} className="block h-full w-full min-w-0">
                      <div className={cn("relative h-full w-full min-w-0", isPrimary ? "aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5]" : "aspect-[4/3] md:aspect-auto md:h-full")}>
                        <img
                          src={getImage(pkg.image)}
                          alt={pkg.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.72)_100%)]" />

                        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-950">
                          <Star className="h-3 w-3 fill-current text-amber-500" />
                          {pkg.rating.toFixed(2)}
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                          <h3 className="text-sm md:text-base lg:text-lg font-bold leading-tight line-clamp-2 break-all">
                            {pkg.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {featuredPackages.map((pkg, index) => (
                <button
                  key={pkg.id}
                  type="button"
                  aria-label={`Show featured package ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                    index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/35 hover:bg-white/55"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Carousel Layout */}
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:hidden">
          <div className="text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePackage.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="h-[110px] sm:h-[135px] overflow-hidden flex flex-col justify-end">
                  <h1 className="max-w-[12ch] font-display text-3xl font-black uppercase leading-[0.92] tracking-tight sm:text-4xl">
                    {activePackage.location.split(",")[0]}
                  </h1>

                  <p className="mt-2 max-w-[34rem] text-[13px] leading-5 text-white/85 sm:text-[15px] sm:leading-6 line-clamp-2">
                    {activePackage.description}
                  </p>
                </div>

                <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px] sm:text-xs">
                  <div className="rounded-full border border-white/15 bg-white/10 px-2 py-1 backdrop-blur-md">
                    {activePackage.duration}
                  </div>
                  {discountedPrice ? (
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ea580c]/30 bg-[#ea580c]/15 px-2 py-1 backdrop-blur-md">
                      <span className="text-white/50 line-through">₹{activePackage.price.toLocaleString()}</span>
                      <span className="font-bold text-[#ff7a2f]">₹{discountedPrice.toLocaleString()}</span>
                      <span className="bg-[#ea580c] text-white text-[8px] font-extrabold px-1 rounded-sm uppercase tracking-wide">
                        {pkgOffer?.discountPercentage}% OFF
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-full border border-white/15 bg-white/10 px-2 py-1 backdrop-blur-md">
                      ₹{activePackage.price.toLocaleString()}
                    </div>
                  )}
                  <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1 backdrop-blur-md">
                    <Star className="h-3 w-3 fill-current text-amber-300" />
                    <span>{activePackage.rating.toFixed(2)} rating</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    to={`/packages/${activePackage.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm font-semibold text-slate-950 transition-transform duration-300 active:scale-[0.98]"
                  >
                    Explore package
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    to="/packages"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm font-semibold text-white backdrop-blur-md"
                  >
                    View all packages
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-end text-white/85">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToSlide(activeIndex - 1)}
                aria-label="Previous featured package"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goToSlide(activeIndex + 1)}
                aria-label="Next featured package"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-[360px] sm:max-w-[410px] ml-auto w-full">
            {slidePreview.map((pkg, index) => {
              const isPrimary = index === 0;
              return (
                <motion.article
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 32,
                    opacity: { duration: 0.25, delay: index * 0.05 },
                    y: { type: "spring", stiffness: 280, damping: 32, delay: index * 0.05 },
                    layout: { type: "spring", stiffness: 280, damping: 32 }
                  }}
                  className={cn(
                    "group overflow-hidden rounded-[1.25rem] border border-white/15 bg-slate-950/10 shadow-[0_16px_40px_rgba(2,6,23,0.16)] backdrop-blur-md w-full min-w-0",
                    isPrimary ? "col-span-2 row-span-2" : ""
                  )}
                >
                  <Link to={`/packages/${pkg.id}`} className="block h-full w-full min-w-0">
                    <div className={cn("relative h-full w-full min-w-0", isPrimary ? "aspect-[4/5]" : "aspect-[4/3] md:aspect-auto md:h-full")}>
                      <img
                        src={getImage(pkg.image)}
                        alt={pkg.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.06)_0%,rgba(2,6,23,0.72)_100%)]" />

                      <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-slate-950">
                        <Star className="h-3 w-3 fill-current text-amber-500" />
                        {pkg.rating.toFixed(2)}
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-2 text-white">
                        <h3 className="text-xs sm:text-[13px] font-bold leading-tight line-clamp-2 break-all">
                          {pkg.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2 pb-2">
            {featuredPackages.map((pkg, index) => (
              <button
                key={pkg.id}
                type="button"
                aria-label={`Show featured package ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/35"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarouselHero;
