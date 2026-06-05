import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FloatingPackagesButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <div className={`float-btn${isVisible ? " is-visible" : ""} fixed bottom-6 right-6 z-50 md:bottom-10 md:right-10`}>
      <Link
        to="/packages"
        className="flex items-center gap-2 bg-white text-slate-900 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-950 font-body font-bold text-sm px-6 py-3.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group"
      >
        <span>View Packages</span>
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default FloatingPackagesButton;
