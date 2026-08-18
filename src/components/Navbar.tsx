import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('Home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      const navItems = [
        { id: 'hero', name: 'Home' },
        { id: 'services', name: 'Services' },
        { id: 'showcase', name: 'About Us' },
        { id: 'testimonials', name: 'Testimonial' },
        { id: 'contact', name: 'Contact' },
      ];

      for (const item of navItems) {
        if (item.id === 'hero' && window.scrollY < 400) {
          setActiveTab('Home');
          break;
        }
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(item.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NAV_ITEMS = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'About Us', href: '/#showcase' },
    { name: 'Testimonial', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 pt-3 md:pt-4 px-4 md:px-8 pointer-events-none">
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-[#006970] to-[#0f52ba] origin-left z-50 shadow-[0_0_12px_#38bdf8]"
        style={{ scaleX }}
      />

      {/* Floating Header Bar matching Dentora reference */}
      <div className="max-w-[1340px] mx-auto flex justify-between items-center pointer-events-auto">
        
        {/* Brand Logo (Dentora / Pearl Dental Care) */}
        <a href="/" className="flex items-center gap-2 group text-[#0b1c30]">
          <div className="w-9 h-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-[#003c90] text-base shadow-md group-hover:scale-105 transition-transform">
            🦷
          </div>
          <span className="font-bold text-xl tracking-tight text-[#0b1c30] font-sans">
            Pearl<span className="text-[#003c90] font-medium"> Dental Care</span>
          </span>
        </a>

        {/* Center Floating Glass Capsule Bar (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/85 backdrop-blur-xl border border-slate-200/80 p-1.5 rounded-full shadow-lg shadow-slate-900/5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab(item.name)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 relative ${
                  isActive
                    ? 'bg-[#003c90] text-white shadow-md font-bold'
                    : 'text-slate-600 hover:text-[#003c90] hover:bg-slate-100/80'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Pill Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="bg-[#003c90] hover:bg-[#0f52ba] text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-lg shadow-[#003c90]/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>Book a Call</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="bg-[#003c90] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white border border-slate-200 text-slate-800 focus:outline-none shadow-md"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-sm mx-auto bg-white/95 text-slate-800 backdrop-blur-2xl border border-slate-200 rounded-3xl p-5 shadow-2xl flex flex-col gap-3 pointer-events-auto">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => {
                setActiveTab(item.name);
                setMobileMenuOpen(false);
              }}
              className="font-medium text-sm py-2 px-4 rounded-xl hover:bg-slate-100 transition-colors flex justify-between items-center text-slate-700"
            >
              <span>{item.name}</span>
              <span className="material-symbols-outlined text-xs opacity-50">arrow_forward</span>
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="bg-[#003c90] text-white font-bold py-3 rounded-full shadow-md text-center text-xs uppercase tracking-wider w-full mt-2"
          >
            Book a Appointment
          </button>
        </div>
      )}
    </header>
  );
};
