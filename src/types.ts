export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  image: string;
  category: string;
  duration: string;
  priceEstimate: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  role: string;
  bio: string;
  fullBio: string;
  experienceYears: number;
  specializations: string[];
  education: string[];
  avatar: string;
  availableDays: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  text: string;
  rating: number;
  date: string;
  treatment: string;
}

export interface AppointmentFormData {
  serviceId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes?: string;
}

export interface BookingConfirmation {
  bookingId: string;
  serviceName: string;
  doctorName: string;
  dateTime: string;
  patientName: string;
  patientPhone: string;
}
