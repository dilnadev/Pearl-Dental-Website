import React from 'react';
import { Doctor } from '../types';

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBook: (doctorId: string) => void;
}

export const DoctorModal: React.FC<DoctorModalProps> = ({
  doctor,
  onClose,
  onBook,
}) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#f8f9ff] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-[#c3c6d5]/40 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#003c90] text-white p-6 flex justify-between items-start shrink-0 relative">
          <div className="flex gap-4 items-center">
            <img 
              src={doctor.avatar} 
              alt={doctor.name} 
              className="w-20 h-20 rounded-full border-2 border-white object-cover shadow-lg shrink-0" 
            />
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#006970] text-white uppercase tracking-wide inline-block mb-1">
                {doctor.role}
              </span>
              <h3 className="text-xl font-bold">{doctor.name}</h3>
              <p className="text-xs text-white/80">{doctor.title}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-5 text-xs text-[#434653]">
          
          <div>
            <h4 className="text-xs font-bold text-[#003c90] uppercase tracking-wider mb-2">
              Biography & Background
            </h4>
            <p className="text-sm text-[#0b1c30] leading-relaxed">
              {doctor.fullBio}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#003c90] uppercase tracking-wider mb-2">
              Education & Certifications
            </h4>
            <ul className="space-y-1.5">
              {doctor.education.map((edu, idx) => (
                <li key={idx} className="flex items-center gap-2 text-[#0b1c30]">
                  <span className="material-symbols-filled text-[#006970] text-base">school</span>
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#003c90] uppercase tracking-wider mb-2">
              Clinical Specializations
            </h4>
            <div className="flex flex-wrap gap-2">
              {doctor.specializations.map((spec, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#e5eeff] text-[#003c90] font-semibold rounded-lg border border-[#c3c6d5]/40">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#003c90] uppercase tracking-wider mb-2">
              In-Clinic Consultation Schedule
            </h4>
            <p className="text-[#0b1c30] font-semibold">
              Available: {doctor.availableDays.join(', ')} (9:30 AM - 7:00 PM)
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#eff4ff] border-t border-[#c3c6d5]/40 flex justify-between items-center shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#c3c6d5] text-[#434653] hover:bg-white text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBook(doctor.id);
            }}
            className="bg-[#003c90] hover:bg-[#0f52ba] text-white font-semibold px-6 py-2.5 rounded-xl text-xs shadow transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Book Visit with {doctor.name}</span>
            <span className="material-symbols-outlined text-sm">calendar_month</span>
          </button>
        </div>

      </div>
    </div>
  );
};
