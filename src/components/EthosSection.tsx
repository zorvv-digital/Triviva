import { useInView } from "@/hooks/useInView";

const EthosSection = () => {
  const { ref: quoteRef, isVisible: quoteVisible } = useInView<HTMLParagraphElement>({ rootMargin: "-100px" });
  const { ref: dividerRef, isVisible: dividerVisible } = useInView<HTMLDivElement>({ rootMargin: "-100px" });

  return (
    <section
      className="py-16 md:py-24 bg-transparent"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 400px" }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p
          ref={quoteRef}
          className={`reveal${quoteVisible ? " is-visible" : ""} font-display text-2xl md:text-3xl lg:text-4xl font-medium text-[#111827] leading-tight tracking-tight`}
          style={{ transitionDuration: "0.7s" }}
        >
          "We believe travel is the ultimate catalyst for transformation.{" "}
          Our mission is to handcraft profoundly personal experiences that{" "}
          connect you to the soul of the world."
        </p>
        <div
          ref={dividerRef}
          className={`reveal-fade${dividerVisible ? " is-visible" : ""} mt-8 flex items-center justify-center gap-4`}
          style={{ transitionDelay: "0.3s" }}
        >
          <div className="w-12 h-px bg-[#ea580c]/30" />
          <span className="font-body text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-semibold">The Triviva Promise</span>
          <div className="w-12 h-px bg-[#ea580c]/30" />
        </div>
      </div>
    </section>
  );
};

export default EthosSection;
