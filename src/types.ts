export type ThemePresetId = 'gold' | 'emerald' | 'amethyst' | 'crimson' | 'cyan' | 'custom';

export interface ThemeConfig {
  id: ThemePresetId;
  nameAr: string;
  primary: string;       // Main stroke color
  secondary: string;     // Secondary details & dots
  glow: string;          // Glow color with alpha
  accent: string;        // Accent badge/ui color
  bgGradient: string;    // App background accent
  badgeColor: string;
}

export type CanvasBgType = 'dark' | 'abyss' | 'midnight' | 'parchment' | 'cosmic';

export type ShadowStyle = 'soft' | 'hard' | 'none';

export type TextAlignMode = 'right' | 'center' | 'justify';

export interface EngineSettings {
  lineWidth: number;          // 1.0 - 5.0
  glowIntensity: number;      // 0 - 20
  shadowStyle: ShadowStyle;   // 'soft' | 'hard' | 'none'
  letterSpacing: number;      // 0 - 40
  glyphScale: number;         // 0.6 - 1.6
  lineHeight: number;         // 1.0 - 2.5
  isMirrorMode: boolean;      // Flip horizontally
  textAlign: TextAlignMode;   // 'right' | 'center' | 'justify'
  isVerticalMode: boolean;    // Vertical ritual script
  canvasBg: CanvasBgType;     // Background style
  showWatermark: boolean;     // "أسطوري ✦"
  customColor: string;        // Hex for custom theme
}

export interface GlyphRenderOptions {
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
  lineWidth: number;
  glowIntensity: number;
  shadowStyle: ShadowStyle;
  glyphScale: number;
  isMirror: boolean;
  strokeProgress?: number; // 0 to 1 for progressive draw
}

export interface HistoryItem {
  id: string;
  text: string;
  timestamp: number;
  previewSummary: string;
  themeId: ThemePresetId;
}

export interface GlyphSpec {
  char: string;
  nameAr: string;
  category: 'letter' | 'hamza' | 'space' | 'punct' | 'number' | 'special';
  descriptionAr: string;
  runeRepresentation: string;
}
