import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, MapPin, Check, Plane, Hotel, Utensils, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { packages } from "@/data/packages";
import { getImage } from "@/lib/images";

const includedIcons = [Plane, Hotel, Utensils, Camera, Check];

const PackageDetail = () => {
  const { id } = useParams();
  const pkg = packages.find((p) => p.id === id);

  if (!pkg) {
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
          src={getImage(pkg.image)}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.3) 40%, transparent 60%)"
        }} />
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-12">
          <Link to="/packages" className="inline-flex items-center gap-2 text-foreground/60 font-body text-sm mb-6 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Packages
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-foreground mb-3"
          >
            {pkg.title}
          </motion.h1>
          <div className="flex flex-wrap items-center gap-6 text-foreground/70 font-body text-sm">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" /> {pkg.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" /> {pkg.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-primary text-primary" /> {pkg.rating}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
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
                {pkg.description.split('\n\n').map((paragraph, index) => (
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
                {pkg.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-body text-sm text-foreground">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Itinerary - Timeline inspired by Japan tour image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-10">Itinerary</h2>
              <div className="flex flex-col gap-6 md:gap-8">
                {pkg.itinerary.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="flex gap-4 md:gap-8"
                  >
                    <div className="relative flex flex-col items-center min-w-[24px] md:min-w-[32px]">
                      <div className="w-3 h-3 mt-8 rounded-full bg-[#ea580c] ring-[6px] ring-[#ea580c]/20 z-10" />
                      {i !== pkg.itinerary.length - 1 && (
                        <div className="absolute top-14 bottom-[-24px] md:bottom-[-32px] w-[1.5px] bg-[#ea580c]/30" />
                      )}
                    </div>
                    
                    <div className="flex-1 bg-white rounded-3xl p-6 md:p-8 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 border border-black/[0.02]">
                      <span className="text-[#ea580c] font-body text-xs md:text-sm font-bold uppercase tracking-[0.15em] mb-2 block">
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
                {pkg.gallery.map((img, i) => (
                  <div key={i} className="img-curved aspect-square">
                    <img src={getImage(img)} alt={`${pkg.title} gallery ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-elevated p-8"
              >
                <div className="mb-6">
                  <span className="text-muted-foreground font-body text-sm">Starting from</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-body font-bold text-primary">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground font-body text-sm">/ person</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="font-display font-semibold text-foreground">What's Included</h3>
                  {pkg.included.map((item, i) => (
                    <div key={item} className="flex items-center gap-3">
                      {(() => {
                        const Icon = includedIcons[i % includedIcons.length];
                        return <Icon className="w-4 h-4 text-primary flex-shrink-0" />;
                      })()}
                      <span className="font-body text-sm text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact" className="btn-primary-travel w-full mb-3 text-center">
                  Book This Trip
                </Link>
                <Link to="/contact" className="btn-outline-travel w-full text-center text-sm">
                  Ask a Question
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PackageDetail;
