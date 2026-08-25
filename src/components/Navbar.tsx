import React, { useState } from 'react';
import { Sparkles, Phone, Calendar, Menu, X, ChevronDown, ShieldCheck, Star, Clock, CheckCircle2, UserCheck } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SERVICES_DATA } from '../data/servicesData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectServiceSlug?: (slug: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onSelectServiceSlug }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const { bookings } = useBooking();

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (slug: string) => {
    if (onSelectServiceSlug) {
      onSelectServiceSlug(slug);
    }
    setActiveTab('service-detail');
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification & Hotline Banner */}
      <div className="bg-blue-950 text-blue-100 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-blue-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              100% Background-Checked Staff
            </span>
            <span className="text-blue-400">•</span>
            <span className="flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-blue-300" />
              Certified Non-Toxic & Pet-Safe Cleansers
            </span>
            <span className="text-blue-400">•</span>
            <span className="bg-blue-800 text-blue-200 px-2 py-0.5 rounded-full font-bold text-[11px]">
              PROMO: FLOW20 (20% OFF)
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="tel:18005923569"
              className="flex items-center hover:text-white transition-colors font-medium text-blue-200"
            >
              <Phone className="w-3.5 h-3.5 mr-1" />
              (800) 592-FLOW (3569)
            </a>
            <span className="text-blue-400">•</span>
            <span className="text-blue-300 font-medium flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" /> Mon–Sun 7am–9pm
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="h-11 w-11 rounded-xl bg-slate-950 flex items-center justify-center p-1.5 shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform duration-200">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-bold tracking-tight text-blue-900">
                  FLOW<span className="font-normal text-slate-500">.org</span>
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full ml-1">
                  CLEAN
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 tracking-wider uppercase">
                The Pure Living Standard
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              id="nav-home"
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'home'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button
                id="nav-services-dropdown"
                onClick={() => handleNavClick('services')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium inline-flex items-center transition-colors ${
                  activeTab === 'services' || activeTab === 'service-detail'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
              </button>

              {isServicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 px-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Our Cleaning Solutions
                  </div>
                  {SERVICES_DATA.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => handleServiceClick(srv.slug)}
                      className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800 group-hover:text-blue-600 flex items-center">
                          {srv.name}
                          {srv.badge && (
                            <span className="ml-2 text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {srv.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          From ${srv.basePrice} • {srv.tagline}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-slate-100 mt-2 pt-2 px-3">
                    <button
                      onClick={() => handleNavClick('services')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center"
                    >
                      View All Services & Pricing Comparison →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-checklist"
              onClick={() => handleNavClick('checklist')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'checklist'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              54-Point Checklist
            </button>

            <button
              id="nav-pricing"
              onClick={() => handleNavClick('pricing')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'pricing'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Pricing
            </button>

            <button
              id="nav-locations"
              onClick={() => handleNavClick('locations')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'locations'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Service Areas
            </button>

            <button
              id="nav-reviews"
              onClick={() => handleNavClick('reviews')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                activeTab === 'reviews'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <span>Reviews</span>
              <span className="ml-1.5 inline-flex items-center text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-md">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                4.98
              </span>
            </button>

            <button
              id="nav-about"
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'about'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              The Pure Standard
            </button>

            <button
              id="nav-contact"
              onClick={() => handleNavClick('contact')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'contact'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              id="nav-portal-btn"
              onClick={() => handleNavClick('portal')}
              className={`relative px-4 py-2.5 rounded-full text-sm font-bold border transition-all flex items-center ${
                activeTab === 'portal'
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-4 h-4 mr-1.5 text-blue-600" />
              <span>My Bookings</span>
              {bookings.length > 0 && (
                <span className="ml-2 bg-blue-600 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                  {bookings.length}
                </span>
              )}
            </button>

            <button
              id="nav-book-now-cta"
              onClick={() => handleNavClick('booking')}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-200 transition-all flex items-center cursor-pointer group"
            >
              <Calendar className="w-4 h-4 mr-2 group-hover:rotate-6 transition-transform" />
              <span>+ New Cleaning</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              id="nav-book-now-mobile"
              onClick={() => handleNavClick('booking')}
              className="px-3.5 py-2 rounded-full text-xs font-bold text-white bg-blue-600 shadow-lg shadow-blue-200"
            >
              Book Clean
            </button>
            <button
              id="nav-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            All Services & Pricing
          </button>
          <button
            onClick={() => handleNavClick('checklist')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            54-Point Cleaning Checklist
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Pricing & Estimator
          </button>
          <button
            onClick={() => handleNavClick('locations')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Service Areas & Availability
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
          >
            <span>Customer Reviews</span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">4.98 / 5.0</span>
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            The Pure Flow Standard & Vetting
          </button>
          <button
            onClick={() => handleNavClick('portal')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
          >
            <span>My Bookings & Cleaner Status</span>
            {bookings.length > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {bookings.length} Active
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Contact & Support
          </button>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('booking')}
              className="w-full py-3 rounded-full font-bold text-center text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-200"
            >
              Book Service Online Now
            </button>
            <a
              href="tel:18005923569"
              className="w-full py-2.5 rounded-full font-bold text-center text-slate-700 border border-slate-200 flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2 text-blue-600" />
              Call (800) 592-FLOW
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
