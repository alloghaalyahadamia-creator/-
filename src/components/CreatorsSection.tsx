import React from 'react';
import { Sparkles, Crown, Star } from 'lucide-react';
import adamImg from '@/assets/adam.png';
import yahiaImg from '@/assets/yahia.png';

export const CreatorsSection: React.FC = () => {
  return (
    <section
      id="creators-section"
      className="relative rounded-3xl bg-zinc-950/70 border border-[#c9a84c]/25 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-[#c9a84c]/40"
    >
      {/* Decorative Subtle Background Golden Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#c9a84c]/10 blur-3xl rounded-full" />

      {/* Section Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
          <span>✨</span>
          <span>فريق التأسيس والابتكار</span>
          <span>✨</span>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-400 tracking-tight flex items-center justify-center gap-2">
          <span>🏛️</span>
          <span>مبتكرو اللغة اليحآدمية وصانع التطبيق</span>
          <span>🏛️</span>
        </h2>
      </div>

      {/* Creators Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* 1. Adam Abdelgawad Card */}
        <div
          id="creator-adam-card"
          className="group relative flex flex-col sm:flex-row items-center sm:items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(201,168,76,0.15)] text-center sm:text-right"
        >
          {/* Portrait Image */}
          <div className="relative shrink-0">
            <div className="relative">
              <img
                src={adamImg}
                alt="آدم عبد الجواد"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-[#c9a84c]/60 shadow-[0_0_25px_rgba(201,168,76,0.35)] group-hover:border-[#e5c158] transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'block';
                }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-amber-500 text-zinc-950 shadow-md">
              <Crown className="w-4 h-4 fill-current" />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 flex-1">
            <h3 className="text-lg sm:text-xl font-black text-zinc-100 group-hover:text-amber-300 transition-colors">
              آدم عبد الجواد
            </h3>

            <p className="text-xs sm:text-sm font-bold text-amber-400 leading-snug">
              👑 صانع ومطور التطبيق المنفرد &amp; شريك ابتكار اللغة
            </p>

            <p className="text-xs text-zinc-300 leading-relaxed">
              المطور والمهندس البرمجي الوحيد الذي بنى هذا التطبيق بالكامل من الصفر، والشريك الأساسي في اختراع وتأسيس رموز وقواعد اللغة اليحآدمية.
            </p>
          </div>
        </div>

        {/* 2. Yahia Elshabi Card */}
        <div
          id="creator-yahia-card"
          className="group relative flex flex-col sm:flex-row items-center sm:items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(201,168,76,0.15)] text-center sm:text-right"
        >
          {/* Portrait Image */}
          <div className="relative shrink-0">
            <div className="relative">
              <img
                src={yahiaImg}
                alt="يحيى الشابي"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-[#c9a84c]/60 shadow-[0_0_25px_rgba(201,168,76,0.35)] group-hover:border-[#e5c158] transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'block';
                }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-yellow-500 text-zinc-950 shadow-md">
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 flex-1">
            <h3 className="text-lg sm:text-xl font-black text-zinc-100 group-hover:text-amber-300 transition-colors">
              يحيى الشابي
            </h3>

            <p className="text-xs sm:text-sm font-bold text-amber-400 leading-snug">
              🌟 شريك تأسيس وابتكار اللغة اليحآدمية
            </p>

            <p className="text-xs text-zinc-300 leading-relaxed">
              المؤسس والمبتكر المشارك في ابتكار وتصميم كل رمز وقاعدة في شفرة اللغة اليحآدمية جنباً إلى جنب مع آدم.
            </p>
          </div>
        </div>
      </div>

      {/* Common Joint Ribbon Banner */}
      <div className="relative z-10 mt-6 pt-5 border-t border-[#c9a84c]/20">
        <div className="flex flex-col items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-amber-500/10 border border-amber-400/30 text-center shadow-inner">
          <p className="text-xs sm:text-sm md:text-base font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300">
            ✦ جميع رموز وقواعد اللغة اليحآدمية من ابتكار المتميّزَين: آدم عبد الجواد &amp; يحيى الشابي ✦
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm font-bold text-amber-300/90 tracking-wide">
            ✦ وبناء وبرمجة هذا التطبيق بواسطة الأسطورة: آدم عبد الجواد ✦
          </p>
        </div>
      </div>
    </section>
  );
};
