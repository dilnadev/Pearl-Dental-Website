import React, { useEffect, useState } from 'react';

interface BookingRecord {
  bookingId: string;
  serviceName: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

const REFRESH_INTERVAL_MS = 5000;

export const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load bookings');
      setBookings(data.bookings || []);
      setError(null);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message || 'Could not reach the server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9ff] p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#003c90] flex items-center gap-2">
              <span className="material-symbols-outlined">calendar_month</span>
              Appointment Bookings
            </h1>
            <p className="text-sm text-[#434653]">Pearl Dental Care — Admin View</p>
          </div>
          <div className="text-xs text-[#434653] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Live — auto-refreshing every 5s
            {lastUpdated && (
              <span className="text-[#9ca3af]">· updated {lastUpdated.toLocaleTimeString()}</span>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow border border-[#c3c6d5]/40 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-[#434653]">Loading bookings…</div>
          ) : bookings.length === 0 ? (
            <div className="p-10 text-center text-[#434653]">
              <span className="material-symbols-outlined text-4xl text-[#c3c6d5] block mb-2">inbox</span>
              No appointments yet. Bookings will appear here automatically as patients submit the form.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#e5eeff] text-[#003c90] text-xs uppercase font-bold">
                  <tr>
                    <th className="px-4 py-3 text-left">Booking ID</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Patient</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Service</th>
                    <th className="px-4 py-3 text-left">Doctor</th>
                    <th className="px-4 py-3 text-left">Date & Time</th>
                    <th className="px-4 py-3 text-left">Notes</th>
                    <th className="px-4 py-3 text-left">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c3c6d5]/30">
                  {bookings.map((b) => (
                    <tr key={b.bookingId} className={`hover:bg-[#f8f9ff] ${b.status === 'cancelled' ? 'opacity-60' : ''}`}>
                      <td className="px-4 py-3 font-mono font-bold text-[#003c90]">{b.bookingId}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {b.status === 'cancelled' ? 'Cancelled' : 'Confirmed'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#0b1c30]">{b.patientName}</td>
                      <td className="px-4 py-3 text-[#434653]">{b.patientPhone}</td>
                      <td className="px-4 py-3 text-[#434653]">{b.patientEmail}</td>
                      <td className="px-4 py-3 text-[#006970] font-semibold">{b.serviceName}</td>
                      <td className="px-4 py-3 text-[#0b1c30]">{b.doctorName}</td>
                      <td className="px-4 py-3 font-semibold text-[#003c90] whitespace-nowrap">{b.date} {b.timeSlot}</td>
                      <td className="px-4 py-3 text-[#434653] max-w-xs truncate">{b.notes || '—'}</td>
                      <td className="px-4 py-3 text-[#9ca3af] whitespace-nowrap">{new Date(b.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-[#9ca3af] mt-4">
          {bookings.length} appointment{bookings.length === 1 ? '' : 's'} total
        </p>
      </div>
    </div>
  );
};
