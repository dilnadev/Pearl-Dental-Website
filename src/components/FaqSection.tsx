import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { fadeInUp, staggerContainer, viewportOnce } from '../lib/motion';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'invisalign-duration',
    question: 'How long does Invisalign aligner treatment usually take?',
    answer: 'Most Invisalign treatments at Pearl Dental Care take between 6 to 18 months depending on case complexity. Dr. Joseph Sunny generates a precise 3D iTero digital timeline prior to starting so you know your exact treatment duration from Day 1.'
  },
  {
    id: 'implants-safety',
    question: 'Are dental implants permanent and safe?',
    answer: 'Yes! Dental implants made from medical-grade biocompatible titanium and ceramic have a success rate over 98%. With good oral hygiene and routine checkups, implants are a permanent, life-long replacement for missing teeth.'
  },
  {
    id: 'root-canal-pain',
    question: 'Is root canal treatment painful?',
    answer: 'No. Modern root canal treatment at Pearl Dental Care uses precise rotary instruments and gentle local anesthesia. Patients experience no more sensation than receiving a standard dental filling, quickly relieving existing toothache.'
  },
  {
    id: 'clinic-difference',
    question: 'What sets Pearl Dental Care apart in Kochi?',
    answer: 'We combine Diamond-certified Orthodontic leadership (Dr. Joseph Sunny) with high-precision digital technology like the 3D iTero intraoral scanner, low-radiation digital OPG radiographs, and dental lasers in an ultra-sterile, comfortable environment.'
  },
  {
    id: 'emergency-care',
    question: 'Do you offer same-day emergency dental appointments in Kochi?',
    answer: 'Yes, we reserve dedicated daily slots for acute toothaches, chipped teeth, or dental trauma. Call our emergency helpline directly at +91 9497343412 for immediate assistance.'
  },
  {
    id: 'checkup-frequency',
    question: 'How often should I schedule a professional dental checkup and cleaning?',
    answer: 'We recommend a professional checkup and routine scaling/cleaning every 6 months to prevent plaque buildup, detect early cavities, and maintain optimal gum health.'
  }
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-16 md:py-24 bg-[#f0f5ff] text-[#0b1c30] border-t border-slate-200/80" id="faq">
      <div className="px-4 md:px-8 max-w-[1340px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0b1c30] tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-3xl mx-auto space-y-4"
        >
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                variants={fadeInUp}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[#003c90] bg-[#eef4ff] shadow-md' : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 md:p-6 text-left flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base md:text-lg text-[#0b1c30] flex items-center gap-3">
                    <span>{faq.question}</span>
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#003c90] text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <span className="material-symbols-outlined text-xl">
                      expand_more
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-6 md:px-6 md:pb-6 text-sm md:text-base text-slate-700 leading-relaxed font-normal border-t border-slate-200/80 pt-4"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

