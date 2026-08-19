import React, { useState, useEffect } from 'react';
import { YahadamiyaEmblem } from './YahadamiyaEmblem';

interface YahadamiyaIntroLoaderProps {
  onComplete?: () => void;
}

export const YahadamiyaIntroLoader: React.FC<YahadamiyaIntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(true);

  useEffect(() => {
    // Start progress bar animation to 100%
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 50);

    // Fade out after 4.5 seconds (4500ms)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 4500);

    // Unmount after fade-out transition finishes (4500ms + 800ms = 5300ms)
    const unmountTimer = setTimeout(() => {
      setIsMounted(false);
      if (onComplete) onComplete();
    }, 5300);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07070d] text-zinc-100 overflow-hidden select-none transition-opacity duration-800 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Deep Ambient Glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#d4af37]/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        {/* Large Crisp Cinematic Logo */}
        <div className="relative mx-auto mb-6 w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 flex items-center justify-center">
          <div className="relative w-full h-full rounded-full p-1.5 border-2 border-[#c9a84c]/60 bg-[#07070d]/90 backdrop-blur-md shadow-[0_0_50px_rgba(201,168,76,0.45)] animate-pulse flex items-center justify-center overflow-hidden">
            <img
              src="/logo.png"
              alt="شَفْرَة اليحآدمية"
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'block';
              }}
            />
          </div>
        </div>

        {/* Title and Cinematic Loading Text */}
        <div className="space-y-2.5">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-3">
            <span>شَفْرَة</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 font-serif">
              اليحآدمية
            </span>
          </h2>

          <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-amber-300/85 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="tracking-wide animate-pulse">
              جاري فك شَفْرَة اليحآدمية وتهيئة محرك الرموز...
            </span>
          </div>

          <p className="text-xs text-zinc-500 max-w-xs leading-relaxed pt-1">
            تحميل محرك الرموز الهندسية التفاعلي بدقة عالية
          </p>
        </div>

        {/* Elegant Thin Golden Progress Bar that fills smoothly over 4.5 seconds */}
        <div className="w-56 sm:w-72 h-1 bg-white/10 rounded-full mt-7 overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 transition-all duration-[4500ms] ease-out rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
