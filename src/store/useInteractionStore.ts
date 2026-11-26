import { create } from 'zustand';

interface InteractionState {
  nearestId: string | null;
  activeId: string | null;
  discoveredIds: string[];
  setNearest: (id: string | null) => void;
  openInteraction: (id: string) => void;
  closeInteraction: () => void;
  markDiscovered: (id: string) => void;
}

export const useInteractionStore = create<InteractionState>((set) => ({
  nearestId: null,
  activeId: null,
  discoveredIds: [],

  setNearest: (id) =>
    set((state) => {
      if (state.nearestId === id) return {};
      return { nearestId: id };
    }),

  openInteraction: (id) =>
    set((state) => {
      const alreadyDiscovered = state.discoveredIds.includes(id);
      const nextDiscovered = alreadyDiscovered
        ? state.discoveredIds
        : [...state.discoveredIds, id];
      return {
        activeId: id,
        nearestId: null,
        discoveredIds: nextDiscovered,
      };
    }),

  closeInteraction: () =>
    set(() => ({
      activeId: null,
    })),

  markDiscovered: (id) =>
    set((state) => {
      if (state.discoveredIds.includes(id)) return {};
      return {
        discoveredIds: [...state.discoveredIds, id],
      };
    }),
}));
