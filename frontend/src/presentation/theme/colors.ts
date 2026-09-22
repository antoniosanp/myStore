/**
 * Semantic Color Schema with dedicated named tokens for Light and Dark modes.
 * Every color has a purpose and semantic name.
 */

export interface ColorPalette {
  // Canvases and surfaces
  canvasBackground: string;
  surfaceCard: string;
  surfaceRaised: string;
  surfaceSubtle: string;
  surfaceHover: string;

  // Typography
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  // Borders and dividers
  borderDefault: string;
  borderSubtle: string;
  borderFocus: string;

  // Primary Brand Colors
  brandPrimary: string;
  brandPrimaryHover: string;
  brandPrimaryActive: string;
  brandPrimarySubtle: string;
  brandPrimaryContrast: string;

  // Secondary Colors
  brandSecondary: string;
  brandSecondaryHover: string;
  brandSecondarySubtle: string;
  brandSecondaryContrast: string;

  // Semantic Status: Success
  statusSuccess: string;
  statusSuccessSubtle: string;
  statusSuccessText: string;

  // Semantic Status: Warning
  statusWarning: string;
  statusWarningSubtle: string;
  statusWarningText: string;

  // Semantic Status: Danger / Error
  statusDanger: string;
  statusDangerHover: string;
  statusDangerSubtle: string;
  statusDangerText: string;

  // Semantic Status: Information
  statusInfo: string;
  statusInfoSubtle: string;
  statusInfoText: string;

  // Accent / Price highlight
  accentHighlight: string;
  accentHighlightSubtle: string;
  accentHighlightText: string;

  // Shadows
  shadowCard: string;
  shadowModal: string;
}

export const lightColors: ColorPalette = {
  canvasBackground: '#F8FAFC',    // Cool gray 50
  surfaceCard: '#FFFFFF',         // Pure white
  surfaceRaised: '#FFFFFF',       // Modals & elevated dropdowns
  surfaceSubtle: '#F1F5F9',       // Cool slate 100 for inputs & sub-sections
  surfaceHover: '#E2E8F0',        // Cool slate 200

  textPrimary: '#0F172A',         // Slate 900
  textSecondary: '#475569',       // Slate 600
  textMuted: '#94A3B8',           // Slate 400
  textInverse: '#FFFFFF',         // White text on dark elements

  borderDefault: '#E2E8F0',       // Slate 200
  borderSubtle: '#F1F5F9',        // Slate 100
  borderFocus: '#2563EB',         // Blue 600

  brandPrimary: '#2563EB',        // Blue 600
  brandPrimaryHover: '#1D4ED8',   // Blue 700
  brandPrimaryActive: '#1E40AF',  // Blue 800
  brandPrimarySubtle: '#EFF6FF',  // Blue 50
  brandPrimaryContrast: '#FFFFFF',// White text

  brandSecondary: '#475569',      // Slate 600
  brandSecondaryHover: '#334155',  // Slate 700
  brandSecondarySubtle: '#F8FAFC', // Slate 50
  brandSecondaryContrast: '#FFFFFF',

  statusSuccess: '#10B981',       // Emerald 500
  statusSuccessSubtle: '#ECFDF5', // Emerald 50
  statusSuccessText: '#065F46',   // Emerald 800

  statusWarning: '#F59E0B',       // Amber 500
  statusWarningSubtle: '#FFFBEB', // Amber 50
  statusWarningText: '#92400E',   // Amber 800

  statusDanger: '#EF4444',        // Red 500
  statusDangerHover: '#DC2626',   // Red 600
  statusDangerSubtle: '#FEF2F2',  // Red 50
  statusDangerText: '#991B1B',    // Red 800

  statusInfo: '#3B82F6',          // Blue 500
  statusInfoSubtle: '#EFF6FF',    // Blue 50
  statusInfoText: '#1E40AF',      // Blue 800

  accentHighlight: '#D97706',     // Amber 600 for price tags
  accentHighlightSubtle: '#FEF3C7',// Amber 100
  accentHighlightText: '#78350F', // Amber 900

  shadowCard: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  shadowModal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
};

export const darkColors: ColorPalette = {
  canvasBackground: '#0B0F19',    // Deep dark space
  surfaceCard: '#151D2A',         // Rich navy surface
  surfaceRaised: '#1E293B',       // Slate 800 for modals
  surfaceSubtle: '#1F2937',       // Gray 800 for inputs
  surfaceHover: '#334155',        // Slate 700

  textPrimary: '#F8FAFC',         // Slate 50
  textSecondary: '#94A3B8',       // Slate 400
  textMuted: '#64748B',           // Slate 500
  textInverse: '#0F172A',         // Slate 900

  borderDefault: '#293548',       // Dark blue-slate border
  borderSubtle: '#1E293B',        // Slate 800
  borderFocus: '#60A5FA',         // Blue 400

  brandPrimary: '#3B82F6',        // Blue 500
  brandPrimaryHover: '#2563EB',   // Blue 600
  brandPrimaryActive: '#1D4ED8',  // Blue 700
  brandPrimarySubtle: 'rgba(59, 130, 246, 0.15)',
  brandPrimaryContrast: '#FFFFFF',

  brandSecondary: '#94A3B8',      // Slate 400
  brandSecondaryHover: '#CBD5E1', // Slate 300
  brandSecondarySubtle: '#1E293B',
  brandSecondaryContrast: '#0F172A',

  statusSuccess: '#34D399',       // Emerald 400
  statusSuccessSubtle: 'rgba(16, 185, 129, 0.15)',
  statusSuccessText: '#A7F3D0',   // Emerald 200

  statusWarning: '#FBBF24',       // Amber 400
  statusWarningSubtle: 'rgba(245, 158, 11, 0.15)',
  statusWarningText: '#FDE68A',   // Amber 200

  statusDanger: '#F87171',        // Red 400
  statusDangerHover: '#EF4444',   // Red 500
  statusDangerSubtle: 'rgba(239, 68, 68, 0.15)',
  statusDangerText: '#FECACA',    // Red 200

  statusInfo: '#60A5FA',          // Blue 400
  statusInfoSubtle: 'rgba(59, 130, 246, 0.15)',
  statusInfoText: '#BFDBFE',      // Blue 200

  accentHighlight: '#F59E0B',     // Amber 500
  accentHighlightSubtle: 'rgba(245, 158, 11, 0.2)',
  accentHighlightText: '#FDE68A',

  shadowCard: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
  shadowModal: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
};

export type ThemeMode = 'light' | 'dark';

export function getColorsForTheme(theme: ThemeMode): ColorPalette {
  return theme === 'dark' ? darkColors : lightColors;
}
