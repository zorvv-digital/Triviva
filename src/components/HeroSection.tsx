import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { images } from "@/lib/images";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end pb-20 pt-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="Tropical paradise beach resort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,1) 100%)"
        }} />
      </div>

      <div className="relative section-padding w-full">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="section-label mb-4 inline-block"
          >
            Explore the World
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground leading-[0.95] mb-6"
          >
            Travel with
            <br />
            <span className="text-gradient">Intention</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-foreground/60 font-body text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
          >
            Discover retreats, active adventures, and boutique stays — all crafted for the mindful explorer.
          </motion.p>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
