import { useState, useEffect } from "react";
import { getImage } from "@/lib/images";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Destination {
  id?: string;
  name: string;
  rating: number;
  details: string;
  image: string;
}

const PerfectDestinationSection = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    fetch("/data/perfect_destinations/perfect_destinations.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch perfect destinations");
        }
        return res.json();
      })
      .then((data: Destination[]) => {
        setDestinations(data);
      })
      .catch((err) => {
        console.error("Error loading perfect destinations:", err);
      });
  }, []);

  return (
    <section
      className="pt-20 pb-10 md:pt-32 md:pb-12 bg-transparent"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-display font-bold text-[#111827] leading-tight mb-4 max-w-3xl">
            Your Journey to the Perfect Destination Begins Here
          </h2>
          <p className="text-gray-500 font-body text-lg max-w-2xl">
            Handpicked destinations that offer unique experiences, stunning landscapes,
            and unforgettable memories.
          </p>
        </div>

        {destinations.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {destinations.map((dest, i) => (
              <Link
                to={dest.id ? `/packages/${dest.id}` : "/packages"}
                key={dest.id || i}
                className="relative group rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer h-[200px] xs:h-[240px] sm:h-[400px] lg:h-[500px] block"
              >
                <img
                  src={getImage(dest.image)}
                  alt={dest.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 w-full p-3 sm:p-6 text-white flex flex-col justify-end">
                  <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#f97316] text-[#f97316]" />
                    <span className="text-xs sm:text-sm font-medium">{dest.rating}</span>
                  </div>
                  <h3 className="text-base sm:text-2xl font-display font-bold mb-0.5 sm:mb-1 leading-tight">
                    {dest.name}
                  </h3>
                  <p className="text-white/80 text-[10px] sm:text-sm font-medium line-clamp-1">
                    {dest.details}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PerfectDestinationSection;
