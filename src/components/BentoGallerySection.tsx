import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getImage } from "@/lib/images";
import { useInView } from "@/hooks/useInView";

interface RawGalleryItem {
  image: string;
  alt: string;
  className: string;
  title?: string;
  category?: string;
}

interface ProcessedGalleryItem {
  image: string;
  alt: string;
  className: string;
  title?: string;
  category?: string;
}

const BentoGallerySection = () => {
  const [showSection, setShowSection] = useState<boolean>(true);
  const [galleryItems, setGalleryItems] = useState<ProcessedGalleryItem[]>([]);
  const { ref: gridRef, isVisible: gridVisible } = useInView<HTMLDivElement>({ rootMargin: "-50px" });

  useEffect(() => {
    fetch("/data/gallery/gallery.json")
      .then((res) => res.json())
      .then((data: { enabled: boolean; images: RawGalleryItem[] }) => {
        if (data && data.enabled === false) {
          setShowSection(false);
          return;
        }
        const imagesList = data.images || [];
        const processed = imagesList.map((item) => ({
          ...item,
          image: getImage(item.image),
          title: item.title || item.alt.split(",")[0],
          category: item.category || "Destination",
        }));
        setGalleryItems(processed);
      })
      .catch((err) => console.error("Error loading gallery data:", err));
  }, []);

  if (!showSection || galleryItems.length === 0) {
    return null;
  }
  return (
    <section
      className="py-20 md:py-32 bg-brand-light"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-xl">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-4">
              Explore the World
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-brand-primary leading-tight">
              Breathtaking Destinations Await
            </h2>
          </div>
          <Link
            to="/packages"
            className="group flex items-center gap-2 text-brand-primary font-medium hover:text-brand-secondary transition-colors"
          >
            See all destinations
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-4 grid-flow-dense gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]"
        >
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "reveal group relative overflow-hidden rounded-2xl",
                item.className,
                gridVisible ? "is-visible" : ""
              )}
              style={{ transitionDelay: gridVisible ? `${index * 0.08}s` : "0s" }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />

              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20 text-white">
                <span className="text-sm font-medium uppercase tracking-wider text-white/80 mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  {item.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-playfair font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGallerySection;
