import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BrandStorySection = () => {
  return (
    <section className="py-12 md:py-24 bg-[#fdfaf7] border-y border-black/[0.03]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">
          
          {/* Left Column: Heading and Brand legacy details */}
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-label mb-2 block"
            >
              Our Heritage
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-display font-bold leading-tight text-[#111827] mb-4 lg:mb-6"
            >
              The Story of <br />
              <span className="text-gradient">Triviva</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 h-1 bg-primary/20 rounded-full mb-4 lg:mb-0"
            />
          </div>

          {/* Right Column: Simple professional story description & CTA */}
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            {/* Mobile-friendly combined text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-700 font-body text-base md:text-lg leading-relaxed md:hidden"
            >
              Our journey began in 2016 as Triviva Trip Advisor. Today, we are proud to continue this legacy as Triviva Holidays, designing custom itineraries that connect you to authentic local cultures and handpicked destinations.
            </motion.p>

            {/* Desktop version (original paragraph 1) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-700 font-body text-base md:text-lg leading-relaxed hidden md:block"
            >
              Our journey began in 2016 as Triviva Trip Advisor, built on a simple promise: to help travelers discover the world through meaningful, personal journeys. 
            </motion.p>
            
            {/* Desktop version (original paragraph 2) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-600 font-body text-sm md:text-base leading-relaxed hidden md:block"
            >
              Over the years, our brand has grown and evolved. Today, we are proud to continue this legacy as Triviva Holidays. We craft custom itineraries that connect you directly with local cultures, authentic traditions, and handpicked destinations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2 md:pt-4"
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-body font-bold text-sm hover:gap-3 transition-all duration-300"
              >
                Read our full story <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;
