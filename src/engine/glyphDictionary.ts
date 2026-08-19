import { GlyphRenderOptions, GlyphSpec } from '../types';

export const CELL_W = 70;
export const CELL_H = 120;
export const CHAR_GAP = 10;
export const BASELINE = 85;

/**
 * Registry of all Arabic Glyph Specifications for reference & metadata
 */
export const GLYPH_SPECS: Record<string, GlyphSpec> = {
  ' ': {
    char: ' ',
    nameAr: 'مسافة بين الكلمات',
    category: 'space',
    descriptionAr: 'نقطة كبيرة مصمتة ترتكز على خط الأساس',
    runeRepresentation: '•',
  },
  'ا': {
    char: 'ا',
    nameAr: 'الألف',
    category: 'letter',
    descriptionAr: 'خط عمودي مستقيم ذو قاعدة سفلية أفقية (I)',
    runeRepresentation: '⟂',
  },
  'أ': {
    char: 'أ',
    nameAr: 'ألف همزة',
    category: 'hamza',
    descriptionAr: 'خط عمودي مستقيم يرتكز على قاعدة أفقية سفلية، وفوقه همزة صغيرة (شكل 2 مقلوب)',
    runeRepresentation: 'I²',
  },
  'إ': {
    char: 'إ',
    nameAr: 'ألف كسرة همزة',
    category: 'hamza',
    descriptionAr: 'خط عمودي ذو قاعدة علوية + رقم 2 صغير أسفل السطر',
    runeRepresentation: '⊤₂',
  },
  'آ': {
    char: 'آ',
    nameAr: 'ألف مدّة',
    category: 'hamza',
    descriptionAr: 'خط عمودي بقاعدة سفلية + خطان أفقيان متوازيان في الأعلى',
    runeRepresentation: '⟂⁼',
  },
  'ء': {
    char: 'ء',
    nameAr: 'همزة منفردة',
    category: 'hamza',
    descriptionAr: 'همزة هندسية مصغرة (شكل رقم 2 مقلوب/معكوس أفقياً) متمركزة في الخلية',
    runeRepresentation: '²',
  },
  'ئ': {
    char: 'ئ',
    nameAr: 'ياء همزة',
    category: 'hamza',
    descriptionAr: 'شكل زاوية V ، وفوقه همزة صغيرة (شكل 2 مقلوب) فقط',
    runeRepresentation: 'V²',
  },
  'ؤ': {
    char: 'ؤ',
    nameAr: 'واو همزة',
    category: 'hamza',
    descriptionAr: 'علامة التقاطع X + رقم 2 صغير في الأعلى',
    runeRepresentation: 'ᚷ²',
  },
  'ب': {
    char: 'ب',
    nameAr: 'الباء',
    category: 'letter',
    descriptionAr: 'مثلث متساوي الساقين بقاعدة سفلية وبداخله خط عمودي واحد',
    runeRepresentation: '△|',
  },
  'ت': {
    char: 'ت',
    nameAr: 'التاء',
    category: 'letter',
    descriptionAr: 'مثلث متساوي الساقين وبداخله خطان عموديان متوازيان',
    runeRepresentation: '△||',
  },
  'ث': {
    char: 'ث',
    nameAr: 'الثاء',
    category: 'letter',
    descriptionAr: 'مثلث متساوي الساقين وبداخله ثلاثة خطوط عمودية',
    runeRepresentation: '△|||',
  },
  'ج': {
    char: 'ج',
    nameAr: 'الجيم',
    category: 'letter',
    descriptionAr: 'زاوية قائمة (رقم 7) مع نقطة دائرية مصمتة داخل الزاوية',
    runeRepresentation: '⊦•',
  },
  'ح': {
    char: 'ح',
    nameAr: 'الحاء',
    category: 'letter',
    descriptionAr: 'رقم 7 هندسي ذو زاوية قائمة صريحة',
    runeRepresentation: '⊦',
  },
  'خ': {
    char: 'خ',
    nameAr: 'الخاء',
    category: 'letter',
    descriptionAr: 'زاوية قائمة (رقم 7) مع نقطة دائرية تطفو فوق طرفه العلوي',
    runeRepresentation: '•⊦',
  },
  'د': {
    char: 'د',
    nameAr: 'الدال',
    category: 'letter',
    descriptionAr: 'سقف أفقي علوي متصل بجسم مائل ينتهي بقوس سفلي ناعم',
    runeRepresentation: '⮁',
  },
  'ذ': {
    char: 'ذ',
    nameAr: 'الذال',
    category: 'letter',
    descriptionAr: 'نفس شكل الدال مع نقطة مصمتة تطفو فوق الزاوية العلوية',
    runeRepresentation: '⮁˙',
  },
  'ر': {
    char: 'ر',
    nameAr: 'الراء',
    category: 'letter',
    descriptionAr: 'خط أفقي مستقيم يقع بالكامل تحت خط السطر الأساسي',
    runeRepresentation: '—_sub',
  },
  'ز': {
    char: 'ز',
    nameAr: 'الزاي',
    category: 'letter',
    descriptionAr: 'خط أفقي تحت السطر مع نقطة دائرية فوقه على السطر',
    runeRepresentation: '•/—',
  },
  'س': {
    char: 'س',
    nameAr: 'السين',
    category: 'letter',
    descriptionAr: 'خط أفقي بقاعدة مسننة من 3 أعمدة، تعلوها 3 خطوط أفقية متوازية',
    runeRepresentation: 'Ш≡',
  },
  'ش': {
    char: 'ش',
    nameAr: 'الشين',
    category: 'letter',
    descriptionAr: 'نفس شكل السين (مسنن ثلاثي)، تعلوها 4 خطوط أفقية متوازية',
    runeRepresentation: 'Ш≣',
  },
  'ص': {
    char: 'ص',
    nameAr: 'الصاد',
    category: 'letter',
    descriptionAr: 'مستطيل أفقي يتقاطع مع منتصفه من الأسفل مستطيل رأسي أصغر',
    runeRepresentation: '▭⫽▯',
  },
  'ض': {
    char: 'ض',
    nameAr: 'الضاد',
    category: 'letter',
    descriptionAr: 'نفس شكل الصاد مع نقطة داخل المستطيل الأفقي',
    runeRepresentation: '▭•⫽▯',
  },
  'ط': {
    char: 'ط',
    nameAr: 'الطاء',
    category: 'letter',
    descriptionAr: 'مستطيل أفقي ينطلق من مركزه خط رأسي ممتد للأعلى',
    runeRepresentation: '▭⟂↑',
  },
  'ظ': {
    char: 'ظ',
    nameAr: 'الظاء',
    category: 'letter',
    descriptionAr: 'نفس شكل الطاء مع نقطة داخل المستطيل أمام الخط الرأسي',
    runeRepresentation: '▭•⟂↑',
  },
  'ع': {
    char: 'ع',
    nameAr: 'العين',
    category: 'letter',
    descriptionAr: 'مستطيل رأسي يقسمه في منتصفه خط أفقي صريح',
    runeRepresentation: '▯—',
  },
  'غ': {
    char: 'غ',
    nameAr: 'الغين',
    category: 'letter',
    descriptionAr: 'نفس شكل العين مع نقطة في النصف العلوي للمستطيل',
    runeRepresentation: '▯•—',
  },
  'ف': {
    char: 'ف',
    nameAr: 'الفاء',
    category: 'letter',
    descriptionAr: 'مربع ينطلق من منتصف قاعدته خط رأسي للأسفل + نقطة في الأعلى',
    runeRepresentation: '◻| •',
  },
  'ق': {
    char: 'ق',
    nameAr: 'القاف',
    category: 'letter',
    descriptionAr: 'مربع ينطلق من قاعدته خط رأسي للأسفل + نقطتان في الأعلى',
    runeRepresentation: '◻| ••',
  },
  'ك': {
    char: 'ك',
    nameAr: 'الكاف',
    category: 'letter',
    descriptionAr: 'يُرسم مثل الرقم المطبوع 5',
    runeRepresentation: '𝟝',
  },
  'ل': {
    char: 'ل',
    nameAr: 'اللام',
    category: 'letter',
    descriptionAr: 'خط عمودي مستقيم مع قاعدة أفقية تنطلق لليسار',
    runeRepresentation: '|_',
  },
  'م': {
    char: 'م',
    nameAr: 'الميم',
    category: 'letter',
    descriptionAr: 'يُرسم مثل الحرف اللاتيني الصغير b',
    runeRepresentation: '𝖻',
  },
  'ن': {
    char: 'ن',
    nameAr: 'النون',
    category: 'letter',
    descriptionAr: 'يُرسم مثل الحرف اللاتيني الكبير N',
    runeRepresentation: '𝖭',
  },
  'ه': {
    char: 'ه',
    nameAr: 'الهاء',
    category: 'letter',
    descriptionAr: 'مربع مغلق يقسمه خط رأسي من المنتصف إلى نصفين متساويين',
    runeRepresentation: '◫',
  },
  'ة': {
    char: 'ة',
    nameAr: 'التاء المربوطة',
    category: 'letter',
    descriptionAr: 'مربع مقسوم نصفين (كالهاء) مع نقطتين فوقه',
    runeRepresentation: '◫••',
  },
  'و': {
    char: 'و',
    nameAr: 'الواو',
    category: 'letter',
    descriptionAr: 'يُرسم مثل علامة التقاطع X',
    runeRepresentation: 'ᚷ',
  },
  'ي': {
    char: 'ي',
    nameAr: 'الياء',
    category: 'letter',
    descriptionAr: 'زاوية V مع خط أفقي مستقر تحتها كقاعدة',
    runeRepresentation: 'ᐯ_',
  },
  'ى': {
    char: 'ى',
    nameAr: 'الألف المقصورة',
    category: 'letter',
    descriptionAr: 'زاوية V مجردة تماماً بدون خط سفلي',
    runeRepresentation: 'ᐯ',
  },
};

