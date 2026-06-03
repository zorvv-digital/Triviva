import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContactInfo } from "@/hooks/useContactInfo";

const Contact = () => {
  const { data } = useContactInfo();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-[20%] left-[-15%] w-[45vw] h-[45vw] bg-[#ea580c]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-15%] w-[40vw] h-[40vw] bg-[#f59e0b]/5 rounded-full blur-[120px] pointer-events-none" />

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
              Every great journey begins with a conversation. Whether you know exactly where you want to go or you're just starting to dream, our travel curators are here to listen. 
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0 mt-4"
            >
              Fill out the form below to schedule your complimentary initial consultation. We'll get back to you within 24 hours to begin designing a bespoke itinerary tailored precisely to your passions, pace, and preferences.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16">
            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-card rounded-3xl p-8 shadow-[0_4px_30px_-8px_rgba(0,0,0,0.05)] border border-black/[0.03] space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ea580c]/5 rounded-bl-[100px] -mr-10 -mt-10 pointer-events-none" />
                
                {[
                  { icon: MapPin, title: data?.contact.address.title || "Visit Us", lines: data?.contact.address.lines || ["123 Travel Lane", "Adventure City, AC 10001"] },
                  { icon: Phone, title: data?.contact.phone.title || "Call Us", lines: data?.contact.phone.lines || ["+1 (555) 123-4567", "+1 (555) 987-6543"] },
                  { icon: Mail, title: data?.contact.email.title || "Email Us", lines: data?.contact.email.lines || ["hello@triviva.com", "bookings@triviva.com"] },
                  { icon: Clock, title: data?.contact.workingHours.title || "Working Hours", lines: data?.contact.workingHours.lines || ["Mon – Fri: 9am – 7pm", "Sat: 10am – 4pm"] },
                ].map((item, i) => (
                  <div key={item.title} className="flex gap-5 relative z-10 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#ea580c]/5 border border-[#ea580c]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#ea580c]/10 transition-all duration-300">
                      <item.icon className="w-6 h-6 text-[#ea580c]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-foreground mb-1">{item.title}</h3>
                      {item.lines.map(line => (
                        <p key={line} className="text-muted-foreground font-body text-sm leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 md:p-10 shadow-[0_4px_30px_-8px_rgba(0,0,0,0.05)] border border-black/[0.03]">
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
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-slate-900 font-body text-sm outline-none focus:bg-white focus:border-[#ea580c]/50 focus:ring-4 focus:ring-[#ea580c]/10 transition-all duration-300 shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Email Address *</label>
                      <input
                        type="email"
                        required
                        id="email"
                        placeholder="e.g. alexander@example.com"
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-slate-900 font-body text-sm outline-none focus:bg-white focus:border-[#ea580c]/50 focus:ring-4 focus:ring-[#ea580c]/10 transition-all duration-300 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="destination" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Destination of Interest *</label>
                    <div className="relative">
                      <select
                        id="destination"
                        required
                        defaultValue=""
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-slate-900 font-body text-sm outline-none focus:bg-white focus:border-[#ea580c]/50 focus:ring-4 focus:ring-[#ea580c]/10 transition-all duration-300 shadow-sm appearance-none cursor-pointer"
                      >
                        <option value="" disabled hidden>Select a destination</option>
                        <option>Santorini, Greece</option>
                        <option>Kyoto, Japan</option>
                        <option>Bali, Indonesia</option>
                        <option>Swiss Alps</option>
                        <option>Maldives</option>
                        <option>Peru</option>
                        <option>Morocco</option>
                        <option>Other / Not Sure Yet</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Your Message *</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Tell us about your dream trip..."
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-slate-900 font-body text-sm outline-none focus:bg-white focus:border-[#ea580c]/50 focus:ring-4 focus:ring-[#ea580c]/10 transition-all duration-300 shadow-sm resize-none"
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
