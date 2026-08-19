import { EngineSettings, GlyphRenderOptions, ThemeConfig } from '../types';
import { CELL_H, CELL_W, CHAR_GAP, drawGlyph, generateGlyphSVG, sanitizeArabicText } from './glyphDictionary';
import { embedPngMetadata } from './pngMetadata';

export interface LayoutGlyph {
  char: string;
  x: number;
  y: number;
  index: number;
  lineIndex: number;
}

export interface CalculatedLayout {
  width: number;
  height: number;
  glyphs: LayoutGlyph[];
  linesCount: number;
}

export const PADDING_X = 40;
export const PADDING_Y = 40;

/**
 * Smart automatic line wrapping for comfortable multi-line display
 * Wraps sentences exceeding max words (5-6 words) or character length to new lines
 */
export function autoWrapText(
  text: string,
  maxWordsPerLine: number = 6,
  maxCharsPerLine: number = 26
): string[] {
  const inputLines = text.split('\n');
  const resultLines: string[] = [];

  inputLines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      resultLines.push('');
      return;
    }

    const words = line.split(/\s+/).filter(Boolean);
    let currentWords: string[] = [];
    let currentCharsCount = 0;

    words.forEach((rawWord) => {
      // Force break continuous words that exceed maxCharsPerLine
      const rawChars = Array.from(rawWord);
      const subWords: string[] = [];
      if (rawChars.length > maxCharsPerLine) {
        for (let i = 0; i < rawChars.length; i += maxCharsPerLine) {
          subWords.push(rawChars.slice(i, i + maxCharsPerLine).join(''));
        }
      } else {
        subWords.push(rawWord);
      }

      subWords.forEach((word) => {
        const wordCharsLen = Array.from(word).length;

        const wouldExceedWords = currentWords.length >= maxWordsPerLine;
        const wouldExceedChars =
          currentWords.length > 0 &&
          currentCharsCount + 1 + wordCharsLen > maxCharsPerLine;

        if (wouldExceedWords || wouldExceedChars) {
          resultLines.push(currentWords.join(' '));
          currentWords = [word];
          currentCharsCount = wordCharsLen;
        } else {
          currentWords.push(word);
          currentCharsCount += (currentWords.length === 1 ? 0 : 1) + wordCharsLen;
        }
      });
    });

    if (currentWords.length > 0) {
      resultLines.push(currentWords.join(' '));
    }
  });

  return resultLines.length > 0 ? resultLines : [' '];
}

/**
 * Calculates glyph coordinates for standard (RTL horizontal) or ritual vertical layout
 */
export function calculateTextLayout(
  text: string,
  settings: EngineSettings,
  containerMinWidth: number = 650
): CalculatedLayout {
  // Sanitize text: remove tashkeel diacritics and tatweel
  const sanitized = sanitizeArabicText(text || ' ');
  const letterSpace = settings.letterSpacing;
  const effectiveCellW = CELL_W + letterSpace;
  const effectiveLineH = CELL_H * settings.lineHeight;

  const glyphs: LayoutGlyph[] = [];
  let globalIndex = 0;

  if (settings.isVerticalMode) {
    // Vertical ritual script mode:
    // Columns flow Right-To-Left. Within each column, characters flow Top-to-Bottom.
    const rawLines = sanitized.split('\n');
    const columns = rawLines.length > 0 ? rawLines : [' '];
    const maxRows = Math.max(...columns.map((col) => Array.from(col).length), 1);

    const contentWidth = Math.max(columns.length * (CELL_W + letterSpace + 20), containerMinWidth);
    const contentHeight = Math.max(maxRows * (CELL_H * 0.85) + PADDING_Y * 2, 350);

    columns.forEach((colStr, colIdx) => {
      // Columns from right to left
      const colX = contentWidth - PADDING_X - (colIdx + 1) * (CELL_W + letterSpace + 20);
      const chars = Array.from(colStr);

      chars.forEach((char, rowIdx) => {
        const glyphY = PADDING_Y + rowIdx * (CELL_H * 0.85);
        glyphs.push({
          char,
          x: colX,
          y: glyphY,
          index: globalIndex++,
          lineIndex: colIdx,
        });
      });
    });

    return {
      width: contentWidth + PADDING_X,
      height: contentHeight,
      glyphs,
      linesCount: columns.length,
    };
  }

  // Standard RTL Horizontal Multi-Line Layout with automatic line wrapping
  const lines = autoWrapText(sanitized, 6, 26);

  let maxCharsInLine = 0;
  lines.forEach((line) => {
    const charsLen = Array.from(line).length;
    if (charsLen > maxCharsInLine) maxCharsInLine = charsLen;
  });

  const maxContentWidth = maxCharsInLine * effectiveCellW;
  const totalWidth = Math.max(maxContentWidth + PADDING_X * 2, containerMinWidth);
  const totalHeight = Math.max(lines.length * effectiveLineH + PADDING_Y * 2, 220);

  lines.forEach((line, lineIdx) => {
    const chars = Array.from(line);
    const charsLen = chars.length;
    const lineWidth = charsLen * effectiveCellW;
    const lineY = PADDING_Y + lineIdx * effectiveLineH;

    // StartX for the first glyph (rightmost) in standard RTL
    // The first glyph is drawn at: totalWidth - PADDING_X - effectiveCellW
    let startX = totalWidth - PADDING_X - effectiveCellW;

    if (settings.textAlign === 'center') {
      const lineRightEdge = (totalWidth + lineWidth) / 2;
      startX = lineRightEdge - effectiveCellW;
    } else if (settings.textAlign === 'justify' && charsLen > 1) {
      startX = totalWidth - PADDING_X - CELL_W;
    }

    chars.forEach((char, charIdx) => {
      let glyphX = startX - charIdx * effectiveCellW;

      if (settings.textAlign === 'justify' && charsLen > 1) {
        const availableWidth = totalWidth - PADDING_X * 2 - CELL_W;
        const extraGap = (availableWidth - (charsLen - 1) * CELL_W) / (charsLen - 1);
        glyphX = totalWidth - PADDING_X - CELL_W - charIdx * (CELL_W + Math.max(0, extraGap));
      }

      glyphs.push({
        char,
        x: glyphX,
        y: lineY,
        index: globalIndex++,
        lineIndex: lineIdx,
      });
    });
  });

  return {
    width: totalWidth,
    height: totalHeight,
    glyphs,
    linesCount: lines.length,
  };
}

