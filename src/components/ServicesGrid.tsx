import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';

interface ServicesGridProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onSelectService,
}) => {
  const invisalign = SERVICES.find(s => s.id === 'invisalign') || SERVICES[0];
  const implants = SERVICES.find(s => s.id === 'implants') || SERVICES[1];
  const rootCanal = SERVICES.find(s => s.id === 'root-canal') || SERVICES[2];
  const smileDesign = SERVICES.find(s => s.id === 'smile-design') || SERVICES[3];
  const pediatric = SERVICES.find(s => s.id === 'pediatric-care') || SERVICES[4];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-[1340px] mx-auto" id="services">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-[#006970] font-bold px-3 py-1 rounded-full bg-[#e5eeff] border border-[#003c90]/15 inline-block mb-3">
          CLINICAL EXCELLENCE
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0b1c30] tracking-tight">
          Precision Dental Specialties
        </h2>
      </motion.div>

      {/* Apple Bento Box Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Bento Lead Card 1: Invisalign & Braces (7 Cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => onSelectService(invisalign)}
          className="md:col-span-7 bg-[#ffffff] p-8 md:p-10 rounded-3xl apple-glass-light clinic-shadow-hover flex flex-col justify-between group cursor-pointer border border-[#c3c6d5]/40 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#003c90] mb-3 group-hover:text-[#0f52ba] transition-colors">
              {invisalign.title}
            </h3>
            <p className="text-[#434653] text-base leading-relaxed mb-6 max-w-xl font-normal">
              {invisalign.shortDesc}
            </p>
          </div>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden relative mt-2 shadow-lg">
            <img
              src={invisalign.image}
              alt={invisalign.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>

        {/* Bento Lead Card 2: Dental Implants (5 Cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onClick={() => onSelectService(implants)}
          className="md:col-span-5 bg-[#eff4ff] p-8 md:p-10 rounded-3xl clinic-shadow-hover flex flex-col justify-between group cursor-pointer border border-[#c3c6d5]/40 relative overflow-hidden"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#003c90] mb-3 group-hover:text-[#0f52ba] transition-colors">
              {implants.title}
            </h3>
            <p className="text-[#434653] text-sm md:text-base leading-relaxed mb-6 font-normal">
              {implants.shortDesc}
            </p>
          </div>

          <div className="h-60 rounded-2xl overflow-hidden relative shadow-lg">
            <img
              src={implants.image}
              alt={implants.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>

        {/* Small Cards Row (3 x 4 cols = 12 cols) */}
        {[rootCanal, smileDesign, pediatric].map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            onClick={() => onSelectService(item)}
            className="md:col-span-4 bg-[#ffffff] p-6 md:p-8 rounded-3xl clinic-shadow-hover border border-[#c3c6d5]/40 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <h4 className="text-xl font-bold text-[#003c90] mb-2 group-hover:text-[#0f52ba] transition-colors">
                {item.title}
              </h4>
              <p className="text-xs md:text-sm text-[#434653] leading-relaxed mb-4 font-normal">
                {item.shortDesc}
              </p>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden relative mt-2 shadow-sm">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
};

