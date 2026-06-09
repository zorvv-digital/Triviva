import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContactInfo } from "@/hooks/useContactInfo";

const Contact = () => {
  const { data, loading } = useContactInfo();
  const [submitted, setSubmitted] = useState(false);
  const [modalType, setModalType] = useState<"whatsapp" | "phone" | null>(null);
  const [searchParams] = useSearchParams();

  const pkgParam = searchParams.get("package") ? decodeURIComponent(searchParams.get("package")!) : "";
  const askParam = searchParams.get("ask") === "1";

  const [selectedDestination, setSelectedDestination] = useState(pkgParam || "");
  const [message, setMessage] = useState(
    pkgParam
      ? askParam
        ? `Hi, I have a question about the "${pkgParam}" trip...`
        : `Hi, I would like to inquire about booking the "${pkgParam}" package. Please share details.`
      : ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const addressLines = data.contact.address.lines;
  const primaryAddress = addressLines[0].includes(",")
    ? addressLines[0].split(",")[0]
    : addressLines[0];
  const secondaryAddress = addressLines.join(", ").replace(/^[A-Za-z]+,\s*/, "");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-[20%] left-[-15%] w-[45vw] h-[45vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-15%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <section className="pt-32 pb-24 section-padding overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center md:text-left mb-16">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-label mb-4 inline-block"
            >
              Get in Touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-title mb-6"
            >
              Let's Plan Your<br />
              <span className="text-gradient">Dream Trip</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0"
            >
              We believe a great trip doesn't start with a catalog search; it starts with a real conversation. Whether you have a detailed bucket list or just a vague mood and a desired season, we want to hear about it.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0 mt-4"
            >
              Drop us a message below. Tell us how you like to travel, what gets you excited, and what you'd rather skip. We will get back to you personally to start sketching out your journey.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16">
            {/* Contact Info Sidebar */}
            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Card 1: OUR OFFICE (Address & Map) */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLines.join(", "))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 hover:border-primary/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 min-h-[160px] flex flex-col md:flex-row items-center overflow-hidden cursor-pointer group w-full"
              >
                <div className="flex gap-5 items-center z-10 w-full md:w-[60%] pr-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                      OUR OFFICE
                    </span>
                    <p className="font-body font-medium text-base text-slate-900 leading-tight mb-0.5">
                      {primaryAddress}
                    </p>
                    <p className="font-body text-xs text-slate-500 leading-snug">
                      {secondaryAddress}
                    </p>
                  </div>
                </div>

                <div className="ml-auto w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 text-slate-400 flex-shrink-0 z-10 mr-4 md:mr-[42%]">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <div className="relative w-full h-40 md:h-full md:absolute md:right-0 md:top-0 md:bottom-0 md:w-[40%] mt-4 md:mt-0 overflow-hidden rounded-2xl md:rounded-r-[2rem] md:rounded-l-none">
                  <div className="hidden md:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                  <iframe
                    title="Office Map"
                    frameBorder="0"
                    scrolling="no"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      addressLines.join(", ")
                    )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    className="absolute max-w-none filter grayscale opacity-70 contrast-125 border-none pointer-events-none"
                    style={{
                      top: '-50px',
                      left: '-50px',
                      right: '-50px',
                      bottom: '-50px',
                      width: 'calc(100% + 100px)',
                      height: 'calc(100% + 100px)'
                    }}
                  />
                </div>
              </a>

              {/* Card 2: EMAIL */}
              <a
                href={`mailto:${data.contact.email.lines[0]}`}
                className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 hover:border-primary/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex items-center gap-5 cursor-pointer group w-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                    EMAIL
                  </span>
                  <span className="font-body font-medium text-base md:text-lg text-slate-700 hover:text-primary transition-colors duration-300 break-all">
                    {data.contact.email.lines[0]}
                  </span>
                </div>
                <div className="ml-auto w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 text-slate-400 flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>

              {/* Card 3: WHATSAPP CHAT (unified) */}
              <button
                type="button"
                onClick={() => setModalType("whatsapp")}
                className="bg-white text-left rounded-[2rem] p-6 md:p-8 border border-slate-100 hover:border-emerald-500/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 flex items-center gap-5 cursor-pointer group w-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                    WHATSAPP CHAT
                  </span>
                  <span className="font-body font-medium text-base md:text-lg text-slate-700 group-hover:text-emerald-600 transition-colors duration-300">
                    Chat with our Travel Experts
                  </span>
                  <span className="block text-[11px] text-slate-400 font-body mt-1 font-medium">
                    {data.contact.phone.lines.join(" / ")}
                  </span>
                </div>
                <div className="ml-auto w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:text-emerald-600 transition-all duration-300 text-slate-400 flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>

              {/* Card 4: PHONE CALL (unified) */}
              <button
                type="button"
                onClick={() => setModalType("phone")}
                className="bg-white text-left rounded-[2rem] p-6 md:p-8 border border-slate-100 hover:border-primary/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex items-center gap-5 cursor-pointer group w-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                    DIRECT CALL
                  </span>
                  <span className="font-body font-medium text-base md:text-lg text-slate-700 group-hover:text-primary transition-colors duration-300">
                    Speak with our Travel Experts
                  </span>
                  <span className="block text-[11px] text-slate-400 font-body mt-1 font-medium">
                    {data.contact.phone.lines.join(" / ")}
                  </span>
                </div>
                <div className="ml-auto w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 text-slate-400 flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>

              {/* Card 5: INSTAGRAM */}
              <a
                href={data.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 hover:border-primary/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex items-center gap-5 cursor-pointer group w-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                    INSTAGRAM
                  </span>
                  <span className="font-body font-medium text-base md:text-lg text-slate-700 hover:text-primary transition-colors duration-300">
                    {data.socials.instagram.handle}
                  </span>
                </div>
                <div className="ml-auto w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 text-slate-400 flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </motion.div>

            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-shadow duration-500 border border-slate-100">
                <h3 className="font-display text-2xl font-bold text-foreground mb-8">Send us a message</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Full Name *</label>
                      <input
                         type="text"
                         required
                         id="name"
                         placeholder="e.g. Alexander Mercer"
                         className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-slate-900 font-body text-sm outline-none focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Email Address *</label>
                      <input
                        type="email"
                        required
                        id="email"
                        placeholder="e.g. alexander@example.com"
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-slate-900 font-body text-sm outline-none focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="destination" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Destination of Interest *</label>
                    <input
                      type="text"
                      id="destination"
                      required
                      value={selectedDestination}
                      onChange={(e) => setSelectedDestination(e.target.value)}
                      placeholder="e.g. Kyoto, Japan or Swiss Alps"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-slate-900 font-body text-sm outline-none focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Your Message *</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your dream trip..."
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-slate-900 font-body text-sm outline-none focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-sm resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="btn-primary-travel cursor-pointer flex items-center justify-center w-full sm:w-auto"
                    >
                      <span>{submitted ? "Message Sent! ✓" : "Send Inquiry"}</span>
                      {!submitted && <Send className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phone/WhatsApp Selection Modal */}
      <AnimatePresence>
        {modalType !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalType(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl border border-black/[0.02] p-8 overflow-hidden z-10 flex flex-col"
            >
              {/* Decorative Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-[100px] -mr-10 -mt-10 pointer-events-none ${modalType === "whatsapp" ? "bg-emerald-500/5" : "bg-primary/5"}`} />

              {/* Close Button */}
              <button
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-slate-900 transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="relative z-10 mb-6 text-left">
                <span className="section-label mb-1 block">
                  {modalType === "whatsapp" ? "WhatsApp Chat" : "Direct Hotline"}
                </span>
                <h3 className="text-xl font-display font-bold text-[#111827]">
                  {modalType === "whatsapp" ? "Choose WhatsApp Contact" : "Choose Number to Call"}
                </h3>
              </div>

              {/* Number Buttons */}
              <div className="space-y-3 relative z-10">
                {data.contact.phone.lines.map((phone, idx) => {
                  const href = modalType === "whatsapp"
                    ? `https://wa.me/${phone.replace(/[^0-9]/g, "")}`
                    : `tel:${phone.replace(/[^0-9+]/g, "")}`;

                  return (
                    <a
                      key={phone}
                      href={href}
                      target={modalType === "whatsapp" ? "_blank" : undefined}
                      rel={modalType === "whatsapp" ? "noopener noreferrer" : undefined}
                      onClick={() => setModalType(null)}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                        modalType === "whatsapp"
                          ? "border-emerald-100 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-800"
                          : "border-orange-100 hover:border-primary hover:bg-orange-50 text-[#ea580c]"
                      }`}
                    >
                      {modalType === "whatsapp" ? (
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      ) : (
                        <Phone className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                      )}
                      <div className="flex-1 text-left font-body font-medium text-sm">
                        <span className="block text-xs opacity-60 font-semibold tracking-wide">
                          CONTACT {idx + 1}
                        </span>
                        {phone}
                      </div>
                      <ArrowUpRight className="w-4 h-4 opacity-50" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Contact;
