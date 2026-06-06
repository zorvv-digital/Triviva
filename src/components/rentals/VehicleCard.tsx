import { Bus, Users, Star, Check } from "lucide-react";

export interface Vehicle {
  id: string;
  name: string;
  type: "coach" | "minibus";
  capacity: string;
  image: string;
  description: string;
  amenities: string[];
  rating: number;
  priority: number;
  price?: number;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onRentClick: (vehicle: Vehicle) => void;
}

const VehicleCard = ({ vehicle, onRentClick }: VehicleCardProps) => {
  return (
    <div className="bg-white rounded-[2rem] p-4 shadow-[0_2px_5px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 transform-gpu overflow-hidden flex flex-col h-full border border-slate-100/50">
      {/* Image wrapper */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden isolate transform-gpu flex-shrink-0">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />

        {/* Category Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%]">
          <span className="bg-white text-slate-900 border border-slate-100 shadow-[0_2px_6px_rgba(0,0,0,0.08)] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {vehicle.type === "coach" ? "Luxury Coach" : "Executive Traveller"}
          </span>
        </div>

        {/* Rating overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1 text-white text-xs font-bold bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{vehicle.rating}</span>
        </div>
      </div>

      {/* Content area */}
      <div className="pt-5 pb-1 px-1 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-body text-xl font-bold text-slate-900 group-hover:text-slate-950 transition-colors leading-snug">
            {vehicle.name}
          </h3>
        </div>



        {/* Amenities List */}
        <div className="mb-5 mt-auto">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Key Amenities</p>
          <div className="flex flex-wrap gap-1.5">
            {vehicle.amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 border border-slate-100 bg-slate-50 text-slate-600 rounded-full px-2.5 py-1 text-[10px] font-medium"
              >
                <Check className="w-2.5 h-2.5 text-primary" />
                {amenity}
              </span>
            ))}
            {vehicle.amenities.length > 4 && (
              <span className="inline-flex items-center border border-slate-100 bg-slate-50 text-slate-400 rounded-full px-2 py-1 text-[9px] font-bold">
                +{vehicle.amenities.length - 4} More
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Capacity</span>
            <span className="text-base font-black text-slate-900 leading-none mt-0.5">
              {vehicle.capacity}
            </span>
          </div>

          <button
            onClick={() => onRentClick(vehicle)}
            className="bg-black text-white hover:bg-slate-900 text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-300 shadow-sm hover:shadow"
          >
            <span>Inquire Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
