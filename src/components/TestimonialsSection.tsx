import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

import testimonials from "@/data/testimonials.json";

const TestimonialsSection = () => {
  return (
    <section className="py-24 section-padding overflow-hidden">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-3 inline-block"
        >
          Testimonials
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-title"
        >
          What Travelers <span className="text-gradient">Say</span>
        </motion.h2>
      </div>

      <div className="relative flex overflow-hidden group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
          className="flex whitespace-nowrap gap-6 w-max"
        >
          {/* Double array length to ensure smooth infinitely looping marquee */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="card-elevated p-8 flex flex-col whitespace-normal w-[350px] md:w-[400px] flex-shrink-0"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-foreground/80 font-body text-sm md:text-base leading-relaxed flex-1 mb-6">
                "{t.text}"
              </p>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-body text-sm font-semibold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
