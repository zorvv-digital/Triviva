import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
import { useInView } from "@/hooks/useInView";

const CTASection = () => {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section
      className="py-10 md:py-16 section-padding"
    >
      <div
        ref={ref}
        className={`reveal${isVisible ? " is-visible" : ""} relative rounded-[2.5rem] overflow-hidden min-h-[400px] flex items-center`}
        style={{ transitionDuration: "0.8s" }}
      >
        <img
          src={images.about}
          alt="Adventure awaits"
          loading="lazy"
          decoding="async"
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
            <Link to="/contact" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-body font-bold text-sm rounded-full transition-all duration-500 border border-white/20 text-white bg-transparent hover:bg-white hover:text-slate-900 hover:scale-[1.02] transform-gpu">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
