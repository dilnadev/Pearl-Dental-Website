import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TECH_IMAGE } from '../data';

interface ShowcaseChapter {
  id: string;
  badge: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  hotspots: { x: number; y: number; title: string; desc: string }[];
}

const CHAPTERS: ShowcaseChapter[] = [
  {
    id: 'itero-scan',
    badge: '01 • DIGITAL SCANNING',
    title: 'Digital Tooth Scanning',
    description: 'We scan your teeth digitally in about a minute, no messy impressions needed. This gives us an accurate 3D model of your mouth and a preview of your treatment results.',
    specs: [
      { label: 'Scan Resolution', value: '0.01mm' },
      { label: 'Speed', value: '60 Seconds' },
      { label: 'Simulation', value: 'Instant 3D' }
    ],
    image: TECH_IMAGE,
    hotspots: [
      { x: 30, y: 40, title: '6000 Images/Sec', desc: 'Continuous laser surface mapping' },
      { x: 70, y: 60, title: 'NIRI Technology', desc: 'Near-Infrared Imaging detects early decay' }
    ]
  },
  {
    id: 'invisalign-align',
    badge: '02 • CLEAR ALIGNERS',
    title: 'Clear Aligner Treatment',
    description: 'Each set of clear aligners is custom-made for your teeth using precise 3D printing. They gently and steadily guide your teeth into their correct position.',
    specs: [
      { label: 'Material', value: 'SmartTrack®' },
      { label: 'Visibility', value: '99% Invisible' },
      { label: 'Comfort', value: 'Custom Contoured' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl9WIALDWwE8RU_OcMd9O2RHn1BK7Z1bbjGtvpu7wvhRReZx81z4alcikvli4nBAMRzOjSllolZMwRKxXClJOIJHJvXaAzUtizcwJIr_iraiDNPf3qK14elDpX4y1npm8Oqi3Rbi9AYl7F_G5SXNmo3SY6IHtCg4l3s7AlOt7FDZPmUNKiil2hMkWjRsWx-d7iEFuMzHblEics_GBlbm2YV20PjndLrTY4DAVV98R_9DidQ4LouK-65SisLidjOl3dBVDmvOhiZDrt',
    hotspots: [
      { x: 45, y: 35, title: 'SmartForce® Attachments', desc: 'Precision anchorage for complex tooth turns' },
      { x: 65, y: 70, title: 'Gingival Bevel', desc: 'Laser-trimmed for ultimate lip & gum comfort' }
    ]
  },
  {
    id: 'cosmetic-veneers',
    badge: '03 • PORCELAIN VENEERS',
    title: 'Porcelain Veneers',
    description: 'Thin, custom-made porcelain shells are placed over your teeth to match the natural look and shine of real enamel, giving you an even, brighter smile.',
    specs: [
      { label: 'Thickness', value: '0.2 - 0.5mm' },
      { label: 'Stain Resistance', value: '100% Non-Porous' },
      { label: 'Lifespan', value: '15-20+ Years' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXEuOp2L7U1Ku2ZLx01gAzSRymQR-4-0FRq1UqFp3rQxtVu5sd-6SXnItdDMQQfY3HyCOt18Y1cxw2rNubipYhk4H4RV1MrPVXEf9WAE4G1BlDW_XBgyOrCnS7DKpL-hcydmLkOP9jYoCc498SJGCbXHh54q2Hef9ThgNmFQgFE4RQ2sgf7g8zT8jE-npbp1TLJp9GB4xQPuW0nkq8tlimWPDKUPQUXLm5-A45AEBQRSHIkh0sMyF8vlfYm0ZIrPcxcrN81UA9SKd3',
    hotspots: [
      { x: 50, y: 30, title: 'Incised Edge Depth', desc: 'Natural light pass-through translucency' },
      { x: 35, y: 65, title: 'Minimal Preparation', desc: 'Maximum tooth structure preservation' }
    ]
  },
  {
    id: 'guided-implants',
    badge: '04 • DENTAL IMPLANTS',
    title: 'Guided Dental Implants',
    description: 'Using a detailed 3D scan of your jaw, we plan and place each titanium implant with precise accuracy, for a stable result and a comfortable recovery.',
    specs: [
      { label: 'Placement Accuracy', value: 'Sub-Millimeter' },
      { label: 'Success Rate', value: '99.8%' },
      { label: 'Integration', value: 'Osseous Fusion' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIBL9dfIVhAUjYN-BC76ooubYOkEypg8G7u7Li6SNVgkQwoIJ7AWpS3XJ1zNF3p4MmyR1DsrKLMp-5fRMcee6zaB4f4XDem5ffVmxxhV63yfzvQ2UCAyocwVQJx82HrxMl7Nw-vcjxc7bMgcAyt6uz2qv-JaNQyGJdaJ2kR_-PldiYb9WTaQwOFUq43UfypqZLIWxVpbmAko4Y0nkoIH4bX_C1EHmJr7AqZOZ1gSoXNWOMGjugoj_53QEV8SKu7b6YuBhNwxRx7noa',
    hotspots: [
      { x: 50, y: 50, title: 'Titanium Thread Matrix', desc: 'Micro-grooved for bone cell bonding' },
      { x: 50, y: 20, title: 'Zirconia Abutment', desc: 'Tissue-friendly natural aesthetic margin' }
    ]
  }
];

export const ScrollShowcase: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const activeChapter = CHAPTERS[activeChapterIndex];
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // Automatically update active chapter based on scroll position
  useTransform(scrollYProgress, (progress) => {
    const total = CHAPTERS.length;
    const step = 1 / total;
    const current = Math.min(Math.floor(progress / step), total - 1);
    if (current >= 0 && current < total && current !== activeChapterIndex) {
      setActiveChapterIndex(current);
    }
    return progress;
  });

  return (
    <section 
      ref={sectionRef} 
      id="showcase" 
      className="relative min-h-[300vh] bg-[#f0f5ff] text-[#0b1c30] py-20 border-y border-slate-200/80"
    >
      {/* Sticky Container */}
      <div className="sticky top-4 md:top-20 min-h-[85vh] flex flex-col justify-center max-w-[1340px] mx-auto px-4 md:px-8 py-6 md:py-10">
        
        {/* Section Header */}
        <div className="mb-8 border-b border-slate-200/80 pb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#003c90] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#003c90] animate-ping"></span>
            THE PRECISION ENGINE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-1 text-[#0b1c30]">
            Engineered for Clinical Superiority.
          </h2>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              key={activeChapter.id + '-text'}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block text-[11px] font-mono tracking-widest text-[#003c90] bg-[#eef4ff] border border-[#003c90]/30 px-3 py-1 rounded-full mb-3 font-bold">
                {activeChapter.badge}
              </div>

              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#0b1c30] mb-2 leading-tight">
                {activeChapter.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed font-normal mb-6 mt-4">
                {activeChapter.description}
              </p>

              {/* Specs Grid */}
              <div className="hidden md:grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/80">
                {activeChapter.specs.map((sp, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs">
                    <div className="text-[10px] text-slate-500 font-mono uppercase">{sp.label}</div>
                    <div className="text-sm md:text-base font-bold text-[#0b1c30] mt-0.5">{sp.value}</div>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>

          {/* Right Visual Interactive Frame */}
          <div className="lg:col-span-7 relative">
            <motion.div
              key={activeChapter.id + '-image'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl group min-h-[150px] md:min-h-[440px]"
            >
              <img
                src={activeChapter.image}
                alt={activeChapter.title}
                className="w-full h-[150px] md:h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>

              {/* Interactive Hotspots */}
              {activeChapter.hotspots.map((hs, i) => (
                <div
                  key={i}
                  style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group/spot z-20"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-5 h-5 rounded-full bg-[#003c90]/40 animate-ping absolute"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#003c90] border-2 border-white cursor-pointer shadow-lg"></span>

                    {/* Hotspot Tooltip */}
                    <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-48 p-3 rounded-xl bg-white text-slate-900 text-xs border border-slate-200 shadow-2xl opacity-0 group-hover/spot:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                      <div className="font-bold text-[#0b1c30] text-xs">{hs.title}</div>
                      <div className="text-[10px] text-slate-600 font-normal mt-1">{hs.desc}</div>
                    </div>
                  </div>
                </div>
              ))}

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
