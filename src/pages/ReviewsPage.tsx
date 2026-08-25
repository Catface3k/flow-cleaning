import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  BadgeCheck,
  Plus,
  ThumbsUp,
  Filter,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SERVICES_DATA } from '../data/servicesData';

interface ReviewsPageProps {
  setActiveTab: (tab: string) => void;
  onStartBooking: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ setActiveTab, onStartBooking }) => {
  const { reviews, addReview, showToast } = useBooking();
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // New review form state
  const [authorName, setAuthorName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [rating, setRating] = useState(5);
  const [serviceType, setServiceType] = useState('Residential Regular Clean');
  const [commentText, setCommentText] = useState('');
  const [cleanerName, setCleanerName] = useState('Elena Rostova');

  const filteredReviews = reviews.filter((r) => {
    if (selectedRatingFilter === 'all') return true;
    return r.rating === selectedRatingFilter;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) {
      showToast('Please provide your name and a brief review comment.');
      return;
    }

    addReview({
      author: authorName,
      location: locationName || 'San Francisco',
      rating,
      serviceType,
      comment: commentText,
      cleanerName
    });

    setIsReviewModalOpen(false);
    setAuthorName('');
    setLocationName('');
    setCommentText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header & Stats Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-800 border border-amber-200 px-3.5 py-1 rounded-full text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>4.98 Rating Across 1,400+ Verified Cleans</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-['Lato',sans-serif] tracking-tight">
          Verified Customer Experiences
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Real feedback from homeowners, property managers, and businesses who trust Flow Cleaning for their recurring home hygiene.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-md shadow-blue-200 transition-colors flex items-center cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Write a Verified Review</span>
          </button>
          <button
            onClick={onStartBooking}
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full transition-colors cursor-pointer"
          >
            Book Your First Clean
          </button>
        </div>
      </div>

      {/* Ratings Breakdown Summary Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-4 text-center md:text-left space-y-2">
          <div className="text-5xl font-black text-slate-900 font-['Lato',sans-serif]">4.98</div>
          <div className="flex items-center justify-center md:justify-start text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <p className="text-xs text-slate-500 font-medium">Based on 1,428 post-service quality surveys</p>
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-8 space-y-2">
          {[
            { star: 5, pct: '97%', count: 1385 },
            { star: 4, pct: '3%', count: 43 },
            { star: 3, pct: '0%', count: 0 },
            { star: 2, pct: '0%', count: 0 },
            { star: 1, pct: '0%', count: 0 }
          ].map((bar) => (
            <div key={bar.star} className="flex items-center space-x-3 text-xs">
              <span className="w-12 font-bold text-slate-700">{bar.star} Stars</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: bar.pct }} />
              </div>
              <span className="w-10 text-right text-slate-400 font-medium">{bar.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
          Filter by:
        </span>
        <button
          onClick={() => setSelectedRatingFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            selectedRatingFilter === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Ratings ({reviews.length})
        </button>
        <button
          onClick={() => setSelectedRatingFilter(5)}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            selectedRatingFilter === 5
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          5-Star Cleans Only
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex text-amber-400 mb-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-['Lato',sans-serif]">{rev.author}</h3>
                  <div className="text-[11px] text-slate-400">{rev.location} • {rev.date}</div>
                </div>

                <div className="flex items-center text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  <BadgeCheck className="w-3.5 h-3.5 mr-1 text-blue-600" />
                  Verified Clean
                </div>
              </div>

              <div className="mt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Service Performed: {rev.serviceType}
                </span>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            </div>

            {rev.cleanerName && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Cleaning Lead: <strong className="text-slate-800">{rev.cleanerName}</strong></span>
                <span className="flex items-center text-[11px] text-slate-400">
                  <ThumbsUp className="w-3 h-3 mr-1" /> {rev.helpfulCount} people found helpful
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-['Lato',sans-serif]">Submit Verified Feedback</h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Samantha R."
                    className="w-full bg-slate-50 border border-slate-300 text-xs p-2.5 rounded-xl font-medium focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Neighborhood</label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="e.g. Marina District"
                    className="w-full bg-slate-50 border border-slate-300 text-xs p-2.5 rounded-xl font-medium focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-2 rounded-xl border flex items-center justify-center cursor-pointer ${
                        rating >= star
                          ? 'border-amber-400 bg-amber-50 text-amber-500'
                          : 'border-slate-200 text-slate-400'
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-xs p-2.5 rounded-xl font-medium focus:ring-blue-500 focus:border-blue-500"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Review</label>
                <textarea
                  rows={3}
                  required
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="How did your home look and smell after the Flow Clean?"
                  className="w-full bg-slate-50 border border-slate-300 text-xs p-2.5 rounded-xl font-medium focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-full cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-md shadow-blue-200 cursor-pointer"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
