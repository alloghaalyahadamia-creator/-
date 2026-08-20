import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  CanvasBgType,
  EngineSettings,
  HistoryItem,
  ThemePresetId,
} from './types';
import { resolveTheme } from './data/themes';
import { getRuneEncodedText } from './engine/glyphDictionary';
import {
  exportHDCanvasPNG,
  generateFullSVG,
  calculateTextLayout,
} from './engine/canvasRenderer';

import { ParticleBackground } from './components/ParticleBackground';
import { CanvasViewer } from './components/CanvasViewer';
import { ControlsToolbar } from './components/ControlsToolbar';
import { SettingsModal } from './components/SettingsModal';
import { GlyphReferenceModal } from './components/GlyphReferenceModal';
import { StatsModal } from './components/StatsModal';
import { HistoryModal } from './components/HistoryModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { FullscreenModal } from './components/FullscreenModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { YahadamiyaEmblem } from './components/YahadamiyaEmblem';
import { YahadamiyaIntroLoader } from './components/YahadamiyaIntroLoader';
import { CreatorsSection } from './components/CreatorsSection';
import { ImageScannerDecoder } from './components/ImageScannerDecoder';
import { DirectYahadamiyaWriter } from './components/DirectYahadamiyaWriter';
import { AuthUI } from './components/ui/auth-fuse';
import { YahadamiyaHero } from './components/ui/yahadamiya-hero';
import logoImg from '@/assets/logo.png';

import {
  Sparkles,
  Feather,
  Wand2,
  Share2,
  Copy,
  Info,
  Camera,
  Keyboard,
} from 'lucide-react';

const DEFAULT_SETTINGS: EngineSettings = {
  lineWidth: 2.5,
  glowIntensity: 8,
  shadowStyle: 'soft',
  letterSpacing: 6,
  glyphScale: 1.0,
  lineHeight: 1.4,
  isMirrorMode: false,
  textAlign: 'right',
  isVerticalMode: false,
  canvasBg: 'dark',
  showWatermark: true,
  customColor: '#f59e0b',
};

const SAMPLE_PHRASES = [
  'شَفْرَة اليحآدمية',
  'أنا الذي نظر الأعمى إلى أدبي',
  'سلام على من اتبع الهدى',
  'في سكون الليل تشرق الرموز',
  'الحكمة نور القلوب وسر البيان',
  'العلم صيد والكتابة قيده',
];

