import React from 'react';
import { HistoryItem } from '../types';
import { X, History as HistoryIcon, Clock, Trash2, ArrowUpRight } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onRestoreItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onRestoreItem,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col bg-zinc-950/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <HistoryIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-zinc-100">
                سجل التحويلات السابقة
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                آخر {history.length} نصوص قمت بتحويلها مع إمكانية الاستعادة الفورية
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

        {/* List of items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {history.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>لا يوجد سجل تحويلات محفوظ بعد</p>
              <p className="text-[11px] text-zinc-600 mt-1">
                سيتم حفظ أي نص تكتبه تلقائياً هنا للرجوع إليه لاحقاً
              </p>
            </div>
          ) : (
            history.map((item) => {
              const dateStr = new Date(item.timestamp).toLocaleTimeString('ar-SA', {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onRestoreItem(item);
                    onClose();
                  }}
                  className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-amber-400/40 cursor-pointer transition-all duration-200 text-right"
                >
                  <div className="flex-1 pr-1">
                    <p className="text-xs font-medium text-zinc-200 group-hover:text-amber-300 transition-colors line-clamp-2">
                      {item.text}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-zinc-500 font-mono">
                      <span>{dateStr}</span>
                      <span>•</span>
                      <span>{item.text.length} حرف</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-amber-500/20 group-hover:text-amber-300 text-zinc-400 transition-colors mr-3">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-3.5 border-t border-white/10 bg-white/[0.01] flex justify-end">
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>مسح كامل السجل</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
