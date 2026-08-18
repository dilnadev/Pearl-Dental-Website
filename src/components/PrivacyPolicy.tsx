import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CLINIC_INFO } from '../data';

export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans antialiased">
      <Navbar onOpenBooking={() => navigate('/')} />

      <main className="max-w-3xl mx-auto px-4 md:px-8 pt-36 pb-24">
        <span className="text-xs font-mono uppercase tracking-widest text-[#003c90] font-bold px-3 py-1 rounded-full bg-[#eef4ff] border border-[#003c90]/30 inline-block mb-3">
          LEGAL
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#0b1c30] tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: January 2026</p>

        <div className="space-y-8 text-sm md:text-base text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">1. Information We Collect</h2>
            <p>
              When you book an appointment, submit a review, or contact {CLINIC_INFO.name}, we may collect
              information such as your name, phone number, email address, and any notes you provide about your
              dental history or symptoms. We only collect what is necessary to provide and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">2. How We Use Your Information</h2>
            <p>
              We use the information you provide to schedule and manage appointments, respond to your enquiries,
              send appointment reminders, and maintain accurate patient records. We do not sell your personal
              information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">3. Data Security</h2>
            <p>
              We take reasonable administrative and technical measures to protect your personal information from
              unauthorized access, disclosure, or misuse. However, no method of electronic storage or transmission
              is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">4. Sharing of Information</h2>
            <p>
              We do not share your personal information with third parties except where necessary to provide your
              treatment (e.g. referring specialists), comply with legal obligations, or with your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">5. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information held by us at any
              time by contacting us using the details below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#003c90] mb-2">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href={`mailto:${CLINIC_INFO.email}`} className="text-[#003c90] font-semibold hover:underline">
                {CLINIC_INFO.email}
              </a>{' '}
              or call{' '}
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
