import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube, ArrowUpRight } from "lucide-react";
import { useGalleryStatus } from "@/hooks/useGalleryStatus";
import { useContactInfo } from "@/hooks/useContactInfo";
import type { GlobeMarker } from "@/components/ui/3d-globe";

const Globe3D = lazy(() => import("@/components/ui/3d-globe"));

const sampleMarkers: GlobeMarker[] = [
  { lat: 40.7128, lng: -74.006, src: "https://assets.aceternity.com/avatars/1.webp", label: "New York" },
  { lat: 51.5074, lng: -0.1278, src: "https://assets.aceternity.com/avatars/2.webp", label: "London" },
  { lat: 35.6762, lng: 139.6503, src: "https://assets.aceternity.com/avatars/3.webp", label: "Tokyo" },
  { lat: 28.6139, lng: 77.209, src: "https://assets.aceternity.com/avatars/6.webp", label: "New Delhi" },
  { lat: 25.2048, lng: 55.2708, src: "https://assets.aceternity.com/avatars/10.webp", label: "Dubai" },
  { lat: 1.3521, lng: 103.8198, src: "https://assets.aceternity.com/avatars/12.webp", label: "Singapore" }
];

const Footer = () => {
  const { showGallery } = useGalleryStatus();
  const { data } = useContactInfo();
  const location = useLocation();
  const isHome = location.pathname === "/";
  
  const footerRef = useRef<HTMLElement>(null);
  const [isGlobeVisible, setIsGlobeVisible] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGlobeVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [isHome]);

  const footerLinks = [
    { l: "Packages", p: "/packages" },
    { l: "Gallery", p: "/gallery" },
    { l: "About", p: "/about" },
    { l: "Contact", p: "/contact" }
  ];

  const filteredLinks = showGallery
    ? footerLinks
    : footerLinks.filter(link => link.p !== "/gallery");

  const agencyName = data?.agencyName || "Triviva";
  const tagline = data?.tagline || "Triviva is an independent premium travel agency and curator.";
  
  const socialIcons: Record<string, { icon: any; colorClass: string }> = {
    instagram: { icon: Instagram, colorClass: "text-[#E1306C]" },
    twitter: { icon: Twitter, colorClass: "text-[#1DA1F2]" },
    facebook: { icon: Facebook, colorClass: "text-[#4267B2]" },
    youtube: { icon: Youtube, colorClass: "text-[#FF0000]" },
  };

  const activeSocials = data?.socials
    ? Object.entries(data.socials)
        .filter(([_, val]) => val && val.url)
        .map(([key, val]) => {
          const cfg = socialIcons[key.toLowerCase()] || { icon: Instagram, colorClass: "text-foreground" };
          return {
            key,
            url: val.url,
            handle: val.handle,
            Icon: cfg.icon,
            colorClass: cfg.colorClass
          };
        })
    : [];

  const agencyPhone = data?.contact?.phone?.lines?.[0] || "";

  return (
    <footer ref={footerRef} className="relative bg-[#fcfaf8] pt-24 overflow-hidden rounded-t-[3rem] mt-12 border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Tagline */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-display font-medium text-[#111827] leading-tight pr-4">
              {tagline}
            </h3>
          </div>

          {/* Middle 1 & 2: Links and Socials (Side-by-side on mobile) */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-body text-sm font-bold text-[#111827] mb-4">Explore</h4>
              <div className="flex flex-col gap-3">
                {filteredLinks.map(link => (
                  <Link 
                    key={link.p} 
                    to={link.p} 
                    className="font-body text-sm text-[#6b7280] hover:text-[#111827] transition-colors"
                  >
                    {link.l}
                  </Link>
                ))}
              </div>
            </div>

            <div className="text-right sm:text-left">
              <h4 className="font-body text-sm font-bold text-[#111827] mb-4">Follow us</h4>
              <div className="flex flex-col gap-3 items-end sm:items-start">
                {activeSocials.map((social) => (
                  <a key={social.key} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs sm:text-sm font-body text-[#111827] hover:border-[#ea580c] transition-colors group">
                    <social.Icon className={`w-4 h-4 ${social.colorClass} group-hover:scale-110 transition-transform`} />
                    {social.handle}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: CTAs */}
          <div className="md:col-span-3">
            <div className="space-y-4">
              {agencyPhone && (
                <Link to="/contact" className="group block">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                    <h4 className="font-display text-lg text-[#ea580c] font-medium group-hover:opacity-80 transition-opacity">Call {agencyName}</h4>
                    <div className="w-6 h-6 rounded-full bg-[#ea580c] text-white flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="font-body text-sm text-[#6b7280]">Let's plan your journey</p>
                </Link>
              )}
              
              <Link to="/packages" className="group block pt-2">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                  <h4 className="font-display text-lg text-[#111827] font-medium group-hover:text-[#ea580c] transition-colors">Featured Packages</h4>
                  <div className="w-6 h-6 rounded-full bg-[#111827] text-white flex items-center justify-center transform group-hover:rotate-45 group-hover:bg-[#ea580c] transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="font-body text-sm text-[#6b7280]">Explore our handpicked routes</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Typographic Brand Name */}
      <div className="w-full overflow-hidden flex justify-center translate-y-6 md:translate-y-12">
        <h1 className="text-[22vw] leading-[0.75] font-display font-black text-[#111827] tracking-wider uppercase select-none">
          {agencyName}
        </h1>
      </div>

      {isHome && isGlobeVisible && (
        <div className="absolute -right-32 -bottom-32 md:-right-[240px] md:-bottom-[240px] lg:-right-[340px] lg:-bottom-[340px] z-10 w-80 h-80 md:w-[600px] md:h-[600px] lg:w-[850px] lg:h-[850px] pointer-events-none select-none overflow-hidden flex items-center justify-center">
          <Suspense fallback={null}>
            <Globe3D
              className="h-full w-full"
              markers={[]}
              config={{
                atmosphereColor: "#f97316",
                atmosphereIntensity: 1.6,
                atmosphereBlur: 3.5,
                bumpScale: 5,
                autoRotateSpeed: 0.8,
                enableZoom: false,
                enablePan: false,
                radius: 2.1,
                showWireframe: false,
                ambientIntensity: 1.5,
                pointLightIntensity: 2.5
              }}
            />
          </Suspense>
        </div>
      )}
    </footer>
  );
};

export default Footer;
