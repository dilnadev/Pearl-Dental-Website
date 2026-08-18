import React from 'react';
import { motion } from 'motion/react';

export const TrustMetrics: React.FC = () => {
  const METRICS = [
    { value: '1,500+', label: 'Invisalign Cases Completed' },
    { value: '99.8%', label: 'Implant Integration Rate' },
    { value: '4.9 ★', label: 'Patient Satisfaction' },
  ];

  return (
    <section className="relative z-30 -mt-10 md:-mt-14 mx-4 md:mx-8 max-w-[1340px] lg:mx-auto">
      <div className="rounded-3xl p-6 md:p-8 shadow-2xl shadow-slate-900/5 border border-slate-200/80 bg-white/95 backdrop-blur-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {METRICS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-slate-100/80 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#003c90] via-[#0f52ba] to-[#006970] tracking-tight">
                {item.value}
              </div>
              <div className="text-xs md:text-sm font-bold text-[#0b1c30] mt-1">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

