import { create } from 'zustand';

export type IntroStep = 'loading' | 'title' | 'transition' | 'welcome' | 'done';

interface IntroStore {
  step: IntroStep;
  loadProgress: number; // 0 to 100
  isLoaded: boolean;
  introCameraProgress: number; // 0 (wide view) to 1 (player camera)

  setStep: (step: IntroStep) => void;
  setLoadProgress: (progress: number) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  setIntroCameraProgress: (val: number) => void;
  skipIntro: () => void;
  enterWorld: () => void;
}

export const useIntroStore = create<IntroStore>((set, get) => ({
  step: 'loading',
  loadProgress: 0,
  isLoaded: false,
  introCameraProgress: 0,

  setStep: (step) => set({ step }),
  setLoadProgress: (loadProgress) =>
    set({
      loadProgress,
      isLoaded: loadProgress >= 100,
      step: get().step === 'loading' && loadProgress >= 100 ? 'title' : get().step,
    }),
  setIsLoaded: (isLoaded) =>
    set({
      isLoaded,
      step: get().step === 'loading' && isLoaded ? 'title' : get().step,
    }),
  setIntroCameraProgress: (introCameraProgress) => set({ introCameraProgress }),

  skipIntro: () => {
    // If skipping while still loading, mark done as soon as ready
    set({ step: 'done', introCameraProgress: 1 });
  },

  enterWorld: () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      set({ step: 'welcome', introCameraProgress: 1 });
    } else {
      set({ step: 'transition' });
    }
  },
}));
