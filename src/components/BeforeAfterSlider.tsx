import React, { useState, useRef } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle2 } from 'lucide-react';

interface ComparisonItem {
  id: string;
  title: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  checklistHighlights: string[];
}

const COMPARISONS: ComparisonItem[] = [
  {
    id: 'kitchen',
    title: 'Gourmet Kitchen Range & Backsplash',
    category: 'Kitchen Deep Clean',
    beforeImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    description: 'Heavy cooking oil vapor and dried splatters dissolved with botanical degreasers, followed by chrome polishing on burner knobs and stainless steel hood.',
    checklistHighlights: ['Zero sticky residue', 'Stainless steel streak-free buff', 'Grout line whitening']
  },
  {
    id: 'bathroom',
    title: 'Walk-In Shower Tile & Glass Descaling',
    category: 'Bathroom Revival',
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    afterImg: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80',
    description: 'Years of calcium deposits and soap scum eliminated using plant-derived citric acid descalers without breathing toxic fumes.',
    checklistHighlights: ['Crystal glass clarity', '360° drain sanitization', 'Eco anti-mold barrier']
  },
  {
    id: 'living',
    title: 'Hardwood Living & Upholstery Reset',
    category: 'Living Spaces',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    description: 'Microfiber trapping extracted fine dust from ceiling corners, baseboards, and couch seams, finished with pH-balanced wood conditioning.',
    checklistHighlights: ['HEPA 13 allergen extraction', 'Baseboards hand-washed', 'Restored wood luster']
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const [activeItem, setActiveItem] = useState(COMPARISONS[0]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;\n    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            Interactive Proof of Craftsmanship
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            Real Results: The Flow Transformation
          </h3>
          <p className="text-sm text-slate-500">
            Drag the slider across to inspect our 54-point clinical cleaning precision.
          </p>
        </div>

        {/* Room Tabs */}
        <div className="flex flex-wrap gap-2">
          {COMPARISONS.map((comp) => (
            <button
              key={comp.id}
              onClick={() => {
                setActiveItem(comp);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeItem.id === comp.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {comp.category}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Slider Box */}
      <div
        ref={containerRef}
        onMouseDown={() => (isDragging.current = true)}
        onMouseUp={() => (isDragging.current = false)}
        onMouseLeave={() => (isDragging.current = false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-200 shadow-inner"
      >
        {/* After Image (Background) */}
        <img
          src={activeItem.afterImg}
          alt="After Flow Cleaning"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          AFTER: The Pure Flow Clean
        </div>

        {/* Before Image (Clipped Left Side) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={activeItem.beforeImg}
            alt="Before Cleaning"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
            }}
          />
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            BEFORE Clean
          </div>
        </div>

        {/* Slider Divider Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-9 h-9 rounded-full bg-white text-slate-800 shadow-lg flex items-center justify-center border-2 border-blue-600">
            <MoveHorizontal className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Description & Inclusions */}
      <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-2">
          <h4 className="text-base font-bold text-slate-900">{activeItem.title}</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{activeItem.description}</p>
        </div>
        <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Flow Inclusions
          </div>
          {activeItem.checklistHighlights.map((hl, idx) => (\n            <div key={idx} className=\"flex items-center text-xs font-semibold text-slate-700\">\n              <CheckCircle2 className=\"w-3.5 h-3.5 text-blue-600 mr-1.5 shrink-0\" />\n              <span>{hl}</span>\n            </div>\n          ))}
        </div>
      </div>
    </div>
  );
};
