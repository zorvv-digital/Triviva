import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { packages } from "@/data/packages";
import { getImage } from "@/lib/images";

const Packages = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-8 section-padding">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-label mb-4 block"
        >
          Our Packages
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="section-title mb-4"
        >
          Handcrafted <span className="text-gradient">Journeys</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground font-body max-w-xl mb-12"
        >
          Every package is designed by locals who know the hidden paths. Pick your adventure.
        </motion.p>
      </section>

      <section className="pb-24 section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link to={`/packages/${pkg.id}`} className="group block">
                <div className="card-elevated">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={getImage(pkg.image)}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                      <span className="font-body text-xs font-semibold text-foreground">{pkg.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="font-body text-xs">{pkg.location}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-body text-xs">{pkg.duration}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground font-body">from </span>
                        <span className="font-body text-lg font-bold text-primary">₹{pkg.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-primary font-body text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
