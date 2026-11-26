import { create } from 'zustand';
import { AUDIO_CONFIG } from '../data/audio';

interface AudioState {
  muted: boolean;
  musicEnabled: boolean;
  musicVolume: number;
  effectsVolume: number;

  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
  toggleMusic: () => void;
  setMusicEnabled: (enabled: boolean) => void;
  setMusicVolume: (vol: number) => void;
  setEffectsVolume: (vol: number) => void;
}

// Safe localStorage persistence
function loadSavedAudioState() {
  try {
    const saved = localStorage.getItem('harsh_audio_settings');
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

const saved = loadSavedAudioState();

export const useAudioStore = create<AudioState>((set) => ({
  muted: saved?.muted ?? false,
  musicEnabled: saved?.musicEnabled ?? true,
  musicVolume: saved?.musicVolume ?? AUDIO_CONFIG.defaultMusicVolume,
  effectsVolume: saved?.effectsVolume ?? AUDIO_CONFIG.defaultEffectsVolume,

  toggleMute: () =>
    set((state) => {
      const next = !state.muted;
      try {
        localStorage.setItem(
          'harsh_audio_settings',
          JSON.stringify({ ...state, muted: next })
        );
      } catch {}
      return { muted: next };
    }),

  setMuted: (muted) =>
    set((state) => {
      try {
        localStorage.setItem(
          'harsh_audio_settings',
          JSON.stringify({ ...state, muted })
        );
      } catch {}
      return { muted };
    }),

  toggleMusic: () =>
    set((state) => {
      const next = !state.musicEnabled;
      try {
        localStorage.setItem(
          'harsh_audio_settings',
          JSON.stringify({ ...state, musicEnabled: next })
        );
      } catch {}
      return { musicEnabled: next };
    }),

  setMusicEnabled: (musicEnabled) =>
    set((state) => {
      try {
        localStorage.setItem(
          'harsh_audio_settings',
          JSON.stringify({ ...state, musicEnabled })
        );
      } catch {}
      return { musicEnabled };
    }),

  setMusicVolume: (musicVolume) =>
    set((state) => {
      try {
        localStorage.setItem(
          'harsh_audio_settings',
          JSON.stringify({ ...state, musicVolume })
        );
      } catch {}
      return { musicVolume };
    }),

  setEffectsVolume: (effectsVolume) =>
    set((state) => {
      try {
        localStorage.setItem(
          'harsh_audio_settings',
          JSON.stringify({ ...state, effectsVolume })
        );
      } catch {}
      return { effectsVolume };
    }),
}));
