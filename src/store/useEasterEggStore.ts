import { create } from 'zustand';

interface EasterEggState {
  discoveredEggs: string[];
  activeEggId: string | null;
  hasSeenCelebration: boolean;

  openEasterEgg: (id: string) => void;
  closeEasterEgg: () => void;
  markEggDiscovered: (id: string) => void;
  setHasSeenCelebration: (val: boolean) => void;
}

export const useEasterEggStore = create<EasterEggState>((set) => ({
  discoveredEggs: [],
  activeEggId: null,
  hasSeenCelebration: false,

  openEasterEgg: (id) =>
    set((state) => ({
      activeEggId: id,
      discoveredEggs: state.discoveredEggs.includes(id)
        ? state.discoveredEggs
        : [...state.discoveredEggs, id],
    })),

  closeEasterEgg: () => set({ activeEggId: null }),

  markEggDiscovered: (id) =>
    set((state) => {
      if (state.discoveredEggs.includes(id)) return {};
      return { discoveredEggs: [...state.discoveredEggs, id] };
    }),

  setHasSeenCelebration: (hasSeenCelebration) => set({ hasSeenCelebration }),
}));
