"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Copy,
  Download,
  Trash2,
  Keyboard,
  Sparkles,
  Check,
  Wand2,
} from 'lucide-react';
import { EngineSettings, ThemeConfig } from '../types';
import { THEME_PRESETS } from '../data/themes';
import { renderFullCanvas, exportHDCanvasPNG } from '../engine/canvasRenderer';
import { YahadamiyaVintageKeyboard } from './ui/yahadamiya-vintage-keyboard';

const DEFAULT_WRITER_SETTINGS: EngineSettings = {
  lineWidth: 2.5,
  glowIntensity: 8,
  shadowStyle: 'soft',
  letterSpacing: 6,
  glyphScale: 1.0,
  lineHeight: 1.4,
  isMirrorMode: false,
  textAlign: 'right',
  isVerticalMode: false,
  canvasBg: 'dark',
  showWatermark: true,
  customColor: '#f59e0b',
};

const PRESET_YAH_PHRASES = [
  { label: 'شَفْرَة اليحآدمية', text: 'شفرة اليحآدمية' },
  { label: 'سلام وحكمة', text: 'سلام وحكمة' },
  { label: 'رموز أسطورية', text: 'رموز أسطورية' },
  { label: 'نور البيان', text: 'نور البيان' },
  { label: 'آدم & يحيى', text: 'آدم عبد الجواد ويحيى الشابي' },
];

interface DirectYahadamiyaWriterProps {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  directYahText: string;
  setDirectYahText: React.Dispatch<React.SetStateAction<string>>;
  settings?: EngineSettings;
  theme?: ThemeConfig;
}

