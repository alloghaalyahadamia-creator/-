"use client";

import React, { useState } from "react";
import { Sparkles, Compass, Layers, Cpu, Scan, UserCheck, ChevronLeft } from "lucide-react";
import { YahadamiyaEmblem } from "../YahadamiyaEmblem";
import logoImg from "@/assets/logo.png";

interface TimelineNode {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  creatorTag?: string;
}

const TIMELINE_DATA: TimelineNode[] = [
  {
    id: 1,
    title: "تأسيس لغة اليحآدمية",
    category: "المرحلة الأولى",
    description: "ولادة فكرة اللغة وتأصيل قواعدها الشفرية المشتركة برؤية هندسية فريدة بين المبتكرَين.",
    icon: <Compass className="size-5" />,
    creatorTag: "ابتكار: آدم عبد الجواد & يحيى الشابي",
  },
  {
    id: 2,
    title: "هندسة القاموس والرموز",
    category: "المرحلة الثانية",
    description: "تصميم أكثر من 30 رمزاً هندسياً يدوياً (المسننات، المربعات المقسومة، الزوايا القائمة، والأعمدة).",
    icon: <Layers className="size-5" />,
    creatorTag: "تصميم الرموز: آدم & يحيى",
  },
  {
    id: 3,
    title: "بناء محرك Canvas 2D",
    category: "المرحلة الثالثة",
    description: "برمجة المنظومة الرسومية بالكامل من الصفر بدقة 4K وخيارات التصدير والسمات اللونية الخمس.",
    icon: <Cpu className="size-5" />,
    creatorTag: "تطوير وبرمجة: آدم عبد الجواد",
  },
  {
    id: 4,
    title: "فاحص ومترجم الصور",
    category: "المرحلة الرابعة",
    description: "ابتكار فاحص الميتاداتا وفك شفرات الصور المرفوعة والملصوقة فوراً عبر الذاكرة (Ctrl+V).",
    icon: <Scan className="size-5" />,
    creatorTag: "تقنية الشفرة: آدم عبد الجواد",
  },
  {
    id: 5,
    title: "منظومة المصادقة والمستقبل",
    category: "المرحلة الخامسة",
    description: "إطلاق واجهة الدخول والأمان الفخمة وفتح آفاق الترجمة المتبادلة لكافة المستخدمين.",
    icon: <UserCheck className="size-5" />,
    creatorTag: "منظومة شَفْرَة اليحآدمية",
  },
];

export function RadialOrbitalTimeline() {
  const [activeNode, setActiveNode] = useState<TimelineNode>(TIMELINE_DATA[0]);
  const [logoError, setLogoError] = useState(false);

  return (
    <section className="relative w-full py-20 px-4 flex flex-col items-center justify-center overflow-hidden bg-[#07070d]" dir="rtl">
      {/* هالة خلفية ناعمة */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#c9a84c]/10 blur-[150px] pointer-events-none" />

      {/* عنوان القسم */}
      <div className="text-center z-10 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#e8c55a] text-xs font-semibold mb-3">
          <Sparkles className="size-3.5" />
          <span>المسار المداري للشفرة</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          خريطة ابتكار <span className="text-[#e8c55a] drop-shadow-[0_0_20px_rgba(201,168,76,0.4)]">شَفْرَة اليحآدمية</span>
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mt-2">
          انقر على المحطات المدارية لاستكشاف مراحل تأسيس اللغة وبناء محركها البرمجي
        </p>
      </div>

      {/* منطقة المدار المركزي */}
      <div className="relative w-full max-w-4xl min-h-[500px] flex flex-col lg:flex-row items-center justify-center gap-10 z-10">
        
        {/* المدار الفلكي الدائري (Orbital Visualizer) */}
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center shrink-0">
          
          {/* الحلقات المدارية الدوارة */}
          <div className="absolute inset-0 rounded-full border border-[#c9a84c]/20 border-dashed animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-8 rounded-full border border-[#c9a84c]/30" />
          <div className="absolute inset-16 rounded-full border border-[#c9a84c]/15 border-dotted" />

          {/* النواة المركزية (الشعار) */}
          <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 border-2 border-[#c9a84c] bg-[#0a0a14] shadow-[0_0_30px_rgba(201,168,76,0.35)] flex items-center justify-center overflow-hidden">
            {!logoError ? (
              <img
                src={logoImg}
                alt="شَفْرَة اليحآدمية"
                className="w-full h-full rounded-full object-cover"
                onError={() => setLogoError(true)}
              />
            ) : (
              <YahadamiyaEmblem size={90} animated={true} />
            )}
          </div>

          {/* النقاط/المحطات المدارية موزعة حول الدائرة */}
          {TIMELINE_DATA.map((node, index) => {
            const total = TIMELINE_DATA.length;
            const angle = (index * (360 / total) - 90) * (Math.PI / 180);
            const radius = 145; // نصف قطر المدار
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isSelected = activeNode.id === node.id;

            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node)}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={`absolute z-20 size-12 sm:size-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#c9a84c] text-black scale-125 shadow-[0_0_25px_rgba(232,197,90,0.8)] ring-4 ring-[#e8c55a]/40"
                    : "bg-[#0a0a14] text-[#e8c55a] border border-[#c9a84c]/40 hover:scale-110 hover:border-[#c9a84c] shadow-[0_0_10px_rgba(0,0,0,0.8)]"
                }`}
                aria-label={node.title}
              >
                {node.icon}
              </button>
            );
          })}
        </div>

        {/* بطاقة تفاصيل المحطة المحددة (Node Details Card) */}
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0a0a14]/90 border border-[#c9a84c]/30 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] text-right transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#c9a84c]/20 text-[#e8c55a] border border-[#c9a84c]/40">
              {activeNode.category}
            </span>
            <div className="size-10 rounded-2xl bg-[#c9a84c]/10 text-[#e8c55a] flex items-center justify-center border border-[#c9a84c]/20">
              {activeNode.icon}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">{activeNode.title}</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {activeNode.description}
          </p>

          {activeNode.creatorTag && (
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#e8c55a] font-medium">
              <span>{activeNode.creatorTag}</span>
              <ChevronLeft className="size-4 opacity-70" />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
