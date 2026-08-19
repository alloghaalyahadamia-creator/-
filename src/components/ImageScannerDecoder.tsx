import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  UploadCloud,
  FileCheck,
  Sparkles,
  Volume2,
  Copy,
  ArrowRightLeft,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Eye,
  KeyRound,
  ClipboardPaste,
} from 'lucide-react';
import { extractPngMetadata } from '../engine/pngMetadata';

interface ImageScannerDecoderProps {
  onApplyDecodedText: (text: string) => void;
  onSpeakTTS: (text: string) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ImageScannerDecoder: React.FC<ImageScannerDecoderProps> = ({
  onApplyDecodedText,
  onSpeakTTS,
  showToast,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [decodedText, setDecodedText] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'success' | 'notFound' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFile = useCallback(
    async (file: File) => {
      // Security: Validate file type and size to prevent resource exhaustion
      if (!file.type.startsWith('image/') || !['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        showToast('يرجى اختيار ملف صورة صالح (.png / .jpg / .jpeg)', 'error');
        return;
      }
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
      if (file.size > MAX_FILE_SIZE) {
        showToast('حجم الصورة كبير جداً. يرجى اختيار صورة أقل من 10 ميجابايت.', 'error');
        return;
      }

      setFileName(file.name || 'cipher-image.png');
      setIsScanning(true);
      setScanStatus('idle');
      setDecodedText(null);

      // Create preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      try {
        // Laser scanning feedback duration
        await new Promise((r) => setTimeout(r, 600));

        const result = await extractPngMetadata(file);

        if (result && result.text && result.text.trim()) {
          // Security: Limit decoded text length to prevent memory issues from malicious payloads
          const text = result.text.trim().substring(0, 5000);
          setDecodedText(text);
          setScanStatus('success');
          showToast('🎉 تم فك شَفْرَة الصورة واستخراج النص العربي الأصلي بنجاح!', 'success');
        } else {
          setScanStatus('notFound');
          showToast('لم يتم العثور على شفرة مدمجة داخل هذه الصورة', 'info');
        }
      } catch (err) {
        console.error('Scan error:', err);
        setScanStatus('error');
        showToast('حدث خطأ أثناء فحص الصورة', 'error');
      } finally {
        setIsScanning(false);
      }
    },
    [showToast]
  );

  // 1. Global Clipboard Paste Listener (Ctrl + V / Cmd + V)
  useEffect(() => {
    const handleWindowPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            e.preventDefault();
            processFile(file);
            showToast('تم لصق الصورة وفحص شفرتها بنجاح! 📋✨', 'success');
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handleWindowPaste);
    return () => window.removeEventListener('paste', handleWindowPaste);
  }, [processFile, showToast]);

  // 2. Direct Clipboard Paste Button Click (using Navigator Clipboard API)
  const handleClipboardPasteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (!navigator.clipboard?.read) {
        showToast('اضغط مباشرة على لوحة المفاتيح Ctrl + V للصق الصورة', 'info');
        return;
      }
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        const imageType = item.types.find((type) => type.startsWith('image/'));
        if (imageType) {
          const blob = await item.getType(imageType);
          const file = new File([blob], 'pasted-cipher.png', { type: imageType });
          processFile(file);
          showToast('تم لصق الصورة وفحص شفرتها فوراً! 📋', 'success');
          return;
        }
      }
      showToast('لم يتم العثور على صورة في الحافظة. انسخ صورة أولاً ثم اضغط لصق.', 'info');
    } catch (error) {
      showToast('يرجى الضغط على Ctrl + V للصق الصورة مباشرة.', 'info');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleCopyDecoded = async () => {
    if (!decodedText) return;
    try {
      await navigator.clipboard.writeText(decodedText);
      showToast('تم نسخ النص المستخرج إلى الحافظة! 📋', 'success');
    } catch {
      showToast('تعذر نسخ النص', 'error');
    }
  };

  const handleApplyToEditor = () => {
    if (!decodedText) return;
    onApplyDecodedText(decodedText);
    showToast('تم نقل النص المفكوك إلى خانة الترجمة ومحرك الرسم! ✨', 'success');
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setDecodedText(null);
    setScanStatus('idle');
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      id="image-scanner-decoder-card"
      className="relative rounded-2xl bg-zinc-950/80 border border-amber-500/30 p-5 sm:p-6 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] overflow-hidden transition-all"
    >
      {/* Background Subtle Amber Glow */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 blur-3xl rounded-full" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-zinc-100 flex items-center gap-2">
              <span>فاحص الصور وفك الشفرة</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                AI Metadata Scanner
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              ارفع أو الصق أي صورة شفرة (.png) تم تصديرها من التطبيق لقراءة النص العربي الأصلي فورياً
            </p>
          </div>
        </div>

        {decodedText && (
          <button
            onClick={handleReset}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>فحص صورة جديدة</span>
          </button>
        )}
      </div>

      {/* Upload Dropzone */}
      {!previewUrl && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer flex flex-col items-center justify-center p-8 sm:p-10 rounded-2xl border-2 border-dashed transition-all duration-300 text-center group ${
            isDragging
              ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
              : 'border-white/15 hover:border-amber-400/50 bg-white/[0.02] hover:bg-white/[0.04]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all">
            <UploadCloud className="w-8 h-8" />
          </div>

          <p className="text-sm sm:text-base font-bold text-zinc-200 mb-1">
            اسحب وأفلت صورة الشفرة، أو <span className="text-amber-400 underline">اضغط للاختيار</span>، أو الصق مباشرة <span className="font-mono text-amber-300">(Ctrl + V)</span>
          </p>

          <p className="text-xs text-zinc-500 max-w-sm">
            يدعم صور الشفرات (.png) المصدرة أو المشاركة، حيث يقوم بقراءة البيانات الوصفية المدمجة
          </p>

          {/* Golden Glass Paste Button */}
          <button
            type="button"
            onClick={handleClipboardPasteClick}
            className="mt-3 px-4 py-2 rounded-xl bg-[#c9a84c]/20 hover:bg-[#c9a84c]/30 text-[#e8c55a] border border-[#c9a84c]/40 text-sm font-medium flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(201,168,76,0.15)]"
          >
            <span>📋</span>
            <span>لصق الصورة من الحافظة</span>
          </button>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-zinc-400">
            <KeyRound className="w-3 h-3 text-amber-400" />
            <span>فك فوري وآمن 100% داخل المتصفح</span>
          </div>
        </div>
      )}

      {/* Scanning / Result State */}
      {previewUrl && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Image Preview with Scanning Animation */}
            <div className="md:col-span-4 relative rounded-2xl overflow-hidden border border-white/15 bg-zinc-900 aspect-video md:aspect-square flex items-center justify-center group shadow-lg">
              <img
                src={previewUrl}
                alt="الصورة المفحوصة"
                className="w-full h-full object-contain"
              />

              {/* Laser Scanning Animation */}
              {isScanning && (
                <div className="absolute inset-0 bg-amber-500/10 pointer-events-none flex flex-col justify-between">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-[bounce_1.5s_infinite] shadow-[0_0_15px_#f59e0b]" />
                  <div className="text-center pb-3">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-zinc-950/90 text-amber-300 font-mono text-[11px] border border-amber-400/40 animate-pulse">
                      جاري فحص الشفرة...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Results & Actions */}
            <div className="md:col-span-8 space-y-3">
              {isScanning ? (
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 text-center space-y-2">
                  <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>جاري تحليل شفرة الصورة واستخراج النص...</span>
                  </div>
                  <p className="text-xs text-zinc-400">فحص قنوات tEXt Chunks والبيانات الوصفية</p>
                </div>
              ) : scanStatus === 'success' && decodedText ? (
                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  {/* Success Banner */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>تم فك الشفرة بنجاح من الملف: {fileName}</span>
                  </div>

                  {/* Decoded Arabic Text Box */}
                  <div className="p-4 rounded-xl bg-amber-500/[0.04] border-2 border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.15)] space-y-1.5">
                    <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block">
                      النص العربي المترجم المستخرج:
                    </span>
                    <p
                      dir="rtl"
                      className="text-base sm:text-lg md:text-xl font-bold text-zinc-100 leading-relaxed font-sans select-all"
                    >
                      {decodedText}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      id="apply-decoded-to-editor-btn"
                      onClick={handleApplyToEditor}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-md transition-all active:scale-95"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>نقل لخانة الترجمة والرسم</span>
                    </button>

                    <button
                      id="copy-decoded-text-btn"
                      onClick={handleCopyDecoded}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 transition-all active:scale-95"
                    >
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>نسخ النص</span>
                    </button>

                    <button
                      id="speak-decoded-tts-btn"
                      onClick={() => onSpeakTTS(decodedText)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 transition-all active:scale-95"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>نطق صوتي</span>
                    </button>
                  </div>
                </div>
              ) : scanStatus === 'notFound' ? (
                <div className="p-5 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 text-right space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>لم يتم العثور على شفرة مدمجة</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    يبدو أن هذه الصورة لم يتم تصديرها من التطبيق مباشرة أو تم حفظها بدون بيانات وصفية (مثل لقطة شاشة سريعة).
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    نصيحة: استخدم صور PNG المحفوظة عبر زر "تصدير وحفظ" أو "مشاركة صورة الشفرة" للفك التلقائي الفوري.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>اختيار صورة أخرى</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleClipboardPasteClick}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#c9a84c]/20 text-[#e8c55a] border border-[#c9a84c]/40 hover:bg-[#c9a84c]/30 transition-colors"
                    >
                      <span>📋</span>
                      <span>لصق من الحافظة</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                  حدث خطأ أثناء قراءة ملف الصورة. يرجى تجربة ملف PNG آخر.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
