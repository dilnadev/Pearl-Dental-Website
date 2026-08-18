import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CLINIC_INFO } from '../data';

export const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans antialiased">
      <Navbar onOpenBooking={() => navigate('/')} />

      <main className="max-w-3xl mx-auto px-4 md:px-8 pt-36 pb-24">
        <span className="text-xs font-mono uppercase tracking-widest text-[#003c90] font-bold px-3 py-1 rounded-full bg-[#eef4ff] border border-[#003c90]/30 inline-block mb-3">
          LEGAL
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#0b1c30] tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: January 2026</p>

        <div className="space-y-8 text-sm md:text-base text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">1. Acceptance of Terms</h2>
            <p>
              By using this website or booking an appointment with {CLINIC_INFO.name}, you agree to these Terms of
              Service. If you do not agree with any part of these terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">2. Appointments &amp; Bookings</h2>
            <p>
              Appointment requests made through this website are subject to confirmation by our clinic staff.
              Booking a slot online does not guarantee treatment until confirmed. We recommend arriving on time and
              notifying us as early as possible if you need to reschedule or cancel.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">3. Medical Disclaimer</h2>
            <p>
              Content on this website, including descriptions of treatments and procedures, is provided for general
              informational purposes only and does not constitute medical advice. Please consult our dentists
              directly for diagnosis and treatment recommendations specific to your condition.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">4. Patient Reviews</h2>
            <p>
              Reviews submitted through our website should reflect genuine patient experiences. We reserve the
              right to moderate or remove reviews that are false, abusive, or violate the privacy of others.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">5. Limitation of Liability</h2>
            <p>
              While we strive to keep information on this website accurate and up to date, {CLINIC_INFO.name} makes
              no warranties about the completeness or reliability of website content and is not liable for any loss
              arising from its use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">6. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Continued use of our website after changes
              are posted constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">7. Contact Us</h2>
            <p>
              Questions about these Terms of Service can be directed to{' '}
              <a href={`mailto:${CLINIC_INFO.email}`} className="text-[#003c90] font-semibold hover:underline">
                {CLINIC_INFO.email}
              </a>{' '}
              or{' '}
              <a href={`tel:${CLINIC_INFO.phone}`} className="text-[#003c90] font-semibold hover:underline">
                {CLINIC_INFO.phone}
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
