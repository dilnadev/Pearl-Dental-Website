import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLINIC_INFO, TIME_SLOTS } from '../data';

interface BookingRecord {
  bookingId: string;
  serviceName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes?: string;
  status: 'confirmed' | 'cancelled';
}

export const ManageBooking: React.FC = () => {
  const [bookingId, setBookingId] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [newDate, setNewDate] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState(TIME_SLOTS[0]);
  const [showReschedule, setShowReschedule] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLookupError(null);
    setActionMessage(null);
    try {
      const res = await fetch('/api/bookings/find', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: bookingId.trim(), patientPhone: patientPhone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLookupError(data.error || 'Booking not found');
        setBooking(null);
        return;
      }
      setBooking(data.booking);
      setNewDate(data.booking.date);
      setNewTimeSlot(data.booking.timeSlot);
    } catch {
      setLookupError('Could not reach the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReschedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;
    setActionError(null);
    setActionMessage(null);
    setIsLoading(true);
    try {
      const res = await fetch(`/api/bookings/${booking.bookingId}/reschedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientPhone: booking.patientPhone, date: newDate, timeSlot: newTimeSlot }),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || 'Could not reschedule');
        return;
      }
      setBooking(data.booking);
      setShowReschedule(false);
      setActionMessage('Your appointment has been rescheduled.');
    } catch {
      setActionError('Could not reach the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!booking) return;
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    setActionError(null);
    setActionMessage(null);
    setIsLoading(true);
    try {
      const res = await fetch(`/api/bookings/${booking.bookingId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientPhone: booking.patientPhone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || 'Could not cancel');
        return;
      }
      setBooking(data.booking);
      setActionMessage('Your appointment has been cancelled.');
    } catch {
      setActionError('Could not reach the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] p-6 sm:p-10">
      <div className="max-w-xl mx-auto">

        <Link to="/" className="text-sm text-[#003c90] font-semibold hover:underline flex items-center gap-1 mb-6">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Home
        </Link>

        <h1 className="text-2xl font-bold text-[#003c90] mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined">manage_search</span>
          Manage My Booking
        </h1>
        <p className="text-sm text-[#434653] mb-6">
          Enter your Booking Reference and the phone number you booked with to reschedule or cancel.
        </p>

        {!booking && (
          <form onSubmit={handleLookup} className="bg-white rounded-2xl shadow border border-[#c3c6d5]/40 p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0b1c30] uppercase mb-1.5">Booking Reference</label>
              <input
                type="text"
                placeholder="e.g. PDC-123456"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                className="w-full bg-white border border-[#c3c6d5] rounded-xl px-4 py-2.5 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0b1c30] uppercase mb-1.5">Phone Number</label>
              <input
                type="tel"
                placeholder="Phone used while booking"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full bg-white border border-[#c3c6d5] rounded-xl px-4 py-2.5 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
                required
              />
            </div>

            {lookupError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3">
                {lookupError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#003c90] hover:bg-[#0f52ba] text-white font-semibold py-3 rounded-xl shadow transition-all cursor-pointer disabled:opacity-70"
            >
              {isLoading ? 'Searching…' : 'Find My Booking'}
            </button>
          </form>
        )}

        {booking && (
          <div className="bg-white rounded-2xl shadow border border-[#c3c6d5]/40 overflow-hidden">
            <div className="bg-[#003c90] text-white p-5 flex justify-between items-center">
              <div>
                <p className="text-xs text-white/80">Booking Reference</p>
                <p className="font-mono font-bold text-lg">{booking.bookingId}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {booking.status === 'cancelled' ? 'Cancelled' : 'Confirmed'}
              </span>
            </div>

            <div className="p-6 space-y-4">
              {actionMessage && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3">
                  {actionMessage}
                </div>
              )}
              {actionError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                  {actionError}
                </div>
              )}

              <div className="bg-[#e5eeff] p-5 rounded-xl text-sm space-y-3 border border-[#c3c6d5]/30">
                <div className="flex justify-between border-b border-[#c3c6d5]/40 pb-2">
                  <span className="text-[#434653]">Patient:</span>
                  <span className="font-semibold text-[#0b1c30]">{booking.patientName}</span>
                </div>
                <div className="flex justify-between border-b border-[#c3c6d5]/40 pb-2">
                  <span className="text-[#434653]">Service:</span>
                  <span className="font-semibold text-[#006970]">{booking.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-[#c3c6d5]/40 pb-2">
                  <span className="text-[#434653]">Specialist:</span>
                  <span className="font-semibold text-[#0b1c30]">{booking.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#434653]">Date & Time:</span>
                  <span className="font-bold text-[#003c90]">{booking.date} at {booking.timeSlot}</span>
                </div>
              </div>

              {booking.status !== 'cancelled' && !showReschedule && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowReschedule(true)}
                    className="bg-[#e5eeff] hover:bg-[#d5e2ff] text-[#003c90] font-semibold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">event_repeat</span>
                    Reschedule
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-3 rounded-xl transition-all cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">cancel</span>
                    Cancel
                  </button>
                </div>
              )}

              {booking.status !== 'cancelled' && showReschedule && (
                <form onSubmit={handleReschedule} className="space-y-3 pt-2 border-t border-[#c3c6d5]/40">
                  <label className="block text-xs font-bold text-[#0b1c30] uppercase mb-1.5">New Date & Time</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={newDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full bg-white border border-[#c3c6d5] rounded-xl px-4 py-2.5 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
                      required
                    />
                    <select
                      value={newTimeSlot}
                      onChange={(e) => setNewTimeSlot(e.target.value)}
                      className="w-full bg-white border border-[#c3c6d5] rounded-xl px-4 py-2.5 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowReschedule(false)}
                      className="bg-white border border-[#c3c6d5] text-[#434653] font-semibold py-2.5 rounded-xl cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#003c90] hover:bg-[#0f52ba] text-white font-semibold py-2.5 rounded-xl cursor-pointer disabled:opacity-70"
                    >
                      {isLoading ? 'Saving…' : 'Confirm New Time'}
                    </button>
                  </div>
                </form>
              )}

              {booking.status === 'cancelled' && (
                <p className="text-sm text-[#434653]">
                  This appointment has been cancelled. Call us at <a href={`tel:${CLINIC_INFO.phone}`} className="font-semibold text-[#003c90]">{CLINIC_INFO.phone}</a> if you'd like to book a new one.
                </p>
              )}

              <button
                onClick={() => { setBooking(null); setBookingId(''); setPatientPhone(''); setActionMessage(null); setActionError(null); }}
                className="w-full text-xs text-[#434653] hover:text-[#003c90] pt-2 cursor-pointer"
              >
                Look up a different booking
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
