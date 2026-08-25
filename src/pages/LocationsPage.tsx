import React, { useState } from 'react';
import {
  MapPin,
  Search,
  CheckCircle2,
  Clock,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { LOCATION_COVERAGE_DATA } from '../data/servicesData';
import { useBooking } from '../context/BookingContext';

interface LocationsPageProps {
  setActiveTab: (tab: string) => void;
  onStartBooking: () => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({ setActiveTab, onStartBooking }) => {
  const [searchZip, setSearchZip] = useState('');
  const [searchedCoverage, setSearchedCoverage] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { showToast } = useBooking();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchZip) {
      showToast('Please enter a ZIP code or neighborhood name.');
      return;
    }

    setHasSearched(true);
    const found = LOCATION_COVERAGE_DATA.find(
      (loc) =>
        loc.zip === searchZip.trim() ||
        loc.areaName.toLowerCase().includes(searchZip.toLowerCase()) ||
        loc.neighborhoods.some((n) => n.toLowerCase().includes(searchZip.toLowerCase()))
    );

    setSearchedCoverage(found || null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>Metropolitan Dispatch Network</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-['Lato',sans-serif] tracking-tight">
          Service Areas & Cleaner Availability
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Flow Cleaning operates strategically positioned mobile cleaning teams throughout the greater metropolitan region, delivering 25-minute average dispatch speeds.
        </p>

        {/* Live ZIP Search */}
        <form onSubmit={handleSearch} className="flex max-w-lg mx-auto pt-4">
          <input
            type="text"
            placeholder="Search ZIP Code or Neighborhood (e.g. 94115, Marina)"
            value={searchZip}
            onChange={(e) => setSearchZip(e.target.value)}
            className="w-full bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm px-4 py-3.5 rounded-l-full font-bold shadow-xs focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-6 rounded-r-full shadow-md shadow-blue-200 transition-colors shrink-0 flex items-center cursor-pointer"
          >
            <Search className="w-4 h-4 mr-1.5" />
            Check Area
          </button>
        </form>

        {/* Search Result Box */}
        {hasSearched && (
          <div className="max-w-lg mx-auto pt-2 animate-in fade-in duration-150">
            {searchedCoverage ? (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-900 flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mr-1.5" />
                    Available Now in {searchedCoverage.areaName} ({searchedCoverage.zip})
                  </span>
                  <span className="text-[10px] font-bold bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded-full">
                    {searchedCoverage.activeCleaners} Active Cleaners
                  </span>
                </div>
                <p className="text-xs text-blue-800">
                  Average team arrival window: <strong>~{searchedCoverage.avgArrivalMinutes} minutes</strong>. Neighborhood coverage: {searchedCoverage.neighborhoods.join(', ')}.
                </p>
                <button
                  onClick={onStartBooking}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-md shadow-blue-200 transition-colors text-center"
                >
                  Book Instant Clean in {searchedCoverage.areaName} →
                </button>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-left space-y-2">
                <div className="text-xs font-bold text-slate-800">
                  📍 We are expanding to "{searchZip}"!
                </div>
                <p className="text-xs text-slate-600">
                  Custom dispatch slots can be scheduled with 24-48 hours notice. Reserve your date now:
                </p>
                <button
                  onClick={onStartBooking}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-full transition-colors"
                >
                  Request Priority Dispatch Booking
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Coverage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LOCATION_COVERAGE_DATA.map((loc) => (
          <div
            key={loc.zip}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-['Lato',sans-serif]">{loc.areaName}</h3>
                    <div className="text-[11px] text-slate-400 font-mono">ZIP {loc.zip} • {loc.city}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Active Staff</div>
                  <div className="font-extrabold text-slate-800 flex items-center mt-0.5">
                    <Users className="w-3.5 h-3.5 text-blue-600 mr-1" />
                    {loc.activeCleaners} Professionals
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Response</div>
                  <div className="font-extrabold text-slate-800 flex items-center mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600 mr-1" />
                    ~{loc.avgArrivalMinutes} Mins
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Covered Neighborhoods
                </div>
                <div className="flex flex-wrap gap-1">
                  {loc.neighborhoods.map((n, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={onStartBooking}
              className="w-full py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold text-xs rounded-full transition-colors text-center cursor-pointer"
            >
              Book Service in {loc.areaName.split('&')[0]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
