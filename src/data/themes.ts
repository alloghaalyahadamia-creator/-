import { ThemeConfig, ThemePresetId } from '../types';

export const THEME_PRESETS: Record<Exclude<ThemePresetId, 'custom'>, ThemeConfig> = {
  gold: {
    id: 'gold',
    nameAr: 'الذهبي الأسطوري',
    primary: '#f59e0b',
    secondary: '#fbbf24',
    glow: 'rgba(245, 158, 11, 0.65)',
    accent: '#d97706',
    bgGradient: 'from-amber-950/20 via-zinc-950/50 to-amber-950/20',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  },
  emerald: {
    id: 'emerald',
    nameAr: 'الزمردي السحري',
    primary: '#10b981',
    secondary: '#34d399',
    glow: 'rgba(16, 185, 129, 0.65)',
    accent: '#059669',
    bgGradient: 'from-emerald-950/20 via-zinc-950/50 to-emerald-950/20',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  },
  amethyst: {
    id: 'amethyst',
    nameAr: 'العنبوري الملكي',
    primary: '#a855f7',
    secondary: '#c084fc',
    glow: 'rgba(168, 85, 247, 0.65)',
    accent: '#7e22ce',
    bgGradient: 'from-purple-950/20 via-zinc-950/50 to-purple-950/20',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
  },
  crimson: {
    id: 'crimson',
    nameAr: 'الوردي القرمزي',
    primary: '#f43f5e',
    secondary: '#fb7185',
    glow: 'rgba(244, 63, 94, 0.65)',
    accent: '#be123c',
    bgGradient: 'from-rose-950/20 via-zinc-950/50 to-rose-950/20',
    badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
  },
  cyan: {
    id: 'cyan',
    nameAr: 'السماوي الكوني',
    primary: '#06b6d4',
    secondary: '#38bdf8',
    glow: 'rgba(6, 182, 212, 0.65)',
    accent: '#0284c7',
    bgGradient: 'from-cyan-950/20 via-zinc-950/50 to-cyan-950/20',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
  },
};

/**
 * Calculates a full dynamic ThemeConfig from any custom HEX color
 */
export function getCustomTheme(hexColor: string): ThemeConfig {
  const hex = hexColor.startsWith('#') ? hexColor : `#${hexColor}`;
  // Extract RGB
  const r = parseInt(hex.slice(1, 3) || 'ff', 16);
  const g = parseInt(hex.slice(3, 5) || 'd7', 16);
  const b = parseInt(hex.slice(5, 7) || '00', 16);

  const glow = `rgba(${r}, ${g}, ${b}, 0.65)`;

  return {
    id: 'custom',
    nameAr: 'لونك المخصص',
    primary: hex,
    secondary: hex,
    glow,
    accent: hex,
    bgGradient: 'from-zinc-950/50 via-zinc-950/70 to-zinc-950/50',
    badgeColor: 'bg-white/10 text-white border-white/20',
  };
}

export function resolveTheme(themeId: ThemePresetId, customHex: string): ThemeConfig {
  if (themeId === 'custom' || !(themeId in THEME_PRESETS)) {
    return getCustomTheme(customHex || '#f59e0b');
  }
  return THEME_PRESETS[themeId];
}
