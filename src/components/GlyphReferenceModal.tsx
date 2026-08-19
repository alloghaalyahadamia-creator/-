import React, { useState, useEffect, useRef } from 'react';
import { GLYPH_SPECS, CELL_W, CELL_H, drawGlyph } from '../engine/glyphDictionary';
import { GlyphRenderOptions, ThemeConfig, GlyphSpec } from '../types';
import { X, Search, Sparkles, PlusCircle } from 'lucide-react';

interface GlyphReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChar: (char: string) => void;
  theme: ThemeConfig;
}

// Sub-component for individual mini canvas card
const MiniGlyphCard: React.FC<{
  spec: GlyphSpec;
  theme: ThemeConfig;
  onSelect: () => void;
}> = ({ spec, theme, onSelect }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = CELL_W;
    canvas.height = CELL_H;

    ctx.clearRect(0, 0, CELL_W, CELL_H);

    const options: GlyphRenderOptions = {
      primaryColor: theme.primary,
      secondaryColor: theme.secondary,
      glowColor: theme.glow,
      lineWidth: 2.2,
      glowIntensity: 6,
      shadowStyle: 'soft',
      glyphScale: 0.9,
      isMirror: false,
    };

    drawGlyph(ctx, spec.char, 0, 0, options);
  }, [spec.char, theme]);

  return (
    <div
      onClick={onSelect}
      className="group relative flex flex-col items-center justify-between p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-white/10 hover:border-amber-400/50 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg shadow-black/40 text-right"
    >
      {/* Top Header */}
      <div className="w-full flex items-center justify-between text-xs">
        <span className="text-lg font-bold text-amber-300 font-serif">
          {spec.char === ' ' ? '•' : spec.char}
        </span>
        <span className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200">
          {spec.nameAr}
        </span>
      </div>

      {/* Mini Canvas */}
      <div className="my-2 p-1 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center w-full">
        <canvas ref={canvasRef} className="w-[50px] h-[85px] object-contain" />
      </div>

      {/* Description & Insert prompt */}
      <div className="w-full">
        <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed h-8">
          {spec.descriptionAr}
        </p>
        <div className="mt-2 flex items-center justify-between text-[10px] text-amber-400/70 group-hover:text-amber-300 pt-1 border-t border-white/5">
          <span className="font-mono">{spec.runeRepresentation}</span>
          <span className="flex items-center gap-0.5">
            <PlusCircle className="w-3 h-3" /> إدراج
          </span>
        </div>
      </div>
    </div>
  );
};

export const GlyphReferenceModal: React.FC<GlyphReferenceModalProps> = ({
  isOpen,
  onClose,
  onSelectChar,
  theme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const allSpecs = Object.values(GLYPH_SPECS);

  const filteredSpecs = allSpecs.filter((spec) => {
    const matchesSearch =
      spec.char.includes(searchQuery) ||
      spec.nameAr.includes(searchQuery) ||
      spec.descriptionAr.includes(searchQuery);

    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && spec.category === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[85vh] flex flex-col bg-zinc-950/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-zinc-100 flex items-center gap-2">
                الخريطة المرجعية لشَفْرَة اليحآدمية
                <span className="text-xs font-normal text-amber-400/80 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {filteredSpecs.length} رمز هندسي
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                اضغط على أي رمز لإدراجه مباشرة في النص واستعراض هندسته الرياضية
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-white/10 bg-white/[0.01] flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالحرف أو الاسم أو الشكل..."
              className="w-full pr-9 pl-4 py-2 text-xs bg-zinc-900/90 border border-white/10 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'letter', label: 'الحروف' },
              { id: 'hamza', label: 'الهمزات' },
              { id: 'space', label: 'المسافات والرموز' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Glyph Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {filteredSpecs.map((spec) => (
            <MiniGlyphCard
              key={spec.char}
              spec={spec}
              theme={theme}
              onSelect={() => {
                onSelectChar(spec.char);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
