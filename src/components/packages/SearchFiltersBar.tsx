import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SearchFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  tripTypeFilter: string;
  setTripTypeFilter: (filter: string) => void;
  onOpenFilters: () => void;
  activeFiltersCount: number;
}

const categoriesList = [
  "Devotional Tour", "Honeymoon", "College Trip", "Family", 
  "Adventure Tour", "Domestic", "International",
  "Wellness", "Cultural", "Luxury", "Budget", 
  "Beach", "Mountain", "Desert", "Wildlife", "Culinary", 
  "Romantic", "Historical", "Solo"
];

const destinationNouns = [
  "Santorini", "Greece", "Tokyo", "Kyoto", "Osaka", "Japan", 
  "Ubud", "Seminyak", "Bali", "Indonesia", "Interlaken", "Zermatt", 
  "Switzerland", "South Malé Atoll", "Maldives", "Cusco", "Machu Picchu", 
  "Peru", "Reykjavik", "Golden Circle", "Iceland", "Marrakech", 
  "Merzouga", "Morocco", "Sahara"
];

const SearchFiltersBar = ({
  searchQuery,
  setSearchQuery,
  tripTypeFilter,
  setTripTypeFilter,
  onOpenFilters,
  activeFiltersCount,
}: SearchFiltersBarProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getSuggestions = (): string[] => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    const suggestionsSet = new Set<string>();

    destinationNouns.forEach((noun) => {
      if (noun.toLowerCase().includes(query)) {
        suggestionsSet.add(noun);
      }
    });

    categoriesList.forEach((cat) => {
      if (cat.toLowerCase().includes(query)) {
        suggestionsSet.add(cat);
      }
    });

    return Array.from(suggestionsSet).slice(0, 5);
  };

  const suggestions = getSuggestions();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-3 sm:gap-4 mb-5">
      {/* Search Input field */}
      <div className="relative w-full sm:max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
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
        
        {/* Suggestion Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200/80 rounded-2xl shadow-xl z-50 overflow-hidden py-1.5 animate-in fade-in duration-200">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onMouseDown={() => {
                  setSearchQuery(suggestion);
                  setShowSuggestions(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-slate-700 font-medium transition-colors duration-150 cursor-pointer flex items-center gap-2"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Action Controls & Region Badges */}
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <button
          onClick={onOpenFilters}
          className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer shadow-sm active:scale-[0.98] transition-all duration-300 border border-slate-950 sm:w-auto"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="flex items-center justify-center bg-white text-slate-950 w-5 h-5 rounded-full text-[10px] font-bold flex-shrink-0">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {["All", "Domestic", "International"].map((cat) => (
          <button
            key={cat}
            onClick={() => setTripTypeFilter(tripTypeFilter === cat ? "All" : cat)}
            className={cn(
              "px-5 py-2.5 text-xs font-bold rounded-full uppercase tracking-wider transition-all duration-300 border cursor-pointer flex-shrink-0 active:scale-[0.98]",
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
  );
};

export default SearchFiltersBar;
export { categoriesList };
