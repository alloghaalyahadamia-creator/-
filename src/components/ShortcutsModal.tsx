import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + Z', desc: 'تراجع عن آخر تعديل للنص' },
    { key: 'Ctrl + Y', desc: 'إعادة التعديل المتراجع عنه' },
    { key: 'Ctrl + S', desc: 'تصدير صورة PNG عالية الدقة' },
    { key: 'Ctrl + Shift + C', desc: 'نسخ الصورة فورياً إلى الحافظة' },
    { key: 'Ctrl + D', desc: 'مسح محتوى النص بالكامل' },
    { key: 'Ctrl + M', desc: 'فتح وضع ملء الشاشة المكبر' },
    { key: 'Ctrl + G', desc: 'فتح خريطة الرموز الهندسية' },
    { key: 'Ctrl + B', desc: 'فتح لوحة التحكم في الخصائص الهندسية' },
    { key: 'Ctrl + H', desc: 'استعراض سجل التحويلات السابقة' },
    { key: 'Ctrl + /', desc: 'فتح دليل الاختصارات هذا' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md flex flex-col bg-zinc-950/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100">
                اختصارات لوحة المفاتيح السريعة
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">تحكم كامل بالإنتاجية عبر أزرار المفاتيح</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-5 space-y-2.5">
          {shortcuts.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs"
            >
              <span className="text-zinc-300 font-medium">{sc.desc}</span>
              <kbd className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/20 font-mono text-[11px] text-amber-300 shadow-inner">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
