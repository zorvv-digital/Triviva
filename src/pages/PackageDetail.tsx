import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Star, Clock, MapPin, Check, Plane, Hotel, 
  Utensils, Camera, Map, Car, Compass, Calendar, ShieldCheck, Wifi, Coffee,
  Bus, Train, Ship, Bike, Home, Tent, Wine, Ticket, Activity, 
  Footprints, Mountain, Sun, Palmtree, Waves, Binoculars, Phone, Languages, 
  UserCheck, CreditCard
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TravelPackageDetail } from "@/data/packages";
import { getImage } from "@/lib/images";
import { useOfferInfo } from "@/hooks/useOfferInfo";
import PackageBookingModal from "@/components/packages/PackageBookingModal";

const iconMap = {
  plane: Plane,
  hotel: Hotel,
  utensils: Utensils,
  camera: Camera,
  check: Check,
  map: Map,
  car: Car,
  compass: Compass,
  calendar: Calendar,
  shield: ShieldCheck,
  wifi: Wifi,
  coffee: Coffee,
  bus: Bus,
  train: Train,
  ship: Ship,
  bicycle: Bike,
  tram: Train,
  home: Home,
  tent: Tent,
  wine: Wine,
  ticket: Ticket,
  activity: Activity,
  footprints: Footprints,
  mountain: Mountain,
  sun: Sun,
  palmtree: Palmtree,
  waves: Waves,
  binoculars: Binoculars,
  phone: Phone,
  languages: Languages,
  guide: UserCheck,
  payment: CreditCard
};

const includedIcons = [Plane, Hotel, Utensils, Camera, Check];

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState<TravelPackageDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { getPackageOffer, getDiscountedPrice } = useOfferInfo();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/packages");
    }
  };

  const pkgOffer = details ? getPackageOffer(details.id) : null;
  const discountedPrice = details ? getDiscountedPrice(details.id, details.price) : null;

  useEffect(() => {
    if (!id) return;
    
    // Strip trailing '-2' from duplicated package keys to load correct JSON file
    const baseId = id.replace("-2", "");
    
    setLoading(true);
    setError(null);
    fetch(`/data/packages/packages_json/${baseId}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Package Not Found");
        return res.json();
      })
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading package details:", err);
        setError(err.message || "Failed to load package");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfaf8]">
        <Navbar />
        {/* Hero Area Skeleton */}
        <div className="relative h-[70vh] min-h-[500px] bg-slate-200/60 animate-pulse flex flex-col justify-end section-padding pb-12">
          <div className="h-4 bg-slate-300/60 rounded-full w-24 mb-6" />
          <div className="h-12 bg-slate-300/60 rounded-2xl w-2/3 mb-4" />
          <div className="flex gap-4">
            <div className="h-5 bg-slate-300/60 rounded-full w-32" />
            <div className="h-5 bg-slate-300/60 rounded-full w-20" />
          </div>
        </div>

        {/* Content Area Skeleton */}
        <div className="py-16 section-padding max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-200/80 rounded-xl w-48" />
              <div className="h-4 bg-slate-200/80 rounded-md w-full" />
              <div className="h-4 bg-slate-200/80 rounded-md w-11/12" />
              <div className="h-4 bg-slate-200/80 rounded-md w-3/4" />
            </div>

            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-slate-200/80 rounded-xl w-36" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="h-16 bg-slate-200/50 rounded-2xl" />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="animate-pulse bg-white rounded-[2rem] p-8 border border-slate-100 space-y-6">
              <div className="h-4 bg-slate-200 w-24" />
              <div className="h-10 bg-slate-200 rounded-xl w-44" />
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                <div className="h-4 bg-slate-200 rounded-md w-2/3" />
                <div className="h-4 bg-slate-200 rounded-md w-4/5" />
              </div>
              <div className="h-12 bg-slate-200 rounded-full w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Package Not Found</h1>
          <Link to="/packages" className="btn-primary-travel">
            <ArrowLeft className="w-4 h-4" /> Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px]">
        <img
          src={getImage(details.image)}
          alt={details.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.3) 40%, transparent 60%)"
        }} />
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-12">
          <button onClick={handleBack} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] mb-6 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to Packages
          </button>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-foreground mb-3"
          >
            {details.title}
          </motion.h1>
          <div className="flex flex-wrap items-center gap-6 text-foreground/70 font-body text-sm">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" /> {details.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" /> {details.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-primary text-primary" /> {details.rating}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">About the Tour</h2>
              <div className="space-y-4">
                {details.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground font-body leading-relaxed md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-body text-sm text-foreground">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-10">Itinerary</h2>
              <div className="flex flex-col gap-6 md:gap-8">
                {details.itinerary.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="flex gap-4 md:gap-8"
                  >
                    <div className="relative flex flex-col items-center min-w-[24px] md:min-w-[32px]">
                      <div className="w-3 h-3 mt-8 rounded-full bg-primary ring-[6px] ring-primary/20 z-10" />
                      {i !== details.itinerary.length - 1 && (
                        <div className="absolute top-14 bottom-[-24px] md:bottom-[-32px] w-[1.5px] bg-primary/30" />
                      )}
                    </div>
                    
                    <div className="flex-1 bg-[#faf8f5] rounded-3xl p-6 md:p-8 border border-slate-200/60 transition-all duration-500 hover:bg-white hover:border-primary/30 hover:translate-x-1">
                      <span className="text-primary font-body text-xs md:text-sm font-bold uppercase tracking-[0.15em] mb-2 block">
                        {step.day}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-[#111827] mb-3">
                        {step.title}
                      </h3>
                      <p className="text-[#6b7280] font-body text-sm md:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Gallery</h2>
              <div className="grid grid-cols-3 gap-4">
                {details.gallery.map((img, i) => (
                  <div key={i} className="img-curved aspect-square">
                    <img src={getImage(img)} alt={`${details.title} gallery ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1 lg:h-full relative">
            <div className="lg:sticky lg:top-28 z-30">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-elevated p-8"
              >
                <div className="mb-6">
                  <span className="text-muted-foreground font-body text-sm">Starting from</span>
                  {discountedPrice ? (
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400 line-through font-body font-medium">
                          ₹{details.price.toLocaleString()}
                        </span>
                        <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                          {pkgOffer?.discountPercentage}% OFF
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-body font-bold text-primary">
                          ₹{discountedPrice.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground font-body text-sm">/ person</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-body font-bold text-primary">
                        ₹{details.price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground font-body text-sm">/ person</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="font-display font-semibold text-foreground">What's Included</h3>
                  {details.included.map((item, i) => {
                    const isObject = typeof item === "object" && item !== null;
                    const text = isObject ? item.text : item;
                    const iconKey = isObject ? item.icon : "";
                    
                    const IconComponent = isObject 
                      ? (iconMap[iconKey as keyof typeof iconMap] || Check) 
                      : (includedIcons[i % includedIcons.length] || Check);

                    return (
                      <div key={i} className="flex items-center gap-3">
                        <IconComponent className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-body text-sm text-foreground/80">{text}</span>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="btn-primary-travel w-full mb-3 text-center cursor-pointer"
                >
                  Book This Trip
                </button>
                <Link to={`/contact?package=${encodeURIComponent(details.title)}&ask=1`} className="btn-outline-travel w-full text-center text-sm">
                  Ask a Question
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <PackageBookingModal
        pkg={details}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        price={discountedPrice ?? details.price}
      />

      <Footer />
    </div>
  );
};

export default PackageDetail;
