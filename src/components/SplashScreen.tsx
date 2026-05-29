import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Elegant, deliberate pacing
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 1500); // give time for the exit animation
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#ea580c] overflow-hidden"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ 
            clipPath: "circle(0% at 50% 50%)", 
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Subtle Grain Overlay (Optional, for texture) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")' }} />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="overflow-hidden p-2">
              <motion.div
                initial={{ y: "150%", rotate: 5 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="text-6xl md:text-9xl font-display font-medium text-white tracking-tight flex items-center"
              >
                Voya<span className="text-white/70">go</span>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="h-[1px] w-full max-w-[200px] bg-white/30"
            />
            
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "-150%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="text-white/80 font-body text-xs md:text-sm tracking-[0.4em] uppercase font-medium"
              >
                Curated Escapes
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
