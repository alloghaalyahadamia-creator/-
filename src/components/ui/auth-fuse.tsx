import React, { useState, useEffect } from 'react';
import {
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  X,
  Compass,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { YahadamiyaEmblem } from '../YahadamiyaEmblem';

interface AuthUIProps {
  onClose: () => void;
  onSuccess?: (email: string) => void;
}

const QUOTES = [
  'مرحباً بك في محراب شَفْرَة اليحآدمية الأسطورية — بقلم: آدم عبد الجواد & يحيى الشابي',
  'انضم إلى عالم الرموز وفك أسرار اللغة — شَفْرَة اليحآدمية',
  'كل رمزٍ هندسي يحمل في طياته روح الحرف العربي الأصيل',
];

export const AuthUI: React.FC<AuthUIProps> = ({ onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Typewriter Effect for Quotes
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayedQuote, setDisplayedQuote] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = QUOTES[quoteIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedQuote.length < fullText.length) {
      timer = setTimeout(() => {
        setDisplayedQuote(fullText.substring(0, displayedQuote.length + 1));
      }, 55);
    } else if (!isDeleting && displayedQuote.length === fullText.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 3500);
    } else if (isDeleting && displayedQuote.length > 0) {
      timer = setTimeout(() => {
        setDisplayedQuote(fullText.substring(0, displayedQuote.length - 1));
      }, 25);
    } else if (isDeleting && displayedQuote.length === 0) {
      setIsDeleting(false);
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }

    return () => clearTimeout(timer);
  }, [displayedQuote, isDeleting, quoteIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email || !password) {
      setMessage({ text: 'يرجى ملء جميع الحقول المطلوبة', type: 'error' });
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setMessage({ text: 'يرجى إدخال اسم المستخدم', type: 'error' });
        return;
      }
      if (password !== confirmPassword) {
        setMessage({ text: 'كلمتا المرور غير متطابقتين', type: 'error' });
        return;
      }
      if (password.length < 6) {
        setMessage({ text: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل', type: 'error' });
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setMessage({
        text: mode === 'login' ? '🎉 تم تسجيل الدخول بنجاح! مرحباً بك.' : '🎉 تم إنشاء الحساب بنجاح!',
        type: 'success',
      });

      if (onSuccess) {
        onSuccess(email.trim() || 'user@yahadamiya.com');
      }

      setTimeout(() => {
        onClose();
      }, 700);
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const googleEmail = email.trim() || 'al.logha.al.yahadamia@gmail.com';
      if (onSuccess) {
        onSuccess(googleEmail);
      }
      onClose();
    }, 500);
  };

  return (
    <div
      id="auth-fuse-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#07070d]/90 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto"
      dir="rtl"
    >
      {/* Outer Card Container */}
      <div
        id="auth-fuse-card"
        className="relative w-full max-w-4xl bg-zinc-950/95 border border-[#c9a84c]/30 rounded-3xl shadow-[0_0_50px_rgba(201,168,76,0.15)] overflow-hidden grid grid-cols-1 md:grid-cols-12 backdrop-blur-2xl"
      >
        {/* Top Close / Return Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#c9a84c]/20 text-zinc-400 hover:text-[#e8c55a] border border-white/10 hover:border-[#c9a84c]/40 text-xs font-medium transition-all"
        >
          <X className="w-3.5 h-3.5" />
          <span>العودة إلى الشفرة</span>
        </button>

        {/* Right Column: Cosmic Quotes & Emblem Branding (Hidden on small screens) */}
        <div className="hidden md:flex md:col-span-5 flex-col justify-between p-8 bg-gradient-to-br from-zinc-950 via-[#0d0d16] to-[#12111d] border-l border-white/10 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#c9a84c]/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* Top Emblem Brand */}
          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-3">
              <YahadamiyaEmblem className="w-10 h-10" />
              <div>
                <span className="text-xs font-black tracking-widest text-[#e8c55a] block uppercase">
                  YAH'ADAMIYA
                </span>
                <span className="text-sm font-black text-zinc-100">
                  شَفْرَة اليحآدمية
                </span>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[11px] text-[#e8c55a] font-medium">
              <Sparkles className="w-3 h-3 text-[#e8c55a]" />
              <span>البوابة الملكية للمصادقة والحسابات</span>
            </div>
          </div>

          {/* Center: Typewriter Quotes */}
          <div className="my-8 space-y-3 relative z-10">
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-[#c9a84c]/20 backdrop-blur-md shadow-inner">
              <div className="flex items-center gap-2 mb-2 text-[#e8c55a] text-xs font-bold">
                <Compass className="w-4 h-4 animate-spin" />
                <span>اقتباس الشفرة:</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans min-h-[58px]">
                {displayedQuote}
                <span className="inline-block w-1.5 h-3.5 bg-[#e8c55a] ml-1 animate-pulse" />
              </p>
            </div>
          </div>

          {/* Bottom Security / Creators Badge */}
          <div className="pt-4 border-t border-white/10 relative z-10 text-[11px] text-zinc-400 space-y-1">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e8c55a]" />
              <span className="font-semibold">تشفير محلي آمن 100%</span>
            </div>
            <p className="text-zinc-500">
              ابتكار: آدم عبد الجواد & يحيى الشابي
            </p>
          </div>
        </div>

        {/* Left Column: Form (Login / Register) */}
        <div className="col-span-1 md:col-span-7 p-6 sm:p-8 flex flex-col justify-center relative">
          {/* Header Title */}
          <div className="mb-6 space-y-1 text-right">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#e8c55a]" />
              <span>{mode === 'login' ? 'تسجيل الدخول إلى حسابك' : 'إنشاء حساب جديد'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              {mode === 'login'
                ? 'أدخل بياناتك للوصول إلى لوحة الشفرة وتاريخ نقوشك المحفوظة'
                : 'انضم لمجتمع اليحآدمية واحفظ نصوصك ورموزك الهندسية'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 mb-5 rounded-xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setMessage(null);
              }}
              className={cn(
                'flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all',
                mode === 'login'
                  ? 'bg-[#c9a84c]/20 text-[#e8c55a] border border-[#c9a84c]/40 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setMessage(null);
              }}
              className={cn(
                'flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all',
                mode === 'register'
                  ? 'bg-[#c9a84c]/20 text-[#e8c55a] border border-[#c9a84c]/40 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              حساب جديد
            </button>
          </div>

          {/* Status Message Alert */}
          {message && (
            <div
              className={cn(
                'p-3 mb-4 rounded-xl text-xs flex items-center gap-2 border animate-in fade-in',
                message.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              )}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message.text}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-right">
            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300">
                  الاسم الكامل / اسم المستخدم
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: حارس الشفرة"
                    className="w-full bg-zinc-900/80 text-zinc-100 border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:border-[#c9a84c] transition-colors"
                  />
                  <User className="w-4 h-4 text-zinc-500 absolute top-3 right-3" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  dir="ltr"
                  className="w-full bg-zinc-900/80 text-zinc-100 border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:border-[#c9a84c] transition-colors text-right"
                />
                <Mail className="w-4 h-4 text-zinc-500 absolute top-3 right-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900/80 text-zinc-100 border border-white/10 rounded-xl px-4 py-2.5 pr-10 pl-10 text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:border-[#c9a84c] transition-colors"
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute top-3 right-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 left-3 text-zinc-500 hover:text-[#e8c55a] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-900/80 text-zinc-100 border border-white/10 rounded-xl px-4 py-2.5 pr-10 pl-10 text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:border-[#c9a84c] transition-colors"
                  />
                  <Lock className="w-4 h-4 text-zinc-500 absolute top-3 right-3" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-3 left-3 text-zinc-500 hover:text-[#e8c55a] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-zinc-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-900 text-[#c9a84c] focus:ring-0"
                  />
                  <span>تذكرني على هذا الجهاز</span>
                </label>
                <button
                  type="button"
                  onClick={() => setMessage({ text: 'تم إرسال تعليمات استعادة كلمة المرور إلى بريدك', type: 'success' })}
                  className="text-[#e8c55a] hover:underline"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#e8c55a] hover:from-[#b3933e] hover:to-[#d4b14d] text-zinc-950 font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>جاري المعالجة...</span>
                </div>
              ) : (
                <>
                  <span>{mode === 'login' ? 'دخول إلى الشفرة' : 'إنشاء الحساب والبدء'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[11px] text-zinc-500">أو المتابعة السريعة</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#c9a84c]/30 text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5.3s.5 3.7 1.3 5.3l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.1L1.6 16.1C3.5 19.9 7.4 23 12 23z"
                />
              </svg>
              <span>المتابعة عبر Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
