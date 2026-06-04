import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { getImage } from "@/lib/images";
import { cn } from "@/lib/utils";

import { useNavigate } from "react-router-dom";

interface RawGalleryItem {
  image: string;
  alt: string;
  className: string;
}

const Gallery = () => {
  const navigate = useNavigate();
  const [galleryImages, setGalleryImages] = useState<{ src: string; alt: string; className: string }[]>([]);

  useEffect(() => {
    fetch("/data/gallery/gallery.json")
      .then((res) => res.json())
      .then((data: { enabled: boolean; images: RawGalleryItem[] }) => {
        if (data && data.enabled === false) {
          navigate("/");
          return;
        }
        const imagesList = data.images || [];
        const doubleData = [...imagesList, ...imagesList].map((item) => ({
          src: getImage(item.image),
          alt: item.alt,
          className: item.className,
        }));
        setGalleryImages(doubleData);
      })
      .catch((err) => console.error("Error loading gallery data:", err));
  }, [navigate]);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 section-padding">
        <div className="max-w-4xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label mb-4 block"
          >
            Visual Journey
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Our <span className="text-gradient">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-body text-lg max-w-2xl leading-relaxed"
          >
            Explore breathtaking moments captured across the globe. From the sun-drenched coasts of Santorini to the snow-capped peaks of the Swiss Alps, let these visuals inspire your next adventure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-flow-dense gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {galleryImages.length === 0 ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "animate-pulse rounded-3xl bg-slate-200/60",
                  i === 1 ? "md:col-span-2 md:row-span-2" : i === 4 ? "md:col-span-2" : ""
                )}
              />
            ))
          ) : (
            galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={cn("group relative overflow-hidden rounded-3xl bg-secondary", img.className)}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 z-10" />
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between z-20">
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <h3 className="text-white font-display text-xl md:text-2xl font-semibold drop-shadow-md">
                      {img.alt}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>

      <CTASection />

      <Footer />
    </div>
  );
};

export default Gallery;
