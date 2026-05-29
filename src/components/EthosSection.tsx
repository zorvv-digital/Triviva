import { motion } from "framer-motion";

const EthosSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white/50 border-y border-black/[0.03]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-[#111827] leading-tight tracking-tight"
        >
          "We believe travel is the ultimate catalyst for transformation. 
          Our mission is to handcraft profoundly personal experiences that 
          connect you to the soul of the world."
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
            <div className="w-12 h-px bg-[#ea580c]/30" />
            <span className="font-body text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-semibold">The Voyago Promise</span>
            <div className="w-12 h-px bg-[#ea580c]/30" />
        </motion.div>
      </div>
    </section>
  );
};

export default EthosSection;
