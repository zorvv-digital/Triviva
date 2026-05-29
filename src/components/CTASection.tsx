import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

const CTASection = () => {
  return (
    <section className="py-24 section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-[2.5rem] overflow-hidden min-h-[400px] flex items-center"
      >
        <img
          src={images.about}
          alt="Adventure awaits"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, hsl(var(--deep-charcoal) / 0.7), hsl(var(--deep-charcoal) / 0.4))"
        }} />
        <div className="relative p-10 md:p-16 max-w-xl">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-card leading-tight mb-4">
            Ready for your next adventure?
          </h2>
          <p className="text-card/70 font-body mb-8 leading-relaxed">
            Let us craft the journey of a lifetime. From planning to landing, we handle every detail.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/packages" className="btn-primary-travel">
              View Packages <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-outline-travel border-card/30 text-card hover:border-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
