import React from 'react';
import { EngineSettings, ShadowStyle, TextAlignMode, ThemePresetId } from '../types';
import { X, Sliders, Sun, FlipHorizontal, AlignRight, AlignCenter, AlignJustify, ArrowDownNarrowWide, ShieldCheck, Palette, RotateCcw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: EngineSettings;
  onUpdateSettings: (newSettings: Partial<EngineSettings>) => void;
  onResetSettings: () => void;
  selectedThemeId: ThemePresetId;
  onSelectTheme: (id: ThemePresetId) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSettings,
  selectedThemeId,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-zinc-950/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-zinc-100">
                لوحة التحكم في الخصائص الهندسية
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                تعديل سمك الخط، التوهج، المقاييس، والتخطيط البصري لمحرك Canvas
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

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {/* Custom Color Picker if Custom theme selected */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-400" />
                <span>اللون المخصص للرموز (Hex Color)</span>
              </label>
              {selectedThemeId === 'custom' && (
                <span className="text-[10px] text-amber-300 font-bold px-2 py-0.5 rounded-md bg-amber-500/20">
                  السمة المخصصة مفعّلة
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.customColor}
                onChange={(e) => {
                  onUpdateSettings({ customColor: e.target.value });
                  onSelectTheme('custom');
                }}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={settings.customColor}
                onChange={(e) => {
                  onUpdateSettings({ customColor: e.target.value });
                  onSelectTheme('custom');
                }}
                placeholder="#f59e0b"
                className="flex-1 px-3 py-2 text-xs font-mono bg-zinc-900 border border-white/10 rounded-lg text-zinc-200 uppercase focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Line Width & Glow Intensity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-300">سمك خطوط الرموز</span>
                <span className="font-mono text-amber-400">{settings.lineWidth.toFixed(1)}px</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.2"
                value={settings.lineWidth}
                onChange={(e) => onUpdateSettings({ lineWidth: parseFloat(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>1.0px (رفيع)</span>
                <span>5.0px (عريض)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-300">شدة التوهج النوراني</span>
                <span className="font-mono text-amber-400">{settings.glowIntensity}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={settings.glowIntensity}
                onChange={(e) => onUpdateSettings({ glowIntensity: parseInt(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>0 (مطفأ)</span>
                <span>20 (ساطع)</span>
              </div>
            </div>
          </div>

          {/* Shadow Style & Letter Spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
              <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>نمط الظل والتوهج</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {(
                  [
                    { id: 'soft', label: 'بلوري ناعم' },
                    { id: 'hard', label: 'حاد متوهج' },
                    { id: 'none', label: 'بدون توهج' },
                  ] as { id: ShadowStyle; label: string }[]
                ).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onUpdateSettings({ shadowStyle: opt.id })}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                      settings.shadowStyle === opt.id
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                        : 'text-zinc-400 hover:text-zinc-200 bg-white/[0.02]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-300">تباعد الرموز الأفقي</span>
                <span className="font-mono text-amber-400">+{settings.letterSpacing}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="2"
                value={settings.letterSpacing}
                onChange={(e) => onUpdateSettings({ letterSpacing: parseInt(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>0px (متقارب)</span>
                <span>40px (متباعد)</span>
              </div>
            </div>
          </div>

          {/* Glyph Scale & Line Height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-300">تحجيم الرموز (Glyph Scale)</span>
                <span className="font-mono text-amber-400">{settings.glyphScale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.6"
                step="0.05"
                value={settings.glyphScale}
                onChange={(e) => onUpdateSettings({ glyphScale: parseFloat(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-300">ارتفاع السطر (Line Height)</span>
                <span className="font-mono text-amber-400">{settings.lineHeight.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => onUpdateSettings({ lineHeight: parseFloat(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Alignment & Layout toggles */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-semibold text-zinc-200">محاذاة النص</span>
              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/10">
                {[
                  { id: 'right', label: 'يمين', icon: AlignRight },
                  { id: 'center', label: 'وسط', icon: AlignCenter },
                  { id: 'justify', label: 'ضبط', icon: AlignJustify },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onUpdateSettings({ textAlign: item.id as TextAlignMode })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        settings.textAlign === item.id
                          ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Mirror mode */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer hover:bg-white/[0.04]">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-200">
                  <FlipHorizontal className="w-4 h-4 text-cyan-400" />
                  <span>وضع الانعكاس</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.isMirrorMode}
                  onChange={(e) => onUpdateSettings({ isMirrorMode: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </label>

              {/* Vertical Ritual Writing Mode */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer hover:bg-white/[0.04]">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-200">
                  <ArrowDownNarrowWide className="w-4 h-4 text-purple-400" />
                  <span>الكتابة العمودية</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.isVerticalMode}
                  onChange={(e) => onUpdateSettings({ isVerticalMode: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </label>

              {/* Watermark toggle */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer hover:bg-white/[0.04]">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>العلامة المائية</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showWatermark}
                  onChange={(e) => onUpdateSettings({ showWatermark: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          <button
            onClick={onResetSettings}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط الافتراضيات</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-all active:scale-95 shadow-md"
          >
            تم وحفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
};
