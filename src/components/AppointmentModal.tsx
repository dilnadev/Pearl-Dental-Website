import React, { useState } from 'react';
import { SERVICES, DOCTORS, CLINIC_INFO } from '../data';
import { AppointmentFormData, BookingConfirmation } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedDoctorId?: string;
}

const TIME_SLOTS = [
  "09:30 AM", "10:30 AM", "11:30 AM",
  "02:00 PM", "03:30 PM", "05:00 PM", "06:15 PM"
];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedDoctorId,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    serviceId: preselectedServiceId || SERVICES[0].id,
    doctorId: preselectedDoctorId || DOCTORS[0].id,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: TIME_SLOTS[0],
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    notes: '',
  });

  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const selectedService = SERVICES.find(s => s.id === formData.serviceId);
      const selectedDoctor = DOCTORS.find(d => d.id === formData.doctorId);
      const randomNum = Math.floor(100000 + Math.random() * 900000);

      const result: BookingConfirmation = {
        bookingId: `PDC-${randomNum}`,
        serviceName: selectedService ? selectedService.title : 'General Consultation',
        doctorName: selectedDoctor ? selectedDoctor.name : 'Lead Specialist',
        dateTime: `${formData.date} at ${formData.timeSlot}`,
        patientName: formData.patientName,
        patientPhone: formData.patientPhone,
      };

      setConfirmation(result);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setConfirmation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#f8f9ff] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-[#c3c6d5]/40 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#003c90] text-white p-6 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">calendar_month</span>
              <span>{confirmation ? 'Booking Confirmed!' : 'Book an Appointment'}</span>
            </h3>
            <p className="text-xs text-white/80 mt-1">
              {confirmation ? 'We look forward to seeing you at Pearl Dental Care' : 'Choose your doctor, service & preferred time slot'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {confirmation ? (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-[#003c90] mb-1">Appointment Reserved</h4>
                <p className="text-sm text-[#434653]">
                  Confirmation message sent to <span className="font-semibold text-[#0b1c30]">{confirmation.patientPhone}</span>
                </p>
              </div>

              <div className="bg-[#e5eeff] p-5 rounded-xl text-left space-y-3 text-sm border border-[#c3c6d5]/30">
                <div className="flex justify-between border-b border-[#c3c6d5]/40 pb-2">
                  <span className="text-[#434653]">Booking Reference:</span>
                  <span className="font-mono font-bold text-[#003c90]">{confirmation.bookingId}</span>
                </div>
                <div className="flex justify-between border-b border-[#c3c6d5]/40 pb-2">
                  <span className="text-[#434653]">Patient Name:</span>
                  <span className="font-semibold text-[#0b1c30]">{confirmation.patientName}</span>
                </div>
                <div className="flex justify-between border-b border-[#c3c6d5]/40 pb-2">
                  <span className="text-[#434653]">Selected Service:</span>
                  <span className="font-semibold text-[#006970]">{confirmation.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-[#c3c6d5]/40 pb-2">
                  <span className="text-[#434653]">Specialist:</span>
                  <span className="font-semibold text-[#0b1c30]">{confirmation.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#434653]">Date & Time:</span>
                  <span className="font-bold text-[#003c90]">{confirmation.dateTime}</span>
                </div>
              </div>

              <div className="bg-[#f8f9ff] p-4 rounded-xl text-xs text-[#434653] border border-[#c3c6d5]/30 text-left flex gap-3 items-start">
                <span className="material-symbols-outlined text-[#003c90] text-lg shrink-0 mt-0.5">location_on</span>
                <div>
                  <p className="font-semibold text-[#0b1c30]">{CLINIC_INFO.name}</p>
                  <p>{CLINIC_INFO.address}</p>
                  <p className="mt-1 font-semibold text-[#006970]">Helpline: {CLINIC_INFO.phone}</p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full bg-[#003c90] hover:bg-[#0f52ba] text-white font-semibold py-3.5 rounded-xl shadow transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-[#0b1c30] uppercase mb-1.5">
                  1. Select Service / Treatment
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full bg-white border border-[#c3c6d5] rounded-xl px-4 py-2.5 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
                  required
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.category})
                    </option>
                  ))}
                  <option value="general">General Checkup & Cleaning</option>
                </select>
              </div>

              {/* Doctor Selection */}
              <div>
                <label className="block text-xs font-bold text-[#0b1c30] uppercase mb-1.5">
                  2. Select Specialist
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {DOCTORS.map((doc) => (
                    <button
                      type="button"
                      key={doc.id}
                      onClick={() => setFormData({ ...formData, doctorId: doc.id })}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                        formData.doctorId === doc.id
                          ? 'border-[#003c90] bg-[#e5eeff] ring-2 ring-[#003c90]/20'
                          : 'border-[#c3c6d5] bg-white hover:border-[#003c90]'
                      }`}
                    >
                      <img src={doc.avatar} alt={doc.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                      <div>
                        <p className="font-bold text-xs text-[#0b1c30]">{doc.name}</p>
                        <p className="text-[10px] text-[#434653] line-clamp-1">{doc.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0b1c30] uppercase mb-1.5">
                    3. Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white border border-[#c3c6d5] rounded-xl px-4 py-2.5 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b1c30] uppercase mb-1.5">
                    4. Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-white border border-[#c3c6d5] rounded-xl px-4 py-2.5 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
                    required
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Details */}
              <div className="pt-2 border-t border-[#c3c6d5]/40 space-y-3">
                <label className="block text-xs font-bold text-[#0b1c30] uppercase">
                  5. Patient Information
                </label>

                <div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full bg-white border border-[#c3c6d5] rounded-xl px-4 py-2.5 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="Phone Number (+91) *"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                    className="w-full bg-white border border-[#c3c6d5] rounded-xl px-4 py-2.5 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={formData.patientEmail}
                    onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                    className="w-full bg-white border border-[#c3c6d5] rounded-xl px-4 py-2.5 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Describe any symptoms or preferences (optional)"
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-white border border-[#c3c6d5] rounded-xl px-4 py-2.5 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#003c90] hover:bg-[#0f52ba] text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Processing Reservation...</span>
                  ) : (
                    <>
                      <span>Confirm Consultation Request</span>
                      <span className="material-symbols-outlined text-lg">check</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
