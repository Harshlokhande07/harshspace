import { create } from 'zustand';
import { detectInitialQuality } from '../data/performance';

export type GraphicsQuality = 'low' | 'medium' | 'high';

export interface GraphicsSettings {
  quality: GraphicsQuality;
  isAuto: boolean;
  userSetManual: boolean;
  bloom: boolean;
  ao: boolean;
  shadows: boolean;
  shadowMapSize: number;
  pixelRatio: number;
}

interface GraphicsState extends GraphicsSettings {
  setQuality: (quality: GraphicsQuality) => void;
  setAutoQuality: (isAuto: boolean) => void;
  stepDownQuality: () => void;
  stepUpQuality: () => void;
}

const QUALITY_PRESETS: Record<GraphicsQuality, Omit<GraphicsSettings, 'isAuto' | 'userSetManual'>> = {
  low: {
    quality: 'low',
    bloom: false,
    ao: false,
    shadows: false,
    shadowMapSize: 512,
    pixelRatio: 1.0,
  },
  medium: {
    quality: 'medium',
    bloom: true,
    ao: false,
    shadows: true,
    shadowMapSize: 1024,
    pixelRatio: 1.25,
  },
  high: {
    quality: 'high',
    bloom: true,
    ao: true,
    shadows: true,
    shadowMapSize: 1024,
    pixelRatio: 1.5,
  },
};

const initialQuality = detectInitialQuality();

export const useGraphicsStore = create<GraphicsState>((set, get) => ({
  ...QUALITY_PRESETS[initialQuality],
  isAuto: true,
  userSetManual: false,

  setQuality: (quality) =>
    set(() => ({
      ...QUALITY_PRESETS[quality],
      isAuto: false,
      userSetManual: true,
    })),

  setAutoQuality: (isAuto) =>
    set(() => ({
      isAuto,
      userSetManual: !isAuto,
    })),

  stepDownQuality: () => {
    const { quality, userSetManual } = get();
    if (userSetManual) return; // Never override user's manual choice

    if (quality === 'high') {
      set({ ...QUALITY_PRESETS.medium, isAuto: true });
    } else if (quality === 'medium') {
      set({ ...QUALITY_PRESETS.low, isAuto: true });
    }
  },

  stepUpQuality: () => {
    const { quality, userSetManual } = get();
    if (userSetManual) return;

    if (quality === 'low') {
      set({ ...QUALITY_PRESETS.medium, isAuto: true });
    } else if (quality === 'medium') {
      set({ ...QUALITY_PRESETS.high, isAuto: true });
    }
  },
}));
