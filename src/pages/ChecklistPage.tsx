import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Check,
  ShieldCheck,
  Leaf,
  Printer,
  RotateCcw,
  ArrowRight,
  Filter
} from 'lucide-react';
import { CHECKLIST_DATA } from '../data/servicesData';
import { DynamicIcon } from '../components/DynamicIcon';
import { useBooking } from '../context/BookingContext';

interface ChecklistPageProps {
  setActiveTab: (tab: string) => void;
  onStartBookingWithService: (serviceId: string) => void;
}

export const ChecklistPage: React.FC<ChecklistPageProps> = ({
  setActiveTab,
  onStartBookingWithService
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'standard' | 'deep-only'>('all');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const { showToast } = useBooking();

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleResetChecklist = () => {
    setCheckedItems({});
    showToast('Interactive audit checklist reset.');
  };

  const totalTasks = CHECKLIST_DATA.reduce((acc, cat) => acc + cat.tasks.length, 0);
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>The Pure Flow 54-Point Quality Standard</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-['Lato',sans-serif] tracking-tight">
          Clinical 54-Point Cleaning Checklist
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          We leave zero room for error. Every single room in your residence is audited against this exact sequence. Color-coded microfiber cloths and dedicated HEPA extraction ensure cross-contamination is physically impossible.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
          <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterMode === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              All 54 Points
            </button>
            <button
              onClick={() => setFilterMode('standard')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterMode === 'standard' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              Standard Clean Points
            </button>
            <button
              onClick={() => setFilterMode('deep-only')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterMode === 'deep-only' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              Deep Clean Upgrades
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Rooms
            </button>
            {CHECKLIST_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.name.split('&')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Audit Toolbar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-lg">
            {progressPercent}%
          </div>
          <div>
            <div className="text-sm font-bold">Interactive Quality Audit Mode</div>
            <div className="text-xs text-slate-400">
              {completedCount} of {totalTasks} checklist items inspected
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full md:w-64 h-2.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleResetChecklist}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-full flex items-center transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset Audit
          </button>
          <button
            onClick={() => onStartBookingWithService('deep-cleaning')}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-blue-200 transition-colors flex items-center"
          >
            <span>Book This Standard</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </button>
        </div>
      </div>

      {/* Checklist Room Cards */}
      <div className="space-y-8">
        {CHECKLIST_DATA.filter((cat) => activeCategory === 'all' || cat.id === activeCategory).map(
          (category) => {
            const filteredTasks = category.tasks.filter((t) => {
              if (filterMode === 'standard') return !t.isDeepCleanOnly;
              if (filterMode === 'deep-only') return t.isDeepCleanOnly;
              return true;
            });

            if (filteredTasks.length === 0) return null;

            return (
              <div
                key={category.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <DynamicIcon name={category.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 font-['Lato',sans-serif]">{category.name}</h2>
                      <p className="text-xs text-slate-500">{category.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                    {filteredTasks.length} Specific Steps
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTasks.map((task) => {
                    const isChecked = !!checkedItems[task.id];
                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleItem(task.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                          isChecked
                            ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                            : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-blue-600 text-white'
                              : 'border-2 border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-bold ${
                                isChecked ? 'text-blue-950 line-through' : 'text-slate-900'
                              }`}
                            >
                              {task.task}
                            </span>
                            {task.isDeepCleanOnly && (
                              <span className="ml-2 text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full shrink-0">
                                Deep Clean
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-snug">{task.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Color-Coded Cross Contamination Safety Standard Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-800 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 border border-blue-800 px-3 py-1 rounded-full">
            Biosecurity Protocol
          </span>
          <h3 className="text-2xl font-bold mt-2 font-['Lato',sans-serif]">
            Zero Cross-Contamination Color-Coded System
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            We enforce strict color separation for all cleaning microfibers so that bathroom pathogens never cross into food preparation or bedroom zones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          <div className="bg-red-950/60 border border-red-800/80 p-4 rounded-2xl">
            <div className="text-xs font-black text-red-400 uppercase">Red Microfiber</div>
            <div className="text-xs text-white font-bold mt-1">High-Risk Restrooms</div>
            <p className="text-[10px] text-slate-300 mt-1">Reserved exclusively for toilet exteriors, bowls, and urinal zones.</p>
          </div>

          <div className="bg-yellow-950/60 border border-yellow-800/80 p-4 rounded-2xl">
            <div className="text-xs font-black text-yellow-400 uppercase">Yellow Microfiber</div>
            <div className="text-xs text-white font-bold mt-1">Bathroom Sinks & Glass</div>
            <p className="text-[10px] text-slate-300 mt-1">Vanity mirrors, shower glass doors, chrome faucets, and bathtubs.</p>
          </div>

          <div className="bg-blue-950/60 border border-blue-800/80 p-4 rounded-2xl">
            <div className="text-xs font-black text-blue-400 uppercase">Blue Microfiber</div>
            <div className="text-xs text-white font-bold mt-1">General Living & Bed</div>
            <p className="text-[10px] text-slate-300 mt-1">Dusting furniture, electronics, picture frames, and baseboards.</p>
          </div>

          <div className="bg-emerald-950/60 border border-emerald-800/80 p-4 rounded-2xl">
            <div className="text-xs font-black text-emerald-400 uppercase">Green Microfiber</div>
            <div className="text-xs text-white font-bold mt-1">Kitchen & Dining</div>
            <p className="text-[10px] text-slate-300 mt-1">Countertops, island prep areas, dining tables, and refrigerator handles.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
