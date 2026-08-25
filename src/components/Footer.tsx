import React, { useState } from 'react';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SERVICES_DATA } from '../data/servicesData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onSelectServiceSlug?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onSelectServiceSlug }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useBooking();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    showToast('🎉 You have been subscribed to Flow Cleaning exclusive tips & 15% discount alerts!');
    setNewsletterEmail('');
  };

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleService = (slug: string) => {
    if (onSelectServiceSlug) onSelectServiceSlug(slug);
    setActiveTab('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-slate-400">
          <div className="flex items-center space-x-3.5 bg-slate-850 p-4 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">100% Insured & Bonded</div>
              <div className="text-xs text-slate-400">$2M liability peace of mind</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 bg-slate-850 p-4 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">200% Satisfaction</div>
              <div className="text-xs text-slate-400">Free re-clean or full refund</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 bg-slate-850 p-4 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Non-Toxic Botanicals</div>
              <div className="text-xs text-slate-400">Pet, infant, & allergy safe</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 bg-slate-850 p-4 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Top 1% Cleaners</div>
              <div className="text-xs text-slate-400">4-stage background vetting</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => handleNav('home')}
              className="flex items-center space-x-3 cursor-pointer group inline-flex"
            >
              <div className="h-11 w-11 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 shadow-md shadow-slate-950 border border-slate-800 group-hover:scale-105 transition-transform duration-200">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-bold tracking-tight text-white">
                  FLOW<span className="font-normal text-slate-400">.org</span>
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800/60 rounded-full ml-1">
                  CLEAN
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Flow Cleaning redefines residential and commercial hygiene. Combining hospital-grade sanitization protocols with plant-derived botanical cleansers and transparent, instant upfront pricing.
            </p>

            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Join Flow Cleaners Club
              </div>
              {subscribed ? (
                <div className="flex items-center text-blue-400 text-xs font-semibold bg-blue-950/60 border border-blue-800 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Thanks for subscribing! Check your inbox for your 15% code.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email for 15% off"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs px-3.5 py-2.5 rounded-l-full focus:outline-hidden focus:border-blue-500 placeholder-slate-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 text-xs font-bold rounded-r-full transition-colors shrink-0 flex items-center shadow-lg shadow-blue-600/20"
                  >
                    Join
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Cleaning Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SERVICES_DATA.slice(0, 6).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => handleService(srv.slug)}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {srv.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="text-blue-400 hover:underline font-bold"
                >
                  View All Services →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Standards & Checklist */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Trust & Standards
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('checklist')} className="hover:text-blue-400 transition-colors">
                  54-Point Quality Protocol
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-blue-400 transition-colors">
                  Pricing & Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('locations')} className="hover:text-blue-400 transition-colors">
                  Service Areas & ZIP Check
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('reviews')} className="hover:text-blue-400 transition-colors">
                  Verified Reviews (4.98★)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-blue-400 transition-colors">
                  Cleaner Vetting & Hiring
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portal')} className="hover:text-blue-400 transition-colors">
                  My Bookings Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Dispatch */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">(800) 592-FLOW</div>
                  <div className="text-slate-400 text-[11px]">Mon–Sun: 7:00 AM – 9:00 PM PST</div>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">support@flowcleaning.org</div>
                  <div className="text-slate-400 text-[11px]">Instant dispatch support</div>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">HQ Operations Center</div>
                  <div className="text-slate-400 text-[11px]">500 Howard St, Suite 400, SF, CA</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleNav('booking')}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-full shadow-lg shadow-blue-600/30 transition-colors text-center"
                >
                  Book Instant Clean
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Flow Cleaning Technologies & Services. All rights reserved.
          </div>
          <div className="flex space-x-6 text-slate-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Cleaner Code of Conduct</span>
            <span className="hover:text-white cursor-pointer">Guarantee Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
