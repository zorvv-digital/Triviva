import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { useInView } from "@/hooks/useInView";

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { ref: labelRef, isVisible: labelVisible } = useInView<HTMLSpanElement>();
  const { ref: headingRef, isVisible: headingVisible } = useInView<HTMLHeadingElement>();

  useEffect(() => {
    fetch("/data/testimonials.json")
      .then((res) => res.json())
      .then((data: Testimonial[]) => setTestimonials(data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  if (testimonials.length === 0) {
    return null;
  }
  return (
    <section
      className="py-12 md:py-16 section-padding overflow-hidden"
    >
      <div className="text-center mb-10">
        <span className="section-label mb-3 inline-block">
          Testimonials
        </span>
        <h2 className="section-title">
          What Travelers <span className="text-gradient">Say</span>
        </h2>
      </div>

      <div className="relative flex overflow-hidden group">
        <div
          className="flex whitespace-nowrap gap-6 w-max"
          style={{ animation: "marquee 30s linear infinite", willChange: "transform" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="bg-card rounded-3xl overflow-hidden p-8 flex flex-col whitespace-normal w-[350px] md:w-[400px] flex-shrink-0 shadow-[0_4px_30px_-8px_rgba(17,24,39,0.08)] border border-slate-100/50"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
