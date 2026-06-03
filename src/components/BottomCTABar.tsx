import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

const variants = {
  expanded: {
    width: 220,
    height: 38,
    borderRadius: "9999px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingLeft: "10px",
    paddingRight: "4px",
  },
  collapsed: {
    width: 44,
    height: 44,
    borderRadius: "9999px",
    backgroundColor: "rgb(234, 88, 12)",
    paddingLeft: "0px",
    paddingRight: "0px",
  },
};

export default function BottomCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          variants={variants}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isCollapsed ? "collapsed" : "expanded"}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          onClick={isCollapsed ? () => setIsCollapsed(false) : undefined}
          className={`fixed bottom-6 right-6 z-50 cursor-pointer select-none shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex items-center overflow-hidden backdrop-blur-xl border transition-colors duration-300 ${
            isCollapsed ? "border-orange-500/20 text-white" : "border-slate-200/80 text-slate-800"
          }`}
          style={{ boxSizing: "border-box" }}
        >
          {isCollapsed ? (
            <motion.div
              key="collapsed-content"
              layout="position"
              className="relative flex items-center justify-center w-full h-full"
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="expanded-content"
              layout="position"
              className="flex items-center justify-between gap-1 w-full"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-[#ea580c]/10 flex items-center justify-center flex-shrink-0 border border-[#ea580c]/15">
                  <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
                </div>
                <div className="text-left">
                  <p className="font-display font-bold text-[10.5px] text-slate-900 tracking-tight leading-none">Packages</p>
                </div>
              </div>

              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <Link
                  to="/packages"
                  className="bg-[#ea580c] hover:bg-[#d94e06] text-white text-[9.5px] font-body font-bold px-2.5 py-1 rounded-full flex items-center gap-0.5 transition-all duration-300 hover:shadow-sm transform hover:-translate-y-0.5"
                >
                  View <ArrowRight className="w-2.5 h-2.5" />
                </Link>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(true);
                  }}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
                  aria-label="Collapse banner"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
