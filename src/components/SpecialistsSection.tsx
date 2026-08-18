import React from 'react';
import { motion } from 'motion/react';
import { DOCTORS } from '../data';
import { Doctor } from '../types';

interface SpecialistsSectionProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDoctor: (doctorId: string) => void;
}

export const SpecialistsSection: React.FC<SpecialistsSectionProps> = ({
  onSelectDoctor,
  onBookDoctor,
}) => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-[1340px] mx-auto" id="specialists">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-[#006970] font-bold px-3 py-1 rounded-full bg-[#e5eeff] border border-[#003c90]/15 inline-block mb-3">
          CLINICAL MASTERY
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0b1c30] tracking-tight">
          Meet Our Lead Doctors
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {DOCTORS.map((doc, idx) => (
          <motion.div 
            key={doc.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-center bg-white p-6 lg:p-8 rounded-3xl border border-[#c3c6d5]/40 clinic-shadow-hover relative overflow-hidden"
          >
            {/* Doctor Avatar */}
            <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-2xl overflow-hidden shrink-0 border-2 border-[#003c90]/20 shadow-lg relative group">
              <img 
                src={doc.avatar} 
                alt={doc.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-mono text-white text-center">
                {doc.experienceYears}+ YRS EXP
              </div>
            </div>

            {/* Doctor Info */}
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-2xl font-extrabold text-[#003c90] mb-1">
                {doc.name}
              </h3>

              <p className="text-xs font-semibold text-slate-500 mb-3">
                {doc.role}
              </p>

              <p className="text-xs md:text-sm text-[#434653] leading-relaxed mb-5 font-normal">
                {doc.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <button
                  onClick={() => onSelectDoctor(doc)}
                  className="text-xs font-semibold text-[#003c90] hover:text-[#0f52ba] underline flex items-center gap-1 py-1"
                >
                  <span className="material-symbols-outlined text-base">person</span>
                  <span>View Bio & Qualifications</span>
                </button>

                <button
                  onClick={() => onBookDoctor(doc.id)}
                  className="bg-[#003c90] hover:bg-[#0f52ba] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

