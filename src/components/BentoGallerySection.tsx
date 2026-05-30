import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { getImage } from "@/lib/images";
import galleryData from "@/data/gallery.json";

const galleryItems = galleryData.map(item => ({
  ...item,
  image: getImage(item.image)
}));

const BentoGallerySection = () => {
  return (
    <section className="py-20 md:py-32 bg-brand-light">
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn("group relative overflow-hidden rounded-2xl", item.className)}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
              
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20 text-white">
                <span className="text-sm font-medium uppercase tracking-wider text-white/80 mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  {item.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-playfair font-semibold">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGallerySection;
