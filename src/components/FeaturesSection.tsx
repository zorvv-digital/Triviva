import { images } from "@/lib/images";
import featuresData from "@/data/features.json";
import { useInView } from "@/hooks/useInView";

const FeaturesSection = () => {
  const { ref: labelRef, isVisible: labelVisible } = useInView<HTMLSpanElement>();
  const { ref: headingRef, isVisible: headingVisible } = useInView<HTMLHeadingElement>();
  const { ref: listRef, isVisible: listVisible } = useInView<HTMLDivElement>({ rootMargin: "-30px" });
  const { ref: mosaicRef, isVisible: mosaicVisible } = useInView<HTMLDivElement>();

  return (
    <section
      style={{
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, #faf7f2 15%, #faf7f2 85%, hsl(var(--background)) 100%)"
      }}
      className="py-10 md:py-16 relative overflow-hidden"
    >
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="section-padding max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* Left — Editorial content */}
          <div className="lg:col-span-6">
            <span
              ref={labelRef}
              className={`reveal${labelVisible ? " is-visible" : ""} text-[10px] font-bold uppercase tracking-[0.25em] text-amber-600 mb-2 md:mb-4 block`}
            >
              What makes us different
            </span>

            <h2
              ref={headingRef}
              className={`reveal${headingVisible ? " is-visible" : ""} text-4xl sm:text-5xl font-display font-black text-slate-900 leading-[1.05] mb-6 md:mb-12`}
              style={{ transitionDelay: "0.1s" }}
            >
              Every detail,<br />
              <span className="text-gradient">carefully considered</span>
            </h2>

            {/* Numbered editorial list */}
            <div ref={listRef} className="divide-y divide-slate-200/80">
              {featuresData.map((feat, i) => (
                <div
                  key={feat.title}
                  className={`reveal${listVisible ? " is-visible" : ""} group flex gap-4 md:gap-6 py-4 md:py-7 hover:bg-amber-50/40 -mx-4 px-4 rounded-xl transition-colors duration-300 cursor-default`}
                  style={{ transitionDelay: listVisible ? `${0.08 * i}s` : "0s" }}
                >
                  <span className="text-[11px] font-bold tabular-nums text-amber-500/70 mt-1 w-5 md:w-6 shrink-0 group-hover:text-amber-600 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-base leading-snug mb-1.5 group-hover:text-slate-950 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image mosaic */}
          <div className="lg:col-span-6 relative lg:pt-20">
            <div className="absolute inset-0 rounded-[3rem] border border-dashed border-slate-200/80 pointer-events-none scale-105" />

            <div
              ref={mosaicRef}
              className={`reveal-scale${mosaicVisible ? " is-visible" : ""} relative z-10`}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="img-curved-lg aspect-[3/4] shadow-md hover:scale-[1.01] transition-transform duration-500 transform-gpu">
                    <img src={images.iceland} alt="Iceland adventure" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                  <div className="img-curved aspect-square shadow-sm hover:scale-[1.01] transition-transform duration-500 transform-gpu">
                    <img src={images.japan} alt="Japan culture" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="img-curved aspect-square shadow-sm hover:scale-[1.01] transition-transform duration-500 transform-gpu">
                    <img src={images.santorini} alt="Greece views" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                  <div className="img-curved-lg aspect-[3/4] shadow-md hover:scale-[1.01] transition-transform duration-500 transform-gpu">
                    <img src={images.maldives} alt="Luxury escape" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
