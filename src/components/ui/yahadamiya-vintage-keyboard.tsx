"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Delete, CornerDownLeft, Sparkles, X, Trash2 } from "lucide-react";

// مكون رسم الرموز الهندسية الفكتورية لليحآدمية (مطابق لمحرك الـ Canvas)
export function YahadamiyaKeyGlyph({ char }: { char: string }) {
  const strokeColor = "#e8c55a";
  const strokeW = 2.2;

  return (
    <svg viewBox="0 0 50 60" className="w-6 h-7 sm:w-7 sm:h-8 drop-shadow-[0_0_6px_rgba(201,168,76,0.5)]">
      {char === "ا" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none">
          <line x1="12" y1="50" x2="38" y2="50" />
          <line x1="25" y1="12" x2="25" y2="50" />
        </g>
      )}
      {char === "أ" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none">
          <line x1="12" y1="50" x2="38" y2="50" />
          <line x1="25" y1="20" x2="25" y2="50" />
          {/* همزة مصغرة في الأعلى */}
          <path d="M21 9 C21 5, 29 5, 29 9 C29 13, 21 15, 29 15" strokeWidth={1.8} />
        </g>
      )}
      {char === "إ" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none">
          <line x1="12" y1="12" x2="38" y2="12" />
          <line x1="25" y1="12" x2="25" y2="42" />
          <path d="M21 47 C21 44, 29 44, 29 47 C29 50, 21 52, 29 52" strokeWidth={1.8} />
        </g>
      )}
      {char === "آ" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none">
          <line x1="12" y1="50" x2="38" y2="50" />
          <line x1="25" y1="22" x2="25" y2="50" />
          <line x1="16" y1="8" x2="34" y2="8" />
          <line x1="16" y1="14" x2="34" y2="14" />
        </g>
      )}
      {char === "ء" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none">
          <path d="M19 24 C19 16, 31 16, 31 24 C31 32, 19 36, 31 36" />
        </g>
      )}
      {char === "ئ" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none">
          <polyline points="15,22 25,50 35,22" />
          <path d="M21 9 C21 5, 29 5, 29 9 C29 13, 21 15, 29 15" strokeWidth={1.8} />
        </g>
      )}
      {char === "ؤ" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none">
          <line x1="15" y1="22" x2="35" y2="50" />
          <line x1="35" y1="22" x2="15" y2="50" />
          <path d="M21 9 C21 5, 29 5, 29 9 C29 13, 21 15, 29 15" strokeWidth={1.8} />
        </g>
      )}
      {char === "ب" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polygon points="25,12 40,50 10,50" />
          <line x1="25" y1="12" x2="25" y2="50" />
        </g>
      )}
      {char === "ت" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polygon points="25,12 40,50 10,50" />
          <line x1="20" y1="24" x2="20" y2="50" />
          <line x1="30" y1="24" x2="30" y2="50" />
        </g>
      )}
      {char === "ث" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polygon points="25,12 40,50 10,50" />
          <line x1="18" y1="30" x2="18" y2="50" />
          <line x1="25" y1="12" x2="25" y2="50" />
          <line x1="32" y1="30" x2="32" y2="50" />
        </g>
      )}
      {char === "ج" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline points="14,14 36,14 25,50" />
          <circle cx="25" cy="26" r="2" fill={strokeColor} />
        </g>
      )}
      {char === "ح" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline points="14,14 36,14 25,50" />
        </g>
      )}
      {char === "خ" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline points="14,18 36,18 25,52" />
          <circle cx="36" cy="10" r="2" fill={strokeColor} />
        </g>
      )}
      {char === "د" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="14" y1="16" x2="38" y2="16" />
          <path d="M14 16 C15 30, 36 34, 36 42 C36 50, 16 52, 12 46" />
        </g>
      )}
      {char === "ذ" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="14" y1="18" x2="38" y2="18" />
          <path d="M14 18 C15 32, 36 36, 36 44 C36 52, 16 54, 12 48" />
          <circle cx="14" cy="8" r="2" fill={strokeColor} />
        </g>
      )}
      {char === "ر" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none">
          <line x1="8" y1="48" x2="42" y2="48" />
        </g>
      )}
      {char === "ز" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none">
          <line x1="8" y1="48" x2="42" y2="48" />
          <circle cx="25" cy="38" r="2.2" fill={strokeColor} />
        </g>
      )}
      {char === "س" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none">
          <line x1="10" y1="50" x2="40" y2="50" />
          <line x1="15" y1="30" x2="15" y2="50" />
          <line x1="25" y1="30" x2="25" y2="50" />
          <line x1="35" y1="30" x2="35" y2="50" />
          <line x1="12" y1="22" x2="38" y2="22" />
          <line x1="12" y1="16" x2="38" y2="16" />
          <line x1="12" y1="10" x2="38" y2="10" />
        </g>
      )}
      {char === "ش" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none">
          <line x1="10" y1="50" x2="40" y2="50" />
          <line x1="15" y1="32" x2="15" y2="50" />
          <line x1="25" y1="32" x2="25" y2="50" />
          <line x1="35" y1="32" x2="35" y2="50" />
          <line x1="12" y1="24" x2="38" y2="24" />
          <line x1="12" y1="18" x2="38" y2="18" />
          <line x1="12" y1="12" x2="38" y2="12" />
          <line x1="12" y1="6" x2="38" y2="6" />
        </g>
      )}
      {char === "ص" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="8" y="16" width="34" height="18" />
          <rect x="18" y="25" width="14" height="25" />
        </g>
      )}
      {char === "ض" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="8" y="16" width="34" height="18" />
          <rect x="18" y="25" width="14" height="25" />
          <circle cx="25" cy="22" r="2" fill={strokeColor} />
        </g>
      )}
      {char === "ط" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="10" y="32" width="30" height="18" />
          <line x1="25" y1="10" x2="25" y2="32" />
        </g>
      )}
      {char === "ظ" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="10" y="32" width="30" height="18" />
          <line x1="25" y1="10" x2="25" y2="32" />
          <circle cx="32" cy="41" r="2" fill={strokeColor} />
        </g>
      )}
      {char === "ع" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="14" y="10" width="22" height="40" />
          <line x1="14" y1="30" x2="36" y2="30" />
        </g>
      )}
      {char === "غ" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="14" y="10" width="22" height="40" />
          <line x1="14" y1="30" x2="36" y2="30" />
          <circle cx="25" cy="20" r="2" fill={strokeColor} />
        </g>
      )}
      {char === "ف" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="13" y="14" width="24" height="20" />
          <line x1="25" y1="34" x2="25" y2="52" />
          <circle cx="25" cy="7" r="2.2" fill={strokeColor} />
        </g>
      )}
      {char === "ق" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="13" y="16" width="24" height="20" />
          <line x1="25" y1="36" x2="25" y2="52" />
          <circle cx="19" cy="8" r="2" fill={strokeColor} />
          <circle cx="31" cy="8" r="2" fill={strokeColor} />
        </g>
      )}
      {char === "ك" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M34 14 L18 14 L16 30 C20 26, 34 26, 34 38 C34 48, 16 50, 14 42" />
        </g>
      )}
      {char === "ل" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="30" y1="12" x2="30" y2="48" />
          <line x1="30" y1="48" x2="14" y2="48" />
        </g>
      )}
      {char === "م" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="16" y1="12" x2="16" y2="48" />
          <circle cx="26" cy="36" r="10" />
        </g>
      )}
      {char === "ن" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="16" y1="48" x2="16" y2="14" />
          <line x1="16" y1="14" x2="34" y2="48" />
          <line x1="34" y1="48" x2="34" y2="14" />
        </g>
      )}
      {char === "ه" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="12" y="14" width="26" height="32" />
          <line x1="25" y1="14" x2="25" y2="46" />
        </g>
      )}
      {char === "ة" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="12" y="18" width="26" height="30" />
          <line x1="25" y1="18" x2="25" y2="48" />
          <circle cx="19" cy="10" r="2" fill={strokeColor} />
          <circle cx="31" cy="10" r="2" fill={strokeColor} />
        </g>
      )}
      {char === "و" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none">
          <line x1="14" y1="16" x2="36" y2="44" />
          <line x1="36" y1="16" x2="14" y2="44" />
        </g>
      )}
      {char === "ي" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline points="14,16 25,42 36,16" />
          <line x1="10" y1="48" x2="40" y2="48" />
        </g>
      )}
      {char === "ى" && (
        <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline points="14,16 25,46 36,16" />
        </g>
      )}
    </svg>
  );
}

