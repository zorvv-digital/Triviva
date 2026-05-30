import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import servicesData from "@/data/services.json";

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

const services = servicesData as ServiceItem[];

const ServicesSection = () => {
  return (
    <section className="py-24 section-padding bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label mb-3 block justify-center">Our Services</span>
          <h2 className="section-title text-center">
            What We <span className="text-gradient">Offer</span>
          </h2>
          <p className="mt-4 text-slate-500 font-body">
            We provide everything you need for a comfortable, stress-free, and memorable journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service: ServiceItem, i: number) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.HelpCircle;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-950 mb-3">{service.title}</h3>
                <p className="text-slate-500 font-body text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
