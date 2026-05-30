import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getImage } from "@/lib/images";
import OutlineButton from "@/components/ui/OutlineButton";
import destinationsData from "@/data/destinations.json";

const destinations = destinationsData.map(dest => ({
  ...dest,
  image: getImage(dest.image)
}));

const DestinationsSection = () => {
  return (
    <section className="py-24 section-padding">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="section-label mb-3 block">Popular Destinations</span>
          <h2 className="section-title">
            Pick the <span className="text-gradient">Place</span>
          </h2>
        </div>
        <OutlineButton to="/packages" label="See All Destinations" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={`/packages/${dest.id}`} className="group block">
              <div className="card-elevated">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`${dest.name}, ${dest.country}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,hsl(var(--deep-charcoal)/0.6)_0%,transparent_50%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-lg md:text-2xl font-display font-bold text-card">{dest.name}</h3>
                    <p className="text-card/70 font-body text-xs md:text-sm">{dest.country}</p>
                  </div>
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-card" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DestinationsSection;
