import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import heroImage from "@/assets/hero.webp";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling when splash screen is visible
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    let hasCompleted = false;

    const completeSplash = () => {
      if (hasCompleted) return;
      hasCompleted = true;
      setVisible(false);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      setTimeout(() => {
        // Restore scrolling when exit animation is finished
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        onComplete();
      }, 1500); // give time for the exit animation
    };

    const startTime = Date.now();
    const minDelay = 2500; // minimum duration for splash branding animations
    const maxDelay = 5000; // maximum splash screen duration

    // 1. Force completion after max delay
    const maxTimer = setTimeout(completeSplash, maxDelay);

    // 2. Preload the hero image
    const img = new Image();

    const handleImageLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDelay - elapsed);
      // Wait for minDelay if image loads extremely fast, otherwise complete immediately
      setTimeout(completeSplash, remainingTime);
    };

    img.onload = handleImageLoad;
    img.onerror = handleImageLoad; // fallback to complete splash anyway if it fails
    img.src = heroImage;

    return () => {
      clearTimeout(maxTimer);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fff7f2] overflow-hidden"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ 
            clipPath: "circle(0% at 50% 50%)", 
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Ambient organic colored glows in the background */}
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#860d7d] blur-[130px] opacity-[0.05] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#f8a511] blur-[130px] opacity-[0.05] pointer-events-none" />

          {/* Subtle Grain Overlay (Optional, for texture) */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")' }} />
  
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="overflow-hidden p-2">
              <motion.img
                src="/assets/Logo.webp"
                alt="Triviva Logo"
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                className="h-20 md:h-24 w-auto object-contain"
              />
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "-150%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-[#860d7d] via-[#db4b2e] to-[#f8a511] font-body text-xs md:text-sm tracking-[0.4em] uppercase font-bold text-center"
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
