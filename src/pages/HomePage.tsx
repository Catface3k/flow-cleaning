import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Leaf,
  Award,
  Zap,
  Users,
  Clock,
  ChevronDown,
  Phone,
  Home,
  Check,
  BadgeCheck,
  Search,
  MapPin
} from 'lucide-react';
import { QuickQuoteWidget } from '../components/QuickQuoteWidget';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { DynamicIcon } from '../components/DynamicIcon';
import { SERVICES_DATA, REVIEWS_DATA, CHECKLIST_DATA, FAQ_DATA } from '../data/servicesData';
import { FrequencyType } from '../types';
import { useBooking } from '../context/BookingContext';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onSelectServiceSlug: (slug: string) => void;
  onStartBookingWithParams: (params: {
    serviceId: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    frequency: FrequencyType;
  }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onSelectServiceSlug,
  onStartBookingWithParams
}) => {
  const [zipInput, setZipInput] = useState('');
  const [zipResult, setZipResult] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>('f1');
  const [activeChecklistRoom, setActiveChecklistRoom] = useState('kitchen');
  const { showToast } = useBooking();

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput || zipInput.length < 5) {
      showToast('Please enter a valid 5-digit ZIP code.');
      return;
    }
    const supportedZips = ['94102', '94109', '94115', '94114', '94107', '94118', '94110', '94103', '94123'];
    if (supportedZips.includes(zipInput.trim())) {
      setZipResult(`✅ Excellent! Flow Cleaning is actively operating in ${zipInput}. Cleaners ready to dispatch.`);
    } else {
      setZipResult(`📍 Service is expanding to ${zipInput}! Priority booking available within 24-48 hours.`);
    }
  };

  const selectedCategory = CHECKLIST_DATA.find((c) => c.id === activeChecklistRoom) || CHECKLIST_DATA[0];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Background decorative ambient glows */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 -ml-40 w-96 h-96 rounded-full bg-slate-200/50 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs font-bold text-blue-900">
                  Voted #1 Pure Home Care & Sanitization Service
                </span>
                <span className="text-blue-300">|</span>
                <div className="flex items-center text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                  4.98 (1,400+ Cleans)
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] font-['Lato',sans-serif]">
                A Healthier Home,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-slate-900">
                  Cleaned in Flow.
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
                Experience hospital-grade sanitization delivered with 100% plant-derived, non-toxic botanicals. Fully vetted, background-checked cleaners and transparent instant booking.
              </p>

              {/* 3 Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 p-2.5 rounded-xl shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>100% Background Checked</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 p-2.5 rounded-xl shadow-sm">
                  <Leaf className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Pet & Baby Safe Botanicals</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 p-2.5 rounded-xl shadow-sm">
                  <Award className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>200% Satisfaction Guarantee</span>
                </div>
              </div>

              {/* Secondary CTA buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  id="hero-see-services-btn"
                  onClick={() => setActiveTab('services')}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-200 transition-colors flex items-center"
                >
                  <span>Explore All 7 Services</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button
                  id="hero-checklist-btn"
                  onClick={() => setActiveTab('checklist')}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-full border border-slate-200 shadow-sm transition-colors flex items-center"
                >
                  <span>View 54-Point Checklist</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Quick Quote Box */}
            <div className="lg:col-span-5">
              <QuickQuoteWidget onStartBooking={onStartBookingWithParams} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR PILLARS OF PURE FLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            The Pure Flow Standard
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2 font-['Lato',sans-serif]">
            Why Modern Homes Choose Flow Cleaning
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            We combined clinical hygiene science with natural botanical ingredients to give you the freshest, safest living spaces possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">100% Plant Pure Botanicals</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero synthetic bleaches, harsh chlorine fumes, or VOCs. We use food-grade citric acid, thyme oils, and plant glucosides that are completely pet and baby safe.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
              <Check className="w-4 h-4 mr-1" /> USDA Biobased Certified
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Top 1% Vetted Cleaners</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Only 1 in every 80 applicants is accepted. Every Flow cleaner completes an FBI-grade background check, identity verification, and 40 hours of hands-on precision training.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
              <Check className="w-4 h-4 mr-1" /> $2,000,000 Bonded & Insured
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">54-Point Quality Protocol</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every single room is audited against a rigorous 54-point clinical checklist with color-coded microfibers to ensure zero cross-contamination between bathrooms and kitchens.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
              <Check className="w-4 h-4 mr-1" /> HEPA 13 Air Micro-Filtration
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">200% Happiness Guarantee</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If any spot does not meet your standard, notify us within 24 hours. We send a supervisor to re-clean for free. If you are still not thrilled, you receive a 100% full refund.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
              <Check className="w-4 h-4 mr-1" /> Zero Risk Peace of Mind
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Tailored Solutions
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 font-['Lato',sans-serif]">
              Explore Our Signature Services
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Select any package below for detailed room inclusions, specifications, and instant booking.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('services')}
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center shrink-0"
          >
            <span>View All Service Details</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Service Hero Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.heroImage}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                {service.badge && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                    {service.badge}
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div className="text-xs font-semibold bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-lg">
                    {service.estimatedHours}
                  </div>
                  <div className="text-sm font-black">
                    From <span className="text-lg text-blue-300">${service.basePrice}</span>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  <div className="mt-4 space-y-1.5">
                    {service.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      onSelectServiceSlug(service.slug);
                      setActiveTab('service-detail');
                    }}
                    className="flex-1 py-2.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-xl transition-colors text-center"
                  >
                    View Inclusions
                  </button>
                  <button
                    onClick={() => {
                      onStartBookingWithParams({
                        serviceId: service.id,
                        bedrooms: 2,
                        bathrooms: 2,
                        squareFeet: 1200,
                        frequency: 'bi-weekly'
                      });
                    }}
                    className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-200 transition-colors flex items-center justify-center shrink-0"
                  >
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE BEFORE & AFTER SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BeforeAfterSlider />
      </section>

      {/* 5. 54-POINT QUALITY CHECKLIST TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg">
        {/* Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 border border-blue-800 px-3 py-1 rounded-full">
              Hospital-Grade Standards
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-['Lato',sans-serif]">
              Our Signature 54-Point Cleaning Checklist
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nothing is left to chance. Every Flow cleaner follows an itemized, room-specific checklist to guarantee consistent 5-star perfection on every visit.
            </p>

            {/* Room Selector Tabs */}
            <div className="space-y-2 pt-2">
              {CHECKLIST_DATA.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveChecklistRoom(cat.id)}
                  className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between transition-all ${
                    activeChecklistRoom === cat.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activeChecklistRoom === cat.id ? 'bg-white/20' : 'bg-slate-700'
                      }`}
                    >
                      <DynamicIcon name={cat.iconName} className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">{cat.name}</div>
                      <div className="text-[10px] opacity-75">{cat.tasks.length} items checked</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </button>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => setActiveTab('checklist')}
                className="w-full py-3 bg-white text-slate-900 hover:bg-blue-50 text-xs font-extrabold rounded-full transition-colors flex items-center justify-center"
              >
                <span>Explore Full 54-Point Protocol & Audit Mode</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>
          </div>

          {/* Right Checklist Items Box */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700 p-6 rounded-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-4">
              <div>
                <h3 className="text-base font-bold text-white">{selectedCategory.name}</h3>
                <p className="text-xs text-slate-400">{selectedCategory.description}</p>
              </div>
              <span className="text-[11px] font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase tracking-wider">
                100% Eco-Safe
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedCategory.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-850 p-3 rounded-xl border border-slate-750 flex items-start space-x-2.5"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center">
                      {task.task}
                      {task.isDeepCleanOnly && (
                        <span className="ml-1.5 text-[9px] bg-amber-900/80 text-amber-300 px-1.5 py-0.2 rounded font-semibold">
                          Deep Clean
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{task.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED REVIEWS & SOCIAL PROOF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Real Customer Stories
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2 font-['Lato',sans-serif]">
            Loved by Over 1,400+ Homeowners
          </h2>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700">4.98 out of 5 stars based on verified post-clean surveys</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{rev.author}</div>
                  <div className="text-[10px] text-slate-400">{rev.location}</div>
                </div>
                <div className="flex items-center text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <BadgeCheck className="w-3 h-3 mr-1 text-green-600" />
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setActiveTab('reviews')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center bg-blue-50 px-4 py-2 rounded-full"
          >
            <span>Read all 1,400+ reviews & submit yours</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </section>

      {/* 7. ZIP CODE INSTANT CHECKER & SERVICE AREA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-blue-100 relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-100 bg-blue-900/60 border border-blue-400/40 px-3.5 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5" />
              <span>Real-Time Coverage Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Lato',sans-serif]">
              Check Flow Cleaning Availability in Your Neighborhood
            </h2>
            <p className="text-xs sm:text-sm text-blue-100">
              Enter your 5-digit ZIP code to verify instant team dispatch, cleaner availability, and local response times.
            </p>

            <form onSubmit={handleZipCheck} className="flex max-w-md mx-auto pt-2">
              <input
                type="text"
                maxLength={5}
                placeholder="Enter 5-Digit ZIP (e.g. 94115)"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                className="w-full bg-white text-slate-900 text-sm px-4 py-3.5 rounded-l-full focus:outline-hidden font-bold placeholder-slate-400"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 font-bold text-sm rounded-r-full transition-colors shrink-0 flex items-center"
              >
                <Search className="w-4 h-4 mr-1.5" />
                Check Area
              </button>
            </form>

            {zipResult && (
              <div className="p-3 bg-white/15 backdrop-blur-md rounded-xl text-xs font-bold text-white border border-white/20 max-w-md mx-auto animate-in fade-in duration-200">
                {zipResult}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Clear Answers
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2 font-['Lato',sans-serif]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Everything you need to know about our cleansers, team vetting, guarantee, and rescheduling.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-50 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-lg">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 border border-blue-800 px-3 py-1 rounded-full">
              Instant Online Booking in 60 Seconds
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Lato',sans-serif]">
              Ready to Experience the Pure Living Standard?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Book online today with code <strong className="text-blue-400 font-black">FLOW20</strong> for 20% off your initial clean. Backed by our 200% Satisfaction Guarantee.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('booking')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-full shadow-lg shadow-blue-200 transition-all flex items-center cursor-pointer group"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Book Your Clean Online</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="tel:18005923569"
                className="px-6 py-4 bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-sm rounded-full border border-slate-700 transition-colors flex items-center"
              >
                <Phone className="w-4 h-4 mr-2 text-blue-400" />
                <span>Call (800) 592-FLOW</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