export function DirectYahadamiyaWriter({
  showToast,
  directYahText,
  setDirectYahText,
  settings,
  theme,
}: DirectYahadamiyaWriterProps) {
  const [copied, setCopied] = useState(false);
  const directCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const effectiveSettings = settings || DEFAULT_WRITER_SETTINGS;
  const effectiveTheme = theme || THEME_PRESETS.gold;

  const lastWriterRenderRef = useRef<number>(0);
  const writerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const writerRafRef = useRef<number | null>(null);

  // Render Canvas 2D with 60ms rAF throttling for fast typing
  useEffect(() => {
    if (!directCanvasRef.current || directYahText.trim().length === 0) return;

    const now = performance.now();
    const elapsed = now - lastWriterRenderRef.current;

    const doRender = () => {
      if (directCanvasRef.current) {
        const canvas = directCanvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          lastWriterRenderRef.current = performance.now();
          renderFullCanvas(ctx, directYahText, effectiveSettings, effectiveTheme);
        }
      }
    };

    if (elapsed >= 60) {
      if (writerRafRef.current) cancelAnimationFrame(writerRafRef.current);
      writerRafRef.current = requestAnimationFrame(doRender);
    } else {
      if (writerTimeoutRef.current) clearTimeout(writerTimeoutRef.current);
      writerTimeoutRef.current = setTimeout(() => {
        if (writerRafRef.current) cancelAnimationFrame(writerRafRef.current);
        writerRafRef.current = requestAnimationFrame(doRender);
      }, 60 - elapsed);
    }

    return () => {
      if (writerTimeoutRef.current) clearTimeout(writerTimeoutRef.current);
      if (writerRafRef.current) cancelAnimationFrame(writerRafRef.current);
    };
  }, [directYahText, effectiveSettings, effectiveTheme]);

  // Handle RTL Auto-scroll to ensure start of sentence is visible
  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      try {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } catch {
        el.scrollLeft = 0;
      }
    }
  }, [directYahText]);

  // Insert character from keyboard
  const handleInsertChar = useCallback(
    (char: string) => {
      setDirectYahText((prev) => prev + char);
    },
    [setDirectYahText]
  );

  // Backspace function
  const handleBackspace = useCallback(() => {
    setDirectYahText((prev) => {
      if (!prev) return '';
      const chars = Array.from(prev);
      chars.pop();
      return chars.join('');
    });
  }, [setDirectYahText]);

  // Space function
  const handleSpace = useCallback(() => {
    setDirectYahText((prev) => prev + ' ');
  }, [setDirectYahText]);

  // Newline function
  const handleNewLine = useCallback(() => {
    setDirectYahText((prev) => prev + '\n');
  }, [setDirectYahText]);

  // Clear all
  const handleClear = useCallback(() => {
    if (!directYahText) return;
    setDirectYahText('');
    showToast('تم مسح النص اليحآدمي بالكامل', 'info');
  }, [directYahText, setDirectYahText, showToast]);

  // Copy to clipboard
  const handleCopy = useCallback(async () => {
    if (!directYahText.trim()) {
      showToast('الصندوق فارغ! اكتب بعض الرموز أولاً ✍️', 'info');
      return;
    }
    try {
      await navigator.clipboard.writeText(directYahText);
      setCopied(true);
      showToast('تم نسخ النص اليحآدمي إلى الحافظة بنجاح! 📋✨', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('تعذر النسخ التلقائي', 'error');
    }
  }, [directYahText, showToast]);

  // Export as HD PNG
  const handleExportPNG = useCallback(async () => {
    if (!directYahText.trim()) {
      showToast('يرجى إدخال رموز أولاً للتصدير 🖼️', 'info');
      return;
    }

    try {
      if (directCanvasRef.current) {
        // High Quality Offscreen Canvas Render
        const dataUrl = await exportHDCanvasPNG(
          directYahText,
          effectiveSettings,
          effectiveTheme,
          3
        );
        const link = document.createElement('a');
        link.download = `yahadamiya-pure-script-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        showToast('تم تصدير اللوحة بدقة فائقة PNG بنجاح! 🖼️✨', 'success');
      }
    } catch {
      // Fallback export from canvas directly
      if (directCanvasRef.current) {
        const link = document.createElement('a');
        link.download = 'yahadamiya-pure-script.png';
        link.href = directCanvasRef.current.toDataURL('image/png');
        link.click();
        showToast('تم تصدير اللوحة بصيغة PNG بنجاح! 🖼️✨', 'success');
      }
    }
  }, [directYahText, effectiveSettings, effectiveTheme, showToast]);

  // Physical Keyboard Listener
  useEffect(() => {
    const handlePhysicalKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key;

      if (key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
        return;
      }

      if (key === 'Enter') {
        e.preventDefault();
        handleNewLine();
        return;
      }

      if (key === ' ') {
        e.preventDefault();
        handleSpace();
        return;
      }

      // Allow Arabic characters
      if (
        /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]$/.test(
          key
        )
      ) {
        e.preventDefault();
        handleInsertChar(key);
      }
    };

    window.addEventListener('keydown', handlePhysicalKeyDown);
    return () => window.removeEventListener('keydown', handlePhysicalKeyDown);
  }, [handleInsertChar, handleBackspace, handleSpace, handleNewLine]);

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-300" dir="rtl">
      {/* Quick Inspiration Presets */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs text-[#e8c55a] font-semibold flex items-center gap-1 shrink-0">
          <Wand2 className="size-3.5" />
          <span>عبارات يحآدمية جاهزة:</span>
        </span>
        {PRESET_YAH_PHRASES.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setDirectYahText(preset.text)}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#c9a84c]/20 text-slate-300 hover:text-[#f3d37a] border border-white/10 hover:border-[#c9a84c]/40 text-xs font-medium whitespace-nowrap transition-all cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* لوح الرموز اليحآدمية الخالصة بتقنية Canvas 2D */}
      <div className="w-full rounded-3xl bg-[#0a0a14]/90 border-2 border-[#c9a84c]/40 p-4 sm:p-6 backdrop-blur-2xl shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(201,168,76,0.15)] flex flex-col items-center justify-center my-4">
        {/* شريط رأس اللوح */}
        <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-[#c9a84c]/20">
          <span className="text-xs text-slate-400 font-mono">
            {directYahText.length} رمز مكتوب
          </span>
          <div className="flex items-center gap-1.5 text-[#e8c55a] text-xs font-bold">
            <span>لوح الرموز اليحآدمية المباشرة (Pure Canvas View)</span>
            <Sparkles className="size-3.5 text-[#e8c55a]" />
          </div>
        </div>

        {/* لوحة الرسم Canvas مع شريط تمرير أفقي سلس */}
        <div
          ref={containerRef}
          className="w-full overflow-x-auto overflow-y-hidden py-4 px-2 flex justify-center min-h-[160px] items-center"
        >
          {directYahText.length === 0 ? (
            <div className="w-full text-center text-slate-500 text-sm py-8 font-sans">
              انقر على أزرار لوحة الرموز بالأسفل لبدء الكتابة باللغة اليحآدمية فوراً...
            </div>
          ) : (
            <canvas
              ref={directCanvasRef}
              className="max-h-[180px] sm:max-h-[220px] drop-shadow-[0_0_15px_rgba(201,168,76,0.3)] transition-all rounded-xl"
            />
          )}
        </div>

        {/* شريط الإجراءات السفلي (نسخ، تصدير، مسح) */}
        <div className="w-full flex items-center justify-between pt-3 mt-2 border-t border-[#c9a84c]/20 flex-wrap gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="px-3.5 py-1.5 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Trash2 className="size-3.5" />
            <span>مسح الكل</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportPNG}
              className="px-3.5 py-1.5 rounded-xl bg-[#c9a84c]/20 hover:bg-[#c9a84c]/30 text-[#e8c55a] border border-[#c9a84c]/40 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Download className="size-3.5" />
              <span>تصدير كصورة PNG</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'bg-[#c9a84c] text-black hover:bg-[#e8c55a] shadow-[0_0_15px_rgba(201,168,76,0.3)] hover:scale-105 active:scale-95'
              }`}
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ النص اليحآدمي'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* لوحة المفاتيح الميكانيكية بالرموز الهندسية النقية */}
      <YahadamiyaVintageKeyboard
        onKeyPress={handleInsertChar}
        onBackspace={handleBackspace}
        onEnter={handleNewLine}
        onSpace={handleSpace}
        onClearAll={handleClear}
      />
    </div>
  );
}