export default function App() {
  // App Initial Cinematic Loader State
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Primary Text State
  const [text, setText] = useState<string>('شَفْرَة اليحآدمية رمز الخط الهندسي الأسطوري');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Undo / Redo stacks
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  // Theme & Settings
  const [themeId, setThemeId] = useState<ThemePresetId>('gold');
  const [settings, setSettings] = useState<EngineSettings>(DEFAULT_SETTINGS);

  // Resolved Theme Object
  const currentTheme = useMemo(() => {
    return resolveTheme(themeId, settings.customColor);
  }, [themeId, settings.customColor]);

  // History List
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('yahadamiya-cipher-save') || localStorage.getItem('ostoory_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGlyphMapOpen, setIsGlyphMapOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Mandatory Authentication & Flow Control
  const [view, setView] = useState<'hero' | 'workspace'>('hero');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('yahadamiya_auth') === 'true';
      const savedEmail = localStorage.getItem('yahadamiya_user_email');
      if (savedAuth) {
        setIsAuthenticated(true);
        setUserEmail(savedEmail);
      }
    } catch {
      // Ignore local storage errors in private mode
    }
  }, []);

  const handleStart = () => {
    if (!isAuthenticated) {
      // إجبار المستخدم على تسجيل الدخول أولاً
      setShowAuthModal(true);
      showToast('يرجى تسجيل الدخول أو إنشاء حساب للوصول إلى محرك الشفرة 🔒', 'info');
    } else {
      // مسجل مسبقاً -> الانتقال مباشرة لمساحة العمل
      setView('workspace');
    }
  };

  const handleAuthSuccess = (email: string = 'user@yahadamiya.com') => {
    setIsAuthenticated(true);
    setUserEmail(email);
    try {
      localStorage.setItem('yahadamiya_auth', 'true');
      localStorage.setItem('yahadamiya_user_email', email);
    } catch {}
    setShowAuthModal(false);
    showToast('تم تسجيل الدخول بنجاح! مرحباً بك في شَفْرَة اليحآدمية ✨', 'success');
    // الانتقال الفوري لمساحة العمل
    setView('workspace');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    try {
      localStorage.removeItem('yahadamiya_auth');
      localStorage.removeItem('yahadamiya_user_email');
    } catch {}
    setView('hero');
    showToast('تم تسجيل الخروج بنجاح.', 'info');
  };

  // Active workspace mode: translate (canvas) | scanner | direct_writer
  const [activeMode, setActiveMode] = useState<'translate' | 'scanner' | 'direct_writer'>('translate');

  // State for Direct Yah'adamiya Pure Text
  const [directYahText, setDirectYahText] = useState<string>('⮁ Ш≡ 𝐼 b • 5 ▯ ▢');

  // Textarea Ref for cursor insertion
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Text Change Handler with Undo Tracking
  const handleTextChange = (newText: string) => {
    // Security: Limit input length to prevent Canvas memory exhaustion (DoS)
    const sanitizedText = newText.substring(0, 5000);
    
    setUndoStack((prev) => [...prev.slice(-49), text]);
    setRedoStack([]);
    setText(sanitizedText);

    setIsTyping(true);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 700);
  };

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, prev.length - 1));
    setRedoStack((prev) => [...prev, text]);
    setText(previous);
    showToast('تم التراجع عن التعديل', 'info');
  }, [undoStack, text, showToast]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, prev.length - 1));
    setUndoStack((prev) => [...prev, text]);
    setText(next);
    showToast('تمت استعادة التعديل', 'info');
  }, [redoStack, text, showToast]);

  const handleClear = useCallback(() => {
    if (!text) return;
    handleTextChange('');
    showToast('تم مسح النص بالكامل', 'info');
  }, [text]);

  // Insert character from Reference map directly into textarea at cursor
  const handleInsertChar = (char: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      handleTextChange(text + char);
      return;
    }

    const start = textarea.selectionStart || text.length;
    const end = textarea.selectionEnd || text.length;
    const updated = text.substring(0, start) + char + text.substring(end);
    handleTextChange(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + char.length, start + char.length);
    }, 50);

    showToast(`تم إدراج الرمز (${char})`, 'success');
  };

  // Debounced auto-save in History and localStorage
  useEffect(() => {
    if (!text.trim()) return;

    const timer = setTimeout(() => {
      setHistory((prev) => {
        const existingIdx = prev.findIndex((h) => h.text.trim() === text.trim());
        let updated: HistoryItem[];

        if (existingIdx !== -1) {
          const item = { ...prev[existingIdx], timestamp: Date.now() };
          updated = [item, ...prev.filter((_, idx) => idx !== existingIdx)];
        } else {
          const newItem: HistoryItem = {
            id: Math.random().toString(36).substring(2, 9),
            text,
            timestamp: Date.now(),
            previewSummary: text.substring(0, 35) + (text.length > 35 ? '...' : ''),
            themeId,
          };
          updated = [newItem, ...prev.slice(0, 9)];
        }

        try {
          localStorage.setItem('yahadamiya-cipher-save', JSON.stringify(updated));
        } catch {
          // Ignore quota errors
        }
        return updated;
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [text, themeId]);

  // Load configuration from URL hash if available on initial mount
  useEffect(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const decoded = JSON.parse(decodeURIComponent(atob(hash)));
        // Security: Type validation for hash data to prevent malicious state injection
        if (decoded && typeof decoded === 'object') {
          if (typeof decoded.text === 'string') {
             setText(decoded.text.substring(0, 5000));
          }
          if (typeof decoded.themeId === 'string') setThemeId(decoded.themeId);
          if (typeof decoded.settings === 'object' && decoded.settings !== null) {
             setSettings((s) => ({ ...s, ...decoded.settings }));
          }
          showToast('تم تحميل النص والإعدادات من الرابط بنجاح! ✦', 'success');
        }
      }
    } catch {
      // Ignore hash parse errors
    }
  }, [showToast]);

  // Export functions
  const handleExportPNG = async () => {
    try {
      const dataUrl = await exportHDCanvasPNG(text, settings, currentTheme, 2);
      const link = document.createElement('a');
      link.download = `yahadamiya-cipher-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      showToast('تم تصدير صورة PNG بنجاح', 'success');
    } catch (e) {
      showToast('حدث خطأ أثناء تصدير الصورة', 'error');
    }
  };

  const handleExportHD = async () => {
    try {
      const dataUrl = await exportHDCanvasPNG(text, settings, currentTheme, 4);
      const link = document.createElement('a');
      link.download = `yahadamiya-cipher-4k-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      // Launch celebratory particle confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: [currentTheme.primary, currentTheme.secondary, '#ffffff'],
      });

      showToast('تم تصدير اللوحة بدقة 4K فائقة النقاء! ✨', 'success');
    } catch (e) {
      showToast('حدث خطأ أثناء تصدير Ultra HD', 'error');
    }
  };

  const handleExportSVG = () => {
    try {
      const svgString = generateFullSVG(text, settings, currentTheme);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `yahadamiya-cipher-vector-${Date.now()}.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      showToast('تم تصدير ملف الفيكتور SVG بنجاح', 'success');
    } catch {
      showToast('حدث خطأ أثناء تصدير SVG', 'error');
    }
  };

  const handleCopyImage = async () => {
    try {
      const dataUrl = await exportHDCanvasPNG(text, settings, currentTheme, 2);
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
      showToast('تم نسخ الصورة كـ PNG فورياً إلى الحافظة! 📋', 'success');
    } catch {
      showToast('تعذر النسخ التلقائي كصورة. يمكنك حفظها كـ PNG.', 'error');
    }
  };

  const handleCopyRuneText = async () => {
    try {
      const runeText = getRuneEncodedText(text);
      await navigator.clipboard.writeText(runeText);
      showToast('تم نسخ خريطة الرموز المشفرة إلى الحافظة', 'success');
    } catch {
      showToast('تعذر نسخ النص المشفر', 'error');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      showToast('جاري تجهيز صورة الشفرة للمشاركة...', 'info');
      const dataUrl = await exportHDCanvasPNG(text, settings, currentTheme, 2);
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const imageFile = new File([blob], 'yahadamiya-cipher.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
        await navigator.share({
          files: [imageFile],
          title: 'شَفْرَة اليحآدمية',
          text: 'شَفْرَة اليحآدمية ✦',
        });
        showToast('تم فتح قائمة المشاركة بنجاح!', 'success');
      } else {
        // Fallback for browsers/devices without native file sharing support
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        showToast('تم نسخ الصورة إلى الحافظة! يمكنك لصقها مباشرة في واتساب أو أي محادثة.', 'info');
      }
    } catch (err: any) {
      if (err && err.name === 'AbortError') {
        return; // User canceled the native share dialog
      }
      try {
        // Secondary fallback to clipboard if share threw an error
        const dataUrl = await exportHDCanvasPNG(text, settings, currentTheme, 2);
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        showToast('تم نسخ الصورة إلى الحافظة! يمكنك لصقها مباشرة في أي محادثة.', 'info');
      } catch {
        showToast('تعذر مشاركة الصورة مباشرة. يمكنك حفظها كـ PNG.', 'error');
      }
    }
  };

  const handleSpeakTTS = (customText?: string) => {
    const textToSpeak = typeof customText === 'string' ? customText : text;
    if (!textToSpeak.trim()) {
      showToast('لا يوجد نص لنطقه صوتياً', 'info');
      return;
    }
    if (!('speechSynthesis' in window)) {
      showToast('خاصية النطق الصوتي غير مدعومة في متصفحك', 'error');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
    showToast('جاري نطق النص العربي صوتياً...', 'info');
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey;

      if (isCtrl && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if (isCtrl && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))) {
        e.preventDefault();
        handleRedo();
      } else if (isCtrl && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleExportHD();
      } else if (isCtrl && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handleCopyImage();
      } else if (isCtrl && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        handleClear();
      } else if (isCtrl && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setIsFullscreenOpen((prev) => !prev);
      } else if (isCtrl && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        setIsGlyphMapOpen((prev) => !prev);
      } else if (isCtrl && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSettingsOpen((prev) => !prev);
      } else if (isCtrl && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setIsHistoryOpen((prev) => !prev);
      } else if (isCtrl && e.key === '/') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, handleClear]);

  return (
    <div className="relative min-h-screen bg-[#08070d] text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* 4.5s Cinematic Splash Screen with Smooth Fade-out */}
      {showSplash && <YahadamiyaIntroLoader onComplete={() => setShowSplash(false)} />}

      {/* الشريط العلوي الزجاجي الثابت في قمة الشاشة عبر جميع الصفحات */}
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none" dir="rtl">
        <div className="pointer-events-auto w-full max-w-5xl bg-[#0a0a14]/90 backdrop-blur-2xl border border-[#c9a84c]/40 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(201,168,76,0.15)] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 transition-all">
          
          {/* الشعار والاسم (انقر للعودة للبداية) */}
          <button
            type="button"
            onClick={() => {
              setView('hero');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <img
              src={logoImg}
              alt="شَفْرَة اليحآدمية"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-[#c9a84c]/60 drop-shadow-[0_0_10px_rgba(201,168,76,0.6)] group-hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'block';
              }}
            />
            <span className="font-bold text-sm sm:text-base text-[#e8c55a] tracking-wide group-hover:text-[#ffe58f] transition-colors">
              شَفْرَة اليحآدمية
            </span>
          </button>

          {/* روابط التنقل السريعة بين الأقسام */}
          <nav className="hidden md:flex items-center gap-3.5 lg:gap-5 text-xs sm:text-sm font-medium text-slate-300">
            <button
              type="button"
              onClick={() => {
                setView('workspace');
                setActiveMode('translate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors cursor-pointer ${
                view === 'workspace' && activeMode === 'translate'
                  ? 'text-[#e8c55a] font-bold'
                  : 'hover:text-[#e8c55a]'
              }`}
            >
              مساحة العمل
            </button>

            <button
              type="button"
              onClick={() => {
                setView('workspace');
                setActiveMode('direct_writer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors cursor-pointer ${
                view === 'workspace' && activeMode === 'direct_writer'
                  ? 'text-[#e8c55a] font-bold'
                  : 'hover:text-[#e8c55a]'
              }`}
            >
              الكتابة المباشرة
            </button>

            <button
              type="button"
              onClick={() => {
                setView('workspace');
                setActiveMode('scanner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors cursor-pointer ${
                view === 'workspace' && activeMode === 'scanner'
                  ? 'text-[#e8c55a] font-bold'
                  : 'hover:text-[#e8c55a]'
              }`}
            >
              فاحص الصور
            </button>

            <button
              type="button"
              onClick={() => {
                setView('workspace');
                setIsGlyphMapOpen(true);
              }}
              className="hover:text-[#e8c55a] transition-colors cursor-pointer"
            >
              قاموس الرموز
            </button>

            <button
              type="button"
              onClick={() => {
                setView('workspace');
                setTimeout(() => {
                  document.getElementById('creators-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="hover:text-[#e8c55a] transition-colors cursor-pointer"
            >
              مبتكرو الشفرة
            </button>
          </nav>

          {/* جانب المستخدم وتسجيل الخروج */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                {/* بادج الإيميل */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121220] border border-[#c9a84c]/30 text-[11px] sm:text-xs text-[#e8c55a] max-w-[160px] truncate">
                  <span>👤</span>
                  <span className="truncate">{userEmail || 'adamabdeljaouad@gmail.com'}</span>
                </div>

                {/* زر الخروج */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-full bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 hover:text-white text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-1.5 rounded-full bg-[#c9a84c]/20 hover:bg-[#c9a84c]/30 text-[#e8c55a] border border-[#c9a84c]/40 text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(201,168,76,0.2)] cursor-pointer"
              >
                تسجيل الدخول 👤
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero View OR Workspace View */}
      {view === 'hero' ? (
        <YahadamiyaHero
          onStart={handleStart}
          onOpenAuth={() => setShowAuthModal(true)}
          isAuthenticated={isAuthenticated}
          userEmail={userEmail}
          onLogout={handleLogout}
          onOpenMap={() => {
            if (!isAuthenticated) {
              setShowAuthModal(true);
              showToast('يرجى تسجيل الدخول أو إنشاء حساب للوصول إلى قاموس الرموز 🔒', 'info');
            } else {
              setView('workspace');
              setIsGlyphMapOpen(true);
            }
          }}
          onOpenScanner={() => {
            if (!isAuthenticated) {
              setShowAuthModal(true);
              showToast('يرجى تسجيل الدخول أو إنشاء حساب للوصول إلى فاحص الصور 🔒', 'info');
            } else {
              setView('workspace');
              setActiveMode('scanner');
            }
          }}
          onOpenDirectWriter={() => {
            if (!isAuthenticated) {
              setShowAuthModal(true);
              showToast('يرجى تسجيل الدخول أو إنشاء حساب للوصول إلى الكتابة المباشرة 🔒', 'info');
            } else {
              setView('workspace');
              setActiveMode('direct_writer');
            }
          }}
          onScrollToCreators={() => {
            if (!isAuthenticated) {
              setShowAuthModal(true);
              showToast('يرجى تسجيل الدخول أو إنشاء حساب 🔒', 'info');
            } else {
              setView('workspace');
              setTimeout(() => {
                document.getElementById('creators-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }
          }}
        />
      ) : (
        <>
          {/* Background Interactive Celestial Particle Canvas */}
          <ParticleBackground theme={currentTheme} />

          {/* Decorative Top Cosmic Ambient Glow */}
          <div
            className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] opacity-25 blur-[120px] rounded-full z-0 transition-all duration-700"
            style={{
              background: `radial-gradient(circle, ${currentTheme.primary} 0%, ${currentTheme.glow} 50%, transparent 70%)`,
            }}
          />

          {/* Main App Container */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-10 space-y-6">

        {/* App Hero Header */}
        <header className="flex flex-col items-center text-center space-y-3.5">
          {/* Prominent High-Contrast Master Logo (w-36 h-36 on mobile, w-44 h-44 to w-48 h-48 on desktop) */}
          <div className="relative mx-auto mb-2 w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 flex items-center justify-center">
            <div className="relative w-full h-full rounded-full p-1 border-2 border-[#c9a84c]/60 bg-[#07070d]/90 backdrop-blur-md shadow-[0_0_40px_rgba(201,168,76,0.4)] transition-transform duration-500 hover:scale-105 flex items-center justify-center overflow-hidden">
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

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-zinc-300">
              محرك الرموز الهندسية اليحآدمية • Pure 2D Canvas Engine
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white flex items-center justify-center gap-3">
            <span>شَفْرَة</span>
            <span
              className="text-transparent bg-clip-text font-serif italic text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(201,168,76,0.4)]"
              style={{
                backgroundImage: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              }}
            >
              اليحآدمية
            </span>
            <span className="text-xs font-sans font-semibold tracking-widest text-amber-400/80 px-2 py-0.5 rounded-full border border-amber-400/20 bg-amber-500/10">
              CIPHER
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
            حوّل كلماتك إلى نقوش اللغة اليحآدمية برسم هندسي حي وفائق الدقة
          </p>
        </header>

        {/* Mode Selector Tabs (Translation Mode / Image Scanner Decoder / Direct Yah'adamiya Writer) */}
        <div
          id="mode-selector-tabs"
          className="flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl w-full max-w-2xl mx-auto shadow-lg"
        >
          <button
            id="tab-translate-mode"
            onClick={() => setActiveMode('translate')}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'translate'
                ? 'bg-amber-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Feather className="w-4 h-4 shrink-0" />
            <span>مترجم النصوص (عربي ➔ شفرة) ✍️</span>
          </button>

          <button
            id="tab-scanner-mode"
            onClick={() => setActiveMode('scanner')}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'scanner'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Camera className="w-4 h-4 shrink-0" />
            <span>فاحص الصور وفك الشفرة 📷</span>
          </button>

          <button
            id="tab-direct-writer-mode"
            onClick={() => setActiveMode('direct_writer')}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'direct_writer'
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-[#e8c55a] text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] font-black'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Keyboard className="w-4 h-4 shrink-0" />
            <span>الكتابة المباشرة باليحآدمية ⌨️</span>
          </button>
        </div>

        {/* Central Workspace Mode: Translation | Scanner | Direct Yah'adamiya Writer */}
        {activeMode === 'direct_writer' ? (
          <DirectYahadamiyaWriter
            directYahText={directYahText}
            setDirectYahText={setDirectYahText}
            showToast={showToast}
            settings={settings}
            theme={currentTheme}
          />
        ) : activeMode === 'scanner' ? (
          <ImageScannerDecoder
            onApplyDecodedText={(decoded) => {
              handleTextChange(decoded);
              setActiveMode('translate');
            }}
            onSpeakTTS={handleSpeakTTS}
            showToast={showToast}
          />
        ) : (
          <>
            {/* Interactive Text Input Box */}
            <section
              id="interactive-textarea-container"
              className="relative rounded-2xl bg-zinc-950/70 border border-white/10 p-4 sm:p-5 backdrop-blur-2xl shadow-xl transition-all duration-300 focus-within:border-amber-400/50"
            >
              {/* Textarea Header Bar with Character Counter and Status */}
              <div className="flex items-center justify-between mb-2.5 text-xs text-zinc-400">
                <div className="flex items-center gap-2 font-medium">
                  <Feather className="w-4 h-4 text-amber-400" />
                  <span>اكتب أو الصق النص العربي أدناه:</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveMode('scanner')}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>فحص صورة 📷</span>
                  </button>
                  <div className="h-3 w-px bg-white/10" />
                  {isTyping && (
                    <span className="flex items-center gap-1.5 text-amber-400 text-[11px] font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                      جاري الرسم الهندسي...
                    </span>
                  )}
                  <span className="font-mono text-zinc-400 text-[11px]">
                    {text.length} حرف
                  </span>
                </div>
              </div>

              {/* Large RTL Textarea */}
              <textarea
                ref={textareaRef}
                id="arabic-script-input"
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                dir="rtl"
                rows={3}
                placeholder="اكتب هنا وشاهد تحويل الحروف إلى شَفْرَة اليحآدمية الهندسية في الوقت الفعلي..."
                className="w-full bg-transparent text-zinc-100 placeholder-zinc-600 text-sm sm:text-base md:text-lg resize-y focus:outline-none leading-relaxed tracking-wide font-sans scrollbar-thin scrollbar-thumb-white/20"
              />

              {/* Quick Sample Inspiration Presets */}
              <div
                id="sample-presets-bar"
                className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10 overflow-x-auto flex-nowrap scrollbar-none"
              >
                <span className="text-[11px] text-zinc-500 font-medium whitespace-nowrap flex items-center gap-1">
                  <Wand2 className="w-3 h-3 text-amber-400" /> نماذج ملهمة:
                </span>
                {SAMPLE_PHRASES.map((phrase, i) => (
                  <button
                    key={i}
                    onClick={() => handleTextChange(phrase)}
                    className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/5 whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </section>

            {/* Actions Toolbar & Live Adjustments Panel */}
            <ControlsToolbar
              selectedThemeId={themeId}
              onSelectTheme={setThemeId}
              selectedBg={settings.canvasBg}
              onSelectBg={(canvasBg: CanvasBgType) => setSettings((s) => ({ ...s, canvasBg }))}
              settings={settings}
              onUpdateSettings={(newSettings) => setSettings((s) => ({ ...s, ...newSettings }))}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenGlyphMap={() => setIsGlyphMapOpen(true)}
              onOpenStats={() => setIsStatsOpen(true)}
              onOpenHistory={() => setIsHistoryOpen(true)}
              onOpenShortcuts={() => setIsShortcutsOpen(true)}
              onExportPNG={handleExportPNG}
              onExportHD={handleExportHD}
              onExportSVG={handleExportSVG}
              onCopyImage={handleCopyImage}
              onCopyRuneText={handleCopyRuneText}
              onPrint={handlePrint}
              onShare={handleShare}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onClear={handleClear}
              canUndo={undoStack.length > 0}
              canRedo={redoStack.length > 0}
              undoCount={undoStack.length}
            />

            {/* Main Canvas Viewer Card */}
            <CanvasViewer
              text={text}
              settings={settings}
              theme={currentTheme}
              onOpenFullscreen={() => setIsFullscreenOpen(true)}
              onQuickExport={handleExportPNG}
              onCopyImage={handleCopyImage}
              onSpeakTTS={handleSpeakTTS}
              onDropTextFile={handleTextChange}
              showToast={showToast}
            />
          </>
        )}

        {/* Creators & Innovators Section */}
        <CreatorsSection />

        {/* Footer Info & Credits */}
        <footer className="flex flex-col sm:flex-row items-center justify-between py-4 text-xs text-zinc-500 border-t border-white/10 gap-2">
          <div className="flex items-center gap-2">
            <span>شَفْرَة اليحآدمية • The Yah'adamiya Cipher</span>
            <span>✦</span>
            <span>100% Offline & Pure Canvas 2D</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsShortcutsOpen(true)}
              className="hover:text-zinc-300 transition-colors"
            >
              اختصارات المفاتيح (Ctrl+/)
            </button>
            <span>•</span>
            <button
              onClick={() => setIsGlyphMapOpen(true)}
              className="hover:text-zinc-300 transition-colors"
            >
              قاموس الرموز
            </button>
          </div>
        </footer>
          </div>
        </>
      )}

      {/* Modals & Drawers */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings((s) => ({ ...s, ...newSettings }))}
        onResetSettings={() => {
          setSettings(DEFAULT_SETTINGS);
          showToast('تمت استعادة الإعدادات الافتراضية', 'info');
        }}
        selectedThemeId={themeId}
        onSelectTheme={setThemeId}
      />

      <GlyphReferenceModal
        isOpen={isGlyphMapOpen}
        onClose={() => setIsGlyphMapOpen(false)}
        onSelectChar={handleInsertChar}
        theme={currentTheme}
      />

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        text={text}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onRestoreItem={(item) => {
          handleTextChange(item.text);
          if (item.themeId) setThemeId(item.themeId);
          showToast('تمت استعادة النص من السجل', 'success');
        }}
        onClearHistory={() => {
          setHistory([]);
          localStorage.removeItem('yahadamiya-cipher-save');
          localStorage.removeItem('ostoory_history');
          showToast('تم مسح كامل السجل', 'info');
        }}
      />

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <FullscreenModal
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        text={text}
        settings={settings}
        theme={currentTheme}
        onExportHD={handleExportHD}
        onCopyImage={handleCopyImage}
      />

      {/* Authentication & Account Modal (AuthUI) */}
      {showAuthModal && (
        <AuthUI
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Toast Messages Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
