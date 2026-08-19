import React, { useState, useRef, useEffect } from 'react';
import {
  ThemePresetId,
  ThemeConfig,
  CanvasBgType,
  EngineSettings,
  TextAlignMode,
  ShadowStyle,
} from '../types';
import { THEME_PRESETS } from '../data/themes';
import {
  Palette,
  Layers,
  Settings2,
  BookOpen,
  BarChart2,
  History,
  Download,
  Share2,
  Printer,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileImage,
  Code2,
  Copy,
  SlidersHorizontal,
  Keyboard,
  Undo2,
  Redo2,
  Trash2,
  AlignRight,
  AlignCenter,
  AlignJustify,
  FlipHorizontal,
  Eye,
  SunMedium,
  Maximize2,
  Sliders,
} from 'lucide-react';

interface ControlsToolbarProps {
  selectedThemeId: ThemePresetId;
  onSelectTheme: (id: ThemePresetId) => void;
  selectedBg: CanvasBgType;
  onSelectBg: (bg: CanvasBgType) => void;
  settings: EngineSettings;
  onUpdateSettings: (settings: Partial<EngineSettings>) => void;
  onOpenSettings: () => void;
  onOpenGlyphMap: () => void;
  onOpenStats: () => void;
  onOpenHistory: () => void;
  onOpenShortcuts: () => void;
  onExportPNG: () => void;
  onExportHD: () => void;
  onExportSVG: () => void;
  onCopyImage: () => void;
  onCopyRuneText: () => void;
  onPrint: () => void;
  onShare: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undoCount: number;
}

// دالة خفيفة وسريعة لتوليد استجابة اهتزاز لمسية (Haptic Vibration Feedback)
const triggerHaptic = (ms: number = 12) => {
  try {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(ms);
    }
  } catch {
    // تجاهل في حال عدم دعم المتصفح
  }
};

