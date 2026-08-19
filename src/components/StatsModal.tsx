import React from 'react';
import { X, BarChart3, FileText, Type, Hash, Layers } from 'lucide-react';
import { normalizeChar } from '../engine/glyphDictionary';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

export const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose, text }) => {
  if (!isOpen) return null;

  const totalChars = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;

  // Character frequency analysis
  const freqMap: Record<string, number> = {};
  for (const rawChar of text) {
    if (rawChar.trim() && rawChar !== '\n') {
      const c = normalizeChar(rawChar);
      freqMap[c] = (freqMap[c] || 0) + 1;
    }
  }

  const sortedFreq = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const maxFreq = sortedFreq.length > 0 ? sortedFreq[0][1] : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg flex flex-col bg-zinc-950/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-zinc-100">
                إحصائيات النص والرموز الهندسية
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">تحليل هيكلي للكلمات وتكرار الحروف</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <Type className="w-4 h-4 mx-auto text-amber-400 mb-1" />
              <p className="text-xl font-bold font-mono text-zinc-100">{totalChars}</p>
              <p className="text-[11px] text-zinc-400">إجمالي الحروف</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <FileText className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
              <p className="text-xl font-bold font-mono text-zinc-100">{words}</p>
              <p className="text-[11px] text-zinc-400">عدد الكلمات</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <Layers className="w-4 h-4 mx-auto text-cyan-400 mb-1" />
              <p className="text-xl font-bold font-mono text-zinc-100">{lines}</p>
              <p className="text-[11px] text-zinc-400">عدد الأسطر</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <Hash className="w-4 h-4 mx-auto text-purple-400 mb-1" />
              <p className="text-xl font-bold font-mono text-zinc-100">{Object.keys(freqMap).length}</p>
              <p className="text-[11px] text-zinc-400">الرموز الفريدة</p>
            </div>
          </div>

          {/* Letter Frequency Bar Chart */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-300">
              أكثر الحروف تكراراً في هذا النص
            </h3>

            {sortedFreq.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-4">اكتب نصاً لتحليل تكرار حروفه</p>
            ) : (
              <div className="space-y-2">
                {sortedFreq.map(([char, count]) => {
                  const percentage = Math.round((count / maxFreq) * 100);
                  return (
                    <div key={char} className="flex items-center gap-3 text-xs">
                      <span className="w-6 text-center font-bold text-amber-400 font-serif">
                        {char}
                      </span>
                      <div className="flex-1 h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-l from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-12 text-left font-mono text-zinc-400 text-[11px]">
                        {count} مرة
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
