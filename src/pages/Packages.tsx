import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, Filter, MapPin, Search, SlidersHorizontal, Star, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { packages } from "@/data/packages";
import { getImage } from "@/lib/images";
import { cn } from "@/lib/utils";

const featuredPackages = packages.slice(0, 5);

/**
 * Renders the page listing all available travel packages.
 * Includes interactive cards with detailed descriptions, highlight tags,
 * ratings, and booking action triggers.
 */
const Packages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [firstSlideDone, setFirstSlideDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPaused || shouldReduceMotion || featuredPackages.length <= 1) {
      return;
    }

    if (!firstSlideDone) {
      // First slide transition triggers quickly after 2 seconds to signal auto-rotation
      const timeoutId = window.setTimeout(() => {
        setActiveIndex((curr) => (curr + 1) % featuredPackages.length);
        setFirstSlideDone(true);
      }, 2000);
      return () => window.clearTimeout(timeoutId);
    } else {
      // Subsequent slide transitions trigger at the standard 6-second interval
      const intervalId = window.setInterval(() => {
        setActiveIndex((curr) => (curr + 1) % featuredPackages.length);
      }, 6000);
      return () => window.clearInterval(intervalId);
    }
  }, [isPaused, shouldReduceMotion, firstSlideDone]);

  useEffect(() => {
    // Preload background images to prevent slow loading flashes during transitions
    featuredPackages.forEach((pkg) => {
      const img = new Image();
      img.src = getImage(pkg.image);
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(250000);
  const [durationFilter, setDurationFilter] = useState<string>("All");
  const [minRating, setMinRating] = useState<number>(0);
  const [tripTypeFilter, setTripTypeFilter] = useState<string>("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);

  /**
   * Toggles selection of a travel style category.
   */
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  /**
   * Resets all filters to their default states.
   */
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setMaxPrice(250000);
    setDurationFilter("All");
    setMinRating(0);
    setTripTypeFilter("All");
  };

  const categoriesList = [
    "Adventure", "Wellness", "Cultural", "Luxury", "Budget", 
    "Beach", "Mountain", "Desert", "Wildlife", "Culinary", 
    "Romantic", "Historical", "Family", "Honeymoon", "Solo"
  ];

  /**
   * Maps categories dynamically to each package.
   */
  const getPackageCategories = (id: string): string[] => {
    const baseId = id.replace("-2", "");
    switch (baseId) {
      case "santorini-escape":
        return ["Beach", "Romantic", "Luxury", "Honeymoon", "Cultural"];
      case "japan-cultural":
        return ["Cultural", "Historical", "Culinary", "Family", "Adventure"];
      case "bali-retreat":
        return ["Wellness", "Beach", "Mountain", "Budget", "Solo"];
      case "swiss-alpine":
        return ["Mountain", "Adventure", "Family", "Luxury"];
      case "maldives-luxury":
        return ["Beach", "Romantic", "Luxury", "Honeymoon", "Wellness"];
      case "peru-expedition":
        return ["Adventure", "Mountain", "Historical", "Solo"];
      case "iceland-lights":
        return ["Adventure", "Wildlife", "Solo", "Romantic"];
      case "sahara-odyssey":
        return ["Desert", "Cultural", "Adventure", "Solo", "Budget"];
      default:
        return [];
    }
  };

  /**
   * Returns the trip region type.
   */
  const getTripType = (id: string): string => {
    const baseId = id.replace("-2", "");
    if (baseId === "santorini-escape" || baseId === "maldives-luxury" || baseId === "japan-cultural") return "international";
    if (baseId === "bali-retreat" || baseId === "peru-expedition") return "domestic";
    return "seasonal";
  };

  /**
   * Categorizes duration into Short, Medium, or Long.
   */
  const getDurationRange = (durationStr: string): string => {
    const match = durationStr.match(/^(\d+)\s+Days/);
    if (!match) return "Short";
    const days = parseInt(match[1], 10);
    if (days <= 5) return "Short";
    if (days <= 8) return "Medium";
    return "Long";
  };

  /**
   * Computes matching package counts per category dynamically.
   */
  const getCategoryCount = (catName: string): number => {
    return packages.filter((pkg) => {
      const pkgCats = getPackageCategories(pkg.id);
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        pkg.location.toLowerCase().includes(query) ||
        pkg.title.toLowerCase().includes(query) ||
        pkg.description.toLowerCase().includes(query);

      const matchesTripType =
        tripTypeFilter === "All" || getTripType(pkg.id) === tripTypeFilter.toLowerCase();

      const matchesPrice = pkg.price <= maxPrice;
      
      const pkgDurationRange = getDurationRange(pkg.duration);
      const matchesDuration =
        durationFilter === "All" || pkgDurationRange === durationFilter;

      const matchesRating = pkg.rating >= minRating;

      return (
        matchesSearch &&
        matchesTripType &&
        pkgCats.includes(catName) &&
        matchesPrice &&
        matchesDuration &&
        matchesRating
      );
    }).length;
  };

  const filteredPackages = packages.filter((pkg) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      pkg.location.toLowerCase().includes(query) ||
      pkg.title.toLowerCase().includes(query) ||
      pkg.description.toLowerCase().includes(query);

    const matchesTripType =
      tripTypeFilter === "All" || getTripType(pkg.id) === tripTypeFilter.toLowerCase();

    const pkgCats = getPackageCategories(pkg.id);
    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.some((cat) => pkgCats.includes(cat));

    const matchesPrice = pkg.price <= maxPrice;

    const pkgDurationRange = getDurationRange(pkg.duration);
    const matchesDuration =
      durationFilter === "All" || pkgDurationRange === durationFilter;

    const matchesRating = pkg.rating >= minRating;

    return (
      matchesSearch &&
      matchesTripType &&
      matchesCategories &&
      matchesPrice &&
      matchesDuration &&
      matchesRating
    );
  });

  const activePackage = featuredPackages[activeIndex];

  const goToSlide = (index: number) => {
    setActiveIndex((index + featuredPackages.length) % featuredPackages.length);
  };


  const getSlide = (offset: number) =>
    featuredPackages[(activeIndex + offset) % featuredPackages.length];
  const slidePreview = [getSlide(0), getSlide(1), getSlide(2)];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

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
                    <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                      ₹{activePackage.price.toLocaleString()}
                    </div>
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
                  return <motion.article
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
                  {/* Fixed height container for text to prevent layout shifting */}
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
                    <div className="rounded-full border border-white/15 bg-white/10 px-2 py-1 backdrop-blur-md">
                      ₹{activePackage.price.toLocaleString()}
                    </div>
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

      <section className="pb-24 section-padding max-w-7xl mx-auto w-full">
        {/* Title Header */}
        <div className="mb-8 border-b border-slate-100 pb-6">
          <h2 className="text-3xl font-display font-black uppercase text-slate-900 tracking-tight sm:text-4xl">
            All Travel Packages
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md">
            Find your next adventure from our handpicked selection of premium, local-expert guided journeys.
          </p>
        </div>

        {/* Filters & Search Row (Unified for Desktop and Mobile) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-3 sm:gap-4 mb-8">
          <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination, experience..."
              className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-full text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-all duration-300 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer shadow-sm active:scale-[0.98] transition-all duration-300 border border-slate-950 w-full sm:w-auto"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {(selectedCategories.length > 0 || maxPrice < 250000 || durationFilter !== "All" || minRating > 0 || tripTypeFilter !== "All") && (
              <span className="flex items-center justify-center bg-white text-slate-950 w-5.5 h-5.5 rounded-full text-[10px] font-bold">
                {[
                  selectedCategories.length > 0,
                  maxPrice < 250000,
                  durationFilter !== "All",
                  minRating > 0,
                  tripTypeFilter !== "All"
                ].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {/* Active Filter Badges */}
        {(selectedCategories.length > 0 || maxPrice < 250000 || durationFilter !== "All" || minRating > 0 || tripTypeFilter !== "All" || searchQuery !== "") && (
          <div className="flex flex-wrap items-center gap-2 mb-8 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200/50 text-slate-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"><X className="w-3 h-3" /></button>
              </span>
            )}
            {tripTypeFilter !== "All" && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200/50 text-slate-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                Region: {tripTypeFilter}
                <button onClick={() => setTripTypeFilter("All")} className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedCategories.map((cat) => (
              <span key={cat} className="inline-flex items-center gap-1.5 bg-white border border-slate-200/50 text-slate-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                Style: {cat}
                <button onClick={() => handleCategoryToggle(cat)} className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"><X className="w-3 h-3" /></button>
              </span>
            ))}
            {maxPrice < 250000 && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200/50 text-slate-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                Under ₹{maxPrice.toLocaleString()}
                <button onClick={() => setMaxPrice(250000)} className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"><X className="w-3 h-3" /></button>
              </span>
            )}
            {durationFilter !== "All" && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200/50 text-slate-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                Duration: {durationFilter}
                <button onClick={() => setDurationFilter("All")} className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"><X className="w-3 h-3" /></button>
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200/50 text-slate-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                Rating: {minRating}★+
                <button onClick={() => setMinRating(0)} className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 cursor-pointer ml-auto transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Packages Grid / Empty State */}
        {filteredPackages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center text-slate-500 w-full border border-dashed border-slate-200 rounded-3xl bg-slate-50/30"
          >
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No matches found</h3>
            <p className="text-sm text-slate-400 max-w-xs mb-4">
              We couldn't find any packages matching your selection. Try clearing some filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-slate-950 text-white hover:bg-slate-900 px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer shadow-sm transition-colors duration-200"
            >
              Reset All Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {filteredPackages.map((pkg, i) => (
                <motion.div
                  layout
                  key={pkg.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Link to={`/packages/${pkg.id}`} className="group block h-full">
                    <div className="bg-white rounded-[2rem] p-4 shadow-[0_2px_5px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-500 transform-gpu overflow-hidden flex flex-col h-full border border-slate-100/50">
                      {/* Image wrapper */}
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden isolate transform-gpu flex-shrink-0">
                        <img
                          src={getImage(pkg.image)}
                          alt={pkg.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Tags overlay */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          {pkg.highlights.slice(0, 2).map((hl, idx) => (
                            <span key={idx} className="bg-black/35 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                              {hl.split(' ').slice(0, 2).join(' ')}
                            </span>
                          ))}
                        </div>

                        {/* Rating overlay */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 text-white text-xs font-bold bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-full">
                          <Star className="w-3 h-3 fill-white text-white" />
                          <span>{pkg.rating}</span>
                        </div>

                        {/* Carousel Dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {[0, 1, 2, 3, 4].map((dot) => (
                            <span
                              key={dot}
                              className={cn(
                                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                dot === 0 ? "bg-white w-3.5" : "bg-white/50"
                              )}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Content area */}
                      <div className="pt-5 pb-1 px-1 flex flex-col flex-grow">
                        <div className="flex items-start justify-between gap-4 mb-1 min-h-[3.25rem]">
                          <h3 className="font-body text-xl font-bold text-slate-900 group-hover:text-slate-950 transition-colors line-clamp-2 leading-snug">
                            {pkg.location}
                          </h3>
                          {pkg.rating >= 4.9 && (
                            <span className="flex-shrink-0 border border-slate-200/80 bg-slate-50 text-slate-600 rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-wide uppercase mt-1">
                              Top rated
                            </span>
                          )}
                        </div>

                        <p className="text-slate-400 font-body text-[10px] mb-3 uppercase tracking-wider font-bold">
                          {pkg.duration} • Local expert
                        </p>

                        <p className="text-slate-500 font-body text-xs md:text-sm line-clamp-2 leading-relaxed mb-5 min-h-[2.5rem]">
                          {pkg.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                          <div>
                            <span className="font-body text-lg font-extrabold text-slate-900">
                              ₹{pkg.price.toLocaleString()}
                              <span className="text-slate-400 font-medium text-xs"> / night</span>
                            </span>
                          </div>

                          <div className="bg-black text-white hover:bg-slate-900 transition-all duration-300 text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-1.5 group/btn cursor-pointer">
                            <span>Book Now</span>
                            <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Responsive Filters Overlay (Modal on Desktop, Bottom Drawer on Mobile) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Modal Dialog Container */}
            <motion.div
              key={isMobile ? "mobile-drawer" : "desktop-modal"}
              initial={isMobile ? { y: "100%", x: 0 } : { opacity: 0, scale: 0.95, y: "-45%", x: "-50%" }}
              animate={isMobile ? { y: 0, x: 0 } : { opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={isMobile ? { y: "100%", x: 0 } : { opacity: 0, scale: 0.95, y: "-45%", x: "-50%" }}
              transition={{ type: "spring", damping: 30, stiffness: 240 }}
              className={cn(
                "fixed z-[60] bg-white shadow-2xl flex flex-col",
                // Mobile layout (<768px)
                "left-0 right-0 bottom-0 max-h-[85vh] rounded-t-[2.5rem] p-6 overflow-y-auto",
                // Desktop and Tablet layout (>=768px)
                "md:top-1/2 md:left-1/2 md:bottom-auto md:right-auto md:w-[700px] lg:w-[800px] md:max-h-[90vh] md:rounded-[2.5rem]"
              )}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 flex-shrink-0">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> Filter Options
                </h3>
                <div className="flex items-center gap-4">
                  {(selectedCategories.length > 0 || maxPrice < 250000 || durationFilter !== "All" || minRating > 0 || tripTypeFilter !== "All") && (
                    <button
                      onClick={handleResetFilters}
                      className="text-xs font-semibold text-rose-500 hover:text-rose-600 cursor-pointer transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-700 cursor-pointer transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-grow overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-2 pr-1">
                {/* Left Column: Region, Price, Duration, Rating */}
                <div className="flex flex-col gap-6">
                  {/* Region Type Filter */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Region Type</span>
                    <div className="grid grid-cols-2 gap-2">
                      {["All", "Domestic", "International", "Seasonal"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setTripTypeFilter(cat)}
                          className={cn(
                            "px-3 py-2 text-xs font-bold rounded-xl uppercase tracking-wider transition-all duration-200 border cursor-pointer text-center",
                            tripTypeFilter === cat
                              ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                              : "bg-slate-50 hover:bg-slate-100/80 text-slate-600 border-slate-100"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Max Price (per night)</span>
                      <span className="text-xs font-bold text-slate-900">₹{maxPrice.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={50000}
                      max={250000}
                      step={10000}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-950 focus:outline-none"
                    />
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span>₹50,000</span>
                      <span>₹2,50,000</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Duration</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "All", label: "Any Duration" },
                        { value: "Short", label: "Short (1-5 Days)" },
                        { value: "Medium", label: "Medium (6-8 Days)" },
                        { value: "Long", label: "Long (9+ Days)" }
                      ].map((dur) => {
                        const isSelected = durationFilter === dur.value;
                        return (
                          <button
                            key={dur.value}
                            onClick={() => setDurationFilter(dur.value)}
                            className={cn(
                              "px-3 py-2 text-xs font-bold rounded-xl transition-all duration-200 border cursor-pointer text-center",
                              isSelected
                                ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                                : "bg-slate-50 hover:bg-slate-100/80 text-slate-600 border-slate-100"
                            )}
                          >
                            {dur.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Minimum Rating</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 0, label: "Any Rating" },
                        { value: 4.5, label: "4.5★ & above" },
                        { value: 4.8, label: "4.8★ & above" },
                        { value: 4.9, label: "4.9★ & above" }
                      ].map((rate) => {
                        const isSelected = minRating === rate.value;
                        return (
                          <button
                            key={rate.value}
                            onClick={() => setMinRating(rate.value)}
                            className={cn(
                              "px-3 py-2 text-xs font-bold rounded-xl transition-all duration-200 border cursor-pointer text-center",
                              isSelected
                                ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                                : "bg-slate-50 hover:bg-slate-100/80 text-slate-600 border-slate-100"
                            )}
                          >
                            {rate.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Column: Travel Styles Checkboxes */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Travel Styles</span>
                  <div className="grid grid-cols-2 gap-2">
                    {categoriesList.map((cat) => {
                      const count = getCategoryCount(cat);
                      const isChecked = selectedCategories.includes(cat);
                      return (
                        <div
                          key={cat}
                          onClick={() => handleCategoryToggle(cat)}
                          className={cn(
                            "flex items-center justify-between py-2 px-3 rounded-xl border transition-all duration-200 cursor-pointer group",
                            isChecked 
                              ? "bg-slate-950 border-slate-950 text-white" 
                              : "bg-slate-50 border-slate-100 hover:bg-slate-100/80 text-slate-700"
                          )}
                        >
                          <span className="text-xs font-medium">{cat}</span>
                          <span className={cn(
                            "text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                            isChecked ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-500"
                          )}>
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-100 mt-6 flex-shrink-0">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full bg-slate-950 text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-slate-900 active:scale-[0.99] transition-transform text-sm"
                >
                  Show {filteredPackages.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Packages;