const YAHADAMIYA_KEYBOARD_LAYOUT = [
  ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د", "ذ"],
  ["ش", "س", "ي", "ب", "ل", "ا", "أ", "إ", "آ", "ت", "ن", "م", "ك", "ط", "ظ"],
  ["ئ", "ء", "ؤ", "ر", "ى", "ة", "و", "ز"],
];

interface YahadamiyaVintageKeyboardProps {
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  onClearAll?: () => void;
  onClose?: () => void;
}

export function YahadamiyaVintageKeyboard({
  onKeyPress,
  onBackspace,
  onEnter,
  onSpace,
  onClearAll,
  onClose,
}: YahadamiyaVintageKeyboardProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playClickSound = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio context error handling
    }
  };

  const handleKeyClick = (char: string) => {
    playClickSound();
    setActiveKey(char);
    setTimeout(() => setActiveKey(null), 120);
    onKeyPress(char);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-5 rounded-3xl bg-[#090914]/95 border-2 border-[#c9a84c]/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(201,168,76,0.15)] select-none my-4 animate-in fade-in duration-300" dir="rtl">
      
      {/* شريط رأس الكيبورد */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#c9a84c]/20 px-2">
        <div className="flex items-center gap-2 text-[#e8c55a]">
          <Sparkles className="size-4" />
          <span className="font-bold text-xs sm:text-sm tracking-wide">لوحة رموز شَفْرَة اليحآدمية</span>
        </div>

        <div className="flex items-center gap-2">
          {onClearAll && (
            <button
              type="button"
              onClick={() => { playClickSound(); onClearAll(); }}
              className="p-1.5 rounded-lg bg-red-950/30 border border-red-500/30 text-red-300 hover:text-white transition-all cursor-pointer text-xs flex items-center gap-1 px-2.5"
            >
              <Trash2 className="size-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg bg-black/40 border border-[#c9a84c]/30 text-slate-300 hover:text-[#e8c55a] transition-all cursor-pointer text-xs flex items-center gap-1 px-2.5"
          >
            {soundEnabled ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-black/40 border border-[#c9a84c]/30 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* صفوف الرموز الفكتورية الذهبية الخالصة (بدون أي حرف عربي) */}
      <div className="flex flex-col gap-1.5 sm:gap-2 items-center justify-center">
        {YAHADAMIYA_KEYBOARD_LAYOUT.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-1 sm:gap-1.5 md:gap-2 justify-center w-full flex-wrap">
            {row.map((char) => {
              const isPressed = activeKey === char;
              return (
                <button
                  key={char}
                  type="button"
                  onClick={() => handleKeyClick(char)}
                  className={`relative flex items-center justify-center min-w-[32px] sm:min-w-[44px] md:min-w-[50px] h-12 sm:h-14 md:h-16 px-1 rounded-xl transition-all cursor-pointer
                    ${
                      isPressed
                        ? "translate-y-1 bg-[#e8c55a] shadow-none border-[#fff]"
                        : "bg-gradient-to-b from-[#181828] to-[#0c0c16] border-b-4 border-r border-l border-t border-b-[#c9a84c]/70 border-[#c9a84c]/30 shadow-[0_4px_0_#05050a,0_4px_12px_rgba(0,0,0,0.6)] hover:border-[#e8c55a] hover:scale-105 active:translate-y-1 active:border-b-0 active:shadow-none"
                    }
                  `}
                >
                  <YahadamiyaKeyGlyph char={char} />
                </button>
              );
            })}
          </div>
        ))}

        {/* صف الأزرار الوظيفية (مسافة، حذف، سطر جديد) */}
        <div className="flex gap-2 w-full justify-center mt-2 max-w-2xl">
          <button
            type="button"
            onClick={() => { playClickSound(); onEnter(); }}
            className="flex items-center justify-center px-4 h-11 rounded-xl bg-[#181828] border-b-4 border-b-[#c9a84c]/60 border-[#c9a84c]/30 text-xs font-semibold text-slate-200 hover:text-[#e8c55a] active:translate-y-1 active:border-b-0 cursor-pointer shadow-[0_4px_0_#05050a]"
          >
            <CornerDownLeft className="size-4" />
          </button>

          {/* زر المسافة (المسافة في اليحآدمية = نقطة •) */}
          <button
            type="button"
            onClick={() => { playClickSound(); onSpace(); }}
            className="flex-1 h-11 rounded-xl bg-gradient-to-b from-[#222238] to-[#121220] border-b-4 border-b-[#e8c55a] border-[#c9a84c]/40 flex items-center justify-center gap-2 text-xs font-bold text-[#e8c55a] active:translate-y-1 active:border-b-0 cursor-pointer shadow-[0_4px_0_#05050a] hover:shadow-[0_0_15px_rgba(201,168,76,0.3)]"
          >
            <span className="text-xl text-white font-black drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">•</span>
          </button>

          <button
            type="button"
            onClick={() => { playClickSound(); onBackspace(); }}
            className="flex items-center justify-center px-4 h-11 rounded-xl bg-red-950/40 border-b-4 border-b-red-700/60 border-red-500/30 text-xs font-semibold text-red-300 hover:text-white active:translate-y-1 active:border-b-0 cursor-pointer shadow-[0_4px_0_#05050a]"
          >
            <Delete className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
