import React from 'react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBook: (serviceId: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onBook,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#f8f9ff] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-[#c3c6d5]/40 max-h-[90vh] flex flex-col">
        
        {/* Header with Hero Image */}
        <div className="relative h-56 md:h-64 shrink-0 overflow-hidden bg-slate-900">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30] via-[#0b1c30]/40 to-transparent"></div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors z-10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#006970] text-white uppercase tracking-wider mb-2 inline-block">
              {service.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          
          {/* Key Quick Facts */}
          <div className="grid grid-cols-2 gap-4 bg-[#e5eeff] p-4 rounded-xl border border-[#c3c6d5]/30 text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#003c90] text-lg">schedule</span>
              <div>
                <p className="text-[#434653] font-semibold">Typical Duration</p>
                <p className="font-bold text-[#0b1c30]">{service.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006970] text-lg">payments</span>
              <div>
                <p className="text-[#434653] font-semibold">Estimate / Plan</p>
                <p className="font-bold text-[#0b1c30]">{service.priceEstimate}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-[#003c90] uppercase tracking-wider mb-2">
              About Procedure
            </h4>
            <p className="text-sm text-[#434653] leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Key Benefits */}
          <div>
            <h4 className="text-sm font-bold text-[#003c90] uppercase tracking-wider mb-3">
              Key Patient Benefits
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#0b1c30]">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-[#c3c6d5]/40">
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-[#003c90] uppercase tracking-wider mb-3">
                Frequently Asked Questions
              </h4>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-[#c3c6d5]/40 text-xs space-y-1">
                    <p className="font-bold text-[#003c90] flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-[#006970]">help</span>
                      <span>{faq.question}</span>
                    </p>
                    <p className="text-[#434653] leading-relaxed pl-6">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer CTAs */}
        <div className="p-4 bg-[#eff4ff] border-t border-[#c3c6d5]/40 flex justify-between items-center gap-4 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#c3c6d5] text-[#434653] hover:bg-white text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBook(service.id);
            }}
            className="bg-[#003c90] hover:bg-[#0f52ba] text-white font-semibold px-6 py-2.5 rounded-xl text-xs shadow transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Book Consultation for {service.title}</span>
            <span className="material-symbols-outlined text-sm">calendar_month</span>
          </button>
        </div>

      </div>
    </div>
  );
};
