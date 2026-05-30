import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube, ArrowUpRight } from "lucide-react";
import { useGalleryStatus } from "@/hooks/useGalleryStatus";
import { useContactInfo } from "@/hooks/useContactInfo";

const Footer = () => {
  const { showGallery } = useGalleryStatus();
  const { data } = useContactInfo();

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
    <footer className="bg-[#fcfaf8] pt-24 overflow-hidden rounded-t-[3rem] mt-12 border-t border-black/[0.05]">
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
                  <h4 className="font-display text-lg text-[#111827] font-medium group-hover:text-[#ea580c] transition-colors">Special Offers</h4>
                  <div className="w-6 h-6 rounded-full bg-[#111827] text-white flex items-center justify-center transform group-hover:rotate-45 group-hover:bg-[#ea580c] transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="font-body text-sm text-[#6b7280]">Limited time deals</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Typographic Brand Name */}
      <div className="w-full overflow-hidden flex justify-center translate-y-6 md:translate-y-12">
        <h1 className="text-[22vw] leading-[0.75] font-display font-black text-[#111827] tracking-wider uppercase">
          {agencyName}
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
