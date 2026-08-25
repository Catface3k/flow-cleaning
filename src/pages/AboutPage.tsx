import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Leaf,
  CheckCircle2,
  Heart,
  BadgeCheck,
  Star,
  ArrowRight
} from 'lucide-react';
import { CLEANERS_DATA } from '../data/servicesData';

interface AboutPageProps {
  setActiveTab: (tab: string) => void;
  onStartBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab, onStartBooking }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>The Pure Flow Philosophy</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-['Lato',sans-serif] tracking-tight">
          Reinventing Residential & Commercial Cleanliness
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Flow Cleaning was founded on a simple principle: home care should be transparent, completely non-toxic, and executed by valued professionals who take pride in clinical perfection.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Top 1% Vetted Talent</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Only 1 out of every 45 applicants completes our 4-stage background check, practical skills exam, and clinical certification.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">100% Non-Toxic Purity</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We ban bleach, phthalates, synthetic fragrances, and aggressive acids in favor of EPA Safer Choice certified botanical extracts.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">200% Satisfaction</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            If anything is missed, we return within 48 hours to re-clean for free. If you are still unsatisfied, you receive a full refund.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Living Wage Employer</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our cleaners earn 40% above industry standards with full workers' compensation, paid health benefits, and continuous mastery training.
          </p>
        </div>
      </div>

      {/* Hiring & Vetting Process */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 border border-blue-800 px-3 py-1 rounded-full">
            Our Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 font-['Lato',sans-serif]">
            The 4-Stage Cleaner Vetting Funnel
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Trust is our most important asset. Here is how we ensure only trusted professionals enter your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
            <div className="text-xs font-black text-blue-400 uppercase">Stage 01</div>
            <h4 className="text-sm font-bold text-white">Federal & County Checks</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Comprehensive 7-year identity verification, background screening, and driving record audit.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
            <div className="text-xs font-black text-blue-400 uppercase">Stage 02</div>
            <h4 className="text-sm font-bold text-white">In-Person Practical Test</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Candidates clean a mock multi-surface residential apartment while evaluated by a Senior Field Supervisor.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
            <div className="text-xs font-black text-blue-400 uppercase">Stage 03</div>
            <h4 className="text-sm font-bold text-white">54-Point Protocol Training</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              40 hours of rigorous classroom and field shadowing on botanical chemistry, cross-contamination prevention, and HEPA systems.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
            <div className="text-xs font-black text-blue-400 uppercase">Stage 04</div>
            <h4 className="text-sm font-bold text-white">Continuous Quality Rating</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cleaners must maintain a minimum 4.85-star average. Spot audits by QA leads ensure consistency across every clean.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Lead Cleaners */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            The Team
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-['Lato',sans-serif]">
            Meet Your Certified Cleaning Leads
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLEANERS_DATA.map((cleaner) => (
            <div
              key={cleaner.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3 text-center"
            >
              <img
                src={cleaner.avatarUrl}
                alt={cleaner.name}
                className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-blue-600 shadow-sm"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center justify-center">
                  {cleaner.name}
                  <BadgeCheck className="w-3.5 h-3.5 text-blue-600 ml-1" />
                </h4>
                <p className="text-xs text-blue-600 font-semibold">{cleaner.specialty}</p>
                <div className="text-[11px] text-slate-400 mt-1">
                  ⭐ {cleaner.rating} • {cleaner.totalCleans}+ Cleans
                </div>
              </div>
              <p className="text-[11px] text-slate-600 italic">
                "{cleaner.bio}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-blue-50 rounded-3xl p-8 text-center border border-blue-200 max-w-3xl mx-auto space-y-4">
        <h3 className="text-2xl font-bold text-slate-900 font-['Lato',sans-serif]">Experience the Flow Cleaning Difference</h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Book online in 60 seconds with 100% upfront pricing and zero hidden fees.
        </p>
        <button
          onClick={onStartBooking}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full shadow-lg shadow-blue-200 transition-colors inline-flex items-center"
        >
          <span>Schedule Your Cleaning Now</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};