/**
 * Sanitizes Arabic text by removing tashkeel diacritics and tatweel
 */
export function sanitizeArabicText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F\u0670\u0617-\u061A\u06D6-\u06ED]/g, '') // remove tashkeel & harakat
    .replace(/\u0640/g, ''); // remove tatweel / kashida
}

/**
 * Normalizes input Arabic text characters for uniform glyph lookup
 */
export function normalizeChar(char: string): string {
  if (!char) return ' ';
  // Strip diacritics / tashkeel if present
  const cleaned = char
    .replace(/[\u064B-\u065F\u0670\u0617-\u061A\u06D6-\u06ED]/g, '')
    .replace(/\u0640/g, '');
  if (!cleaned) return '';
  if (cleaned === 'پ') return 'ب';
  if (cleaned === 'چ') return 'ج';
  if (cleaned === 'ڤ') return 'ف';
  if (cleaned === 'گ') return 'ك';
  if (cleaned === 'ي' || cleaned === 'ى') return cleaned;
  return cleaned;
}

/**
 * Pure Canvas 2D Path Drawing Implementation
 * Strictly follows the geometric specifications
 */
export function drawGlyph(
  ctx: CanvasRenderingContext2D,
  rawChar: string,
  x: number,
  y: number,
  options: GlyphRenderOptions
) {
  const char = normalizeChar(rawChar);
  ctx.save();

  // Apply scaling & mirroring around cell center
  const cx = x + CELL_W / 2;
  const cy = y + CELL_H / 2;

  ctx.translate(cx, cy);
  if (options.isMirror) {
    ctx.scale(-1, 1);
  }
  ctx.scale(options.glyphScale, options.glyphScale);
  ctx.translate(-cx, -cy);

  // Setup Styles
  ctx.lineWidth = options.lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = options.primaryColor;
  ctx.fillStyle = options.secondaryColor || options.primaryColor;

  // Glow Configuration
  if (options.shadowStyle === 'soft' && options.glowIntensity > 0) {
    ctx.shadowColor = options.glowColor;
    ctx.shadowBlur = options.glowIntensity * 1.5;
  } else if (options.shadowStyle === 'hard' && options.glowIntensity > 0) {
    ctx.shadowColor = options.glowColor;
    ctx.shadowBlur = options.glowIntensity * 0.7;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
  } else {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  // Draw specific glyph
  switch (char) {
    case ' ': {
      // المسافة بين الكلمات: نقطة كبيرة مصمتة (•) على خط الأساس
      ctx.beginPath();
      ctx.arc(x + 35, y + BASELINE, 5.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'ا': {
      // خط عمودي مستقيم ذو قاعدة سفلية أفقية (I)
      ctx.beginPath();
      // Vertical line
      ctx.moveTo(x + 35, y + 25);
      ctx.lineTo(x + 35, y + BASELINE);
      // Bottom horizontal base
      ctx.moveTo(x + 20, y + BASELINE);
      ctx.lineTo(x + 50, y + BASELINE);
      ctx.stroke();
      break;
    }

    case 'ل': {
      // اللام: خط عمودي مستقيم ينزل من الأعلى وعند وصوله للسطر ينعطف بخط أفقي مستقيم يتجه نحو اليسار (زاوية قائمة متجهة لليسار)
      ctx.beginPath();
      ctx.moveTo(x + 48, y + 25);
      ctx.lineTo(x + 48, y + BASELINE);
      ctx.lineTo(x + 18, y + BASELINE);
      ctx.stroke();
      break;
    }

    case 'أ': {
      // الألف المهموزة: خط عمودي مستقيم يرتكز على قاعدة أفقية سفلية + همزة صغيرة تطفو في الأعلى (شكل 2 مقلوب)
      ctx.beginPath();
      // العمود المستقيم والقاعدة السفلية (مثل الألف)
      ctx.moveTo(x + 35, y + 36);
      ctx.lineTo(x + 35, y + BASELINE);
      ctx.moveTo(x + 20, y + BASELINE);
      ctx.lineTo(x + 50, y + BASELINE);
      ctx.stroke();

      // الهمزة العلوية (شكل رقم 2 الصغير المقلوب/المعكوس الخاص باللغة في المنطقة العلوية y: 15-28)
      ctx.beginPath();
      ctx.arc(x + 35, y + 19, 4.5, Math.PI, 0, false);
      ctx.lineTo(x + 31, y + 28);
      ctx.lineTo(x + 39, y + 28);
      ctx.stroke();
      break;
    }

    case 'إ': {
      // خط عمودي ذو قاعدة أفقية علوية + شكل رقم '2' صغير أسفل السطر
      ctx.beginPath();
      // Top base
      ctx.moveTo(x + 20, y + 25);
      ctx.lineTo(x + 50, y + 25);
      // Vertical line
      ctx.moveTo(x + 35, y + 25);
      ctx.lineTo(x + 35, y + BASELINE);
      ctx.stroke();

      // Small numeral '2' below baseline
      ctx.beginPath();
      ctx.arc(x + 35, y + 96, 4, Math.PI, 0, false);
      ctx.lineTo(x + 31, y + 106);
      ctx.lineTo(x + 39, y + 106);
      ctx.stroke();
      break;
    }

    case 'آ': {
      // خط عمودي ذو قاعدة سفلية + خطان أفقيان متوازيان يطفوان في الأعلى
      ctx.beginPath();
      // Vertical line & bottom base
      ctx.moveTo(x + 35, y + 36);
      ctx.lineTo(x + 35, y + BASELINE);
      ctx.moveTo(x + 20, y + BASELINE);
      ctx.lineTo(x + 50, y + BASELINE);
      // Two floating horizontal lines on top
      ctx.moveTo(x + 22, y + 18);
      ctx.lineTo(x + 48, y + 18);
      ctx.moveTo(x + 22, y + 26);
      ctx.lineTo(x + 48, y + 26);
      ctx.stroke();
      break;
    }

    case 'ء': {
      // همزة هندسية مصغرة (شكل رقم 2 مقلوب/معكوس أفقياً) متمركزة في الخلية بنفس نمط الهمزة القياسي
      ctx.beginPath();
      ctx.arc(x + 35, y + 56, 6, Math.PI, 0, false);
      ctx.lineTo(x + 29, y + 68);
      ctx.lineTo(x + 41, y + 68);
      ctx.stroke();
      break;
    }

    case 'ئ': {
      // زاوية على شكل حرف V اللاتيني فقط بدون أي قاعدة سفلية + همزة صغيرة تطفو في الأعلى (شكل 2 مقلوب)
      ctx.beginPath();
      // V angle body (without bottom base)
      ctx.moveTo(x + 20, y + 44);
      ctx.lineTo(x + 35, y + BASELINE);
      ctx.lineTo(x + 50, y + 44);
      ctx.stroke();

      // Small floating Hamza on top (numeral 2 reversed shape in y: 15-28)
      ctx.beginPath();
      ctx.arc(x + 35, y + 19, 4.5, Math.PI, 0, false);
      ctx.lineTo(x + 31, y + 28);
      ctx.lineTo(x + 39, y + 28);
      ctx.stroke();
      break;
    }

    case 'ؤ': {
      // شكل علامة التقاطع 'x' + في الأعلى شكل رقم 2 صغير
      ctx.beginPath();
      // 'x' cross
      ctx.moveTo(x + 22, y + 48);
      ctx.lineTo(x + 48, y + BASELINE);
      ctx.moveTo(x + 48, y + 48);
      ctx.lineTo(x + 22, y + BASELINE);
      ctx.stroke();

      // Small '2' on top
      ctx.beginPath();
      ctx.arc(x + 35, y + 22, 4.5, Math.PI, 0, false);
      ctx.lineTo(x + 31, y + 34);
      ctx.lineTo(x + 39, y + 34);
      ctx.stroke();
      break;
    }

    case 'ب': {
      // مثلث متساوي الساقين قاعدته للأسفل وبداخله خط عمودي واحد من الرأس للقاعدة
      ctx.beginPath();
      // Triangle
      ctx.moveTo(x + 35, y + 28);
      ctx.lineTo(x + 18, y + BASELINE);
      ctx.lineTo(x + 52, y + BASELINE);
      ctx.closePath();
      // 1 Inner centerline
      ctx.moveTo(x + 35, y + 28);
      ctx.lineTo(x + 35, y + BASELINE);
      ctx.stroke();
      break;
    }

    case 'ت': {
      // نفس المثلث وبداخله خطان عموديان متوازيان
      ctx.beginPath();
      // Triangle
      ctx.moveTo(x + 35, y + 28);
      ctx.lineTo(x + 18, y + BASELINE);
      ctx.lineTo(x + 52, y + BASELINE);
      ctx.closePath();
      // 2 parallel lines
      ctx.moveTo(x + 29, y + 50);
      ctx.lineTo(x + 29, y + BASELINE);
      ctx.moveTo(x + 41, y + 50);
      ctx.lineTo(x + 41, y + BASELINE);
      ctx.stroke();
      break;
    }

    case 'ث': {
      // نفس المثلث وبداخله ثلاثة خطوط عمودية متوازية
      ctx.beginPath();
      // Triangle
      ctx.moveTo(x + 35, y + 28);
      ctx.lineTo(x + 18, y + BASELINE);
      ctx.lineTo(x + 52, y + BASELINE);
      ctx.closePath();
      // 3 parallel lines
      ctx.moveTo(x + 26, y + 58);
      ctx.lineTo(x + 26, y + BASELINE);
      ctx.moveTo(x + 35, y + 28);
      ctx.lineTo(x + 35, y + BASELINE);
      ctx.moveTo(x + 44, y + 58);
      ctx.lineTo(x + 44, y + BASELINE);
      ctx.stroke();
      break;
    }

    case 'ح': {
      // رقم 7 هندسي ذو زاوية قائمة صريحة
      ctx.beginPath();
      ctx.moveTo(x + 20, y + 30);
      ctx.lineTo(x + 50, y + 30);
      ctx.lineTo(x + 50, y + BASELINE);
      ctx.stroke();
      break;
    }

    case 'ج': {
      // نفس الزاوية القائمة (رقم 7) مع نقطة دائرية مصمتة داخل الزاوية
      ctx.beginPath();
      ctx.moveTo(x + 20, y + 30);
      ctx.lineTo(x + 50, y + 30);
      ctx.lineTo(x + 50, y + BASELINE);
      ctx.stroke();

      // Dot inside angle
      ctx.beginPath();
      ctx.arc(x + 35, y + 55, 4.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'خ': {
      // نفس الزاوية القائمة (رقم 7) مع نقطة دائرية مصمتة تطفو فوق طرفه العلوي
      ctx.beginPath();
      ctx.moveTo(x + 20, y + 36);
      ctx.lineTo(x + 50, y + 36);
      ctx.lineTo(x + 50, y + BASELINE);
      ctx.stroke();

      // Dot floating above top edge
      ctx.beginPath();
      ctx.arc(x + 35, y + 18, 4.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'د': {
      // 1. السقف الأفقي العلوي
      ctx.beginPath();
      ctx.moveTo(x + 20, y + 42);
      ctx.lineTo(x + 55, y + 42);
      ctx.stroke();

      // 2. الجسم الانسيابي (نزول مائل + قوس سفلي بدون تموج سيغما)
      ctx.beginPath();
      ctx.moveTo(x + 20, y + 42);
      // نزول مائل ناعم ومباشر
      ctx.bezierCurveTo(x + 22, y + 60, x + 38, y + 68, x + 38, y + 78);
      // الالتفاف السفلي الناعم
      ctx.bezierCurveTo(x + 38, y + 90, x + 20, y + 90, x + 16, y + 84);
      ctx.stroke();
      break;
    }

    case 'ذ': {
      // 1. السقف الأفقي العلوي
      ctx.beginPath();
      ctx.moveTo(x + 20, y + 42);
      ctx.lineTo(x + 55, y + 42);
      ctx.stroke();

      // 2. الجسم الانسيابي (نزول مائل + قوس سفلي بدون تموج سيغما)
      ctx.beginPath();
      ctx.moveTo(x + 20, y + 42);
      // نزول مائل ناعم ومباشر
      ctx.bezierCurveTo(x + 22, y + 60, x + 38, y + 68, x + 38, y + 78);
      // الالتفاف السفلي الناعم
      ctx.bezierCurveTo(x + 38, y + 90, x + 20, y + 90, x + 16, y + 84);
      ctx.stroke();

      // 3. النقطة العلوية المصمتة
      ctx.beginPath();
      ctx.arc(x + 20, y + 24, 3.2, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'ر': {
      // خط أفقي مستقيم يقع بالكامل تحت خط السطر الأساسي
      ctx.beginPath();
      ctx.moveTo(x + 18, y + 102);
      ctx.lineTo(x + 52, y + 102);
      ctx.stroke();
      break;
    }

    case 'ز': {
      // نفس الخط الأفقي تحت السطر مع نقطة دائرية مصمتة فوقه على السطر
      ctx.beginPath();
      ctx.moveTo(x + 18, y + 102);
      ctx.lineTo(x + 52, y + 102);
      ctx.stroke();

      // Dot on baseline
      ctx.beginPath();
      ctx.arc(x + 35, y + BASELINE, 4.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'س': {
      // السين: قاعدة أفقية ترتكز عليها 3 أعمدة رأسية متساوية (مسنن ثلاثي) + 3 خطوط أفقية متوازية تطفو في الأعلى (بدون نقاط)
      ctx.beginPath();
      // Base line
      ctx.moveTo(x + 18, y + BASELINE);
      ctx.lineTo(x + 52, y + BASELINE);
      // 3 vertical teeth of equal height
      ctx.moveTo(x + 18, y + BASELINE);
      ctx.lineTo(x + 18, y + 56);
      ctx.moveTo(x + 35, y + BASELINE);
      ctx.lineTo(x + 35, y + 56);
      ctx.moveTo(x + 52, y + BASELINE);
      ctx.lineTo(x + 52, y + 56);
      // 3 floating horizontal parallel lines
      ctx.moveTo(x + 18, y + 22);
      ctx.lineTo(x + 52, y + 22);
      ctx.moveTo(x + 18, y + 33);
      ctx.lineTo(x + 52, y + 33);
      ctx.moveTo(x + 18, y + 44);
      ctx.lineTo(x + 52, y + 44);
      ctx.stroke();
      break;
    }

    case 'ش': {
      // الشين: مطابق للسين (مسنن ثلاثي سفلي) + 4 خطوط أفقية متوازية تطفو في الأعلى (بدون نقاط إطلاقاً)
      ctx.beginPath();
      // Base line
      ctx.moveTo(x + 18, y + BASELINE);
      ctx.lineTo(x + 52, y + BASELINE);
      // 3 vertical teeth of equal height
      ctx.moveTo(x + 18, y + BASELINE);
      ctx.lineTo(x + 18, y + 56);
      ctx.moveTo(x + 35, y + BASELINE);
      ctx.lineTo(x + 35, y + 56);
      ctx.moveTo(x + 52, y + BASELINE);
      ctx.lineTo(x + 52, y + 56);
      // 4 floating horizontal parallel lines
      ctx.moveTo(x + 18, y + 17);
      ctx.lineTo(x + 52, y + 17);
      ctx.moveTo(x + 18, y + 26);
      ctx.lineTo(x + 52, y + 26);
      ctx.moveTo(x + 18, y + 35);
      ctx.lineTo(x + 52, y + 35);
      ctx.moveTo(x + 18, y + 44);
      ctx.lineTo(x + 52, y + 44);
      ctx.stroke();
      break;
    }

    case 'ص': {
      // مستطيل أفقي كبير على السطر، يتقاطع مع منتصفه من الأسفل مستطيل رأسي أصغر (نصفه داخله ونصفه خارجه)
      ctx.beginPath();
      // Big horizontal rectangle
      ctx.strokeRect(x + 15, y + 50, 40, 35);
      // Smaller vertical rectangle intersecting from bottom
      ctx.strokeRect(x + 28, y + 68, 14, 35);
      break;
    }

    case 'ض': {
      // نفس شكل الصاد، مع نقطة داخل المستطيل الأفقي الكبير فوق المستطيل الرأسي
      ctx.beginPath();
      // Big horizontal rectangle
      ctx.strokeRect(x + 15, y + 50, 40, 35);
      // Smaller vertical rectangle
      ctx.strokeRect(x + 28, y + 68, 14, 35);

      // Dot inside horizontal rect above vertical rect
      ctx.beginPath();
      ctx.arc(x + 35, y + 60, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'ط': {
      // مستطيل أفقي فوق السطر ينطلق من مركزه خط رأسي ممتد للأعلى
      ctx.beginPath();
      // Horizontal rectangle
      ctx.strokeRect(x + 18, y + 65, 34, 20);
      // Vertical line from center extending upward
      ctx.moveTo(x + 35, y + 75);
      ctx.lineTo(x + 35, y + 22);
      ctx.stroke();
      break;
    }

    case 'ظ': {
      // نفس شكل الطاء، مع نقطة داخل المستطيل الأفقي أمام الخط الرأسي
      ctx.beginPath();
      ctx.strokeRect(x + 18, y + 65, 34, 20);
      ctx.moveTo(x + 32, y + 75);
      ctx.lineTo(x + 32, y + 22);
      ctx.stroke();

      // Dot inside horizontal rect in front of vertical line
      ctx.beginPath();
      ctx.arc(x + 43, y + 75, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'ع': {
      // مستطيل رأسي يقسمه في منتصفه خط أفقي صريح
      ctx.beginPath();
      ctx.strokeRect(x + 23, y + 30, 24, 55);
      ctx.moveTo(x + 23, y + 57.5);
      ctx.lineTo(x + 47, y + 57.5);
      ctx.stroke();
      break;
    }

    case 'غ': {
      // نفس شكل العين، مع نقطة في النصف العلوي للمستطيل الرأسي
      ctx.beginPath();
      ctx.strokeRect(x + 23, y + 30, 24, 55);
      ctx.moveTo(x + 23, y + 57.5);
      ctx.lineTo(x + 47, y + 57.5);
      ctx.stroke();

      // Dot in upper half
      ctx.beginPath();
      ctx.arc(x + 35, y + 43.5, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'ف': {
      // مربع ينطلق من منتصف قاعدته خط رأسي للأسفل، وفوق المربع نقطة واحدة
      ctx.beginPath();
      // Square
      ctx.strokeRect(x + 22, y + 35, 26, 26);
      // Vertical line from base to baseline
      ctx.moveTo(x + 35, y + 61);
      ctx.lineTo(x + 35, y + BASELINE);
      ctx.stroke();

      // 1 dot above square
      ctx.beginPath();
      ctx.arc(x + 35, y + 22, 4.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'ق': {
      // نفس شكل الفاء تماماً، ولكن فوق المربع نقطتان
      ctx.beginPath();
      // Square & vertical line down
      ctx.strokeRect(x + 22, y + 35, 26, 26);
      ctx.moveTo(x + 35, y + 61);
      ctx.lineTo(x + 35, y + BASELINE);
      ctx.stroke();

      // 2 dots above square
      ctx.beginPath();
      ctx.arc(x + 29, y + 22, 4, 0, Math.PI * 2);
      ctx.arc(x + 41, y + 22, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'ك': {
      // يُرسم مثل الرقم المطبوع '5'
      ctx.beginPath();
      // Top bar
      ctx.moveTo(x + 48, y + 28);
      ctx.lineTo(x + 22, y + 28);
      // Vertical stem down to middle
      ctx.lineTo(x + 22, y + 54);
      // Top curve transition to right
      ctx.lineTo(x + 38, y + 54);
      // Smooth bottom round loop
      ctx.bezierCurveTo(x + 52, y + 54, x + 52, y + BASELINE, x + 35, y + BASELINE);
      ctx.lineTo(x + 22, y + BASELINE);
      ctx.stroke();
      break;
    }

    case 'م': {
      // يُرسم مثل الحرف اللاتيني الصغير 'b'
      ctx.beginPath();
      // Vertical ascender stem
      ctx.moveTo(x + 22, y + 25);
      ctx.lineTo(x + 22, y + BASELINE);
      // Bottom circle on right
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 35, y + 67, 13, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }

    case 'ن': {
      // يُرسم مثل الحرف اللاتيني الكبير 'N'
      ctx.beginPath();
      // Left vertical
      ctx.moveTo(x + 22, y + BASELINE);
      ctx.lineTo(x + 22, y + 30);
      // Diagonal downward
      ctx.lineTo(x + 48, y + BASELINE);
      // Right vertical upward
      ctx.lineTo(x + 48, y + 30);
      ctx.stroke();
      break;
    }

    case 'ه': {
      // مربع مغلق يقسمه خط رأسي من المنتصف إلى نصفين متساويين
      ctx.beginPath();
      ctx.strokeRect(x + 20, y + 38, 30, 47);
      ctx.moveTo(x + 35, y + 38);
      ctx.lineTo(x + 35, y + 85);
      ctx.stroke();
      break;
    }

    case 'ة': {
      // مربع مقسوم نصفين (مثل الهاء) مع نقطتين فوقه
      ctx.beginPath();
      ctx.strokeRect(x + 20, y + 42, 30, 43);
      ctx.moveTo(x + 35, y + 42);
      ctx.lineTo(x + 35, y + 85);
      ctx.stroke();

      // 2 dots above
      ctx.beginPath();
      ctx.arc(x + 29, y + 26, 4, 0, Math.PI * 2);
      ctx.arc(x + 41, y + 26, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'و': {
      // يُرسم مثل علامة التقاطع / الحرف 'x'
      ctx.beginPath();
      ctx.moveTo(x + 20, y + 35);
      ctx.lineTo(x + 50, y + BASELINE);
      ctx.moveTo(x + 50, y + 35);
      ctx.lineTo(x + 20, y + BASELINE);
      ctx.stroke();
      break;
    }

    case 'ي': {
      // شكل زاوية 'V' مع خط أفقي مستقر تحتها كقاعدة
      ctx.beginPath();
      // V shape
      ctx.moveTo(x + 20, y + 35);
      ctx.lineTo(x + 35, y + 74);
      ctx.lineTo(x + 50, y + 35);
      // Horizontal base underneath
      ctx.moveTo(x + 18, y + BASELINE);
      ctx.lineTo(x + 52, y + BASELINE);
      ctx.stroke();
      break;
    }

    case 'ى': {
      // شكل زاوية 'V' مجردة تماماً بدون خط سفلي
      ctx.beginPath();
      ctx.moveTo(x + 20, y + 42);
      ctx.lineTo(x + 35, y + BASELINE);
      ctx.lineTo(x + 50, y + 42);
      ctx.stroke();
      break;
    }

    // Numbers 0-9 & Arabic Indic ٠-٩
    case '0':
    case '٠': {
      ctx.beginPath();
      ctx.arc(x + 35, y + 60, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case '1':
    case '١': {
      ctx.beginPath();
      ctx.moveTo(x + 35, y + 35);
      ctx.lineTo(x + 35, y + BASELINE);
      ctx.stroke();
      break;
    }
    case '2':
    case '٢': {
      ctx.beginPath();
      ctx.arc(x + 35, y + 45, 10, Math.PI, 0, false);
      ctx.lineTo(x + 25, y + BASELINE);
      ctx.lineTo(x + 45, y + BASELINE);
      ctx.stroke();
      break;
    }
    case '3':
    case '٣': {
      ctx.beginPath();
      ctx.arc(x + 35, y + 45, 9, Math.PI * 1.5, Math.PI * 0.5, false);
      ctx.arc(x + 35, y + 67, 10, Math.PI * 1.5, Math.PI * 0.5, false);
      ctx.stroke();
      break;
    }
    case '4':
    case '٤': {
      ctx.beginPath();
      ctx.moveTo(x + 42, y + 35);
      ctx.lineTo(x + 24, y + 62);
      ctx.lineTo(x + 46, y + 62);
      ctx.moveTo(x + 42, y + 35);
      ctx.lineTo(x + 42, y + BASELINE);
      ctx.stroke();
      break;
    }
    case '5':
    case '٥': {
      ctx.beginPath();
      ctx.arc(x + 35, y + 60, 14, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    case '6':
    case '٦': {
      ctx.beginPath();
      ctx.arc(x + 35, y + 68, 12, 0, Math.PI * 2);
      ctx.moveTo(x + 23, y + 68);
      ctx.lineTo(x + 45, y + 35);
      ctx.stroke();
      break;
    }
    case '7':
    case '٧': {
      ctx.beginPath();
      ctx.moveTo(x + 24, y + 38);
      ctx.lineTo(x + 35, y + BASELINE);
      ctx.lineTo(x + 46, y + 38);
      ctx.stroke();
      break;
    }
    case '8':
    case '٨': {
      ctx.beginPath();
      ctx.moveTo(x + 24, y + BASELINE);
      ctx.lineTo(x + 35, y + 38);
      ctx.lineTo(x + 46, y + BASELINE);
      ctx.stroke();
      break;
    }
    case '9':
    case '٩': {
      ctx.beginPath();
      ctx.arc(x + 35, y + 50, 12, 0, Math.PI * 2);
      ctx.moveTo(x + 47, y + 50);
      ctx.lineTo(x + 47, y + BASELINE);
      ctx.stroke();
      break;
    }

    // Common punctuation
    case '؟':
    case '?': {
      ctx.beginPath();
      ctx.arc(x + 35, y + 42, 10, 0, Math.PI, true);
      ctx.lineTo(x + 35, y + 68);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 35, y + 80, 3.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case '!':
    case '！': {
      ctx.beginPath();
      ctx.moveTo(x + 35, y + 30);
      ctx.lineTo(x + 35, y + 68);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 35, y + 80, 3.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case '.':
    case '۔': {
      ctx.beginPath();
      ctx.arc(x + 35, y + BASELINE, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case '،':
    case ',': {
      ctx.beginPath();
      ctx.arc(x + 35, y + BASELINE, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + 35, y + BASELINE);
      ctx.quadraticCurveTo(x + 30, y + BASELINE + 10, x + 25, y + BASELINE + 14);
      ctx.stroke();
      break;
    }
    case ':': {
      ctx.beginPath();
      ctx.arc(x + 35, y + 50, 3.5, 0, Math.PI * 2);
      ctx.arc(x + 35, y + 74, 3.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case '-':
    case '—':
    case 'ـ': {
      ctx.beginPath();
      ctx.moveTo(x + 18, y + 60);
      ctx.lineTo(x + 52, y + 60);
      ctx.stroke();
      break;
    }
    case '(':
    case '«': {
      ctx.beginPath();
      ctx.arc(x + 48, y + 60, 24, Math.PI * 0.7, Math.PI * 1.3, false);
      ctx.stroke();
      break;
    }
    case ')':
    case '»': {
      ctx.beginPath();
      ctx.arc(x + 22, y + 60, 24, Math.PI * 1.7, Math.PI * 0.3, false);
      ctx.stroke();
      break;
    }

    // Default Fallback: Elegant Geometric Diamond Monogram
    default: {
      if (char.trim().length > 0) {
        ctx.beginPath();
        // Outer diamond
        ctx.moveTo(x + 35, y + 36);
        ctx.lineTo(x + 52, y + 60);
        ctx.lineTo(x + 35, y + BASELINE);
        ctx.lineTo(x + 18, y + 60);
        ctx.closePath();
        ctx.stroke();
        // Inner dot
        ctx.beginPath();
        ctx.arc(x + 35, y + 60, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
  }

  ctx.restore();
}

/**
 * Generates an SVG `<g>` string for an individual glyph matching the exact same geometry
 */
export function generateGlyphSVG(
  rawChar: string,
  x: number,
  y: number,
  options: GlyphRenderOptions
): string {
  const char = normalizeChar(rawChar);
  const color = options.primaryColor;
  const strokeW = options.lineWidth;
  const dotColor = options.secondaryColor || color;
  const cx = x + CELL_W / 2;
  const cy = y + CELL_H / 2;

  let transform = '';
  if (options.isMirror || options.glyphScale !== 1) {
    const sx = (options.isMirror ? -1 : 1) * options.glyphScale;
    const sy = options.glyphScale;
    transform = `transform="translate(${cx}, ${cy}) scale(${sx}, ${sy}) translate(${-cx}, ${-cy})"`;
  }

  const baseSvg = `<g ${transform} stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" fill="none">`;
  let inner = '';

  switch (char) {
    case ' ':
      inner = `<circle cx="${x + 35}" cy="${y + BASELINE}" r="5.5" fill="${dotColor}" stroke="none" />`;
      break;
    case 'ا':
      inner = `<line x1="${x + 35}" y1="${y + 25}" x2="${x + 35}" y2="${y + BASELINE}" />
               <line x1="${x + 20}" y1="${y + BASELINE}" x2="${x + 50}" y2="${y + BASELINE}" />`;
      break;
    case 'ل':
      inner = `<polyline points="${x + 48},${y + 25} ${x + 48},${y + BASELINE} ${x + 18},${y + BASELINE}" />`;
      break;
    case 'أ':
      inner = `<line x1="${x + 35}" y1="${y + 36}" x2="${x + 35}" y2="${y + BASELINE}" />
               <line x1="${x + 20}" y1="${y + BASELINE}" x2="${x + 50}" y2="${y + BASELINE}" />
               <path d="M ${x + 31} ${y + 19} A 4.5 4.5 0 0 1 ${x + 39} ${y + 19} L ${x + 31} ${y + 28} L ${x + 39} ${y + 28}" />`;
      break;
    case 'ئ':
      inner = `<polyline points="${x + 20},${y + 44} ${x + 35},${y + BASELINE} ${x + 50},${y + 44}" />
               <path d="M ${x + 31} ${y + 19} A 4.5 4.5 0 0 1 ${x + 39} ${y + 19} L ${x + 31} ${y + 28} L ${x + 39} ${y + 28}" />`;
      break;
    case 'إ':
      inner = `<line x1="${x + 20}" y1="${y + 25}" x2="${x + 50}" y2="${y + 25}" />
               <line x1="${x + 35}" y1="${y + 25}" x2="${x + 35}" y2="${y + BASELINE}" />
               <path d="M ${x + 31} ${y + 96} A 4 4 0 0 1 ${x + 39} ${y + 96} L ${x + 31} ${y + 106} L ${x + 39} ${y + 106}" />`;
      break;
    case 'آ':
      inner = `<line x1="${x + 35}" y1="${y + 36}" x2="${x + 35}" y2="${y + BASELINE}" />
               <line x1="${x + 20}" y1="${y + BASELINE}" x2="${x + 50}" y2="${y + BASELINE}" />
               <line x1="${x + 22}" y1="${y + 18}" x2="${x + 48}" y2="${y + 18}" />
               <line x1="${x + 22}" y1="${y + 26}" x2="${x + 48}" y2="${y + 26}" />`;
      break;
    case 'ء':
      inner = `<path d="M ${x + 29} ${y + 56} A 6 6 0 0 1 ${x + 41} ${y + 56} L ${x + 29} ${y + 68} L ${x + 41} ${y + 68}" />`;
      break;
    case 'ؤ':
      inner = `<line x1="${x + 22}" y1="${y + 48}" x2="${x + 48}" y2="${y + BASELINE}" />
               <line x1="${x + 48}" y1="${y + 48}" x2="${x + 22}" y2="${y + BASELINE}" />
               <path d="M ${x + 31} ${y + 22} A 4.5 4.5 0 0 1 ${x + 39} ${y + 22} L ${x + 31} ${y + 34} L ${x + 39} ${y + 34}" />`;
      break;
    case 'ب':
      inner = `<polygon points="${x + 35},${y + 28} ${x + 18},${y + BASELINE} ${x + 52},${y + BASELINE}" />
               <line x1="${x + 35}" y1="${y + 28}" x2="${x + 35}" y2="${y + BASELINE}" />`;
      break;
    case 'ت':
      inner = `<polygon points="${x + 35},${y + 28} ${x + 18},${y + BASELINE} ${x + 52},${y + BASELINE}" />
               <line x1="${x + 29}" y1="${y + 50}" x2="${x + 29}" y2="${y + BASELINE}" />
               <line x1="${x + 41}" y1="${y + 50}" x2="${x + 41}" y2="${y + BASELINE}" />`;
      break;
    case 'ث':
      inner = `<polygon points="${x + 35},${y + 28} ${x + 18},${y + BASELINE} ${x + 52},${y + BASELINE}" />
               <line x1="${x + 26}" y1="${y + 58}" x2="${x + 26}" y2="${y + BASELINE}" />
               <line x1="${x + 35}" y1="${y + 28}" x2="${x + 35}" y2="${y + BASELINE}" />
               <line x1="${x + 44}" y1="${y + 58}" x2="${x + 44}" y2="${y + BASELINE}" />`;
      break;
    case 'ح':
      inner = `<polyline points="${x + 20},${y + 30} ${x + 50},${y + 30} ${x + 50},${y + BASELINE}" />`;
      break;
    case 'ج':
      inner = `<polyline points="${x + 20},${y + 30} ${x + 50},${y + 30} ${x + 50},${y + BASELINE}" />
               <circle cx="${x + 35}" cy="${y + 55}" r="4.5" fill="${dotColor}" stroke="none" />`;
      break;
    case 'خ':
      inner = `<polyline points="${x + 20},${y + 36} ${x + 50},${y + 36} ${x + 50},${y + BASELINE}" />
               <circle cx="${x + 35}" cy="${y + 18}" r="4.5" fill="${dotColor}" stroke="none" />`;
      break;
    case 'د':
      inner = `<line x1="${x + 20}" y1="${y + 42}" x2="${x + 55}" y2="${y + 42}" />
               <path d="M ${x + 20} ${y + 42} C ${x + 22} ${y + 60}, ${x + 38} ${y + 68}, ${x + 38} ${y + 78} C ${x + 38} ${y + 90}, ${x + 20} ${y + 90}, ${x + 16} ${y + 84}" />`;
      break;
    case 'ذ':
      inner = `<line x1="${x + 20}" y1="${y + 42}" x2="${x + 55}" y2="${y + 42}" />
               <path d="M ${x + 20} ${y + 42} C ${x + 22} ${y + 60}, ${x + 38} ${y + 68}, ${x + 38} ${y + 78} C ${x + 38} ${y + 90}, ${x + 20} ${y + 90}, ${x + 16} ${y + 84}" />
               <circle cx="${x + 20}" cy="${y + 24}" r="3.2" fill="${dotColor}" stroke="none" />`;
      break;
    case 'ر':
      inner = `<line x1="${x + 18}" y1="${y + 102}" x2="${x + 52}" y2="${y + 102}" />`;
      break;
    case 'ز':
      inner = `<line x1="${x + 18}" y1="${y + 102}" x2="${x + 52}" y2="${y + 102}" />
               <circle cx="${x + 35}" cy="${y + BASELINE}" r="4.5" fill="${dotColor}" stroke="none" />`;
      break;
    case 'س':
      inner = `<line x1="${x + 18}" y1="${y + BASELINE}" x2="${x + 52}" y2="${y + BASELINE}" />
               <line x1="${x + 18}" y1="${y + BASELINE}" x2="${x + 18}" y2="${y + 56}" />
               <line x1="${x + 35}" y1="${y + BASELINE}" x2="${x + 35}" y2="${y + 56}" />
               <line x1="${x + 52}" y1="${y + BASELINE}" x2="${x + 52}" y2="${y + 56}" />
               <line x1="${x + 18}" y1="${y + 22}" x2="${x + 52}" y2="${y + 22}" />
               <line x1="${x + 18}" y1="${y + 33}" x2="${x + 52}" y2="${y + 33}" />
               <line x1="${x + 18}" y1="${y + 44}" x2="${x + 52}" y2="${y + 44}" />`;
      break;
    case 'ش':
      inner = `<line x1="${x + 18}" y1="${y + BASELINE}" x2="${x + 52}" y2="${y + BASELINE}" />
               <line x1="${x + 18}" y1="${y + BASELINE}" x2="${x + 18}" y2="${y + 56}" />
               <line x1="${x + 35}" y1="${y + BASELINE}" x2="${x + 35}" y2="${y + 56}" />
               <line x1="${x + 52}" y1="${y + BASELINE}" x2="${x + 52}" y2="${y + 56}" />
               <line x1="${x + 18}" y1="${y + 17}" x2="${x + 52}" y2="${y + 17}" />
               <line x1="${x + 18}" y1="${y + 26}" x2="${x + 52}" y2="${y + 26}" />
               <line x1="${x + 18}" y1="${y + 35}" x2="${x + 52}" y2="${y + 35}" />
               <line x1="${x + 18}" y1="${y + 44}" x2="${x + 52}" y2="${y + 44}" />`;
      break;
    case 'ص':
      inner = `<rect x="${x + 15}" y="${y + 50}" width="40" height="35" />
               <rect x="${x + 28}" y="${y + 68}" width="14" height="35" />`;
      break;
    case 'ض':
      inner = `<rect x="${x + 15}" y="${y + 50}" width="40" height="35" />
               <rect x="${x + 28}" y="${y + 68}" width="14" height="35" />
               <circle cx="${x + 35}" cy="${y + 60}" r="4" fill="${dotColor}" stroke="none" />`;
      break;
    case 'ط':
      inner = `<rect x="${x + 18}" y="${y + 65}" width="34" height="20" />
               <line x1="${x + 35}" y1="${y + 75}" x2="${x + 35}" y2="${y + 22}" />`;
      break;
    case 'ظ':
      inner = `<rect x="${x + 18}" y="${y + 65}" width="34" height="20" />
               <line x1="${x + 32}" y1="${y + 75}" x2="${x + 32}" y2="${y + 22}" />
               <circle cx="${x + 43}" cy="${y + 75}" r="4" fill="${dotColor}" stroke="none" />`;
      break;
    case 'ع':
      inner = `<rect x="${x + 23}" y="${y + 30}" width="24" height="55" />
               <line x1="${x + 23}" y1="${y + 57.5}" x2="${x + 47}" y2="${y + 57.5}" />`;
      break;
    case 'غ':
      inner = `<rect x="${x + 23}" y="${y + 30}" width="24" height="55" />
               <line x1="${x + 23}" y1="${y + 57.5}" x2="${x + 47}" y2="${y + 57.5}" />
               <circle cx="${x + 35}" cy="${y + 43.5}" r="4" fill="${dotColor}" stroke="none" />`;
      break;
    case 'ف':
      inner = `<rect x="${x + 22}" y="${y + 35}" width="26" height="26" />
               <line x1="${x + 35}" y1="${y + 61}" x2="${x + 35}" y2="${y + BASELINE}" />
               <circle cx="${x + 35}" cy="${y + 22}" r="4.5" fill="${dotColor}" stroke="none" />`;
      break;
    case 'ق':
      inner = `<rect x="${x + 22}" y="${y + 35}" width="26" height="26" />
               <line x1="${x + 35}" y1="${y + 61}" x2="${x + 35}" y2="${y + BASELINE}" />
               <circle cx="${x + 29}" cy="${y + 22}" r="4" fill="${dotColor}" stroke="none" />
               <circle cx="${x + 41}" cy="${y + 22}" r="4" fill="${dotColor}" stroke="none" />`;
      break;
    case 'ك':
      inner = `<path d="M ${x + 48} ${y + 28} L ${x + 22} ${y + 28} L ${x + 22} ${y + 54} L ${x + 38} ${y + 54} C ${x + 52} ${y + 54}, ${x + 52} ${y + BASELINE}, ${x + 35} ${y + BASELINE} L ${x + 22} ${y + BASELINE}" />`;
      break;
    case 'م':
      inner = `<line x1="${x + 22}" y1="${y + 25}" x2="${x + 22}" y2="${y + BASELINE}" />
               <circle cx="${x + 35}" cy="${y + 67}" r="13" />`;
      break;
    case 'ن':
      inner = `<polyline points="${x + 22},${y + BASELINE} ${x + 22},${y + 30} ${x + 48},${y + BASELINE} ${x + 48},${y + 30}" />`;
      break;
    case 'ه':
      inner = `<rect x="${x + 20}" y="${y + 38}" width="30" height="47" />
               <line x1="${x + 35}" y1="${y + 38}" x2="${x + 35}" y2="${y + 85}" />`;
      break;
    case 'ة':
      inner = `<rect x="${x + 20}" y="${y + 42}" width="30" height="43" />
               <line x1="${x + 35}" y1="${y + 42}" x2="${x + 35}" y2="${y + 85}" />
               <circle cx="${x + 29}" cy="${y + 26}" r="4" fill="${dotColor}" stroke="none" />
               <circle cx="${x + 41}" cy="${y + 26}" r="4" fill="${dotColor}" stroke="none" />`;
      break;
    case 'و':
      inner = `<line x1="${x + 20}" y1="${y + 35}" x2="${x + 50}" y2="${y + BASELINE}" />
               <line x1="${x + 50}" y1="${y + 35}" x2="${x + 20}" y2="${y + BASELINE}" />`;
      break;
    case 'ي':
      inner = `<polyline points="${x + 20},${y + 35} ${x + 35},${y + 74} ${x + 50},${y + 35}" />
               <line x1="${x + 18}" y1="${y + BASELINE}" x2="${x + 52}" y2="${y + BASELINE}" />`;
      break;
    case 'ى':
      inner = `<polyline points="${x + 20},${y + 42} ${x + 35},${y + BASELINE} ${x + 50},${y + 42}" />`;
      break;
    default:
      if (char.trim().length > 0) {
        inner = `<polygon points="${x + 35},${y + 36} ${x + 52},${y + 60} ${x + 35},${y + BASELINE} ${x + 18},${y + 60}" />
                 <circle cx="${x + 35}" cy="${y + 60}" r="3.5" fill="${dotColor}" stroke="none" />`;
      }
      break;
  }

  return `${baseSvg}${inner}</g>`;
}

/**
 * Returns textual rune mapping for text clipboard copy
 */
export function getRuneEncodedText(text: string): string {
  const chars = Array.from(text);
  return chars
    .map((c) => {
      if (c === '\n') return '\n';
      const spec = GLYPH_SPECS[c] || GLYPH_SPECS[normalizeChar(c)];
      if (spec) {
        return spec.runeRepresentation;
      }
      if (c === ' ') return '•';
      return `[${c}]`;
    })
    .join(' ');
}
