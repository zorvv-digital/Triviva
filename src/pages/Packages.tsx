import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TravelPackage } from "@/data/packages";

import PackageCard from "@/components/packages/PackageCard";
import SearchFiltersBar from "@/components/packages/SearchFiltersBar";
import FilterDrawer from "@/components/packages/FilterDrawer";
import FeaturedCarouselHero from "@/components/packages/FeaturedCarouselHero";
import PackageSkeleton from "@/components/packages/PackageSkeleton";

/**
 * Renders the page listing all available travel packages.
 * Includes interactive cards with detailed descriptions, highlight tags,
 * ratings, and booking action triggers.
 */
const Packages = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("/data/packages/packages.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load travel packages data.");
        }
        return res.json();
      })
      .then((data: TravelPackage[]) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading packages:", err);
        setError(err.message || "An error occurred while fetching packages.");
        setLoading(false);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(250000);
  const [durationFilter, setDurationFilter] = useState<string>("All");
  const [minRating, setMinRating] = useState<number>(0);
  const [tripTypeFilter, setTripTypeFilter] = useState<string>("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        pkg.location.toLowerCase().includes(query) ||
        pkg.title.toLowerCase().includes(query) ||
        pkg.description.toLowerCase().includes(query);

      const matchesTripType =
        tripTypeFilter === "All" || pkg.region === tripTypeFilter.toLowerCase();

      const matchesPrice = pkg.price <= maxPrice;
      
      const pkgDurationRange = getDurationRange(pkg.duration);
      const matchesDuration =
        durationFilter === "All" || pkgDurationRange === durationFilter;

      const matchesRating = pkg.rating >= minRating;

      return (
        matchesSearch &&
        matchesTripType &&
        pkg.categories.includes(catName) &&
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
      tripTypeFilter === "All" || pkg.region === tripTypeFilter.toLowerCase();

    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.some((cat) => pkg.categories.includes(cat));

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

  const sortedPackages = [...filteredPackages].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

  const activeFiltersCount = [
    selectedCategories.length > 0,
    maxPrice < 250000,
    durationFilter !== "All",
    minRating > 0,
    tripTypeFilter !== "All"
  ].filter(Boolean).length;

  const hasActiveFilters = activeFiltersCount > 0 || searchQuery !== "";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <FeaturedCarouselHero isMobile={isMobile} packages={packages} loading={loading} />

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

        {/* Unified Search & Filters Bar */}
        <SearchFiltersBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tripTypeFilter={tripTypeFilter}
          setTripTypeFilter={setTripTypeFilter}
          onOpenFilters={() => setIsDrawerOpen(true)}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="hidden md:flex flex-wrap items-center gap-2 mb-8 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
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

        {/* Packages Grid / Empty State / Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <PackageSkeleton key={num} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-rose-500 w-full border border-dashed border-rose-200 rounded-3xl bg-rose-50/10">
            <h3 className="text-lg font-semibold mb-1">Failed to load packages</h3>
            <p className="text-sm text-rose-400 max-w-xs">{error}</p>
          </div>
        ) : filteredPackages.length === 0 ? (
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
              {sortedPackages.map((pkg) => (
                <motion.div
                  layout
                  key={pkg.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <PackageCard pkg={pkg} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Responsive Filters Overlay (Modal on Desktop, Bottom Drawer on Mobile) */}
      <FilterDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        isMobile={isMobile}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        durationFilter={durationFilter}
        setDurationFilter={setDurationFilter}
        minRating={minRating}
        setMinRating={setMinRating}
        tripTypeFilter={tripTypeFilter}
        setTripTypeFilter={setTripTypeFilter}
        onResetFilters={handleResetFilters}
        getCategoryCount={getCategoryCount}
        resultsCount={filteredPackages.length}
      />

      <Footer />
    </div>
  );
};

export default Packages;
