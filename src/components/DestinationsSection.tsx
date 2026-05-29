import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/lib/images";

const destinations = [
  { name: "Santorini", country: "Greece", image: images.santorini, id: "santorini-escape" },
  { name: "Kyoto", country: "Japan", image: images.japan, id: "japan-cultural" },
  { name: "Bali", country: "Indonesia", image: images.bali, id: "bali-retreat" },
  { name: "Maldives", country: "Indian Ocean", image: images.maldives, id: "maldives-luxury" },
  { name: "Swiss Alps", country: "Switzerland", image: images.swiss, id: "swiss-alpine" },
  { name: "Sahara", country: "Morocco", image: images.sahara, id: "sahara-odyssey" },
];

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
        <Link to="/packages" className="btn-outline-travel text-sm self-start md:self-auto">
          See All Destinations <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(to top, hsl(var(--deep-charcoal) / 0.6) 0%, transparent 50%)"
                  }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-display font-bold text-card">{dest.name}</h3>
                    <p className="text-card/70 font-body text-sm">{dest.country}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-card" />
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
