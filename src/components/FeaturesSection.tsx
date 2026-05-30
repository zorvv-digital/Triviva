import { motion } from "framer-motion";
import { Shield, Compass, Headphones, Sparkles } from "lucide-react";
import { images } from "@/lib/images";
import featuresData from "@/data/features.json";

const iconMap = {
  Compass,
  Shield,
  Headphones,
  Sparkles,
};

const features = featuresData.map(feat => ({
  ...feat,
  icon: iconMap[feat.icon as keyof typeof iconMap] || Compass,
}));

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-soft-cream">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label mb-3 block"
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="section-title mb-12"
            >
              Not Your Ordinary
              <br />
              <span className="text-gradient">Travel Agency</span>
            </motion.h2>

            <div className="space-y-10">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i, duration: 0.5 }}
                  className="flex gap-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#fef5f0] flex items-center justify-center flex-shrink-0">
                    <feat.icon className="w-6 h-6 text-[#ef6b26]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#1f2937] mb-2">{feat.title}</h3>
                    <p className="text-[#6b7280] font-body md:text-base text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="img-curved-lg aspect-[3/4]">
                  <img src={images.sahara} alt="Desert adventure" className="w-full h-full object-cover" />
                </div>
                <div className="img-curved aspect-square">
                  <img src={images.japan} alt="Japan culture" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="img-curved aspect-square">
                  <img src={images.santorini} alt="Greece views" className="w-full h-full object-cover" />
                </div>
                <div className="img-curved-lg aspect-[3/4]">
                  <img src={images.maldives} alt="Luxury escape" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