export const ControlsToolbar: React.FC<ControlsToolbarProps> = ({
  selectedThemeId,
  onSelectTheme,
  selectedBg,
  onSelectBg,
  settings,
  onUpdateSettings,
  onOpenSettings,
  onOpenGlyphMap,
  onOpenStats,
  onOpenHistory,
  onOpenShortcuts,
  onExportPNG,
  onExportHD,
  onExportSVG,
  onCopyImage,
  onCopyRuneText,
  onPrint,
  onShare,
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo,
  undoCount,
}) => {
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isBgDropdownOpen, setIsBgDropdownOpen] = useState(false);
  const [showQuickAdjustments, setShowQuickAdjustments] = useState(true);

  const exportDropdownRef = useRef<HTMLDivElement | null>(null);
  const themeDropdownRef = useRef<HTMLDivElement | null>(null);
  const bgDropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        exportDropdownRef.current &&
        !exportDropdownRef.current.contains(e.target as Node)
      ) {
        setIsExportDropdownOpen(false);
      }
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(e.target as Node)
      ) {
        setIsThemeDropdownOpen(false);
      }
      if (
        bgDropdownRef.current &&
        !bgDropdownRef.current.contains(e.target as Node)
      ) {
        setIsBgDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const bgOptions: { id: CanvasBgType; nameAr: string }[] = [
    { id: 'dark', nameAr: 'الداكن البازلتي' },
    { id: 'abyss', nameAr: 'الهاوية السحيقة' },
    { id: 'midnight', nameAr: 'منتصف الليل الكحلي' },
    { id: 'parchment', nameAr: 'المخطوط الأثري' },
    { id: 'cosmic', nameAr: 'الفضاء الكوني' },
  ];

  const currentThemeObj = THEME_PRESETS[selectedThemeId];
  const currentBgObj = bgOptions.find((b) => b.id === selectedBg);

  return (
    <div
      id="actions-toolbar-wrapper"
      className="w-full bg-zinc-950/85 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl space-y-4 sm:space-y-5 transition-all select-none"
    >
      {/* 
        Top Tier: Spacious Action Toolbar with clear visual groups 
      */}
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
        {/* Left Side Group: Text Operations & Theme/Background selectors */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          {/* Undo / Redo / Clear Group */}
          <div className="flex items-center gap-1 bg-white/[0.04] p-1 sm:p-1.5 rounded-2xl border border-white/10 shadow-sm min-h-[44px]">
            <button
              id="undo-action-btn"
              onClick={() => {
                triggerHaptic(10);
                onUndo();
              }}
              disabled={!canUndo}
              title="تراجع (Ctrl+Z)"
              className="flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all touch-manipulation min-h-[40px] cursor-pointer"
            >
              <Undo2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="inline sm:inline">تراجع</span>
            </button>
            <button
              id="redo-action-btn"
              onClick={() => {
                triggerHaptic(10);
                onRedo();
              }}
              disabled={!canRedo}
              title="إعادة (Ctrl+Y)"
              className="flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all touch-manipulation min-h-[40px] cursor-pointer"
            >
              <Redo2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="inline sm:inline">إعادة</span>
            </button>
            <div className="h-5 w-px bg-white/10 mx-0.5" />
            <button
              id="clear-action-btn"
              onClick={() => {
                triggerHaptic(20);
                onClear();
              }}
              title="مسح النص (Ctrl+D)"
              className="flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-400 hover:text-rose-400 hover:bg-rose-500/15 active:scale-95 transition-all touch-manipulation min-h-[40px] cursor-pointer"
            >
              <Trash2 className="w-4 h-4 shrink-0" />
              <span className="inline sm:inline">مسح</span>
            </button>
          </div>

          {/* Theme Picker Dropdown */}
          <div className="relative flex-1 sm:flex-initial" ref={themeDropdownRef}>
            <button
              id="theme-select-btn"
              onClick={() => {
                triggerHaptic(10);
                setIsThemeDropdownOpen((prev) => !prev);
              }}
              className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 border border-white/10 transition-all active:scale-95 shadow-sm min-h-[44px] touch-manipulation cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border border-white/30 shadow-[0_0_8px_rgba(245,158,11,0.5)] shrink-0"
                  style={{ backgroundColor: currentThemeObj ? currentThemeObj.primary : '#f59e0b' }}
                />
                <span className="font-medium text-zinc-100 whitespace-nowrap">
                  السمة: <strong className="text-amber-300 font-bold">{currentThemeObj?.nameAr || 'مخصص'}</strong>
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
            </button>

            {isThemeDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 p-2.5 bg-zinc-900/98 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <p className="text-[11px] font-bold text-zinc-400 px-3 py-1.5 uppercase tracking-wider">
                  اختر سمة الرموز الهندسية
                </p>
                {Object.entries(THEME_PRESETS).map(([id, theme]) => (
                  <button
                    key={id}
                    onClick={() => {
                      triggerHaptic(15);
                      onSelectTheme(id as ThemePresetId);
                      setIsThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-colors my-0.5 min-h-[44px] touch-manipulation cursor-pointer ${
                      selectedThemeId === id
                        ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                        : 'text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 shadow-sm shrink-0"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span>{theme.nameAr}</span>
                    </div>
                    {selectedThemeId === id && <Sparkles className="w-4 h-4 text-amber-400" />}
                  </button>
                ))}

                <div className="h-px bg-white/10 my-2" />
                <button
                  onClick={() => {
                    triggerHaptic(15);
                    onSelectTheme('custom');
                    setIsThemeDropdownOpen(false);
                    onOpenSettings();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-colors min-h-[44px] touch-manipulation cursor-pointer ${
                    selectedThemeId === 'custom'
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full border border-white/40 bg-gradient-to-tr from-rose-500 via-emerald-400 to-amber-400 shrink-0" />
                    <span>تخصيص لون يدوي...</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Canvas Background Dropdown */}
          <div className="relative flex-1 sm:flex-initial" ref={bgDropdownRef}>
            <button
              id="bg-select-btn"
              onClick={() => {
                triggerHaptic(10);
                setIsBgDropdownOpen((prev) => !prev);
              }}
              className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 border border-white/10 transition-all active:scale-95 shadow-sm min-h-[44px] touch-manipulation cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="whitespace-nowrap">
                  الخلفية: <strong className="text-emerald-300 font-bold">{currentBgObj?.nameAr || 'داكن'}</strong>
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
            </button>

            {isBgDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-60 p-2.5 bg-zinc-900/98 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <p className="text-[11px] font-bold text-zinc-400 px-3 py-1.5 uppercase tracking-wider">
                  نمط خلفية اللوحة
                </p>
                {bgOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      triggerHaptic(15);
                      onSelectBg(opt.id);
                      setIsBgDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-colors my-0.5 min-h-[44px] touch-manipulation cursor-pointer ${
                      selectedBg === opt.id
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                        : 'text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{opt.nameAr}</span>
                    {selectedBg === opt.id && <span className="text-emerald-400 font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side Group: Tools, Modals, Quick Tweaks toggle & Export */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-start sm:justify-end">
          {/* Reference Map Button */}
          <button
            id="open-glyph-map-btn"
            onClick={() => {
              triggerHaptic(12);
              onOpenGlyphMap();
            }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 border border-white/10 transition-all active:scale-95 shadow-sm min-h-[44px] touch-manipulation cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>قاموس الرموز</span>
          </button>

          {/* Stats Button */}
          <button
            id="open-stats-btn"
            onClick={() => {
              triggerHaptic(12);
              onOpenStats();
            }}
            title="إحصائيات النص والرموز"
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 transition-all active:scale-95 shadow-sm min-h-[44px] touch-manipulation cursor-pointer"
          >
            <BarChart2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="inline md:inline">الإحصائيات</span>
          </button>

          {/* History Button */}
          <button
            id="open-history-btn"
            onClick={() => {
              triggerHaptic(12);
              onOpenHistory();
            }}
            title="سجل المخطوطات المحفوظة"
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 transition-all active:scale-95 shadow-sm min-h-[44px] touch-manipulation cursor-pointer"
          >
            <History className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="inline md:inline">السجل</span>
          </button>

          {/* Toggle Live Adjustments Panel */}
          <button
            id="toggle-live-adjustments-btn"
            onClick={() => {
              triggerHaptic(15);
              setShowQuickAdjustments((prev) => !prev);
            }}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all active:scale-95 border shadow-sm min-h-[44px] touch-manipulation cursor-pointer ${
              showQuickAdjustments
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border-white/10'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400 shrink-0" />
            <span>لوحة التعديلات الحية</span>
            {showQuickAdjustments ? (
              <ChevronUp className="w-4 h-4 opacity-70 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 opacity-70 shrink-0" />
            )}
          </button>

          {/* Export & Save Dropdown */}
          <div className="relative flex-1 sm:flex-initial" ref={exportDropdownRef}>
            <button
              id="export-main-dropdown-btn"
              onClick={() => {
                triggerHaptic(15);
                setIsExportDropdownOpen((prev) => !prev);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all active:scale-95 min-h-[44px] touch-manipulation cursor-pointer"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>تصدير وحفظ</span>
              <ChevronDown className="w-4 h-4 shrink-0" />
            </button>

            {isExportDropdownOpen && (
              <div className="absolute top-full left-0 md:right-0 mt-2 w-72 p-2.5 bg-zinc-900/98 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <p className="text-[10px] font-bold text-zinc-400 px-3 py-1.5 uppercase tracking-wider">
                  خيارات التصدير فائقة الجودة
                </p>

                <button
                  id="export-png-standard"
                  onClick={() => {
                    triggerHaptic(20);
                    onExportPNG();
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-medium text-zinc-200 hover:bg-white/10 transition-colors my-0.5 min-h-[48px] touch-manipulation cursor-pointer"
                >
                  <FileImage className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="text-right">
                    <p className="font-semibold">صورة PNG قياسية</p>
                    <p className="text-[11px] text-zinc-400">مناسبة للمشاركة السريعة</p>
                  </div>
                </button>

                <button
                  id="export-png-4k"
                  onClick={() => {
                    triggerHaptic(25);
                    onExportHD();
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-medium text-zinc-200 hover:bg-amber-500/15 hover:text-amber-300 transition-colors my-0.5 min-h-[48px] touch-manipulation cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="text-right">
                    <p className="font-semibold text-amber-300">تصدير 4K Ultra HD (4×)</p>
                    <p className="text-[11px] text-amber-200/70">دقة طباعة فائقة النقاء</p>
                  </div>
                </button>

                <button
                  id="export-svg-vector"
                  onClick={() => {
                    triggerHaptic(20);
                    onExportSVG();
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-medium text-zinc-200 hover:bg-white/10 transition-colors my-0.5 min-h-[48px] touch-manipulation cursor-pointer"
                >
                  <Code2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="text-right">
                    <p className="font-semibold">فيكتور SVG نقي</p>
                    <p className="text-[11px] text-zinc-400">قابل للتكبير اللانهائي في Illustrator</p>
                  </div>
                </button>

                <div className="h-px bg-white/10 my-1.5" />

                <button
                  id="copy-image-clipboard"
                  onClick={() => {
                    triggerHaptic(15);
                    onCopyImage();
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-medium text-zinc-200 hover:bg-white/10 transition-colors my-0.5 min-h-[48px] touch-manipulation cursor-pointer"
                >
                  <Copy className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div className="text-right">
                    <p className="font-semibold">نسخ كصورة للحافظة</p>
                    <p className="text-[11px] text-zinc-400">لصق فوري في برامج التصميم</p>
                  </div>
                </button>

                <button
                  id="copy-rune-map-text"
                  onClick={() => {
                    triggerHaptic(15);
                    onCopyRuneText();
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-medium text-zinc-200 hover:bg-white/10 transition-colors my-0.5 min-h-[48px] touch-manipulation cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 text-purple-400 shrink-0" />
                  <div className="text-right">
                    <p className="font-semibold">نسخ نص خريطة الرموز</p>
                    <p className="text-[11px] text-zinc-400">نص بديل مشفر (ا→⟂ ب→△|)</p>
                  </div>
                </button>

                <div className="h-px bg-white/10 my-1.5" />

                <button
                  id="print-action-btn"
                  onClick={() => {
                    triggerHaptic(15);
                    onPrint();
                    setIsExportDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-zinc-200 hover:bg-white/10 transition-colors min-h-[44px] touch-manipulation cursor-pointer"
                >
                  <Printer className="w-5 h-5 text-zinc-400 shrink-0" />
                  <span>طباعة اللوحة</span>
                </button>
              </div>
            )}
          </div>

          {/* Share Button */}
          <button
            id="share-link-btn"
            onClick={() => {
              triggerHaptic(15);
              onShare();
            }}
            title="مشاركة صورة الشفرة"
            className="flex items-center justify-center p-3 rounded-2xl text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all active:scale-95 shadow-sm min-h-[44px] min-w-[44px] touch-manipulation cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Shortcuts Button */}
          <button
            id="shortcuts-help-btn"
            onClick={() => {
              triggerHaptic(12);
              onOpenShortcuts();
            }}
            title="اختصارات لوحة المفاتيح (Ctrl+/)"
            className="flex items-center justify-center p-3 rounded-2xl text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all active:scale-95 shadow-sm min-h-[44px] min-w-[44px] touch-manipulation cursor-pointer"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 
        Bottom Tier: Spacious Live Adjustments Workspace (مساحة التعديلات السريعة والمباشرة)
      */}
      {showQuickAdjustments && (
        <div
          id="live-adjustments-workspace"
          className="pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-semibold text-zinc-200">لوحة التعديلات الهندسية الحية (Live Canvas Adjustments)</span>
            </div>
            <button
              onClick={() => {
                triggerHaptic(12);
                onOpenSettings();
              }}
              className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1.5 hover:underline transition-colors py-1 cursor-pointer"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>فتح نافذة التخصيص الشاملة (Ctrl+B)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {/* 1. Stroke Width */}
            <div className="bg-white/[0.03] hover:bg-white/[0.05] p-3.5 sm:p-4 rounded-2xl border border-white/10 transition-colors space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium text-zinc-300">سُمك الخط:</span>
                <span className="font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  {settings.lineWidth.toFixed(1)} px
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.5"
                step="0.2"
                value={settings.lineWidth}
                onChange={(e) => {
                  triggerHaptic(8);
                  onUpdateSettings({ lineWidth: parseFloat(e.target.value) });
                }}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400 touch-manipulation"
              />
              <div className="flex items-center justify-between gap-1.5 pt-1">
                {[1.5, 2.5, 3.5, 4.8].map((w) => (
                  <button
                    key={w}
                    onClick={() => {
                      triggerHaptic(12);
                      onUpdateSettings({ lineWidth: w });
                    }}
                    className={`flex-1 py-1.5 text-xs rounded-xl border transition-colors min-h-[34px] touch-manipulation cursor-pointer ${
                      Math.abs(settings.lineWidth - w) < 0.2
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                        : 'bg-white/[0.02] text-zinc-400 border-white/5 hover:bg-white/10 active:scale-95'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Glyph Scale */}
            <div className="bg-white/[0.03] hover:bg-white/[0.05] p-3.5 sm:p-4 rounded-2xl border border-white/10 transition-colors space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium text-zinc-300">حجم الرموز:</span>
                <span className="font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  {settings.glyphScale.toFixed(2)} ×
                </span>
              </div>
              <input
                type="range"
                min="0.65"
                max="1.4"
                step="0.05"
                value={settings.glyphScale}
                onChange={(e) => {
                  triggerHaptic(8);
                  onUpdateSettings({ glyphScale: parseFloat(e.target.value) });
                }}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400 touch-manipulation"
              />
              <div className="flex items-center justify-between gap-1.5 pt-1">
                {[0.75, 0.9, 1.0, 1.25].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      triggerHaptic(12);
                      onUpdateSettings({ glyphScale: s });
                    }}
                    className={`flex-1 py-1.5 text-xs rounded-xl border transition-colors min-h-[34px] touch-manipulation cursor-pointer ${
                      Math.abs(settings.glyphScale - s) < 0.05
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                        : 'bg-white/[0.02] text-zinc-400 border-white/5 hover:bg-white/10 active:scale-95'
                    }`}
                  >
                    {s}×
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Glow Intensity */}
            <div className="bg-white/[0.03] hover:bg-white/[0.05] p-3.5 sm:p-4 rounded-2xl border border-white/10 transition-colors space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium text-zinc-300">شدة التوهج:</span>
                <span className="font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                  {settings.glowIntensity}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={settings.glowIntensity}
                onChange={(e) => {
                  triggerHaptic(8);
                  onUpdateSettings({ glowIntensity: parseInt(e.target.value) });
                }}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 touch-manipulation"
              />
              <div className="flex items-center justify-between gap-1.5 pt-1">
                {[0, 6, 12, 18].map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      triggerHaptic(12);
                      onUpdateSettings({ glowIntensity: g });
                    }}
                    className={`flex-1 py-1.5 text-xs rounded-xl border transition-colors min-h-[34px] touch-manipulation cursor-pointer ${
                      settings.glowIntensity === g
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                        : 'bg-white/[0.02] text-zinc-400 border-white/5 hover:bg-white/10 active:scale-95'
                    }`}
                  >
                    {g === 0 ? 'مطفأ' : g}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Alignment & Quick Layout Toggles */}
            <div className="bg-white/[0.03] hover:bg-white/[0.05] p-3.5 sm:p-4 rounded-2xl border border-white/10 transition-colors space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium text-zinc-300">المحاذاة والاتجاه:</span>
                <span className="text-xs text-zinc-400">
                  {settings.isVerticalMode ? 'طقوسي عمودي' : 'أفقي RTL'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="flex-1 flex items-center bg-black/40 p-1 rounded-xl border border-white/5 min-h-[38px]">
                  <button
                    title="محاذاة لليمين"
                    onClick={() => {
                      triggerHaptic(10);
                      onUpdateSettings({ textAlign: 'right' });
                    }}
                    className={`flex-1 py-1.5 flex items-center justify-center rounded-lg transition-colors min-h-[32px] touch-manipulation cursor-pointer ${
                      settings.textAlign === 'right'
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <AlignRight className="w-4 h-4" />
                  </button>
                  <button
                    title="محاذاة للوسط"
                    onClick={() => {
                      triggerHaptic(10);
                      onUpdateSettings({ textAlign: 'center' });
                    }}
                    className={`flex-1 py-1.5 flex items-center justify-center rounded-lg transition-colors min-h-[32px] touch-manipulation cursor-pointer ${
                      settings.textAlign === 'center'
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button
                    title="ضبط الحواف"
                    onClick={() => {
                      triggerHaptic(10);
                      onUpdateSettings({ textAlign: 'justify' });
                    }}
                    className={`flex-1 py-1.5 flex items-center justify-center rounded-lg transition-colors min-h-[32px] touch-manipulation cursor-pointer ${
                      settings.textAlign === 'justify'
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <AlignJustify className="w-4 h-4" />
                  </button>
                </div>

                {/* Vertical Mode Toggle */}
                <button
                  onClick={() => {
                    triggerHaptic(15);
                    onUpdateSettings({ isVerticalMode: !settings.isVerticalMode });
                  }}
                  title="الوضع الطقوسي الرأسي"
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors min-h-[38px] touch-manipulation cursor-pointer ${
                    settings.isVerticalMode
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                      : 'bg-black/40 text-zinc-400 border-white/5 hover:text-zinc-200'
                  }`}
                >
                  عمودي
                </button>

                {/* Mirror Toggle */}
                <button
                  onClick={() => {
                    triggerHaptic(15);
                    onUpdateSettings({ isMirrorMode: !settings.isMirrorMode });
                  }}
                  title="وضع الانعكاس المرآتي"
                  className={`p-2 rounded-xl border transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center touch-manipulation cursor-pointer ${
                    settings.isMirrorMode
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
                      : 'bg-black/40 text-zinc-400 border-white/5 hover:text-zinc-200'
                  }`}
                >
                  <FlipHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Extras Row (Letter spacing & Watermark) */}
              <div className="flex items-center justify-between text-xs pt-1.5 text-zinc-400 border-t border-white/5">
                <button
                  onClick={() => {
                    triggerHaptic(10);
                    onUpdateSettings({ showWatermark: !settings.showWatermark });
                  }}
                  className={`flex items-center gap-1.5 transition-colors py-1 cursor-pointer ${
                    settings.showWatermark ? 'text-amber-400 font-medium' : 'text-zinc-500'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>العلامة المائية</span>
                </button>
                <div className="flex items-center gap-2">
                  <span>التباعد:</span>
                  <button
                    onClick={() => {
                      triggerHaptic(8);
                      onUpdateSettings({ letterSpacing: Math.max(0, settings.letterSpacing - 5) });
                    }}
                    className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm font-bold text-zinc-200 cursor-pointer active:scale-95 touch-manipulation"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-zinc-200 min-w-[20px] text-center">{settings.letterSpacing}</span>
                  <button
                    onClick={() => {
                      triggerHaptic(8);
                      onUpdateSettings({ letterSpacing: Math.min(40, settings.letterSpacing + 5) });
                    }}
                    className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm font-bold text-zinc-200 cursor-pointer active:scale-95 touch-manipulation"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

