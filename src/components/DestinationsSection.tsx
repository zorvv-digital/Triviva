import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import OutlineButton from "@/components/ui/OutlineButton";
import { TravelPackage } from "@/data/packages";
import { useInView } from "@/hooks/useInView";

const DestinationsSection = () => {
  const { data: packages = [] } = useQuery<TravelPackage[]>({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await fetch("/data/packages/packages.json");
      if (!res.ok) throw new Error("Failed to load destinations");
      return res.json() as Promise<TravelPackage[]>;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { ref: gridRef, isVisible: gridVisible } = useInView<HTMLDivElement>({ rootMargin: "-50px" });

  const destinations = useMemo(() => {
    if (!packages.length) return [];
    const sorted = [...packages].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    const intl = sorted.filter((pkg) => pkg.region === "international").slice(0, 3);
    const dom = sorted.filter((pkg) => pkg.region === "domestic").slice(0, 3);
    return [...intl, ...dom].slice(0, 6).map((pkg) => {
      const parts = pkg.location.split(",");
      return {
        id: pkg.id,
        name: parts[0]?.trim() || pkg.title,
        country: parts[1]?.trim() || "",
        image: pkg.image,
      };
    });
  }, [packages]);

  return (
    <section
      className="py-24 section-padding"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="section-label mb-3 block">Popular Destinations</span>
          <h2 className="section-title">
            Pick the <span className="text-gradient">Place</span>
          </h2>
        </div>
        <OutlineButton to="/packages" label="See All Destinations" />
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
      >
        {destinations.map((dest, i) => (
          <div
            key={dest.id}
            className={`reveal${gridVisible ? " is-visible" : ""}`}
            style={{ transitionDelay: gridVisible ? `${i * 0.1}s` : "0s" }}
          >
            <Link to={`/packages/${dest.id}`} className="group block">
              <div className="card-elevated">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`${dest.name}, ${dest.country}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,hsl(var(--deep-charcoal)/0.6)_0%,transparent_50%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-lg md:text-2xl font-display font-bold text-card">{dest.name}</h3>
                    {dest.country && (
                      <p className="text-card/70 font-body text-xs md:text-sm">{dest.country}</p>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-card" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestinationsSection;
