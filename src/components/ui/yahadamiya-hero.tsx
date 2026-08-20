"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowLeft, ShieldCheck, Cpu, Image as ImageIcon } from "lucide-react";
import { YahadamiyaEmblem } from "../YahadamiyaEmblem";
import { RadialOrbitalTimeline } from "./radial-orbital-timeline";
import logoImg from "@/assets/logo.png";

interface YahadamiyaHeroProps {
  onStart: () => void;
  onOpenAuth: () => void;
  onOpenMap?: () => void;
  onOpenScanner?: () => void;
  onOpenDirectWriter?: () => void;
  onScrollToCreators?: () => void;
  isAuthenticated?: boolean;
  userEmail?: string | null;
  onLogout?: () => void;
}

function InteractiveDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let mouseX = -1000;
    let mouseY = -1000;

    // بارامترات الشبكة الدقيقة والمتقاربة
    const SPACING = 18; // مسافة ضيقة جداً بين كل نقطة وأخرى
    const BASE_R = 0.9; // نقاط ميكرو صغيرة جداً ومريحة للعين
    const HOVER_R = 110; // نطاق تأثير الماوس
    const DEFAULT_COLOR = "rgba(201, 168, 76, 0.12)"; // لون ذهبي هادئ وشفاف جداً في وضع الراحة
    const ACTIVE_COLOR = "#e8c55a"; // لون التوهج الذهبي عند مرور الماوس

    // ضبط أبعاد الكانفاس بدقة البكسل الحقيقية لمنع أي تمطط بيضاوي
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      for (let x = SPACING / 2; x < rect.width; x += SPACING) {
        for (let y = SPACING / 2; y < rect.height; y += SPACING) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          ctx.beginPath();
          if (dist < HOVER_R) {
            const scale = 1 - dist / HOVER_R;
            ctx.fillStyle = ACTIVE_COLOR;
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(232, 197, 90, 0.5)";
            // تكبير ناعم ودائري تماماً
            ctx.arc(x, y, BASE_R + scale * 1.8, 0, Math.PI * 2);
          } else {
            ctx.fillStyle = DEFAULT_COLOR;
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
            // نقطة دائرية ناصعة وثابتة
            ctx.arc(x, y, BASE_R, 0, Math.PI * 2);
          }
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    handleResize();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* هالات الإضاءة الناعمة الخلفية */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#c9a84c]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-[#e8c55a]/8 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
}

export function YahadamiyaHero({
  onStart,
  onOpenAuth,
  onOpenMap,
  onOpenScanner,
  onOpenDirectWriter,
  onScrollToCreators,
  isAuthenticated,
  userEmail,
  onLogout,
}: YahadamiyaHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {
        // Autoplay policy fallback
      });
    };

    video.addEventListener('canplay', playVideo);
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    });

    playVideo();

    return () => {
      video.removeEventListener('canplay', playVideo);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#07070d] text-slate-100 font-sans" dir="rtl">
      {/* خلفية النقاط التفاعلية */}
      <InteractiveDotGrid />

      {/* المحتوى المركزي للـ Hero مع هامش علوي للشريط الثابت */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pt-28 sm:pt-32 pb-12 max-w-5xl mx-auto">
        {/* الشعار المركزي الفاخر في قلب الهيرو */}
        <div className="relative mx-auto mb-6 flex items-center justify-center">
          {/* هالة إضاءة خلفية ناعمة ومركزة */}
          <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[#c9a84c]/20 blur-[60px] pointer-events-none" />

          {/* صورة الشعار الرسمي بدقة فائقة */}
          <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full p-1 border-2 border-[#c9a84c]/60 bg-[#07070d]/90 backdrop-blur-md shadow-[0_0_40px_rgba(201,168,76,0.4)] transition-transform duration-500 hover:scale-105 flex items-center justify-center overflow-hidden">
            <img
              src={logoImg}
              alt="شَفْرَة اليحآدمية"
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'block';
              }}
            />
          </div>
        </div>

        {/* شارة علوية نابضة */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#e8c55a] text-xs sm:text-sm font-medium mb-6 animate-pulse">
          <Sparkles className="size-4" />
          <span>منظومة الرموز الهندسية الأولى من نوعها</span>
          <Sparkles className="size-4" />
        </div>

        {/* العنوان الرئيسي الضخم */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-tight">
          <span className="text-white drop-shadow">شَفْرَة</span>{" "}
          <span className="bg-gradient-to-r from-[#e8c55a] via-[#c9a84c] to-[#ffe58f] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(201,168,76,0.35)]">
            اليحآدمية
          </span>
        </h1>

        {/* الوصف التعريفي */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          حوّل كلماتك ونصوصك العربية في الوقت الفعلي إلى نقوش هندسية أسطورية مستوحاة من لغة مشفرة مبتكرة، مع محرك رسم فائق الدقة، وفاحص صور ذكي، وخيارات تصدير ملكية.
        </p>

        {/* زر بدء العمل الرئيسي (CTA Button) */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onStart}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8c55a] text-black font-extrabold text-base sm:text-lg flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(201,168,76,0.4)] hover:shadow-[0_0_40px_rgba(201,168,76,0.6)] cursor-pointer"
          >
            <span>🚀 ابدأ فك الشفرة الآن</span>
            <ArrowLeft className="size-5" />
          </button>
        </div>

        {/* بطاقات المميزات السريعة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-16 text-right">
          <div className="p-5 rounded-2xl bg-black/40 border border-[#c9a84c]/20 backdrop-blur-md hover:border-[#c9a84c]/50 transition-all">
            <div className="p-2.5 rounded-xl bg-[#c9a84c]/10 text-[#e8c55a] w-fit mb-3">
              <Cpu className="size-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-1">رسم حي ومباشر (Canvas 2D)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">تحويل فوري لكل حرف عربي إلى رمزه الهندسي الدقيق مع تحكم كامل بالسمات والألوان.</p>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-[#c9a84c]/20 backdrop-blur-md hover:border-[#c9a84c]/50 transition-all">
            <div className="p-2.5 rounded-xl bg-[#c9a84c]/10 text-[#e8c55a] w-fit mb-3">
              <ImageIcon className="size-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-1">فاحص وقارئ الصور</h3>
            <p className="text-xs text-slate-400 leading-relaxed">فك شفرة أي صورة مرفوعة أو ملصوقة عبر الحافظة (Ctrl+V) وقراءة النص العربي الأصلي.</p>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-[#c9a84c]/20 backdrop-blur-md hover:border-[#c9a84c]/50 transition-all">
            <div className="p-2.5 rounded-xl bg-[#c9a84c]/10 text-[#e8c55a] w-fit mb-3">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-1">تصدير بدقة فائقة 4x</h3>
            <p className="text-xs text-slate-400 leading-relaxed">تصدير لوحاتك بدقة 4K و SVG مع إمكانية المشاركة الفورية عبر واتساب وماسنجر.</p>
          </div>
        </div>

        {/* المخطط المداري التفاعلي لمسار الشفرة */}
        <div className="w-full mt-10">
          <RadialOrbitalTimeline />
        </div>
      </main>

      {/* شريط الإسناد في أسفل الصفحة */}
      <footer className="relative z-20 text-center py-4 border-t border-[#c9a84c]/10 text-xs text-slate-500">
        شَفْرَة اليحآدمية ✦ ابتكار وتطوير: <span className="text-[#e8c55a]">آدم عبد الجواد & يحيى الشابي</span>
      </footer>
    </div>
  );
}
