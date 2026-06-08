import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContactInfo } from "@/hooks/useContactInfo";

const Contact = () => {
  const { data } = useContactInfo();
  const [submitted, setSubmitted] = useState(false);
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

  const addressLines = data?.contact.address.lines || [
    "Trikaripur, near Trikaripur Polytechnic",
    "PO Udinur, Kasaragod District",
    "Kerala, PIN 671310"
  ];
  const primaryAddress = addressLines[0]?.includes(",")
    ? addressLines[0].split(",")[0]
    : addressLines[0] || "Trikaripur";
  const secondaryAddress = addressLines.join(", ").replace(/^[A-Za-z]+,\s*/, "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
              <div className="relative bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 hover:border-slate-200 hover:scale-[1.01] transition-all duration-300 min-h-[160px] flex flex-col md:flex-row items-center overflow-hidden">
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
              </div>

              {/* Card 2: EMAIL */}
              <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 hover:border-slate-200 hover:scale-[1.01] transition-all duration-300 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                    EMAIL
                  </span>
                  <a
                    href={`mailto:${(data?.contact.email.lines || ["trivivatripadvisor@gmail.com"])[0]}`}
                    className="font-body font-medium text-base md:text-lg text-slate-700 hover:text-primary transition-colors duration-300 break-all"
                  >
                    {(data?.contact.email.lines || ["trivivatripadvisor@gmail.com"])[0]}
                  </a>
                </div>
              </div>

              {/* Cards for Phone/WhatsApp */}
              {(data?.contact.phone.lines || ["+91 6238390320", "+91 9745686333"]).map((phone, idx) => (
                <div 
                  key={phone} 
                  className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 hover:border-slate-200 hover:scale-[1.01] transition-all duration-300 flex items-center gap-5"
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
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                      WHATSAPP {(data?.contact.phone.lines || ["+91 6238390320", "+91 9745686333"]).length > 1 ? idx + 1 : ""}
                    </span>
                    <a
                      href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body font-medium text-base md:text-lg text-slate-700 hover:text-primary transition-colors duration-300"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              ))}

              {/* Card 5: INSTAGRAM */}
              <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 hover:border-slate-200 hover:scale-[1.01] transition-all duration-300 flex items-center gap-5">
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
                  <a
                    href={data?.socials.instagram.url || "https://instagram.com/trivivatravel"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body font-medium text-base md:text-lg text-slate-700 hover:text-primary transition-colors duration-300"
                  >
                    {data?.socials.instagram.handle || "@trivivatravel"}
                  </a>
                </div>
              </div>
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

      <Footer />
    </div>
  );
};

export default Contact;
