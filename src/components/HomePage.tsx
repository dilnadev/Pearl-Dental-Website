import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { TrustMetrics } from './TrustMetrics';
import { ScrollShowcase } from './ScrollShowcase';
import { ServicesGrid } from './ServicesGrid';
import { SmileStudioSection } from './SmileStudioSection';
import { SpecialistsSection } from './SpecialistsSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FaqSection } from './FaqSection';
import { AppointmentBanner } from './AppointmentBanner';
import { Footer } from './Footer';
import { AppointmentModal } from './AppointmentModal';
import { ServiceModal } from './ServiceModal';
import { DoctorModal } from './DoctorModal';
import { AddReviewModal } from './AddReviewModal';
import { ServiceItem, Doctor, Testimonial } from '../types';
import { INITIAL_TESTIMONIALS } from '../data';

export const HomePage: React.FC = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [addReviewOpen, setAddReviewOpen] = useState(false);

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | undefined>(undefined);

  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  const handleOpenBooking = (serviceId?: string, doctorId?: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedDoctorId(doctorId);
    setBookingOpen(true);
  };

  const handleAddReview = (newReview: Testimonial) => {
    setTestimonials([newReview, ...testimonials]);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans selection:bg-[#003c90] selection:text-white antialiased">
      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Trust Metrics */}
        <TrustMetrics />

        {/* Apple Signature Sticky Scroll Showcase */}
        <ScrollShowcase />

        {/* Bento Grid Services */}
        <div className="bg-white text-[#0b1c30]">
          <ServicesGrid
            onSelectService={(service) => setSelectedService(service)}
          />
        </div>

        {/* Interactive Before/After Smile Transformation Studio */}
        <SmileStudioSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Expert Specialists */}
        <div className="bg-[#f8f9ff]">
          <SpecialistsSection
            onSelectDoctor={(doctor) => setSelectedDoctor(doctor)}
            onBookDoctor={(doctorId) => handleOpenBooking(undefined, doctorId)}
          />
        </div>

        {/* Patient Testimonials */}
        <TestimonialsSection
          testimonials={testimonials}
          onAddReview={() => setAddReviewOpen(true)}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Call To Action Banner */}
        <AppointmentBanner
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedServiceId={preselectedServiceId}
        preselectedDoctorId={preselectedDoctorId}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={(serviceId) => handleOpenBooking(serviceId)}
      />

      <DoctorModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBook={(doctorId) => handleOpenBooking(undefined, doctorId)}
      />

      <AddReviewModal
        isOpen={addReviewOpen}
        onClose={() => setAddReviewOpen(false)}
        onSaveReview={handleAddReview}
      />
    </div>
  );
};
