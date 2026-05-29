import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-16">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-label mb-4 inline-block md:block"
            >
              Get in Touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-foreground mb-6"
            >
              Let's Plan Your
              <br />
              <span className="text-gradient">Dream Trip</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-body text-lg leading-relaxed max-w-2xl mx-auto md:mx-0"
            >
              Every great journey begins with a conversation. Whether you know exactly where you want to go or you're just starting to dream, our travel curators are here to listen. 
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground font-body text-lg leading-relaxed max-w-2xl mx-auto md:mx-0 mt-4"
            >
              Fill out the form below to schedule your complimentary initial consultation. We'll get back to you within 24 hours to begin designing a bespoke itinerary tailored precisely to your passions, pace, and preferences.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.02] space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#fef5f0] rounded-bl-[100px] -mr-10 -mt-10" />
                
                {[
                  { icon: MapPin, title: "Visit Us", lines: ["123 Travel Lane", "Adventure City, AC 10001"] },
                  { icon: Phone, title: "Call Us", lines: ["+1 (555) 123-4567", "+1 (555) 987-6543"] },
                  { icon: Mail, title: "Email Us", lines: ["hello@voyago.com", "bookings@voyago.com"] },
                  { icon: Clock, title: "Working Hours", lines: ["Mon – Fri: 9am – 7pm", "Sat: 10am – 4pm"] },
                ].map((item, i) => (
                  <div key={item.title} className="flex gap-5 relative z-10 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#fef5f0] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-[#ea580c]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#111827] mb-1">{item.title}</h3>
                      {item.lines.map(line => (
                        <p key={line} className="text-[#6b7280] font-body text-sm leading-relaxed">{line}</p>
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
              <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.02]">
                <h3 className="font-display text-2xl font-bold text-[#111827] mb-8">Send us a message</h3>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        id="name"
                        placeholder=" "
                        className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-[#111827] font-body text-base outline-none transition-colors focus:border-[#ea580c]"
                      />
                      <label 
                        htmlFor="name" 
                        className="absolute left-0 top-3 text-gray-400 font-body text-base cursor-text transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#ea580c] peer-focus:font-semibold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-500"
                      >
                        Full Name
                      </label>
                    </div>
                    <div className="relative group">
                      <input
                        type="email"
                        required
                        id="email"
                        placeholder=" "
                        className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-[#111827] font-body text-base outline-none transition-colors focus:border-[#ea580c]"
                      />
                      <label 
                        htmlFor="email" 
                        className="absolute left-0 top-3 text-gray-400 font-body text-base cursor-text transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#ea580c] peer-focus:font-semibold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-500"
                      >
                        Email Address
                      </label>
                    </div>
                  </div>

                  <div className="relative group">
                    <select
                      id="destination"
                      required
                      defaultValue=""
                      className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-[#111827] font-body text-base outline-none transition-colors focus:border-[#ea580c] appearance-none"
                    >
                      <option value="" disabled hidden></option>
                      <option>Santorini, Greece</option>
                      <option>Kyoto, Japan</option>
                      <option>Bali, Indonesia</option>
                      <option>Swiss Alps</option>
                      <option>Maldives</option>
                      <option>Peru</option>
                      <option>Morocco</option>
                      <option>Other / Not Sure Yet</option>
                    </select>
                    <label 
                      htmlFor="destination" 
                      className="absolute left-0 top-3 text-gray-400 font-body text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#ea580c] peer-focus:font-semibold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-500"
                    >
                      Destination of Interest
                    </label>
                  </div>

                  <div className="relative group mt-12">
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-[#111827] font-body text-base outline-none transition-colors resize-none focus:border-[#ea580c]"
                    />
                    <label 
                      htmlFor="message" 
                      className="absolute left-0 top-3 text-gray-400 font-body text-base cursor-text transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#ea580c] peer-focus:font-semibold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-500"
                    >
                      Tell us about your dream trip...
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ea580c] text-white px-8 py-4 rounded-xl font-body font-bold tracking-wide overflow-hidden transition-all hover:bg-[#c2410c] hover:shadow-[0_8px_25px_rgba(234,88,12,0.3)] mt-4"
                  >
                    <span className="relative z-10">{submitted ? "Message Sent! ✓" : "Send Inquiry"}</span>
                    {!submitted && <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
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
