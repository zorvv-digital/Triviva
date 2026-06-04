import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info, CheckCircle2, ShieldCheck, Clock, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VehicleCard, { Vehicle } from "@/components/rentals/VehicleCard";
import RentalBookingModal from "@/components/rentals/RentalBookingModal";
import FilterTabs from "@/components/ui/FilterTabs";
import CTASection from "@/components/CTASection";

const Rentals = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/vehicles/vehicles.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load vehicles/fleet data.");
        }
        return res.json();
      })
      .then((data: Vehicle[]) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading vehicles:", err);
        setError(err.message || "An error occurred while fetching vehicles.");
        setLoading(false);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "coach" | "minibus">("all");
  
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.amenities.some((amenity) =>
        amenity.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesType = selectedType === "all" || vehicle.type === selectedType;

    return matchesSearch && matchesType;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => a.priority - b.priority);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Fleet Showcase Section */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-16 max-w-7xl mx-auto w-full section-padding">
        {/* Title Header */}
        <div className="mb-6 md:mb-10 border-b border-black/[0.03] pb-4 md:pb-8">
          <span className="section-label mb-2 block text-xs md:text-sm">Our Fleet</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-foreground">
            Premium Fleet & <span className="text-gradient">Rentals</span>
          </h1>
        </div>

        {/* Search & Filter Header */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-4 mb-6 md:mb-10 pb-4 md:pb-6 border-b border-black/[0.03]">
          {/* Tabs Filter */}
          <FilterTabs
            options={[
              { value: "all", label: "All Fleet" },
              { value: "coach", label: "Luxury Coaches" },
              { value: "minibus", label: "Mini Buses" },
            ]}
            selectedValue={selectedType}
            onChange={(val) => setSelectedType(val)}
          />

          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by vehicle name or amenities..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-full text-sm outline-none focus:border-primary transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Feature Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm animate-pulse h-[450px]">
                <div className="w-full aspect-[16/10] bg-slate-200 rounded-2xl mb-4" />
                <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-4" />
                <div className="h-4 bg-slate-200 rounded-full w-full mb-2" />
                <div className="h-4 bg-slate-200 rounded-full w-5/6 mb-4" />
                <div className="h-8 bg-slate-200 rounded-full w-full mt-auto" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-rose-500 bg-rose-50/10 border border-dashed border-rose-200 rounded-3xl">
            <p className="font-semibold">Unable to load fleet database</p>
            <p className="text-xs text-rose-400 mt-1">{error}</p>
          </div>
        ) : sortedVehicles.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-white border border-dashed border-slate-200 rounded-3xl">
            <p className="font-semibold text-lg text-slate-800">No vehicles found</p>
            <p className="text-sm text-slate-400 mt-1">Try broadening your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {sortedVehicles.map((vehicle) => (
                <motion.div
                  layout
                  key={vehicle.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <VehicleCard vehicle={vehicle} onRentClick={handleOpenModal} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Why Rent From Us Section */}
      <section className="py-32 section-padding bg-primary/5 border-t border-black/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label mb-3 block">The Triviva Experience</span>
            <h2 className="section-title">Why Choose Our <span className="text-gradient">Rentals?</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[2rem] p-10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 border border-black/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 relative z-10">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#111827] mb-4">Fully Certified & Safe</h3>
              <p className="text-[#6b7280] font-body text-base leading-relaxed">
                All vehicles undergo strict cleaning and safety protocols before every trip. Regular mechanical audits ensure zero breakdowns.
              </p>
            </div>

            <div className="bg-white rounded-[2rem] p-10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 border border-black/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 relative z-10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#111827] mb-4">Professional Chauffeurs</h3>
              <p className="text-[#6b7280] font-body text-base leading-relaxed">
                Experienced, licensed, and uniformly dressed drivers with deep route knowledge to make your tour stress-free.
              </p>
            </div>

            <div className="bg-white rounded-[2rem] p-10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 border border-black/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 relative z-10">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#111827] mb-4">24/7 Roadside Support</h3>
              <p className="text-[#6b7280] font-body text-base leading-relaxed">
                Our support team is available round the clock. We guarantee a replacement vehicle immediately in case of unexpected delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <RentalBookingModal
        vehicle={selectedVehicle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <CTASection />

      <Footer />
    </div>
  );
};

export default Rentals;
