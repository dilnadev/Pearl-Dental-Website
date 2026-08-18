import React, { useState } from 'react';
import { Testimonial } from '../types';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveReview: (review: Testimonial) => void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  onClose,
  onSaveReview,
}) => {
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('Kochi, Kerala');
  const [treatment, setTreatment] = useState('Invisalign Treatment');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;

    const newReview: Testimonial = {
      id: Date.now().toString(),
      author,
      location: location || 'Verified Patient',
      text,
      rating,
      date: 'Just now',
      treatment,
    };

    onSaveReview(newReview);
    setAuthor('');
    setText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#f8f9ff] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-[#c3c6d5]/40 flex flex-col">
        
        {/* Header */}
        <div className="bg-[#003c90] text-white p-5 flex justify-between items-center shrink-0">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">rate_review</span>
            <span>Share Your Patient Experience</span>
          </h3>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#0b1c30] uppercase mb-1">Star Rating</label>
            <div className="flex gap-2 text-[#006970]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="cursor-pointer focus:outline-none"
                >
                  <span className={`material-symbols-filled text-2xl ${star <= rating ? 'text-[#006970]' : 'text-slate-300'}`}>
                    star
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0b1c30] uppercase mb-1">Your Name *</label>
            <input
              type="text"
              placeholder="e.g. Rahul Verma"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-white border border-[#c3c6d5] rounded-xl px-3.5 py-2 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#0b1c30] uppercase mb-1">Location</label>
              <input
                type="text"
                placeholder="e.g. Dubai / Kochi"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-[#c3c6d5] rounded-xl px-3.5 py-2 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-[#0b1c30] uppercase mb-1">Treatment</label>
              <input
                type="text"
                placeholder="e.g. Invisalign"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                className="w-full bg-white border border-[#c3c6d5] rounded-xl px-3.5 py-2 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0b1c30] uppercase mb-1">Your Feedback *</label>
            <textarea
              placeholder="Tell us about your experience with Dr. Joseph Sunny, Dr. Monicca Rose or our staff..."
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-white border border-[#c3c6d5] rounded-xl px-3.5 py-2 text-[#0b1c30] focus:ring-2 focus:ring-[#0f52ba] focus:outline-none"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#003c90] hover:bg-[#0f52ba] text-white font-semibold py-3 rounded-xl shadow transition-all cursor-pointer"
            >
              Submit Review
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
