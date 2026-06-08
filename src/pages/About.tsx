import { motion } from "framer-motion";
import { Users, Globe, Award, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { images } from "@/lib/images";

import aboutData from "@/data/about.json";

const iconMap = {
  Users,
  Globe,
  Award,
  Heart,
};

const stats = aboutData.stats.map(s => ({
  ...s,
  icon: iconMap[s.icon as keyof typeof iconMap] || Users,
}));

const team = aboutData.team;
const values = aboutData.values;

/**
 * Renders the About page, detailing the company values, core team,
 * and key journey metrics loaded from about.json.
 */
const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-foreground mb-6"
              >
                About <span className="text-gradient">Us</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground font-display text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
              >
                Founded in 2016, our travel agency was born from our father's vision and deep love for travel. A man full of innovative ideas, passion, and an endless curiosity about the world, he built this venture with dedication, determination, and heart. What began as his dream has now become our responsibility and privilege to continue.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <button className="btn-primary-travel">Join Our Journey</button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative max-w-md mx-auto md:mx-0"
            >
              <div className="img-curved-lg aspect-[4/5] md:aspect-[3/4] overflow-hidden shadow-[0_3px_8px_rgba(0,0,0,0.03)] border border-slate-100 relative">
                <div className="absolute inset-0 bg-black/10 z-10" />
                <img src={images.about} alt="Explorer overlooking canyon" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" />
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Legacy */}
      <section className="py-20 md:py-28 section-padding border-t border-black/[0.03]">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mr-auto text-left"
          >
            <span className="section-label mb-3 block">Carrying It Forward</span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#111827] mb-4 leading-snug">
              Responsibility &amp; Privilege
            </h3>
            <p className="text-[#6b7280] font-body text-base md:text-lg leading-relaxed">
              Today, we proudly carry his legacy forward, staying true to the values and passion that inspired the foundation of this company while helping travelers create unforgettable experiences across the globe.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl ml-auto text-right"
          >
            <span className="section-label mb-3 block">Our Promise</span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#111827] mb-4 leading-snug">
              A Tribute to His Spirit
            </h3>
            <p className="text-[#6b7280] font-body text-base md:text-lg leading-relaxed">
              More than a travel agency, this business is a tribute to his spirit, our family's shared passion for exploration, and the belief that every journey has a story worth telling. Whether it's a long-awaited vacation, a business trip, or a once-in-a-lifetime adventure, we are committed to making every travel experience seamless, memorable, and meaningful.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-xl md:text-2xl font-bold text-[#111827] leading-snug border-l-2 border-primary/30 pl-6 max-w-xl mx-auto text-center"
          >
            Since 2016, we have been turning travel dreams into cherished memories — one journey at a time.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 section-padding bg-[#fef5f0]/30 mt-20 md:mt-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label mb-3 block">Our Values</span>
            <h2 className="section-title">What Drives <span className="text-gradient">Us</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-[2rem] p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-[box-shadow,transform] duration-500 transform-gpu border border-slate-100 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110" />
                <span className="text-6xl font-display font-bold text-[#ea580c]/10 block mb-6">0{i + 1}</span>
                <h3 className="font-display text-2xl font-bold text-[#111827] mb-4">{v.title}</h3>
                <p className="text-[#6b7280] font-body text-base leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Text Block */}
      <section className="py-20 md:py-32 section-padding border-b border-black/[0.03]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-display text-[#111827] leading-tight tracking-tight"
          >
            "We believe the best travel stories aren't found in brochures. They happen when you take a wrong turn down a beautiful street, talk to the local potter, or watch the fog lift off a valley with a hot cup of tea. We gather those quiet, real moments so you can just be present."
          </motion.p>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="section-label mb-3 block">Our Team</span>
            <h2 className="section-title">Meet the <span className="text-gradient">Explorers</span></h2>
          </div>
          <div className="flex flex-wrap md:grid md:grid-cols-3 lg:grid-cols-4 justify-center gap-y-12 gap-x-4 sm:gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="text-center group cursor-pointer w-[45%] md:w-auto"
              >
                <div className="relative w-28 h-28 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6">
                  {/* Avatar wrapper */}
                  <div className="absolute inset-0 rounded-full bg-white flex items-center justify-center p-1 shadow-[0_1px_3px_rgba(0,0,0,0.02)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-shadow duration-500">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
                      {/* Optional: Add real images here if available, otherwise stylish initials */}
                      <span className="font-display text-2xl sm:text-3xl font-bold text-[#ea580c] group-hover:scale-110 transition-transform duration-500">{member.initials}</span>
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-base sm:text-xl font-bold text-[#111827] mb-0.5 sm:mb-1">{member.name}</h3>
                <p className="text-[#ea580c] font-body text-[10px] sm:text-sm font-semibold uppercase tracking-wider">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <Footer />
    </div>
  );
};

export default About;
