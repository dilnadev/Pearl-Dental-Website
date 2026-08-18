import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { fadeInUp, viewportOnce } from '../lib/motion';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onAddReview: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onAddReview,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 3;
  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  return (
    <section className="py-16 md:py-24 bg-[#f8f9ff] text-[#0b1c30] border-t border-slate-200/80" id="testimonials">
      <div className="px-4 md:px-8 max-w-[1340px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="mb-14"
        >
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#003c90] font-bold px-3 py-1 rounded-full bg-[#eef4ff] border border-[#003c90]/30 inline-block mb-3">
              VERIFIED PATIENT EXPERIENCE
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0b1c30] tracking-tight">
              Words From Our Patients
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3">
            <button
              onClick={onAddReview}
              className="text-xs font-mono font-bold text-[#003c90] bg-[#eef4ff] border border-[#003c90]/30 hover:bg-[#003c90] hover:text-white px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">rate_review</span>
              <span>Submit Review</span>
            </button>

            <button 
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full bg-white text-[#0b1c30] flex items-center justify-center hover:bg-slate-100 transition-all cursor-pointer border border-slate-200 shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <button 
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full bg-white text-[#0b1c30] flex items-center justify-center hover:bg-slate-100 transition-all cursor-pointer border border-slate-200 shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {visibleTestimonials.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl flex flex-col justify-between hover:border-[#003c90]/40 transition-all group"
              >
                <div>
                  <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6 font-normal italic">
                    "{item.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-200/80">
                  <div className="w-11 h-11 bg-[#003c90] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                    {item.author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0b1c30]">{item.author}</p>
                    <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-medium">{item.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

