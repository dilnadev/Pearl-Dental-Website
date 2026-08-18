import React from 'react';
import { Link } from 'react-router-dom';
import { CLINIC_INFO } from '../data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#eff4ff] pt-20 pb-12 border-t border-[#c3c6d5]/30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 px-4 md:px-6 max-w-[1280px] mx-auto mb-16">
        
        {/* Col 1: Brand */}
        <div className="col-span-1">
          <a href="#" className="flex items-center gap-2 mb-4 group text-[#0b1c30]">
            <div className="w-9 h-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-[#003c90] text-base shadow-md group-hover:scale-105 transition-transform">
              🦷
            </div>
            <span className="font-bold text-xl tracking-tight text-[#0b1c30] font-sans">
              Pearl<span className="text-[#003c90] font-medium"> Dental Care</span>
            </span>
          </a>
          <p className="text-sm text-[#434653] leading-relaxed mb-6">
            A Trusted Dental Clinic of Excellence in Kochi. Rely on our expertise for world-class oral care.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h5 className="font-semibold text-lg text-[#003c90] mb-5">Quick Links</h5>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="text-[#434653] hover:text-[#003c90] transition-colors">Home</Link></li>
            <li><a href="/#services" className="text-[#434653] hover:text-[#003c90] transition-colors">Services & Invisalign</a></li>
            <li><a href="/#specialists" className="text-[#434653] hover:text-[#003c90] transition-colors">Specialists</a></li>
            <li><a href="/#testimonials" className="text-[#434653] hover:text-[#003c90] transition-colors">Patient Voices</a></li>
            <li><a href="/#faq" className="text-[#434653] hover:text-[#003c90] transition-colors">Frequently Asked Questions</a></li>
          </ul>
        </div>

        {/* Col 3: Contact */}
        <div id="contact">
          <h5 className="font-semibold text-lg text-[#003c90] mb-5">Contact Us</h5>
          <ul className="space-y-4 text-sm text-[#434653]">
            <li className="flex gap-3 items-start">
              <span className="material-symbols-outlined text-[#003c90] shrink-0 text-xl mt-0.5">location_on</span>
              <span>{CLINIC_INFO.address}</span>
            </li>
            <li className="flex gap-3 items-center">
              <span className="material-symbols-outlined text-[#003c90] shrink-0 text-xl">mail</span>
              <a href={`mailto:${CLINIC_INFO.email}`} className="hover:underline">{CLINIC_INFO.email}</a>
            </li>
            <li className="flex gap-3 items-center">
              <span className="material-symbols-outlined text-[#003c90] shrink-0 text-xl">call</span>
              <a href={`tel:${CLINIC_INFO.phone}`} className="font-bold text-[#0b1c30] hover:underline">{CLINIC_INFO.phone}</a>
            </li>
          </ul>
        </div>

        {/* Col 4: Hours */}
        <div>
          <h5 className="font-semibold text-lg text-[#003c90] mb-5">Clinic Hours</h5>
          <ul className="space-y-3 text-sm text-[#434653]">
            <li className="flex justify-between border-b border-[#c3c6d5]/40 pb-2">
              <span>Mon - Sat</span>
              <span className="font-semibold text-[#0b1c30]">{CLINIC_INFO.hoursWeekdays}</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="font-semibold text-[#006970]">{CLINIC_INFO.hoursSunday}</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-[#c3c6d5]/40 pt-8 px-4 md:px-6 max-w-[1280px] mx-auto text-center text-xs text-[#434653]">
        <p className="mb-3">© 2026 Pearl Dental Care. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <Link to="/privacy-policy" className="hover:text-[#003c90]">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-[#003c90]">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
