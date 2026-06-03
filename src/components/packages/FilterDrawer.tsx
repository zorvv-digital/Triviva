import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { categoriesList } from "./SearchFiltersBar";

interface FilterDrawerProps {
  isDrawerOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  selectedCategories: string[];
  onCategoryToggle: (cat: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  durationFilter: string;
  setDurationFilter: (duration: string) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  tripTypeFilter: string;
  setTripTypeFilter: (filter: string) => void;
  onResetFilters: () => void;
  getCategoryCount: (cat: string) => number;
  resultsCount: number;
}

const FilterDrawer = ({
  isDrawerOpen,
  onClose,
  isMobile,
  selectedCategories,
  onCategoryToggle,
  maxPrice,
  setMaxPrice,
  durationFilter,
  setDurationFilter,
  minRating,
  setMinRating,
  tripTypeFilter,
  setTripTypeFilter,
  onResetFilters,
  getCategoryCount,
  resultsCount,
}: FilterDrawerProps) => {
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    maxPrice < 250000 ||
    durationFilter !== "All" ||
    minRating > 0 ||
    tripTypeFilter !== "All";

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                {hasActiveFilters && (
                  <button
                    onClick={onResetFilters}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 cursor-pointer transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
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
                    {["All", "Domestic", "International"].map((cat) => (
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
                        onClick={() => onCategoryToggle(cat)}
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
                onClick={onClose}
                className="w-full bg-slate-950 text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-slate-900 active:scale-[0.99] transition-transform text-sm"
              >
                Show {resultsCount} Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterDrawer;
