import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";
import { TravelPackage } from "@/data/packages";
import { getImage } from "@/lib/images";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  pkg: TravelPackage;
  badge?: string;
  hideBookNow?: boolean;
}

const PackageCard = ({ pkg, badge, hideBookNow }: PackageCardProps) => {
  return (
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
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%]">
            {badge && (
              <span className="bg-white text-slate-900 border border-slate-100 shadow-[0_2px_6px_rgba(0,0,0,0.08)] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {badge}
              </span>
            )}
            {pkg.highlights.slice(0, badge ? 1 : 2).map((hl, idx) => (
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
              {pkg.title}
            </h3>
            {pkg.rating >= 4.9 && (
              <span className="flex-shrink-0 border border-slate-200/80 bg-slate-50 text-slate-600 rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-wide uppercase mt-1">
                Top rated
              </span>
            )}
          </div>

          <p className="text-slate-400 font-body text-[10px] mb-3 uppercase tracking-wider font-bold">
            {pkg.duration} • {pkg.location}
          </p>

          <p className="text-slate-500 font-body text-xs md:text-sm line-clamp-2 leading-relaxed mb-5 min-h-[2.5rem]">
            {pkg.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
            <div>
              <span className="font-body text-lg font-extrabold text-slate-900">
                ₹{pkg.price.toLocaleString()}
              </span>
            </div>

            {!hideBookNow && (
              <div className="bg-black text-white hover:bg-slate-900 text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-1.5 group/btn cursor-pointer lg:opacity-0 lg:group-hover:opacity-100 lg:translate-x-2 lg:group-hover:translate-x-0 transition-all duration-500 ease-out transform-gpu">
                <span>Book Now</span>
                <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
