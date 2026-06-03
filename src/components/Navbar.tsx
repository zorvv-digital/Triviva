import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { useGalleryStatus } from "@/hooks/useGalleryStatus";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Packages", path: "/packages" },
  { label: "Rentals", path: "/rentals" },
  { label: "Gallery", path: "/gallery" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { showGallery } = useGalleryStatus();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const filteredLinks = showGallery
    ? navLinks
    : navLinks.filter((link) => link.path !== "/gallery");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-surface shadow-sm" : ""
        }`}
      >
        <div className="section-padding flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img src="/assets/Logo.png" alt="Triviva Logo" className="h-16 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {filteredLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={link.path === "/packages" ? () => import("@/pages/Packages") : undefined}
                className={`font-body text-sm font-medium tracking-wide transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/packages"
              onMouseEnter={() => import("@/pages/Packages")}
              className="btn-primary-travel text-sm px-6 py-3"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-foreground rounded-full" />
            <span className="block w-4 h-0.5 bg-foreground rounded-full" />
            <span className="block w-6 h-0.5 bg-foreground rounded-full" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
