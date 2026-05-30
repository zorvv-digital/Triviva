import { motion } from "framer-motion";
import { Users, Globe, Award, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="section-label mb-4 block"
              >
                Our Story
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-foreground mb-6"
              >
                We Believe Travel
                <br />
                <span className="text-gradient">Changes Lives</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground font-body text-lg leading-relaxed mb-8 max-w-lg"
              >
                Founded in 2018, Voyago was born from a simple belief: travel should be more than tourism. 
                We craft immersive journeys that connect you to the soul of a place — its people, traditions, 
                and hidden beauty. Every itinerary is handcrafted by locals who call these destinations home.
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
              className="relative"
            >
              <div className="img-curved-lg aspect-[4/5] md:aspect-[3/4] overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-black/10 z-10" />
                <img src={images.about} alt="Explorer overlooking canyon" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" />
              </div>

            </motion.div>
          </div>
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
                className="bg-white rounded-[2rem] p-10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 border border-black/[0.02] relative overflow-hidden group"
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
            "Our team of seasoned explorers and dedicated curators spend months scouting locations, 
            testing experiences, and building relationships with local artisans and guides. 
            We sweat the small stuff so you don't have to, ensuring every sunset cruise, 
            mountain trek, and culinary class is nothing short of extraordinary."
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
                  <div className="absolute inset-0 rounded-full bg-white flex items-center justify-center p-1 shadow-xl">
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

      <Footer />
    </div>
  );
};

export default About;
