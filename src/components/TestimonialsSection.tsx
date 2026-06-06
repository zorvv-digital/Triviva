import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  avatar: string;
  text: string;
  rating: number;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/data/testimonials.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load testimonials");
        return res.json();
      })
      .then((data: Testimonial[]) => {
        setTestimonials(data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (testimonials.length === 0) return null;

  // We duplicate the list to ensure seamless looping in the marquee
  const marqueeList = [...testimonials, ...testimonials];

  return (
    <section
      style={{
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, #faf7f2 15%, #faf7f2 85%, hsl(var(--background)) 100%)"
      }}
      className="py-16 md:py-24 overflow-hidden w-full relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-32 mb-12 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-600 mb-2 block">
          Client Stories
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 leading-tight">
          What our travelers <span className="text-gradient">are saying</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Left & Right gradient overlays for smooth fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#faf7f2] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#faf7f2] to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-6 w-max hover:[animation-play-state:paused]"
          style={{
            animation: "marquee 45s linear infinite",
          }}
        >
          {marqueeList.map((t, idx) => (
            <div
              key={`${t.name}-${idx}`}
              className="w-[310px] sm:w-[350px] md:w-[380px] shrink-0 bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(249,115,22,0.06)]"
            >
              <div className="space-y-4">
                <div className="flex justify-start">
                  <Quote className="w-10 h-10 text-orange-500/25 stroke-[2] fill-none" />
                </div>
                <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed text-left">
                  "{t.text}"
                </p>
              </div>

              <div className="space-y-4 mt-6">
                {/* Rating */}
                <div className="flex gap-1 justify-start">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-orange-500 text-orange-500 stroke-orange-500"
                    />
                  ))}
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs shrink-0">
                    {t.avatar}
                  </div>
                  <span className="font-semibold text-slate-800 text-sm sm:text-base font-sans">
                    {t.name}
                  </span>
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
