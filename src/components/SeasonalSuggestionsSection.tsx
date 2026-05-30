import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { TravelPackage } from "@/data/packages";
import PackageCard from "@/components/packages/PackageCard";
import PackageSkeleton from "@/components/packages/PackageSkeleton";
import OutlineButton from "@/components/ui/OutlineButton";

const SeasonalSuggestionsSection = () => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonthIdx = new Date().getMonth();
  const currentMonth = months[currentMonthIdx];
  const nextMonth = months[(currentMonthIdx + 1) % 12];
  const seasonRange = `${currentMonth} - ${nextMonth}`;

  useEffect(() => {
    fetch("/data/packages/packages.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch packages catalog.");
        }
        return res.json();
      })
      .then((data: TravelPackage[]) => {
        // Filter packages that match either the current month or the next month in bestTimeToVisit
        let filtered = data.filter((pkg) => 
          pkg.bestTimeToVisit && (pkg.bestTimeToVisit.includes(currentMonth) || pkg.bestTimeToVisit.includes(nextMonth))
        );

        // Fallback: If no packages match the seasonal window, show all packages
        if (filtered.length === 0) {
          filtered = data;
        }

        // Sort by priority weight (ascending order, lower number means higher priority)
        const sorted = filtered.sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

        // Limit to 4 items
        setPackages(sorted.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading seasonal suggestions:", err);
        setError(err.message || "Failed to load suggestions.");
        setLoading(false);
      });
  }, [currentMonth, nextMonth]);

  return (
    <section className="py-20 bg-slate-50/50 border-y border-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Seasonal Suggestions</span>
            </div>
            <h2 className="text-3xl font-display font-black uppercase text-slate-900 tracking-tight sm:text-4xl">
              Ideal Trips in {seasonRange}
            </h2>
            <p className="mt-2 text-sm text-slate-500 max-w-md">
              Handpicked premium journeys optimized for the current climate, local events, and perfect travel weather.
            </p>
          </div>

          <OutlineButton to="/packages" label="Explore All Packages" />
        </div>

        {/* Content grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[1, 2, 3, 4].map((num) => (
              <PackageSkeleton key={num} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-rose-500 w-full border border-dashed border-rose-200 rounded-3xl bg-rose-50/10">
            <h3 className="text-lg font-semibold mb-1 font-display uppercase tracking-tight">Failed to load seasonal trips</h3>
            <p className="text-xs text-rose-400 max-w-xs">{error}</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-sm">No packages currently matching this season.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {packages.map((pkg) => (
              <div key={pkg.id} className="h-full relative group">
                <PackageCard pkg={pkg} badge={`Best in ${currentMonth}`} hideBookNow={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SeasonalSuggestionsSection;
