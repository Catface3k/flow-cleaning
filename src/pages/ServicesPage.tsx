import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Clock, Tag, ChevronRight, Plus } from 'lucide-react';
import { SERVICES_DATA, ADD_ONS_DATA } from '../data/servicesData';
import { DynamicIcon } from '../components/DynamicIcon';
import { ServiceCategory } from '../types';

interface ServicesPageProps {
  setActiveTab: (tab: string) => void;
  onSelectServiceSlug: (slug: string) => void;
  onStartBookingWithService: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  setActiveTab,
  onSelectServiceSlug,
  onStartBookingWithService
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  const handleDeepDive = (slug: string) => {
    onSelectServiceSlug(slug);
    setActiveTab('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Tailored For Every Stage of Living</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-['Lato',sans-serif] tracking-tight">
          Professional Cleaning Services
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          From weekly home refreshes to intensive move-out deposit guarantees and commercial office sanitization. Every clean is backed by our 54-point clinical standard.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {[
            { id: 'all', label: 'All Services (7)' },
            { id: 'residential', label: 'Residential & Recurring' },
            { id: 'deep', label: 'Deep Revival & Sanitation' },
            { id: 'move', label: 'Move In / Out' },
            { id: 'commercial', label: 'Commercial & Office' },
            { id: 'specialty', label: 'Specialty (Eco & Renovation)' }
          ].map((cat) => (\n            <button\n              key={cat.id}\n              onClick={() => setSelectedCategory(cat.id)}\n              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${\n                selectedCategory === cat.id\n                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'\n                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'\n              }`}\n            >\n              {cat.label}\n            </button>\n          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={srv.heroImage}
                  alt={srv.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                {srv.badge && (
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                    {srv.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div className="text-xs font-medium bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    {srv.estimatedHours}
                  </div>
                  <div className="text-sm font-black">
                    From <span className="text-xl text-blue-300">${srv.basePrice}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-blue-600 font-semibold mt-1">{srv.tagline}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{srv.description}</p>
                </div>

                {/* Inclusions summary */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Key Highlights
                  </div>
                  {srv.highlights.slice(0, 3).map((hl, i) => (
                    <div key={i} className="flex items-start text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 space-y-2">
              <button
                onClick={() => handleDeepDive(srv.slug)}
                className="w-full py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-bold rounded-xl transition-colors text-center flex items-center justify-center"
              >
                <span>Read Full Inclusions & Details</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </button>

              <button
                onClick={() => onStartBookingWithService(srv.id)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-blue-200 transition-colors text-center"
              >
                Book This Service Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add-On Services Menu Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 border border-blue-800 px-3 py-1 rounded-full">
            Custom Add-Ons
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 font-['Lato',sans-serif]">
            Specialized Detail Add-On Menu
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Customize any cleaning service with our fixed-price add-on detailing treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADD_ONS_DATA.map((addon) => (
            <div
              key={addon.id}
              className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 flex items-start space-x-3.5 hover:border-blue-500/50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <DynamicIcon name={addon.iconName} className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{addon.name}</h4>
                  <span className="text-sm font-extrabold text-blue-400">+${addon.price}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{addon.description}</p>
                <div className="text-[10px] text-slate-500 mt-2 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  Adds approx. {addon.durationMins} mins
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onStartBookingWithService('residential-standard');
            }}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-lg shadow-blue-200 transition-colors inline-flex items-center"
          >
            <span>Launch Booking Wizard with Custom Add-Ons</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
