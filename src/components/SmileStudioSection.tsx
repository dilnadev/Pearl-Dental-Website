import React, { useState } from 'react';
import { motion } from 'motion/react';
import { fadeInUp, staggerContainer, viewportOnce } from '../lib/motion';
import smileBeforeImage from '../assets/before.png';
import smileAfterImage from '../assets/after.png';

interface SmileStudioSectionProps {
  onOpenBooking: () => void;
}

export const SmileStudioSection: React.FC<SmileStudioSectionProps> = ({ onOpenBooking }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  const BEFORE_IMAGE = smileBeforeImage;
  const AFTER_IMAGE = smileAfterImage;

  const HOTSPOTS = [
    {
      title: 'Incised Edge Translucency',
      desc: 'Hand-crafted ceramic layers pass natural light identically to real enamel, avoiding artificial flat white tones.',
      x: 48,
      y: 42
    },
    {
      title: 'Micro-Architectural Alignment',
      desc: 'Biomechanical aligner force vectors realigned facial midline symmetry to 0.05mm geometric precision.',
      x: 35,
      y: 55
    },
    {
      title: 'Gingival Margin Sculpting',
      desc: 'Painless diode laser contouring balanced gum proportions for a symmetrical, healthy frame.',
      x: 65,
      y: 38
    }
  ];

  return (
    <section id="smile-studio" className="py-16 md:py-24 bg-[#f8f9ff] text-[#0b1c30] border-b border-slate-200/80 relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-sky-200/40 to-blue-200/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1340px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0b1c30]">
            Interactive Smile Transformation Studio
          </h2>
        </motion.div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Interactive Before / After Scrubber */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
            className="lg:col-span-7 relative">
            <div className="bg-white p-3 rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden">
              <div 
                className="relative h-[360px] md:h-[480px] rounded-2xl overflow-hidden select-none cursor-ew-resize"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                  setSliderPosition((x / rect.width) * 100);
                }}
                onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const touch = e.touches[0];
                  const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                  setSliderPosition((x / rect.width) * 100);
                }}
              >
                {/* After Image (Full Background) */}
                <img 
                  src={AFTER_IMAGE} 
                  alt="After Smile Transformation" 
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-mono font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md">
                  AFTER: PEARL DENTAL CARE
                </div>

                {/* Before Image (Clipped Left Side) */}
                <div 
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src={BEFORE_IMAGE} 
                    alt="Before Smile Transformation" 
                    className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-xs font-mono font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md border border-slate-700">
                    BEFORE: INITIAL
                  </div>
                </div>

                {/* Divider Line & Scrubber Handle */}
                <div 
                  className="absolute inset-y-0 w-1 bg-[#003c90] shadow-[0_0_15px_#003c90] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-[#003c90] font-bold flex items-center justify-center shadow-2xl border-2 border-[#003c90]">
                    <span className="material-symbols-outlined text-sm">unfold_more</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Hotspot Breakdown Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="lg:col-span-5 space-y-4"
          >
            {HOTSPOTS.map((spot, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                onClick={() => setActiveHotspot(idx)}
                whileHover={{ scale: 1.02 }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  activeHotspot === idx
                    ? 'bg-[#eef4ff] border-[#003c90] shadow-xl shadow-[#003c90]/10'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <h4 className="text-base font-bold text-[#0b1c30] mb-1">{spot.title}</h4>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">{spot.desc}</p>
              </motion.div>
            ))}

            <motion.button
              variants={fadeInUp}
              onClick={onOpenBooking}
              className="w-full mt-4 bg-[#003c90] hover:bg-[#0f52ba] text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-[#003c90]/20 transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Design Your Custom Smile Blueprint</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
            </motion.button>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
