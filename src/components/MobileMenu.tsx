import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Phone, Instagram } from "lucide-react";
import { useGalleryStatus } from "@/hooks/useGalleryStatus";
import { useContactInfo } from "@/hooks/useContactInfo";

const menuItems = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
  { label: "PACKAGES", path: "/packages" },
  { label: "GALLERY", path: "/gallery" },
  { label: "CONTACT", path: "/contact" },
];

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  const { showGallery } = useGalleryStatus();
  const { data } = useContactInfo();

  const filteredItems = showGallery
    ? menuItems
    : menuItems.filter((item) => item.path !== "/gallery");

  const displayItems = filteredItems.map((item, index) => ({
    ...item,
    num: String(index + 1).padStart(2, "0")
  }));

  const rawPhone = data?.contact?.phone?.lines?.[0] || "";
  const cleanPhone = rawPhone ? rawPhone.replace(/[^0-9+]/g, "") : "";
  const instagramUrl = data?.socials?.instagram?.url || "";

  return (
    <motion.div
      initial={{ clipPath: "circle(0px at calc(100% - 32px) 40px)" }}
      animate={{ clipPath: "circle(150% at calc(100% - 32px) 40px)" }}
      exit={{ clipPath: "circle(0px at calc(100% - 32px) 40px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-background flex flex-col"
    >
      {/* Header */}
      <div className="section-padding flex items-center justify-between h-20">
        <span className="text-2xl font-display font-bold tracking-tight text-foreground">
          Tri<span className="text-primary">viva</span>
        </span>
        <button onClick={onClose} className="p-2" aria-label="Close menu">
          <X className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 flex flex-col justify-center section-padding gap-6">
        {displayItems.map((item, i) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={item.path}
              onClick={onClose}
              className="flex items-center gap-4 group"
            >
              <span className="menu-item-number">{item.num}</span>
              <span className="text-3xl md:text-4xl font-bold uppercase tracking-wider font-display text-foreground group-hover:text-primary transition-colors">
                {item.label}
              </span>
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + displayItems.length * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <Link
            to="/packages"
            onClick={onClose}
            className="btn-primary-travel text-lg px-8 py-4 inline-block shadow-lg"
          >
            Book Now
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="section-padding pb-8 flex items-center gap-8">
        {cleanPhone && (
          <a href={`tel:${cleanPhone}`} className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
            <Phone className="w-4 h-4" />
            CALL US
          </a>
        )}
        {instagramUrl && (
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
            <Instagram className="w-4 h-4" />
            FOLLOW
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default MobileMenu;