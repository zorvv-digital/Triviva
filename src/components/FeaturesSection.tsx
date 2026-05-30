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
    <section className="py-28 bg-[#faf7f2] relative overflow-hidden">
      {/* Decorative background glow blobs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="section-padding max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left - Content */}
          <div className="lg:col-span-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-600 mb-3 block"
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl sm:text-5xl font-display font-black uppercase text-slate-900 tracking-tight leading-none mb-10"
            >
              Not Your Ordinary
              <br />
              <span className="text-gradient">Travel Agency</span>
            </motion.h2>

            {/* Re-designed 2x2 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="bg-white/70 backdrop-blur-md border border-white rounded-[2rem] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  {/* Glowing Icon Wrapper */}
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-5 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <feat.icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  
                  <h3 className="font-body text-base font-bold text-slate-800 mb-2 group-hover:text-slate-950 transition-colors">
                    {feat.title}
                  </h3>
                  
                  <p className="text-slate-500 font-body text-xs sm:text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Image Grid Layout */}
          <div className="lg:col-span-6 relative">
            {/* Glowing circle border overlay */}
            <div className="absolute inset-0 rounded-[3rem] border border-dashed border-slate-200/80 pointer-events-none scale-105" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="img-curved-lg aspect-[3/4] shadow-md hover:scale-[1.01] transition-transform duration-500">
                    <img src={images.sahara} alt="Desert adventure" className="w-full h-full object-cover" />
                  </div>
                  <div className="img-curved aspect-square shadow-sm hover:scale-[1.01] transition-transform duration-500">
                    <img src={images.japan} alt="Japan culture" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="img-curved aspect-square shadow-sm hover:scale-[1.01] transition-transform duration-500">
                    <img src={images.santorini} alt="Greece views" className="w-full h-full object-cover" />
                  </div>
                  <div className="img-curved-lg aspect-[3/4] shadow-md hover:scale-[1.01] transition-transform duration-500">
                    <img src={images.maldives} alt="Luxury escape" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
