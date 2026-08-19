import React, { useEffect, useRef, useState, useCallback } from 'react';
import { EngineSettings, ThemeConfig } from '../types';
import { calculateTextLayout, renderFullCanvas } from '../engine/canvasRenderer';
import { extractPngMetadata } from '../engine/pngMetadata';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Download,
  Copy,
  Volume2,
} from 'lucide-react';

interface CanvasViewerProps {
  text: string;
  settings: EngineSettings;
  theme: ThemeConfig;
  onOpenFullscreen: () => void;
  onQuickExport: () => void;
  onCopyImage: () => void;
  onSpeakTTS: () => void;
  onDropTextFile: (content: string) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const CanvasViewer: React.FC<CanvasViewerProps> = ({
  text,
  settings,
  theme,
  onOpenFullscreen,
  onQuickExport,
  onCopyImage,
  onSpeakTTS,
  onDropTextFile,
  showToast,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Animation State
  const [isPlayingAnim, setIsPlayingAnim] = useState<boolean>(false);
  const [animProgress, setAnimProgress] = useState<number>(0);
  const [animSpeed, setAnimSpeed] = useState<number>(1.0);
  const animFrameRef = useRef<number | null>(null);
  const totalGlyphsRef = useRef<number>(0);

  // Re-render canvas whenever text, settings, theme or animation step changes
  const renderCanvas = useCallback(
    (visibleCount?: number, activeCursorIndex?: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      renderFullCanvas(ctx, text, settings, theme, visibleCount, activeCursorIndex);
    },
    [text, settings, theme]
  );

  const lastRenderTimeRef = useRef<number>(0);
  const renderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const renderRafRef = useRef<number | null>(null);

  // Initial and reactive render with 60ms rAF throttling for ultra-fast typing response
  useEffect(() => {
    if (isPlayingAnim) return;

    const now = performance.now();
    const elapsed = now - lastRenderTimeRef.current;

    const doRender = () => {
      lastRenderTimeRef.current = performance.now();
      renderCanvas();
    };

    if (elapsed >= 60) {
      if (renderRafRef.current) cancelAnimationFrame(renderRafRef.current);
      renderRafRef.current = requestAnimationFrame(doRender);
    } else {
      if (renderTimeoutRef.current) clearTimeout(renderTimeoutRef.current);
      renderTimeoutRef.current = setTimeout(() => {
        if (renderRafRef.current) cancelAnimationFrame(renderRafRef.current);
        renderRafRef.current = requestAnimationFrame(doRender);
      }, 60 - elapsed);
    }

    return () => {
      if (renderTimeoutRef.current) clearTimeout(renderTimeoutRef.current);
      if (renderRafRef.current) cancelAnimationFrame(renderRafRef.current);
    };
  }, [renderCanvas, isPlayingAnim]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Handle RTL Auto-scroll to ensure start of sentence (right edge) is always visible
  useEffect(() => {
    if (containerRef.current && !isPlayingAnim) {
      const el = containerRef.current;
      // In RTL layout (dir="rtl"), scrollLeft = 0 corresponds to the start (right edge)
      try {
        el.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      } catch {
        el.scrollLeft = 0;
      }
    }
  }, [text, isPlayingAnim]);

  // Animation Loop Engine
  const startAnimation = () => {
    const layout = calculateTextLayout(text, settings);
    const total = layout.glyphs.length;
    if (total === 0) return;

    totalGlyphsRef.current = total;
    setIsPlayingAnim(true);
    setAnimProgress(0);

    let currentIdx = 0;
    let lastTime = performance.now();

    const intervalPerGlyph = 140 / animSpeed; // ms per character reveal

    const tick = (now: number) => {
      if (now - lastTime >= intervalPerGlyph) {
        currentIdx++;
        lastTime = now;
        setAnimProgress(Math.min(100, Math.round((currentIdx / total) * 100)));

        renderCanvas(currentIdx, currentIdx - 1);

        if (currentIdx >= total) {
          setIsPlayingAnim(false);
          renderCanvas(); // Final clear of cursor
          showToast('اكتمل العرض الحركي لكتابة الرموز الأسطورية! ✨', 'success');
          return;
        }
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  const stopAnimation = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsPlayingAnim(false);
    renderCanvas();
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        showToast('جاري فحص شفرة الصورة المسحوبة...', 'info');
        const meta = await extractPngMetadata(file);
        if (meta && meta.text) {
          onDropTextFile(meta.text);
          showToast('🎉 تم فك شفرة الصورة المسحوبة واستيراد النص بنجاح!', 'success');
          return;
        }
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          onDropTextFile(content);
          showToast(`تم استيراد الملف النصي بنجاح (${file.name})`, 'success');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      id="legendary-canvas-card"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative group rounded-2xl border transition-all duration-500 overflow-hidden backdrop-blur-2xl bg-zinc-950/75 shadow-2xl ${
        isDragOver
          ? 'border-amber-400 ring-4 ring-amber-500/30 scale-[1.008]'
          : 'border-white/10 hover:border-white/20'
      }`}
      style={{
        boxShadow: `0 20px 50px -10px ${theme.glow.replace('0.65', '0.15')}`,
      }}
    >
      {/* Top Header Bar with Viewer Controls */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="text-xs font-semibold tracking-wide text-zinc-300">
            لوحة العرض الرسومية الحية • Pure Canvas 2D
          </span>
          {isPlayingAnim && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
              عرض تدفقي جارٍ ({animProgress}%)
            </span>
          )}
        </div>

        {/* Quick Zoom & Actions */}
        <div className="flex items-center gap-1.5">
          <button
            id="tts-audio-btn"
            onClick={onSpeakTTS}
            title="نطق النص صوتياً (TTS)"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-300 hover:bg-white/10 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            id="quick-copy-img-btn"
            onClick={onCopyImage}
            title="نسخ الصورة للحافظة"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-300 hover:bg-white/10 transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            id="quick-export-png-btn"
            onClick={onQuickExport}
            title="تصدير PNG فوري"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-300 hover:bg-white/10 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Zoom controls */}
          <button
            id="zoom-out-btn"
            onClick={() => setZoomLevel((z) => Math.max(0.4, Number((z - 0.15).toFixed(2))))}
            title="تصغير"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono text-zinc-400 w-10 text-center select-none">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            id="zoom-in-btn"
            onClick={() => setZoomLevel((z) => Math.min(2.2, Number((z + 0.15).toFixed(2))))}
            title="تكبير"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            id="fullscreen-viewer-btn"
            onClick={onOpenFullscreen}
            title="وضع ملء الشاشة المعظم"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-white/10 transition-colors ml-1"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Scrollable Canvas Viewport */}
      <div
        ref={containerRef}
        dir="rtl"
        className="relative overflow-x-auto overflow-y-auto p-4 md:p-8 flex items-center justify-start min-h-[220px] max-h-[520px] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
        style={{
          direction: 'rtl',
        }}
      >
        {/* Drag & Drop Full Overlay Banner */}
        {isDragOver && (
          <div className="absolute inset-0 z-30 bg-amber-950/80 backdrop-blur-md flex flex-col items-center justify-center text-amber-200 border-2 border-dashed border-amber-400 m-4 rounded-xl">
            <Sparkles className="w-10 h-10 mb-2 animate-bounce" />
            <p className="font-bold text-lg">أفلت الملف النصي (.txt) هنا لتحويله فورياً</p>
            <p className="text-xs text-amber-300/80">سيتم استخراج النصوص العربية ورسمها هندسياً</p>
          </div>
        )}

        {/* Scaled Canvas Container with margin-auto to center when small but stick to right when overflowing */}
        <div
          className="m-auto w-fit shrink-0 flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center right',
          }}
        >
          <canvas
            ref={canvasRef}
            id="legendary-main-canvas"
            className="rounded-lg shadow-2xl transition-all duration-300 block"
          />
        </div>
      </div>

      {/* Bottom Animation Control Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 border-t border-white/10 bg-white/[0.015] gap-3">
        {/* Animation Play/Pause & Speed */}
        <div className="flex items-center gap-2">
          {!isPlayingAnim ? (
            <button
              id="start-reveal-anim-btn"
              onClick={startAnimation}
              disabled={!text.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>تشغيل حركة كتابة الرموز</span>
            </button>
          ) : (
            <button
              id="stop-reveal-anim-btn"
              onClick={stopAnimation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 active:scale-95 transition-all"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>إيقاف مؤقت</span>
            </button>
          )}

          {/* Speed selector */}
          <div className="flex items-center rounded-lg bg-black/40 border border-white/10 p-0.5 text-[11px] font-mono">
            {[0.5, 1.0, 2.0, 4.0].map((spd) => (
              <button
                key={spd}
                onClick={() => setAnimSpeed(spd)}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  animSpeed === spd
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Decorative corner indicator */}
        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          <span className="font-mono text-zinc-500">
            {text.length} حرف • {text.trim() ? text.trim().split(/\s+/).length : 0} كلمة
          </span>
          <span className="text-amber-400/80">✦</span>
        </div>
      </div>
    </div>
  );
};
