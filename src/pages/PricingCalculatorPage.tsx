import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Tag,
  ArrowRight,
  Clock,
  Award,
  Zap,
  HelpCircle
} from 'lucide-react';
import { ADD_ONS_DATA, SERVICES_DATA } from '../data/servicesData';
import { FrequencyType } from '../types';

interface PricingCalculatorPageProps {
  setActiveTab: (tab: string) => void;
  onStartBookingWithParams: (params: {
    serviceId: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    frequency: FrequencyType;
  }) => void;
}

export const PricingCalculatorPage: React.FC<PricingCalculatorPageProps> = ({
  setActiveTab,
  onStartBookingWithParams
}) => {
  const [serviceTier, setServiceTier] = useState<string>('residential-standard');
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [sqft, setSqft] = useState<number>(1400);
  const [frequency, setFrequency] = useState<FrequencyType>('bi-weekly');

  const calculateEstimate = () => {
    let base = 139;
    let rate = 0.05;
    let baseHours = 3.0;

    if (serviceTier === 'deep-cleaning') {
      base = 229;
      rate = 0.09;
      baseHours = 5.0;
    } else if (serviceTier === 'move-in-out') {
      base = 289;
      rate = 0.11;
      baseHours = 6.5;
    } else if (serviceTier === 'eco-green-pure') {
      base = 159;
      rate = 0.06;
      baseHours = 3.5;
    }

    const roomAddition = (bedrooms - 1) * 25 + (bathrooms - 1) * 30;
    const sqftAddition = Math.max(0, sqft - 800) * rate;
    const rawSubtotal = base + Math.max(0, roomAddition) + sqftAddition;

    let discountPercent = 0;
    if (frequency === 'weekly') discountPercent = 0.20;
    else if (frequency === 'bi-weekly') discountPercent = 0.15;
    else if (frequency === 'monthly') discountPercent = 0.10;

    const discountAmount = rawSubtotal * discountPercent;
    const finalPrice = Math.round(rawSubtotal - discountAmount);
    const estTime = (baseHours + (bedrooms - 1) * 0.4 + (bathrooms - 1) * 0.5).toFixed(1);

    return {
      finalPrice,
      originalPrice: Math.round(rawSubtotal),
      discountAmount: Math.round(discountAmount),
      discountPercent: Math.round(discountPercent * 100),
      estTime
    };
  };

  const { finalPrice, originalPrice, discountAmount, discountPercent, estTime } = calculateEstimate();

  const handleBookNow = () => {
    onStartBookingWithParams({
      serviceId: serviceTier,
      bedrooms,
      bathrooms,
      squareFeet: sqft,
      frequency
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold">
          <Tag className="w-3.5 h-3.5 text-blue-600" />
          <span>100% Upfront Transparent Rates</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-['Lato',sans-serif] tracking-tight">
          Pricing & Instant Cost Estimator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          No vague estimates, no hidden equipment fees, and zero surprise upcharges at your doorstep. What you see is what you pay.
        </p>
      </div>

      {/* Interactive Big Estimator Calculator */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls on Left */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 font-['Lato',sans-serif]">Custom Home Specifications</h2>

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Service Tier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'residential-standard', label: 'Standard Maintenance' },
                  { id: 'deep-cleaning', label: 'Deep Revival Clean' },
                  { id: 'move-in-out', label: 'Move In / Out Clean' },
                  { id: 'eco-green-pure', label: '100% Eco-Pure' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setServiceTier(s.id)}
                    className={`py-2.5 px-2 rounded-2xl text-xs font-semibold border transition-all text-center ${
                      serviceTier === s.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs font-bold'
                        : 'border-slate-200 text-slate-600 bg-slate-50/50 hover:bg-slate-50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Bedrooms ({bedrooms === 0 ? 'Studio' : `${bedrooms} Beds`})
                </label>
                <div className="flex rounded-full bg-slate-100 p-1 border border-slate-200">
                  {[0, 1, 2, 3, 4, 5].map((bed) => (
                    <button
                      key={bed}
                      type="button"
                      onClick={() => setBedrooms(bed)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
                        bedrooms === bed ? 'bg-white text-blue-900 shadow-xs font-bold' : 'text-slate-600'
                      }`}
                    >
                      {bed === 0 ? 'Studio' : bed}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Bathrooms ({bathrooms} Baths)
                </label>
                <div className="flex rounded-full bg-slate-100 p-1 border border-slate-200">
                  {[1, 2, 3, 4, 5].map((bath) => (
                    <button
                      key={bath}
                      type="button"
                      onClick={() => setBathrooms(bath)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
                        bathrooms === bath ? 'bg-white text-blue-900 shadow-xs font-bold' : 'text-slate-600'
                      }`}
                    >
                      {bath}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sqft Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span>Approximate Square Footage:</span>
                <span className="text-blue-600 font-extrabold text-sm">{sqft.toLocaleString()} sq ft</span>
              </div>
              <input
                type="range"
                min={400}
                max={4000}
                step={100}
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Frequency Options */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Recurring Frequency Savings
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'weekly', title: 'Weekly', save: '20% OFF' },
                  { id: 'bi-weekly', title: 'Bi-Weekly', save: '15% OFF' },
                  { id: 'monthly', title: 'Monthly', save: '10% OFF' },
                  { id: 'one-time', title: 'One-Time', save: 'Standard' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFrequency(f.id as FrequencyType)}
                    className={`p-3 rounded-2xl border transition-all text-center ${
                      frequency === f.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs font-bold'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-semibold">{f.title}</div>
                    <div className="text-[11px] font-extrabold text-blue-600 mt-0.5">{f.save}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Estimate Box on Right */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm border border-slate-800">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Guaranteed Upfront Total
              </span>
              <span className="text-xs text-slate-400 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                Est. ~{estTime} hrs on-site
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl sm:text-5xl font-black font-['Lato',sans-serif] text-white">
                  ${finalPrice}
                </span>
                {discountAmount > 0 && (
                  <span className="text-lg font-bold text-slate-500 line-through">
                    ${originalPrice}
                  </span>
                )}
              </div>

              {discountAmount > 0 && (
                <div className="inline-flex items-center text-xs font-bold bg-blue-950 text-blue-300 border border-blue-800 px-3 py-1 rounded-full">
                  <Tag className="w-3.5 h-3.5 mr-1" />
                  Saving ${discountAmount} ({discountPercent}% Recurrence Discount)
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
                  Eco-Certified Botanical Supplies
                </span>
                <strong className="text-white">Included ($0)</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
                  $2M General Liability Insurance
                </span>
                <strong className="text-white">Included ($0)</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
                  200% Satisfaction Re-clean
                </span>
                <strong className="text-white">Included ($0)</strong>
              </div>
            </div>

            <button
              onClick={handleBookNow}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-full shadow-lg shadow-blue-200 transition-all flex items-center justify-center cursor-pointer"
            >
              <span>Proceed to 60s Online Booking</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Transparent Service Comparison Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Side-by-Side Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-['Lato',sans-serif]">
            Transparent Service Level Comparison
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-4 font-bold text-slate-500 uppercase">Protocol Feature</th>
                <th className="py-3 px-4 font-bold text-slate-900">Standard Clean</th>
                <th className="py-3 px-4 font-bold text-blue-700">Deep Revival Clean</th>
                <th className="py-3 px-4 font-bold text-slate-900">Move-In / Move-Out</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3.5 px-4 font-semibold">Dusting all living & bedroom surfaces</td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /></td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /></td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold">Kitchen counters, sinks, & appliance exterior</td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /></td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /></td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold">Hand-washing all baseboards & door casings</td>
                <td className="py-3.5 px-4 text-slate-300">—</td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /></td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold">Intensive bathroom tile & grout descaling</td>
                <td className="py-3.5 px-4 text-slate-300">Surface only</td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /></td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold">Inside oven & inside refrigerator interior</td>
                <td className="py-3.5 px-4 text-slate-300">Add-on ($45)</td>
                <td className="py-3.5 px-4 text-slate-300">Add-on ($45)</td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /> (Included)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold">Inside all empty kitchen & bath cabinets</td>
                <td className="py-3.5 px-4 text-slate-300">Add-on ($60)</td>
                <td className="py-3.5 px-4 text-slate-300">Add-on ($60)</td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /> (Included)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold">Deposit Return Pass Guarantee</td>
                <td className="py-3.5 px-4 text-slate-300">—</td>
                <td className="py-3.5 px-4 text-slate-300">—</td>
                <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-blue-600" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
