import React, { useEffect, useRef, useState } from 'react';
import { EngineSettings, ThemeConfig } from '../types';
import { renderFullCanvas } from '../engine/canvasRenderer';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Copy, Sparkles } from 'lucide-react';

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  settings: EngineSettings;
  theme: ThemeConfig;
  onExportHD: () => void;
  onCopyImage: () => void;
}

export const FullscreenModal: React.FC<FullscreenModalProps> = ({
  isOpen,
  onClose,
  text,
  settings,
  theme,
  onExportHD,
  onCopyImage,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [zoom, setZoom] = useState<number>(1.2);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    renderFullCanvas(ctx, text, settings, theme);
  }, [isOpen, text, settings, theme]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-950/80">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b]" />
          <h2 className="text-sm font-bold text-zinc-100">
            المعاينة السينمائية المعظمة • Fullscreen Legendary Viewer
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center rounded-xl bg-zinc-900 border border-white/10 p-1">
            <button
              onClick={() => setZoom((z) => Math.max(0.4, Number((z - 0.2).toFixed(2))))}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-zinc-300 w-12 text-center select-none">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(3.0, Number((z + 0.2).toFixed(2))))}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1.0)}
              title="إعادة ضبط 100%"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors border-r border-white/10 mr-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onCopyImage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-zinc-200 transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>نسخ الصورة</span>
          </button>

          <button
            onClick={onExportHD}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-colors shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>تصدير 4K Ultra HD</span>
          </button>

          <div className="h-6 w-px bg-white/10 mx-1" />

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div
        dir="rtl"
        className="flex-1 overflow-auto p-6 md:p-12 flex items-center justify-start scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
        style={{ direction: 'rtl' }}
      >
        <div
          className="m-auto w-fit shrink-0 flex items-center justify-center transition-transform duration-200 ease-out"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center right' }}
        >
          <canvas
            ref={canvasRef}
            className="rounded-2xl shadow-2xl border border-white/10 block"
          />
        </div>
      </div>
    </div>
  );
};
