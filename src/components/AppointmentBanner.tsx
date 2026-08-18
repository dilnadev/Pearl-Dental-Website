import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { fadeInUp, staggerContainer, viewportOnce } from '../lib/motion';
import { CLINIC_INFO } from '../data';
import ctaImage from '../assets/cta.png';

interface AppointmentBannerProps {
  onOpenBooking: () => void;
}

const BANNER_BG_IMAGE = ctaImage;

export const AppointmentBanner: React.FC<AppointmentBannerProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section ref={sectionRef} className="py-16 md:py-36 bg-[#f8f9ff] relative overflow-hidden">
      <div className="mx-4 md:mx-8 max-w-[1340px] lg:mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="relative rounded-3xl overflow-hidden p-10 md:p-20 lg:p-24 text-center flex flex-col items-center border border-slate-200/90 shadow-2xl bg-[#003c90]"
        >
          {/* Background Picture with Blue Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.img
              src={BANNER_BG_IMAGE}
              alt="Pearl Dental Care Modern Suite Background"
              style={{ y: bgParallaxY }}
              className="w-full h-full object-cover object-top opacity-90 scale-125"
            />
            {/* Blue Gradient Overlay for brand tone & text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00204d]/55 via-[#003c90]/45 to-[#00204d]/70"></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-sky-400/30 via-blue-300/20 to-indigo-400/30 rounded-full blur-[140px]"></div>
          </div>

          {/* Headline */}
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 relative z-10 tracking-tight max-w-4xl leading-[1.15]">
            Ready to Book Your Appointment?
          </motion.h2>

          {/* Subtitle / Description */}
          <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-white/80 mb-12 max-w-2xl relative z-10 font-normal leading-relaxed">
            Schedule a visit with our dental experts in Kochi and take the first step toward a healthier, brighter smile.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center items-center gap-5 md:gap-7 relative z-10 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-white hover:bg-blue-50 text-[#003c90] px-9 py-4.5 rounded-2xl font-bold text-base shadow-xl shadow-black/20 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-3 group"
            >
              <span>Schedule Your 3D Scan Visit</span>
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">calendar_month</span>
            </button>

            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="w-full sm:w-auto flex items-center justify-center gap-3 text-white hover:text-white font-bold text-base px-6 py-4 rounded-2xl bg-white/10 border border-white/25 shadow-md backdrop-blur-md transition-all hover:bg-white/20"
            >
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-lg">call</span>
              </div>
              <span>{CLINIC_INFO.phone}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


