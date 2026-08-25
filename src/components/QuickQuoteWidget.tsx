import React, { useState } from 'react';
import { Sparkles, Calendar, Check, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { FrequencyType } from '../types';

interface QuickQuoteWidgetProps {
  onStartBooking: (params: {
    serviceId: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    frequency: FrequencyType;
  }) => void;
}

export const QuickQuoteWidget: React.FC<QuickQuoteWidgetProps> = ({ onStartBooking }) => {
  const [serviceType, setServiceType] = useState('residential-standard');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [squareFeet, setSquareFeet] = useState(1200);
  const [frequency, setFrequency] = useState<FrequencyType>('bi-weekly');

  // Calculation Logic
  const getEstimatedPrice = () => {
    let base = 139;
    let ratePerSqft = 0.05;

    if (serviceType === 'deep-cleaning') {
      base = 229;
      ratePerSqft = 0.09;
    } else if (serviceType === 'move-in-out') {
      base = 289;
      ratePerSqft = 0.11;
    } else if (serviceType === 'eco-green-pure') {
      base = 159;
      ratePerSqft = 0.06;
    }

    const roomAddition = (bedrooms - 1) * 25 + (bathrooms - 1) * 30;
    const sqftAddition = Math.max(0, squareFeet - 800) * ratePerSqft;
    const rawSubtotal = base + Math.max(0, roomAddition) + sqftAddition;

    let discountPercent = 0;
    if (frequency === 'weekly') discountPercent = 0.20;
    else if (frequency === 'bi-weekly') discountPercent = 0.15;
    else if (frequency === 'monthly') discountPercent = 0.10;

    const discountAmount = rawSubtotal * discountPercent;
    const finalEstimate = Math.round(rawSubtotal - discountAmount);
    const originalPrice = Math.round(rawSubtotal);

    return { finalEstimate, originalPrice, discountPercent: Math.round(discountPercent * 100) };
  };

  const { finalEstimate, originalPrice, discountPercent } = getEstimatedPrice();

  const handleContinue = () => {
    onStartBooking({
      serviceId: serviceType,
      bedrooms,
      bathrooms,
      squareFeet,
      frequency
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-blue-800" />

      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-1">
            Instant Smart Estimator
          </span>
          <h3 className="text-xl font-black text-slate-900 font-['Lato',sans-serif]">
            Get Your Guaranteed Upfront Quote
          </h3>
        </div>
        <div className="hidden sm:flex items-center text-xs font-bold text-slate-500">
          <ShieldCheck className="w-4 h-4 text-blue-600 mr-1" />
          No Hidden Fees
        </div>
      </div>

      <div className="space-y-4">
        {/* Service Type Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            1. Select Cleaning Service
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'residential-standard', label: 'Standard Clean' },
              { id: 'deep-cleaning', label: 'Deep Revival' },
              { id: 'move-in-out', label: 'Move In / Out' },
              { id: 'eco-green-pure', label: 'Eco-Pure Green' }
            ].map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setServiceType(srv.id)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                  serviceType === srv.id
                    ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                {srv.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Bedrooms: <span className="text-blue-600">{bedrooms === 0 ? 'Studio' : `${bedrooms} Bed`}</span>
            </label>
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              {[0, 1, 2, 3, 4, 5].map((bed) => (
                <button
                  key={bed}
                  type="button"
                  onClick={() => setBedrooms(bed)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    bedrooms === bed
                      ? 'bg-white text-blue-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {bed === 0 ? 'Studio' : bed}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Bathrooms: <span className="text-blue-600">{bathrooms} Bath</span>
            </label>
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              {[1, 2, 3, 4, 5].map((bath) => (
                <button
                  key={bath}
                  type="button"
                  onClick={() => setBathrooms(bath)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    bathrooms === bath
                      ? 'bg-white text-blue-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {bath}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Square Footage Slider */}
        <div>
          <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            <span>Approx. Size:</span>
            <span className="text-blue-600 font-extrabold text-sm">{squareFeet.toLocaleString()} sq ft</span>
          </div>
          <input
            type="range"
            min={400}
            max={4000}
            step={100}
            value={squareFeet}
            onChange={(e) => setSquareFeet(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>400 sq ft</span>
            <span>2,000 sq ft</span>
            <span>4,000+ sq ft</span>
          </div>
        </div>

        {/* Frequency & Savings */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Frequency & Automatic Savings
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'weekly', label: 'Weekly', save: '20% OFF' },
              { id: 'bi-weekly', label: 'Bi-Weekly', save: '15% OFF' },
              { id: 'monthly', label: 'Monthly', save: '10% OFF' },
              { id: 'one-time', label: 'One-Time', save: 'Standard' }
            ].map((freq) => (
              <button
                key={freq.id}
                type="button"
                onClick={() => setFrequency(freq.id as FrequencyType)}
                className={`p-2 rounded-xl text-center border transition-all ${
                  frequency === freq.id
                    ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold">{freq.label}</div>
                <div
                  className={`text-[10px] font-semibold mt-0.5 ${
                    frequency === freq.id ? 'text-blue-700' : 'text-blue-600'
                  }`}
                >
                  {freq.save}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Summary Footer & CTA */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-baseline space-x-2">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Estimated Total</div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-slate-900 font-['Lato',sans-serif]">
                ${finalEstimate}
              </span>
              {discountPercent > 0 && (
                <span className="text-sm font-bold text-slate-400 line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
          </div>
          {discountPercent > 0 && (
            <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full flex items-center">
              <Tag className="w-3 h-3 mr-1" />
              Save {discountPercent}%
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-200 transition-all flex items-center justify-center cursor-pointer group"
        >
          <Calendar className="w-4 h-4 mr-2" />
          <span>Book This Clean</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