/**
 * Renders decorative themed canvas background
 */
export function drawCanvasBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  theme: ThemeConfig,
  bgType: EngineSettings['canvasBg']
) {
  ctx.save();

  switch (bgType) {
    case 'dark': {
      // Obsidian Dark with radial subtle spotlight
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      grad.addColorStop(0, '#100f1a');
      grad.addColorStop(1, '#06050a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Fine geometric grid overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      break;
    }

    case 'abyss': {
      // Pure deep abyss with geometric sacred circles
      ctx.fillStyle = '#020204';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      const cx = width / 2;
      const cy = height / 2;
      [80, 160, 260, 380].forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });
      break;
    }

    case 'midnight': {
      // Deep cosmic sapphire
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#0a1024');
      grad.addColorStop(0.5, '#050917');
      grad.addColorStop(1, '#02040a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle cyan/blue glow clouds
      const glowGrad = ctx.createRadialGradient(width * 0.7, height * 0.3, 20, width * 0.7, height * 0.3, 300);
      glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
      glowGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);
      break;
    }

    case 'parchment': {
      // Ancient antique dark manuscript parchment
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#1c1610');
      grad.addColorStop(0.5, '#150f0a');
      grad.addColorStop(1, '#0c0906');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Ancient horizontal ruling lines
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.06)';
      ctx.lineWidth = 1;
      for (let y = 40; y < height; y += 45) {
        ctx.beginPath();
        ctx.moveTo(20, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
      }

      // Ornate inner parchment border
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.2)';
      ctx.strokeRect(12, 12, width - 24, height - 24);
      break;
    }

    case 'cosmic': {
      // Cosmic space with sparkling procedural stars
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        30,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      grad.addColorStop(0, '#160c28');
      grad.addColorStop(0.6, '#090514');
      grad.addColorStop(1, '#020106');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      for (let i = 0; i < 45; i++) {
        const starX = (Math.sin(i * 997) * 0.5 + 0.5) * width;
        const starY = (Math.cos(i * 613) * 0.5 + 0.5) * height;
        const radius = (i % 3 === 0 ? 1.5 : 0.8);
        ctx.beginPath();
        ctx.arc(starX, starY, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
  }

  // Subtle border glow
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, width - 1, height - 1);

  // Corner decorative diamond marks (✦ / ◇)
  ctx.fillStyle = theme.primary;
  const pad = 14;
  [[pad, pad], [width - pad, pad], [pad, height - pad], [width - pad, height - pad]].forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy - 5);
    ctx.lineTo(cx + 5, cy);
    ctx.lineTo(cx, cy + 5);
    ctx.lineTo(cx - 5, cy);
    ctx.closePath();
    ctx.fill();
  });

  ctx.restore();
}

/**
 * Draws watermark branding
 */
export function drawWatermark(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  theme: ThemeConfig
) {
  ctx.save();
  ctx.font = '500 13px Tajawal, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText('شَفْرَة اليحآدمية ✦', 25, height - 15);

  ctx.textAlign = 'right';
  ctx.font = '600 11px Cinzel, serif';
  ctx.fillStyle = theme.primary;
  ctx.fillText("THE YAH'ADAMIYA CIPHER ✦", width - 25, height - 15);
  ctx.restore();
}

/**
 * Master Render function on any 2D canvas
 */
