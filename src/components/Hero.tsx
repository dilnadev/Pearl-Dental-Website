import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { fadeInUp, staggerContainer } from '../lib/motion';
import dentalCareImage from '../assets/dental-care.png';
import invisibleSmileImage from '../assets/invisible-smile.png';
import dentalImplantsImage from '../assets/dental implants.png';
import teethCleaningImage from '../assets/teeth-cleaning.png';
import laserTreatmentImage from '../assets/laser treatment.png';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
}

interface SlideItem {
  id: string;
  title: string;
  highlightTitle: string;
  subtitle: string;
  image: string;
  imagePosition?: string;
  tag: string;
  ratingText: string;
}

const HERO_SLIDES: SlideItem[] = [
  {
    id: 'family-care',
    title: 'Family-Friendly',
    highlightTitle: 'Dental Care',
    subtitle: 'Permanent natural-looking solutions to replace missing teeth and restore confident healthy smiles.',
    image: dentalCareImage,
    tag: 'Family-Friendly Dental Care',
    ratingText: 'Restore natural healthy confident dental growth.',
  },
  {
    id: 'invisalign',
    title: 'Invisible Smile',
    highlightTitle: 'Orthodontics',
    subtitle: 'Advanced 3D iTero intraoral digital aligners for teens and adults without traditional metal braces.',
    image: invisibleSmileImage,
    tag: 'Invisible Smile Orthodontics',
    ratingText: 'Precision 3D smile alignment preview.',
  },
  {
    id: 'implants',
    title: 'Permanent Titanium',
    highlightTitle: 'Dental Implants',
    subtitle: 'Biocompatible dental implant restorations crafted with 0.01mm microscopic accuracy.',
    image: dentalImplantsImage,
    imagePosition: '75% center',
    tag: 'Permanent Titanium Dental Implants',
    ratingText: 'Natural bone integration with lifetime durability.',
  },
  {
    id: 'cleaning',
    title: 'Painless Air-Flow',
    highlightTitle: 'Teeth Cleaning',
    subtitle: 'Ultrasonic stain removal and deep enamel polishing for vibrant oral health.',
    image: teethCleaningImage,
    imagePosition: '65% center',
    tag: 'Painless Air-Flow Teeth Cleaning',
    ratingText: 'Gentle Spa-Grade hygiene cleaning treatment.',
  },
  {
    id: 'gum-care',
    title: 'Laser Guided',
    highlightTitle: 'Gum Treatment',
    subtitle: 'Non-invasive periodontal therapy ensuring healthy tissue aesthetics and pain-free healing.',
    image: laserTreatmentImage,
    imagePosition: '62% center',
    tag: 'Laser Guided Gum Treatment',
    ratingText: 'Advanced pain-free laser gum care.',
  },
];

const SERVICE_TAGS = [
  { label: 'Family-Friendly Dental Care', shortLabel: 'Dental Care', serviceId: 'checkup', slideIdx: 0 },
  { label: 'Painless Air-Flow Teeth Cleaning', shortLabel: 'Teeth Cleaning', serviceId: 'cleaning', slideIdx: 3 },
  { label: 'Permanent Titanium Dental Implants', shortLabel: 'Dental Implants', serviceId: 'implants', slideIdx: 2 },
  { label: 'Laser Guided Gum Treatment', shortLabel: 'Gum Treatment', serviceId: 'gum-care', slideIdx: 4 },
  { label: 'Invisible Smile Orthodontics', shortLabel: 'Orthodontics', serviceId: 'invisalign', slideIdx: 1 },
];

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [activeTag, setActiveTag] = useState<string>('Dental Checkup');

  // Auto slide ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Update active tag based on slide
  useEffect(() => {
    setActiveTag(HERO_SLIDES[currentSlide].tag);
  }, [currentSlide]);

  const handleSelectTag = (tag: typeof SERVICE_TAGS[0]) => {
    setActiveTag(tag.label);
    setCurrentSlide(tag.slideIdx);
  };

  const slide = HERO_SLIDES[currentSlide];

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#f4f7fc] text-[#0b1c30] select-none">
      {/* 1. BACKGROUND IMAGE SLIDER WITH LIGHT VIGNETTE OVERLAY */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: bgParallaxY }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            style={{ objectPosition: slide.imagePosition ?? 'center' }}
            className="w-full h-full object-cover brightness-100 saturate-[1.05]"
          />

          {/* Light Vignette & Gradient Overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9ff] via-transparent to-white/70" />
        </motion.div>
      </AnimatePresence>

      {/* 2. HERO CONTENT WRAPPER */}
      <div className="relative z-40 w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-between pt-28 pb-20 md:pb-24">
        
        {/* CENTER LEFT HEADLINE & CTA */}
        <div className="my-auto max-w-2xl pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
            >
              {/* Main Headline */}
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#0b1c30] leading-[1.05] mb-6">
                <span className="font-normal block text-slate-800">{slide.title}</span>
                <span className="font-extrabold text-[#003c90] block drop-shadow-sm">{slide.highlightTitle}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-8 max-w-xl">
                {slide.subtitle}
              </motion.p>

              {/* Dentora Style Action Button */}
              <motion.div variants={fadeInUp} className="flex items-center gap-4">
                <button
                  onClick={() => onOpenBooking()}
                  className="bg-[#003c90] text-white hover:bg-[#0f52ba] px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-[#003c90]/20 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3 group"
                >
                  <span>Book a Appointment</span>
                  <div className="w-8 h-8 rounded-full bg-[#006970] group-hover:bg-[#0f52ba] text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5">
                      arrow_forward
                    </span>
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM SECTION: QUICK TAGS */}
        <div className="flex flex-wrap justify-start md:justify-end gap-2.5 sm:gap-3 mb-4">
          {SERVICE_TAGS.map((tag) => {
            const isActive = activeTag === tag.label;
            return (
              <button
                key={tag.label}
                onClick={() => handleSelectTag(tag)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer backdrop-blur-md border ${
                  isActive
                    ? 'bg-[#003c90] text-white border-[#003c90] shadow-lg scale-105'
                    : 'bg-white/80 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                <span className="sm:hidden">{tag.shortLabel}</span>
                <span className="hidden sm:inline">{tag.label}</span>
              </button>
            );
          })}
        </div>

      </div>

    </section>
  );
};