export function renderFullCanvas(
  ctx: CanvasRenderingContext2D,
  text: string,
  settings: EngineSettings,
  theme: ThemeConfig,
  visibleGlyphCount?: number, // For reveal animation
  cursorIndex?: number
) {
  const layout = calculateTextLayout(text, settings);

  // Set real canvas dimensions
  ctx.canvas.width = layout.width;
  ctx.canvas.height = layout.height;

  // Clear & Draw Background
  drawCanvasBackground(ctx, layout.width, layout.height, theme, settings.canvasBg);

  const glyphOptions: GlyphRenderOptions = {
    primaryColor: theme.primary,
    secondaryColor: theme.secondary,
    glowColor: theme.glow,
    lineWidth: settings.lineWidth,
    glowIntensity: settings.glowIntensity,
    shadowStyle: settings.shadowStyle,
    glyphScale: settings.glyphScale,
    isMirror: settings.isMirrorMode,
  };

  const limit = visibleGlyphCount !== undefined ? visibleGlyphCount : layout.glyphs.length;

  for (let i = 0; i < limit && i < layout.glyphs.length; i++) {
    const g = layout.glyphs[i];
    drawGlyph(ctx, g.char, g.x, g.y, glyphOptions);

    // Glowing animation cursor on the active revealing glyph
    if (cursorIndex !== undefined && i === cursorIndex) {
      ctx.save();
      ctx.strokeStyle = theme.accent || '#38bdf8';
      ctx.shadowColor = theme.glow;
      ctx.shadowBlur = 15;
      ctx.lineWidth = 2;
      ctx.strokeRect(g.x + 5, g.y + 10, CELL_W - 10, CELL_H - 20);
      ctx.restore();
    }
  }

  // Draw Watermark if enabled
  if (settings.showWatermark) {
    drawWatermark(ctx, layout.width, layout.height, theme);
  }
}

/**
 * Exports ultra-sharp High Definition 4X PNG image
 */
export async function exportHDCanvasPNG(
  text: string,
  settings: EngineSettings,
  theme: ThemeConfig,
  scaleFactor: number = 4
): Promise<string> {
  const layout = calculateTextLayout(text, settings);
  const offscreen = document.createElement('canvas');
  offscreen.width = layout.width * scaleFactor;
  offscreen.height = layout.height * scaleFactor;

  const ctx = offscreen.getContext('2d');
  if (!ctx) throw new Error('Could not create offscreen canvas');

  ctx.scale(scaleFactor, scaleFactor);

  drawCanvasBackground(ctx, layout.width, layout.height, theme, settings.canvasBg);

  const glyphOptions: GlyphRenderOptions = {
    primaryColor: theme.primary,
    secondaryColor: theme.secondary,
    glowColor: theme.glow,
    lineWidth: settings.lineWidth,
    glowIntensity: settings.glowIntensity,
    shadowStyle: settings.shadowStyle,
    glyphScale: settings.glyphScale,
    isMirror: settings.isMirrorMode,
  };

  layout.glyphs.forEach((g) => {
    drawGlyph(ctx, g.char, g.x, g.y, glyphOptions);
  });

  if (settings.showWatermark) {
    drawWatermark(ctx, layout.width, layout.height, theme);
  }

  const rawDataUrl = offscreen.toDataURL('image/png', 1.0);
  // Losslessly embed the original Arabic text into the PNG tEXt metadata chunk
  return embedPngMetadata(rawDataUrl, text, {
    themeId: theme.id,
    themeName: theme.nameAr,
  });
}

/**
 * Generates high-fidelity standalone SVG XML
 */
export function generateFullSVG(
  text: string,
  settings: EngineSettings,
  theme: ThemeConfig
): string {
  const layout = calculateTextLayout(text, settings);
  const w = layout.width;
  const h = layout.height;

  const glyphOptions: GlyphRenderOptions = {
    primaryColor: theme.primary,
    secondaryColor: theme.secondary,
    glowColor: theme.glow,
    lineWidth: settings.lineWidth,
    glowIntensity: settings.glowIntensity,
    shadowStyle: settings.shadowStyle,
    glyphScale: settings.glyphScale,
    isMirror: settings.isMirrorMode,
  };

  // Background color mapping
  const bgColors: Record<string, string> = {
    dark: '#08070d',
    abyss: '#020204',
    midnight: '#070c1c',
    parchment: '#17110c',
    cosmic: '#0a0614',
  };
  const bgColor = bgColors[settings.canvasBg] || '#08070d';

  const glyphsSvg = layout.glyphs
    .map((g) => generateGlyphSVG(g.char, g.x, g.y, glyphOptions))
    .join('\n');

  const watermarkSvg = settings.showWatermark
    ? `<text x="25" y="${h - 15}" font-family="sans-serif" font-size="12" fill="rgba(255,255,255,0.4)">شَفْرَة اليحآدمية ✦</text>
       <text x="${w - 25}" y="${h - 15}" text-anchor="end" font-family="serif" font-size="11" fill="${theme.primary}">THE YAH'ADAMIYA CIPHER ✦</text>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <style>
      .bg-rect { fill: ${bgColor}; }
    </style>
  </defs>
  <rect class="bg-rect" width="${w}" height="${h}" />
  <rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
  ${glyphsSvg}
  ${watermarkSvg}
</svg>`;
}
